'use client'

import { useState } from 'react'
import Link from 'next/link'
import { medicalCutoffs, medRankBands } from '@/data/medical-cutoffs'
import { useLang } from '../components/ui'

export default function MedPredictor() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [rank, setRank] = useState('')

  const r = parseInt(rank, 10)
  const valid = !isNaN(r) && r > 0

  const band = valid ? medRankBands.find(b => r >= b.min && r <= b.max) : null

  const result = valid
    ? medicalCutoffs.map(c => {
        const sch = c.cutoffs.scholarship !== null && r <= c.cutoffs.scholarship
        const pay = c.cutoffs.paying !== null && r <= c.cutoffs.paying
        const status = sch ? 'scholarship' : pay ? 'paying' : 'no'
        return { ...c, status }
      })
    : []

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn" aria-label="Home">←</Link>
        <span className="nav-title">🩺 {isNe ? 'Medical Predictor' : 'Medical Predictor'}</span>
        <div />
      </div>

      <div className="page-content">
        <div className="info-box">
          📌 {isNe
            ? 'MECEE-BL (2082) को rank छिराउनुहोस् — कुन medical college पाउन सकिन्छ हेर्नुहोस्।'
            : 'Enter your MECEE-BL (2082) rank to see which medical colleges you can get.'}
        </div>

        <div className="card" style={{ padding: 20, marginBottom: 16 }}>
          <div className="filter-label" style={{ marginBottom: 8 }}>{isNe ? 'तपाईंको MECEE Rank' : 'Your MECEE Rank'}</div>
          <input
            type="number"
            min="1"
            className="input"
            placeholder={isNe ? 'जस्तै: 150' : 'e.g. 150'}
            value={rank}
            onChange={e => setRank(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {valid && (
            <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 800, color: 'var(--text)' }}>{isNe ? 'तपाईंको स्थिति: ' : 'Your position: '}</span>
              <span style={{ color: band?.color ?? 'var(--muted)', fontWeight: 700 }}>{band?.label ?? (r > 10000 ? (isNe ? 'List बाहिर' : 'Outside list') : '—')}</span>
            </div>
          )}
        </div>

        {valid && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)' }}>
              {isNe ? `Rank ${r} मा — ${result.filter(x => x.status !== 'no').length} वटा college` : `At rank ${r} — ${result.filter(x => x.status !== 'no').length} colleges`}
            </div>
            {result.map(c => (
              <div
                key={c.id}
                className="card"
                style={{
                  padding: 14,
                  border: c.status === 'scholarship' ? '1.5px solid #10b981' : c.status === 'paying' ? '1.5px solid #f59e0b' : '1px solid var(--border)',
                  opacity: c.status === 'no' ? 0.5 : 1,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 13.5, color: 'var(--text)' }}>{c.college}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>
                      {c.type} • {c.mbbsSeats} {isNe ? 'सिट' : 'seats'} • {c.feeNote}
                    </div>
                  </div>
                  <span
                    style={{
                      flexShrink: 0, fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 8,
                      background: c.status === 'scholarship' ? '#10b981' : c.status === 'paying' ? '#f59e0b' : 'var(--border)',
                      color: c.status === 'no' ? 'var(--muted)' : 'white',
                    }}
                  >
                    {c.status === 'scholarship' ? (isNe ? 'स्कॉलरशिप' : 'Scholarship') : c.status === 'paying' ? (isNe ? 'Paying' : 'Paying') : (isNe ? 'भेटिएन' : 'Not likely')}
                  </span>
                </div>
              </div>
            ))}
          </div>
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
