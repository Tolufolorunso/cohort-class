'use client';

import React from 'react';
import { getOnePageTeacherGuide } from '../../data/teacherBriefings';
import { OnePageTeacherBriefingModal } from './OnePageTeacherBriefingModal';

interface Module2MasterBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Module2MasterBriefingModal({
  isOpen,
  onClose,
}: Module2MasterBriefingModalProps) {
  const guide = getOnePageTeacherGuide('module-2');
  return (
    <OnePageTeacherBriefingModal
      guide={guide}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
