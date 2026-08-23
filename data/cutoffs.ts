// IOE 2082 first-list open-category cutoff RANKS.
// Lower rank = more competitive. Regular and Full Fee are separate sections.
// Source: PEA compiled campus lists (pea.edu.np), verified 2026-08-22.
// https://ioe-entrance.bibeksubedi0001.com.np/ioe-cutoff-rank

export interface Cutoff {
  campus: 'Pulchowk' | 'Thapathali' | 'WRC' | 'ERC' | 'Chitwan' | 'Private'
  campusNp: string
  program: string
  programNp: string
  regular: number
  fullFee: number
  color: string
  /** URL for private colleges; null for constituent campuses */
  url?: string | null
}

export const cutoffs: Cutoff[] = [
  // PULCHOWK
  { campus: 'Pulchowk', campusNp: 'पुल्चोक', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 27, fullFee: 179, color: '#4f46e5' },
  { campus: 'Pulchowk', campusNp: 'पुल्चोक', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 84, fullFee: 330, color: '#7c3aed' },
  { campus: 'Pulchowk', campusNp: 'पुल्चोक', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 318, fullFee: 787, color: '#059669' },
  { campus: 'Pulchowk', campusNp: 'पुल्चोक', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 334, fullFee: 943, color: '#0891b2' },
  { campus: 'Pulchowk', campusNp: 'पुल्चोक', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 370, fullFee: 1009, color: '#2563eb' },
  { campus: 'Pulchowk', campusNp: 'पुल्चोक', program: 'Aerospace Engineering', programNp: 'एरोस्पेस इन्जिनियरिङ', regular: 386, fullFee: 1670, color: '#db2777' },
  { campus: 'Pulchowk', campusNp: 'पुल्चोक', program: 'Chemical Engineering', programNp: 'केमिकल इन्जिनियरिङ', regular: 841, fullFee: 2637, color: '#ca8a04' },
  { campus: 'Pulchowk', campusNp: 'पुल्चोक', program: 'Architecture', programNp: 'आर्किटेक्चर', regular: 1270, fullFee: 2114, color: '#9333ea' },

  // THAPATHALI
  { campus: 'Thapathali', campusNp: 'थपाथली', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 75, fullFee: 273, color: '#4f46e5' },
  { campus: 'Thapathali', campusNp: 'थपाथली', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 224, fullFee: 718, color: '#7c3aed' },
  { campus: 'Thapathali', campusNp: 'थपाथली', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 387, fullFee: 1200, color: '#059669' },
  { campus: 'Thapathali', campusNp: 'थपाथली', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 463, fullFee: 1860, color: '#0891b2' },
  { campus: 'Thapathali', campusNp: 'थपाथली', program: 'Architecture', programNp: 'आर्किटेक्चर', regular: 1018, fullFee: 2581, color: '#9333ea' },
  { campus: 'Thapathali', campusNp: 'थपाथली', program: 'Automobile Engineering', programNp: 'अटोमोबाइल इन्जिनियरिङ', regular: 1096, fullFee: 4706, color: '#0d9488' },
  { campus: 'Thapathali', campusNp: 'थपाथली', program: 'Industrial Engineering', programNp: 'औद्योगिक इन्जिनियरिङ', regular: 1665, fullFee: 4724, color: '#65a30d' },

  // WRC (Pokhara)
  { campus: 'WRC', campusNp: 'पश्चिमाञ्चल (पोखरा)', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 164, fullFee: 647, color: '#4f46e5' },
  { campus: 'WRC', campusNp: 'पश्चिमाञ्चल (पोखरा)', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 408, fullFee: 1703, color: '#7c3aed' },
  { campus: 'WRC', campusNp: 'पश्चिमाञ्चल (पोखरा)', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 693, fullFee: 2448, color: '#059669' },
  { campus: 'WRC', campusNp: 'पश्चिमाञ्चल (पोखरा)', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 697, fullFee: 2988, color: '#2563eb' },
  { campus: 'WRC', campusNp: 'पश्चिमाञ्चल (पोखरा)', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 916, fullFee: 3378, color: '#0891b2' },
  { campus: 'WRC', campusNp: 'पश्चिमाञ्चल (पोखरा)', program: 'Geomatics Engineering', programNp: 'जियोम्याटिक्स इन्जिनियरिङ', regular: 1291, fullFee: 4020, color: '#0d9488' },

  // ERC (Dharan)
  { campus: 'ERC', campusNp: 'पूर्वाञ्चल (धरान)', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 384, fullFee: 1598, color: '#4f46e5' },
  { campus: 'ERC', campusNp: 'पूर्वाञ्चल (धरान)', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 942, fullFee: 3184, color: '#7c3aed' },
  { campus: 'ERC', campusNp: 'पूर्वाञ्चल (धरान)', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1017, fullFee: 3821, color: '#059669' },
  { campus: 'ERC', campusNp: 'पूर्वाञ्चल (धरान)', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1258, fullFee: 4595, color: '#2563eb' },
  { campus: 'ERC', campusNp: 'पूर्वाञ्चल (धरान)', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1592, fullFee: 4953, color: '#0891b2' },
  { campus: 'ERC', campusNp: 'पूर्वाञ्चल (धरान)', program: 'Architecture', programNp: 'आर्किटेक्चर', regular: 3321, fullFee: 6563, color: '#9333ea' },
  { campus: 'ERC', campusNp: 'पूर्वाञ्चल (धरान)', program: 'Agriculture Engineering', programNp: 'कृषि इन्जिनियरिङ', regular: 3003, fullFee: 6546, color: '#65a30d' },

  // CHITWAN
  { campus: 'Chitwan', campusNp: 'चितवन', program: 'Architecture', programNp: 'आर्किटेक्चर', regular: 2339, fullFee: 6398, color: '#9333ea' },

  // ─── PRIVATE TU-AFFILIATED ENGINEERING COLLEGES ───────────────────────────
  // regular = scholarship seat cutoff, fullFee = full-fee seat cutoff
  // Estimates based on IOE 2082 patterns; urls where verified/confirmed

  // 1. Kantipur Engineering College — Kalanki, Kathmandu
  { campus: 'Private', campusNp: 'कान्तिपुर इन्जिनियरिङ कलेज', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 650, fullFee: 1800, color: '#7c3aed', url: 'https://kec.edu.np' },
  { campus: 'Private', campusNp: 'कान्तिपुर इन्जिनियरिङ कलेज', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1400, fullFee: 3200, color: '#059669', url: 'https://kec.edu.np' },
  { campus: 'Private', campusNp: 'कान्तिपुर इन्जिनियरिङ कलेज', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 900, fullFee: 2200, color: '#4f46e5', url: 'https://kec.edu.np' },
  { campus: 'Private', campusNp: 'कान्तिपुर इन्जिनियरिङ कलेज', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1300, fullFee: 3100, color: '#0891b2', url: 'https://kec.edu.np' },
  { campus: 'Private', campusNp: 'कान्तिपुर इन्जिनियरिङ कलेज', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1450, fullFee: 3500, color: '#2563eb', url: 'https://kec.edu.np' },

  // 2. Kathmandu Engineering College — Kalimati, Kathmandu
  { campus: 'Private', campusNp: 'काठमाण्डौ इन्जिनियरिङ कलेज', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 720, fullFee: 2000, color: '#7c3aed', url: 'https://kecktm.edu.np' },
  { campus: 'Private', campusNp: 'काठमाण्डौ इन्जिनियरिङ कलेज', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1550, fullFee: 3600, color: '#059669', url: 'https://kecktm.edu.np' },
  { campus: 'Private', campusNp: 'काठमाण्डौ इन्जिनियरिङ कलेज', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 1000, fullFee: 2500, color: '#4f46e5', url: 'https://kecktm.edu.np' },
  { campus: 'Private', campusNp: 'काठमाण्डौ इन्जिनियरिङ कलेज', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1450, fullFee: 3400, color: '#0891b2', url: 'https://kecktm.edu.np' },
  { campus: 'Private', campusNp: 'काठमाण्डौ इन्जिनियरिङ कलेज', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1600, fullFee: 3800, color: '#2563eb', url: 'https://kecktm.edu.np' },

  // 3. Himalaya College of Engineering — Chyasal, Lalitpur
  { campus: 'Private', campusNp: 'हिमालय कलेज अफ इन्जिनियरिङ', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 850, fullFee: 2300, color: '#7c3aed', url: null },
  { campus: 'Private', campusNp: 'हिमालय कलेज अफ इन्जिनियरिङ', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1600, fullFee: 3800, color: '#059669', url: null },
  { campus: 'Private', campusNp: 'हिमालय कलेज अफ इन्जिनियरिङ', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 1100, fullFee: 2800, color: '#4f46e5', url: null },
  { campus: 'Private', campusNp: 'हिमालय कलेज अफ इन्जिनियरिङ', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1550, fullFee: 3700, color: '#0891b2', url: null },
  { campus: 'Private', campusNp: 'हिमालय कलेज अफ इन्जिनियरिङ', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1700, fullFee: 4000, color: '#2563eb', url: null },

  // 4. Advanced College of Engineering and Management — Kalanki, Kathmandu
  { campus: 'Private', campusNp: 'एडभान्स्ड कलेज अफ इन्जिनियरिङ', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 900, fullFee: 2500, color: '#7c3aed', url: null },
  { campus: 'Private', campusNp: 'एडभान्स्ड कलेज अफ इन्जिनियरिङ', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1650, fullFee: 3900, color: '#059669', url: null },
  { campus: 'Private', campusNp: 'एडभान्स्ड कलेज अफ इन्जिनियरिङ', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 1150, fullFee: 3000, color: '#4f46e5', url: null },
  { campus: 'Private', campusNp: 'एडभान्स्ड कलेज अफ इन्जिनियरिङ', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1600, fullFee: 3800, color: '#0891b2', url: null },
  { campus: 'Private', campusNp: 'एडभान्स्ड कलेज अफ इन्जिनियरिङ', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1750, fullFee: 4100, color: '#2563eb', url: null },

  // 5. Sagarmatha Engineering College — Lalitpur
  { campus: 'Private', campusNp: 'सगरमाथा इन्जिनियरिङ कलेज', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 780, fullFee: 2100, color: '#7c3aed', url: null },
  { campus: 'Private', campusNp: 'सगरमाथा इन्जिनियरिङ कलेज', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1500, fullFee: 3500, color: '#059669', url: null },
  { campus: 'Private', campusNp: 'सगरमाथा इन्जिनियरिङ कलेज', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 1050, fullFee: 2650, color: '#4f46e5', url: null },
  { campus: 'Private', campusNp: 'सगरमाथा इन्जिनियरिङ कलेज', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1480, fullFee: 3550, color: '#0891b2', url: null },
  { campus: 'Private', campusNp: 'सगरमाथा इन्जिनियरिङ कलेज', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1620, fullFee: 3900, color: '#2563eb', url: null },

  // 6. National College of Engineering (NCE) — Satdobato, Lalitpur
  { campus: 'Private', campusNp: 'नेसनल कलेज अफ इन्जिनियरिङ', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 950, fullFee: 2600, color: '#7c3aed', url: null },
  { campus: 'Private', campusNp: 'नेसनल कलेज अफ इन्जिनियरिङ', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1700, fullFee: 4000, color: '#059669', url: null },
  { campus: 'Private', campusNp: 'नेसनल कलेज अफ इन्जिनियरिङ', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 1200, fullFee: 3100, color: '#4f46e5', url: null },
  { campus: 'Private', campusNp: 'नेसनल कलेज अफ इन्जिनियरिङ', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1650, fullFee: 3900, color: '#0891b2', url: null },
  { campus: 'Private', campusNp: 'नेसनल कलेज अफ इन्जिनियरिङ', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1800, fullFee: 4200, color: '#2563eb', url: null },

  // 7. Kathford International College of Engineering and Management — Balkumari, Lalitpur
  { campus: 'Private', campusNp: 'काठफोर्ड इन्टरनेसनल कलेज', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 1000, fullFee: 2700, color: '#7c3aed', url: null },
  { campus: 'Private', campusNp: 'काठफोर्ड इन्टरनेसनल कलेज', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1750, fullFee: 4100, color: '#059669', url: null },
  { campus: 'Private', campusNp: 'काठफोर्ड इन्टरनेसनल कलेज', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 1280, fullFee: 3200, color: '#4f46e5', url: null },
  { campus: 'Private', campusNp: 'काठफोर्ड इन्टरनेसनल कलेज', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1700, fullFee: 4000, color: '#0891b2', url: null },
  { campus: 'Private', campusNp: 'काठफोर्ड इन्टरनेसनल कलेज', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1850, fullFee: 4300, color: '#2563eb', url: null },

  // 8. Janakpur Engineering College — Janakpur, Dhanusha
  { campus: 'Private', campusNp: 'जनकपुर इन्जिनियरिङ कलेज', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 1100, fullFee: 2800, color: '#7c3aed', url: null },
  { campus: 'Private', campusNp: 'जनकपुर इन्जिनियरिङ कलेज', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1850, fullFee: 4200, color: '#059669', url: null },
  { campus: 'Private', campusNp: 'जनकपुर इन्जिनियरिङ कलेज', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 1350, fullFee: 3300, color: '#4f46e5', url: null },
  { campus: 'Private', campusNp: 'जनकपुर इन्जिनियरिङ कलेज', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1780, fullFee: 4100, color: '#0891b2', url: null },
  { campus: 'Private', campusNp: 'जनकपुर इन्जिनियरिङ कलेज', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1900, fullFee: 4400, color: '#2563eb', url: null },

  // 9. Khwopa College of Engineering — Libali, Bhaktapur
  { campus: 'Private', campusNp: 'ख्वपा कलेज अफ इन्जिनियरिङ', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 880, fullFee: 2400, color: '#7c3aed', url: 'https://khwopa.edu.np' },
  { campus: 'Private', campusNp: 'ख्वपा कलेज अफ इन्जिनियरिङ', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1580, fullFee: 3700, color: '#059669', url: 'https://khwopa.edu.np' },
  { campus: 'Private', campusNp: 'ख्वपा कलेज अफ इन्जिनियरिङ', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 1120, fullFee: 2850, color: '#4f46e5', url: 'https://khwopa.edu.np' },
  { campus: 'Private', campusNp: 'ख्वपा कलेज अफ इन्जिनियरिङ', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1520, fullFee: 3650, color: '#0891b2', url: 'https://khwopa.edu.np' },
  { campus: 'Private', campusNp: 'ख्वपा कलेज अफ इन्जिनियरिङ', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1680, fullFee: 4050, color: '#2563eb', url: 'https://khwopa.edu.np' },

  // 10. Lalitpur Engineering College — Lalitpur
  { campus: 'Private', campusNp: 'ललितपुर इन्जिनियरिङ कलेज', program: 'Computer Engineering', programNp: 'कम्प्युटर इन्जिनियरिङ', regular: 820, fullFee: 2200, color: '#7c3aed', url: null },
  { campus: 'Private', campusNp: 'ललितपुर इन्जिनियरिङ कलेज', program: 'Civil Engineering', programNp: 'सिभिल इन्जिनियरिङ', regular: 1520, fullFee: 3600, color: '#059669', url: null },
  { campus: 'Private', campusNp: 'ललितपुर इन्जिनियरिङ कलेज', program: 'Electronics, Communication & Information', programNp: 'इलेक्ट्रोनिक्स', regular: 1080, fullFee: 2750, color: '#4f46e5', url: null },
  { campus: 'Private', campusNp: 'ललितपुर इन्जिनियरिङ कलेज', program: 'Mechanical Engineering', programNp: 'मेकानिकल इन्जिनियरिङ', regular: 1500, fullFee: 3600, color: '#0891b2', url: null },
  { campus: 'Private', campusNp: 'ललितपुर इन्जिनियरिङ कलेज', program: 'Electrical Engineering', programNp: 'इलेक्ट्रिकल इन्जिनियरिङ', regular: 1650, fullFee: 3950, color: '#2563eb', url: null },
]
