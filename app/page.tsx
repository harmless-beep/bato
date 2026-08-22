'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TopBar, useLang } from './components/ui'
import { Reveal, CountUp } from './components/reveal'

// ── Daily motivational quotes ────────────────────────────────────────────────
const quotes = [
  { en: '"The expert in anything was once a beginner."', ne: '"हरेक विज्ञ कहिल्यै सुरुवातकर्ता थिए।"', by: 'Helen Hayes', byNp: 'हेलेन हेज' },
  { en: '"Success is the sum of small efforts, repeated day in and day out."', ne: '"सफलता भनेको साना प्रयासहरूको योग हो, दिनहुँ दोहोर्याइएको।"', by: 'Robert Collier', byNp: 'रोबर्ट कोलियर' },
  { en: '"Don\'t watch the clock; do what it does. Keep going."', ne: '"घडी नहेर्नुहोस्; घडीले जे गर्छ त्यही गर्नुहोस्। अगाडि बढिरहनुहोस्।"', by: 'Sam Levenson', byNp: 'साम लेभेन्सन' },
  { en: '"The harder you work for something, the greater you\'ll feel when you achieve it."', ne: '"जति मेहनत गर्नुहुन्छ, उपलब्धि त्यति नै ठूलो लाग्छ।"', by: 'Anonymous', byNp: 'अनाम' },
  { en: '"Dream big. Start small. Act now."', ne: '"ठूलो सपना। सानो सुरुवात। अहिले नै काम।"', by: 'Robin Sharma', byNp: 'रोबिन शर्मा' },
  { en: '"It always seems impossible until it\'s done."', ne: '"सकिएपछि मात्र सम्भव लाग्छ।"', by: 'Nelson Mandela', byNp: 'नेल्सन मन्डेला' },
  { en: '"Push yourself, because no one else is going to do it for you."', ne: '"आफैलाई धकेल्नुहोस्, किनकि अरू कसैले तपाईंको लागि गर्दैन।"', by: 'Anonymous', byNp: 'अनाम' },
  { en: '"Your only limit is your mind."', ne: '"तपाईंको एक मात्र सीमा तपाईंको दिमाग हो।"', by: 'Anonymous', byNp: 'अनाम' },
  { en: '"Study while others are sleeping; work while others are loafing."', ne: '"अरू सुत्दा पढ्नुहोस्; अरू अल्छी गर्दा काम गर्नुहोस्।"', by: 'William A. Ward', byNp: 'विलियम वार्ड' },
  { en: '"The secret of getting ahead is getting started."', ne: '"अगाडि बढ्ने रहस्य भनेको सुरु गर्नु हो।"', by: 'Mark Twain', byNp: 'मार्क ट्वेन' },
  { en: '"Believe you can and you\'re halfway there."', ne: '"तपाईं सक्नुहुन्छ भन्ने विश्वास नै आधा बाटो हो।"', by: 'Theodore Roosevelt', byNp: 'थियोडोर रुजवेल्ट' },
  { en: '"Small daily improvements are the key to staggering long-term results."', ne: '"दैनिक साना सुधारहरू नै ठूलो दीर्घकालीन नतिजाको कुञ्जी हुन्।"', by: 'Anonymous', byNp: 'अनाम' },
]

function todayQuote() {
  const day = Math.floor(Date.now() / 86400000)
  return quotes[day % quotes.length]
}
function getStats() {
  if (typeof window === 'undefined') return { questions: 0, accuracy: 0, streak: 0, days: [] as string[] }
  const questions = Number(localStorage.getItem('bato-questions') ?? 0)
  const accuracy = Number(localStorage.getItem('bato-accuracy') ?? 0)
  let streak = 0
  let days: string[] = []
  try { days = JSON.parse(localStorage.getItem('bato-days') ?? '[]') } catch {}
  if (days.length) {
    const daySet = new Set(days)
    const today = localDay(new Date())
    // if today not studied yet, start counting from yesterday
    let cursor = new Date()
    if (!daySet.has(today)) cursor.setDate(cursor.getDate() - 1)
    while (daySet.has(localDay(cursor))) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    }
  }
  return { questions, accuracy, streak, days }
}

