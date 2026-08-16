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
    <main style={{fontFamily: 'serif', minHeight: '100vh'}}>
      {/* YOUR ORIGINAL SUNSET BACKGROUND STAYS HERE */}
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '20px'}}>
        <h1 style={{textAlign: 'center', fontSize: '40px', marginBottom: '10px'}}>Become Your Own Lover</h1>

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
                paddingBottom: '8px'
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div>
          {/* YOUR ORIGINAL TABS GO HERE - Manifest, Motivate, Music, etc */}
          {activeTab === 'Manifest' && <div><h2>Manifest</h2><p>Your original manifest content goes here</p></div>}
          {activeTab === 'Motivate' && <div><h2>Motivate</h2><p>Your original motivate content goes here</p></div>}
          {activeTab === 'Music' && <div><h2>Music</h2><p>Your original music content goes here</p></div>}
          {/*... keep all your other original tabs here... */}

          {/* NEW: JOURNAL TAB */}
          {activeTab === 'Journal' && (
            <div style={{background: 'rgba(245,241,230,0.95)', padding: '40px', borderRadius: '12px'}}>
              <h2>Journal</h2>
              <p>"The highest form of love is to be the version of yourself you are becoming."</p>
              <p>Your journal space, *Sue Ellen* 💚</p>
            </div>
          )}

          {/* NEW: WRITINGS TAB - INK STAINED */}
          {activeTab === 'Writings' && (
            <div style={{background: 'rgba(245,241,230,0.95)', padding: '40px', borderRadius: '12px'}}>
              <h2 style={{textAlign: 'center', fontSize: '36px'}}>My Writings</h2>
              <p style={{textAlign: 'center', fontStyle: 'italic'}}>🪶 Where your truth becomes ink</p>
              
              <div style={{marginBottom: '40px'}}>
                <p style={{fontWeight: 'bold'}}>🪶 {randomPrompt}</p>
                <textarea 
                  value={ink} 
                  onChange={(e)=>setInk(e.target.value)} 
                  placeholder="Let the ink flow..." 
                  style={{width: '100%', minHeight: '200px', padding: '16px', border: '2px solid #8d6e63', borderRadius: '4px', fontFamily: 'serif'}}
                />
                <button onClick={handleSave} style={{marginTop: '16px', padding: '14px 28px', background: '#8d6e63', color: 'white', border: 'none', borderRadius: '4px'}}>
                  Seal with Ink
                </button>
              </div>

              <div>
                {allEntries.length === 0? (
                  <p style={{fontStyle:'italic'}}>Your sacred words will appear here...</p>
                ) : (
                  allEntries.map((e,i)=> (
                    <div key={i} style={{borderLeft:'4px solid #8d6e63', padding:'20px', marginBottom:'24px', background:'rgba(255,255,255,0.9)'}}>
                      <p style={{fontStyle:'italic',fontSize:'14px'}}>🪶 {e.prompt} • {e.date}</p>
                      <p style={{whiteSpace: 'pre-wrap'}}>{e.entry}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
