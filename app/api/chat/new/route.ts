// app/api/chat/new/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });

  const conv = await prisma.conversation.create({
    data: {
      title: "New Conversation",
      userId: user!.id,
    },
  });

  return NextResponse.json({ id: conv.id });
}
