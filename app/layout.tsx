import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from './components/ui'
import MouseFX from './components/mousefx-wrapper'

export const metadata: Metadata = {
  title: 'बाटो — IOE/KU Engineering Prep',
  description: 'Free IOE & KU engineering entrance prep: mock tests, past papers, branch predictor. निःशुल्क प्रवेश परीक्षा तयारी।',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ne">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800&display=swap" rel="stylesheet"/>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('bato-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.dataset.theme='dark'}catch(e){}` }} />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
        <MouseFX />
      </body>
    </html>
  )
}
