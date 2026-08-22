"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { flashcards, flashExams } from "@/data/flashcards"
import { useLang } from "../components/ui"

export default function Flashcards() {
  const { lang } = useLang()
  const isNe = lang === "ne"
  const L = (en: string, ne: string) => (isNe ? ne : en)

  const [exam, setExam] = useState<"All" | "IOE" | "KU" | "CEE">("All")
  const [subject, setSubject] = useState<string>("All")
  const [sub, setSub] = useState<string>("All")
  const [query, setQuery] = useState("")
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<string[]>(() => {
    if (typeof window === "undefined") return []
    try { return JSON.parse(localStorage.getItem("bato-known") || "[]") } catch { return [] }
  })

  const deck = useMemo(() => {
    const q = query.trim().toLowerCase()
    return flashcards.filter(c => {
      if (exam !== "All" && c.exam !== exam && c.exam !== "All") return false
      if (subject !== "All" && c.subject !== subject) return false
      if (sub !== "All" && c.sub !== sub) return false
      if (q && !c.front.toLowerCase().includes(q) && !c.back.toLowerCase().includes(q) && !c.topic.toLowerCase().includes(q)) return false
      return true
    })
  }, [exam, subject, sub, query])

  // Subject list for this exam
  const subjects = useMemo(() => {
    const s = new Set<string>()
    for (const c of flashcards) {
      if (exam !== "All" && c.exam !== exam && c.exam !== "All") continue
      s.add(c.subject)
    }
    return ["All", ...Array.from(s).sort()]
  }, [exam])

  // Sub list for this subject
  const subs = useMemo(() => {
    if (subject === "All") return ["All"]
    const s = new Set<string>()
    for (const c of flashcards) {
      if (exam !== "All" && c.exam !== exam && c.exam !== "All") continue
      if (c.subject !== subject) continue
      s.add(c.sub)
    }
    return ["All", ...Array.from(s).sort()]
  }, [exam, subject])

  const card = deck[idx] ?? deck[deck.length - 1] ?? null
  const isKnown = card ? known.includes(card.id) : false
  const knownCount = deck.filter(c => known.includes(c.id)).length
  const progress = deck.length ? Math.round((knownCount / deck.length) * 100) : 0

  useEffect(() => { setFlipped(false); setIdx(0) }, [exam, subject, sub, query])

  const mark = (v: boolean) => {
    if (!card) return
    const next = v ? [...known, card.id] : known.filter(k => k !== card.id)
    setKnown(next)
    try { localStorage.setItem("bato-known", JSON.stringify(next)) } catch {}
  }

  const next = (dir: 1 | -1) => {
    if (deck.length === 0) return
    setFlipped(false)
    setIdx(i => (i + dir + deck.length) % deck.length)
  }

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn" aria-label="Home">←</Link>
        <span className="nav-title">🃏 {L("Flashcards", "फ्लैशकार्ड")}</span>
        <div />
      </div>
      <div className="page-content">
        <div className="info-box">
          📌 <strong>{deck.length.toLocaleString()}</strong> {L("cards — formulas & facts by exam, subject & topic.", "कार्डहरू — सूत्र र तथ्य परीक्षा, विषय र विषयगत अनुसार।")}
        </div>

        {/* Exam filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
          {flashExams.map(e => {
            const cnt = e === "All" ? flashcards.length : flashcards.filter(c => c.exam === e || c.exam === "All").length
            return (
              <button key={e} className={`chip ${exam === e ? "active" : ""}`} onClick={() => { setExam(e); setSubject("All"); setSub("All") }}>
                {e === "IOE" ? "🏗️" : e === "KU" ? "🎓" : e === "CEE" ? "🩺" : "📋"} {e} ({cnt.toLocaleString()})
              </button>
            )
          })}
        </div>

        {/* Subject filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
          {subjects.map(s => {
            const cnt = s === "All" ? 0 : flashcards.filter(c => {
              if (exam !== "All" && c.exam !== exam && c.exam !== "All") return false
              return c.subject === s
            }).length
            return (
              <button
                key={s}
                className={`chip chip-sm ${subject === s ? "active" : ""}`}
                onClick={() => { setSubject(s); setSub("All") }}
                style={{ fontSize: 11.5 }}
              >
                {s} {s !== "All" && `(${cnt})`}
              </button>
            )
          })}
        </div>

        {/* Sub-subject filter */}
        {subject !== "All" && subs.length > 1 && (
          <div style={{ display: "flex", gap: 5, marginBottom: 10, flexWrap: "wrap" }}>
            {subs.map(s => (
              <button
                key={s}
                className={`chip chip-xs ${sub === s ? "active" : ""}`}
                onClick={() => setSub(s)}
                style={{ fontSize: 10.5, padding: "3px 10px" }}
              >
                {s === "All" ? L("All", "सबै") : s}
              </button>
            ))}
          </div>
        )}

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.5, fontSize: 14 }}>🔍</span>
          <input
            className="input"
            style={{ paddingLeft: 40, width: "100%", boxSizing: "border-box" }}
            placeholder={L("Search cards...", "कार्ड खोज्नुहोस्...")}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", fontWeight: 700, marginBottom: 4 }}>
            <span>{L("Mastery", "निपुणता")}</span>
            <span>{progress}% • {knownCount}/{deck.length} {L("known", "जानिएको")}</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "var(--bg)", border: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "var(--primary)", transition: "width 0.3s", borderRadius: 3 }} />
          </div>
        </div>

        {deck.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{L("No cards", "कुनै कार्ड छैन")}</div>
          </div>
        ) : card ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 10, fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>
              {idx + 1} / {deck.length} • {card.subject} {card.sub !== card.subject && `→ ${card.sub}`}
            </div>
            <div style={{ perspective: 1200, marginBottom: 14 }}>
              <div
                onClick={() => setFlipped(f => !f)}
                style={{
                  position: "relative", minHeight: 260, cursor: "pointer",
                  transformStyle: "preserve-3d", transition: "transform 0.5s",
                  transform: flipped ? "rotateY(180deg)" : "none",
                }}
              >
                <div style={{
                  position: "absolute", inset: 0, backfaceVisibility: "hidden",
                  background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: 28, textAlign: "center",
                }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "var(--primary)", marginBottom: 8 }}>
                    {card.exam === "IOE" ? "🏗️ IOE" : card.exam === "KU" ? "🎓 KU" : card.exam === "CEE" ? "🩺 CEE" : "📋 All"} • {card.subject}
                  </span>
                  {card.sub !== card.subject && <span style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", marginBottom: 6 }}>{card.sub}</span>}
                  <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                    {card.front}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 14 }}>{L("tap to flip", "थिचेर पल्टाउनुहोस्")}</div>
                </div>
                <div style={{
                  position: "absolute", inset: 0, backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "var(--card)", border: "1px solid var(--primary)", borderRadius: 16,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: 24, textAlign: "center",
                }}>
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text)", whiteSpace: "pre-line", maxHeight: 200, overflow: "auto" }}>
                    {card.back}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); mark(!isKnown) }}
                    className={`btn btn-sm ${isKnown ? "btn-outline" : "btn-primary"}`}
                    style={{ marginTop: 12 }}
                  >
                    {isKnown ? L("↩️ Review again", "↩️ फेरि अभ्यास") : L("✅ I know this", "✅ जानें")}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => next(-1)}>← {L("Prev", "अघिल्लो")}</button>
              <button className="btn btn-outline btn-sm" onClick={() => mark(true)}>✅</button>
              <button className="btn btn-outline btn-sm" onClick={() => mark(false)}>🔄</button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => next(1)}>{L("Next", "अर्को")} →</button>
            </div>

            {/* Palette dots */}
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
              {deck.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIdx(i); setFlipped(false) }}
                  style={{
                    width: 20, height: 20, borderRadius: 5, fontSize: 8, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                    border: i === idx ? "2px solid var(--primary)" : "1px solid var(--border)",
                    background: known.includes(deck[i].id) ? "var(--primary)" : "var(--bg)",
                    color: known.includes(deck[i].id) ? "white" : "var(--text)",
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}