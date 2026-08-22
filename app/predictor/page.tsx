'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '../components/ui'
import { cutoffs } from '@/data/cutoffs'

type FeeType = 'regular' | 'fullFee'

type Tier = 'safe' | 'likely' | 'reach'

const T: Record<Tier, { cls: string; en: string; ne: string }> = {
  safe:   { cls: 'tier-safe',   en: '✅ Safe',   ne: '✅ पक्का' },
  likely: { cls: 'tier-likely', en: '🎯 Likely', ne: '🎯 सम्भव' },
  reach:  { cls: 'tier-reach',  en: '🔥 Reach', ne: '🔥 चुनौती' },
}

const campuses = ['All', 'Pulchowk', 'Thapathali', 'WRC', 'ERC', 'Chitwan'] as const

function tierFor(margin: number): Tier {
  // margin = cutoffRank - yourRank; positive means you're better (lower rank)
  if (margin >= 80) return 'safe'
  if (margin >= 0) return 'likely'
  if (margin >= -120) return 'reach'
  return 'none'
}

export default function Predictor() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [rank, setRank] = useState('')
  const [fee, setFee] = useState<FeeType>('regular')
  const [campus, setCampus] = useState<typeof campuses[number]>('All')
  const [result, setResult] = useState<{ c: typeof cutoffs[number]; tier: Tier; margin: number }[] | null>(null)

  const predict = () => {
    const r = parseInt(rank)
    if (isNaN(r) || r < 1 || r > 9000) return
    const rows = cutoffs
      .filter(c => campus === 'All' || c.campus === campus)
      .map(c => {
        const cutoff = fee === 'regular' ? c.regular : c.fullFee
        const margin = cutoff - r
        return { c, tier: tierFor(margin), margin }
      })
      .filter(r => r.tier !== 'none')
      .sort((a, b) => b.margin - a.margin)
    setResult(rows)
  }

  const getRank = (i: number) => (i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other')

  return (
    <div className="page">
      <div className="page-header">
        <Link href="/"><button className="back-btn">←</button></Link>
        <div style={{ flex: 1 }}>
          <div className="page-title">🎯 {isNe ? 'Branch Predictor' : 'Branch Predictor'}</div>
          <div className="page-sub">🏛️ IOE • 2082 cutoffs</div>
        </div>
      </div>

      <div className="page-content">
        <div className="predictor-hero">
          <div className="ph-title">🎯 {isNe ? 'आफ्नो rank ले कुन campus/branch पाउनुहुन्छ?' : 'Which campus & branch can your rank get?'}</div>
          <div className="ph-sub">
            {isNe
              ? 'IOE entrance को आफ्नो rank (२०८२ cutoff अनुसार) राख्नुहोस्। कम rank = राम्रो। Regular र Full Fee छुट्टै हुन्छन्।'
              : 'Enter your IOE entrance rank (lower rank = better). Regular and Full Fee seats are separate.'}
          </div>

          <div className="ph-row">
            <div className="score-input-wrap">
              <input
                type="number"
                placeholder={isNe ? 'जस्तै: 350' : 'e.g. 350'}
                value={rank}
                min={1}
                max={9000}
                onChange={e => setRank(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && predict()}
              />
              <span className="unit">{isNe ? 'rank' : 'rank'}</span>
            </div>
            <button className="btn btn-gold" onClick={predict}>{isNe ? 'Predict गर्नुहोस्' : 'Predict'}</button>
          </div>

          <div className="filter-grid">
            <div>
              <div className="filter-label">{isNe ? 'Fee type' : 'Fee type'}</div>
              <div className="chip-row">
                <button className={`chip ${fee === 'regular' ? 'active' : ''}`} onClick={() => setFee('regular')}>{isNe ? 'Regular (सस्तो)' : 'Regular'}</button>
                <button className={`chip ${fee === 'fullFee' ? 'active' : ''}`} onClick={() => setFee('fullFee')}>{isNe ? 'Full Fee (महँगो)' : 'Full Fee'}</button>
              </div>
            </div>
            <div>
              <div className="filter-label">{isNe ? 'Campus' : 'Campus'}</div>
              <div className="chip-row">
                {campuses.map(c => (
                  <button key={c} className={`chip ${campus === c ? 'active' : ''}`} onClick={() => setCampus(c)}>{c === 'All' ? (isNe ? 'सबै' : 'All') : c}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <span className="tier-badge tier-safe">{isNe ? '✅ पक्का (80+ rank फरक)' : '✅ Safe (80+ margin)'}</span>
            <span className="tier-badge tier-likely">{isNe ? '🎯 सम्भव (cutoff भन्दा माथि)' : '🎯 Likely (above cutoff)'}</span>
            <span className="tier-badge tier-reach">{isNe ? '🔥 चुनौती (120 सम्म तल)' : '🔥 Reach (up to 120 below)'}</span>
          </div>
        </div>

        {result && (
          <>
            <div className="info-box">
              <strong>{isNe ? `Rank ${rank} (${fee === 'regular' ? 'Regular' : 'Full Fee'}${campus !== 'All' ? `, ${campus}` : ''}) को आधारमा:` : `Rank ${rank} (${fee}${campus !== 'All' ? `, ${campus}` : ''}):`}</strong>{' '}
              {isNe ? `${result.length} वटा options तपाईंको दायरामा छन्।` : `${result.length} options fall in your range.`}
            </div>
            {result.length === 0 ? (
              <div className="warn-box">😞 {isNe ? 'यो rank ले हालका cutoff भन्दा धेरै तल छ।' : 'This rank is below current cutoffs.'}</div>
            ) : (
              result.map((r, i) => (
                <div key={`${r.c.campus}-${r.c.program}`} className="branch-result">
                  <div className={`branch-rank ${getRank(i)}`}>{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="branch-name" style={{ color: r.c.color }}>{isNe ? r.c.programNp : r.c.program}</div>
                    <div className="branch-college">{isNe ? r.c.campusNp : r.c.campus} • {isNe ? 'cutoff rank' : 'cutoff'} {fee === 'regular' ? r.c.regular : r.c.fullFee}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <div className="meter" style={{ flex: 1, maxWidth: 140 }}>
                        <div className="meter-fill" style={{ width: `${Math.max(8, 100 - (r.c.regular / 90))}%`, background: r.tier === 'safe' ? 'var(--success)' : r.tier === 'likely' ? 'var(--primary)' : 'var(--gold)' }} />
                      </div>
                      <span className={`tier-badge ${T[r.tier].cls}`}>{isNe ? T[r.tier].ne : T[r.tier].en}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {!result && (
          <>
            <hr className="divider" />
            <div className="section-header">
              <div className="section-title">📋 {isNe ? '२०८२ cutoff reference' : '2082 Cutoff Reference'}</div>
              <div className="section-sub">{isNe ? 'सबै ५ IOE campus • Regular cutoff ranks' : 'All 5 IOE campuses • Regular cutoff ranks'}</div>
            </div>
            {cutoffs.filter(c => c.campus === 'Pulchowk').map((b, i) => (
              <div key={`ref-${b.program}`} className="branch-result" style={{ opacity: 0.9 }}>
                <div className={`branch-rank ${getRank(i)}`}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div className="branch-name" style={{ color: b.color, fontSize: 14 }}>{isNe ? b.programNp : b.program}</div>
                  <div className="branch-college">{isNe ? 'पुल्चोक' : 'Pulchowk'} • R {b.regular} / FF {b.fullFee}</div>
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
              ↑ {isNe ? 'पुल्चोक मात्र • माथि rank राखेर सबै campus हेर्नुहोस्' : 'Pulchowk shown • enter rank above for all campuses'}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
