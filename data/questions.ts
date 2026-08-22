export interface Question {
  id: number
  subject: 'math' | 'physics' | 'chemistry' | 'biology'
  topic: string
  text: string
  options: string[]
  correct: number // 0-indexed
  explanation?: string
}

export const questions: Question[] = [
  // MATH
  {
    id: 1,
    subject: 'math',
    topic: 'Calculus - Differentiation',
    text: "If f(x) = x^3 - 3x^2 + 2x, then f'(x) = ?",
    options: ['3x^2 - 6x + 2', '3x^2 - 6x', 'x^2 - 3x + 2', '3x - 6'],
    correct: 0,
    explanation: "f'(x) = d/dx(x^3) - d/dx(3x^2) + d/dx(2x) = 3x^2 - 6x + 2"
  },
  {
    id: 2,
    subject: 'math',
    topic: 'Calculus',
    text: "What is the value of sin(pi/2)?",
    options: ['0', '1', '-1', 'pi/2'],
    correct: 1,
    explanation: "sin(pi/2) = 1. This is a standard trigonometry value."
  },
  {
    id: 3,
    subject: 'math',
    topic: 'Algebra',
    text: "If alpha and beta are roots of x^2 - 5x + 6 = 0, then alpha + beta = ?",
    options: ['5', '6', '-5', '-6'],
    correct: 0,
    explanation: "By Vieta's formulas, sum of roots = -b/a = -(-5)/1 = 5"
  },
  {
    id: 4,
    subject: 'math',
    topic: 'Algebra',
    text: "The 5th term of the AP: 2, 5, 8, 11... is:",
    options: ['14', '13', '15', '17'],
    correct: 0,
    explanation: "AP: a=2, d=3. T5 = a + 4d = 2 + 4(3) = 14"
  },
  {
    id: 5,
    subject: 'math',
    topic: 'Coordinate Geometry',
    text: "Distance between points (1,2) and (4,6) is:",
    options: ['3', '4', '5', '6'],
    correct: 2,
    explanation: "d = sqrt[(4-1)^2 + (6-2)^2] = sqrt[9 + 16] = sqrt(25) = 5"
  },
  // PHYSICS
  {
    id: 6,
    subject: 'physics',
    topic: 'Mechanics - Kinematics',
    text: "A body travels 100m in 10s with constant acceleration. Its initial velocity is 0. Acceleration = ?",
    options: ['1 m/s^2', '2 m/s^2', '5 m/s^2', '10 m/s^2'],
    correct: 1,
    explanation: "s = ut + 1/2 at^2. 100 = 0 + 1/2(a)(100) -> a = 2 m/s^2"
  },
  {
    id: 7,
    subject: 'physics',
    topic: "Mechanics - Newton's Laws",
    text: "A force of 10N acts on a 2kg mass. Acceleration produced is:",
    options: ['2 m/s^2', '5 m/s^2', '10 m/s^2', '20 m/s^2'],
    correct: 1,
    explanation: "F = ma -> a = F/m = 10/2 = 5 m/s^2"
  },
  {
    id: 8,
    subject: 'physics',
    topic: 'Waves & Optics',
    text: "Speed of light in vacuum is approximately:",
    options: ['3 x 10^6 m/s', '3 x 10^8 m/s', '3 x 10^7 m/s', '3 x 10^5 m/s'],
    correct: 1,
    explanation: "Speed of light c = 3 x 10^8 m/s (approx 299,792,458 m/s)"
  },
  {
    id: 9,
    subject: 'physics',
    topic: 'Thermodynamics',
    text: "At absolute zero (0 K), the kinetic energy of gas molecules is:",
    options: ['Maximum', 'Minimum but not zero', 'Zero', 'Equal to room temperature'],
    correct: 2,
    explanation: "At absolute zero (0 K), molecular motion essentially stops - kinetic energy = 0"
  },
  {
    id: 10,
    subject: 'physics',
    topic: 'Electricity',
    text: "Ohm's Law is:",
    options: ['V = IR', 'V = I/R', 'V = R/I', 'V = I + R'],
    correct: 0,
    explanation: "Ohm's Law: V = IR, where V=voltage, I=current, R=resistance"
  },
  // CHEMISTRY
  {
    id: 11,
    subject: 'chemistry',
    topic: 'Atomic Structure',
    text: "Maximum number of electrons in a subshell with l=2 is:",
    options: ['2', '6', '10', '14'],
    correct: 2,
    explanation: "For l=2 (d subshell), maximum electrons = 2(2l+1) = 2(5) = 10"
  },
  {
    id: 12,
    subject: 'chemistry',
    topic: 'Periodic Table',
    text: "Which element has the highest electronegativity?",
    options: ['Oxygen', 'Nitrogen', 'Fluorine', 'Chlorine'],
    correct: 2,
    explanation: "Fluorine (EN = 3.98) is the most electronegative element on the Pauling scale"
  },
  {
    id: 13,
    subject: 'chemistry',
    topic: 'Chemical Bonding',
    text: "Hybridization of carbon in CH4 (methane) is:",
    options: ['sp', 'sp^2', 'sp^3', 'sp^3d'],
    correct: 2,
    explanation: "In CH4, carbon forms 4 equivalent bonds with 109.5 degree angles -> sp3 hybridization"
  },
  {
    id: 14,
    subject: 'chemistry',
    topic: 'Electrochemistry',
    text: "Standard electrode potential of hydrogen electrode is defined as:",
    options: ['0 V', '1 V', '-1 V', '0.5 V'],
    correct: 0,
    explanation: "By convention, the standard hydrogen electrode (SHE) is assigned a potential of 0.00 V at 1 M H+ and 1 atm H2"
  },
  {
    id: 15,
    subject: 'chemistry',
    topic: 'Organic Chemistry',
    text: "The IUPAC name of CH3-CH=CH2 is:",
    options: ['Propane', 'Propene', 'Prop-1-ene', 'Prop-2-ene'],
    correct: 2,
    explanation: "CH3-CH=CH2 is propene with double bond at position 1: Prop-1-ene (or simply propene)"
  },
  // ─── EXTRA: MATH ───
  {
    id: 16,
    subject: 'math',
    topic: 'Calculus - Integration',
    text: "∫ x^2 dx = ?",
    options: ['x^3/3 + C', 'x^3 + C', '2x + C', 'x^2/2 + C'],
    correct: 0,
    explanation: "Power rule for integration: ∫ x^n dx = x^(n+1)/(n+1) + C. So ∫ x^2 dx = x^3/3 + C"
  },
  {
    id: 17,
    subject: 'math',
    topic: 'Trigonometry',
    text: "cos(0) = ?",
    options: ['0', '1', '-1', '1/2'],
    correct: 1,
    explanation: "cos(0) = 1, a standard value from the unit circle."
  },
  {
    id: 18,
    subject: 'math',
    topic: 'Algebra - Matrices',
    text: "The determinant of [[2,0],[0,3]] is:",
    options: ['5', '6', '0', '1'],
    correct: 1,
    explanation: "For a 2x2 diagonal matrix, det = product of diagonals = 2*3 = 6."
  },
  {
    id: 19,
    subject: 'math',
    topic: 'Coordinate Geometry',
    text: "Slope of line through (0,1) and (2,5) is:",
    options: ['1', '2', '3', '4'],
    correct: 1,
    explanation: "m = (y2-y1)/(x2-x1) = (5-1)/(2-0) = 4/2 = 2."
  },
  {
    id: 20,
    subject: 'math',
    topic: 'Probability',
    text: "Probability of getting heads in a fair coin toss:",
    options: ['1/4', '1/2', '1', '0'],
    correct: 1,
    explanation: "A fair coin has 2 equally likely outcomes; P(heads) = 1/2."
  },
  // ─── EXTRA: PHYSICS ───
  {
    id: 21,
    subject: 'physics',
    topic: 'Mechanics - Projectile',
    text: "Maximum range of a projectile is achieved at launch angle:",
    options: ['30°', '45°', '60°', '90°'],
    correct: 1,
    explanation: "Range R = u^2 sin(2θ)/g is maximum when sin(2θ)=1, i.e. θ = 45°."
  },
  {
    id: 22,
    subject: 'physics',
    topic: 'Waves & Optics',
    text: "The unit of frequency is:",
    options: ['Hertz', 'Watt', 'Newton', 'Joule'],
    correct: 0,
    explanation: "Frequency = cycles per second, unit Hertz (Hz)."
  },
  {
    id: 23,
    subject: 'physics',
    topic: 'Electricity',
    text: "Unit of electrical resistance is:",
    options: ['Ampere', 'Volt', 'Ohm', 'Coulomb'],
    correct: 2,
    explanation: "Resistance R = V/I, unit Ohm (Ω)."
  },
  {
    id: 24,
    subject: 'physics',
    topic: 'Magnetism',
    text: "The direction of magnetic field around a current-carrying wire is given by:",
    options: ['Left-hand rule', 'Right-hand grip rule', 'Fleming left rule', 'Ohm law'],
    correct: 1,
    explanation: "Right-hand grip rule: thumb = current, fingers curl = magnetic field direction."
  },
  {
    id: 25,
    subject: 'physics',
    topic: 'Modern Physics',
    text: "Photoelectric effect demonstrates:",
    options: ['Wave nature of light', 'Particle nature of light', 'Sound waves', 'Gravity'],
    correct: 1,
    explanation: "Photoelectric effect shows light behaves as particles (photons), supporting quantum theory."
  },
  // ─── EXTRA: CHEMISTRY ───
  {
    id: 26,
    subject: 'chemistry',
    topic: 'Periodic Table',
    text: "Which has the smallest atomic radius?",
    options: ['Na', 'Mg', 'Al', 'Cl'],
    correct: 3,
    explanation: "Across a period, atomic radius decreases; Cl is rightmost among these, so smallest."
  },
  {
    id: 27,
    subject: 'chemistry',
    topic: 'Chemical Bonding',
    text: "CO2 has which type of bonding?",
    options: ['Ionic', 'Covalent', 'Metallic', 'Coordinate only'],
    correct: 1,
    explanation: "CO2 is O=C=O, double covalent bonds between C and O."
  },
  {
    id: 28,
    subject: 'chemistry',
    topic: 'Acids & Bases',
    text: "pH of a neutral solution at 25°C is:",
    options: ['0', '7', '14', '1'],
    correct: 1,
    explanation: "Neutral water at 25°C has pH = 7."
  },
  {
    id: 29,
    subject: 'chemistry',
    topic: 'Electrochemistry',
    text: "A galvanic cell converts:",
    options: ['Chemical → Electrical', 'Electrical → Chemical', 'Heat → Electrical', 'Light → Chemical'],
    correct: 0,
    explanation: "Galvanic/voltaic cell converts chemical energy into electrical energy."
  },
  {
    id: 30,
    subject: 'chemistry',
    topic: 'Inorganic Chemistry',
    text: "Common name of NaHCO3 is:",
    options: ['Baking soda', 'Washing soda', 'Caustic soda', 'Table salt'],
    correct: 0,
    explanation: "NaHCO3 = sodium bicarbonate = baking soda."
  },
  {
    id: 31,
    subject: 'math',
    topic: 'Algebra',
    text: "If log10(100) = x, then x = ?",
    options: ['1', '2', '10', '0'],
    correct: 1,
    explanation: "log10(100) = log10(10^2) = 2."
  },
  {
    id: 32,
    subject: 'physics',
    topic: 'Thermodynamics',
    text: "The SI unit of heat is:",
    options: ['Calorie', 'Joule', 'Watt', 'Kelvin'],
    correct: 1,
    explanation: "Heat is energy; SI unit is Joule (J)."
  },
  {
    id: 33,
    subject: 'chemistry',
    topic: 'Organic Chemistry',
    text: "Functional group of alcohols is:",
    options: ['-COOH', '-OH', '-CHO', '-NH2'],
    correct: 1,
    explanation: "Alcohols contain the hydroxyl group -OH."
  },
  {
    id: 34,
    subject: 'math',
    topic: 'Calculus - Limits',
    text: "lim (x→0) sin(x)/x = ?",
    options: ['0', '1', '∞', 'undefined'],
    correct: 1,
    explanation: "Standard limit: lim(x→0) sin(x)/x = 1."
  },
  {
    id: 35,
    subject: 'physics',
    topic: 'Mechanics - Newton Laws',
    text: "Weight of a 10 kg mass on Earth (g=10 m/s^2) is:",
    options: ['10 N', '100 N', '1 N', '1000 N'],
    correct: 1,
    explanation: "W = mg = 10*10 = 100 N."
  },
  {
    id: 36,
    subject: 'chemistry',
    topic: 'Atomic Structure',
    text: "Number of neutrons in Carbon-14 (C, Z=6) is:",
    options: ['6', '8', '14', '7'],
    correct: 1,
    explanation: "Neutrons = A - Z = 14 - 6 = 8."
  },
  {
    id: 37,
    subject: 'math',
    topic: 'Vectors',
    text: "Magnitude of vector (3,4) is:",
    options: ['5', '7', '12', '1'],
    correct: 0,
    explanation: "|v| = sqrt(3^2 + 4^2) = sqrt(25) = 5."
  },
  {
    id: 38,
    subject: 'physics',
    topic: 'Waves & Optics',
    text: "Refractive index n = c/v relates to:",
    options: ['Speed of light in vacuum vs medium', 'Mass', 'Charge', 'Temperature'],
    correct: 0,
    explanation: "n = c/v where c is speed in vacuum, v in medium."
  },
  {
    id: 39,
    subject: 'math',
    topic: 'Coordinate Geometry',
    text: "Equation of a line with slope 2 through origin is:",
    options: ['y = 2x', 'y = x/2', 'y = 2', 'x = 2y'],
    correct: 0,
    explanation: "y = mx + c, with m=2 and c=0 → y = 2x."
  },
  {
    id: 40,
    subject: 'chemistry',
    topic: 'Periodic Table',
    text: "Group 1 elements are called:",
    options: ['Alkaline earth', 'Alkali metals', 'Halogens', 'Noble gases'],
    correct: 1,
    explanation: "Group 1 (excluding H) = alkali metals (Li, Na, K, ...)."
  },
  // BIOLOGY (MECEE medical entrance level)
  {
    id: 100,
    subject: 'biology',
    topic: 'Cell Biology - Organelles',
    text: "Which organelle is known as the 'powerhouse of the cell'?",
    options: ['Ribosome', 'Mitochondria', 'Golgi apparatus', 'Lysosome'],
    correct: 1,
    explanation: "Mitochondria produces ATP via cellular respiration (Krebs cycle + oxidative phosphorylation)."
  },
  {
    id: 101,
    subject: 'biology',
    topic: 'Cell Biology - Membrane',
    text: "Which process moves water across a selectively permeable membrane from low to high solute concentration?",
    options: ['Active transport', 'Osmosis', 'Diffusion', 'Endocytosis'],
    correct: 1,
    explanation: "Osmosis = movement of water across a semipermeable membrane toward higher solute concentration."
  },
  {
    id: 102,
    subject: 'biology',
    topic: 'Genetics - Mendelian',
    text: "In a monohybrid cross (Tt x Tt), what fraction of offspring is heterozygous (Tt)?",
    options: ['1/4', '1/2', '3/4', '1/3'],
    correct: 1,
    explanation: "Tt x Tt gives TT : Tt : tt = 1:2:1, so heterozygous = 2/4 = 1/2."
  },
  {
    id: 103,
    subject: 'biology',
    topic: 'Genetics - DNA',
    text: "In DNA, adenine pairs with which base?",
    options: ['Guanine', 'Cytosine', 'Thymine', 'Uracil'],
    correct: 2,
    explanation: "A-T (2 H-bonds) and G-C (3 H-bonds). Uracil replaces thymine in RNA only."
  },
  {
    id: 104,
    subject: 'biology',
    topic: 'Human Physiology - Blood',
    text: "Which blood cell type is responsible for immune defense?",
    options: ['Erythrocyte', 'Leukocyte', 'Thrombocyte', 'Reticulocyte'],
    correct: 1,
    explanation: "Leukocytes (WBCs) fight infection: neutrophils, lymphocytes, monocytes, etc."
  },
  {
    id: 105,
    subject: 'biology',
    topic: 'Human Physiology - Heart',
    text: "The normal resting heart rate for an adult human is approximately:",
    options: ['40-50 bpm', '60-100 bpm', '120-150 bpm', '150-200 bpm'],
    correct: 1,
    explanation: "Normal adult resting heart rate is 60-100 beats per minute."
  },
  {
    id: 106,
    subject: 'biology',
    topic: 'Botany - Photosynthesis',
    text: "Which pigment is the primary photosynthetic pigment in green plants?",
    options: ['Carotene', 'Xanthophyll', 'Chlorophyll a', 'Chlorophyll b'],
    correct: 2,
    explanation: "Chlorophyll a is primary; chlorophyll b and carotenoids are accessory pigments."
  },
  {
    id: 107,
    subject: 'biology',
    topic: 'Botany - Plant Tissues',
    text: "Xylem tissue is mainly responsible for:",
    options: ['Photosynthesis', 'Translocation of food', 'Water and mineral transport', 'Support only'],
    correct: 2,
    explanation: "Xylem conducts water + minerals upward; phloem translocates food."
  },
  {
    id: 108,
    subject: 'biology',
    topic: 'Zoology - Classification',
    text: "Which animal is NOT a mammal?",
    options: ['Whale', 'Dolphin', 'Bat', 'Shark'],
    correct: 3,
    explanation: "Shark is a fish (Chondrichthyes). Whales, dolphins and bats are mammals."
  },
  {
    id: 109,
    subject: 'biology',
    topic: 'Human Physiology - Respiratory',
    text: "Which structure is the site of gas exchange in human lungs?",
    options: ['Bronchi', 'Trachea', 'Alveoli', 'Pleura'],
    correct: 2,
    explanation: "Alveoli are thin-walled air sacs where O2/CO2 exchange occurs."
  },
  {
    id: 110,
    subject: 'biology',
    topic: 'Cell Biology - Division',
    text: "During which phase do sister chromatids separate?",
    options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'],
    correct: 2,
    explanation: "Anaphase: spindle fibers pull sister chromatids to opposite poles."
  },
  {
    id: 111,
    subject: 'biology',
    topic: 'Genetics - Human',
    text: "How many chromosomes does a normal human somatic cell have?",
    options: ['23', '44', '46', '48'],
    correct: 2,
    explanation: "46 chromosomes (23 pairs): 22 autosome pairs + 1 sex chromosome pair."
  },
  {
    id: 112,
    subject: 'biology',
    topic: 'Biochemistry - Enzymes',
    text: "Enzymes are mainly composed of:",
    options: ['Lipids', 'Proteins', 'Carbohydrates', 'Nucleic acids'],
    correct: 1,
    explanation: "Most enzymes are globular proteins (some are ribozymes made of RNA)."
  },
  {
    id: 113,
    subject: 'biology',
    topic: 'Zoology - Endocrine',
    text: "Insulin is secreted by which cells of the pancreas?",
    options: ['Alpha cells', 'Beta cells', 'Delta cells', 'Acinar cells'],
    correct: 1,
    explanation: "Beta cells secrete insulin (lowers blood glucose); alpha cells secrete glucagon."
  },
  {
    id: 114,
    subject: 'biology',
    topic: 'Botany - Reproduction',
    text: "In angiosperms, the mature pollen grain (male gametophyte) contains how many nuclei?",
    options: ['1', '2', '3', '4'],
    correct: 2,
    explanation: "Mature pollen grain has 3 nuclei: 1 tube nucleus + 2 generative nuclei."
  },
  {
    id: 115,
    subject: 'biology',
    topic: 'Human Physiology - Excretion',
    text: "The functional unit of the kidney is the:",
    options: ['Neuron', 'Nephron', 'Alveolus', 'Glomerulus'],
    correct: 1,
    explanation: "Nephron is the structural/functional unit of the kidney (filtration + reabsorption)."
  },
  {
    id: 116,
    subject: 'biology',
    topic: 'Genetics - Molecular',
    text: "Which nitrogenous base is found ONLY in RNA?",
    options: ['Adenine', 'Guanine', 'Cytosine', 'Uracil'],
    correct: 3,
    explanation: "Uracil replaces thymine in RNA; pairs with adenine."
  },
  {
    id: 117,
    subject: 'biology',
    topic: 'Zoology - Digestive',
    text: "Which enzyme digests protein in the stomach?",
    options: ['Amylase', 'Lipase', 'Pepsin', 'Trypsin'],
    correct: 2,
    explanation: "Pepsin (stomach, acidic pH) breaks proteins into peptides."
  },
  {
    id: 118,
    subject: 'biology',
    topic: 'Botany - Transport',
    text: "The process of water loss from plant leaves is called:",
    options: ['Guttation', 'Transpiration', 'Evaporation', 'Respiration'],
    correct: 1,
    explanation: "Transpiration = water vapor loss via stomata; guttation = liquid water via hydathodes."
  },
  {
    id: 119,
    subject: 'biology',
    topic: 'Human Physiology - Nervous',
    text: "The gap between two neurons where signals pass chemically is the:",
    options: ['Axon', 'Dendrite', 'Synapse', 'Node of Ranvier'],
    correct: 2,
    explanation: "Synapse — neurotransmitters carry the signal across the gap."
  },
]

