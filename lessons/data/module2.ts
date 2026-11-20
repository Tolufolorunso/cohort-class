import {
  ModuleData,
  LessonUnit,
  ImageCard,
  KahootQuestion,
  QuizQuestion,
} from '../types/curriculum';
import { ModuleNotes, ModuleAssignment } from '../types/platform';

// -------------------------------------------------------------
// Module 2 Metadata
// -------------------------------------------------------------
export const module2Info: ModuleData = {
  id: 'module-2',
  moduleNumber: 2,
  phaseName: 'Phase 1: Foundational Digital Literacy',
  title: 'Module 2: Parts of a Computer (Hardware Lab)',
  duration: '2 Weeks · 4 Lessons (40 Minutes Per Lesson)',
  objective:
    'Master physical computer hardware identification, input/output device classifications, internal system unit disassembly, storage drive physics, byte scale conversions, and laboratory electrical safety.',
  stages: [
    {
      id: 'hardware-anatomy',
      title: 'Hardware Anatomy & Body Analogy',
      subtitle: 'Lesson 1 · Physical Components vs Software & The Human Body Analogy',
      type: 'hardware',
      teacherNotes: {
        promptQuestion:
          'Look at your desktop computer right now. If a computer were a living human being, which part would be the brain, which would be the eyes, and which would be the hands?',
        talkingPoint:
          'Hardware means any physical part of the computer that you can see, touch, and pick up. Software is the intangible instructions inside that tell the hardware what to do—like a song stored in your mind versus the plastic headphones on your ears.',
        watchOutFor:
          'Crucial pitfall: Almost every beginner calls the big metal box the "CPU". Teach them immediately that the box is the System Unit (or Case); the CPU is just the small square microchip hidden inside on the motherboard!',
        formalExamTerm:
          'Hardware Components (WAEC / NECO Senior Secondary Computer Studies)',
        analogyStory:
          'Think of a human body: the skull and body is the System Unit, the brain is the CPU, your eyes are the Monitor, your hands are the Keyboard and Mouse, and your long-term memory is the Hard Drive.',
      },
    },
    {
      id: 'input-output-lab',
      title: 'Input & Output Devices Lab',
      subtitle: 'Lesson 2 · Peripheral Classifications, Interactive Sorting & Port Anatomy',
      type: 'sorting',
      teacherNotes: {
        promptQuestion:
          'When you type on WhatsApp, is your keyboard giving instructions to the phone or receiving instructions from the phone? What about when the screen lights up with a message?',
        talkingPoint:
          'Input devices take data and commands from the outside world and push them INTO the computer (Keyboard, Mouse, Scanner, Mic). Output devices take processed results from inside the computer and present them OUT to humans (Monitor, Speakers, Printer).',
        watchOutFor:
          'Watch out for dual-function devices! Students often get confused by Touchscreens and Multi-function printers. A touchscreen is BOTH input (when your finger taps) and output (when the glass displays pixels).',
        formalExamTerm:
          'Peripheral Devices Classification (Input, Output, Storage & Dual-Function)',
        analogyStory:
          'Think of ordering food at a restaurant: Your mouth giving the order to the waiter is Input. The waiter bringing you a plate of hot jollof rice is Output!',
      },
    },
    {
      id: 'system-unit-disassembly',
      title: 'System Unit PC Disassembly',
      subtitle: 'Lesson 3 · Motherboard, CPU, RAM, PSU & 7-Step Interactive Teardown',
      type: 'disassembly',
      teacherNotes: {
        promptQuestion:
          'If we opened the metal side panel of that desktop workstation right now, what do you think we would find inside? Is it empty like a bucket or packed like an engine?',
        talkingPoint:
          'The System Unit contains 4 vital organs: The Motherboard (the nervous system / highway), the CPU (the thinking engine), RAM (the fast temporary desk space), and the Power Supply Unit (the heart pumping controlled electricity).',
        watchOutFor:
          'Safety first! Remind students never to open a computer plugged into the wall, and always discharge static electricity (ESD) by touching unpainted metal first. Static electricity from your body can instantly fry a sensitive microchip without you even feeling a shock!',
        formalExamTerm:
          'Internal System Architecture & Electrostatic Discharge (ESD) Safety Precautions',
        analogyStory:
          'The Motherboard is like a busy Nigerian market square with paved walkways connecting every shop. The CPU is the chief market manager making calculations, and the PSU is the generator providing power to every stall.',
      },
    },
    {
      id: 'storage-and-bytes',
      title: 'Storage Drives & Byte Scale',
      subtitle: 'Lesson 4 · Primary vs Secondary, HDD vs SSD, Byte Ladder & Lab Safety',
      type: 'storage',
      teacherNotes: {
        promptQuestion:
          'If NEPA suddenly takes light while you are typing an essay, why does unsaved work disappear, but your saved photos from last year remain intact?',
        talkingPoint:
          'Primary Memory (RAM) is volatile—it works at lightning speed, but everything vanishes the second power drops. Secondary Storage (Hard Drives, SSDs, Flash Drives) is non-volatile—it keeps your files permanently safe even without electricity.',
        watchOutFor:
          'Byte scale confusion: Students often mix up Bits and Bytes, or think 1 GB is 1,000,000 Bytes. Clarify the ladder: 8 Bits make 1 Byte (one letter), 1,024 Bytes make a Kilobyte, 1,024 KB makes a Megabyte, and 1,024 MB makes a Gigabyte.',
        formalExamTerm:
          'Units of Storage (Bits, Bytes, KB, MB, GB, TB) & Volatile vs. Non-Volatile Memory',
        analogyStory:
          'RAM is like the top of your school study desk: you can spread out your notebooks quickly, but at closing time the desk must be cleared. The Hard Drive is your locked metal locker: you pack your books inside and lock it; when you return next term, everything is right where you left it!',
      },
    },
    {
      id: 'module2-complete',
      title: 'Module 2 Complete!',
      subtitle: 'Hardware Mastery & Enter Live Quiz Arena Battle',
      type: 'milestone',
      teacherNotes: {
        promptQuestion:
          'Who can name the 4 main internal organs inside the System Unit from memory without looking at the slides?',
        talkingPoint:
          'Great job completing Module 2! Hardware is no longer a mystery. You understand what every wire, port, chip, and drive does. Now it\'s time to test your speed and accuracy in the Quiz Arena!',
        watchOutFor:
          'Make sure all students have their laptops ready and connected to /arena before launching the Module 2 Question Pack on the projector.',
        formalExamTerm:
          'Hardware Diagnostics & Module Mastery Evaluation',
        analogyStory:
          'You went from merely pressing buttons on a computer to knowing the exact anatomy of the machine—just like a medical doctor understanding the human body!',
      },
    },
  ],
};

