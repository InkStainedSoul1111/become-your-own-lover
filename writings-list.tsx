"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2, BookHeart } from "lucide-react"
import type { JournalEntry } from "@/lib/db/schema"
import { deleteEntry } from "@/app/actions/journal"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function WritingsList({ entries }: { entries: JournalEntry[] }) {
  const router = useRouter()
  const [pendingDelete, setPendingDelete] = useState<JournalEntry | null>(null)
  const [isPending, startTransition] = useTransition()

  const confirmDelete = () => {
    if (!pendingDelete) return
    const id = pendingDelete.id
    startTransition(async () => {
      await deleteEntry(id)
      setPendingDelete(null)
      router.refresh()
    })
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
        <BookHeart className="size-10 text-accent" />
        <div>
          <h3 className="font-serif text-2xl text-foreground">Your pages are waiting</h3>
          <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
            Everything you write in the Journal will gather here — a tender record of coming home
            to yourself.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="group rounded-3xl border border-border/70 bg-card/80 p-6 shadow-[0_16px_50px_-40px_rgba(90,30,60,0.35)] backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {entry.title ? (
                    <h3 className="font-serif text-xl text-foreground">{entry.title}</h3>
                  ) : (
                    <h3 className="font-serif text-xl text-foreground/80">Untitled entry</h3>
                  )}
                  {entry.mood && (
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {entry.mood}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {formatDate(entry.createdAt)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete entry"
                onClick={() => setPendingDelete(entry)}
                className="shrink-0 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100 focus-visible:opacity-100"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            {entry.prompt && (
              <p className="mt-4 border-l-2 border-accent/40 pl-3 font-serif text-sm italic text-muted-foreground">
                {entry.prompt}
              </p>
            )}

            <p className="mt-3 whitespace-pre-wrap text-pretty font-serif leading-relaxed text-foreground/90">
              {entry.content}
            </p>
          </article>
        ))}
      </div>

      <Dialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Release this entry?</DialogTitle>
            <DialogDescription>
              This will permanently delete this writing. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPendingDelete(null)}>
              Keep it
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
