import {
  ModuleData,
  LessonUnit,
  ImageCard,
  KahootQuestion,
  ComputerCharacteristic,
  ComparisonRow,
  IPOSStepInfo,
  IPOSAnalogy,
  TimelineEvent,
  DeviceCategoryDefinition,
  DeviceItem,
  ApplicationSector,
  QuizQuestion,
} from '../types/curriculum';
import { ModuleNotes, ModuleAssignment } from '../types/platform';

export const module1Info: ModuleData = {
  id: 'module-1',
  moduleNumber: 1,
  phaseName: 'Phase 1: Basic (Foundational Literacy)',
  title: 'Introduction to Computers',
  duration: '4 Lessons (~40 mins each, 2+ Hours Total)',
  objective:
    'Demystify the computer, understand the Input-Processing-Output-Storage (IPOS) data cycle, trace the historical evolution of computing from the abacus to AI, classify modern computing devices, and explore real-world applications and lab etiquette.',
  stages: [
    {
      id: 'what-is-a-computer',
      title: '1. What is a Computer?',
      subtitle: 'Definition, Data vs. Information & 5 Superpowers',
      type: 'definition',
    },
    {
      id: 'ipos-cycle',
      title: '2. The IPOS Cycle Simulator',
      subtitle: 'Input, Processing, Output & Storage with Cooking & ATM Analogies',
      type: 'ipos',
    },
    {
      id: 'history-timeline',
      title: '3. Evolution of Computing',
      subtitle: 'From the Ancient Abacus to Babbage, Lovelace & 5 Generations',
      type: 'timeline',
    },
    {
      id: 'device-sorting',
      title: '4. Device Classification Lab',
      subtitle: 'Interactive Sorting: Desktops, Laptops, Mobile & Supercomputers',
      type: 'sorting',
    },
    {
      id: 'applications',
      title: '5. Where Computers Are Used',
      subtitle: 'Impact on Schools, Hospitals, Banks, Agriculture & Lab Safety',
      type: 'applications',
    },
    {
      id: 'review-quiz',
      title: '6. Gamified Kahoot Quiz Arena',
      subtitle: '10-Question Live Shape Battle: 🔺 Red, 🔷 Blue, 🟡 Yellow, 🟩 Green',
      type: 'quiz',
    },
  ],
};

export const module1Lessons: LessonUnit[] = [
  {
    id: 'lesson-1',
    lessonNumber: 1,
    title: 'Lesson 1: Understanding Computers',
    duration: '40 minutes',
    objective:
      'Define a computer in simple terms, contrast raw data with processed information, master the IPOS cycle using familiar cooking and ATM analogies, understand the CPU as the brain, and explore the 5 core characteristics.',
    summary:
      'A computer is an electronic machine that accepts data (Input), works on it at high speed (Processing), displays the result (Output), and preserves it for future use (Storage). It follows the rule: RECEIVES -> WORKS -> SHOWS -> STORES.',
    topics: [
      'What is a Computer? (Definition & Everyday Electronics)',
      'Data vs. Information (Raw Facts vs. Meaningful Results)',
      'The IPOS Cycle (Input, Processing, Output, Storage)',
      'Real-Life IPOS Analogies: Making Yam/Cassava Stew & Withdrawing at the ATM',
      'The CPU as the Electronic Brain of the Computer',
      '5 Core Characteristics: Speed, High Accuracy (GIGO), Diligence, Storage, Automation',
    ],
  },
  {
    id: 'lesson-2',
    lessonNumber: 2,
    title: 'Lesson 2: History and Evolution of Computers',
    duration: '40 minutes',
    objective:
      'Trace humanity’s quest to calculate from fingers and the ancient Abacus to John Napier, Blaise Pascal, Charles Babbage (Father of Computers), Ada Lovelace (First Programmer), and the 5 electronic generations.',
    summary:
      'Before microchips, humans used pebbles and counting frames. The Abacus, Pascaline, and Jacquard Loom led Charles Babbage to conceive the Analytical Engine. In the 20th century, computers evolved from giant vacuum tubes to microprocessors and AI.',
    topics: [
      'Early Counting Tools: Fingers, Pebbles, Tally Sticks, and the Wooden Abacus',
      'Mechanical Pioneers: Napier’s Bones (1617) & Blaise Pascal’s Pascaline (1642)',
      'Jacquard Loom (1801): The Birth of Punched Cards and Binary Control',
      'Charles Babbage (Difference & Analytical Engines) & Ada Lovelace (First Programmer)',
      'Herman Hollerith (1890 Census Tabulator & Foundation of IBM)',
      'The 5 Generations: 1st (Vacuum Tubes) -> 2nd (Transistors) -> 3rd (ICs) -> 4th (Microprocessors) -> 5th (AI & Beyond)',
    ],
  },
  {
    id: 'lesson-3',
    lessonNumber: 3,
    title: 'Lesson 3: Types of Computers',
    duration: '40 minutes',
    objective:
      'Classify computers across three dimensions: physical size and computational power, types of data handled (analog, digital, hybrid), and application purpose (general-purpose vs. special-purpose).',
    summary:
      'Computers range from colossal multi-rack supercomputers predicting weather to personal desktop PCs, portable laptops, tablets, pocket smartphones, and invisible embedded microchips inside home appliances.',
    topics: [
      'Classification by Size: Supercomputers, Mainframes, Minicomputers, Microcomputers, Embedded Systems',
      'Personal Microcomputers: Desktop PCs, Laptops, Tablets, and Smartphones',
      'Classification by Data Type: Analog (Continuous Waves), Digital (0s & 1s), Hybrid (Hospital ICU Monitors)',
      'Classification by Purpose: General Purpose (Versatile PCs) vs. Special Purpose (ATMs, Microwave Controllers)',
      'Hands-on Device Classification & Mystery Device Deduction',
    ],
  },
  {
    id: 'lesson-4',
    lessonNumber: 4,
    title: 'Lesson 4: Uses and Importance of Computers',
    duration: '40 minutes',
    objective:
      'Understand how computers revolutionize education, healthcare, banking, transportation, agriculture, and daily communication, recognize the lifelong power of computer literacy, and master computer lab safety rules.',
    summary:
      'Computers empower doctors to diagnose illness, banks to transfer funds instantly, farmers to monitor weather, and students to research global knowledge. Proper lab safety protects both students and equipment from harm.',
    topics: [
      'Computers in Schools: Interactive Research, Typing, E-Libraries, and Visual Simulations',
      'Computers in Healthcare: Patient Records, Ultrasound/MRI Scanners, and Life Support',
      'Computers in Banking & Commerce: 24/7 ATMs, Online Mobile Money, and Supermarket Barcode Scanners',
      'Computers in Transportation & Agriculture: Satellite GPS Navigation and Soil Moisture Sensors',
      'Why Computer Literacy Matters for Secondary School Students and Future Careers',
      'Computer Laboratory Safety & Etiquette: No Liquids, Clean Dry Hands, Gentle Keystrokes, Safe Shutdown',
    ],
  },
];

