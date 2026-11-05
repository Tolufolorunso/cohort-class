export type StageType =
  | 'definition'
  | 'ipos'
  | 'timeline'
  | 'sorting'
  | 'applications'
  | 'quiz';

export interface StageMeta {
  id: string;
  title: string;
  subtitle: string;
  type: StageType;
}

export interface LessonUnit {
  id: string;
  lessonNumber: number;
  title: string;
  duration: string;
  objective: string;
  summary: string;
  topics: string[];
}

export type ImageFallbackType =
  | 'desktop'
  | 'laptop'
  | 'tablet'
  | 'smartphone'
  | 'supercomputer'
  | 'ipos'
  | 'abacus'
  | 'babbage'
  | 'history'
  | 'safety'
  | 'school'
  | 'hospital'
  | 'bank'
  | 'farm';

export interface ImageCard {
  id: string;
  title: string;
  caption: string;
  url: string;
  fallbackType: ImageFallbackType;
  badge?: string;
  aspect?: string;
}

export type KahootShape = 'triangle' | 'diamond' | 'circle' | 'square';

export interface KahootOptionConfig {
  shape: KahootShape;
  label: string;
  colorName: string;
  bgColor: string;
  hoverColor: string;
  borderColor: string;
  textColor: string;
}

export interface KahootQuestion {
  id: number;
  question: string;
  options: [string, string, string, string]; // Exactly 4 options for [Red Triangle, Blue Diamond, Yellow Circle, Green Square]
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
  topic: string;
  timeLimitSeconds?: number;
}

export interface ComputerCharacteristic {
  id: string;
  title: string;
  tagline: string;
  description: string;
  realWorldExample: string;
}

export interface ComparisonRow {
  aspect: string;
  calculator: string;
  computer: string;
}

export type IPOSPhase = 'input' | 'processing' | 'output' | 'storage';

export interface IPOSStepInfo {
  phase: IPOSPhase;
  name: string;
  hardware: string;
  functionDesc: string;
}

export interface IPOSAnalogyStep {
  phase: IPOSPhase;
  label: string;
  description: string;
  badge: string;
}

export interface IPOSAnalogy {
  id: string;
  title: string;
  tagline: string;
  steps: Record<IPOSPhase, IPOSAnalogyStep>;
}

export interface TimelineEvent {
  id: string;
  period: string;
  title: string;
  pioneer: string;
  keyInnovation: string;
  description: string;
  significance: string;
}

export type DeviceCategory =
  | 'desktop'
  | 'laptop'
  | 'tablet'
  | 'smartphone'
  | 'supercomputer';

export interface DeviceCategoryDefinition {
  id: DeviceCategory;
  name: string;
  description: string;
}

export interface DeviceItem {
  id: string;
  name: string;
  category: DeviceCategory;
  clues: string[];
  explanation: string;
}

export interface ApplicationSector {
  id: string;
  name: string;
  tagline: string;
  examples: {
    title: string;
    description: string;
  }[];
  discussionPrompt: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface ModuleData {
  id: string;
  moduleNumber: number;
  phaseName: string;
  title: string;
  duration: string;
  objective: string;
  stages: StageMeta[];
}

