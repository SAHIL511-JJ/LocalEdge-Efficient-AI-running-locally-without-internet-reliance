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
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`max-w-xl p-4 rounded-2xl shadow-sm ${
            m.role === "assistant"
              ? "glass-card text-black"
              : "bg-primary-500 text-white ml-auto"
          }`}
        >
          {m.content}
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
