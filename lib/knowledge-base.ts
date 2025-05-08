import { promises as fs } from "fs";
import path from "path";

const KNOWLEDGE_PATH = path.join(process.cwd(), "knowledge", "knowledge.txt");

export async function getKnowledgeBase() {
  try {
    return await fs.readFile(KNOWLEDGE_PATH, "utf8");
  } catch {
    return "";
  }
}

export { KNOWLEDGE_PATH };