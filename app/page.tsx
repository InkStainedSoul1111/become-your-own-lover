'use client'
import { useState, useEffect, useRef } from 'react'

const data = {
  manifest: [
    {text:"Day 1: I am worthy of deep, unconditional love — starting with my own.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"},
    {text:"Day 2: My body is a sacred vessel. I honor it with movement that feels like joy.", img:"https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800"},
    {text:"Day 3: I release the need for external validation. I am enough exactly as I am.", img:"https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"},
    {text:"Day 4: I choose to speak to myself with the same kindness I give others."},
    {text:"Day 5: I am safe to be fully seen and fully loved."},
    {text:"Day 6: My heart is open to receiving love from myself first."},
    {text:"Day 7: I trust my own wisdom. I know what I need."},
    {text:"Day 8: I am allowed to take up space in this world."},
    {text:"Day 9: My needs matter. My voice matters."},
    {text:"Day 10: I forgive myself for not knowing what I didn't know."},
    {text:"Day 11: I am proud of how far I have come."},
    {text:"Day 12: I choose peace over proving myself."},
    {text:"Day 13: I am worthy of softness and rest."},
    {text:"Day 14: I release shame. I choose self-compassion."},
    {text:"Day 15: I am the answer to my own prayers."},
    {text:"Day 16: My boundaries are acts of love for myself."},
    {text:"Day 17: I am grateful for my body and all it does for me."},
    {text:"Day 18: I get to decide what love looks like for me."},
    {text:"Day 19: I am healing, and that is enough."},
    {text:"Day 20: I celebrate myself today."},
    {text:"Day 21: I am not behind. I am becoming."},
    {text:"Day 22: I choose me. Every single day."},
    {text:"Day 23: I am magnetic to the love I give myself."},
    {text:"Day 24: My joy is my responsibility and my right."},
    {text:"Day 25: I am whole, exactly as I am right now."},
    {text:"Day 26: I speak my truth with love and clarity."},
    {text:"Day 27: I am my own safe place."},
    {text:"Day 28: I am my own home. I belong to me."}
  ],
  motivate: [
    {text:"Day 1: What would you do if you knew you could not fail?", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 2: Your dreams chose you for a reason."},
    {text:"Day 3: Dare to name what you really want."},
    {text:"Day 4: What is one brave step you can take today?"},
    {text:"Day 5: You are capable of more than you think."},
    {text:"Day 6: Motivation is action. Move anyway."},
    {text:"Day 7: What would your future self thank you for?"},
    {text:"Day 8: Progress, not perfection."},
    {text:"Day 9: You are allowed to want more."},
    {text:"Day 10: Discipline is self-love in action."},
    {text:"Day 11: Your only competition is who you were yesterday."},
    {text:"Day 12: Start before you feel ready."},
    {text:"Day 13: What if it all works out?"},
    {text:"Day 14: You have survived 100% of your hard days."},
    {text:"Day 15: Do it scared."},
    {text:"Day 16: Your time is now."},
    {text:"Day 17: What story are you telling yourself? Rewrite it."},
    {text:"Day 18: Show up for yourself today."},
    {text:"Day 19: You are building the life you deserve."},
    {text:"Day 20: Small steps every day."},
    {text:"Day 21: You are not lazy. You are learning."},
    {text:"Day 22: What lights you up? Do that."},
    {text:"Day 23: You are worthy of your goals."},
    {text:"Day 24: Keep going. You’re closer than you think."},
    {text:"Day 25: Be your own biggest cheerleader."},
    {text:"Day 26: What would love do?"},
    {text:"Day 27: You are creating your reality."},
    {text:"Day 28: You did it. Now do it again for you."}
  ],
  'Music/Dance': [
    {text:"Day 1: How does dancing reset your nervous system?", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 2: What music makes you feel most alive?"},
    {text:"Day 3: Let your body move however it needs to."},
    {text:"Day 4: What song is your current anthem?"},
    {text:"Day 5: Dance like no one is watching. Because they aren't."},
    {text:"Day 6: How does rhythm help you feel grounded?"},
    {text:"Day 7: Create a playlist for your healing."},
    {text:"Day 8: What does your body want to express through music?"},
    {text:"Day 9: Sing loud. Even if you're off key."},
    {text:"Day 10: Music is medicine. What do you need today?"},
    {text:"Day 11: Move your hips. Release what you hold."},
    {text:"Day 12: What song reminds you of your power?"},
    {text:"Day 13: Let sound wash over you."},
    {text:"Day 14: Dance out the emotions you can't name."},
    {text:"Day 15: What music makes you feel safe?"},
    {text:"Day 16: Your body knows how to move. Trust it."},
    {text:"Day 17: Play the song that makes you cry. Feel it."},
    {text:"Day 18: What beat matches your heartbeat?"},
    {text:"Day 19: Music connects you to your soul."},
    {text:"Day 20: Have a 5-minute dance party for yourself."},
    {text:"Day 21: What lyrics feel like they were written for you?"},
    {text:"Day 22: Let music be your prayer."},
    {text:"Day 23: Move in a way that feels like love."},
    {text:"Day 24: What song would you play at your celebration?"},
    {text:"Day 25: Sound bath. Close your eyes and listen."},
    {text:"Day 26: How does music help you process?"},
    {text:"Day 27: Create the soundtrack to your life."},
    {text:"Day 28: You are the music you've been waiting for."}
  ],
  nature: [
    {text:"Day 1: How does being in nature shift your sense of self?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 2: What does nature teach you about growth?"},
    {text:"Day 3: Go outside and feel the sun on your skin."},
    {text:"Day 4: Like trees, you shed what no longer serves you."},
    {text:"Day 5: How does the ocean reflect your emotions?"},
    {text:"Day 6: You are part of nature, not separate from it."},
    {text:"Day 7: What can you learn from the seasons?"},
    {text:"Day 8: Ground yourself. Walk barefoot on earth."},
    {text:"Day 9: Notice 5 beautiful things in nature today."},
    {text:"Day 10: Like flowers, you bloom in your own time."},
    {text:"Day 11: How does fresh air clear your mind?"},
    {text:"Day 12: You are wild and rooted and free."},
    {text:"Day 13: What does the sky remind you of?"},
    {text:"Day 14: Nature doesn't rush, yet everything gets done."},
    {text:"Day 15: Collect something from nature as a gift to yourself."},
    {text:"Day 16: How does water cleanse you?"},
    {text:"Day 17: You are as resilient as the mountains."},
    {text:"Day 18: Sit under a tree and just breathe."},
    {text:"Day 19: What animal represents your spirit?"},
    {text:"Day 20: Watch the sunset and remember you are part of this."},
    {text:"Day 21: Nature mirrors your healing."},
    {text:"Day 22: How does being outside regulate you?"},
    {text:"Day 23: You are earth and sky and everything between."},
    {text:"Day 24: Plant something and watch it grow with you."},
    {text:"Day 25: The moon reflects your cycles."},
    {text:"Day 26: Listen to the birds. What are they telling you?"},
    {text:"Day 27: You belong to this earth."},
    {text:"Day 28: Nature loves you exactly as you are."}
  ],
  fitness: [
    {text:"Day 1: What does your body want to express through movement today?", img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"},
    {text:"Day 2: How can you honor your body as a vessel of strength?"},
    {text:"Day 3: Move in ways that feel like love, not punishment."},
    {text:"Day 4: What kind of movement brings you joy?"},
    {text:"Day 5: Your body is not a problem to solve."},
    {text:"Day 6: Strength is softness too."},
    {text:"Day 7: How does moving help you feel more you?"},
    {text:"Day 8: Stretch with gratitude for what your body does."},
    {text:"Day 9: What if fitness was about how you feel?"},
    {text:"Day 10: You don't have to earn rest."},
    {text:"Day 11: How can you celebrate what your body can do?"},
    {text:"Day 12: Movement is a form of self-care."},
    {text:"Day 13: Listen to your body's needs today."},
    {text:"Day 14: You are strong enough."},
    {text:"Day 15: What does energy in motion feel like?"},
    {text:"Day 16: Your body deserves care."},
    {text:"Day 17: How can you make movement playful?"},
    {text:"Day 18: You are not your body's size."},
    {text:"Day 19: Breathe into your muscles."},
    {text:"Day 20: What would it feel like to thank your body?"},
    {text:"Day 21: Fitness is about feeling good in your skin."},
    {text:"Day 22: How does your body carry your story?"},
    {text:"Day 23: Move to release, not to punish."},
    {text:"Day 24: Your body is your home. Clean it with care."},
    {text:"Day 25: What feels good today?"},
    {text:"Day 26: You are allowed to rest between efforts."},
    {text:"Day 27: How can you move with compassion?"},
    {text:"Day 28: Your body is sacred. Honor it."}
  ],  food: [
    {text:"Day 1: What does it mean to nourish yourself with love?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"},
    {text:"Day 2: How can eating become a sacred act of self-care?"},
    {text:"Day 3: What food makes you feel comforted?"},
    {text:"Day 4: You deserve meals that feel like a hug."},
    {text:"Day 5: How can you slow down while you eat?"},
    {text:"Day 6: Nourish yourself like you would your child."},
    {text:"Day 7: What does your body crave today?"},
    {text:"Day 8: Food is not the enemy. It is fuel and joy."},
    {text:"Day 9: Cook something just for you."},
    {text:"Day 10: How can you bring gratitude to your meals?"},
    {text:"Day 11: You are allowed to enjoy food."},
    {text:"Day 12: What if eating was an act of rebellion against diet culture?"},
    {text:"Day 13: Drink water as an act of love."},
    {text:"Day 14: How does food connect you to your culture?"},
    {text:"Day 15: You deserve delicious things."},
    {text:"Day 16: What does abundance taste like?"},
    {text:"Day 17: Eat without guilt."},
    {text:"Day 18: How can you make your plate beautiful?"},
    {text:"Day 19: Food is information for your body."},
    {text:"Day 20: What would love feed you?"},
    {text:"Day 21: You are worthy of nourishment."},
    {text:"Day 22: How can cooking be a ritual?"},
    {text:"Day 23: Listen to your hunger cues."},
    {text:"Day 24: You deserve to be fed."},
    {text:"Day 25: What food reminds you of home?"},
    {text:"Day 26: Nourishment is more than calories."},
    {text:"Day 27: How can you honor your body with food?"},
    {text:"Day 28: You are fed, you are loved, you are enough."}
  ],
  selfcare: [
    {text:"Day 1: What self-care ritual makes you feel most loved?", img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"},
    {text:"Day 2: How can you turn self-care into a non-negotiable?"},
    {text:"Day 3: Rest is resistance. Rest is love."},
    {text:"Day 4: What do you need today that you've been denying yourself?"},
    {text:"Day 5: Self-care is not selfish."},
    {text:"Day 6: How can you comfort yourself right now?"},
    {text:"Day 7: What boundary would feel like self-love?"},
    {text:"Day 8: You are allowed to say no."},
    {text:"Day 9: How can you make your space feel sacred?"},
    {text:"Day 10: What soothes your nervous system?"},
    {text:"Day 11: Self-care is maintenance, not a reward."},
    {text:"Day 12: How can you speak to yourself gently today?"},
    {text:"Day 13: You deserve time just for you."},
    {text:"Day 14: What would feel like a warm hug?"},
    {text:"Day 15: How can you protect your peace?"},
    {text:"Day 16: You are allowed to prioritize you."},
    {text:"Day 17: What small luxury can you give yourself?"},
    {text:"Day 18: Self-care is checking in with yourself."},
    {text:"Day 19: How can you soften today?"},
    {text:"Day 20: You are allowed to take a break."},
    {text:"Day 21: What does your inner child need?"},
    {text:"Day 22: How can you be your own best friend?"},
    {text:"Day 23: Self-care is saying yes to yourself."},
    {text:"Day 24: What can you release to make space for you?"},
    {text:"Day 25: You are worthy of care."},
    {text:"Day 26: How can you refill your own cup?"},
    {text:"Day 27: What does love in action look like for you?"},
    {text:"Day 28: You are your own person to take care of."}
  ],
  rituals: [
    {text:"Day 1: How can skincare become a ritual of self-love?", img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"},
    {text:"Day 2: What is the power of flowers and softness?"},
    {text:"Day 3: Light a candle and tell yourself the truth."},
    {text:"Day 4: How can your morning routine become sacred?"},
    {text:"Day 5: Create a ritual for releasing what you carry."},
    {text:"Day 6: What ritual helps you come home to yourself?"},
    {text:"Day 7: How can you mark the end of your day with love?"},
    {text:"Day 8: Rituals are promises to yourself."},
    {text:"Day 9: What simple act can you repeat daily?"},
    {text:"Day 10: How can you use scent to anchor yourself?"},
    {text:"Day 11: Create a ritual for setting intentions."},
    {text:"Day 12: What ritual makes you feel connected?"},
    {text:"Day 13: How can you honor the moon phases?"},
    {text:"Day 14: Rituals help us remember who we are."},
    {text:"Day 15: What would a self-love ceremony look like?"},
    {text:"Day 16: How can you use touch as a ritual?"},
    {text:"Day 17: Create a ritual for gratitude."},
    {text:"Day 18: What ritual helps you slow down?"},
    {text:"Day 19: How can you make ordinary moments sacred?"},
    {text:"Day 20: Rituals are acts of devotion to yourself."},
    {text:"Day 21: What would you ritualize if you had time?"},
    {text:"Day 22: How can you welcome the new day?"},
    {text:"Day 23: Create a ritual for forgiveness."},
    {text:"Day 24: What ritual brings you peace?"},
    {text:"Day 25: How can you celebrate yourself ritually?"},
    {text:"Day 26: Rituals are anchors in chaos."},
    {text:"Day 27: What sacred practice calls to you?"},
    {text:"Day 28: You are the ritual. You are the sacred."}
  ],
  journal: [
    "Day 1: Describe the version of yourself you are becoming.",
    "Day 2: Write a love letter to yourself.",
    "Day 3: What dream have you been too afraid to chase?",
    "Day 4: What are you ready to forgive yourself for?",
    "Day 5: When did you last feel truly proud of yourself?",
    "Day 6: What does unconditional love from you look like?",
    "Day 7: What story are you ready to let go of?",
    "Day 8: How can you be gentler with yourself?",
    "Day 9: What does your ideal day feel like?",
    "Day 10: What are 10 things you love about yourself?",
    "Day 11: What boundary do you need to set?",
    "Day 12: How has your relationship with yourself changed?",
    "Day 13: What would you tell your younger self?",
    "Day 14: What are you grateful for in your body?",
    "Day 15: What does success mean to you?",
    "Day 16: What fear is holding you back?",
    "Day 17: How can you show up for yourself this week?",
    "Day 18: What brings you the most joy?",
    "Day 19: What are you learning about yourself?",
    "Day 20: What would healing feel like?",
    "Day 21: What do you need to hear right now?",
    "Day 22: How can you celebrate yourself today?",
    "Day 23: What is your heart asking for?",
    "Day 24: What are you releasing?",
    "Day 25: What makes you feel most alive?",
    "Day 26: How can you honor your emotions?",
    "Day 27: What is possible for you now?",
    "Day 28: Write a letter from your future self to you today."
  ]
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [activeTab, setActiveTab] = useState('manifest')
  const [journalText, setJournalText] = useState('')
  const [allEntries, setAllEntries] = useState<any[]>([])
  const [musicPlaying, setMusicPlaying] = useState(true)
  const [index, setIndex] = useState<any>({manifest:0, motivate:0, 'Music/Dance':0, nature:0, fitness:0, food:0, selfcare:0, rituals:0, journal:0})
  const audioContextRef = useRef<AudioContext | null>(null)

  const initAudio = () => { if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)() }
  const playSound = () => { initAudio(); const ctx = audioContextRef.current; if(!ctx) return; const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = 220; g.gain.setValueAtTime(0.05, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2); o.start(); o.stop(ctx.currentTime + 2); }

  const shuffle = (tab: string) => {
    if(!isPaid) { alert("Unlock the full experience to get all 28 days ✨"); return }
    const arr = data[tab as keyof typeof data] as any[]
    setIndex({...index, [tab]: (index[tab] + 1) % arr.length })
  }

  const saveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if(!isPaid) { alert("Unlock the full experience to use the Journal ✨"); return }
    const newEntry = {prompt: (data.journal as string[])[index.journal], content: journalText, date: new Date().toLocaleDateString()}
    setAllEntries([newEntry,...allEntries]); setJournalText('')
  }

  useEffect(() => { if (started && musicPlaying) playSound() }, [started])
  const tabs = ['manifest','motivate','Music/Dance','nature','fitness','food','selfcare','rituals','journal','writings']

  return (
    <>
      <style>{` body{font-family:'Alegreya',serif;background:#fdf8f3;margin:0}.heading{font-family:'Playfair Display',serif}.btn{background:#b45309;color:white;padding:10px 20px;border:none;border-radius:8px;cursor:pointer}.btn-locked{background:#ccc;cursor:not-allowed}.card{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.05);border:1px solid #e7e5e4;padding:24px;margin-bottom:16px}.tab{padding:16px 8px;background:none;border:none;border-bottom:3px solid transparent;cursor:pointer;color:#57534e}.tab.active{border-bottom:3px solid #b45309;color:#b45309}.panel{display:none}.panel.active{display:block;animation:fade.4s} @keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.overlay{position:absolute;inset:0;background:rgba(253,248,243,.95);display:flex;align-items:center;justify-content:center;flex-direction:column;border-radius:12px} `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>

      {!started? (
        <div style={{position:'relative',height:'100vh'}}>
          <img src="https://images.pexels.com/photos/1661296/pexels-photo-1661296.jpeg?auto=compress&w=1280" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.6))'}}/>
          <div style={{position:'relative',zIndex:10,height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'24px'}}>
            <h1 className="heading" style={{color:'white',fontSize:'48px',textShadow:'0 2px 10px rgba(0,0,0,.5)'}}>Become Your Own Lover</h1>
            <p style={{color:'white',fontSize:'18px',margin:'12px 0 32px'}}>28 days of inner connection and self-love</p>
            <button className="btn" onClick={()=>{setStarted(true);playSound()}}>Start Free Preview</button>
            {!isPaid && <button className="btn" style={{marginTop:'12px', background:'#059669'}} onClick={()=>setIsPaid(true)}>Unlock Full 28 Days - $19</button>}
          </div>
        </div>
      ) : (
        <div style={{background:'linear-gradient(to bottom,#fafaf9,#fffbeb)',minHeight:'100vh'}}>
          <header className="card" style={{borderRadius:0,position:'sticky',top:0,zIndex:10}}>
            <div style={{maxWidth:'1024px',margin:'0 auto',display:'flex',justifyContent:'space-between'}}>
              <h1 className="heading">Become Your Own Lover</h1>
              <div>
                {!isPaid && <button className="btn" onClick={()=>setIsPaid(true)}>Unlock $19</button>}
                <button onClick={()=>setMusicPlaying(!musicPlaying)} style={{background:'none',border:'none',color:'#b45309',cursor:'pointer', marginLeft:'12px'}}>{musicPlaying?'🔊 On':'🔇 Off'}</button>
              </div>
            </div>
          </header>
          <nav style={{background:'white',borderBottom:'1px solid #e7e5e4'}}>
            <div style={{maxWidth:'1024px',margin:'0 auto',display:'flex',gap:'16px',overflowX:'auto',padding:'0 16px'}}>
              {tabs.map(t=><button key={t} className={`tab ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1).replace('selfcare','Self Care').replace('Music/Dance','Music & Dance')}</button>)}
            </div>
          </nav>
          <main style={{maxWidth:'1024px',margin:'0 auto',padding:'24px 16px'}}>
            {['manifest','motivate','Music/Dance','nature','fitness','food','selfcare','rituals'].map(tab=>(
              <div key={tab} className={`panel ${activeTab===tab?'active':''}`}>
                <div className="card" style={{position:'relative'}}>
                  <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>{tab.charAt(0).toUpperCase()+tab.slice(1)}</h2>
                  {(data[tab as keyof typeof data] as any[])[index[tab]]?.img && <img src={(data[tab as keyof typeof data] as any[])[index[tab]].img} style={{width:'100%',height:'240px',objectFit:'cover',borderRadius:'8px',marginBottom:'16px'}}/>}
                  <p style={{fontSize:'18px',fontStyle:'italic',marginBottom:'16px'}}>"{(data[tab as keyof typeof data] as any[])[index[tab]]?.text}"</p>
                  <button className={`btn ${!isPaid? 'btn-locked' : ''}`} onClick={()=>shuffle(tab)}>Next Day</button>
                  {!isPaid && <div className="overlay"><p>Unlock all 28 days</p><button className="btn" onClick={()=>setIsPaid(true)}>Unlock $19</button></div>}
                </div>
              </div>
            ))}
            <div className={`panel ${activeTab==='journal'?'active':''}`}>
              <div className="card" style={{position:'relative'}}>
                <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>Sacred Journal</h2>
                {!isPaid && <div className="overlay"><p>Journal is for full members only</p><button className="btn" onClick={()=>setIsPaid(true)}>Unlock $19</button></div>}
                <p style={{fontSize:'18px',fontStyle:'italic',marginBottom:'16px'}}>"{(data.journal as string[])[index.journal]}"</p>
                <img src="/journal-pastel.jpg" alt="Sacred Journal" style={{width: '100%', borderRadius: '12px', marginBottom: '20px', maxHeight: '400px', objectFit: 'cover'}} />
                <form onSubmit={saveEntry}>
                  <div className="card" style={{ backgroundImage: "url('/scroll-paper.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: '24px', borderRadius: '12px', marginBottom: '16px' }} >
                    <textarea value={journalText} onChange={e=>setJournalText(e.target.value)} className="w-full h-80 bg-transparent border-none outline-none resize-none text-amber-900 placeholder-amber-700 font-serif text-lg leading-relaxed" placeholder="Dear Me, Today I choose to become my own lover by..." />
                  </div>
                  <button className={`btn ${!isPaid? 'btn-locked' : ''}`} type="submit">Save Entry</button>
                </form>
                <button onClick={()=>shuffle('journal')} style={{marginTop:'12px',background:'none',border:'none',color:'#b45309',cursor:'pointer'}}>New Prompt</button>
              </div>
            </div>
            <div className={`panel ${activeTab==='writings'?'active':''}`}>
              <div className="card" style={{position:'relative'}}>
                <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>My Writings</h2>
                {!isPaid && <div className="overlay"><p>Your saved writings live here</p><button className="btn" onClick={()=>setIsPaid(true)}>Unlock $19</button></div>}
                {allEntries.length===0?<p>No entries yet.</p>:allEntries.map((e,i)=><div key={i} style={{borderBottom:'1px solid #e7e5e4',padding:'16px 0'}}><p style={{fontStyle:'italic',color:'#78716c'}}>{e.prompt}</p><p>{e.content}</p></div>)}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  )
}
