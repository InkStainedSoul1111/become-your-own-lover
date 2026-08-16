'use client'
import { useState, useEffect, useRef } from 'react'

const data = {
  manifest: [
    {text:"Day 1: I am worthy of deep, unconditional love — starting with my own.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"},
    {text:"Day 2: My body is a sacred vessel. I honor it with movement that feels like joy.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"},
    {text:"Day 3: I release the need for external validation. I am enough exactly as I am.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"},
    {text:"Day 4: I choose to speak to myself with the same kindness I give others.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"},
    {text:"Day 5: I am safe to be fully seen and fully loved.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"},
    {text:"Day 6: My heart is open to receiving love from myself first.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"},
    {text:"Day 7: I trust my own wisdom. I know what I need.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"},
    {text:"Day 8: I am allowed to take up space in this world.", img:"https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800"},
    {text:"Day 9: My needs matter. My voice matters.", img:"https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800"},
    {text:"Day 10: I forgive myself for not knowing what I didn't know.", img:"https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800"},
    {text:"Day 11: I am proud of how far I have come.", img:"https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800"},
    {text:"Day 12: I choose peace over proving myself.", img:"https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800"},
    {text:"Day 13: I am worthy of softness and rest.", img:"https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800"},
    {text:"Day 14: I release shame. I choose self-compassion.", img:"https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800"},
    {text:"Day 15: I am the answer to my own prayers.", img:"https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"},
    {text:"Day 16: My boundaries are acts of love for myself.", img:"https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"},
    {text:"Day 17: I am grateful for my body and all it does for me.", img:"https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"},
    {text:"Day 18: I get to decide what love looks like for me.", img:"https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"},
    {text:"Day 19: I am healing, and that is enough.", img:"https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"},
    {text:"Day 20: I celebrate myself today.", img:"https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"},
    {text:"Day 21: I am not behind. I am becoming.", img:"https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"},
    {text:"Day 22: I choose me. Every single day.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 23: I am magnetic to the love I give myself.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 24: My joy is my responsibility and my right.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 25: I am whole, exactly as I am right now.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 26: I speak my truth with love and clarity.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 27: I am my own safe place.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 28: I am my own home. I belong to me.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"}
  ],
  motivate: [
    {text:"Day 1: What would you do if you knew you could not fail?", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 2: Your dreams chose you for a reason.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 3: Dare to name what you really want.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 4: What is one brave step you can take today?", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 5: You are capable of more than you think.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 6: Motivation is action. Move anyway.", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 7: What would your future self thank you for?", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"Day 8: Progress, not perfection.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 9: You are allowed to want more.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 10: Discipline is self-love in action.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 11: Your only competition is who you were yesterday.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 12: Start before you feel ready.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 13: What if it all works out?", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 14: You have survived 100% of your hard days.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 15: Do it scared.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 16: Your time is now.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 17: What story are you telling yourself? Rewrite it.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 18: Show up for yourself today.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 19: You are building the life you deserve.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 20: Small steps every day.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 21: You are not lazy. You are learning.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 22: What lights you up? Do that.", img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"},
    {text:"Day 23: You are worthy of your goals.", img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"},
    {text:"Day 24: Keep going. You’re closer than you think.", img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"},
    {text:"Day 25: Be your own biggest cheerleader.", img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"},
    {text:"Day 26: What would love do?", img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"},
    {text:"Day 27: You are creating your reality.", img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"},
    {text:"Day 28: You did it. Now do it again for you.", img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"}
  ],
  'Music/Dance': [
    {text:"Day 1: How does dancing reset your nervous system?", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 2: What music makes you feel most alive?", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 3: Let your body move however it needs to.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 4: What song is your current anthem?", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 5: Dance like no one is watching. Because they aren't.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 6: How does rhythm help you feel grounded?", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 7: Create a playlist for your healing.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Day 8: What does your body want to express through music?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"},
    {text:"Day 9: Sing loud. Even if you're off key.", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"},
    {text:"Day 10: Music is medicine. What do you need today?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"},
    {text:"Day 11: Move your hips. Release what you hold.", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"},
    {text:"Day 12: What song reminds you of your power?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"},
    {text:"Day 13: Let sound wash over you.", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"},
    {text:"Day 14: Dance out the emotions you can't name.", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"},
    {text:"Day 15: What music makes you feel safe?", img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"},
    {text:"Day 16: Your body knows how to move. Trust it.", img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"},
    {text:"Day 17: Play the song that makes you cry. Feel it.", img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"},
    {text:"Day 18: What beat matches your heartbeat?", img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"},
    {text:"Day 19: Music connects you to your soul.", img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"},
    {text:"Day 20: Have a 5-minute dance party for yourself.", img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"},
    {text:"Day 21: What lyrics feel like they were written for you?", img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"},
    {text:"Day 22: Let music be your prayer.", img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"},
    {text:"Day 23: Move in a way that feels like love.", img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"},
    {text:"Day 24: What song would you play at your celebration?", img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"},
    {text:"Day 25: Sound bath. Close your eyes and listen.", img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"},
    {text:"Day 26: How does music help you process?", img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"},
    {text:"Day 27: What instrument speaks to your soul?", img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"},
    {text:"Day 28: You are the music.", img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"}
  ],
  nature: [],
  fitness: [],
  food: [],
  selfcare: [],
  rituals: [],
  journal: ["Day 1: Describe the version of yourself you are becoming.", "Day 2: Write a love letter to yourself."],
  writings: []
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [activeTab, setActiveTab] = useState('manifest')
  const [journalText, setJournalText] = useState('')
  const [allEntries, setAllEntries] = useState<any[]>([])
  const [musicPlaying, setMusicPlaying] = useState(true)
  const [index, setIndex] = useState<any>({manifest:0, motivate:0, 'Music/Dance':0, nature:0, fitness:0, food:0, selfcare:0, rituals:0, journal:0, writings:0})
  const audioContextRef = useRef<AudioContext | null>(null)
    const freeTabs = ['manifest','motivate','Music/Dance']
  const canView = (tab:string, day:number) => isPaid || (freeTabs.includes(tab) && day === 0)
  const handleCheckout = () => window.location.href = "https://buy.stripe.com/00w14n8JPakTfMv7sx7bW02"

  const initAudio = () => { if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)() }
  const playSound = () => { initAudio(); const ctx = audioContextRef.current; if(!ctx) return; const o = ctx.createOscillator(); const g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value = 220; g.gain.setValueAtTime(0.05, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2); o.start(); o.stop(ctx.currentTime + 2); }

  const shuffle = (tab: string) => { setIndex({...index, [tab]: (index[tab] + 1) % (data as any)[tab].length }) }

  const saveEntry = (e: React.FormEvent) => { e.preventDefault(); const newEntry = {prompt: (data.journal as string[])[index.journal], content: journalText, date: new Date().toLocaleDateString()}; setAllEntries([newEntry,...allEntries]); setJournalText('') }

  useEffect(() => { if (started && musicPlaying) playSound() }, [started])

  const tabs = ['manifest','motivate','Music/Dance','nature','fitness','food','selfcare','rituals','journal','writings']

  // ADD THE REST OF DATA HERE SO IT DOESNT CUT
  data.nature = [
    {text:"Day 1: How does being in nature shift your sense of self?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 2: What does nature teach you about growth?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 3: Sit barefoot on the earth. Feel it.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 4: What season of life are you in?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 5: Nature reflects you back to yourself.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 6: Watch the sunset and breathe.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 7: What would the trees tell you?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 8: Go outside and find 3 beautiful things.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 9: How does water make you feel?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 10: Let the wind carry what you need to release.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 11: Nature doesn't rush. Neither should you.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 12: What flowers represent you right now?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 13: Ground yourself. You are safe.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 14: The sky is big enough for all your feelings.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 15: What animal are you most like today?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 16: Nature heals. Let it.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 17: Take a mindful walk.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 18: You are part of nature, not separate.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 19: What does the moon remind you of?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 20: Collect something from nature today.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 21: Let nature teach you patience.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 22: Sunlight is medicine.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 23: What grows in you like a garden?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 24: Nature shows you how to bloom.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 25: Listen to the birds. They have messages.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 26: Be like water. Flow.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 27: Nature mirrors your inner world.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Day 28: You belong to this earth.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"}
  ]
  data.fitness = Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: What does your body want to express through movement today?`, img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"}))
  data.food = Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: What does it mean to nourish yourself with love?`, img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"}))
  data.selfcare = Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: What self-care ritual makes you feel most loved?`, img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"}))
  data.rituals = Array.from({length:28}, (_,i)=>({text:`Day ${i+1}: How can skincare become a ritual of self-love?`, img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"}))
  data.journal = Array.from({length:28}, (_,i)=>`Day ${i+1}: What dream have you been too afraid to chase?`)

  return (
    <>
    <style>{`body{font-family:'Alegreya',serif;background:#fdf8f3;margin:0}.heading{font-family:'Playfair Display',serif}.btn{background:#b45309;color:white;padding:10px 20px;border:none;border-radius:8px;cursor:pointer;font-weight:bold}.card{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.05);border:1px solid #e7e5e4;padding:24px;margin-bottom:16px}.tab{padding:16px 8px;background:none;border:none;border-bottom:3px solid transparent;cursor:pointer;color:#57534e}.tab.active{border-bottom:3px solid #b45309;color:#b45309}.panel{display:none}.panel.active{display:block;animation:fade.4s} @keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    <link href="https://fonts.googleapis.com/css2?family=Alegreya&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>

    {!started? (
      <div style={{position:'relative',height:'100vh'}}>
        <img src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=1920" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.6))'}}/>
        <div style={{position:'relative',zIndex:10,height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'24px'}}>
          <h1 className="heading" style={{color:'white',fontSize:'48px',textShadow:'0 2px 10px rgba(0,0,0,.5)'}}>Become Your Own Lover</h1>
          <p style={{color:'white',fontSize:'18px',margin:'12px 0 32px'}}>A sacred space for inner connection and self-love</p>
          <button className="btn" style={{background:'#f97316',marginBottom:'12px'}} onClick={()=>{setStarted(true);playSound()}}>Start Free Preview</button>
          <button className="btn" style={{background:'#06b6d4'}} onClick={handleCheckout}>Unlock Full 28 Days - $21.21</button>
        </div>
      </div>
    ) : (
      <div style={{background:'linear-gradient(to bottom,#fafaf9,#fffbeb)',minHeight:'100vh'}}>
        <header className="card" style={{borderRadius:0,position:'sticky',top:0,zIndex:10}}>
          <div style={{maxWidth:'1024px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h1 className="heading">Become Your Own Lover</h1>
            <button onClick={()=>setMusicPlaying(!musicPlaying)} style={{background:'none',border:'none',color:'#b45309',cursor:'pointer',fontSize:'18px'}}>{musicPlaying?'🔊 On':'🔇 Off'}</button>
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
              <div className="card">
                <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>{tab.charAt(0).toUpperCase()+tab.slice(1).replace('selfcare','Self Care').replace('Music/Dance','Music & Dance')}</h2>

                {!canView(tab, index[tab])? (
                  <div style={{textAlign:'center',padding:'40px'}}>
                    <h3 style={{fontSize:'20px',marginBottom:'8px'}}>🔒 Unlock Day {index[tab]+1}</h3>
                    <p style={{marginBottom:'16px',color:'#57534e'}}>This content is for members only</p>
                    <button className="btn" style={{background:'#06b6d4'}} onClick={handleCheckout}>Unlock Full 28 Days - $21.21</button>
                  </div>
                ) : (
                  <>
                    {(data as any)[tab][index[tab]]?.img && <img src={(data as any)[tab][index[tab]].img} style={{width:'100%',height:'240px',objectFit:'cover',borderRadius:'8px',marginBottom:'16px'}}/>}
                    <p style={{fontSize:'18px',fontStyle:'italic',marginBottom:'16px'}}>"{(data as any)[tab][index[tab]]?.text}"</p>
                    <button className="btn" onClick={()=>shuffle(tab)}>Next Day</button>
                  </>
                )}
              </div>
            </div>
          ))}

          <div className={`panel ${activeTab==='journal'?'active':''}`}>
            <div className="card">
              <h2 className="heading" style={{fontSize:'24px',marginBottom:'16px'}}>Sacred Journal</h2>
              <img src="/journal-pastel.jpg" alt="Sacred Journal" style={{width: '100%', borderRadius: '12px', marginBottom: '20px', maxHeight: '400px', objectFit: 'cover'}} />
              <p style={{fontSize:'18px',fontStyle:'italic',marginBottom:'16px'}}>"{(data.journal as string[])[index.journal]}"</p>
              <form onSubmit={saveEntry}>
                <div className="card" style={{ backgroundImage: "url('/scroll-paper.jpg')", backgroundSize: "cover", backgroundPosition: "center", padding: '24px', borderRadius: '12px', marginBottom: '16px' }} >
                  <textarea
                    value={journalText}
                    onChange={e=>setJournalText(e.target.value)}
                    className="w-full h-80 bg-transparent border-none outline-none resize-none text-amber-900 placeholder-amber-700 font-serif text-lg leading-relaxed"
                    placeholder="Dear Me, Today I choose to become my own lover by..."
                  />
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
              {allEntries.length===0?<p style={{color:'#78716c'}}>No entries yet. Start journaling 💌</p>:allEntries.map((e,i)=>
                <div key={i} style={{borderBottom:'1px solid #e7e5e4',padding:'16px 0'}}>
                  <p style={{fontSize:'12px',color:'#78716c',marginBottom:'4px'}}>{e.date}</p>
                  <p style={{fontStyle:'italic',color:'#78716c',marginBottom:'8px'}}>{e.prompt}</p>
                  <p style={{whiteSpace:'pre-wrap'}}>{e.content}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    )}
    </>
  )
}
