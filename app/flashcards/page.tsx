'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notes } from '@/data/notes'
import { useLang } from '../components/ui'

export default function Flashcards() {
  const { lang } = useLang()
  const isNe = lang === 'ne'

  const allCards = notes.flatMap(n =>
    n.items.map(item => ({
      id: `${n.id}-${item.title}`,
      subject: n.title,
      icon: n.icon,
      front: item.title,
      back: item.content.split('\n')[0],
    }))
  )

  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem('bato-known') || '[]') } catch { return [] }
  })

  const card = allCards[idx]
  const isKnown = card ? known.includes(card.front) : false

  const mark = (v: boolean) => {
    if (!card) return
    const next = v ? [...known, card.front] : known.filter(k => k !== card.front)
    setKnown(next)
    localStorage.setItem('bato-known', JSON.stringify(next))
  }

  const next = (dir: 1 | -1) => {
    setFlipped(false)
    setIdx(i => (i + dir + allCards.length) % allCards.length)
  }

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn">← {isNe ? 'होम' : 'Home'}</Link>
        <span className="nav-title">🃏 {isNe ? 'फ्लैशकार्ड' : 'Flashcards'}</span>
        <div />
      </div>
      <div className="page-content">
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            {idx + 1} / {allCards.length} • {isNe ? 'थिचेर पल्टाउनुहोस्' : 'tap to flip'}
          </div>
        </div>

        {card && (
          <div style={{ perspective: 1200, marginBottom: 16 }}>
            <div
              onClick={() => setFlipped(f => !f)}
              style={{
                position: 'relative', minHeight: 220, cursor: 'pointer',
                transformStyle: 'preserve-3d', transition: 'transform 0.5s',
                transform: flipped ? 'rotateY(180deg)' : 'none',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: 24, textAlign: 'center',
              }}>
                <span style={{ fontSize: 40, marginBottom: 12 }}>{card.icon}</span>
                <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 700, marginBottom: 6 }}>{card.subject}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', lineHeight: 1.4 }}>{card.front}</div>
              </div>
              <div style={{
                position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'var(--card)', border: '1px solid var(--primary)', borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 20, fontSize: 14, lineHeight: 1.7, color: 'var(--text)',
              }}>
                {card.back}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => next(-1)}>← {isNe ? 'अघिल्लो' : 'Prev'}</button>
          <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => next(1)}>{isNe ? 'अर्को' : 'Next'} →</button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`btn btn-sm ${isKnown ? 'btn-outline' : 'btn-primary'}`}
            style={{ flex: 1 }}
            onClick={() => mark(!isKnown)}
          >
            {isKnown ? (isNe ? '↩️ पुन: अभ्यास' : '↩️ Review again') : (isNe ? '✅ जानें' : '✅ I know this')}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--muted)' }}>
          {isNe ? `${known.length} वटा कार्ड जानें भयो` : `${known.length} cards marked known`}
        </div>
      </div>
    </div>
  )
}
