import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

interface ChatHeaderProps {
  activeConversation?: {
    id: string
    title: string
    timestamp: Date
  }
  onNewConversation: () => void
}

export function ChatHeader({ activeConversation }: ChatHeaderProps) {
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
        <div>
          <h2 className="text-lg font-medium">
            {activeConversation?.title || "Chat"}
          </h2>
        </div>
      )}

      <DropdownMenu>
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
      </DropdownMenu>
    </header>
  )
} 