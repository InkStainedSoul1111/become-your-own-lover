'use client'
import { useState, useEffect, useRef } from 'react'

const data = {
  manifest: {
    prompts: [
      "Day 1: I am worthy of deep, unconditional love — starting with my own.",
      "Day 2: My body is a sacred vessel. I honor it with movement that feels like joy.",
      "Day 3: I release the need for external validation. I am enough exactly as I am.",
      "Day 4: I choose to speak to myself with the same kindness I give others.",
      "Day 5: I am safe to be fully seen and fully loved.",
      "Day 6: My heart is open to receiving love from myself first.",
      "Day 7: I trust my own wisdom. I know what I need.",
      "Day 8: I am allowed to take up space in this world.",
      "Day 9: My needs matter. My voice matters.",
      "Day 10: I forgive myself for not knowing what I didn't know.",
      "Day 11: I am proud of how far I have come.",
      "Day 12: I choose peace over proving myself.",
      "Day 13: I am worthy of softness and rest.",
      "Day 14: I release shame. I choose self-compassion.",
      "Day 15: I am the answer to my own prayers.",
      "Day 16: My boundaries are acts of love for myself.",
      "Day 17: I am grateful for my body and all it does for me.",
      "Day 18: I get to decide what love looks like for me.",
      "Day 19: I am healing, and that is enough.",
      "Day 20: I celebrate myself today.",
      "Day 21: I am not behind. I am becoming.",
      "Day 22: I choose me. Every single day.",
      "Day 23: I am magnetic to the love I give myself.",
      "Day 24: My joy is my responsibility and my right.",
      "Day 25: I am whole, exactly as I am right now.",
      "Day 26: I speak my truth with love and clarity.",
      "Day 27: I am my own safe place.",
      "Day 28: I am my own home. I belong to me."
    ],
    images: [
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800",
      "https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800",
      "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"
    ]
  },
  motivate: {
    prompts: [
      "Day 1: What would you do if you knew you could not fail?",
      "Day 2: Your dreams chose you for a reason.",
      "Day 3: Dare to name what you really want.",
      "Day 4: What is one brave step you can take today?",
      "Day 5: You are capable of more than you think.",
      "Day 6: Motivation is action. Move anyway.",
      "Day 7: What would your future self thank you for?",
      "Day 8: Progress, not perfection.",
      "Day 9: You are allowed to want more.",
      "Day 10: Discipline is self-love in action.",
      "Day 11: Your only competition is who you were yesterday.",
      "Day 12: Start before you feel ready.",
      "Day 13: What if it all works out?",
      "Day 14: You have survived 100% of your hard days.",
      "Day 15: Do it scared.",
      "Day 16: Your time is now.",
      "Day 17: What story are you telling yourself? Rewrite it.",
      "Day 18: Show up for yourself today.",
      "Day 19: You are building the life you deserve.",
      "Day 20: Small steps every day.",
      "Day 21: You are not lazy. You are learning.",
      "Day 22: What lights you up? Do that.",
      "Day 23: You are worthy of your goals.",
      "Day 24: Keep going. You’re closer than you think.",
      "Day 25: Be your own biggest cheerleader.",
      "Day 26: What would love do?",
      "Day 27: You are creating your reality.",
      "Day 28: You did it. Now do it again for you."
    ],
    images: [
      "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"
    ]
  },
  'Music/Dance': {
    prompts: [
      "Day 1: How does dancing reset your nervous system?",
      "Day 2: What music makes you feel most alive?",
      "Day 3: Let your body move however it needs to.",
      "Day 4: What song is your current anthem?",
      "Day 5: Dance like no one is watching. Because they aren't.",
      "Day 6: How does rhythm help you feel grounded?",
      "Day 7: Create a playlist for your healing.",
      "Day 8: What does your body want to express through music?",
      "Day 9: Sing loud. Even if you're off key.",
      "Day 10: Music is medicine. What do you need today?",
      "Day 11: Move your hips. Release what you hold.",
      "Day 12: What song reminds you of your power?",
      "Day 13: Let sound wash over you.",
      "Day 14: Dance out the emotions you can't name.",
      "Day 15: What music makes you feel safe?",
      "Day 16: Your body knows how to move. Trust it.",
      "Day 17: Play the song that makes you cry. Feel it.",
      "Day 18: What beat matches your heartbeat?",
      "Day 19: Music connects you to your soul.",
      "Day 20: Have a 5-minute dance party for yourself.",
      "Day 21: What lyrics feel like they were written for you?",
      "Day 22: Let music be your prayer.",
      "Day 23: Move in a way that feels like love.",
      "Day 24: What song would you play at your celebration?",
      "Day 25: Sound bath. Close your eyes and listen.",
      "Day 26: How does music help you process?",
      "Day 27: Create the soundtrack to your life.",
      "Day 28: You are the music you've been waiting for."
    ],
    images: [
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800"
    ]
  },
  nature: { 
    prompts: [
      "Day 1: How does being in nature shift your sense of self?",
      "Day 2: What does nature teach you about growth?",
      "Day 3: Stand barefoot. Feel the earth hold you.",
      "Day 4: What element calls to you today: earth, water, air, or fire?",
      "Day 5: Notice 5 things in nature that reflect your beauty.",
      "Day 6: How can you move more slowly, like nature?",
      "Day 7: Let the sun warm your face. Receive it.",
      "Day 8: What season of life are you in?",
      "Day 9: Trees shed to grow. What can you release?",
      "Day 10: Water washes clean. What needs cleansing?",
      "Day 11: Sit under the sky. Remember how big you are.",
      "Day 12: Nature doesn't rush. You don't have to either.",
      "Day 13: Collect something from nature that feels like you.",
      "Day 14: How does fresh air change your mood?",
      "Day 15: Be like the ocean: powerful and calm.",
      "Day 16: What does your body need from nature today?",
      "Day 17: Watch the sunset. Practice being present.",
      "Day 18: You are nature. You are not separate.",
      "Day 19: Plant something. Tend to it with love.",
      "Day 20: Listen to the birds. What are they saying?",
      "Day 21: Nature mirrors you back to yourself.",
      "Day 22: Walk without a destination. Just wander.",
      "Day 23: Thank the earth for holding you.",
      "Day 24: What natural beauty do you overlook?",
      "Day 25: Let the moon remind you to rest.",
      "Day 26: Find a place in nature that feels like home.",
      "Day 27: How does nature help you heal?",
      "Day 28: You belong to the earth, and it belongs to you."
    ], 
    images: [
      "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800",
      "https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800"
    ] 
  },
  fitness: { 
    prompts: [
      "Day 1: What does your body want to express through movement today?",
      "Day 2: How can you honor your body as a vessel of strength?",
      "Day 3: Move for 10 minutes just for joy, not results.",
      "Day 4: What feels strong in your body right now?",
      "Day 5: Stretch with love. Thank each muscle.",
      "Day 6: Fitness is a celebration, not a punishment.",
      "Day 7: What kind of movement makes you feel alive?",
      "Day 8: Listen to your body. Rest is also training.",
      "Day 9: You are athletic. You are capable.",
      "Day 10: Move in a way that feels like self-respect.",
      "Day 11: Strength is built in small reps.",
      "Day 12: How can you make movement playful?",
      "Day 13: Your body is not a problem to fix.",
      "Day 14: Breathe into your workout.",
      "Day 15: What did your body do for you today?",
      "Day 16: Progress over perfection in the gym too.",
      "Day 17: Move to feel good, not to earn food.",
      "Day 18: You are building a strong relationship with yourself.",
      "Day 19: Hydrate. Nourish. Move. Repeat.",
      "Day 20: What would it feel like to love your workout?",
      "Day 21: Your body deserves care, not criticism.",
      "Day 22: Find a movement you actually enjoy.",
      "Day 23: Energy in = Energy out. Fuel yourself.",
      "Day 24: Rest days are productive days.",
      "Day 25: You are getting stronger every day.",
      "Day 26: How can you move with gratitude?",
      "Day 27: Your body is your home. Clean it.",
      "Day 28: You showed up for yourself. That's fitness."
    ], 
    images: [
      "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"
    ] 
  },
  food: { 
    prompts: [
      "Day 1: What does it mean to nourish yourself with love?",
      "Day 2: How can eating become a sacred act of self-care?",
      "Day 3: Cook one meal for yourself today with intention.",
      "Day 4: What foods make you feel energized and loved?",
      "Day 5: Eat slowly. Taste every bite.",
      "Day 6: Food is not the enemy. It's medicine.",
      "Day 7: What would you feed someone you love?",
      "Day 8: Nourish your cravings with compassion.",
      "Day 9: Drink water like it's an act of love.",
      "Day 10: Make your plate beautiful. You deserve that.",
      "Day 11: What is your body asking for right now?",
      "Day 12: No guilt. Only nourishment.",
      "Day 13: Shop for groceries like you're shopping for you.",
      "Day 14: Try one new recipe this week.",
      "Day 15: How can you make mealtime peaceful?",
      "Day 16: You are allowed to enjoy food.",
      "Day 17: What foods connect you to home?",
      "Day 18: Feed your soul, not just your body.",
      "Day 19: Create a ritual around one meal.",
      "Day 20: What would 'enough' look like on your plate?",
      "Day 21: Thank the hands that made your food.",
      "Day 22: Food can be comfort without shame.",
      "Day 23: What nutrients does your body need?",
      "Day 24: Eat with all your senses.",
      "Day 25: You deserve meals that taste good.",
      "Day 26: How can you honor your hunger?",
      "Day 27: Cooking for yourself is self-love.",
      "Day 28: You nourish you. And that is powerful."
    ], 
    images: [
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800"
    ] 
  },
  selfcare: { 
    prompts: [
      "Day 1: What self-care ritual makes you feel most loved?",
      "Day 2: How can you turn self-care into a non-negotiable?",
      "Day 3: Take a 15-minute break just for you.",
      "Day 4: What does your nervous system need right now?",
      "Day 5: Say no to one thing that drains you.",
      "Day 6: Self-care is not selfish. It's survival.",
      "Day 7: What brings you comfort today?",
      "Day 8: Take a bath. Light a candle. Breathe.",
      "Day 9: How can you soften today?",
      "Day 10: Put your phone down for 1 hour.",
      "Day 11: What would feel like a hug right now?",
      "Day 12: Schedule joy like you schedule work.",
      "Day 13: You are allowed to rest.",
      "Day 14: What boundary protects your peace?",
      "Day 15: Do one thing that makes future-you grateful.",
      "Day 16: Self-care looks different every day.",
      "Day 17: Check in with yourself. Really.",
      "Day 18: What can you delegate or drop?",
      "Day 19: Nourish your mind with good content.",
      "Day 20: Move your body gently.",
      "Day 21: You don't have to earn rest.",
      "Day 22: What would kindness look like today?",
      "Day 23: Protect your energy fiercely.",
      "Day 24: Create a cozy space for yourself.",
      "Day 25: Say kind things to yourself out loud.",
      "Day 26: What are you craving? Give it to yourself.",
      "Day 27: You are worthy of care every day.",
      "Day 28: Keep showing up for yourself."
    ], 
    images: [
      "https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&w=800"
    ] 
  },
  rituals: { 
    prompts: [
      "Day 1: How can skincare become a ritual of self-love?",
      "Day 2: What is the power of flowers and softness?",
      "Day 3: Create a morning ritual just for you.",
      "Day 4: Light a candle and set an intention.",
      "Day 5: How can you make bedtime sacred?",
      "Day 6: Anoint yourself with oil. You are holy.",
      "Day 7: What ritual helps you feel grounded?",
      "Day 8: Write yourself a love note weekly.",
      "Day 9: Create a playlist for your ritual.",
      "Day 10: Use your hands. Make something.",
      "Day 11: Ritual is repetition with meaning.",
      "Day 12: How can you honor the moon phases?",
      "Day 13: Cleanse your space with intention.",
      "Day 14: What scent makes you feel safe?",
      "Day 15: Dress up for yourself today.",
      "Day 16: Create an altar to yourself.",
      "Day 17: Rituals don't have to be perfect.",
      "Day 18: Thank yourself for showing up.",
      "Day 19: What ritual helps you transition?",
      "Day 20: Use beautiful things daily.",
      "Day 21: Touch yourself with kindness.",
      "Day 22: How can you ritualize your coffee/tea?",
      "Day 23: Create a closing ritual for your day.",
      "Day 24: What do you want to celebrate?",
      "Day 25: Ritualize your journaling.",
      "Day 26: Move your body as ritual.",
      "Day 27: You are the ritual you've been waiting for.",
      "Day 28: Keep your promises to yourself."
    ], 
    images: [
      "https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&w=800"
    ] 
  },
  journal: { 
    prompts: [
      "Day 1: Describe the version of yourself you are becoming.",
      "Day 2: Write a love letter to yourself.",
      "Day 3: What are you proud of that no one knows?",
      "Day 4: What story are you ready to release?",
      "Day 5: How do you want to feel in 30 days?",
      "Day 6: What did you learn about yourself this week?",
      "Day 7: Write down 10 things you love about you.",
      "Day 8: What do you need to hear today?",
      "Day 9: Describe your perfect day.",
      "Day 10: What are you no longer available for?",
      "Day 11: How has your definition of love changed?",
      "Day 12: What are you grateful for in your body?",
      "Day 13: Write to your younger self.",
      "Day 14: What boundaries do you need?",
      "Day 15: What does freedom mean to you?",
      "Day 16: How do you talk to yourself?",
      "Day 17: What is your heart asking for?",
      "Day 18: Describe a moment you felt powerful.",
      "Day 19: What are you creating?",
      "Day 20: What would you do if you trusted yourself?",
      "Day 21: Write about a time you overcame something.",
      "Day 22: What does success look like for you?",
      "Day 23: How can you be more you?",
      "Day 24: What are you calling in?",
      "Day 25: Write about your values.",
      "Day 26: What makes you feel alive?",
      "Day 27: What is your truth today?",
      "Day 28: Dear me: You did it. You're here."
    ], 
    images: [
      "https://images.pexels.com/photos/35537/pexels-photo.jpg?auto=compress&w=800",
      "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800",
      "https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpg?auto=compress&w=800",
      "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&w=800"
    ] 
  }
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [activeTab, setActiveTab] = useState('manifest')
  const [day, setDay] = useState(1)

  const getImageForDay = (cat: keyof typeof data, dayNum: number) => {
    const imgIndex = Math.floor((dayNum - 1) / 7)
    return data[cat].images[imgIndex]
  }

  const canView = (cat: string, dayNum: number) => {
    if (isPaid) return true
    const freeCats = ['manifest', 'motivate', 'Music/Dance']
    return freeCats.includes(cat) && dayNum === 1
  }

  const handleCheckout = () => {
    window.location.href = "https://buy.stripe.com/00w14n8JPakTfMv7sx7bW02"
  }

  if (!started) {
    return (
      <div style={{minHeight:'100vh', backgroundImage:"url('https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg')", backgroundSize:'cover', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', color:'white', textAlign:'center', padding:'20px'}}>
        <h1 style={{fontSize:'48px', marginBottom:'16px'}}>Become Your Own Lover</h1>
        <p style={{fontSize:'20px', marginBottom:'32px'}}>28 days of inner connection and self-love</p>
        <button onClick={()=>setStarted(true)} style={{padding:'16px 32px', fontSize:'18px', background:'#f97316', border:'none', borderRadius:'8px', color:'white', marginBottom:'12px', cursor:'pointer'}}>Start Free Preview</button>
        <button onClick={handleCheckout} style={{padding:'16px 32px', fontSize:'18px', background:'#06b6d4', border:'none', borderRadius:'8px', color:'white', cursor:'pointer'}}>Unlock Full 28 Days - $21.21</button>
      </div>
    )
  }

  const currentCat = activeTab as keyof typeof data
  const currentPrompt = data[currentCat].prompts[day-1] || "Content coming soon"
  const currentImage = getImageForDay(currentCat, day)
  const locked =!canView(activeTab, day)

  return (
    <div style={{padding:'20px', maxWidth:'900px', margin:'0 auto'}}>
      <h1>Become Your Own Lover</h1>
      <div style={{display:'flex', gap:'8px', marginBottom:'20px', flexWrap:'wrap'}}>
        {Object.keys(data).map(cat => (
          <button key={cat} onClick={()=>{setActiveTab(cat); setDay(1)}}
            style={{padding:'8px 16px', background: activeTab===cat? '#f97316' : '#e5e7eb', border:'none', borderRadius:'8px', cursor:'pointer'}}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{border:'1px solid #ddd', padding:'20px', borderRadius:'12px'}}>
        <h2>{activeTab} - Day {day}</h2>

        {locked? (
          <div style={{textAlign:'center', padding:'40px'}}>
            <p style={{fontSize:'18px', marginBottom:'16px'}}>🔒 Unlock Day {day} and all other categories</p>
            <button onClick={handleCheckout} style={{padding:'14px 28px', background:'#06b6d4', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', cursor:'pointer'}}>
              Unlock Full Access - $21.21
            </button>
          </div>
        ) : (
          <>
            <img src={currentImage} alt="prompt" style={{width:'100%', height:'300px', objectFit:'cover', borderRadius:'8px', marginBottom:'16px'}} />
            <p style={{fontSize:'20px', fontStyle:'italic', marginBottom:'20px'}}>"{currentPrompt}"</p>
            <div style={{display:'flex', gap:'12px'}}>
              <button onClick={()=>setDay(d=>Math.max(1, d-1))} disabled={day<=1} style={{padding:'12px 24px', background:'#e5e7eb', border:'none', borderRadius:'8px', cursor:'pointer'}}>Prev</button>
              <button onClick={()=>setDay(d=>Math.min(28, d+1))} disabled={day>=28} style={{padding:'12px 24px', background:'#f97316', color:'white', border:'none', borderRadius:'8px', cursor:'pointer'}}>Next Day</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
