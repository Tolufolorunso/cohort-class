import {
  ModuleData,
  KahootQuestion,
  ModuleMasterBriefing,
} from '../types/curriculum';
import { ModuleNotes, ModuleAssignment } from '../types/platform';

// -------------------------------------------------------------
// Module 3 Metadata
// -------------------------------------------------------------
export const module3Info: ModuleData = {
  id: 'module-3',
  moduleNumber: 3,
  phaseName: 'Phase 1: Foundational Digital Literacy',
  title: 'Module 3: Computer Usage, Booting & Rapid-Typing',
  duration: '2 Weeks · 4 Lessons (40 Minutes Per Lesson)',
  objective:
    'Demystify computer startup and shutdown procedures (cold vs. warm booting), master precise mouse and touchpad gestures, navigate window controls (minimize, maximize, close), organize hierarchical folder and file directories, adopt proper typing ergonomics, and advance touch-typing speed across 20 progressive keyboard levels.',
  stages: [
    {
      id: 'booting-procedures',
      title: '1. Booting Your Computer',
      subtitle: 'Lesson 1 · Cold Booting, Warm Booting & The BIOS/POST Self-Test',
      type: 'definition',
      teacherNotes: {
        promptQuestion:
          'When you press the power button on a cold laptop, what is the computer doing for those 15 seconds before the desktop screen appears?',
        talkingPoint:
          'Booting is the startup sequence where the computer wakes up from zero power, checks that all internal hardware is healthy (POST), and loads the Operating System from the storage drive into high-speed RAM.',
        watchOutFor:
          'Students who yank the power plug or press and hold the power button to turn off the computer. Teach them immediately that computers must always be shut down through the software Start Menu so open files are safely closed!',
        formalExamTerm:
          'Booting Types (WAEC/NECO): Cold Boot (starting from a completely powered-off state) vs. Warm Boot / Restart (reloading the OS without cutting hardware power, via Ctrl+Alt+Del or Start Menu).',
        analogyStory:
          'Cold boot is like waking up in the morning, getting out of bed, washing your face, and putting on your school uniform. Warm boot is like washing your hands between classes—you are already awake and dressed, just resetting for the next period!',
        fullLectureReference:
          'When a computer powers on from a cold state, electric current enters the motherboard and the CPU immediately executes initial firmware instructions from the ROM BIOS/UEFI. The very first routine is POST (Power-On Self-Test), which checks the CPU, RAM registers, keyboard connectivity, and storage drives. Once POST succeeds, the bootloader reads the Master Boot Record (MBR) or EFI partition on the SSD/HDD and copies the Operating System kernel into RAM. A warm boot bypasses power-rail energization and memory POST, simply resetting the CPU registers and reloading the OS kernel.',
      },
    },
    {
      id: 'desktop-navigation',
      title: '2. The Desktop & Window Controls',
      subtitle: 'Lesson 2 · Desktop Workspace Anatomy & The Minimize, Maximize, Close Trio',
      type: 'applications',
      teacherNotes: {
        promptQuestion:
          'Look at the top-right corner of any open application window. What do the dash (➖), square (🗖), and X (❌) buttons do?',
        talkingPoint:
          'The desktop is your digital study desk. Application windows are virtual sheets of paper. The three window control buttons give you complete command: Minimize temporarily hides the window to the bottom Taskbar without closing it; Maximize expands it to fill the whole screen; and Close completely quits the app and frees up your RAM memory.',
        watchOutFor:
          'Students confusing Minimize with Close. Emphasize that minimizing keeps your work alive and paused in the background; closing requires saving first!',
        formalExamTerm:
          'GUI (Graphical User Interface) Elements: Desktop, Icons, Taskbar, Windows, and Window Control Trio (Minimize, Maximize/Restore, Close).',
        analogyStory:
          'Think of reading a textbook: Minimizing is slipping a bookmark into the page and putting the book in your drawer (you can pull it right back out). Closing is taking the book back to the school library and returning it to the shelf.',
        fullLectureReference:
          'In modern Graphical User Interfaces (GUIs), window management is handled by the OS Desktop Window Manager (DWM). When a window is minimized, its rendering buffer is hidden and its process priority is reduced, preserving memory state in RAM. Maximizing scales the viewport coordinates to the display resolution bounds. Closing sends a SIGTERM/WM_CLOSE signal to the process, allowing the application to prompt the user to save uncommitted data before releasing heap memory and terminating its process ID (PID).',
      },
    },
    {
      id: 'mouse-touchpad-lab',
      title: '3. Mouse & Touchpad Mastery',
      subtitle: 'Lesson 2 · The 4 Essential Pointer Gestures: Left, Double, Right & Drag',
      type: 'hardware',
      teacherNotes: {
        promptQuestion:
          'Why does a computer mouse have TWO buttons instead of just one? What makes the right button so special?',
        talkingPoint:
          'Left-click is your index finger pointing: "Choose this!" Double-click is knocking twice: "Open this app!" Right-click is asking: "What are my secret options for this item?" Drag-and-drop is picking up an object, moving it across the table, and setting it down.',
        watchOutFor:
          'Students moving the mouse while clicking, which accidentally triggers accidental drags instead of clean single clicks. Encourage a relaxed wrist and gentle fingertip taps.',
        formalExamTerm:
          'Pointing Device Operations: Pointing, Left-Click (Selection), Double-Click (Execution/Opening), Right-Click (Context Menu), and Drag-and-Drop (Relocation).',
        analogyStory:
          'Left-click is like tapping a classmate on the shoulder. Double-click is knocking "Knock-Knock!" on the principal\'s office door. Right-click is looking at a restaurant food menu to see all the available meals!',
        fullLectureReference:
          'Modern optical mice utilize an infrared LED or laser sensor that snaps thousands of microscopic surface images per second, passing them to a Digital Signal Processor (DSP) to calculate relative delta (X, Y) coordinate vectors. Touchpads operate via capacitive surface grids, detecting the slight electrical charge of human skin to compute coordinate changes and multi-touch gestures (e.g., two-finger scrolling, pinch-to-zoom).',
      },
    },
    {
      id: 'folder-file-lab',
      title: '4. Computer Usage: Folders & Files',
      subtitle: 'Lesson 3 · Digital Filing Systems, Directory Trees & Neat Lab Organization',
      type: 'storage',
      teacherNotes: {
        promptQuestion:
          'What is the difference between a File and a Folder? Can you put a folder inside another folder?',
        talkingPoint:
          'A File is a single specific document—like a letter, a photo, a song, or a school assignment. A Folder (or Directory) is a digital yellow envelope or cabinet that holds multiple files and subfolders so your desktop never becomes a messy heap!',
        watchOutFor:
          'Students saving all their files randomly onto the desktop with names like "document1" or "untitled". Teach them the golden habit of naming files clearly (e.g. "Tolu_Module3_Assignment") inside organized school folders.',
        formalExamTerm:
          'File System Hierarchy: Files (data units with extensions like .docx, .png, .mp3), Folders/Directories (organizational containers), and the Hierarchical Directory Tree (Root -> Parent Directory -> Subdirectory).',
        analogyStory:
          'Your bedroom wardrobe is the Root folder. The shelf labeled "School Uniforms" is a subfolder. The clean pressed white shirt hanging inside is the file. You would never throw your shirts, shoes, books, and food all in one pile on the floor—keep your computer just as neat!',
        fullLectureReference:
          'Operating systems organize persistent storage drives using structured File Systems (e.g., NTFS on Windows, ext4 on Linux, APFS on macOS). A File System manages a Master File Table (MFT) or inode directory tree mapping human-readable names and paths (e.g. C:\\Users\\Student\\Documents\\Homework.txt) to physical sector clusters on the SSD or HDD platters. Folders are special file system nodes that store lists of pointers to child files and nested subdirectories.',
      },
    },
    {
      id: 'touch-typing-lab',
      title: '5. Rapid-Typing 20-Level Arena',
      subtitle: 'Lesson 4 · The F & J Secret Bumps, Home Row Foundation & Speed Progression',
      type: 'milestone',
      teacherNotes: {
        promptQuestion:
          'Close your eyes right now. Place your two index fingers on the keyboard and slide them across the middle row. What tiny tactile secret can you feel under your fingertips?',
        talkingPoint:
          'The secret bumps on F and J are your home navigation anchors! When your left index finger rests on F and your right index finger rests on J, all 8 fingers fall naturally onto the Home Row: A S D F and J K L ;. You never have to look down at your hands again.',
        watchOutFor:
          'The "Hunting and Pecking" chicken-typing habit where students use only their two index fingers and stare down at the keys. Stop this habit immediately! Speed and professional mastery require all 10 fingers on the Home Row.',
        formalExamTerm:
          'Touch-Typing Technique: QWERTY Keyboard layout, Home Row Keys (A S D F - J K L ;), Anchor Keys (F and J raised tactile ridges), and Touch-Typing (typing by motor muscle memory without visual keyboard guidance).',
        analogyStory:
          'Musicians who play the piano or guitar do not look at their fingers while performing on stage. Their fingers know exactly where every note lives because of muscle memory. Your keyboard is your musical instrument—treat it with rhythm and confidence!',
        fullLectureReference:
          'Touch-typing relies on the cerebellum and motor cortex building subconscious kinesthetic muscle memory. The standard QWERTY layout was engineered in 1873 by Christopher Sholes for mechanical typewriters. By anchoring the index fingers on the tactile homing nubs of the F and J keys, each finger is assigned a specific vertical reach column. Mastery of the Home Row foundation provides a launchpad for reaching the Top Row (QWERTY), Bottom Row (ZXCVBNM), and Number Row with zero ocular distraction.',
      },
    },
    {
      id: 'lab-safety-ergonomics',
      title: '6. Ergonomics & Lab Etiquette',
      subtitle: 'Lesson 4 · Posture Health, 20-20-20 Eye Rule & Protecting Work from Power Surges',
      type: 'applications',
      teacherNotes: {
        promptQuestion:
          'Why do software engineers and office workers who sit for hours get neck aches and eye strain? How can we sit like computer champions?',
        talkingPoint:
          'Ergonomics is the science of designing your workspace to keep your body healthy, comfortable, and pain-free. Sit straight with your back supported, feet flat on the floor, elbows at 90 degrees, and eyes level with the top third of the monitor. Follow the 20-20-20 rule: every 20 minutes, look at an object 20 feet away for 20 seconds!',
        watchOutFor:
          'Students slouching over their laptops, resting their chins on their palms, or crossing their legs awkwardly. Correct their posture gently to instill lifelong healthy habits.',
        formalExamTerm:
          'Computer Ergonomics & Laboratory Hazards: Ergonomics (workplace body posture and equipment design), Repetitive Strain Injury (RSI), Eye Strain, and Surge Protection (UPS / AVR).',
        analogyStory:
          'An Olympic sprinter warms up and maintains perfect running posture to run fast without injury. A digital champion sits tall and relaxed at the workstation so their mind can think fast and code for hours without tiring!',
        fullLectureReference:
          'Prolonged poor posture at computer terminals causes Musculoskeletal Disorders (MSDs), cervical spine strain, and Repetitive Strain Injury (RSI) like Carpal Tunnel Syndrome due to compressed median nerves in the wrist. Ergonomic guidelines recommend maintaining neutral wrist alignment, keeping monitor distance between 50–70 cm, and adhering to the 20-20-20 ocular rest protocol to prevent Computer Vision Syndrome (CVS).',
      },
    },
  ],
};