// -------------------------------------------------------------
// 4 Lesson Units Breakdown (from module-2.md)
// -------------------------------------------------------------
export const module2Lessons: LessonUnit[] = [
  {
    id: 'lesson-2-1',
    lessonNumber: 1,
    title: 'Introduction to Computer Hardware',
    duration: '40 minutes',
    objective:
      'Identify physical hardware parts, distinguish hardware from software, understand the human body hardware analogy, and inspect the 6 main external desktop parts.',
    summary:
      'Students learn that hardware represents the physical parts of a computer that can be seen and touched. Through the human body analogy, students see how the CPU functions like a brain, the monitor like eyes, and keyboard/mouse like hands.',
    topics: [
      'What is Computer Hardware (Definition & Simple English)',
      'Understanding Hardware Through the Human Body',
      'The 6 Main External Parts of a Desktop Workstation',
      'Monitor, Keyboard, Mouse, System Unit, Speakers, and Webcam',
      'Difference Between the System Unit and the CPU',
    ],
  },
  {
    id: 'lesson-2-2',
    lessonNumber: 2,
    title: 'Input and Output Devices',
    duration: '40 minutes',
    objective:
      'Classify computer peripherals into input and output categories, explore dual-function devices like touchscreens, and learn peripheral port connectors.',
    summary:
      'Students explore how input devices send data and commands into the computer (keyboard, mouse, scanner, microphone, webcam), while output devices present processed results back to humans (monitor, printer, speakers, projector).',
    topics: [
      'Understanding Input Devices (Data and Command Entry)',
      'Keyboard, Mouse, Scanner, Microphone, and Touchscreen',
      'Understanding Output Devices (Presenting Information to Humans)',
      'Soft Copy (Monitor, Projector) vs Hard Copy (Printer)',
      'Input vs Output Comparison & Laboratory Cable Ports (USB, HDMI, Audio)',
    ],
  },
  {
    id: 'lesson-2-3',
    lessonNumber: 3,
    title: 'The System Unit and Its Internal Components',
    duration: '40 minutes',
    objective:
      'Examine the internal anatomy of the computer case, understand the motherboard, CPU, RAM, power supply, and cooling system, and simulate safe PC disassembly.',
    summary:
      'Students open the computer tower virtually. They discover the Motherboard that connects all parts, the CPU that executes calculations, RAM that holds active apps, the Power Supply Unit that distributes electricity, and cooling fans.',
    topics: [
      'Inside the Computer Case (What is the System Unit?)',
      'Motherboard: The Central Circuit Highway',
      'CPU (Central Processing Unit): The Master Brain',
      'RAM (Random Access Memory): Fast Temporary Workspace',
      'Power Supply Unit (PSU) & Cooling Fans',
      'Hands-On PC Disassembly Simulation & Electrostatic Discharge (ESD) Safety',
    ],
  },
  {
    id: 'lesson-2-4',
    lessonNumber: 4,
    title: 'Computer Storage Devices and Hardware Practical',
    duration: '40 minutes',
    objective:
      'Distinguish primary from secondary storage, compare mechanical Hard Disk Drives (HDD) with Solid State Drives (SSD), learn the Byte conversion ladder, and practice lab safety.',
    summary:
      'Students explore permanent storage devices: HDDs with magnetic platters, SSDs with high-speed microchips, USB flash drives, and memory cards. They master the Byte scale (Bit -> Byte -> KB -> MB -> GB -> TB) and electrical surge protection.',
    topics: [
      'Primary Storage (RAM) vs Secondary Permanent Storage',
      'Hard Disk Drive (HDD) Mechanical Platters vs Solid State Drive (SSD) Chips',
      'Portable Storage: USB Flash Drives and SD Memory Cards',
      'Understanding Storage Capacity: The Byte Ladder (Bit, Byte, KB, MB, GB, TB)',
      'Real-World File Sizes (Text, Songs, Movies)',
      'Laboratory Hardware Safety, Dust Protection, and NEPA Voltage Stabilizers',
    ],
  },
];

// -------------------------------------------------------------
// Cultural Visual Assets (Strict African Representation + Labeled Hardware)
// -------------------------------------------------------------
export const module2ImageCards: ImageCard[] = [
  {
    id: 'african-students-hardware-inspection',
    title: 'Nigerian Secondary Students Inspecting Hardware',
    caption:
      'Students in a Nigerian computer laboratory examining desktop components and learning internal computer assembly.',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'school',
    badge: 'Lab Practical',
  },
  {
    id: 'african-teacher-hardware-demo',
    title: 'ICT Instructor Demonstrating System Unit Parts',
    caption:
      'An African computer science teacher pointing to the motherboard and RAM slots inside an opened desktop system unit.',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'school',
    badge: 'Instructor Demo',
  },
  {
    id: 'monitor-desktop-display',
    title: 'Computer Monitor (Output Screen)',
    caption:
      'An LED monitor displaying student lesson notes. It translates electronic signals into visual text, images, and videos.',
    url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'monitor',
    badge: 'Visual Output',
  },
  {
    id: 'keyboard-ergonomic-keys',
    title: 'Computer Keyboard (QWERTY Input)',
    caption:
      'Standard desktop keyboard with alphanumeric keys, function keys, and number pad for typing instructions.',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'keyboard',
    badge: 'Text Input',
  },
  {
    id: 'mouse-optical-sensor',
    title: 'Optical Computer Mouse',
    caption:
      'Desktop mouse with left button, right button, and scroll wheel for precision screen pointing and clicking.',
    url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'mouse',
    badge: 'Pointing Input',
  },
  {
    id: 'system-unit-chassis',
    title: 'The System Unit (Tower Case)',
    caption:
      'The sturdy desktop chassis containing the motherboard, processor, memory modules, and power supply.',
    url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'desktop',
    badge: 'Core Housing',
  },
  {
    id: 'motherboard-mainboard',
    title: 'Motherboard (Main Circuit Board)',
    caption:
      'The primary printed circuit board with copper electrical bus pathways connecting the CPU, RAM, and storage.',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'motherboard',
    badge: 'Central Backbone',
  },
  {
    id: 'cpu-microprocessor-chip',
    title: 'Central Processing Unit (CPU Microprocessor)',
    caption:
      'The silicon microprocessor chip with millions of microscopic transistors that acts as the brain of the computer.',
    url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'cpu',
    badge: 'The Brain',
  },
  {
    id: 'ram-memory-stick',
    title: 'Random Access Memory (RAM Module)',
    caption:
      'High-speed DDR RAM memory stick with gold contact pins for holding currently active programs and open files.',
    url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'ram',
    badge: 'Fast Workspace',
  },
  {
    id: 'power-supply-unit-psu',
    title: 'Power Supply Unit (PSU)',
    caption:
      'The electrical unit converting high-voltage AC wall power into safe, regulated low-voltage DC electricity.',
    url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'psu',
    badge: 'Power Generator',
  },
  {
    id: 'hard-disk-drive-hdd',
    title: 'Hard Disk Drive (Mechanical Magnetic HDD)',
    caption:
      'Traditional internal hard drive showing magnetic platters and read/write actuator arm for high-capacity storage.',
    url: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'harddrive',
    badge: 'Magnetic Storage',
  },
  {
    id: 'solid-state-drive-ssd',
    title: 'Solid State Drive (Flash Silicon SSD)',
    caption:
      'Modern solid-state drive with zero moving parts, delivering 5x faster file loading than traditional spinning disks.',
    url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'ssd',
    badge: 'Lightning Fast',
  },
  {
    id: 'usb-flash-drive',
    title: 'USB Flash Drive (Thumb Drive)',
    caption:
      'Pocket-sized flash memory drive with USB connector for carrying school projects, documents, and multimedia.',
    url: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'flashdrive',
    badge: 'Pocket Storage',
  },
  {
    id: 'printer-hard-copy',
    title: 'Computer Printer (Hard Copy Output)',
    caption:
      'Laser printer producing printed hard copies on paper for school report cards, examination papers, and letters.',
    url: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1000&q=80',
    fallbackType: 'printer',
    badge: 'Hard Copy Output',
  },
];

// -------------------------------------------------------------
// Human Body Hardware Analogy Mappings (Lesson 1)
// -------------------------------------------------------------
export interface BodyAnalogyItem {
  id: string;
  bodyPart: string;
  computerPart: string;
  roleDescription: string;
  simpleEnglishNote: string;
  icon: string;
}

