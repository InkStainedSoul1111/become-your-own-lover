"use client"

import { useState, useTransition, useImperativeHandle, forwardRef } from "react"
import { useRouter } from "next/navigation"
import { Feather, Check } from "lucide-react"
import { createEntry } from "@/app/actions/journal"
import { MOODS } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export type JournalComposerHandle = {
  setPrompt: (prompt: string) => void
  focus: () => void
}

export const JournalComposer = forwardRef<JournalComposerHandle, { compact?: boolean }>(
  function JournalComposer({ compact }, ref) {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [prompt, setPrompt] = useState("")
    const [content, setContent] = useState("")
    const [mood, setMood] = useState<string | null>(null)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    useImperativeHandle(ref, () => ({
      setPrompt: (p: string) => {
        setPrompt(p)
        const el = document.getElementById("journal-content")
        el?.scrollIntoView({ behavior: "smooth", block: "center" })
        window.setTimeout(() => (el as HTMLTextAreaElement | null)?.focus(), 400)
      },
      focus: () => document.getElementById("journal-content")?.focus(),
    }))

    const submit = () => {
      setError(null)
      if (!content.trim()) {
        setError("Write a little something before saving.")
        return
      }
      startTransition(async () => {
        try {
          await createEntry({
            content,
            title,
            prompt,
            mood: mood ?? undefined,
            source: "journal",
          })
          setTitle("")
          setPrompt("")
          setContent("")
          setMood(null)
          setSaved(true)
          router.refresh()
          window.setTimeout(() => setSaved(false), 2500)
        } catch {
          setError("Something went wrong saving your entry. Please try again.")
        }
      })
    }

    return (
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-[0_20px_60px_-40px_rgba(90,30,60,0.4)] backdrop-blur sm:p-8">
        {prompt && (
          <div className="mb-5 rounded-2xl bg-secondary/70 px-4 py-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Writing about
            </p>
            <p className="mt-1 font-serif text-lg leading-snug text-foreground">{prompt}</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {!compact && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="journal-title">Title (optional)</Label>
              <Input
                id="journal-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give this entry a name"
                className="bg-background/70"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="journal-content">Your words</Label>
            <Textarea
              id="journal-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Let it pour out, exactly as it is..."
              rows={compact ? 5 : 8}
              className="resize-none bg-background/70 font-serif text-base leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>How are you feeling? (optional)</Label>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(mood === m ? null : m)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-sm transition-colors",
                    mood === m
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border/70 bg-background/50 text-muted-foreground hover:border-accent/50 hover:text-foreground",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3">
            <Button onClick={submit} disabled={isPending} className="rounded-full px-6">
              <Feather className="size-4" />
              {isPending ? "Saving..." : "Save entry"}
            </Button>
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent animate-in fade-in">
                <Check className="size-4" />
                Saved to your writings
              </span>
            )}
          </div>
        </div>
      </div>
    )
  },
)
