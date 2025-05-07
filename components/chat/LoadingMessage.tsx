import { Avatar } from "@/components/ui/avatar"

export function LoadingMessage() {
  return (
    <div className="flex gap-3">
      <Avatar className="mt-1 h-8 w-8 shrink-0">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
          AI
        </div>
      </Avatar>
      <div className="max-w-[80%] rounded-lg bg-muted px-4 py-3 text-sm">
        <div className="mb-1 font-medium">AI Assistant</div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-current"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-current"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  )
} 