export const humanBodyAnalogies: BodyAnalogyItem[] = [
  {
    id: 'brain-cpu',
    bodyPart: 'Human Brain',
    computerPart: 'Central Processing Unit (CPU)',
    roleDescription:
      'Your brain thinks, calculates math, and makes decisions for your entire body. The CPU does all calculations, executes instructions, and commands all computer parts.',
    simpleEnglishNote:
      'Just as you cannot think without your brain, a computer cannot calculate or run a single app without its CPU.',
    icon: '🧠',
  },
  {
    id: 'eyes-monitor',
    bodyPart: 'Human Eyes',
    computerPart: 'Computer Monitor',
    roleDescription:
      'Your eyes allow you to see what is happening in the world. The monitor allows you to visually see what the computer is thinking and showing.',
    simpleEnglishNote:
      'Without your eyes you are in darkness. Without the monitor, the computer may be running, but you cannot see what it is doing.',
    icon: '👀',
  },
  {
    id: 'hands-keyboard-mouse',
    bodyPart: 'Human Hands & Fingers',
    computerPart: 'Keyboard & Mouse',
    roleDescription:
      'You use your hands to write letters, pick up tools, and point at objects. You use the keyboard to type words and the mouse to point and click on screen.',
    simpleEnglishNote:
      'Your hands give physical actions to the world. The keyboard and mouse give your instructions to the computer.',
    icon: '✍️',
  },
  {
    id: 'ears-speakers',
    bodyPart: 'Ears & Mouth',
    computerPart: 'Microphone (In) & Speakers (Out)',
    roleDescription:
      'Your ears listen to sound (input) and your mouth speaks sound (output). A microphone captures sound into the computer, and speakers play sound out for you to hear.',
    simpleEnglishNote:
      'When an online teacher speaks, the sound travels into their microphone and comes out through your laboratory speakers.',
    icon: '👂',
  },
  {
    id: 'working-memory-ram',
    bodyPart: 'Short-Term Working Memory',
    computerPart: 'Random Access Memory (RAM)',
    roleDescription:
      'When your teacher tells you a phone number to write down, your brain holds it for a few seconds. RAM holds the apps you are currently using right now.',
    simpleEnglishNote:
      'When you sleep at night, your short-term thoughts clear. When NEPA takes light or you turn off the PC, RAM clears completely!',
    icon: '⚡',
  },
  {
    id: 'long-term-memory-storage',
    bodyPart: 'Permanent Long-Term Memory',
    computerPart: 'Hard Drive & SSD (Storage)',
    roleDescription:
      'Your permanent memory remembers your name, family, and home address forever. A hard drive or SSD saves your school files, photos, and Windows operating system forever.',
    simpleEnglishNote:
      'Even when power is disconnected for months, your files stay completely safe on the hard drive or SSD.',
    icon: '💾',
  },
  {
    id: 'skeleton-blood-motherboard',
    bodyPart: 'Skeleton & Nervous System',
    computerPart: 'The Motherboard',
    roleDescription:
      'Your skeleton holds your body together, and your nerves connect your brain to your fingers. The motherboard holds every part and connects them with copper wire buses.',
    simpleEnglishNote:
      'The motherboard is the big green foundation. Every single part (CPU, RAM, Mouse, Screen) plugs into it.',
    icon: '🦴',
  },
  {
    id: 'heart-stomach-psu',
    bodyPart: 'Heart & Blood Circulation',
    computerPart: 'Power Supply Unit (PSU)',
    roleDescription:
      'Your heart pumps blood and energy to your brain, hands, and legs. The PSU takes electricity from the wall socket and pumps safe power to every chip and drive.',
    simpleEnglishNote:
      'If the heart stops, the body stops. If the PSU fails or is unplugged, the computer immediately turns off.',
    icon: '❤️',
  },
];

// -------------------------------------------------------------
// Peripheral Port Connectors (Lesson 2)
// -------------------------------------------------------------
export interface PortConnectorItem {
  id: string;
  name: string;
  fullName: string;
  shapeDescription: string;
  commonUses: string;
  speedOrFeature: string;
  colorCode: string;
}

export const peripheralPorts: PortConnectorItem[] = [
  {
    id: 'port-usb-a',
    name: 'USB-A Port',
    fullName: 'Universal Serial Bus (Type A)',
    shapeDescription: 'Rectangular slot with a plastic tongue on one side',
    commonUses: 'Connecting keyboards, mice, flash drives, printers, and webcams',
    speedOrFeature: 'Standard connector on virtually all desktop computers worldwide',
    colorCode: 'text-blue-400 bg-blue-950/60 border-blue-800/80',
  },
  {
    id: 'port-usb-c',
    name: 'USB-C Port',
    fullName: 'Universal Serial Bus (Type C)',
    shapeDescription: 'Small oval reversible slot (plugs in upside down or right side up)',
    commonUses: 'Modern laptops, Android smartphones, fast SSDs, and power charging',
    speedOrFeature: 'Ultra high-speed data transfer up to 40 Gbps and reversible orientation',
    colorCode: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80',
  },
  {
    id: 'port-hdmi',
    name: 'HDMI Port',
    fullName: 'High-Definition Multimedia Interface',
    shapeDescription: 'Trapezoid slot with angled bottom corners',
    commonUses: 'Connecting the computer to modern LED monitors, classroom projectors, and TVs',
    speedOrFeature: 'Carries both high-definition video and multi-channel audio in one single cable',
    colorCode: 'text-purple-400 bg-purple-950/60 border-purple-800/80',
  },
  {
    id: 'port-vga',
    name: 'VGA Port',
    fullName: 'Video Graphics Array',
    shapeDescription: 'Classic blue trapezoid port with 15 tiny pin holes and two screw locks',
    commonUses: 'Older desktop monitors and older classroom projectors',
    speedOrFeature: 'Analog video signal only (no audio - requires separate sound cable)',
    colorCode: 'text-amber-400 bg-amber-950/60 border-amber-800/80',
  },
  {
    id: 'port-audio-jack',
    name: '3.5mm Audio Jack',
    fullName: '3.5mm TRS Audio Connector',
    shapeDescription: 'Small circular pin hole (Green for headphones/speakers, Pink for microphone)',
    commonUses: 'Connecting lab headphones, external speakers, and recording microphones',
    speedOrFeature: 'Color-coded standard: Green = Audio Out (Speakers), Pink = Audio In (Mic)',
    colorCode: 'text-pink-400 bg-pink-950/60 border-pink-800/80',
  },
  {
    id: 'port-power-iec',
    name: 'AC Power Inlet',
    fullName: 'IEC C14 3-Pin Power Connector',
    shapeDescription: 'Heavy-duty 3-pin socket on the back of the Power Supply Unit',
    commonUses: 'Connecting the thick black power cord from the wall socket or UPS stabilizer',
    speedOrFeature: 'Always unplug this cable FIRST before opening the system unit!',
    colorCode: 'text-red-400 bg-red-950/60 border-red-800/80',
  },
];

// -------------------------------------------------------------
// Interactive PC Disassembly Simulator Steps (Lesson 3)
// -------------------------------------------------------------
export interface DisassemblyStep {
  stepNumber: number;
  title: string;
  actionPrompt: string;
  safetyCaution: string;
  africanStudentTip: string;
  componentRevealed: string;
  componentRole: string;
  icon: string;
  status: 'locked' | 'active' | 'inspected';
}

