import { Timeline } from '@/components/ui/timeline';
import { etapasChoices } from '@/const/formChoices';
import { ProjectDetail } from '@/types/Project';

import { CustomCard } from './CustomCard';

export const ProjectStepCard = ({ project }: { project: ProjectDetail }) => {
  const currentStageIndex = project.etapa_proyecto
    ? etapasChoices.findIndex((stage) => stage.value === project.etapa_proyecto)
    : -1;

  const timelineSteps = etapasChoices.map((stage, index) => ({
    label: stage.label,
    date: new Date().toISOString(),
    status: (index < currentStageIndex
      ? 'completed'
      : index === currentStageIndex
        ? 'current'
        : 'upcoming') as 'completed' | 'current' | 'upcoming',
  }));

  return (
    <CustomCard title="Etapa del Proyecto">
      <Timeline steps={timelineSteps} projectId={project.id} />
    </CustomCard>
  );
};
