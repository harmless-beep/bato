// Perf mode shared between ui.tsx (toggle) and ambient-bg.tsx (consumer).
// Extracted to avoid circular imports.

export type PerfMode = 'lite' | 'full'
const KEY = 'bato-perf'

export function getPerfMode(): PerfMode {
  return (localStorage.getItem(KEY) as PerfMode) ?? 'full'
}

export function setPerfMode(mode: PerfMode) {
  localStorage.setItem(KEY, mode)
  window.dispatchEvent(new CustomEvent('bato-perf-change', { detail: mode }))
}
