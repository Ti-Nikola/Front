import { ProyectoType } from '@/const/formChoices';
import { ProjectDetail } from '@/types/Project';

export function getProjectType(tipo_proyecto?: ProyectoType): string {
  if (!tipo_proyecto) return '';
  switch (tipo_proyecto) {
    case 'Inyección 0':
      return 'I0';
    case 'OffGrid':
      return 'OFF';
    case 'OnGrid':
      return 'ON';
  }
}

export function getProjectKey(tipo_proyecto?: ProyectoType, key?: number | string): string {
  if (!tipo_proyecto || !key) return '';
  const type = getProjectType(tipo_proyecto);
  return `${type} ${key}`;
}

export function getProjectTitle(
  project: Partial<ProjectDetail>,
  centro_costo: boolean = false
): string {
  const type = getProjectType(project.tipo_proyecto);
  const key = project.key || '';
  const client = project.client_name
    ? centro_costo
      ? project.client_name.toUpperCase()
      : project.client_name
    : '';

  return `${type} ${key} - ${client}`;
}
