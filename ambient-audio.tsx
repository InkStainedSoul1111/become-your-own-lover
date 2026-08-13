"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Ambient audio recreated with the Web Audio API — a slow, warm drone of layered
 * sine tones with a gentle low-pass filter and a soft, breathing volume swell.
 * No audio files needed; the tones are synthesized in the browser.
 */
export function AmbientAudio() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<{ oscillators: OscillatorNode[]; master: GainNode; lfo: OscillatorNode } | null>(null)

  const stop = useCallback(() => {
    const nodes = nodesRef.current
    const ctx = ctxRef.current
    if (nodes && ctx) {
      const now = ctx.currentTime
      nodes.master.gain.cancelScheduledValues(now)
      nodes.master.gain.setValueAtTime(nodes.master.gain.value, now)
      nodes.master.gain.linearRampToValueAtTime(0, now + 1.2)
      window.setTimeout(() => {
        nodes.oscillators.forEach((o) => {
          try {
            o.stop()
          } catch {
            /* already stopped */
          }
        })
        try {
          nodes.lfo.stop()
        } catch {
          /* already stopped */
        }
      }, 1300)
    }
    nodesRef.current = null
  }, [])

  const start = useCallback(async () => {
    let ctx = ctxRef.current
    if (!ctx) {
      ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      ctxRef.current = ctx
    }
    if (ctx.state === "suspended") await ctx.resume()

    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 3)

    const filter = ctx.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.value = 700
    filter.Q.value = 0.6

    // A soft, consonant chord (A2, E3, A3, C#4) for a warm, held drone.
    const freqs = [110, 164.81, 220, 277.18]
    const oscillators = freqs.map((f, i) => {
      const osc = ctx!.createOscillator()
      osc.type = "sine"
      osc.frequency.value = f
      const g = ctx!.createGain()
      g.gain.value = i === 0 ? 0.5 : 0.28 / (i + 1)
      osc.connect(g)
      g.connect(filter)
      osc.start()
      return osc
    })

    // Slow LFO gently breathing the master volume for a living, ambient feel.
    const lfo = ctx.createOscillator()
    lfo.type = "sine"
    lfo.frequency.value = 0.07
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.05
    lfo.connect(lfoGain)
    lfoGain.connect(master.gain)
    lfo.start()

    filter.connect(master)
    master.connect(ctx.destination)

    nodesRef.current = { oscillators, master, lfo }
  }, [])

  const toggle = useCallback(async () => {
    if (playing) {
      stop()
      setPlaying(false)
    } else {
      await start()
      setPlaying(true)
    }
  }, [playing, start, stop])

  useEffect(() => {
    return () => {
      stop()
      ctxRef.current?.close().catch(() => {})
    }
  }, [stop])

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Turn off ambient sound" : "Turn on ambient sound"}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground",
        playing && "border-accent/50 text-accent",
      )}
    >
      {playing ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      <span>{playing ? "Ambient on" : "Ambient off"}</span>
    </button>
  )
}
