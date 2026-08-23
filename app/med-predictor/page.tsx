'use client'

import { useState } from 'react'
import Link from 'next/link'
import { medicalCutoffs, PROGRAMS, medRankBands } from '@/data/medical-cutoffs'
import { useLang } from '../components/ui'

export default function MedPredictor() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [rank, setRank] = useState('')
  const [program, setProgram] = useState<typeof PROGRAMS[number]>('MBBS')

  const r = parseInt(rank, 10)
  const valid = !isNaN(r) && r > 0

  const band = valid ? medRankBands.find(b => r >= b.min && r <= b.max) : null

  const filtered = medicalCutoffs.filter(c => c.program === program)
  const result = valid
    ? filtered.map(c => {
        const sch = c.cutoffs.scholarship !== null && r <= c.cutoffs.scholarship
        const pay = c.cutoffs.paying !== null && r <= c.cutoffs.paying
        const status = sch ? 'scholarship' : pay ? 'paying' : 'no'
        return { ...c, status }
      }).sort((a, b) => (a.cutoffs.paying ?? Infinity) - (b.cutoffs.paying ?? Infinity))
    : []

  const statusMeta: Record<'scholarship' | 'paying' | 'no', { en: string; ne: string; cls: string }> = {
    scholarship: { en: 'Scholarship', ne: 'स्कॉलरशिप', cls: 'tier-safe' },
    paying:      { en: 'Paying',      ne: 'Paying',      cls: 'tier-likely' },
    no:          { en: 'Not likely', ne: 'भेटिएन',      cls: 'tier-reach' },
  }

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn" aria-label="Home">←</Link>
        <span className="nav-title">🩺 {isNe ? 'Medical Predictor' : 'Medical Predictor'}</span>
        <div />
      </div>

      <div className="page-content">
        <div className="predictor-hero" style={{ background: 'linear-gradient(135deg, #064e3b, #059669)' }}>
          <div className="ph-title">🩺 {isNe ? 'तपाईंको MECEE rank ले कुन college पाउनुहुन्छ?' : 'Which medical college can your CEE rank get?'}</div>
          <div className="ph-sub">
            {isNe
              ? 'MECEE-BL (२०८२) को आफ्नो rank राख्नुहोस्। कम rank = राम्रो। Scholarship र Paying छुट्टै।'
              : 'Enter your MECEE-BL (2082) rank. Lower rank = better. Scholarship and paying seats are separate.'}
          </div>

          {/* Program selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            {PROGRAMS.map(p => (
              <button
                key={p}
                onClick={() => setProgram(p)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 20,
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: program === p ? 'var(--primary)' : 'rgba(255,255,255,0.15)',
                  color: program === p ? '#fff' : 'rgba(255,255,255,0.8)',
                  transition: 'all 0.15s',
                }}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="ph-row">
            <div className="score-input-wrap">
              <input
                type="number"
                placeholder={isNe ? 'जस्तै: 150' : 'e.g. 150'}
                value={rank}
                min={1}
                onChange={e => setRank(e.target.value)}
              />
              <span className="unit">{isNe ? 'rank' : 'rank'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <span className="tier-badge tier-safe">✅ {isNe ? 'स्कॉलरशिप (govt college)' : 'Scholarship (govt college)'}</span>
            <span className="tier-badge tier-likely">🎯 {isNe ? 'Paying (private)' : 'Paying (private)'}</span>
            <span className="tier-badge tier-reach">🔥 {isNe ? 'सीमाभन्दा बाहिर' : 'Out of reach'}</span>
          </div>
        </div>

        {valid && (
          <>
            <div className="card" style={{ padding: 14, marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ fontSize: 28 }}>📊</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>
                  {isNe ? 'तपाईंको स्थिति' : 'Your position'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {band ? band.label : r > 10000 ? (isNe ? 'List बाहिर' : 'Outside list') : '—'}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>{isNe ? 'तपाईंको rank' : 'Your rank'}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: band?.color ?? 'var(--primary)' }}>{r}</div>
              </div>
            </div>

            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)', marginBottom: 10 }}>
              {isNe
                ? `${program} मा — Rank ${r} मा ${result.filter(x => x.status !== 'no').length} वटा college`
                : `${program} — ${result.filter(x => x.status !== 'no').length} colleges at rank ${r}`}
            </div>

            {result.map((c, i) => (
              <div key={c.id} className="branch-result" style={{ opacity: c.status === 'no' ? 0.45 : 1 }}>
                <div className={`branch-rank ${c.status === 'no' ? 'rank-other' : c.status === 'scholarship' ? 'rank-1' : 'rank-2'}`}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span className="branch-name" style={{ fontSize: 14 }}>{c.college}</span>
                    {c.website && (
                      <a href={c.website} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 11, color: 'var(--primary)', textDecoration: 'none' }}
                        aria-label={`Visit ${c.college} website`}>🔗</a>
                    )}
                  </div>
                  <div className="branch-college">
                    {c.type} • {c.seats} {isNe ? 'सिट' : 'seats'} • {c.feeNote}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                    {isNe ? 'छुट्टै cutoff: ' : 'Separate cutoff: '}
                    {c.cutoffs.scholarship !== null && `Scholarship ≤${c.cutoffs.scholarship}`}
                    {c.cutoffs.scholarship !== null && c.cutoffs.paying !== null && ' | '}
                    {c.cutoffs.paying !== null && `Paying ≤${c.cutoffs.paying}`}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <div className="meter" style={{ flex: 1, maxWidth: 140 }}>
                      <div
                        className="meter-fill"
                        style={{
                          width: `${Math.max(8, Math.min(100, 100 - (c.cutoffs.paying ?? 3000) / 30))}%`,
                          background: c.status === 'scholarship' ? 'var(--success)' : c.status === 'paying' ? 'var(--gold)' : 'var(--muted)',
                        }}
                      />
                    </div>
                    <span className={`tier-badge ${statusMeta[c.status as 'scholarship' | 'paying' | 'no'].cls}`}>
                      {isNe ? statusMeta[c.status as 'scholarship' | 'paying' | 'no'].ne : statusMeta[c.status as 'scholarship' | 'paying' | 'no'].en}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>{isNe ? 'तपाईं' : 'You'}</div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: 'var(--primary)' }}>{r}</div>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="info-box" style={{ marginTop: 12 }}>
          <strong>⚠️ {isNe ? 'नोट:' : 'Note:'}</strong>{' '}
          {isNe
            ? 'Cutoff हरेक वर्ष फरक हुन्छ — यी 2082 को compiled data हुन्। स्कॉलरशिप = govt college मा top rank।'
            : 'Cutoffs shift yearly — these are compiled 2082 figures. Scholarship = top ranks at government colleges.'}
        </div>
      </div>
    </div>
  )
}
