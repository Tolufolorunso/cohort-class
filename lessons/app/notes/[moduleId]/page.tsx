import { NotesModuleView } from '../../../components/notes/NotesModuleView';

export function generateStaticParams() {
  return [
    { moduleId: 'module-1' },
    { moduleId: 'module-2' },
    { moduleId: 'module-3' },
    { moduleId: 'module-4' },
    { moduleId: 'module-5' },
  ];
}

interface NotesPageProps {
  params: Promise<{ moduleId: string }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { moduleId } = await params;
  return <NotesModuleView moduleId={moduleId} />;
}
