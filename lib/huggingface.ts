// lib/huggingface.ts

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export async function sendMessagesStream(messages: Message[]) {
  const HF_TOKEN = process.env.HF_TOKEN!;
  const MODEL = process.env.HF_MODEL || "google/gemma-2b-it";

  // Determine if this is a chat model based on the model name
  const isChatModel = MODEL.includes('chat') || MODEL.includes('instruct') || MODEL.includes('gemma') || MODEL.includes('llama') || MODEL.includes('mistral');

  let payload: any;

  if (isChatModel) {
    // For chat models, use the messages format
    payload = {
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      options: {
        wait_for_model: true
      },
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
        top_p: 0.9,
      }
    };
  } else {
    // For text generation models, use the inputs format
    const inputs = formatConversationForHuggingFace(messages);
    payload = {
      inputs: inputs,
      options: {
        wait_for_model: true
      },
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7,
        top_p: 0.9,
        return_full_text: false,
      }
    };
  }

  // Use the standard Hugging Face Inference API endpoint
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${MODEL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${HF_TOKEN}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Hugging Face API Error:", error);
    throw new Error("Hugging Face API Error: " + error);
  }

  // Return the response for the route to handle
  return response;
}

function formatConversationForHuggingFace(messages: Message[]): string {
  return messages.map(msg => {
    if (msg.role === "user") {
      return `User: ${msg.content}`;
    } else {
      return `Assistant: ${msg.content}`;
    }
  }).join('\n\n');
}