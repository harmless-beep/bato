// Flashcards — derived from the real question bank + notes data.
// Every question becomes a card (Q → A+explanation); every note becomes a card.
// Imported live, so cards grow automatically as data grows.
import { questions, type Question } from './questions'
import { notes } from './notes'

export interface Flashcard {
  id: string
  exam: 'IOE' | 'KU' | 'CEE' | 'All'
  subject: string
  topic: string
  front: string
  back: string
}

// Subject → which exams test it
const examMap: Record<string, ('IOE' | 'KU' | 'CEE')[]> = {
  math: ['IOE', 'KU'],
  physics: ['IOE', 'KU', 'CEE'],
  chemistry: ['IOE', 'KU', 'CEE'],
  biology: ['CEE'],
}

function splitMd(md: string): { t: string; d: string }[] {
  // Split note content into front/back pairs: lines become fronts, following detail backs
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

// 1. Questions → cards (with options as part of front)
for (const q of questions) {
  const opts = q.options.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join('  ')
  const letter = String.fromCharCode(65 + q.correct)
  const back = `**Answer: ${letter}. ${q.options[q.correct]}**\n\n${q.explanation ?? ''}`
  for (const exam of examMap[q.subject] ?? ['All']) {
    cards.push({
      id: `q-${exam}-${q.id}`,
      exam,
      subject: q.subject,
      topic: q.topic,
      front: `${q.text}\n${opts}`,
      back,
    })
  }
}

// 2. Notes → cards (each bold heading is a front, detail is the back)
for (const sec of notes) {
  for (const item of sec.items) {
    const pairs = splitMd(item.content)
    if (pairs.length === 0) {
      cards.push({
        id: `n-${sec.id}-${item.title.slice(0, 20).replace(/[^a-z0-9]/gi, '')}`,
        exam: sec.id.startsWith('med') ? 'CEE' : sec.id.startsWith('sem') ? 'All' : 'IOE',
        subject: sec.title,
        topic: item.title,
        front: item.title,
        back: item.content,
      })
    } else {
      for (const p of pairs) {
        cards.push({
          id: `n-${sec.id}-${p.t.slice(0, 20).replace(/[^a-z0-9]/gi, '')}`,
          exam: sec.id.startsWith('med') ? 'CEE' : sec.id.startsWith('sem') ? 'All' : 'IOE',
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
