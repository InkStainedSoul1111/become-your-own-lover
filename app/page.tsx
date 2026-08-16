"use client"
import { useState } from 'react'

export default function App() {
  const [activeTab, setActiveTab] = useState('Manifest')
  const [index, setIndex] = useState(0)

  const data = {
    Manifest: [
      {text:"I am worthy of deep, unconditional love — starting with my own.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"},
      {text:"My heart is open to receiving all the love I deserve."}
    ],
    Motivate: [
      {text:"What small act of self-love will you do today?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"},
      {text:"You are exactly where you need to be."}
    ],
    "Music/Dance": [
      {text:"What song makes your soul remember who you are?"},
      {text:"Move your body like it’s praying."}
    ],
    Nature: [
      {text:"How does nature reflect the beauty you carry inside?", img:"https://images.pexels.com/photos/3608263/pexels-photo-3608263.jpeg"},
      {text:"Be like water. Flow."}
    ],
    Fitness: [
      {text:"What does your body want to express through movement today?"},
      {text:"Your body is your home. Treat it kindly."}
    ],
    Food: [
      {text:"What does it mean to nourish yourself with love?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"},
      {text:"Eat like you love yourself."}
    ],
    Selfcare: [
      {text:"What self-care ritual makes you feel most loved?", img:"https://images.pexels.com/photos/40568/melancholy-rain-drop-nature-40568.jpeg"},
      {text:"Rest is productive too."}
    ],
    Rituals: [
      {text:"What ritual would make you feel most connected to yourself?"},
      {text:"Light a candle for yourself tonight."}
    ]
  }

  const tabs = Object.keys(data)
  const currentPrompts = data[activeTab as keyof typeof data]
  const currentPrompt = currentPrompts[index % currentPrompts.length]

  const nextPrompt = () => setIndex(index + 1)

  return (
    <div style={{background: '#faf8f3', minHeight: '100vh', fontFamily: 'serif', color: '#333', padding: '40px 20px'}}>
      <div style={{maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{fontSize: '36px', fontWeight: '400', marginBottom: '30px'}}>Become Your Own Lover</h1>
        
        <div style={{display: 'flex', gap: '30px', borderBottom: '1px solid #ddd', marginBottom: '30px', flexWrap: 'wrap'}}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => {setActiveTab(tab); setIndex(0)}}
              style={{
                background: 'none', 
                border: 'none', 
                fontSize: '16px', 
                padding: '10px 0', 
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '2px solid #c49a6c' : '2px solid transparent',
                color: activeTab === tab ? '#000' : '#666'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          <h2 style={{fontSize: '24px', fontWeight: '400', marginBottom: '20px'}}>{activeTab}</h2>
          {currentPrompt.img && (
            <img src={currentPrompt.img} style={{width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px'}} alt="" />
          )}
          <p style={{fontSize: '18px', fontStyle: 'italic', marginBottom: '30px'}}>"{currentPrompt.text}"</p>
          <button 
            onClick={nextPrompt}
            style={{background: '#c49a6c', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px'}}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
