import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    GEMINI_KEY_EXISTS: !!process.env.GEMINI_API_KEY,
    GEMINI_KEY_VALUE: process.env.GEMINI_API_KEY?.slice(0, 8) + "...",
    LOADED_MODEL: process.env.GEMINI_MODEL
  });
}
