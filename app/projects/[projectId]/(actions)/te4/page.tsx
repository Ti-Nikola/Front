'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getDetailedProject } from '@/api/project/getDetailedProject';
import { DocumentGenerationCard } from '@/components/tools/F5/GenContratoF5';
import { ToolsHeader } from '@/components/tools/Header';
import { Button } from '@/components/ui/button';
import { ProjectDetail } from '@/types/Project';

export default function Bienvenida() {
  const { projectId } = useParams() as { projectId: string };
  const router = useRouter();

  const [project, setProject] = useState<ProjectDetail>();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const stageDetails = await getDetailedProject(projectId);
      setProject(stageDetails);
    };
    fetchProjectDetails();
  }, [projectId]);

  const handleReturnToProject = () => {
    router.replace(`/projects/${projectId}`);
  };

  if (!project) return;

  return (
    <div className="space-y-8">
      <ToolsHeader project={project} />

      <DocumentGenerationCard
        onGenerate={() => console.log('Document generation initiated')}
        project={project}
      />

      <Button onClick={handleReturnToProject}>Vuelta al Proyecto</Button>
    </div>
  );
}
