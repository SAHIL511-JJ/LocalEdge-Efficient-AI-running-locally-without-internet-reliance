"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Msg = {
  id: string;
  role: "user" | " assistant";
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

    function onStreamEnd() { }

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

      <div className="relative mx-auto flex h-full max-w-3xl flex-col justify-start px-4 py-8 sm:px-8">
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
                    className="text-xs uppercase tracking-[0.3em]"
                    style={{
                      color: "var(--text-secondary)",
                      textAlign: isAssistant ? "left" : "right",
                    }}
                  >
                    {isAssistant ? "Aurora" : "You"}
                  </p>

                  <div
                    className="max-w-xl rounded-3xl px-5 py-4 text-sm leading-relaxed shadow-glass transition-colors"
                    style={
                      isAssistant
                        ? {
                          backgroundColor: "var(--chat-bg)",
                          borderWidth: "1px",
                          borderColor: "var(--chat-border)",
                          color: "var(--text-primary)",
                        }
                        : {
                          background: "var(--user-bg)",
                          color: "white",
                        }
                    }
                  >
                    {isAssistant ? (
                      <ReactMarkdown
                        components={{
                          code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || "");
                            const codeString = String(children).replace(/\n$/, "");

                            return !inline && match ? (
                              <CodeBlock language={match[1]} code={codeString} />
                            ) : (
                              <code
                                className="bg-slate-800/10 px-1.5 py-0.5 rounded text-xs font-mono"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      message.content
                    )}
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

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 text-xs">
        <span className="text-slate-400 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.875rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
