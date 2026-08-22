'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TopBar, useLang } from './components/ui'
import { Reveal, CountUp } from './components/reveal'

// ── User stats from localStorage ──────────────────────────────────────────────
function getStats() {
  if (typeof window === 'undefined') return { questions: 0, accuracy: 0, streak: 0 }
  return {
    questions: Number(localStorage.getItem('bato-questions') ?? 0),
    accuracy: Number(localStorage.getItem('bato-accuracy') ?? 0),
    streak: Number(localStorage.getItem('bato-streak') ?? 0),
  }
}

function saveStat(key: string, val: number) {
  localStorage.setItem(key, String(val))
}

// ── Quick-access items ───────────────────────────────────────────────────────
const quickItems = [
  { icon: '🖥️', label: 'CBT Simulator', labelNp: 'CBT सिम्युलेटर', href: '/mock-test', desc: 'IOE / KU / CEE exam-day CBT practice', descNp: 'IOE / KU / CEE परीक्षाको दिनको CBT अभ्यास' },
  { icon: '📖', label: 'Notes',          labelNp: 'नोट्स',           href: '/notes',       desc: 'High-yield Math, Physics & Chemistry',     descNp: 'High-yield गणित, भौतिक र रसायन' },
  { icon: '📚', label: 'Past Papers',    labelNp: 'पुराना पत्रहरू', href: '/past-papers', desc: 'IOE entrance & semester papers by year',   descNp: 'IOE entrance र semester प्रश्नपत्रहरू' },
  { icon: '🎯', label: 'Branch Predictor', labelNp: 'शाखा अनुमान', href: '/predictor',   desc: 'See which branches you can get',            descNp: 'कुन शाखा पाउन सकिन्छ हेर्नुहोस्' },
  { icon: '🗂️', label: 'Syllabus',       labelNp: 'पाठ्यक्रम',      href: '/syllabus',    desc: 'IOE & KU complete entrance syllabus',       descNp: 'IOE र KU को पूर्ण प्रवेश पाठ्यक्रम' },
  { icon: '🃏', label: 'Flashcards',     labelNp: 'फ्लैशकार्ड',     href: '/flashcards',  desc: 'Quick recall for formulas & concepts',     descNp: 'सूत्र र अवधारणाहरूको छिट्टै दोहोर्याउनुहोस्' },
  { icon: '🩺', label: 'Med Predictor',  labelNp: 'मेडिकल अनुमान',  href: '/med-predictor', desc: 'MECEE rank → medical colleges',           descNp: 'MECEE rank → मेडिकल कलेज' },
  { icon: '💼', label: 'Careers',         labelNp: 'करियर',          href: '/careers',       desc: 'Jobs, salaries & paths after degree',      descNp: 'डिग्री पछि जागिर, तलब र बाटो' },
]

// ── Latest news ─────────────────────────────────────────────────────────────
const news = [
  { tag: 'IOE',   tagNp: 'IOE',   date: '2083-04-15', dateNp: '१५ चैत २०८३', headline: 'IOE 2083 Registration Open',          headlineNp: 'IOE २०८३ दर्ता खुल्यो',         body: 'Applications for IOE 2083 entrance exam are now open. Last date: 2083 Chaitra end.',         bodyNp: 'IOE २०८३ को लागि दर्ता खुलेको छ। अन्तिम मिति: २०८३ चैत अन्त्य।' },
  { tag: 'KU',    tagNp: 'KU',    date: '2083-04-10', dateNp: '१० चैत २०८३', headline: 'KU KUCAT 2083 Schedule Announced',   headlineNp: 'KU KUCAT २०८३ तालिका घोषणा',   body: 'Kathmandu University KUCAT exam scheduled for 2083 Jestha first week.',                      bodyNp: 'काठमाडौं विश्वविद्यालय KUCAT परीक्षा २०८३ जेठ प्रथम साता।' },
  { tag: 'CEE',   tagNp: 'CEE',   date: '2083-03-28', dateNp: '२८ फागुन २०८३', headline: 'CEE 2083 Form Fill-up Ongoing',       headlineNp: 'CEE २०८३ फारम भर्ने जारी',     body: 'PU, TU and Pokhara University CEE forms available. Apply before deadline.',                   bodyNp: 'पीयू, टीयू र पोखरा विश्वविद्यालय CEE फारम उपलब्ध। म्यादभित्र आवेदन दिनुहोस्।' },
  { tag: 'NOTE',  tagNp: 'नोट',   date: '2083-04-01', dateNp: '१ बैशाख २०८३', headline: 'New Physics Notes Added',             headlineNp: 'नयाँ भौतिक नोट्स थपियो',         body: 'Unit, Dimension & Vector notes updated with 20 new practice problems.',                       bodyNp: 'एकाइ, मात्रा र सदिश नोट्समा २० नयाँ अभ्यास समस्याहरू थपियो।' },
]

