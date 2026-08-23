'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { getPerfMode, setPerfMode } from './perf-mode'
import type { PerfMode } from './perf-mode'

export type Lang = 'en' | 'ne'

const dict: Record<Lang, Record<string, string>> = {
  en: {
    appTitle: 'bato',
    appSub: 'YOUR PATH TO ENGINEERING & MEDICAL',
    tagline: 'Free prep for IOE, KU & CEE entrance',
    // hero
    heroTitle1: 'Prepare the',
    heroTitle2: 'Right Way',
    heroSub: 'Free IOE, KU & medical (CEE) entrance prep — mock tests, past papers, notes, and rank predictors for engineering and medicine.',
    badgeFree: '🆓 Free',
    badgeMock: '📝 Mock Tests',
    badgePast: '📄 Past Papers',
    badgePredictor: '🎯 Rank Predictors',
    // features
    featuresTitle: 'What can you do here?',
    featuresSub: 'Everything is free — no login needed',
    mockName: 'Mock Test',
    mockDesc: 'Timed tests from past year questions. See your score and weak areas instantly.',
    mockTags: 'Math • Physics • Chemistry • Biology',
    predName: 'Branch Predictor',
    predDesc: 'Enter your expected score and see which IOE branches you can get, based on past cutoffs.',
    predTag: 'IOE Cutoffs',
    pastName: 'Past Papers',
    pastDesc: 'Browse IOE, KU & medical entrance and semester papers by year and subject.',
    pastTag: '2075–2082',
    comingSoon: 'Medical predictor live! 🩺',
    footer1: 'bato — free and open source. Contribute on GitHub.',
    footer2: 'Built with ❤️ for Nepal\u2019s future engineers & doctors',
  },
  ne: {
    appTitle: 'बाटो',
    appSub: 'इन्जिनियरिङ र मेडिकलको बाटो',
    tagline: 'IOE, KU र CEE प्रवेश परीक्षाको निःशुल्क तयारी',
    // hero
    heroTitle1: 'तयारी हो',
    heroTitle2: 'सही बाटो',
    heroSub: 'निःशुल्क IOE, KU र मेडिकल (CEE) प्रवेश परीक्षाको तयारी — mock test, past papers, notes, र engineering/medicine का rank predictors।',
    badgeFree: '🆓 निःशुल्क',
    badgeMock: '📝 Mock Tests',
    badgePast: '📄 Past Papers',
    badgePredictor: '🎯 Rank Predictors',
    // features
    featuresTitle: 'के गर्न सक्नुहुन्छ?',
    featuresSub: 'सबै निःशुल्क — login चाहिँदैन',
    mockName: 'Mock Test',
    mockDesc: 'पुराना प्रश्नहरूमा आधारित समयबद्ध परीक्षा। नतिजा र कमजोर क्षेत्र तुरुन्तै हेर्नुहोस्।',
    mockTags: 'गणित • भौतिक • रसायन • जीवविज्ञान',
    predName: 'Branch Predictor',
    predDesc: 'आफ्नो score राख्नुहोस् — past cutoffs को आधारमा कुन IOE branch पाउन सकिन्छ हेर्नुहोस्।',
    predTag: 'IOE Cutoffs',
    pastName: 'Past Papers',
    pastDesc: 'IOE, KU र मेडिकल entrance र semester का प्रश्नपत्रहरू year र subject अनुसार।',
    pastTag: '२०७५–२०८२',
    comingSoon: 'मेडिकल predictor live! 🩺',
    footer1: 'बाटो — निःशुल्क र खुला स्रोत। GitHub मा योगदान गर्नुहोस्।',
    footer2: 'नेपालका भावी इन्जिनियर र डाक्टरहरूका लागि ❤️ का साथ',
  },
}

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (k: string) => string
}

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: k => k })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  useEffect(() => {
    const saved = localStorage.getItem('bato-lang')
    if (saved === 'ne' || saved === 'en') setLangState(saved)
  }, [])
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem('bato-lang', l) }
  const t = (k: string) => dict[lang][k] ?? dict.en[k] ?? k
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useLang() { return useContext(Ctx) }

