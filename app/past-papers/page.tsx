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

// LOCAL PDFs served from /bato/pdfs/ | EXTERNAL = Google Drive
const src = {
  math1:    '/bato/pdfs/eng-math-1.pdf',
  math2:    '/bato/pdfs/eng-math-2.pdf',
  math3:    '/bato/pdfs/eng-math-3.pdf',
  physics:  '/bato/pdfs/eng-physics.pdf',
  chem:     '/bato/pdfs/eng-chem.pdf',
  computer: 'https://drive.google.com/file/d/1gTRPU85rXX6-ZVXi3PtbOzguCBSbkMSe/view',
  electrical:'https://drive.google.com/file/d/1Z1WJp6Aj0yOs3EIx9FCJueFGE68a_gHt/view',
  electronics:'https://drive.google.com/file/d/1fvYTZ0FB5oULpjeWxaZA6k-C1a-QvtUY/view',
  mechanical:'https://drive.google.com/file/d/1oNsE9cdsNxLOdjnuWFUUK2cioUMXSZ19/view',
  drawing:  'https://drive.google.com/file/d/1rbADhTbqPoUaOICZ9cW5H3G2moHAhxht/view',
  ioe_cutoff:'/bato/pdfs/ioe-cutoff-2082.pdf',
  ku_syllabus:'/bato/pdfs/ku-kucat-syllabus-2026.pdf',
  paper_guides:'https://paperguides.org',
  en_nepal:'https://engineeringnepal.com.np/p/old-questions.html',
  ioe_tracker:'https://ioe-entrance.bibeksubedi0001.com.np',
}

const subjectPdf = (subject: string, semester?: number): string => {
  const s = subject.toLowerCase()
  if (s.includes('math')) {
    if (semester === 1) return src.math1
    if (semester === 2) return src.math2
    if (semester === 3) return src.math3
    return src.math1
  }
  if (s.includes('physics')) return src.physics
  if (s.includes('chemistry') || s.includes('chem')) return src.chem
  if (s.includes('computer')) return src.computer
  if (s.includes('electrical')) return src.electrical
  if (s.includes('electronics')) return src.electronics
  if (s.includes('mechanical')) return src.mechanical
  if (s.includes('drawing')) return src.drawing
  return src.ioe_cutoff
}

