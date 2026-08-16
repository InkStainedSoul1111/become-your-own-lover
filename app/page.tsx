'use client'
import { useState, useEffect, useRef } from 'react'

// ============ ALL YOUR PROMPTS ============
const manifestPrompts = [
  {text:"I am worthy of deep, unconditional love — starting with my own.",cat:"emotional"},
  {text:"My body is a sacred vessel. I honor it with movement that feels like joy.",cat:"physical"},
  {text:"I release the need for external validation. I am enough exactly as I am.",cat:"mental"},
  {text:"Every cell in my body vibrates with confidence and purpose.",cat:"physical"},
  {text:"I attract relationships that mirror the love I give myself.",cat:"emotional"},
  {text:"My mind is clear, focused, and aligned with my highest vision.",cat:"mental"},
  {text:"I give myself permission to take up space and shine brightly.",cat:"emotional"},
  {text:"I am becoming the person my dreams need me to be.",cat:"mental"},
]

const motivatePrompts = ["What would you do if you knew you could not fail?","Who are you when no one is watching?","Your dreams chose you for a reason.","What does fulfillment feel like in your body right now?","If your future self could send you one message, what would it be?","What are you tolerating that you no longer need to accept?","What lights you up so much that time disappears?","Dare to name what you really want."]

const journalPrompts = ["Describe the version of yourself you are becoming.","Write a love letter to yourself.","What dream have you been too afraid to chase?","How do you want to feel one year from now?","What beliefs about yourself are you ready to release?","Describe a moment when you felt fully alive.","If you could design your ideal day, what would it look like?","What parts of yourself have you been hiding?"]

const fitnessPrompts = ["What does your body want to express through movement today?","How does exercise make you feel in your spirit?","What form of movement brings you the most joy?","How can you honor your body as a vessel of strength?","What would it feel like to exercise for self-love?","Describe the strongest version of yourself.","How has your relationship with your body evolved?","What barriers keep you from moving freely?"]

const foodPrompts = ["What does it mean to nourish yourself with love?","How do you want to feel in your body about food?","What foods make you feel vibrant and aligned?","Describe your relationship with food.","How can eating become a sacred act of self-care?","What cravings is your body really telling you about?","How do you practice gratitude for nourishment?","What would peace with food feel like?"]

const selfcarePrompts = ["What does honoring your body as a temple mean to you?","What self-care ritual makes you feel most loved?","How can you turn self-care into a non-negotiable?","What does your ideal self-care day look like?","How has prioritizing yourself changed you?","What boundaries do you need to set?","Describe a time you felt pampered and whole.","What would it feel like to treat yourself with tenderness?"]

const naturePrompts = ["How does being in nature shift your sense of self?","What does nature teach you about growth?","Describe a moment in nature that healed you.","How can you cultivate a daily relationship with nature?","What aspects of nature mirror who you are becoming?","How does time in nature calm your mind?","What would it feel like to be part of nature?","How can nature help you reconnect with yourself?"]

const musicPrompts = ["How does dancing reset your nervous system?","What music makes you feel most alive?","Describe a moment when music freed your spirit.","How can you dance without judgment?","What does it mean to move as pure joy?","How has dancing changed your relationship with yourself?","How can music be daily medicine for your soul?","Which songs help you feel confident and sensual?"]

const ritualsPrompts = ["How can skincare become a ritual of self-love?","What is the power of flowers and softness?","Describe how you feel applying lotion.","How can beauty rituals become self-appreciation?","What textures and scents make you feel cherished?","How do flowers and candles invite calm?","What books nourish your soul?","How can you honor your body as a temple daily?"]

