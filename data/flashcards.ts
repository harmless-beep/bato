// Flashcards — generic facts & formulas, separated by exam (IOE / KU / CEE)
// and by subject → sub-subject (Physics → Optics, Chemistry → Organic, ...).
// Sources: curated fact cards (flash-facts.ts) + facts split from the notes content.
import { notes } from './notes'
import { factCards } from './flash-facts'
import { bulkCards } from './flash-bulk'

export interface Flashcard {
  id: string
  exam: 'IOE' | 'KU' | 'CEE' | 'All'
  subject: string
  sub: string
  topic: string
  front: string
  back: string
}

// Notes → fact pairs: each **Bold heading** becomes a front, its detail the back
function splitMd(md: string): { t: string; d: string }[] {
  const lines = md.split('\n').filter(l => l.trim().length > 0)
  const cards: { t: string; d: string }[] = []
  let current = ''
  let detail: string[] = []
  for (const raw of lines) {
    const line = raw.trim()
    const m = line.match(/^\*\*(.+?)\*\*:?\s*(.*)$/)
    if (m) {
      if (current) cards.push({ t: current, d: detail.join('\n') })
      current = m[1]
      detail = m[2] ? [m[2]] : []
    } else if (current) {
      detail.push(line)
    } else if (line.length < 60) {
      current = line
      detail = []
    }
  }
  if (current) cards.push({ t: current, d: detail.join('\n') })
  return cards.filter(c => c.t.length < 80)
}

// Map note section id → subject + default sub
const noteSubject = (id: string, title: string): { subject: string; sub: string } => {
  if (id.startsWith('med')) return { subject: 'Biology', sub: title }
  if (id === 'csit') return { subject: 'Computer', sub: title }
  if (id.startsWith('sem')) return { subject: 'Bachelor', sub: title }
  if (id === 'math') return { subject: 'Mathematics', sub: title }
  if (id === 'physics') return { subject: 'Physics', sub: title }
  if (id === 'chemistry') return { subject: 'Chemistry', sub: title }
  if (id === 'english' || id === 'english-2') return { subject: 'English', sub: title }
  if (id === 'aptitude' || id === 'aptitude-2') return { subject: 'Aptitude', sub: title }
  if (id === 'g.k') return { subject: 'General Knowledge', sub: title }
  if (id === 'formula-sheet') return { subject: 'Formula Sheets', sub: title }
  return { subject: 'Other', sub: title }
}

const cards: Flashcard[] = []

// 0. Bulk hand-curated cards (2,200+ formulas & facts)
for (const b of bulkCards) {
  cards.push({
    id: `b-${b.exam}-${b.subject}-${b.sub}-${b.front.slice(0, 24).replace(/[^a-z0-9]/gi, '')}-${Math.random().toString(36).slice(2, 8)}`,
    exam: b.exam,
    subject: b.subject,
    sub: b.sub,
    topic: b.sub,
    front: b.front,
    back: b.back,
  })
}

// 1. Curated fact cards — topic "Physics — Kinematics" → subject Physics, sub Kinematics
for (const f of factCards) {
  const parts = f.topic.split(' — ')
  const subject = parts[0] ?? f.topic
  const sub = parts[1] ?? f.topic
  cards.push({
    id: `f-${f.exam}-${f.topic.replace(/[^a-z0-9]/gi, '')}-${f.front.slice(0, 24).replace(/[^a-z0-9]/gi, '')}`,
    exam: f.exam,
    subject,
    sub,
    topic: f.topic,
    front: f.front,
    back: f.back,
  })
}

// 2. Notes → fact cards
for (const sec of notes) {
  const exam: Flashcard['exam'] = sec.id.startsWith('med') ? 'CEE'
    : sec.id.startsWith('sem') ? 'All'
    : sec.id === 'csit' ? 'KU'
    : 'IOE'
  const { subject, sub } = noteSubject(sec.id, sec.title)
  for (const item of sec.items) {
    const pairs = splitMd(item.content)
    if (pairs.length === 0) {
      cards.push({
        id: `n-${sec.id}-${item.title.slice(0, 20).replace(/[^a-z0-9]/gi, '')}`,
        exam,
        subject,
        sub: item.title,
        topic: item.title,
        front: item.title,
        back: item.content,
      })
    } else {
      for (const p of pairs) {
        cards.push({
          id: `n-${sec.id}-${p.t.slice(0, 24).replace(/[^a-z0-9]/gi, '')}`,
          exam,
          subject,
          sub: item.title,
          topic: item.title,
          front: p.t,
          back: p.d || item.content,
        })
      }
    }
  }
}

export const flashcards = cards
export const flashExams = ['All', 'IOE', 'KU', 'CEE'] as const
