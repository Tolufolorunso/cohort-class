import { Metadata } from 'next';
import { TodayClassDeck } from '../../components/today/TodayClassDeck';

export const metadata: Metadata = {
  title: "Today's Practical Class - Rapid-Typing, Folders & Navigation | Dzuels Computer Class",
  description:
    'Straightforward, presentation-style lesson slides for secondary school students covering rapid touch typing, folder & file management, and mouse/window navigation.',
};

export default function TodayClassPage() {
  return <TodayClassDeck />;
}
