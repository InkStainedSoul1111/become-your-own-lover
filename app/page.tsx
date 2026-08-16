"use client"
import { useState, useRef } from 'react'

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
    "Music/Dance": [
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
    const currentData = data[activeTab as keyof typeof data]
    setIndex({...index, [activeTab]: (index[activeTab] + 1) % currentData.length})
    if(musicPlaying) playSound()
  }

  const saveEntry = () => {
    if(journalText.trim()) {
      setAllEntries([...allEntries, {text: journalText, date: new Date().toLocaleDateString()}])
      setJournalText('')
    }
  }

  const styles = {
    page: {minHeight: '100vh', background: 'linear-gradient(to bottom right, #7c2d12, #9d174d, #881337)', color: 'white', padding: '20px', fontFamily: 'system-ui'},
    container: {maxWidth: '800px', margin: '0 auto'},
    title: {fontSize: '48px', fontWeight: 'bold', textAlign: 'center' as const, marginBottom: '16px'},
    subtitle: {fontSize: '20px', textAlign: 'center' as const, marginBottom: '32px', opacity: 0.9},
    button: {background: '#ea580c', color: 'white', padding: '16px 32px', borderRadius: '50px', fontSize: '20px', fontWeight: '600', border: 'none', cursor: 'pointer', display: 'block', margin: '0 auto'},
    tabs: {display: 'flex', flexWrap: 'wrap' as const, gap: '8px', marginBottom: '24px', justifyContent: 'center' as const},
    tab: {padding: '10px 16px', borderRadius: '50px', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', cursor: 'pointer', textTransform: 'capitalize' as const},
    tabActive: {background: '#ea580c'},
    card: {background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '32px', marginBottom: '16px'},
    img: {width: '100%', height: '256px', objectFit: 'cover' as const, borderRadius: '12px', marginBottom: '16px'},
    prompt: {fontSize: '24px', textAlign: 'center' as const, marginBottom: '24px'},
    textarea: {width: '100%', height: '160px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', padding: '16px', color: 'white', border: 'none', fontSize: '16px'},
    entry: {background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '8px'}
  }

  if(!started) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>Become Your Own Lover</h1>
          <p style={styles.subtitle}>A sacred space for self-connection and healing</p>
          <button style={styles.button} onClick={() => setStarted(true)}>
            Start Your Journey
          </button>
        </div>
      </div>
    )
  }

  const currentPrompt = data[activeTab as keyof typeof data][index[activeTab]]

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.tabs}>
          {Object.keys(data).map(tab => (
            <button
              key={tab}
              style={{...styles.tab,...(activeTab === tab? styles.tabActive : {})}}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={styles.card}>
          {activeTab!== 'journal'? (
            <>
              {currentPrompt?.img && <img src={currentPrompt.img} style={styles.img} alt="" />}
              <p style={styles.prompt}>{currentPrompt?.text}</p>
              <button style={{...styles.button, width: '100%'}} onClick={nextPrompt}>
                Next Prompt
              </button>
            </>
          ) : (
            <>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                style={styles.textarea}
                placeholder="Write to yourself with love..."
              />
              <button style={{...styles.button, width: '100%', marginTop: '16px'}} onClick={saveEntry}>
                Save Entry
              </button>
              <div style={{marginTop: '24px'}}>
                {allEntries.map((entry, i) => (
                  <div key={i} style={styles.entry}>
                    <p style={{fontSize: '12px', opacity: 0.7}}>{entry.date}</p>
                    <p>{entry.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          style={{...styles.button, width: '100%', background: 'rgba(255,255,255,0.2)'}}
          onClick={() => setMusicPlaying(!musicPlaying)}
        >
          {musicPlaying? '🔊 Sound On' : '🔇 Sound Off'}
        </button>
      </div>
    </div>
  )
}
