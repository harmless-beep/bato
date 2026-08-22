// Flashcards — generic facts & formulas, separated by exam (IOE / KU / CEE).
// Sources: curated fact cards (flash-facts.ts) + facts split from the notes content.
// NO question-with-options cards — these are the "things you forget".
import { notes } from './notes'
import { factCards, type FactCard } from './flash-facts'

export interface Flashcard {
  id: string
  exam: 'IOE' | 'KU' | 'CEE' | 'All'
  subject: string
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

const cards: Flashcard[] = []

// 1. Curated fact cards (generic formulas, constants, definitions)
for (const f of factCards) {
  cards.push({
    id: `f-${f.exam}-${f.topic.replace(/[^a-z0-9]/gi, '')}-${f.front.slice(0, 24).replace(/[^a-z0-9]/gi, '')}`,
    exam: f.exam,
    subject: f.topic.split(' — ')[0] ?? f.topic,
    topic: f.topic,
    front: f.front,
    back: f.back,
  })
}

// 2. Notes → fact cards (medical/engineering content, tagged to the right exam)
for (const sec of notes) {
  const exam: Flashcard['exam'] = sec.id.startsWith('med') ? 'CEE'
    : sec.id.startsWith('sem') ? 'All'
    : sec.id === 'csit' ? 'KU'
    : 'IOE'
  for (const item of sec.items) {
    const pairs = splitMd(item.content)
    if (pairs.length === 0) {
      cards.push({
        id: `n-${sec.id}-${item.title.slice(0, 20).replace(/[^a-z0-9]/gi, '')}`,
        exam,
        subject: sec.title,
        topic: item.title,
        front: item.title,
        back: item.content,
      })
    } else {
      for (const p of pairs) {
        cards.push({
          id: `n-${sec.id}-${p.t.slice(0, 24).replace(/[^a-z0-9]/gi, '')}`,
          exam,
          subject: sec.title,
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