export const disassemblySteps: DisassemblyStep[] = [
  {
    stepNumber: 1,
    title: 'Safety First: Power Off & Static Discharge (ESD)',
    actionPrompt: 'Unplug the black 3-pin power cord and touch the bare metal computer frame.',
    safetyCaution:
      'CRITICAL: Never open a computer while plugged into the wall! Electricity from NEPA can shock you, and static electricity on your fingers can burn delicate chips.',
    africanStudentTip:
      'Adewale says: Touch the bare unpainted metal case with both hands to safely discharge static electricity before touching any green circuit board.',
    componentRevealed: 'Rear Power Inlet & Chassis Grounding',
    componentRole: 'Disconnects 220V wall electricity to make the workstation 100% safe to inspect.',
    icon: '🔌',
    status: 'active',
  },
  {
    stepNumber: 2,
    title: 'Open the Side Panel (Accessing the Interior)',
    actionPrompt: 'Unscrew the two rear thumb screws and gently slide off the metal side panel.',
    safetyCaution:
      'Do not force or bend the metal panel. Slide it straight back along the chassis track.',
    africanStudentTip:
      'Chioma says: Keep your screws in a small plastic container or cup so they do not roll onto the laboratory floor and get lost!',
    componentRevealed: 'Open Computer Interior Bay',
    componentRole: 'Exposes all internal hardware components inside their protective steel cage.',
    icon: '🪛',
    status: 'locked',
  },
  {
    stepNumber: 3,
    title: 'Inspect the Motherboard (Main Circuit Highway)',
    actionPrompt: 'Observe the large printed circuit board mounted flat against the chassis wall.',
    safetyCaution:
      'Never touch the delicate micro-copper lines with metal screwdrivers; scratches break electrical pathways.',
    africanStudentTip:
      'Blessing says: The motherboard is like the map of Lagos or Ibadan highways. It has thousands of tiny copper tracks connecting every single part together.',
    componentRevealed: 'Motherboard & Bus Pathways',
    componentRole: 'Distributes signals, electricity, and communication between CPU, RAM, and storage.',
    icon: '🗺️',
    status: 'locked',
  },
  {
    stepNumber: 4,
    title: 'Inspect the CPU & Cooling Fan Assembly',
    actionPrompt: 'Examine the central heat sink fan and learn how the CPU processor stays cool.',
    safetyCaution:
      'The CPU gets extremely hot (over 70°C). The aluminum fins and fan pull dangerous heat away.',
    africanStudentTip:
      'Tunde says: Underneath that fan is the CPU silicon square. It is the real brain! Many people mistakenly call the big box the CPU, but the CPU is actually a small square chip inside!',
    componentRevealed: 'Central Processing Unit (CPU) & Fan',
    componentRole: 'Performs all mathematical logic, runs operating system code, and controls peripherals.',
    icon: '🌀',
    status: 'locked',
  },
  {
    stepNumber: 5,
    title: 'Unclip and Inspect a RAM Memory Module',
    actionPrompt: 'Press down outward on the dual plastic latches to pop up the RAM stick.',
    safetyCaution:
      'Always hold RAM sticks by their plastic edges! Never touch the gold contacts with sweaty fingers.',
    africanStudentTip:
      'Amina says: Notice the small notch on the bottom gold edge. It prevents you from inserting the RAM upside down! It only clicks in one correct direction.',
    componentRevealed: 'DDR RAM Stick (Random Access Memory)',
    componentRole: 'Temporary high-speed desk space where the computer keeps your currently open windows.',
    icon: '📏',
    status: 'locked',
  },
  {
    stepNumber: 6,
    title: 'Trace Storage Cables to the Hard Drive / SSD',
    actionPrompt: 'Follow the flat red SATA data cable from the motherboard to the storage drive cage.',
    safetyCaution:
      'Do not yank cables violently. Press the small metal clip on the SATA plug before pulling gently.',
    africanStudentTip:
      'Emeka says: The storage drive has two cables: one thin cable for data (to motherboard) and one wider cable for electricity (from power supply).',
    componentRevealed: 'Hard Disk Drive (HDD) / Solid State Drive (SSD)',
    componentRole: 'Permanent library where school documents, pictures, and Windows remain safe forever.',
    icon: '💽',
    status: 'locked',
  },
  {
    stepNumber: 7,
    title: 'Examine the Power Supply Unit (PSU)',
    actionPrompt: 'Locate the heavy metal box in the corner with a bundle of multi-colored cables.',
    safetyCaution:
      'NEVER unscrew or open the metal casing of the PSU itself! High-voltage capacitors inside retain electrical charge even after unplugging.',
    africanStudentTip:
      'Instructor Isaac says: The PSU is the generator of the PC. It converts high-voltage alternating current (AC) into safe 12V and 5V direct current (DC) for the motherboard chips.',
    componentRevealed: 'Power Supply Unit (PSU)',
    componentRole: 'Powers every internal component safely and reliably.',
    icon: '⚡',
    status: 'locked',
  },
];

// -------------------------------------------------------------
// Storage Devices & The Byte Scale (Lesson 4)
// -------------------------------------------------------------
export interface ByteScaleTier {
  id: string;
  name: string;
  abbreviation: string;
  exactEquivalent: string;
  simpleFormula: string;
  everydayAnalogy: string;
  realWorldExample: string;
  icon: string;
}

export const byteScaleTiers: ByteScaleTier[] = [
  {
    id: 'scale-bit',
    name: 'Bit (Binary Digit)',
    abbreviation: 'b',
    exactEquivalent: 'Single 0 or 1',
    simpleFormula: '1 on/off electrical switch',
    everydayAnalogy: 'Like flipping a light switch up (ON) or down (OFF)',
    realWorldExample: 'The smallest possible atom of computer information.',
    icon: '💡',
  },
  {
    id: 'scale-byte',
    name: 'Byte',
    abbreviation: 'B',
    exactEquivalent: '8 Bits combined',
    simpleFormula: '8 bits = 1 letter or character',
    everydayAnalogy: 'Typing single letter "A" on your keyboard uses exactly 1 Byte',
    realWorldExample: 'Word "NIGERIA" = 7 characters = 7 Bytes of memory.',
    icon: '🔤',
  },
  {
    id: 'scale-kilobyte',
    name: 'Kilobyte',
    abbreviation: 'KB',
    exactEquivalent: '1,024 Bytes',
    simpleFormula: 'About 1 thousand bytes',
    everydayAnalogy: 'A 1-page typed homework essay in Microsoft Word',
    realWorldExample: 'A short plain text email or WhatsApp text message (~2 KB).',
    icon: '📄',
  },
  {
    id: 'scale-megabyte',
    name: 'Megabyte',
    abbreviation: 'MB',
    exactEquivalent: '1,024 Kilobytes (About 1 million bytes)',
    simpleFormula: '1,024 KB = 1 MB',
    everydayAnalogy: 'One high-quality Afrobeat song (MP3 audio file)',
    realWorldExample: 'One nice photo taken with your smartphone camera (~3 to 5 MB).',
    icon: '🎵',
  },
  {
    id: 'scale-gigabyte',
    name: 'Gigabyte',
    abbreviation: 'GB',
    exactEquivalent: '1,024 Megabytes (About 1 billion bytes)',
    simpleFormula: '1,024 MB = 1 GB',
    everydayAnalogy: 'One full-length high-definition Nollywood movie (~1.5 GB)',
    realWorldExample: 'Your school laptop RAM capacity (4 GB or 8 GB).',
    icon: '🎬',
  },
  {
    id: 'scale-terabyte',
    name: 'Terabyte',
    abbreviation: 'TB',
    exactEquivalent: '1,024 Gigabytes (About 1 trillion bytes)',
    simpleFormula: '1,024 GB = 1 TB',
    everydayAnalogy: 'An entire school library filled with thousands of books and movies',
    realWorldExample: 'A modern external backup hard drive holding 1,000 full movies!',
    icon: '📚',
  },
];

