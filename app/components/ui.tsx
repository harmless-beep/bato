'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Link from 'next/link'

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

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark')
  }, [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem('bato-theme', next ? 'dark' : 'light')
  }
  return (
    <button
      className="lang-toggle"
      onClick={toggle}
      title={dark ? 'Light mode' : 'Dark mode'}
      aria-label="Toggle dark mode"
    >
      {dark ? '☀️' : '🌙'}
    </button>
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
        <ThemeToggle />
        <LangToggle />
      </div>
    </nav>
  )
}
