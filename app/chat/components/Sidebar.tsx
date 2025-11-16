"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [conversations, setConversations] = useState<any[]>([]);

  async function load() {
    const res = await fetch("/api/chat/search");
    const data = await res.json();
    setConversations(data.conversations || []);
  }

  async function newChat() {
    const res = await fetch("/api/chat/new", { method: "POST" });
    const data = await res.json();
    window.location.href = `/chat/${data.id}`;
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="w-64 bg-white/40 backdrop-blur-xl p-4 border-r h-screen">
      <button
        onClick={newChat}
        className="w-full p-3 mb-4 bg-primary-500 text-white rounded-xl"
      >
        + New Chat
      </button>

      <div className="space-y-2">
        {conversations.length === 0 && (
          <p className="text-sm text-gray-500">No conversations yet...</p>
        )}

        {conversations.map((c) => (
          <Link
            key={c.id}
            href={`/chat/${c.id}`}
            className="block p-3 bg-white/70 rounded-xl shadow-sm hover:bg-white"
          >
            {c.title || "Untitled Chat"}
          </Link>
        ))}
      </div>
    </div>
  );
}
