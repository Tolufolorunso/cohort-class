export type UserRole = 'teacher' | 'student';

export type TeacherRole = 'adminTolu' | 'adminIsaac';

export type ZoomLevel = 'normal' | 'large' | 'xlarge';

export type ActiveView = 'stage' | 'notes' | 'assignment' | 'dashboard';

export type SyncMode = 'follow-teacher' | 'self-paced';

export type LoginMode = 'solo' | 'partner';

export interface StudentPartner {
  patronNumber: string;
  studentName: string;
}

export interface AuthorizedStudent {
  patronNumber: string;
  studentName: string;
}

export interface StudentSession {
  mode: LoginMode;
  partnerA: StudentPartner;
  partnerB?: StudentPartner; // present when mode === 'partner'
  // Convenience accessors for display and backward-compatibility
  patronNumber: string; // partnerA.patronNumber
  studentName: string; // formatted e.g. "Adewale O." or "Adewale O. & Chioma E. (Lab Partners)"
  loggedInAt: number;
  expiresAt: number; // loggedInAt + 3 hours (10,800,000 ms)
}

export interface TeacherSession {
  role: TeacherRole;
  displayName: string;
  authenticatedAt: number;
}

export interface LiveConnectedLaptop {
  laptopId: string;
  mode: LoginMode;
  partnerA: StudentPartner;
  partnerB?: StudentPartner;
  lastSeen: number;
  isFocused?: boolean; // false when student minimized or switched tabs
  leftScreenAt?: number | null; // timestamp when screen was left
  awayDurationSeconds?: number; // duration student has been away from screen
}

export interface ClassroomAttentionAlert {
  laptopId: string;
  studentName: string;
  leftScreenAt: number;
  awayDurationSeconds: number;
}

export interface LiveSessionState {
  activeModuleId: string;
  activeLessonIndex: number;
  activeStageIndex: number;
  syncMode: SyncMode;
  activeKahootQuestionId: number | null;
  isKahootRevealed: boolean;
  kahootVotes?: Record<string, number>; // patronNumber or laptopId -> optionIndex (0, 1, 2, 3)
  kahootTally?: [number, number, number, number]; // counts for Red Triangle, Blue Diamond, Yellow Circle, Green Square
  activeStudents: Record<
    string,
    {
      studentName: string;
      lastSeen: number;
      partnerB?: StudentPartner;
      mode?: LoginMode;
      isFocused?: boolean;
      leftScreenAt?: number | null;
      awayDurationSeconds?: number;
    }
  >;
  activeLaptops?: Record<string, LiveConnectedLaptop>;
  attentionAlerts?: ClassroomAttentionAlert[];
  updatedAt: number;
}

export type SubmissionType = 'joint' | 'individual';

export interface StudentSubmission {
  id: string;
  submissionType?: SubmissionType;
  partnerA?: StudentPartner;
  partnerB?: StudentPartner;
  submittingStudent?: string; // patron or name when individual submission from shared laptop
  patronNumber: string; // primary reference
  studentName: string; // display reference
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

export interface CohortAttendanceStudent {
  barcode: string;
  name?: string;
  attended: boolean;
  status?: string;
  markedBy?: string;
}

export interface CohortAttendanceSummary {
  success: boolean;
  cohortType: string;
  date: string;
  week: number;
  totalStudents?: number;
  presentCount?: number;
  absentCount?: number;
  attendanceRate?: number;
  totalSubmitted?: number;
  markedCount?: number;
  students?: CohortAttendanceStudent[];
  records?: CohortAttendanceStudent[];
  unmatched?: string[];
  markedBy?: string;
  requester?: string;
  message?: string;
  error?: string;
}