export const module1ImageCards: ImageCard[] = [
  {
    id: 'classroom-desktop',
    title: 'Classroom Desktop Computer Workstation',
    caption: 'A complete desktop workstation with monitor, system unit, keyboard, and mouse used in classroom computer labs.',
    url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'desktop',
    badge: 'Hardware Workstation',
  },
  {
    id: 'kid-laptop',
    title: 'African Secondary School Students in ICT Class',
    caption: 'Black African secondary school students in uniforms learning together with equal lab laptops in the computer room.',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'laptop',
    badge: 'African Students in Lab',
  },
  {
    id: 'tablet-education',
    title: 'Interactive Digital Learning in Africa',
    caption: 'African students engaged with interactive touchscreen learning and digital textbooks in school.',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'tablet',
    badge: 'Digital Education',
  },
  {
    id: 'ipos-poster',
    title: 'CPU Chip & Motherboard Engine (IPOS)',
    caption: 'High-definition view of a computer motherboard and CPU microchip processing billions of calculations per second.',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'ipos',
    badge: 'Hardware Processing Engine',
  },
  {
    id: 'history-abacus',
    title: 'Ancient Wooden Abacus',
    caption: 'Humanity’s earliest bead-sliding calculator, invented thousands of years ago for rapid counting.',
    url: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'abacus',
    badge: 'Ancient Counting Roots',
  },
  {
    id: 'history-babbage',
    title: 'Babbage’s Mechanical Analytical Engine',
    caption: 'The mechanical brass cogs and punch-card design that earned Charles Babbage the title "Father of Computers".',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'babbage',
    badge: 'Father of Computers',
  },
  {
    id: 'supercomputer-datacenter',
    title: 'High-Performance Supercomputer Cluster',
    caption: 'Parallel server racks calculating complex weather simulations, rainfall predictions, and space physics.',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'supercomputer',
    badge: 'Massive Computing Power',
  },
  {
    id: 'hospital-healthcare',
    title: 'Computers in African Healthcare & Clinics',
    caption: 'African healthcare doctors and nurses using digital diagnostic monitors, patient ultrasound, and electronic health records to save lives.',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'hospital',
    badge: 'African Medical Innovation',
  },
  {
    id: 'banking-atm',
    title: 'Nigerian Market POS & 24/7 ATM Terminal',
    caption: 'POS terminals and ATM machines used across Nigerian markets, supermarkets, and banks for instant electronic cash withdrawals and card transfers.',
    url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'bank',
    badge: 'Instant Digital Commerce',
  },
  {
    id: 'lab-safety',
    title: 'Orderly School ICT Laboratory Practice',
    caption: 'Clean student workstations, safe cable routing, no pure water sachets or snacks near keyboards, and gentle typing.',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    fallbackType: 'safety',
    badge: 'Lab Etiquette & Safety',
  },
];

export const computerCharacteristics: ComputerCharacteristic[] = [
  {
    id: 'speed',
    title: 'Immense Speed',
    tagline: 'Millions of operations per second',
    description:
      'A computer performs billions of mathematical and logical calculations in the blink of an eye, handling calculations that would take a human years to solve.',
    realWorldExample: 'Calculating student term grades for 1,000 students in less than 2 seconds.',
  },
  {
    id: 'accuracy',
    title: 'High Accuracy (GIGO)',
    tagline: 'Garbage In, Garbage Out',
    description:
      'Computers do not make calculation errors on their own. As long as the input data and instructions provided by the human are correct, the output is 100% reliable.',
    realWorldExample: 'Processing bank transactions without misplacing a single cent.',
  },
  {
    id: 'diligence',
    title: 'Tireless Diligence',
    tagline: 'Never gets tired or bored',
    description:
      'Unlike humans, computers never suffer from fatigue, loss of concentration, or boredom. A computer can repeat the same task a million times with the exact same precision.',
    realWorldExample: 'Monitoring hospital patient vital signs continuously 24 hours a day.',
  },
  {
    id: 'storage',
    title: 'Massive Storage',
    tagline: 'Digital libraries in your pocket',
    description:
      'Computers can store enormous volumes of books, pictures, audio recordings, documents, and programs in tiny storage components (Hard Drives, SSDs, Flash Drives).',
    realWorldExample: 'Storing all the textbooks of a secondary school on a small thumb drive.',
  },
  {
    id: 'automation',
    title: 'Automatic Operation',
    tagline: 'Follows instructions without stopping',
    description:
      'Once a computer is provided with a program or sequence of instructions, it can execute the entire workflow automatically without requiring constant human intervention.',
    realWorldExample: 'Automatically ringing the school bell at scheduled period intervals.',
  },
];

