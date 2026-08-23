'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cutoffs, type Cutoff } from '@/data/cutoffs'
import { useLang } from '../components/ui'

const CAMPUSES = ['Pulchowk', 'Thapathali', 'WRC', 'ERC', 'Chitwan'] as const

function progRow(a: Cutoff | undefined, b: Cutoff | undefined, isNe: boolean) {
  if (!a && !b) return null
  const name = a ? (isNe ? a.programNp : a.program) : (isNe ? b!.programNp : b!.program)
  const rA = a?.regular ?? null
  const rB = b?.regular ?? null
  const ffA = a?.fullFee ?? null
  const ffB = b?.fullFee ?? null
  const diffR = rA !== null && rB !== null ? rA - rB : null
  const diffFF = ffA !== null && ffB !== null ? ffA - ffB : null

  return (
    <tr key={name} style={{ borderBottom: '1px solid var(--border)' }}>
      <td className="table-sticky" style={{ padding: '8px 10px', fontSize: 13, color: 'var(--text)', fontWeight: 600, whiteSpace: 'nowrap' }}>{name}</td>
      <td style={{ padding: '8px 10px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: rA !== null ? 'var(--text)' : 'var(--muted)' }}>
        {rA !== null ? `R ${rA}` : '—'}
      </td>
      <td style={{ padding: '8px 10px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: rB !== null ? 'var(--text)' : 'var(--muted)' }}>
        {rB !== null ? `R ${rB}` : '—'}
      </td>
      <td style={{ padding: '8px 10px', textAlign: 'center', fontSize: 13 }}>
        {diffR !== null ? (
          <span style={{ color: diffR < 0 ? 'var(--success)' : diffR > 0 ? 'var(--danger)' : 'var(--muted)', fontWeight: 700, fontSize: 12 }}>
            {diffR === 0 ? '—' : (diffR < 0 ? `▲ ${Math.abs(diffR)} better` : `▼ ${diffR} worse`)}
          </span>
        ) : <span style={{ color: 'var(--muted)' }}>—</span>}
      </td>
      <td style={{ padding: '8px 10px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: ffA !== null ? 'var(--text)' : 'var(--muted)' }}>
        {ffA !== null ? `FF ${ffA}` : '—'}
      </td>
      <td style={{ padding: '8px 10px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: ffB !== null ? 'var(--text)' : 'var(--muted)' }}>
        {ffB !== null ? `FF ${ffB}` : '—'}
      </td>
      <td style={{ padding: '8px 10px', textAlign: 'center', fontSize: 13 }}>
        {diffFF !== null ? (
          <span style={{ color: diffFF < 0 ? 'var(--success)' : diffFF > 0 ? 'var(--danger)' : 'var(--muted)', fontWeight: 700, fontSize: 12 }}>
            {diffFF === 0 ? '—' : (diffFF < 0 ? `▲ ${Math.abs(diffFF)} better` : `▼ ${diffFF} worse`)}
          </span>
        ) : <span style={{ color: 'var(--muted)' }}>—</span>}
      </td>
    </tr>
  )
}

export default function Compare() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [left, setLeft] = useState<typeof CAMPUSES[number]>('Pulchowk')
  const [right, setRight] = useState<typeof CAMPUSES[number]>('Thapathali')

  const leftCutoffs = cutoffs.filter(c => c.campus === left).sort((a, b) => a.regular - b.regular)
  const rightCutoffs = cutoffs.filter(c => c.campus === right).sort((a, b) => a.regular - b.regular)

  // Align by program name
  const allProgs = [...new Set([...leftCutoffs.map(c => c.program), ...rightCutoffs.map(c => c.program)])].sort()

  const leftMap = Object.fromEntries(leftCutoffs.map(c => [c.program, c]))
  const rightMap = Object.fromEntries(rightCutoffs.map(c => [c.program, c]))

  const cardBg = (campus: string) => {
    const colors: Record<string, string> = {
      Pulchowk: '#e8f0fc', Thapathali: '#fce4ec', WRC: '#e8f5e9',
      ERC: '#fff3e0', Chitwan: '#f3e5f5',
    }
    return colors[campus] ?? 'var(--surface-2)'
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link href="/"><button className="back-btn">←</button></Link>
        <div style={{ flex: 1 }}>
          <div className="page-title">🏛️ {isNe ? 'Campus Compare' : 'Campus Compare'}</div>
          <div className="page-sub">{isNe ? 'IOE 2082 cutoffs side-by-side' : 'IOE 2082 cutoffs side-by-side'}</div>
        </div>
      </div>

      <div className="page-content">
        <div className="info-box" style={{ marginBottom: 16 }}>
          📊 {isNe
            ? 'दुई campus छान्नुहोस् — Regular र Full Fee cutoff तुलना हेर्नुहोस्।'
            : 'Pick 2 campuses to compare their Regular & Full Fee cutoffs side-by-side.'}
        </div>

        {/* Campus pickers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div>
            <div className="filter-label" style={{ marginBottom: 6 }}>{isNe ? 'Campus १' : 'Campus 1'}</div>
            <select
              value={left}
              onChange={e => setLeft(e.target.value as typeof CAMPUSES[number])}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid var(--border)', background: 'var(--card)', color: 'var(--text)', fontSize: 14, fontFamily: 'inherit', fontWeight: 700 }}
            >
              {CAMPUSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <div className="filter-label" style={{ marginBottom: 6 }}>{isNe ? 'Campus २' : 'Campus 2'}</div>
            <select
              value={right}
              onChange={e => setRight(e.target.value as typeof CAMPUSES[number])}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid var(--border)', background: 'var(--card)', color: 'var(--text)', fontSize: 14, fontFamily: 'inherit', fontWeight: 700 }}
            >
              {CAMPUSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 700 }}>▲ better = lower cutoff rank</span>
          <span style={{ fontSize: 11, color: 'var(--danger)', fontWeight: 700 }}>▼ worse = higher cutoff rank</span>
        </div>

        {/* Comparison table */}
        <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
            <thead>
              <tr style={{ background: 'var(--card)' }}>
                <th className="table-sticky" style={{ padding: '10px 10px', textAlign: 'left', fontSize: 12, color: 'var(--muted)', fontWeight: 700, borderBottom: '2px solid var(--border)' }}>Program</th>
                <th style={{ padding: '10px 10px', textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontWeight: 700, borderBottom: '2px solid var(--border)', background: cardBg(left) }}>{left} R</th>
                <th style={{ padding: '10px 10px', textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontWeight: 700, borderBottom: '2px solid var(--border)', background: cardBg(right) }}>{right} R</th>
                <th style={{ padding: '10px 10px', textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontWeight: 700, borderBottom: '2px solid var(--border)' }}>R diff</th>
                <th style={{ padding: '10px 10px', textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontWeight: 700, borderBottom: '2px solid var(--border)', background: cardBg(left) }}>{left} FF</th>
                <th style={{ padding: '10px 10px', textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontWeight: 700, borderBottom: '2px solid var(--border)', background: cardBg(right) }}>{right} FF</th>
                <th style={{ padding: '10px 10px', textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontWeight: 700, borderBottom: '2px solid var(--border)' }}>FF diff</th>
              </tr>
            </thead>
            <tbody>
              {allProgs.map(p => progRow(leftMap[p], rightMap[p], isNe))}
            </tbody>
          </table>
        </div>

        {left === right && (
          <div className="warn-box" style={{ marginTop: 12 }}>
            {isNe ? 'एउटै campus दुई पटक छानिएको छ — फरक campus छान्नुहोस्।' : 'Same campus selected twice — pick two different campuses.'}
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <Link href="/predictor">
            <button className="btn btn-outline" style={{ width: '100%' }}>
              🎯 {isNe ? 'Branch Predictor मा जानुहोस्' : 'Go to Branch Predictor'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