// -------------------------------------------------------------
// Module 3 Complete Master Briefing
// -------------------------------------------------------------
export const module3MasterBriefing: ModuleMasterBriefing = {
  moduleId: 'module-3',
  moduleTitle: 'Module 3: Computer Usage, Booting & Rapid-Typing',
  duration: '40 Minutes (Standard Laboratory Period)',
  targetAudience: 'Secondary School Students (Ages 12–18), Practical Beginners',
  lessonObjective:
    'Equip students with operational confidence: master safe cold/warm booting sequences, command window controls and desktop navigation, build clean hierarchical folder systems, adopt ergonomic posture, and develop 10-finger touch-typing speed across the 20-level typing curriculum.',
  pacingSchedule: [
    {
      time: '00 – 08 mins',
      stage: 'Booting & Power Up',
      action: 'Hook students with the startup process. Explain Cold vs. Warm Booting and demonstrate proper software shutdown (never yanking cords).',
    },
    {
      time: '08 – 18 mins',
      stage: 'Window Controls & Mouse Lab',
      action: 'Project the Window Controls playground. Have students practice Minimize, Maximize, and Close, followed by the 4 mouse pointer moves.',
    },
    {
      time: '18 – 28 mins',
      stage: 'Folder Hierarchy & File Lab',
      action: 'Hands-on laboratory: Every student creates a personal folder (e.g. JSS2_ComputerClass) and organizes sample school files inside.',
    },
    {
      time: '28 – 35 mins',
      stage: '20-Level Rapid-Typing Arena',
      action: 'Guide students to find the secret bumps on F and J. Launch the 20-level RapidTyping engine on student laptops. Students race through Tiers 1 and 2.',
    },
    {
      time: '35 – 40 mins',
      stage: 'Ergonomics & Review Quiz',
      action: 'Practice 20-20-20 eye rests and straight-back posture. Launch the 10-question Module 3 Kahoot review battle in /arena.',
    },
  ],
  formalDefinitions: [
    {
      term: 'Booting',
      definition:
        'The automated initialization process that loads the computer Operating System into main memory (RAM) from persistent storage upon startup.',
      examContext: 'Fundamental WAEC/NECO Computer Studies syllabus standard.',
    },
    {
      term: 'Cold Boot vs. Warm Boot',
      definition:
        'A Cold Boot occurs when the computer is started from a completely unpowered state by pressing the hardware power switch. A Warm Boot (Restart) reloads the operating system while electric power remains continuously active, initiated via software menus or Ctrl + Alt + Delete.',
      examContext: 'Standard distinction tested in both theory and objective examination questions.',
    },
    {
      term: 'POST (Power-On Self-Test)',
      definition:
        'A diagnostic testing sequence executed by the BIOS/UEFI firmware immediately upon power-up to confirm that internal hardware (CPU, RAM, keyboard, storage) is functioning correctly before booting the OS.',
      examContext: 'Essential computer architecture and troubleshooting concept.',
    },
    {
      term: 'Graphical User Interface (GUI)',
      definition:
        'A visual operating system interface that enables users to interact with electronic devices through visual icons, windows, menus, and pointers (WIMP paradigm) rather than typed text commands.',
      examContext: 'Contrasted with Command Line Interface (CLI) in WAEC examinations.',
    },
    {
      term: 'Hierarchical Directory Structure',
      definition:
        'A tree-like organizational system for computer storage where a single Root directory branches into parent folders, child subfolders, and individual files.',
      examContext: 'Primary data organization topic in secondary computer studies.',
    },
    {
      term: 'Touch-Typing',
      definition:
        'The method of typing on a keyboard by relying on muscle memory and spatial familiarity rather than looking at the keys, utilizing all 10 fingers anchored to the Home Row.',
      examContext: 'Practical vocational and professional skill metric.',
    },
  ],
  analogies: [
    {
      title: 'Starting a Motorcycle vs. Idling at Traffic Lights (Cold vs. Warm Boot)',
      story:
        'Cold Boot is like waking up early in the morning and kick-starting your motorcycle from a dead, cold engine. Warm Boot is like stopping at a red traffic light in Ado-Ekiti: the engine is already warm and running, you simply release the clutch and press the throttle to reset your motion!',
      takeaway: 'Cold Boot starts from zero electricity; Warm Boot resets active software without cutting power.',
    },
    {
      title: 'Manila Envelopes in a School Filing Cabinet (Folders vs. Files)',
      story:
        'A file is a single sheet of paper containing your Continuous Assessment test marks. A folder is a sturdy yellow manila envelope. You would never scatter 500 loose examination sheets all over the staff room floor! You place the sheets inside labeled envelopes (Folders), and store the envelopes in the metal cabinet (Root Drive).',
      takeaway: 'Files contain data; Folders contain and organize files.',
    },
    {
      title: 'The Window Shutter Trio (Minimize, Maximize, Close)',
      story:
        'Think of the window in your family parlor: Minimizing is pulling down the thin mosquito net so you can focus on reading inside while keeping the window available. Maximizing is throwing the wooden shutters wide open so the whole room is flooded with breeze and sunlight. Closing is locking the wooden shutters with the iron bolt and turning off the parlor lights!',
      takeaway: 'Minimize hides to taskbar; Maximize fills screen; Close shuts down the app.',
    },
    {
      title: 'The Road Cat-Eyes at Night (F & J Homing Bumps)',
      story:
        'When a commercial driver travels from Akure to Ado-Ekiti at night, they do not get out of the car to inspect the asphalt. They feel the raised reflective "cat-eye" studs in the center of the road guiding their lane. The tiny raised bumps on F and J are your digital cat-eyes—they tell your hands exactly where they are without your eyes ever leaving the screen!',
      takeaway: 'Feel the bumps on F and J to position both hands with zero looking down.',
    },
  ],
  labSafetyRules: [
    'Always shut down the computer properly via the Start Menu; never yank the power cord or flick off the extension switch while the machine is running.',
    'Sit with an upright posture: back straight against the chair, feet flat on the ground, and wrists floating gently above the keyboard.',
    'Follow the 20-20-20 rule to protect your vision: Every 20 minutes, pause and look at something 20 feet away for 20 seconds.',
    'Handle mouse and touchpad gently; clicking harder does not make the computer open programs any faster.',
    'Never place drinks, pure water sachets, or biscuits anywhere near the laptop keyboards and power extension cables.',
  ],
  verbalCheckQuestions: [
    {
      question: 'What is the full meaning of the computer startup acronym POST?',
      answer: 'Power-On Self-Test (the hardware health diagnostic check).',
    },
    {
      question: 'What is the key difference between a Cold Boot and a Warm Boot?',
      answer:
        'Cold Boot starts from a completely powered-off state; Warm Boot reboots the system without turning off electricity.',
    },
    {
      question: 'Which window control button temporarily hides an application to the bottom taskbar without quitting it?',
      answer: 'The Minimize button (➖).',
    },
    {
      question: 'On a standard QWERTY keyboard, which two letters have raised tactile bumps for your index fingers?',
      answer: 'F (left index finger) and J (right index finger).',
    },
    {
      question: 'What keyboard shortcut allows you to save your work instantly to prevent data loss?',
      answer: 'Ctrl + S (Save).',
    },
  ],
  lectureDossier: [
    {
      title: 'Section 1: Operating System Initialization & The Boot Sequence Mechanics',
      summary: 'Electromechanical steps from power button switch closure to operating system kernel loading and user desktop rendering.',
      paragraphs: [
        'Booting (derived from the archaic phrase "pulling oneself up by one\'s bootstraps") is the multi-stage initialization process by which a computer transforms from an inert collection of unpowered circuits into an interactive, operational workstation.',
        'When an operator depresses the physical power button on a System Unit or laptop, a momentary electronic signal triggers the Power Supply Unit (PSU). The PSU converts high-voltage AC mains into steady, regulated DC rails (+3.3V, +5V, +12V). Once voltage rails stabilize, the PSU transmits a "Power Good" logic signal to the motherboard chipset, which releases the CPU from its reset state.',
        'The CPU program counter immediately jumps to a hardcoded memory address in ROM/Flash memory containing the BIOS (Basic Input/Output System) or modern UEFI (Unified Extensible Firmware Interface). The firmware executes POST (Power-On Self-Test), checking internal registers, verifying RAM addresses, detecting keyboard controllers, and querying storage bus interfaces (SATA/NVMe).',
        'Upon successful POST, the firmware inspects the configured boot order list to identify an active boot device. It reads the Master Boot Record (MBR) or EFI system partition, executing the bootloader (e.g., Windows Boot Manager or GRUB). The bootloader copies the core OS kernel, essential device drivers, and system services into RAM, initializing the GUI shell and displaying the student desktop.',
        'In contrast, a Warm Boot (or Restart) is initiated via software (e.g. Start Menu -> Restart or pressing Ctrl + Alt + Delete). The OS safely flushes all write-cache buffers to disk, terminates active user processes, and instructs the motherboard chipset to soft-reset the CPU registers without dropping power rails, completely bypassing the cold hardware diagnostic phase.'
      ],
      keyTakeaways: [
        'Cold booting initializes power rails, firmware POST, and bootloader kernel transfer from storage into RAM.',
        'POST validates hardware integrity before any operating system code executes.',
        'Warm booting reloads the OS without cutting electrical power, preserving hardware component longevity.'
      ],
      teacherScript: 'Class, never just yank the power cord from the wall to shut down a computer. When you do that, the operating system does not have time to close files safely, which can corrupt the whole storage drive. Always click Start and choose Shut Down!'
    },
    {
      title: 'Section 2: GUI Paradigm & The Window Management Architecture',
      summary: 'Understanding the WIMP paradigm: Windows, Icons, Menus, and Pointer mechanics in contemporary desktop environments.',
      paragraphs: [
        'The Graphical User Interface (GUI) represents one of the most consequential human-computer interaction breakthroughs in digital history. Pioneered at Xerox PARC and popularized by the Apple Macintosh and Microsoft Windows, the GUI replaced intimidating command-line syntax with the intuitive WIMP paradigm (Windows, Icons, Menus, Pointer).',
        'The visual Desktop simulates a physical executive writing desk. Icons represent files, folders, and software utilities using recognizable pictorial symbols. The Taskbar (typically anchored at the bottom edge) maintains a visual docket of open processes, background system status indicators (clock, battery, Wi-Fi), and the Start launcher.',
        'Window controls embody user agency. Every application window features a dedicated control trio in its header bar: Minimize (➖) collapses the visual viewport to the taskbar while keeping process state resident in RAM; Maximize/Restore (🗖) toggles the viewport between full display boundaries and a draggable floating rectangular card; Close (❌) sends an exit interrupt, prompting the user to save uncommitted data before releasing all allocated system resources.'
      ],
      keyTakeaways: [
        'The WIMP paradigm (Windows, Icons, Menus, Pointer) makes computing visually accessible.',
        'Minimize preserves active background state; Close terminates the process and frees memory.',
        'The desktop metaphor mirrors a physical office workspace to aid intuitive spatial navigation.'
      ],
      teacherScript: 'If you are typing an essay and your teacher calls you to pay attention to the front projector, click the Minimize button (➖). Your essay is not gone—it is safely waiting at the bottom of your screen!'
    },
    {
      title: 'Section 3: Hierarchical File Organization & Directory Tree Physics',
      summary: 'Data structuring principles: Storage partitions, root directories, subfolders, path naming, and file extensions.',
      paragraphs: [
        'Computer storage without a rigorous file system is analogous to an unindexed library containing millions of uncataloged loose papers. A File System (such as NTFS, FAT32, or exFAT) imposes structured order on storage media.',
        'The primary organizational structure is the Hierarchical Directory Tree. At the apex resides the Root Directory (e.g., C:\\ on Windows or / on Unix). From the root branch top-level parent directories (e.g., Program Files, Windows, Users). Inside user directories reside specialized subdirectories (Documents, Pictures, Downloads, Desktop).',
        'A File represents an indivisible data unit created by an application, identified by two elements: its filename and its file extension (e.g., "Assignment.docx"). The extension (typically 3 to 4 characters following a period) informs the operating system which software handler must be launched to decode the file (e.g., .docx for Word processors, .xlsx for spreadsheets, .png/.jpg for raster images, .mp4 for video, .pdf for portable documents).',
        'A Folder (or Directory) contains no file data itself; rather, it is a specialized table containing directory entry metadata and pointers directing the operating system to the physical sector addresses where child files reside. Instructors must instill rigorous organizational habits: creating dedicated subject folders and utilizing descriptive semantic file naming.'
      ],
      keyTakeaways: [
        'Storage drives are organized using a hierarchical directory tree branching from the Root directory.',
        'File extensions tell the operating system which program is required to decode and open the file.',
        'Neat folder organization prevents file loss, duplicate work, and accidental file overwrites.'
      ],
      teacherScript: 'Never save files with names like "stuff", "doc1", or "asdf". Always use clear names: your name, the subject, and the date, stored neatly inside your class folder!'
    },
    {
      title: 'Section 4: Touch-Typing Motor Learning & Ergonomic Biomechanics',
      summary: 'Neuroplasticity in motor skill acquisition: F/J homing nubs, QWERTY geometry, wrist posture, and long-term strain prevention.',
      paragraphs: [
        'Touch-typing is a kinesthetic motor skill where cognitive intent translates into rapid alphanumeric keystrokes without ocular verification. In the 1870s, Christopher Latham Sholes designed the QWERTY layout to prevent the mechanical jamming of adjacent typebars. Although mechanical jams are irrelevant on electronic keyboards, QWERTY remains the global standard.',
        'Touch-typing pedagogy rests on three foundational principles:',
        '1. Home Row Anchors: The middle row of letters (A S D F for the left hand; J K L ; for the right hand) serves as the permanent home base. The tactile nubs on the F and J keys allow typists to reposition their hands effortlessly by touch alone.',
        '2. Spatial Geometry: Each finger is strictly responsible for a specific vertical column of keys. Thumbs control the Spacebar.',
        '3. Postural Ergonomics: Typing velocity is severely impaired by physical tension. typists must maintain a 90-degree elbow bend, keep wrists straight (floating, never pressed into desk edges), and align the monitor height with eye level to eliminate cervical strain.',
        'Instructors must guide students through deliberate practice: starting with Home Row accuracy, expanding to Top Row and Bottom Row reaches, incorporating Shift key capitalization discipline, and culminating in full speedruns.'
      ],
      keyTakeaways: [
        'Touch-typing replaces visual searching with subconscious cerebellar muscle memory.',
        'F and J tactile homing ridges provide spatial navigation without ocular distraction.',
        'Neutral wrist alignment and upright posture prevent Repetitive Strain Injury (RSI) and maximize speed.'
      ],
      teacherScript: 'Do not peek at the keys! It is completely normal to make mistakes at first. When you keep your eyes on the screen, your brain builds permanent finger memory. In two weeks, your hands will fly across the keyboard like magic!'
    }
  ],
};

