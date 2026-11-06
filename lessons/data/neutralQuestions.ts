import { KahootQuestion } from '../types/curriculum';

export const neutralQuestions: KahootQuestion[] = [
  {
    id: 101,
    scope: 'neutral',
    topic: 'Everyday Tech & Shortcuts',
    question: 'You want to duplicate a paragraph in your document without deleting the original. What keyboard shortcut should you press after selecting the text?',
    options: ['Ctrl + X', 'Ctrl + C', 'Ctrl + V', 'Ctrl + P'],
    correctIndex: 1, // B -> Blue Diamond
    explanation:
      'Ctrl + C stands for Copy. It copies selected text or files into the clipboard memory so you can duplicate them elsewhere without removing the original.',
    timeLimitSeconds: 30,
  },
  {
    id: 102,
    scope: 'neutral',
    topic: 'Everyday Tech & Shortcuts',
    question: 'After copying a picture or text, what shortcut key pastes it onto the page where your cursor is blinking?',
    options: ['Ctrl + P', 'Ctrl + S', 'Ctrl + V', 'Ctrl + Z'],
    correctIndex: 2, // C -> Yellow Circle
    explanation:
      'Ctrl + V is Paste. It places whatever you previously copied or cut right at your current cursor position.',
    timeLimitSeconds: 30,
  },
  {
    id: 103,
    scope: 'neutral',
    topic: 'Everyday Tech & Shortcuts',
    question: 'The classroom generator or NEPA light might fluctuate anytime! What shortcut should you press frequently while typing to save your file immediately?',
    options: ['Ctrl + S', 'Ctrl + N', 'Ctrl + O', 'Ctrl + W'],
    correctIndex: 0, // A -> Red Triangle
    explanation:
      'Ctrl + S stands for Save. In Nigerian computer labs where power can flicker unexpectedly, pressing Ctrl + S regularly keeps your work safe from loss.',
    timeLimitSeconds: 30,
  },
  {
    id: 104,
    scope: 'neutral',
    topic: 'Everyday Tech & Shortcuts',
    question: 'Oh no! You accidentally deleted three paragraphs of your essay! What magic shortcut undoes your last mistake immediately?',
    options: ['Ctrl + Y', 'Ctrl + D', 'Ctrl + U', 'Ctrl + Z'],
    correctIndex: 3, // D -> Green Square
    explanation:
      'Ctrl + Z is Undo. It instantly reverses your last action, restoring deleted text or mistakes without panicking.',
    timeLimitSeconds: 30,
  },
  {
    id: 105,
    scope: 'neutral',
    topic: 'Mouse & Desktop Skills',
    question: 'What happens when you perform a single left-click on an icon or folder on your desktop?',
    options: [
      'It opens the program immediately',
      'It selects or highlights the item',
      'It permanently deletes the file',
      'It turns off the monitor',
    ],
    correctIndex: 1, // B -> Blue Diamond
    explanation:
      'A single left-click highlights or selects an item so you can inspect or move it. To actually launch or open the application, you double-click.',
    timeLimitSeconds: 30,
  },
  {
    id: 106,
    scope: 'neutral',
    topic: 'Mouse & Desktop Skills',
    question: 'To launch an application like Microsoft Word or Google Chrome from a desktop shortcut, what mouse action do you use?',
    options: [
      'Two rapid clicks with the left mouse button',
      'One long press with the right button',
      'Spinning the scroll wheel backward',
      'Clicking both buttons simultaneously',
    ],
    correctIndex: 0, // A -> Red Triangle
    explanation:
      'A double-click consists of two quick, consecutive taps of the primary (left) mouse button to launch desktop programs or open folders.',
    timeLimitSeconds: 30,
  },
  {
    id: 107,
    scope: 'neutral',
    topic: 'Mouse & Desktop Skills',
    question: 'When you right-click on an empty space on the desktop or on a file, what appears on your screen?',
    options: [
      'A video game starts playing',
      'The computer reboots immediately',
      'A context menu of relevant options & actions',
      'The screen goes blank',
    ],
    correctIndex: 2, // C -> Yellow Circle
    explanation:
      'The right mouse button opens a context menu displaying specific actions you can perform on that item, such as Copy, Rename, Properties, or Refresh.',
    timeLimitSeconds: 30,
  },
  {
    id: 108,
    scope: 'neutral',
    topic: 'Lab Etiquette & Hardware Care',
    question: 'Class is over! What is the correct way to turn off your desktop computer before leaving the lab?',
    options: [
      'Switch off the wall socket immediately',
      'Pull the power cable out of the system unit',
      'Press the power button for 10 seconds',
      'Click Start menu, select Power, then click Shut Down',
    ],
    correctIndex: 3, // D -> Green Square
    explanation:
      'Always use Start -> Power -> Shut Down. This gives Windows time to close open programs and park storage heads safely, preventing corrupt disk files.',
    timeLimitSeconds: 30,
  },
  {
    id: 109,
    scope: 'neutral',
    topic: 'Internet Safety & Phishing',
    question: 'While researching a class project online, a loud flashing pop-up screams "YOU HAVE WON ₦10,000,000! CLICK HERE NOW!". What should you do?',
    options: [
      'Click it immediately to claim the money',
      'Close the suspicious tab or browser window without clicking anything inside it',
      'Type your parents bank details',
      'Download whatever file it offers',
    ],
    correctIndex: 1, // B -> Blue Diamond
    explanation:
      'Flashy prize pop-ups are phishing scams and malware traps. Never click suspicious banners or download unverified files on lab or home computers.',
    timeLimitSeconds: 30,
  },
  {
    id: 110,
    scope: 'neutral',
    topic: 'Storage & Flash Drives',
    question: 'Before removing your flash drive from the lab computer, what should you do to prevent file corruption?',
    options: [
      'Yank it out as quickly as possible',
      'Right-click the drive icon and select Eject (Safely Remove Hardware)',
      'Submerge the USB in clean water',
      'Turn off the ceiling fan',
    ],
    correctIndex: 1, // B -> Blue Diamond
    explanation:
      'Selecting Eject or Safely Remove Hardware ensures that all reading and writing processes are finished before you unplug the thumb drive, keeping your assignments safe.',
    timeLimitSeconds: 30,
  },
];

