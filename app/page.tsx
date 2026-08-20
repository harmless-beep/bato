'use client'

import Link from 'next/link'
import { TopBar, useLang } from './components/ui'
import { Reveal, CountUp } from './components/reveal'

export default function Home() {
  const { t, lang } = useLang()
  const isNe = lang === 'ne'

  return (
    <div>
      <TopBar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-title hero-anim">
          {t('heroTitle1')}<br/>
          <span className="grad">{t('heroTitle2')}</span>
        </div>
        <p className="hero-sub hero-anim" style={{ animationDelay: '0.15s' }}>{t('heroSub')}</p>
        <div className="hero-badges hero-anim" style={{ animationDelay: '0.3s' }}>
          <span className="hero-badge">{t('badgeFree')}</span>
          <span className="hero-badge">{t('badgeMock')}</span>
          <span className="hero-badge">{t('badgePast')}</span>
          <span className="hero-badge">{t('badgePredictor')}</span>
        </div>

        {/* Stats bar */}
        <div className="stats-bar hero-anim" style={{ animationDelay: '0.45s' }}>
          <div className="stat">
            <span className="stat-big"><CountUp to={15} />+</span>
            <span className="stat-small">{isNe ? 'प्रश्न' : 'questions'}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-big"><CountUp to={15} /></span>
            <span className="stat-small">{isNe ? 'branches' : 'branches'}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-big"><CountUp to={21} /></span>
            <span className="stat-small">{isNe ? 'past papers' : 'past papers'}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-big"><CountUp to={4} /></span>
            <span className="stat-small">{isNe ? 'topics' : 'topics'}</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <Reveal>
          <div className="section-header">
            <div className="section-title">{t('featuresTitle')}</div>
            <div className="section-sub">{t('featuresSub')}</div>
          </div>
        </Reveal>

        <div className="features-grid">
          <Reveal delay={0}>
            <Link href="/mock-test" className="feature-card">
              <div className="feature-icon">📝</div>
              <div className="feature-name">{t('mockName')}</div>
              <div className="feature-desc">{t('mockDesc')}</div>
              <div><span className="tag">{t('mockTags')}</span></div>
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <Link href="/predictor" className="feature-card">
              <div className="feature-icon">🎯</div>
              <div className="feature-name">{t('predName')}</div>
              <div className="feature-desc">{t('predDesc')}</div>
              <div><span className="tag">🏛️ {t('predTag')}</span></div>
            </Link>
          </Reveal>

          <Reveal delay={160}>
            <Link href="/past-papers" className="feature-card">
              <div className="feature-icon">📚</div>
              <div className="feature-name">{t('pastName')}</div>
              <div className="feature-desc">{t('pastDesc')}</div>
              <div><span className="tag">{t('pastTag')}</span></div>
            </Link>
          </Reveal>

          <Reveal delay={240}>
            <Link href="/notes" className="feature-card">
              <div className="feature-icon">📖</div>
              <div className="feature-name">{isNe ? 'Notes' : 'Notes'}</div>
              <div className="feature-desc">
                {isNe
                  ? 'गणित, भौतिक र रसायनका संक्षिप्त, high-yield नोटहरू — formulas र mnemonics सहित।'
                  : 'Concise high-yield notes for Math, Physics & Chemistry — formulas and mnemonics included.'}
              </div>
              <div><span className="tag">📐 ⚛️ 🧪</span></div>
            </Link>
          </Reveal>
        </div>

        <hr className="divider"/>

        <Reveal>
          <div className="info-box">
            <strong>📌 {isNe ? 'अहिले:' : 'Currently:'}</strong> {isNe
              ? 'Engineering (IOE) का लागि मात्र।'
              : 'Engineering (IOE) only.'} {t('comingSoon')}
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>{t('footer1')} — <a href="https://github.com" target="_blank" rel="noopener">GitHub</a></p>
        <p style={{ marginTop: 6, color: '#94a3b8' }}>{t('footer2')}</p>
      </footer>
    </div>
  )
}
