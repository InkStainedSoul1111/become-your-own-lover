'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Manifest');
  const [ink, setInk] = useState('');
  const [allEntries, setAllEntries] = useState([]);

  // Load saved entries
  useEffect(() => {
    const saved = localStorage.getItem('byolWritings');
    if(saved) setAllEntries(JSON.parse(saved));
  }, []);

  // Save entries
  useEffect(() => {
    localStorage.setItem('byolWritings', JSON.stringify(allEntries));
  }, [allEntries]);

  const prompts = [
    "What truth are you hiding from yourself today?",
    "Write the letter you never sent.",
    "If your soul had ink, what would it spill?",
    "What part of you deserves love right now?",
    "Describe the version of yourself you are becoming."
  ];
  const randomPrompt = prompts[Math.floor(Math.random()*prompts.length)];

  const handleSave = () => {
    if(ink.trim() === '') return;
    setAllEntries([{prompt: randomPrompt, entry: ink, date: new Date().toLocaleDateString()},...allEntries]);
    setInk('');
  };

  const tabs = ['Manifest', 'Motivate', 'Music', 'Nature', 'Fitness', 'Food', 'Selfcare', 'Rituals', 'Journal', 'Writings'];

  return (
    <main style={{fontFamily: 'serif', background: '#fdfaf5', minHeight: '100vh', color: '#3e2723'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '20px'}}>
        <h1 style={{textAlign: 'center', fontSize: '40px', marginBottom: '10px'}}>Become Your Own Lover</h1>
        
        {/* NAV */}
        <nav style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', borderBottom: '2px solid #e8dfd0', paddingBottom: '16px', marginBottom: '32px'}}>
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                color: activeTab === tab? '#8d6e63' : '#5d4037',
                borderBottom: activeTab === tab? '3px solid #8d6e63' : '3px solid transparent',
                paddingBottom: '8px',
                fontFamily: 'serif'
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* CONTENT */}
        <div>
          {activeTab === 'Writings' && (
            <div style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070)', // stormy window
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '40px 20px',
              borderRadius: '12px'
            }}>
              <div style={{
                maxWidth: '800px', 
                margin: '0 auto', 
                background: 'url(https://www.transparenttextures.com/patterns/old-paper.png), #f5f1e6',
                padding: '40px', 
                borderRadius: '8px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                border: '1px solid #d4c8a8'
              }}>
                <h2 style={{color: '#3e2723', textAlign: 'center', fontSize: '36px', marginBottom: '8px'}}>My Writings</h2>
                <p style={{color: '#5d4037', textAlign: 'center', fontStyle: 'italic', marginBottom: '32px'}}>🪶 Where your truth becomes ink</p>
                
                <div style={{marginBottom: '40px'}}>
                  <p style={{color: '#4e342e', fontWeight: 'bold', marginBottom: '12px'}}>🪶 {randomPrompt}</p>
                  <textarea 
                    value={ink} 
                    onChange={(e)=>setInk(e.target.value)} 
                    placeholder="Let the ink flow from your heart..." 
                    style={{
                      width: '100%', 
                      minHeight: '200px', 
                      padding: '16px', 
                      border: '2px solid #8d6e63', 
                      borderRadius: '4px', 
                      fontFamily: 'serif', 
                      fontSize: '16px', 
                      background: 'rgba(255,253,248,0.9)',
                      backgroundImage: 'linear-gradient(#e8dfd0 1px, transparent 1px)',
                      backgroundSize: '100% 28px',
                      lineHeight: '28px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button 
                    onClick={handleSave} 
                    style={{
                      marginTop: '16px', 
                      padding: '14px 28px', 
                      background: '#8d6e63', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      fontSize: '16px', 
                      cursor: 'pointer', 
                      fontFamily: 'serif'
                    }}
                  >
                    Seal with Ink
                  </button>
                </div>

                <div>
                  {allEntries.length === 0? (
                    <p style={{color:'#5d4037',fontStyle:'italic', textAlign: 'center'}}>Your sacred words will appear here like ink on parchment...</p>
                  ) : (
                    allEntries.map((e,i)=> (
                      <div key={i} style={{
                        borderLeft:'4px solid #8d6e63',
                        padding:'20px 0 20px 20px',
                        marginBottom:'24px',
                        background:'rgba(255,255,255,0.7)',
                        borderRadius: '0 8px 8px 0'
                      }}>
                        <p style={{fontStyle:'italic',color:'#6d4c41',fontSize:'14px', marginBottom: '8px'}}>🪶 {e.prompt} • {e.date}</p>
                        <p style={{color: '#3e2723', lineHeight: '1.8', whiteSpace: 'pre-wrap'}}>{e.entry}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Journal' && (
            <div>
              <h2>Journal</h2>
              <p>"The highest form of love is to be the version of yourself you are becoming."</p>
              <p>Your journal entries go here...</p>
            </div>
          )}

          {activeTab!== 'Writings' && activeTab!== 'Journal' && (
            <div>
              <h2>{activeTab}</h2>
              <p>Content for {activeTab} coming soon. This is your sacred space, *Sue Ellen* 💚</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