export const subjects = [
  { id: 'math',  label: 'Math',    labelNp: 'Ganit',   color: '#1a237e', bg: '#e8f0fc', emoji: '∑' },
  { id: 'physics', label: 'Physics', labelNp: 'Bhaoutik', color: '#c2185b', bg: '#fce4ec', emoji: '⚛' },
  { id: 'chemistry', label: 'Chemistry', labelNp: 'Rasayan', color: '#2e7d32', bg: '#e8f5e9', emoji: '🧪' },
  { id: 'biology', label: 'Biology', labelNp: 'Jib Bisyan', color: '#00695c', bg: '#e0f2f1', emoji: '🧬' },
]

export const subjectTopics: Record<string, string[]> = {
  math:    ['Calculus - Differentiation', 'Calculus - Integration', 'Algebra', 'Coordinate Geometry', 'Trigonometry', 'Vectors', 'Probability'],
  physics: ['Mechanics - Kinematics', "Mechanics - Newton's Laws", 'Waves & Optics', 'Thermodynamics', 'Electricity', 'Magnetism', 'Modern Physics'],
  chemistry: ['Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Electrochemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
  biology: ['Cell Biology - Organelles', 'Cell Biology - Membrane', 'Cell Biology - Division', 'Genetics - Mendelian', 'Genetics - DNA', 'Genetics - Molecular', 'Genetics - Human', 'Human Physiology - Blood', 'Human Physiology - Heart', 'Human Physiology - Respiratory', 'Human Physiology - Excretion', 'Human Physiology - Nervous', 'Biochemistry - Enzymes', 'Botany - Photosynthesis', 'Botany - Plant Tissues', 'Botany - Reproduction', 'Botany - Transport', 'Zoology - Classification', 'Zoology - Endocrine', 'Zoology - Digestive'],
}
