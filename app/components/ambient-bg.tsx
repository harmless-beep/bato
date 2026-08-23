'use client'

import { useEffect, useRef } from 'react'

// ── Mouse-reactive Canvas 2D background, one effect per theme ────────────────
// light  → floating orbs that drift and react to cursor proximity
// dark   → constellation: nodes + live connection lines + cursor node
// forest → fireflies: warm glowing dots that swarm the cursor
// ocean  → ripples: concentric rings expand from cursor on move

function getTheme(): string {
  return document.documentElement.dataset.theme ?? 'light'
}

export default function AmbientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let running = true
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── pointer state ────────────────────────────────────────────────
    let mx = -9999, my = -9999
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onLeave = () => { mx = -9999; my = -9999 }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    // ── palette per theme ─────────────────────────────────────────────
    const PALETTES: Record<string, string[]> = {
      light:  ['#4f46e5', '#7c3aed', '#f59e0b', '#818cf8', '#c084fc'],
      dark:   ['#818cf8', '#a78bfa', '#fbbf24', '#38bdf8', '#34d399'],
      forest: ['#34d399', '#4ade80', '#fbbf24', '#f97316', '#86efac'],
      ocean:  ['#38bdf8', '#0ea5e9', '#818cf8', '#06b6d4', '#22d3ee'],
    }
    function palette(): string[] {
      return PALETTES[getTheme()] ?? PALETTES.light
    }

    // ── resize ────────────────────────────────────────────────────────
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

    // ── theme change ─────────────────────────────────────────────────
    const onTheme = () => { initForTheme() }
    const mo = new MutationObserver(onTheme)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // ── EFFECT 1: Floating orbs (light) ─────────────────────────────
    interface Orb { x: number; y: number; vx: number; vy: number; r: number; color: string; phase: number }
    let orbs: Orb[] = []
    const MAX_ORBS = 55
    function mkOrb(): Orb {
      const c = palette()
      return { x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 5 + 3, color: c[Math.floor(Math.random() * c.length)],
        phase: Math.random() * Math.PI * 2 }
    }
    function drawOrbs() {
      for (const o of orbs) {
        const dx = mx - o.x, dy = my - o.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.4
          o.vx -= (dx / dist) * force; o.vy -= (dy / dist) * force
        }
        o.vx *= 0.97; o.vy *= 0.97; o.x += o.vx; o.y += o.vy
        if (o.x < 0) o.x = W; if (o.x > W) o.x = 0
        if (o.y < 0) o.y = H; if (o.y > H) o.y = 0
        o.phase += 0.02
        const glow = Math.sin(o.phase) * 0.25 + 0.75
        ctx.globalAlpha = glow * 0.7
        const grd = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 3)
        grd.addColorStop(0, o.color)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r * 3, 0, Math.PI * 2); ctx.fill()
        ctx.globalAlpha = glow
        ctx.fillStyle = o.color
        ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // ── EFFECT 2: Constellation (dark) ───────────────────────────────
    interface Node { x: number; y: number; vx: number; vy: number; color: string; pulse: number }
    let nodes: Node[] = []
    const MAX_NODES = 60
    function mkNode(): Node {
      const c = palette()
      return { x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        color: c[Math.floor(Math.random() * c.length)],
        pulse: Math.random() * Math.PI * 2 }
    }
    function drawConstellation() {
      const alive = mx > 0
      // nodes
      for (const n of nodes) {
        const dx = mx - n.x, dy = my - n.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          const force = (180 - dist) / 180 * 0.6
          n.vx += (dx / dist) * force * 0.05; n.vy += (dy / dist) * force * 0.05
        }
        n.vx *= 0.98; n.vy *= 0.98; n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1
        n.pulse += 0.04
        const sz = Math.sin(n.pulse) * 1.2 + 2.2
        ctx.globalAlpha = 0.9
        ctx.fillStyle = n.color
        ctx.beginPath(); ctx.arc(n.x, n.y, sz, 0, Math.PI * 2); ctx.fill()
      }
      // cursor node
      if (alive) {
        ctx.globalAlpha = 1
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(mx, my, 3.5, 0, Math.PI * 2); ctx.fill()
      }
      // lines
      ctx.globalAlpha = 0.1; ctx.lineWidth = 0.8
      for (let i = 0; i < nodes.length; i++) {
        const dxC = mx - nodes[i].x, dyC = my - nodes[i].y
        if (alive && Math.sqrt(dxC * dxC + dyC * dyC) < 180) {
          ctx.strokeStyle = nodes[i].color
          ctx.globalAlpha = 0.25
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(mx, my); ctx.stroke()
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < 30000) {
            const alpha = (1 - d2 / 30000) * 0.3
            ctx.globalAlpha = alpha
            ctx.strokeStyle = nodes[i].color
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    // ── EFFECT 3: Fireflies (forest) ────────────────────────────────
    interface Fly { x: number; y: number; angle: number; speed: number; color: string; blink: number; size: number }
    let flies: Fly[] = []
    const MAX_FLIES = 80
    function mkFly(): Fly {
      const c = palette()
      return { x: Math.random() * W, y: Math.random() * H,
        angle: Math.random() * Math.PI * 2, speed: Math.random() * 0.8 + 0.2,
        color: c[Math.floor(Math.random() * c.length)],
        blink: Math.random() * Math.PI * 2, size: Math.random() * 2.5 + 1 }
    }
    function drawFireflies() {
      for (const f of flies) {
        const dx = mx - f.x, dy = my - f.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 160) {
          const target = Math.atan2(dy, dx)
          let diff = target - f.angle
          while (diff > Math.PI) diff -= Math.PI * 2
          while (diff < -Math.PI) diff += Math.PI * 2
          f.angle += diff * 0.04
          f.speed = Math.min(f.speed + 0.02, 2.5)
        } else {
          f.angle += (Math.random() - 0.5) * 0.2
          f.speed = f.speed * 0.97 + 0.1
        }
        f.x += Math.cos(f.angle) * f.speed
        f.y += Math.sin(f.angle) * f.speed
        if (f.x < -20) f.x = W + 20; if (f.x > W + 20) f.x = -20
        if (f.y < -20) f.y = H + 20; if (f.y > H + 20) f.y = -20
        f.blink += 0.05 + Math.random() * 0.02
        const brightness = (Math.sin(f.blink) * 0.5 + 0.5)
        const glowR = f.size * (3 + brightness * 4)
        ctx.globalAlpha = brightness * 0.5
        const grd = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowR)
        grd.addColorStop(0, f.color)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath(); ctx.arc(f.x, f.y, glowR, 0, Math.PI * 2); ctx.fill()
        ctx.globalAlpha = brightness
        ctx.fillStyle = f.color
        ctx.beginPath(); ctx.arc(f.x, f.y, f.size * 0.7, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // ── EFFECT 4: Ripples (ocean) ────────────────────────────────────
    interface Ripple { x: number; y: number; r: number; maxR: number; color: string; alpha: number; born: number }
    let ripples: Ripple[] = []
    let lastRippleT = 0
    function drawRipples() {
      const now = Date.now()
      if (mx > 0 && now - lastRippleT > 80) {
        const c = palette()
        ripples.push({ x: mx, y: my, r: 4, maxR: 130 + Math.random() * 60,
          color: c[Math.floor(Math.random() * c.length)], alpha: 0.8, born: now })
        lastRippleT = now
      }
      ripples = ripples.filter(r => r.alpha > 0.01)
      for (const rp of ripples) {
        rp.r += 2.2; rp.alpha = Math.max(0, (1 - rp.r / rp.maxR) * 0.8)
        ctx.globalAlpha = rp.alpha
        ctx.strokeStyle = rp.color
        ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke()
        // second ring at half radius, half alpha
        if (rp.r > 20) {
          ctx.globalAlpha = rp.alpha * 0.4
          ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r * 0.55, 0, Math.PI * 2); ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
    }

    // ── init per theme ───────────────────────────────────────────────
    function initForTheme() {
      const t = getTheme()
      orbs = Array.from({ length: MAX_ORBS }, mkOrb)
      nodes = Array.from({ length: MAX_NODES }, mkNode)
      flies = Array.from({ length: MAX_FLIES }, mkFly)
      ripples = []
    }
    initForTheme()

    // ── frame loop ───────────────────────────────────────────────────
    function frame() {
      if (!running) return
      ctx.clearRect(0, 0, W, H)
      const t = getTheme()
      if      (t === 'dark')   drawConstellation()
      else if (t === 'forest') drawFireflies()
      else if (t === 'ocean') drawRipples()
      else                    drawOrbs() // light + fallback
      raf = requestAnimationFrame(frame)
    }

    function start() { if (!reduced) raf = requestAnimationFrame(frame) }
    function stop()  { running = false; cancelAnimationFrame(raf) }

    const onVis = () => { if (document.hidden) stop(); else start() }
    document.addEventListener('visibilitychange', onVis)

    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onRm = (e: MediaQueryListEvent) => {
      reduced = e.matches
      if (reduced) stop(); else start()
    }
    rmq.addEventListener('change', onRm)

    start()

    return () => {
      stop()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', resize)
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
