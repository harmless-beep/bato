'use client'

import { useEffect, useRef } from 'react'

import { getPerfMode, setPerfMode } from './perf-mode'
import type { PerfMode } from './perf-mode'
export type { PerfMode }

function getTheme(): string {
  return document.documentElement.dataset.theme ?? 'light'
}

// ── Theme palettes ───────────────────────────────────────────────────────────
const PAL: Record<string, string[]> = {
  light:  ['#4f46e5', '#7c3aed', '#f59e0b', '#818cf8', '#c084fc'],
  dark:   ['#818cf8', '#a78bfa', '#fbbf24', '#38bdf8', '#34d399'],
  forest: ['#34d399', '#4ade80', '#fbbf24', '#f97316', '#86efac'],
  ocean:  ['#38bdf8', '#0ea5e9', '#818cf8', '#06b6d4', '#22d3ee'],
}

// ── Shared particle base ─────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number
  color: string; phase: number
  size: number
}

// ── LITE effects (low-end: ≤40 particles, no gradients, no O(n²) lines) ───────

function mkLiteOrbs(n: number, W: number, H: number, pal: string[]): Particle[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 3 + 2,
    color: pal[Math.floor(Math.random() * pal.length)],
    phase: Math.random() * Math.PI * 2,
  }))
}

function mkLiteNodes(n: number, W: number, H: number, pal: string[]): Particle[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 1.5,
    color: pal[Math.floor(Math.random() * pal.length)],
    phase: Math.random() * Math.PI * 2,
  }))
}

function mkLiteFlies(n: number, W: number, H: number, pal: string[]): Particle[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: 0, vy: 0,
    size: Math.random() * 2 + 1,
    color: pal[Math.floor(Math.random() * pal.length)],
    phase: Math.random() * Math.PI * 2,
  }))
}

function drawLiteOrbs(ctx: CanvasRenderingContext2D, ps: Particle[], W: number, H: number, mx: number, my: number) {
  for (const p of ps) {
    const dx = mx - p.x, dy = my - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 160) { p.vx -= (dx / dist) * 0.003; p.vy -= (dy / dist) * 0.003 }
    p.vx *= 0.97; p.vy *= 0.97; p.x += p.vx; p.y += p.vy
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
    p.phase += 0.025
    const a = (Math.sin(p.phase) * 0.4 + 0.6) * 0.75
    ctx.globalAlpha = a
    ctx.fillStyle = p.color
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawLiteConstellation(ctx: CanvasRenderingContext2D, ps: Particle[], W: number, H: number, mx: number, my: number) {
  for (const p of ps) {
    const dx = mx - p.x, dy = my - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 140) { p.vx += (dx / dist) * 0.004; p.vy += (dy / dist) * 0.004 }
    p.vx *= 0.97; p.vy *= 0.97; p.x += p.vx; p.y += p.vy
    if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1
    p.x = Math.max(0, Math.min(W, p.x)); p.y = Math.max(0, Math.min(H, p.y))
    p.phase += 0.04
    const sz = Math.sin(p.phase) * 1 + 2
    ctx.globalAlpha = 0.85
    ctx.fillStyle = p.color
    ctx.beginPath(); ctx.arc(p.x, p.y, sz, 0, Math.PI * 2); ctx.fill()
  }
  if (mx > 0) {
    ctx.globalAlpha = 1; ctx.fillStyle = '#fff'
    ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawLiteFireflies(ctx: CanvasRenderingContext2D, ps: Particle[], W: number, H: number, mx: number, my: number) {
  for (const p of ps) {
    const dx = mx - p.x, dy = my - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 120) {
      const a = Math.atan2(dy, dx)
      p.vx += Math.cos(a) * 0.03; p.vy += Math.sin(a) * 0.03
    }
    p.vx *= 0.95; p.vy *= 0.95
    p.vx += (Math.random() - 0.5) * 0.1; p.vy += (Math.random() - 0.5) * 0.1
    p.x += p.vx; p.y += p.vy
    if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10
    if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10
    p.phase += 0.06
    const a = Math.sin(p.phase) * 0.5 + 0.5
    ctx.globalAlpha = a * 0.8
    ctx.fillStyle = p.color
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawLiteRipples(ctx: CanvasRenderingContext2D, ripples: Ripple[], pal: string[], mx: number, my: number, lastT: { v: number }) {
  const now = Date.now()
  if (mx > 0 && now - lastT.v > 120) {
    ripples.push({ x: mx, y: my, r: 5, maxR: 90, color: pal[0], alpha: 0.7, born: now })
    lastT.v = now
  }
  const alive = ripples.filter(r => r.alpha > 0.02)
  ripples.length = 0; ripples.push(...alive)
  for (const rp of ripples) {
    rp.r += 2; rp.alpha = Math.max(0, (1 - rp.r / rp.maxR) * 0.7)
    ctx.globalAlpha = rp.alpha
    ctx.strokeStyle = rp.color; ctx.lineWidth = 1.2
    ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.globalAlpha = 1
}

interface Ripple { x: number; y: number; r: number; maxR: number; color: string; alpha: number; born: number }

// ── FULL effects (all glory: gradients, connection lines, cursor glow) ─────────

function mkFullOrbs(n: number, W: number, H: number, pal: string[]): Particle[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.7,
    size: Math.random() * 5 + 3,
    color: pal[Math.floor(Math.random() * pal.length)],
    phase: Math.random() * Math.PI * 2,
  }))
}

function mkFullNodes(n: number, W: number, H: number, pal: string[]): Particle[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 1.8,
    color: pal[Math.floor(Math.random() * pal.length)],
    phase: Math.random() * Math.PI * 2,
  }))
}

