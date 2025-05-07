"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { ChatSidebar } from "./ChatSidebar"
import { ChatHeader } from "./ChatHeader"
import { ChatMessages } from "./ChatMessages"
import { ChatInput } from "./ChatInput"

interface Conversation {
  id: string
  title: string
  timestamp: Date
}

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, stop } = useChat()
  const [inputValue, setInputValue] = useState("")
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", title: "Getting started with AI", timestamp: new Date() },
    { id: "2", title: "Product recommendations", timestamp: new Date(Date.now() - 86400000) },
    { id: "3", title: "Technical support", timestamp: new Date(Date.now() - 172800000) },
  ])
  const [activeConversation, setActiveConversation] = useState<string>("1")
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim()) {
      handleSubmit(e)
      setInputValue("")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    handleInputChange(e)
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
  }

  const copyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
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
        <ChatMessages
            messages={messages}
            isLoading={isLoading}
            error={error || null}
            onReload={reload}
            copiedMessageId={copiedMessageId}
            onCopy={copyToClipboard}
        />
        <ChatInput
          value={inputValue}
          onChange={handleChange}
          onSubmit={onSubmit}
          isLoading={isLoading}
          onStop={stop}
        />
      </div>
    </div>
  )
} 