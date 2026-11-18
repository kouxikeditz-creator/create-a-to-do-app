export const initialCourses = [
  {
    id: 'course-jee-pinnacle',
    title: 'JEE Ultimate Rank Booster (Main + Advanced 2025/2026)',
    slug: 'jee-ultimate-rank-booster',
    category: 'JEE',
    targetExam: 'JEE Main & Advanced',
    classLevel: 'Class 12 & Droppers',
    badge: 'Flagship Batch',
    rating: 4.96,
    reviewsCount: 3840,
    studentsEnrolled: 14200,
    price: 4999,
    originalPrice: 16999,
    discountPercent: 70,
    language: 'Hinglish (Hindi + English)',
    duration: '10 Months (Daily 4h)',
    lecturesCount: 320,
    notesCount: 180,
    testsCount: 45,
    instructorId: 't1',
    instructorName: 'Dr. Rajesh Verma & Team IITians',
    instructorRole: 'HOD Physics & Ex-IIT Delhi',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive preparation for JEE Main and Advanced. Complete syllabus coverage of Physics, Chemistry, and Mathematics from fundamentals to Irodov & Krotov difficulty levels with daily live doubt sessions and NTA CBT test engine.',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    features: [
      'Live interactive classes + Instant recorded backup',
      'Daily Practice Problem (DPP) with video solutions',
      '45 NTA-Pattern All India Computer Based Mock Tests',
      'One-on-one personal mentorship & doubt clearing',
      'Hardcopy formula booklets shipped to home + PDF notes'
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Physics: Kinematics & Laws of Motion in 2D/3D',
        lectures: [
          { id: 'l1-1', title: '01. Vectors & Calculus Foundation for JEE', duration: '58 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l1-2', title: '02. Projectile Motion on Inclined Planes & Relative Velocity', duration: '64 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l1-3', title: '03. Newton’s Laws & Advanced Pulley-Wedge Systems', duration: '72 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l1-4', title: '04. Friction Dynamics & Circular Motion Turning', duration: '61 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      },
      {
        id: 'c2',
        title: 'Chemistry: Chemical Bonding & Molecular Orbital Theory',
        lectures: [
          { id: 'l2-1', title: '01. VSEPR Theory & Hybridization Shortcuts', duration: '52 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l2-2', title: '02. Molecular Orbital Diagrams for Homonuclear & Heteronuclear', duration: '68 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l2-3', title: '03. Dipole Moment, Resonance & Hydrogen Bonding in Real Life', duration: '55 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      },
      {
        id: 'c3',
        title: 'Mathematics: Differential Calculus & Functions Mastery',
        lectures: [
          { id: 'l3-1', title: '01. Functions: Domain, Range, Periodicity & Transformations', duration: '65 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l3-2', title: '02. Limits & L’Hopital Advanced Indeterminate Forms', duration: '70 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l3-3', title: '03. Continuity & Differentiability Graphical Inspection', duration: '59 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      }
    ]
  },
  {
    id: 'course-neet-achievers',
    title: 'NEET Target Medical Achievers 2025/2026 (700+ Mission)',
    slug: 'neet-target-medical-achievers',
    category: 'NEET',
    targetExam: 'NEET-UG',
    classLevel: 'Class 12 & Repeaters',
    badge: 'Bestseller',
    rating: 4.98,
    reviewsCount: 4610,
    studentsEnrolled: 18900,
    price: 4499,
    originalPrice: 15999,
    discountPercent: 72,
    language: 'Hinglish / English',
    duration: '11 Months',
    lecturesCount: 360,
    notesCount: 220,
    testsCount: 50,
    instructorId: 't2',
    instructorName: 'Dr. Ananya Mukherjee & AIIMS Faculty',
    instructorRole: 'MBBS, MD - AIIMS Gold Medalist',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    description: 'Designed exclusively for medical aspirants targeting top government medical colleges & AIIMS. 100% NCERT line-by-line coverage in Biology, concept-focused Physics, and high-scoring Chemistry drills.',
    subjects: ['Biology (Botany & Zoology)', 'Physics', 'Chemistry'],
    features: [
      'Line-by-line NCERT dissection with 5,000+ extracted questions',
      '3D human anatomy & botanical simulation videos',
      'Weekly 720-mark simulated NEET OMR/CBT mock tests',
      'Daily 8:00 PM doubt clinic with medical doctors',
      'High-yield biology mind maps & memory mnemonics'
    ],
    chapters: [
      {
        id: 'cn-1',
        title: 'Botany: Cell Cycle, Division & Plant Physiology',
        lectures: [
          { id: 'ln1-1', title: '01. Mitosis & Meiosis Stages: Visual Micrograph Analysis', duration: '54 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'ln1-2', title: '02. Photosynthesis in Higher Plants: Light Reactions & Z-Scheme', duration: '62 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'ln1-3', title: '03. Respiration in Plants: Glycolysis & Krebs Cycle Calculations', duration: '58 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      },
      {
        id: 'cn-2',
        title: 'Zoology: Human Physiology - Neural & Endocrine Control',
        lectures: [
          { id: 'ln2-1', title: '01. Action Potential Generation & Synaptic Transmission', duration: '60 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'ln2-2', title: '02. Hormonal Feedback Loops: Pituitary & Adrenal Axis', duration: '50 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      },
      {
        id: 'cn-3',
        title: 'Physics for NEET: Optics & Wave Mechanics Made Simple',
        lectures: [
          { id: 'ln3-1', title: '01. Ray Optics: Prisms, Lenses & Optical Instruments', duration: '66 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'ln3-2', title: '02. Wave Optics: Young Double Slit Experiment (YDSE) Shortcuts', duration: '59 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      }
    ]
  },
  {
    id: 'course-cuet-complete',
    title: 'CUET 2025 All-in-One Selection Masterbatch',
    slug: 'cuet-complete-selection',
    category: 'CUET',
    targetExam: 'CUET UG',
    classLevel: 'Class 12 Appearing / Passed',
    badge: 'Popular',
    rating: 4.88,
    reviewsCount: 1950,
    studentsEnrolled: 8400,
    price: 2999,
    originalPrice: 8999,
    discountPercent: 66,
    language: 'English & Hindi',
    duration: '5 Months',
    lecturesCount: 190,
    notesCount: 110,
    testsCount: 30,
    instructorId: 't5',
    instructorName: 'Prof. Vikramaditya & Domain Mentors',
    instructorRole: 'CUET Top Educator Panel',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    description: 'Target Delhi University (DU), BHU, JNU, and top central universities with 99+ percentile. Covers Section I (English/Hindi), Section II (Domain Subjects: PCM/PCB/Commerce/Humanities), and Section III (General Test).',
    subjects: ['Section I: English Comprehension', 'Section II: Domain Subjects', 'Section III: General Test (Quants, Reasoning, GK)'],
    features: [
      'Coverage of General Aptitude, Mental Ability & Current Affairs',
      'Domain subjects mapped exactly to Class 12 NCERT pattern',
      '30 Full length CUET Computer Based Tests with instant ranking',
      'Speed-building techniques for 45/50 question time crunch',
      'DU College & Course preference sheet counselling support'
    ],
    chapters: [
      {
        id: 'cc-1',
        title: 'Section III: Quantitative Aptitude & Fast Maths',
        lectures: [
          { id: 'lc1-1', title: '01. Speed Math Tricks & Percentage Shortcuts', duration: '45 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'lc1-2', title: '02. Time & Work, Pipes & Cisterns Quick Solutions', duration: '48 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      },
      {
        id: 'cc-2',
        title: 'Section I: English Vocabulary & Reading Comprehension',
        lectures: [
          { id: 'lc2-1', title: '01. High-Frequency CUET Words & Root Word Mnemonics', duration: '42 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'lc2-2', title: '02. Reading Comprehension Strategy: 5 Questions in 4 Minutes', duration: '50 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      }
    ]
  },
  {
    id: 'course-class-12-board',
    title: 'Class 12 CBSE & State Boards 95%+ Elite Masterclass',
    slug: 'class-12-board-elite',
    category: 'Class 12',
    targetExam: 'CBSE / State Boards Class 12',
    classLevel: 'Class 12',
    badge: 'High Scoring',
    rating: 4.93,
    reviewsCount: 2210,
    studentsEnrolled: 11200,
    price: 3499,
    originalPrice: 11999,
    discountPercent: 71,
    language: 'Hinglish',
    duration: '9 Months',
    lecturesCount: 240,
    notesCount: 150,
    testsCount: 35,
    instructorId: 't4',
    instructorName: 'Dr. Meenakshi Sundaram & Board Evaluators',
    instructorRole: 'Ph.D. IISc & Senior Board Examiner',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    description: 'Master the art of scoring 95%+ in Class 12 Board examinations. Includes answer-writing presentation sessions, step marking guidelines, derivation compilations, and NCERT exemplars.',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    features: [
      'Step-by-step subjective answer writing masterclasses',
      'Compendium of 150 Most Important Board Derivations',
      'Previous 10 Years Solved Board Papers with marking scheme',
      'Pre-board mock tests checked by certified board examiners',
      'Formula sheets & mind maps for 1-day before exam revision'
    ],
    chapters: [
      {
        id: 'c12-1',
        title: 'Physics: Electrostatics & Current Electricity Derivations',
        lectures: [
          { id: 'l12-1', title: '01. Gauss Law Applications & 5-Mark Proofs', duration: '52 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l12-2', title: '02. Kirchhoff’s Rules & Wheatstone Bridge Problem Solving', duration: '56 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      },
      {
        id: 'c12-2',
        title: 'Chemistry: Solutions, Electrochemistry & Chemical Kinetics',
        lectures: [
          { id: 'l12-3', title: '01. Colligative Properties & Van’t Hoff Factor Calculations', duration: '50 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l12-4', title: '02. Nernst Equation & Electrochemical Cells', duration: '54 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      }
    ]
  },
  {
    id: 'course-class-11-foundation',
    title: 'Class 11 Science (PCM / PCB) Bridge & Base Builder',
    slug: 'class-11-foundation',
    category: 'Class 11',
    targetExam: 'Class 11 School Exam + JEE/NEET Base',
    classLevel: 'Class 11',
    badge: 'Essential',
    rating: 4.91,
    reviewsCount: 1670,
    studentsEnrolled: 9800,
    price: 3299,
    originalPrice: 10999,
    discountPercent: 70,
    language: 'Hinglish',
    duration: '10 Months',
    lecturesCount: 220,
    notesCount: 130,
    testsCount: 28,
    instructorId: 't3',
    instructorName: 'Prof. Vikramaditya & Dr. Rajesh Verma',
    instructorRole: 'IIT Delhi & IIT Kanpur Alums',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    description: 'Class 11 accounts for 55% of questions in JEE and NEET. Bridge the gap between Class 10 and 11 without getting overwhelmed. Build crystal clear concepts in Trigonometry, Mechanics, Atomic Structure, and Organic basics.',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    features: [
      'Zero to Advanced conceptual progression',
      'Overcomes Class 10 to 11 syllabus jump shock',
      'Rigorous problem-solving practice and homework discussions',
      'School final exam revision modules included',
      'Foundational preparation for Olympiads (NSEP, NSEC, KVPY)'
    ],
    chapters: [
      {
        id: 'c11-1',
        title: 'Physics: Units, Dimensions, Vectors & Kinematics',
        lectures: [
          { id: 'l11-1', title: '01. Dimensional Analysis & Order of Magnitude', duration: '48 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l11-2', title: '02. Vector Addition, Dot & Cross Product', duration: '55 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      }
    ]
  },
  {
    id: 'course-class-10-topper',
    title: 'Class 10 Board Topper Batch + NTSE / Olympiad Foundation',
    slug: 'class-10-board-topper',
    category: 'Class 10',
    targetExam: 'CBSE Class 10 Board & NTSE',
    classLevel: 'Class 10',
    badge: 'Top Rated',
    rating: 4.95,
    reviewsCount: 3100,
    studentsEnrolled: 15400,
    price: 2499,
    originalPrice: 7999,
    discountPercent: 69,
    language: 'English & Hinglish',
    duration: '8 Months',
    lecturesCount: 180,
    notesCount: 95,
    testsCount: 25,
    instructorId: 't6',
    instructorName: 'Priya Sen & Foundation Experts',
    instructorRole: 'National Science Educator Awardee',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    description: 'Ensure a 98%+ score in Class 10 CBSE Board Exams while setting the strongest possible stepping stone for Class 11-12 JEE/NEET. Includes complete Science, Math, Social Science, and English.',
    subjects: ['Science (Physics, Chemistry, Biology)', 'Mathematics (Standard & Basic)', 'Social Science', 'English'],
    features: [
      'Assertion-Reason and Case-Based Question drills',
      'Complete coverage of RD Sharma & NCERT Exemplar questions',
      '10 Full syllabus Board Mock Tests with detailed analysis',
      'Early introduction to JEE/NEET level reasoning',
      'Mental Ability & Logical Reasoning for NTSE & Olympiads'
    ],
    chapters: [
      {
        id: 'c10-1',
        title: 'Science: Chemical Reactions, Acids, Bases & Salts',
        lectures: [
          { id: 'l10-1', title: '01. Balancing Chemical Equations & Types of Reactions', duration: '46 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l10-2', title: '02. pH Scale, Universal Indicators & Salt Chemistry', duration: '50 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      },
      {
        id: 'c10-2',
        title: 'Math: Real Numbers, Polynomials & Quadratic Equations',
        lectures: [
          { id: 'l10-3', title: '01. Fundamental Theorem of Arithmetic & Proof of Irrationality', duration: '44 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l10-4', title: '02. Quadratic Equations: Factorization & Discriminant Mastery', duration: '52 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      }
    ]
  },
  {
    id: 'course-class-9-ignite',
    title: 'Class 9 Ignite: Complete Science & Math Foundation',
    slug: 'class-9-ignite',
    category: 'Class 9',
    targetExam: 'Class 9 School Exams & Olympiads',
    classLevel: 'Class 9',
    badge: 'Foundation',
    rating: 4.90,
    reviewsCount: 1420,
    studentsEnrolled: 7200,
    price: 1999,
    originalPrice: 6999,
    discountPercent: 71,
    language: 'English & Hinglish',
    duration: '8 Months',
    lecturesCount: 150,
    notesCount: 80,
    testsCount: 20,
    instructorId: 't6',
    instructorName: 'Priya Sen & Foundation Experts',
    instructorRole: 'Head of Foundation',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    description: 'Transform fundamental science and math concepts into lifelong cognitive skills. Class 9 syllabus directly maps to Class 11 fundamentals. Master Motion, Gravitation, Atomic Structure, and Geometry.',
    subjects: ['Science (Physics, Chem, Bio)', 'Mathematics', 'English & Mental Ability'],
    features: [
      'Interactive animations for abstract physics and chemistry concepts',
      'Step-by-step geometry proofs and algebraic shortcuts',
      'Weekly quizzes and chapter milestone tests',
      'Handwritten printable revision charts for each chapter'
    ],
    chapters: [
      {
        id: 'c9-1',
        title: 'Science: Motion, Force & Laws of Motion',
        lectures: [
          { id: 'l9-1', title: '01. Distance, Displacement & Speed vs Velocity Graphs', duration: '40 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'l9-2', title: '02. Equations of Motion Derivations by Graphical Method', duration: '45 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      }
    ]
  },
  {
    id: 'course-cs-python',
    title: 'Computer Science (Class 11 & 12) + Python & SQL Masterclass',
    slug: 'cs-python-sql-masterclass',
    category: 'Class 12',
    targetExam: 'CBSE Class 11-12 CS & CUET Informatics',
    classLevel: 'Class 11 & 12',
    badge: '100/100 Special',
    rating: 4.97,
    reviewsCount: 1140,
    studentsEnrolled: 6300,
    price: 1999,
    originalPrice: 5999,
    discountPercent: 67,
    language: 'English & Hinglish',
    duration: '6 Months',
    lecturesCount: 120,
    notesCount: 60,
    testsCount: 15,
    instructorId: 't5',
    instructorName: 'Er. Kunal Singhania',
    instructorRole: 'B.Tech CSE IIT Bombay',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description: 'Score full 100/100 in CBSE Class 12 Computer Science (083). Master Python programming from basics to file handling (Text, CSV, Binary), MySQL database queries, Python-MySQL connectivity, and Computer Networks.',
    subjects: ['Python Programming', 'MySQL Database', 'Computer Networks', 'Cyber Ethics'],
    features: [
      'Live code execution and hands-on lab sessions',
      'Solved sample practical questions & project viva guidance',
      'Ready-to-submit CBSE practical project source code',
      'Previous 8 years board paper code traces decoded'
    ],
    chapters: [
      {
        id: 'cs-1',
        title: 'Python: File Handling & Exception Handling',
        lectures: [
          { id: 'lcs-1', title: '01. Text Files: read(), readline(), readlines() & Word Counts', duration: '50 min', isFree: true, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' },
          { id: 'lcs-2', title: '02. Binary Files with Pickle Module & CSV Handling', duration: '54 min', isFree: false, videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ' }
        ]
      }
    ]
  }
];
