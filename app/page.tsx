'use client';
import { useState } from 'react';

export default function Home() {
  const [ink, setInk] = useState('');
  const [allEntries, setAllEntries] = useState([]);

  const prompts = [
    "What truth are you hiding from yourself today?",
    "Write the letter you never sent.",
    "If your soul had ink, what would it spill?"
  ];
  const randomPrompt = prompts[Math.floor(Math.random()*prompts.length)];

  const handleSave = () => {
    if(ink.trim() === '') return;
    const newEntry = {prompt: randomPrompt, entry: ink};
    setAllEntries([...allEntries, newEntry]);
    setInk('');
    alert('Sealed with Ink 💚');
  };

  return (
    <main style={{background: '#2c1810', color: '#f5f1e6', minHeight: '100vh', padding: '40px', fontFamily: 'serif'}}>
      <div style={{maxWidth: '700px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', fontSize: '48px'}}>Ink Stained</h1>
        <p style={{textAlign: 'center', fontStyle: 'italic'}}>Where your truth becomes ink</p>
        
        <div style={{marginTop: '40px'}}>
          <p>🪶 {randomPrompt}</p>
          <textarea 
            value={ink} 
            onChange={(e) => setInk(e.target.value)}
            placeholder="Let the ink flow..." 
            style={{width: '100%', height: '150px', marginTop: '10px'}}
          />
          <button onClick={handleSave} style={{marginTop: '10px', padding: '12px 24px', background: '#8d6e63', color: 'white', border: 'none'}}>
            Seal with Ink
          </button>
        </div>

        <div style={{marginTop: '40px'}}>
          <h2>Your Sacred Entries</h2>
          {allEntries.map((e, i) => (
            <div key={i} style={{borderLeft: '3px solid #8d6e63', paddingLeft: '16px', marginTop: '20px'}}>
              <p style={{fontStyle: 'italic'}}>{e.prompt}</p>
              <p>{e.entry}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
