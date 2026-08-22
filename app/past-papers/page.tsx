'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '../components/ui'

interface PastPaper {
  id: string
  year: number
  university: 'IOE' | 'KU'
  exam: 'Entrance' | 'Semester'
  semester?: number
  subject: string
  subjectNp: string
  type: 'MCQ' | 'Full'
  pdfUrl?: string
}

// Direct download / source links for official papers
const sources: Record<string, string> = {
  ioe_entrance: 'https://peadigitals.com/pages/question',
  ioe_cutoff_2082: 'https://pea.edu.np/content/uploads/2026/06/IOE-Cutoff-Rank-2082.pdf',
  ioe_pulchowk_lists: 'https://pcampus.edu.np',
  ioe_thc_lists: 'https://thc.tu.edu.np',
  ioe_wrc_lists: 'https://ioepas.edu.np',
  ioe_erc_lists: 'https://ioepc.edu.np',
  ku_syllabus: 'https://apply.ku.edu.np/syllabi/2026/Test_Syllabus_2026.pdf',
  ku_papers: 'https://exam.ku.edu.np',
  paper_guides: 'https://paperguides.org',
  en_nepal: 'https://engineeringnepal.com.np/p/old-questions.html',
}

const papers: PastPaper[] = [
  { id: 'ioe-2082-ent', year: 2082, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ioe-2082-phy', year: 2082, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ioe-2082-che', year: 2082, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ' },
  { id: 'ioe-2081-ent', year: 2081, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ioe-2081-phy', year: 2081, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ioe-2081-che', year: 2081, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ' },
  { id: 'ioe-2080-ent', year: 2080, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ioe-2080-phy', year: 2080, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ioe-2080-che', year: 2080, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ' },
  { id: 'ioe-2079-ent', year: 2079, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ioe-2079-phy', year: 2079, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ioe-2079-che', year: 2079, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ' },
  { id: 'ioe-2078-ent', year: 2078, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ioe-2078-phy', year: 2078, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ioe-2078-che', year: 2078, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ' },
  { id: 'ioe-2077-ent', year: 2077, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ioe-2077-phy', year: 2077, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ioe-2077-che', year: 2077, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ' },
  { id: 'ioe-2076-ent', year: 2076, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ioe-2076-phy', year: 2076, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ioe-2075-ent', year: 2075, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ioe-2075-phy', year: 2075, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ioe-2075-che', year: 2075, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ' },
  { id: 'ioe-sem1-2082', year: 2082, university: 'IOE', exam: 'Semester', semester: 1, subject: 'Engineering Math I', subjectNp: 'इन्जिनियरिङ गणित I', type: 'Full' },
  { id: 'ioe-sem1-2081', year: 2081, university: 'IOE', exam: 'Semester', semester: 1, subject: 'Engineering Math I', subjectNp: 'इन्जिनियरिङ गणित I', type: 'Full' },
  { id: 'ioe-sem1-2080', year: 2080, university: 'IOE', exam: 'Semester', semester: 1, subject: 'Engineering Math I', subjectNp: 'इन्जिनियरिङ गणित I', type: 'Full' },
  { id: 'ioe-sem2-2082', year: 2082, university: 'IOE', exam: 'Semester', semester: 2, subject: 'Engineering Math II', subjectNp: 'इन्जिनियरिङ गणित II', type: 'Full' },
  { id: 'ioe-sem2-2080', year: 2080, university: 'IOE', exam: 'Semester', semester: 2, subject: 'Engineering Math II', subjectNp: 'इन्जिनियरिङ गणित II', type: 'Full' },
  { id: 'ioe-sem3-2081', year: 2081, university: 'IOE', exam: 'Semester', semester: 3, subject: 'Engineering Math III', subjectNp: 'इन्जिनियरिङ गणित III', type: 'Full' },
  { id: 'ku-2082-ent', year: 2082, university: 'KU', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ku-2082-phy', year: 2082, university: 'KU', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ku-2081-ent', year: 2081, university: 'KU', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ku-2081-phy', year: 2081, university: 'KU', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ku-2080-ent', year: 2080, university: 'KU', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ku-2080-phy', year: 2080, university: 'KU', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ku-2079-ent', year: 2079, university: 'KU', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ku-2079-phy', year: 2079, university: 'KU', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
]

const years = [2082, 2081, 2080, 2079, 2078, 2077, 2076, 2075]
const examTypes = ['Entrance', 'Semester']
const allSubjects = [...new Set(papers.map(p => p.subject))].sort()

export default function PastPapers() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const filtered = papers.filter(p => {
    if (selectedYear && p.year !== selectedYear) return false
    if (selectedExam && p.exam !== selectedExam) return false
    if (selectedSubject && p.subject !== selectedSubject) return false
    return true
  })

  const toggle = (setter: Function, v: any, cur: any) => setter(cur === v ? null : v)

  return (
    <div className="page">
      <div className="page-header">
        <Link href="/"><button className="back-btn">←</button></Link>
        <div>
          <div className="page-title">📚 {isNe ? 'Past Papers' : 'Past Papers'}</div>
          <div className="page-sub">IOE & KU • २०७५–२०८०</div>
        </div>
      </div>

      <div className="page-content">
        <div className="info-box">
          📌 <strong>Real papers &amp; PDFs</strong> — {isNe
            ? 'official sources + free repositories को links तल Resources मा छन्।'
            : 'Real paper links, official IOE/KU sources & free repos below.'}{' '}
          <a href="https://github.com/harmless-beep/bato" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 700, whiteSpace: 'nowrap' }}>Contribute →</a>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: 16 }}>
          <div className="filter-label">{isNe ? 'वर्ष' : 'Year'}</div>
          <div className="chip-row">
            {years.map(y => (
              <button key={y} className={`chip ${selectedYear === y ? 'active' : ''}`} onClick={() => toggle(setSelectedYear, y, selectedYear)}>
                {y}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div className="filter-label">{isNe ? 'परीक्षा प्रकार' : 'Exam Type'}</div>
          <div className="chip-row">
            {examTypes.map(e => (
              <button key={e} className={`chip ${selectedExam === e ? 'active' : ''}`} onClick={() => toggle(setSelectedExam, e, selectedExam)}>
                {e}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div className="filter-label">{isNe ? 'विषय' : 'Subject'}</div>
          <div className="chip-row">
            {allSubjects.map(s => (
              <button key={s} className={`chip ${selectedSubject === s ? 'active' : ''}`} onClick={() => toggle(setSelectedSubject, s, selectedSubject)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => { setSelectedYear(null); setSelectedExam(null); setSelectedSubject(null) }}
          >
            {isNe ? 'फिल्टर हटाउनुहोस्' : 'Clear filters'}
          </button>
          <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)', alignSelf: 'center' }}>
            {filtered.length} {isNe ? 'वटा' : 'papers'}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>📭</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{isNe ? 'यी फिल्टरले केही भेटिएन' : 'No papers match these filters'}</div>
          </div>
        ) : (
          filtered.map(p => (
            <div key={`${p.id}-${p.subject}`} className="paper-card">
              <div className="paper-year">{p.year}</div>
              <div className="paper-info">
                <div className="paper-title">{isNe ? p.subjectNp : p.subject}</div>
                <div className="paper-meta">
                  {p.university} • {p.exam}{p.semester ? ` Sem ${p.semester}` : ''} • {p.type}
                </div>
              </div>
              <a
                href={p.university === 'IOE' ? sources.ioe_entrance : sources.ku_papers}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                📥 PDF
              </a>
            </div>
          ))
        )}
      </div>

      {/* Resources */}
      <div className="section-header" style={{ marginTop: 32 }}>
        <div className="section-title">📎 {isNe ? 'Official Resources & Downloads' : 'Official Resources & Downloads'}</div>
        <div className="section-sub">{isNe ? 'verified sources, free, updated' : 'verified sources, free, updated'}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        <a href={sources.ioe_cutoff_2082} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>📊</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>IOE Cutoff Ranks 2082</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>PEA • all campuses • PDF</div>
          </div>
        </a>
        <a href={sources.paper_guides} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>📚</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>PaperGuides — KU & A Level</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Free past papers + notes • paperguides.org</div>
          </div>
        </a>
        <a href={sources.ioe_entrance} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>📝</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>IOE Past Questions</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>PEA Digital • model questions • Free</div>
          </div>
        </a>
        <a href={sources.ku_syllabus} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>🗺️</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>KU KUCAT Syllabus 2026</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>PCM/PCB topics • Official PDF</div>
          </div>
        </a>
        <a href={sources.en_nepal} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>🏛️</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>Engineering Nepal</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>IOE, KU, PoU, PU papers • Free</div>
          </div>
        </a>
        <a href="https://ioe-entrance.bibeksubedi0001.com.np" target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>🎯</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>IOE Cutoff Tracker</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>2080-2082 data • by Bibek Subedi</div>
          </div>
        </a>
      </div>
    </div>
  )
}