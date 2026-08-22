export interface NoteSection {
  id: string
  title: string
  titleNp: string
  items: { title: string; content: string }[]
}

export const notes: NoteSection[] = [
  {
    id: 'math',
    title: 'Mathematics',
    titleNp: 'गणित',
    items: [
      {
        title: 'Differentiation — Key Formulas',
        content: `**Power rule:** d/dx x^n = nx^(n-1)
**Product rule:** d/dx (uv) = u dv/dx + v du/dx
**Quotient rule:** d/dx (u/v) = (v du/dx - u dv/dx) / v²
**Chain rule:** d/dx f(g(x)) = f'(g(x)) · g'(x)

**Trig derivatives:**
d/dx sin x = cos x
d/dx cos x = -sin x
d/dx tan x = sec² x

**Memory trick:** "PSST" — Power, Product, Quotient, Chain. Always check chain first.`
      },
      {
        title: 'Integration — Must-Know',
        content: `**Basic integrals:**
∫ x^n dx = x^(n+1)/(n+1) + C  (n ≠ -1)
∫ 1/x dx = ln|x| + C
∫ e^x dx = e^x + C
∫ sin x dx = -cos x + C
∫ cos x dx = sin x + C

**Integration by parts:** ∫ u dv = uv - ∫ v du
**LIATE rule:** pick u → Logarithmic, Inverse trig, Algebraic, Trig, Exponential

**Substitution trick:** If you see f(g(x))·g'(x), let u = g(x).`
      },
      {
        title: 'Vectors — Quick Reference',
        content: `**Dot product:** a·b = |a||b|cos θ = a₁b₁ + a₂b₂ + a₃b₃
**Cross product:** a×b = |a||b|sin θ · n̂

**Condition for perpendicular:** a·b = 0
**Condition for parallel:** a×b = 0

**Angle between vectors:** cos θ = (a·b) / (|a||b|)

**Mnemonic:** "Dot = cos, Cross = sin" — dot gives scalar, cross gives vector.`
      },
      {
        title: 'Algebra — Vieta & Series',
        content: `**Quadratic:** ax² + bx + c = 0
Roots: x = [-b ± √(b² - 4ac)] / 2a
Sum = -b/a, Product = c/a

**AP:** T_n = a + (n-1)d, S_n = n/2 [2a + (n-1)d]
**GP:** T_n = ar^(n-1), S_n = a(r^n - 1)/(r - 1)

**Binomial theorem:** (a+b)^n = Σ C(n,k) a^(n-k) b^k
C(n,k) = n! / (k! (n-k)!)

**Trick:** For (1+x)^n, coefficients are Pascal's triangle row n.`
      },
    ]
  },
  {
    id: 'physics',
    title: 'Physics',
    titleNp: 'भौतिकशास्त्र',
    items: [
      {
        title: 'Kinematics — Equations of Motion',
        content: `**SUVAT equations (constant a):**
v = u + at
s = ut + ½at²
v² = u² + 2as
s = ½(u + v)t

**Projectile motion:**
Range: R = u² sin(2θ) / g
Max height: H = u² sin²θ / (2g)
Time of flight: T = 2u sinθ / g

**Key trick:** Range is same for θ and 90°-θ. Max range at 45°.`
      },
      {
        title: 'Newton\'s Laws — Free Body Diagrams',
        content: `**1st Law:** Object at rest stays at rest, in motion stays in motion unless acted on by net force.
**2nd Law:** F = ma (net force = mass × acceleration)
**3rd Law:** Every action has equal and opposite reaction.

**FBD tips:**
1. Draw all forces (gravity, normal, tension, friction, applied)
2. Resolve into components along direction of motion
3. Sum forces = ma

**Friction:** f ≤ μN
Static: f_s ≤ μ_s N
Kinetic: f_k = μ_k N

**Mnemonic:** "F=ma" — everything in mechanics comes back to this.`
      },
      {
        title: 'Optics — Lens & Mirror Formula',
        content: `**Mirror formula:** 1/f = 1/u + 1/v
**Lens formula:** 1/f = 1/v - 1/u
(Sign convention: CARTESIAN — real is positive)

**Magnification:** m = -v/u (mirror), m = v/u (lens)
**Power:** P = 1/f (in meters → diopters)

**Snell's law:** n₁ sin θ₁ = n₂ sin θ₂
**Critical angle:** sin θ_c = n₂/n₁
**Lens maker formula:** 1/f = (n-1)(1/R₁ - 1/R₂)

**Trick:** For thin lens problems, always draw the 3 rays:
1. Parallel to axis → through focus
2. Through center → undeviated
3. Through focus → parallel to axis`
      },
      {
        title: 'Thermodynamics — Gas Laws',
        content: `**Boyle's Law:** P₁V₁ = P₂V₂ (constant T)
**Charles' Law:** V₁/T₁ = V₂/T₂ (constant P)
**Ideal gas law:** PV = nRT

**1st Law:** ΔU = Q - W
**2nd Law:** Entropy of isolated system always increases
**Efficiency:** η = 1 - T_C/T_H (Carnot)

**Processes:**
Isobaric: P constant, W = PΔV
Isochoric: V constant, W = 0
Isothermal: T constant, ΔU = 0
Adiabatic: Q = 0, PV^γ = constant

**Mnemonic:** "PAI" — Pressure constant → isobaric, Volume constant → isochoric, Temperature constant → isothermal.`
      },
    ]
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    titleNp: 'रसायनशास्त्र',
    items: [
      {
        title: 'Atomic Structure — Orbitals',
        content: `**Quantum numbers:**
n = principal (1, 2, 3...)
l = azimuthal (0 to n-1): s=0, p=1, d=2, f=3
m_l = magnetic (-l to +l)
m_s = spin (±½)

**Hund's rule:** Each orbital in subshell gets one electron before pairing.
**Aufbau:** Fill lowest energy first.
**Pauli:** No two electrons have same 4 quantum numbers.

**Max electrons:** s=2, p=6, d=10, f=14
**Mnemonic:** "SPDF" — Sharp, Principal, Diffuse, Fundamental.`
      },
      {
        title: 'Periodic Table — Trends',
        content: `**Across a period (left→right):**
Atomic radius ↓ (more protons pull electrons in)
Ionization energy ↑ (harder to remove electron)
Electronegativity ↑ (want more electrons)

**Down a group:**
Atomic radius ↑ (more shells)
Ionization energy ↓ (outer electrons farther)
Electronegativity ↓ (less attraction)

**Order of electronegativity:** F > O > N > Cl > Br > I > S > C > P > H

**Mnemonic:** "FONClBrISCH" — Fluorine is king. Highest EN = F. `
      },
      {
        title: 'Organic Chemistry — Functional Groups',
        content: `**Priority order (IUPAC):**
COOH > CHO > OH > C=C > C≡C > R (alkyl)

**Alkane:** C_nH_{2n+2} (single bonds)
**Alkene:** C_nH_{2n} (double bond)
**Alkyne:** C_nH_{2n-2} (triple bond)

**Common reactions:**
Substitution: alkane + halogen → alkyl halide + HX (UV light)
Addition: alkene + H₂ → alkane (Ni catalyst)
Elimination: alcohol → alkene + H₂O (conc. H₂SO₄)

**Trick:** Saturated = single bonds only. Unsaturated = has double/triple bonds. More unsaturation = more reactive.`
      },
      {
        title: 'Electrochemistry — Nernst Equation',
        content: `**Standard cell potential:** E°_cell = E°_cathode - E°_anode

**Nernst equation:** E = E° - (RT/nF) ln Q
At 25°C: E = E° - (0.059/n) log Q

**Faraday's laws:**
1st: Mass deposited ∝ charge passed (m = ZQ)
2nd: Same charge → mass ∝ equivalent weight

**Electrochemical series:**
Li > K > Ca > Na > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu > Ag > Au

**Mnemonic:** "Lick Potassium Cats Naughty? Mg Al Zn Fe Ni Sn Pb H Cu Ag Au" — top = most reactive.`
      },
    ]
  },
  {
    id: 'english',
    title: 'English',
    titleNp: 'अङ्ग्रेजी',
    items: [
      {
        title: 'Grammar — Tenses Quick Ref',
        content: `**Present:** She studies. / She is studying. / She has studied.
**Past:** She studied. / She was studying. / She had studied.
**Future:** She will study. / She will be studying. / She will have studied.

**Trick:** For IOE English, subject-verb agreement is the #1 tested area.
Rule: Singular subject → singular verb. "The list of items IS ready." (subject = list)

**Common trap:** "Neither of them ARE" ✗ → "Neither of them IS" ✓ (neither = singular)
**Mnemonic:** "Each, either, neither, anyone, everyone" are ALL singular.`
      },
      {
        title: 'Vocabulary — Root Words',
        content: `**bene-** = good → benefit, benevolent
**mal-** = bad → malice, malfunction
**syn-** = together → syntax, synonym
**anti-** = against → antibody, antipathy
**auto-** = self → automobile, autobiography
**tele-** = far → telephone, television
**bio-** = life → biology, biography
**chrono-** = time → chronicle, chronology

**Mnemonic:** "Bene good, Mal bad, Syn same, Anti mad" — pair the roots with feelings.`
      },
      {
        title: 'Reading Comprehension Strategy',
        content: `**Step 1:** Skim the question first (don't read passage blind).
**Step 2:** Scan passage for keywords from the question.
**Step 3:** Read only that section carefully.
**Step 4:** Eliminate obviously wrong options first.

**Trick:** The correct answer is usually a paraphrase, NOT the exact words from the text. If an option copies a sentence word-for-word, it's often a distractor.

**Time saver:** Do vocabulary + grammar questions first (fast), comprehension last.`
      },
    ]
  },
  {
    id: 'aptitude',
    title: 'Engineering Aptitude',
    titleNp: 'Engineering Aptitude',
    items: [
      {
        title: 'Logical Reasoning — Number Series',
        content: `**Arithmetic:** 2, 5, 8, 11, ? → +3 each → 14
**Geometric:** 3, 6, 12, 24, ? → ×2 → 48
**Square:** 1, 4, 9, 16, ? → n² → 25
**Fibonacci:** 1, 1, 2, 3, 5, ? → sum of prev two → 8

**Trick:** Always check difference first, then ratio, then squares/cubes. 90% of series are one of these.

**Mnemonic:** "D-R-S-F" — Difference, Ratio, Square, Fibonacci. Check in that order.`
      },
      {
        title: 'Units & Conversions',
        content: `**Length:** 1 m = 100 cm = 1000 mm; 1 km = 1000 m
**Mass:** 1 kg = 1000 g; 1 tonne = 1000 kg
**Time:** 1 hr = 60 min = 3600 s
**Pressure:** 1 atm = 760 mmHg = 101.325 kPa
**Energy:** 1 cal = 4.184 J; 1 kWh = 3.6 × 10⁶ J

**Trick:** For unit conversion, multiply by (target/base) as a fraction = 1.
Example: 5 km → m: 5 km × (1000 m / 1 km) = 5000 m. The "km" cancels.

**Mnemonic:** "King Henry Died By Drinking Chocolate Milk" — k, h, da, b, d, c, m (metric prefixes).`
      },
      {
        title: 'Estimation & Approximation',
        content: `IOE often tests quick estimation, not exact calc.

**Example:** 198 × 52 ≈ 200 × 50 = 10,000 (actual 10,296 — close enough for MCQ).

**Rule:** Round to 1-2 significant figures, compute, pick nearest option.
**Trick:** If options are 9800, 10200, 15000, 20000 → you only need rough magnitude, not precision.

**Time saver:** In MCQ, estimate first → eliminate 2 wrong options → only calculate if 2 remain close.`
      },
    ]
  },
]
