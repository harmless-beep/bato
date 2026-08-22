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
      { label: 'Negative marking', value: '-0.1 per wrong (10% of 1-mark Q; 5% in recent patterns)' },
      { label: 'Eligibility', value: '45%+ in +2 with PCM (C grade min), 2.0 GPA' },
      { label: 'Fee', value: 'Rs. 2,500' },
      { label: 'Portal', value: 'entrance.ioe.edu.np' },
    ],
    pdf: '/bato/pdfs/ioe-entrance-syllabus.pdf',
    pdfLabel: 'IOE Full Syllabus PDF →',
  },
  {
    exam: 'KU KUCAT (Engineering)',
    icon: '🎓',
    items: [
      { label: 'Format', value: '120 MCQs, Computer-Based Test (CBT)' },
      { label: 'Duration', value: '2 hours' },
      { label: 'Physics', value: '~40 questions' },
      { label: 'Chemistry', value: '~40 questions' },
      { label: 'Mathematics', value: '~40 questions' },
      { label: 'Eligibility', value: '50%+ in +2 with PCM (C grade min)' },
      { label: 'Fee', value: 'Rs. 2,000 (via eSewa/Khalti)' },
      { label: 'Portal', value: 'apply.ku.edu.np/cbt' },
    ],
    pdf: '/bato/pdfs/ku-kucat-syllabus-2026.pdf',
    pdfLabel: 'KU KUCAT 2026 Syllabus PDF →',
  },
  {
    exam: 'MECEE-BL (Medical — CEE)',
    icon: '🩺',
    items: [
      { label: 'Format', value: '200 MCQs, Computer-Based Test (CBT)' },
      { label: 'Duration', value: '3 hours' },
      { label: 'Physics', value: '50 questions' },
      { label: 'Chemistry', value: '50 questions' },
      { label: 'Biology', value: '100 questions (Botany 50 + Zoology 50)' },
      { label: 'Negative marking', value: '-0.25 per wrong answer' },
      { label: 'Merit list', value: 'score above 50th percentile' },
      { label: 'Eligibility', value: '50%+ in +2 with PCB (2.4 GPA min)' },
      { label: 'Min age', value: '17 years by Aug 31 of admission year' },
      { label: 'Fee', value: 'Rs. 6,000 (one-time, covers all programs)' },
      { label: 'Portal', value: 'entrance.meded.gov.np' },
    ],
    pdf: '/bato/pdfs/mecee-bl-syllabus.pdf',
    pdfLabel: 'MECEE-BL Full Syllabus PDF →',
  },
]

const pastPatterns = [
  {
    exam: 'IOE Past Entrance Pattern (2076–2082)',
    icon: '📜',
    points: [
      '100 MCQs in 2 hours — 40 Math / 30 Physics / 30 Chemistry',
      'CBT since 2077; before that paper-based OMR',
      'Cutoff (2082) top programs: Pulchowk Computer/Civil ~Rank 1-2, EC ~Rank 2, Mechanical ~Rank 15 (Regular)',
      'Result in ~2 weeks; counselling starts ~2 weeks after result (multiple rounds)',
      'Tie-break: Math score → Chemistry score → fewer wrong attempts',
    ],
  },
  {
    exam: 'KU Past Entrance Pattern (KUCAT, 2077–2082)',
    icon: '📜',
    points: [
      'KUCAT-CBT: 120 MCQs in 2 hours — Physics / Chemistry / Mathematics equal weight',
      'B.Arch candidates: separate aptitude test after CBT results',
      'Registration via apply.ku.edu.np, fee Rs. 2,000 (eSewa/Khalti)',
      'KU uses its own merit list — no counselling, direct admission offers by rank',
      'Geomatics Engineering scholarship: separate application track',
    ],
  },
  {
    exam: 'CEE / MECEE-BL Past Pattern (2080–2082)',
    icon: '📜',
    points: [
      '200 MCQs in 3 hours — Physics 50 / Chemistry 50 / Biology 100',
      'Single exam for all health programs: MBBS, BDS, BSc Nursing, B.Pharm, BPT, BAMS...',
      '2082: highest score 185/200, merit cutoff 52.25 marks',
      'Admission by open-house matching: rank + preference list → auto-match',
      '2,635 MBBS seats total (691 scholarship) in 2082 intake',
      'Govt colleges (IOM/BPKIHS/PAHS) ~NPR 15-20 lakh; private ~NPR 40-50 lakh',
    ],
  },
]

export default function Syllabus() {
  const { lang } = useLang()
  const isNe = lang === 'ne'

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn" aria-label="Home">←</Link>
        <span className="nav-title">🗂️ {isNe ? 'पाठ्यक्रम' : 'Syllabus'}</span>
        <div />
      </div>
      <div className="page-content">
        <div className="info-box">
          📌 {isNe
            ? 'IOE, KU र MECEE-BL को वास्तविक परीक्षा ढाँचा, शुल्क र full syllabus PDFs।'
            : 'Real exam patterns, fees and full syllabus PDFs for IOE, KU KUCAT and MECEE-BL.'}
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
                  <span style={{ color: 'var(--muted)', minWidth: 130, fontWeight: 600, flexShrink: 0 }}>{it.label}</span>
                  <span style={{ color: 'var(--text)' }}>{it.value}</span>
                </div>
              ))}
            </div>
            <a
              href={e.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ marginTop: 12, textDecoration: 'none', display: 'inline-block' }}
            >
              📄 {e.pdfLabel}
            </a>
          </div>
        ))}

        {/* Past entrance patterns */}
        <div className="section-header" style={{ marginTop: 24 }}>
          <div className="section-title">📜 {isNe ? 'पुराना प्रवेश परीक्षा पैटर्न' : 'Past Entrance Exam Patterns'}</div>
          <div className="section-sub">2076–2082 compiled</div>
        </div>

        {pastPatterns.map(p => (
          <div key={p.exam} className="card" style={{ marginBottom: 12, padding: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{p.icon}</span> {p.exam}
            </div>
            {p.points.map((pt, i) => (
              <div key={i} style={{ paddingLeft: 14, margin: '4px 0', fontSize: 13, lineHeight: 1.6, color: 'var(--text)' }}>
                • {pt}
              </div>
            ))}
          </div>
        ))}

        <div className="info-box" style={{ marginTop: 12 }}>
          <strong>💳 {isNe ? 'शुल्क सारांश' : 'Fee Summary'}</strong>
          <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.8 }}>
            <div>🏗️ IOE Entrance: Rs. 2,500</div>
            <div>🎓 KU KUCAT: Rs. 2,000 (eSewa/Khalti)</div>
            <div>🩺 MECEE-BL: registration via entrance.meded.gov.np (multiple clusters)</div>
            <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>
              Govt MBBS ~NPR 15-20 lakh total • Private MBBS ~NPR 40-50 lakh total
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
