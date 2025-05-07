import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const KNOWLEDGE_PATH = path.join(process.cwd(), "knowledge", "knowledge.txt");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const text = await file.text();

  // Ensure the folder exists
  await fs.mkdir(path.dirname(KNOWLEDGE_PATH), { recursive: true });
  await fs.writeFile(KNOWLEDGE_PATH, text, "utf8");

  return new Response("OK");
}

export async function getKnowledgeBase() {
  try {
    return await fs.readFile(KNOWLEDGE_PATH, "utf8");
  } catch {
    return "";
  }
}
