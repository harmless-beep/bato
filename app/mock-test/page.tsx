'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { questions, subjects, type Question } from '@/data/questions'
import { useLang } from '../components/ui'

type Phase = 'select' | 'test' | 'result'

const D = {
  selectTitle: ['📝 Mock Test', '📝 Mock Test'],
  selectSub: ['IOE Entrance • 10 minutes', 'IOE Entrance • १० मिनेट'],
  howTo: [
    'Choose a subject → Timer starts → Answer all questions → Submit → See your result with weak areas.',
    'Subject चुन्नुहोस् → Timer सुरु हुन्छ → सबै प्रश्नको उत्तर दिनुहोस् → Submit गर्नुहोस् → नतिजा र कमजोर क्षेत्र हेर्नुहोस्।',
  ],
  pickSubject: ['Choose a subject', 'Subject छान्नुहोस्'],
  pickSub: ['IOE entrance level sample questions', 'IOE entrance स्तरका sample प्रश्नहरू'],
  questions: ['questions', 'प्रश्नहरू'],
  min: ['10 min', '१० मिनेट'],
  exitTest: ['Exit test?', 'परीक्षा बाहिर जाने?'],
  qOf: ['Question', 'प्रश्न'],
  of: ['of', 'मध्ये'],
  prev: ['← Previous', '← अघिल्लो'],
  next: ['Next →', 'अर्को →'],
  submit: ['✓ Submit', '✓ Submit'],
  answered: ['answered', 'उत्तर दिइएको'],
  resultTitle: ['📊 Result', '📊 नतिजा'],
  correct: ['✓ Correct', '✓ सही'],
  wrong: ['✗ Wrong', '✗ गलत'],
  unanswered: ['— Unanswered', '— उत्तर नदिइएको'],
  weakTitle: ['📌 Weak Areas', '📌 कमजोर क्षेत्रहरू'],
  weakSub: ['Topics that need more practice', 'यी topics मा बढी अभ्यास चाहिन्छ'],
  focusOn: ['Focus on these topics:', 'यी topics मा ध्यान दिनुहोस्:'],
  reviewTitle: ['📖 Answers Review', '📖 उत्तर समीक्षा'],
  home: ['🏠 Home', '🏠 होम'],
  tryAgain: ['🔄 Try Again', '🔄 फेरि प्रयास'],
  correctOutOf: ['correct out of', 'मध्ये सही'],
  ofAnswers: ['correct', 'सही'],
  timeLeft: ['Time left', 'बाँकी समय'],
  topicLabel: ['📍 Topic', '📍 विषय'],
  explanation: ['💡 Explanation', '💡 व्याख्या'],
}

