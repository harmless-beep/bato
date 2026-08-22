'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useLang } from './ui'
import SuggestionForm from './suggestion-form'

// Floating 💬 button (bottom-right) → suggestion overlay panel, from any page
export default function SuggestFab() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className="sug-fab" onClick={() => setOpen(true)} aria-label={isNe ? 'सुझाव' : 'Suggest'} title={isNe ? 'सुझाव दिनुहोस्' : 'Suggest an idea'}>
        💬
      </button>
      {open && typeof document !== 'undefined' && createPortal(
        <div className="sug-fab-backdrop" onClick={() => setOpen(false)}>
          <div className="sug-fab-panel" onClick={e => e.stopPropagation()}>
            <button className="sug-fab-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            <div className="sug-fab-title">💬 {isNe ? 'सुझाव दिनुहोस्' : 'Share a suggestion'}</div>
            <SuggestionForm onSubmitted={() => setTimeout(() => setOpen(false), 900)} />
            <Link href="/suggest" className="sug-fab-link" onClick={() => setOpen(false)}>
              {isNe ? 'सबै सुझाव हेर्नुहोस् →' : 'View all suggestions →'}
            </Link>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
