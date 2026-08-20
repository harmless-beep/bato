'use client'

import Link from 'next/link'
import { TopBar, useLang } from './components/ui'

export default function Home() {
  const { t, lang } = useLang()
  const isNe = lang === 'ne'

  return (
    <div>
      <TopBar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-title">
          {t('heroTitle1')}<br/>
          <span className="grad">{t('heroTitle2')}</span>
        </div>
        <p className="hero-sub">{t('heroSub')}</p>
        <div className="hero-badges">
          <span className="hero-badge">{t('badgeFree')}</span>
          <span className="hero-badge">{t('badgeMock')}</span>
          <span className="hero-badge">{t('badgePast')}</span>
          <span className="hero-badge">{t('badgePredictor')}</span>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="section-header">
          <div className="section-title">{t('featuresTitle')}</div>
          <div className="section-sub">{t('featuresSub')}</div>
        </div>

        <div className="features-grid">
          <Link href="/mock-test" className="feature-card">
            <div className="feature-icon">📝</div>
            <div className="feature-name">{t('mockName')}</div>
            <div className="feature-desc">{t('mockDesc')}</div>
            <div><span className="tag">{t('mockTags')}</span></div>
          </Link>

          <Link href="/predictor" className="feature-card">
            <div className="feature-icon">🎯</div>
            <div className="feature-name">{t('predName')}</div>
            <div className="feature-desc">{t('predDesc')}</div>
            <div><span className="tag">🏛️ {t('predTag')}</span></div>
          </Link>

          <Link href="/past-papers" className="feature-card">
            <div className="feature-icon">📚</div>
            <div className="feature-name">{t('pastName')}</div>
            <div className="feature-desc">{t('pastDesc')}</div>
            <div><span className="tag">{t('pastTag')}</span></div>
          </Link>
        </div>

        <hr className="divider"/>

        <div className="info-box">
          <strong>📌 {isNe ? 'अहिले:' : 'Currently:'}</strong> {isNe
            ? 'Engineering (IOE) का लागि मात्र।'
            : 'Engineering (IOE) only.'} {t('comingSoon')}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>{t('footer1')} — <a href="https://github.com" target="_blank" rel="noopener">GitHub</a></p>
        <p style={{ marginTop: 6, color: '#94a3b8' }}>{t('footer2')}</p>
      </footer>
    </div>
  )
}
