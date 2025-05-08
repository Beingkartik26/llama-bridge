import { Menu, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import React from "react"

interface ChatHeaderProps {
  activeConversation?: {
    id: string
    title: string
    timestamp: Date
  }
  onNewConversation: () => void
  model?: string
  onModelChange?: (model: string) => void
}

const MODELS = [
  "llama3.2",
  "llama2",
  "mistral",
  "phi3",
  "gemma",
]

export function ChatHeader({ activeConversation, model = "llama3.2", onModelChange }: ChatHeaderProps) {
  const isMobile = useMobile()

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-300 px-4">
      {isMobile ? (
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              {/* Mobile sidebar content */}
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold">AI Chat</h1>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium">
            {activeConversation?.title || "Chat"}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-sm font-normal px-3">
                <span>{model}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="start">
              {MODELS.map((m) => (
                <DropdownMenuItem
                  key={m}
                  onClick={() => onModelChange && onModelChange(m)}
                  className={model === m ? "font-semibold bg-primary/10" : ""}
                >
                  {m}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <User className="h-5 w-5" />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <Separator className="my-1" />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </header>
  )
} 