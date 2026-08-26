'use client'

import { useEffect, useRef } from 'react'
import { getPerfMode } from './perf-mode'
import type { PerfMode } from './perf-mode'
export type { PerfMode }

function getTheme(): string {
  return document.documentElement.dataset.theme ?? 'light'
}

// ── Palette per theme ────────────────────────────────────────────────────────
const PAL: Record<string, string[]> = {
  light:  ['#4f46e5', '#7c3aed', '#f59e0b', '#818cf8', '#c084fc'],
  dark:   ['#818cf8', '#a78bfa', '#fbbf24', '#38bdf8', '#34d399'],
  forest: ['#34d399', '#4ade80', '#fbbf24', '#f97316', '#86efac'],
  ocean:  ['#38bdf8', '#0ea5e9', '#818cf8', '#06b6d4', '#22d3ee'],
}

// ── Shared types ──────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number
  color: string; phase: number; size: number
}
interface Ripple {
  x: number; y: number; r: number; maxR: number
  color: string; alpha: number; born: number
}

// ══════════════════════════════════════════════════════════════════════════════
// LIGHT MODE — morphing watercolor blobs + light motes (completely new)
// ══════════════════════════════════════════════════════════════════════════════

interface Blob {
  cx: number; cy: number         // center (drifts)
  vx: number; vy: number         // drift velocity
  r: number                       // base radius
  color: string; colorB: string   // gradient colors
  phase: number                   // morph phase
  speed: number                   // morph speed
  nPts: number                   // control points
  pts: number[]                   // [x0,y0, x1,y1, ...] relative offsets
  basePts: number[]              // original offsets
}

function mkBlob(W: number, H: number, pal: string[], cx = Math.random() * W, cy = Math.random() * H): Blob {
  const color = pal[Math.floor(Math.random() * pal.length)]
  const colorB = pal[Math.floor(Math.random() * pal.length)]
  const nPts = 8
  const pts: number[] = []
  const basePts: number[] = []
  const r = Math.min(W, H) * (0.38 + Math.random() * 0.22)
  for (let i = 0; i < nPts; i++) {
    const a = (i / nPts) * Math.PI * 2
    const jitter = 0.7 + Math.random() * 0.6
    pts.push(Math.cos(a) * r * jitter, Math.sin(a) * r * jitter)
    basePts.push(pts[pts.length - 2], pts[pts.length - 1])
  }
  return {
    cx, cy, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
    r, color, colorB, phase: Math.random() * Math.PI * 2,
    speed: 0.008 + Math.random() * 0.012, nPts, pts, basePts,
  }
}

function mkMote(W: number, H: number, pal: string[]): Particle {
  return {
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 2.4 + 1.4,
    color: pal[Math.floor(Math.random() * pal.length)],
    phase: Math.random() * Math.PI * 2,
  }
}

