'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Hosts a self-contained ThreeUI HTML scene in a sandboxed iframe.
 * Reads CSS vars from the parent page to match the current theme.
 * Pauses when off-screen / tab hidden / reduced-motion preferred.
 */
export default function ThreeUIEmbed({
  src,
  title = 'Interactive scene',
  style,
}: {
  src: string
  title?: string
  style?: React.CSSProperties
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [docHidden, setDocHidden] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const io = new IntersectionObserver(([e]) => setVisible(e?.isIntersecting ?? true), {
      rootMargin: '100px',
    })
    io.observe(host)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onChange = () => setDocHidden(document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Inject reduced-motion flag so the HTML scene can respect it
  // Some ThreeUI scenes check window.__reducedMotion or similar; if not,
  // the CSS `@media (prefers-reduced-motion)` in the scene handles it.
  const mountUrl = reducedMotion
    ? `${src}#reduced-motion`
    : src

  if (!visible || docHidden) return null

  return (
    <div
      ref={hostRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      <iframe
        key={src}
        src={mountUrl}
        title={title}
        loading="eager"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 0,
          display: 'block',
        }}
      />
    </div>
  )
}
