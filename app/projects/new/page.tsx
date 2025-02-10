'use client';

import { OctagonAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { JSX, useCallback, useEffect, useState } from 'react';

import { postProject } from '@/api/project/postProject';
import { DockComponent } from '@/components/DockComponent';
import { SelectProjectClientForm } from '@/components/forms/project/newProject/CreateClientForm';
import { CreateProjectPlantForm } from '@/components/forms/project/newProject/CreatePlantForm';
import { CreateProjectProcessForm } from '@/components/forms/project/newProject/CreateProcessForm';
import { CreateProjectForm } from '@/components/forms/project/newProject/CreateProjectForm';
import { SelectProjectTeamForm } from '@/components/forms/project/newProject/CreateTeamForm';
import { DeleteProjectDataForm } from '@/components/forms/project/newProject/DeleteData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LOCAL_STORAGE_KEY_DATA, LOCAL_STORAGE_KEY_POST_PROJECT } from '@/const/const';
import { defaultDockData } from '@/const/dockData';
import { useToast } from '@/hooks/use-toast';
import { ProjectPost } from '@/types/Project';
import { parsePartialProject } from '@/utils/parseTypes';

export type FormStepType = 'Cliente' | 'Equipo' | 'Planta' | 'Proceso' | 'Proyecto' | 'Borrar';

export interface DockData {
  title: FormStepType;
  icon: React.ReactNode;
  completed: boolean;
  active: boolean;
}

interface RelatedIds {
  clientId?: number;
  vendedorId?: number;
  engineerId?: number;
  contractorId?: number;
}

const NewProject = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [clientName, setClientName] = useState<string>('');
  const [shouldPost, setShouldPost] = useState(false);

  const [project, setProject] = useState<Partial<ProjectPost>>({});

  const [data, setData] = useState<DockData[]>(() => {
    const savedData =
      typeof window !== 'undefined' ? window.localStorage.getItem(LOCAL_STORAGE_KEY_DATA) : null;
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return parsedData.map(
        (item: Omit<DockData, 'icon'>, index: number): DockData => ({
          ...item,
          icon: defaultDockData[index].icon, // Restore the icon
        })
      );
    }

    return defaultDockData;
  });

  const current = data.find((item) => item.active) || data[0];
  const nextIndex = data.findIndex((item) => item.title === current.title) + 1;

  const handleUpdateProject = (partialData: Partial<ProjectPost>, post: boolean = false) => {
    setProject((prev) => ({ ...prev, ...partialData }));
    // The update is asynchronous, meaning that the rest of the function gets called before the state has actually updated.
    // Instead of calling post immediately, a flag is stored indicating that we need to post
    if (post) setShouldPost(true);
  };

  const handleActivate = (id: number) => {
    const nextStepIndex = id - 1;
    const updatedData = data.map((item, idx) => ({
      ...item,
      active: idx === nextStepIndex,
    }));

    setData(updatedData);
  };

  const handleStep = () => {
    const updatedActive = data.map((item, idx) => ({
      ...item,
      active: idx === nextIndex,
    }));
    const updatedCompleted = updatedActive.map((item) =>
      item.title === current.title ? { ...item, completed: true } : item
    );

    setData(updatedCompleted);
  };

  const handlePostClient = (client: { id: number; name: string }) => {
    setProject((prev) => ({ ...prev, client: client.id }));
    setClientName(client.name);
    handleStep();
  };

  const handlePostProject = useCallback(async () => {
    try {
      const cleanData = parsePartialProject(project);
      const response = await postProject(cleanData as ProjectPost);

      toast({ description: 'Proyecto creado' });

      if (localStorage) localStorage.removeItem(LOCAL_STORAGE_KEY_POST_PROJECT);
      if (localStorage) localStorage.removeItem(LOCAL_STORAGE_KEY_DATA);

      router.push(`/projects/${response.id}`);
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: String(error),
      });
    }
  }, [project, router, toast]);

  const getForms = (): JSX.Element => {
    switch (current?.title) {
      case 'Cliente':
        return (
          <SelectProjectClientForm
            setClient={handlePostClient}
            handleStep={handleStep}
            defaultValue={project.client ?? undefined}
          />
        );
      case 'Equipo':
        return (
          <SelectProjectTeamForm
            updateProject={handleUpdateProject}
            defaultValues={
              project.vendedor && project.ingeniero
                ? {
                    vendorId: project.vendedor,
                    engineerId: project.ingeniero,
                    contractorId: project.contratista ?? undefined,
                  }
                : undefined
            }
            handleStep={handleStep}
          />
        );
      case 'Planta':
        return (
          <CreateProjectPlantForm updateProject={handleUpdateProject} handleStep={handleStep} />
        );
      case 'Proceso':
        return (
          <CreateProjectProcessForm updateProject={handleUpdateProject} handleStep={handleStep} />
        );
      case 'Proyecto':
        if (!project.client || !project.vendedor || !project.ingeniero) {
          return (
            <ProjectAlert
              ids={{
                clientId: project.client,
                vendedorId: project.vendedor,
                engineerId: project.ingeniero,
              }}
            />
          );
        }
        return <CreateProjectForm updateProject={handleUpdateProject} clientName={clientName} />;
      case 'Borrar':
        return <DeleteProjectDataForm />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProject = window.localStorage.getItem(LOCAL_STORAGE_KEY_POST_PROJECT);
      if (savedProject) setProject(JSON.parse(savedProject));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined')
      localStorage.setItem(LOCAL_STORAGE_KEY_POST_PROJECT, JSON.stringify(project));
  }, [project]);

  useEffect(() => {
    const serializableData = data.map(({ title, completed, active }) => ({
      title,
      completed,
      active,
    }));

    if (typeof window !== 'undefined')
      localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(serializableData));
  }, [data]);

  useEffect(() => {
    if (!data.some((item) => item.active)) {
      setData((prevData) => prevData.map((item, index) => ({ ...item, active: index === 0 })));
    }
  }, [data]);

  useEffect(() => {
    if (shouldPost) {
      handlePostProject();
      setShouldPost(false);
    }
  }, [shouldPost, handlePostProject]);

  return (
    <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center">
      <div className="container flex max-h-[92%] flex-col justify-center px-2 py-4 md:p-10">
        <div className="flex h-full w-full flex-col items-start justify-center overflow-scroll rounded-lg border bg-black/5 p-10 shadow-lg">
          {getForms()}
        </div>
      </div>
      <DockComponent data={data} handleClick={(idx) => handleActivate(idx + 1)} />
    </div>
  );
};

export default NewProject;

function ProjectAlert({ ids }: { ids: RelatedIds }) {
  return (
    <div className="flex w-full items-center justify-center sm:h-[calc(60vh-64px)]">
      <Alert className="max-w-[400px] bg-transparent">
        <OctagonAlert className="size-7" />
        <AlertTitle className="ml-3 text-3xl">Atención!</AlertTitle>
        <AlertDescription className="ml-3 text-lg">
          <p>Para crear un proyecto falta seleccionar:</p>
          <ul>
            {ids.clientId === null && <li>- Cliente</li>}
            {ids.vendedorId === null && <li>- Vendedor</li>}
            {ids.engineerId === null && <li>- Ingeniero</li>}
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
