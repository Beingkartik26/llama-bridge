import { Plus, Settings, UploadCloud, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRef, useState } from "react"
import { Input } from "../ui/input"

interface Conversation {
  id: string
  title: string
  timestamp: Date
}

interface ChatSidebarProps {
  conversations: Conversation[]
  activeConversation: string
  onConversationSelect: (id: string) => void
  onNewConversation: () => void
}

export function ChatSidebar({
  conversations,
  activeConversation,
  onConversationSelect,
  onNewConversation,
}: ChatSidebarProps) {
  const [kbUploadName, setKbUploadName] = useState<string | null>(null)
  const [kbUploading, setKbUploading] = useState(false)
  const [kbUploadSuccess, setKbUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    return date.toLocaleDateString()
  }

  return (
    <div className="hidden border-r border-gray-300 md:flex md:w-80 md:flex-col">
      <div className="flex h-16 items-center justify-between border-b border-gray-300 px-4">
        <h1 className="text-xl font-semibold">llama Bridge</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="cursor-pointer h-6 w-6 rounded-full bg-black text-white shadow-lg hover:bg-primary/90 transition-all duration-150"
                onClick={onNewConversation}
                aria-label="Start a new conversation"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-1 flex-col">
        <ScrollArea className="flex-1">
          {conversations.map((conversation) => (
            <div key={conversation.id} className="px-2 py-1">
              <Button
                variant={activeConversation === conversation.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onConversationSelect(conversation.id)}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="truncate">{conversation.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(conversation.timestamp)}
                  </span>
                </div>
              </Button>
            </div>
          ))}
        </ScrollArea>
        {/* <div className="border-t border-gray-300 p-4">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div> */}
       
      </div>
    </div>
  )
} 