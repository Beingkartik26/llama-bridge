import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  onStop: () => void
}

export function ChatInput({ value, onChange, onSubmit, isLoading, onStop }: ChatInputProps) {
  return (
    <div className="border-t border-gray-300 bg-background p-4">
      <form onSubmit={onSubmit} className="flex items-end gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Type your message..."
            value={value}
            onChange={onChange}
            className="min-h-[60px] resize-none rounded-lg border py-3 pr-12 shadow-sm"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3">
            {isLoading ? (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full"
                onClick={onStop}
              >
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive"></span>
                </span>
                <span className="sr-only">Stop generating</span>
              </Button>
            ) : (
              <Button type="submit" size="icon" className="h-8 w-8 rounded-full" disabled={!value.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
} 