export default function MockTest() {
  const { lang } = useLang()
  const L = (i: number) => D[Object.keys(D)[i] as keyof typeof D]?.[lang === 'ne' ? 1 : 0] ?? ''

  const [phase, setPhase] = useState<Phase>('select')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(600)
  const [started, setStarted] = useState(false)
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const [showBookmarked, setShowBookmarked] = useState(false)

  useEffect(() => {
    try { const s = localStorage.getItem('bato-bookmarks'); if (s) setBookmarks(new Set(JSON.parse(s))) } catch {}
  }, [])

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try { localStorage.setItem('bato-bookmarks', JSON.stringify([...next])) } catch {}
      return next
    })
  }

  const subjectQs = questions.filter(q => q.subject === selectedSubject)
  const total = subjectQs.length

  useEffect(() => {
    if (!started || phase !== 'test') return
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(id); setPhase('result'); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [started, phase])

  const startTest = (subject: string) => {
    setSelectedSubject(subject)
    setAnswers(new Array(questions.filter(q => q.subject === subject).length).fill(null))
    setCurrentQ(0)
    setTimeLeft(600)
    setStarted(true)
    setPhase('test')
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const q = subjectQs[currentQ]
  const answered = answers.filter(a => a !== null).length
  const correct = subjectQs.filter((qu, i) => answers[i] === qu.correct).length
  const wrong = answered - correct
  const unanswered = total - answered

  const topicStats: Record<string, { total: number; correct: number }> = {}
  subjectQs.forEach((qu, i) => {
    if (!topicStats[qu.topic]) topicStats[qu.topic] = { total: 0, correct: 0 }
    topicStats[qu.topic].total++
    if (answers[i] === qu.correct) topicStats[qu.topic].correct++
  })
  const weakTopics = Object.entries(topicStats)
    .filter(([, s]) => s.correct / s.total < 0.6)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)

  // ─── SELECT ───
  if (phase === 'select') {
    return (
      <div className="page">
        <div className="page-header">
          <Link href="/"><button className="back-btn">←</button></Link>
          <div>
            <div className="page-title">{D.selectTitle[lang === 'ne' ? 1 : 0]}</div>
            <div className="page-sub">{D.selectSub[lang === 'ne' ? 1 : 0]}</div>
          </div>
        </div>
        <div className="page-content">
          <div className="info-box">
            <strong>{lang === 'ne' ? 'कसरी काम गर्छ:' : 'How it works:'}</strong> {D.howTo[lang === 'ne' ? 1 : 0]}
          </div>
          <div className="section-header" style={{ marginTop: 24 }}>
            <div className="section-title">{D.pickSubject[lang === 'ne' ? 1 : 0]}</div>
            <div className="section-sub">{D.pickSub[lang === 'ne' ? 1 : 0]}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
            {subjects.map(s => (
              <button
                key={s.id}
                className="feature-card"
                style={{ border: 'none', textAlign: 'left', cursor: 'pointer' }}
                onClick={() => startTest(s.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 54, height: 54, borderRadius: 14,
                    background: s.bg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 26
                  }}>{s.emoji}</div>
                  <div>
                    <div className="feature-name">
                      {s.label} <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: 13 }}>
                        {lang === 'ne' ? `(${s.labelNp})` : ''}
                      </span>
                    </div>
                    <div className="feature-desc" style={{ marginTop: 4 }}>
                      {questions.filter(qu => qu.subject === s.id).length} {D.questions[lang === 'ne' ? 1 : 0]} • {D.min[lang === 'ne' ? 1 : 0]}
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: 20, color: '#cbd5e1' }}>→</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ─── TEST ───
  if (phase === 'test' && q) {
    const letters = ['A', 'B', 'C', 'D']
    return (
      <div className="page">
        <div className="page-header">
          <button
            className="back-btn"
            onClick={() => { if (confirm(D.exitTest[lang === 'ne' ? 1 : 0])) { setPhase('select'); setStarted(false) } }}
          >←</button>
          <div style={{ flex: 1 }}>
            <div className="page-title">{subjects.find(s => s.id === selectedSubject)?.label}</div>
            <div className="page-sub">
              {D.qOf[lang === 'ne' ? 1 : 0]} {currentQ + 1} {D.of[lang === 'ne' ? 1 : 0]} {total}
            </div>
          </div>
          <div className={`timer ${timeLeft < 60 ? 'warning' : ''}`}>⏱ {formatTime(timeLeft)}</div>
        </div>

        <div className="page-content">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentQ + 1) / total) * 100}%` }} />
          </div>
          <div className="info-box" style={{ marginTop: 12, marginBottom: 0, fontSize: 11, padding: '8px 14px' }}>
            📍 {q.topic}
          </div>

          <div className="question-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div className="question-num" style={{ margin: 0 }}>Q{currentQ + 1}</div>
              <button
                onClick={() => toggleBookmark(subjectQs[currentQ].id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1 }}
                title={bookmarks.has(subjectQs[currentQ].id) ? (lang === 'ne' ? 'बुकमार्क हटाउनुहोस्' : 'Remove bookmark') : (lang === 'ne' ? 'बुकमार्क गर्नुहोस्' : 'Bookmark this question')}
              >
                {bookmarks.has(subjectQs[currentQ].id) ? '★' : '☆'}
              </button>
            </div>
            <div className="question-text">{q.text}</div>
            <div className="options">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  className={`option ${answers[currentQ] === i ? 'selected' : ''}`}
                  onClick={() => {
                    const newAns = [...answers]
                    newAns[currentQ] = i
                    setAnswers(newAns)
                  }}
                >
                  <span className="option-letter">{letters[i]}</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button
              className="btn btn-outline"
              style={{ flex: 1 }}
              onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
              disabled={currentQ === 0}
            >
              {D.prev[lang === 'ne' ? 1 : 0]}
            </button>
            {currentQ < total - 1 ? (
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setCurrentQ(currentQ + 1)}>
                {D.next[lang === 'ne' ? 1 : 0]}
              </button>
            ) : (
              <button className="btn btn-gold" style={{ flex: 1 }} onClick={() => setPhase('result')}>
                {D.submit[lang === 'ne' ? 1 : 0]}
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 18, justifyContent: 'center' }}>
            {subjectQs.map((qu, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                style={{
                  width: 34, height: 34, borderRadius: 10,
                  fontSize: 13, fontWeight: 700,
                  border: i === currentQ ? '2px solid var(--primary)' : '2px solid transparent',
                  background: answers[i] !== null ? (bookmarks.has(qu.id) ? 'var(--gold)' : 'var(--primary)') : (bookmarks.has(qu.id) ? 'rgba(251,191,36,0.25)' : 'var(--surface-2)'),
                  color: answers[i] !== null ? 'white' : 'var(--text)',
                  cursor: 'pointer'
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
            <button
              className={`chip ${showBookmarked ? 'active' : ''}`}
              onClick={() => setShowBookmarked(b => !b)}
              style={{ fontSize: 11, padding: '3px 10px' }}
            >
              {showBookmarked ? '★' : '☆'} {lang === 'ne' ? 'बुकमार्क' : 'Bookmarked'} ({bookmarks.size})
            </button>
          </div>
          {showBookmarked && (
            <div style={{ marginTop: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6 }}>
                {lang === 'ne' ? 'थिचेर क्विजमा जानुहोस्' : 'Tap to jump to question'}
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {subjectQs.filter(qu => bookmarks.has(qu.id)).map(qu => (
                  <button
                    key={qu.id}
                    onClick={() => { setCurrentQ(subjectQs.indexOf(qu)); setShowBookmarked(false) }}
                    style={{ padding: '3px 10px', borderRadius: 8, border: '1.5px solid var(--gold)', background: 'rgba(251,191,36,0.15)', color: 'var(--gold)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Q{subjectQs.indexOf(qu) + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
            {answered}/{total} {D.answered[lang === 'ne' ? 1 : 0]}
          </div>
        </div>
      </div>
    )
  }

  // ─── RESULT ───
  if (phase === 'result') {
    const percentage = Math.round((correct / total) * 100)
    const letters = ['A', 'B', 'C', 'D']
    return (
      <div className="page">
        <div className="page-header">
          <Link href="/"><button className="back-btn">←</button></Link>
          <div>
            <div className="page-title">{D.resultTitle[lang === 'ne' ? 1 : 0]}</div>
            <div className="page-sub">{subjects.find(s => s.id === selectedSubject)?.label}</div>
          </div>
        </div>
        <div className="page-content">
          <div className="score-card">
            <div className="score-number">{percentage}%</div>
            <div className="score-label">
              {correct} {D.correctOutOf[lang === 'ne' ? 1 : 0]} {total}
            </div>
            <div className="progress-bar" style={{ marginTop: 18, background: 'rgba(255,255,255,0.25)' }}>
              <div className="progress-fill" style={{ width: `${percentage}%`, background: percentage >= 60 ? '#34d399' : percentage >= 40 ? '#fbbf24' : '#f87171' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 16 }}>
            <div className="card stat-card">
              <div className="stat-num" style={{ color: 'var(--success)' }}>{correct}</div>
              <div className="stat-label">{D.correct[lang === 'ne' ? 1 : 0]}</div>
            </div>
            <div className="card stat-card">
              <div className="stat-num" style={{ color: 'var(--danger)' }}>{wrong}</div>
              <div className="stat-label">{D.wrong[lang === 'ne' ? 1 : 0]}</div>
            </div>
            <div className="card stat-card">
              <div className="stat-num" style={{ color: 'var(--muted)' }}>{unanswered}</div>
              <div className="stat-label">{D.unanswered[lang === 'ne' ? 1 : 0]}</div>
            </div>
          </div>

          {weakTopics.length > 0 && (
            <>
              <hr className="divider"/>
              <div className="section-header">
                <div className="section-title">{D.weakTitle[lang === 'ne' ? 1 : 0]}</div>
                <div className="section-sub">{D.weakSub[lang === 'ne' ? 1 : 0]}</div>
              </div>
              <div className="warn-box">
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{D.focusOn[lang === 'ne' ? 1 : 0]}</div>
                {weakTopics.map(([topic, stats]) => (
                  <div key={topic} style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <span>{topic}</span>
                    <span style={{ color: 'var(--danger)', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {stats.correct}/{stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <hr className="divider"/>
          <div className="section-header">
            <div className="section-title">{D.reviewTitle[lang === 'ne' ? 1 : 0]}</div>
          </div>
          {subjectQs.map((qu, i) => (
            <div key={qu.id} className="question-card">
              <div className="question-num">Q{i + 1} — {qu.topic}</div>
              <div className="question-text">{qu.text}</div>
              {qu.options.map((opt, oi) => (
                <div
                  key={oi}
                  className={`option ${oi === qu.correct ? 'correct' : oi === answers[i] && oi !== qu.correct ? 'wrong' : ''}`}
                  style={{ marginBottom: 4, cursor: 'default' }}
                >
                  <span className="option-letter">{letters[oi]}</span>
                  {opt}
                  {oi === qu.correct && <span style={{ marginLeft: 'auto', color: 'var(--success)', fontSize: 14 }}>✓</span>}
                  {oi === answers[i] && oi !== qu.correct && <span style={{ marginLeft: 'auto', color: 'var(--danger)', fontSize: 14 }}>✗</span>}
                </div>
              ))}
              {qu.explanation && (
                <div style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)', background: 'var(--surface)', padding: '10px 12px', borderRadius: 10 }}>
                  💡 {qu.explanation}
                </div>
              )}
            </div>
          ))}

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Link href="/" style={{ flex: 1 }}>
              <button className="btn btn-outline" style={{ width: '100%' }}>{D.home[lang === 'ne' ? 1 : 0]}</button>
            </Link>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setPhase('select'); setStarted(false) }}>
              {D.tryAgain[lang === 'ne' ? 1 : 0]}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
