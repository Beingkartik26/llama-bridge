import { NextRequest } from "next/server";
import { getKnowledgeBase } from "@/lib/knowledge-base";

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();
    const knowledgeBase = await getKnowledgeBase();

    
    const systemPrompt = `You are a helpful assistant. You will use the provided context to answer user questions.
    Read the given context before answering questions and think step by step. If you cannot answer a user question based on 
    the provided context, inform the user. Do not use any other information for answering the user. Provide a detailed answer to the question.`;
    const fullPrompt = knowledgeBase
        ? `You are an AI assistant. Use the following knowledge base as reference material to answer the user's question. Do NOT pretend to be the person in the knowledge base. Instead, answer as a helpful assistant, citing information from the knowledge base if relevant.\n\nKnowledge Base:\n${knowledgeBase}\n\nUser Question:\n${prompt}`
        : prompt;

    // Use OLLAMA_API_URL env variable, fallback to localhost
    const ollamaApiUrl = process.env.OLLAMA_API_URL || "http://localhost:11434";

    // Call Ollama's local API
    //**
    // TODO: model should be a variable
    //  */
    const ollamaRes = await fetch(`${ollamaApiUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "llama3.2", // or your model name
            prompt: fullPrompt,
            system: systemPrompt,
            stream: true,
        }),
    });

    // Stream Ollama's response directly to the client
    return new Response(ollamaRes.body, {
        headers: { "Content-Type": "text/plain" },
    });
}