// -------------------------------------------------------------
// Module 3 Student Copy Notes
// -------------------------------------------------------------
export const module3Notes: ModuleNotes = {
  moduleId: 'module-3',
  moduleTitle: 'Module 3: Computer Usage, Booting & Rapid-Typing',
  phaseName: 'Phase 1: Foundational Digital Literacy',
  summary:
    'Comprehensive student notebook copy notes covering computer booting procedures, desktop workspace navigation, window control trio, directory tree management, and touch-typing mechanics.',
  sections: [
    {
      id: 'lesson-1-booting',
      title: 'Lesson 1: Booting Your Computer & Power Procedures',
      summary:
        'Booting brings the computer to life. Cold Boot starts from zero power; Warm Boot restarts an active system. Always shut down through the software menu to protect your storage drive.',
      keyTakeaway:
        'Cold Boot starts from complete power-off state; Warm Boot reloads software while power stays on. Never yank cords!',
      points: [
        'Definition of Booting: The process of starting or restarting a computer and loading the Operating System into RAM.',
        'Cold Booting: Starting a computer from a completely turned-off state by pressing the hardware Power Button.',
        'Warm Booting (Restart): Reloading the operating system while the computer is already on without cutting electrical power (e.g. Start Menu -> Restart or Ctrl + Alt + Delete).',
        'POST (Power-On Self-Test): The automatic internal hardware health check run by the BIOS/UEFI before the desktop loads.',
        'Safe Shutdown Sequence: Always click Start Menu -> Power -> Shut Down. NEVER pull out the power plug while the computer is on!',
      ],
    },
    {
      id: 'lesson-2-desktop-controls',
      title: 'Lesson 2: Desktop Anatomy & Window Control Mastery',
      summary:
        'The Desktop is your virtual work table. Use the Window Control Trio (Minimize, Maximize, Close) and the 4 pointer moves to navigate applications with ease.',
      keyTakeaway:
        'Minimize hides to taskbar; Maximize fills screen; Close quits application completely and frees up RAM.',
      points: [
        'The Desktop: The main on-screen workspace where your icons, folders, and windows sit.',
        'Taskbar: The bar at the bottom displaying the Start button, running applications, and the system clock.',
        'Minimize Button (➖): Hides the application window to the taskbar without quitting it.',
        'Maximize / Restore Button (🗖): Expands the window to fill the entire screen, or shrinks it back to a medium box.',
        'Close Button (❌): Quits the application completely and frees up memory (RAM).',
        'Mouse Gestures: Left-Click (Select), Double-Click (Open), Right-Click (Options Menu), Drag & Drop (Move).',
      ],
    },
    {
      id: 'lesson-3-folders-files',
      title: 'Lesson 3: Folders & Files (Computer Usage & Storage Lab)',
      summary:
        'Keep your computer neat and organized. Store files inside clearly named folders instead of piling loose documents all over the desktop.',
      keyTakeaway:
        'Files contain data (.docx, .jpg, .mp3); Folders are containers that organize files into a clean directory tree.',
      points: [
        'What is a File? A specific piece of saved information—such as a typed document (.docx), picture (.jpg), or music track (.mp3).',
        'What is a Folder? A digital yellow envelope or cabinet used to organize and store related files and other subfolders.',
        'Directory Hierarchy: Root Drive (C:\\) -> Parent Folder -> Subfolder -> File.',
        'Creating a Folder: Right-click empty desk space -> New -> Folder -> Type name -> Press Enter.',
        'Renaming an Item: Right-click item -> Select Rename (or press F2) -> Type new name -> Press Enter.',
        'Deleting Safely: Deleted files move to the Recycle Bin and can be restored if deleted by mistake.',
      ],
    },
    {
      id: 'lesson-4-typing-ergonomics',
      title: 'Lesson 4: Touch-Typing, Ergonomics & Lab Etiquette',
      summary:
        'Master the keyboard with the Home Row F/J foundation. Maintain straight sitting posture and rest your eyes to become a healthy, high-speed digital champion.',
      keyTakeaway:
        'Home Row is A S D F (Left) and J K L ; (Right). Feel the bumps on F and J. Save work frequently with Ctrl + S.',
      points: [
        'The Secret Bumps: Raised tactile ridges on the F and J keys help your index fingers find the Home Row without looking.',
        'Home Row Keys: Left hand on A S D F; Right hand on J K L ; (Thumbs rest on the Spacebar).',
        'Touch-Typing: Typing by muscle memory with all 10 fingers while keeping eyes glued to the screen.',
        'Healthy Posture: Sit straight, back supported, feet flat on the floor, and elbows bent at 90 degrees.',
        'The 20-20-20 Rule: Every 20 minutes, look at an object 20 feet away for 20 seconds to prevent eye fatigue.',
        'Shortcut Savior: Press Ctrl + S frequently while working to prevent data loss during power outages.',
      ],
    },
  ],
};

