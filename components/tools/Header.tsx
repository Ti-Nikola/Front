import { Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { ProjectDetail } from '@/types/Project';
import { parseCoordinates } from '@/utils/parseTypes';

export const ToolsHeader = ({ project }: { project: ProjectDetail }) => {
  const defaultCoordinates = '0,0';
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">{project.titulo}</h1>
          <NavigationLinks
            coordinates={parseCoordinates(project.coordenadas || defaultCoordinates)}
          />
        </div>
        <Badge
          variant={
            project.etapa_proyecto === 'Bienvenida'
              ? 'default'
              : project.etapa_proyecto === 'Visita Técnica'
                ? 'secondary'
                : 'outline'
          }
          className="text-sm"
        >
          {project.etapa_proyecto}
        </Badge>
      </div>
    </div>
  );
};

const NavigationLinks = ({ coordinates }: { coordinates: { lat: string; lng: string } }) => (
  <>
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-md hover:bg-gray-100"
    >
      <i className="fab fa-google text-xl"></i>
      <span>Google Maps</span>
    </a>

    <a
      href={`https://waze.com/ul?ll=${coordinates.lat},${coordinates.lng}&navigate=yes`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-md hover:bg-gray-100"
    >
      <i className="fab fa-waze text-xl"></i>
      <span>Waze</span>
    </a>
  </>
);
