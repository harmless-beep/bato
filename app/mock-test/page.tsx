'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { questions, type Question } from '@/data/questions'
import { useLang } from '../components/ui'
import Molecule from '../components/molecule'

type Phase = 'select' | 'instructions' | 'test' | 'result'

interface ExamConfig {
  id: string
  name: string
  nameNp: string
  icon: string
  durationMin: number
  negMark: number
  adaptive?: boolean // KU-style: question value scales with streak (1→5)
  sections: { subject: string; count: number; label: string; labelNp: string }[]
  desc: string
  descNp: string
}

const EXAM_CONFIGS: ExamConfig[] = [
  {
    id: 'ioe',
    name: 'IOE Entrance',
    nameNp: 'IOE प्रवेश परीक्षा',
    icon: '🏗️',
    durationMin: 120,
    negMark: 0.1, // 10% of a 1-mark question (5% in recent pattern updates)
    sections: [
      { subject: 'math', count: 40, label: 'Mathematics', labelNp: 'गणित' },
      { subject: 'physics', count: 30, label: 'Physics', labelNp: 'भौतिकशास्त्र' },
      { subject: 'chemistry', count: 30, label: 'Chemistry', labelNp: 'रसायनशास्त्र' },
    ],
    desc: '100 MCQs • 2 hours • -0.1 per wrong (10%)',
    descNp: '१०० प्रश्न • २ घण्टा • गलतमा -०.१ (१०%)',
  },
  {
    id: 'ku',
    name: 'KU KUCAT',
    nameNp: 'KU KUCAT',
    icon: '🎓',
    durationMin: 120,
    negMark: 0,
    adaptive: true, // marks scale with difficulty: 1→2→3→4→5 on correct streaks
    sections: [
      { subject: 'physics', count: 40, label: 'Physics', labelNp: 'भौतिकशास्त्र' },
      { subject: 'chemistry', count: 40, label: 'Chemistry', labelNp: 'रसायनशास्त्र' },
      { subject: 'math', count: 40, label: 'Mathematics', labelNp: 'गणित' },
    ],
    desc: '120 MCQs • 2 hours • adaptive marks (1-5 per Q)',
    descNp: '१२० प्रश्न • २ घण्टा • adaptive अंक (१-५ प्रति प्रश्न)',
  },
  {
    id: 'cee',
    name: 'CEE (MECEE-BL)',
    nameNp: 'CEE (MECEE-BL)',
    icon: '🩺',
    durationMin: 180,
    negMark: 0.25,
    sections: [
      { subject: 'physics', count: 50, label: 'Physics', labelNp: 'भौतिकशास्त्र' },
      { subject: 'chemistry', count: 50, label: 'Chemistry', labelNp: 'रसायनशास्त्र' },
      { subject: 'biology', count: 100, label: 'Biology', labelNp: 'जीवविज्ञान' },
    ],
    desc: '200 MCQs • 3 hours • -0.25 per wrong',
    descNp: '२०० प्रश्न • ३ घण्टा • गलतमा -०.२५',
  },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MockTest() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const L = (en: string, ne: string) => (isNe ? ne : en)

  const [phase, setPhase] = useState<Phase>('select')
  const [config, setConfig] = useState<ExamConfig | null>(null)
  const [session, setSession] = useState<Question[]>([])
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [marked, setMarked] = useState<Set<number>>(new Set())
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [result, setResult] = useState<{ score: number; maxScore: number; correct: number; wrong: number; skipped: number } | null>(null)

  const bySubject = useMemo(() => {
    const m = new Map<string, Question[]>()
    for (const q of questions) {
      if (!m.has(q.subject)) m.set(q.subject, [])
      m.get(q.subject)!.push(q)
    }
    return m
  }, [])

  const buildSession = useCallback((cfg: ExamConfig): Question[] => {
    // Fresh random per start — every click gives a different order.
    const rng = () => Math.floor(Math.random() * 1e9)
    const out: Question[] = []
    for (const sec of cfg.sections) {
      const pool = bySubject.get(sec.subject) ?? []
      if (pool.length >= sec.count) {
        out.push(...shuffle(pool).slice(0, sec.count))
      } else {
        // Recycle with a per-start offset so repeats differ between attempts
        const offset = rng() % pool.length
        const cycled: Question[] = []
        for (let i = 0; i < sec.count; i++) {
          cycled.push(pool[(offset + i) % pool.length])
        }
        out.push(...shuffle(cycled))
      }
    }
    return out // sections stay grouped, like the real exam paper
  }, [bySubject])

  const startTest = (cfg: ExamConfig) => {
    setConfig(cfg)
    setSession(buildSession(cfg))
    setAnswers(new Array(cfg.sections.reduce((s, x) => s + x.count, 0)).fill(null))
    setMarked(new Set())
    setCurrent(0)
    setTimeLeft(cfg.durationMin * 60)
    setResult(null)
    setPhase('instructions')
  }

  // Timer
  useEffect(() => {
    if (phase !== 'test') return
    const t = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 1) { clearInterval(t); submitTest(); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [phase])

  // Adaptive value (KU): question i worth = 1 + correct streak before it, capped at 5.
  // IOE/CEE (non-adaptive): every question worth 1.
  const valueOf = useCallback((i: number): number => {
    if (!config?.adaptive) return 1
    if (i === 0) return 1
    let streak = 0
    for (let j = i - 1; j >= 0; j--) {
      if (answers[j] !== null && answers[j] === session[j]?.correct) streak++
      else break
    }
    return Math.min(1 + streak, 5)
  }, [config, answers, session])

  const submitTest = useCallback(() => {
    if (!config) return
    let correct = 0, wrong = 0, skipped = 0, score = 0, maxScore = 0
    session.forEach((q, i) => {
      const a = answers[i]
      const v = valueOf(i)
      maxScore += v
      if (a === null) skipped++
      else if (a === q.correct) { correct++; score += v }
      else wrong++
    })
    if (!config.adaptive) score = Math.max(0, correct - wrong * config.negMark)
    setResult({ score, maxScore, correct, wrong, skipped })
    setPhase('result')
    // save stats
    try {
      const prev = Number(localStorage.getItem('bato-questions') ?? 0)
      localStorage.setItem('bato-questions', String(prev + session.length))
      const acc = session.length ? Math.round((correct / (correct + wrong || 1)) * 100) : 0
      localStorage.setItem('bato-accuracy', String(Math.max(Number(localStorage.getItem('bato-accuracy') ?? 0), acc)))
      localStorage.setItem('bato-streak', String(Number(localStorage.getItem('bato-streak') ?? 0) + 1))
    } catch {}
  }, [config, session, answers, valueOf])

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const totalQ = config ? config.sections.reduce((s, x) => s + x.count, 0) : 0
  const answeredCount = answers.filter(a => a !== null).length

  // ── Phase: Select ──────────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div className="page">
        <div className="topbar">
          <Link href="/" className="back-btn" aria-label="Home">←</Link>
          <span className="nav-title">🖥️ {L('CBT Simulator', 'CBT सिम्युलेटर')}</span>
          <div />
        </div>
        <div className="page-content">
          <div className="info-box">
            📌 <strong>{L('Exam-day CBT environment', 'परीक्षाको दिनको CBT वातावरण')}</strong> —{' '}
            {L('Real question counts, real timers, real negative marking. Pick your exam.', 'वास्तविक प्रश्न संख्या, वास्तविक समय, वास्तविक negative marking। आफ्नो परीक्षा छान्नुहोस्।')}
          </div>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {EXAM_CONFIGS.map(cfg => (
              <button
                key={cfg.id}
                onClick={() => startTest(cfg)}
                className="card"
                style={{
                  padding: 20, textAlign: 'left', cursor: 'pointer', border: '1.5px solid var(--border)',
                  fontFamily: 'inherit', transition: 'border-color 0.2s, transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ fontSize: 34, marginBottom: 8 }}>{cfg.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>{L(cfg.name, cfg.nameNp)}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, fontWeight: 600 }}>{L(cfg.desc, cfg.descNp)}</div>
                <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {cfg.sections.map(s => (
                    <span key={s.subject} style={{ fontSize: 10, fontWeight: 700, background: 'var(--primary-soft, #eef2ff)', color: 'var(--primary)', borderRadius: 6, padding: '2px 7px' }}>
                      {L(s.label, s.labelNp)} {s.count}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Phase: Instructions ────────────────────────────────────────
  if (phase === 'instructions' && config) {
    return (
      <div className="page">
        <div className="topbar">
          <Link href="/" className="back-btn" aria-label="Home">←</Link>
          <span className="nav-title">{config.icon} {L(config.name, config.nameNp)}</span>
          <div />
        </div>
        <div className="page-content">
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 12 }}>
              {L('Exam Instructions', 'परीक्षा निर्देशन')}
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.9, color: 'var(--text)' }}>
              <div>📝 {L('Total questions', 'जम्मा प्रश्न')}: <strong>{totalQ}</strong></div>
              <div>⏱️ {L('Duration', 'अवधि')}: <strong>{config.durationMin} {L('minutes', 'मिनेट')}</strong></div>
              {config.adaptive ? (
                <>
                  <div>⭐ {L('Adaptive scoring', 'Adaptive अंक')}: <strong>{L('correct streak → +1 mark, max 5/Q; wrong → back to 1', 'सही streak → +१ अंक, अधिकतम ५/प्रश्न; गलत → १ मा फर्कन्छ')}</strong></div>
                  <div>➖ {L('No negative marking', 'गलतमा कटौती छैन')}</div>
                </>
              ) : (
                <div>➖ {L('Negative marking', 'गलत उत्तरमा कटौती')}: <strong>-{config.negMark} {L('per wrong (10% of 1-mark question)', 'प्रति गलत (१ अंकको १०%)')}</strong></div>
              )}
              <div style={{ marginTop: 8, borderTop: '1px solid var(--border)', paddingTop: 8 }}>
                <strong>{L('How to navigate:', 'कसरी चलाउने:')}</strong>
              </div>
              <div>• {L('Use Prev/Next buttons or the question palette to jump.', 'Prev/Next बटन वा प्रश्न प्यालेटबाट जानुहोस्।')}</div>
              <div>• 🏳️ {L('Mark-for-review flags a question for later.', 'Mark-for-review ले प्रश्नलाई पछि हेर्न चिन्ह लगाउँछ।')}</div>
              <div>• {L('Timer auto-submits when time runs out.', 'समय सकिएपछि आफै submit हुन्छ।')}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setPhase('select')}>
                {L('← Back', '← फिर्ता')}
              </button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setPhase('test')}>
                {L('🚀 Start Test', '🚀 परीक्षा सुरु')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Phase: Test ────────────────────────────────────────────────
  if (phase === 'test' && config) {
    const q = session[current]
    const subjLabel = (s: string) => {
      const map: Record<string, [string, string]> = {
        math: ['📐 Mathematics', '📐 गणित'],
        physics: ['⚡ Physics', '⚡ भौतिकशास्त्र'],
        chemistry: ['🧪 Chemistry', '🧪 रसायनशास्त्र'],
        biology: ['🧬 Biology', '🧬 जीवविज्ञान'],
      }
      return map[s] ?? [s, s]
    }
    const [subjEn, subjNe] = subjLabel(q.subject)
    const showSection = current === 0 || session[current - 1]?.subject !== q.subject
    return (
      <div className="cbt-wrap">
        {/* Top bar: timer + progress */}
        <div className="cbt-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{config.icon}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {L(config.name, config.nameNp)}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>
                {current + 1} / {totalQ}
              </div>
            </div>
          </div>
          <div className={`cbt-timer ${timeLeft < 300 ? 'warning' : ''}`}>
            ⏱ {fmtTime(timeLeft)}
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => { if (confirm(L('Submit test?', 'परीक्षा submit गर्ने?'))) submitTest() }}>
            {L('Submit', 'Submit')}
          </button>
        </div>

        <div className="cbt-body">
          {/* Question */}
          <div className="cbt-question card" style={{ padding: 20 }}>
            {showSection && (
              <div className="cbt-section-banner">
                {subjEn} • {L('Section', 'सेक्सन')}
              </div>
            )}
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, marginBottom: 8 }}>
              📍 {q.topic}
              {config.adaptive && (
                <span style={{ marginLeft: 8, color: 'var(--primary)', fontWeight: 800 }}>⭐ {valueOf(current)} {L('mark(s)', 'अंक')}</span>
              )}
              {marked.has(current) && <span style={{ marginLeft: 8, color: '#f59e0b' }}>🏳️ {L('Marked', 'चिन्हित')}</span>}
            </div>
            <div style={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.6, color: 'var(--text)', marginBottom: 16 }}>
              {current + 1}. {q.text}
            </div>
            {q.mol && <Molecule name={q.mol} />}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => {
                    setAnswers(prev => { const n = [...prev]; n[current] = oi; return n })
                  }}
                  className={`cbt-option ${answers[current] === oi ? 'selected' : ''}`}
                >
                  <span className="cbt-opt-letter">{String.fromCharCode(65 + oi)}</span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button className="btn btn-outline btn-sm" disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>
                ← {L('Prev', 'अघिल्लो')}
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setMarked(prev => { const n = new Set(prev); n.has(current) ? n.delete(current) : n.add(current); return n })}
              >
                🏳️ {L('Mark', 'चिन्ह')}
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => { setAnswers(prev => { const n = [...prev]; n[current] = null; return n }); setMarked(prev => { const n = new Set(prev); n.delete(current); return n }) }}>
                {L('Clear', 'मेटाउनुहोस्')}
              </button>
              <button className="btn btn-primary btn-sm" disabled={current === totalQ - 1} onClick={() => setCurrent(c => c + 1)} style={{ marginLeft: 'auto' }}>
                {L('Next', 'अर्को')} →
              </button>
            </div>
          </div>

          {/* Palette */}
          <div className="cbt-palette card" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>
              {L('Question Palette', 'प्रश्न प्यालेट')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 260, overflowY: 'auto' }}>
              {session.map((_, i) => {
                const ans = answers[i] !== null
                const isMarked = marked.has(i)
                return (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: 32, height: 32, borderRadius: 8, border: current === i ? '2px solid var(--primary)' : '1px solid var(--border)',
                      fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                      background: isMarked ? '#f59e0b' : ans ? 'var(--primary)' : 'var(--bg)',
                      color: ans || isMarked ? 'white' : 'var(--text)',
                    }}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
            <div style={{ marginTop: 12, fontSize: 10.5, color: 'var(--muted)', lineHeight: 1.7 }}>
              <div><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--primary)', borderRadius: 3, marginRight: 5 }} /> {L('Answered', 'उत्तर दिइएको')} ({answeredCount})</div>
              <div><span style={{ display: 'inline-block', width: 10, height: 10, background: '#f59e0b', borderRadius: 3, marginRight: 5 }} /> {L('Marked', 'चिन्हित')} ({marked.size})</div>
              <div><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 3, marginRight: 5 }} /> {L('Unanswered', 'उत्तर नदिइएको')} ({totalQ - answeredCount})</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Phase: Result ──────────────────────────────────────────────
  if (phase === 'result' && config && result) {
    const total = session.length
    const pct = Math.round((result.score / result.maxScore) * 100)
    return (
      <div className="page">
        <div className="topbar">
          <Link href="/" className="back-btn" aria-label="Home">←</Link>
          <span className="nav-title">📊 {L('Result', 'नतिजा')}</span>
          <div />
        </div>
        <div className="page-content">
          <div className="card" style={{ padding: 24, textAlign: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 40, marginBottom: 6 }}>{pct >= 60 ? '🎉' : pct >= 40 ? '💪' : '📚'}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 700 }}>{L(config.name, config.nameNp)}</div>
            <div style={{ fontSize: 42, fontWeight: 900, color: 'var(--primary)', margin: '6px 0' }}>
              {result.score.toFixed(config.adaptive ? 0 : 1)}<span style={{ fontSize: 18, color: 'var(--muted)' }}> / {result.maxScore.toFixed(config.adaptive ? 0 : 1)}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {config.adaptive
                ? L('Adaptive scoring: marks scale with correct streaks (max 5/Q)', 'Adaptive अंक: सही streak सँग अंक बढ्छ (अधिकतम ५/प्रश्न)')
                : L('Negative marking applied', 'गलत उत्तरमा कटौती लागू') + `: -${config.negMark}/${L('wrong', 'गलत')}`}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
            <div className="card" style={{ padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#10b981' }}>{result.correct}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>✓ {L('Correct', 'सही')}</div>
            </div>
            <div className="card" style={{ padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#ef4444' }}>{result.wrong}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>✗ {L('Wrong', 'गलत')}</div>
            </div>
            <div className="card" style={{ padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--muted)' }}>{result.skipped}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>— {L('Skipped', 'छोडिएको')}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setPhase('select')}>
              🏠 {L('Exams', 'परीक्षाहरू')}
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => config && startTest(config)}>
              🔄 {L('Retry', 'फेरि')}
            </button>
          </div>

          <div className="info-box">
            <strong>📖 {L('Answers Review', 'उत्तर समीक्षा')}</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {session.map((q, i) => {
              const a = answers[i]
              const isRight = a === q.correct
              return (
                <div key={i} className="card" style={{ padding: 14, border: isRight ? '1px solid #10b981' : a === null ? '1px solid var(--border)' : '1px solid #ef4444' }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700, marginBottom: 4 }}>
                    Q{i + 1} • {q.topic} • {isRight ? '✓' : a === null ? '—' : '✗'}
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{q.text}</div>
                  {q.mol && <Molecule name={q.mol} />}
                  {a !== null && (
                    <div style={{ fontSize: 12.5, marginBottom: 4 }}>
                      <span style={{ color: 'var(--muted)' }}>{L('Your answer', 'तपाईंको उत्तर')}: </span>
                      <span style={{ color: isRight ? '#10b981' : '#ef4444', fontWeight: 700 }}>{String.fromCharCode(65 + a)}. {q.options[a]}</span>
                    </div>
                  )}
                  <div style={{ fontSize: 12.5 }}>
                    <span style={{ color: 'var(--muted)' }}>{L('Correct', 'सही')}: </span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>{String.fromCharCode(65 + q.correct)}. {q.options[q.correct]}</span>
                  </div>
                  {q.explanation && (
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6, lineHeight: 1.6 }}>
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return null
}
