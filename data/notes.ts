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
]
