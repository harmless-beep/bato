'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '../components/ui'

interface BranchEntry {
  branch: string
  branchNp: string
  college: string
  collegeNp: string
  ioeCutoff: number
  seats: number
  color: string
}

const cutoffData: BranchEntry[] = [
  { branch: 'Computer Engineering', branchNp: 'कम्प्युटर इन्जिनियरिङ', college: 'IOE Pulchowk Campus', collegeNp: 'IOE पुल्चोक', ioeCutoff: 163, seats: 48, color: '#4f46e5' },
  { branch: 'Electronics & Communication', branchNp: 'इलेक्ट्रोनिक्स', college: 'IOE Pulchowk Campus', collegeNp: 'IOE पुल्चोक', ioeCutoff: 155, seats: 48, color: '#7c3aed' },
  { branch: 'Electrical Engineering', branchNp: 'इलेक्ट्रिकल इन्जिनियरिङ', college: 'IOE Pulchowk Campus', collegeNp: 'IOE पुल्चोक', ioeCutoff: 148, seats: 48, color: '#2563eb' },
  { branch: 'Mechanical Engineering', branchNp: 'मेकानिकल इन्जिनियरिङ', college: 'IOE Pulchowk Campus', collegeNp: 'IOE पुल्चोक', ioeCutoff: 140, seats: 48, color: '#0891b2' },
  { branch: 'Civil Engineering', branchNp: 'सिभिल इन्जिनियरिङ', college: 'IOE Pulchowk Campus', collegeNp: 'IOE पुल्चोक', ioeCutoff: 125, seats: 96, color: '#059669' },
  { branch: 'Computer Engineering', branchNp: 'कम्प्युटर इन्जिनियरिङ', college: 'Kathford College', collegeNp: 'काथफोर्ड कलेज', ioeCutoff: 115, seats: 48, color: '#4f46e5' },
  { branch: 'Electronics & Communication', branchNp: 'इलेक्ट्रोनिक्स', college: 'Kathford College', collegeNp: 'काथफोर्ड कलेज', ioeCutoff: 108, seats: 48, color: '#7c3aed' },
  { branch: 'Electrical Engineering', branchNp: 'इलेक्ट्रिकल', college: 'Himalaya College of Engineering', collegeNp: 'हिमालय कलेज', ioeCutoff: 105, seats: 48, color: '#2563eb' },
  { branch: 'Computer Engineering', branchNp: 'कम्प्युटर इन्जिनियरिङ', college: 'PCPS College', collegeNp: 'PCPS कलेज', ioeCutoff: 100, seats: 48, color: '#4f46e5' },
  { branch: 'Civil Engineering', branchNp: 'सिभिल इन्जिनियरिङ', college: 'Nepal Engineering College', collegeNp: 'नेपाल इन्जिनियरिङ कलेज', ioeCutoff: 95, seats: 48, color: '#059669' },
  { branch: 'Mechanical Engineering', branchNp: 'मेकानिकल', college: 'Nepal Engineering College', collegeNp: 'नेपाल इन्जिनियरिङ कलेज', ioeCutoff: 92, seats: 48, color: '#0891b2' },
  { branch: 'Electrical Engineering', branchNp: 'इलेक्ट्रिकल', college: 'Cosmos College', collegeNp: 'कस्मोस कलेज', ioeCutoff: 88, seats: 48, color: '#2563eb' },
  { branch: 'Computer Engineering', branchNp: 'कम्प्युटर इन्जिनियरिङ', college: 'Nobel College', collegeNp: 'नोबेल कलेज', ioeCutoff: 85, seats: 48, color: '#4f46e5' },
  { branch: 'Civil Engineering', branchNp: 'सिभिल इन्जिनियरिङ', college: 'Janakpur Engineering College', collegeNp: 'जनकपुर इन्जिनियरिङ कलेज', ioeCutoff: 72, seats: 48, color: '#059669' },
  { branch: 'Computer Engineering', branchNp: 'कम्प्युटर इन्जिनियरिङ', college: 'Sagarmatha College', collegeNp: 'सगरमाथा कलेज', ioeCutoff: 70, seats: 48, color: '#4f46e5' },
]

type Tier = 'safe' | 'likely' | 'reach'

const T: Record<Tier, { cls: string; en: string; ne: string }> = {
  safe:   { cls: 'tier-safe',   en: '✅ Safe',   ne: '✅ पक्का' },
  likely: { cls: 'tier-likely', en: '🎯 Likely', ne: '🎯 सम्भव' },
  reach:  { cls: 'tier-reach',  en: '🔥 Reach', ne: '🔥 चुनौती' },
}

