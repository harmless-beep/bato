'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { notes } from '@/data/notes'
import { useLang } from '../components/ui'
import { Reveal } from '../components/reveal'

export default function Notes() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [query, setQuery] = useState('')
  const [activeSubject, setActiveSubject] = useState<string>('all')
  const [open, setOpen] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return notes
      .filter(n => activeSubject === 'all' || n.id === activeSubject)
      .flatMap(n =>
        n.items
          .filter(i => !q || i.title.toLowerCase().includes(q) || i.content.toLowerCase().includes(q))
          .map(i => ({ ...i, subject: n }))
      )
  }, [query, activeSubject])

  const isMarkdownLine = (line: string) => /^#{1,3} /.test(line) || /^\*\*.*\*\*$/.test(line) || /^- /.test(line)

  const renderLine = (line: string, i: number) => {
    // Bold **text** inline
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith('**') && p.endsWith('**') ? <strong key={j}>{p.slice(2, -2)}</strong> : <span key={j}>{p}</span>
    )
    if (/^#{3} /.test(line)) return <h4 key={i} style={{ margin: '10px 0 4px', fontSize: 14 }}>{line.replace(/^#{3} /, '')}</h4>
    if (/^#{2} /.test(line)) return <h3 key={i} style={{ margin: '12px 0 4px', fontSize: 15 }}>{line.replace(/^#{2} /, '')}</h3>
    if (/^- /.test(line)) return <div key={i} style={{ paddingLeft: 14, margin: '3px 0' }}>• {line.slice(2)}</div>
    if (line.trim() === '') return <div key={i} style={{ height: 8 }} />
    return <p key={i} style={{ margin: '4px 0' }}>{parts}</p>
  }

  const renderMd = (md: string) => md.split('\n').map(renderLine)

  return (
    <div className="page">
      <div className="page-header">
        <Link href="/"><button className="back-btn">←</button></Link>
        <div>
          <div className="page-title">📖 {isNe ? 'Notes' : 'Notes'}</div>
          <div className="page-sub">IOE {isNe ? 'सामग्री' : 'Material'} • {isNe ? 'निःशुल्क' : 'Free'}</div>
        </div>
      </div>

      <div className="page-content">
        {/* Search */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
            <input
              className="input"
              style={{ paddingLeft: 40 }}
              placeholder={isNe ? 'नोट खोज्नुहोस्...' : 'Search notes...'}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Subject chips */}
        <div className="chip-row" style={{ marginBottom: 20 }}>
          <button className={`chip ${activeSubject === 'all' ? 'active' : ''}`} onClick={() => setActiveSubject('all')}>
            {isNe ? 'सबै' : 'All'}
          </button>
          {notes.map(n => (
            <button key={n.id} className={`chip ${activeSubject === n.id ? 'active' : ''}`} onClick={() => setActiveSubject(n.id)}>
              {isNe ? n.titleNp : n.title}
            </button>
          ))}
        </div>

        {/* Notes list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{isNe ? 'केही भेटिएन' : 'No notes found'}</div>
          </div>
        ) : (
          filtered.map((item, idx) => {
            const key = `${item.subject.id}-${item.title}`
            const isOpen = open === key
            return (
              <Reveal key={key} delay={Math.min(idx * 40, 200)}>
                <div className="card" style={{ marginBottom: 10, padding: 0, overflow: 'hidden' }}>
                  <button
                    className="accordion-header"
                    onClick={() => setOpen(isOpen ? null : key)}
                    style={{
                      width: '100%', padding: '16px 18px',
                      display: 'flex', alignItems: 'center', gap: 12,
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      textAlign: 'left', fontSize: 15, fontWeight: 700,
                      color: 'var(--text)', fontFamily: 'inherit'
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10, fontWeight: 800, color: 'white',
                        background: 'var(--primary)', borderRadius: 6,
                        padding: '2px 8px', flexShrink: 0, letterSpacing: 0.5
                      }}
                    >
                      {isNe ? item.subject.titleNp : item.subject.title}
                    </span>
                    <span style={{ flex: 1 }}>{item.title}</span>
                    <span
                      className="acc-arrow"
                      style={{
                        transition: 'transform 0.25s',
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        fontSize: 13, color: 'var(--muted)'
                      }}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className="accordion-body"
                    style={{
                      maxHeight: isOpen ? '2000px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease',
                      borderTop: isOpen ? '1px solid var(--border)' : 'none',
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <div style={{ padding: '16px 18px', fontSize: 14, lineHeight: 1.7, color: 'var(--text)' }}>
                      {renderMd(item.content)}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })
        )}

        <div style={{ marginTop: 24 }}>
          <div className="info-box">
            <strong>✏️ {isNe ? 'तपाईंको नोट थप्नुहोस्?' : 'Have notes to share?'}</strong>{' '}
            {isNe
              ? 'GitHub PR गरेर आफ्नो नोटहरू थप्नुहोस् — सबैलाई फाइदा पुग्नेछ।'
              : 'Submit a GitHub PR with your notes — help every aspirant.'}{' '}
            <a href="https://github.com/harmless-beep/bato" style={{ color: 'var(--primary)', fontWeight: 700, whiteSpace: 'nowrap' }}>Contribute →</a>
          </div>
        </div>
      </div>
    </div>
  )
}