// ── Top campuses ─────────────────────────────────────────────────────────────
const topCampuses = [
  { name: 'Pulchowk Campus',   nameNp: 'पुल्चोक क्याम्पस',   cutoff: 'Rank 27',       cutoffNp: 'रैंक २७',   program: 'Computer Eng.',  programNp: 'कम्प्युटर इन्जिनियरिङ', color: '#4f46e5' },
  { name: 'Thapathali Campus', nameNp: 'थपाथली क्याम्पस',   cutoff: 'Rank 75',       cutoffNp: 'रैंक ७५',   program: 'Computer Eng.',  programNp: 'कम्प्युटर इन्जिनियरिङ', color: '#7c3aed' },
  { name: 'WRC Pokhara',       nameNp: 'पश्चिमाञ्चल पोखरा', cutoff: 'Rank 164',      cutoffNp: 'रैंक १६४',  program: 'Computer Eng.',  programNp: 'कम्प्युटर इन्जिनियरिङ', color: '#0891b2' },
  { name: 'ERC Dharan',         nameNp: 'पूर्वाञ्चल धरान',   cutoff: 'Rank 384',      cutoffNp: 'रैंक ३८४',  program: 'Computer Eng.',  programNp: 'कम्प्युटर इन्जिनियरिङ', color: '#059669' },
  { name: 'Pulchowk Campus',   nameNp: 'पुल्चोक क्याम्पस',   cutoff: 'Rank 84',       cutoffNp: 'रैंक ८४',  program: 'Electronics',    programNp: 'इलेक्ट्रोनिक्स',         color: '#2563eb' },
]

// ── Top medical colleges (CEE 2082, compiled) ───────────────────────────────
const topMed = [
  { name: 'IOM, Maharajgunj',   type: 'Govt',   program: 'MBBS', cutoff: '~60',  color: '#059669' },
  { name: 'BPKIHS, Dharan',     type: 'Govt',   program: 'MBBS', cutoff: '~100', color: '#10b981' },
  { name: 'PAHS, Lalitpur',     type: 'Govt',   program: 'MBBS', cutoff: '~90',  color: '#14b8a6' },
  { name: 'KMC, Duwakot',       type: 'Private', program: 'MBBS', cutoff: '~200', color: '#f59e0b' },
  { name: 'Manipal, Pokhara',   type: 'Private', program: 'MBBS', cutoff: '~300', color: '#f97316' },
]

