"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Conversation = {
  id: string;
  title?: string | null;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch("/api/chat/search")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setConversations(data.conversations || []);
      })
      .catch(() => {
        if (!active) return;
        setConversations([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredConversations = useMemo(() => {
    if (!query.trim()) return conversations;
    return conversations.filter((conversation) =>
      (conversation.title || "Untitled Chat")
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    );
  }, [conversations, query]);

  async function newChat() {
    try {
      const res = await fetch("/api/chat/new", { method: "POST" });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        throw new Error("Unable to start conversation");
      }

      const data = await res.json();
      if (data?.id) {
        window.location.href = `/chat/${data.id}`;
      }
    } catch (error) {
      console.error("Failed to start a new chat", error);
      alert("Unable to start a conversation. Please try again.");
    }
  }

  return (
    <aside
      className="flex h-full flex-col gap-6 rounded-2xl shadow-glass backdrop-blur-2xl transition-all duration-300"
      style={{
        backgroundColor: "var(--chat-bg)",
        borderWidth: "1px",
        borderColor: "var(--chat-border)",
        padding: "1.5rem 1.25rem"
      }}
    >
      <div className="space-y-1">
        <p
          className="text-xs font-semibold uppercase tracking-[0.4em]"
          style={{ color: "var(--text-secondary)" }}
        >
          Aurora
        </p>
        <h2
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Studio Console
        </h2>
        <p
          className="text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Access every conversation and workspace in one place.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={newChat}
          className="flex-1 rounded-2xl bg-primary-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-primary-500/30 transition hover:-translate-y-0.5"
        >
          + New Conversation
        </button>
        <Link
          href="/chat"
          className="rounded-2xl border border-white/60 px-4 py-3 text-sm font-medium text-slate-700 hover:border-slate-200"
        >
          Overview
        </Link>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search conversations"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-sm text-slate-600 placeholder:text-slate-400 focus:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-200/80"
        />
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 15.5C12.5899 15.5 15.5 12.5899 15.5 9C15.5 5.41015 12.5899 2.5 9 2.5C5.41015 2.5 2.5 5.41015 2.5 9C2.5 12.5899 5.41015 15.5 9 15.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M16.5 16.5L14 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-12 animate-pulse rounded-2xl bg-white/60"
              />
            ))}
          </div>
        )}

        {!loading && filteredConversations.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200/80 bg-white/60 px-4 py-6 text-center text-sm text-slate-500">
            No conversations yet. Start a new one to see it appear here.
          </div>
        )}

        <div className="space-y-2">
          {filteredConversations.map((conversation) => {
            const isActive =
              pathname === `/chat/${conversation.id}` ||
              pathname === `/chat/${conversation.id}/`;

            return (
              <Link
                key={conversation.id}
                href={`/chat/${conversation.id}`}
                className={`block rounded-2xl border px-4 py-3 text-sm transition ${isActive
                    ? "border-primary-100 bg-primary-50 text-primary-700 shadow-glass"
                    : "border-white/50 bg-white/70 text-slate-700 hover:border-slate-200"
                  }`}
              >
                <p className="font-medium">
                  {conversation.title || "Untitled chat"}
                </p>
                <p className="text-xs text-slate-400">Draft-ready</p>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
