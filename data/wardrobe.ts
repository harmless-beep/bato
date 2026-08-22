// ─── Companion wardrobe ───────────────────────────────────────────────────
// Each accessory × each pet = one outfit → 45 × 5 = 225 outfits.
// Every accessory has an unlock rule tied to real user progress.
export type UnlockType = 'starter' | 'eggs' | 'questions' | 'accuracy' | 'streak' | 'attempts' | 'suggest' | 'admin'
export type Unlock = { type: UnlockType; need: number }
export type Accessory = { id: string; emoji: string; name: string; nameNp: string; unlock: Unlock }

export const ACCESSORIES: Accessory[] = [
  // Starter (always available)
  { id: 'top-hat', emoji: '🎩', name: 'Top Hat', nameNp: 'टप ह्याट', unlock: { type: 'starter', need: 0 } },
  { id: 'cap', emoji: '🧢', name: 'Cap', nameNp: 'क्याप', unlock: { type: 'starter', need: 0 } },
  { id: 'sun-hat', emoji: '👒', name: 'Sun Hat', nameNp: 'सन ह्याट', unlock: { type: 'starter', need: 0 } },
  { id: 'grad-cap', emoji: '🎓', name: 'Grad Cap', nameNp: 'स्नातक टोपी', unlock: { type: 'starter', need: 0 } },
  { id: 'scarf', emoji: '🧣', name: 'Scarf', nameNp: 'स्कार्फ', unlock: { type: 'starter', need: 0 } },
  // Easter eggs found
  { id: 'egg1', emoji: '🥚', name: 'Egg', nameNp: 'अण्डा', unlock: { type: 'eggs', need: 1 } },
  { id: 'egg2', emoji: '🐣', name: 'Hatchling', nameNp: 'चल्लो', unlock: { type: 'eggs', need: 2 } },
  { id: 'egg3', emoji: '🐤', name: 'Chick', nameNp: 'चल्ली', unlock: { type: 'eggs', need: 3 } },
  { id: 'egg4', emoji: '🐦', name: 'Bird', nameNp: 'चरा', unlock: { type: 'eggs', need: 4 } },
  { id: 'egg5', emoji: '🦜', name: 'Parrot', nameNp: 'सुगा', unlock: { type: 'eggs', need: 5 } },
  { id: 'egg6', emoji: '🦚', name: 'Peacock', nameNp: 'मयूर', unlock: { type: 'eggs', need: 6 } },
  { id: 'egg7', emoji: '🦢', name: 'Swan', nameNp: 'हाँस', unlock: { type: 'eggs', need: 7 } },
  { id: 'egg8', emoji: '🕊️', name: 'Dove', nameNp: 'परेवा', unlock: { type: 'eggs', need: 7 } },
  // Questions answered
  { id: 'book', emoji: '📚', name: 'Book Stack', nameNp: 'किताब थुप्रो', unlock: { type: 'questions', need: 25 } },
  { id: 'open-book', emoji: '📖', name: 'Open Book', nameNp: 'खुला किताब', unlock: { type: 'questions', need: 50 } },
  { id: 'pencil', emoji: '✏️', name: 'Pencil', nameNp: 'सिसाकलम', unlock: { type: 'questions', need: 100 } },
  { id: 'pen', emoji: '🖊️', name: 'Pen', nameNp: 'कलम', unlock: { type: 'questions', need: 150 } },
  { id: 'notepad', emoji: '📝', name: 'Notepad', nameNp: 'कापी', unlock: { type: 'questions', need: 200 } },
  { id: 'ruler', emoji: '📐', name: 'Ruler', nameNp: 'स्केल', unlock: { type: 'questions', need: 300 } },
  { id: 'abacus', emoji: '🧮', name: 'Abacus', nameNp: 'अबाकस', unlock: { type: 'questions', need: 400 } },
  { id: 'microscope', emoji: '🔬', name: 'Microscope', nameNp: 'माइक्रोस्कोप', unlock: { type: 'questions', need: 500 } },
  { id: 'laptop', emoji: '💻', name: 'Laptop', nameNp: 'ल्यापटप', unlock: { type: 'questions', need: 750 } },
  { id: 'brain', emoji: '🧠', name: 'Brain', nameNp: 'दिमाग', unlock: { type: 'questions', need: 1000 } },
  // Accuracy
  { id: 'bronze', emoji: '🥉', name: 'Bronze', nameNp: 'कांस्य', unlock: { type: 'accuracy', need: 50 } },
  { id: 'silver', emoji: '🥈', name: 'Silver', nameNp: 'रजत', unlock: { type: 'accuracy', need: 70 } },
  { id: 'gold', emoji: '🥇', name: 'Gold', nameNp: 'स्वर्ण', unlock: { type: 'accuracy', need: 85 } },
  { id: 'medal', emoji: '🏅', name: 'Medal', nameNp: 'पदक', unlock: { type: 'accuracy', need: 92 } },
  { id: 'trophy', emoji: '🏆', name: 'Trophy', nameNp: 'ट्रफी', unlock: { type: 'accuracy', need: 97 } },
  // Streak
  { id: 'fire', emoji: '🔥', name: 'Fire', nameNp: 'आगो', unlock: { type: 'streak', need: 3 } },
  { id: 'bolt', emoji: '⚡', name: 'Lightning', nameNp: 'बिजुली', unlock: { type: 'streak', need: 7 } },
  { id: 'star', emoji: '🌟', name: 'Star', nameNp: 'तारा', unlock: { type: 'streak', need: 14 } },
  { id: 'gem', emoji: '💎', name: 'Gem', nameNp: 'हीरा', unlock: { type: 'streak', need: 21 } },
  { id: 'rocket', emoji: '🚀', name: 'Rocket', nameNp: 'रकेट', unlock: { type: 'streak', need: 30 } },
  { id: 'comet', emoji: '☄️', name: 'Comet', nameNp: 'धूमकेतु', unlock: { type: 'streak', need: 50 } },
  // Mock tests taken
  { id: 'note1', emoji: '🗒️', name: 'First Test', nameNp: 'पहिलो परीक्षा', unlock: { type: 'attempts', need: 1 } },
  { id: 'clipboard', emoji: '📋', name: 'Clipboard', nameNp: 'क्लिपबोर्ड', unlock: { type: 'attempts', need: 5 } },
  { id: 'folder', emoji: '🗂️', name: 'Folder', nameNp: 'फोल्डर', unlock: { type: 'attempts', need: 10 } },
  { id: 'receipt', emoji: '🧾', name: 'Receipt', nameNp: 'रसिद', unlock: { type: 'attempts', need: 20 } },
  // Suggestions
  { id: 'bubble', emoji: '💬', name: 'Voice', nameNp: 'आवाज', unlock: { type: 'suggest', need: 1 } },
  { id: 'ballot', emoji: '🗳️', name: 'Ballot', nameNp: 'भोट', unlock: { type: 'suggest', need: 3 } },
  // Admin only
  { id: 'crown', emoji: '👑', name: 'Crown', nameNp: 'मुकुट', unlock: { type: 'admin', need: 0 } },
  { id: 'shield', emoji: '🛡️', name: 'Shield', nameNp: 'ढाल', unlock: { type: 'admin', need: 0 } },
  { id: 'wand', emoji: '🪄', name: 'Wand', nameNp: 'जादूको छडी', unlock: { type: 'admin', need: 0 } },
  { id: 'medal-star', emoji: '🎖️', name: 'Badge', nameNp: 'ब्याज', unlock: { type: 'admin', need: 0 } },
  { id: 'dragon', emoji: '🐲', name: 'Dragon', nameNp: 'ड्र्यागन', unlock: { type: 'admin', need: 0 } },
]

