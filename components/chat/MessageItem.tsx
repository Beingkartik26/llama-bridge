import { Check, Copy, MoreHorizontal, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MessageItemProps {
  message: {
    id: string
    role: "data" | "user" | "assistant" | "system"
    content: string
  }
  copiedMessageId: string | null
  onCopy: (text: string, messageId: string) => void
  onReload: () => void
}

export function MessageItem({ message, copiedMessageId, onCopy, onReload }: MessageItemProps) {
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g)

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.slice(3, -3)
        return (
          <pre key={index} className="my-2 overflow-x-auto rounded-md bg-muted p-4 text-sm">
            <code>{code}</code>
          </pre>
        )
      }
      return (
        <p key={index} className="whitespace-pre-wrap">
          {part}
        </p>
      )
    })
  }

  return (
    <div
      className={cn(
        "group relative flex w-full gap-3",
        message.role === "user" ? "justify-end" : "justify-start",
      )}
    >
      {message.role !== "user" && (
        <Avatar className="mt-1 h-8 w-8 shrink-0">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            AI
          </div>
        </Avatar>
      )}
      <div
        className={cn(
          "relative max-w-[80%] rounded-lg px-4 py-3 text-sm",
          message.role === "user" ? "bg-black text-white" : "bg-muted",
        )}
      >
        <div className="mb-1 font-medium">{message.role === "user" ? "You" : "AI Assistant"}</div>
        <div className="space-y-2">{renderMessageContent(message.content)}</div>

        <div className="absolute -right-10 top-2 hidden space-x-1 group-hover:flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onCopy(message.content, message.id)}
                >
                  {copiedMessageId === message.id ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                {copiedMessageId === message.id ? "Copied!" : "Copy message"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="left">More options</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete message
              </DropdownMenuItem>
              {message.role !== "user" && (
                <DropdownMenuItem onClick={onReload}>Regenerate response</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {message.role === "user" && (
        <Avatar className="mt-1 h-8 w-8 shrink-0">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white border border-gray-300 text-xs font-medium text-black">
            You
          </div>
        </Avatar>
      )}
    </div>
  )
} 