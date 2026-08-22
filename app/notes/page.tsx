'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { notes } from '@/data/notes'
import { useLang } from '../components/ui'

type Mode = 'entrance' | 'bachelor'
type View = 'subject' | 'list'

export default function Notes() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [mode, setMode] = useState<Mode>('entrance')
  const [view, setView] = useState<View>('subject')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState<string>('all')
  const [open, setOpen] = useState<Set<string>>(new Set())
  const [expandAll, setExpandAll] = useState(false)

  const entranceIds = ['math', 'physics', 'chemistry', 'english', 'aptitude']
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

  const toggleNote = (key: string) => {
    setOpen(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const handleExpandAll = () => {
    if (expandAll) {
      setOpen(new Set())
      setExpandAll(false)
    } else {
      setOpen(new Set(visible.map((_, i) => `note-${i}`)))
      setExpandAll(true)
    }
  }

  const renderLine = (line: string, i: number) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith('**') && p.endsWith('**') ? <strong key={j}>{p.slice(2, -2)}</strong> : <span key={j}>{p}</span>
    )
    if (/^#{3} /.test(line)) return <h4 key={i} style={{ margin: '10px 0 4px', fontSize: 13, color: 'var(--primary)' }}>{line.replace(/^#{3} /, '')}</h4>
    if (/^#{2} /.test(line)) return <h3 key={i} style={{ margin: '12px 0 4px', fontSize: 14, color: 'var(--text)' }}>{line.replace(/^#{2} /, '')}</h3>
    if (/^- /.test(line)) return <div key={i} style={{ paddingLeft: 14, margin: '3px 0' }}>• {parts}</div>
    if (line.trim() === '') return <div key={i} style={{ height: 8 }} />
    return <p key={i} style={{ margin: '4px 0', lineHeight: 1.6 }}>{parts}</p>
  }

  const renderMd = (md: string) => md.split('\n').map(renderLine)

  const activeSection = notes.find(n => n.id === activeId)
  const filterIds = mode === 'entrance' ? entranceIds : bachelorIds
  const filterSections = notes.filter(n => filterIds.includes(n.id))

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn">← {isNe ? 'होम' : 'Home'}</Link>
        <span className="nav-title">📖 {isNe ? 'Notes' : 'Notes'}</span>
        <div />
      </div>

      <div className="page-content">
        {/* Entrance / Bachelor toggle */}
        <div style={{ display: 'flex', gap: 0, background: 'var(--card)', borderRadius: 12, padding: 4, marginBottom: 16, border: '1px solid var(--border)' }}>
          <button
            onClick={() => { setMode('entrance'); setActiveId('all'); setOpen(new Set()); setExpandAll(false) }}
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
            onClick={() => { setMode('bachelor'); setActiveId('all'); setOpen(new Set()); setExpandAll(false) }}
            style={{
              flex: 1, padding: '10px 8px', borderRadius: 9,
              border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
              background: mode === 'bachelor' ? 'var(--primary)' : 'transparent',
              color: mode === 'bachelor' ? 'white' : 'var(--muted)',
              transition: 'all 0.2s',
            }}
          >
            🎓 {isNe ? 'Bachelor' : 'Bachelor'}
          </button>
        </div>

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

        {/* Subject filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 8, scrollbarWidth: 'none' }}>
          <button
            className={`chip ${activeId === 'all' ? 'active' : ''}`}
            onClick={() => { setActiveId('all'); setOpen(new Set()) }}
            style={{ flexShrink: 0 }}
          >
            {isNe ? '📋 सबै' : '📋 All'}
          </button>
          {filterSections.map(n => (
            <button
              key={n.id}
              className={`chip ${activeId === n.id ? 'active' : ''}`}
              onClick={() => { setActiveId(n.id); setOpen(new Set()) }}
              style={{ flexShrink: 0 }}
            >
              {n.icon} {isNe ? n.titleNp : n.title}
            </button>
          ))}
        </div>

        {/* Expand/collapse all + count */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleExpandAll}
            style={{ fontSize: 12, padding: '5px 12px' }}
          >
            {expandAll ? (isNe ? 'सबै भर्नुहोस् ▲' : 'Collapse All ▲') : (isNe ? 'सबै फैलाउनुहोस् ▼' : 'Expand All ▼')}
          </button>
          <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)' }}>
            {visible.length} {isNe ? 'वटा नोट' : 'notes'}
          </div>
        </div>

        {/* Note cards */}
        {visible.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{isNe ? 'केही भेटिएन' : 'No notes found'}</div>
          </div>
        ) : (
          visible.map((item, idx) => {
            const key = `note-${idx}`
            const isOpen = open.has(key)
            return (
              <div
                key={key}
                className="card"
                style={{
                  marginBottom: 10, padding: 0, overflow: 'hidden',
                  border: isOpen ? '1.5px solid var(--primary)' : '1px solid var(--border)',
                  transition: 'border-color 0.2s',
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
                    borderRadius: 5, padding: '2px 7px', flexShrink: 0,
                    transition: 'background 0.2s', letterSpacing: 0.5,
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
                  }}>
                    ▼
                  </span>
                </button>

                <div style={{
                  maxHeight: isOpen ? '9999px' : '0px',
                  overflow: 'hidden',
                  transition: isOpen ? 'max-height 0.4s ease' : 'max-height 0.3s ease',
                  borderTop: isOpen ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    padding: '16px 16px 20px',
                    fontSize: 13.5, lineHeight: 1.75,
                    color: 'var(--text)',
                  }}>
                    {renderMd(item.content)}
                  </div>
                </div>
              </div>
            )
          })
        )}

        {/* Contribute box */}
        <div className="info-box" style={{ marginTop: 24 }}>
          <strong>✏️ {isNe ? 'तपाईंको नोट थप्नुहोस्?' : 'Have notes to share?'}</strong>{' '}
          {isNe
            ? 'GitHub PR गरेर आफ्नो नोटहरू थप्नुहोस्।'
            : 'Submit a GitHub PR with your notes — help every aspirant.'}{' '}
          <a href="https://github.com/harmless-beep/bato" style={{ color: 'var(--primary)', fontWeight: 700 }}>Contribute →</a>
        </div>
      </div>
    </div>
  )
}