// -------------------------------------------------------------
// 15 Pre-Generated Kahoot Review Questions (from module-2.md Section A)
// -------------------------------------------------------------
export const module2KahootQuestions: KahootQuestion[] = [
  {
    id: 1,
    question: 'Computer hardware refers to:',
    options: [
      'Computer programs',
      'Physical parts of a computer you can see and touch',
      'Internet websites and web pages',
      'Computer instructions and code',
    ],
    correctIndex: 1,
    explanation:
      'Hardware refers to the physical parts of a computer that can be seen and touched, such as the keyboard, monitor, and mouse.',
    topic: 'Hardware Basics',
    timeLimitSeconds: 20,
  },
  {
    id: 2,
    question: 'Which of the following is an input device?',
    options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'],
    correctIndex: 2,
    explanation:
      'A keyboard is an input device used to enter letters, numbers, and commands into the computer.',
    topic: 'Input Devices',
    timeLimitSeconds: 20,
  },
  {
    id: 3,
    question: 'Which device displays information visually from a computer?',
    options: ['Mouse', 'Monitor', 'Scanner', 'Microphone'],
    correctIndex: 1,
    explanation:
      'A monitor is an output device that visually displays text, images, and videos on a screen.',
    topic: 'Output Devices',
    timeLimitSeconds: 20,
  },
  {
    id: 4,
    question: 'The letters CPU stand for:',
    options: [
      'Central Processing Unit',
      'Computer Processing Utility',
      'Central Program Unit',
      'Computer Power Unit',
    ],
    correctIndex: 0,
    explanation:
      'CPU stands for Central Processing Unit. It is the primary microprocessor chip that performs calculations and instructions.',
    topic: 'System Unit Internals',
    timeLimitSeconds: 20,
  },
  {
    id: 5,
    question: 'Which component connects all major internal parts of a computer together?',
    options: ['Keyboard', 'Motherboard', 'Monitor', 'Printer'],
    correctIndex: 1,
    explanation:
      'The motherboard is the main circuit board that connects the CPU, RAM, storage drives, and expansion cards.',
    topic: 'Motherboard',
    timeLimitSeconds: 20,
  },
  {
    id: 6,
    question: 'Which component is commonly called the "brain" of the computer?',
    options: ['RAM', 'CPU', 'Hard Disk Drive', 'Monitor'],
    correctIndex: 1,
    explanation:
      'The CPU (Central Processing Unit) is called the brain of the computer because it processes data and makes logical decisions.',
    topic: 'CPU',
    timeLimitSeconds: 20,
  },
  {
    id: 7,
    question: 'Which of the following is temporary, volatile memory that clears when power goes off?',
    options: ['Solid State Drive (SSD)', 'Hard Disk Drive (HDD)', 'RAM (Random Access Memory)', 'USB Flash Drive'],
    correctIndex: 2,
    explanation:
      'RAM is volatile temporary memory. It holds active programs while the computer is on, but clears completely when power is disconnected.',
    topic: 'RAM Memory',
    timeLimitSeconds: 20,
  },
  {
    id: 8,
    question: 'Which device produces a physical "hard copy" on sheets of paper?',
    options: ['Printer', 'Mouse', 'Monitor', 'Webcam'],
    correctIndex: 0,
    explanation:
      'A printer produces a physical hard copy on paper, while a monitor produces a temporary soft copy on screen.',
    topic: 'Printers & Output',
    timeLimitSeconds: 20,
  },
  {
    id: 9,
    question: 'Which device is used to capture sound into a computer?',
    options: ['Monitor', 'Printer', 'Microphone', 'Speaker'],
    correctIndex: 2,
    explanation:
      'A microphone is an audio input device that captures human voice and environmental sounds.',
    topic: 'Audio Peripherals',
    timeLimitSeconds: 20,
  },
  {
    id: 10,
    question: 'Which storage device uses spinning magnetic platters to record data?',
    options: ['Solid State Drive (SSD)', 'Hard Disk Drive (HDD)', 'RAM', 'CPU'],
    correctIndex: 1,
    explanation:
      'A traditional Hard Disk Drive (HDD) contains mechanical spinning magnetic platters and read/write heads.',
    topic: 'Storage Devices',
    timeLimitSeconds: 20,
  },
  {
    id: 11,
    question: 'Which modern storage device has NO moving mechanical parts and is much faster?',
    options: ['Hard Disk Drive (HDD)', 'Solid State Drive (SSD)', 'DVD Drive', 'Floppy Disk Drive'],
    correctIndex: 1,
    explanation:
      'A Solid State Drive (SSD) stores data on silent electronic flash memory chips with zero moving parts, making it 5x faster than an HDD.',
    topic: 'SSD Storage',
    timeLimitSeconds: 20,
  },
  {
    id: 12,
    question: 'Which small portable device is commonly used to transfer files between laptops?',
    options: ['Monitor', 'Keyboard', 'USB Flash Drive', 'Speaker'],
    correctIndex: 2,
    explanation:
      'A USB flash drive (thumb drive) is small, portable, and plugs into any computer to transfer files easily.',
    topic: 'Portable Storage',
    timeLimitSeconds: 20,
  },
  {
    id: 13,
    question: 'Which of the following is an output device used to project slides on a wall?',
    options: ['Scanner', 'Keyboard', 'Mouse', 'Projector'],
    correctIndex: 3,
    explanation:
      'A projector is an output device that displays computer screen images on a large wall or projector screen for the whole class to see.',
    topic: 'Projectors',
    timeLimitSeconds: 20,
  },
  {
    id: 14,
    question: 'Which device can perform BOTH input and output functions at the same time?',
    options: ['Touchscreen', 'Standard Keyboard', 'Speakers', 'Mouse'],
    correctIndex: 0,
    explanation:
      'A touchscreen displays visual information (output) while simultaneously detecting your finger touches (input).',
    topic: 'Dual-Function Peripherals',
    timeLimitSeconds: 20,
  },
  {
    id: 15,
    question: 'Which component converts high-voltage AC wall power into safe DC electricity for the PC?',
    options: ['CPU', 'RAM', 'Power Supply Unit (PSU)', 'Motherboard'],
    correctIndex: 2,
    explanation:
      'The Power Supply Unit (PSU) converts high-voltage electricity from the wall outlet into low-voltage DC power for computer chips.',
    topic: 'Power Supply',
    timeLimitSeconds: 20,
  },
];

export const module2QuizQuestions: QuizQuestion[] = module2KahootQuestions.map((q) => ({
  id: q.id,
  question: q.question,
  options: [...q.options],
  correctIndex: q.correctIndex,
  explanation: q.explanation,
  topic: q.topic,
}));

