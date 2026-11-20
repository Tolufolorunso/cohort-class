import { ModuleSlide } from '../../types/presentation';

export const module1Slides: ModuleSlide[] = [
  // Slide 1: Welcome & Overview
  {
    id: 1,
    part: 'LESSON 1: WELCOME & OVERVIEW',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'Welcome to Computer Class: The Electronic Helper',
    subtitle: 'From zero fear to understanding how computers obey your commands!',
    bullets: [
      {
        icon: '💻',
        title: '1. What a Computer Is',
        desc: 'An electronic machine that follows your instructions to do work fast and accurately.',
      },
      {
        icon: '⚡',
        title: '2. The IPOS Cycle',
        desc: 'Input ➔ Process ➔ Output ➔ Storage. How every computer on Earth turns data into answers.',
      },
      {
        icon: '🌍',
        title: '3. Devices & Real Life',
        desc: 'From desktop monitors to the smartphone in your pocket, and how banks and hospitals use them.',
      },
    ],
    analogy: 'Golden Rule: You cannot break the computer by clicking! It is built to obey commands.',
    teacherNotes: {
      promptQuestion: 'Ask the class: Who has ever been afraid of clicking the wrong button on a computer?',
      talkingPoint: 'Reassure students immediately: Computers are patient machines. Any mistake can be undone with Backspace or Ctrl+Z.',
      watchOutFor: 'Students who look nervous or hesitant to touch the keyboard or mouse.',
    },
  },

  // Slide 2: What is a Computer & Data vs Info
  {
    id: 2,
    part: 'LESSON 1: CORE DEFINITION',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'What is a Computer? (Data vs. Information)',
    subtitle: 'Learn the difference between raw ingredients and the finished meal.',
    bullets: [
      {
        icon: '📥',
        title: '1. Receives Raw Data',
        desc: 'You feed it raw letters, numbers, clicks, or voice notes (like fresh cassava tubers).',
      },
      {
        icon: '⚙️',
        title: '2. Processes It Rapidly',
        desc: 'The internal CPU follows instructions at lightning speed to calculate and sort (like grinding cassava).',
      },
      {
        icon: '📤',
        title: '3. Shows Information',
        desc: 'Displays neat, meaningful answers on your screen (like ready-to-eat white garri flour).',
      },
      {
        icon: '💾',
        title: '4. Stores for Tomorrow',
        desc: 'Saves your documents in permanent storage so light power cuts never delete your work.',
      },
    ],
    analogy: 'Nigerian Kitchen Analogy: Raw cassava is DATA. The grinding engine is the PROCESSOR. White garri flour is INFORMATION!',
    teacherNotes: {
      promptQuestion: 'Ask: If I write "25, 10, +" on the board, is that Data or Information?',
      talkingPoint: 'It is raw Data because you have not calculated it yet. Once the computer adds them to get "35", that is Information.',
      watchOutFor: 'Students confusing the TV monitor with the computer itself. The computer is the processor inside.',
    },
  },

  // Slide 3: 5 Computer Superpowers
  {
    id: 3,
    part: 'LESSON 1: CAPABILITIES',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'The 5 Superpowers of a Computer',
    subtitle: 'Why human beings built computers to handle difficult calculations.',
    bullets: [
      {
        icon: '⚡',
        title: '1. Blazing Speed',
        desc: 'Can calculate billions of math equations in less than one second without slowing down.',
      },
      {
        icon: '🎯',
        title: '2. 100% Accuracy',
        desc: 'Never makes a calculation mistake. If you give it the correct formula, it gives the exact answer.',
      },
      {
        icon: '🧠',
        title: '3. Huge Memory',
        desc: 'Can remember millions of books, photos, and student exam grades without forgetting.',
      },
      {
        icon: '🛡️',
        title: '4. Never Gets Tired (Diligence)',
        desc: 'Works for 24 hours non-stop without needing food, sleep, or complaining of headache.',
      },
    ],
    analogy: 'A human calculator gets tired after 20 math problems. A computer solves 1,000,000 problems before you blink!',
    teacherNotes: {
      promptQuestion: 'Ask: Can a computer make a mistake on its own if nobody gives it wrong instructions?',
      talkingPoint: 'No! The famous rule is GIGO: Garbage In, Garbage Out. If human input is correct, the computer is always correct.',
      watchOutFor: 'Students thinking the computer has human feelings or makes random calculation errors.',
    },
  },

  // Slide 4: The IPOS Cycle
  {
    id: 4,
    part: 'LESSON 2: THE SACRED CYCLE',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'The IPOS Cycle: How Every Computer Thinks',
    subtitle: 'Every computer from your phone to a bank ATM follows these 4 simple steps.',
    bullets: [
      {
        icon: '1️⃣',
        title: 'I - INPUT (Feed It)',
        desc: 'You enter data through the keyboard, mouse, touchscreen, microphone, or camera.',
      },
      {
        icon: '2️⃣',
        title: 'P - PROCESS (Think It)',
        desc: 'The CPU (Central Processing Unit) calculates, compares, and organizes the data.',
      },
      {
        icon: '3️⃣',
        title: 'O - OUTPUT (Show It)',
        desc: 'The screen displays results, the printer prints paper, or speakers play sound.',
      },
      {
        icon: '4️⃣',
        title: 'S - STORAGE (Keep It)',
        desc: 'The hard drive or SSD saves the file permanently so you can open it next term.',
      },
    ],
    analogy: 'Bank ATM Analogy: Insert card & enter PIN (Input) ➔ Bank verifies balance (Process) ➔ Cash dispenses (Output) ➔ Balance saved (Storage).',
    teacherNotes: {
      promptQuestion: 'Ask: When you take a selfie on your phone, what is the Input and what is the Output?',
      talkingPoint: 'The camera lens is Input (capturing light); the screen showing your photo is Output!',
      watchOutFor: 'Students skipping the Storage step. Emphasize that without storage, work is lost when power goes off.',
    },
  },

  // Slide 5: Interactive IPOS Simulator
  {
    id: 5,
    part: 'LESSON 2: HANDS-ON LAB',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'Practice Lab: The Live IPOS Flow Simulator',
    subtitle: 'Watch raw numbers flow into the CPU, get calculated, and display on screen!',
    bullets: [],
    interactiveType: 'ipos',
    teacherNotes: {
      promptQuestion: 'Have students click each step: Input ➔ Process ➔ Output ➔ Storage.',
      talkingPoint: 'Point out the animated flow dots representing electronic signals moving through motherboard wires.',
      watchOutFor: 'Students who rush through without reading the action descriptions.',
    },
  },

  // Slide 6: History & Generations
  {
    id: 6,
    part: 'LESSON 3: HISTORY & GENERATIONS',
    badgeColor: 'bg-purple-950/80 text-purple-400 border-purple-800/60',
    title: 'From the Ancient Abacus to Modern AI',
    subtitle: 'How counting beads turned into microchips small enough to wear on your wrist.',
    bullets: [
      {
        icon: '🧮',
        title: '1. Ancient Roots (Abacus)',
        desc: 'Wooden frame with counting beads used over 2,000 years ago for market trade.',
      },
      {
        icon: '⚙️',
        title: '2. The Fathers & Mothers of Computing',
        desc: 'Charles Babbage designed the Analytical Engine; Ada Lovelace wrote the first program.',
      },
      {
        icon: '💡',
        title: '3. 1st & 2nd Generations (Tubes to Transistors)',
        desc: 'First computers were room-sized and ran hot; transistors made them smaller and reliable.',
      },
      {
        icon: '🔬',
        title: '4. Microprocessors to AI (Modern Era)',
        desc: 'Billions of microscopic transistors on a silicon fingernail chip power laptops and AI today.',
      },
    ],
    analogy: 'The first electronic computer (ENIAC) weighed 30 tonnes and filled a classroom. Your smartphone is 10,000 times faster!',
    teacherNotes: {
      promptQuestion: 'Ask: Who is regarded as the Father of Computers, and who was the first computer programmer?',
      talkingPoint: 'Charles Babbage designed the concept; Ada Lovelace realized it could do more than pure math.',
      watchOutFor: 'Students confusing the mechanical Babbage engine with modern electronic computers.',
    },
  },

  // Slide 7: Types of Computers
  {
    id: 7,
    part: 'LESSON 3: CLASSIFICATION',
    badgeColor: 'bg-purple-950/80 text-purple-400 border-purple-800/60',
    title: 'Types of Computers: Size & Mobility',
    subtitle: 'Not all computers sit on tables—learn the 4 primary forms.',
    bullets: [
      {
        icon: '🖥️',
        title: '1. Desktop Computers',
        desc: 'Stays permanently on your desk in the lab or office. Very powerful and easy to upgrade.',
      },
      {
        icon: '💻',
        title: '2. Laptop Computers',
        desc: 'Portable all-in-one machine with built-in screen, keyboard, and battery for travel.',
      },
      {
        icon: '📱',
        title: '3. Tablets & Smartphones',
        desc: 'Pocket microcomputers with touchscreens used for communication, photos, and apps.',
      },
      {
        icon: '🏢',
        title: '4. Supercomputers & Servers',
        desc: 'Giant computational clusters that predict Nigerian weather forecasts and manage bank networks.',
      },
    ],
    analogy: 'A Desktop is like a big home refrigerator; a Laptop is like a portable cooler box; a Smartphone is like a pocket water flask!',
    teacherNotes: {
      promptQuestion: 'Ask: Is an Android smartphone a true computer according to the IPOS definition?',
      talkingPoint: 'Yes! It has a touchscreen input, a CPU processor, a screen output, and flash storage.',
      watchOutFor: 'Students thinking supercomputers are just large desktop screens.',
    },
  },

  // Slide 8: Interactive Device Sorter
  {
    id: 8,
    part: 'LESSON 3: HANDS-ON LAB',
    badgeColor: 'bg-purple-950/80 text-purple-400 border-purple-800/60',
    title: 'Practice Lab: The Device Sorting Gym',
    subtitle: 'Drag and sort each device into its correct category!',
    bullets: [],
    interactiveType: 'device-sorting',
    teacherNotes: {
      promptQuestion: 'Challenge pairs: Partner A sorts the portable devices, Partner B sorts the stationary ones!',
      talkingPoint: 'Emphasize that capability, battery, and size determine device category.',
      watchOutFor: 'Students confusing tablets with laptops due to external keyboard covers.',
    },
  },

  // Slide 9: Real-World Applications & Lab Rules
  {
    id: 9,
    part: 'LESSON 4: REAL LIFE & LAB SAFETY',
    badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    title: 'Real-World Uses & Computer Lab Rules',
    subtitle: 'Where computers change society and how to protect our school lab.',
    bullets: [
      {
        icon: '🏥',
        title: '1. Hospitals & Healthcare',
        desc: 'X-ray scans, patient medicine records, and heart monitors that keep people alive.',
      },
      {
        icon: '🏦',
        title: '2. Banking & Commerce',
        desc: 'Bank transfers, ATM cash, online shopping, and market inventory accounting.',
      },
      {
        icon: '🚫',
        title: '3. Golden Rule: No Liquids or Food',
        desc: 'Never bring water, soft drinks, or snacks near laptops. Spills cause permanent short-circuits!',
      },
      {
        icon: '🪑',
        title: '4. Golden Rule: Sit Upright',
        desc: 'Keep your back straight, screen at eye level, and don’t yank computer cables or power cords.',
      },
    ],
    analogy: 'A droplet of water inside a laptop keyboard can kill the motherboard instantly. Treat lab laptops like fine glassware!',
    teacherNotes: {
      promptQuestion: 'Ask: Why do banks and hospitals never use manual paper record books anymore?',
      talkingPoint: 'Paper rots, burns, and takes hours to search; computer records are found in 1 second and backed up safely.',
      watchOutFor: 'Students bringing open water bottles near lab laptop tables.',
    },
  },

  // Slide 10: Module Complete & Quiz
  {
    id: 10,
    part: 'MODULE 1 REVIEW & CELEBRATION',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'Module 1 Complete: You Are Computer Literate!',
    subtitle: 'You understand what a computer is, the IPOS cycle, and lab etiquette.',
    bullets: [],
    interactiveType: 'quiz-launcher',
    teacherNotes: {
      promptQuestion: 'Ask 3 verbal check questions: What is IPOS? What is hardware? Who is Ada Lovelace?',
      talkingPoint: 'Praise the class for completing Module 1! Launch the Quiz Arena for friendly competition.',
      watchOutFor: 'Students who missed key definitions; invite them to check the Notebook Summary.',
    },
  },
];