export type Stats = {
  questions: number; accuracy: number; streak: number
  eggs: number; attempts: number; suggestions: number; admin: boolean
}

export function readStats(): Stats {
  const n = (k: string, d = 0) => { try { return Number(localStorage.getItem(k) ?? d) } catch { return d } }
  const len = (k: string) => { try { return (JSON.parse(localStorage.getItem(k) || '[]') as unknown[]).length } catch { return 0 } }
  return {
    questions: n('bato-questions'), accuracy: n('bato-accuracy'), streak: n('bato-streak'),
    eggs: len('bato-eggs'), attempts: len('bato-attempts'), suggestions: len('bato-suggestions'),
    admin: localStorage.getItem('bato-admin') === '1',
  }
}

export function isUnlocked(a: Accessory, s: Stats): boolean {
  switch (a.unlock.type) {
    case 'starter': return true
    case 'eggs': return s.eggs >= a.unlock.need
    case 'questions': return s.questions >= a.unlock.need
    case 'accuracy': return s.accuracy >= a.unlock.need
    case 'streak': return s.streak >= a.unlock.need
    case 'attempts': return s.attempts >= a.unlock.need
    case 'suggest': return s.suggestions >= a.unlock.need
    case 'admin': return s.admin
  }
}

export function unlockHint(u: Unlock, isNe: boolean): string {
  const L = (en: string, ne: string) => (isNe ? ne : en)
  switch (u.type) {
    case 'starter': return L('Always available', 'सधैं उपलब्ध')
    case 'eggs': return L(`Find ${u.need} easter egg${u.need > 1 ? 's' : ''}`, `भेट्टाउनुहोस् ${u.need} eggs`)
    case 'questions': return L(`Answer ${u.need}+ questions`, `${u.need}+ प्रश्न हल गर्नुहोस्`)
    case 'accuracy': return L(`Reach ${u.need}% accuracy`, `${u.need}% सही प्रतिशत`)
    case 'streak': return L(`${u.need}-day study streak`, `${u.need} दिन streak`)
    case 'attempts': return L(`Complete ${u.need} mock test${u.need > 1 ? 's' : ''}`, `${u.need} mock test दिनुहोस्`)
    case 'suggest': return L(`Submit ${u.need} suggestion${u.need > 1 ? 's' : ''}`, `${u.need} सुझाव पठाउनुहोस्`)
    case 'admin': return L('Admin only', 'प्रशासक मात्र')
  }
}