// -------------------------------------------------------------
// Module 3 Student Practical Assignment
// -------------------------------------------------------------
export const module3Assignment: ModuleAssignment = {
  moduleId: 'module-3',
  moduleTitle: 'Module 3: Practical Computer Usage & Rapid-Typing Lab',
  instructions:
    'Complete the following practical assignment questions carefully. Ensure you enter your assigned Patron Number and your Full Name before submitting. Your answers will be submitted to the instructor desk for review.',
  questions: [
    {
      id: 1,
      prompt:
        'Explain the exact difference between a Cold Boot and a Warm Boot. Give one real-life example of when a computer user would perform a Warm Boot.',
      guidance:
        'State which state each starts from (power completely off vs. already running). Mention how a warm boot is triggered (Start Menu Restart or Ctrl+Alt+Del) and when it is needed (e.g., after an app freezes or an update finishes).',
      placeholder:
        'Cold Boot means...\n\nWarm Boot means...\n\nExample of when to warm boot: ...',
    },
    {
      id: 2,
      prompt:
        'Describe the exact function of each button in the Window Control Trio: (a) Minimize (➖), (b) Maximize/Restore (🗖), and (c) Close (❌). Which one should you click if you want to temporarily hide an app to see your desktop?',
      guidance:
        'Define all three buttons clearly. Identify Minimize as the button that hides the window without closing your work.',
      placeholder:
        '1. Minimize (➖): ...\n2. Maximize/Restore (🗖): ...\n3. Close (❌): ...\n\nTo temporarily hide an app without quitting, click: ...',
    },
    {
      id: 3,
      prompt:
        'Write out the step-by-step instructions for creating a new folder on your computer desktop named "JSS2_ComputerStudies" and moving a file named "Lesson1_Notes.txt" inside it.',
      guidance:
        'List: 1. Right-click empty desktop. 2. Select New -> Folder. 3. Type "JSS2_ComputerStudies" and press Enter. 4. Click and drag the file icon directly on top of the new folder icon and release the mouse button.',
      placeholder:
        'Step 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...',
    },
    {
      id: 4,
      prompt:
        'What are the Home Row keys for both your left and right hands? Which two keys feature raised tactile bumps, and why are those bumps important for touch-typing?',
      guidance:
        'Left Hand: A, S, D, F. Right Hand: J, K, L, ;. Bumps on F and J. Explain that the bumps allow your fingers to find their anchor positions by touch without looking down at the keyboard.',
      placeholder:
        'Left Hand Home Row Keys: ...\nRight Hand Home Row Keys: ...\n\nAnchor Keys with Bumps: ... and ...\n\nWhy they are important: ...',
    },
  ],
};

