import { LearnView } from '../../../components/learn/LearnView';

export function generateStaticParams() {
  return [
    { moduleId: 'module-1' },
    { moduleId: 'module-2' },
    { moduleId: 'module-3' },
    { moduleId: 'module-4' },
    { moduleId: 'module-5' },
  ];
}

interface LearnPageProps {
  params: Promise<{ moduleId: string }>;
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { moduleId } = await params;
  return <LearnView moduleId={moduleId} />;
}
