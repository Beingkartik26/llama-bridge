import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
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
    return (
        <div
            className={cn(
                "group relative flex w-full gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
            )}
        >
            {message.role !== "user" && (
                <Avatar className="mt-1 h-8 w-8 shrink-0">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-black text-xs font-medium text-white">
                        AI
                    </div>
                </Avatar>
            )}
            <div
                className={cn(
                    "relative max-w-[80%] rounded-lg px-4 py-3 text-sm",
                    message.role === "user" ? "bg-black text-white" : "bg-gray-50",
                )}
            >
                <div className="mb-1 font-medium">{message.role === "user" ? "You" : "AI Assistant"}</div>
                <div className="space-y-2">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ inline, className, children, ...props }: any) {
                                const match = /language-(\\w+)/.exec(className || "")
                                return !inline ? (
                                    <SyntaxHighlighter
                                        style={oneDark}
                                        language={match ? match[1] : ""}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\\n$/, "")}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>

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