export default function Predictor() {
  const { t, lang } = useLang()
  const isNe = lang === 'ne'
  const [score, setScore] = useState('')
  const [result, setResult] = useState<{ entry: BranchEntry; tier: Tier; margin: number }[] | null>(null)

  const handlePredict = () => {
    const s = parseInt(score)
    if (isNaN(s) || s < 0 || s > 200) return
    const scored = cutoffData
      .map(entry => {
        const margin = s - entry.ioeCutoff
        const tier: Tier = margin >= 5 ? 'safe' : margin >= 0 ? 'likely' : 'reach'
        return { entry, tier, margin }
      })
      .filter(r => r.margin >= -5)
      .sort((a, b) => b.entry.ioeCutoff - a.entry.ioeCutoff)
    setResult(scored)
  }

  const getRank = (i: number) => (i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other')

  return (
    <div className="page">
      <div className="page-header">
        <Link href="/"><button className="back-btn">←</button></Link>
        <div style={{ flex: 1 }}>
          <div className="page-title">🎯 {isNe ? 'Branch Predictor' : 'Branch Predictor'}</div>
          <div className="page-sub">🏛️ IOE {isNe ? 'कटअफ' : 'Cutoffs'} • 2079–2080</div>
        </div>
      </div>

      <div className="page-content">
        {/* Input hero */}
        <div className="predictor-hero">
          <div className="ph-title">🎯 {isNe ? 'तपाईंको score ले कुन branch पाउनुहुन्छ?' : 'Which branch can you get?'}</div>
          <div className="ph-sub">
            {isNe
              ? 'IOE entrance exam मा तपाईंले पाउने अनुमानित score (200 मध्ये) राख्नुहोस्। Historical cutoffs को आधारमा तुरुन्तै अनुमान हेर्नुहोस्।'
              : 'Enter your expected IOE entrance score (out of 200). Get instant predictions based on historical cutoffs.'}
          </div>
          <div className="ph-row">
            <div className="score-input-wrap">
              <input
                type="number"
                placeholder={isNe ? 'जस्तै: 140' : 'e.g. 140'}
                value={score}
                min={0}
                max={200}
                onChange={e => setScore(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePredict()}
              />
              <span className="unit">/ 200</span>
            </div>
            <button className="btn btn-gold" onClick={handlePredict}>
              {isNe ? 'Predict गर्नुहोस्' : 'Predict My Branch'}
            </button>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
            <span className="tier-badge tier-safe">{isNe ? '✅ पक्का (cutoff +5 माथि)' : '✅ Safe (+5 above)'}</span>
            <span className="tier-badge tier-likely">{isNe ? '🎯 सम्भव (cutoff वरपर)' : '🎯 Likely (around cutoff)'}</span>
            <span className="tier-badge tier-reach">{isNe ? '🔥 चुनौती (cutoff -5 सम्म)' : '🔥 Reach (up to -5)'}</span>
          </div>
        </div>

        {/* Results */}
        {result && (
          <>
            <div className="info-box">
              <strong>{isNe ? `Score ${score} को आधारमा:` : `Based on a score of ${score}:`}</strong>{' '}
              {isNe
                ? `${result.length} वटा branches तपाईंको दायरामा छन्। यो अनुमान मात्र हो — actual cutoffs वर्षैसाथ फेरिन्छन्।`
                : `${result.length} branches fall in your range. This is an estimate — actual cutoffs change yearly.`}
            </div>

            {result.length === 0 ? (
              <div className="warn-box">
                😞 {isNe
                  ? 'यो score ले हालका कटअफहरू भन्दा कम छ। तल सबैभन्दा सजिलो branches हेर्नुहोस्।'
                  : 'This score is below current cutoffs. Check the closest options below.'}
              </div>
            ) : (
              result.map((r, i) => (
                <div key={`${r.entry.branch}-${r.entry.college}`} className="branch-result">
                  <div className={`branch-rank ${getRank(i)}`}>{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="branch-name" style={{ color: r.entry.color }}>
                      {isNe ? r.entry.branchNp : r.entry.branch}
                    </div>
                    <div className="branch-college">
                      {isNe ? r.entry.collegeNp : r.entry.college} • {r.entry.seats} seats
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <div className="meter" style={{ flex: 1, maxWidth: 140 }}>
                        <div
                          className="meter-fill"
                          style={{
                            width: `${Math.min(100, Math.max(8, (r.entry.ioeCutoff / 200) * 100))}%`,
                            background: r.tier === 'safe' ? 'var(--success)' : r.tier === 'likely' ? 'var(--primary)' : 'var(--gold)',
                          }}
                        />
                      </div>
                      <span className={`tier-badge ${T[r.tier].cls}`}>{isNe ? T[r.tier].ne : T[r.tier].en}</span>
                    </div>
                  </div>
                  <div className="branch-cutoff">
                    <div className="cutoff-num">{r.entry.ioeCutoff}</div>
                    <div className="cutoff-label">{isNe ? 'cutoff' : 'cutoff'}</div>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* Reference table */}
        {!result && (
          <>
            <hr className="divider"/>
            <div className="section-header">
              <div className="section-title">📋 {isNe ? 'कटअफ सन्दर्भ' : 'Cutoff Reference'}</div>
              <div className="section-sub">{isNe ? '2079–2080 historical cutoffs (200 मध्ये)' : '2079–2080 historical cutoffs (out of 200)'}</div>
            </div>
            {cutoffData.slice(0, 8).map((b, i) => (
              <div key={`ref-${b.branch}-${b.college}`} className="branch-result" style={{ opacity: 0.85 }}>
                <div className={`branch-rank ${getRank(i)}`}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div className="branch-name" style={{ color: b.color, fontSize: 14 }}>{isNe ? b.branchNp : b.branch}</div>
                  <div className="branch-college">{isNe ? b.collegeNp : b.college}</div>
                </div>
                <div className="branch-cutoff">
                  <div className="cutoff-num" style={{ fontSize: 16 }}>{b.ioeCutoff}</div>
                  <div className="cutoff-label">cutoff</div>
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
              ↑ {isNe ? 'शीर्ष 8 देखाइएको • माथि score राखेर आफ्नो अनुमान हेर्नुहोस्' : 'Showing top 8 • Enter your score above for predictions'}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
