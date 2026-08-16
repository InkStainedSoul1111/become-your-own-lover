'use client'
import { useState, useEffect, useRef } from 'react'

const data = {
  manifest: Array.from({length:28}, (_,i)=>({
    text:`Day ${i+1}: ${["I am worthy of deep, unconditional love — starting with my own.","My body is a sacred vessel. I honor it with movement that feels like joy.","I release the need for external validation. I am enough exactly as I am.","I choose to speak to myself with the same kindness I give others.","I am safe to be fully seen and fully loved.","My heart is open to receiving love from myself first.","I trust my own wisdom. I know what I need.","I am allowed to take up space in this world.","My needs matter. My voice matters.","I forgive myself for not knowing what I didn't know.","I am proud of how far I have come.","I choose peace over proving myself.","I am worthy of softness and rest.","I release shame. I choose self-compassion.","I am the answer to my own prayers.","My boundaries are acts of love for myself.","I am grateful for my body and all it does for me.","I get to decide what love looks like for me.","I am healing, and that is enough.","I celebrate myself today.","I am not behind. I am becoming.","I choose me. Every single day.","I am magnetic to the love I give myself.","My joy is my responsibility and my right.","I am whole, exactly as I am right now.","I speak my truth with love and clarity.","I am my own safe place.","I am my own home. I belong to me."][i]}`,
    img:["https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800","https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800","https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800","https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"][Math.floor(i/7)]
  })),
  motivate: Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: Motivate prompt ${i+1}`,img:["https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800","https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800","https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800","https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"][Math.floor(i/7)]})),
  'Music/Dance': Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: Music/Dance prompt ${i+1}`,img:["https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800","https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800","https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"][Math.floor(i/7)]})),
  nature: Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: Nature prompt ${i+1}`,img:["https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800","https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800","https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800","https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"][Math.floor(i/7)]})),
  fitness: Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: Fitness prompt ${i+1}`,img:["https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800","https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800","https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800","https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"][Math.floor(i/7)]})),
  food: Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: Food prompt ${i+1}`,img:["https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800","https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800","https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800","https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"][Math.floor(i/7)]})),
  selfcare: Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: Self Care prompt ${i+1}`,img:["https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800","https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800","https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800","https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"][Math.floor(i/7)]})),
  rituals: Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: Rituals prompt ${i+1}`,img:["https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800","https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800","https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800","https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"][Math.floor(i/7)]})),
  journal: Array.from({length:28}, (_,i)=>`Day ${i+1}: Journal prompt ${i+1}`),
  writings: Array.from({length:28}, (_,i)=>`Day ${i+1}: Writing prompt ${i+1}`)
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [activeTab, setActiveTab] = useState('manifest')
  const [index, setIndex] = useState<any>({manifest:0, motivate:0, 'Music/Dance':0, nature:0, fitness:0, food:0, selfcare:0, rituals:0, journal:0, writings:0})
  const [journalText, setJournalText] = useState('')
  const [allEntries, setAllEntries] = useState<any[]>([])
  const [musicPlaying, setMusicPlaying] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)

  const freeTabs = ['manifest','motivate','Music/Dance']
  const canView = (tab:string, day:number) => isPaid || (freeTabs.includes(tab) && day === 0)

  const handleCheckout = () => window.location.href = "https://buy.stripe.com/00w14n8JPakTfMv7sx7bW02"

  const shuffle = (tab: string) => {
    const arr = data[tab as keyof typeof data] as any[]
    setIndex({...index, [tab]: (index[tab] + 1) % arr.length })
  }

  const saveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {prompt: (data.journal as string[])[index.journal], content: journalText, date: new Date().toLocaleDateString()}
    setAllEntries([newEntry,...allEntries]);
    setJournalText('')
  }

  const tabs = ['manifest','motivate','Music/Dance','nature','fitness','food','selfcare','rituals','journal','writings']

  return (
    <>
    <style>{`body{font-family:'Alegreya',serif;background:#fdf8f3;margin:0}.heading{font-family:'Playfair Display',serif}.btn{background:#b45309;color:white;padding:10px 20px;border:none;border-radius:8px;cursor:pointer;font-weight:bold}.card{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.05);border:1px solid #e7e5e4;padding:24px;margin-bottom:16px}.tab{padding:16px 8px;background:none;border:none;border-bottom:3px solid transparent;cursor:pointer;color:#57534e}.tab.active{border-bottom:3px solid #b45309;color:#b45309}.panel{display:none}.panel.active{display:block;animation:fade.4s} @keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    <link href="https://fonts.googleapis.com/css2?family=Alegreya&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>

    {!started? (
      <div style={{position:'relative',height:'100vh'}}>
        <img src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=1920" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.6))'}}/>
        <div style={{position:'relative',zIndex:10,height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'24px',color:'white'}}>
          <h1 className="heading" style={{fontSize:'48px',textShadow:'2px 2px 8px rgba(0,0,0,.7)'}}>Become Your Own Lover</h1>
          <p style={{fontSize:'20px',margin:'12px 0 32px',textShadow:'1px 1px 4px rgba(0,0,0,.7)'}}>A sacred space for inner connection and self-love</p>
          <button className="btn" style={{background:'#f97316',marginBottom:'12px'}} onClick={()=>setStarted(true)}>Start Free Preview</button>
          <button className="btn" style={{background:'#06b6d4'}} onClick={handleCheckout}>Unlock Full 28 Days - $21.21</button>
        </div>
      </div>
    ) : (
      <div style={{background:'linear-gradient(to bottom,#fafaf9,#fffbeb)',minHeight:'100vh'}}>
        <header className="card" style={{borderRadius:0,position:'sticky',top:0,zIndex:10}}>
          <div style={{maxWidth:'1024px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h1 className="heading">Become Your Own Lover</h1>
            <button onClick={()=>setMusicPlaying(!musicPlaying)} style={{background:'none',border:'none',color:'#b45309',cursor:'pointer'}}>{musicPlaying?'🔊 On':'🔇 Off'}</button>
          </div>
        </header>
        <nav style={{background:'white',borderBottom:'1px solid #e7e5e4'}}>
          <div style={{maxWidth:'1024px',margin:'0 auto',display:'flex',gap:'16px',overflowX:'auto',padding:'0 16px'}}>
            {tabs.map(t=><button key={t} className={`tab ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1).replace('selfcare','Self Care').replace('music','Music & Dance')}</button>)}
          </div>
        </nav>
        <main style={{maxWidth:'1024px',margin:'0 auto',padding:'24px 16px'}}>
          {['manifest','motivate','Music/Dance','nature','fitness','food','selfcare','rituals'].map(tab=>(
            <div key={tab} className={`panel ${activeTab===tab?'active':''}`}>
              <div className="card">
                <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>{tab.charAt(0).toUpperCase()+tab.slice(1)}</h2>
                {!canView(tab, index[tab])? (
                  <div style={{textAlign:'center',padding:'40px'}}>
                    <h3>🔒 Unlock Day {index[tab]+1}</h3>
                    <p>This content is for members only</p>
                    <button className="btn" style={{background:'#06b6d4'}} onClick={handleCheckout}>Unlock Full 28 Days - $21.21</button>
                  </div>
                ) : (
                  <>
                    {(data[tab as keyof typeof data] as any[])[index[tab]]?.img && <img src={(data[tab as keyof typeof data] as any[])[index[tab]].img} style={{width:'100%',height:'240px',objectFit:'cover',borderRadius:'8px',marginBottom:'16px'}}/>}
                    <p style={{fontSize:'18px',fontStyle:'italic',marginBottom:'16px'}}>"{(data[tab as keyof typeof data] as any[])[index[tab]]?.text}"</p>
                    <button className="btn" onClick={()=>shuffle(tab)}>Next Day</button>
                  </>
                )}
              </div>
            </div>
          ))}
          <div className={`panel ${activeTab==='journal'?'active':''}`}>
            <div className="card">
              <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>Sacred Journal</h2>
              <p style={{fontSize:'18px',fontStyle:'italic',marginBottom:'16px'}}>"{(data.journal as string[])[index.journal]}"</p>
              <img src="/journal-pastel.jpg" alt="Sacred Journal" style={{width: '100%', borderRadius: '12px', marginBottom: '20px', maxHeight: '400px', objectFit: 'cover'}} />
              <form onSubmit={saveEntry}>
                <div className="card" style={{ backgroundImage: "url('/scroll-paper.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: '24px', borderRadius: '12px', marginBottom: '16px' }} >
                  <textarea value={journalText} onChange={e=>setJournalText(e.target.value)} className="w-full h-80 bg-transparent border-none outline-none resize-none text-amber-900 placeholder-amber-700 font-serif text-lg leading-relaxed" placeholder="Dear Me, Today I choose to become my own lover by..." />
                </div>
                <button className="btn" type="submit">Save Entry</button>
              </form>
              <button onClick={()=>shuffle('journal')} style={{marginTop:'12px',background:'none',border:'none',color:'#b45309',cursor:'pointer'}}>New Prompt</button>
            </div>
          </div>
          <div className={`panel ${activeTab==='writings'?'active':''}`}>
            <div className="card">
              <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>My Writings</h2>
              <img src="https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&w=800" alt="Sacred Writings Scroll" style={{width:'100%',height:'300px',objectFit:'cover',borderRadius:'12px',marginBottom:'16px'}}/>
              {allEntries.length===0? <p>No entries yet.</p> : allEntries.map((e,i)=><div key={i} style={{borderBottom:'1px solid #e7e5e4',padding:'16px 0'}}><p style={{fontStyle:'italic',color:'#78716c'}}>{e.prompt}</p><p>{e.content}</p></div>)}
            </div>
          </div>
        </main>
      </div>
    )}
    </>
  )
}
