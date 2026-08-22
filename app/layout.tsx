import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from './components/ui'
import EasterEggs from './components/easter-eggs'
import Companion from './components/companion'
import SuggestFab from './components/suggest-fab'

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
        <link rel="manifest" href="/bato/manifest.webmanifest" />
        <link rel="icon" href="/bato/icon-192.png" />
        <meta name="theme-color" content="#0f1117" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('bato-theme');if(t==='light'||t==='dark'||t==='forest'||t==='ocean')document.documentElement.dataset.theme=t;else if(!t&&matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.dataset.theme='dark'}catch(e){}` }} />
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){addEventListener('load',function(){navigator.serviceWorker.register('/bato/sw.js').catch(function(){})})}` }} />
      </head>
      <body>
        <LangProvider>
          {children}
          <EasterEggs />
          <Companion />
          <SuggestFab />
        </LangProvider>
      </body>
    </html>
  )
}
