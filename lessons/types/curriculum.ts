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

