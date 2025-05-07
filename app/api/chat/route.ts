import { NextRequest } from "next/server";

export const runtime = "edge"; // enables streaming in Next.js API routes

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  // Call Ollama's local API
  const ollamaRes = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2", // or your model name
      prompt,
      stream: true,
    }),
  });

  // Stream Ollama's response directly to the client
  return new Response(ollamaRes.body, {
    headers: { "Content-Type": "text/plain" },
  });
}