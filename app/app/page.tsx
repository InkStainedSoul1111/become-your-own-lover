'use client'
import { useState } from 'react'

export default function FullApp() {
  const [showJournal, setShowJournal] = useState(false)

  return (
    <div style={{fontFamily: 'Georgia, serif', background: '#f7f3ef', minHeight: '100vh'}}>
      
      {/* HEADER like your photo */}
      <div style={{background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)', backgroundSize: 'cover', color: 'white', textAlign: 'center', padding: '80px 20px'}}>
        <h1 style={{fontSize: '48px', margin: '0'}}>Become Your Own Lover</h1>
        <p style={{fontSize: '18px', marginTop: '10px'}}>Discover who you are. Dare to chase your dreams. Fall in love with your own life.</p>
      </div>

      {/* TABS like your photo */}
      <div style={{display: 'flex', gap: '30px', padding: '20px 40px', borderBottom: '2px solid #e5ddd5', overflowX: 'auto'}}>
        <span style={{borderBottom: '3px solid #b03052', paddingBottom: '8px', fontWeight: 'bold', color: '#b03052'}}>Manifest</span>
        <span style={{color: '#555'}}>Motivate</span>
        <span style={{color: '#555'}}>Journal</span>
        <span style={{color: '#555'}}>Fitness</span>
        <span style={{color: '#555'}}>Food</span>
        <span style={{color: '#555'}}>Self Care</span>
      </div>

      {/* CONTENT CARD like your photo */}
      <div style={{padding: '40px', maxWidth: '900px', margin: '0 auto'}}>
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" style={{width: '100%', borderRadius: '12px', marginBottom: '20px'}}/>
        
        <h2 style={{fontSize: '32px', color: '#4a3b2a'}}>Full Prompt Library</h2>
        <p style={{color: '#666'}}>Speak your truth into existence. Let these prompts anchor you in your power.</p>

        <div style={{background: 'white', padding: '25px', borderRadius: '12px', marginTop: '20px', fontSize: '18px', lineHeight: '2'}}>
          <p>1. "What would I do today if I truly loved myself?"</p>
          <p>2. "Where am I abandoning myself, and how can I come back?"</p>
          <p>3. "What boundary do I need to set with love?"</p>
          <p>4. "What is my body asking me for right now?"</p>
          <p>5. "What would love say to me in this moment?"</p>
        </div>

        <button 
          onClick={() => setShowJournal(true)}
          style={{padding: '14px 28px', marginTop: '30px', background: '#b03052', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer'}}>
          Journal Now
        </button>

        {showJournal && (
          <textarea placeholder="Dear me..." style={{width: '100%', height: '200px', marginTop: '20px', padding: '15px', borderRadius: '8px', border: '2px solid #b03052'}}/>
        )}
      </div>
    </div>
  )
}
