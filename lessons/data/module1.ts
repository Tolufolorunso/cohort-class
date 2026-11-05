import {
  ModuleData,
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

export const module1Info: ModuleData = {
  id: 'module-1',
  moduleNumber: 1,
  phaseName: 'Phase 1: Basic (Foundational Literacy)',
  title: 'Introduction to Computers',
  duration: '2 Weeks (4 Lessons)',
  objective:
    'Demystify the computer, understand the Input-Processing-Output-Storage (IPOS) data cycle, trace the historical evolution of computing, and classify modern computing devices in society.',
  stages: [
    {
      id: 'what-is-a-computer',
      title: '1. What is a Computer?',
      subtitle: 'Definition, Core Characteristics & Everyday Comparison',
      type: 'definition',
    },
    {
      id: 'ipos-cycle',
      title: '2. The IPOS Cycle Simulator',
      subtitle: 'Input, Processing, Output & Storage with Real-World Analogies',
      type: 'ipos',
    },
    {
      id: 'history-timeline',
      title: '3. Evolution of Computing',
      subtitle: 'From the Ancient Abacus to Modern Microchips',
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
      subtitle: 'Impact on Schools, Hospitals, Banks, Supermarkets & Homes',
      type: 'applications',
    },
    {
      id: 'review-quiz',
      title: '6. Classroom Knowledge Check',
      subtitle: '10-Question Interactive Review & Comprehension Challenge',
      type: 'quiz',
    },
  ],
};

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
    id: 'cake',
    title: 'Baking a Cake',
    tagline: 'Kitchen Analogy (Everyday Life)',
    steps: {
      input: {
        phase: 'input',
        label: 'Gathering Ingredients',
        description: 'Measuring raw flour, eggs, sugar, and milk into the mixing bowl.',
        badge: 'Raw Ingredients',
      },
      processing: {
        phase: 'processing',
        label: 'Mixing & Oven Baking',
        description: 'Beating the batter and baking it inside the hot oven at 180°C.',
        badge: 'Transformation',
      },
      output: {
        phase: 'output',
        label: 'Decorated Cake',
        description: 'Taking out the warm, decorated cake ready to be served to guests.',
        badge: 'Finished Product',
      },
      storage: {
        phase: 'storage',
        label: 'Refrigerator Storage',
        description: 'Storing remaining cake slices inside the fridge to eat tomorrow.',
        badge: 'Saved for Later',
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

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Definition',
    question: 'Which of the following is the most accurate definition of a computer?',
    options: [
      'A mechanical tool used only for typing letters and printing paper.',
      'An electronic device that accepts data as input, processes it, and produces information as output.',
      'A television screen with a keyboard attached for watching movies.',
      'A battery-powered calculator that can only add and subtract numbers.',
    ],
    correctIndex: 1,
    explanation:
      'A computer is an electronic machine that accepts raw data (input), manipulates it according to instructions (processing), presents results (output), and stores it for future use.',
  },
  {
    id: 2,
    topic: 'Data Cycle',
    question: 'What do the four letters in the "IPOS" cycle stand for?',
    options: [
      'Internet, Printing, Operating, Software',
      'Input, Processing, Output, Storage',
      'Information, Programs, Output, Systems',
      'Interface, Processor, Operations, Screen',
    ],
    correctIndex: 1,
    explanation:
      'IPOS stands for Input (data in), Processing (CPU computing), Output (results displayed), and Storage (data saved to disk).',
  },
  {
    id: 3,
    topic: 'Characteristics',
    question: 'What does the computer science principle "GIGO" stand for?',
    options: [
      'Great Inputs Give Outcomes',
      'General Information, General Output',
      'Garbage In, Garbage Out',
      'Grid Input, Grounded Output',
    ],
    correctIndex: 2,
    explanation:
      '"Garbage In, Garbage Out" means that if incorrect or erroneous data is fed into a computer, the resulting output will also be incorrect. The computer follows instructions faithfully.',
  },
  {
    id: 4,
    topic: 'Hardware Roles',
    question: 'Which part of a computer is commonly referred to as the "Brain" of the computer?',
    options: [
      'The Computer Monitor',
      'The Mouse',
      'The CPU (Central Processing Unit)',
      'The Keyboard',
    ],
    correctIndex: 2,
    explanation:
      'The CPU (Central Processing Unit) performs all calculations, logical decisions, and data processing, acting as the brain of the computer system.',
  },
  {
    id: 5,
    topic: 'History',
    question: 'Which ancient tool made of wooden frames and sliding beads is considered the earliest calculation device?',
    options: [
      'The Abacus',
      'The Pascaline',
      'The Slide Rule',
      "Napier's Bones",
    ],
    correctIndex: 0,
    explanation:
      'The Abacus, used thousands of years ago in ancient Mesopotamia and Asia, is widely recognized as humanity’s earliest counting and calculation tool.',
  },
  {
    id: 6,
    topic: 'History',
    question: 'Who is widely honored as the "Father of Computing" for designing the Analytical Engine in 1837?',
    options: [
      'Thomas Edison',
      'Charles Babbage',
      'Bill Gates',
      'Blaise Pascal',
    ],
    correctIndex: 1,
    explanation:
      'English inventor and mathematician Charles Babbage conceived the Analytical Engine, introducing the core concepts of memory, processor, and programmable instructions.',
  },
  {
    id: 7,
    topic: 'History',
    question: 'Who worked with Charles Babbage and is celebrated as the world’s very first computer programmer?',
    options: [
      'Marie Curie',
      'Florence Nightingale',
      'Ada Lovelace',
      'Grace Hopper',
    ],
    correctIndex: 2,
    explanation:
      'Ada Lovelace wrote the first published algorithm intended to be executed by Babbage’s Analytical Engine, making her the first programmer in history.',
  },
  {
    id: 8,
    topic: 'Device Types',
    question: 'Why is a modern smartphone classified as a computer?',
    options: [
      'Because it has a glass screen.',
      'Because it has a microprocessor, memory, storage, input (touchscreen), and outputs information.',
      'Only because it can make cellular phone calls.',
      'It is not a computer; it is only a telephone.',
    ],
    correctIndex: 1,
    explanation:
      'Smartphones contain a complete computer architecture (CPU, RAM, storage, operating system, and input/output sensors) and execute millions of computer instructions.',
  },
  {
    id: 9,
    topic: 'Device Types',
    question: 'Which class of computers is the largest, most expensive, and used for colossal scientific work like weather forecasting?',
    options: [
      'Supercomputers',
      'Desktop PCs',
      'Tablets',
      'Laptops',
    ],
    correctIndex: 0,
    explanation:
      'Supercomputers combine thousands of high-performance processors in large data centers to solve immense scientific, climate, and space exploration equations.',
  },
  {
    id: 10,
    topic: 'Real-world Application',
    question: 'In a modern supermarket, which computer peripheral allows the cashier to ring up prices in less than a second without typing numbers?',
    options: [
      'A high-speed laser printer',
      'A barcode scanner',
      'A mechanical microphone',
      'A computer joystick',
    ],
    correctIndex: 1,
    explanation:
      'A barcode scanner shines an optical sensor on product line patterns, immediately reading the product ID and querying the store database for the exact price and description.',
  },
];

