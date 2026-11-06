import { AssignmentsModuleView } from '../../../components/assignments/AssignmentsModuleView';

export function generateStaticParams() {
  return [
    { moduleId: 'module-1' },
    { moduleId: 'module-2' },
    { moduleId: 'module-3' },
    { moduleId: 'module-4' },
    { moduleId: 'module-5' },
  ];
}

interface AssignmentsPageProps {
  params: Promise<{ moduleId: string }>;
}

export default async function AssignmentsPage({ params }: AssignmentsPageProps) {
  const { moduleId } = await params;
  return <AssignmentsModuleView moduleId={moduleId} />;
}
