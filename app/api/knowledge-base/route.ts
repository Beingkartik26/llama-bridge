import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import { KNOWLEDGE_PATH } from "@/lib/knowledge-base";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const text = await file.text();

  // Ensure the folder exists
  await fs.mkdir(require("path").dirname(KNOWLEDGE_PATH), { recursive: true });
  await fs.writeFile(KNOWLEDGE_PATH, text, "utf8");

  return new Response("OK");
}