// Medical (MECEE-BL) entrance data — compiled from Medical Education Commission,
// collegesinnepal.com, nebgpacalculator.com (verified 2026-08-22)
// MECEE-BL 2082: 200 MCQs, 3 hrs, Physics 50 / Chemistry 50 / Biology 100.
// Cutoff for merit list: 52.25 marks. Highest score: 185/200. -0.25 per wrong.

export interface MedCutoff {
  id: string
  college: string
  type: 'Government' | 'Private'
  mbbsSeats: number
  cutoffs: {
    scholarship: number | null // last rank — scholarship (top 100 range)
    paying: number | null      // last rank — paying category
  }
  feeNote: string
}

export const medicalCutoffs: MedCutoff[] = [
  {
    id: 'iom',
    college: 'Institute of Medicine (IOM), Maharajgunj',
    type: 'Government',
    mbbsSeats: 84,
    cutoffs: { scholarship: 60, paying: 320 },
    feeNote: 'Govt subsidized: ~NPR 15-20 lakh total (scholarship seats)',
  },
  {
    id: 'bpkihs',
    college: 'B.P. Koirala Institute of Health Sciences, Dharan',
    type: 'Government',
    mbbsSeats: 74,
    cutoffs: { scholarship: 100, paying: 500 },
    feeNote: 'Govt subsidized: ~NPR 15-20 lakh total',
  },
  {
    id: 'pahs',
    college: 'Patan Academy of Health Sciences, Lalitpur',
    type: 'Government',
    mbbsSeats: 80,
    cutoffs: { scholarship: 90, paying: 450 },
    feeNote: 'Govt subsidized: ~NPR 15-20 lakh total',
  },
  {
    id: 'birtamod',
    college: 'B.P. Koirala Institute of Health Sciences, Biratnagar (Provincial)',
    type: 'Government',
    mbbsSeats: 100,
    cutoffs: { scholarship: 220, paying: 700 },
    feeNote: 'Provincial academy: subsidized fees',
  },
  {
    id: 'pokhara',
    college: 'Pokhara Academy of Health Sciences, Pokhara',
    type: 'Government',
    mbbsSeats: 100,
    cutoffs: { scholarship: 280, paying: 800 },
    feeNote: 'Provincial academy: subsidized fees',
  },
  {
    id: 'kmc',
    college: 'Kathmandu Medical College, Duwakot',
    type: 'Private',
    mbbsSeats: 100,
    cutoffs: { scholarship: 200, paying: 1800 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
  },
  {
    id: 'manipal',
    college: 'Manipal College of Medical Sciences, Pokhara',
    type: 'Private',
    mbbsSeats: 100,
    cutoffs: { scholarship: 300, paying: 2000 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
  },
  {
    id: 'nobel',
    college: 'Nobel Medical College, Biratnagar',
    type: 'Private',
    mbbsSeats: 100,
    cutoffs: { scholarship: 400, paying: 2200 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
  },
  {
    id: 'chitwan',
    college: 'Chitwan Medical College, Bharatpur',
    type: 'Private',
    mbbsSeats: 100,
    cutoffs: { scholarship: 500, paying: 2500 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
  },
  {
    id: 'gandaki',
    college: 'Gandaki Medical College, Pokhara',
    type: 'Private',
    mbbsSeats: 100,
    cutoffs: { scholarship: 550, paying: 2600 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
  },
]

// Rank guidance bands (MECEE 2082, from compiled sources)
export const medRankBands = [
  { min: 1, max: 100, label: 'Government MBBS (IOM / BPKIHS / PAHS) — top scholarship seats', color: '#10b981' },
  { min: 101, max: 500, label: 'Government + top private MBBS (paying) — solid shot', color: '#22c55e' },
  { min: 501, max: 1000, label: 'Private MBBS + BDS at mid-tier colleges', color: '#f59e0b' },
  { min: 1001, max: 2000, label: 'BDS, BSc Nursing, B.Pharm at private colleges', color: '#f97316' },
  { min: 2001, max: 10000, label: 'Allied health: BPT, BAMS, BSc MLT, BPH', color: '#ef4444' },
]
