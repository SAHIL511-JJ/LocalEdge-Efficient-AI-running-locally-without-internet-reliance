"use client";

import { useState } from "react";

export default function ChatInput({ conversationId }: { conversationId?: string }) {
  const [value, setValue] = useState("");
  const [streaming, setStreaming] = useState(false);

  async function sendMessage() {
    if (!value.trim()) return;

    const text = value;
    setValue("");

    window.dispatchEvent(
      new CustomEvent("chat:message", {
        detail: { role: "user", content: text },
      })
    );

    setStreaming(true);

    const res = await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, conversationId }),
    });

    if (!res.body) {
      setStreaming(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value: chunk, done } = await reader.read();
      if (done) break;

      const text = decoder.decode(chunk);

      window.dispatchEvent(
        new CustomEvent("chat:stream", {
          detail: { chunk: text },
        })
      );
    }

    window.dispatchEvent(new CustomEvent("chat:stream:end"));
    setStreaming(false);
  }

  return (
    <div className="flex items-center gap-3 p-4">
      <input
        className="flex-1 p-3 rounded-xl border bg-white/70"
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />

      <button
        onClick={sendMessage}
        disabled={streaming}
        className="px-5 py-3 bg-primary-500 text-white rounded-xl"
      >
        {streaming ? "..." : "Send"}
      </button>
    </div>
  );
}
