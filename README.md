# बाटो — IOE/KU Engineering Prep

Free, no-login, Nepali engineering entrance exam prep.

## Features

- 📝 **Mock Test** — Timed IOE/KU entrance tests with instant score + weakness report
- 🎯 **Branch Predictor** — Enter your score → see which IOE/KU branches you likely get

## Tech Stack

- **Next.js 15** (React 19)
- **TypeScript**
- **Static export** → deployable to GitHub Pages, Vercel, Cloudflare Pages (free)
- No database, no auth, no backend

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Build for Production

```bash
npm run build
# Output in /out directory (static)
```

## Deploy to Vercel (Free)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Vercel auto-detects Next.js → Deploy
4. Done. Your site is live at `https://your-project.vercel.app`

## Contributing Content

This is a content-driven project. The most valuable contributions:

- **Add questions** to `data/questions.ts` — each question has: subject, topic, text, options, correct answer, explanation
- **Add past paper links** to `app/past-papers/page.tsx`
- **Add cutoff data** to `app/predictor/page.tsx`
- **Add mnemonics/notes** — coming soon

## Data Format

Questions follow this shape:

```ts
{
  id: 1,
  subject: 'math',        // 'math' | 'physics' | 'chemistry'
  topic: 'Calculus',
  text: 'Question text',
  options: ['A', 'B', 'C', 'D'],
  correct: 0,            // 0-indexed
  explanation: 'Why...'   // optional
}
```

## Roadmap

- [ ] Full question bank (500+ questions per subject)
- [ ] Question frequency heatmap
- [ ] Upcoming question predictor
- [ ] Notes per topic
- [ ] Mnemonics database
- [ ] Medical (IOM/CEE) version
- [ ] Community contributions via GitHub PRs

## License

MIT — free forever.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fharmless-beep%2Fbato)
