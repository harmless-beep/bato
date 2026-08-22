'use client'

import Link from 'next/link'
import { useLang } from '../components/ui'

const examPatterns = [
  {
    exam: 'IOE Entrance (BE/B.Arch)',
    icon: '🏗️',
    items: [
      { label: 'Format', value: '100 MCQs, Computer-Based Test (CBT)' },
      { label: 'Duration', value: '2 hours' },
      { label: 'Mathematics', value: '40 questions' },
      { label: 'Physics', value: '30 questions' },
      { label: 'Chemistry', value: '30 questions' },
      { label: 'Eligibility', value: '45%+ in +2 with PCM (C grade min), 2.0 GPA' },
      { label: 'Fee', value: 'Rs. 2,500' },
      { label: 'Portal', value: 'entrance.ioe.edu.np' },
    ],
  },
  {
    exam: 'KU KUCAT (Engineering)',
    icon: '🎓',
    items: [
      { label: 'Format', value: 'MCQ + subjective mix (school-specific)' },
      { label: 'Duration', value: '~2 hours per paper' },
      { label: 'Mathematics', value: 'Major weightage' },
      { label: 'Physics / Chemistry', value: 'Core science topics' },
      { label: 'Eligibility', value: '50%+ in +2 with PCM (2.0+ GPA)' },
      { label: 'Portal', value: 'apply.ku.edu.np' },
    ],
  },
  {
    exam: 'MECEE-BL (Medical)',
    icon: '🩺',
    items: [
      { label: 'Format', value: '200 MCQs' },
      { label: 'Duration', value: '3 hours' },
      { label: 'Physics', value: '50 questions' },
      { label: 'Chemistry', value: '50 questions' },
      { label: 'Biology', value: '100 questions' },
      { label: 'Eligibility', value: '50%+ in +2 with PCB (2.4 GPA min)' },
      { label: 'Min age', value: '17 years by Aug 31 of admission year' },
      { label: 'Portal', value: 'entrance.meded.gov.np' },
    ],
  },
]

export default function Syllabus() {
  const { lang } = useLang()
  const isNe = lang === 'ne'

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn">← {isNe ? 'होम' : 'Home'}</Link>
        <span className="nav-title">🗂️ {isNe ? 'पाठ्यक्रम' : 'Syllabus'}</span>
        <div />
      </div>
      <div className="page-content">
        <div className="info-box">
          📌 {isNe
            ? 'IOE, KU र MECEE-BL को वास्तविक परीक्षा ढाँचा।'
            : 'Real exam patterns for IOE, KU KUCAT and MECEE-BL.'}
        </div>

        {examPatterns.map(e => (
          <div key={e.exam} className="card" style={{ marginBottom: 14, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{e.icon}</span>
              <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>{e.exam}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {e.items.map(it => (
                <div key={it.label} style={{ display: 'flex', gap: 10, fontSize: 13 }}>
                  <span style={{ color: 'var(--muted)', minWidth: 110, fontWeight: 600, flexShrink: 0 }}>{it.label}</span>
                  <span style={{ color: 'var(--text)' }}>{it.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="info-box" style={{ marginTop: 20 }}>
          <strong>📄 {isNe ? 'पूर्ण सिलेबस PDF' : 'Full Syllabus PDFs'}</strong>{' '}
          <a href="/bato/pdfs/ku-kucat-syllabus-2026.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            KU KUCAT 2026 →
          </a>
        </div>
      </div>
    </div>
  )
}
