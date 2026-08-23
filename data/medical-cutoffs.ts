// Medical (MECEE-BL) entrance data — compiled from Medical Education Commission,
// shikshasanjal.com, medicalsanjal.com, nebgpacalculator.com (verified 2026-08)
// MECEE-BL 2082: 200 MCQs, 3 hrs. Merit list: 50th percentile.
// Each college may appear under multiple programs with different cutoffs.

export interface MedCutoff {
  id: string
  college: string
  program: 'MBBS' | 'BDS' | 'BSc Nursing' | 'B.Pharm' | 'BPT' | 'BAMS' | 'BASLP' | 'BSc MLT' | 'BSc MIT' | 'B.Optometry' | 'BPH'
  type: 'Government' | 'Private'
  seats: number
  cutoffs: {
    scholarship: number | null
    paying: number | null
  }
  feeNote: string
  website?: string | null
}

export const medicalCutoffs: MedCutoff[] = [
  // ─── MBBS — Government ───────────────────────────────────────────────────────
  {
    id: 'iom-mbbs', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'MBBS', type: 'Government', seats: 84,
    cutoffs: { scholarship: 60, paying: 320 },
    feeNote: 'Govt subsidized: ~NPR 15-20 lakh total',
    website: 'https://iom.edu.np',
  },
  {
    id: 'bpkihs-mbbs', college: 'B.P. Koirala Institute of Health Sciences, Dharan',
    program: 'MBBS', type: 'Government', seats: 74,
    cutoffs: { scholarship: 100, paying: 500 },
    feeNote: 'Govt subsidized: ~NPR 15-20 lakh total',
    website: 'https://bpkihs.edu',
  },
  {
    id: 'pahs-mbbs', college: 'Patan Academy of Health Sciences (PAHS), Lagankhel',
    program: 'MBBS', type: 'Government', seats: 80,
    cutoffs: { scholarship: 90, paying: 450 },
    feeNote: 'Govt subsidized: ~NPR 15-20 lakh total',
    website: 'https://pahs.edu.np',
  },
  {
    id: 'namc-mbbs', college: 'National Academy of Medical Sciences (NAMS), Kathmandu',
    program: 'MBBS', type: 'Government', seats: 60,
    cutoffs: { scholarship: 80, paying: 400 },
    feeNote: 'Govt subsidized',
    website: 'https://nams.edu.np',
  },
  {
    id: 'nmc-mbbs', college: 'Nepalgunj Medical College, Nepalgunj',
    program: 'MBBS', type: 'Government', seats: 100,
    cutoffs: { scholarship: 250, paying: 750 },
    feeNote: 'Provincial govt academy: subsidized fees',
    website: 'https://ngmc.edu.np',
  },
  {
    id: 'pahs-biratnagar', college: 'Provincial Academy of Health Sciences, Biratnagar',
    program: 'MBBS', type: 'Government', seats: 100,
    cutoffs: { scholarship: 220, paying: 700 },
    feeNote: 'Provincial govt academy',
    website: null,
  },
  {
    id: 'pahs-pokhara', college: 'Pokhara Academy of Health Sciences, Pokhara',
    program: 'MBBS', type: 'Government', seats: 100,
    cutoffs: { scholarship: 280, paying: 800 },
    feeNote: 'Provincial govt academy',
    website: null,
  },
  {
    id: 'kaahs-mbbs', college: 'Karnali Academy of Health Sciences, Jumla',
    program: 'MBBS', type: 'Government', seats: 50,
    cutoffs: { scholarship: 400, paying: 1200 },
    feeNote: 'Remote-area govt quota',
    website: 'https://kahs.edu.np',
  },

  // ─── MBBS — Private ─────────────────────────────────────────────────────────
  {
    id: 'kmc-mbbs', college: 'Kathmandu Medical College (KMC), Duwakot',
    program: 'MBBS', type: 'Private', seats: 100,
    cutoffs: { scholarship: 200, paying: 1800 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
    website: 'https://kmc.edu.np',
  },
  {
    id: 'manipal-mbbs', college: 'Manipal College of Medical Sciences (MCOMS), Pokhara',
    program: 'MBBS', type: 'Private', seats: 100,
    cutoffs: { scholarship: 300, paying: 2000 },
    feeNote: 'Private: ~NPR 45-55 lakh total',
    website: 'https://manipalpokhara.edu.np',
  },
  {
    id: 'nobel-mbbs', college: 'Nobel Medical College, Biratnagar',
    program: 'MBBS', type: 'Private', seats: 100,
    cutoffs: { scholarship: 400, paying: 2200 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
    website: 'https://nobelmedicalcollege.com.np',
  },
  {
    id: 'cmc-mbbs', college: 'Chitwan Medical College (CMC), Bharatpur',
    program: 'MBBS', type: 'Private', seats: 100,
    cutoffs: { scholarship: 500, paying: 2500 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
    website: 'https://cmc.edu.np',
  },
  {
    id: 'gmc-mbbs', college: 'Gandaki Medical College (GMC), Pokhara',
    program: 'MBBS', type: 'Private', seats: 100,
    cutoffs: { scholarship: 550, paying: 2600 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
    website: 'https://gmc.edu.np',
  },
  {
    id: 'nmc-pvt-mbbs', college: 'National Medical College, Birgunj',
    program: 'MBBS', type: 'Private', seats: 100,
    cutoffs: { scholarship: 600, paying: 2800 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
    website: 'https://nmcbir.edu.np',
  },
  {
    id: 'nmcj-mbbs', college: 'Nepal Medical College (NMC), Jorpati, Kathmandu',
    program: 'MBBS', type: 'Private', seats: 100,
    cutoffs: { scholarship: 650, paying: 3000 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
    website: 'https://nmcth.edu',
  },
  {
    id: 'lmc-mbbs', college: 'Lumbini Medical College (LMC), Tansen',
    program: 'MBBS', type: 'Private', seats: 80,
    cutoffs: { scholarship: 700, paying: 3200 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
    website: 'https://lmc.edu.np',
  },
  {
    id: 'ucms-mbbs', college: 'Universal College of Medical Sciences (UCMS), Bhairahawa',
    program: 'MBBS', type: 'Private', seats: 100,
    cutoffs: { scholarship: 650, paying: 3000 },
    feeNote: 'Private: ~NPR 40-50 lakh total',
    website: 'https://ucms.edu.np',
  },

  // ─── BDS — Dental ──────────────────────────────────────────────────────────
  {
    id: 'iom-bds', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'BDS', type: 'Government', seats: 50,
    cutoffs: { scholarship: 80, paying: 400 },
    feeNote: 'Govt subsidized: ~NPR 15-20 lakh total',
    website: 'https://iom.edu.np',
  },
  {
    id: 'bpkihs-bds', college: 'B.P. Koirala Institute of Health Sciences, Dharan',
    program: 'BDS', type: 'Government', seats: 40,
    cutoffs: { scholarship: 120, paying: 550 },
    feeNote: 'Govt subsidized',
    website: 'https://bpkihs.edu',
  },
  {
    id: 'kdc-bds', college: 'Kantipur Dental College Teaching Hospital, Basundhara, Kathmandu',
    program: 'BDS', type: 'Private', seats: 60,
    cutoffs: { scholarship: 300, paying: 1200 },
    feeNote: 'Private dental: ~NPR 30-40 lakh total',
    website: 'https://kantipurdental.edu.np',
  },
  {
    id: 'mbkdc-bds', college: 'MB Kedia Dental College, Birgunj',
    program: 'BDS', type: 'Private', seats: 60,
    cutoffs: { scholarship: 400, paying: 1500 },
    feeNote: 'Private dental: ~NPR 30-40 lakh total',
    website: null,
  },
  {
    id: 'pdc-bds', college: "People's Dental College and Hospital, Nayabazar, Kathmandu",
    program: 'BDS', type: 'Private', seats: 60,
    cutoffs: { scholarship: 350, paying: 1300 },
    feeNote: 'Private dental: ~NPR 30-40 lakh total',
    website: 'https://pdch.com.np',
  },
  {
    id: 'cmc-bds', college: 'Chitwan Medical College (CMC), Bharatpur',
    program: 'BDS', type: 'Private', seats: 60,
    cutoffs: { scholarship: 450, paying: 1600 },
    feeNote: 'Private dental',
    website: 'https://cmc.edu.np',
  },
  {
    id: 'gmc-bds', college: 'Gandaki Medical College (GMC), Pokhara',
    program: 'BDS', type: 'Private', seats: 40,
    cutoffs: { scholarship: 500, paying: 1700 },
    feeNote: 'Private dental',
    website: 'https://gmc.edu.np',
  },
  {
    id: 'cms-bds', college: 'College of Medical Sciences (CMS), Bharatpur',
    program: 'BDS', type: 'Private', seats: 60,
    cutoffs: { scholarship: 480, paying: 1650 },
    feeNote: 'Private dental',
    website: 'https://cmsnepal.edu.np',
  },
  {
    id: 'nmc-bds', college: 'National Medical College, Birgunj',
    program: 'BDS', type: 'Private', seats: 50,
    cutoffs: { scholarship: 520, paying: 1800 },
    feeNote: 'Private dental',
    website: 'https://nmcbir.edu.np',
  },
  {
    id: 'nmcj-bds', college: 'Nepal Medical College (NMC), Jorpati',
    program: 'BDS', type: 'Private', seats: 50,
    cutoffs: { scholarship: 550, paying: 1900 },
    feeNote: 'Private dental',
    website: 'https://nmcth.edu',
  },
  {
    id: 'ngmc-bds', college: 'Nepalgunj Medical College, Nepalgunj',
    program: 'BDS', type: 'Private', seats: 50,
    cutoffs: { scholarship: 530, paying: 1750 },
    feeNote: 'Private dental',
    website: 'https://ngmc.edu.np',
  },
  {
    id: 'nobel-bds', college: 'Nobel Medical College, Biratnagar',
    program: 'BDS', type: 'Private', seats: 50,
    cutoffs: { scholarship: 510, paying: 1700 },
    feeNote: 'Private dental',
    website: 'https://nobelmedicalcollege.com.np',
  },
  {
    id: 'ucms-bds', college: 'Universal College of Medical Sciences (UCMS), Bhairahawa',
    program: 'BDS', type: 'Private', seats: 50,
    cutoffs: { scholarship: 490, paying: 1680 },
    feeNote: 'Private dental',
    website: 'https://ucms.edu.np',
  },

  // ─── BSc Nursing ────────────────────────────────────────────────────────────
  {
    id: 'iom-nursing', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'BSc Nursing', type: 'Government', seats: 100,
    cutoffs: { scholarship: 150, paying: 600 },
    feeNote: 'Govt subsidized: ~NPR 10-15 lakh',
    website: 'https://iom.edu.np',
  },
  {
    id: 'bpkihs-nursing', college: 'B.P. Koirala Institute of Health Sciences, Dharan',
    program: 'BSc Nursing', type: 'Government', seats: 75,
    cutoffs: { scholarship: 200, paying: 700 },
    feeNote: 'Govt subsidized',
    website: 'https://bpkihs.edu',
  },
  {
    id: 'pahs-nursing', college: 'Patan Academy of Health Sciences (PAHS), Lagankhel',
    program: 'BSc Nursing', type: 'Government', seats: 60,
    cutoffs: { scholarship: 180, paying: 650 },
    feeNote: 'Govt subsidized',
    website: 'https://pahs.edu.np',
  },
  {
    id: 'kaahs-nursing', college: 'Karnali Academy of Health Sciences, Jumla',
    program: 'BSc Nursing', type: 'Government', seats: 40,
    cutoffs: { scholarship: 350, paying: 1000 },
    feeNote: 'Remote-area quota',
    website: 'https://kahs.edu.np',
  },
  {
    id: 'naiphc-nursing', college: 'National Academy of Health Sciences, Kathmandu',
    program: 'BSc Nursing', type: 'Government', seats: 50,
    cutoffs: { scholarship: 250, paying: 800 },
    feeNote: 'Government nursing college',
    website: null,
  },
  {
    id: 'biratnagar-nursing', college: 'Biratnagar Nursing Campus',
    program: 'BSc Nursing', type: 'Government', seats: 50,
    cutoffs: { scholarship: 300, paying: 900 },
    feeNote: 'Government',
    website: null,
  },
  {
    id: 'biratnagar-nursing-pvt', college: 'Birat Medical College, Biratnagar',
    program: 'BSc Nursing', type: 'Private', seats: 40,
    cutoffs: { scholarship: 400, paying: 1200 },
    feeNote: 'Private nursing',
    website: null,
  },
  {
    id: 'cmc-nursing', college: 'Chitwan Medical College (CMC), Bharatpur',
    program: 'BSc Nursing', type: 'Private', seats: 50,
    cutoffs: { scholarship: 450, paying: 1300 },
    feeNote: 'Private nursing',
    website: 'https://cmc.edu.np',
  },
  {
    id: 'kist-nursing', college: 'KIST Medical College & Teaching Hospital, Imadol, Lalitpur',
    program: 'BSc Nursing', type: 'Private', seats: 40,
    cutoffs: { scholarship: 500, paying: 1400 },
    feeNote: 'Private nursing',
    website: 'https://kist.edu.np',
  },
  {
    id: 'mmihs-nursing', college: 'Manmohan Memorial Institute of Health Sciences (MMIHS), Kathmandu',
    program: 'BSc Nursing', type: 'Private', seats: 50,
    cutoffs: { scholarship: 480, paying: 1350 },
    feeNote: 'Private nursing',
    website: null,
  },
  {
    id: 'naihs-nursing', college: 'Nepalese Army Institute of Health Sciences (NAIHS), Kathmandu',
    program: 'BSc Nursing', type: 'Private', seats: 40,
    cutoffs: { scholarship: 350, paying: 1100 },
    feeNote: 'Army-affiliated',
    website: 'https://naihs.edu.np',
  },

  // ─── B.Pharm ───────────────────────────────────────────────────────────────
  {
    id: 'iom-pharm', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'B.Pharm', type: 'Government', seats: 60,
    cutoffs: { scholarship: 200, paying: 700 },
    feeNote: 'Govt subsidized: ~NPR 10-15 lakh',
    website: 'https://iom.edu.np',
  },
  {
    id: 'cmc-pharm', college: 'Chitwan Medical College (CMC), Bharatpur',
    program: 'B.Pharm', type: 'Private', seats: 50,
    cutoffs: { scholarship: 500, paying: 1500 },
    feeNote: 'Private pharmacy',
    website: 'https://cmc.edu.np',
  },
  {
    id: 'manipal-pharm', college: 'Manipal College of Medical Sciences (MCOMS), Pokhara',
    program: 'B.Pharm', type: 'Private', seats: 50,
    cutoffs: { scholarship: 480, paying: 1400 },
    feeNote: 'Private pharmacy',
    website: 'https://manipalpokhara.edu.np',
  },
  {
    id: 'cmc-pharm', college: 'College of Medical Sciences (CMS), Bharatpur',
    program: 'B.Pharm', type: 'Private', seats: 40,
    cutoffs: { scholarship: 520, paying: 1600 },
    feeNote: 'Private pharmacy',
    website: 'https://cmsnepal.edu.np',
  },
  {
    id: 'nmc-pharm', college: 'National Medical College, Birgunj',
    program: 'B.Pharm', type: 'Private', seats: 40,
    cutoffs: { scholarship: 550, paying: 1700 },
    feeNote: 'Private pharmacy',
    website: 'https://nmcbir.edu.np',
  },

  // ─── BPT (Physiotherapy) ────────────────────────────────────────────────────
  {
    id: 'iom-bpt', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'BPT', type: 'Government', seats: 40,
    cutoffs: { scholarship: 300, paying: 900 },
    feeNote: 'Govt subsidized',
    website: 'https://iom.edu.np',
  },
  {
    id: 'cmc-bpt', college: 'Chitwan Medical College (CMC), Bharatpur',
    program: 'BPT', type: 'Private', seats: 30,
    cutoffs: { scholarship: 600, paying: 1800 },
    feeNote: 'Private physiotherapy',
    website: 'https://cmc.edu.np',
  },
  {
    id: 'manipal-bpt', college: 'Manipal College of Medical Sciences (MCOMS), Pokhara',
    program: 'BPT', type: 'Private', seats: 30,
    cutoffs: { scholarship: 580, paying: 1700 },
    feeNote: 'Private physiotherapy',
    website: 'https://manipalpokhara.edu.np',
  },
  {
    id: 'nmcj-bpt', college: 'Nepal Medical College (NMC), Jorpati',
    program: 'BPT', type: 'Private', seats: 30,
    cutoffs: { scholarship: 650, paying: 1900 },
    feeNote: 'Private physiotherapy',
    website: 'https://nmcth.edu',
  },

  // ─── BAMS (Ayurveda) ──────────────────────────────────────────────────────
  {
    id: 'iom-bams', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'BAMS', type: 'Government', seats: 40,
    cutoffs: { scholarship: 350, paying: 1000 },
    feeNote: 'Govt subsidized — Ayurveda',
    website: 'https://iom.edu.np',
  },
  {
    id: ' Ayurveda-bams', college: 'Ayurveda College, Lalitpur',
    program: 'BAMS', type: 'Private', seats: 30,
    cutoffs: { scholarship: 700, paying: 2000 },
    feeNote: 'Private ayurveda',
    website: null,
  },

  // ─── BASLP (Audiology & Speech) ────────────────────────────────────────────
  {
    id: 'iom-baslp', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'BASLP', type: 'Government', seats: 30,
    cutoffs: { scholarship: 400, paying: 1200 },
    feeNote: 'Govt subsidized — audiology & speech',
    website: 'https://iom.edu.np',
  },

  // ─── BSc MLT (Medical Lab Tech) ────────────────────────────────────────────
  {
    id: 'iom-mlt', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'BSc MLT', type: 'Government', seats: 50,
    cutoffs: { scholarship: 300, paying: 1000 },
    feeNote: 'Govt subsidized — medical lab tech',
    website: 'https://iom.edu.np',
  },
  {
    id: 'bpkihs-mlt', college: 'B.P. Koirala Institute of Health Sciences, Dharan',
    program: 'BSc MLT', type: 'Government', seats: 40,
    cutoffs: { scholarship: 350, paying: 1100 },
    feeNote: 'Govt subsidized — lab tech',
    website: 'https://bpkihs.edu',
  },
  {
    id: 'cmc-mlt', college: 'Chitwan Medical College (CMC), Bharatpur',
    program: 'BSc MLT', type: 'Private', seats: 30,
    cutoffs: { scholarship: 650, paying: 2000 },
    feeNote: 'Private lab tech',
    website: 'https://cmc.edu.np',
  },

  // ─── BSc MIT (Medical Imaging Tech) ────────────────────────────────────────
  {
    id: 'iom-mit', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'BSc MIT', type: 'Government', seats: 40,
    cutoffs: { scholarship: 320, paying: 1050 },
    feeNote: 'Govt subsidized — medical imaging tech',
    website: 'https://iom.edu.np',
  },
  {
    id: 'cmc-mit', college: 'Chitwan Medical College (CMC), Bharatpur',
    program: 'BSc MIT', type: 'Private', seats: 30,
    cutoffs: { scholarship: 680, paying: 2100 },
    feeNote: 'Private medical imaging',
    website: 'https://cmc.edu.np',
  },

  // ─── B.Optometry ──────────────────────────────────────────────────────────
  {
    id: 'iom-optom', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'B.Optometry', type: 'Government', seats: 30,
    cutoffs: { scholarship: 350, paying: 1100 },
    feeNote: 'Govt subsidized — optometry',
    website: 'https://iom.edu.np',
  },

  // ─── BPH (Public Health) ──────────────────────────────────────────────────
  {
    id: 'iom-bph', college: 'Institute of Medicine (IOM), Maharajgunj',
    program: 'BPH', type: 'Government', seats: 60,
    cutoffs: { scholarship: 250, paying: 800 },
    feeNote: 'Govt subsidized — public health',
    website: 'https://iom.edu.np',
  },
  {
    id: 'kaahs-bph', college: 'Karnali Academy of Health Sciences, Jumla',
    program: 'BPH', type: 'Government', seats: 40,
    cutoffs: { scholarship: 400, paying: 1200 },
    feeNote: 'Remote-area quota — public health',
    website: 'https://kahs.edu.np',
  },
]

export const PROGRAMS = [
  'MBBS', 'BDS', 'BSc Nursing', 'B.Pharm', 'BPT', 'BAMS',
  'BASLP', 'BSc MLT', 'BSc MIT', 'B.Optometry', 'BPH',
] as const

export type Program = typeof PROGRAMS[number]

// Rank guidance bands (MECEE 2082, from compiled sources)
export const medRankBands = [
  { min: 1, max: 100, label: 'Government MBBS (IOM / BPKIHS / PAHS) — top scholarship seats', color: '#10b981' },
  { min: 101, max: 500, label: 'Government + top private MBBS (paying) — solid shot', color: '#22c55e' },
  { min: 501, max: 1000, label: 'Private MBBS + BDS at mid-tier colleges', color: '#f59e0b' },
  { min: 1001, max: 2000, label: 'BDS, BSc Nursing, B.Pharm at private colleges', color: '#f97316' },
  { min: 2001, max: 10000, label: 'Allied health: BPT, BAMS, BSc MLT, BPH', color: '#ef4444' },
]