// -------------------------------------------------------------
// Module 2 Student Notes (Copy-Notes View)
// -------------------------------------------------------------
export const module2Notes: ModuleNotes = {
  moduleId: 'module-2',
  moduleTitle: 'Module 2: Parts of a Computer (Hardware Guide)',
  phaseName: 'Phase 1: Foundational Digital Literacy',
  summary:
    'Complete student notebook transcriptions for Module 2. Students should copy these definitions, hardware summaries, and safety rules into their physical computer science notebooks.',
  sections: [
    {
      id: 'section-2-1',
      title: '1. Introduction to Computer Hardware',
      summary: 'Understanding the physical parts of a computer and the human body comparison.',
      keyTakeaway:
        'Computer hardware refers to the physical components of a computer system that can be seen, touched, and held.',
      points: [
        'Hardware is physical: If you can physically touch it (keyboard, mouse, monitor, case), it is hardware.',
        'Software is non-physical: Programs, apps, games, and Windows are software (you cannot touch them with your hands).',
        '6 Main External Desktop Parts: Monitor (screen), Keyboard (typing), Mouse (pointing), System Unit (box housing components), Speakers (sound), and Webcam (camera).',
        'Human Body Analogy: Brain = CPU; Eyes = Monitor; Hands = Keyboard/Mouse; Ears = Speakers; Memory = Storage; Skeleton = Motherboard; Heart = Power Supply Unit (PSU).',
        'Important distinction: The big computer box is called the System Unit, NOT the CPU! The CPU is a small microprocessor chip mounted inside the system unit.',
      ],
    },
    {
      id: 'section-2-2',
      title: '2. Input and Output Devices',
      summary: 'Peripherals that enter data versus peripherals that present processed results.',
      keyTakeaway:
        'Input devices send data and commands into the computer; Output devices present processed results back to humans.',
      points: [
        'Input Devices: Keyboard (letters & numbers), Mouse (point & click), Scanner (paper to digital image), Microphone (captures voice), Webcam (captures video).',
        'Output Devices: Monitor (visual display on screen), Printer (produces paper hard copy), Speakers & Headphones (audio sound), Projector (large wall display).',
        'Soft Copy vs Hard Copy: A soft copy is an electronic display on a screen (temporary); A hard copy is printed on paper (permanent physical copy).',
        'Dual-Function Devices: A Touchscreen performs both output (showing graphics) and input (detecting finger touches).',
        'Peripheral Ports: USB (universal cable for mouse/keyboard/flash drive), HDMI (high-definition video and sound), VGA (older 15-pin analog video), 3.5mm Jack (audio).',
      ],
    },
    {
      id: 'section-2-3',
      title: '3. The System Unit & Internal Components',
      summary: 'The main internal components that make a computer think, calculate, and operate.',
      keyTakeaway:
        'The System Unit is the protective housing containing the Motherboard, CPU, RAM, Power Supply, and Storage drives.',
      points: [
        'Motherboard: The main printed circuit board containing electrical tracks (buses) connecting every component together.',
        'CPU (Central Processing Unit): The primary microprocessor that executes instructions and performs mathematical calculations. Known as the "brain".',
        'RAM (Random Access Memory): Fast temporary memory that holds programs currently running. Volatile: it completely erases when power is turned off!',
        'Power Supply Unit (PSU): Converts high-voltage AC electricity from the wall outlet into regulated low-voltage DC power for computer chips.',
        'Cooling System: Heat sinks (aluminum fins) and fans prevent the CPU and chips from overheating during intense work.',
        'Lab Safety Rule: Always unplug the power cable from the wall and touch the unpainted metal chassis to discharge static electricity before touching internal parts.',
      ],
    },
    {
      id: 'section-2-4',
      title: '4. Computer Storage Devices & The Byte Scale',
      summary: 'Permanent secondary storage mechanisms and memory capacity mathematics.',
      keyTakeaway:
        'Storage devices retain computer data permanently even when the computer is shut down and disconnected from electricity.',
      points: [
        'Primary Storage (RAM): Extremely fast, temporary, volatile (loses data on power loss).',
        'Secondary Storage: Permanent, non-volatile (keeps data safe without electricity).',
        'Hard Disk Drive (HDD): Uses spinning magnetic platters and mechanical read/write arms. High capacity at low cost, but sensitive to drops.',
        'Solid State Drive (SSD): Uses electronic flash memory chips with zero moving parts. 5 times faster than HDDs, silent, and shock resistant.',
        'Portable Storage: USB flash drives (thumb drives) and SD memory cards for carrying school files in your pocket.',
        'The Byte Ladder: 1 Byte = 8 Bits = 1 letter; 1 Kilobyte (KB) = 1,024 Bytes (~1 page text); 1 Megabyte (MB) = 1,024 KB (~1 Afrobeat song); 1 Gigabyte (GB) = 1,024 MB (~1 movie); 1 Terabyte (TB) = 1,024 GB (~1,000 movies).',
      ],
    },
    {
      id: 'section-2-5',
      title: '5. Computer Laboratory Care & Maintenance',
      summary: 'Practical guidelines for keeping computers healthy in a Nigerian classroom.',
      keyTakeaway:
        'Proper care, clean hands, dust covers, and voltage surge protection prevent hardware breakdown.',
      points: [
        'No food or pure water near computers: Liquid spills cause electrical short circuits that permanently destroy circuit boards.',
        'Protect from NEPA power surges: Always connect computers to an Uninterruptible Power Supply (UPS) or voltage stabilizer.',
        'Dust prevention: Cover computer monitors and system units with dust covers when not in use.',
        'Proper shutdown: Always click Start -> Shut Down in Windows. Never pull the power plug out of the wall while the computer is still on!',
        'Gentle handling: Never bang keyboard keys or slam the mouse onto the desk.',
      ],
    },
  ],
};

// -------------------------------------------------------------
// Module 2 Assignment (Practical & Homework)
// -------------------------------------------------------------
export const module2Assignment: ModuleAssignment = {
  moduleId: 'module-2',
  moduleTitle: 'Module 2 Laboratory & Homework Assignment',
  instructions:
    'Complete this assignment either individually or as Equal Lab Partners. Discuss answers with your lab partner, type your responses clearly into each answer box, and submit for teacher evaluation.',
  questions: [
    {
      id: 1,
      prompt:
        'Define computer hardware in simple English, and mention five physical hardware components found on your laboratory desk.',
      guidance:
        'Explain what hardware means in your own words (not just memorized words), and list 5 distinct hardware parts you can see right now.',
      placeholder:
        'Hardware means the physical parts of a computer that I can see and touch...\n1. ...\n2. ...\n3. ...\n4. ...\n5. ...',
    },
    {
      id: 2,
      prompt:
        'Explain the difference between RAM and a Hard Disk Drive (or SSD) using the classroom "Desk vs Locker" analogy.',
      guidance:
        'Describe what happens to files on RAM when power goes off compared to files saved on a hard drive.',
      placeholder:
        'RAM is like the top of my study desk because...\nWhile a Hard Disk Drive is like a locked school locker because...\nWhen NEPA takes power, what happens is...',
    },
    {
      id: 3,
      prompt:
        'Classify each of the following devices as either INPUT, OUTPUT, or STORAGE:\n(a) Supermarket Barcode Scanner\n(b) Classroom Ceiling Projector\n(c) USB Flash Drive\n(d) Microphone\n(e) Color Laser Printer',
      guidance:
        'Write each letter (a to e), the name of the device, and whether it is Input, Output, or Storage with a 1-sentence reason.',
      placeholder:
        '(a) Barcode Scanner: ... because ...\n(b) Classroom Projector: ... because ...\n(c) USB Flash Drive: ... because ...\n(d) Microphone: ... because ...\n(e) Laser Printer: ... because ...',
    },
    {
      id: 4,
      prompt:
        'Why is it dangerous to open a computer system unit while the power cable is still plugged into the wall socket? Mention two safety precautions you must take before touching internal parts.',
      guidance:
        'Explain electrical shock dangers and Electrostatic Discharge (ESD) that can damage sensitive chips.',
      placeholder:
        'It is dangerous because...\nSafety Precaution 1: ...\nSafety Precaution 2: ...',
    },
    {
      id: 5,
      prompt:
        'Byte Conversion Math Problem:\nIf an Afrobeat MP3 music file is 4 Megabytes (MB) in size, how many songs can fit inside a 1 Gigabyte (1 GB = 1,000 MB) USB flash drive? Show your step-by-step mathematical calculation!',
      guidance:
        'Remember that 1 GB contains approximately 1,000 MB. Divide the total capacity by the size of one song.',
      placeholder:
        'Step 1: 1 Gigabyte (GB) = 1,000 Megabytes (MB)\nStep 2: Size of one song = 4 MB\nStep 3: Number of songs = 1,000 / 4 = ... songs\nExplanation: ...',
    },
  ],
};