// ============ MAIN COMPONENT ============
export default function FullApp() {
  const [started, setStarted] = useState(false)
  const [activeTab, setActiveTab] = useState('manifest')
  const [journalText, setJournalText] = useState('')
  const [journalCategory, setJournalCategory] = useState('general')
  const [quickText, setQuickText] = useState('')
  const [quickCategory, setQuickCategory] = useState('general')
  const [saveMsg, setSaveMsg] = useState(false)
  const [quickSaveMsg, setQuickSaveMsg] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [allEntries, setAllEntries] = useState<any[]>([])
  const [musicPlaying, setMusicPlaying] = useState(true)
  const audioContextRef = useRef<AudioContext | null>(null)

  const [currentManifest, setCurrentManifest] = useState(0)
  const [currentMotivate, setCurrentMotivate] = useState(0)
  const [currentJournal, setCurrentJournal] = useState(0)
  const [currentFitness, setCurrentFitness] = useState(0)
  const [currentFood, setCurrentFood] = useState(0)
  const [currentSelfcare, setCurrentSelfcare] = useState(0)
  const [currentNature, setCurrentNature] = useState(0)
  const [currentMusic, setCurrentMusic] = useState(0)
  const [currentRituals, setCurrentRituals] = useState(0)
  const [currentPromptText, setCurrentPromptText] = useState('')

  const initAudio = () => { if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)() }
  const playAmbientStrings = () => {
    initAudio(); const audioContext = audioContextRef.current; if (!audioContext) return;
    const now = audioContext.currentTime;
    const playSound = (freq: number, startTime: number, duration: number, volume: number) => {
      const osc = audioContext.createOscillator(); const gain = audioContext.createGain();
      osc.connect(gain); gain.connect(audioContext.destination); osc.type = 'sine'; osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, startTime); gain.gain.linearRampToValueAtTime(volume * 0.3, startTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration - 0.3); osc.start(startTime); osc.stop(startTime + duration);
    };
    const notes = [220, 277, 329]; notes.forEach((freq, i) => { playSound(freq, now + i * 0.3, 3, 0.08); playSound(freq, now + i * 0.3 + 1.5, 3, 0.06); });
  }

  const shuffleManifest = () => { const next = (currentManifest + 1) % manifestPrompts.length; setCurrentManifest(next); setCurrentPromptText(manifestPrompts[next].text) }
  const shuffleMotivate = () => { const next = (currentMotivate + 1) % motivatePrompts.length; setCurrentMotivate(next); setCurrentPromptText(motivatePrompts[next]) }
  const shuffleJournal = () => { const next = (currentJournal + 1) % journalPrompts.length; setCurrentJournal(next); setCurrentPromptText(journalPrompts[next]) }
  const shuffleFitness = () => { const next = (currentFitness + 1) % fitnessPrompts.length; setCurrentFitness(next); setCurrentPromptText(fitnessPrompts[next]) }
  const shuffleFood = () => { const next = (currentFood + 1) % foodPrompts.length; setCurrentFood(next); setCurrentPromptText(foodPrompts[next]) }
  const shuffleSelfcare = () => { const next = (currentSelfcare + 1) % selfcarePrompts.length; setCurrentSelfcare(next); setCurrentPromptText(selfcarePrompts[next]) }
  const shuffleNature = () => { const next = (currentNature + 1) % naturePrompts.length; setCurrentNature(next); setCurrentPromptText(naturePrompts[next]) }
  const shuffleMusic = () => { const next = (currentMusic + 1) % musicPrompts.length; setCurrentMusic(next); setCurrentPromptText(musicPrompts[next]) }
  const shuffleRituals = () => { const next = (currentRituals + 1) % ritualsPrompts.length; setCurrentRituals(next); setCurrentPromptText(ritualsPrompts[next]) }

  const writeFromPrompt = () => { setActiveTab('journal') }
  const toggleMusic = () => { setMusicPlaying(!musicPlaying); if (!musicPlaying) playAmbientStrings() }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); if (allEntries.length >= 999) return;
    // @ts-ignore
    const result = await window.dataSdk?.create({ entry_type: 'journal', prompt: currentPromptText, content: journalText, category: journalCategory, created_at: new Date().toISOString() })
    if (result?.isOk) { setJournalText(''); setSaveMsg(true); setTimeout(() => setSaveMsg(false), 2000) }
  }
  const handleQuickSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const result = await window.dataSdk?.create({ entry_type: 'reflection', prompt: '', content: quickText, category: quickCategory, created_at: new Date().toISOString() })
    if (result?.isOk) { setQuickText(''); setQuickSaveMsg(true); setTimeout(() => setQuickSaveMsg(false), 2000) }
  }

  useEffect(() => {
    if (!started) return;
    shuffleManifest(); shuffleMotivate(); shuffleJournal(); shuffleFitness(); shuffleFood(); shuffleSelfcare(); shuffleNature(); shuffleMusic(); shuffleRituals();
    playAmbientStrings()
    // @ts-ignore
    window.dataSdk?.init({ onDataChanged: (data) => setAllEntries(data) })
  }, [started])

  const tabs = [
    {id: 'manifest', label: 'Manifest'}, {id: 'motivate', label: 'Motivate'}, {id: 'music', label: 'Music & Dance'},
    {id: 'nature', label: 'Nature'}, {id: 'fitness', label: 'Fitness'}, {id: 'food', label: 'Food'},
    {id: 'selfcare', label: 'Self Care'}, {id: 'rituals', label: 'Rituals'}, {id: 'journal', label: 'Journal'},
    {id: 'writings', label: 'My Writings'}
  ]

  return (
    <>
      <style>{`body { font-family: 'Alegreya', serif; background: rgb(253, 248, 243); }.heading-font { font-family: 'Playfair Display', serif; }.tab-active { border-bottom: 3px solid #b45309; color: #b45309!important; }.tab-btn { transition: all 0.2s; }.tab-panel { display: none; }.tab-panel.active { display: block; }.fade-in { animation: fadeIn 0.4s ease; } @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }.journal-textarea { min-height: 160px; }`}</style>
      <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;0,700;1,400&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

      {!started? (
  <div className="relative overflow-hidden flex-1 flex-col h-screen">
    <img className="absolute inset-0 w-full h-full object-cover" src="https://images.pexels.com/photos/1661296/pexels-photo-1661296.jpeg?auto=compress&cs=tinysrgb&w=1280" alt="sunset"/>
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
