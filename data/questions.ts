export interface Question {
  id: number
  subject: 'math' | 'physics' | 'chemistry'
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
]

export const subjects = [
  { id: 'math',  label: 'Math',    labelNp: 'Ganit',   color: '#1a237e', bg: '#e8f0fc', emoji: '∑' },
  { id: 'physics', label: 'Physics', labelNp: 'Bhaoutik', color: '#c2185b', bg: '#fce4ec', emoji: '⚛' },
  { id: 'chemistry', label: 'Chemistry', labelNp: 'Rasayan', color: '#2e7d32', bg: '#e8f5e9', emoji: '🧪' },
]

export const subjectTopics: Record<string, string[]> = {
  math:    ['Calculus - Differentiation', 'Calculus - Integration', 'Algebra', 'Coordinate Geometry', 'Trigonometry', 'Vectors', 'Probability'],
  physics: ['Mechanics - Kinematics', "Mechanics - Newton's Laws", 'Waves & Optics', 'Thermodynamics', 'Electricity', 'Magnetism', 'Modern Physics'],
  chemistry: ['Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Electrochemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
}
