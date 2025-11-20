type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_OPENROUTER_KEY =
  "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";

export async function chatWithOpenRouter(
  messages: ChatMessage[],
  options?: { model?: string }
) {
  const apiKey = process.env.OPENROUTER_API_KEY || DEFAULT_OPENROUTER_KEY;

  const model =
    options?.model ||
    process.env.OPENROUTER_MODEL ||
    "deepseek/deepseek-r1:latest";

  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME || "AI Chat App",
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  if (!res.ok) {
    const errorPayload = await res.text().catch(() => "");
    throw new Error(`OpenRouter API error: ${res.status} ${res.statusText} ${errorPayload}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenRouter returned no content.");
  }

  return content as string;
}