// Local YYYY-MM-DD (avoids UTC offset shifting study days in Nepal, UTC+5:45)
function localDay(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// ── Quick-access items ───────────────────────────────────────────────────────
const quickItems = [
  { icon: '🖥️', label: 'CBT Simulator', labelNp: 'CBT सिम्युलेटर', href: '/mock-test', desc: 'IOE / KU / CEE exam-day CBT practice', descNp: 'IOE / KU / CEE परीक्षाको दिनको CBT अभ्यास' },
  { icon: '🃏', label: 'Flashcards',     labelNp: 'फ्लैशकार्ड',     href: '/flashcards',  desc: '100K+ cards for IOE, KU & CEE',            descNp: 'IOE, KU र CEE का १ लाख+ कार्ड' },
  { icon: '🎯', label: 'Branch Predictor', labelNp: 'शाखा अनुमान', href: '/predictor',   desc: 'See which branches you can get',            descNp: 'कुन शाखा पाउन सकिन्छ हेर्नुहोस्' },
  { icon: '🗂️', label: 'Syllabus',       labelNp: 'पाठ्यक्रम',      href: '/syllabus',    desc: 'IOE, KU & CEE exam patterns + PDFs',        descNp: 'IOE, KU र CEE परीक्षा ढाँचा + PDF' },
  { icon: '🩺', label: 'Med Predictor',  labelNp: 'मेडिकल अनुमान',  href: '/med-predictor', desc: 'MECEE rank → medical colleges',           descNp: 'MECEE rank → मेडिकल कलेज' },
  { icon: '💼', label: 'Careers',         labelNp: 'करियर',          href: '/careers',       desc: 'Jobs, salaries & paths after degree',      descNp: 'डिग्री पछि जागिर, तलब र बाटो' },
]

// ── Latest news ─────────────────────────────────────────────────────────────
const news = [
  { tag: 'IOE',   tagNp: 'IOE',   date: '2083-04-15', dateNp: '१५ चैत २०८३', headline: 'IOE 2083 Registration Open',          headlineNp: 'IOE २०८३ दर्ता खुल्यो',         body: 'Applications for IOE 2083 entrance exam are now open. Last date: 2083 Chaitra end.',         bodyNp: 'IOE २०८३ को लागि दर्ता खुलेको छ। अन्तिम मिति: २०८३ चैत अन्त्य।' },
  { tag: 'KU',    tagNp: 'KU',    date: '2083-04-10', dateNp: '१० चैत २०८३', headline: 'KU KUCAT 2083 Schedule Announced',   headlineNp: 'KU KUCAT २०८३ तालिका घोषणा',   body: 'Kathmandu University KUCAT exam scheduled for 2083 Jestha first week.',                      bodyNp: 'काठमाडौं विश्वविद्यालय KUCAT परीक्षा २०८३ जेठ प्रथम साता।' },
  { tag: 'CEE',   tagNp: 'CEE',   date: '2083-03-28', dateNp: '२८ फागुन २०८३', headline: 'CEE 2083 Form Fill-up Ongoing',       headlineNp: 'CEE २०८३ फारम भर्ने जारी',     body: 'PU, TU and Pokhara University CEE forms available. Apply before deadline.',                   bodyNp: 'पीयू, टीयू र पोखरा विश्वविद्यालय CEE फारम उपलब्ध। म्यादभित्र आवेदन दिनुहोस्।' },
  { tag: 'FC',    tagNp: 'कार्ड',   date: '2083-04-01', dateNp: '१ बैशाख २०८३', headline: 'Flashcards: 1,000+ facts & formulas',    headlineNp: 'फ्लैशकार्ड: १०००+ तथ्य र सूत्र',         body: 'New formula & fact cards for IOE, KU & CEE — separated by exam.',                       bodyNp: 'IOE, KU र CEE का नयाँ सूत्र र तथ्य कार्डहरू — परीक्षा अनुसार।' },
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
  const { lang } = useLang()
  const isNe = lang === 'ne'

  const [stats, setStats] = useState({ questions: 0, accuracy: 0, streak: 0, days: [] as string[] })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setStats(getStats())
    setMounted(true)
  }, [])

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

        {/* ── Hero grid: quote | stats+calendar ────────────────────────── */}
        <div className="hero-grid">
          <div>
            {/* ── Daily Quote ─────────────────────────────────────────────── */}
            <Reveal>
              <div className="quote-card">
                <div className="quote-mark">“</div>
                <div className="quote-text" key={todayQuote().en}>
                  {isNe ? todayQuote().ne : todayQuote().en}
                </div>
                <div className="quote-by">— {isNe ? todayQuote().byNp : todayQuote().by}</div>
              </div>
            </Reveal>
          </div>
          <div className="hero-side">
            {/* ── My Stats ──────────────────────────────────────────────── */}
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

        {/* ── Streak calendar (last 7 weeks) ─────────────────────────── */}
        {mounted && (
          <Reveal>
            <div className="card" style={{ padding: 14, marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text)' }}>
                  📅 {isNe ? 'पढाइ क्यालेन्डर' : 'Study Calendar'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>
                  {stats.days.length} {isNe ? 'दिन' : 'days'}
                </div>
              </div>
              {(() => {
                const daySet = new Set(stats.days)
                let cur = new Date()
                cur.setHours(0, 0, 0, 0)
                const start = new Date(cur)
                start.setDate(start.getDate() - 41) // 6 weeks back
                const anchor = new Date(start)
                anchor.setDate(anchor.getDate() - anchor.getDay()) // back to Sunday
                const cells: { date: Date; inRange: boolean }[] = []
                for (let i = 0; i < 49; i++) {
                  const d = new Date(anchor)
                  d.setDate(anchor.getDate() + i)
                  cells.push({ date: d, inRange: d >= start && d <= cur })
                }
                return (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i} style={{ fontSize: 9, fontWeight: 800, color: 'var(--muted)', textAlign: 'center' }}>{d}</div>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                      {cells.map((c, i) => {
                        const key = localDay(c.date)
                        const studied = daySet.has(key)
                        const isToday = key === localDay(new Date())
                        return (
                          <div
                            key={i}
                            title={key}
                            style={{
                              aspectRatio: '1', borderRadius: 6,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 10, fontWeight: 700,
                              background: studied ? 'var(--primary)' : c.inRange ? 'var(--card)' : 'transparent',
                              color: studied ? '#fff' : 'var(--muted)',
                              border: isToday ? '2px solid var(--gold, #f59e0b)' : c.inRange ? '1px solid var(--border)' : 'none',
                              opacity: c.inRange ? 1 : 0,
                            }}
                          >
                            {c.inRange ? c.date.getDate() : ''}
                          </div>
                        )
                      })}
                    </div>
                    <div style={{ display: 'flex', gap: 14, marginTop: 10, fontSize: 10.5, color: 'var(--muted)', fontWeight: 600, flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--primary)', display: 'inline-block' }} />
                        {isNe ? 'पढिएको दिन' : 'Studied'}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 3, border: '2px solid var(--gold, #f59e0b)', display: 'inline-block' }} />
                        {isNe ? 'आज' : 'Today'}
                      </span>
                      {stats.days.length === 0 && (
                        <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                          💡 {isNe ? 'Mock test दिनुहोस् — यहाँ बल्न थाल्छ।' : 'Complete a mock test — this lights up.'}
                        </span>
                      )}
                    </div>
                  </>
                )
              })()}
            </div>
          </Reveal>
        )}
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

      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-divider" />
        <div className="footer-tagline">
          {isNe ? 'नेपालका भावी इन्जिनियर र डाक्टरहरूका लागि' : 'For Nepal\u2019s future engineers & doctors'}
        </div>
        <div className="footer-heart">
          <span className="heart-emoji">❤️</span>
        </div>
        <p className="footer-note">
          {isNe ? 'बाटो — निःशुल्क, सबैका लागि।' : 'बाटो — free, for everyone.'}
        </p>
      </footer>

      
    </div>
  )
}
