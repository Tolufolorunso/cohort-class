export type UserRole = 'teacher' | 'student';

export type TeacherRole = 'adminTolu' | 'adminIsaac';

export type ZoomLevel = 'normal' | 'large' | 'xlarge';

export type ActiveView = 'stage' | 'notes' | 'assignment' | 'dashboard';

export type SyncMode = 'follow-teacher' | 'self-paced';

export interface AuthorizedStudent {
  patronNumber: string;
  studentName: string;
}

export interface StudentSession {
  patronNumber: string;
  studentName: string;
  loggedInAt: number;
  expiresAt: number; // loggedInAt + 1 hour (3,600,000 ms)
}

export interface TeacherSession {
  role: TeacherRole;
  displayName: string;
  authenticatedAt: number;
}

export interface LiveSessionState {
  activeModuleId: string;
  activeLessonIndex: number;
  activeStageIndex: number;
  syncMode: SyncMode;
  activeKahootQuestionId: number | null;
  isKahootRevealed: boolean;
  kahootVotes?: Record<string, number>; // patronNumber -> optionIndex (0, 1, 2, 3)
  kahootTally?: [number, number, number, number]; // counts for Red Triangle, Blue Diamond, Yellow Circle, Green Square
  activeStudents: Record<string, { studentName: string; lastSeen: number }>;
  updatedAt: number;
}

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
