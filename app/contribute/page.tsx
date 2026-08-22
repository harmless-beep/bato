'use client'

import Link from 'next/link'
import { useLang } from '../components/ui'

export default function Contribute() {
  const { lang } = useLang()
  const isNe = lang === 'ne'

  const ways = [
    { icon: '📝', title: 'Add Questions', titleNp: 'प्रश्न थप्नुहोस्', desc: 'Push real entrance questions to data/questions.ts — with correct answers and explanations.', descNp: 'data/questions.ts मा वास्तविक प्रवेश प्रश्नहरू थप्नुहोस्।' },
    { icon: '📖', title: 'Share Notes', titleNp: 'नोटहरू साझा', desc: 'Your formula sheets and mnemonics go into data/notes.ts — tagged by subject.', descNp: 'तपाईंको सूत्र र mnemonics data/notes.ts मा जान्छ।' },
    { icon: '📄', title: 'Upload Papers', titleNp: 'प्रश्नपत्र अपलोड', desc: 'Have a past paper PDF? Drop it in public/pdfs/ and link it in past-papers.', descNp: 'प्रश्नपत्र PDF छ? public/pdfs/ मा राख्नुहोस्।' },
    { icon: '🎯', title: 'Fix Cutoffs', titleNp: 'कटअफ सुधार', desc: 'See a stale cutoff rank? Update data/cutoffs.ts with the official source link.', descNp: 'पुरानो कटअफ देख्नुभयो? data/cutoffs.ts अपडेट गर्नुहोस्।' },
  ]

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn" aria-label="Home">←</Link>
        <span className="nav-title">🤝 {isNe ? 'योगदान' : 'Contribute'}</span>
        <div />
      </div>
      <div className="page-content">
        <div className="info-box" style={{ marginBottom: 16 }}>
          <strong>💡 {isNe ? 'बाटो सबैको हो' : 'Bato belongs to everyone'}</strong> —{' '}
          {isNe ? 'तपाईंको सानो योगदानले हजारौं aspirant लाई मद्दत गर्छ।' : 'Your small contribution helps thousands of aspirants.'}
        </div>

        {ways.map(w => (
          <div key={w.icon} className="card" style={{ marginBottom: 10, padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 26 }}>{w.icon}</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{isNe ? w.titleNp : w.title}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>{isNe ? w.descNp : w.desc}</div>
            </div>
          </div>
        ))}

        <div className="contribute-section" style={{ marginTop: 20 }}>
          <div className="contribute-icon">🚀</div>
          <div className="contribute-title">{isNe ? 'अहिले योगदान गर्नुहोस्' : 'Start Contributing'}</div>
          <div className="contribute-sub">{isNe ? 'GitHub मा repo फोर्क गरी PR पठाउनुहोस्' : 'Fork the repo on GitHub and open a PR'}</div>
          <div className="contribute-body">
            <a href="https://github.com/harmless-beep/bato" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              GitHub →
            </a>
            <Link href="/suggest" className="btn btn-gold" style={{ textDecoration: 'none', display: 'inline-block', marginLeft: 8 }}>
              💬 {isNe ? 'सुझाव दिनुहोस्' : 'Suggest an idea'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
