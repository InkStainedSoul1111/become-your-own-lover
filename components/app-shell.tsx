"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { LogOut, BookHeart } from "lucide-react"
import { SECTIONS, type SectionId } from "@/lib/content"
import type { JournalEntry } from "@/lib/db/schema"
import { authClient } from "@/lib/auth-client"
import { AmbientAudio } from "@/components/ambient-audio"
import { CardDrawer } from "@/components/card-drawer"
import { JournalComposer, type JournalComposerHandle } from "@/components/journal-composer"
import { WritingsList } from "@/components/writings-list"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Tab = SectionId | "writings"

const TABS: { id: Tab; label: string }[] = [
  ...SECTIONS.map((s) => ({ id: s.id as Tab, label: s.label })),
  { id: "writings", label: "My Writings" },
]

export function AppShell({
  userName,
  entries,
}: {
  userName: string
  entries: JournalEntry[]
}) {
  const router = useRouter()
  const [active, setActive] = useState<Tab>("manifest")
  const composerRef = useRef<JournalComposerHandle>(null)

  const section = SECTIONS.find((s) => s.id === active)

  const signOut = async () => {
    await authClient.signOut()
    router.push("/sign-in")
    router.refresh()
  }

  const writeAbout = (prompt: string) => {
    setActive("journal")
    window.setTimeout(() => composerRef.current?.setPrompt(prompt), 60)
  }

  return (
    <div className="min-h-svh">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <BookHeart className="size-5 text-accent" />
            <span className="font-serif text-lg italic text-foreground">Become Your Own Lover</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <AmbientAudio />
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="rounded-full text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <nav aria-label="Sections" className="border-t border-border/40">
          <div className="mx-auto max-w-6xl overflow-x-auto px-2 sm:px-6">
            <ul className="flex min-w-max gap-1 py-2">
              {TABS.map((tab) => (
                <li key={tab.id}>
                  <button
                    type="button"
                    onClick={() => setActive(tab.id)}
                    aria-current={active === tab.id ? "page" : undefined}
                    className={cn(
                      "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        {active === "writings" ? (
          <section aria-labelledby="section-heading" className="animate-in fade-in duration-500">
            <SectionHeading
              id="section-heading"
              eyebrow="A record of your becoming"
              title="My Writings"
              intro={`Every tender word you've saved, ${userName}. Return whenever you need to remember how far you've come.`}
            />
            <WritingsList entries={entries} />
          </section>
        ) : section ? (
          <section
            key={section.id}
            aria-labelledby="section-heading"
            className="animate-in fade-in duration-500"
          >
            {section.image && (
              <div className="relative mb-8 h-56 w-full overflow-hidden rounded-3xl sm:h-72">
                <Image
                  src={section.image || "/placeholder.svg"}
                  alt=""
                  fill
                  priority={section.id === "manifest"}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
              </div>
            )}

            <SectionHeading
              id="section-heading"
              eyebrow={active === "manifest" ? `Welcome home, ${userName}` : "A moment for you"}
              title={section.title}
              intro={section.intro}
            />

            <CardDrawer
              cards={section.cards}
              cardLabel={section.cardLabel}
              cardCta={section.cardCta}
              onWriteAbout={writeAbout}
            />
            <div style={{marginTop: '30px', textAlign: 'center'}}>
  <a
    href="https://buy.stripe.com/14A5kDbW1ct16bV6ot7bw00"
    target="_blank"
    style={{background:'#000',color:'#fff',padding:'14px 28px',borderRadius:'10px',textDecoration:'none',fontWeight:'600',fontSize:'16px',display:'inline-block'}}
  >
    Get Full Access for $11.11
  </a>
</div>

            {section.id === "journal" && (
              <div className="mt-10">
                <JournalComposer ref={composerRef} />
              </div>
            )}
          </section>
        ) : null}
      </main>
    </div>
  )
}

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string
  eyebrow: string
  title: string
  intro: string
}) {
  return (
    <div className="mb-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <h1 id={id} className="mt-2 text-balance font-serif text-4xl text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
        {intro}
      </p>
    </div>
  )
}
