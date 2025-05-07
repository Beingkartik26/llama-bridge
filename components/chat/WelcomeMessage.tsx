import { ChevronDown } from "lucide-react"

export function WelcomeMessage() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
      <div className="rounded-full bg-primary/10 p-4">
        <ChevronDown className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Welcome to AI Chat</h3>
        <p className="max-w-md text-muted-foreground">
          Start a conversation with the AI assistant. You can ask questions, get information, or just chat.
        </p>
      </div>
    </div>
  )
} 