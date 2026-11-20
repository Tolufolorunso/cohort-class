'use client';

import React from 'react';
import { getOnePageTeacherGuide } from '../../data/teacherBriefings';
import { OnePageTeacherBriefingModal } from './OnePageTeacherBriefingModal';

interface Module1MasterBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Module1MasterBriefingModal({
  isOpen,
  onClose,
}: Module1MasterBriefingModalProps) {
  const guide = getOnePageTeacherGuide('module-1');
  return (
    <OnePageTeacherBriefingModal
      guide={guide}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
