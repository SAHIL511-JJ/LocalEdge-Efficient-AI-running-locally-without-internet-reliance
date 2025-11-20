"use client";

import { useEffect, useRef, useState } from "react";

type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! Ask me anything.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function scroll() {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    scroll();
  }, [messages]);

  useEffect(() => {
    function onUser(e: any) {
      const { role, content } = e.detail;

      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), role, content },
      ]);
    }

    function onStream(e: any) {
      const chunk = e.detail.chunk as string;

      setMessages((prev) => {
        const last = prev[prev.length - 1];

        if (!last || last.role !== "assistant") {
          return [
            ...prev,
            {
              id: String(Date.now()),
              role: "assistant",
              content: chunk,
            },
          ];
        } else {
          return prev.slice(0, -1).concat([
            { ...last, content: last.content + chunk },
          ]);
        }
      });
    }

    function onStreamEnd() {}

    window.addEventListener("chat:message", onUser);
    window.addEventListener("chat:stream", onStream);
    window.addEventListener("chat:stream:end", onStreamEnd);

    return () => {
      window.removeEventListener("chat:message", onUser);
      window.removeEventListener("chat:stream", onStream);
      window.removeEventListener("chat:stream:end", onStreamEnd);
    };
  }, []);

  return (
    <div className="relative flex-1 overflow-y-auto">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,92,255,0.12),_transparent_55%)]" />

      <div className="relative mx-auto flex h-full max-w-3xl flex-col justify-end px-4 py-8 sm:px-8">
        <div className="space-y-5">
          {messages.map((message) => {
            const isAssistant = message.role === "assistant";

            return (
              <div
                key={message.id}
                className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
              >
                <div className="space-y-2">
                  <p
                    className={`text-xs uppercase tracking-[0.3em] ${
                      isAssistant
                        ? "text-primary-500/80"
                        : "text-slate-400 text-right"
                    }`}
                  >
                    {isAssistant ? "Aurora" : "You"}
                  </p>

                  <div
                    className={`max-w-xl rounded-3xl px-5 py-4 text-sm leading-relaxed shadow-glass ${
                      isAssistant
                        ? "border border-white/70 bg-white/70 text-slate-800"
                        : "bg-gradient-to-r from-primary-500 to-primary-500/90 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
