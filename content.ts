export type SectionId =
  | "manifest"
  | "motivate"
  | "journal"
  | "fitness"
  | "food"
  | "selfcare"
  | "nature"
  | "music"
  | "rituals"
  | "writings"

export type Section = {
  id: SectionId
  label: string
  title: string
  intro: string
  image?: string
  /** Rotating affirmations / prompts shown in the "draw a card" area. */
  cards: string[]
  cardLabel: string
  cardCta: string
}

export const SECTIONS: Section[] = [
  {
    id: "manifest",
    label: "Manifest",
    title: "Manifest",
    intro:
      "Speak to the life already unfolding for you. Draw an affirmation, breathe it in, and let it become true.",
    image: "/images/manifest.png",
    cardLabel: "Today's affirmation",
    cardCta: "Draw an affirmation",
    cards: [
      "I am worthy of the love I so freely give to others.",
      "Abundance flows to me because I am open to receiving it.",
      "I am becoming the woman I have always dreamed of being.",
      "Everything I need is already within me.",
      "I trust the timing of my life.",
      "I magnetize joy, softness, and ease into my days.",
      "The love I seek begins with the love I give myself.",
      "I am allowed to take up space and shine.",
      "My dreams are valid, and I am capable of reaching them.",
      "I release what no longer serves me and welcome what does.",
    ],
  },
  {
    id: "motivate",
    label: "Motivate",
    title: "Motivate",
    intro:
      "A gentle spark for the days that feel heavy. You are allowed to rest and still keep going.",
    image: "/images/motivate.png",
    cardLabel: "A word for you",
    cardCta: "Give me a spark",
    cards: [
      "You have survived every hard day so far. That is not nothing.",
      "Progress is still progress, even when it is quiet.",
      "You do not have to do it all today. Just the next small thing.",
      "Rest is productive. Softness is strength.",
      "Your pace is the right pace.",
      "Bloom slowly. You are not behind.",
      "The version of you that you're becoming is proud of you.",
      "Small steps in the same direction become a whole journey.",
      "You are allowed to begin again, as many times as you need.",
      "Being gentle with yourself is a radical act of courage.",
    ],
  },
  {
    id: "journal",
    label: "Journal",
    title: "Journal",
    intro:
      "Meet yourself on the page. Draw a prompt, or simply write whatever wants to be said.",
    image: "/images/journal.png",
    cardLabel: "Reflection prompt",
    cardCta: "New prompt",
    cards: [
      "What does love feel like in your body right now?",
      "Write a letter to the version of you from five years ago.",
      "What are three things you forgive yourself for today?",
      "When do you feel most like yourself?",
      "What would you do if you fully trusted yourself?",
      "Describe a moment you felt truly at peace. What made it so?",
      "What is a story you tell about yourself that is ready to change?",
      "What does your heart need more of? What does it need less of?",
      "Who are you when no one is watching, and do you like her?",
      "What would self-love look like if it were easy today?",
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    title: "Move With Love",
    intro:
      "Movement as devotion, not punishment. Honor your body for all it carries you through.",
    image: "/images/fitness.png",
    cardLabel: "Gentle movement",
    cardCta: "Suggest movement",
    cards: [
      "Stretch toward the ceiling and take three slow, full breaths.",
      "Take a ten-minute walk and notice five beautiful things.",
      "Dance to one song like nobody is watching.",
      "Roll your shoulders back and soften your jaw. You've been holding tension.",
      "Lie down, place a hand on your belly, and just breathe for two minutes.",
      "Do a slow spinal roll — chin to chest, unfurl one vertebra at a time.",
      "Shake out your hands and feet. Let the stress leave your body.",
      "Try a gentle forward fold and let your head hang heavy.",
      "Balance on one foot and feel how strong you are.",
      "Stretch your arms wide and take up all the space you deserve.",
    ],
  },
  {
    id: "food",
    label: "Food",
    title: "Nourish",
    intro:
      "Feed yourself the way you would feed someone you adore. You are worthy of nourishment.",
    image: "/images/food.png",
    cardLabel: "Nourishing idea",
    cardCta: "Nourish me",
    cards: [
      "Pour a glass of water and drink it slowly, like a small ceremony.",
      "Make yourself a warm drink and hold the mug with both hands.",
      "Add something colorful and fresh to your next meal.",
      "Eat one thing today without any screens, just presence.",
      "Prepare a snack you loved as a child.",
      "Season your food with intention. You deserve flavor and delight.",
      "Sit down to eat. You are not too busy to be nourished.",
      "Choose a food that makes your body feel strong and steady.",
      "Let yourself enjoy a treat with zero guilt.",
      "Cook something slow and let the kitchen smell like care.",
    ],
  },
  {
    id: "selfcare",
    label: "Self Care",
    title: "Self Care",
    intro:
      "Small rituals of tenderness. Choose one act of care and give it to yourself today.",
    image: "/images/selfcare.png",
    cardLabel: "An act of care",
    cardCta: "Care for me",
    cards: [
      "Run a warm bath or a long shower and let the day dissolve.",
      "Put on your softest clothes and wrap yourself in something cozy.",
      "Light a candle and sit with it for a few quiet minutes.",
      "Massage lotion into your hands slowly, thanking them for their work.",
      "Say no to one thing that drains you today.",
      "Text someone who makes you feel safe.",
      "Tidy one small corner and let the space breathe.",
      "Put your phone away for an hour and be with yourself.",
      "Look in the mirror and offer yourself one true compliment.",
      "Go to bed a little earlier. Sleep is an act of self-respect.",
    ],
  },
  {
    id: "nature",
    label: "Nature",
    title: "Return to Nature",
    intro:
      "Step outside and remember you belong to the earth. Let the natural world hold you.",
    image: "/images/nature.png",
    cardLabel: "A moment outside",
    cardCta: "Take me outside",
    cards: [
      "Stand in the sun for a few minutes and feel it on your skin.",
      "Find a tree and notice how patiently it grows.",
      "Watch the sky change and let your thoughts drift with the clouds.",
      "Touch something growing — grass, a leaf, a petal.",
      "Listen for three natural sounds and let them settle you.",
      "Take your shoes off and feel the ground beneath you.",
      "Watch the sunrise or sunset and thank the day.",
      "Bring one small piece of nature indoors — a flower, a stone.",
      "Breathe in fresh air and imagine it clearing your mind.",
      "Notice the moon tonight and remember you are part of something vast.",
    ],
  },
  {
    id: "music",
    label: "Music & Dance",
    title: "Music & Dance",
    intro:
      "Let your body move and your spirit rise. Joy is a birthright, and it lives in motion.",
    image: "/images/music.png",
    cardLabel: "An invitation to move",
    cardCta: "Move my spirit",
    cards: [
      "Play the song that always makes you feel alive.",
      "Dance around your room with the lights low.",
      "Hum a melody and feel it vibrate in your chest.",
      "Make a playlist for the woman you are becoming.",
      "Sway slowly to something soft and hold yourself close.",
      "Sing loudly in the shower or the car. Let it out.",
      "Move however your body wants to — no rules, no watching.",
      "Put on a beat and let your shoulders lead.",
      "Slow dance with yourself and feel the tenderness of it.",
      "Let one song be a full-body celebration of being here.",
    ],
  },
  {
    id: "rituals",
    label: "Rituals",
    title: "Rituals",
    intro:
      "Sacred, simple practices to mark your days. Ritual turns the ordinary into the holy.",
    image: "/images/rituals.png",
    cardLabel: "A ritual for now",
    cardCta: "Offer a ritual",
    cards: [
      "Light a candle and set one gentle intention for your day.",
      "Write down three things you're grateful for before bed.",
      "Place a hand on your heart and whisper, 'I am here for you.'",
      "Create a small morning ritual: water, breath, one kind word.",
      "Choose a word for the season of life you're in.",
      "Cleanse your space — open a window, let old energy leave.",
      "Hold a warm drink and name what you're releasing.",
      "End the day by forgiving yourself for something small.",
      "Draw a card each morning and let it guide your softness.",
      "Make your bed like you're preparing a sanctuary for someone you love.",
    ],
  },
]

export const MOODS = [
  "Tender",
  "Hopeful",
  "Tired",
  "Grateful",
  "Restless",
  "Peaceful",
  "Heavy",
  "Radiant",
]

export function getSection(id: SectionId) {
  return SECTIONS.find((s) => s.id === id)
}
