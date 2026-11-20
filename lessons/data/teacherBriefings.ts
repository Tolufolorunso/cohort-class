export interface ScheduleItem {
  time: string;
  activity: string;
  details: string;
}

export interface CoreConcept {
  concept: string;
  simpleExplanation: string;
}

export interface StudentMistake {
  mistake: string;
  teacherFix: string;
}

export interface CheckQuestion {
  question: string;
  answer: string;
}

export interface OnePageTeacherGuide {
  moduleId: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  goalSummary: string;
  classSchedule: ScheduleItem[];
  goldenExplanations: CoreConcept[];
  nigerianAnalogy: {
    title: string;
    story: string;
  };
  commonMistakes: StudentMistake[];
  verbalCheckQuestions: CheckQuestion[];
}

export const ONE_PAGE_TEACHER_GUIDES: Record<string, OnePageTeacherGuide> = {
  'module-1': {
    moduleId: 'module-1',
    moduleNumber: 1,
    title: 'Module 1: Introduction to Computers',
    subtitle: '1-Page Pre-Class Teacher Guide (In Simple English)',
    goalSummary:
      'Today, students will lose their fear of computers. They will learn that a computer is simply an obedient electronic machine that takes raw data, works on it, and gives meaningful information.',
    classSchedule: [
      {
        time: '00:00 – 05:00',
        activity: 'Warm-Up & Remove Fear',
        details: 'Ask: "Who is afraid of touching the wrong key?" Reassure them with a smile: "You cannot break this laptop by clicking!"',
      },
      {
        time: '05:00 – 15:00',
        activity: 'Projector Slides (1–4)',
        details: 'Teach What is a Computer, Data vs. Information, 5 Superpowers, and the 4 steps of the IPOS cycle.',
      },
      {
        time: '15:00 – 32:00',
        activity: 'Laptop Practice Lab',
        details: 'Students test the interactive IPOS flow simulator and sort devices (desktops, laptops, phones) on their screens.',
      },
      {
        time: '32:00 – 40:00',
        activity: 'Wrap-Up & 3 Check Questions',
        details: 'Ask the 3 verbal check questions, praise student effort, and launch the Quiz Arena battle.',
      },
    ],
    goldenExplanations: [
      {
        concept: '1. What a Computer Really Is',
        simpleExplanation:
          'A computer is not magic. It is like an obedient servant: it has no mind of its own. It only does exactly what human instructions tell it to do, but at lightning speed.',
      },
      {
        concept: '2. Raw Data vs. Information',
        simpleExplanation:
          'Data is raw ingredients like unpeeled cassava tubers or raw numbers like "25, 10, +". Information is the finished, cooked meal like smooth white garri or the answer "Total Score = 35".',
      },
      {
        concept: '3. The Sacred IPOS Cycle',
        simpleExplanation:
          'Four steps: INPUT (you give it data), PROCESS (the CPU thinks and calculates), OUTPUT (the screen shows the answer), STORAGE (it saves your work for next week).',
      },
    ],
    nigerianAnalogy: {
      title: 'The Cassava Grinding Machine at the Market',
      story:
        'Tell the students: "When your mother brings raw peeled cassava to the grinding engine, the boy pours cassava into the top hopper (Input). The spinning motor blades chop and grind it (Processing). Smooth white mash pours into the plastic basin (Output). Then your mother presses the garri into sacks for storage (Storage). That market machine is doing the IPOS cycle!"',
    },
    commonMistakes: [
      {
        mistake: 'Calling the glass screen "the computer"',
        teacherFix:
          'Gently explain: The screen is just like the TV display. The real computer is the processor engine inside the case or under the keyboard.',
      },
      {
        mistake: 'Afraid to press keys or click buttons',
        teacherFix:
          'Show them that clicking errors are instantly undone with Backspace or Ctrl + Z. Tell them: "Be confident and click!"',
      },
      {
        mistake: 'Forgetting the Storage step',
        teacherFix:
          'Remind them that if NEPA takes light or battery dies, unsaved work disappears. Always save before class ends.',
      },
    ],
    verbalCheckQuestions: [
      {
        question: 'Can you break this computer by typing or clicking a button?',
        answer: 'No! The computer is built to obey commands and errors are easily undone.',
      },
      {
        question: 'Is raw unpeeled cassava Data or Information?',
        answer: 'Data! (Uncooked raw material). The smooth white garri is Information.',
      },
      {
        question: 'Name the 4 steps of the IPOS cycle.',
        answer: 'Input, Process, Output, Storage.',
      },
    ],
  },

  'module-2': {
    moduleId: 'module-2',
    moduleNumber: 2,
    title: 'Module 2: Parts of a Computer (Hardware Lab)',
    subtitle: '1-Page Pre-Class Teacher Guide (In Simple English)',
    goalSummary:
      'Today, students will understand the physical parts of a computer. They will connect computer parts to human body organs, identify Input vs. Output, and see inside the System Unit with zero fear.',
    classSchedule: [
      {
        time: '00:00 – 05:00',
        activity: 'Touch the Hardware',
        details: 'Have students physically touch the keyboard, screen, and mouse: "If you can touch it with your hands, it is Hardware!"',
      },
      {
        time: '05:00 – 15:00',
        activity: 'Projector Slides (1–4)',
        details: 'Explain System Unit vs. CPU, the Human Body Hardware Twins, and Input vs. Output devices.',
      },
      {
        time: '15:00 – 32:00',
        activity: 'Hands-On Teardown Lab',
        details: 'Students sort peripheral devices on screen and complete the 7-step PC disassembly simulator.',
      },
      {
        time: '32:00 – 40:00',
        activity: 'Flash Drive Capacity & Review',
        details: 'Demonstrate RAM vs. Storage with the desk analogy and ask the 3 check questions.',
      },
    ],
    goldenExplanations: [
      {
        concept: '1. System Unit vs. The CPU (The Big Mistake)',
        simpleExplanation:
          'The big metal/plastic box on the floor is the System Unit. The CPU is NOT the big box! The CPU is a small square chip inside the box that acts as the brain.',
      },
      {
        concept: '2. Human Body Hardware Twins',
        simpleExplanation:
          'CPU is the Brain; Monitor is the Face; Keyboard/Mouse are Hands; Hard Drive is Long-term Memory; Power Supply (PSU) is the Heart pumping electricity.',
      },
      {
        concept: '3. RAM vs. Storage (Desk vs. Cupboard)',
        simpleExplanation:
          'RAM is your small study table (cleared when you go to sleep); Storage (Hard drive/SSD) is your metal locker where books stay safe for years.',
      },
    ],
    nigerianAnalogy: {
      title: 'The POS Machine at the Corner Shop',
      story:
        'Tell the students: "When you go buy soft drink with an ATM card: The card slot and numeric rubber keypad are Input devices. The microchip inside calculating your balance is the CPU. The printed paper receipt coming out is Output. The POS machine is a mini computer!"',
    },
    commonMistakes: [
      {
        mistake: 'Calling the big case the "CPU"',
        teacherFix:
          'Remind them every single lesson: "The case is the System Unit house; the CPU is the brain inside the house."',
      },
      {
        mistake: 'Thinking more RAM means more movie storage',
        teacherFix:
          'Clarify that RAM is for speed while working; Hard Drives and flash drives are for saving movies and music permanently.',
      },
      {
        mistake: 'Yanking flash drives out roughly without ejecting',
        teacherFix:
          'Demonstrate proper safe ejection so the computer finishes writing files before physical removal.',
      },
    ],
    verbalCheckQuestions: [
      {
        question: 'Is a classroom projector an Input or Output device?',
        answer: 'Output! (It beams visuals out onto the wall).',
      },
      {
        question: 'Which part of the computer acts like the human brain?',
        answer: 'The CPU (Central Processing Unit).',
      },
      {
        question: 'When the laptop turns off, does what was in RAM stay or disappear?',
        answer: 'It disappears! (RAM is temporary working memory).',
      },
    ],
  },

  'module-3': {
    moduleId: 'module-3',
    moduleNumber: 3,
    title: 'Module 3: Computer Usage, Booting & Rapid-Typing',
    subtitle: '1-Page Pre-Class Teacher Guide (In Simple English)',
    goalSummary:
      'Today, students will become confident computer pilots. They will master cold and warm booting, window controls (Minimize, Maximize, Close), create their first named folder, and anchor their fingers on the F and J bumps for touch typing.',
    classSchedule: [
      {
        time: '00:00 – 05:00',
        activity: 'Cold Boot & Posture Check',
        details: 'Press laptop power button once and wait. Have students sit upright with feet flat on the floor.',
      },
      {
        time: '05:00 – 15:00',
        activity: 'Projector Slides (1–5)',
        details: 'Teach Cold vs. Warm Boot, Mouse actions, Window buttons (Minus, Square, Red X), and Folders vs. Files.',
      },
      {
        time: '15:00 – 32:00',
        activity: 'Folder Lab & RapidTyping',
        details: 'Every partner creates a folder with their own name, then practices RapidTyping Levels 1–4.',
      },
      {
        time: '32:00 – 40:00',
        activity: 'Typing Check & Ergonomics',
        details: 'Review the 20-20-20 eye rest rule, Ctrl + S safety habit, and award stars for typing accuracy.',
      },
    ],
    goldenExplanations: [
      {
        concept: '1. Cold Boot vs. Warm Boot',
        simpleExplanation:
          'Cold Boot is turning ON a cold, sleeping computer using the physical power switch. Warm Boot is restarting a running computer that froze using Ctrl + Alt + Del.',
      },
      {
        concept: '2. Folders vs. Files (Bag vs. Sheet)',
        simpleExplanation:
          'A folder is a container like your school bag. A file is the actual homework sheet you write inside (like your essay or photo). You store files inside folders.',
      },
      {
        concept: '3. The Secret Bumps on F and J',
        simpleExplanation:
          'Every computer keyboard has tiny raised bumps on F and J. Your two index fingers rest on them so your hands never need to look down while typing.',
      },
    ],
    nigerianAnalogy: {
      title: 'The School Bag & The Exercise Book Sheets',
      story:
        'Tell the students: "If you scatter 20 sheets of exam questions on your bed, you will lose them. You put them into a labeled yellow folder and put that folder into your school bag. On the computer, your folder keeps your school assignments neat!"',
    },
    commonMistakes: [
      {
        mistake: 'Clicking Minimize (−) and crying that work is deleted',
        teacherFix:
          'Show them the Taskbar shelf along the bottom of the screen. Click the icon to wake the window right back up.',
      },
      {
        mistake: 'Lifting the mouse completely off the desk',
        teacherFix:
          'Remind them to slide the mouse smoothly on the table; lifting it breaks cursor contact.',
      },
      {
        mistake: 'Peck typing with only two index fingers',
        teacherFix:
          'Insist on the Home Row anchor (A S D F and J K L ;). Tell them: "All 10 fingers have a job to do!"',
      },
    ],
    verbalCheckQuestions: [
      {
        question: 'What are the tiny bumps on keys F and J for?',
        answer: 'To help your index fingers find the Home Row without looking down.',
      },
      {
        question: 'Does clicking the Minimize button (−) delete your document?',
        answer: 'No! It puts the window to sleep on the bottom Taskbar shelf.',
      },
      {
        question: 'What keyboard shortcut saves your file instantly?',
        answer: 'Ctrl + S.',
      },
    ],
  },
};

export function getOnePageTeacherGuide(moduleId: string): OnePageTeacherGuide {
  return ONE_PAGE_TEACHER_GUIDES[moduleId] || ONE_PAGE_TEACHER_GUIDES['module-1'];
}
