'use client'
import { useState, useEffect, useRef } from 'react'

const STRIPE_LINK = 'https://buy.stripe.com/00w14n8JPakTfMv7sx7bW02'

const data = {
  manifest: [
    {text:"Photograph the part of your body you hid from him. Write 3 words you wish he’d said to it.", img:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"},
    {text:"What did your body do for you today without asking? Thank it out loud.", img:"https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800"},
    {text:"Warm ritual: tea, bath, heating pad. Do it slow. What shifts?", img:"https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"},
    {text:"Dress for *you* today. No “what would he think.” How does it feel?", img:"https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&w=800"},
    {text:"Touch your own skin like someone in love would. Where do you soften?", img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"},
    {text:"Move for 7 minutes — stretch, dance, sway. Not exercise. *Celebration*.", img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"},
    {text:"Eat one thing like it’s sacred. No phone. Taste only.", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"},
    {text:"What is your body grieving? Where do you hold 1519 days? Breathe into it.", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Look in the mirror, say: *“I’m not waiting for you to pick me.”* What face looks back?", img:"https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=800"},
    {text:"Sleep setup: What would you do if you were tucking in someone you adore?", img:"https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&w=800"},
    {text:"List 5 ways your body has protected you. Scott never got this list.", img:"https://images.pexels.com/photos/1661296/pexels-photo-1661296.jpeg?auto=compress&w=800"},
    {text:"Wear scent for yourself. Close your eyes. Who do you become?", img:"https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&w=800"},
    {text:"Take up space. Sit spread out. Lie starfish. Notice the urge to shrink.", img:"https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&w=800"},
    {text:"What does *rest* look like vs *collapse*? Do *rest* today.", img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"},
    {text:"Photograph your hands. What have they held? What will they hold next?", img:"https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg?auto=compress&w=800"},
    {text:"Cold day plan: How do you warm yourself without him? Do one thing.", img:"https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&w=800"},
    {text:"Say no to one thing your body doesn’t want. Feel the power.", img:"https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&w=800"},
    {text:"Dance to one song naked or in underwear. No mirror first. Just feel.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"What does your menstrual phase need? Give it before it asks.", img:"https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&w=800"},
    {text:"Touch your scars. Tattoo. Chest. Say: *“This is my history. I choose it.”*", img:"https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg?auto=compress&w=800"},
    {text:"Cook yourself the dinner you imagined at *his* place. Plate it pretty.", img:"https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&w=800"},
    {text:"Breathe into your belly for 2 min. Tell it: *“I’m not abandoning you.”*", img:"https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&w=800"},
    {text:"What feels like *luxury* that costs $0? Do it today.", img:"https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&w=800"},
    {text:"Walk like you’re already loved. 10 minutes. Notice who sees you.", img:"https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&w=800"},
    {text:"Before bed: Lotion your feet. Thank them for day 1520.", img:"https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&w=800"},
    {text:"Mirror work: *“I’m sorry I gave you to someone who said ‘yo.’”*", img:"https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&w=800"},
    {text:"What would “lover” you do for tired you tonight? Do that.", img:"https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&w=800"},
    {text:"Image + caption: *This body is not a waiting room.*", img:"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&w=800"}
  ],
  motivate: [
    {text:"Morning ritual, 5-min version. Do it. No phone. How does *you* feel?", img:"https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"},
    {text:"What hour did you waste hoping he’d text? Take it back. Name what you’ll do instead.", img:"https://images.pexels.com/photos/590037/pexels-photo-590037.jpeg?auto=compress&w=800"},
    {text:"Unfollow, mute, or move one app that keeps you in *Slipping Away*.", img:"https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=800"},
    {text:"20-min “story time”: Do something you’d post, then *don’t* post it. It’s yours.", img:"https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&w=800"},
    {text:"Plan one thing for future you 30 days from now. Buy the ticket, book the thing.", img:"https://images.pexels.com/photos/1251173/pexels-photo-1251173.jpeg?auto=compress&w=800"},
    {text:"List: What did waiting steal from you? What are you taking back first?", img:"https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&w=800"},
    {text:"Solo date. Coffee, bookstore, drive. No company. How was the conversation?", img:"https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&w=800"},
    {text:"Clean one corner like you’re prepping for someone you love. You are.", img:"https://images.pexels.com/photos/4107288/pexels-photo-4107288.jpeg?auto=compress&w=800"},
    {text:"Time block: 1 hour with no Scott thoughts. If he comes up, say *“Not now.”*", img:"https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=800"},
    {text:"What did you stop doing because he might call? Start again for 10 min.", img:"https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&w=800"},
    {text:"Write the text you want to send him. Then burn/delete it.", img:"https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&w=800"},
    {text:"Learn 1 thing in 15 min. YouTube, book. Your brain is not a waiting room.", img:"https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&w=800"},
    {text:"Evening ritual: What tells your nervous system *“we’re safe, he’s not coming, and that’s okay”*?", img:"https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&w=800"},
    {text:"Say *“no”* before you’re sure. Practice.", img:"https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&w=800"},
    {text:"Photograph golden hour. This light is not for his story views.", img:"https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&w=800"},
    {text:"List 3 dreams that have nothing to do with *Him. Us.* Pick one step.", img:"https://images.pexels.com/photos/669986/pexels-photo-669986.jpeg?auto=compress&w=800"},
    {text:"Do the thing you told yourself you’d do “when this is over.” It’s over.", img:"https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&w=800"},
    {text:"Curate your space: Remove 1 item that feels like *him*.", img:"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&w=800"},
    {text:"30-min timer: No past. No Scott. Only now. What emerges?", img:"https://images.pexels.com/photos/2114206/pexels-photo-2114206.jpeg?auto=compress&w=800"},
    {text:"Write your own *“yo”* response. How does your own energy reply?", img:"https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&w=800"},
    {text:"Plan tomorrow *before* bed. You wake up to your choices, not his silence.", img:"https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&w=800"},
    {text:"What are you available for now? Write the dating profile for *your life*.", img:"https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&w=800"},
    {text:"Take a different route home. Newness = you’re not stuck.", img:"https://images.pexels.com/photos/21014/pexels-photo.jpg?auto=compress&w=800"},
    {text:"1 chore as devotion. *“I’m worth a clean sink.”*", img:"https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&w=800"},
    {text:"Social media audit: Does this feed me or keep me waiting? Edit.", img:"https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&w=800"},
    {text:"Set a boundary with yourself: *“I don’t check his name after 8pm.”*", img:"https://images.pexels.com/photos/4049791/pexels-photo-4049791.jpeg?auto=compress&w=800"},
    {text:"Future self letter: Day 1550 Sue Ellen. What do you thank day 1520 for?", img:"https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&w=800"},
    {text:"Image + caption: *My time is not a lobby.*", img:"https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&w=800"}
  ],
  'Music/Dance': [
    {text:"Say *“I don’t have anything important to say”* out loud. Feel the power of hanging up.", img:"https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800"},
    {text:"Voice memo: Tell day 1 Sue Ellen what day 1520 knows. Don’t send. Keep.", img:"https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&w=800"},
    {text:"Write the love letter you wanted from him. Sign *your* name.", img:"https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&w=800"},
    {text:"Scream into a pillow for 10 seconds. What’s left in the quiet?", img:"https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&w=800"},
    {text:"What sentence are you done saying? *“Maybe he will...”* Replace it.", img:"https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&w=800"},
    {text:"Sing, bad or good. One song. Volume up. This house is yours.", img:"https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&w=800"},
    {text:"Unsent text draft: *“Five hearts isn’t a home.”* Sit with it. Delete or keep.", img:"https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&w=800"},
    {text:"Record yourself saying *“no more waiting.”* Play it when you waver.", img:"https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&w=800"},
    {text:"List: What did silence teach you? Thank it and dismiss it.", img:"https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&w=800"},
    {text:"Read one poem out loud like you’re the only audience. You are.", img:"https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&w=800"},
    {text:"What do you need to hear? Say it. *“I’m proud of you for hanging up.”*", img:"https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=800"},
    {text:"Write your *Slipping Away* response song. One verse. No sending.", img:"https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&w=800"},
    {text:"Tell the mirror: *“I choose me, even with just my love.”*", img:"https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&w=800"},
    {text:"Practice: *“That doesn’t work for me.”* Say it 3 ways.", img:"https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&w=800"},
    {text:"Journal: If my chest could talk, not scratch, what would it say?", img:"https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&w=800"},
    {text:"Laugh on purpose for 20 seconds. Fake it till it’s real.", img:"https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&w=800"},
    {text:"What truth are you whispering? Write it in all caps.", img:"https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&w=800"},
    {text:"Call a friend and don’t mention him once. What else are you?", img:"https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&w=800"},
    {text:"Name the grief: *“I’m sad about ___. And I’m still here.”*", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"Script: What you’d say if he asked why you left. Get clear.", img:"https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=800"},
    {text:"Speak to his daughter in your head. What would you want her to know about love?", img:"https://images.pexels.com/photos/1251173/pexels-photo-1251173.jpeg?auto=compress&w=800"},
    {text:"Record *“I’m not a waiting room”* as your alarm label.", img:"https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&w=800"},
    {text:"Write your vows to yourself. *“I, Sue Ellen, take me...”*", img:"https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&w=800"},
    {text:"What compliment do you fish for? Give it to yourself now.", img:"https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&w=800"},
    {text:"Read old texts. Out loud. Then say *“That was then.”* Close the app.", img:"https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&w=800"},
    {text:"Talk to 1519-day Sue Ellen: *“Thank you for lasting. I’ve got it now.”*", img:"https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&w=800"},
    {text:"Silence check: Sit 5 min. No input. What’s your voice without his echo?", img:"https://images.pexels.com/photos/2114206/pexels-photo-2114206.jpeg?auto=compress&w=800"},
    {text:"Image + caption: *I’m my own love story now.*", img:"https://images.pexels.com/photos/1661296/pexels-photo-1661296.jpeg?auto=compress&w=800"}
  ],
  nature: [
    {text:"How does being in nature shift your sense of self?", img:"https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"},
    {text:"What does nature teach you about growth?"}
  ],
  fitness: [
    {text:"What does your body want to express through movement today?", img:"https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"},
    {text:"How can you honor your body as a vessel of strength?"}
  ],
  food: [
    {text:"What does it mean to nourish yourself with love?", img:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800"},
    {text:"How can eating become a sacred act of self-care?"}
  ],
  selfcare: [
    {text:"What self-care ritual makes you feel most loved?", img:"https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800"},
    {text:"How can you turn self-care into a non-negotiable?"}
  ],
  rituals: [
    {text:"How can skincare become a ritual of self-love?", img:"https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"},
    {text:"What is the power of flowers and softness?"}
  ],
  journal: [
    "Describe the version of yourself you are becoming.",
    "Write a love letter to yourself.",
    "What dream have you been too afraid to chase?",
    "If your body could write you a note, what would it say?",
    "What does *no more waiting* feel like in your chest?",
    "List 3 ways you chose you today. No matter how small.",
    "What would change if you believed you were already loved?",
    "Write about the day you stopped shrinking.",
    "What are you available for now that you weren’t before?",
    "Describe your ritual morning as an act of devotion.",
    "What truth are you done whispering?",
    "If grief could speak, what would it thank you for?",
    "What does your future self beg you to do today?",
    "Write the apology you owe yourself.",
    "What feels like home in your body right now?",
    "List everything you no longer have to explain.",
    "What song is your life singing now that he’s not the DJ?",
    "Describe a boundary as a love letter to yourself.",
    "What would you do if five hearts were enough?",
    "Write about the moment you knew *“yo”* wasn’t enough.",
    "What does your own love look like in action?",
    "If you were your own partner, how would you make up for 1519 days?",
    "What are you reclaiming that isn’t his to give?",
    "Describe the taste of choosing yourself.",
    "What did *Slipping Away* teach you about staying?",
    "Write your permission slip for joy.",
    "What story are you done telling about him?",
    "Dear Me on day 1550, here’s what day 1520 did for you..."
  ]
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [activeTab, setActiveTab] = useState('manifest')
  const [journalText, setJournalText] = useState('')
  const [allEntries, setAllEntries] = useState<any[]>([])
  const [musicPlaying, setMusicPlaying] = useState(true)
  const [index, setIndex] = useState<any>({manifest:0, motivate:0, 'Music/Dance':0, nature:0, fitness:0, food:0, selfcare:0, rituals:0, journal:0})
  const [responseText, setResponseText] = useState('')

  const [promptsViewed, setPromptsViewed] = useState(0)
  const [hasFullAccess, setHasFullAccess] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const unlocked = localStorage.getItem('byol_unlocked')
    const views = localStorage.getItem('byol_views')
    const entries = localStorage.getItem('byol_entries')
    if (unlocked === 'true') setHasFullAccess(true)
    if (views) setPromptsViewed(parseInt(views))
    if (entries) setAllEntries(JSON.parse(entries))
  }, [])

  useEffect(() => {
    localStorage.setItem('byol_views', promptsViewed.toString())
  }, [promptsViewed])

  useEffect(() => {
    localStorage.setItem('byol_entries', JSON.stringify(allEntries))
  }, [allEntries])

  const initAudio = () => {
    if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
  }

  const playSound = () => {
    initAudio(); const ctx = audioContextRef.current; if(!ctx) return;
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination); o.frequency.value = 220;
    g.gain.setValueAtTime(0.05, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
    o.start(); o.stop(ctx.currentTime + 2);
  }

  const shuffle = (tab: string) => {
    if (!hasFullAccess && ['manifest','motivate','Music/Dance'].includes(tab)) {
      const newCount = promptsViewed + 1
      setPromptsViewed(newCount)
    }
    const arr = data[tab as keyof typeof data] as any[]
    setIndex({...index, [tab]: (index[tab] + 1) % arr.length })
    setResponseText('')
  }

  const handlePurchase = () => {
    window.open(STRIPE_LINK, '_blank')
  }

  const unlockNow = () => {
    localStorage.setItem('byol_unlocked', 'true')
    setHasFullAccess(true)
  }

  const saveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {prompt: (data.journal as string[])[index.journal], content: journalText, date: new Date().toLocaleDateString(), tab: 'journal'}
    setAllEntries([newEntry,...allEntries]);
    setJournalText('')
  }

  const saveCardResponse = (tab: string) => {
    if (!responseText.trim()) return
    const currentPrompt = (data[tab as keyof typeof data] as any[])[index[tab]]
    const promptText = currentPrompt?.text || currentPrompt
    const newEntry = {
      prompt: promptText,
      content: responseText,
      date: new Date().toLocaleDateString(),
      tab: tab
    }
    setAllEntries([newEntry,...allEntries]);
    setResponseText('')
  }

  useEffect(() => { if (started && musicPlaying) playSound() }, [started])

  const tabs = ['manifest','motivate','Music/Dance','nature','fitness','food','selfcare','rituals','journal','writings']
  const currentItem = (data[activeTab as keyof typeof data] as any[])[index[activeTab]]
  const isLocked =!hasFullAccess && promptsViewed >= 3 && ['manifest','motivate','Music/Dance'].includes(activeTab) 
    return (
    <>
      <style>{`
        body{font-family:'Alegreya',serif;background:#fdf8f3;margin:0}
       .heading{font-family:'Playfair Display',serif}
       .btn{background:#b45309;color:white;padding:10px 20px;border:none;border-radius:8px;cursor:pointer;font-size:15px}
       .btn-gold{background:linear-gradient(135deg,#d4af37,#b45309);color:white;padding:12px 24px;border:none;border-radius:8px;cursor:pointer;font-weight:bold}
       .btn-small{background:#b45309;color:white;padding:8px 16px;border:none;border-radius:6px;cursor:pointer;font-size:14px}
       .card{background:white;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.05);border:1px solid #e7e5e4;padding:24px;margin-bottom:16px}
       .tab{padding:16px 8px;background:none;border:none;border-bottom:3px solid transparent;cursor:pointer;color:#57534e}
       .tab.active{border-bottom:3px solid #b45309;color:#b45309}
       .panel{display:none}.panel.active{display:block;animation:fade.4s}
       .paywall-glow{box-shadow:0 0 0 1px #f59e0b, 0 0 20px rgba(245,158,11,.2)}
        @keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>

      {!started? (
        <div style={{position:'relative',height:'100vh'}}>
          <img src="https://images.pexels.com/photos/1661296/pexels-photo-1661296.jpeg?auto=compress&w=1280" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.6))'}}/>
          <div style={{position:'relative',zIndex:10,height:'100%',display:'flex
