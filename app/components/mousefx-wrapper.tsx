'use client'

import dynamic from 'next/dynamic'

const MouseFX = dynamic(() => import('./mousefx'), { ssr: false })

export default function MouseFXWrapper() {
  return <MouseFX />
}
