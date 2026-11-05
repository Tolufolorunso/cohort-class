'use client';

import React from 'react';
import { StageShell } from '../components/presentation/StageShell';
import { StageDefinition } from '../components/stages/StageDefinition';
import { StageIPOS } from '../components/stages/StageIPOS';
import { StageTimeline } from '../components/stages/StageTimeline';
import { StageDeviceSorting } from '../components/stages/StageDeviceSorting';
import { StageApplications } from '../components/stages/StageApplications';
import { StageQuiz } from '../components/stages/StageQuiz';

export default function Home() {
  return (
    <StageShell>
      {(_currentStageIndex, currentStageId) => {
        switch (currentStageId) {
          case 'what-is-a-computer':
            return <StageDefinition />;
          case 'ipos-cycle':
            return <StageIPOS />;
          case 'history-timeline':
            return <StageTimeline />;
          case 'device-sorting':
            return <StageDeviceSorting />;
          case 'applications':
            return <StageApplications />;
          case 'review-quiz':
            return <StageQuiz />;
          default:
            return <StageDefinition />;
        }
      }}
    </StageShell>
  );
}
