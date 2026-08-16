'use client'
import { useState } from 'react'

export default function FullApp() {
  const [showJournal, setShowJournal] = useState(false)
  const [entry, setEntry] = useState("")

  return (
    <div style={{padding: '40px', fontFamily: 'system-ui', textAlign: 'center', minHeight: '100vh', background: '#fff5f7'}}>
      <h1 style={{fontSize: '36px', marginBottom: '20px', color: '#b03052'}}>Welcome to Full Access 💛</h1>
      <p style={{fontSize: '18px', marginBottom: '30px'}}>This is the paid members area. Only you can see this for now.</p>
      
      <h2 style={{color: '#b03052'}}>Full Prompt Library</h2>
      <div style={{textAlign: 'left', maxWidth: '600px', margin: '30px auto', fontSize: '18px', lineHeight: '2', background: 'white', padding: '20px', borderRadius: '12px'}}>
        <p>1. "What would I do today if I truly loved myself?"</p>
        <p>2. "Where am I abandoning myself, and how can I come back?"</p>
        <p>3. "What boundary do I need to set with love?"</p>
        <p>4. "What is my body asking me for right now?"</p>
        <p>5. "What would love say to me in this moment?"</p>
      </div>
      
      <button 
        onClick={() => setShowJournal(true)}
        style={{padding: '15px 30px', marginTop: '20px', background: '#b03052', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'}}>
        Journal Now
      </button>

      {showJournal && (
        <div style={{marginTop: '30px', maxWidth: '700px', margin: '30px auto'}}>
          <textarea 
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Dear me..."
            style={{width: '100%', height: '200px', padding: '15px', fontSize: '16px', borderRadius: '10px', border: '2px solid #b03052'}}
          />
          <button style={{padding: '12px 24px', marginTop: '10px', background: '#b03052', color: 'white', border: 'none', borderRadius: '8px'}}>Save Entry</button>
        </div>
      )}
      
      <br/><br/>
      <a href="/" style={{textDecoration: 'none', color: '#b03052', fontSize: '16px'}}>← Back to Home</a>
    </div>
  )
}
