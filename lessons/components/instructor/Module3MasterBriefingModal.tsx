'use client';

import React from 'react';
import { getOnePageTeacherGuide } from '../../data/teacherBriefings';
import { OnePageTeacherBriefingModal } from './OnePageTeacherBriefingModal';

interface Module3MasterBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Module3MasterBriefingModal({
  isOpen,
  onClose,
}: Module3MasterBriefingModalProps) {
  const guide = getOnePageTeacherGuide('module-3');
  return (
    <OnePageTeacherBriefingModal
      guide={guide}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
