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
      {text:"I am worthy of deep, unconditional love — starting with my own.", img:""},
      {text:"I choose me. Every single day."}
    ],
    Motivate: [
      {text:"What small act of self-love will you do today?", img:""},
      {text:"You are not behind. You are becoming."}
    ],
    "Music/Dance": [
      {text:"What song makes your soul remember who you are?"},
      {text:"Dance like your body is sacred."}
    ],
    Nature: [
      {text:"How does nature reflect the beauty you carry inside?", img:""},
      {text:"You are wild and rooted and free."}
    ],
    Fitness: [
      {text:"What does your body want to express through movement today?"},
      {text:"Strength is softness too."}
    ],
    Food: [
      {text:"What does it mean to nourish yourself with love?", img:""},
      {text:"Feed yourself like you love yourself."}
    ],
    Selfcare: [
      {text:"What self-care ritual makes you feel most loved?", img:""},
      {text:"You deserve rest without guilt."}
    ],
    Rituals: [
      {text:"What ritual would make you feel most connected to yourself?"},
      {text:"Create a ritual that feels like coming home to you."}
    ],
    Journal: []
  }

  const tabs = Object.keys(data)
  const currentPrompts = data[activeTab as keyof typeof data]
  const currentPrompt = currentPrompts[index % currentPrompts.length]

  return (
    <div style={{background: '#faf8f3', minHeight: '100vh', fontFamily: 'serif', color: '#333', padding: '40px 20px'}}>
      <div style={{maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{fontSize: '36px', fontWeight: '400', marginBottom: '30px'}}>Become Your Own Lover</h1>
        
        <div style={{display: 'flex', gap: '30px', borderBottom: '1px solid #ddd', marginBottom: '30px', flexWrap: 'wrap'}}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => {setActiveTab(tab); setIndex(0)}}
              style={{background: 'none', border: 'none', fontSize: '16px', padding: '10px 0', cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid #c49a6c' : '2px solid transparent',
              color: activeTab === tab ? '#000' : '#666'}}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab !== 'Journal' ? (
          <div>
            <h2 style={{fontSize: '24px', fontWeight: '400', marginBottom: '20px'}}>{activeTab}</h2>
            {currentPrompt.img && <img src={currentPrompt.img} style={{width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px'}} alt="" />}
            <p style={{fontSize: '18px', fontStyle: 'italic', marginBottom: '30px'}}>"{currentPrompt.text}"</p>
            <button onClick={() => setIndex(index + 1)} style={{background: '#c49a6c', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '4px', cursor: 'pointer'}}>Next</button>
          </div>
        ) : (
          <div>
            <h2 style={{fontSize: '24px', fontWeight: '400', marginBottom: '20px'}}>Journal</h2>
            <textarea value={journalText} onChange={e => setJournalText(e.target.value)}
              style={{width: '100%', height: '200px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'serif', fontSize: '16px'}}
              placeholder="Write to yourself with love..." />
            <button onClick={saveEntry} style={{background: '#c49a6c', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '4px', cursor: 'pointer', marginTop: '16px'}}>Save Entry</button>
            <div style={{marginTop: '30px'}}>
              {entries.map((entry, i) => (
                <div key={i} style={{background: 'white', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #eee'}}>
                  <p style={{fontSize: '12px', color: '#888', marginBottom: '8px'}}>{entry.date}</p>
                  <p>{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