export const calculatorVsComputer: ComparisonRow[] = [
  {
    aspect: 'Type of Tasks',
    calculator: 'Single-purpose: Arithmetic only (add, subtract, multiply, divide).',
    computer: 'Multi-purpose: Types documents, plays video, connects to web, calculates.',
  },
  {
    aspect: 'Input Methods',
    calculator: 'Small physical numeric keypad only.',
    computer: 'Keyboard, mouse, microphone, webcam, touch screen, barcode scanner.',
  },
  {
    aspect: 'Memory & Storage',
    calculator: 'Temporary memory for only a few numbers.',
    computer: 'Permanent storage for millions of documents, books, and media files.',
  },
  {
    aspect: 'Programmability',
    calculator: 'Fixed built-in mathematical formulas that cannot be modified.',
    computer: 'Fully programmable: can run brand-new software, apps, and games.',
  },
];

export const iposHardwareSteps: Record<string, IPOSStepInfo> = {
  input: {
    phase: 'input',
    name: 'Input',
    hardware: 'Keyboard, Mouse, Microphone, Scanner',
    functionDesc: 'Capturing raw data, instructions, or commands from the user into the computer.',
  },
  processing: {
    phase: 'processing',
    name: 'Processing',
    hardware: 'CPU (Central Processing Unit) & RAM',
    functionDesc: 'The computer’s "brain" calculating, organizing, and transforming raw data into useful information.',
  },
  output: {
    phase: 'output',
    name: 'Output',
    hardware: 'Monitor (Screen), Printer, Speakers',
    functionDesc: 'Presenting the finished result or information in a form humans can see, hear, or read.',
  },
  storage: {
    phase: 'storage',
    name: 'Storage',
    hardware: 'Hard Drive (HDD), Solid State Drive (SSD), USB Flash',
    functionDesc: 'Preserving data, files, and programs permanently so they are ready for future use.',
  },
};

export const iposAnalogies: IPOSAnalogy[] = [
  {
    id: 'cooking-yam',
    title: 'Cooking Yam & Stew',
    tagline: 'Kitchen Cooking Analogy (module-1.md)',
    steps: {
      input: {
        phase: 'input',
        label: 'Raw Yam, Water & Pepper',
        description: 'Gathering raw unpeeled yam tubers, water, tomatoes, peppers, and salt into the kitchen.',
        badge: 'Raw Ingredients',
      },
      processing: {
        phase: 'processing',
        label: 'Boiling & Pounding',
        description: 'Peeling, boiling over a hot fire in a pot, and pounding vigorously in a wooden mortar.',
        badge: 'Transformation',
      },
      output: {
        phase: 'output',
        label: 'Hot Pounded Yam Served',
        description: 'Serving hot, delicious, smooth pounded yam and steaming vegetable soup on a dining plate.',
        badge: 'Finished Meal',
      },
      storage: {
        phase: 'storage',
        label: 'Saving in Food Warmer / Fridge',
        description: 'Storing leftover portions in a clean food flask or refrigerator to eat tomorrow.',
        badge: 'Preserved for Dinner',
      },
    },
  },
  {
    id: 'cassava-garri',
    title: 'Processing Cassava into Garri',
    tagline: 'Local Nigerian Factory & Mill Analogy',
    steps: {
      input: {
        phase: 'input',
        label: 'Raw Cassava & Washing Water',
        description: 'Fresh raw cassava tubers harvested from the farm and brought to the processing shed.',
        badge: 'Raw Farm Harvest',
      },
      processing: {
        phase: 'processing',
        label: 'Peeling, Grinding & Frying',
        description: 'Peeling tubers, grating in the mechanical diesel engine mill, hydraulic pressing, and frying in hot pans.',
        badge: 'Transformation',
      },
      output: {
        phase: 'output',
        label: 'Crisp Ready-to-Eat Garri',
        description: 'Crisp white or yellow garri grains ready to drink with cold water and groundnuts or turn into hot eba.',
        badge: 'Finished Product',
      },
      storage: {
        phase: 'storage',
        label: 'Airtight Sacks & Buckets',
        description: 'Tying finished garri inside sealed jute sacks or plastic paint buckets in the store room to last for months.',
        badge: 'Preserved in Store',
      },
    },
  },
  {
    id: 'human-body',
    title: 'Human Senses & Brain',
    tagline: 'Biological Computing Analogy',
    steps: {
      input: {
        phase: 'input',
        label: 'Eyes & Ears Senses',
        description: 'Your eyes see the math problem on the blackboard and your ears hear the teacher speak.',
        badge: 'Sensory Input',
      },
      processing: {
        phase: 'processing',
        label: 'Brain Calculating & Thinking',
        description: 'Your brain cells calculate, analyze, and figure out the exact mathematical solution.',
        badge: 'Mental Processing',
      },
      output: {
        phase: 'output',
        label: 'Writing with Pen & Hand',
        description: 'Your hand writes the neat answer in your exercise book or your mouth answers aloud.',
        badge: 'Spoken / Written Output',
      },
      storage: {
        phase: 'storage',
        label: 'Memory & Exercise Notebook',
        description: 'The formula stays stored in your brain memory and is safely written in your school notebook.',
        badge: 'Saved for Exams',
      },
    },
  },
  {
    id: 'math',
    title: 'Math Calculator',
    tagline: 'Arithmetic Calculation Flow',
    steps: {
      input: {
        phase: 'input',
        label: 'Typing 25 + 47',
        description: 'The user presses the number keys "2", "5", "+", "4", "7" and Enter.',
        badge: 'Numbers Inputted',
      },
      processing: {
        phase: 'processing',
        label: 'ALU Calculation',
        description: 'The CPU’s Arithmetic Logic Unit executes binary addition circuitry.',
        badge: 'Computation',
      },
      output: {
        phase: 'output',
        label: 'Displaying "72"',
        description: 'The number 72 lights up clearly on the monitor display screen.',
        badge: 'Result Shown',
      },
      storage: {
        phase: 'storage',
        label: 'Saving to Memory',
        description: 'The formula and total are saved to memory or written into a spreadsheet.',
        badge: 'Preserved in File',
      },
    },
  },
  {
    id: 'atm',
    title: 'ATM Cash Withdrawal',
    tagline: 'Banking System Workflow',
    steps: {
      input: {
        phase: 'input',
        label: 'Card & PIN Entry',
        description: 'Customer inserts the debit card and types the confidential 4-digit PIN.',
        badge: 'Card & Credentials',
      },
      processing: {
        phase: 'processing',
        label: 'Account Verification',
        description: 'Bank mainframe checks account balance, card validity, and withdrawal limits.',
        badge: 'Network Verification',
      },
      output: {
        phase: 'output',
        label: 'Cash & Receipt Dispensed',
        description: 'The ATM mechanical tray opens, dispensing currency notes and printing a receipt.',
        badge: 'Cash Received',
      },
      storage: {
        phase: 'storage',
        label: 'Database Ledger Update',
        description: 'The new bank balance is saved permanently across the bank’s central databases.',
        badge: 'Account Balance Saved',
      },
    },
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'abacus',
    period: 'c. 3000 BC',
    title: 'The Abacus',
    pioneer: 'Ancient Mesopotamians & Chinese Scholars',
    keyInnovation: 'Position-based Bead Arithmetic',
    description:
      'The earliest known calculation device, consisting of beads sliding along parallel rods inside a wooden frame. Users could add, subtract, and multiply large sums quickly.',
    significance: 'Established the fundamental concept of using physical counters to represent abstract numerical values.',
  },
  {
    id: 'napiers-bones',
    period: '1617',
    title: "Napier's Bones",
    pioneer: 'John Napier (Scottish Mathematician)',
    keyInnovation: 'Lattice Multiplication Rods',
    description:
      'A set of marked rods carved from animal bone, wood, or ivory. By placing adjacent rods side-by-side, merchants could perform complex multiplication and division through simple addition.',
    significance: 'Invented logarithms and proved that mechanical tools could accelerate mental arithmetic.',
  },
  {
    id: 'pascaline',
    period: '1642',
    title: 'The Pascaline (Arithmetic Machine)',
    pioneer: 'Blaise Pascal (French Mathematician)',
    keyInnovation: 'Gear-Driven Carry Mechanism',
    description:
      'Built by 19-year-old Blaise Pascal to assist his father, a royal tax collector. Inside the brass box, interlocking toothed gear wheels automatically carried tens to hundreds as dials rotated.',
    significance: 'The world’s first operating mechanical calculator, proving gears could execute arithmetic without human error.',
  },
  {
    id: 'analytical-engine',
    period: '1837',
    title: 'The Analytical Engine',
    pioneer: 'Charles Babbage & Ada Lovelace',
    keyInnovation: 'Stored Programs & Conditional Branching',
    description:
      'A visionary steam-powered mechanical design containing a "Mill" (CPU), "Store" (Memory), and punched card input. English mathematician Ada Lovelace created the first algorithm for it.',
    significance: 'Babbage is universally honored as the Father of Computing, and Ada Lovelace as the World’s First Computer Programmer.',
  },
  {
    id: 'microprocessor',
    period: '1971 – Present',
    title: 'The Microprocessor Revolution',
    pioneer: 'Federico Faggin, Ted Hoff & Intel Team',
    keyInnovation: 'Silicon Integrated Circuit (CPU on a Chip)',
    description:
      'The Intel 4004 placed an entire computer processing unit on a single silicon chip the size of a fingernail. Modern processors hold tens of billions of microscopic transistors.',
    significance: 'Shrank room-sized computers into laptops, tablets, smartphones, and smart devices used by billions worldwide.',
  },
];

