export interface NoteSection {
  id: string
  title: string
  titleNp: string
  icon: string
  items: { title: string; content: string }[]
}

export const notes: NoteSection[] = [
  // ─── ENTRANCE ────────────────────────────────────────────────
  {
    id: 'math',
    title: 'Mathematics',
    titleNp: 'गणित',
    icon: '📐',
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
**LIATE rule:** u → Logarithmic, Inverse trig, Algebraic, Trig, Exponential

**Substitution:** If you see f(g(x))·g'(x), let u = g(x).`
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

**Binomial:** (a+b)^n = Σ C(n,k) a^(n-k) b^k
C(n,k) = n! / (k! (n-k)!)

**Trick:** For (1+x)^n, coefficients are Pascal's triangle row n.`
      },
      {
        title: 'Complex Numbers',
        content: `**i² = -1**, i³ = -i, i⁴ = 1

**Polar form:** z = r(cos θ + i sin θ) = re^(iθ)
**De Moivre:** (cos θ + i sin θ)^n = cos(nθ) + i sin(nθ)

**Modulus:** |z| = √(a² + b²)
**Conjugate:** z̄ = a - ib,  z · z̄ = |z|²

**Roots of unity:** e^(2πik/n) for k = 0,1,...,n-1
Sum of n-th roots = 0.`
      },
      {
        title: 'Coordinate Geometry',
        content: `**Straight line:** y = mx + c,  m = (y₂-y₁)/(x₂-x₁)
**Distance:** d = √((x₂-x₁)² + (y₂-y₁)²)
**Midpoint:** M = ((x₁+x₂)/2, (y₁+y₂)/2)

**Circle:** x² + y² + 2gx + 2fy + c = 0
Center = (-g, -f), radius = √(g²+f²-c)

**Parabola:** y² = 4ax, focus = (a,0), directrix x = -a`
      },
      {
        title: 'Sequences & Progressions',
        content: `**Arithmetic:** T_n = a + (n-1)d, S_n = n/2 [2a + (n-1)d]
**Geometric:** T_n = ar^(n-1), S_n = a(r^n-1)/(r-1), S∞ = a/(1-r) if |r|<1

**Harmonic:** H_n = 1 / (1/a + (n-1)d)
**AM-GM-HM:** AM × HM = GM²

**Trick:** In an AP of 3 numbers → a-d, a, a+d. In GP of 3 → a/r, a, ar.`
      },
    ]
  },
  {
    id: 'physics',
    title: 'Physics',
    titleNp: 'भौतिकशास्त्र',
    icon: '⚡',
    items: [
      {
        title: 'Kinematics — SUVAT Equations',
        content: `**SUVAT (constant a):**
v = u + at
s = ut + ½at²
v² = u² + 2as
s = ½(u + v)t

**Projectile motion:**
Range: R = u² sin(2θ) / g
Max height: H = u² sin²θ / (2g)
Time of flight: T = 2u sinθ / g

**Trick:** Range same for θ and 90°-θ. Max range at θ=45°.`
      },
      {
        title: 'Newton\'s Laws — Free Body Diagrams',
        content: `**1st Law:** Object at rest stays at rest unless net force acts.
**2nd Law:** F = ma (net force = mass × acceleration)
**3rd Law:** Action = equal & opposite reaction.

**FBD tips:**
1. Draw all forces (gravity, normal, tension, friction)
2. Resolve into components
3. ΣF = ma

**Friction:** f ≤ μN
Static: f_s ≤ μ_s N,  Kinetic: f_k = μ_k N`
      },
      {
        title: 'Optics — Mirror & Lens',
        content: `**Mirror formula:** 1/f = 1/u + 1/v
**Lens formula:** 1/f = 1/v - 1/u
(Cartesian sign convention: real is positive)

**Magnification:** m = -v/u (mirror), m = v/u (lens)
**Power:** P = 1/f (in meters → diopters)

**Snell\'s law:** n₁ sin θ₁ = n₂ sin θ₂
**Critical angle:** sin θ_c = n₂/n₁

**Trick:** For thin lens, always draw the 3 standard rays.`
      },
      {
        title: 'Thermodynamics — Gas Laws',
        content: `**Boyle\'s Law:** P₁V₁ = P₂V₂ (constant T)
**Charles\' Law:** V₁/T₁ = V₂/T₂ (constant P)
**Ideal gas:** PV = nRT

**1st Law:** ΔU = Q - W
**2nd Law:** Entropy of isolated system always increases
**Carnot efficiency:** η = 1 - T_C/T_H

**Processes:**
Isobaric: P const, W = PΔV
Isochoric: V const, W = 0
Isothermal: ΔU = 0, W = nRT ln(V₂/V₁)
Adiabatic: Q = 0, PV^γ = const`
      },
      {
        title: 'Wave & SHM',
        content: `**Wave equation:** v = fλ
**Period:** T = 1/f,  ω = 2πf

**SHM:**
x = A cos(ωt + φ)
v = -Aω sin(ωt + φ)
a = -Aω² cos(ωt + φ)

**Simple pendulum:** T = 2π√(L/g)
**Spring:** T = 2π√(m/k)

**Doppler effect:** f' = f × (v ± v_o)/(v ∓ v_s)`
      },
      {
        title: 'Electricity — Circuits',
        content: `**Ohm\'s Law:** V = IR
**Power:** P = VI = I²R = V²/R

**Resistors in series:** R = R₁ + R₂ + ...
**Resistors in parallel:** 1/R = 1/R₁ + 1/R₂ + ...

**Kirchhoff\'s Voltage Law:** ΣV = 0 around any loop
**Kirchhoff\'s Current Law:** ΣI at node = 0

**Capacitor:** Q = CV,  Energy = ½CV²
**RC time constant:** τ = RC`
      },
      {
        title: 'Modern Physics',
        content: `**Photoelectric:** E = hf - φ,  K_max = hf - φ
**de Broglie:** λ = h/p = h/(mv)
**Heisenberg:** Δx Δp ≥ h/4π

**Bohr model:** E_n = -13.6/n² eV (hydrogen)
**Radioactive decay:** N = N₀ e^(-λt)
Half-life: t½ = ln2/λ

**Mass-energy:** E = mc²`
      },
    ]
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    titleNp: 'रसायनशास्त्र',
    icon: '🧪',
    items: [
      {
        title: 'Atomic Structure — Orbitals',
        content: `**Quantum numbers:**
n = principal (1,2,3...)
l = azimuthal (0 to n-1): s=0, p=1, d=2, f=3
m_l = magnetic (-l to +l)
m_s = spin (±½)

**Hund\'s rule:** Each orbital in subshell gets one electron before pairing.
**Aufbau:** Fill lowest energy first.
**Pauli exclusion:** No two electrons have same 4 quantum numbers.

**Max electrons:** s=2, p=6, d=10, f=14`
      },
      {
        title: 'Periodic Table — Trends',
        content: `**Across a period (left→right):**
Atomic radius ↓, Ionization energy ↑, Electronegativity ↑

**Down a group:**
Atomic radius ↑, Ionization energy ↓, Electronegativity ↓

**Electronegativity order:**
F > O > N > Cl > Br > I > S > C > P > H > metals

**Trick:** Atomic size ≈ distance from nucleus to valence shell. More protons (→ right) pull tighter = smaller radius.`
      },
      {
        title: 'Organic Chemistry — Functional Groups',
        content: `**IUPAC priority:** COOH > CHO > OH > C=C > C≡C > R

**Alkane:** C_nH_{2n+2} (single bonds)
**Alkene:** C_nH_{2n} (double bond)
**Alkyne:** C_nH_{2n-2} (triple bond)
**Alcohol:** -OH, **Aldehyde:** -CHO, **Ketone:** -CO-
**Carboxylic acid:** -COOH, **Ester:** -COO-

**Substitution:** alkane + halogen → alkyl halide + HX (UV)
**Addition:** alkene + H₂ → alkane (Ni catalyst)`
      },
      {
        title: 'Electrochemistry — Nernst',
        content: `**Standard cell:** E°_cell = E°_cathode - E°_anode
**Nernst:** E = E° - (RT/nF) ln Q
At 25°C: E = E° - (0.059/n) log Q

**Faraday\'s 1st Law:** m = (Q/M) × (valency/F)
**Faraday\'s 2nd Law:** same Q → m ∝ equivalent weight

**Electrochemical series:**
Li > K > Ca > Na > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu > Ag > Au

**Trick:** Top = most reactive (anode material). Bottom = least reactive (cathode).`
      },
      {
        title: 'Equilibrium & Kp/Kc',
        content: `**Equilibrium constant:**
K_c = [products]^coeff / [reactants]^coeff
K_p = K_c(RT)^Δn

**Le Chatelier:** Stress a system at equilibrium → system shifts to counteract.

**Factors:** Concentration ↑ → shift toward opposite side
Temperature ↑ → endothermic forward; exothermic reverse
Pressure ↑ (gases) → shift toward fewer moles of gas

**pH:** pH = -log[H⁺]
pOH = -log[OH⁻],  pH + pOH = 14`
      },
      {
        title: 'Stoichiometry — moles',
        content: `**Mole:** 1 mol = 6.022×10²³ particles (Avogadro)
**Molar mass** = g/mol (numerically = atomic mass)

**Molarity:** M = mol solute / L solution
**Molality:** m = mol solute / kg solvent

** dilution:** M₁V₁ = M₂V₂
**% yield:** (actual/theoretical) × 100

**Empirical formula:** divide masses by atomic mass → ratio → multiply to integer`
      },
    ]
  },
  {
    id: 'english',
    title: 'English',
    titleNp: 'अङ्ग्रेजी',
    icon: '📖',
    items: [
      {
        title: 'Grammar — Tenses Master Ref',
        content: `**Present:** studies / is studying / has studied / has been studying
**Past:** studied / was studying / had studied / had been studying
**Future:** will study / will be studying / will have studied

**Subject-verb agreement (#1 tested at IOE):**
Singular subject → singular verb
"The list of items IS ready." (subject = list, NOT items)

**Always singular:** each, either, neither, anyone, everyone, nobody, somebody, one
**Always plural:** both, few, many, several
**Pair as plural:** scissors, trousers, shorts`
      },
      {
        title: 'Vocabulary — Word Roots',
        content: `**bene-** = good → benefit, benevolent, benefactor
**mal-** = bad → malice, malfunction, malnourished
**syn-** = together → syntax, synonym, synthesis
**anti-** = against → antibody, antipathy, antiseptic
**auto-** = self → automobile, autopsy, automatic
**tele-** = far → telephone, telescope, telepathy
**bio-** = life → biology, biography, biodiversity
**chrono-** = time → chronicle, chronology, synchronize
**morph-** = shape → amorphous, metamorphosis`
      },
      {
        title: 'Reading Comprehension Strategy',
        content: `**Step 1:** Read questions FIRST → note keywords
**Step 2:** Skim passage — read intro + first line of each paragraph
**Step 3:** Locate keywords in text → read that section
**Step 4:** Eliminate obviously wrong answers first

**Key trick:** Correct answer is usually a PARAPHRASE, not exact text.
If an option matches the passage word-for-word → often a TRAP.

**Speed:** Do vocabulary + grammar first (30 sec each), save RC for last.`
      },
      {
        title: 'Phrasal Verbs — High-Freq',
        content: `**Turn:** turn down (reject), turn up (appear), turn out (result), turn into (become)
**Put:** put off (delay), put up with (tolerate), put forward (propose), put across (explain)
**Get:** get over (recover), get along (manage), get away (escape), get through (succeed)
**Break:** break down (fail), break up (end), break into (enter), break out (start)

**Trick:** In IOE, phrasal verbs test PREPOSITION meaning — know the preposition, not just the verb.`
      },
    ]
  },
  {
    id: 'aptitude',
    title: 'Aptitude',
    titleNp: 'Aptitude',
    icon: '🧠',
    items: [
      {
        title: 'Number Series — D-R-S-F Method',
        content: `**D**ifference: 2, 5, 8, 11, ? → +3 each → 14
**R**atio: 3, 6, 12, 24, ? → ×2 each → 48
**S**quare: 1, 4, 9, 16, ? → n² → 25
**F**ibonacci: 1, 1, 2, 3, 5, ? → sum prev two → 8

**Order to check:** Difference → Ratio → Square → Cube → Fibonacci

**Trick:** If difference isn't constant, check second difference (for quadratic sequences).`
      },
      {
        title: 'Units & Conversions',
        content: `**Length:** 1 m = 100 cm = 1000 mm; 1 km = 1000 m
**Mass:** 1 kg = 1000 g; 1 tonne = 1000 kg
**Time:** 1 hr = 60 min = 3600 s
**Pressure:** 1 atm = 760 mmHg = 101.325 kPa = 1.01325 bar
**Energy:** 1 cal = 4.184 J; 1 kWh = 3.6 × 10⁶ J

**Dimensional analysis:** [M^a L^b T^c]
Convert by multiplying by (target/base) = 1 so units cancel.`
      },
      {
        title: 'Percentage & Ratio',
        content: `**% change:** (new - old)/old × 100
**Successive %:** 20% then 10% → multiply by 1.20 × 1.10 = 1.32 = 32% increase

**Ratio:** a:b means a/b. If a:b = 3:4 and a = 15, b = 20
**Alligation:** To mix two ingredients at price P₁ and P₂ to get price Pₘ:
Ratio = |P₂ - Pₘ| : |P₁ - Pₘ|

**Trick:** 1/N as % = 100/N.  1/7 ≈ 14.3%, 1/8 = 12.5%, 1/9 ≈ 11.1%.`
      },
      {
        title: 'Profit & Loss',
        content: `**Gain %:** (SP - CP)/CP × 100
**Loss %:** (CP - SP)/CP × 100
**SP = CP × (1 ± gain%/100)**

**Discount:** SP = MP × (1 - d/100)
Two successive discounts d₁, d₂: effective = 1 - (1-d₁)(1-d₂)

**Trick:** If gain% = loss% on equal cost price → NET LOSS = x²/100% where x = common %.`
      },
    ]
  },

  // ─── BACHELOR SEMESTER WISE ──────────────────────────────────
  {
    id: 'sem1',
    title: 'Semester I',
    titleNp: 'सेमेस्टर I',
    icon: '1️⃣',
    items: [
      {
        title: 'Engineering Mathematics I',
        content: `**Calculus:**
Derivative: d/dx x^n = nx^(n-1), chain rule, product rule, quotient rule
Integration: ∫ x^n dx = x^(n+1)/(n+1)+C, by parts, substitution

**2D Coordinate Geometry:**
Straight line: y = mx + c, point-slope, two-point form
Circle: x²+y²+2gx+2fy+c=0, center (-g,-f), r=√(g²+f²-c)
Parabola: y²=4ax, ellipse: x²/a²+y²/b²=1, hyperbola: x²/a²-y²/b²=1

**3D Geometry:**
Direction ratios, direction cosines
Line: (x-x₁)/a = (y-y₁)/b = (z-z₁)/c
Plane: ax+by+cz+d=0, angle between planes, shortest distance`
      },
      {
        title: 'Engineering Physics I',
        content: `**Waves & Oscillations:**
SHM: x=Acos(ωt+φ), v=-Aωsin(ωt+φ), T=2π√(m/k)
Damped: Damping force F=-bv, logarithmic decrement
Forced: Resonance when ω_driving = ω_natural

**Optics:**
Interference: path diff = mλ (constructive), (m+½)λ (destructive)
Young's double slit: β = λD/d
Diffraction: single slit min at a sinθ = mλ
Newton's rings: r²_n = nλR

**Modern Physics:**
Photoelectric: E=hf-φ, de Broglie: λ=h/mv
Heisenberg: ΔxΔp ≥ ℏ/2`
      },
      {
        title: 'Engineering Chemistry I',
        content: `**Atomic & Molecular Structure:**
Quantum numbers, orbital shapes (s spherical, p dumbbell)
Hybridization: sp³ (tetrahedral), sp² (trigonal), sp (linear)
VSEPR: lone pair → LP-LP > LP-BP > BP-BP repulsion

**Electrochemistry:**
Nernst: E=E°-(0.059/n)logQ at 25°C
Batteries: Leclanche (dry), lead-acid, Li-ion
Corrosion: rusting Fe → Fe₂O₃·nH₂O, prevention by galvanizing

**Water Treatment:**
Hardness: temporary (bicarbonates) → boil; permanent (CaCl₂, MgSO₄) → washing soda
Softening: ion exchange, reverse osmosis`
      },
      {
        title: 'Computer Programming (C)',
        content: `**Data types:** int, float, double, char, printf/scanf
**Operators:** arithmetic, relational, logical, bitwise, ++/--
**Control flow:** if-else, switch, while, for, do-while

**Arrays:** int a[10]; // 10 elements, 0-indexed
**Functions:** returnType name(params) { }
**Recursion:** function calls itself, needs base case

**Pointers:** int *p; p = &x; // p holds address of x
**Structures:** struct Student { char name[50]; int roll; };`
      },
      {
        title: 'Engineering Drawing I',
        content: `**Drawing instruments:** T-square, set squares, compass, divider, scale
**Line types:** continuous, dashed, chain, alternating

**Orthographic projections:**
1st angle: object in 1st quadrant (EU standard)
3rd angle: object in 3rd quadrant (US standard) — commonly used in Nepal

**Sections:** full section, half section, sectional views
**Standard conventions:** M — metric thread, Ø — diameter, R — radius, □ — square`

      },
    ]
  },
  {
    id: 'sem2',
    title: 'Semester II',
    titleNp: 'सेमेस्टर II',
    icon: '2️⃣',
    items: [
      {
        title: 'Engineering Mathematics II',
        content: `**Integral Calculus:**
Double integrals: ∫∫ f(x,y) dxdy, change of order
Triple integrals, Jacobian
Applications: area, volume, centroid, moment of inertia

**Differential Equations:**
1st order: separable, linear (IF method), exact
2nd order: homogeneous with constant coeff
Particular integral: trial method for RHS polynomial, exponential, sin/cos

**Laplace Transform:**
L{e^(at)} = 1/(s-a), L{sin(at)} = a/(s²+a²)
L{y'} = sY - y(0), L{y''} = s²Y - sy(0) - y'(0)
Inverse LT via partial fractions`
      },
      {
        title: 'Engineering Physics II',
        content: `**Electrostatics:**
Coulomb: F = kq₁q₂/r²
E-field: E = F/q₀, E = kq/r² (point charge)
Gauss's law: Φ = Q_enclosed/ε₀
Capacitor: C = ε₀A/d (parallel plate), C = Q/V

**Magnetism:**
Biot-Savart: dB = (μ₀/4π) I dl × r̂/r²
Ampere's law: ∮B·dl = μ₀I_enc
Force on conductor: F = BIL sinθ

**Electromagnetic Induction:**
Faraday: ε = -dΦ/dt
Lenz's law: induced current opposes change
Inductance: ε = -L dI/dt, energy = ½LI²`
      },
      {
        title: 'Engineering Chemistry II',
        content: `**Organic Reactions:**
Nucleophilic substitution: SN1 (tertiary carbocation) vs SN2 (backside attack)
Elimination: E1 vs E2 — bulky base favors E2
Addition: electrophilic addition to alkenes

**Polymer Chemistry:**
Addition: polyethylene, PVC, PTFE (chain reaction)
Condensation: nylon-6,6, polyester (removes H₂O)
Thermoplastic vs thermosetting

**Spectroscopy:**
UV-Vis: π→π*, n→π* transitions
IR: O-H, N-H (broad), C=O (sharp ~1700 cm⁻¹), C-H stretch
NMR: chemical shift δ, integration, splitting (n+1 rule)`
      },
      {
        title: 'Basic Electrical Engineering',
        content: `**Circuit Analysis:**
Kirchhoff's laws, node voltage, mesh current
Thevenin: V_th = open circuit voltage, R_th = deactivate independent sources
Norton: I_N = short circuit current, R_N = R_th
Maximum power transfer when R_L = R_th

**AC Circuits:**
X_L = ωL, X_C = 1/ωC, Z = √(R² + (X_L-X_C)²)
Phasor representation, power factor = cosφ = P/S
Resonance: X_L = X_C, f_r = 1/(2π√LC)`

      },
      {
        title: 'Basic Electronics Engineering',
        content: `**Semiconductors:**
Intrinsic: n = p = n_i; Doped: n-type (P donor), p-type (B acceptor)
Diode: forward bias V_D ≈ 0.7V (Si), 0.3V (Ge)
Zener diode: V_Z stable in reverse breakdown

**Transistor (BJT):**
Active region: V_BE ≈ 0.7V, I_C = β I_B, I_E = I_B + I_C
Modes: cutoff (OFF), active (amplifier), saturation (ON)

**Op-Amp:**
V_out = A_v (V+ - V-), ideal A_v → ∞
Inverting: V_out = -(R_f/R₁) V_in
Non-inverting: V_out = (1+R_f/R₁) V_in
Golden rules: no current into inputs, V+ = V-`
      },
    ]
  },
  {
    id: 'sem3',
    title: 'Semester III',
    titleNp: 'सेमेस्टर III',
    icon: '3️⃣',
    items: [
      {
        title: 'Engineering Mathematics III',
        content: `**Fourier Series:**
f(x) = a₀/2 + Σ(aₙcos(nx) + bₙsin(nx))
aₙ = (1/π)∫ f(x)cos(nx)dx over period
Even: bₙ=0; Odd: aₙ=0

**Partial Differential Equations:**
Wave: ∂²u/∂t² = c² ∂²u/∂x²
Heat: ∂u/∂t = α ∂²u/∂x²
Method of separation of variables, D'Alembert's solution

**Complex Analysis:**
Cauchy-Riemann: uₓ=vᵧ, uᵧ=-vₓ
Cauchy integral theorem: ∮ f(z) dz = 0 if f' exists
Taylor series, Laurent series, Residue theorem: ∮f(z)dz = 2πi ΣResidues`
      },
      {
        title: 'Probability & Statistics',
        content: `**Probability:**
P(A∪B) = P(A)+P(B)-P(A∩B)
Bayes' theorem: P(A|B) = P(B|A)P(A)/P(B)
**Distributions:**
Binomial: P(X=r) = C(n,r) p^r (1-p)^(n-r)
Poisson: P(X=r) = (λ^r e^-λ)/r!
Normal: Z = (X-μ)/σ, use Z-tables

**Statistics:**
Mean, median, mode, variance σ² = E(X²) - [E(X)]²
Standard deviation σ = √σ²
Central limit theorem: sample mean ≈ normal for large n`
      },
      {
        title: 'Strength of Materials',
        content: `**Stress & Strain:**
σ = F/A, ε = δ/L, E = σ/ε (Young's modulus)
Axial loading: δ = FL/AE
Thermal stress: σ = EαΔT (constrained)

**Shear & Torsion:**
Shear: τ = V/A, γ = τ/G
Torsion: τ/J = T/r = Gθ/L
Polar moment of inertia: J = Σr²dA

**Bending:**
Bending stress: σ = My/I, I = bh³/12 (rectangular)
Beam deflection: use superposition or moment-area method`
      },
      {
        title: 'Fluid Mechanics',
        content: `**Fluid Properties:**
Density ρ = m/V, viscosity μ, surface tension γ
Buoyancy: F_b = ρgV_dispaced (Archimedes)

**Fluid Statics:**
Pressure: P = ρgh (hydrostatic)
Manometer, barometer, pressure gauges

**Fluid Dynamics:**
Continuity: A₁v₁ = A₂v₂ (conservation of mass)
Bernoulli: P/ρg + v²/2g + z = constant
Energy equation: head loss h_f = fLQ²/(2dA²)
Reynolds number: Re = ρvD/μ = vD/ν (laminar if <2000)`
      },
      {
        title: 'Engineering Geology I',
        content: `**Minerals:**
Silicates (90% of crust): olivine, pyroxene, amphibole, mica, feldspar, quartz
Physical properties: streak, cleavage (1,2,3 directions), fracture

**Rocks:**
Igneous: intrusive (granite, gabbro) vs extrusive (basalt, andesite)
Sedimentary: clastic (sandstone), chemical (limestone), organic (coal)
Metamorphic: foliated (schist, gneiss) vs non-foliated (marble, quartzite)

**Structural Geology:**
Dip and strike of geological planes
Folds: anticline (arch up), syncline (trough down)
Faults: normal (extension), reverse/thrust (compression), strike-slip`
      },
    ]
  },
  {
    id: 'sem4',
    title: 'Semester IV',
    titleNp: 'सेमेस्टर IV',
    icon: '4️⃣',
    items: [
      {
        title: 'Numerical Methods',
        content: `**Solution of Equations:**
Bisection: root in [a,b] → c=(a+b)/2, replace half containing root
Newton-Raphson: x_{n+1} = x_n - f(x_n)/f'(x_n) (fast convergence)

**Interpolation:**
Lagrange: P(x) = Σ yᵢ Lᵢ(x), Lᵢ = Πⱼ≠ᵢ (x-xⱼ)/(xᵢ-xⱼ)
Newton's divided difference

**Numerical Integration:**
Trapezoidal: ∫≈(h/2)[f₀+2f₁+...+2f_{n-1}+f_n]
Simpson's 1/3: requires even n, ∫≈(h/3)[f₀+4f₁+2f₂+4f₃+...+f_n]

**ODE:** Euler's method (simple), RK4 (accurate)`
      },
      {
        title: 'Theory of Structures I',
        content: `**Statically Determinate Beams:**
Shear force F(x) = dM/dx, Bending moment M(x) = ∫F dx
Point load: SF jumps by P, BM jumps by P×lever arm
UDL: SF linear, BM quadratic (parabolic)

**Analysis of Pin-jointed Trusses:**
Method of joints: resolve at each joint (2 eq per joint)
Method of sections: cut through ≤3 members, take moments
Zero-force members: 2 members meet at joint → no external force → both zero force

**Stress & Strain:**
Direct stress σ = P/A
Bending stress σ = My/I`
      },
      {
        title: 'Hydraulics',
        content: `**Flow in Pipes:**
Darcy-Weisbach: h_f = fLQ²/(2gd⁵)
Minor losses: h_m = K(v²/2g) for fittings, contractions
Series pipes: same flow Q, total head loss = sum
Parallel pipes: same head loss, Q splits proportionally

**Open Channel Flow:**
Manning's: V = (1/n) R^{2/3} S^{1/2} (R=hydraulic radius)
Specific energy: E = y + v²/2g
Critical flow: Fr=1, minimum energy for given discharge
Hydraulic jump: supercritical →subcritical, energy dissipation`
      },
      {
        title: 'Surveying I',
        content: `**Chain Surveying:**
Chaining: ranging rods, direct/indirect ranging
Offsets: perpendicular offsets from chain line to features
Errors: cumulative (stretching, sag) ±, compensating ±

**Compass Surveying:**
Bearing: true/magnetic, whole-circle vs quadrantal
Local attraction: check at intermediate stations
Dip: angle between horizontal and earth's field

**Leveling:**
Rise and fall method, Height of instrument method
Temporary adjustments: level, focus, bubble
Compound leveling: back sight + fore sight on same point = ∑BS - ∑FS`
      },
    ]
  },
  {
    id: 'sem5',
    title: 'Semester V+',
    titleNp: 'सेमेस्टर V+',
    icon: '5️⃣',
    items: [
      {
        title: 'Structural Analysis',
        content: `**Indeterminate Structures:**
Fixed beam: 3 unknowns (M_A, M_B, V_A) — statically indeterminate to 1° for simply supported
Moment distribution method: stiffness, distribution factor, carry-over factor
Slope-deflection equations: M_AB = (2EI/L)(2θ_A+θ_B-3ψ)

**Energy Methods:**
Strain energy: U = ∫ M²/(2EI) dx for bending
Castigliano's theorem: ∂U/∂F = deflection
Virtual work: δU = 0 for equilibrium

**Matrix Methods:**
Stiffness method: [K]{δ} = {F}
Assemble element matrices → global → apply BCs → solve`
      },
      {
        title: 'Foundation Engineering',
        content: `**Soil Mechanics:**
Index properties: G_s, w (moisture), e (voids ratio), S (saturation)
IS classification: GW, GP, GM, SW, SP, SM, SC, CL, ML, OL, CH, MH, OH, PT

**Bearing Capacity (Terzaghi):**
q_u = cN_c + qN_q + ½γBN_γ
Net safe bearing: (q_u - q)/FS
Settlement: elastic (immediate) + consolidation (time-dependent)

**Foundation Types:**
Shallow: spread footing, strip, raft (use when D/B ≤ 1)
Deep: pile (end-bearing + friction), well (caisson)`
      },
      {
        title: 'Highway Engineering',
        content: `**Geometric Design:**
Sight distance: SSD = 0.278 V t + V²/(254f) (braking)
Horizontal curve: R = V²/(127(e+f)), superelevation e = V²/(127R)
Transition curve: clothoid (spiral)
Vertical curve: parabolic summit/sag, L = A·SSD²/(abs(ΔA))

**Pavement Design:**
Flexible: layers — granular subgrade, WBM, BM, AC (RHA)
Rigid: plain cement concrete, load transfer at joints
ESAL: equivalent standard axle load for design period

**Highway Materials:**
CBR test for subgrade, aggregate crushing value, Los Angeles abrasion`
      },
    ]
  },

  // ─── MEDICAL ENTRANCE ────────────────────────────────────────────
  {
    id: 'med-phy',
    icon: '🔬',
    title: 'Medical Physics',
    titleNp: 'मेडिकल भौतिकी',
    items: [
      {
        title: 'Optics — Refraction & Lenses',
        content: `**Snell's Law:** n₁ sin θ₁ = n₂ sin θ₂
**Critical angle:** sin θc = n₂/n₁ (n₁ > n₂)
**Total internal reflection** when θ₁ > θc — used in endoscopes and fiber optics.

**Lens Formula:** 1/f = 1/v + 1/u
**Power of lens:** P = 1/f (in metres, dioptres)
**Magnification:** m = v/u = h'/h

**Optical instruments:**
- Simple microscope: M = 1 + D/f (D = 25 cm near point)
- Compound microscope: M = (L/fₒ)(D/fₑ)
- Astronomical telescope: M = fₒ/fₑ (normal adjustment)

**Human eye:** aqueous humor (n≈1.33), lens (n≈1.42), vitreous humor (n≈1.34). Near point 25 cm, far point infinity.`
      },
      {
        title: 'Modern Physics — Atomic Models',
        content: `**Bohr Model (hydrogen):**
- Radius: rₙ = ε₀h²n²/(πme²) = 0.053n² Å
- Energy: Eₙ = -13.6/n² eV
- Transitions: ΔE = 13.6(1/n₁² - 1/n₂²) eV

**de Broglie wavelength:** λ = h/p = h/(mv)
**Heisenberg:** Δx·Δp ≥ ℏ/2; ΔE·Δt ≥ ℏ/2

**Photoelectric effect:** KEₘₐₓ = hf - φ; stopping potential Vₛ = hf/e - φ/e
**X-rays:** λmin = hc/(eV); continuous + characteristic spectrum
**Radioactivity:** N = N₀e⁻ᵑᵗ, t½ = ln2/λ, A = λN, decay in Becquerel (Bq)`

      },
      {
        title: 'Modern Physics — Nuclear Physics',
        content: `**Binding energy:** E = Δmc² (Δm = mass defect)
**Einstein mass-energy:** E = mc² (1 MeV ≈ 0.0016 amu)

**Nuclear reactions:** Q-value = (mᵣₑₐcₜₐₙₜₛ - mₚᵣₒdᵤcₜₛ)c²
**Fission:** ²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n + ~200 MeV
**Fusion:** D + T → ⁴He + n + 17.6 MeV (occurs at ~10⁸ K)

**Alpha decay:** emits ²⁴He nucleus, helium-like spectrum
**Beta decay:** n → p + e⁻ + v̄ₑ (β⁻) or p → n + e⁺ + vₑ (β⁺)
**Gamma decay:** no mass/charge change, just de-excitation

**Medical uses:** ⁶⁰Co γ-rays (cancer therapy), ¹³¹I (thyroid), ⁹⁹ᵐTc (imaging)`
      },
      {
        title: 'Error Analysis & Measurements',
        content: `**Types of errors:**
- Random: repeated measurements, reduced by taking many trials
- Systematic: instrument bias (zero error, calibration), eliminated by recalibration
- Gross: blunders, outlier rejection via Chauvenet's criterion

**Absolute error:** Δx = |x - xₙ|
**Mean absolute error:** Δxₘ = Σ|xᵢ - x̄|/n
**Standard deviation:** σ = √(Σ(xᵢ - x̄)²/n)

**Propagation of errors:**
- Addition: Δz = Δx + Δy
- Multiplication: Δz/z = √((Δx/x)² + (Δy/y)²)
- For powers: Δz/z = n(Δx/x)

**Significant figures:** result rounded to the least precise operand. 95% confidence interval from σ/√n.`
      },
      {
        title: 'Waves, Sound & Doppler Effect',
        content: `**Wave equation:** v = fλ, period T = 1/f
**Standing waves (string):** fₙ = n(v/2L), n = 1,2,3…
**Open organ pipe:** fₙ = nv/2L; Closed: fₙ = nv/4L

**Doppler effect:** f' = f(v ± vₒ)/(v ∓ vₛ)
- Source moving toward observer: denominator minus
- Observer moving toward source: numerator plus
- Medical: echocardiography uses Doppler shift to measure blood velocity (~40–200 cm/s)

**Intensity level:** β (dB) = 10 log₁₀(I/I₀), I₀ = 10⁻¹² W/m²
**Ultrasound imaging:** piezoelectric transducer, frequency 1–15 MHz, depth resolution ~λ/2`
      },
    ]
  },

  {
    id: 'med-chem',
    icon: '💊',
    title: 'Medical Chemistry',
    titleNp: 'मेडिकल रसायन',
    items: [
      {
        title: 'Biochemistry — Carbohydrates',
        content: `**Monosaccharides:**
- Aldoses: glyceraldehyde (3C), glucose (6C, aldohexose, Haworth: C₁ OH ↓ = β-D-glucose)
- Ketoses: dihydroxyacetone (3C), fructose (6C, ketohexose)
- Glucose oxidation: forms gluconic acid (aldhehyde→carboxyl), or glucuronic acid (aldehyde→COOH via sorbitol pathway)

**Disaccharides:**
- Maltose: α-1,4; glucose + glucose (from starch)
- Sucrose: α-1,2β; glucose + fructose (table sugar)
- Lactose: β-1,4; glucose + galactose (milk sugar); deficient in lactase → lactose intolerance

**Polysaccharides:**
- Starch: amylose (α-1,4 linear) + amylopectin (α-1,4 + α-1,6 branched)
- Glycogen: highly branched (α-1,6 every ~10 residues), liver & muscle storage
- Cellulose: β-1,4 (humans lack cellulase → dietary fibre)`

      },
      {
        title: 'Biochemistry — Amino Acids & Proteins',
        content: `**20 Standard AAs:** classified by R-group polarity:
- Nonpolar (hydrophobic): Ala, Val, Leu, Ile, Met, Trp, Phe, Pro
- Polar uncharged: Ser, Thr, Asn, Gln, Tyr, Cys
- Acidic (negative): Asp, Glu (side chain pKa ~4)
- Basic (positive): Lys, Arg, His (pKa ~6)

**Peptide bond:** amide linkage (–NH–CO–), planarity + partial double bond character prevents free rotation → secondary structure

**Protein structure levels:**
1° — amino acid sequence
2° — α-helix (H-bond, 3.6 residues/turn), β-sheet (parallel/antiparallel)
3° — 3D folding (hydrophobic core, disulfide bonds)
4° — subunit assembly (e.g., haemoglobin: 2α + 2β)

**Enzyme kinetics:** Michaelis-Menten: v = Vₘₐₓ[S]/(Kₘ + [S]); Lineweaver-Burk: 1/v = (Kₘ/Vₘₐₓ)(1/[S]) + 1/Vₘₐₓ`
      },
      {
        title: 'Organic Chemistry — Reaction Mechanisms',
        content: `**Electrophilic substitution (EAS):** benzene → nitrobenzene: HNO₃/H₂SO₄ (nitration); Friedel-Crafts alkylation: RCl/AlCl₃
**Nucleophilic substitution:** SN1 (carbocation intermediate, rate = k[substrate]) vs SN2 (backside attack, Walden inversion, rate = k[substrate][nucleophile])

**Elimination:** E1 (carbocation, regioselectivity Zaitsev) vs E2 (bimolecular, anti-periplanar geometry required)
**Addition to alkenes:** Markovnikov (H to more H, Br to less H); peroxide effect (anti-Markovnikov, HBr only)

**Oxidation:**
- KMnO₄/H⁺: alkane→CO₂, 1° alcohol→carboxylic acid, 2°→ketone
- PCC (CH₂Cl₂): 1° alcohol→aldehyde, 2°→ketone (mild, stops)

**Reduction:** NaBH₄ (mild, reduces aldehydes/ketones); LiAlH₄ (strong, reduces esters)`,
      },
      {
        title: 'Periodic Properties — Trends & Exceptions',
        content: `**Atomic radius:** decreases across period (↑Z pulls e⁻ in), increases down group (↑n)
**Ionization energy:** increases across period; decreases down group; exceptions: Group 13 > Group 12 (d¹⁰ shielding), Group 16 > Group 15 (half-filled stability)
**Electron affinity:** most negative at ~Group 17; Group 18 has positive EA
**Electronegativity:** F (3.98) > O (3.44) > N (3.04) > Cl (3.16); Pauling scale
**Lanthanide contraction:** 4f electrons poorly shield → Zr/Hf similar size, explains Hf position in periodic table

**Diagonal relationship:** Li↔Mg, Be↔Al, B↔Si (similar charge density → similar properties)
**Inert pair effect:** heavier Group 13/14 elements prefer +3/+2 oxidation states (ns² not participation)`

      },
      {
        title: 'Organic Chemistry — Functional Groups & Spectroscopy',
        content: `**IR absorption (key peaks):**
- O–H: 3200–3600 cm⁻¹ (broad, H-bonded in alcohols)
- N–H: 3300–3500 cm⁻¹
- C=O: 1700–1750 cm⁻¹ (conjugation → lower)
- C≡N: 2250 cm⁻¹; C≡C: 2100–2260 cm⁻¹
- C–H sp³: 2850–2950; sp²: 3000–3100; sp: 3300 cm⁻¹

**¹H NMR:**
- Chemical shift δ (ppm from TMS): O–H/N–H 0.5–5, Ar–H 6.5–8, CHO ~9–10, COOH 10–13
- Integration gives H count; splitting (n+1 rule) gives adjacent H count
- NMR used to identify drug metabolites and structure of pharmaceutical compounds`
      },
    ]
  },

  {
    id: 'med-bio',
    icon: '🧬',
    title: 'Medical Biology',
    titleNp: 'मेडिकल जीव विज्ञान',
    items: [
      {
        title: 'Cell Biology — Organelles & Membrane Transport',
        content: `**Cell membrane:** phospholipid bilayer + proteins (fluid mosaic model), cholesterol regulates fluidity
**Transport:** simple diffusion (O₂, CO₂); facilitated diffusion (GLUT transporters); active transport (Na⁺/K⁺-ATPase: 3 Na⁺ out, 2 K⁺ in per ATP); co-transport (SGLT1: Na⁺ + glucose symport in intestine)

**Mitochondria:** double membrane; inner membrane: ETC + ATP synthase (oxidative phosphorylation); matrix: TCA cycle, LDH (lactate dehydrogenase for anaerobic glycolysis)

**ER & Golgi:** rough ER (ribosomes, protein synthesis for export); smooth ER (lipid synthesis, detox); Golgi (glycosylation, sorting, vesicle formation)

**Lysosome:** hydrolytic enzymes (acidic pH ~5), pH gradient via V-ATPase; engulfed pathogens fuse with phagosome`,
      },
      {
        title: 'Cell Biology — Cell Cycle & Mitosis',
        content: `**Cell cycle:** G₁ (growth, 12h) → S (DNA synthesis, 6–8h) → G₂ (preparation, 4–6h) → M (mitosis, 1–2h)
**G₀:** quiescent state (neurons, muscle cells — irreversibly differentiated)
**Restriction point:** late G₁, after which cell is committed to divide (pRB checkpoint)

**Mitosis phases:** prophase (chromatin condenses) → metaphase (chromosomes align at equator, spindle fibres attached) → anaphase (sister chromatids separate) → telophase (nuclear envelope reforms) → cytokinesis (cleavage furrow in animal cells, cell plate in plant cells)

**Meiosis:** two successive divisions → 4 haploid cells; crossing over (prophase I, chiasmata) + independent assortment (metaphase I) → genetic diversity; errors → Down syndrome (trisomy 21), Turner (XO), Klinefelter (XXY)`,
      },
      {
        title: 'Genetics — Mendelian & Molecular Genetics',
        content: `**Mendel's Laws:**
1. Law of dominance: one allele masks the other in heterozygote
2. Law of segregation: alleles separate during gamete formation (meiosis)
3. Law of independent assortment: genes on different chromosomes assort independently

**Extensions:** incomplete dominance (snapdragon, F₁ roan = pink), codominance (MN blood groups), multiple alleles (ABO: Iᴬ, Iᴮ, i; Bombay phenotype = no H antigen), pleiotropy (phenylketonuria affects multiple traits)

**DNA structure:** antiparallel double helix, antiparallel strands (5'→3'), sugar-phosphate backbone; major/minor groove allows protein recognition
**Replication:** semi-conservative (Meselson-Stahl experiment); DNA polymerase III (5'→3' synthesis, requires primer); leading strand (continuous) vs lagging strand (Okazaki fragments, ligase seals)`
      },
      {
        title: 'Human Physiology — Cardiovascular System',
        content: `**Cardiac cycle:** systole (~0.3s) + diastole (~0.5s) at 72 bpm
- Phase 1: isovolumetric contraction → Phase 2: ejection → Phase 3: isovolumetric relaxation → Phase 4: filling
**ECG:** P wave (atrial depolarisation), QRS (ventricular depolarisation), T wave (repolarisation); prolonged QT → arrhythmia risk

**Blood flow:** aortic pressure ~120/80 mmHg; capillary hydrostatic pressure ~35 mmHg (arterial end) → 15 mmHg (venous end); net filtration pressure = (capillary HP - IF HP) - (capillary OP + IF OP) ≈ +10 mmHg at arterial end → fluid reabsorption at venous end

**Haemoglobin:** 4 subunits (2α, 2β); oxygen dissociation curve (sigmoid); Bohr effect (↓pH/↑CO₂ → ↓O₂ affinity); 2,3-BPG stabilises T-state; foetal Hb (γ-chains, higher O₂ affinity)`,
      },
      {
        title: 'Human Physiology — Nervous & Respiratory Systems',
        content: `**Neuron:** resting potential (-70mV) maintained by Na⁺/K⁺-ATPase (3Na⁺ out/2K⁺ in); action potential: depolarisation (Na⁺ channels open) → overshoot → repolarisation (K⁺ channels open); refractory period prevents backward propagation

**Synapse:** chemical transmission (acetylcholine at NMJ): Ca²⁺ influx → vesicle fusion → ACh binds receptor → end-plate potential → muscle fibre AP; myasthenia gravis: autoantibodies against ACh receptors

**Respiration:** ventilation = tidal volume (500mL) × respiratory rate (12/min) = 6L/min; Boyle's law drives inspiration (diaphragm contracts → ↑thoracic volume → ↓intrathoracic pressure); gas exchange by diffusion across alveolar epithelium (PO₂: 100 mmHg in alveoli, 40 mmHg in blood)`
      },
    ]
  },
  {
    id: 'csit',
    title: 'CSIT / Computer',
    titleNp: 'CSIT / कम्प्युटर',
    icon: '💻',
    items: [
      {
        title: 'Data Structures — Stacks, Queues, Trees',
        content: `**Array:** contiguous memory, O(1) random access, fixed size
**Linked List:** nodes with data + pointer, O(n) access, dynamic size
**Stack:** LIFO — push/pop O(1). Uses: function calls, undo, expression evaluation
**Queue:** FIFO — enqueue/dequeue O(1). Uses: scheduling, BFS, buffering
**Tree:** hierarchical — binary tree, BST (left < root < right), heap (min/max)
**Traversals:** Inorder (L-Root-R), Preorder (Root-L-R), Postorder (L-R-Root)

**BST search:** O(log n) balanced, O(n) worst case (skewed)`
      },
      {
        title: 'Algorithms — Sorting & Big-O',
        content: `**Complexity classes:**
O(1) constant — array access
O(log n) — binary search
O(n) — linear scan
O(n log n) — merge/quick sort
O(n²) — bubble/insertion/selection sort

**Bubble:** compare adjacent, swap — O(n²), stable
**Selection:** find min, place at front — O(n²), unstable
**Insertion:** insert into sorted part — O(n²), best O(n) nearly sorted
**Merge:** divide & conquer — O(n log n), stable, O(n) space
**Quick:** partition around pivot — O(n log n) avg, O(n²) worst

**Binary search:** only on sorted arrays, halve each step`
      },
      {
        title: 'DBMS — SQL & Normal Forms',
        content: `**SQL basics:**
SELECT col FROM table WHERE cond
INSERT INTO table (cols) VALUES (vals)
UPDATE table SET col=val WHERE cond
DELETE FROM table WHERE cond
JOIN: INNER (match both), LEFT (all left + matches), RIGHT, FULL

**Normal forms:**
1NF: atomic values, no repeating groups
2NF: 1NF + no partial dependency (all non-key cols depend on full PK)
3NF: 2NF + no transitive dependency (non-key to non-key)
BCNF: 3NF + every determinant is a candidate key

**ACID:** Atomicity, Consistency, Isolation, Durability`
      },
      {
        title: 'Networking — OSI & TCP/IP',
        content: `**OSI 7 layers:** Physical, Data Link, Network, Transport, Session, Presentation, Application
**TCP/IP 4 layers:** Network Access, Internet, Transport, Application

**Key protocols:**
HTTP/HTTPS (web, 80/443), FTP (files, 21), SMTP (mail out, 25), POP3/IMAP (mail in, 110/143), DNS (name to IP, 53), DHCP (IP assignment)

**TCP:** connection-oriented, reliable, 3-way handshake (SYN-SYN/ACK-ACK)
**UDP:** connectionless, fast, no guarantee (video calls, DNS)

**IP:** IPv4 32-bit (192.168.1.1), IPv6 128-bit
**Subnet mask:** 255.255.255.0 = /24`
      },
      {
        title: 'OOP Concepts',
        content: `**4 pillars:**
1. Encapsulation: hide data, expose methods (private fields + getters/setters)
2. Inheritance: child class reuses parent (extends / is-a)
3. Polymorphism: same method, different behavior (overloading = compile-time, overriding = runtime)
4. Abstraction: hide implementation, show interface (abstract class / interface)

**Class vs Object:** class = blueprint, object = instance
**Constructor:** special method, runs on instantiation
**this/super:** this = current object, super = parent
**Access modifiers:** private (class only), protected (package + subclass), public (everyone)`
      },
      {
        title: 'Software Engineering Basics',
        content: `**SDLC phases:** Requirement, Design, Implementation, Testing, Deployment, Maintenance

**Models:**
Waterfall: sequential, rigid, good for clear requirements
Agile/Scrum: iterative sprints, continuous feedback
V-model: testing paired with each phase

**Testing:**
Unit (function level), Integration (module interaction), System (whole app), UAT (user)
Regression: re-test after changes

**UML diagrams:** Use Case, Class, Sequence, Activity, State`
      },
    ]
  },
  {
    id: 'civil',
    title: 'Civil Engineering',
    titleNp: 'सिभिल इन्जिनियरिङ',
    icon: '🏗️',
    items: [
      {
        title: 'Structures — Beams & Loads',
        content: `**Load types:** Dead (self-weight), Live (people/furniture), Wind, Seismic, Snow
**Bending moment:** M = force x distance; max at midspan for simply supported UDL: M = wL²/8
**Shear force:** V = wL/2 at supports (UDL)
**Deflection:** δ = 5wL⁴/384EI (simply supported, UDL)

**Support types:** Pin (no translation, rotates), Roller (vertical only), Fixed (no movement at all)
**Statically determinate:** reactions solvable by ΣF=0, ΣM=0 (3 equations for 2D)`
      },
      {
        title: 'Surveying Basics',
        content: `**Chain surveying:** baseline + offsets for small flat areas
**Leveling:** height of instrument (HI) method: HI = BS + RL, then RL = HI - FS
**Rise & fall method:** rise = BS - FS (if BS>FS)
**Contour:** line joining equal elevation points; close spacing = steep slope
**Bearing:** WCB (0-360° from North) vs QB (quadrantal N-E etc.)
**Traverse:** closed loop, angular error = Σangles - (n-2)x180°`
      },
      {
        title: 'Construction Materials',
        content: `**Concrete:** cement + sand + aggregate + water
Grade: M20 = 20 N/mm² at 28 days; mix ratio 1:1.5:3 ≈ M20
Water-cement ratio: 0.4-0.6 (lower = stronger, less workable)
Slump test: workability; cubes tested at 7/28 days

**Steel:** Fe415 (415 N/mm² yield), Fe500, Fe550
Reinforcement: tension zone, cover 25-50mm, hooks/bends at ends
**Brick:** standard 230x115x75mm, crushing strength 3.5-35 N/mm²
**Cement:** OPC (ordinary), PPC (fly ash), PSC (slag)`
      },
      {
        title: 'Geotechnical Engineering',
        content: `**Soil properties:**
Void ratio e = Vv/Vs, Porosity n = Vv/V, Water content w = Ww/Ws
Saturation S = Vw/Vv; dry density ρd = ρ/(1+w)
**Consistency:** Atterberg limits — LL (liquid), PL (plastic), SL (shrinkage)
PI = LL - PL; high PI = clay (expansive)

**Compaction:** Proctor test — OMC (optimum moisture content) gives max dry density
**Bearing capacity:** Terzaghi q_u = cNc + qNq + ½γBNγ
**Settlement:** immediate + consolidation (clay, time-dependent)`
      },
      {
        title: 'Hydraulics',
        content: `**Hydrostatics:** P = ρgh; pressure varies linearly with depth
**Continuity:** A₁V₁ = A₂V₂ (mass conservation)
**Bernoulli:** P/γ + V²/2g + z = constant (energy per unit weight)
**Head loss (Darcy-Weisbach):** hf = fLV²/2gD
**Manning's (open channel):** V = (1/n) R^(2/3) S^(1/2)
**Reynolds number:** Re = VD/ν; <2000 laminar, >4000 turbulent
**Hydraulic jump:** supercritical → subcritical, energy dissipator`
      },
      {
        title: 'Transportation Engineering',
        content: `**Highway alignment:** horizontal (curves, superelevation) + vertical (grades, sags)
**Superelevation:** e = V²/127R (to counter centrifugal force)
**Stopping sight distance:** SSD = 0.278Vt + V²/254f
**Pavement types:** Flexible (bitumen layers) vs Rigid (concrete slab + joints)
**CBR test:** subgrade strength; design thickness from CBR
**Traffic studies:** PCU (passenger car unit), peak hour factor, signal design (Webster's)`
      },
    ]
  },
  {
    id: 'electrical',
    title: 'Electrical Engineering',
    titleNp: 'इलेक्ट्रिकल इन्जिनियरिङ',
    icon: '⚡',
    items: [
      {
        title: 'Circuit Analysis',
        content: `**Ohm's Law:** V = IR
**KCL:** sum of currents into node = 0
**KVL:** sum of voltage drops around loop = 0
**Series:** R = R₁+R₂+..., same current
**Parallel:** 1/R = 1/R₁+1/R₂+..., same voltage
**Thevenin:** any linear circuit = Vth + Rth in series
**Norton:** = In + Rn in parallel; In = Vth/Rth

**Power:** P = VI = I²R = V²/R
**Energy:** E = Pt (kWh)
**AC:** Vrms = Vpeak/√2; Z = √(R²+(XL-XC)²)`
      },
      {
        title: 'Electrical Machines',
        content: `**Transformer:** V₁/V₂ = N₁/N₂ = I₂/I₁
Efficiency η = output/input; losses: copper (I²R) + iron (hysteresis + eddy)
EMF equation: E = 4.44 f N Φm

**DC Motor:** Eb = V - IaRa; torque T ∝ ΦIa; speed N ∝ (V - IaRa)/Φ
Types: shunt (constant speed), series (high starting torque), compound

**Induction motor:** synchronous speed Ns = 120f/P; slip s = (Ns-N)/Ns
Starting torque ∝ s; full load slip 2-5%
**Alternator:** frequency f = P·N/120`
      },
      {
        title: 'Power Systems',
        content: `**Generation:** hydro (Nepal's main), thermal, solar, wind
**Transmission:** 132/220/400 kV; step-up at plant, step-down at substations
**Distribution:** 11kV/400V; LT (low tension) vs HT (high tension)
**Faults:** L-G, L-L, L-L-G, 3-phase; symmetrical (3φ) vs unsymmetrical
**Per-unit system:** normalize values: pu = actual/base
**Load flow:** Newton-Raphson, Gauss-Seidel for V, P, Q at buses
**Protection:** relays (overcurrent, distance, differential), circuit breakers (SF6, VCB)`
      },
      {
        title: 'Electronics Basics',
        content: `**Diode:** forward bias conducts (~0.7V Si), reverse blocks; rectifier (half/full wave)
**Zener:** reverse breakdown for voltage regulation
**BJT:** NPN/PNP; IC = βIB; modes: cutoff, active (amplifier), saturation (switch)
**FET/MOSFET:** voltage-controlled; high input impedance; digital switch
**Op-amp:** Vout = A(V+ - V-); inverting: -Rf/R1; non-inverting: (1+Rf/R1)
**Logic gates:** AND, OR, NOT, NAND, NOR, XOR; NAND/NOR universal
**555 timer:** astable (oscillator), monostable (one-shot)`
      },
      {
        title: 'Control Systems',
        content: `**Transfer function:** G(s) = output/input in Laplace domain
**Blocks:** series (multiply), parallel (add), feedback: G/(1+GH)
**Stability:** poles in left half plane = stable; Routh-Hurwitz criterion
**Steady-state error:** depends on system type (0,1,2) and input (step, ramp, parabola)
**PID:** P (proportional), I (eliminates offset), D (reduces overshoot)
**Bode plot:** gain margin, phase margin; PM > 45° for good response`
      },
      {
        title: 'Renewable Energy',
        content: `**Solar:** PV cells (efficiency 15-22%), net metering in Nepal
**Wind:** P = ½ρAV³ — power ∝ cube of wind speed
**Hydro:** Nepal's potential ~83,000 MW, developed ~2-3%; pico/micro (up to 100kW), small (1-100MW), large (>100MW)
**Biomass:** biogas (animal waste → methane), briquettes
**Tidal/Geothermal:** ocean and earth-heat based
**Storage:** lithium batteries, pumped hydro storage (PHS)`
      },
    ]
  },
  {
    id: 'mechanical',
    title: 'Mechanical Engineering',
    titleNp: 'मेकानिकल इन्जिनियरिङ',
    icon: '⚙️',
    items: [
      {
        title: 'Thermodynamics',
        content: `**Zeroth law:** thermal equilibrium transitivity
**1st law:** ΔU = Q - W (energy conservation)
**2nd law:** entropy ↑ in isolated systems; heat flows hot→cold
**3rd law:** entropy → 0 as T → 0K

**Gas laws:** PV = nRT; isothermal (T const), isobaric (P const), isochoric (V const), adiabatic (Q=0, PV^γ=const)
**Carnot efficiency:** η = 1 - Tc/Th (maximum possible)
**Specific heats:** cp - cv = R; γ = cp/cv (air 1.4)`
      },
      {
        title: 'Mechanics of Materials',
        content: `**Stress:** σ = F/A; strain ε = δ/L; Hooke's law σ = Eε
**Poisson's ratio:** ν = -εlateral/εaxial (~0.3 steel)
**Shear:** τ = V/A; G = shear modulus
**Bulk modulus:** K = -V(dP/dV)

**Axial deformation:** δ = PL/AE
**Thermal stress:** σ = EαΔT (if constrained)
**Bending:** σ = My/I; I (rect) = bh³/12, I (circle) = πd⁴/64
**Torsion:** τ = Tr/J; J (circle) = πd⁴/32
**Buckling (Euler):** Pcr = π²EI/L² (columns)`
      },
      {
        title: 'Fluid Mechanics',
        content: `**Properties:** density, viscosity (μ), surface tension (γ), compressibility
**Newtonian fluid:** τ = μ(dv/dy)
**Hydrostatics:** P = ρgh, Pascal's law, buoyancy (Archimedes: Fb = ρgV)

**Continuity:** A₁V₁ = A₂V₂
**Bernoulli:** P + ½ρV² + ρgh = constant
**Laminar vs turbulent:** Re < 2000 laminar (pipe)
**Poiseuille (laminar pipe flow):** Q = πΔP r⁴/8μL
**Boundary layer:** velocity gradient near surface; separation → drag`
      },
      {
        title: 'Manufacturing Processes',
        content: `**Casting:** molten metal into mold (sand casting, die casting, investment)
**Machining:** turning (lathe), milling, drilling, grinding — material removal
**Forming:** forging (hammer/press), rolling, extrusion, sheet bending
**Joining:** welding (arc, MIG, TIG), brazing, soldering, riveting
**Additive:** 3D printing (FDM, SLA, SLS)

**CNC:** computer-controlled machining; G-code
**Tolerances:** ±0.05mm typical machining; fits (clearance, transition, interference)`
      },
      {
        title: 'Heat Transfer',
        content: `**Conduction (Fourier):** Q = kAΔT/L — solids, k = thermal conductivity
**Convection (Newton):** Q = hAΔT — fluids, h = heat transfer coefficient
**Radiation (Stefan-Boltzmann):** Q = εσAT⁴ — no medium needed, σ = 5.67x10⁻⁸

**Composite walls:** resistances in series: R_total = Σ(L/kA)
**Fins:** extend surface area to increase heat dissipation
**Heat exchangers:** counter-flow (more efficient) vs parallel; LMTD method`
      },
      {
        title: 'Machine Design',
        content: `**Design process:** load analysis → material selection → failure theory → sizing → check
**Factor of safety:** FOS = ultimate stress/allowable stress (1.5-3 typical)

**Failure theories:** Maximum normal stress (brittle), Maximum shear stress/Tresca (ductile), von Mises (distortion energy)
**Gears:** involute profile; module m = d/N; gear ratio = N₂/N₁
**Shafts:** transmit torque; τ = 16T/πd³
**Bearings:** rolling (ball/roller) vs sliding; L10 life (revolutions for 90% reliability)
**Springs:** k = Gd⁴/8D³n (helical)`
      },
    ]
  },
  {
    id: 'med-anatomy',
    title: 'Medical Anatomy',
    titleNp: 'मेडिकल एनाटोमी',
    icon: '🦴',
    items: [
      {
        title: 'Skeletal System',
        content: `**206 bones adult** (270 at birth, fuse down)
**Axial skeleton:** skull (22), vertebral column (26), rib cage (24 + sternum)
**Appendicular:** limbs + girdles (126)

**Vertebrae:** 7 cervical, 12 thoracic, 5 lumbar, 5 sacral (fused), 4 coccygeal
**Skull sutures:** coronal, sagittal, lambdoid, squamous
**Long bone parts:** epiphysis (ends), diaphysis (shaft), metaphysis (growth plate)

**Joints:** fibrous (skull sutures — immovable), cartilaginous (vertebrae — slightly movable), synovial (knee — freely movable)
**Synovial types:** ball & socket (hip), hinge (elbow), pivot (neck), saddle (thumb)`
      },
      {
        title: 'Muscular System',
        content: `**3 muscle types:** skeletal (voluntary, striated), cardiac (involuntary, striated), smooth (involuntary, non-striated)
**Skeletal muscle structure:** muscle → fascicle → fiber (cell) → myofibril → sarcomere

**Sarcomere:** Z-line to Z-line; actin (thin) + myosin (thick)
**Sliding filament theory:** myosin heads pull actin → shortening
**Neuromuscular junction:** ACh neurotransmitter; motor unit = neuron + fibers

**Major muscles:** biceps (flex elbow), triceps (extend), deltoid (abduct shoulder), quadriceps (extend knee), hamstrings (flex knee), gastrocnemius (calf, plantarflex)`
      },
      {
        title: 'Circulatory System',
        content: `**Heart:** 4 chambers — 2 atria (receiving), 2 ventricles (pumping)
**Valves:** tricuspid (RA→RV), bicuspid/mitral (LA→LV), pulmonary, aortic
**Blood flow:** RA → RV → lungs (pulmonary) → LA → LV → body (systemic)

**Heartbeat:** SA node (pacemaker) → AV node → bundle of His → Purkinje fibers
**Cardiac output:** CO = HR x SV (~5 L/min)
**Blood pressure:** systolic/diastolic ~120/80 mmHg

**Blood:** RBC (O₂ via Hb), WBC (immunity), platelets (clotting), plasma (55%)
**Blood groups:** ABO + Rh; O- universal donor, AB+ universal recipient`
      },
      {
        title: 'Nervous System',
        content: `**CNS:** brain + spinal cord; **PNS:** cranial (12) + spinal (31) nerves
**Neuron:** dendrites (receive) → cell body → axon (send) → terminal buttons
**Myelin:** speeds conduction; oligodendrocytes (CNS), Schwann (PNS)

**Action potential:** -70mV resting → +30mV peak (Na+ in) → repolarize (K+ out)
**Synapse:** electrical (gap junctions) vs chemical (neurotransmitters)
**Brain regions:** cerebrum (thinking), cerebellum (coordination), brainstem (vital: breathing, HR), hypothalamus (homeostasis), amygdala (emotion)`
      },
      {
        title: 'Respiratory System',
        content: `**Airway:** nose → pharynx → larynx → trachea → bronchi → bronchioles → alveoli
**Lungs:** right 3 lobes, left 2 lobes (cardiac notch)

**Breathing:** diaphragm contracts → thoracic volume ↑ → pressure ↓ → air in
**Lung volumes:** TV 500ml, IRV ~3100ml, ERV ~1200ml, RV ~1200ml
**Vital capacity:** TV + IRV + ERV ≈ 4.8L
**Total lung capacity:** VC + RV ≈ 6L

**Gas exchange:** O₂ into blood (Hb), CO₂ out; diffusion across alveolar-capillary membrane
**Control:** respiratory center in medulla; CO₂ (not O₂) is the main driver
**Oxygen saturation:** SpO₂ normal 95-100%`
      },
    ]
  },
  {
    id: 'med-pharma',
    title: 'Medical Pharmacology',
    titleNp: 'मेडिकल फार्माकोलोजी',
    icon: '💊',
    items: [
      {
        title: 'Drug Classification Basics',
        content: `**By source:** natural (morphine), synthetic (aspirin), semi-synthetic
**By action:** agonist (activates receptor), antagonist (blocks)
**By body system:** CVS, CNS, respiratory, GI, endocrine drugs

**Pharmacokinetics (what body does to drug):** ADME
Absorption (oral/IV/IM/sublingual), Distribution (blood→tissues), Metabolism (liver, CYP450), Excretion (kidney, bile)

**Pharmacodynamics (what drug does to body):** receptor binding, enzyme inhibition
**Half-life (t½):** time for plasma conc to halve; 4-5 half-lives to steady state`
      },
      {
        title: 'Antibiotics',
        content: `**Mechanism:** inhibit cell wall (penicillins), protein synthesis (tetracyclines, macrolides), DNA (fluoroquinolones), folate (sulfonamides)
**Penicillins:** amoxicillin — cell wall; β-lactamase resistant: cloxacillin
**Cephalosporins:** 1st-5th gen (wider spectrum); ceftriaxone (3rd gen, meningitis)
**Macrolides:** azithromycin (atypical pneumonia, URTI)
**Tetracyclines:** doxycycline (rickettsia, acne, malaria prophylaxis)
**Aminoglycosides:** gentamicin (severe Gram -ve; nephro/ototoxic)
**Fluoroquinolones:** ciprofloxacin (UTI, GI); avoid in kids (cartilage)
**Metronidazole:** anaerobes, amoebiasis, giardiasis`
      },
      {
        title: 'Painkillers & NSAIDs',
        content: `**Paracetamol (acetaminophen):** antipyretic + analgesic; safe dose 4g/day; overdose → liver toxicity (N-acetylcysteine antidote)
**Aspirin (NSAID):** antiplatelet (low dose 75-325mg), analgesic, anti-inflammatory; Reye's syndrome in kids
**Ibuprofen:** common NSAID; GI bleeding risk with long use
**Diclofenac:** strong NSAID; topical gel common

**Opioids (strong pain):** morphine, tramadol, pethidine — CNS depression, addiction risk
**Local anesthetics:** lidocaine (amide), procaine (ester) — block Na+ channels`
      },
      {
        title: 'CVS Drugs',
        content: `**Antihypertensives:**
ACE inhibitors: enalapril (cough side effect)
ARBs: losartan (no cough)
Beta-blockers: metoprolol (HR ↓, contraindicated in asthma)
Calcium channel blockers: amlodipine
Diuretics: furosemide (loop), HCTZ (thiazide)

**Anti-anginal:** nitroglycerin (vasodilator, sublingual)
**Anticoagulants:** warfarin (vitamin K antagonist), heparin (immediate), DOACs (apixaban)
**Antiplatelets:** aspirin, clopidogrel
**Statins:** atorvastatin (cholesterol ↓)
**Digoxin:** heart failure, AF (narrow therapeutic window)`
      },
      {
        title: 'Side Effects & Interactions',
        content: `**Common ADRs:** nausea, dizziness, rash, diarrhea, drowsiness

**Important toxicities:**
Paracetamol → liver; Gentamicin → kidney + ear; Warfarin → bleeding (vitamin K antidote); Methotrexate → bone marrow; Digoxin → arrhythmia

**Drug interactions:**
Warfarin + aspirin → bleeding ↑
ACE-I + K-sparing diuretics → hyperkalemia
CYP450 inhibitors (ketoconazole) raise drug levels
Alcohol + paracetamol → liver toxicity

**Pregnancy:** category A (safe) to X (teratogenic); avoid isotretinoin, warfarin, ACE-I`
      },
    ]
  },
  {
    id: 'med-micro',
    title: 'Microbiology',
    titleNp: 'माइक्रोबायोलोजी',
    icon: '🦠',
    items: [
      {
        title: 'Bacteria Basics',
        content: `**Prokaryotes:** no nucleus, no membrane organelles, peptidoglycan cell wall, 70S ribosomes
**Shapes:** cocci (round), bacilli (rod), spirilla (spiral), vibrio (comma)
**Gram staining:** Gram + (thick peptidoglycan, purple), Gram - (thin + outer membrane, pink)

**Clinically important:**
Staph aureus (boils, MRSA), Strep pyogenes (throat), E. coli (UTI), Salmonella (typhoid), Vibrio cholerae (diarrhea), Mycobacterium TB (acid-fast), Clostridium tetani (tetanus)

**Spores:** Clostridium/Bacillus — resistant to heat/chemicals
**Culture media:** blood agar, MacConkey (selective for Gram -ve)`
      },
      {
        title: 'Viruses',
        content: `**Structure:** nucleic acid (DNA/RNA) + protein capsid; obligate intracellular parasites
**No ribosomes, no metabolism** — need host cell machinery

**Classification:** DNA (herpes, hepatitis B, HPV) vs RNA (influenza, HIV, HCV, polio, corona)
**Enveloped vs non-enveloped:** envelope = lipid membrane (easier to kill with alcohol)

**Important viruses:** HIV (CD4 ↓, AIDS), Influenza (RNA, antigenic drift/shift), Hepatitis B (DNA, liver), COVID-19 (SARS-CoV-2), Dengue (mosquito), Rabies (fatal, post-exposure vaccine)

**Antivirals:** acyclovir (HSV), oseltamivir (influenza), ART for HIV`
      },
      {
        title: 'Immunity',
        content: `**Innate immunity:** first line — skin, mucus, phagocytes (macrophages, neutrophils), complement, inflammation
**Adaptive immunity:** specific, memory — B cells (antibodies) + T cells

**B cells → antibodies (humoral):** IgG (most abundant, crosses placenta), IgA (mucosa), IgM (first response), IgE (allergy/parasites), IgD
**T cells (cellular):** CD4 helper (orchestrates), CD8 cytotoxic (kills infected)

**Vaccination:** active immunity (memory); attenuated (MMR), killed (polio IPV), subunit (HepB), mRNA (COVID)
**Antigen vs antibody:** antigen = foreign trigger; antibody = produced defense
**Autoimmunity:** self-attack (RA, SLE, type 1 DM)`
      },
      {
        title: 'Infectious Diseases',
        content: `**Transmission:** airborne (TB, flu), droplet (COVID, measles), fecal-oral (cholera, typhoid, hepatitis A), blood (HIV, HepB), vector (malaria, dengue)

**Major Nepal diseases:**
Malaria (Plasmodium, mosquito), Dengue (Aedes), TB (Mycobacterium), Typhoid (Salmonella typhi), Cholera (Vibrio), Japanese encephalitis (Culex mosquito), Rabies, Leishmaniasis (sandfly)

**Prevention:** sanitation, vaccination, vector control (nets, insecticide), safe water, hand hygiene
**Outbreak control:** isolate, trace contacts, quarantine, surveillance`
      },
      {
        title: 'Parasites',
        content: `**Protozoa (single cell):** Plasmodium (malaria), Entamoeba (amoebic dysentery), Giardia, Leishmania (kala-azar)
**Helminths (worms):**
Roundworms: Ascaris, hookworm (Ancylostoma)
Tapeworms: Taenia (pork/beef)
Flukes: Schistosoma (blood), Fasciola (liver)

**Life cycle basics:** definitive host (adult stage) vs intermediate host (larval)
**Diagnosis:** stool microscopy (ova/cysts), blood smear (malaria), serology
**Treatment:** antihelminthics (albendazole, ivermectin), antimalarials (artemisinin combo)`
      },
    ]
  },
  {
    id: 'med-biochem',
    title: 'Biochemistry',
    titleNp: 'बायोकेमिस्ट्री',
    icon: '🧬',
    items: [
      {
        title: 'Carbohydrate Metabolism',
        content: `**Glycolysis (cytosol):** glucose → 2 pyruvate; net 2 ATP + 2 NADH; anaerobic → lactate
**Krebs/TCA cycle (mitochondria):** acetyl-CoA → CO₂; 3 NADH + 1 FADH₂ + 1 GTP per turn
**ETC/oxidative phosphorylation:** 1 NADH ≈ 2.5 ATP, 1 FADH₂ ≈ 1.5 ATP
**Total glucose oxidation:** ~30-32 ATP

**Glycogenesis/glycogenolysis:** storage/release (liver, muscle)
**Gluconeogenesis:** pyruvate → glucose (fasting, liver)
**Diabetes:** type 1 (insulin deficiency), type 2 (resistance); HbA1c reflects 3-month glucose`
      },
      {
        title: 'Protein Synthesis',
        content: `**Central dogma:** DNA → (transcription) → mRNA → (translation) → protein
**Transcription (nucleus):** RNA polymerase; mRNA from DNA template; splicing removes introns
**Genetic code:** 64 codons, 61 sense + 3 stop (UAA, UAG, UGA); AUG = start (methionine)

**Translation (ribosome):** mRNA + tRNA (anticodon) + rRNA
A site (aminoacyl), P site (peptidyl), E site (exit)
**Mutations:** point (missense, nonsense, silent), frameshift (insertion/deletion)

**Protein structure:** primary (sequence), secondary (α-helix, β-sheet), tertiary (3D), quaternary (multi-subunit)`
      },
      {
        title: 'Enzymes',
        content: `**Enzymes = biological catalysts (mostly proteins)** — lower activation energy, not consumed
**Active site:** substrate binds; lock-and-key vs induced fit
**Cofactors:** inorganic (Zn²⁺, Mg²⁺); coenzymes = organic (NAD⁺, FAD, vitamin-derived)

**Kinetics (Michaelis-Menten):** V = Vmax[S]/(Km + [S])
Km = substrate conc at ½Vmax (lower Km = higher affinity)
**Lineweaver-Burk:** 1/V vs 1/[S] linear

**Inhibition:** competitive (Km ↑, Vmax same), non-competitive (Vmax ↓, Km same)
**Regulation:** allosteric, feedback inhibition, phosphorylation
**Enzymes of clinical value:** ALT/AST (liver), CK-MB/troponin (heart), amylase (pancreas)`
      },
      {
        title: 'Vitamins',
        content: `**Water-soluble (B, C):** not stored, excreted; deficiency quick
B1 thiamine → beriberi; B3 niacin → pellagra (3 Ds); B9 folate → neural tube defects (pregnancy); B12 cobalamin → pernicious anemia (needs IF); C → scurvy

**Fat-soluble (A, D, E, K):** stored in fat; toxicity possible
A (retinol) → night blindness; D → rickets/osteomalacia (from sun); E (tocopherol) → antioxidant; K → bleeding (coagulation factors)

**Rich sources:** B12 (meat), C (citrus), D (sun/fish oil), A (liver, carrots - carotene)
**Mnemonic A-D-E-K = "All Doctors Eat Kids"**`
      },
      {
        title: 'Hormones',
        content: `**Endocrine glands:** pituitary (master), thyroid, adrenal, pancreas, gonads
**Pituitary:** GH (growth), TSH, ACTH, FSH/LH, ADH (water), oxytocin

**Thyroid:** T3/T4 (metabolism ↑), calcitonin (Ca ↓)
**Parathyroid:** PTH (Ca ↑ from bone)
**Adrenal:** cortisol (stress, glucose ↑), aldosterone (Na⁺/water), adrenaline (fight-flight)

**Pancreas:** insulin (glucose ↓), glucagon (glucose ↑)
**Gonads:** testosterone (male), estrogen/progesterone (female)
**Feedback:** negative (most) — e.g., thyroid hormones inhibit TSH`
      },
    ]
  },
  {
    id: 'english-2',
    title: 'English Writing',
    titleNp: 'अङ्ग्रेजी लेखन',
    icon: '✍️',
    items: [
      {
        title: 'Essay Structure',
        content: `**Structure: Intro → Body (2-3 paras) → Conclusion**
**Intro:** hook + thesis statement (main argument)
**Body paragraphs:** topic sentence → evidence/example → analysis → link
**Conclusion:** restate thesis (new words) + final thought

**Transitions:** however, therefore, moreover, in contrast, consequently, for instance
**Word count rule:** intro 10-15%, body 70-80%, conclusion 10%

**Tone:** formal for exams — no contractions (don't → do not), no slang
**Punctuation check:** commas in lists, periods at end, capital letters for proper nouns`
      },
      {
        title: 'Report & Letter Format',
        content: `**Formal letter (block format):**
Your address → date → recipient address → salutation (Dear Sir/Madam) → subject line → body → closing (Yours faithfully, + signature)

**Report structure:**
Title → introduction (purpose) → findings (organized by theme) → conclusion → recommendations

**Business email:** clear subject line, greeting, short paragraphs, call to action, sign-off

**Common exam topics:** write a letter to editor, report on event, application for job/scholarship, complaint letter`
      },
      {
        title: 'Common Grammar Errors',
        content: `**Its vs It's:** its = possessive; it's = it is
**Their/There/They're:** their = possessive, there = place, they're = they are
**Affect vs Effect:** affect = verb, effect = noun
**Then vs Than:** then = time, than = comparison
**Who vs Whom:** who = subject, whom = object

**Subject-verb agreement:** "The team IS playing" (team = singular)
**Run-ons:** join with period, comma + conjunction, or semicolon
**Dangling modifier:** "Walking home, the rain started" ✗ → "Walking home, I felt rain" ✓`
      },
      {
        title: 'Paragraph Writing',
        content: `**Topic sentence** — states the main idea (first sentence)
**Supporting sentences** — evidence, examples, reasons (3-5 sentences)
**Concluding sentence** — wraps up the idea

**Unity:** every sentence supports the topic
**Coherence:** logical order (chronological, spatial, order of importance)
**Development:** use examples, statistics, anecdotes, definitions

**Paragraph length:** 5-8 sentences, 80-120 words typical
**Connectors:** first, next, then, finally (sequence); because, since, as (cause); but, however (contrast)`
      },
    ]
  },
  {
    id: 'aptitude-2',
    title: 'Aptitude Advanced',
    titleNp: 'एप्टिच्युड एडभान्स',
    icon: '🎯',
    items: [
      {
        title: 'Data Interpretation',
        content: `**Tables:** read carefully — units, totals, headers
**Bar/Line charts:** compare values; note scale (lakhs, crores, %)
**Pie charts:** angle = (value/total) × 360°; 1% = 3.6°
**Percentage change:** (new - old)/old × 100

**Trick:** in DI, check units FIRST — many traps are lakh vs crore vs thousand
**Approximation:** round numbers for speed; options are usually far apart
**Time strategy:** DI sets take 2-3 min each; do easy sets first`
      },
      {
        title: 'Blood Relations',
        content: `**Immediate family:** father, mother, brother, sister, son, daughter, spouse
**Extended:** uncle (father's brother / mother's brother), aunt, cousin, nephew, niece, grandfather, grandmother

**In-laws:** father-in-law, mother-in-law, son-in-law, daughter-in-law, brother-in-law, sister-in-law

**Trick:** draw a family tree — squares (male), circles (female), = or - for marriage, vertical line for children
**Common question:** "Pointing to a photo, Ramesh says 'She is the daughter of my grandfather's only son' → who is she?" = Ramesh's sister (grandfather's only son = father)`
      },
      {
        title: 'Coding-Decoding',
        content: `**Letter shift:** each letter shifted by fixed number (A→D = +3)
**Reverse alphabet:** A↔Z, B↔Y (A=26, B=25...)
**Word → code:** "CAT" → "DBU" (+1 each letter)
**Number coding:** position in alphabet (A=1, B=2...)

**Trick:** identify the pattern FIRST (shift, reverse, vowel/consonant rules)
**Mixed:** sometimes letters shift differently (odd positions +2, even -1)
**Practice:** if A=1, Z=26; then "NEPAL" = 14 5 16 1 12`
      },
      {
        title: 'Direction Sense',
        content: `**4 main directions:** N, S, E, W; 4 diagonals: NE, SE, SW, NW
**Turn rules:** left turn = 90° counterclockwise, right = 90° clockwise
**Displacement:** shortest distance = straight line (Pythagoras for right angles)

**Example:** "Walk 5km north, turn right, walk 3km, turn right, walk 5km → where?" = 3km east of start
**Trick:** draw on paper; cancel out opposite movements (N-S, E-W)
**Sun direction:** sunrise = east, sunset = west (basic assumption)
**Clock angles:** hour hand 30°/hr, minute hand 6°/min`
      },
    ]
  },
  {
    id: 'g.k',
    title: 'General Knowledge',
    titleNp: 'सामान्य ज्ञान',
    icon: '🌏',
    items: [
      {
        title: 'Nepal Geography',
        content: `**Area:** 147,516 km²; borders: China (north), India (east/south/west)
**Provinces:** 7 — Koshi, Madhesh, Bagmati, Gandaki, Lumbini, Karnali, Sudurpashchim
**Highest peak:** Mt. Everest 8,848m (Sagarmatha); lowest: Kechana Kalan ~60m

**Districts:** 77 (was 14 zones, 75 districts)
**Rivers:** Koshi (east), Gandaki/Narayani (center), Karnali (west)
**Climate:** tropical (Terai) → alpine (Himalaya)
**National symbols:** animal = cow, bird = Lophophorus (Danfe), flower = Rhododendron (Laligurans), color = crimson`
      },
      {
        title: 'World Capitals & Countries',
        content: `**Asia:** China-Beijing, India-New Delhi, Japan-Tokyo, Korea-Seoul, Thailand-Bangkok, UAE-Abu Dhabi (not Dubai!)
**Europe:** UK-London, France-Paris, Germany-Berlin, Russia-Moscow, Italy-Rome
**Americas:** USA-Washington DC, Canada-Ottawa (not Toronto), Brazil-Brasilia (not Rio), Mexico-Mexico City
**Africa:** Egypt-Cairo, Nigeria-Abuja, South Africa-Pretoria (3 capitals), Kenya-Nairobi
**Oceania:** Australia-Canberra (not Sydney), New Zealand-Wellington

**Trick:** capital is often NOT the biggest city (Canberra, Ottawa, Brasilia, Washington DC, Abuja)`
      },
      {
        title: 'Science GK',
        content: `**Units:** force = Newton, pressure = Pascal, energy = Joule, power = Watt, frequency = Hertz, charge = Coulomb
**Elements:** H (1), He (2), C (6), N (7), O (8), Na (11), Fe (26), Au (79), Pb (82)
**Periodic table:** 118 elements; groups = columns, periods = rows

**Physics facts:** speed of light 3×10⁸ m/s, sound 343 m/s in air, gravity 9.8 m/s², water boils 100°C
**Human body:** 206 bones, 639 muscles, heart beats ~72/min, blood volume ~5L, skin largest organ
**Planets:** Mercury (nearest), Venus (hottest), Jupiter (largest), Saturn (rings)`
      },
      {
        title: 'Sports GK',
        content: `**Olympics:** every 4 years; 2024 Paris, 2028 Los Angeles; motto "Faster, Higher, Stronger"
**World Cup (football):** every 4 years; Brazil most titles (5)
**Cricket:** 2011 WC India, 2019 England, 2023 Australia; T20 WC 2024 India

**Nepal sports:** cricket = national obsession (national team "Rhinos"), football = ANFA
**Key terms:** cricket (wicket, boundary, LBW, powerplay), football (offside, penalty, hat-trick), tennis (deuce, ace, grand slam)
**Notable athletes:** Sandeep Lamichhane (cricket), Paras Khadka (former captain)`
      },
      {
        title: 'Constitution & Nepal Basics',
        content: `**Nepal Constitution 2072 (2015):** promulgated 3rd Ashoj 2072 (Sep 20, 2015)
**Federal republic:** 3 tiers — federal, provincial, local
**President:** ceremonial head; Prime Minister = executive head
**Parliament:** House of Representatives (275) + National Assembly (59)

**Key dates:** Republic declared 2065 Jestha 15 (May 28, 2008); Constitution Day = 3rd Ashoj
**National symbols:** anthem "Sayaun Thunga Phoolka Hami", flag = world's only non-quadrilateral
**Religion:** ~81% Hindu, Buddhist 9%, Muslim 4%`
      },
    ]
  },
  {
    id: 'formula-sheet',
    title: 'Formula Sheets',
    titleNp: 'सूत्र संग्रह',
    icon: '📋',
    items: [
      {
        title: 'Physics Formula Sheet',
        content: `**Kinematics:** v = u+at; s = ut+½at²; v² = u²+2as
**Force:** F = ma; friction f = μN; centripetal F = mv²/r
**Work-Energy:** W = Fd cosθ; KE = ½mv²; PE = mgh
**Power:** P = W/t = Fv

**Gravity:** F = Gm₁m₂/r²; g = GM/R²; escape v = √(2gR)
**SHM:** T = 2π√(m/k) (spring); T = 2π√(L/g) (pendulum)
**Waves:** v = fλ; Doppler f' = f(v±vo)/(v∓vs)
**Electricity:** V = IR; P = VI; C = Q/V; E = ½CV²
**Optics:** 1/f = 1/u + 1/v; Snell n₁sinθ₁ = n₂sinθ₂
**Modern:** E = hf; λ = h/mv (de Broglie); E = mc²`
      },
      {
        title: 'Chemistry Formula Sheet',
        content: `**Mole:** n = mass/molar mass = N/NA (NA = 6.022×10²³)
**Molarity:** M = moles/L; **Molality:** m = moles/kg
**Dilution:** M₁V₁ = M₂V₂

**Ideal gas:** PV = nRT (R = 0.0821 L·atm/mol·K)
**pH:** pH = -log[H⁺]; pH + pOH = 14
**Nernst:** E = E° - (0.059/n)logQ (25°C)

**Rate law:** rate = k[A]^m[B]^n
**Arrhenius:** k = Ae^(-Ea/RT)
**Equilibrium:** Kc = [products]/[reactants]; Kp = Kc(RT)^Δn
**% yield** = (actual/theoretical) × 100`
      },
      {
        title: 'Math Formula Sheet',
        content: `**Quadratic:** x = [-b ± √(b²-4ac)]/2a; sum = -b/a, product = c/a
**AP:** Tn = a+(n-1)d; Sn = n/2[2a+(n-1)d]
**GP:** Tn = ar^(n-1); Sn = a(rⁿ-1)/(r-1); S∞ = a/(1-r), |r|<1

**Trig:** sin²θ + cos²θ = 1; tan = sin/cos
sin(A+B) = sinAcosB + cosAsinB
cos(A+B) = cosAcosB - sinAsinB
**Derivatives:** d/dx xⁿ = nxⁿ⁻¹; d/dx sinx = cosx; d/dx eˣ = eˣ
**Integrals:** ∫xⁿdx = xⁿ⁺¹/(n+1); ∫1/x dx = ln|x|

**Vectors:** a·b = |a||b|cosθ; |a×b| = |a||b|sinθ
**Log:** log(ab) = loga + logb; log(a/b) = loga - logb`
      },
      {
        title: 'Biology Facts Sheet',
        content: `**Cell:** mitochondria = powerhouse; nucleus = control center; ribosome = protein factory; lysosome = waste disposal
**DNA:** A-T, G-C; 46 chromosomes human; 23 pairs

**Blood:** RBC 4.5-5.5 million/mm³; WBC 4,000-11,000; platelets 1.5-4 lakh
**Heart:** 72 bpm; cardiac output 5L/min
**Kidney:** nephron = functional unit; ~1 million/kidney

**Vitamins:** A (vision), D (bones), K (clotting), C (scurvy), B12 (anemia)
**Hormones:** insulin (blood sugar ↓), thyroxine (metabolism), adrenaline (stress)
**Photosynthesis:** 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll)`
      },
      {
        title: 'Electrical Formulas',
        content: `**Ohm's law:** V = IR
**Resistors:** series R = R₁+R₂+...; parallel 1/R = 1/R₁+1/R₂+...
**Power:** P = VI = I²R = V²/R

**Capacitor:** Q = CV; series 1/C = Σ1/Ci; parallel C = ΣCi
**AC:** XL = 2πfL; XC = 1/2πfC; Z = √(R²+(XL-XC)²); Vrms = Vpeak/√2
**Transformer:** V₁/V₂ = N₁/N₂; η = out/in

**Motor:** Eb = V - IaRa; N ∝ (V-IaRa)/Φ
**Induction:** Ns = 120f/P; slip s = (Ns-N)/Ns
**Energy:** E(kWh) = P(kW) × t(h)
**Three-phase power:** P = √3 VL IL cosφ`
      },
      {
        title: 'Mechanics Formulas',
        content: `**Stress/strain:** σ = F/A; ε = δ/L; E = σ/ε (Young's)
**Axial deformation:** δ = PL/AE
**Poisson:** ν = -εlat/εaxial

**Bending:** σ = My/I; I_rect = bh³/12; I_circle = πd⁴/64
**Torsion:** τ = Tr/J; J = πd⁴/32
**Buckling:** Pcr = π²EI/L² (Euler)
**Beam deflection (UDL, simply supported):** δmax = 5wL⁴/384EI

**Thermodynamics:** PV = nRT; ΔU = Q-W; η_carnot = 1-Tc/Th
**Fluid:** P = ρgh; Q = Av (continuity); Re = ρVD/μ
**Heat conduction:** Q = kAΔT/L`
      },
    ]
  },
]
