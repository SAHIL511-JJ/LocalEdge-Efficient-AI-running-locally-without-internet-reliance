"use client";

import { useState } from "react";

export default function ChatInput({ conversationId }: { conversationId?: string }) {
  const [value, setValue] = useState("");
  const [streaming, setStreaming] = useState(false);

  async function sendMessage() {
    if (!value.trim() || streaming) return;

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
    <div className="border-t border-white/70 bg-white/80 px-4 py-5 backdrop-blur-2xl sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 items-end gap-3 rounded-3xl border border-white/80 bg-white/80 px-4 py-3 shadow-glass focus-within:ring-2 focus-within:ring-primary-200">
          <button
            type="button"
            className="rounded-2xl border border-white/60 px-3 py-2 text-xs font-medium text-slate-500 transition hover:border-primary-200 hover:text-primary-500"
            onClick={() => {}}
            aria-label="Attach file (coming soon)"
          >
            Attach
          </button>

          <textarea
            className="h-12 flex-1 resize-none border-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            placeholder="Draft a message, use Shift + Enter for a new line"
            value={value}
            rows={1}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
          />
        </div>

        <button
          onClick={sendMessage}
          disabled={streaming}
          className="inline-flex items-center justify-center rounded-2xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
        >
          {streaming ? (
            "Thinking"
          ) : (
            <span className="flex items-center gap-2">
              Send
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 5L19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
