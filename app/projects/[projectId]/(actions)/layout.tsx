'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getDetailedProject } from '@/api/project/getDetailedProject';
import { ActionLine } from '@/components/ActionLine';
import { PathDrawing } from '@/components/Loader';
import { ProjectDetail } from '@/types/Project';

export default function ActionsLayout({ children }: { children: React.ReactNode }) {
  const { projectId } = useParams() as { projectId: string };

  const [project, setProject] = useState<ProjectDetail>();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const stageDetails = await getDetailedProject(projectId);
      setProject(stageDetails);
    };
    fetchProjectDetails();
  }, [projectId]);

  if (!project)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <PathDrawing />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <ActionLine />
      <div className="container rounded-lg p-8 shadow-md">{children}</div>
    </div>
  );
}
