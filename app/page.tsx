'use client';
import { useState } from 'react';

export default function Home() {
  const [ink, setInk] = useState('');
  const [allEntries, setAllEntries] = useState<{prompt:string,entry:string}[]>([]);

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
    <main style={{background: 'linear-gradient(to bottom, #f5f1e6, #e8dfd0)', minHeight: '100vh', padding: '40px', fontFamily: 'serif'}}>
      <div style={{maxWidth: '700px', margin: '0 auto', background: 'rgba(255,255,255,0.85)', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}}>
        <h1 style={{color: '#3e2723', textAlign: 'center', marginBottom: '8px'}}>Ink Stained Soul</h1>
        <p style={{color: '#5d4037', textAlign: 'center', fontStyle: 'italic', marginBottom: '24px'}}>Where your truth becomes ink</p>
        
        <div style={{background: 'rgba(141,110,99,0.1)', padding: '20px', borderRadius: '8px', marginBottom: '20px'}}>
          <p style={{color: '#4e342e', fontWeight: 'bold', marginBottom: '12px'}}>🪶 {randomPrompt}</p>
          <textarea 
            value={ink} 
            onChange={(e)=>setInk(e.target.value)} 
            placeholder="Let the ink flow..." 
            style={{width: '100%', minHeight: '150px', padding: '12px', border: '2px solid #8d6e63', borderRadius: '6px', fontFamily: 'serif', fontSize: '16px', background: '#fffdf8'}}
          />
          <button 
            onClick={handleSave} 
            style={{marginTop: '12px', padding: '12px 24px', background: '#8d6e63', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer'}}
          >
            Seal with Ink
          </button>
        </div>

        <div>
          <h2 style={{color: '#3e2723', borderBottom: '2px solid #8d6e63', paddingBottom: '8px'}}>Your Sacred Entries</h2>
          {allEntries.length === 0 ? (
            <p style={{color:'#5d4037',fontStyle:'italic'}}>Your sacred words will appear here like ink on parchment...</p>
          ) : (
            allEntries.map((e,i)=> (
              <div key={i} style={{borderLeft:'3px solid #8d6e63',padding:'16px 0 16px 16px',marginBottom:'16px',background:'rgba(255,255,255,0.92)'}}>
                <p style={{fontStyle:'italic',color:'#6d4c41',fontSize:'14px'}}>🪶 {e.prompt}</p>
                <p style={{color: '#3e2723', fontFamily: 'serif'}}>{e.entry}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
