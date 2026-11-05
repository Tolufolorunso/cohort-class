export type UserRole = 'teacher' | 'student';

export type ZoomLevel = 'normal' | 'large' | 'xlarge';

export type ActiveView = 'stage' | 'notes' | 'assignment' | 'dashboard';

export interface StudentSubmission {
  id: string;
  patronNumber: string;
  studentName: string;
  moduleId: string;
  moduleTitle: string;
  answers: Record<number, string>;
  submittedAt: string;
  status: 'submitted' | 'reviewed';
}

export interface StudentNoteSection {
  id: string;
  title: string;
  summary: string;
  keyTakeaway: string;
  points: string[];
}

export interface ModuleNotes {
  moduleId: string;
  moduleTitle: string;
  phaseName: string;
  summary: string;
  sections: StudentNoteSection[];
}

export interface HomeworkQuestion {
  id: number;
  prompt: string;
  guidance: string;
  placeholder: string;
}

export interface ModuleAssignment {
  moduleId: string;
  moduleTitle: string;
  instructions: string;
  questions: HomeworkQuestion[];
}

export interface ModuleLockState {
  unlockedModuleIds: string[];
}

