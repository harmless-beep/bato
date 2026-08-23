#!/usr/bin/env python
"""Generate KU KUCAT syllabus PDF in the exact uniform BATO style
(matching public/pdfs/ioe-entrance-syllabus.pdf and mecee-bl-syllabus.pdf)."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame,
                                Paragraph, Spacer, Table, TableStyle,
                                ListFlowable, ListItem, KeepTogether)

OUT = 'public/pdfs/ku-kucat-syllabus-2026.pdf'

NAVY = colors.HexColor('#1e3a8a')
PURPLE = colors.HexColor('#7c3aed')
INDIGO = colors.HexColor('#4f46e5')
DARK = colors.HexColor('#111827')
MUTED = colors.HexColor('#6b7280')
LIGHT = colors.HexColor('#f3f4f6')
LINEGRAY = colors.HexColor('#d1d5db')

PAGE_W, PAGE_H = A4
M = 18 * mm  # margin

HEADER = "BATO \u2014 NEPAL ENGINEERING & MEDICAL ENTRANCE PREP  |  FREE & OFFLINE"
FOOT_TITLE = "KU KUCAT-CBT \u2014 Full Syllabus  \u2014  harmless-beep.github.io/bato"

st_title = ParagraphStyle('t', fontName='Helvetica-Bold', fontSize=19, leading=23,
                          textColor=DARK, alignment=TA_CENTER, spaceAfter=2)
st_sub = ParagraphStyle('s', fontName='Helvetica', fontSize=11, leading=15,
                        textColor=MUTED, alignment=TA_CENTER, spaceAfter=6)
st_h1 = ParagraphStyle('h1', fontName='Helvetica-Bold', fontSize=13, leading=16,
                       textColor=INDIGO, spaceBefore=9, spaceAfter=3)
st_h2 = ParagraphStyle('h2', fontName='Helvetica-Bold', fontSize=11, leading=14,
                       textColor=DARK, spaceBefore=6, spaceAfter=2)
st_body = ParagraphStyle('b', fontName='Helvetica', fontSize=9.5, leading=13.5,
                         textColor=DARK, spaceAfter=2)
st_cell_l = ParagraphStyle('cl', fontName='Helvetica', fontSize=9.5, leading=12.5,
                           textColor=DARK)
st_cell_r = ParagraphStyle('cr', fontName='Helvetica', fontSize=9.5, leading=12.5,
                           textColor=DARK)
footer_style = ParagraphStyle('f', fontName='Helvetica', fontSize=8, leading=10, textColor=MUTED)


def header_band(canv, doc):
    canv.saveState()
    canv.setFillColor(NAVY)
    canv.rect(0, PAGE_H - 30, PAGE_W, 30, stroke=0, fill=1)
    canv.setFillColor(colors.white)
    canv.setFont('Helvetica-Bold', 9.5)
    canv.drawCentredString(PAGE_W / 2, PAGE_H - 21, HEADER)
    canv.restoreState()


def footer(canv, doc):
    canv.saveState()
    canv.setStrokeColor(LINEGRAY)
    canv.setLineWidth(0.5)
    canv.line(M, 16, PAGE_W - M, 16)
    canv.setFont('Helvetica', 8)
    canv.setFillColor(MUTED)
    canv.drawString(M, 9, FOOT_TITLE)
    canv.drawRightString(PAGE_W - M, 9, 'Page %d' % doc.page)
    canv.restoreState()


def section(title):
    return Paragraph(title, st_h1)


def subsection(title):
    return Paragraph(title, st_h2)


def kv_table(rows):
    """Two-column label/value table: light-gray label cells, thin row rules."""
    data = [[Paragraph(k, st_cell_l), Paragraph(v, st_cell_r)] for k, v in rows]
    t = Table(data, colWidths=[46 * mm, PAGE_W - 2 * M - 46 * mm])
    style = [
        ('BACKGROUND', (0, 0), (0, -1), LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LINEBELOW', (0, 0), (-1, -1), 0.4, LINEGRAY),
    ]
    t.setStyle(TableStyle(style))
    return t


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(i, st_body), leftIndent=14, value='bulletchar') for i in items],
        bulletType='bullet', start='\u2022', leftIndent=14, bulletFontSize=7.5,
        spaceAfter=1)


def topic_table(pairs):
    """One-column topic list: S.N. + Topic, two columns side by side like the official doc."""
    half = (len(pairs) + 1) // 2
    left, right = pairs[:half], pairs[half:]
    rows = []
    for i in range(half):
        l = left[i]
        r = right[i] if i < len(right) else ('', '')
        rows.append([Paragraph(l[0], st_cell_l), Paragraph(l[1], st_cell_l),
                     Paragraph(r[0], st_cell_l), Paragraph(r[1], st_cell_l)])
    t = Table(rows, colWidths=[10 * mm, 66 * mm, 10 * mm, 66 * mm])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 3),
        ('RIGHTPADDING', (0, 0), (-1, -1), 3),
        ('TOPPADDING', (0, 0), (-1, -1), 1.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1.5),
        ('GRID', (0, 0), (-1, -1), 0.3, LINEGRAY),
    ]))
    return t


# ── KU KUCAT official syllabus: 40 topics per subject, from KU KUCAT-CBT 2026 doc ──
PHYSICS_T = [
    "Physical Quantity", "Kinematics", "Dynamics", "Energy", "Rotational motion",
    "Gravitation", "Structure & Properties of Matter", "Elasticity", "Viscosity",
    "Surface tension", "Heat & temperature", "Transmission of heat",
    "Kinetic theory of gases", "Thermodynamics", "Reflection", "Refraction",
    "Speed of light", "Dispersion of light", "Optical Instruments", "Photometry",
    "Wave motion", "Sound", "Electromagnetic waves", "Simple Electrostatic Phenomenon",
    "Charge flow", "Resistance", "Effect of Current", "Capacitors", "Magnetic field",
    "Force on conductor", "Magnetic materials", "Electromagnetic induction",
    "Alternating current", "Electron", "Photons", "Electronic", "Atoms", "Nucleus",
    "Radioactivity", "Elementary particles",
]
CHEM_T = [
    "Language of Chemistry", "Gaseous state of matter", "Liquid state of matter",
    "Solid state of matter", "Laws of Stoichiometry", "Avogadro's Hypothesis",
    "Atomic structure", "Quantum numbers", "Chemical bonding", "Oxidation & Reduction",
    "Acids, Bases & Salts", "Acidimetry & Alkalimetry", "Periodic Table",
    "Electrochemistry", "Electrode potential", "Chemical Kinetics",
    "Chemical Equilibrium", "LeChatelier's Principle", "Chemical Thermodynamics",
    "Entropy & spontaneity", "Hydrogen, Oxygen & Nitrogen", "Carbon",
    "Sulphur & its compounds", "Halogen & halogen acids", "Introduction to Metals",
    "Alkali & alkaline earth metals", "Coinage metals", "Heavy metals",
    "Introduction to Organic Chemistry", "Hydrocarbons", "Organic halogen compounds",
    "Alcohols", "Ethers", "Carbonyl Compounds", "Carboxylic Acids", "Amines",
    "Aromatic Hydrocarbons", "Aniline & Nitrobenzene",
    "Carbohydrates, Proteins, Nucleic Acids, Lipids", "Polymers, Pesticides, Dyes, Drugs",
]
MATH_T = [
    "Representation of Data", "Measures of Location & Spread", "Probability",
    "Permutation & Combination", "Probability Distributions", "Binomial Distributions",
    "Expectation & Variance of a random variable", "Normal Distribution",
    "Surds & indices", "Functions & Graphs", "Quadratics & Inequalities",
    "Differentiation", "Application of Differentiation", "Sequences",
    "Binomial Theorem", "Trigonometry", "Extending Differentiation", "Vectors",
    "Geometric Sequences", "Second Derivative", "Integration",
    "Volume of revolution", "Polynomial", "The Modulus function",
    "Exponential & Logarithmic function",
    "Differentiating Exponential & Logarithmic Functions",
    "Differentiating Trigonometric Functions", "Determinants", "Matrices",
    "Equation of Straight Lines", "A pair of lines", "System of linear equations",
    "System of Linear Inequalities & Graphs", "Complex Numbers",
    "Limits & Continuity", "Coordinate Space", "Plane", "Concept of Sets",
    "Relation", "Functions",
]
BIO_T = [
    "Introduction to Biology", "Cell, cell-division & life components", "Origin of Life",
    "Theory of Evolution by Natural Selection", "Human Evolution",
    "Heredity & variation", "Regulation of replication, transcription & expression",
    "Concept of Taxonomy", "Monera", "Viruses", "Protista", "Mycota", "Plantae",
    "Morphology, Reproduction, Growth & Development of Flowering Plant",
    "Photosynthesis", "Transpiration", "Animalia", "Study of Earthworm",
    "Study of Frog", "Animal Tissues", "Animal Nutrition & Digestive system",
    "Respiratory system", "Circulation of body fluids", "Excretion & osmoregulation",
    "Nervous system", "Endocrine system", "Animal reproduction & embryonic development",
    "Amniocentesis", "Growth, Repair, Regeneration, Ageing & Death", "Animal Behaviour",
    "Concept of ecosystem", "Environmental pollution", "Green-house effect & global warming",
    "Conservation of Natural resources", "Pesticides", "Bio-fertilizers & biological pest control",
    "Biotechnology", "Domestication of plants & crop improvements", "Bioenergy",
    "Mental health, addiction & community health",
]


def numbered(topics):
    return [(str(i + 1), t) for i, t in enumerate(topics)]


def build():
    doc = BaseDocTemplate(OUT, pagesize=A4, leftMargin=M, rightMargin=M,
                          topMargin=30, bottomMargin=22, title='KU KUCAT-CBT Full Syllabus')
    frame = Frame(M, 22, PAGE_W - 2 * M, PAGE_H - 30 - 22, id='f')
    doc.addPageTemplates([PageTemplate(id='main', frames=[frame],
                                       onPage=header_band, onPageEnd=footer)])

    el = [
        Paragraph('Kathmandu University (KU)', st_title),
        Paragraph('KUCAT-CBT \u2014 School of Engineering / Science Entrance Examination', st_sub),
        Spacer(1, 2),
        _purple_tag(),
        Spacer(1, 6),

        section('1.  Examination Format'),
        kv_table([
            ('Exam', 'KUCAT-CBT \u2014 Kathmandu University Common Admission Test (Computer-Based Test)'),
            ('Duration', '2 hours (120 minutes)'),
            ('Total Questions', '120 MCQs \u2014 3 parts \u00d7 40 questions'),
            ('Total Score', '0 \u2013 2220 (adaptive scoring, see section 5)'),
            ('Marking', 'Adaptive difficulty 1\u20135; NO fixed negative marking (harder = more points)'),
            ('Mode', 'Computer-Based Test (CBT) \u2014 NOT available online'),
            ('Test Centers', 'Lalitpur, Dhulikhel, Biratnagar, Butwal, Pokhara'),
            ('For Programs', 'PCM (Physics/Chemistry/Maths) for Engineering & Science; PCB where Biology is required'),
        ]),

        section('2.  Subject-wise Weightage'),
        kv_table([
            ('Physics', '40 questions \u2014 one per syllabus topic'),
            ('Chemistry', '40 questions \u2014 one per syllabus topic'),
            ('Mathematics', '40 questions \u2014 one per syllabus topic (PCM track)'),
            ('Biology', '40 questions \u2014 one per syllabus topic (PCB track, where applicable)'),
            ('Total', '120 questions'),
        ]),

        section('3.  Detailed Syllabus by Subject'),
        subsection('3.1  Physics \u2014 40 Topics'),
        topic_table(numbered(PHYSICS_T)),
        subsection('3.2  Chemistry \u2014 40 Topics'),
        topic_table(numbered(CHEM_T)),
        subsection('3.3  Mathematics \u2014 40 Topics'),
        topic_table(numbered(MATH_T)),
        subsection('3.4  Biology \u2014 40 Topics  (PCB track only)'),
        topic_table(numbered(BIO_T)),

        section('4.  Eligibility & Application'),
        kv_table([
            ('Academic Requirement', '10+2 level (or equivalent) with aggregate GPA \u2265 2.0 (50% in percentage scale)'),
            ('Subject Stream', 'PCM for Engineering/Science; PCB where the program requires Biology'),
            ('Test Track', 'Candidates are tested in PCM or PCB for the entire offered program'),
            ('Application', 'Single application \u2014 one candidate may appear in KUCAT-CBT only once'),
            ('Application Fee', 'Rs. 2,000 (payable via eSewa/Khalti)'),
            ('Application Portal', 'apply.ku.edu.np/cbt'),
        ]),

        section('5.  Merit, Scoring (Adaptive) & Admission'),
        bullets([
            'Adaptive test: each part starts with a difficulty level 1 question.',
            'Answering correctly raises the next question\u2019s difficulty by 1; incorrectly lowers it by 1.',
            'At level 5 correct, or level 1 incorrect, difficulty stays the same.',
            'Scoring: level 1 = +11 points, rising by 2 per level (level 5 = +19). Score range 0\u20132220.',
            'No skipping and no going back to submitted questions; candidates may switch parts (subjects) anytime.',
            'Scores shown on screen at the end of the test.',
            'Admission offered by rank at KUCAT-CBT (KU merit list \u2014 no centralized counselling).',
            'B.Arch candidates: separate aptitude test after CBT results.',
        ]),

        section('6.  Important Dates & Notes'),
        KeepTogether(kv_table([
            ('Registration', 'Announced with the admission call (admission criteria document)'),
            ('Application Deadline', 'As stated in the admission call'),
            ('Exam Date & Center', 'As printed on the admission card (date, time, center)'),
            ('Result', 'Shown on screen immediately at the end of the test'),
        ])),
    ]
    doc.build(el)


def _purple_tag():
    """The 'OFFICIAL EXAM FORMAT & SYLLABUS 2083' white-on-purple tag with left bar."""
    from reportlab.platypus import Flowable

    class Tag(Flowable):
        def wrap(self, aw, ah):
            self.w, self.h = aw, 18
            return (aw, 18)

        def draw(self):
            c = self.canv
            w, h = self.w, self.h
            pad = 14
            text = 'OFFICIAL EXAM FORMAT & SYLLABUS 2026'
            c.setFont('Helvetica-Bold', 9.5)
            tw = c.stringWidth(text, 'Helvetica-Bold', 9.5)
            # purple bar on far left
            c.setFillColor(PURPLE)
            c.rect(0, 0, 4, h, stroke=0, fill=1)
            # purple pill behind text
            pw = tw + 2 * 10
            x = (w - pw) / 2
            c.setFillColor(PURPLE)
            c.roundRect(x, 1, pw, h - 2, 3, stroke=0, fill=1)
            c.setFillColor(colors.white)
            c.drawCentredString(w / 2, 5.5, text)

    return Tag()


if __name__ == '__main__':
    build()
    print('WROTE', OUT)
