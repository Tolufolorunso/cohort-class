import { ModuleSlide } from '../../types/presentation';

export const module2Slides: ModuleSlide[] = [
  // Slide 1: Hardware Definition & System Unit vs CPU
  {
    id: 1,
    part: 'LESSON 1: HARDWARE INTRODUCTION',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'Hardware: The Physical Machine You Can Touch',
    subtitle: 'If you can drop it on your foot and it hurts, it is computer hardware!',
    bullets: [
      {
        icon: '🖐️',
        title: '1. What is Hardware?',
        desc: 'All physical, tangible parts of the computer: keyboard, mouse, screen, wires, and internal chips.',
      },
      {
        icon: '🖥️',
        title: '2. The System Unit (The Big Box)',
        desc: 'The main metal/plastic case that houses the engine room: motherboard, memory, and power supply.',
      },
      {
        icon: '🧠',
        title: '3. The CPU (The Tiny Chip)',
        desc: 'NOT the big box! The CPU is a small square silicon chip inside the system unit that does all thinking.',
      },
      {
        icon: '🔌',
        title: '4. Peripherals (External Parts)',
        desc: 'Devices connected to the outside via USB cables, like mouse, keyboard, printer, and webcam.',
      },
    ],
    analogy: 'Golden Mistake: Many people point to the big computer box and say "Look at the CPU!" No! That is the System Unit. The CPU is inside!',
    teacherNotes: {
      promptQuestion: 'Ask: Can you touch software like Microsoft Word with your fingers?',
      talkingPoint: 'No! Software is instructions inside the machine. Hardware is the physical keyboard and screen you actually touch.',
      watchOutFor: 'Students calling the big case "CPU" instead of "System Unit". Correct this early and firmly.',
    },
  },

  // Slide 2: Human Body Analogy
  {
    id: 2,
    part: 'LESSON 1: HUMAN BODY TWINS',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'The Human Body Hardware Analogy',
    subtitle: 'Every part of a computer has an exact twin in the human body.',
    bullets: [
      {
        icon: '🧠',
        title: 'CPU = The Brain',
        desc: 'Processes thoughts, solves math equations, and tells every other organ what to do.',
      },
      {
        icon: '👀',
        title: 'Monitor = The Face & Eyes',
        desc: 'Expresses information and shows the world what the computer is thinking.',
      },
      {
        icon: '🖐️',
        title: 'Keyboard & Mouse = Hands',
        desc: 'Feeds instructions, words, and gestures into the computer from the outside world.',
      },
      {
        icon: '📚',
        title: 'Hard Drive = Long-Term Memory',
        desc: 'Remembers childhood memories, homework files, and pictures even when you are asleep.',
      },
    ],
    analogy: 'Human Memory Analogy: RAM is what you are holding in your hand right now. Hard Drive is your school notebook in your cupboard.',
    teacherNotes: {
      promptQuestion: 'Ask: If the CPU is the brain, what part of the computer acts as the heart pumping electricity?',
      talkingPoint: 'The Power Supply Unit (PSU) acts like the heart, pumping clean electricity through all internal wires.',
      watchOutFor: 'Students confusing the monitor with the CPU.',
    },
  },

  // Slide 3: Input Devices
  {
    id: 3,
    part: 'LESSON 2: PERIPHERAL DEVICES',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'Input Devices: The Senses of the Computer',
    subtitle: 'How you feed words, clicks, sounds, and photos into the machine.',
    bullets: [
      {
        icon: '⌨️',
        title: '1. The Keyboard (Text & Numbers)',
        desc: 'Over 100 keys including letter keys, numbers, and shortcut keys (Ctrl, Shift, Enter).',
      },
      {
        icon: '🖱️',
        title: '2. The Mouse (Pointer & Selection)',
        desc: 'Points, clicks, right-clicks for menus, and drags files across the screen.',
      },
      {
        icon: '📄',
        title: '3. The Scanner (Paper to Digital)',
        desc: 'Takes a digital snapshot of physical certificates, passport photos, and book pages.',
      },
      {
        icon: '🎙️',
        title: '4. The Microphone (Sound Input)',
        desc: 'Converts your spoken voice and classroom answers into digital audio signals.',
      },
    ],
    analogy: 'Input devices are like your eyes, ears, and mouth when you are eating: they bring outside things in!',
    teacherNotes: {
      promptQuestion: 'Ask: Is a barcode scanner at a supermarket an input device or an output device?',
      talkingPoint: 'It is an input device! It reads the lines on the milk tin and sends the price into the cash register.',
      watchOutFor: 'Students confusing touchscreen inputs with regular monitor screens.',
    },
  },

  // Slide 4: Output Devices
  {
    id: 4,
    part: 'LESSON 2: PERIPHERAL DEVICES',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'Output Devices: The Voice of the Computer',
    subtitle: 'How the computer speaks back, displays visuals, and produces physical papers.',
    bullets: [
      {
        icon: '🖥️',
        title: '1. The Monitor (Display Screen)',
        desc: 'Shows words, videos, games, and mouse pointer movements in millions of sharp colors.',
      },
      {
        icon: '🖨️',
        title: '2. The Printer (Hardcopy Output)',
        desc: 'Prints school exam slips, certificates, and lesson assignments onto physical A4 paper.',
      },
      {
        icon: '🔊',
        title: '3. Speakers & Headphones',
        desc: 'Plays sound effects, teacher video lectures, pronunciation audio, and music tracks.',
      },
      {
        icon: '📽️',
        title: '4. The Projector (Classroom Display)',
        desc: 'Beams huge images onto white walls so the entire classroom can see the teacher’s screen.',
      },
    ],
    analogy: 'Output devices are like your mouth when speaking or your hand when writing: they share information with the outside!',
    teacherNotes: {
      promptQuestion: 'Ask: What is the difference between soft copy and hard copy?',
      talkingPoint: 'Soft copy is on screen (digital); hard copy is printed on paper you can hold with your hands.',
      watchOutFor: 'Students calling printed documents "soft copies".',
    },
  },

  // Slide 5: Interactive Input/Output Sorter
  {
    id: 5,
    part: 'LESSON 2: HANDS-ON LAB',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'Practice Lab: The Peripheral Sorting Gym',
    subtitle: 'Classify each hardware device into Input, Output, or Dual-Purpose!',
    bullets: [],
    interactiveType: 'peripheral-sorting',
    teacherNotes: {
      promptQuestion: 'Challenge pairs: Partner A sorts Input devices; Partner B sorts Output devices!',
      talkingPoint: 'Notice how a Smartphone Touchscreen is BOTH Input (you tap it) and Output (it shows visuals).',
      watchOutFor: 'Students getting stuck on headphones vs speakers (both are audio output).',
    },
  },

  // Slide 6: System Unit Anatomy
  {
    id: 6,
    part: 'LESSON 3: INSIDE THE SYSTEM UNIT',
    badgeColor: 'bg-purple-950/80 text-purple-400 border-purple-800/60',
    title: 'Inside the System Unit: The Engine Room',
    subtitle: 'Take off the side panel and inspect the real electronic heart of the computer.',
    bullets: [
      {
        icon: '🟩',
        title: '1. The Motherboard (Main Circuit)',
        desc: 'The giant green board that connects every part together like a highway city system.',
      },
      {
        icon: '🔌',
        title: '2. Power Supply Unit (PSU)',
        desc: 'Converts 220V NEPA electrical current into safe, smooth low-voltage electricity.',
      },
      {
        icon: '⚡',
        title: '3. The CPU & Cooling Fan',
        desc: 'The silicon brain running calculations. It gets so hot it needs a metal radiator and fan!',
      },
      {
        icon: '📏',
        title: '4. RAM Sticks (Working Memory)',
        desc: 'Long thin green sticks that clip into the motherboard to hold active programs.',
      },
    ],
    analogy: 'The Motherboard is like the floor and roads of a busy Nigerian market: every shop and trader connects to it!',
    teacherNotes: {
      promptQuestion: 'Ask: Why does a computer need a cooling fan spinning over the CPU chip?',
      talkingPoint: 'Electricity creates heat when calculating billions of times a second. Without the fan, the chip melts!',
      watchOutFor: 'Students wanting to touch internal circuits while power is plugged in. Always unplug first!',
    },
  },

  // Slide 7: Interactive Disassembly Simulator
  {
    id: 7,
    part: 'LESSON 3: HANDS-ON LAB',
    badgeColor: 'bg-purple-950/80 text-purple-400 border-purple-800/60',
    title: 'Practice Lab: 7-Step PC Disassembly Simulator',
    subtitle: 'Safely disassemble a desktop system unit step-by-step with zero risk of shock!',
    bullets: [],
    interactiveType: 'system-unit-disassembly',
    teacherNotes: {
      promptQuestion: 'Safety First: What is step 1 before opening any computer? (Answer: Power OFF & Unplug!)',
      talkingPoint: 'Walk through ESD grounding (touching unpainted metal) to discharge static electricity before touching RAM.',
      watchOutFor: 'Students skipping the ESD grounding step.',
    },
  },

  // Slide 8: RAM vs Storage
  {
    id: 8,
    part: 'LESSON 4: STORAGE & MEMORY',
    badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    title: 'RAM vs. Hard Drive: Never Confuse Them!',
    subtitle: 'Learn why temporary working space is different from permanent filing cabinets.',
    bullets: [
      {
        icon: '⚡',
        title: '1. RAM (Temporary Working Desk)',
        desc: 'Blazing fast, holds what you are doing right now. When power turns OFF, RAM wipes clean!',
      },
      {
        icon: '🗄️',
        title: '2. Storage (Permanent Filing Cabinet)',
        desc: 'Hard Drives (HDD) and Solid State Drives (SSD) keep your files forever, even during power cuts.',
      },
      {
        icon: '💿',
        title: '3. HDD (Spinning Platters)',
        desc: 'Older mechanical magnetic disks that spin like record players; cheaper but slower.',
      },
      {
        icon: '🚀',
        title: '4. SSD (Silicon Flash Chips)',
        desc: 'Modern silent flash storage with zero moving parts. Boots laptops in 10 seconds flat!',
      },
    ],
    analogy: 'Desk Analogy: RAM is your school desk surface. When school closes, you pack papers into your locker (Hard Drive) so the desk is clean!',
    teacherNotes: {
      promptQuestion: 'Ask: If NEPA takes light suddenly, does what you were typing in RAM stay or disappear?',
      talkingPoint: 'It disappears from RAM! That is why Ctrl+S to save into Hard Drive storage is your life saver.',
      watchOutFor: 'Students thinking buying more RAM gives them more space to store downloaded movies.',
    },
  },

  // Slide 9: Byte Scale & Flash Drives
  {
    id: 9,
    part: 'LESSON 4: BYTES & CAPACITIES',
    badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    title: 'The Byte Scale: Measuring Digital Information',
    subtitle: 'From a single 0-or-1 Bit up to Gigabytes and Terabytes of storage.',
    bullets: [
      {
        icon: '0️⃣',
        title: '1. Bit (0 or 1)',
        desc: 'The smallest digital atom: an electrical switch that is either OFF (0) or ON (1).',
      },
      {
        icon: '🔢',
        title: '2. Byte (8 Bits = 1 Character)',
        desc: '8 bits grouped together stores 1 letter like "A" or 1 number like "7".',
      },
      {
        icon: '📁',
        title: '3. Kilobyte (KB) & Megabyte (MB)',
        desc: '1 KB = 1 page of text; 1 MB = 1 short song or book; 1 GB = 1 movie or 500 photos.',
      },
      {
        icon: '💾',
        title: '4. Terabyte (TB = 1,000 GB)',
        desc: 'Massive capacity: enough space to store every textbook in your entire school library!',
      },
    ],
    analogy: 'Memory Ladder: Bit is 1 grain of rice. Byte is 1 spoon. Kilobyte is 1 cup. Megabyte is 1 bowl. Gigabyte is 1 sack. Terabyte is 1 trailer truck!',
    teacherNotes: {
      promptQuestion: 'Ask: How many bits are in one single byte? (Answer: Exactly 8 bits!)',
      talkingPoint: 'Use the rice grain analogy: 8 grains make a spoon (Byte); 1,000 spoons make a sack (Gigabyte).',
      watchOutFor: 'Students confusing MB (Megabytes) with GB (Gigabytes). 1 GB = 1,024 MB.',
    },
  },

  // Slide 10: Module Complete & Quiz
  {
    id: 10,
    part: 'MODULE 2 REVIEW & CELEBRATION',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'Module 2 Complete: You Mastered Hardware!',
    subtitle: 'You understand Input, Output, the System Unit internals, and RAM vs Storage.',
    bullets: [],
    interactiveType: 'quiz-launcher',
    teacherNotes: {
      promptQuestion: 'Ask 3 verbal check questions: What is the CPU? What is the difference between RAM and SSD? Is a monitor input or output?',
      talkingPoint: 'Congratulate students on mastering computer hardware! Launch the Hardware Quiz Arena battle.',
      watchOutFor: 'Students who need quick review on RAM vs Storage differences.',
    },
  },
];
