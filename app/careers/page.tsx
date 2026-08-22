'use client'

import Link from 'next/link'
import { useLang } from '../components/ui'

type T2 = [string, string] // [en, ne]

export default function Careers() {
  const { lang } = useLang()
  const isNe = lang === 'ne'
  const L = (t: T2) => (isNe ? t[1] : t[0])

  const branches: { icon: string; name: T2; jobs: T2[]; govt: T2; priv: T2; abroad: T2; start: string; senior: string; freelance: T2 }[] = [
    {
      icon: '💻', name: ['Computer Engineering', 'कम्प्युटर इन्जिनियरिङ'],
      jobs: [['Software Engineer (web / mobile / backend)', 'सफ्टवेयर इन्जिनियर (web / mobile / backend)'],
        ['DevOps / Cloud Engineer', 'DevOps / Cloud इन्जिनियर'],
        ['Data Analyst / ML Engineer', 'Data Analyst / ML इन्जिनियर']],
      govt: ['NEA IT section, Nepal Rastra Bank IT officer, loksewa technical, municipality IT officer', 'NEA IT section, नेपाल राष्ट्र बैंक IT officer, लोकसेवा प्राविधिक, नगरपालिका IT officer'],
      priv: ['F1Soft, Leapfrog, CloudFactory, Deerwalk, Verisk, eSewa/Khalti, banks & startups', 'F1Soft, Leapfrog, CloudFactory, Deerwalk, Verisk, eSewa/Khalti, बैंक र startups'],
      abroad: ['US (OPT/H1B after MS), UK (Skilled Worker), Australia (189/190 + ACS), Canada (Express Entry)', 'अमेरिका (MS पछि OPT/H1B), UK (Skilled Worker), अष्ट्रेलिया (189/190 + ACS), क्यानडा (Express Entry)'],
      start: 'NPR 30–50k/mo', senior: 'NPR 120–250k+/mo',
      freelance: ['Remote dev work for foreign clients — USD 500–3,000/mo; Nepal\u2019s biggest remote-work market', 'विदेशी क्लाइन्टका लागि remote काम — USD ५००–३०००/महिना; नेपालको सबैभन्दा ठूलो remote काम बजार'],
    },
    {
      icon: '🏗️', name: ['Civil Engineering', 'सिभिल इन्जिनियरिङ'],
      jobs: [['Site Engineer', 'साइट इन्जिनियर'],
        ['Structural Designer / Quantity Surveyor', 'Structural Designer / Quantity Surveyor'],
        ['Project Manager / Surveyor', 'Project Manager / Surveyor']],
      govt: ['DoR (roads), DoI (irrigation), municipality engineer, loksewa technical', 'DoR (सडक), DoI (सिँचाइ), नगरपालिका इन्जिनियर, लोकसेवा प्राविधिक'],
      priv: ['Construction contractors, design consultants, real-estate developers', 'निर्माण कम्पनीहरू, design consultant, real-estate developer'],
      abroad: ['UK (IEng/CEng), Australia (EA assessment), Canada (P.Eng path), US (FE/PE), Gulf (Qatar/Saudi)', 'UK (IEng/CEng), अष्ट्रेलिया (EA assessment), क्यानडा (P.Eng), अमेरिका (FE/PE), खाडी (कतार/साउदी)'],
      start: 'NPR 25–40k/mo', senior: 'NPR 80–150k+/mo',
      freelance: ['Structural design consultancy, site supervision, estimation — often part-time', 'Structural design consultancy, साइट सुपरिवेक्षण, estimation — प्रायः part-time'],
    },
    {
      icon: '⚡', name: ['Electrical Engineering', 'इलेक्ट्रिकल इन्जिनियरिङ'],
      jobs: [['Power Systems Engineer (hydro/transmission)', 'Power Systems इन्जिनियर (hydro/transmission)'],
        ['Substation Engineer', 'Substation इन्जिनियर'],
        ['Solar / Renewable Engineer', 'Solar / नवीकरणीय ऊर्जा इन्जिनियर']],
      govt: ['NEA engineer (entry ~NPR 35–45k), AEPC, municipalities, loksewa', 'NEA इन्जिनियर (प्रवेश ~NPR ३५–४५ हजार), AEPC, नगरपालिका, लोकसेवा'],
      priv: ['Hydropower developers (Nepal\u2019s biggest private sector), solar companies, industries, contractors', 'जलविद्युत कम्पनीहरू (नेपालको सबैभन्दा ठूलो निजी क्षेत्र), solar कम्पनी, उद्योग, ठेकेदार'],
      abroad: ['Australia (power/hydro experience valued), Canada, US (PE route), Gulf', 'अष्ट्रेलिया (power/hydro अनुभवको मूल्य), क्यानडा, अमेरिका (PE), खाडी'],
      start: 'NPR 30–45k/mo', senior: 'NPR 90–150k+/mo',
      freelance: ['Electrical design, solar system sizing, load calculation, panel design', 'Electrical design, solar system sizing, load calculation, panel design'],
    },
    {
      icon: '🔧', name: ['Mechanical Engineering', 'मेकानिकल इन्जिनियरिङ'],
      jobs: [['Plant / Maintenance Engineer', 'Plant / Maintenance इन्जिनियर'],
        ['HVAC / Production Engineer', 'HVAC / Production इन्जिनियर'],
        ['Automobile Engineer', 'Automobile इन्जिनियर']],
      govt: ['NEA (hydropower plants), loksewa, government factories/workshops', 'NEA (जलविद्युत प्लान्ट), लोकसेवा, सरकारी कारखाना'],
      priv: ['Cement/steel/food factories, hydropower O&M, automotive, aviation MRO', 'सिमेन्ट/फलाम/खाद्य कारखाना, जलविद्युत O&M, automotive, aviation MRO'],
      abroad: ['Canada, Australia (skilled visa), Gulf (oil & gas), US', 'क्यानडा, अष्ट्रेलिया (skilled visa), खाडी (oil & gas), अमेरिका'],
      start: 'NPR 25–40k/mo', senior: 'NPR 80–150k+/mo',
      freelance: ['CAD design, plant & piping consultancy', 'CAD design, plant र piping consultancy'],
    },
    {
      icon: '📡', name: ['Electronics & Communication', 'इलेक्ट्रोनिक्स र सञ्चार'],
      jobs: [['Network / Telecom Engineer', 'Network / Telecom इन्जिनियर'],
        ['Embedded Systems Engineer', 'Embedded Systems इन्जिनियर'],
        ['IoT Developer', 'IoT Developer']],
      govt: ['NTA, Nepal Telecom, loksewa, broadcasting', 'NTA, नेपाल टेलिकम, लोकसेवा, प्रसारण'],
      priv: ['Ncell, Nepal Telecom, ISPs (WorldLink, Vianet), banks (IT), hardware firms', 'Ncell, नेपाल टेलिकम, ISP (WorldLink, Vianet), बैंक (IT), hardware कम्पनी'],
      abroad: ['US (embedded/telecom), Germany (EU Blue Card), Australia, Canada', 'अमेरिका (embedded/telecom), जर्मनी (EU Blue Card), अष्ट्रेलिया, क्यानडा'],
      start: 'NPR 30–45k/mo', senior: 'NPR 90–150k+/mo',
      freelance: ['Network setup, embedded/PCB design, hardware prototyping', 'Network setup, embedded/PCB design, hardware prototyping'],
    },
    {
      icon: '🏛️', name: ['Architecture', 'आर्किटेक्चर'],
      jobs: [['Architectural Designer', 'आर्किटेक्चरल डिजाइनर'],
        ['Site Architect', 'साइट आर्किटेक्ट'],
        ['Urban Planner / Interior Designer', 'Urban Planner / Interior Designer']],
      govt: ['Municipalities, DUDBC, loksewa', 'नगरपालिका, DUDBC, लोकसेवा'],
      priv: ['Architecture firms, real-estate developers, interior studios', 'आर्किटेक्चर फर्म, real-estate developer, interior studio'],
      abroad: ['Australia (AACA), UK (ARB/RIBA), Canada (CACB)', 'अष्ट्रेलिया (AACA), UK (ARB/RIBA), क्यानडा (CACB)'],
      start: 'NPR 25–40k/mo (interns lower)', senior: 'NPR 80–150k+/mo',
      freelance: ['House design + permit drawings, 3D rendering — a large informal market', 'घर डिजाइन + नक्सा पास, 3D rendering — ठूलो अनौपचारिक बजार'],
    },
  ]

  const medFields: { icon: string; name: T2; path: T2; jobs: T2; salary: T2 }[] = [
    {
      icon: '🩺', name: ['MBBS — Doctor', 'MBBS — डाक्टर'],
      path: ['MBBS (5.5 yrs) → internship → Nepal Medical Council (NMC) license → Medical Officer (MO) → MD/MS (3 yrs) → specialist', 'MBBS (५.५ वर्ष) → internship → नेपाल मेडिकल काउन्सिल (NMC) इजाजत → Medical Officer (MO) → MD/MS (३ वर्ष) → विशेषज्ञ'],
      jobs: ['Govt hospital MO (job security + pension, lower pay) vs private hospital MO (higher pay, more hours); MD/MS in medicine, surgery, OB-GYN, pediatrics…', 'सरकारी अस्पताल MO (जागिर सुरक्षा + पेन्सन, कम तलब) vs निजी अस्पताल MO (बढी तलब, बढी समय); MD/MS — medicine, surgery, OB-GYN, pediatrics…'],
      salary: ['Junior MO ~NPR 60–80k/mo • Specialist ~NPR 150–300k • Private practice / own clinic: unlimited', 'Junior MO ~NPR ६०–८० हजार/महिना • विशेषज्ञ ~NPR १.५–३ लाख • निजी practice / आफ्नै क्लिनिक: असीमित'],
    },
    {
      icon: '🦷', name: ['BDS — Dental Surgery', 'BDS — डेन्टल सर्जरी'],
      path: ['BDS (4 yrs + 1 yr internship) → NMC license → dental surgeon → MDS specialization', 'BDS (४ वर्ष + १ वर्ष internship) → NMC इजाजत → डेन्टल सर्जन → MDS विशेषज्ञता'],
      jobs: ['Hospital / clinic dental surgeon, own clinic, public-health dentistry', 'अस्पताल / क्लिनिक डेन्टल सर्जन, आफ्नै क्लिनिक, सार्वजनिक स्वास्थ्य दन्त्य'],
      salary: ['Junior ~NPR 40–70k • Own clinic: varies • MDS specialist ~NPR 80–200k', 'Junior ~NPR ४०–७० हजार • आफ्नै क्लिनिक: फरक-फरक • MDS विशेषज्ञ ~NPR ८० हजार–२ लाख'],
    },
    {
      icon: '💉', name: ['BSc Nursing', 'BSc नर्सिङ'],
      path: ['BSc Nursing (4 yrs) → Nepal Nursing Council registration → staff nurse → in-charge → MSN', 'BSc नर्सिङ (४ वर्ष) → नेपाल नर्सिङ काउन्सिल दर्ता → स्टाफ नर्स → in-charge → MSN'],
      jobs: ['Govt health posts, private hospitals — or abroad (Australia / UK / US, huge demand)', 'सरकारी स्वास्थ्य चौकी, निजी अस्पताल — वा विदेश (अष्ट्रेलिया / UK / US, ठूलो माग)'],
      salary: ['Nepal ~NPR 25–45k/mo • Abroad (Australia): AUD 75–90k/yr', 'नेपाल ~NPR २५–४५ हजार/महिना • विदेश (अष्ट्रेलिया): AUD ७५–९० हजार/वर्ष'],
    },
    {
      icon: '💊', name: ['Pharmacy (B.Pharm)', 'फार्मेसी (B.Pharm)'],
      path: ['B.Pharm (4 yrs) → Nepal Pharmacy Council → hospital / community pharmacist → M.Pharm / PhD', 'B.Pharm (४ वर्ष) → नेपाल फार्मेसी काउन्सिल → अस्पताल / सामुदायिक फार्मासिस्ट → M.Pharm / PhD'],
      jobs: ['Hospital pharmacist, community pharmacy, pharma companies (Deurali-Janta, Lomus…), DDA regulatory', 'अस्पताल फार्मासिस्ट, सामुदायिक फार्मेसी, फार्मा कम्पनी (देउराली-जनता, Lomus…), DDA नियमन'],
      salary: ['Start ~NPR 20–40k • Senior / industry ~NPR 60–120k', 'सुरु ~NPR २०–४० हजार • Senior / उद्योग ~NPR ६० हजार–१.२ लाख'],
    },
    {
      icon: '🦵', name: ['BPT — Physiotherapy', 'BPT — फिजियोथेरापी'],
      path: ['BPT (4.5 yrs) → Nepal Health Professional Council → physiotherapist → MPT specialization', 'BPT (४.५ वर्ष) → नेपाल स्वास्थ्य व्यावसायिक परिषद् → फिजियोथेरापिस्ट → MPT विशेषज्ञता'],
      jobs: ['Hospitals, rehab centers, sports physio, own clinic', 'अस्पताल, पुनर्स्थापना केन्द्र, खेलकुद फिजियो, आफ्नै क्लिनिक'],
      salary: ['Start ~NPR 25–45k • Senior / own practice ~NPR 60–150k', 'सुरु ~NPR २५–४५ हजार • Senior / आफ्नै practice ~NPR ६० हजार–१.५ लाख'],
    },
    {
      icon: '🌿', name: ['BAMS — Ayurveda', 'BAMS — आयुर्वेद'],
      path: ['BAMS (5.5 yrs) → Nepal Ayurvedic Medical Council → ayurvedic physician → MD (Ayurveda)', 'BAMS (५.५ वर्ष) → नेपाल आयुर्वेदिक मेडिकल काउन्सिल → आयुर्वेद चिकित्सक → MD (आयुर्वेद)'],
      jobs: ['Ayurveda hospitals, own clinic, ayurvedic pharma, govt ayurvedic health posts', 'आयुर्वेद अस्पताल, आफ्नै क्लिनिक, आयुर्वेदिक फार्मा, सरकारी आयुर्वेद स्वास्थ्य चौकी'],
      salary: ['Start ~NPR 25–50k • Senior ~NPR 70–150k', 'सुरु ~NPR २५–५० हजार • Senior ~NPR ७० हजार–१.५ लाख'],
    },
    {
      icon: '🌍', name: ['BPH — Public Health', 'BPH — पब्लिक हेल्थ'],
      path: ['BPH (4 yrs) → MPH → research / health programs', 'BPH (४ वर्ष) → MPH → अनुसन्धान / स्वास्थ्य कार्यक्रम'],
      jobs: ['NGOs/INGOs (WHO, UNICEF, Save the Children…), research institutes, ministry, program officer', 'NGO/INGO (WHO, UNICEF, Save the Children…), अनुसन्धान संस्थान, मन्त्रालय, कार्यक्रम अधिकृत'],
      salary: ['Start ~NPR 30–60k • Senior / MPH ~NPR 80–200k (INGOs higher)', 'सुरु ~NPR ३०–६० हजार • Senior / MPH ~NPR ८० हजार–२ लाख (INGO बढी)'],
    },
  ]

  const abroad: { flag: string; name: string; desc: T2; salary: string }[] = [
    { flag: '🇺🇸', name: 'USMLE (USA)', desc: ['Pass USMLE Steps 1/2/3 + clinical experience → match into US residency (3–7 yrs) → attending. Competitive but the highest-paying route for Nepali MBBS grads.', 'USMLE Step 1/2/3 पास + clinical अनुभव → अमेरिकी residency (३–७ वर्ष) → attending। प्रतिस्पर्धी तर नेपाली MBBS स्नातकका लागि सबैभन्दा बढी तलब दिने बाटो।'], salary: 'Resident ~USD 60–70k • Attending ~USD 250–400k' },
    { flag: '🇬🇧', name: 'PLAB (UK)', desc: ['PLAB 1 & 2 → GMC registration → 2-yr foundation programme → specialty training. NHS route; IELTS/OET required.', 'PLAB 1 र 2 → GMC दर्ता → २ वर्षे foundation programme → विशेषज्ञ तालिम। NHS बाटो; IELTS/OET चाहिन्छ।'], salary: 'Foundation ~GBP 32–45k • Specialist ~GBP 60–100k (USD ~75–130k)' },
    { flag: '🇮🇳', name: 'FMGE / NExT (India)', desc: ['Foreign MBBS grads must clear FMGE (being replaced by NExT) + internship in India, then NEET-PG for specialization. Cheaper and closer, but crowded.', 'विदेशी MBBS स्नातकले FMGE (अब NExT ले बदल्दै) + भारतमा internship पास गर्नुपर्छ, अनि विशेषज्ञताका लागि NEET-PG। सस्तो र नजिक, तर प्रतिस्पर्धा धेरै।'], salary: 'Junior doctor ~INR 50–80k/mo (USD ~600–1,000/mo)' },
    { flag: '🇦🇺', name: 'AMC (Australia)', desc: ['AMC exams + English (OET/IELTS) → AHPRA registration → internship → specialist training. High demand for doctors.', 'AMC परीक्षा + English (OET/IELTS) → AHPRA दर्ता → internship → विशेषज्ञ तालिम। डाक्टरको ठूलो माग।'], salary: 'Specialist ~AUD 150–300k (USD ~100–200k)' },
    { flag: '🇩🇪', name: 'Germany', desc: ['Approbation: B2/C1 German + medical exam → work as a doctor. No tuition for the language route; recognized EU pathway.', 'Approbation: B2/C1 जर्मन + मेडिकल परीक्षा → डाक्टरको रूपमा काम। भाषा बाटोमा tuition छैन; EU मान्यता प्राप्त।'], salary: 'Doctor ~EUR 60–90k (USD ~65–100k)' },
    { flag: '🇦🇺', name: 'Australia — Nursing', desc: ['OET/IELTS + ANMAC assessment → registered nurse (AHPRA). The fastest medical-abroad route for Nepali nurses.', 'OET/IELTS + ANMAC assessment → दर्ता गरिएको नर्स (AHPRA)। नेपाली नर्सका लागि सबैभन्दा छिटो विदेश जाने बाटो।'], salary: 'RN ~AUD 75–95k/yr (USD ~50–65k)' },
  ]

  const altPaths: { icon: string; name: T2; desc: T2 }[] = [
    { icon: '💼', name: ['Entrepreneurship', 'उद्यमशीलता'], desc: ['Start your own business — Nepal\u2019s market still has gaps in services, e-commerce, healthcare, agritech. High risk, unlimited reward.', 'आफ्नै व्यवसाय सुरु गर्नुहोस् — नेपाली बजारमा सेवा, e-commerce, स्वास्थ्य, agritech मा अझै अवसर छ। उच्च जोखिम, असीमित प्रतिफल।'] },
    { icon: '🚀', name: ['Tech startups', 'टेक स्टार्टअप'], desc: ['Join Nepali startups (eSewa, IME Pay, Foodmandu, Sajilo…) or build your own product — skills matter more than degrees.', 'नेपाली startup (eSewa, IME Pay, Foodmandu, Sajilo…) मा जोडिनुहोस् वा आफ्नै product बनाउनुहोस् — degree भन्दा सीप महत्त्वपूर्ण।'] },
    { icon: '🎓', name: ['Academia (MSc/PhD)', 'शिक्षण/अनुसन्धान (MSc/PhD)'], desc: ['Teaching + research at IOE/IOM colleges; scholarships abroad (Fulbright, DAAD, MEXT, CSC). Lecturer ~NPR 40–70k + research grants.', 'IOE/IOM कलेजमा पढाउने + अनुसन्धान; विदेशी छात्रवृत्ति (Fulbright, DAAD, MEXT, CSC)। प्राध्यापक ~NPR ४०–७० हजार + अनुसन्धान अनुदान।'] },
    { icon: '📚', name: ['Teaching', 'शिक्षण'], desc: ['College lecturer, +2 science/math teacher, or coaching / entrance-prep institutes — a fast-growing market (think bato!).', 'कलेज प्राध्यापक, +2 विज्ञान/गणित शिक्षक, वा coaching / entrance तयारी संस्थान — द्रुत बढ्दो बजार (bato! सम्झनुहोस्)।'] },
    { icon: '🗳️', name: ['Civil service (loksewa)', 'लोकसेवा'], desc: ['Technical or general loksewa officer: stable job, pension, social prestige. ~NPR 35–60k + allowances, regular promotions.', 'प्राविधिक वा साधारण लोकसेवा अधिकृत: स्थिर जागिर, पेन्सन, सामाजिक प्रतिष्ठा। ~NPR ३५–६० हजार + भत्ता, नियमित बढुवा।'] },
    { icon: '🏛️', name: ['Politics & policy', 'राजनीति र नीति'], desc: ['Youth wings, local elections, policy research, advocacy. Slow to pay off but the most influential path.', 'युवा संगठन, स्थानीय निर्वाचन, नीति अनुसन्धान, वकालत। फाइदा दिन ढिलो तर सबैभन्दा प्रभावशाली बाटो।'] },
  ]

  const table: { role: T2; entry: string; mid: string; senior: string }[] = [
    { role: ['Software Engineer', 'सफ्टवेयर इन्जिनियर'], entry: '30–50k', mid: '70–120k', senior: '150–250k+' },
    { role: ['Civil Engineer', 'सिभिल इन्जिनियर'], entry: '25–40k', mid: '50–90k', senior: '80–150k+' },
    { role: ['Electrical Engineer (NEA)', 'इलेक्ट्रिकल इन्जिनियर (NEA)'], entry: '35–45k', mid: '70–110k', senior: '120–200k' },
    { role: ['Mechanical Engineer', 'मेकानिकल इन्जिनियर'], entry: '25–40k', mid: '55–90k', senior: '80–150k+' },
    { role: ['Electronics Engineer', 'इलेक्ट्रोनिक्स इन्जिनियर'], entry: '30–45k', mid: '60–100k', senior: '90–150k+' },
    { role: ['Architect', 'आर्किटेक्ट'], entry: '25–40k', mid: '50–90k', senior: '80–150k+' },
    { role: ['Medical Officer (MBBS)', 'मेडिकल अफिसर (MBBS)'], entry: '60–80k', mid: '90–120k', senior: '150–250k' },
    { role: ['Specialist Doctor (MD/MS)', 'स्पेसियालिस्ट डाक्टर (MD/MS)'], entry: '150–300k', mid: '250–400k', senior: '400k+ (private: unlimited)' },
    { role: ['Dental Surgeon', 'डेन्टल सर्जन'], entry: '40–70k', mid: '80–120k', senior: '150–250k' },
    { role: ['Staff Nurse', 'स्टाफ नर्स'], entry: '25–45k', mid: '45–70k', senior: '80–120k' },
    { role: ['Pharmacist', 'फार्मासिस्ट'], entry: '20–40k', mid: '45–70k', senior: '70–120k' },
    { role: ['Physiotherapist', 'फिजियोथेरापिस्ट'], entry: '25–45k', mid: '50–80k', senior: '80–150k' },
    { role: ['Public Health Officer', 'पब्लिक हेल्थ अफिसर'], entry: '30–60k', mid: '70–120k', senior: '120–200k+' },
  ]

  const Sal = ({ label, value }: { label: T2; value: string }) => (
    <span style={{ display: 'inline-block', background: 'var(--primary-soft)', color: 'var(--primary)', padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, margin: '4px 6px 0 0' }}>
      {L(label)}: {value}
    </span>
  )

  const Row = ({ label, children }: { label: T2; children: string }) => (
    <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: 'var(--text)' }}>
      <span style={{ color: 'var(--muted)', fontWeight: 700, fontSize: 12 }}>{L(label)}: </span>
      {children}
    </div>
  )

  const thStyle: React.CSSProperties = { padding: '8px 6px', fontSize: 12, fontWeight: 800, textAlign: 'left', background: 'var(--primary-soft)', color: 'var(--primary)', borderBottom: '1px solid var(--border)' }
  const tdStyle: React.CSSProperties = { padding: '7px 6px', fontSize: 12.5, borderBottom: '1px solid var(--border)', color: 'var(--text)' }

  return (
    <div className="page">
      <div className="topbar">
        <Link href="/" className="back-btn" aria-label="Home">←</Link>
        <span className="nav-title">💼 {isNe ? 'करियर' : 'Careers'}</span>
        <div />
      </div>
      <div className="page-content">
        <div className="info-box">
          📌 {isNe
            ? 'नेपालमा इन्जिनियरिङ र मेडिकल स्नातकहरूका लागि यथार्थपरक करियर र तलब अवलोकन — सरकारी, निजी, विदेश र अपरम्परागत बाटोहरू।'
            : 'A realistic career & salary overview for engineering and medical graduates in Nepal — government, private, abroad, and non-traditional paths.'}
        </div>

        {/* A. Engineering */}
        <div className="section-header" style={{ marginTop: 20 }}>
          <div className="section-title">🏗️ {isNe ? 'इन्जिनियरिङ — शाखा अनुसार करियर' : 'Engineering Careers by Branch'}</div>
          <div className="section-sub">{isNe ? 'जागिर, सरकारी, निजी, विदेश र तलब' : 'jobs, government, private, abroad & salary'}</div>
        </div>

        {branches.map(b => (
          <div key={b.name[0]} className="card" style={{ marginBottom: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>{b.icon}</span>
              <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>{L(b.name)}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
              {b.jobs.map((j, i) => <span key={i} style={{ marginRight: 8 }}>▸ {L(j)}</span>)}
            </div>
            <Row label={['Govt', 'सरकारी']}>{L(b.govt)}</Row>
            <Row label={['Private', 'निजी']}>{L(b.priv)}</Row>
            <Row label={['Abroad', 'विदेश']}>{L(b.abroad)}</Row>
            <Row label={['Freelance / consultancy', 'Freelance / परामर्श']}>{L(b.freelance)}</Row>
            <div style={{ marginTop: 10 }}>
              <Sal label={['Start', 'सुरु']} value={b.start} />
              <Sal label={['Senior', 'Senior']} value={b.senior} />
            </div>
          </div>
        ))}

        {/* B. Medical */}
        <div className="section-header" style={{ marginTop: 24 }}>
          <div className="section-title">🩺 {isNe ? 'मेडिकल — क्षेत्र अनुसार करियर' : 'Medical Careers by Field'}</div>
          <div className="section-sub">{isNe ? 'करियर बाटो र तलब' : 'career paths & salaries'}</div>
        </div>

        {medFields.map(m => (
          <div key={m.name[0]} className="card" style={{ marginBottom: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>{L(m.name)}</div>
            </div>
            <Row label={['Path', 'बाटो']}>{L(m.path)}</Row>
            <Row label={['Career options', 'करियर विकल्प']}>{L(m.jobs)}</Row>
            <div style={{ marginTop: 10 }}>
              <Sal label={['Salary', 'तलब']} value={L(m.salary)} />
            </div>
          </div>
        ))}

        {/* C. Study abroad */}
        <div className="section-header" style={{ marginTop: 24 }}>
          <div className="section-title">✈️ {isNe ? 'विदेशमा पढाइ र करियर' : 'Study & Work Abroad'}</div>
          <div className="section-sub">{isNe ? 'प्रत्येक बाटोको छोटो जानकारी + विदेशी तलब (USD)' : 'each route in brief + salary abroad (USD)'}</div>
        </div>

        {abroad.map(a => (
          <div key={a.name} className="card" style={{ marginBottom: 12, padding: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{a.flag}</span> {a.name}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text)' }}>{L(a.desc)}</div>
            <div style={{ marginTop: 8 }}>
              <Sal label={['Abroad salary', 'विदेशी तलब']} value={a.salary} />
            </div>
          </div>
        ))}

        {/* D. Non-traditional */}
        <div className="section-header" style={{ marginTop: 24 }}>
          <div className="section-title">🌟 {isNe ? 'अपरम्परागत बाटोहरू' : 'Non-Traditional Paths'}</div>
          <div className="section-sub">{isNe ? 'डिग्रीभन्दा बाहिरका विकल्प' : 'options beyond the degree'}</div>
        </div>

        {altPaths.map(p => (
          <div key={p.name[0]} className="card" style={{ marginBottom: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>{p.icon}</span>
              <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>{L(p.name)}</div>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text)' }}>{L(p.desc)}</div>
          </div>
        ))}

        {/* E. Salary table */}
        <div className="section-header" style={{ marginTop: 24 }}>
          <div className="section-title">📊 {isNe ? 'तलब तालिका (NPR, प्रति महिना)' : 'Salary Table (NPR, per month)'}</div>
          <div className="section-sub">{isNe ? 'प्रवेश • मध्य • Senior' : 'entry • mid • senior'}</div>
        </div>

        <div className="card" style={{ marginBottom: 12, padding: 12, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 420 }}>
            <thead>
              <tr>
                <th style={thStyle}>{isNe ? 'भूमिका' : 'Role'}</th>
                <th style={thStyle}>{isNe ? 'प्रवेश' : 'Entry'}</th>
                <th style={thStyle}>{isNe ? 'मध्य' : 'Mid'}</th>
                <th style={thStyle}>{isNe ? 'Senior' : 'Senior'}</th>
              </tr>
            </thead>
            <tbody>
              {table.map(r => (
                <tr key={r.role[0]}>
                  <td style={{ ...tdStyle, fontWeight: 700 }}>{L(r.role)}</td>
                  <td style={tdStyle}>{r.entry}</td>
                  <td style={tdStyle}>{r.mid}</td>
                  <td style={{ ...tdStyle, color: 'var(--primary)', fontWeight: 700 }}>{r.senior}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 10, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
            {isNe
              ? '* सबै तथ्याङ्क प्रति महिना, NPR मा, काठमाडौंका लागि सामान्य दर। वास्तविक तलब कामदाता, अनुभव र स्थान अनुसार फरक पर्छ।'
              : '* All figures are monthly, in NPR, typical for Kathmandu. Actual pay varies by employer, experience and location.'}
          </div>
        </div>
      </div>
    </div>
  )
}
