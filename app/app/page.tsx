'use client'
import { useState } from 'react'

const tabs = [
  {name: 'Fitness', content: 'Move your body with love. Honor it with joy.'},
  {name: 'Food', content: 'Nourish yourself like you love you.'},
  {name: 'Self Care', content: 'Rest is productive. Softness is strength.'},
  {name: 'Nature', content: 'Go outside. Let the earth hold you.'},
  {name: 'Music & Dance', content: 'Put on a song. Move how your body wants.'},
  {name: 'Rituals', content: 'Light a candle. Breathe. Call yourself back home.'},
  {name: 'My Writings', content: 'This is where your poems and letters live.'},
  {name: 'Manifest', content: 'My body is a sacred vessel. I honor it with movement that feels like joy.'},
  {name: 'Journal', content: 'Dear me...'}
]

export default function FullApp() {
  const [activeTab, setActiveTab] = useState('Manifest')
  const [showJournal, setShowJournal] = useState(false)
  const currentTab = tabs.find(t => t.name === activeTab)

  return (
    <div style={{fontFamily: 'Georgia, serif', background: '#f7f3ef', minHeight: '100vh'}}>
      
      {/* HEADER */}
      <div style={{background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)', backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', textAlign: 'center', padding: '80px 20px'}}>
        <h1 style={{fontSize: '48px', margin: '0'}}>Become Your Own Lover</h1>
        <p style={{fontSize: '18px', marginTop: '10px'}}>Discover who you are. Dare to chase your dreams. Fall in love with your own life.</p>
      </div>

      {/* CLICKABLE TABS */}
      <div style={{display: 'flex', gap: '30px', padding: '20px 40px', borderBottom: '2px solid #e5ddd5', overflowX: 'auto'}}>
        {tabs.map(tab => (
          <span 
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            style={{
              cursor: 'pointer', 
              paddingBottom: '8px', 
              fontWeight: activeTab === tab.name ? 'bold' : 'normal',
              color: activeTab === tab.name ? '#b03052' : '#555',
              borderBottom: activeTab === tab.name ? '3px solid #b03052' : 'none',
              whiteSpace: 'nowrap'
            }}>
            {tab.name}
          </span>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{padding: '40px', maxWidth: '900px', margin: '0 auto'}}>
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" style={{width: '100%', borderRadius: '12px', marginBottom: '20px'}}/>
        
        <h2 style={{fontSize: '32px', color: '#4a3b2a'}}>{activeTab}</h2>
        <p style={{color: '#666'}}>Speak your truth into existence. Let these anchor you in your power.</p>

        <div style={{background: 'white', padding: '25px', borderRadius: '12px', marginTop: '20px', fontSize: '18px', lineHeight: '2'}}>
          <p>{currentTab?.content}</p>
        </div>

        <button 
          onClick={() => setShowJournal(!showJournal)}
          style={{padding: '14px 28px', marginTop: '30px', background: '#b03052', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer'}}>
          Write
        </button>

        {showJournal && (
          <textarea placeholder="Dear me..." style={{width: '100%', height: '200px', marginTop: '20px', padding: '15px', borderRadius: '8px', border: '2px solid #b03052'}}/>
        )}
      </div>
    </div>
  )
}