function drawFullLight(
  ctx: CanvasRenderingContext2D,
  blobs: Blob[], motes: Particle[],
  W: number, H: number, mx: number, my: number, t: number
) {
  // blobs
  for (const b of blobs) {
    // drift
    b.cx += b.vx; b.cy += b.vy
    if (b.cx < -b.r * 2) b.cx = W + b.r
    if (b.cx > W + b.r * 2) b.cx = -b.r
    if (b.cy < -b.r * 2) b.cy = H + b.r
    if (b.cy > H + b.r * 2) b.cy = -b.r
    // mouse push/pull
    const dx = b.cx - mx, dy = b.cy - my
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 280 && dist > 0) {
      const f = (280 - dist) / 280 * 0.04
      b.vx += (dx / dist) * f; b.vy += (dy / dist) * f
    }
    b.vx *= 0.99; b.vy *= 0.99
    b.phase += b.speed

    // morph each control point with layered sine
    for (let i = 0; i < b.nPts; i++) {
      const bp = b.basePts[i * 2], bq = b.basePts[i * 2 + 1]
      const mag = Math.sqrt(bp * bp + bq * bq)
      const ang = Math.atan2(bq, bp)
      const wave =
        Math.sin(b.phase + i * 0.8) * 0.28 +
        Math.sin(b.phase * 1.7 + i * 1.3) * 0.14 +
        Math.sin(b.phase * 0.5 + i * 0.4) * 0.08
      const nr = mag * (1 + wave)
      b.pts[i * 2] = Math.cos(ang) * nr
      b.pts[i * 2 + 1] = Math.sin(ang) * nr
    }

    // draw filled morphing shape
    const grd = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, b.r * 1.5)
    grd.addColorStop(0, b.color + 'b8')
    grd.addColorStop(0.45, b.colorB + '85')
    grd.addColorStop(1, 'transparent')
    ctx.globalAlpha = 1
    ctx.fillStyle = grd
    ctx.beginPath()
    ctx.moveTo(b.cx + b.pts[0], b.cy + b.pts[1])
    for (let i = 1; i <= b.nPts; i++) {
      const curr = i % b.nPts
      const next = (i + 1) % b.nPts
      const currX = b.cx + b.pts[curr * 2], currY = b.cy + b.pts[curr * 2 + 1]
      const nextX = b.cx + b.pts[next * 2], nextY = b.cy + b.pts[next * 2 + 1]
      const midX = (b.cx + b.pts[i % b.nPts * 2] + nextX) / 2
      const midY = (b.cy + b.pts[i % b.nPts * 2 + 1] + nextY) / 2
      ctx.quadraticCurveTo(currX, currY, midX, midY)
    }
    ctx.closePath()
    ctx.fill()
  }

  // motes
  for (const m of motes) {
    const dx = m.x - mx, dy = m.y - my
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 120) { m.vx -= (dx / dist) * 0.006; m.vy -= (dy / dist) * 0.006 }
    m.vx *= 0.97; m.vy *= 0.97
    m.x += m.vx; m.y += m.vy
    if (m.x < 0) m.x = W; if (m.x > W) m.x = 0
    if (m.y < 0) m.y = H; if (m.y > H) m.y = 0
    m.phase += 0.018
    const a = (Math.sin(m.phase) * 0.35 + 0.65) * 0.85
    ctx.globalAlpha = a * 0.45
    const grd = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.size * 4)
    grd.addColorStop(0, m.color); grd.addColorStop(1, 'transparent')
    ctx.fillStyle = grd
    ctx.beginPath(); ctx.arc(m.x, m.y, m.size * 4, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = a; ctx.fillStyle = m.color
    ctx.beginPath(); ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawLiteLight(ctx: CanvasRenderingContext2D, motes: Particle[], blobs: Blob[], W: number, H: number, mx: number, my: number) {
  // Lite still paints blobs — phones in Lite mode saw a blank page before.
  for (const b of blobs) {
    b.cx += b.vx; b.cy += b.vy
    if (b.cx < -b.r * 2) b.cx = W + b.r
    if (b.cx > W + b.r * 2) b.cx = -b.r
    if (b.cy < -b.r * 2) b.cy = H + b.r
    if (b.cy > H + b.r * 2) b.cy = -b.r
    b.vx *= 0.99; b.vy *= 0.99
    b.phase += b.speed
    for (let i = 0; i < b.nPts; i++) {
      const bp = b.basePts[i * 2], bq = b.basePts[i * 2 + 1]
      const mag = Math.sqrt(bp * bp + bq * bq)
      const ang = Math.atan2(bq, bp)
      const wave = Math.sin(b.phase + i * 0.8) * 0.28 + Math.sin(b.phase * 1.7 + i * 1.3) * 0.14
      b.pts[i * 2] = Math.cos(ang) * mag * (1 + wave)
      b.pts[i * 2 + 1] = Math.sin(ang) * mag * (1 + wave)
    }
    const grd = ctx.createRadialGradient(b.cx, b.cy, 0, b.cx, b.cy, b.r * 1.5)
    grd.addColorStop(0, b.color + 'b8'); grd.addColorStop(0.45, b.colorB + '85'); grd.addColorStop(1, 'transparent')
    ctx.globalAlpha = 1; ctx.fillStyle = grd
    ctx.beginPath()
    ctx.moveTo(b.cx + b.pts[0], b.cy + b.pts[1])
    for (let i = 1; i <= b.nPts; i++) {
      const curr = i % b.nPts, next = (i + 1) % b.nPts
      const currX = b.cx + b.pts[curr * 2], currY = b.cy + b.pts[curr * 2 + 1]
      const nextX = b.cx + b.pts[next * 2], nextY = b.cy + b.pts[next * 2 + 1]
      const midX = (b.cx + b.pts[i % b.nPts * 2] + nextX) / 2
      const midY = (b.cy + b.pts[i % b.nPts * 2 + 1] + nextY) / 2
      ctx.quadraticCurveTo(currX, currY, midX, midY)
    }
    ctx.closePath(); ctx.fill()
  }
  for (const m of motes) {
    const dx = m.x - mx, dy = m.y - my
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 120) { m.vx -= (dx / dist) * 0.005; m.vy -= (dy / dist) * 0.005 }
    m.vx *= 0.97; m.vy *= 0.97
    m.x += m.vx; m.y += m.vy
    if (m.x < 0) m.x = W; if (m.x > W) m.x = 0
    if (m.y < 0) m.y = H; if (m.y > H) m.y = 0
    m.phase += 0.025
    const a = (Math.sin(m.phase) * 0.35 + 0.65) * 0.85
    ctx.globalAlpha = a; ctx.fillStyle = m.color
    ctx.beginPath(); ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

// ══════════════════════════════════════════════════════════════════════════════
// DARK — constellation (unchanged from before)
// ══════════════════════════════════════════════════════════════════════════════

interface Node { x: number; y: number; vx: number; vy: number; color: string; pulse: number; sz: number }
function mkNodes(n: number, W: number, H: number, pal: string[]): Node[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    sz: Math.random() * 2 + 1.8, color: pal[Math.floor(Math.random() * pal.length)],
    pulse: Math.random() * Math.PI * 2,
  }))
}

