// app/api/chat/send/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { sendMessagesStream } from "@/lib/gemini";

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

    // Fetch user
    const user = await prisma.user.findUnique({
      where: { email: session.user!.email! },
    });

    let convId = conversationId;

    // Create conversation if needed
    if (!convId) {
      const newConv = await prisma.conversation.create({
        data: {
          title: message.slice(0, 40),
          userId: user!.id,
        },
      });
      convId = newConv.id;
    }

    // Save user message
    await prisma.message.create({
      data: {
        role: "user",
        content: message,
        userId: user!.id,
        conversationId: convId,
      },
    });

    // Fetch history
    const history = await prisma.message.findMany({
      where: { conversationId: convId },
      orderBy: { createdAt: "asc" },
      take: 30,
    });

    // Convert to Gemini role format
    const messages = history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      content: m.content,
    }));

    // Call Gemini
    const response = await sendMessagesStream(messages);

    if (!response.body) {
      return NextResponse.json({ error: "Gemini returned no stream" }, { status: 500 });
    }

    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    let assistantFullText = "";

    // STREAM BACK TO FRONTEND
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);

          // Gemini uses SSE format → data: {...json...}
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.replace("data: ", "").trim();
              if (!jsonStr || jsonStr === "[DONE]") continue;

              try {
                const parsed = JSON.parse(jsonStr);

                const text =
                  parsed?.candidates?.[0]?.content?.parts?.[0]?.text;

                if (text) {
                  assistantFullText += text;
                  controller.enqueue(encoder.encode(text));
                }
              } catch {
                // ignore malformed lines
              }
            }
          }
        }

        // Save assistant message
        await prisma.message.create({
          data: {
            role: "assistant",
            content: assistantFullText,
            userId: user!.id,
            conversationId: convId!,
          },
        });

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error("SEND ROUTE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