export const deviceCategories: DeviceCategoryDefinition[] = [
  {
    id: 'desktop',
    name: 'Desktop Computers',
    description: 'Stationary computers designed to stay in one place on a desk with a separate monitor, CPU box, and keyboard.',
  },
  {
    id: 'laptop',
    name: 'Laptops / Notebooks',
    description: 'Portable all-in-one personal computers with a built-in screen, keyboard, and rechargeable battery.',
  },
  {
    id: 'tablet',
    name: 'Tablets',
    description: 'Handheld touchscreen slabs operated by tapping the glass surface without a physical keyboard.',
  },
  {
    id: 'smartphone',
    name: 'Smartphones',
    description: 'Pocket-sized cellular phones with powerful processors, cameras, internet, and touchscreens.',
  },
  {
    id: 'supercomputer',
    name: 'Supercomputers',
    description: 'Massive, room-sized computing systems with thousands of linked processors for colossal scientific workloads.',
  },
];

export const deviceItems: DeviceItem[] = [
  {
    id: 'lab-pc',
    name: 'School Computer Lab Workstation',
    category: 'desktop',
    clues: [
      'Has a separate tower on the floor and a big monitor on the desk.',
      'Must stay plugged into the wall electrical socket to run.',
      'Uses an external wired keyboard and optical mouse.',
    ],
    explanation: 'A classic Desktop Computer: built for stationary productivity with separate modular components.',
  },
  {
    id: 'macbook',
    name: 'Portable MacBook / Notebook',
    category: 'laptop',
    clues: [
      'Folds open like a clamshell with keyboard and screen attached.',
      'Runs on an internal rechargeable battery for hours on the go.',
      'Has a built-in touchpad instead of a bulky mouse.',
    ],
    explanation: 'A Laptop Computer: balances full computer power with portable, battery-powered convenience.',
  },
  {
    id: 'ipad',
    name: 'Digital Classroom iPad',
    category: 'tablet',
    clues: [
      'Flat glass screen with no physical keyboard attached.',
      'You interact entirely by tapping, pinching, and swiping with your fingers.',
      'Larger than a phone, lightweight enough to hold in your hands.',
    ],
    explanation: 'A Tablet: a touch-first personal device ideal for drawing, reading e-books, and mobile viewing.',
  },
  {
    id: 'android-phone',
    name: 'Android Pocket Device',
    category: 'smartphone',
    clues: [
      'Fits inside a trouser or shirt pocket.',
      'Can make cellular phone calls, take high-resolution photos, and run apps.',
      'Carries GPS, sensors, Wi-Fi, and a cellular SIM card.',
    ],
    explanation: 'A Smartphone: an advanced miniature computer combined with cellular communication in your pocket.',
  },
  {
    id: 'weather-cluster',
    name: 'National Weather Forecasting Cluster',
    category: 'supercomputer',
    clues: [
      'Occupies an entire cooled warehouse room with rows of tall server racks.',
      'Simulates hurricane movements and climate models across planet Earth.',
      'Costs millions of dollars and consumes substantial electrical power.',
    ],
    explanation: 'A Supercomputer: designed to calculate quadrillions of floating-point equations per second for science.',
  },
  {
    id: 'gaming-rig',
    name: 'Heavy Gaming Tower with RGB Lights',
    category: 'desktop',
    clues: [
      'Large chassis with powerful dedicated graphics card and cooling fans.',
      'Sits stationary on a sturdy desk paired with dual monitors.',
      'Too heavy and bulky to carry around in a backpack.',
    ],
    explanation: 'A Desktop PC: provides maximum performance, upgradeable parts, and cooling for high-intensity tasks.',
  },
  {
    id: 'chromebook',
    name: 'Student Chromebook',
    category: 'laptop',
    clues: [
      'Clamshell design that opens up for typing notes in class.',
      'Weighs under 1.5 kg and fits easily into a student school bag.',
      'Has an integrated webcam and microphone for virtual classes.',
    ],
    explanation: 'A Laptop: purpose-built for mobile student learning with keyboard, screen, and battery in one unit.',
  },
  {
    id: 'hospital-slate',
    name: 'Doctor’s Ward Round Clipboard Slate',
    category: 'tablet',
    clues: [
      'Handheld screen doctors carry to review X-rays at the patient’s bedside.',
      'Uses digital stylus pen or fingertip to sign prescriptions.',
      'No physical keyboard taking up space on patient beds.',
    ],
    explanation: 'A Tablet: provides medical professionals with instant, portable touchscreen access to patient charts.',
  },
  {
    id: 'iphone',
    name: 'iPhone with Face ID',
    category: 'smartphone',
    clues: [
      'Wakes up and unlocks by scanning the owner’s facial biometric features.',
      'Used for WhatsApp messaging, camera photography, and mobile bank apps.',
      'Always carried everywhere throughout the day.',
    ],
    explanation: 'A Smartphone: modern society’s most ubiquitous, personal pocket computer.',
  },
  {
    id: 'space-physics',
    name: 'Space Physics Simulation System',
    category: 'supercomputer',
    clues: [
      'Used by space agencies to calculate rocket trajectories to Mars.',
      'Features liquid cooling pipes and tens of thousands of processing cores.',
      'Operated by a team of specialized engineers in a secure data center.',
    ],
    explanation: 'A Supercomputer: solves physics equations that would overwhelm ordinary personal computers.',
  },
];

