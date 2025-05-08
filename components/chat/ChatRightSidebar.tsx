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
  systemPrompt?: string
  onSystemPromptChange?: (prompt: string) => void
}

export function ChatRightSidebar({
  conversations,
  activeConversation,
  onConversationSelect,
  onNewConversation,
  systemPrompt = "",
  onSystemPromptChange,
}: ChatSidebarProps) {
  const [kbUploadName, setKbUploadName] = useState<string | null>(null)
  const [kbUploading, setKbUploading] = useState(false)
  const [kbUploadSuccess, setKbUploadSuccess] = useState(false)
  const [localPrompt, setLocalPrompt] = useState(systemPrompt)
  const [promptSaved, setPromptSaved] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    return date.toLocaleDateString()
  }

  return (
    <div className="hidden border-l border-gray-300 md:flex md:w-80 md:flex-col">
      <div className="flex h-16 items-center justify-between border-b border-gray-300 px-4">

      </div>
      <div className="flex flex-1 flex-col">
        
        <div className=" p-4">
          <div className="flex flex-col items-start gap-2">
            <label className="text-xs font-medium text-gray-600 mb-1 flex items-center gap-2">
              <UploadCloud className="h-4 w-4" />
              Upload Knowledge Base (optional)
            </label>
            <div className="flex items-center gap-2 w-full">
              <Button
                size="sm"
                className="cursor-pointer flex items-center gap-2 bg-black text-white"
                onClick={() => fileInputRef.current?.click()}
                disabled={kbUploading}
              >
                {kbUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <UploadCloud className="h-4 w-4" />
                )}
                {kbUploading ? "Uploading..." : "Choose File"}
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setKbUploadName(file.name);
                  setKbUploading(true);
                  setKbUploadSuccess(false);
                  const formData = new FormData();
                  formData.append("file", file);
                  await fetch("/api/knowledge-base", { method: "POST", body: formData });
                  setKbUploading(false);
                  setKbUploadSuccess(true);
                  setTimeout(() => setKbUploadSuccess(false), 2000);
                }}
              />
              <span className="text-xs text-gray-500 truncate max-w-[120px]">
                {kbUploadName ? kbUploadName : "No file chosen"}
              </span>
              {kbUploadSuccess && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
            </div>
            <span className="text-[11px] text-gray-400 mt-1">
              Supported: .txt, .md
            </span>
          </div>
        </div>
        <div className="p-4">
          <label className="text-xs font-medium text-gray-600 mb-1 block">System Prompt (optional)</label>
          <textarea
            className="w-full min-h-[80px] max-h-40 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            value={localPrompt}
            onChange={e => setLocalPrompt(e.target.value)}
            placeholder="Set the system prompt for the AI assistant..."
          />
          <div className="flex items-center gap-2 mt-2">
            <Button
              size="sm"
              className="bg-black text-white"
              onClick={() => {
                if (onSystemPromptChange) onSystemPromptChange(localPrompt)
                setPromptSaved(true)
                setTimeout(() => setPromptSaved(false), 1500)
              }}
              disabled={localPrompt === systemPrompt}
            >
              Save
            </Button>
            {promptSaved && <span className="text-xs text-green-600">Saved!</span>}
          </div>
        </div>
      </div>
    </div>
  )
} 