export function LangToggle() {
  const { lang, setLang } = useLang()
  const label = lang === 'en' ? 'नेपाली' : 'English'
  const other = lang === 'en' ? 'ne' : 'en'
  return (
    <button
      className="lang-toggle"
      onClick={() => setLang(other)}
      title={label}
      aria-label={`Switch to ${label}`}
    >
      🌐 {label}
    </button>
  )
}

const THEMES = [
  { id: 'light',  icon: '☀️', label: 'Light' },
  { id: 'dark',   icon: '🌙', label: 'Dark' },
  { id: 'forest', icon: '🌿', label: 'Forest' },
  { id: 'ocean',  icon: '🌊', label: 'Ocean' },
] as const

export function PerfToggle() {
  const [mode, setMode] = useState<PerfMode>('full')
  useEffect(() => {
    setMode(getPerfMode())
  }, [])
  const toggle = () => {
    const next = mode === 'full' ? 'lite' : 'full'
    setPerfMode(next)
    setMode(next)
  }
  return (
    <button
      className={`theme-switcher-btn perf-toggle${mode === 'full' ? ' perf-full' : ''}`}
      onClick={toggle}
      title={mode === 'full' ? '✨ Full effects' : '🔋 Lite mode'}
      aria-label={mode === 'full' ? 'Switch to lite mode' : 'Switch to full effects'}
    >
      {mode === 'full' ? '✨' : '🔋'}
    </button>
  )
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<typeof THEMES[number]['id']>('light')
  useEffect(() => {
    const t = document.documentElement.dataset.theme as typeof THEMES[number]['id']
    if (t) setTheme(t)
  }, [])
  const pick = (id: typeof THEMES[number]['id']) => {
    setTheme(id)
    document.documentElement.dataset.theme = id
    localStorage.setItem('bato-theme', id)
  }
  return (
    <div className="theme-switcher" role="radiogroup" aria-label="Theme">
      {THEMES.map(t => (
        <button
          key={t.id}
          className={`theme-switcher-btn${theme === t.id ? ' active' : ''}`}
          onClick={() => pick(t.id)}
          title={t.label}
          aria-label={t.label}
          aria-checked={theme === t.id}
          role="radio"
        >
          {t.icon}
        </button>
      ))}
    </div>
  )
}

// ── Support button + QR modal (self-contained) ─────────────────────────────
const QR_PAL: Record<string, string[]> = {
  light:  ['#4f46e5', '#7c3aed', '#f59e0b', '#818cf8', '#c084fc'],
  dark:   ['#818cf8', '#a78bfa', '#fbbf24', '#38bdf8', '#34d399'],
  forest: ['#34d399', '#4ade80', '#fbbf24', '#f97316', '#86efac'],
  ocean:  ['#38bdf8', '#0ea5e9', '#818cf8', '#06b6d4', '#22d3ee'],
}

function QrBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0, H = 0, DPR = 1
    const theme = () => document.documentElement.dataset.theme ?? 'light'
    const pal = () => QR_PAL[theme()] ?? QR_PAL.light
    let mx = -9999, my = -9999

    interface Mote { x: number; y: number; vx: number; vy: number; c: string; s: number; ph: number }
    let motes: Mote[] = []

    const mk = (): Mote[] => {
      const p = pal()
      return Array.from({ length: 44 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        c: p[Math.floor(Math.random() * p.length)],
        s: 1.5 + Math.random() * 2.5,
        ph: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.parentElement?.getBoundingClientRect()
      W = rect?.width ?? 200; H = rect?.height ?? 200
      canvas.width = W * DPR; canvas.height = H * DPR
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      motes = mk()
    }
    resize()
    window.addEventListener('resize', resize)
    // listen on the container (not just the canvas) so the whole box is interactive
    const box = canvas.parentElement
    const onMove = (e: MouseEvent) => {
      if (!box) return
      const r = box.getBoundingClientRect()
      mx = e.clientX - r.left; my = e.clientY - r.top
    }
    const onLeave = () => { mx = -9999; my = -9999 }
    box?.addEventListener('mousemove', onMove)
    box?.addEventListener('mouseleave', onLeave)

    const mo = new MutationObserver(() => { motes = mk() })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let raf = 0
    const draw = () => {
      raf = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, W, H)
      for (const m of motes) {
        const dx = mx - m.x, dy = my - m.y
        const d2 = dx * dx + dy * dy
        if (d2 < 6400) { // 80px radius — gentle attract
          const d = Math.sqrt(d2) || 1
          m.vx += (dx / d) * 0.12
          m.vy += (dy / d) * 0.12
        }
        m.vx *= 0.985; m.vy *= 0.985
        m.x += m.vx; m.y += m.vy
        if (m.x < -10) m.x = W + 10
        if (m.x > W + 10) m.x = -10
        if (m.y < -10) m.y = H + 10
        if (m.y > H + 10) m.y = -10
        m.ph += 0.02
        const tw = 0.45 + 0.4 * Math.sin(m.ph)
        ctx.globalAlpha = 0.16 * tw
        ctx.fillStyle = m.c
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.s, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    if (!reduced) raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      box?.removeEventListener('mousemove', onMove)
      box?.removeEventListener('mouseleave', onLeave)
      mo.disconnect()
    }
  }, [])
  return <canvas ref={ref} aria-hidden="true" />
}