export const applicationSectors: ApplicationSector[] = [
  {
    id: 'schools',
    name: 'Schools & Education',
    tagline: 'Empowering Next-Generation Learning',
    examples: [
      {
        title: 'Computer-Based Testing (CBT)',
        description: 'Delivering national examinations with instant scoring, eliminating paper cheating and grading delays.',
      },
      {
        title: 'Virtual Classrooms & Research',
        description: 'Enabling students to research online encyclopedias, watch scientific simulations, and learn coding.',
      },
      {
        title: 'School Administration & Records',
        description: 'Tracking student enrollment, attendance logs, grade report cards, and fee receipts systematically.',
      },
    ],
    discussionPrompt: 'How would your study habits change if our school had zero computers or electronic devices?',
  },
  {
    id: 'hospitals',
    name: 'Hospitals & Healthcare',
    tagline: 'Diagnosing Illnesses & Saving Lives',
    examples: [
      {
        title: 'Electronic Medical Records (EMR)',
        description: 'Storing complete patient medical histories so doctors immediately know allergies and previous treatments.',
      },
      {
        title: 'Diagnostic Imaging (X-Ray, CT, MRI)',
        description: 'Using computerized sensors to view detailed cross-sectional scans of bones, organs, and the human brain.',
      },
      {
        title: 'Intensive Care Unit (ICU) Monitors',
        description: 'Constantly tracking heartbeat, oxygen saturation, and blood pressure, sounding alarms if values drop.',
      },
    ],
    discussionPrompt: 'Why is computer accuracy critical in hospital prescription dosages and surgical theaters?',
  },
  {
    id: 'banks',
    name: 'Banks & Financial Systems',
    tagline: 'Securing Currency & Instant Transfers',
    examples: [
      {
        title: 'Automated Teller Machines (ATMs)',
        description: 'Allowing customers to withdraw cash, check account balances, and transfer funds 24 hours every day.',
      },
      {
        title: 'Mobile Banking & USSD Transfers',
        description: 'Moving money between accounts in seconds using smartphone apps or simple phone keypad codes.',
      },
      {
        title: 'Fraud Detection Algorithms',
        description: 'Monitoring millions of transactions in real-time to detect stolen cards and unauthorized spending.',
      },
    ],
    discussionPrompt: 'What would happen if banking computer databases suddenly forgot everyone’s account balances?',
  },
  {
    id: 'supermarkets',
    name: 'Supermarkets & Commerce',
    tagline: 'Automating Inventory & Checkouts',
    examples: [
      {
        title: 'Barcode & QR Code Scanning',
        description: 'Instantly reading product barcodes at the checkout counter to ring up prices accurately without manual entry.',
      },
      {
        title: 'Automated Stock Inventory',
        description: 'Automatically alerting warehouse managers when milk cartons or biscuit packets run low on shelves.',
      },
      {
        title: 'Point-of-Sale (POS) Card Terminals',
        description: 'Allowing shoppers to pay securely using plastic debit cards without carrying paper banknotes.',
      },
    ],
    discussionPrompt: 'Imagine a busy supermarket with 500 customers and no barcode scanners—how long would checkouts take?',
  },
  {
    id: 'homes',
    name: 'Homes & Daily Life',
    tagline: 'Communication, Learning & Entertainment',
    examples: [
      {
        title: 'Global Video Calls & Chat',
        description: 'Connecting family members living across different states or countries face-to-face via the internet.',
      },
      {
        title: 'Smart Home Appliances',
        description: 'Microchips embedded in washing machines, microwave ovens, and smart TVs controlling timing and settings.',
      },
      {
        title: 'Online Bill Payments & Shopping',
        description: 'Recharging electricity tokens, paying water bills, and purchasing household goods from the comfort of the couch.',
      },
    ],
    discussionPrompt: 'Count how many microchip-controlled devices you have inside your home (clocks, TV, remotes, phones, radios).',
  },
  {
    id: 'transport',
    name: 'Transportation & Logistics',
    tagline: 'Navigation, Safety & Global Travel',
    examples: [
      {
        title: 'GPS Satellite Navigation',
        description: 'Guiding cars and delivery vans along the fastest routes with real-time traffic jam warnings.',
      },
      {
        title: 'Air Traffic Control Systems',
        description: 'Tracking aircraft radar positions in the sky to prevent mid-air collisions and ensure safe airport landings.',
      },
      {
        title: 'Electronic Ticketing & Toll Gates',
        description: 'Allowing passengers to book train and bus tickets online and drive through toll highways smoothly.',
      },
    ],
    discussionPrompt: 'How did travelers navigate across countries before GPS satellite computers were invented?',
  },
];

