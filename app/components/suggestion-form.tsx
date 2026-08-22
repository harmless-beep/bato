'use client'

import { useState } from 'react'
import { useLang } from './ui'

export const SUG_TYPES: { id: string; icon: string; label: string; labelNp: string }[] = [
  { id: 'idea', icon: '💡', label: 'Idea', labelNp: 'विचार' },
  { id: 'xp', icon: '🧪', label: 'My Experience', labelNp: 'मेरो अनुभव' },
  { id: 'problem', icon: '🚧', label: 'Problem', labelNp: 'समस्या' },
  { id: 'feature', icon: '✨', label: 'Feature Wish', labelNp: 'नयाँ सुविधा' },
]
export const SUG_LS = 'bato-suggestions'
export const SUG_MAX = 400

export function pushSuggestion(type: string, text: string) {
  try {
    const items = JSON.parse(localStorage.getItem(SUG_LS) || '[]') as { id: string; type: string; text: string; ts: number }[]
    items.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), type, text: text.trim(), ts: Date.now() })
    localStorage.setItem(SUG_LS, JSON.stringify(items))
    return true
  } catch { return false }
}

export default function SuggestionForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [type, setType] = useState('idea')
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)

  const submit = () => {
    if (!text.trim()) return
    pushSuggestion(type, text)
    setText(''); setDone(true)
    setTimeout(() => setDone(false), 2600)
    onSubmitted?.()
  }

  return (
    <div>
      <div className="sug-chips" role="radiogroup" aria-label="Suggestion type">
        {SUG_TYPES.map(t => (
          <button key={t.id} className={`chip${type === t.id ? ' active' : ''}`} onClick={() => setType(t.id)} aria-checked={type === t.id} role="radio">
            {t.icon} {isNe ? t.labelNp : t.label}
          </button>
        ))}
      </div>
      <textarea
        className="input sug-input"
        placeholder={isNe ? 'के भन्न चाहनुहुन्छ? (जस्तै: Physics मा numerical को practice चाहियो…)' : 'What would you like to say? (e.g. I need more numerical practice in Physics…)'}
        value={text}
        maxLength={SUG_MAX}
        onChange={e => setText(e.target.value)}
        rows={4}
      />
      <div className="sug-submit-row">
        <span className="sug-count">{text.length}/{SUG_MAX}</span>
        <button className="btn btn-primary btn-sm" onClick={submit} disabled={!text.trim()}>
          {done ? '✓ ' + (isNe ? 'थपियो!' : 'Submitted!') : '🚀 ' + (isNe ? 'सुझाव पठाउनुहोस्' : 'Submit suggestion')}
        </button>
      </div>
    </div>
  )
}