// -------------------------------------------------------------
// Module 3 10-Question Gamified Kahoot Quiz
// -------------------------------------------------------------
export const module3KahootQuestions: KahootQuestion[] = [
  {
    id: 301,
    question: 'What is the term for starting a computer from a completely turned-off state by pressing the power button?',
    options: ['Cold Booting', 'Warm Booting', 'Sleep Mode', 'Hibernation'],
    correctIndex: 0,
    explanation: 'A Cold Boot starts a computer from zero electrical power by turning on the hardware power switch.',
    topic: 'Computer Booting',
    scope: 'module-3',
  },
  {
    id: 302,
    question: 'Which of the following is a WARM BOOT?',
    options: [
      'Unplugging the power cable from the wall',
      'Clicking Start Menu ➔ Restart while the computer is already on',
      'Turning on the generator switch',
      'Opening the laptop lid in the morning',
    ],
    correctIndex: 1,
    explanation: 'A Warm Boot reloads the operating system while the machine is already powered on without cutting electricity.',
    topic: 'Computer Booting',
    scope: 'module-3',
  },
  {
    id: 303,
    question: 'What automated hardware self-check does the computer run immediately upon power-up before loading Windows?',
    options: ['POST (Power-On Self-Test)', 'Antivirus Deep Scan', 'Disk Defragmentation', 'Bluetooth Sync'],
    correctIndex: 0,
    explanation: 'POST (Power-On Self-Test) tests the CPU, RAM, and essential hardware before the OS is loaded.',
    topic: 'Computer Booting',
    scope: 'module-3',
  },
  {
    id: 304,
    question: 'Which window control button temporarily hides an application to the bottom taskbar without closing it?',
    options: ['Minimize (➖)', 'Maximize (🗖)', 'Close (❌)', 'Power (⏻)'],
    correctIndex: 0,
    explanation: 'The Minimize button hides the window to the taskbar. Your work remains active and open in memory!',
    topic: 'Desktop & Window Controls',
    scope: 'module-3',
  },
  {
    id: 305,
    question: 'What mouse gesture is used to open a program or folder on the desktop?',
    options: ['Double-Click (Two quick left taps)', 'Single Right-Click', 'Scroll Wheel spin', 'Holding the power button'],
    correctIndex: 0,
    explanation: 'Double-clicking (two rapid left taps) is like knocking twice on a door to open an application or folder.',
    topic: 'Mouse Navigation',
    scope: 'module-3',
  },
  {
    id: 306,
    question: 'Which mouse button opens the "Secret Options Context Menu"?',
    options: ['Right-Click', 'Left-Click', 'Scroll Wheel Click', 'Touchpad Tap'],
    correctIndex: 0,
    explanation: 'Right-clicking opens the contextual menu showing all available actions (Copy, Paste, Rename, Delete).',
    topic: 'Mouse Navigation',
    scope: 'module-3',
  },
  {
    id: 307,
    question: 'What is the digital container used to organize and store related files on a computer called?',
    options: ['Folder (Directory)', 'Microprocessor', 'Monitor', 'RAM Stick'],
    correctIndex: 0,
    explanation: 'A Folder is a digital container that holds files and subfolders to keep your storage organized.',
    topic: 'File Management',
    scope: 'module-3',
  },
  {
    id: 308,
    question: 'On a standard keyboard, which two letters feature raised tactile bumps for your index fingers?',
    options: ['F and J', 'A and L', 'Q and P', 'Z and M'],
    correctIndex: 0,
    explanation: 'F (left hand) and J (right hand) have raised tactile bumps so typists can find the Home Row without looking down.',
    topic: 'Touch-Typing',
    scope: 'module-3',
  },
  {
    id: 309,
    question: 'What are the 8 Home Row keys where your fingers should always rest?',
    options: [
      'A S D F (Left) and J K L ; (Right)',
      'Q W E R (Left) and U I O P (Right)',
      'Z X C V (Left) and B N M , (Right)',
      '1 2 3 4 (Left) and 7 8 9 0 (Right)',
    ],
    correctIndex: 0,
    explanation: 'The Home Row foundation is A S D F for the left hand and J K L ; for the right hand.',
    topic: 'Touch-Typing',
    scope: 'module-3',
  },
  {
    id: 310,
    question: 'What essential keyboard shortcut saves your work immediately to prevent loss during power cuts?',
    options: ['Ctrl + S', 'Ctrl + C', 'Ctrl + V', 'Ctrl + Z'],
    correctIndex: 0,
    explanation: 'Ctrl + S triggers the universal Save command, writing open work from volatile RAM into permanent storage.',
    topic: 'Lab Safety & Shortcuts',
    scope: 'module-3',
  },
];