export const kahootQuestions: KahootQuestion[] = [
  {
    id: 1,
    topic: 'Lesson 1: Understanding Computers',
    question: 'A computer is an electronic device that:',
    options: [
      'Only stores books',
      'Processes data to produce information',
      'Only plays music',
      'Only makes calls',
    ],
    correctIndex: 1, // B -> Blue Diamond
    explanation:
      'A computer is an electronic machine that accepts raw data (Input), processes it at high speed, produces meaningful information (Output), and preserves it for future use (Storage).',
    timeLimitSeconds: 30,
  },
  {
    id: 2,
    topic: 'Lesson 1: Hardware Roles',
    question: 'Which of the following is an input device?',
    options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'],
    correctIndex: 2, // C -> Yellow Circle
    explanation:
      'A keyboard allows you to enter text, numbers, and commands into the computer, making it an input device. Monitors, printers, and speakers deliver output.',
    timeLimitSeconds: 30,
  },
  {
    id: 3,
    topic: 'Lesson 1: The CPU Brain',
    question: 'The CPU is responsible for:',
    options: [
      'Processing data and instructions',
      'Printing documents',
      'Producing sound',
      'Displaying pictures',
    ],
    correctIndex: 0, // A -> Red Triangle
    explanation:
      'The CPU (Central Processing Unit) is the electronic brain of the computer that performs all calculations, logical decisions, and instruction executions.',
    timeLimitSeconds: 30,
  },
  {
    id: 4,
    topic: 'Lesson 1: Output Devices',
    question: 'Which of the following is an output device?',
    options: ['Mouse', 'Keyboard', 'Scanner', 'Monitor'],
    correctIndex: 3, // D -> Green Square
    explanation:
      'A monitor displays processed visual results and text on screen for the user to see, making it an output device. Mice, keyboards, and scanners are input tools.',
    timeLimitSeconds: 30,
  },
  {
    id: 5,
    topic: 'Lesson 1: The IPOS Cycle',
    question: 'Which stage of IPOS involves saving information?',
    options: ['Input', 'Processing', 'Output', 'Storage'],
    correctIndex: 3, // D -> Green Square
    explanation:
      'Storage is the 4th stage of the IPOS cycle where files, documents, and data are safely saved onto hard drives, SSDs, or flash drives for future retrieval.',
    timeLimitSeconds: 30,
  },
  {
    id: 6,
    topic: 'Lesson 2: Pioneers of Computing',
    question: 'Who is known as the Father of the Computer?',
    options: [
      'John Napier',
      'Charles Babbage',
      'Blaise Pascal',
      'Isaac Newton',
    ],
    correctIndex: 1, // B -> Blue Diamond
    explanation:
      'Charles Babbage conceived the Difference Engine and the Analytical Engine in the 19th century, laying down the fundamental principles of modern digital computers.',
    timeLimitSeconds: 30,
  },
  {
    id: 7,
    topic: 'Lesson 2: Early Calculating Tools',
    question: 'Which device was used for early counting?',
    options: ['Abacus', 'Smartphone', 'Laptop', 'Printer'],
    correctIndex: 0, // A -> Red Triangle
    explanation:
      'The Abacus is an ancient wooden frame with sliding beads invented thousands of years ago in Mesopotamia and Asia to perform manual counting and arithmetic.',
    timeLimitSeconds: 30,
  },
  {
    id: 8,
    topic: 'Lesson 3: Types of Computers',
    question: 'Which computer is designed to be carried easily?',
    options: ['Mainframe', 'Desktop', 'Laptop', 'Supercomputer'],
    correctIndex: 2, // C -> Yellow Circle
    explanation:
      'A laptop is a portable microcomputer with an integrated screen, keyboard, trackpad, and battery designed for easy transport and learning on the go.',
    timeLimitSeconds: 30,
  },
  {
    id: 9,
    topic: 'Lesson 3: Scientific Computing',
    question:
      'Which computer is commonly used for weather forecasting and complex scientific calculations?',
    options: ['Smartphone', 'Supercomputer', 'Tablet', 'Calculator'],
    correctIndex: 1, // B -> Blue Diamond
    explanation:
      'Supercomputers possess massive parallel processing power capable of billions of calculations per second, making them ideal for modeling global weather and space exploration.',
    timeLimitSeconds: 30,
  },
  {
    id: 10,
    topic: 'Lesson 4: Uses and Importance',
    question: 'Computer literacy means:',
    options: [
      'Knowing how to repair every computer',
      'Knowing how to use computers effectively',
      'Owning a computer',
      'Playing computer games',
    ],
    correctIndex: 1, // B -> Blue Diamond
    explanation:
      'Computer literacy is having the knowledge, skills, and confidence to use computers effectively and responsibly for learning, work, and communication in modern society.',
    timeLimitSeconds: 30,
  },
];

// Backwards-compatible quiz questions list
export const quizQuestions: QuizQuestion[] = kahootQuestions.map((q) => ({
  id: q.id,
  topic: q.topic,
  question: q.question,
  options: [...q.options],
  correctIndex: q.correctIndex,
  explanation: q.explanation,
}));

