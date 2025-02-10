'use client';

import { ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getDetailedProject } from '@/api/project/getDetailedProject';
import carportNight from '@/assets/projectType/carport-night.jpg';
import carport from '@/assets/projectType/carport.jpg';
import floorNight from '@/assets/projectType/floor-night.webp';
import floor from '@/assets/projectType/floor.jpeg';
import roofNight from '@/assets/projectType/roof-night.webp';
import roof from '@/assets/projectType/roof.avif';
import { PathDrawing } from '@/components/Loader';
import { ClientCard } from '@/components/portal/ClientCard';
import { ProjectHeader } from '@/components/portal/Header';
import { PaymentsCard } from '@/components/portal/PaymentsCard';
import { ProjectDetailCard } from '@/components/portal/ProjectDetailCard';
import { ProjectStepCard } from '@/components/portal/ProjectStepCard';
import { TransactionCard } from '@/components/portal/TransactionCard';
import { ProjectDetail } from '@/types/Project';

export default function ProjectShowPage() {
  const { projectId } = useParams() as { projectId: string };
  const { theme } = useTheme();

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const triggerRefetch = () => setReloadKey((prev) => prev + 1);

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getDetailedProject(projectId);
      setProject(projectData);
    };
    fetchProject();
  }, [projectId, reloadKey]);

  if (!project)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <PathDrawing />
      </div>
    );

  const getImgUrl = () => {
    let imageUrl = '';

    if (project.tipo_instalacion === 'Techo') {
      imageUrl = theme === 'dark' ? roofNight.src : roof.src;
    } else if (project.tipo_instalacion === 'Piso') {
      imageUrl = theme === 'dark' ? floorNight.src : floor.src;
    } else if (project.tipo_instalacion === 'Carport') {
      imageUrl = theme === 'dark' ? carportNight.src : carport.src;
    }

    return imageUrl;
  };

  const imageUrl = getImgUrl();

  return (
    <div
      className="sticky mx-auto min-h-screen space-y-8 bg-cover bg-fixed bg-center p-7"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-background opacity-50 dark:opacity-30" />
      <div className="relative z-10">
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-2 text-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Vuelta a Proyectos
        </Link>

        <ProjectHeader project={project} />

        <div className="mt-4 gap-6 md:grid md:grid-cols-2">
          <div className="space-y-6">
            <ProjectDetailCard project={project} triggerRefetch={triggerRefetch} />
            <ClientCard project={project} triggerRefetch={triggerRefetch} />
          </div>
          <div className="space-y-6">
            <ProjectStepCard project={project} />
            <TransactionCard project={project} triggerRefetch={triggerRefetch} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-1">
          <PaymentsCard project={project} triggerRefetch={triggerRefetch} />
        </div>
      </div>
    </div>
  );
}
