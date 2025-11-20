// app/api/chat/regenerate/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { chatWithOpenRouter } from "@/lib/openrouter";

export async function POST(req: Request) {
  try {
    const { conversationId } = await req.json();

    const history = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    const messages = history.map((m) => ({
      role: (m.role === "assistant" ? "assistant" : "user") as
        | "assistant"
        | "user",
      content: m.content,
    }));

    const assistantText = await chatWithOpenRouter(messages);

    await prisma.message.create({
      data: {
        role: "assistant",
        content: assistantText,
        conversationId,
      },
    });

    return NextResponse.json({ response: assistantText });
  } catch (error) {
    console.error("REGENERATE ROUTE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
