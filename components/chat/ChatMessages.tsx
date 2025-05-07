import { useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageItem } from "./MessageItem"
import { WelcomeMessage } from "./WelcomeMessage"
import { LoadingMessage } from "./LoadingMessage"
import { ErrorMessage } from "./ErrorMessage"

interface ChatMessagesProps {
  messages: any[]
  isLoading: boolean
  error: Error | null
  onReload: () => void
  copiedMessageId: string | null
  onCopy: (text: string, messageId: string) => void
}

export function ChatMessages({ 
  messages, 
  isLoading, 
  error, 
  onReload,
  copiedMessageId,
  onCopy 
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-6 p-4 md:p-8">
          {messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            messages.map((message) => (
              <MessageItem 
                key={message.id} 
                message={message} 
                onReload={onReload}
                copiedMessageId={copiedMessageId}
                onCopy={onCopy}
              />
            ))
          )}
          {isLoading && <LoadingMessage />}
          {error && <ErrorMessage onReload={onReload} />}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  )
} 