const papers: PastPaper[] = [
  { id: 'ioe-2082-ent-math', year: 2082, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ', pdfUrl: src.math1 },
  { id: 'ioe-2082-ent-phy', year: 2082, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ', pdfUrl: src.physics },
  { id: 'ioe-2082-ent-che', year: 2082, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ', pdfUrl: src.chem },
  { id: 'ioe-2081-ent-math', year: 2081, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ', pdfUrl: src.math1 },
  { id: 'ioe-2081-ent-phy', year: 2081, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ', pdfUrl: src.physics },
  { id: 'ioe-2081-ent-che', year: 2081, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ', pdfUrl: src.chem },
  { id: 'ioe-2080-ent-math', year: 2080, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ', pdfUrl: src.math1 },
  { id: 'ioe-2080-ent-phy', year: 2080, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ', pdfUrl: src.physics },
  { id: 'ioe-2080-ent-che', year: 2080, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ', pdfUrl: src.chem },
  { id: 'ioe-2079-ent-math', year: 2079, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ', pdfUrl: src.math1 },
  { id: 'ioe-2079-ent-phy', year: 2079, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ', pdfUrl: src.physics },
  { id: 'ioe-2079-ent-che', year: 2079, university: 'IOE', exam: 'Entrance', subject: 'Chemistry', subjectNp: 'रसायनशास्त्र', type: 'MCQ', pdfUrl: src.chem },
  { id: 'ioe-2078-ent-math', year: 2078, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ', pdfUrl: src.math1 },
  { id: 'ioe-2078-ent-phy', year: 2078, university: 'IOE', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ', pdfUrl: src.physics },
  { id: 'ioe-2077-ent-math', year: 2077, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ', pdfUrl: src.math1 },
  { id: 'ioe-2076-ent-math', year: 2076, university: 'IOE', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ', pdfUrl: src.math1 },
  { id: 'ioe-sem1-m1-2082', year: 2082, university: 'IOE', exam: 'Semester', semester: 1, subject: 'Engineering Mathematics I', subjectNp: 'इन्जिनियरिङ गणित I', type: 'Full', pdfUrl: src.math1 },
  { id: 'ioe-sem1-m1-2081', year: 2081, university: 'IOE', exam: 'Semester', semester: 1, subject: 'Engineering Mathematics I', subjectNp: 'इन्जिनियरिङ गणित I', type: 'Full', pdfUrl: src.math1 },
  { id: 'ioe-sem1-m1-2080', year: 2080, university: 'IOE', exam: 'Semester', semester: 1, subject: 'Engineering Mathematics I', subjectNp: 'इन्जिनियरिङ गणित I', type: 'Full', pdfUrl: src.math1 },
  { id: 'ioe-sem2-m2-2082', year: 2082, university: 'IOE', exam: 'Semester', semester: 2, subject: 'Engineering Mathematics II', subjectNp: 'इन्जिनियरिङ गणित II', type: 'Full', pdfUrl: src.math2 },
  { id: 'ioe-sem2-m2-2080', year: 2080, university: 'IOE', exam: 'Semester', semester: 2, subject: 'Engineering Mathematics II', subjectNp: 'इन्जिनियरिङ गणित II', type: 'Full', pdfUrl: src.math2 },
  { id: 'ioe-sem3-m3-2081', year: 2081, university: 'IOE', exam: 'Semester', semester: 3, subject: 'Engineering Mathematics III', subjectNp: 'इन्जिनियरिङ गणित III', type: 'Full', pdfUrl: src.math3 },
  { id: 'ioe-sem1-phy', year: 2082, university: 'IOE', exam: 'Semester', semester: 1, subject: 'Engineering Physics', subjectNp: 'इन्जिनियरिङ भौतिकशास्त्र', type: 'Full', pdfUrl: src.physics },
  { id: 'ioe-sem1-chem', year: 2082, university: 'IOE', exam: 'Semester', semester: 1, subject: 'Engineering Chemistry', subjectNp: 'इन्जिनियरिङ रसायनशास्त्र', type: 'Full', pdfUrl: src.chem },
  { id: 'ioe-sem2-phy', year: 2082, university: 'IOE', exam: 'Semester', semester: 2, subject: 'Engineering Physics', subjectNp: 'इन्जिनियरिङ भौतिकशास्त्र', type: 'Full', pdfUrl: src.physics },
  { id: 'ioe-sem2-chem', year: 2082, university: 'IOE', exam: 'Semester', semester: 2, subject: 'Engineering Chemistry', subjectNp: 'इन्जिनियरिङ रसायनशास्त्र', type: 'Full', pdfUrl: src.chem },
  { id: 'ku-2082-math', year: 2082, university: 'KU', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ku-2082-phy', year: 2082, university: 'KU', exam: 'Entrance', subject: 'Physics', subjectNp: 'भौतिकशास्त्र', type: 'MCQ' },
  { id: 'ku-2081-math', year: 2081, university: 'KU', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
  { id: 'ku-2080-math', year: 2080, university: 'KU', exam: 'Entrance', subject: 'Mathematics', subjectNp: 'गणित', type: 'MCQ' },
]

const years = [2082, 2081, 2080, 2079, 2078, 2077, 2076, 2075]
const examTypes = ['All', 'Entrance', 'Semester']
const universities = ['All', 'IOE', 'KU']
const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry',
  'Engineering Mathematics I', 'Engineering Mathematics II', 'Engineering Mathematics III',
  'Engineering Physics', 'Engineering Chemistry', 'Computer Programming']

function toggle<T>(setter: (v: T) => void, val: T, current: T) {
  setter(current === val ? (null as unknown as T) : val)
}

export default function PastPapers() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [selectedUni, setSelectedUni] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const filtered = papers.filter(p => {
    if (selectedYear && p.year !== selectedYear) return false
    if (selectedExam && selectedExam !== 'All' && p.exam !== selectedExam) return false
    if (selectedUni && selectedUni !== 'All' && p.university !== selectedUni) return false
    if (selectedSubject && selectedSubject !== 'All' && p.subject !== selectedSubject) return false
    return true
  })

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn">← {isNe ? 'होम' : 'Home'}</Link>
        <span className="nav-title">{isNe ? '📄 पुराना प्रश्नपत्र' : '📄 Past Papers'}</span>
        <div />
      </div>

      <div className="page-content">
        <div className="info-box">
          📌 <strong>{isNe ? 'परीक्षा सामग्री' : 'Exam Resources'}</strong> —{' '}
          {isNe
            ? 'प्रत्येक subject ले त्यो subject को actual past paper PDF खोल्छ।'
            : 'Each paper links to a subject-relevant PDF — Math → Math, Physics → Physics, etc.'}
        </div>

        <div style={{ marginBottom: 12 }}>
          <div className="filter-label">{isNe ? 'वर्ष' : 'Year'}</div>
          <div className="chip-row">
            {years.map(y => (
              <button key={y} className={`chip ${selectedYear === y ? 'active' : ''}`} onClick={() => toggle(setSelectedYear, y, selectedYear)}>{y}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div className="filter-label">{isNe ? 'विश्वविद्यालय' : 'University'}</div>
          <div className="chip-row">
            {universities.map(u => (
              <button key={u} className={`chip ${(selectedUni === u) || (u === 'All' && !selectedUni) ? 'active' : ''}`} onClick={() => setSelectedUni(u === 'All' ? null : u)}>{u}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div className="filter-label">{isNe ? 'परीक्षा प्रकार' : 'Exam Type'}</div>
          <div className="chip-row">
            {examTypes.map(e => (
              <button key={e} className={`chip ${(selectedExam === e) || (e === 'All' && !selectedExam) ? 'active' : ''}`} onClick={() => setSelectedExam(e === 'All' ? null : e)}>{e}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div className="filter-label">{isNe ? 'विषय' : 'Subject'}</div>
          <div className="chip-row">
            {subjects.map(s => (
              <button key={s} className={`chip ${(selectedSubject === s) || (s === 'All' && !selectedSubject) ? 'active' : ''}`} onClick={() => setSelectedSubject(s === 'All' ? null : s)}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button className="btn btn-outline btn-sm" onClick={() => { setSelectedYear(null); setSelectedExam(null); setSelectedUni(null); setSelectedSubject(null) }}>
            {isNe ? 'फिल्टर हटाउनुहोस्' : 'Clear'}
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
            <div key={p.id} className="paper-card">
              <div className="paper-year">{p.year}</div>
              <div className="paper-info">
                <div className="paper-title">{isNe ? p.subjectNp : p.subject}</div>
                <div className="paper-meta">
                  {p.university} • {p.exam}{p.semester ? ` Sem ${p.semester}` : ''} • {p.type}
                </div>
              </div>
              <a
                href={p.pdfUrl || subjectPdf(p.subject, p.semester)}
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
        <div className="section-title">📎 Resources & Downloads</div>
        <div className="section-sub">verified free sources</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, paddingBottom: 32 }}>
        <a href={src.ioe_cutoff} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>📊</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>IOE Cutoff Ranks 2082</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>All campuses • 971 KB</div>
          </div>
        </a>
        <a href={src.math1} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>📐</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>Engineering Math I</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Sem 1 past papers • 18 MB</div>
          </div>
        </a>
        <a href={src.math2} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>📐</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>Engineering Math II</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Sem 2 past papers • 30 MB</div>
          </div>
        </a>
        <a href={src.math3} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>📐</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>Engineering Math III</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Sem 3 past papers • 11 MB</div>
          </div>
        </a>
        <a href={src.physics} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>⚡</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>Engineering Physics</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Sem 1+2 papers • 19 MB</div>
          </div>
        </a>
        <a href={src.chem} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>🧪</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>Engineering Chemistry</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Sem 1+2 papers • 13 MB</div>
          </div>
        </a>
        <a href={src.drawing} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>✏️</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>Engineering Drawing I</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Sem 1 drawing sheets</div>
          </div>
        </a>
        <a href={src.ku_syllabus} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>🗺️</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>KU KUCAT Syllabus 2026</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>PCM/PCB • 281 KB</div>
          </div>
        </a>
        <a href={src.paper_guides} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>📚</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>PaperGuides</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>KU + A Level free papers</div>
          </div>
        </a>
        <a href={src.en_nepal} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>🏛️</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>Engineering Nepal</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>All universities • Free</div>
          </div>
        </a>
        <a href={src.ioe_tracker} target="_blank" rel="noopener noreferrer" className="paper-card" style={{ textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 28 }}>🎯</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>IOE Cutoff Tracker</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>2080–2082 data</div>
          </div>
        </a>
      </div>
    </div>
  )
}
