// app/api/chat/regenerate/route.ts

// import prisma from "@/lib/prisma"; // DISABLED: Database temporarily removed
import { NextResponse } from "next/server";
import { chatWithOpenRouter } from "@/lib/openrouter";

// NOTE: This should ideally be shared with send/route.ts
// For now, regenerate won't work without a proper conversation in the same session
const mockConversations: Record<string, Array<{ role: string; content: string }>> = {};

export async function POST(req: Request) {
  try {
    const { conversationId } = await req.json();

    // MOCK: Get conversation history from in-memory storage
    const history = mockConversations[conversationId] || [];

    if (history.length === 0) {
      return NextResponse.json(
        { error: "No conversation history found" },
        { status: 404 }
      );
    }

    const messages = history.map((m) => ({
      role: (m.role === "assistant" ? "assistant" : "user") as
        | "assistant"
        | "user",
      content: m.content,
    }));

    const assistantText = await chatWithOpenRouter(messages);

    // MOCK: Add new response to in-memory storage
    mockConversations[conversationId].push({
      role: "assistant",
      content: assistantText,
    });

    return NextResponse.json({ response: assistantText });
  } catch (error) {
    console.error("REGENERATE ROUTE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
