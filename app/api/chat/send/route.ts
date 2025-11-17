// app/api/chat/send/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { chatWithOllama } from "@/lib/ollama";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { conversationId, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user!.email! },
    });

    let convId = conversationId;

    if (!convId) {
      const newConv = await prisma.conversation.create({
        data: {
          title: message.slice(0, 50),
          userId: user!.id,
        },
      });
      convId = newConv.id;
    }

    await prisma.message.create({
      data: {
        role: "user",
        content: message,
        userId: user!.id,
        conversationId: convId,
      },
    });

    const history = await prisma.message.findMany({
      where: { conversationId: convId },
      orderBy: { createdAt: "asc" },
      take: 30,
    });

    const messages = history.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const assistantText = await chatWithOllama(messages);

    await prisma.message.create({
      data: {
        role: "assistant",
        content: assistantText,
        userId: user!.id,
        conversationId: convId,
      },
    });

    // ✅ Return plain text instead of JSON
    return new Response(assistantText, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("SEND ROUTE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