// -------------------------------------------------------------
// Module 2 Pre-Class Instructor Master Briefing
// -------------------------------------------------------------
export const module2MasterBriefing = {
  moduleId: 'module-2',
  moduleTitle: 'Module 2: Parts of a Computer (Hardware Lab)',
  duration: '40 Minutes Lab Session Pacing',
  targetAudience: 'Secondary School Students (Ages 12–18, First-Time Computer Learners)',
  labPacing: [
    {
      time: '00:00 – 05:00 (5 mins)',
      stage: 'Recap & Class Opener',
      action:
        'Ask students to look around the lab. Have 2 students name one physical computer component they can see and touch. Emphasize: Hardware is physical; Software is intangible instructions.',
    },
    {
      time: '05:00 – 15:00 (10 mins)',
      stage: 'Core Concept Presentation',
      action:
        'Teach the Human Body Analogy (CPU = Brain, Monitor = Eyes, Keyboard/Mouse = Hands). Crucial emphasis: The big metal box is the SYSTEM UNIT, NOT the CPU. Show the CPU chip photo.',
    },
    {
      time: '15:00 – 28:00 (13 mins)',
      stage: 'Hands-on Interactive Lab',
      action:
        'Have student lab pairs explore Stage 2 (Peripheral Sorting: Input vs Output), Stage 3 (7-Step Virtual System Unit Disassembly), and Stage 4 (Byte Ladder and Flash Drive Capacity Calculator).',
    },
    {
      time: '28:00 – 35:00 (7 mins)',
      stage: 'Oral Check & Safety Drill',
      action:
        'Conduct a rapid verbal check. Ask the class: "What happens to files on RAM when NEPA takes light?" and "What is the very first step before touching inside a computer?"',
    },
    {
      time: '35:00 – 40:00 (5 mins)',
      stage: 'Wrap-Up & Arena Battle',
      action:
        'Summarize the key takeaways. Direct students to copy notes in /notes/module-2, then project /arena for the Module 2 Kahoot-style hardware showdown.',
    },
  ],
  formalDefinitions: [
    {
      term: 'Computer Hardware',
      definition:
        'The physical, tangible, and electronic machinery or equipment of a computer system that can be seen, touched, and manipulated by human hands.',
      examContext: 'WAEC / NECO Senior Secondary Computer Studies standard question.',
    },
    {
      term: 'System Unit vs. CPU',
      definition:
        'The System Unit is the main metal or plastic chassis containing the motherboard, power supply, and drives. The CPU (Central Processing Unit) is the single microprocessor chip seated on the motherboard that executes calculations.',
      examContext: 'One of the most frequently failed distinction questions in WAEC Section A.',
    },
    {
      term: 'Peripheral Devices',
      definition:
        'Any auxiliary input, output, or storage device that connects externally to the computer system unit via cables, ports (USB, HDMI), or wireless signals.',
      examContext: 'Standard peripheral classification in BECE and SSCE.',
    },
    {
      term: 'Volatile vs. Non-Volatile Memory',
      definition:
        'Volatile memory (RAM) requires electric power to hold data; when power cuts, its contents are instantly wiped. Non-volatile storage (HDD, SSD, Flash) retains information permanently without electric power.',
      examContext: 'Crucial distinction tested in both theory and multiple-choice exams.',
    },
    {
      term: 'Byte Scale Hierarchy',
      definition:
        '1 Byte = 8 Bits (1 character); 1 Kilobyte (KB) = 1,024 Bytes; 1 Megabyte (MB) = 1,024 KB; 1 Gigabyte (GB) = 1,024 MB; 1 Terabyte (TB) = 1,024 GB.',
      examContext: 'Fundamental data representation and conversion questions in exams.',
    },
  ],
  analogies: [
    {
      title: 'Human Body Hardware Analogy',
      story:
        'A desktop workstation is designed exactly like the human body: The System Unit chassis is the protective skull and torso. The CPU chip inside is the Brain making calculations. The Monitor is the Eyes displaying expressions. The Keyboard and Mouse are Hands giving instructions. The Microphone is the Ears. And the Hard Drive is long-term memory holding childhood memories!',
      takeaway: 'Hardware mirrors human anatomy: Sensory input, brain calculation, and visual output.',
    },
    {
      title: 'Study Desk vs. Locked Metal Locker (RAM vs. Hard Drive)',
      story:
        'Imagine studying in your classroom. The top of your wooden desk is RAM: you lay out your notebook, textbook, and pencil to do quick homework. But if rain storms blow into the room and everyone runs away (NEPA takes power), anything left loose on the desk gets blown away. Your locked metal locker in the corner is the Hard Drive: you pack your books inside and turn the key. Even if the school is closed for holidays, your books remain completely safe!',
      takeaway: 'RAM is fast temporary desk space; Hard Drive is secure permanent storage.',
    },
    {
      title: 'Market Square & The Generator (Motherboard & PSU)',
      story:
        'The Motherboard is the bustling marketplace of Ado-Ekiti. Paved walkways (circuits/buses) connect every merchant. The Power Supply Unit (PSU) is the heavy-duty generator humming outside, taking high-voltage NEPA power and distributing safe, steady electricity to every shop.',
      takeaway: 'Motherboard connects all parts; PSU feeds them safe electricity.',
    },
  ],
  hardwareSafetyChecklist: [
    'Always unplug the AC power cord from the wall socket before touching internal components.',
    'Discharge Electrostatic Discharge (ESD): Touch an unpainted metal surface on the chassis before touching circuit boards.',
    'Hold RAM sticks and expansion cards strictly by the green PCB edges; never touch the golden contact pins.',
    'Never force a connector into a socket: USB, HDMI, and RAM sticks only fit in one specific direction.',
    'Keep all water bottles, sachet pure water, and snacks completely off the computer work desks.',
    'Always use "Safely Remove Hardware and Eject Media" before disconnecting USB flash drives to prevent file corruption.',
  ],
  disassemblyProcedure: [
    {
      step: 1,
      title: 'Power Off & Disconnect Mains',
      action: 'Shut down operating system completely and unplug the AC power cable from the wall.',
      caution: 'Never open a PC that is connected to mains electricity.',
    },
    {
      step: 2,
      title: 'Ground Yourself (Discharge ESD)',
      action: 'Touch an unpainted metal part of the PC chassis with your bare fingers for 5 seconds.',
      caution: 'Invisible static electricity from your body can instantly fry sensitive microchips.',
    },
    {
      step: 3,
      title: 'Remove the Side Panel',
      action: 'Unscrew the 2 thumbscrews on the rear edge and slide the side panel backward.',
      caution: 'Place the side panel flat on the floor so it does not fall and bend.',
    },
    {
      step: 4,
      title: 'Disconnect Power Supply Cables',
      action: 'Gently squeeze the plastic release clips and pull power cables from the motherboard.',
      caution: 'Never yank power cables by the wires; always grip the plastic molex connector.',
    },
    {
      step: 5,
      title: 'Unclip & Remove RAM Sticks',
      action: 'Press down simultaneously on the plastic latches at both ends of the RAM slot.',
      caution: 'The RAM stick will pop up automatically. Handle only by the plastic/PCB edges.',
    },
    {
      step: 6,
      title: 'Disconnect Storage Drive Cables',
      action: 'Unplug the thin SATA data cable and power cable from the Hard Drive or SSD.',
      caution: 'SATA clips have metal lock latches; press the latch before pulling.',
    },
    {
      step: 7,
      title: 'Inspect CPU & Heatsink Fan',
      action: 'Observe the heavy aluminum heatsink and cooling fan directly over the CPU socket.',
      caution: 'Do not unseat the CPU heatsink without thermal paste; never touch CPU socket pins.',
    },
  ],
  verbalCheckQuestions: [
    {
      question: 'Is the big metal box sitting on your desk called the CPU?',
      answer:
        'No! It is called the System Unit (or Computer Case). The CPU is just the small square chip inside on the motherboard.',
    },
    {
      question: 'Which device is BOTH an input and an output device?',
      answer:
        'A Touchscreen (e.g. on a smartphone, tablet, or ATM). You touch it to enter commands (Input) and it shows visual pictures (Output).',
    },
    {
      question: 'Why does unsaved work disappear from RAM when power cuts?',
      answer:
        'Because RAM is volatile memory—it requires a constant electric current to hold data.',
    },
    {
      question: 'How many bits make up one single byte?',
      answer:
        '8 bits = 1 byte (enough to store 1 text character like the letter "A").',
    },
    {
      question: 'What is the very first rule of safety before opening a computer case?',
      answer:
        'Unplug the power cable from the wall socket and discharge static electricity.',
    },
  ],
  lectureDossier: [
    {
      title: 'Section 1: The Physics of Hardware & The Anatomy of the System Unit',
      summary: 'Electromechanical fundamentals: How physical components convert electrical impulses into logic and computation.',
      paragraphs: [
        'Hardware encompasses all tangible electromechanical elements of a computer system. While software provides mathematical algorithms and instructions, hardware provides the physical substrate of silicon, copper, fiberglass, and aluminum through which electrons flow.',
        'The centerpiece of any desktop computer is the System Unit chassis (often mistakenly called the CPU by beginners). The chassis serves two vital engineering functions: physical containment (protecting fragile silicon circuits from dust, physical impact, and moisture) and electromagnetic shielding (preventing electrical interference from disrupting other appliances).',
        'Inside the chassis lies the Motherboard (or Printed Circuit Board / PCB). The motherboard is etched with thousands of micro-thin copper tracks called "buses" (Data Bus, Address Bus, Control Bus) that transmit electronic pulses at gigahertz frequencies between components. The central socket houses the Central Processing Unit (CPU), which is clamped beneath a heavy aluminum heat sink and electric fan. Because billions of transistors switching billions of times per second generate intense thermal energy (often reaching 70°C–90°C), thermal paste is applied between the CPU heat spreader and the copper base of the cooler to eliminate microscopic air pockets and ensure rapid heat conduction.'
      ],
      keyTakeaways: [
        'The System Unit is the protective housing; the CPU is the small silicon microchip inside.',
        'Copper traces on the motherboard act as electronic highways (buses) synchronizing components.',
        'Thermal paste and cooling fans prevent catastrophic semiconductor heat breakdown.'
      ],
      teacherScript: 'Class, look inside this opened computer case. This big green board is the Motherboard. It is the town map. That metal box with all the colorful cables is the Power Supply Unit (PSU)—the NEPA transformer of the computer. And under this heavy fan sits the CPU, the brain.'
    },
    {
      title: 'Section 2: Memory Hierarchy — The Critical Boundary Between RAM and Persistent Storage',
      summary: 'Understanding volatile semiconductor memory vs magnetic platters and non-volatile NAND flash cells.',
      paragraphs: [
        'A foundational concept that every ICT educator must teach with clarity is the difference between primary memory (RAM) and secondary storage (Hard Drives / SSDs).',
        'Random Access Memory (RAM) consists of Dynamic RAM (DRAM) integrated circuits. Each memory cell in DRAM consists of a single microscopic transistor and capacitor. Because capacitors leak charge continuously, they must be electrically refreshed thousands of times per second. This makes RAM "volatile": as soon as power is disconnected (e.g., during sudden NEPA blackouts), the electrical charge dissipates and all data stored in RAM vanishes instantaneously.',
        'Secondary storage, in contrast, is "non-volatile": data remains physically recorded even when the machine is powered down for months or years. Traditional Hard Disk Drives (HDDs) record binary 1s and 0s magnetically on spinning aluminum or glass platters rotating at 5,400 to 7,200 RPM, read by a floating magnetic head. Modern Solid-State Drives (SSDs) replace moving mechanical parts with NAND flash memory cells, storing electrons within floating-gate transistors. SSDs are 5 to 10 times faster than mechanical HDDs, consume less power, and are immune to physical shock.'
      ],
      keyTakeaways: [
        'RAM is volatile and fast; data is lost on power shutdown.',
        'Secondary storage (HDD, SSD) is non-volatile; data is permanent.',
        'SSDs utilize silent flash semiconductor gates and are significantly faster and more durable than spinning HDDs.'
      ],
      teacherScript: 'If you are writing a letter on your computer and NEPA takes the light before you press Ctrl + S, why did your letter disappear? Because your letter was living in temporary RAM! Once you press Ctrl + S, the computer copies the letter into the permanent Hard Drive or SSD.'
    },
    {
      title: 'Section 3: Input/Output Transduction & The Byte Scale Conversion',
      summary: 'How analog human sensations become digital bits, and how bytes scale from 8 bits to Petabytes.',
      paragraphs: [
        'Peripheral devices are transducers: they convert energy from one form to another. An input device converts human physical actions (sound waves, mechanical finger pressure, optical reflections) into digital bitstreams. An output device converts digital bitstreams into human sensory experiences (photons on an IPS display, vibrations from speaker cones, or ink drops on paper).',
        'Data Units Hierarchy: At the base level is the Bit (Binary Digit: 0 or 1). Exactly 8 bits grouped together form 1 Byte. One byte is the exact volume of memory required to store a single ASCII text character (e.g., letter "K" or number "7"). In binary arithmetic, computers count in powers of 2 (2^10 = 1,024). Therefore:',
        '- 1 Kilobyte (KB) = 1,024 Bytes (about one paragraph of typed text).',
        '- 1 Megabyte (MB) = 1,024 KB (about one high-resolution smartphone photo or one 3-minute MP3 song).',
        '- 1 Gigabyte (GB) = 1,024 MB (about one full-length feature film or 250 songs).',
        '- 1 Terabyte (TB) = 1,024 GB (about 1,000 films or an entire secondary school library of digital books).'
      ],
      keyTakeaways: [
        'Input/Output peripherals are electronic transducers bridging human senses and digital bits.',
        '8 Bits = 1 Byte = 1 Character.',
        'Multipliers follow powers of 2 (1,024 multiplier): 1,024 B = 1 KB, 1,024 KB = 1 MB, 1,024 MB = 1 GB, 1,024 GB = 1 TB.'
      ],
      teacherScript: 'Think of 1 bit as a single coin. 8 coins make a bag called a Byte. 1,024 bags fill a small wheelbarrow (Kilobyte). 1,024 wheelbarrows fill a pickup truck (Megabyte). 1,024 pickup trucks fill a shipping container (Gigabyte)!'
    },
    {
      title: 'Section 4: Laboratory Safety, Electrostatic Discharge (ESD) & Tropical Maintenance',
      summary: 'Preventing hardware breakdown in African classrooms: humidity, dust, static electricity, and power surges.',
      paragraphs: [
        'Operating computer laboratories in tropical West African environments poses specific maintenance challenges:',
        '1. Electrostatic Discharge (ESD): The human body naturally collects static electrical charges, especially when wearing rubber-soled shoes or synthetic fabrics on tiled or carpeted floors. A static shock of merely 100 volts—completely imperceptible to human touch—can permanently fry microscopic silicon junctions inside a CPU or RAM stick. Instructors must train students to always ground themselves by touching an unpainted metal section of the computer case before handling components.',
        '2. Power Surges & NEPA Fluctuations: Erratic voltage spikes and sudden dropouts damage power supplies and motherboard capacitors. Every laboratory circuit must pass through an Uninterruptible Power Supply (UPS) with Automatic Voltage Regulation (AVR) to deliver a clean sine wave and provide 15–20 minutes of battery runtime to save open work.',
        '3. Dust and Harmattan Season: Fine dust coats cooling fan bearings and forms an insulating blanket over heatsinks, causing CPUs to overheat and thermally throttle. Regular dusting with dry compressed air and keeping lab windows screened with insect mesh is essential.'
      ],
      keyTakeaways: [
        'Always ground yourself before touching internal circuit boards to prevent ESD damage.',
        'UPS and voltage stabilizers are mandatory equipment in Nigerian school computer labs.',
        'Keep dust off heatsinks and fans to prevent thermal throttling and component burnout.'
      ],
      teacherScript: 'Before you touch any green circuit board, touch the metal frame of the case with your bare hands. This releases static electricity safely so you do not accidentally zap the computer!'
    }
  ],
};


