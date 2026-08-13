"use client"

import { useState } from "react"
import { Shuffle, Feather } from "lucide-react"
import { Button } from "@/components/ui/button"

type CardDrawerProps = {
  cards: string[]
  cardLabel: string
  cardCta: string
  /** When provided, shows a "Write about this" button that lifts the current card up. */
  onWriteAbout?: (prompt: string) => void
}

export function CardDrawer({ cards, cardLabel, cardCta, onWriteAbout }: CardDrawerProps) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * cards.length))
  const [pulse, setPulse] = useState(0)

  const draw = () => {
    let next = index
    if (cards.length > 1) {
      while (next === index) next = Math.floor(Math.random() * cards.length)
    }
    setIndex(next)
    setPulse((p) => p + 1)
  }

  const current = cards[index]

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        key={pulse}
        className="animate-in fade-in zoom-in-95 duration-500 relative w-full max-w-xl rounded-3xl border border-border/70 bg-card/80 px-7 py-10 text-center shadow-[0_20px_60px_-30px_rgba(90,30,60,0.4)] backdrop-blur sm:px-12 sm:py-14"
      >
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-secondary-foreground">
          <Feather className="size-3" />
          {cardLabel}
        </span>
        <p className="text-balance font-serif text-2xl leading-snug text-foreground sm:text-[1.75rem]">
          {current}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={draw} size="lg" className="rounded-full px-6">
          <Shuffle className="size-4" />
          {cardCta}
        </Button>
        {onWriteAbout && (
          <Button
            onClick={() => onWriteAbout(current)}
            size="lg"
            variant="outline"
            className="rounded-full px-6"
          >
            <Feather className="size-4" />
            Write about this
          </Button>
        )}
      </div>
    </div>
  )
}