function drawFullDark(ctx: CanvasRenderingContext2D, ns: Node[], W: number, H: number, mx: number, my: number) {
  for (let i = 0; i < ns.length; i++) {
    if (mx > 0) {
      const d2 = (ns[i].x - mx) ** 2 + (ns[i].y - my) ** 2
      if (d2 < 40000) {
        ctx.globalAlpha = (1 - d2 / 40000) * 0.3
        ctx.strokeStyle = ns[i].color; ctx.lineWidth = 0.7
        ctx.beginPath(); ctx.moveTo(ns[i].x, ns[i].y); ctx.lineTo(mx, my); ctx.stroke()
      }
    }
    for (let j = i + 1; j < ns.length; j++) {
      const d2 = (ns[i].x - ns[j].x) ** 2 + (ns[i].y - ns[j].y) ** 2
      if (d2 < 36000) {
        ctx.globalAlpha = (1 - d2 / 36000) * 0.4
        ctx.strokeStyle = ns[i].color; ctx.lineWidth = 0.6
        ctx.beginPath(); ctx.moveTo(ns[i].x, ns[i].y); ctx.lineTo(ns[j].x, ns[j].y); ctx.stroke()
      }
    }
  }
  for (const n of ns) {
    const dx = n.x - mx, dy = n.y - my
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 180) { n.vx += (dx / dist) * 0.005; n.vy += (dy / dist) * 0.005 }
    n.vx *= 0.98; n.vy *= 0.98; n.x += n.vx; n.y += n.vy
    if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1
    n.x = Math.max(0, Math.min(W, n.x)); n.y = Math.max(0, Math.min(H, n.y))
    n.pulse += 0.035
    const sz = Math.sin(n.pulse) * 1.3 + 2.5
    const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, sz * 3.5)
    grd.addColorStop(0, n.color); grd.addColorStop(1, 'transparent')
    ctx.globalAlpha = 0.25; ctx.fillStyle = grd
    ctx.beginPath(); ctx.arc(n.x, n.y, sz * 3.5, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 0.9; ctx.fillStyle = n.color
    ctx.beginPath(); ctx.arc(n.x, n.y, sz, 0, Math.PI * 2); ctx.fill()
  }
  if (mx > 0) {
    const cg = ctx.createRadialGradient(mx, my, 0, mx, my, 14)
    cg.addColorStop(0, 'rgba(255,255,255,0.95)'); cg.addColorStop(1, 'transparent')
    ctx.globalAlpha = 0.3; ctx.fillStyle = cg
    ctx.beginPath(); ctx.arc(mx, my, 14, 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = 1; ctx.fillStyle = '#fff'
    ctx.beginPath(); ctx.arc(mx, my, 3.5, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawLiteDark(ctx: CanvasRenderingContext2D, ns: Node[], W: number, H: number, mx: number, my: number) {
  for (const n of ns) {
    const dx = n.x - mx, dy = n.y - my
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 140) { n.vx += (dx / dist) * 0.004; n.vy += (dy / dist) * 0.004 }
    n.vx *= 0.97; n.vy *= 0.97; n.x += n.vx; n.y += n.vy
    if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1
    n.x = Math.max(0, Math.min(W, n.x)); n.y = Math.max(0, Math.min(H, n.y))
    n.pulse += 0.04
    const sz = Math.sin(n.pulse) + 2
    ctx.globalAlpha = 0.85; ctx.fillStyle = n.color
    ctx.beginPath(); ctx.arc(n.x, n.y, sz, 0, Math.PI * 2); ctx.fill()
  }
  if (mx > 0) { ctx.globalAlpha = 1; ctx.fillStyle = '#fff'
    ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2); ctx.fill() }
  ctx.globalAlpha = 1
}

// ══════════════════════════════════════════════════════════════════════════════
// FOREST — fireflies
// ══════════════════════════════════════════════════════════════════════════════

interface Fly { x: number; y: number; vx: number; vy: number; angle: number; speed: number; color: string; blink: number; size: number }
function mkFlies(n: number, W: number, H: number, pal: string[]): Fly[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    angle: Math.random() * Math.PI * 2, speed: Math.random() * 0.8 + 0.2,
    color: pal[Math.floor(Math.random() * pal.length)],
    blink: Math.random() * Math.PI * 2, size: Math.random() * 2.5 + 1,
    vx: 0, vy: 0,
  }))
}

