// app/api/chat/new/route.ts
// import prisma from "@/lib/prisma"; // DISABLED: Database temporarily removed
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST() {
  // Removed authentication for public deployment
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  // MOCK: Generate a random conversation ID instead of using database
  const mockConversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return NextResponse.json({ id: mockConversationId });
}
