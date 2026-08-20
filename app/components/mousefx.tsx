'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type TrailStyle = 'sparkle' | 'hearts' | 'rainbow' | 'stars' | 'bubbles' | 'none'
type FxSize = 'sm' | 'md' | 'lg'
type FxCount = 'light' | 'normal' | 'heavy'
type CursorStyle = 'none' | 'point' | 'paw' | 'star'

const TRAILS: { id: TrailStyle; label: string; emoji: string }[] = [
  { id: 'sparkle', label: 'Sparkle', emoji: '✨' },
  { id: 'hearts', label: 'Hearts', emoji: '💖' },
  { id: 'rainbow', label: 'Rainbow', emoji: '🌈' },
  { id: 'stars', label: 'Stars', emoji: '⭐' },
  { id: 'bubbles', label: 'Bubbles', emoji: '🫧' },
  { id: 'none', label: 'Off', emoji: '🚫' },
]

const CURSORS: { id: CursorStyle; label: string; emoji: string }[] = [
  { id: 'none', label: 'Default', emoji: '🖱️' },
  { id: 'point', label: 'Finger', emoji: '👉' },
  { id: 'paw', label: 'Paw', emoji: '🐾' },
  { id: 'star', label: 'Star', emoji: '⭐' },
]

const SIZES: { id: FxSize; label: string; emoji: string }[] = [
  { id: 'sm', label: 'Tiny', emoji: '🔹' },
  { id: 'md', label: 'Medium', emoji: '🔷' },
  { id: 'lg', label: 'Big', emoji: '💠' },
]

const COUNTS: { id: FxCount; label: string; emoji: string }[] = [
  { id: 'light', label: 'Light', emoji: '🪶' },
  { id: 'normal', label: 'Normal', emoji: '✨' },
  { id: 'heavy', label: 'Heavy', emoji: '💥' },
]

const COUNT_MAP: Record<FxCount, number> = { light: 1, normal: 2, heavy: 4 }
const SIZE_MAP: Record<FxSize, number> = { sm: 14, md: 22, lg: 30 }

const KEY = 'bato-fx'

function load(): { trail: TrailStyle; size: FxSize; count: FxCount; cursor: CursorStyle } {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { trail: 'sparkle', size: 'md', count: 'normal', cursor: 'none', ...JSON.parse(raw) }
  } catch {}
  return { trail: 'sparkle', size: 'md', count: 'normal', cursor: 'none' }
}

export default function MouseFX() {
  const [cfg, setCfg] = useState(load)
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const spawnRef = useRef<(x: number, y: number) => void>(() => {})
  const trailRef = useRef(cfg.trail)
  trailRef.current = cfg.trail
  const sizeRef = useRef(cfg.size)
  sizeRef.current = cfg.size
  const countRef = useRef(cfg.count)
  countRef.current = cfg.count
  const cursorRef = useRef(cfg.cursor)
  cursorRef.current = cfg.cursor

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(cfg))
  }, [cfg])

  // Spawn particles
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let raf = 0
    let last = 0

    spawnRef.current = (x: number, y: number) => {
      if (trailRef.current === 'none') return
      const n = COUNT_MAP[countRef.current]
      const size = SIZE_MAP[sizeRef.current]
      for (let i = 0; i < n; i++) {
        const el = document.createElement('div')
        el.className = `fx fx-${trailRef.current}`
        el.style.left = `${x + (Math.random() * 16 - 8)}px`
        el.style.top = `${y + (Math.random() * 16 - 8)}px`
        el.style.fontSize = `${size * (0.7 + Math.random() * 0.6)}px`
        el.style.setProperty('--drift', `${Math.random() > 0.5 ? '' : '-'}${10 + Math.random() * 14}px`)
        el.style.setProperty('--spin', `${Math.random() > 0.5 ? '' : '-'}${60 + Math.random() * 120}deg`)
        document.body.appendChild(el)
        el.addEventListener('animationend', () => el.remove(), { once: true })
        setTimeout(() => el.remove(), 1400)
      }
    }

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      const now = performance.now()
      if (now - last < 45) return // ~22/s spawn cap
      last = now
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0
        spawnRef.current(e.clientX, e.clientY)
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Custom cursor
  useEffect(() => {
    document.body.classList.toggle('fx-cursor-hidden', cursorRef.current !== 'none')
    return () => document.body.classList.remove('fx-cursor-hidden')
  }, [cfg.cursor])

  const set = useCallback(<K extends keyof ReturnType<typeof load>>(k: K, v: ReturnType<typeof load>[K]) => {
    setCfg(c => ({ ...c, [k]: v }))
  }, [])

  const cursorEmoji = CURSORS.find(c => c.id === cfg.cursor)?.emoji ?? ''

  return (
    <>
      {/* Custom cursor follower */}
      {cfg.cursor !== 'none' && (
        <div
          className="fx-cursor"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
        >
          {cursorEmoji}
        </div>
      )}

      {/* Floating menu button */}
      <button
        className="fx-fab"
        onClick={() => setOpen(o => !o)}
        aria-label="Mouse effects"
        title="Mouse effects"
      >
        {open ? '✖️' : '✨'}
      </button>

      {/* Menu panel */}
      {open && (
        <div className="fx-panel">
          <div className="fx-panel-title">🖱️ Mouse Magic</div>

          <div className="fx-row">
            <div className="fx-label">Trail</div>
            <div className="fx-options">
              {TRAILS.map(t => (
                <button
                  key={t.id}
                  className={`fx-opt ${cfg.trail === t.id ? 'on' : ''}`}
                  onClick={() => set('trail', t.id)}
                  title={t.label}
                >
                  {t.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="fx-row">
            <div className="fx-label">Cursor</div>
            <div className="fx-options">
              {CURSORS.map(c => (
                <button
                  key={c.id}
                  className={`fx-opt ${cfg.cursor === c.id ? 'on' : ''}`}
                  onClick={() => set('cursor', c.id)}
                  title={c.label}
                >
                  {c.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="fx-row">
            <div className="fx-label">Size</div>
            <div className="fx-options">
              {SIZES.map(s => (
                <button
                  key={s.id}
                  className={`fx-opt ${cfg.size === s.id ? 'on' : ''}`}
                  onClick={() => set('size', s.id)}
                  title={s.label}
                >
                  {s.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="fx-row">
            <div className="fx-label">Amount</div>
            <div className="fx-options">
              {COUNTS.map(c => (
                <button
                  key={c.id}
                  className={`fx-opt ${cfg.count === c.id ? 'on' : ''}`}
                  onClick={() => set('count', c.id)}
                  title={c.label}
                >
                  {c.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
