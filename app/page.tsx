'use client'
import { useState, useEffect } from 'react'

export default function App() {
  const [hasFullAccess, setHasFullAccess] = useState(false)
  const [promptsViewed, setPromptsViewed] = useState(0)
  const [activeTab, setActiveTab] = useState('home')
  const [showPaywall, setShowPaywall] = useState(false)
  const [allEntries, setAllEntries] = useState([])
  const [currentEntry, setCurrentEntry] = useState('')
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [mounted, setMounted] = useState(false)

  const data = {
    home: [
      {text: 'You are enough, exactly as you are.', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'},
      {text: 'Your journey to self-love starts with a single breath.', img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800'},
      {text: 'Today, choose yourself.', img: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800'}
    ],
    nature: [
      {text: 'Like the ocean, your depths are beautiful.', img: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'},
      {text: 'You are rooted and you can grow.', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'}
    ],
    fitness: [
      {text: 'Your body is your home. Honor it.', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'},
      {text: 'Strength is built one rep at a time.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800'}
    ],
    food: [
      {text: 'Nourishment is an act of self-love.', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800'},
      {text: 'Every meal is a chance to care for yourself.', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'}
    ],
    selfcare: [
      {text: 'Rest is productive.', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'},
      {text: 'You deserve peace.', img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800'}
    ],
    rituals: [
      {text: 'Small rituals create big changes.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'},
      {text: 'Your morning sets your day.', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800'}
    ]
  }

  const [index, setIndex] = useState({
    home: 0, nature: 0, fitness: 0, food: 0, selfcare: 0, rituals: 0
  })

  useEffect(() => {
    setMounted(true)
    if (window.location.search.includes('success=true')) {
      setHasFullAccess(true)
      window.history.replaceState({}, document.title, "/")
    }
    
    try {
      const unlocked = localStorage.getItem('byol_unlocked')
      const views = localStorage.getItem('byol_views')
      const entries = localStorage.getItem('byol_entries')
      if (unlocked === 'true') setHasFullAccess(true)
      if (views) setPromptsViewed(parseInt(views))
      if (entries) {
        const parsed = JSON.parse(entries)
        setAllEntries(Array.isArray(parsed)? parsed : [])
      }
    } catch (e) {
      console.log('localStorage corrupt, resetting...')
      localStorage.removeItem('byol_entries')
      localStorage.removeItem('byol_views')
      setAllEntries([])
      setPromptsViewed(0)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    try { 
      localStorage.setItem('byol_views', promptsViewed.toString()) 
    } catch (e) {
      console.log('localStorage save failed')
    }
  }, [promptsViewed, mounted])

  useEffect(() => {
    if (!mounted) return
    try { 
      localStorage.setItem('byol_entries', JSON.stringify(allEntries)) 
    } catch (e) {
      console.log('localStorage save failed')
    }
  }, [allEntries, mounted])
  const currentItem = data[activeTab]?.[index[activeTab]] || {text: 'Loading...', img: ''}

  const handleNext = () => {
    if (!hasFullAccess && promptsViewed >= 3) {
      setShowPaywall(true)
      return
    }
    const newIndex = (index[activeTab] + 1) % data[activeTab].length
    setIndex({...index, [activeTab]: newIndex})
    if (!hasFullAccess) setPromptsViewed(promptsViewed + 1)
  }

  const handleSave = () => {
    if (!currentEntry.trim()) return
    const newEntry = {
      id: Date.now(),
      text: currentEntry,
      prompt: currentItem.text,
      tab: activeTab,
      date: new Date().toLocaleDateString()
    }
    setAllEntries([newEntry,...allEntries])
    setCurrentEntry('')
  }

  const handlePurchase = async () => {
    try {
      const res = await fetch('/api/create-checkout', { method: 'POST' })
      const { url } = await res.json()
      window.location.href = url
    } catch (e) {
      alert('Purchase failed. Try again.')
    }
  }

  if (!mounted) return <div style={{background: '#000', height: '100vh'}}></div>

  if (showPaywall) {
    return (
      <div style={{background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui'}}>
        <div style={{maxWidth: '400px', textAlign: 'center'}}>
          <h1 style={{fontSize: '32px', marginBottom: '16px'}}>Continue Your Journey</h1>
          <p style={{color: '#aaa', marginBottom: '32px', lineHeight: '1.6'}}>You've viewed 3 prompts. Unlock unlimited access to all prompts and save your writings forever.</p>
          <button onClick={handlePurchase} style={{background: '#fff', color: '#000', border: 'none', padding: '16px 32px', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', width: '100%', marginBottom: '12px'}}>
            Buy Full Version $21.21
          </button>
          <button onClick={() => setShowPaywall(false)} style={{background: 'transparent', color: '#666', border: 'none', padding: '12px', cursor: 'pointer'}}>
            Maybe Later
          </button>
        </div>
      </div>
    )
  }

  if (selectedEntry) {
    return (
      <div style={{background: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'system-ui'}}>
        <button onClick={() => setSelectedEntry(null)} style={{background: '#222', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', marginBottom: '24px'}}>← Back</button>
        <div style={{maxWidth: '600px', margin: '0 auto'}}>
          <div style={{color: '#666', fontSize: '14px', marginBottom: '8px'}}>{selectedEntry.date} • {selectedEntry.tab}</div>
          <div style={{color: '#999', fontSize: '14px', marginBottom: '24px', fontStyle: 'italic'}}>"{selectedEntry.prompt}"</div>
          <div style={{fontSize: '18px', lineHeight: '1.8', whiteSpace: 'pre-wrap'}}>{selectedEntry.text}</div>
        </div>
      </div>
    )
  }

  if (activeTab === 'writings') {
    return (
      <div style={{background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'system-ui'}}>
        <div style={{display: 'flex', gap: '8px', padding: '16px', borderBottom: '1px solid #222', overflowX: 'auto'}}>
          {['home', 'writings', 'nature', 'fitness', 'food', 'selfcare', 'rituals'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab? '#fff' : '#111',
                color: activeTab === tab? '#000' : '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                whiteSpace: 'nowrap',
                fontWeight: activeTab === tab? 'bold' : 'normal'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div style={{padding: '24px', maxWidth: '600px', margin: '0 auto'}}>
          <h1 style={{fontSize: '28px', marginBottom: '24px'}}>Your Writings</h1>
          {allEntries.length === 0? (
            <p style={{color: '#666', textAlign: 'center', marginTop: '60px'}}>No entries yet. Your responses to prompts will appear here.</p>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {allEntries.map(entry => (
                <div 
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  style={{background: '#111', padding: '16px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #222'}}
                >
                  <div style={{color: '#666', fontSize: '12px', marginBottom: '4px'}}>{entry.date} • {entry.tab}</div>
                  <div style={{color: '#999', fontSize: '13px', marginBottom: '8px', fontStyle: 'italic'}}>"{entry.prompt}"</div>
                  <div style={{fontSize: '15px', lineHeight: '1.6', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>{entry.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'system-ui'}}>
      <div style={{display: 'flex', gap: '8px', padding: '16px', borderBottom: '1px solid #222', overflowX: 'auto'}}>
        {['home', 'writings', 'nature', 'fitness', 'food', 'selfcare', 'rituals'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab? '#fff' : '#111',
              color: activeTab === tab? '#000' : '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              fontWeight: activeTab === tab? 'bold' : 'normal'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div style={{position: 'relative', height: 'calc(100vh - 73px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {currentItem.img && (
          <img 
            src={currentItem.img} 
            alt="" 
            style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4}}
          />
        )}
        
        <div style={{position: 'relative', zIndex: 10, maxWidth: '600px', padding: '40px 20px', textAlign: 'center'}}>
          <p style={{fontSize: '24px', lineHeight: '1.6', marginBottom: '40px', textShadow: '0 2px 20px rgba(0,0,0,0.8)'}}>
            {currentItem.text}
          </p>
          
          <button 
            onClick={handleNext}
            style={{background: '#fff', color: '#000', border: 'none', padding: '16px 48px', fontSize: '18px', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', marginBottom: '32px'}}
          >
            Next
          </button>
          
          <div style={{background: 'rgba(0,0,0,0.6)', padding: '24px', borderRadius: '12px', backdropFilter: 'blur(10px)'}}>
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Write your response here..."
              style={{width: '100%', background: '#111', color: '#fff', border: '1px solid #333', padding: '12px', borderRadius: '8px', fontSize: '16px', minHeight: '100px', fontFamily: 'system-ui', resize: 'vertical'}}
            />
            <button 
              onClick={handleSave}
              style={{background: '#fff', color: '#000', border: 'none', padding: '12px 32px', fontSize: '16px', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', marginTop: '12px', width: '100%'}}
            >
              Save to Writings
            </button>
          </div>
          
          {!hasFullAccess && (
            <div style={{marginTop: '24px', color: '#666', fontSize: '14px'}}>
              {3 - promptsViewed} free prompts remaining
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
