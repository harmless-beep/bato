'use client'

// Renders simple molecular structures as inline SVG (benzene rings, etc.)
// Used in chemistry questions via the Question.mol field.

interface Atom { x: number; y: number; el: string }

const STRUCTURES: Record<string, { atoms: Atom[]; bonds: [number, number][] }> = {
  benzene: {
    atoms: [
      { x: 50, y: 0, el: 'C' }, { x: 93, y: 25, el: 'C' }, { x: 93, y: 75, el: 'C' },
      { x: 50, y: 100, el: 'C' }, { x: 7, y: 75, el: 'C' }, { x: 7, y: 25, el: 'C' },
    ],
    bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
  },
  cyclohexane: {
    atoms: [
      { x: 50, y: 0, el: 'C' }, { x: 93, y: 25, el: 'C' }, { x: 93, y: 75, el: 'C' },
      { x: 50, y: 100, el: 'C' }, { x: 7, y: 75, el: 'C' }, { x: 7, y: 25, el: 'C' },
    ],
    bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
  },
  ethene: {
    atoms: [{ x: 20, y: 50, el: 'C' }, { x: 80, y: 50, el: 'C' }],
    bonds: [[0, 1]],
  },
  ethyne: {
    atoms: [{ x: 20, y: 50, el: 'C' }, { x: 80, y: 50, el: 'C' }],
    bonds: [[0, 1]],
  },
  ethanol: {
    atoms: [{ x: 10, y: 50, el: 'CH₃' }, { x: 50, y: 50, el: 'CH₂' }, { x: 90, y: 50, el: 'OH' }],
    bonds: [[0, 1], [1, 2]],
  },
  acetic_acid: {
    atoms: [{ x: 10, y: 50, el: 'CH₃' }, { x: 50, y: 50, el: 'C' }, { x: 90, y: 35, el: 'OH' }, { x: 90, y: 65, el: 'O' }],
    bonds: [[0, 1], [1, 2], [1, 3]],
  },
  methane: {
    atoms: [{ x: 50, y: 50, el: 'C' }, { x: 95, y: 25, el: 'H' }, { x: 25, y: 10, el: 'H' }, { x: 25, y: 90, el: 'H' }, { x: 90, y: 85, el: 'H' }],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
  },
  glucose: {
    atoms: [
      { x: 30, y: 25, el: 'C' }, { x: 70, y: 25, el: 'C' }, { x: 90, y: 60, el: 'C' },
      { x: 70, y: 95, el: 'C' }, { x: 30, y: 95, el: 'C' }, { x: 10, y: 60, el: 'O' },
    ],
    bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 5]],
  },
}

export default function Molecule({ name }: { name: string }) {
  const s = STRUCTURES[name]
  if (!s) return null
  return (
    <svg width="120" height="110" viewBox="0 0 100 100" style={{ display: 'block', margin: '8px auto' }}>
      {s.bonds.map(([a, b], i) => {
        const A = s.atoms[a], B = s.atoms[b]
        const isDouble = name === 'benzene' && (i % 2 === 0)
        const isTriple = name === 'ethyne'
        if (isTriple) {
          return (
            <g key={i}>
              <line x1={A.x} y1={A.y - 3} x2={B.x} y2={B.y - 3} stroke="#64748b" strokeWidth="3" />
              <line x1={A.x} y1={A.y + 3} x2={B.x} y2={B.y + 3} stroke="#64748b" strokeWidth="3" />
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#64748b" strokeWidth="2" />
            </g>
          )
        }
        if (isDouble) {
          const dx = B.x - A.x, dy = B.y - A.y
          const len = Math.sqrt(dx * dx + dy * dy) || 1
          const nx = -dy / len * 3, ny = dx / len * 3
          return (
            <g key={i}>
              <line x1={A.x + nx} y1={A.y + ny} x2={B.x + nx} y2={B.y + ny} stroke="#64748b" strokeWidth="2" />
              <line x1={A.x - nx} y1={A.y - ny} x2={B.x - nx} y2={B.y - ny} stroke="#64748b" strokeWidth="2" />
            </g>
          )
        }
        return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#64748b" strokeWidth="2" />
      })}
      {s.atoms.map((a, i) => (
        <text key={i} x={a.x} y={a.y + 4} fontSize="11" fontWeight="700" fill="var(--text)" textAnchor="middle" fontFamily="inherit">
          {a.el}
        </text>
      ))}
    </svg>
  )
}
