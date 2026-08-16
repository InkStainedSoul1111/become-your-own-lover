"use client"
import { useState, useEffect, useRef } from 'react'

export default function App() {
  const [started, setStarted] = useState(false)
  const [activeTab, setActiveTab] = useState('manifest')
  const [journalText, setJournalText] = useState('')
  const [allEntries, setAllEntries] = useState<any[]>([])
  const [musicPlaying, setMusicPlaying] = useState(true)
  const [index, setIndex] = useState<any>({manifest:0, motivate:0, music:0, nature:0, fitness:0, food:0, selfcare:0, rituals:0, journal:0})
  const audioContextRef = useRef<AudioContext | null>(null)

  const data = {
    manifest: [
      {text:"I am worthy of love that feels like coming home.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"},
      {text:"My body is a temple and I honor it daily."},
      {text:"I choose to speak to myself with kindness."}
    ],
    motivate: [
      {text:"What small act of self-love will you do today?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"},
      {text:"You are not behind. You are becoming."},
      {text:"Your healing is not a luxury. It is necessary."}
    ],
    'Music/Dance': [
      {text:"What song makes your soul remember who you are?"},
      {text:"Dance like no one is watching. This is for you."}
    ],
    nature: [
      {text:"How does nature reflect the beauty you carry inside?"},
      {text:"What lesson from the trees can you apply to your life today?"}
    ],
    fitness: [
      {text:"What does your body want to express through movement today?"},
      {text:"How can you honor your body as a vessel of strength?"},
      {text:"Movement is medicine. What does your body need?"}
    ],
    food: [
      {text:"What does it mean to nourish yourself with love?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"},
      {text:"How can eating become a sacred act of self-care?"},
      {text:"What food makes you feel most nurtured and alive?"}
    ],
    selfcare: [
      {text:"What self-care ritual makes you feel most loved?", img:"https://images.pexels.com/photos/40568/melancholy-rain-drop-nature-40568.jpeg"},
      {text:"How can you give yourself the comfort you give others?"},
      {text:"What boundary would be the most loving thing to set today?"}
    ],
    rituals: [
      {text:"What ritual would make you feel most connected to yourself?"},
      {text:"Create a morning ritual that feels like a hug from you to you."}
    ],
    journal: []
  }

  const initAudio = () => {
    if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  const playSound = () => {
    initAudio();
    const ctx = audioContextRef.current;
    if(!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.frequency.value = 440;
    g.gain.setValueAtTime(0.1, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    o.start();
    o.stop(ctx.currentTime + 0.5);
  }

  const nextPrompt = () => {
    setIndex({...index, [activeTab]: (index[activeTab] + 1) % data[activeTab as keyof typeof data].length})
    if(musicPlaying) playSound()
  }

  const saveEntry = () => {
    if(journalText.trim()) {
      setAllEntries([...allEntries, {text: journalText, date: new Date().toLocaleDateString()}])
      setJournalText('')
    }
  }

  if(!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 flex flex-col items-center justify-center text-white p-8">
        <h1 className="text-6xl font-bold mb-4 text-center">Become Your Own Lover</h1>
        <p className="text-xl mb-8 text-center opacity-90">A sacred space for self-connection and healing</p>
        <button
          onClick={() => setStarted(true)}
          className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full text-xl font-semibold transition"
        >
          Start Your Journey
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {Object.keys(data).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full capitalize ${activeTab === tab? 'bg-orange-500' : 'bg-white/20'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-4">
          {activeTab!== 'journal'? (
            <>
              {data[activeTab as keyof typeof data][index[activeTab]]?.img && (
                <img src={data[activeTab as keyof typeof data][index[activeTab]].img} className="w-full h-64 object-cover rounded-xl mb-4" alt="" />
              )}
              <p className="text-2xl text-center mb-6">{data[activeTab as keyof typeof data][index[activeTab]]?.text}</p>
              <button onClick={nextPrompt} className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold">
                Next Prompt
              </button>
            </>
          ) : (
            <>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                className="w-full h-40 bg-white/20 rounded-xl p-4 text-white placeholder-white/60"
                placeholder="Write to yourself with love..."
              />
              <button onClick={saveEntry} className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold mt-4">
                Save Entry
              </button>
              <div className="mt-6">
                {allEntries.map((entry, i) => (
                  <div key={i} className="bg-white/10 p-4 rounded-xl mb-2">
                    <p className="text-sm opacity-70">{entry.date}</p>
                    <p>{entry.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => setMusicPlaying(!musicPlaying)}
          className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-xl"
        >
          {musicPlaying? '🔊 Sound On' : '🔇 Sound Off'}
        </button>
      </div>
    </div>
  )
}
