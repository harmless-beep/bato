'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLang } from './ui'
import { ACCESSORIES, type Accessory, isUnlocked, readStats, unlockHint, type Stats } from '../../data/wardrobe'

// ─── Companion buddy (overlay pet, bottom-left) ───────────────────────────
// Click → wardrobe drawer (left overlay): pick pet + unlockable outfits.
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
  equip: [
    { en: 'New look! ✨', np: 'नयाँ लुक! ✨' },
    { en: 'Fashion icon! 😎', np: 'फेसन आइकन! 😎' },
    { en: 'Looking sharp! 🕶️', np: 'एकदम राम्रो! 🕶️' },
  ],
  locked: [
    { en: 'Keep going — it unlocks! 🔐', np: 'जारी राख्नुहोस् — खुल्छ! 🔐' },
  ],
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export default function Companion() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [pet, setPet] = useState(PETS[0])
  const [acc, setAcc] = useState<Accessory | null>(null)
  const [mood, setMood] = useState('')
  const [bubble, setBubble] = useState('')
  const [open, setOpen] = useState(false)
  const [stats, setStats] = useState<Stats>({ questions: 0, accuracy: 0, streak: 0, eggs: 0, attempts: 0, suggestions: 0, admin: false })
  const [shakeId, setShakeId] = useState<string | null>(null)
  const sayTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const say = (m: 'idle' | 'happy' | 'sad' | 'party' | 'equip' | 'locked') => {
    setBubble(pick(MSG[m])[isNe ? 'np' : 'en'])
    if (m === 'happy' || m === 'party') setMood(m === 'party' ? 'party' : 'happy')
    if (m === 'sad') setMood('sad')
    if (sayTimer.current) clearTimeout(sayTimer.current)
    sayTimer.current = setTimeout(() => { setBubble(''); setMood('') }, 2600)
  }

  useEffect(() => {
    const savedPet = localStorage.getItem('bato-pet')
    const p = PETS.find(x => x.id === savedPet)
    if (p) setPet(p)
    const savedAcc = localStorage.getItem('bato-outfit')
    const a = ACCESSORIES.find(x => x.id === savedAcc)
    if (a) setAcc(a)
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

  const openWardrobe = () => { setStats(readStats()); setOpen(true) }

  const equip = (a: Accessory) => {
    if (!isUnlocked(a, stats)) {
      setShakeId(a.id); setTimeout(() => setShakeId(null), 500)
      say('locked')
      return
    }
    setAcc(a)
    localStorage.setItem('bato-outfit', a.id)
    say('equip')
  }

  const setPetId = (p: typeof PETS[number]) => {
    setPet(p)
    localStorage.setItem('bato-pet', p.id)
  }

  const unlockedCount = ACCESSORIES.filter(a => isUnlocked(a, stats)).length
  const totalOutfits = ACCESSORIES.length * PETS.length
  const unlockedOutfits = unlockedCount * PETS.length

  return (
    <>
      <div className="companion" onClick={openWardrobe} title={isNe ? 'वार्डरोब खोल्नुहोस्' : 'Open wardrobe'}>
        {bubble && <div className="companion-bubble">{bubble}</div>}
        <div className="companion-pet-wrap">
          {acc && <div className="companion-acc">{acc.emoji}</div>}
          <div className={`companion-pet${mood ? ' ' + mood : ''}`}>{pet.emoji}</div>
        </div>
        <div className="companion-name">{pet.name}</div>
      </div>

      {open && typeof document !== 'undefined' && createPortal(
        <div className="wardrobe-backdrop" onClick={() => setOpen(false)}>
          <div className="wardrobe" onClick={e => e.stopPropagation()}>
            <button className="wardrobe-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            <div className="wardrobe-title">🧥 {isNe ? 'वार्डरोब' : 'Wardrobe'}</div>
            <div className="wardrobe-sub">
              {unlockedOutfits} / {totalOutfits} {isNe ? 'पोशाक' : 'outfits'} {isNe ? 'खुलेका' : 'unlocked'}
            </div>

            <div className="wardrobe-pets">
              {PETS.map(p => (
                <button key={p.id} className={`wardrobe-pet${pet.id === p.id ? ' active' : ''}`} onClick={() => setPetId(p)}>
                  {p.emoji}
                  <span>{p.name}</span>
                </button>
              ))}
            </div>

            <div className="wardrobe-grid">
              {ACCESSORIES.map(a => {
                const unlocked = isUnlocked(a, stats)
                const equipped = acc?.id === a.id
                return (
                  <button
                    key={a.id}
                    className={`wardrobe-item${unlocked ? '' : ' locked'}${equipped ? ' equipped' : ''}${shakeId === a.id ? ' shake' : ''}`}
                    onClick={() => equip(a)}
                    title={unlocked ? (isNe ? a.nameNp : a.name) : `🔒 ${unlockHint(a.unlock, isNe)}`}
                  >
                    <span className="wardrobe-item-emoji">{unlocked ? a.emoji : '🔒'}</span>
                    <span className="wardrobe-item-name">{unlocked ? (isNe ? a.nameNp : a.name) : '🔒'}</span>
                    {equipped && <span className="wardrobe-item-check">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
