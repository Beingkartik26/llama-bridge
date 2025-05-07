import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  onReload: () => void
}

export function ErrorMessage({ onReload }: ErrorMessageProps) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-sm text-destructive">
      <p>An error occurred while generating a response.</p>
      <Button size="sm" className="cursor-pointer bg-black text-white mt-2" onClick={onReload}>
        Try again
      </Button>
    </div>
  )
} 