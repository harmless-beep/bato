'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { notes } from '@/data/notes'
import { useLang } from '../components/ui'

type Mode = 'entrance' | 'bachelor'

export default function Notes() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [mode, setMode] = useState<Mode>('entrance')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState<string>('all')
  const [open, setOpen] = useState<Set<string>>(new Set())
  const [expandAll, setExpandAll] = useState(false)
  const [flashMode, setFlashMode] = useState(false)
  const [flipped, setFlipped] = useState<Set<string>>(new Set())
  const [known, setKnown] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem('bato-known') || '[]') } catch { return [] }
  })

  const entranceIds = ['math', 'physics', 'chemistry', 'english', 'aptitude', 'med-phy', 'med-chem', 'med-bio']
  const bachelorIds = ['sem1', 'sem2', 'sem3', 'sem4', 'sem5']

  const visible = useMemo(() => {
    const ids = mode === 'entrance' ? entranceIds : bachelorIds
    const q = query.trim().toLowerCase()
    return notes
      .filter(n => ids.includes(n.id))
      .filter(n => activeId === 'all' || n.id === activeId)
      .flatMap(n =>
        n.items
          .filter(i => !q || i.title.toLowerCase().includes(q) || i.content.toLowerCase().includes(q))
          .map(i => ({ ...i, subject: n }))
      )
  }, [mode, activeId, query])

  const sorted = useMemo(() => {
    const knownSet = new Set(known)
    return [...visible].sort((a, b) => {
      const aK = knownSet.has(a.title) ? 1 : 0
      const bK = knownSet.has(b.title) ? 1 : 0
      return aK - bK
    })
  }, [visible, known])

  const toggleNote = (key: string) => {
    setOpen(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n })
  }

  const toggleFlip = (key: string) => {
    setFlipped(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n })
  }

  const markKnown = (title: string) => {
    const next = known.includes(title) ? known.filter(k => k !== title) : [...known, title]
    setKnown(next)
    localStorage.setItem('bato-known', JSON.stringify(next))
  }

  const handleExpandAll = () => {
    if (expandAll) { setOpen(new Set()); setExpandAll(false) }
    else { setOpen(new Set(sorted.map((_, i) => `note-${i}`))); setExpandAll(true) }
  }

  const renderLine = (line: string, i: number) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith('**') && p.endsWith('**') ? <strong key={j}>{p.slice(2, -2)}</strong> : <span key={j}>{p}</span>
    )
    if (/^#{3} /.test(line)) return <h4 key={i} style={{ margin: '10px 0 4px', fontSize: 13, color: 'var(--primary)' }}>{line.replace(/^#{3} /, '')}</h4>
    if (/^#{2} /.test(line)) return <h3 key={i} style={{ margin: '12px 0 4px', fontSize: 14 }}>{line.replace(/^#{2} /, '')}</h3>
    if (/^- /.test(line)) return <div key={i} style={{ paddingLeft: 14, margin: '3px 0' }}>• {parts}</div>
    if (line.trim() === '') return <div key={i} style={{ height: 8 }} />
    return <p key={i} style={{ margin: '4px 0', lineHeight: 1.6 }}>{parts}</p>
  }

  const renderMd = (md: string) => md.split('\n').map(renderLine)

  const filterSections = notes.filter(n => (mode === 'entrance' ? entranceIds : bachelorIds).includes(n.id))

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn">← {isNe ? 'होम' : 'Home'}</Link>
        <span className="nav-title">📖 {isNe ? 'Notes' : 'Notes'}</span>
        <div />
      </div>

      <div className="page-content">
        {/* Entrance / Bachelor / Medical toggle */}
        <div style={{ display: 'flex', gap: 0, background: 'var(--card)', borderRadius: 12, padding: 4, marginBottom: 16, border: '1px solid var(--border)' }}>
          <button
            onClick={() => { setMode('entrance'); setActiveId('all'); setOpen(new Set()); setFlashMode(false) }}
            style={{
              flex: 1, padding: '10px 8px', borderRadius: 9,
              border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
              background: mode === 'entrance' ? 'var(--primary)' : 'transparent',
              color: mode === 'entrance' ? 'white' : 'var(--muted)',
              transition: 'all 0.2s',
            }}
          >
            🎓 {isNe ? 'Entrance' : 'Entrance'}
          </button>
          <button
            onClick={() => { setMode('bachelor'); setActiveId('all'); setOpen(new Set()); setFlashMode(false) }}
            style={{
              flex: 1, padding: '10px 8px', borderRadius: 9,
              border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
              background: mode === 'bachelor' ? 'var(--primary)' : 'transparent',
              color: mode === 'bachelor' ? 'white' : 'var(--muted)',
              transition: 'all 0.2s',
            }}
          >
            🏫 {isNe ? 'Bachelor' : 'Bachelor'}
          </button>
        </div>

        {mode === 'bachelor' && (
          <Link href="/past-papers" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ padding: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12, border: '1.5px solid var(--primary)' }}>
              <span style={{ fontSize: 26 }}>📄</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>
                  {isNe ? 'Bachelor: पुराना प्रश्नपत्रहरू' : 'Bachelor: Past Papers'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {isNe ? 'Semester-wise IOE papers (Math I-III, Physics, Chemistry) →' : 'Semester-wise IOE papers (Math I–III, Physics, Chemistry) →'}
                </div>
              </div>
              <span style={{ fontSize: 18, color: 'var(--primary)' }}>→</span>
            </div>
          </Link>
        )}

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: 14 }}>🔍</span>
          <input
            className="input"
            style={{ paddingLeft: 40, width: '100%', boxSizing: 'border-box' }}
            placeholder={isNe ? 'नोट खोज्नुहोस्...' : 'Search notes...'}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {/* Subject chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 8, scrollbarWidth: 'none' }}>
          <button className={`chip ${activeId === 'all' ? 'active' : ''}`} onClick={() => { setActiveId('all'); setOpen(new Set()) }} style={{ flexShrink: 0 }}>
            📋 {isNe ? 'सबै' : 'All'}
          </button>
          {filterSections.map(n => (
            <button key={n.id} className={`chip ${activeId === n.id ? 'active' : ''}`} onClick={() => { setActiveId(n.id); setOpen(new Set()) }} style={{ flexShrink: 0 }}>
              {n.icon} {isNe ? n.titleNp : n.title}
            </button>
          ))}
        </div>

        {/* Controls bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
          <button className="btn btn-outline btn-sm" onClick={handleExpandAll} style={{ fontSize: 12, padding: '5px 12px' }}>
            {expandAll ? '▲' : '▼'} {isNe ? 'सबै' : 'All'}
          </button>
          <button
            className={`btn btn-sm ${flashMode ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => { setFlashMode(f => !f); setOpen(new Set()); setFlipped(new Set()) }}
            style={{ fontSize: 12, padding: '5px 12px' }}
          >
            📇 {flashMode ? (isNe ? 'Flip Mode' : 'Flip Mode') : (isNe ? 'Flashcard' : 'Flashcard')}
          </button>
          <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)' }}>
            {sorted.length} {isNe ? 'वटा' : 'notes'}
            {known.length > 0 && <span style={{ marginLeft: 8 }}>✓ {known.length}</span>}
          </div>
        </div>

        {/* Cards */}
        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{isNe ? 'केही भेटिएन' : 'No notes found'}</div>
          </div>
        ) : flashMode ? (
          sorted.map((item, idx) => {
            const key = `note-${idx}`
            const isFlipped = flipped.has(key)
            const isKnown = known.includes(item.title)
            return (
              <div key={key} style={{ marginBottom: 12, perspective: 1000, opacity: isKnown ? 0.45 : 1, transition: 'opacity 0.3s' }}>
                <div
                  onClick={() => toggleFlip(key)}
                  style={{
                    position: 'relative', width: '100%', minHeight: 140, cursor: 'pointer',
                    transformStyle: 'preserve-3d', transition: 'transform 0.5s',
                    transform: isFlipped ? 'rotateY(180deg)' : 'none',
                  }}
                >
                  {/* Front */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    background: 'var(--card)', borderRadius: 12, border: '1px solid var(--border)',
                    padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    textAlign: 'center',
                  }}>
                    <span style={{ fontSize: 32, marginBottom: 8 }}>{item.subject.icon}</span>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--primary)', marginBottom: 4 }}>
                      {isNe ? item.subject.titleNp : item.subject.title}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>{isNe ? 'थिच्नुहोस्' : 'Tap to flip'}</div>
                  </div>
                  {/* Back */}
                  <div style={{
                    position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'var(--card)', borderRadius: 12, border: '1px solid var(--border)',
                    padding: 16, fontSize: 13, lineHeight: 1.6, color: 'var(--text)',
                    overflow: 'auto', maxHeight: 300,
                  }}>
                    {renderMd(item.content)}
                    <button
                      onClick={e => { e.stopPropagation(); markKnown(item.title) }}
                      className="btn btn-sm btn-outline"
                      style={{ marginTop: 10, fontSize: 11, width: '100%' }}
                    >
                      {isKnown ? (isNe ? 'पुन: खोल्नुहोस्' : 'Reopen') : (isNe ? '✅ जानें' : '✅ Know it')}
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          sorted.map((item, idx) => {
            const key = `note-${idx}`
            const isOpen = open.has(key)
            const isKnown = known.includes(item.title)
            return (
              <div
                key={key}
                className="card"
                style={{
                  marginBottom: 10, padding: 0, overflow: 'hidden', opacity: isKnown ? 0.45 : 1,
                  border: isOpen ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                  transition: 'opacity 0.3s, border-color 0.2s',
                }}
              >
                <button
                  onClick={() => toggleNote(key)}
                  style={{
                    width: '100%', padding: '14px 16px',
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    textAlign: 'left', fontFamily: 'inherit',
                  }}
                >
                  <span style={{
                    fontSize: 9, fontWeight: 900, color: 'white',
                    background: isOpen ? 'var(--primary)' : 'var(--muted)',
                    borderRadius: 5, padding: '2px 7px', flexShrink: 0, letterSpacing: 0.5,
                  }}>
                    {item.subject.icon}
                  </span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                    {item.title}
                  </span>
                  <span style={{
                    fontSize: 11, color: 'var(--muted)', fontWeight: 600,
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s',
                  }}>▼</span>
                </button>
                <div style={{
                  maxHeight: isOpen ? '9999px' : '0px', overflow: 'hidden',
                  transition: isOpen ? 'max-height 0.4s ease' : 'max-height 0.3s ease',
                  borderTop: isOpen ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ padding: '16px 16px 20px', fontSize: 13.5, lineHeight: 1.75, color: 'var(--text)' }}>
                    {renderMd(item.content)}
                    <button
                      onClick={e => { e.stopPropagation(); markKnown(item.title) }}
                      className="btn btn-sm btn-outline"
                      style={{ marginTop: 10, fontSize: 11 }}
                    >
                      {isKnown ? (isNe ? 'पुन: खोल्नुहोस्' : 'Reopen') : (isNe ? '✅ जानें' : '✅ Know it')}
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}

        {/* Contribute */}
        <div className="info-box" style={{ marginTop: 24 }}>
          <strong>✏️ {isNe ? 'तपाईंको नोट थप्नुहोस्?' : 'Have notes to share?'}</strong>{' '}
          <a href="https://github.com/harmless-beep/bato" style={{ color: 'var(--primary)', fontWeight: 700 }}>Contribute →</a>
        </div>
      </div>
    </div>
  )
}
