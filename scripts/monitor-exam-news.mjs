#!/usr/bin/env node
// Monitor exam news from IOE, MECEE-BL, KU, KUSMS — saves to app/data/exam-news.json
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '../app/data/exam-news.json')

const SOURCES = [
  {
    name: 'IOE',
    url: 'https://ioe.tu.edu.np/notices',
    // Extract: <a href="/notices/NUMBER">title</a> followed by date
    titleRe: /<a href="\/notices\/(\d+)">([^<]+)<\/a>/g,
    dateRe: /(\d{4}-\d{2}-\d{2})/,
    base: 'https://ioe.tu.edu.np',
  },
  {
    name: 'MECEE',
    url: 'https://entrance.mec.gov.np',
    // Table rows: <td>...title... </td> <td>date</td>
    titleRe: /<td[^>]*>([^<]{10,150})<\/td>\s*<td[^>]*>(\d+\/\d+\/\d+)/g,
    dateRe: /(\d{1,2}\/\d{1,2}\/\d{4})/,
    base: 'https://entrance.mec.gov.np',
  },
  {
    name: 'KU',
    url: 'https://ku.edu.np',
    // Notices in the sidebar: <a href="/notice/NUMBER">Title</a>
    titleRe: /<a href="(\/notice\/[^"]+)">([^<]{10,200})<\/a>/g,
    dateRe: /(\d{4}-\d{2}-\d{2})/,
    base: 'https://ku.edu.np',
  },
  {
    name: 'KUSMS',
    url: 'https://ku.edu.np/schools/kusms',
    // Same pattern as KU
    titleRe: /<a href="(\/notice\/[^"]+)">([^<]{10,200})<\/a>/g,
    dateRe: /(\d{4}-\d{2}-\d{2})/,
    base: 'https://ku.edu.np',
  },
]

async function scrapePage(src) {
  const res = await fetch(src.url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BatoNewsMonitor/1.0)' },
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) return []
  const html = await res.text()

  // ponytail: naive regex extraction — good enough for structured HTML tables
  const entries = []
  let m

  src.titleRe.lastIndex = 0
  while ((m = src.titleRe.exec(html)) !== null) {
    const url = m[1].startsWith('http') ? m[1] : src.base + m[1]
    const title = m[2].replace(/<[^>]+>/g, '').trim()
    if (title.length < 8) continue
    // Find nearest date before or after
    const before = html.slice(Math.max(0, src.titleRe.lastIndex - 200), src.titleRe.lastIndex)
    const after = html.slice(src.titleRe.lastIndex, src.titleRe.lastIndex + 200)
    const dateMatch = [...before.matchAll(src.dateRe), ...after.matchAll(src.dateRe)]
    const date = dateMatch[0] ? dateMatch[0][1] : new Date().toISOString().slice(0, 10)
    entries.push({ source: src.name, title, url, date, scrapedAt: new Date().toISOString() })
    if (entries.length >= 5) break
  }

  return entries
}

async function main() {
  const all = []
  for (const src of SOURCES) {
    try {
      const entries = await scrapePage(src)
      all.push(...entries)
    } catch (e) {
      console.warn(`[${src.name}] scrape failed: ${e.message}`)
    }
  }

  // Deduplicate by title
  const seen = new Set()
  const unique = all.filter(e => {
    const key = e.title.toLowerCase().replace(/\s+/g, ' ').trim()
    if (seen.has(key)) return false
    seen.add(key); return true
  })

  // Sort by date desc, keep top 10
  unique.sort((a, b) => b.date.localeCompare(a.date))
  const top = unique.slice(0, 10)

  writeFileSync(OUT, JSON.stringify(top, null, 2))
  console.log(`[monitor] scraped ${top.length} entries → ${OUT}`)
}

main().catch(console.error)
