import { ChevronDown } from "lucide-react"

interface WelcomeMessageProps {
    onSuggestionClick?: (suggestion: string) => void
}

const suggestions = [
    "Tell me a fun fact.",
    "How can I improve my productivity?",
    "Explain a complex topic in simple terms.",
    "Give me a daily motivation.",
    "What's the weather like today?",
    "Suggest a good book to read.",
]

export function WelcomeMessage({ onSuggestionClick = () => { } }: WelcomeMessageProps) {
    return (
        <div className="flex h-[70vh] flex-col items-center justify-center space-y-4 text-center">
            {/* <div className="rounded-full bg-black p-2">
        <ChevronDown className="h-6 w-6 text-white" />
      </div> */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Welcome to AI Chat</h3>
                <p className="max-w-md text-muted-foreground text-sm">
                    Start a conversation with the AI assistant. You can ask questions, get information, or just chat.
                </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
                {suggestions.map((s, i) => (
                    <button
                        key={i}
                        className="cursor-pointer px-4 py-2 rounded-full bg-gray-100 hover:bg-black hover:text-white text-sm text-gray-700 border border-gray-200 transition-colors"
                        onClick={() => onSuggestionClick(s)}
                        type="button"
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>
    )
} 