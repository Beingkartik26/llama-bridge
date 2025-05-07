"use client"

import { useState, useRef, useEffect } from "react"
import { MessageItem } from "@/components/chat/MessageItem"
import { WelcomeMessage } from "@/components/chat/WelcomeMessage"
import { LoadingMessage } from "@/components/chat/LoadingMessage"
import { ErrorMessage } from "@/components/chat/ErrorMessage"
import { ChatSidebar } from "@/components/chat/ChatSidebar"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { ChatInput } from "@/components/chat/ChatInput"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Conversation {
  id: string
  title: string
  timestamp: Date
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", title: "Getting started with AI", timestamp: new Date() },
    { id: "2", title: "Product recommendations", timestamp: new Date(Date.now() - 86400000) },
    { id: "3", title: "Technical support", timestamp: new Date(Date.now() - 172800000) },
  ])
  const [activeConversation, setActiveConversation] = useState<string>("1")
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const sendMessage = async (userMessage: string) => {
    setIsLoading(true)
    setError(null)
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
    }
    setMessages((prev) => [...prev, userMsg])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      })
      if (!res.body) throw new Error("No response body")
      const reader = res.body.getReader()
      let aiMessage = ""
      const aiMessageId = Date.now().toString() + "-ai"
      setMessages((prev) => [...prev, { id: aiMessageId, role: "assistant", content: "" }])
      let buffer = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += new TextDecoder().decode(value)
        // Split on newlines (Ollama streams JSON lines)
        const lines = buffer.split('\n')
        buffer = lines.pop() || "" // Save incomplete line for next chunk
        for (const line of lines) {
          if (!line.trim()) continue
          try {
            const data = JSON.parse(line)
            if (typeof data.response === "string") {
              aiMessage += data.response
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMessageId ? { ...msg, content: aiMessage } : msg
                )
              )
            }
          } catch (e) {
            // Ignore JSON parse errors for incomplete lines
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim()) {
      sendMessage(inputValue.trim())
      setInputValue("")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const copyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }

  const startNewConversation = () => {
    const newId = (conversations.length + 1).toString()
    const newConversation = {
      id: newId,
      title: `New Conversation ${newId}`,
      timestamp: new Date(),
    }
    setConversations([newConversation, ...conversations])
    setActiveConversation(newId)
    setMessages([])
  }

  return (
    <div className="flex h-screen flex-col bg-background md:flex-row">
      <ChatSidebar
        conversations={conversations}
        activeConversation={activeConversation}
        onConversationSelect={setActiveConversation}
        onNewConversation={startNewConversation}
      />
      <div className="flex flex-1 flex-col">
        <ChatHeader
          activeConversation={conversations.find((c) => c.id === activeConversation)}
          onNewConversation={startNewConversation}
        />
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-6 p-4 md:p-8">
              {messages.length === 0 ? (
                <WelcomeMessage onSuggestionClick={sendMessage} />
              ) : (
                messages.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    copiedMessageId={copiedMessageId}
                    onCopy={copyToClipboard}
                    onReload={() => sendMessage(message.content)}
                  />
                ))
              )}
              {isLoading && <LoadingMessage />}
              {error && <ErrorMessage onReload={() => setError(null)} />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>
        <ChatInput
          value={inputValue}
          onChange={handleChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
          onStop={() => setIsLoading(false)}
        />
      </div>
    </div>
  )
}