function mkFullFlies(n: number, W: number, H: number, pal: string[]): Particle[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: 0, vy: 0,
    size: Math.random() * 2.5 + 1,
    color: pal[Math.floor(Math.random() * pal.length)],
    phase: Math.random() * Math.PI * 2,
  }))
}

function drawFullOrbs(ctx: CanvasRenderingContext2D, ps: Particle[], W: number, H: number, mx: number, my: number) {
  for (const p of ps) {
    const dx = mx - p.x, dy = my - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 220) { p.vx -= (dx / dist) * 0.004; p.vy -= (dy / dist) * 0.004 }
    p.vx *= 0.97; p.vy *= 0.97; p.x += p.vx; p.y += p.vy
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
    p.phase += 0.018
    const glow = Math.sin(p.phase) * 0.25 + 0.75
    // radial glow
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
    grd.addColorStop(0, p.color); grd.addColorStop(1, 'transparent')
    ctx.globalAlpha = glow * 0.4
    ctx.fillStyle = grd
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2); ctx.fill()
    // core
    ctx.globalAlpha = glow * 0.9
    ctx.fillStyle = p.color
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawFullConstellation(ctx: CanvasRenderingContext2D, ps: Particle[], W: number, H: number, mx: number, my: number) {
  // connection lines — O(n²) but capped at 50 nodes → 1225 pairs
  for (let i = 0; i < ps.length; i++) {
    if (mx > 0) {
      const dxC = mx - ps[i].x, dyC = my - ps[i].y
      const dC2 = dxC * dxC + dyC * dyC
      if (dC2 < 40000) {
        ctx.globalAlpha = (1 - dC2 / 40000) * 0.3
        ctx.strokeStyle = ps[i].color; ctx.lineWidth = 0.7
        ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(mx, my); ctx.stroke()
      }
    }
    for (let j = i + 1; j < ps.length; j++) {
      const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y
      const d2 = dx * dx + dy * dy
      if (d2 < 36000) {
        ctx.globalAlpha = (1 - d2 / 36000) * 0.4
        ctx.strokeStyle = ps[i].color; ctx.lineWidth = 0.6
        ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.stroke()
      }
    }
  }
  // nodes
  for (const p of ps) {
    const dx = mx - p.x, dy = my - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 180) { p.vx += (dx / dist) * 0.005; p.vy += (dy / dist) * 0.005 }
    p.vx *= 0.98; p.vy *= 0.98; p.x += p.vx; p.y += p.vy
    if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1
    p.x = Math.max(0, Math.min(W, p.x)); p.y = Math.max(0, Math.min(H, p.y))
    p.phase += 0.035
    const sz = Math.sin(p.phase) * 1.3 + 2.5
    ctx.globalAlpha = 0.9
    // glow
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 3.5)
    grd.addColorStop(0, p.color); grd.addColorStop(1, 'transparent')
    ctx.globalAlpha = 0.25; ctx.fillStyle = grd
    ctx.beginPath(); ctx.arc(p.x, p.y, sz * 3.5, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 0.9; ctx.fillStyle = p.color
    ctx.beginPath(); ctx.arc(p.x, p.y, sz, 0, Math.PI * 2); ctx.fill()
  }
  // cursor
  if (mx > 0) {
    const cgrd = ctx.createRadialGradient(mx, my, 0, mx, my, 14)
    cgrd.addColorStop(0, 'rgba(255,255,255,0.95)'); cgrd.addColorStop(1, 'transparent')
    ctx.globalAlpha = 0.3; ctx.fillStyle = cgrd
    ctx.beginPath(); ctx.arc(mx, my, 14, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1; ctx.fillStyle = '#fff'
    ctx.beginPath(); ctx.arc(mx, my, 3.5, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawFullFireflies(ctx: CanvasRenderingContext2D, ps: Particle[], W: number, H: number, mx: number, my: number) {
  for (const p of ps) {
    const dx = mx - p.x, dy = my - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 160) {
      const target = Math.atan2(dy, dx)
      let diff = target - Math.atan2(p.vy, p.vx)
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      const cur = Math.atan2(p.vy, p.vx) + diff * 0.05
      const spd = Math.min(p.size * 0.08 + 0.05, 2.8)
      p.vx = Math.cos(cur) * spd; p.vy = Math.sin(cur) * spd
    } else {
      p.vx *= 0.96; p.vy *= 0.96
      p.vx += (Math.random() - 0.5) * 0.15; p.vy += (Math.random() - 0.5) * 0.15
    }
    p.x += p.vx; p.y += p.vy
    if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20
    if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20
    p.phase += 0.04 + Math.random() * 0.02
    const bright = Math.sin(p.phase) * 0.5 + 0.5
    // big glow
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * (5 + bright * 5))
    grd.addColorStop(0, p.color); grd.addColorStop(1, 'transparent')
    ctx.globalAlpha = bright * 0.5; ctx.fillStyle = grd
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (5 + bright * 5), 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = bright; ctx.fillStyle = p.color
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawFullRipples(ctx: CanvasRenderingContext2D, ripples: Ripple[], pal: string[], mx: number, my: number, lastT: { v: number }) {
  const now = Date.now()
  if (mx > 0 && now - lastT.v > 60) {
    ripples.push({ x: mx, y: my, r: 4, maxR: 150 + Math.random() * 60,
      color: pal[Math.floor(Math.random() * pal.length)], alpha: 0.85, born: now })
    lastT.v = now
  }
  const alive = ripples.filter(r => r.alpha > 0.01)
  ripples.length = 0; ripples.push(...alive)
  for (const rp of alive) {
    rp.r += 2.4; rp.alpha = Math.max(0, (1 - rp.r / rp.maxR) * 0.85)
    ctx.globalAlpha = rp.alpha
    ctx.strokeStyle = rp.color; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke()
    if (rp.r > 20) {
      ctx.globalAlpha = rp.alpha * 0.45
      ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r * 0.55, 0, Math.PI * 2); ctx.stroke()
    }
  }
  ctx.globalAlpha = 1
}

// ── Main component ───────────────────────────────────────────────────────────
export default function AmbientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0, running = true
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let perf: PerfMode = getPerfMode()

    // pointer
    let mx = -9999, my = -9999
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onLeave = () => { mx = -9999; my = -9999 }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    // resize
    let W = 0, H = 0, DPR = 1
    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W * DPR; canvas.height = H * DPR
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    window.addEventListener('resize', resize)
    resize()

    // perf toggle listener
    const onPerf = (e: Event) => { perf = (e as CustomEvent<PerfMode>).detail }
    window.addEventListener('bato-perf-change', onPerf)

    // theme change → recolor in-place (no re-init needed)
    const mo = new MutationObserver(() => { recolor() })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // particles
    let orbs: Particle[] = []
    let nodes: Particle[] = []
    let flies: Particle[] = []
    let ripples: Ripple[] = []
    let lastRippleT = { v: 0 }

    const N_LITE = 30
    const N_FULL = 55
    const N_LITE_NODES = 35
    const N_FULL_NODES = 60
    const N_LITE_FLIES = 40
    const N_FULL_FLIES = 80

    const theme = () => getTheme()
    const pal = () => PAL[theme()] ?? PAL.light

    function mkOrbs() { orbs = (perf === 'lite' ? mkLiteOrbs : mkFullOrbs)(perf === 'lite' ? N_LITE : N_FULL, W, H, pal()) }
    function mkNodes() { nodes = (perf === 'lite' ? mkLiteNodes : mkFullNodes)(perf === 'lite' ? N_LITE_NODES : N_FULL_NODES, W, H, pal()) }
    function mkFlies() { flies = (perf === 'lite' ? mkLiteFlies : mkFullFlies)(perf === 'lite' ? N_LITE_FLIES : N_FULL_FLIES, W, H, pal()) }
    function mkRipples() { ripples = [] }

    function recolor() {
      const c = pal()
      for (const p of orbs)  p.color = c[Math.floor(Math.random() * c.length)]
      for (const p of nodes) p.color = c[Math.floor(Math.random() * c.length)]
      for (const p of flies) p.color = c[Math.floor(Math.random() * c.length)]
      for (const r of ripples) r.color = c[Math.floor(Math.random() * c.length)]
    }

    function initAll() { mkOrbs(); mkNodes(); mkFlies(); mkRipples() }
    function initForTheme() {
      if (theme() === 'ocean') mkRipples()
      else { mkOrbs(); mkNodes(); mkFlies() }
    }

    initAll()

    // draw dispatch
    function draw() {
      ctx.clearRect(0, 0, W, H)
      const t = theme()
      if (t === 'ocean') {
        const fn = perf === 'lite' ? drawLiteRipples : drawFullRipples
        fn(ctx, ripples, pal(), mx, my, lastRippleT)
      } else if (t === 'dark') {
        const fn = perf === 'lite' ? drawLiteConstellation : drawFullConstellation
        fn(ctx, nodes, W, H, mx, my)
      } else if (t === 'forest') {
        const fn = perf === 'lite' ? drawLiteFireflies : drawFullFireflies
        fn(ctx, flies, W, H, mx, my)
      } else {
        const fn = perf === 'lite' ? drawLiteOrbs : drawFullOrbs
        fn(ctx, orbs, W, H, mx, my)
      }
    }

    function frame() {
      if (!running) return
      draw()
      raf = requestAnimationFrame(frame)
    }

    function start() { if (!reduced) raf = requestAnimationFrame(frame) }
    function stop() { running = false; cancelAnimationFrame(raf) }

    const onVis = () => { if (document.hidden) stop(); else start() }
    document.addEventListener('visibilitychange', onVis)

    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onRm = (e: MediaQueryListEvent) => { reduced = e.matches; reduced ? stop() : start() }
    rmq.addEventListener('change', onRm)

    start()

    return () => {
      stop()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', resize)
      window.removeEventListener('bato-perf-change', onPerf)
      document.removeEventListener('visibilitychange', onVis)
      rmq.removeEventListener('change', onRm)
      mo.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: -1,
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
      }}
    />
  )
}
