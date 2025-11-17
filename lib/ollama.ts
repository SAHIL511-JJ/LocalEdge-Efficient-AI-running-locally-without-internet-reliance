// lib/ollama.ts

export async function chatWithOllama(messages: { role: string; content: string }[]) {
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen2.5-coder:7b',
      messages,
      stream: false,
    }),
  });

  if (!res.ok) {
    throw new Error(`Ollama API error: ${res.statusText}`);
  }

  const data = await res.json();
  return data.message.content;
}