export function SupportButton() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className="lang-toggle support-btn"
        onClick={() => setOpen(true)}
        title={isNe ? 'साथ दिनुहोस्' : 'Keep बाटो free'}
        aria-label={isNe ? 'साथ दिनुहोस्' : 'Support us'}
      >
        <span className="support-btn-heart">❤️</span>
        {isNe ? 'साथ' : 'Keep free'}
      </button>
      {open && typeof document !== 'undefined' && createPortal(
        <div className="support-modal" onClick={() => setOpen(false)}>
          <div className="support-modal-card" onClick={e => e.stopPropagation()}>
            <QrBackdrop />
            <button className="support-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            <div className="support-hearts">
              <span>☕</span><span>❤️</span><span>☕</span>
            </div>
            <div className="support-thanks">
              {isNe ? 'नि:शुल्क, र हामी त्यस्तै राख्न चाहन्छौं' : 'Free, and we\'d like to keep it that way'}
            </div>
            <div className="support-thanks-sub">
              {isNe
                ? 'कुनै विज्ञापन छैन। कुनै शुल्क छैन। विद्यार्थीले नै विद्यार्थीलाई साथ दिने चलन हो। बाटोले मद्दत गरेको छ भने, एउटा चिया नै काफी हुन्छ। ☕'
                : 'No ads, no fees. Just students helping students. If बाटो helped you, a single chai means the world — and keeps it going for the next learner. ☕'}
            </div>
            <div className="support-qr-big">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bato/qr-donate.png" alt="Donate QR" />
            </div>
            <div className="support-scan">
              {isNe ? 'QR scan गरेर साथ दिनुहोस्' : 'Scan the QR to send a chai'}
            </div>
            <div className="support-proof">
              {isNe ? 'हरेक चियाले बाटोलाई सबैका लागि नि:शुल्क राख्छ' : 'One chai keeps बाटो free for everyone'}
            </div>
            <button className="btn btn-gold btn-sm" onClick={() => setOpen(false)}>
              {isNe ? 'बन्द गर्नुहोस्' : 'Close'}
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export function TopBar() {
  const { t } = useLang()
  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">
        <svg className="nav-logo-icon" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#4f46e5" rx="24"/>
          <path d="M100 185 L85 100 L65 100 L40 50" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" fill="none"/>
          <path d="M100 185 L100 100 L100 50" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" fill="none"/>
          <path d="M100 185 L115 100 L135 100 L160 50" stroke="#a5b4fc" strokeWidth="6" strokeLinecap="round" fill="none"/>
          <circle cx="40" cy="50" r="8" fill="#f59e0b"/>
          <circle cx="100" cy="50" r="9" fill="#ffffff" stroke="#a5b4fc" strokeWidth="2"/>
          <circle cx="160" cy="50" r="8" fill="#a5b4fc"/>
        </svg>
        <div>
          <div className="nav-title">{t('appTitle')}</div>
          <div className="nav-sub">{t('appSub')}</div>
        </div>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <PerfToggle />
        <ThemeToggle />
        <SupportButton />
        <LangToggle />
      </div>
    </nav>
  )
}
