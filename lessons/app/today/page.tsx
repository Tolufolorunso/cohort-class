import { Metadata } from 'next';
import { UnifiedSlideDeck } from '../../components/presentation/UnifiedSlideDeck';

export const metadata: Metadata = {
  title: "Today's Practical Class | Dzuels Computer Class",
  description:
    'Interactive 16:9 widescreen PowerPoint-style lesson slides for secondary school students covering today’s active curriculum module.',
};

export default function TodayClassPage() {
  return <UnifiedSlideDeck />;
}
