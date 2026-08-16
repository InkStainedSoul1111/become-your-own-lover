'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [ink, setInk] = useState('');
  const [allEntries, setAllEntries] = useState<{prompt:string,entry:string}[]>([]);

  // Load saved entries when page opens
  useEffect(() => {
    const saved = localStorage.getItem('inkStainedEntries');
    if(saved) setAllEntries(JSON.parse(saved));
  }, []);

  // Save entries when they change
  useEffect(() => {
    localStorage.setItem('inkStainedEntries', JSON.stringify(allEntries));
  }, [allEntries]);

  const prompts = [
    "What truth are you hiding from yourself today?",
    "Write the letter you never sent.",
    "If your soul had ink, what would it spill?"
  ];
  const randomPrompt = prompts[Math.floor(Math.random()*prompts.length)];

  const handleSave = () => {
    if(!ink.trim()) return;
    setAllEntries([...allEntries, {prompt: randomPrompt, entry: ink}]);
    setInk('');
  };

  return (
    <main style={{background: 'linear-gradient(135deg, #2c1810, #4e342e)', minHeight: '100vh', padding: '40px', fontFamily: 'serif'}}>
      <div style={{maxWidth: '800px', margin: '0 auto', background: 'rgba(245,241,230,0.95)', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'}}>
        <h1 style={{color: '#3e2723', textAlign: 'center', marginBottom: '8px', fontSize: '48px'}}>Ink Stained</h1>
        <p style={{color: '#5d4037', textAlign: 'center', fontStyle: 'italic', marginBottom: '32px', fontSize: '18px'}}>Where your truth becomes ink</p>
        
        <div style={{background: 'rgba(141,110,99,0.15)', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #8d6e63'}}>
          <p style={{color: '#4e342e', fontWeight: 'bold', marginBottom: '16px', fontSize: '16px'}}>🪶 {randomPrompt}</p>
          <textarea 
            value={ink} 
            onChange={(e)=>setInk(e.target.value)} 
            placeholder="Let the ink flow..." 
            style={{width: '100%', minHeight: '180px', padding: '16px', border: '2px solid #8d6e63', borderRadius: '8px', fontFamily: 'serif', fontSize: '16px', background: '#fffdf8', boxSizing: 'border-box'}}
          />
          <button 
            onClick={handleSave} 
            style={{marginTop: '16px', padding: '14px 28px', background: '#8d6e63', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'}}
          >
            Seal with Ink
          </button>
        </div>

        <div>
          <h2 style={{color: '#3e2723', borderBottom: '3px solid #8d6e63', paddingBottom: '12px', marginBottom: '20px'}}>Your Sacred Entries</h2>
          {allEntries.length === 0? (
            <p style={{color:'#5d4037',fontStyle:'italic', textAlign: 'center'}}>Your sacred words will appear here like ink on parchment...</p>
          ) : (
            allEntries.map((e,i)=> (
              <div key={i} style={{borderLeft:'4px solid #8d6e63',padding:'20px 0 20px 20px',marginBottom:'20px',background:'rgba(255,255,255,0.9)', borderRadius: '0 8px 8px 0'}}>
                <p style={{fontStyle:'italic',color:'#6d4c41',fontSize:'14px', marginBottom: '8px'}}>🪶 {e.prompt}</p>
                <p style={{color: '#3e2723', fontFamily: 'serif', lineHeight: '1.6'}}>{e.entry}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
