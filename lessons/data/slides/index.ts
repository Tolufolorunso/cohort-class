import { ModuleSlideDeckData } from '../../types/presentation';
import { module1Slides } from './module1Slides';
import { module2Slides } from './module2Slides';
import { module3Slides } from './module3Slides';

export const MODULE_DECKS: Record<string, ModuleSlideDeckData> = {
  'module-1': {
    moduleId: 'module-1',
    moduleTitle: 'Module 1: Introduction to Computers',
    moduleSubtitle: 'Core Definition, IPOS Cycle, History, Device Types & Lab Safety',
    slides: module1Slides,
  },
  'module-2': {
    moduleId: 'module-2',
    moduleTitle: 'Module 2: Parts of a Computer (Hardware Lab)',
    moduleSubtitle: 'Hardware Anatomy, Input vs. Output, System Unit Disassembly & Storage',
    slides: module2Slides,
  },
  'module-3': {
    moduleId: 'module-3',
    moduleTitle: 'Module 3: Computer Usage, Booting & Rapid-Typing',
    moduleSubtitle: 'Cold/Warm Booting, Window Controls, Mouse Gym, Folder Lab & Rapid-Typing',
    slides: module3Slides,
  },
};

export function getModuleDeck(moduleId: string): ModuleSlideDeckData {
  return MODULE_DECKS[moduleId] || MODULE_DECKS['module-1'];
}

export function getAllModuleDecks(): ModuleSlideDeckData[] {
  return Object.values(MODULE_DECKS);
}