function drawFullForest(ctx: CanvasRenderingContext2D, fs: Fly[], W: number, H: number, mx: number, my: number) {
  for (const f of fs) {
    const dx = mx - f.x, dy = my - f.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 160) {
      const target = Math.atan2(dy, dx)
      let diff = target - f.angle
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      f.angle += diff * 0.05
      f.speed = Math.min(f.speed + 0.02, 2.8)
    } else {
      f.vx *= 0.96; f.vy *= 0.96
      f.vx += (Math.random() - 0.5) * 0.15; f.vy += (Math.random() - 0.5) * 0.15
    }
    f.x += Math.cos(f.angle) * f.speed + f.vx
    f.y += Math.sin(f.angle) * f.speed + f.vy
    if (f.x < -20) f.x = W + 20; if (f.x > W + 20) f.x = -20
    if (f.y < -20) f.y = H + 20; if (f.y > H + 20) f.y = -20
    f.blink += 0.04 + Math.random() * 0.02
    const bright = Math.sin(f.blink) * 0.5 + 0.5
    const grd = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * (5 + bright * 5))
    grd.addColorStop(0, f.color); grd.addColorStop(1, 'transparent')
    ctx.globalAlpha = bright * 0.5; ctx.fillStyle = grd
    ctx.beginPath(); ctx.arc(f.x, f.y, f.size * (5 + bright * 5), 0, Math.PI * 2); ctx.fill()
    ctx.globalAlpha = bright; ctx.fillStyle = f.color
    ctx.beginPath(); ctx.arc(f.x, f.y, f.size * 0.6, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawLiteForest(ctx: CanvasRenderingContext2D, fs: Fly[], W: number, H: number, mx: number, my: number) {
  for (const f of fs) {
    const dx = mx - f.x, dy = my - f.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 120) { f.vx += Math.cos(Math.atan2(dy, dx)) * 0.03; f.vy += Math.sin(Math.atan2(dy, dx)) * 0.03 }
    f.vx *= 0.95; f.vy *= 0.95
    f.vx += (Math.random() - 0.5) * 0.1; f.vy += (Math.random() - 0.5) * 0.1
    f.x += f.vx; f.y += f.vy
    if (f.x < -10) f.x = W + 10; if (f.x > W + 10) f.x = -10
    if (f.y < -10) f.y = H + 10; if (f.y > H + 10) f.y = -10
    f.blink += 0.06
    const a = Math.sin(f.blink) * 0.5 + 0.5
    ctx.globalAlpha = a * 0.8; ctx.fillStyle = f.color
    ctx.beginPath(); ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

// ══════════════════════════════════════════════════════════════════════════════
// OCEAN — ripples
// ══════════════════════════════════════════════════════════════════════════════

// shared ambient ticker — only one ocean draw fn runs at a time
const ambientT = { v: 0 }

function drawFullOcean(ctx: CanvasRenderingContext2D, ripples: Ripple[], pal: string[], mx: number, my: number, W: number, H: number, lastT: { v: number }) {
  const now = Date.now()
  // ambient ripples: a phone at rest still shows life (was blank with no touch)
  if (now - ambientT.v > (mx > 0 ? 2400 : 1200)) {
    ambientT.v = now
    ripples.push({ x: Math.random() * W, y: Math.random() * H, r: 4, maxR: 80 + Math.random() * 90,
      color: pal[Math.floor(Math.random() * pal.length)], alpha: 0.55, born: now })
  }
  if (mx > 0 && now - lastT.v > 60) {
    ripples.push({
      x: mx, y: my, r: 4, maxR: 150 + Math.random() * 60,
      color: pal[Math.floor(Math.random() * pal.length)], alpha: 0.85, born: now,
    })
    lastT.v = now
  }
  const alive = ripples.filter(r => r.alpha > 0.01)
  ripples.length = 0; ripples.push(...alive)
  for (const rp of alive) {
    rp.r += 2.4; rp.alpha = Math.max(0, (1 - rp.r / rp.maxR) * 0.85)
    ctx.globalAlpha = rp.alpha; ctx.strokeStyle = rp.color; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke()
    if (rp.r > 20) {
      ctx.globalAlpha = rp.alpha * 0.45
      ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r * 0.55, 0, Math.PI * 2); ctx.stroke()
    }
  }
  ctx.globalAlpha = 1
}

function drawLiteOcean(ctx: CanvasRenderingContext2D, ripples: Ripple[], pal: string[], mx: number, my: number, W: number, H: number, lastT: { v: number }) {
  const now = Date.now()
  if (now - ambientT.v > (mx > 0 ? 2800 : 1600)) {
    ambientT.v = now
    ripples.push({ x: Math.random() * W, y: Math.random() * H, r: 4, maxR: 70 + Math.random() * 60,
      color: pal[Math.floor(Math.random() * pal.length)], alpha: 0.5, born: now })
  }
  if (mx > 0 && now - lastT.v > 120) {
    ripples.push({ x: mx, y: my, r: 5, maxR: 90,
      color: pal[0], alpha: 0.7, born: now })
    lastT.v = now
  }
  const alive = ripples.filter(r => r.alpha > 0.02)
  ripples.length = 0; ripples.push(...alive)
  for (const rp of alive) {
    rp.r += 2; rp.alpha = Math.max(0, (1 - rp.r / rp.maxR) * 0.7)
    ctx.globalAlpha = rp.alpha; ctx.strokeStyle = rp.color; ctx.lineWidth = 1.2
    ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke()
  }
  ctx.globalAlpha = 1
}

// ══════════════════════════════════════════════════════════════════════════════
// Main component
// ══════════════════════════════════════════════════════════════════════════════

export default function AmbientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0, running = true
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let perf: PerfMode = getPerfMode()

    let mx = -9999, my = -9999
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onLeave = () => { mx = -9999; my = -9999 }
    // touch = same pointer. without this, mobile gets no pushes, no links,
    // and ocean ripples never spawn (they key off pointer position).
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0]
      if (t) { mx = t.clientX; my = t.clientY }
    }
    const onTouchEnd = (e: TouchEvent) => { if (e.touches.length === 0) { mx = -9999; my = -9999 } }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

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

    const onPerf = (e: Event) => { perf = (e as CustomEvent<PerfMode>).detail; reinitAll() }
    window.addEventListener('bato-perf-change', onPerf)

    const mo = new MutationObserver(() => { recolor() })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const theme = () => getTheme()
    const pal = () => PAL[theme()] ?? PAL.light

    // state per effect type
    let blobs: Blob[] = []
    let motes: Particle[] = []
    let nodes: Node[] = []
    let flies: Fly[] = []
    let ripples: Ripple[] = []
    let lastRippleT = { v: 0 }
    let frameT = 0 // for light mode morphing

    const N_LITE = 30, N_FULL = 55
    const N_LITE_NODES = 35, N_FULL_NODES = 60
    const N_LITE_FLIES = 40, N_FULL_FLIES = 80
    const N_LITE_MOTES = 35, N_FULL_MOTES = 60
    const N_BLOBS_FULL = 4, N_BLOBS_LITE = 3

    function mkBlobs() { blobs = Array.from({ length: perf === 'full' ? N_BLOBS_FULL : N_BLOBS_LITE }, () => mkBlob(W, H, pal())) }
    function mkMotes() { motes = Array.from({ length: perf === 'full' ? N_FULL_MOTES : N_LITE_MOTES }, () => mkMote(W, H, pal())) }
    function mkNodes2() { nodes = mkNodes(perf === 'full' ? N_FULL_NODES : N_LITE_NODES, W, H, pal()) }
    function mkFlies2() { flies = mkFlies(perf === 'full' ? N_FULL_FLIES : N_LITE_FLIES, W, H, pal()) }
    function mkRipples2() { ripples = []; lastRippleT = { v: 0 } }

    function reinitAll() {
      mkBlobs(); mkMotes(); mkNodes2(); mkFlies2(); mkRipples2()
    }
    reinitAll()

    function recolor() {
      const c = pal()
      for (const b of blobs) { b.color = c[Math.floor(Math.random() * c.length)]; b.colorB = c[Math.floor(Math.random() * c.length)] }
      for (const m of motes) m.color = c[Math.floor(Math.random() * c.length)]
      for (const n of nodes) n.color = c[Math.floor(Math.random() * c.length)]
      for (const f of flies) f.color = c[Math.floor(Math.random() * c.length)]
      for (const r of ripples) r.color = c[Math.floor(Math.random() * c.length)]
    }

    function frame() {
      if (!running) return
      ctx.clearRect(0, 0, W, H)
      frameT++
      const t = theme()
      if (t === 'light') {
        if (perf === 'full') drawFullLight(ctx, blobs, motes, W, H, mx, my, frameT)
        else drawLiteLight(ctx, motes, blobs, W, H, mx, my)
      } else if (t === 'dark') {
        if (perf === 'full') drawFullDark(ctx, nodes, W, H, mx, my)
        else drawLiteDark(ctx, nodes, W, H, mx, my)
      } else if (t === 'forest') {
        if (perf === 'full') drawFullForest(ctx, flies, W, H, mx, my)
        else drawLiteForest(ctx, flies, W, H, mx, my)
      } else if (t === 'ocean') {
        if (perf === 'full') drawFullOcean(ctx, ripples, pal(), mx, my, W, H, lastRippleT)
        else drawLiteOcean(ctx, ripples, pal(), mx, my, W, H, lastRippleT)
      }
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (!reduced) {
        raf = requestAnimationFrame(frame)
      } else {
        // reduced-motion: still paint one static frame so background isn't blank
        frame()
      }
    }
    function stop() { running = false; cancelAnimationFrame(raf) }

    const onVis = () => { if (document.hidden) stop(); else start() }
    document.addEventListener('visibilitychange', onVis)
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)')
    rmq.addEventListener('change', (e) => { reduced = e.matches; reduced ? stop() : start() })

    start()
    return () => {
      stop()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', resize)
      window.removeEventListener('bato-perf-change', onPerf)
      document.removeEventListener('visibilitychange', onVis)
      rmq.removeEventListener('change', () => {})
      mo.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
      }}
    />
  )
}
