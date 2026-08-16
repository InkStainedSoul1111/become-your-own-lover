"use client"
import { useState, useEffect } from 'react'

export default function App() {
  const [activeTab, setActiveTab] = useState('Manifest')
  const [index, setIndex] = useState(0)
  const [journalText, setJournalText] = useState('')
  const [entries, setEntries] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('byol-journal')
    if(saved) setEntries(JSON.parse(saved))
  }, [])

  const saveEntry = () => {
    if(journalText.trim()) {
      const newEntries = [{text: journalText, date: new Date().toLocaleString()}, ...entries]
      setEntries(newEntries)
      localStorage.setItem('byol-journal', JSON.stringify(newEntries))
      setJournalText('')
    }
  }

  const data = {
    Manifest: [
      {text:"I am worthy of deep, unconditional love — starting with my own.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"},
      {text:"I am my own safe place."}
    ],
    Motivate: [
      {text:"What small act of self-love will you do today?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"},
      {text:"You are allowed to take up space."}
    ],
    "Music/Dance": [
      {text:"What song makes your soul remember who you are?"},
      {text:"Let your body pray."}
    ],
    Nature: [
      {text:"How does nature reflect the beauty you carry inside?", img:"https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg"},
      {text:"You are earth and sky."}
    ],
    Fitness: [
      {text:"What does your body want to express through movement today?"},
      {text:"Move in ways that feel like love."}
    ],
    Food: [
      {text:"What does it mean to nourish yourself with love?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"},
      {text:"Nourish yourself like you would your child."}
    ],
    Selfcare: [
      {text:"What self-care ritual makes you feel most loved?", img:"https://images.pexels.com/photos/40568/melancholy-rain-drop-nature-40568.jpeg"},
      {text:"Rest is resistance. Rest is love."}
    ],
    Rituals: [
      {text:"What ritual would make you feel most connected to yourself?"},
      {text:"Light a candle and tell yourself the truth."}
    ],
    Journal: []
  }

  const tabs = Object.keys(data)
  const currentPrompts = data[activeTab as keyof typeof data]
  const currentPrompt = currentPrompts[index % currentPrompts.length]

  return (
    <div style={{background: '#faf8f3', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#333', padding: '40px 20px'}}>
      <div style={{maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{fontSize: '40px', fontWeight: '400', marginBottom: '30px', letterSpacing: '1px'}}>Become Your Own Lover</h1>
        
        <div style={{display: 'flex', gap: '30px', borderBottom: '1px solid #d4c5a4', marginBottom: '30px', flexWrap: 'wrap'}}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => {setActiveTab(tab); setIndex(0)}}
              style={{background: 'none', border: 'none', fontSize: '16px', padding: '10px 0', cursor: 'pointer',
              borderBottom: activeTab === tab ? '3px solid #c49a6c' : '3px solid transparent',
              color: activeTab === tab ? '#000' : '#777', fontWeight: activeTab === tab ? '600' : '400'}}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab !== 'Journal' ? (
          <div>
            <h2 style={{fontSize: '28px', fontWeight: '400', marginBottom: '20px'}}>{activeTab}</h2>
            {currentPrompt.img && <img src={currentPrompt.img} style={{width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px'}} alt="" />}
            <p style={{fontSize: '20px', fontStyle: 'italic', marginBottom: '30px', lineHeight: '1.6'}}>"{currentPrompt.text}"</p>
            <button onClick={() => setIndex(index + 1)} style={{background: '#c49a6c', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px'}}>Next Prompt</button>
          </div>
        ) : (
          <div>
            <h2 style={{fontSize: '28px', fontWeight: '400', marginBottom: '20px'}}>Journal</h2>
            <textarea value={journalText} onChange={e => setJournalText(e.target.value)}
              style={{width: '100%', height: '200px', padding: '20px', border: '1px solid #d4c5a4', borderRadius: '8px', fontFamily: 'Georgia, serif', fontSize: '16px', background: 'white'}}
              placeholder="Write to yourself with love..." />
            <button onClick={saveEntry} style={{background: '#c49a6c', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '6px', cursor: 'pointer', marginTop: '16px', fontSize: '16px'}}>Save Entry</button>
            <div style={{marginTop: '30px'}}>
              {entries.map((entry, i) => (
                <div key={i} style={{background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #eee'}}>
                  <p style={{fontSize: '12px', color: '#888', marginBottom: '8px'}}>{entry.date}</p>
                  <p style={{fontSize: '16px', lineHeight: '1.6'}}>{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