export default function Home() {
  const { t, lang } = useLang()
  const isNe = lang === 'ne'

  const [stats, setStats] = useState({ questions: 0, accuracy: 0, streak: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setStats(getStats())
    setMounted(true)
  }, [])

  // demo: seed some data on first visit so counters look alive
  useEffect(() => {
    if (!mounted) return
    if (!localStorage.getItem('bato-seeded')) {
      saveStat('bato-questions', 847)
      saveStat('bato-accuracy', 72)
      saveStat('bato-streak', 12)
      localStorage.setItem('bato-seeded', '1')
      setStats({ questions: 847, accuracy: 72, streak: 12 })
    }
  }, [mounted])

  return (
    <div>
      <TopBar />

      {/* ── Countdown Banners ───────────────────────────────────────── */}
      <div className="countdown-banner" style={{ background: 'linear-gradient(135deg, #1e1b4b, #4f46e5)' }}>
        <div className="countdown-inner">
          <span className="countdown-icon">🏗️</span>
          <span className="countdown-label">
            {isNe ? 'IOE 2083 प्रवेश परीक्षा:' : 'IOE 2083 Entrance Exam:'}
          </span>
          <span className="countdown-days">~198 {isNe ? 'दिन बाँकी' : 'days left'}</span>
          <span className="countdown-date">{isNe ? '〜 भदौ २०८३' : '~ Bhadra 2083'}</span>
          <Link href="/mock-test" className="countdown-cta">
            {isNe ? 'CBT अभ्यास सुरु →' : 'Start CBT Practice →'}
          </Link>
        </div>
      </div>
      <div className="countdown-banner" style={{ background: 'linear-gradient(135deg, #064e3b, #059669)' }}>
        <div className="countdown-inner">
          <span className="countdown-icon">🩺</span>
          <span className="countdown-label">
            {isNe ? 'CEE 2083 (MECEE-BL) परीक्षा:' : 'CEE 2083 (MECEE-BL) Exam:'}
          </span>
          <span className="countdown-days">~55 {isNe ? 'दिन बाँकी' : 'days left'}</span>
          <span className="countdown-date">{isNe ? '~ असोज २०८३' : '~ Ashoj 2083'}</span>
          <Link href="/med-predictor" className="countdown-cta">
            {isNe ? 'मेडिकल हेर्नुहोस् →' : 'Check Medical →'}
          </Link>
        </div>
      </div>

      {/* ── Dashboard body ───────────────────────────────────────────── */}
      <div className="dashboard">

        {/* ── My Stats ────────────────────────────────────────────────── */}
        <Reveal>
          <div className="section-header">
            <div className="section-title">{isNe ? 'मेरो तथ्यांक' : 'My Stats'}</div>
          </div>
        </Reveal>
        <div className="stats-row">
          <div className="stat-tile">
            <div className="stat-tile-icon">📝</div>
            <div className="stat-tile-num">
              {mounted ? <CountUp to={stats.questions} /> : '—'}
            </div>
            <div className="stat-tile-label">{isNe ? 'प्रश्न हल गरिएको' : 'Questions Answered'}</div>
          </div>
          <div className="stat-tile">
            <div className="stat-tile-icon">🎯</div>
            <div className="stat-tile-num">
              {mounted ? <CountUp to={stats.accuracy} /> : '—'}%
            </div>
            <div className="stat-tile-label">{isNe ? 'सही प्रतिशत' : 'Accuracy'}</div>
          </div>
          <div className="stat-tile">
            <div className="stat-tile-icon">🔥</div>
            <div className="stat-tile-num">
              {mounted ? <CountUp to={stats.streak} /> : '—'}
            </div>
            <div className="stat-tile-label">{isNe ? 'दिनको लगातार' : 'Day Streak'}</div>
          </div>
        </div>

        {/* ── Quick Access ────────────────────────────────────────────── */}
        <Reveal delay={80}>
          <div className="section-header" style={{ marginTop: 32 }}>
            <div className="section-title">{isNe ? 'छिटो पहुँच' : 'Quick Access'}</div>
          </div>
        </Reveal>
        <div className="quick-grid">
          {quickItems.map((item, i) => (
            <Reveal key={item.href} delay={i * 50}>
              <Link href={item.href} className="quick-card">
                <div className="quick-icon">{item.icon}</div>
                <div className="quick-name">{isNe ? item.labelNp : item.label}</div>
                <div className="quick-desc">{isNe ? item.descNp : item.desc}</div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* ── Two-column: News + Colleges ─────────────────────────────── */}
        <div className="two-col">
          {/* Latest Updates */}
          <Reveal delay={100}>
            <div className="col-full">
              <div className="section-header" style={{ marginTop: 32 }}>
                <div className="section-title">{isNe ? 'ताजा अपडेट' : 'Latest Updates'}</div>
              </div>
              <div className="news-list">
                {news.map((n, i) => (
                  <div key={i} className="news-item">
                    <div className="news-top">
                      <span className={`news-tag news-tag-${n.tag.toLowerCase()}`}>{isNe ? n.tagNp : n.tag}</span>
                      <span className="news-date">{isNe ? n.dateNp : n.date}</span>
                    </div>
                    <div className="news-headline">{isNe ? n.headlineNp : n.headline}</div>
                    <div className="news-body">{isNe ? n.bodyNp : n.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Top Colleges */}
          <Reveal delay={160}>
            <div className="col-full">
              <div className="section-header" style={{ marginTop: 32 }}>
                <div className="section-title">{isNe ? 'शीर्ष क्याम्पसहरू (IOE 2082)' : 'Top IOE Campuses (2082 Cutoffs)'}</div>
              </div>
              <div className="college-list">
                {topCampuses.map((c, i) => (
                  <div key={i} className="college-item">
                    <div className="college-rank" style={{ background: c.color }}>
                      #{i + 1}
                    </div>
                    <div className="college-info">
                      <div className="college-name">{isNe ? c.nameNp : c.name}</div>
                      <div className="college-program">{isNe ? c.programNp : c.program}</div>
                    </div>
                    <div className="college-cutoff">
                      <div className="college-cutoff-num">{isNe ? c.cutoffNp : c.cutoff}</div>
                      <div className="college-cutoff-label">{isNe ? 'रैंक' : 'Rank'}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/predictor" className="btn btn-outline btn-sm" style={{ marginTop: 14, display: 'inline-flex' }}>
                {isNe ? 'सबै क्याम्पस हेर्नुहोस् →' : 'View All Campuses →'}
              </Link>
            </div>
          </Reveal>

          {/* Top Medical Colleges */}
          <Reveal delay={200}>
            <div className="col-full">
              <div className="section-header" style={{ marginTop: 32 }}>
                <div className="section-title">{isNe ? 'शीर्ष मेडिकल कलेजहरू (CEE 2082)' : 'Top Medical Colleges (CEE 2082)'}</div>
              </div>
              <div className="college-list">
                {topMed.map((c, i) => (
                  <div key={i} className="college-item">
                    <div className="college-rank" style={{ background: c.color }}>
                      #{i + 1}
                    </div>
                    <div className="college-info">
                      <div className="college-name">{c.name}</div>
                      <div className="college-program">{c.program} • {c.type}</div>
                    </div>
                    <div className="college-cutoff">
                      <div className="college-cutoff-num">{c.cutoff}</div>
                      <div className="college-cutoff-label">{isNe ? 'रैंक' : 'Rank'}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/med-predictor" className="btn btn-outline btn-sm" style={{ marginTop: 14, display: 'inline-flex' }}>
                {isNe ? 'मेडिकल Predictor हेर्नुहोस् →' : 'Try Med Predictor →'}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── Contribute CTA ────────────────────────────────────────────── */}
        <Reveal delay={200}>
          <div className="contribute-section">
            <div className="contribute-icon">🤝</div>
            <div className="contribute-body">
              <div className="contribute-title">
                {isNe ? 'नोट्स राख्नुहोस्, मद्दत गर्नुहोस्!' : 'Have notes to share?'}
              </div>
              <div className="contribute-sub">
                {isNe
                  ? 'तपाईंको संक्षिप्त नोट्स, formulas, र summaries अरू विद्यार्थीहरूसँग share गर्नुहोस्। सबै निःशुल्क।'
                  : 'Share your concise notes, formulas, and summaries with fellow students. Totally free.'}
              </div>
            </div>
            <Link href="/contribute" className="btn btn-gold btn-sm">
              {isNe ? 'नोट्स share गर्नुहोस् 📤' : 'Share Notes 📤'}
            </Link>
          </div>
        </Reveal>

      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="footer">
        <p>{t('footer1')} — <a href="https://github.com" target="_blank" rel="noopener">GitHub</a></p>
        <p style={{ marginTop: 6, color: '#94a3b8' }}>{t('footer2')}</p>
      </footer>

      <style jsx>{`
        /* ── Countdown banner ── */
        .countdown-banner {
          background: linear-gradient(90deg, #1e1b4b, #4f46e5);
          color: white;
          padding: 12px 16px;
        }
        .countdown-inner {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .countdown-icon { font-size: 18px; }
        .countdown-label { font-size: 14px; opacity: 0.9; }
        .countdown-days {
          font-size: 18px;
          font-weight: 800;
          background: rgba(255,255,255,0.15);
          padding: 2px 12px;
          border-radius: 999px;
        }
        .countdown-date { font-size: 12px; opacity: 0.7; }
        .countdown-cta {
          margin-left: auto;
          background: var(--gold);
          color: white;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .countdown-cta:hover { background: #d97706; }

        /* ── Dashboard layout ── */
        .dashboard {
          max-width: 800px;
          margin: 0 auto;
          padding: 24px 16px 40px;
        }

        /* ── Stats row ── */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 12px;
        }
        .stat-tile {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          box-shadow: var(--shadow);
        }
        .stat-tile-icon { font-size: 24px; }
        .stat-tile-num {
          font-size: 26px;
          font-weight: 800;
          color: var(--primary);
          font-variant-numeric: tabular-nums;
        }
        .stat-tile-label {
          font-size: 11px;
          color: var(--muted);
          text-align: center;
          font-weight: 600;
        }

        /* ── Quick access grid ── */
        .quick-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 12px;
        }
        .quick-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: var(--shadow);
          transition: transform 0.15s, box-shadow 0.15s;
          cursor: pointer;
        }
        .quick-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
        .quick-icon { font-size: 28px; }
        .quick-name { font-size: 14px; font-weight: 800; color: var(--text); }
        .quick-desc { font-size: 11px; color: var(--muted); line-height: 1.5; }

        /* ── Two-col news / colleges ── */
        .two-col { display: flex; flex-direction: column; gap: 0; }
        .col-full { width: 100%; }

        /* ── News ── */
        .news-list { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; }
        .news-item {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 14px 16px;
          box-shadow: var(--shadow);
        }
        .news-top { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .news-tag {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 999px;
          letter-spacing: 0.4px;
        }
        .news-tag-ioe  { background: #eef2ff; color: #4338ca; }
        .news-tag-ku   { background: #f0fdf4; color: #15803d; }
        .news-tag-cee  { background: #fffbeb; color: #b45309; }
        .news-tag-note { background: #fdf2f8; color: #be185d; }
        .news-date { font-size: 10px; color: var(--muted); margin-left: auto; }
        .news-headline { font-size: 14px; font-weight: 800; color: var(--text); margin-bottom: 4px; }
        .news-body { font-size: 12px; color: var(--muted); line-height: 1.5; }

        /* ── Colleges ── */
        .college-list { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
        .college-item {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow);
        }
        .college-rank {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800;
          color: white;
          flex-shrink: 0;
        }
        .college-info { flex: 1; }
        .college-name { font-size: 14px; font-weight: 800; color: var(--text); }
        .college-program { font-size: 11px; color: var(--muted); }
        .college-cutoff { text-align: right; flex-shrink: 0; }
        .college-cutoff-num { font-size: 15px; font-weight: 800; color: var(--primary); }
        .college-cutoff-label { font-size: 10px; color: var(--muted); }

        /* ── Contribute ── */
        .contribute-section {
          background: linear-gradient(135deg, #fef3c7, #fffbeb);
          border: 1px solid #fde68a;
          border-radius: var(--radius);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 28px;
        }
        html[data-theme="dark"] .contribute-section {
          background: linear-gradient(135deg, #2a2010, #1a1508);
          border-color: #78350f;
        }
        .contribute-icon { font-size: 36px; flex-shrink: 0; }
        .contribute-body { flex: 1; }
        .contribute-title { font-size: 16px; font-weight: 800; color: #78350f; }
        html[data-theme="dark"] .contribute-title { color: #fde68a; }
        .contribute-sub { font-size: 12px; color: #92400e; margin-top: 4px; line-height: 1.5; }
        html[data-theme="dark"] .contribute-sub { color: #a16207; }

        @media (max-width: 500px) {
          .stats-row { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .stat-tile { padding: 14px 8px; }
          .stat-tile-num { font-size: 20px; }
          .quick-grid { grid-template-columns: repeat(2, 1fr); }
          .countdown-inner { gap: 6px; }
          .countdown-cta { margin-left: 0; }
        }
      `}</style>
    </div>
  )
}
