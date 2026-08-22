// IOE 2082 first-list open-category cutoff RANKS.
// Lower rank = more competitive. Regular and Full Fee are separate sections.
// Source: PEA compiled campus lists (pea.edu.np), verified 2026-08-22.
// https://ioe-entrance.bibeksubedi0001.com.np/ioe-cutoff-rank

export interface Cutoff {
  campus: 'Pulchowk' | 'Thapathali' | 'WRC' | 'ERC' | 'Chitwan'
  campusNp: string
  program: string
  programNp: string
  regular: number
  fullFee: number
  color: string
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
]
