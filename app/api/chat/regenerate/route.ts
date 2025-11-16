// app/api/chat/regenerate/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendMessagesStream } from "@/lib/deepseek";

export async function POST(req: Request) {
  const { conversationId } = await req.json();

  const history = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });

  const messages = history.map((m) => ({
    role: m.role as "assistant" | "user" | "system",
    content: m.content,
  }));

  const response = await sendMessagesStream(messages);

  let assistant = "";
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        assistant += chunk;

        controller.enqueue(encoder.encode(chunk));
      }

      await prisma.message.create({
        data: {
          role: "assistant",
          content: assistant,
          conversationId,
        },
      });

      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
