// lib/gemini.ts

export type Message = {
  role: "user" | "model";
  content: string;
};

export async function sendMessagesStream(messages: Message[]) {
  const apiKey = process.env.GEMINI_API_KEY!;
  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/event-stream", // ⭐ REQUIRED FOR SSE
      },
      body: JSON.stringify({
        contents: messages.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error("Gemini API Error: " + error);
  }

  return response; // SSE BODY — do not parse here!
}
