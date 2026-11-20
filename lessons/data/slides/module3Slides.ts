import { ModuleSlide } from '../../types/presentation';

export const module3Slides: ModuleSlide[] = [
  // Slide 1: Booting: Cold vs Warm
  {
    id: 1,
    part: 'LESSON 1: BOOTING & POWER',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'Booting the Computer: Cold vs. Warm Boot',
    subtitle: 'How a sleeping machine wakes up, checks its parts, and prepares your desktop.',
    bullets: [
      {
        icon: '🧊',
        title: '1. Cold Booting (From Dead Power)',
        desc: 'Turning ON a computer that was completely powered off using the physical Power Button.',
      },
      {
        icon: '🔥',
        title: '2. Warm Booting (Restarting)',
        desc: 'Restarting a computer that is already running using software menu or Ctrl + Alt + Del.',
      },
      {
        icon: '🔍',
        title: '3. POST (Power-On Self-Test)',
        desc: 'The computer checks that RAM, keyboard, and screen are working before loading Windows.',
      },
      {
        icon: '⏳',
        title: '4. The Golden Rule of Waiting',
        desc: 'Never press the power button multiple times in a hurry! Let the computer wake up smoothly.',
      },
    ],
    analogy: 'Cold boot is like waking up in the morning from deep sleep. Warm boot is like washing your face with cold water in the afternoon!',
    teacherNotes: {
      promptQuestion: 'Ask: Why should you never turn off a computer by pulling the plug from the wall?',
      talkingPoint: 'Pulling the plug damages the hard drive and corrupts files. Always click Start ➔ Shut Down!',
      watchOutFor: 'Students pressing and holding the physical power button to shut down while Windows is running.',
    },
  },

  // Slide 2: Interactive Booting Simulator
  {
    id: 2,
    part: 'LESSON 1: HANDS-ON LAB',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'Practice Lab: The Cold & Warm Boot Simulator',
    subtitle: 'Trigger a cold boot and a warm restart to see BIOS POST checks in action!',
    bullets: [],
    interactiveType: 'booting',
    teacherNotes: {
      promptQuestion: 'Have students press Cold Boot and observe the 4 startup phases.',
      talkingPoint: 'Explain that the BIOS checks RAM first before handing control over to the Operating System.',
      watchOutFor: 'Students clicking buttons before the previous animation completes.',
    },
  },

  // Slide 3: The Mouse & Touchpad
  {
    id: 3,
    part: 'LESSON 2: NAVIGATION & CONTROLS',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'The Mouse: Your Digital Hand',
    subtitle: 'Learn the 4 essential actions to talk to your computer with ease.',
    bullets: [
      {
        icon: '👆',
        title: '1. Left-Click (1 Tap)',
        desc: 'Choose or select an item. Like pointing with your index finger: "I want this one."',
      },
      {
        icon: '✌️',
        title: '2. Double-Click (2 Quick Taps)',
        desc: 'Open a folder, app, or file. Like knocking twice on a classroom door: "Knock-Knock, open!"',
      },
      {
        icon: '🖱️',
        title: '3. Right-Click (1 Right Tap)',
        desc: 'Opens the Secret Options Menu! Like asking: "What can I do with this item?"',
      },
      {
        icon: '🖐️',
        title: '4. Drag & Drop (Hold & Slide)',
        desc: 'Hold the left button down, slide the mouse, and let go to move something into a folder.',
      },
    ],
    analogy: 'Think of your mouse as your physical index finger reaching inside the computer screen!',
    teacherNotes: {
      promptQuestion: 'Ask: Why do we have two buttons on a mouse instead of just one?',
      talkingPoint: 'Left button is for doing things (Select & Open); Right button is for options (Secret Menu).',
      watchOutFor: 'Students lifting the mouse completely off the desk or pressing down too hard on the touchpad.',
    },
  },

  // Slide 4: Interactive Mouse Gym
  {
    id: 4,
    part: 'LESSON 2: HANDS-ON LAB',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'Practice Lab: The Mouse & Touchpad Gym',
    subtitle: 'Put your hands on the mouse or touchpad and complete the 5 challenges!',
    bullets: [],
    interactiveType: 'mouse-gym',
    teacherNotes: {
      promptQuestion: 'Check laptop pairs: Partner A completes challenges 1-2, Partner B does 3-4!',
      talkingPoint: 'Encourage students to relax their wrists and keep the mouse flat on the desk.',
      watchOutFor: 'Students struggling with double-clicking because they tap too slowly. Remind them: "Tap-tap quickly!"',
    },
  },

  // Slide 5: Window Controls
  {
    id: 5,
    part: 'LESSON 2: WINDOW MANAGEMENT',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'Window Controls: The Top-Right Corner',
    subtitle: 'Every window on your computer screen has 3 magic buttons.',
    bullets: [
      {
        icon: '➖',
        title: '1. Minimize (Minus)',
        desc: 'Puts the window to sleep down on the Taskbar shelf. The app is NOT closed!',
      },
      {
        icon: '🗖',
        title: '2. Maximize / Restore (Square)',
        desc: 'Expands the window to fill your entire screen so you have full room to work.',
      },
      {
        icon: '❌',
        title: '3. Close (Red X)',
        desc: 'Completely shuts the app when you are finished. Always save your work first!',
      },
      {
        icon: '📦',
        title: '4. The Taskbar (The Bottom Shelf)',
        desc: 'The dark bar along the bottom of your screen that shows all your minimized sleeping apps.',
      },
    ],
    analogy: 'The Taskbar is like a study table shelf: Minimize puts your book on the shelf; Close puts it back in the locker!',
    teacherNotes: {
      promptQuestion: 'Ask: If you click Minimize (−), is your document deleted?',
      talkingPoint: 'Stress that Minimize merely hides the window on the bottom shelf. You can click it anytime to wake it up.',
      watchOutFor: 'Students panicking when a window disappears after clicking Minimize.',
    },
  },

  // Slide 6: Interactive Window Controls Playground
  {
    id: 6,
    part: 'LESSON 2: HANDS-ON LAB',
    badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    title: 'Practice Lab: The Window Controls Playground',
    subtitle: 'Click Minimize, Maximize, and Close on the live interactive window!',
    bullets: [],
    interactiveType: 'desktop-controls',
    teacherNotes: {
      promptQuestion: 'Have each partner minimize the window and restore it from the taskbar.',
      talkingPoint: 'Show how dragging the window title bar moves it around the screen.',
      watchOutFor: 'Students confusing the browser tab close button with the operating system window close button.',
    },
  },

  // Slide 7: Folders vs Files
  {
    id: 7,
    part: 'LESSON 3: COMPUTER USAGE',
    badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    title: 'Folders vs. Files: The Golden Difference',
    subtitle: 'Never confuse where you store things with what you created.',
    bullets: [
      {
        icon: '📁',
        title: '1. A Folder (The Container / School Bag)',
        desc: 'A yellow envelope that holds files and other folders. Keeps your desktop neat and tidy.',
      },
      {
        icon: '📄',
        title: '2. A File (The Paper / Homework)',
        desc: 'The actual item you created: a typed essay, drawing, photo, or music track (e.g. notes.txt).',
      },
      {
        icon: '🏷️',
        title: '3. File Extensions (.txt, .docx, .png)',
        desc: 'Letters after the dot tell the computer what type of paper it is so it opens with the right app.',
      },
      {
        icon: '🗂️',
        title: '4. Subfolders (Folders Inside Folders)',
        desc: 'Like having separate subject notebooks (Math, English, ICT) inside your main school bag.',
      },
    ],
    analogy: 'Real Nigerian Analogy: A Folder is like your School Bag or Cupboard. A File is the exercise book sheet you put inside!',
    teacherNotes: {
      promptQuestion: 'Ask: Can you write text directly inside a folder without creating a file?',
      talkingPoint: 'A folder is empty space for organizing. You write inside files, and store files inside folders.',
      watchOutFor: 'Students naming every folder "New Folder" without giving it a descriptive name.',
    },
  },

  // Slide 8: How to Create a Folder (5 Steps)
  {
    id: 8,
    part: 'LESSON 3: HOW TO CREATE A FOLDER',
    badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    title: 'How to Create a New Folder in 5 Steps',
    subtitle: 'Memorize these 5 simple steps for every computer you ever use.',
    bullets: [
      {
        icon: '1️⃣',
        title: 'Step 1: Find Empty Space',
        desc: 'Move your mouse pointer to an empty area on your Desktop or inside Documents.',
      },
      {
        icon: '2️⃣',
        title: 'Step 2: Right-Click',
        desc: 'Click your right mouse button to open the secret options menu.',
      },
      {
        icon: '3️⃣',
        title: 'Step 3: Point to "New"',
        desc: 'Slide your pointer gently down to "New" to see what you can create.',
      },
      {
        icon: '4️⃣',
        title: 'Step 4: Click "Folder"',
        desc: 'Click the yellow "Folder" icon. A new yellow folder appears on your screen!',
      },
    ],
    analogy: 'Pro Shortcut: You can also press Ctrl + Shift + N on Windows to instantly spawn a new folder!',
    teacherNotes: {
      promptQuestion: 'Ask: What key on the keyboard locks in your new folder name?',
      talkingPoint: 'The ENTER key (or Return key) submits and saves your new name.',
      watchOutFor: 'Students clicking away before typing the name, resulting in folders named "New folder (2)".',
    },
  },

  // Slide 9: Practice Lab: Folder Creation Gym
  {
    id: 9,
    part: 'LESSON 3: HANDS-ON LAB',
    badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    title: 'Practice Lab: Create Folders & Files',
    subtitle: 'Try creating a folder, renaming it with your name, and creating a file inside!',
    bullets: [],
    interactiveType: 'folder-lab',
    teacherNotes: {
      promptQuestion: 'Challenge: Have each partner create a folder with their own first name!',
      talkingPoint: 'Demonstrate how double-clicking opens the folder so you can see what is inside.',
      watchOutFor: 'Students who accidentally delete items. Remind them that deleted items go to the Recycle Bin.',
    },
  },

  // Slide 10: Touch-Typing & Home Row Secrets
  {
    id: 10,
    part: 'LESSON 4: RAPID-TYPING SECRETS',
    badgeColor: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60',
    title: 'Rapid-Typing: The Secret of the Home Row',
    subtitle: 'How professional programmers and typists type fast without looking down.',
    bullets: [
      {
        icon: '🪑',
        title: '1. Champion Sitting Posture',
        desc: 'Sit upright, feet flat on the ground, screen at eye level. Relax your wrists!',
      },
      {
        icon: '📍',
        title: '2. The Two Secret Bumps (F and J)',
        desc: 'Feel keys F and J right now! They have tiny raised bumps so your index fingers find home without looking.',
      },
      {
        icon: '🖐️',
        title: '3. Left Hand Anchors (A S D F)',
        desc: 'Pinky on A, Ring on S, Middle on D, Index on F. Resting lightly.',
      },
      {
        icon: '🖐️',
        title: '4. Right Hand Anchors (J K L ;)',
        desc: 'Index on J, Middle on K, Ring on L, Pinky on ;. Thumbs rest on Spacebar.',
      },
    ],
    analogy: 'Home Row is like your home address: your fingers go out to visit other keys (E, T, O), but they always return home!',
    teacherNotes: {
      promptQuestion: 'Ask: Close your eyes and feel your keyboard. Can you find keys F and J by touch alone?',
      talkingPoint: 'Once students find the bumps, explain that looking at the screen instead of fingers is the secret to 60 WPM.',
      watchOutFor: 'Students using only their two index fingers to "peck" at the keys. Stop this habit immediately.',
    },
  },

  // Slide 11: Interactive RapidTyping Arena (20 Levels)
  {
    id: 11,
    part: 'LESSON 4: HANDS-ON LAB',
    badgeColor: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60',
    title: 'Practice Lab: The 20-Level RapidTyping Arena',
    subtitle: 'Level up from Home Row foundations to African tech grandmaster sprints!',
    bullets: [],
    interactiveType: 'touch-typing',
    teacherNotes: {
      promptQuestion: 'Challenge: Have each partner complete Level 1 with 95%+ accuracy before trying Level 2!',
      talkingPoint: 'Speed comes naturally from accuracy. Tell students: "Aim for 100% accuracy first; speed will follow."',
      watchOutFor: 'Students hammering the keys loudly. Keyboards respond to light gentle taps.',
    },
  },

  // Slide 12: Lab Ergonomics, Data Safety & Review
  {
    id: 12,
    part: 'MODULE 3 REVIEW & CELEBRATION',
    badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    title: 'Module 3 Complete: You Are a Confident Computer Pilot!',
    subtitle: 'Review ergonomics, Ctrl+S safety habits, and celebrate your mastery.',
    bullets: [
      {
        icon: '👀',
        title: '1. The 20-20-20 Vision Rule',
        desc: 'Every 20 minutes, look at an object 20 feet away for 20 seconds to relax your eyes.',
      },
      {
        icon: '💾',
        title: '2. The Ctrl + S Lifesaver',
        desc: 'Press Ctrl + S every 5 minutes while typing. Never let sudden NEPA power outages erase your homework!',
      },
      {
        icon: '🪑',
        title: '3. Ergonomic Spine Posture',
        desc: 'Keep your elbows at 90 degrees, shoulders relaxed, and never slouch over the laptop.',
      },
      {
        icon: '🏆',
        title: '4. Ready for the Quiz Arena!',
        desc: 'Launch the Module 3 Quiz Arena to test your booting, navigation, and typing knowledge.',
      },
    ],
    analogy: 'Ctrl+S is like locking your front door before you sleep: it keeps your hard work safe from power thieves!',
    teacherNotes: {
      promptQuestion: 'Ask 3 verbal check questions: What is the 20-20-20 rule? What does Ctrl+S do? What are the bumps on F and J for?',
      talkingPoint: 'Congratulate the class on mastering computer usage, navigation, and typing! Launch the Quiz Arena.',
      watchOutFor: 'Students slouching or resting their chin on their hands while looking at screens.',
    },
  },
];
