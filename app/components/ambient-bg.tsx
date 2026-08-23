'use client'

import { useEffect, useRef } from 'react'

export default function AmbientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return

    const ctx = canvas.getContext('2d')!
    let raf = 0
    let particles: Particle[] = []
    let running = true
    let reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let themeObserver: MutationObserver | null = null

    // Build palette from CSS vars — works across all 4 themes
    function palette(): string[] {
      const s = getComputedStyle(document.documentElement)
      const p = s.getPropertyValue('--primary').trim()
      const v = s.getPropertyValue('--violet').trim()
      const g = s.getPropertyValue('--gold').trim()
      const bg = s.getPropertyValue('--bg').trim()
      // light mode: soft dark accents; dark modes: bright accents
      const isLight = bg === '#f5f6fa' || !bg
      return isLight
        ? ['#4f46e5', '#7c3aed', '#f59e0b', '#818cf8', '#a78bfa']
        : [p || '#818cf8', v || '#a78bfa', g || '#fbbf24', '#38bdf8', '#34d399']
    }

    // Particle
    class Particle {
      x: number; y: number; vx: number; vy: number; size: number
      color: string; alpha: number; da: number
      constructor(w: number, h: number, colors: string[]) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.size = Math.random() * 2 + 1.2
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.alpha = Math.random() * 0.5 + 0.2
        this.da = (Math.random() - 0.5) * 0.002
      }
      update(w: number, h: number) {
        this.x += this.vx; this.y += this.vy
        this.alpha += this.da
        if (this.alpha > 0.7 || this.alpha < 0.1) this.da *= -1
        if (this.x < 0) this.x = w; if (this.x > w) this.x = 0
        if (this.y < 0) this.y = h; if (this.y > h) this.y = 0
      }
    }

    let colors = palette()
    let w = 0, h = 0, dpr = 1

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2) // cap DPR
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      // regenerate particles on resize (keep count proportional to area)
      const count = Math.min(80, Math.max(40, Math.floor((w * h) / 20000)))
      if (particles.length !== count) {
        particles = Array.from({ length: count }, () => new Particle(w, h, colors))
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function frame() {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.update(w, h)
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      // connection lines between nearby particles
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = dx * dx + dy * dy
          if (dist < 60000) {
            ctx.strokeStyle = particles[i].color
            ctx.globalAlpha = (1 - dist / 60000) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    // Recolor all particles in-place
    function recolor() {
      const c = palette()
      for (const p of particles) p.color = c[Math.floor(Math.random() * c.length)]
    }

    // Start/stop based on visibility
    function start() { running = true; if (!reduced) raf = requestAnimationFrame(frame) }
    function stop() { running = false; cancelAnimationFrame(raf) }

    // Visibility change
    const onVis = () => {
      if (document.hidden) { stop() } else { start() }
    }
    document.addEventListener('visibilitychange', onVis)

    // Reduced motion
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onRm = (e: MediaQueryListEvent) => {
      reduced = e.matches
      if (reduced) { stop(); renderStatic() } else { start() }
    }
    rmq.addEventListener('change', onRm)

    // Theme changes — observe data-theme on html
    themeObserver = new MutationObserver(() => { recolor() })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // Render one frame (even for reduced-motion)
    function renderStatic() {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        ctx.globalAlpha = p.alpha * 0.6
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    resize()
    if (reduced) { renderStatic() } else { raf = requestAnimationFrame(frame) }

    window.addEventListener('resize', resize)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVis)
      rmq.removeEventListener('change', onRm)
      themeObserver?.disconnect()
      window.removeEventListener('resize', resize)
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