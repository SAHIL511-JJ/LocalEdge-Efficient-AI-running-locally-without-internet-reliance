import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: "Hello, respond with only: OK" }],
            },
          ],
        }),
      }
    );

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let full = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      full += chunk;
    }

    return NextResponse.json({ success: true, raw: full });
  } catch (err) {
    return NextResponse.json({ error: String(err) });
  }
}
