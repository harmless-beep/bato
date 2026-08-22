'use client'

import { useEffect, useRef } from 'react'

// ─── 5 hidden easter eggs ───────────────────────────────────────────────
// 1. 🏆 Konami code (↑↑↓↓←→←→BA)  → confetti + toast
// 2. 🥷 Tap the logo 5× fast        → emoji rain + toast
// 3. 🏔️ Type "bato"                 → random Nepali proverb + rain
// 4. ❤️ Tap the footer heart 3×     → heart burst
// 5. 🚀 Tap a countdown banner 5×   → "Bato 2.0" rain
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
const PROVERBS = [
  'आफ्नै पाउमा हिँड्न सिक, अरूको काँधमा होइन।',
  'हरेक ठूलो यात्रा एउटा सानो कदमबाट सुरु हुन्छ।',
  'सिक्ने उमेर कहिल्यै सकिँदैन।',
  'मेहनतको फल मीठो हुन्छ।',
]
const RAIN_EMOJI = ['🌿','❤️','⭐','📚','⚡','🌼','🍀','🏔️']

export default function EasterEggs() {
  const konami = useRef<string[]>([])
  const bato = useRef<string[]>([])
  const logo = useRef<number[]>([])
  const heart = useRef<number[]>([])
  const banner = useRef<number[]>([])

  useEffect(() => {
    const mark = (id: string) => {
      try {
        const f = JSON.parse(localStorage.getItem('bato-eggs') || '[]')
        if (!f.includes(id)) { f.push(id); localStorage.setItem('bato-eggs', JSON.stringify(f)) }
      } catch { /* noop */ }
    }
    const toast = (msg: string) => {
      let el = document.getElementById('egg-toast') as HTMLDivElement | null
      if (!el) { el = document.createElement('div'); el.id = 'egg-toast'; document.body.appendChild(el) }
      el.textContent = msg
      el.classList.remove('show'); void el.offsetWidth; el.classList.add('show')
    }
    const burst = (x: number, y: number, palette: string[], n = 22) => {
      for (let i = 0; i < n; i++) {
        const s = document.createElement('span')
        s.className = 'egg-b'
        s.style.background = palette[i % palette.length]
        s.style.left = `${x}px`; s.style.top = `${y}px`
        s.style.setProperty('--dx', `${(Math.random() - 0.5) * 260}px`)
        s.style.setProperty('--dy', `${-(40 + Math.random() * 220)}px`)
        s.style.setProperty('--rot', `${(Math.random() - 0.5) * 540}deg`)
        document.body.appendChild(s)
        setTimeout(() => s.remove(), 1000)
      }
    }
    const rain = (n = 16) => {
      for (let i = 0; i < n; i++) {
        const s = document.createElement('span')
        s.className = 'egg-r'
        s.textContent = RAIN_EMOJI[i % RAIN_EMOJI.length]
        s.style.left = `${Math.random() * 100}vw`
        s.style.animationDelay = `${Math.random() * 0.7}s`
        s.style.fontSize = `${14 + Math.random() * 20}px`
        document.body.appendChild(s)
        setTimeout(() => s.remove(), 2400)
      }
    }
    const rapid = (arr: number[], n: number) => {
      const now = Date.now()
      arr.push(now)
      while (arr.length && now - arr[0] > 3000) arr.shift()
      return arr.length >= n
    }

    const onKey = (e: KeyboardEvent) => {
      // don't steal keys while typing in a form
      if ((e.target as HTMLElement).closest?.('input, textarea')) return
      // Konami
      if (KONAMI.includes(e.key)) {
        konami.current.push(e.key)
        if (konami.current.length > KONAMI.length) konami.current.shift()
        if (konami.current.join(',') === KONAMI.join(',')) {
          konami.current = []
          mark('konami')
          const el = document.querySelector('.quote-card, .card, main') as HTMLElement | null
          const r = el ? el.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 3 }
          burst(r.left + 200, r.top + 120, ['#4f46e5','#f59e0b','#10b981','#ef4444','#a78bfa'])
          toast('🏆 SECRET CODE! तपाईं PRO हुनुहुन्छ!')
        }
      }
      // "bato"
      if (/^[a-z]$/i.test(e.key)) {
        const expect = 'bato'[bato.current.length]
        if (e.key.toLowerCase() === expect) {
          bato.current.push(e.key)
          if (bato.current.length === 4) {
            bato.current = []
            mark('bato')
            rain(14)
            toast('🏔️ ' + PROVERBS[Math.floor(Math.random() * PROVERBS.length)])
          }
        } else bato.current = []
      }
    }

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('.nav-logo') && rapid(logo.current, 5)) {
        logo.current = []
        mark('logo')
        rain(14)
        toast('🥷 बाटो Ninja! +1 skill unlocked')
      }
      if (t.closest('.heart-emoji') && rapid(heart.current, 3)) {
        heart.current = []
        mark('heart')
        const r = (t.closest('.heart-emoji') as HTMLElement).getBoundingClientRect()
        burst(r.left + r.width / 2, r.top + r.height / 2, ['#ef4444','#f472b6','#fb7185','#e11d48'], 18)
        toast('❤️ माया! बाटोले पनि तपाईंलाई माया गर्छ')
      }
      if (t.closest('.countdown-banner') && rapid(banner.current, 5)) {
        banner.current = []
        mark('banner')
        rain(18)
        toast('🚀 बाटो 2.0 coming soon… (बाटो Ninja सदस्यलाई पहिले!)')
      }
    }

    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return null
}
