'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang } from '../components/ui'
import SuggestionForm, { SUG_TYPES, SUG_LS } from '../components/suggestion-form'

type SugType = string
type Sug = { id: string; type: SugType; text: string; ts: number; pinned?: boolean }
const LS_VOTES = 'bato-sug-votes'
// ponytail: client-side passcode = obscurity, not real auth. A static site
// has no backend boundary; the admin is the device owner. Change the passcode
// below. For real admin, wire a form service (Formspree) and validate server-side.
const PASS = 'bato2083'

function load(): Sug[] { try { return JSON.parse(localStorage.getItem(SUG_LS) || '[]') } catch { return [] } }
function loadVotes(): Record<string, number> { try { return JSON.parse(localStorage.getItem(LS_VOTES) || '{}') } catch { return {} } }

function ago(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return 'now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

export default function Suggest() {
  const { lang } = useLang()
  const isNe = lang === 'ne'

  const [items, setItems] = useState<Sug[]>([])
  const [votes, setVotes] = useState<Record<string, number>>({})
  const [filter, setFilter] = useState<SugType | 'all'>('all')
  const [sortNew, setSortNew] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [ask, setAsk] = useState(false)
  const [code, setCode] = useState('')
  const [bad, setBad] = useState(false)

  useEffect(() => {
    setItems(load()); setVotes(loadVotes())
    if (localStorage.getItem('bato-admin') === '1') setAdmin(true)
  }, [])

  // owner secret: ↑ ↓ ↓ ↑ reveals the admin unlock (no visible button)
  const arrowBuf = useRef<string[]>([])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
      arrowBuf.current.push(e.key)
      if (arrowBuf.current.length > 4) arrowBuf.current.shift()
      if (arrowBuf.current.join(',') === 'ArrowUp,ArrowDown,ArrowDown,ArrowUp') {
        arrowBuf.current = []
        setAsk(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const vote = (id: string) => {
    // admin can vote as many times as they like; normal users toggle 0/1
    const next = { ...votes, [id]: admin ? (votes[id] || 0) + 1 : (votes[id] ? 0 : 1) }
    setVotes(next)
    localStorage.setItem(LS_VOTES, JSON.stringify(next))
  }

  const unvote = (id: string) => {
    const next = { ...votes, [id]: Math.max(0, (votes[id] || 0) - 1) }
    setVotes(next)
    localStorage.setItem(LS_VOTES, JSON.stringify(next))
  }

  const resetVotes = () => {
    setVotes({})
    localStorage.setItem(LS_VOTES, '{}')
  }

  const unlock = () => {
    if (code.trim() === PASS) {
      setAdmin(true); localStorage.setItem('bato-admin', '1'); setAsk(false); setCode('')
    } else {
      setBad(true); setTimeout(() => setBad(false), 600)
    }
  }

  const pin = (id: string) => {
    const next = items.map(s => s.id === id ? { ...s, pinned: !s.pinned } : s)
    setItems(next); localStorage.setItem(SUG_LS, JSON.stringify(next))
  }

  const del = (id: string) => {
    const next = items.filter(s => s.id !== id)
    setItems(next); localStorage.setItem(SUG_LS, JSON.stringify(next))
    const v = { ...votes }; delete v[id]; setVotes(v); localStorage.setItem(LS_VOTES, JSON.stringify(v))
  }

  const clearAll = () => {
    if (!confirm(isNe ? 'सबै सुझाव मेट्ने हो? यो फिर्ता हुँदैन!' : 'Delete ALL suggestions? This cannot be undone!')) return
    setItems([]); localStorage.setItem(SUG_LS, '[]')
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'bato-suggestions.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const shown = useMemo(() => {
    const list = filter === 'all' ? items : items.filter(i => i.type === filter)
    return [...list].sort((a, b) =>
      (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
      (sortNew ? b.ts - a.ts : (votes[b.id] || 0) - (votes[a.id] || 0) || b.ts - a.ts)
    )
  }, [items, votes, filter, sortNew])

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0)

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn" aria-label="Home">←</Link>
        <span className="nav-title">
          💬 {isNe ? 'सुझाव' : 'Suggestions'}
          {admin && <span className="sug-admin-badge">👑</span>}
        </span>
        <div />
      </div>
      <div className="page-content">

        <div className="info-box" style={{ marginBottom: 16 }}>
          <strong>🗣️ {isNe ? 'तपाईंको आवाजले बाटो बनाउँछ' : 'Your voice shapes बाटो'}</strong> —{' '}
          {isNe
            ? 'विचार, अनुभव, समस्या वा चाहेको सुविधा — यहाँ राख्नुहोस्। अरूले like गरे, हामी त्यही पहिले बनाउँछौं।'
            : 'Share ideas, experiences, problems or feature wishes. The most-liked ones get built first.'}
        </div>

        {/* ── Submit form (shared component) ── */}
        <div className="card sug-form" style={{ padding: 16, marginBottom: 18 }}>
          <SuggestionForm onSubmitted={() => setItems(load())} />
        </div>

        {/* ── Board ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
          <div className="sug-chips">
            <button className={`chip${filter === 'all' ? ' active' : ''}`} onClick={() => setFilter('all')}>{isNe ? 'सबै' : 'All'} ({items.length})</button>
            {SUG_TYPES.map(t => (
              <button key={t.id} className={`chip${filter === t.id ? ' active' : ''}`} onClick={() => setFilter(t.id)}>{t.icon}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="sug-count">▲ {totalVotes} {isNe ? 'भोट' : 'votes'}</span>
            <button className="btn btn-outline btn-sm" onClick={() => setSortNew(!sortNew)}>
              {sortNew ? '🔥 ' + (isNe ? 'लोकप्रिय' : 'Top') : '🕒 ' + (isNe ? 'नयाँ' : 'Newest')}
            </button>
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="card sug-empty">
            <div className="sug-empty-icon">🪹</div>
            <div className="sug-empty-title">{isNe ? 'अहिलेसम्म केही छैन' : 'Nothing here yet'}</div>
            <div className="sug-empty-sub">{isNe ? 'पहिलो सुझाव दिनुहोस् — माथिको फारम भर्नुहोस्!' : 'Be the first — use the form above!'}</div>
          </div>
        ) : (
          shown.map(s => {
            const t = SUG_TYPES.find(x => x.id === s.type)!
            const my = votes[s.id] || 0
            return (
              <div key={s.id} className={`card sug-item${s.pinned ? ' sug-pinned' : ''}`} style={{ padding: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <button className={`sug-vote${my ? ' on' : ''}`} onClick={() => vote(s.id)} aria-label={isNe ? 'भोट' : 'Vote'} title={isNe ? 'भोट दिनुहोस्' : 'Upvote'}>
                    <span className="sug-vote-arrow">▲</span>
                    <span className="sug-vote-num">{my}</span>
                  </button>
                  {admin && <button className="sug-unvote" onClick={() => unvote(s.id)} title={isNe ? 'भोट घटाउनुहोस्' : 'Remove vote'}>−</button>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="sug-item-top">
                    <span className="sug-item-type">{t.icon} {isNe ? t.labelNp : t.label}</span>
                    <span className="sug-item-ago">{ago(s.ts)}</span>
                    {s.pinned && <span className="sug-pin-badge">📌</span>}
                    {admin && (
                      <span className="sug-admin-actions">
                        <button className="sug-admin-btn" onClick={() => pin(s.id)} title={s.pinned ? 'Unpin' : 'Pin'}>{s.pinned ? '📌' : '📍'}</button>
                        <button className="sug-admin-btn sug-del-btn" onClick={() => del(s.id)} title="Delete">🗑️</button>
                      </span>
                    )}
                  </div>
                  <div className="sug-item-text">{s.text}</div>
                </div>
              </div>
            )
          })
        )}

        {items.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button className="btn btn-outline btn-sm" onClick={exportJson} title="Download all suggestions (JSON)">
              📥 {isNe ? 'सबै सुझाव डाउनलोड (JSON)' : 'Download all suggestions (JSON)'}
            </button>
          </div>
        )}

        {/* ── Admin unlock & panel ── */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          {admin ? (
            <div className="sug-admin-bar">
              <span className="sug-admin-badge">👑 {isNe ? 'प्रशासक' : 'Admin'}</span>
              <button className="btn btn-outline btn-sm" onClick={resetVotes}>♻ {isNe ? 'भोट रिसेट' : 'Reset votes'}</button>
              <button className="btn btn-outline btn-sm" onClick={clearAll}>🗑 {isNe ? 'सबै मेट्नुहोस्' : 'Clear all'}</button>
              <button className="btn btn-outline btn-sm" onClick={() => { setAdmin(false); localStorage.removeItem('bato-admin') }}>🔒 {isNe ? 'बन्द' : 'Lock'}</button>
            </div>
          ) : (
            ask && (
              <div className="sug-unlock">
                <button className="sug-unlock-close" onClick={() => setAsk(false)} aria-label="Close">✕</button>
                <input
                  type="password"
                  className={`input${bad ? ' sug-bad' : ''}`}
                  placeholder={isNe ? 'पासकोड' : 'Passcode'}
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && unlock()}
                  autoFocus
                  style={{ width: 140 }}
                />
                <button className="btn btn-primary btn-sm" onClick={unlock}>{isNe ? 'खोल्नुहोस्' : 'Unlock'}</button>
              </div>
            )
          )}
        </div>

        {/* ponytail: votes are per-device (localStorage) — static GH Pages has no shared store.
            To aggregate votes across users, point submit() at a form service (Formspree) or
            Firebase; the board UI stays the same. Admin passcode is client-side obscurity only. */}
      </div>
    </div>
  )
}