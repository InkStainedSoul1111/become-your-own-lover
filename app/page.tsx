'use client'
import { useState, useEffect, useRef } from 'react'

const manifestPrompts = [
  {text:"I am worthy of deep, unconditional love — starting with my own.",cat:"emotional"},
  {text:"My body is a sacred vessel. I honor it with movement that feels like joy.",cat:"physical"},
]

const journalPrompts = ["Describe the version of yourself you are becoming.","Write a love letter to yourself."]

export default function FullApp() {
  const [started, setStarted] = useState(false)
  const [activeTab, setActiveTab] = useState('manifest')
  const [journalText, setJournalText] = useState('')
  const [allEntries, setAllEntries] = useState<any[]>([])
  const [currentManifest, setCurrentManifest] = useState(0)
  const [currentJournal, setCurrentJournal] = useState(0)
  const [currentPromptText, setCurrentPromptText] = useState('')
  const audioContextRef = useRef<AudioContext | null>(null)

  const initAudio = () => { if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)() }
  const playAmbientStrings = () => {
    initAudio(); const audioContext = audioContextRef.current; if (!audioContext) return;
    const now = audioContext.currentTime;
    const playSound = (freq: number, startTime: number, duration: number, volume: number) => {
      const osc = audioContext.createOscillator(); const gain = audioContext.createGain();
      osc.connect(gain); gain.connect(audioContext.destination); osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, startTime); gain.gain.linearRampToValueAtTime(volume * 0.3, startTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration - 0.3); osc.start(startTime); osc.stop(startTime + duration);
    };
    const notes = [220, 277, 329]; notes.forEach((freq, i) => { playSound(freq, now + i * 0.3, 3, 0.08); });
  }

  const shuffleManifest = () => { const next = (currentManifest + 1) % manifestPrompts.length; setCurrentManifest(next); setCurrentPromptText(manifestPrompts[next].text) }
  const shuffleJournal = () => { const next = (currentJournal + 1) % journalPrompts.length; setCurrentJournal(next); setCurrentPromptText(journalPrompts[next]) }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const result = await window.dataSdk?.create({ entry_type: 'journal', prompt: currentPromptText, content: journalText, category: 'general', created_at: new Date().toISOString() })
    if (result?.isOk) { setJournalText('') }
  }

  useEffect(() => {
    if (!started) return;
    shuffleManifest(); shuffleJournal();
    playAmbientStrings()
    // @ts-ignore
    window.dataSdk?.init({ onDataChanged: (data) => setAllEntries(data) })
  }, [started])

  const tabs = [
    {id: 'manifest', label: 'Manifest'}, {id: 'journal', label: 'Journal'}, {id: 'writings', label: 'My Writings'}
  ]

  return (
    <>
      <style>{`body { font-family: 'Alegreya', serif; background: rgb(253, 248, 243); }.heading-font { font-family: 'Playfair Display', serif; }.tab-active { border-bottom: 3px solid #b45309; color: #b45309!important; }.tab-btn { transition: all 0.2s; }.tab-panel { display: none; }.tab-panel.active { display: block; }`}</style>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

      {!started? (
        <div className="relative overflow-hidden flex-1 flex-col h-screen">
          <img className="absolute inset-0 w-full h-full object-cover" src="https://images.pexels.com/photos/1661296/pexels-photo-1661296.jpeg?auto=compress&cs=tinysrgb&w=1280" alt="sunset"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
          <div className="relative z-10 flex-col items-center justify-center text-center px-6 h-full">
            <h1 className="heading-font text-white drop-shadow-lg mb-3 text-[48px] font-bold">Become Your Own Lover</h1>
            <button onClick={() => {setStarted(true); playAmbientStrings()}} className="px-8 py-3 bg-amber-700 text-white font-semibold rounded-lg">Start Your Journey</button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex-col bg-gradient-to-b from-stone-50 to-amber-50 min-h-screen">
          <header className="bg-white border-b border-stone-200">
            <div className="max-w-5xl mx-auto px-4 py-4">
              <h1 className="heading-font text-xl font-bold text-stone-900">Become Your Own Lover</h1>
            </div>
          </header>
          <nav className="bg-white border-b border-stone-200">
            <div className="max-w-5xl mx-auto px-4 flex space-x-6">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-btn py-4 px-1 text-sm font-medium ${activeTab === tab.id? 'tab-active text-amber-700' : 'text-stone-600'}`}>{tab.label}</button>
              ))}
            </div>
          </nav>
          <main className="max-w-5xl mx-auto px-4 py-6 flex-1">
            <div className={`tab-panel ${activeTab === 'manifest'? 'active' : ''}`}>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="heading-font text-2xl mb-4">Daily Manifestation</h2>
                <p className="mb-4 italic">"{manifestPrompts[currentManifest].text}"</p>
                <button onClick={shuffleManifest} className="px-4 py-2 bg-amber-700 text-white rounded-lg">Shuffle</button>
              </div>
            </div>
            <div className={`tab-panel ${activeTab === 'journal'? 'active' : ''}`}>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="heading-font text-2xl mb-4">Sacred Journal</h2>
                <p className="mb-2 italic">"{journalPrompts[currentJournal]}"</p>
                <form onSubmit={handleSave}>
                  <textarea value={journalText} onChange={(e) => setJournalText(e.target.value)} className="w-full border rounded-lg p-3 mb-4 h-40" />
                  <button type="submit" className="px-4 py-2 bg-amber-700 text-white rounded-lg">Save Entry</button>
                </form>
                <button onClick={shuffleJournal} className="mt-2 text-sm text-amber-700">New Prompt</button>
              </div>
            </div>
            <div className={`tab-panel ${activeTab === 'writings'? 'active' : ''}`}>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="heading-font text-2xl mb-4">My Writings</h2>
                {allEntries.length === 0? <p>No entries yet.</p> : allEntries.map((entry, i) => <div key={i} className="border-b py-3">{entry.content}</div>)}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  )
}
