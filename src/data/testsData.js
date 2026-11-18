export const initialTests = [
  {
    id: 'test-jee-main-full-1',
    title: 'All India JEE Main 2025 Full Length Mock Test - 01',
    category: 'JEE',
    targetExam: 'JEE Main',
    durationMinutes: 30, // Convenient interactive time (real tests can be 180 min, demo 30 min with warning)
    totalQuestions: 15,
    totalMarks: 60,
    positiveMarks: 4,
    negativeMarks: 1,
    difficulty: 'Medium to Hard (NTA Pattern)',
    attemptsCount: 12450,
    averageScore: 34.2,
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    questions: [
      {
        id: 'q1',
        subject: 'Physics',
        text: 'A block of mass m is placed on a smooth wedge of inclination θ. The whole system is accelerated horizontally so that the block does not slip on the wedge. What is the acceleration of the wedge?',
        options: [
          'g * sin(θ)',
          'g * tan(θ)',
          'g / tan(θ)',
          'g * cos(θ)'
        ],
        correctOption: 1,
        explanation: 'In the non-inertial frame of the wedge, the pseudo force on the block is ma acting horizontally. For equilibrium along the inclined plane: mg * sin(θ) = ma * cos(θ) => a = g * tan(θ).'
      },
      {
        id: 'q2',
        subject: 'Physics',
        text: 'The de-Broglie wavelength of an electron accelerated through a potential difference of V volts is approximately given by:',
        options: [
          'λ = 12.27 / √V Å',
          'λ = 1.227 / √V nm',
          'λ = 0.286 / √V Å',
          'Both A and B are equivalent'
        ],
        correctOption: 3,
        explanation: 'λ = h / √(2m * e * V) = 1.227 / √V nm = 12.27 / √V Å. Hence both A and B represent the exact same value in different units.'
      },
      {
        id: 'q3',
        subject: 'Physics',
        text: 'Two concentric conducting spherical shells of radii R and 2R carry charges Q and 2Q respectively. The potential at the surface of inner sphere is:',
        options: [
          'k * (2Q / R)',
          'k * (Q / R + 2Q / 2R) = 2kQ / R',
          'k * (3Q / 2R)',
          'k * (Q / 2R)'
        ],
        correctOption: 1,
        explanation: 'Potential on inner shell V = V_inner + V_outer = k*Q/R + k*(2Q)/(2R) = k*Q/R + k*Q/R = 2kQ/R.'
      },
      {
        id: 'q4',
        subject: 'Physics',
        text: 'In a Young\'s Double Slit Experiment, if the distance between the slits is halved and distance between slits and screen is doubled, the fringe width will:',
        options: [
          'Remain unchanged',
          'Double',
          'Become four times',
          'Become half'
        ],
        correctOption: 2,
        explanation: 'Fringe width β = λ * D / d. If D becomes 2D and d becomes d/2, then β\' = λ * (2D) / (d/2) = 4 * (λD/d) = 4β.'
      },
      {
        id: 'q5',
        subject: 'Physics',
        text: 'An ideal heat engine works between temperatures 327°C and 27°C. Its Carnot efficiency is:',
        options: [
          '50%',
          '91.7%',
          '33.3%',
          '25%'
        ],
        correctOption: 0,
        explanation: 'T_hot = 327 + 273 = 600 K, T_cold = 27 + 273 = 300 K. Efficiency η = 1 - (T_cold / T_hot) = 1 - (300 / 600) = 50%.'
      },
      {
        id: 'q6',
        subject: 'Chemistry',
        text: 'Which of the following molecules has zero dipole moment despite having polar bonds?',
        options: [
          'NH3 (Ammonia)',
          'NF3 (Nitrogen trifluoride)',
          'BF3 (Boron trifluoride)',
          'SO2 (Sulfur dioxide)'
        ],
        correctOption: 2,
        explanation: 'BF3 has trigonal planar geometry (sp2 hybridized, 120° bond angle). The vector sum of three equal B-F dipole moments is zero.'
      },
      {
        id: 'q7',
        subject: 'Chemistry',
        text: 'Which of the following compounds will undergo SN1 reaction fastest?',
        options: [
          'CH3-Cl',
          '(CH3)2CH-Cl',
          '(CH3)3C-Cl (tert-butyl chloride)',
          'CH3-CH2-Cl'
        ],
        correctOption: 2,
        explanation: 'SN1 reaction rate is directly determined by the stability of the intermediate carbocation. The tertiary carbocation (CH3)3C+ is stabilized by 9 hyperconjugative structures.'
      },
      {
        id: 'q8',
        subject: 'Chemistry',
        text: 'For a first-order chemical reaction, if 75% of the reaction completes in 32 minutes, what is its half-life (t_1/2)?',
        options: [
          '16 minutes',
          '8 minutes',
          '24 minutes',
          '12 minutes'
        ],
        correctOption: 0,
        explanation: 'For a first-order reaction, remaining fraction after 2 half-lives is (1/2)^2 = 1/4 = 25%, meaning 75% completed. Therefore, 2 * t_1/2 = 32 minutes => t_1/2 = 16 minutes.'
      },
      {
        id: 'q9',
        subject: 'Chemistry',
        text: 'The correct order of magnetic moments (spin-only) among [Fe(CN)6]4-, [Fe(H2O)6]2+, and [Cr(H2O)6]3+ is:',
        options: [
          '[Fe(CN)6]4- < [Cr(H2O)6]3+ < [Fe(H2O)6]2+',
          '[Fe(H2O)6]2+ < [Cr(H2O)6]3+ < [Fe(CN)6]4-',
          '[Cr(H2O)6]3+ < [Fe(CN)6]4- < [Fe(H2O)6]2+',
          'All have same magnetic moment'
        ],
        correctOption: 0,
        explanation: '[Fe(CN)6]4- has low spin d6 (0 unpaired electrons, μ=0 BM). [Cr(H2O)6]3+ has d3 (3 unpaired electrons, μ=3.87 BM). [Fe(H2O)6]2+ has high spin d6 (4 unpaired electrons, μ=4.9 BM).'
      },
      {
        id: 'q10',
        subject: 'Chemistry',
        text: 'The oxidation state of Chromium in CrO5 (Chromium peroxide) is:',
        options: [
          '+10',
          '+6',
          '+8',
          '+4'
        ],
        correctOption: 1,
        explanation: 'CrO5 has a butterfly structure with one oxo oxygen (O2-) and two peroxo bonds (each -1). Let Cr be x: x + (-2) + 4(-1) = 0 => x - 6 = 0 => x = +6.'
      },
      {
        id: 'q11',
        subject: 'Mathematics',
        text: 'The value of the limit lim_{x -> 0} (sin(5x) - 5x) / x^3 is:',
        options: [
          '-125 / 6',
          '125 / 6',
          '0',
          '-25 / 6'
        ],
        correctOption: 0,
        explanation: 'Using Taylor expansion: sin(5x) = 5x - (5x)^3 / 3! + ... = 5x - 125x^3 / 6. Therefore, (sin 5x - 5x)/x^3 = -125/6.'
      },
      {
        id: 'q12',
        subject: 'Mathematics',
        text: 'If A is a 3x3 invertible square matrix such that det(A) = 4, then det(2 * adj(A)) is equal to:',
        options: [
          '32',
          '64',
          '128',
          '256'
        ],
        correctOption: 2,
        explanation: 'For a matrix of order n=3: det(k * M) = k^n * det(M). Here det(2 * adj(A)) = 2^3 * det(adj(A)) = 8 * [det(A)]^(3-1) = 8 * 4^2 = 8 * 16 = 128.'
      },
      {
        id: 'q13',
        subject: 'Mathematics',
        text: 'The area bounded by the parabola y^2 = 4ax and its latus rectum x = a is:',
        options: [
          '(8/3) * a^2',
          '(4/3) * a^2',
          '(16/3) * a^2',
          '2 * a^2'
        ],
        correctOption: 0,
        explanation: 'Area = 2 * int_0^a 2 * √(a) * x^(1/2) dx = 4√(a) * [2/3 * x^(3/2)]_0^a = (8/3) * a^2.'
      },
      {
        id: 'q14',
        subject: 'Mathematics',
        text: 'If vectors a and b are unit vectors and θ is the angle between them, then |a - b| is equal to:',
        options: [
          '2 * sin(θ/2)',
          '2 * cos(θ/2)',
          'sin(θ)',
          'cos(θ)'
        ],
        correctOption: 0,
        explanation: '|a - b|^2 = |a|^2 + |b|^2 - 2(a.b) = 1 + 1 - 2*cos θ = 2(1 - cos θ) = 2 * (2 * sin^2(θ/2)) = 4 sin^2(θ/2). Taking square root gives 2 * sin(θ/2).'
      },
      {
        id: 'q15',
        subject: 'Mathematics',
        text: 'The probability of getting a sum of 9 or 11 when a pair of fair dice is rolled once is:',
        options: [
          '1 / 6',
          '5 / 36',
          '7 / 36',
          '1 / 9'
        ],
        correctOption: 0,
        explanation: 'Sum 9 pairs: (3,6), (4,5), (5,4), (6,3) = 4 pairs. Sum 11 pairs: (5,6), (6,5) = 2 pairs. Total favorable = 4 + 2 = 6. Probability = 6/36 = 1/6.'
      }
    ]
  },
  {
    id: 'test-neet-biology-grand',
    title: 'NEET 2025 All-India Grand Biology Speed Drill',
    category: 'NEET',
    targetExam: 'NEET-UG',
    durationMinutes: 20,
    totalQuestions: 10,
    totalMarks: 40,
    positiveMarks: 4,
    negativeMarks: 1,
    difficulty: 'NCERT High-Yield',
    attemptsCount: 19800,
    averageScore: 28.6,
    subjects: ['Botany', 'Zoology'],
    questions: [
      {
        id: 'qn-1',
        subject: 'Botany',
        text: 'Which of the following cell organelles is responsible for extracting energy from carbohydrates to form ATP?',
        options: ['Ribosome', 'Chloroplast', 'Mitochondria', 'Lysosome'],
        correctOption: 2,
        explanation: 'Mitochondria are the powerhouses of eukaryotic cells where oxidative phosphorylation and citric acid cycle produce cellular ATP.'
      },
      {
        id: 'qn-2',
        subject: 'Botany',
        text: 'In C4 plants, the primary CO2 acceptor and the first stable product are respectively:',
        options: [
          'RuBP and 3-PGA',
          'PEP (Phosphoenolpyruvate) and OAA (Oxaloacetic acid)',
          'RuBP and OAA',
          'Pyruvate and Malic acid'
        ],
        correctOption: 1,
        explanation: 'In C4 mesophyll cells, atmospheric CO2 is accepted by PEP (3C) catalyzed by PEP carboxylase to form OAA (4C).'
      },
      {
        id: 'qn-3',
        subject: 'Zoology',
        text: 'Which antibody is most abundant in human colostrum and provides passive immunity to neonates?',
        options: ['IgG', 'IgA', 'IgM', 'IgE'],
        correctOption: 1,
        explanation: 'IgA (secretory immunoglobulin) is present in secretions such as colostrum, saliva, and tears to protect mucosal surfaces.'
      },
      {
        id: 'qn-4',
        subject: 'Zoology',
        text: 'The cardiac cycle duration in a normal resting human with 75 beats per minute is:',
        options: ['0.8 seconds', '0.5 seconds', '1.0 seconds', '0.1 seconds'],
        correctOption: 0,
        explanation: 'Cardiac cycle = 60 seconds / heart rate = 60 / 75 = 0.8 seconds (0.1s auricular systole + 0.3s ventricular systole + 0.4s joint diastole).'
      },
      {
        id: 'qn-5',
        subject: 'Botany',
        text: 'Water potential of pure water at standard temperature and atmospheric pressure is taken as:',
        options: ['100 kPa', 'Zero', 'Negative', 'Infinite'],
        correctOption: 1,
        explanation: 'By convention, the water potential (Ψw) of pure water at standard atmospheric pressure and 25°C is zero.'
      }
    ]
  },
  {
    id: 'test-cuet-aptitude',
    title: 'CUET General Test Quantitative & Logical Speed Test',
    category: 'CUET',
    targetExam: 'CUET UG',
    durationMinutes: 15,
    totalQuestions: 8,
    totalMarks: 40,
    positiveMarks: 5,
    negativeMarks: 1,
    difficulty: 'Speed & Logic',
    attemptsCount: 8900,
    averageScore: 26.5,
    subjects: ['Quantitative Aptitude', 'Logical Reasoning'],
    questions: [
      {
        id: 'qc-1',
        subject: 'Quantitative Aptitude',
        text: 'A train 180 meters long is traveling at a uniform speed of 54 km/h. How many seconds will it take to cross an electric pole?',
        options: ['10 seconds', '12 seconds', '15 seconds', '18 seconds'],
        correctOption: 1,
        explanation: 'Speed in m/s = 54 * (5/18) = 15 m/s. Time to cross pole = Distance / Speed = 180 / 15 = 12 seconds.'
      },
      {
        id: 'qc-2',
        subject: 'Logical Reasoning',
        text: 'Look at the series: 7, 10, 8, 11, 9, 12, ... What number should come next?',
        options: ['7', '10', '12', '13'],
        correctOption: 1,
        explanation: 'Alternate pattern: 7 (+1)= 8 (+1)= 9 (+1)= 10. And 10 (+1)= 11 (+1)= 12 (+1)= 13. The next number after 12 is 10.'
      }
    ]
  }
];

export const leaderboardData = [
  { rank: 1, name: 'Aarav Sharma', score: '56/60', percentile: '99.98%', exam: 'JEE Main Mock', city: 'Kota, Rajasthan', badge: 'National Rank 1' },
  { rank: 2, name: 'Siddhi Agrawal', score: '55/60', percentile: '99.94%', exam: 'JEE Main Mock', city: 'Indore, MP', badge: 'Top 5 AIR' },
  { rank: 3, name: 'Devansh Tiwari', score: '54/60', percentile: '99.89%', exam: 'JEE Main Mock', city: 'Lucknow, UP', badge: 'Top 5 AIR' },
  { rank: 4, name: 'Meera Iyer', score: '52/60', percentile: '99.78%', exam: 'JEE Main Mock', city: 'Bengaluru, Karnataka', badge: 'Top 10 AIR' },
  { rank: 5, name: 'Kavya Singhal', score: '51/60', percentile: '99.65%', exam: 'JEE Main Mock', city: 'Delhi NCR', badge: 'Top 10 AIR' },
  { rank: 6, name: 'Rohan Deshmukh', score: '49/60', percentile: '99.42%', exam: 'JEE Main Mock', city: 'Pune, Maharashtra', badge: 'Top 25 AIR' }
];
