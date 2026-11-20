export interface SlideBullet {
  icon: string;
  title: string;
  desc: string;
}

export interface SlideTeacherNotes {
  promptQuestion: string;
  talkingPoint: string;
  watchOutFor: string;
}

export type InteractiveLabType =
  | 'ipos'
  | 'device-sorting'
  | 'peripheral-sorting'
  | 'system-unit-disassembly'
  | 'storage-bytes'
  | 'booting'
  | 'desktop-controls'
  | 'mouse-gym'
  | 'folder-lab'
  | 'touch-typing'
  | 'quiz-launcher';

export interface ModuleSlide {
  id: number;
  part: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  bullets: SlideBullet[];
  analogy?: string;
  interactiveType?: InteractiveLabType;
  teacherNotes: SlideTeacherNotes;
}

export interface ModuleSlideDeckData {
  moduleId: string;
  moduleTitle: string;
  moduleSubtitle: string;
  slides: ModuleSlide[];
}
