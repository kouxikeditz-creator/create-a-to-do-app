export const initialNotes = [
  {
    id: 'note-1',
    title: 'Kinematics & Dynamics Master Formula Compendium',
    category: 'Formula Sheets',
    subject: 'Physics',
    classLevel: 'Class 11 & JEE',
    targetExam: 'JEE Main & Advanced',
    pages: 14,
    fileSize: '3.4 MB',
    author: 'Dr. Rajesh Verma',
    downloads: 14250,
    rating: 4.96,
    tags: ['Formulas', 'Mechanics', 'Shortcuts'],
    contentSnippet: `1. 1D Motion with Constant Acceleration:
   v = u + at,  s = ut + (1/2)at^2,  v^2 = u^2 + 2as,  s_n = u + (a/2)(2n - 1)
2. Projectile Motion:
   Time of Flight: T = (2 * u * sin θ) / g
   Maximum Height: H = (u^2 * sin^2 θ) / (2 * g)
   Horizontal Range: R = (u^2 * sin 2θ) / g
   Trajectory Equation: y = x * tan θ - (g * x^2) / (2 * u^2 * cos^2 θ)
3. Newton's 2nd Law for Variable Mass Systems:
   F_ext + v_rel * (dm/dt) = m * (dv/dt)
4. Rolling Motion on Incline:
   a_cm = (g * sin θ) / (1 + I_cm / (m * R^2))`
  },
  {
    id: 'note-2',
    title: 'NEET Complete Plant Physiology Mind Maps & High-Yield NCERT Extracts',
    category: 'Revision Notes',
    subject: 'Biology',
    classLevel: 'Class 11 & NEET',
    targetExam: 'NEET-UG',
    pages: 28,
    fileSize: '6.1 MB',
    author: 'Dr. Ananya Mukherjee',
    downloads: 21800,
    rating: 4.98,
    tags: ['NEET Biology', 'NCERT Highlights', 'Mind Map'],
    contentSnippet: `Chapter 11: Photosynthesis in Higher Plants
- Light-harvesting complex (LHC): Antenna pigments absorb different wavelengths of light.
- Reaction center: Chlorophyll a (P680 in PS-II, P700 in PS-I).
- Z-Scheme: Non-cyclic photophosphorylation generates ATP and NADPH.
- Splitting of water occurs on inner side of thylakoid membrane: 2H2O -> 4H+ + O2 + 4e-
- Calvin Cycle (C3 pathway): 3 Stages -> Carboxylation (catalyzed by RuBisCO), Reduction, Regeneration.
- Total ATP and NADPH needed for 1 Glucose: 18 ATP + 12 NADPH.`
  },
  {
    id: 'note-3',
    title: 'JEE Advanced 5-Year Solved PYQs (2020-2024) with Alternative Solutions',
    category: 'Previous Year Papers',
    subject: 'Mathematics',
    classLevel: 'Class 12 & Droppers',
    targetExam: 'JEE Advanced',
    pages: 64,
    fileSize: '12.8 MB',
    author: 'Prof. Vikramaditya Rathore',
    downloads: 18400,
    rating: 4.94,
    tags: ['PYQ', 'Calculus', 'Algebra', 'Vectors'],
    contentSnippet: `JEE Advanced 2024 Solved Highlights:
Problem 1 (Definite Integrals & Riemann Sum):
Evaluate: lim_{n -> inf} sum_{k=1}^n (k^2 / (n^3 + k^3))
Solution:
Convert to integral: int_0^1 (x^2 / (1 + x^3)) dx
Let u = 1 + x^3, du = 3x^2 dx
= (1/3) * [ln(u)] from 1 to 2 = (1/3) * ln(2). Time taken: 45 seconds.`
  },
  {
    id: 'note-4',
    title: 'Organic Chemistry Name Reactions & Reagents Handbook (CBSE + JEE + NEET)',
    category: 'Formula Sheets',
    subject: 'Chemistry',
    classLevel: 'Class 12',
    targetExam: 'Class 12 & JEE/NEET',
    pages: 22,
    fileSize: '4.8 MB',
    author: 'Dr. Meenakshi Sundaram',
    downloads: 16700,
    rating: 4.95,
    tags: ['Organic', 'Mechanisms', 'Reagents'],
    contentSnippet: `1. Aldol Condensation:
   Reagents: Dilute NaOH / Ba(OH)2.
   Requirement: At least one alpha-hydrogen in aldehyde/ketone.
   Product: Beta-hydroxy aldehyde (aldol) -> heat -> alpha,beta-unsaturated aldehyde.
2. Cannizzaro Reaction:
   Reagents: Conc. 50% KOH / NaOH.
   Requirement: No alpha-hydrogen (e.g., HCHO, Benzaldehyde).
   Disproportionation: One molecule reduced to alcohol, one oxidized to carboxylate salt.
3. Grignard Reagent (R-Mg-X):
   With Formaldehyde -> 1° Alcohol
   With Other Aldehydes -> 2° Alcohol
   With Ketones -> 3° Alcohol`
  },
  {
    id: 'note-5',
    title: 'CBSE Class 10 Science 100 Most Expected Board Questions with Marking Scheme',
    category: 'Important Questions',
    subject: 'Science',
    classLevel: 'Class 10',
    targetExam: 'CBSE Class 10 Board',
    pages: 36,
    fileSize: '7.2 MB',
    author: 'Priya Sen',
    downloads: 24300,
    rating: 4.97,
    tags: ['CBSE 10', 'Board Questions', 'Exemplar'],
    contentSnippet: `Q1: Write the balanced chemical equation when iron reacts with steam. Mention observations.
Ans: 3Fe(s) + 4H2O(g) -> Fe3O4(s) + 4H2(g) ^
Observations: Red hot iron oxidizes to black magnetic iron oxide, dihydrogen gas is liberated.
[Marking Scheme: 1 mark for equation, 1 mark for balancing, 1 mark for state symbols and observations]`
  },
  {
    id: 'note-6',
    title: 'CUET General Test Quantitative Aptitude & Reasoning Cheat Booklet',
    category: 'Revision Notes',
    subject: 'General Test',
    classLevel: 'Class 12',
    targetExam: 'CUET UG',
    pages: 18,
    fileSize: '3.9 MB',
    author: 'Prof. Vikramaditya Rathore',
    downloads: 9800,
    rating: 4.89,
    tags: ['CUET', 'Aptitude', 'Shortcuts'],
    contentSnippet: `Percentages and Fractions Equivalence:
1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%, 1/5 = 20%, 1/6 = 16.66%, 1/7 = 14.28%, 1/8 = 12.5%, 1/9 = 11.11%
Profit & Loss shortcuts:
When two articles are sold at same selling price, one at a profit of x% and other at a loss of x%, there is always a net loss of: Loss% = (x/10)^2 %`
  },
  {
    id: 'note-7',
    title: 'CBSE Class 12 Computer Science (Python 083) Complete Board Practical & Theory Dossier',
    category: 'Sample Papers',
    subject: 'Computer Science',
    classLevel: 'Class 12',
    targetExam: 'CBSE Class 12 Board',
    pages: 42,
    fileSize: '8.5 MB',
    author: 'Er. Kunal Singhania',
    downloads: 8100,
    rating: 4.92,
    tags: ['Python', 'SQL', 'Computer Networks'],
    contentSnippet: `File Handling Master Code in Python:
# Count frequency of word 'INDIA' in a text file
def count_india(filename):
    count = 0
    with open(filename, 'r') as f:
        for line in f:
            words = line.split()
            for w in words:
                if w.strip('.,?!').upper() == 'INDIA':
                    count += 1
    return count`
  },
  {
    id: 'note-8',
    title: 'Class 9 Mathematics NCERT Exemplar & Proofs Quick Refresher',
    category: 'Revision Notes',
    subject: 'Mathematics',
    classLevel: 'Class 9',
    targetExam: 'Class 9 School & Olympiad',
    pages: 20,
    fileSize: '4.1 MB',
    author: 'Priya Sen',
    downloads: 11300,
    rating: 4.91,
    tags: ['Class 9', 'Geometry', 'Polynomials'],
    contentSnippet: `Circles Theorems:
1. Equal chords of a circle subtend equal angles at the center.
2. The perpendicular from the center of a circle to a chord bisects the chord.
3. The angle subtended by an arc at the center is double the angle subtended by it at any point on the remaining part of the circle. (Angle in a semicircle is a right angle).`
  }
];