export const module1Notes: ModuleNotes = {
  moduleId: 'module-1',
  moduleTitle: 'Module 1: Introduction to Computers (Complete 4-Lesson Study Notes)',
  phaseName: 'Phase 1: Basic (Foundational Literacy)',
  summary:
    'Comprehensive study notes designed for student exercise notebooks. Copy these definitions, tables, and rules into your computer notebook for revision and study.',
  sections: [
    {
      id: 'lesson-1-definition-ipos',
      title: 'Lesson 1: Understanding Computers & The IPOS Cycle',
      summary:
        'A computer is an electronic device that receives data (Input), processes it at high speed (Processing), produces information (Output), and stores it for future use (Storage). Memory rule: RECEIVES -> WORKS -> SHOWS -> STORES.',
      keyTakeaway:
        'The Central Processing Unit (CPU) is the brain of the computer that coordinates all operations.',
      points: [
        'Definition: An electronic machine that accepts raw data, processes it following instructions, produces meaningful information, and stores it.',
        'Data vs. Information: Data refers to unorganized raw facts or numbers (e.g., 45, 60, "Tolu"). Information is processed data that is meaningful (e.g., Student Report Card with Total: 105, Average: 52.5%).',
        'Input: Entering raw data and instructions into the computer using devices like the Keyboard, Mouse, Scanner, and Microphone.',
        'Processing: Manipulating and calculating data using the Central Processing Unit (CPU).',
        'Output: Presenting processed results to the user via the Monitor (screen), Printer, or Speakers.',
        'Storage: Preserving information permanently or temporarily using Hard Drives, SSDs, Flash Drives, and Memory Cards.',
        'Cooking Analogy: Raw Yam & Pepper (Input) -> Cooking in Pot over Fire (Processing) -> Delicious Hot Pounded Yam (Output) -> Leftovers saved in Refrigerator (Storage).',
        'ATM Analogy: Inserting ATM Card and PIN (Input) -> Bank Server verifying account balance (Processing) -> Cash dispensed from slot (Output) -> Transaction record saved in bank database (Storage).',
      ],
    },
    {
      id: 'lesson-1-characteristics',
      title: 'Lesson 1: Five Core Characteristics of Computers',
      summary:
        'Computers possess unique superpowers that distinguish them from humans and mechanical tools.',
      keyTakeaway:
        'Garbage In, Garbage Out (GIGO): If incorrect data is input, the resulting output will also be incorrect. Computers follow instructions faithfully.',
      points: [
        '1. Immense Speed: Performs millions or billions of calculations in a fraction of a second.',
        '2. High Accuracy: Computers do not make calculation errors on their own. Errors occur only if humans input wrong data (GIGO).',
        '3. Diligence: Computers never get tired, bored, sleepy, or lose concentration even when repeating a task one million times.',
        '4. Massive Storage: High-density drives hold entire school libraries of textbooks, pictures, videos, and applications in a device the size of a thumb.',
        '5. Automation & Versatility: Once programmed, computers carry out complex operations automatically and can switch from typing an essay to playing music or calculating bank interest.',
      ],
    },
    {
      id: 'lesson-2-history-evolution',
      title: 'Lesson 2: History and Evolution of Computers',
      summary:
        'Computers did not appear overnight; they evolved from early counting tools to mechanical calculators, punched card machines, and five generations of electronic computing.',
      keyTakeaway:
        'Charles Babbage is honored as the "Father of the Computer", and Ada Lovelace is celebrated as the world\'s first computer programmer.',
      points: [
        'Early Counting Tools: Early humans used fingers, pebbles, sticks, and notches on bones before inventing the wooden Abacus.',
        'The Abacus (3000 BC): A wooden frame with sliding beads, recognized as the earliest calculating instrument in history.',
        'Napier’s Bones (1617): Invented by Scottish mathematician John Napier using carved ivory rods to perform multiplication and division.',
        'The Pascaline (1642): Invented by Blaise Pascal in France; the first mechanical gear-driven calculator that could add and subtract.',
        'Jacquard Loom (1801): Joseph Marie Jacquard used punched cards with holes to automatically weave intricate textile patterns, inspiring computer binary storage.',
        'Charles Babbage (1830s): Designed the Difference Engine and the Analytical Engine featuring an input unit, store (memory), mill (CPU), and output.',
        'Ada Lovelace (1843): Wrote the first algorithm intended to be executed by Babbage’s engine, becoming the first computer programmer.',
        'Herman Hollerith (1890): Invented an electric punched-card tabulator to count the US Census in weeks instead of years; his company later became IBM.',
      ],
    },
    {
      id: 'lesson-2-five-generations',
      title: 'Lesson 2: The Five Generations of Computers',
      summary:
        'Each generation of electronic computers is marked by a major technological breakthrough that made computers smaller, faster, cheaper, and more powerful.',
      keyTakeaway:
        '1st Gen: Vacuum Tubes -> 2nd Gen: Transistors -> 3rd Gen: Integrated Circuits -> 4th Gen: Microprocessors -> 5th Gen: Artificial Intelligence.',
      points: [
        '1st Generation (1940-1956): Vacuum Tubes. Huge (room-sized), consumed enormous electricity, generated intense heat, broke down often (e.g., ENIAC, UNIVAC).',
        '2nd Generation (1956-1963): Transistors. Replaced vacuum tubes; made computers much smaller, faster, cheaper, and more reliable.',
        '3rd Generation (1964-1971): Integrated Circuits (ICs). Placed hundreds of transistors onto tiny silicon chips; keyboard and monitor interfaces introduced.',
        '4th Generation (1971-Present): Microprocessors (VLSI / ULSI). Placed an entire CPU on a single silicon microchip; gave birth to Personal Computers (PCs), laptops, and smartphones.',
        '5th Generation (Present & Future): Artificial Intelligence (AI). Voice recognition, robotics, autonomous vehicles, neural networks, and quantum computing.',
      ],
    },
    {
      id: 'lesson-3-classification',
      title: 'Lesson 3: Classification of Computers',
      summary:
        'Computers are classified in three ways: by physical size and power, by the type of data they process, and by their purpose.',
      keyTakeaway:
        'Microcomputers (desktops, laptops, tablets, smartphones) are the most popular computers used by students and teachers today.',
      points: [
        'Classification by Size and Power: Supercomputers (fastest on Earth, used for weather and space), Mainframes (banks, airlines, thousands of users), Minicomputers (medium enterprises), Microcomputers (PCs, laptops, phones), and Embedded Computers (chips in microwaves, cars, washing machines).',
        'Classification by Data Handled: Analog Computers (measure continuous physical changes like temperature, pressure, speed), Digital Computers (process discrete binary digits: 0s and 1s), Hybrid Computers (combine analog sensors with digital displays, e.g., hospital ICU patient monitors).',
        'Classification by Purpose: General-Purpose (handles multiple tasks: writing, gaming, web browsing) vs. Special-Purpose (built for one dedicated job: ATM cash dispenser, speedometer).',
      ],
    },
    {
      id: 'lesson-4-uses-and-safety',
      title: 'Lesson 4: Uses in Society & Computer Laboratory Safety',
      summary:
        'Computers touch every part of our lives. Computer literacy equips students with the skills to learn, work, and thrive. Strict lab rules protect both students and equipment.',
      keyTakeaway:
        'Always handle computers with clean dry hands, press keys gently, avoid all liquids and food, and shut down properly through the operating system menu.',
      points: [
        'Schools & Education: Researching topics online, typing homework, interactive simulation software, and e-learning libraries.',
        'Hospitals & Healthcare: Maintaining patient medical history, performing ultrasound/MRI diagnostics, and operating life-support systems.',
        'Banking & Business: Managing savings accounts, dispensing cash at ATMs, paying bills with mobile money, and scanning barcodes in supermarkets.',
        'Transportation & Agriculture: Guiding airplanes with radar, satellite GPS navigation in cars, and monitoring soil moisture on farms.',
        'Rule 1: No Food or Liquids in the lab. A single water spill can destroy delicate circuit boards and cause electrical hazards.',
        'Rule 2: Clean and dry hands before touching keyboards and mice to prevent dirt buildup and sticky keys.',
        'Rule 3: Press keys and mouse buttons gently. Hammering or banging damages the mechanical switches.',
        'Rule 4: Always shut down the computer properly through the Start menu. Never pull the power cable directly.',
        'Rule 5: Report any strange smell, sparks, or loose cables to the teacher immediately without touching the wires.',
      ],
    },
  ],
};

