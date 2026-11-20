import { Metadata } from 'next';
import { UnifiedSlideDeck } from '../../../components/presentation/UnifiedSlideDeck';

export const metadata: Metadata = {
  title: "Today's Instructor Presentation Deck | Dzuels Computer Class",
  description:
    'Instructor command deck for live classroom presentations, in-slide teaching notes, and real-time slide mirroring.',
};

export default function InstructorTodayPage() {
  return <UnifiedSlideDeck isInstructorView={true} />;
}
