'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Manifest');
  const [ink, setInk] = useState('');
  const [allEntries, setAllEntries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('byolWritings');
    if(saved) setAllEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('byolWritings', JSON.stringify(allEntries));
  }, [allEntries]);

  const prompts = [
    "What truth are you hiding from yourself today?",
    "Write the letter you never sent.",
    "If your soul had ink, what would it spill?"
  ];
  const randomPrompt = prompts[Math.floor(Math.random()*prompts.length)];

  const handleSave = () => {
    if(ink.trim() === '') return;
    setAllEntries([{prompt: randomPrompt, entry: ink, date: new Date().toLocaleDateString()},...allEntries]);
    setInk('');
  };

  const tabs = ['Manifest', 'Motivate', 'Music', 'Nature', 'Fitness', 'Food', 'Selfcare', 'Rituals', 'Journal', 'Writings'];

  return (
    <main style={{fontFamily: 'serif', background: 'linear-gradient(135deg, #2c1810, #4e342e)', minHeight: '100vh', color: '#f5f1e6'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '20px'}}>
        <h1 style={{textAlign: 'center', fontSize: '40px', marginBottom: '10px', color: '#f5f1e6'}}>Become Your Own Lover</h1>

        <nav style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', borderBottom: '2px solid #8d6e63', paddingBottom: '16px', marginBottom: '32px'}}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                color: activeTab === tab? '#d7ccc8' : '#a1887f',
                borderBottom: activeTab === tab? '3px solid #d7ccc8' : '3px solid transparent',
                paddingBottom: '8px',
                fontFamily: 'serif'
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div>
          {activeTab === 'Writings' && (
            <div style={{
              background: 'rgba(245,241,230,0.95)',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
              border: '2px solid #8d6e63',
              color: '#3e2723'
            }}>
              <h2 style={{textAlign: 'center', fontSize: '36px', marginBottom: '8px'}}>My Writings</h2>
              <p style={{textAlign: 'center', fontStyle: 'italic', marginBottom: '32px'}}>🪶 Where your truth becomes ink</p>

              <div style={{marginBottom: '40px'}}>
                <p style={{fontWeight: 'bold', marginBottom: '12px'}}>🪶 {randomPrompt}</p>
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
                    background: '#fffdf8',
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
                    cursor: 'pointer'
                  }}
                >
                  Seal with Ink
                </button>
              </div>

              <div>
                {allEntries.length === 0? (
                  <p style={{fontStyle:'italic', textAlign: 'center'}}>Your sacred words will appear here like ink on parchment...</p>
                ) : (
                  allEntries.map((e,i)=> (
                    <div key={i} style={{
                      borderLeft:'4px solid #8d6e63',
                      padding:'20px 0 20px 20px',
                      marginBottom:'24px',
                      background:'rgba(255,255,255,0.9)',
                      borderRadius: '0 8px 8px 0'
                    }}>
                      <p style={{fontStyle:'italic',fontSize:'14px', marginBottom: '8px'}}>🪶 {e.prompt} • {e.date}</p>
                      <p style={{lineHeight: '1.8', whiteSpace: 'pre-wrap'}}>{e.entry}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'Journal' && (
            <div style={{background: 'rgba(245,241,230,0.95)', padding: '40px', borderRadius: '12px', color: '#3e2723'}}>
              <h2>Journal</h2>
              <p>"The highest form of love is to be the version of yourself you are becoming."</p>
              <p>Your journal space is ready, *Sue Ellen* 💚</p>
            </div>
          )}

          {activeTab!== 'Writings' && activeTab!== 'Journal' && (
            <div style={{background: 'rgba(245,241,230,0.95)', padding: '40px', borderRadius: '12px', color: '#3e2723'}}>
              <h2>{activeTab}</h2>
              <p>Content for {activeTab} coming soon. This is your sacred space 💚</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