export const module1Assignment: ModuleAssignment = {
  moduleId: 'module-1',
  moduleTitle: 'Module 1: Introduction to Computers - Comprehensive Assignment',
  instructions:
    'Complete the following 5 assignment questions carefully. Ensure you enter your assigned Patron Number (e.g., 20230194) and your Full Name before submitting. Your submission will be recorded for your instructor to review.',
  questions: [
    {
      id: 1,
      prompt:
        'In your own words, define a computer and explain each of the four stages of the IPOS cycle using a real-life analogy (e.g., cooking food or withdrawing money from an ATM).',
      guidance:
        'State a 2-3 sentence definition, explain Input, Processing, Output, and Storage, and clearly link each stage to your chosen analogy.',
      placeholder:
        'A computer is...\n\nIPOS stands for:\n- Input: (e.g., in cooking...)\n- Processing: (e.g., in cooking...)\n- Output: (e.g., in cooking...)\n- Storage: (e.g., in cooking...)',
    },
    {
      id: 2,
      prompt:
        'Explain the difference between Data and Information, and explain what the computer science principle "GIGO" means.',
      guidance:
        'Give two concrete examples of raw data and show how they transform into meaningful information. State the full meaning of GIGO.',
      placeholder:
        'Data refers to...\nExample of Data: ...\n\nInformation refers to...\nExample of Information: ...\n\nGIGO stands for: ... and it means that...',
    },
    {
      id: 3,
      prompt:
        'Who is known as the "Father of the Computer" and who was the world’s first computer programmer? List the primary electronic component used in each of the 5 generations of computers.',
      guidance:
        'Name Charles Babbage and Ada Lovelace. Then list 1st Gen (Vacuum Tubes), 2nd Gen (Transistors), 3rd Gen (ICs), 4th Gen (Microprocessors), and 5th Gen (AI).',
      placeholder:
        'Father of the Computer: ...\nFirst Computer Programmer: ...\n\n5 Generations:\n1st Gen: ...\n2nd Gen: ...\n3rd Gen: ...\n4th Gen: ...\n5th Gen: ...',
    },
    {
      id: 4,
      prompt:
        'Classify the following five computing devices into their appropriate category (Supercomputer, Desktop, Laptop, Smartphone, or Embedded Computer) and mention one place where each is used: A weather forecasting cluster, a family study PC, a student portable computer, a mobile telephone, and a microwave timer chip.',
      guidance:
        'Match each device to its size/category and state its specific real-world application.',
      placeholder:
        '1. Weather cluster -> Category: ... | Used in: ...\n2. Family study PC -> Category: ... | Used in: ...\n3. Student portable computer -> Category: ... | Used in: ...\n4. Mobile telephone -> Category: ... | Used in: ...\n5. Microwave timer chip -> Category: ... | Used in: ...',
    },
    {
      id: 5,
      prompt:
        'HOME ASSIGNMENT - Interview Your Parents or Guardians: Ask your parent or guardian: (a) What type of computer do they use at work or home? (b) What do they use it for? (c) How does the computer make their work easier? Write a three-sentence summary of their answers.',
      guidance:
        'Example summary: "My father uses a laptop at his office. He uses it to write letters, send emails, and balance bank accounts. The laptop helps him complete work much faster and keep files organized without losing papers."',
      placeholder:
        'Parent/Guardian Name: ...\nComputer Type Used: ...\nSummary:\n1. ...\n2. ...\n3. ...',
    },
  ],
};
