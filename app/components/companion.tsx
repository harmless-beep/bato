'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from './ui'

// ─── Companion buddy (overlay pet) ────────────────────────────────────────
// Single click → encouragement bubble · double-click → switch pet
// Listens for window 'bato-mood' events: happy | sad | party
const PETS = [
  { id: 'penguin', emoji: '🐧', name: 'Penguin' },
  { id: 'kangaroo', emoji: '🦘', name: 'Kangaroo' },
  { id: 'goat', emoji: '🐐', name: 'Goat' },
  { id: 'owl', emoji: '🦉', name: 'Owl' },
  { id: 'panda', emoji: '🐼', name: 'Panda' },
]
const MSG = {
  idle: [
    { en: 'Keep going! 💪', np: 'जारी राख्नुहोस्! 💪' },
    { en: 'You got this! 🚀', np: 'तपाईंले गर्न सक्नुहुन्छ! 🚀' },
    { en: 'Bato believes in you! 🫶', np: 'बाटोले तपाईंमा विश्वास गर्छ! 🫶' },
    { en: 'Study smart, not just hard. 📚', np: 'राम्रोसँग पढ्नुहोस्। 📚' },
    { en: 'One more mock test? 😉', np: 'एउटा अर्को mock test? 😉' },
  ],
  happy: [
    { en: 'Hoshyaar! 🎉', np: 'होशियार! 🎉' },
    { en: 'Correct! You rock! 🌟', np: 'सही! तपाईं उत्कृष्ट! 🌟' },
    { en: 'That was clean! ⚡', np: 'एकदम सफा! ⚡' },
    { en: 'Keep the streak alive! 🔥', np: 'Streak जोगाउनुहोस्! 🔥' },
  ],
  sad: [
    { en: 'Next one! 💪', np: 'अर्को पटक! 💪' },
    { en: "Don't give up! 🌱", np: 'हार नमान्नुहोस्! 🌱' },
    { en: 'Learn it, own it. 📝', np: 'सिक्नुहोस्, आफ्नो बनाउनुहोस्। 📝' },
    { en: 'Even toppers miss some! 🤝', np: 'Topper लाई पनि गलत हुन्छ! 🤝' },
  ],
  party: [
    { en: 'WOW! You are a champion! 🏆', np: 'वाह! तपाईं च्याम्पियन! 🏆' },
    { en: 'Amazing score! 🎊', np: 'अति नै राम्रो! 🎊' },
    { en: 'Treat yourself! 🍦', np: 'आफूलाई इनाम दिनुहोस्! 🍦' },
  ],
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export default function Companion() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [pet, setPet] = useState(PETS[0])
  const [mood, setMood] = useState('')
  const [bubble, setBubble] = useState('')
  const clicks = useRef(0)
  const sayTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const say = (m: 'idle' | 'happy' | 'sad' | 'party') => {
    setBubble(pick(MSG[m])[isNe ? 'np' : 'en'])
    setMood(m)
    if (sayTimer.current) clearTimeout(sayTimer.current)
    sayTimer.current = setTimeout(() => { setBubble(''); setMood('') }, 2600)
  }

  useEffect(() => {
    const saved = localStorage.getItem('bato-pet')
    const p = PETS.find(x => x.id === saved)
    if (p) setPet(p)
    const onMood = (e: Event) => {
      const d = (e as CustomEvent).detail
      if (d === 'happy') say('happy')
      else if (d === 'sad') say('sad')
      else if (d === 'party') say('party')
    }
    window.addEventListener('bato-mood', onMood)
    return () => { window.removeEventListener('bato-mood', onMood); if (sayTimer.current) clearTimeout(sayTimer.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClick = () => {
    clicks.current++
    setTimeout(() => {
      if (clicks.current >= 2) {
        clicks.current = 0
        const next = PETS[(PETS.indexOf(pet) + 1) % PETS.length]
        setPet(next); localStorage.setItem('bato-pet', next.id)
        setBubble(`${next.emoji} ${isNe ? 'साथी!' : 'buddy!'}`)
        setMood('happy')
        if (sayTimer.current) clearTimeout(sayTimer.current)
        sayTimer.current = setTimeout(() => { setBubble(''); setMood('') }, 1800)
      } else if (clicks.current === 1) {
        clicks.current = 0
        say('idle')
      }
    }, 280)
  }

  return (
    <div className="companion" onClick={onClick} title={`${pet.name} — ${isNe ? 'क्लिक: प्रोत्साहन, डबल-क्लिक: साथी बदल्नुहोस्' : 'click: cheer up · double-click: switch'}`}>
      {bubble && <div className="companion-bubble">{bubble}</div>}
      <div className={`companion-pet${mood ? ' ' + mood : ''}`}>{pet.emoji}</div>
      <div className="companion-name">{pet.name}</div>
    </div>
  )
}
