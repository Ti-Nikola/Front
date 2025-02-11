import { Zap } from 'lucide-react';

import { ProjectDetail } from '@/types/Project';
import { parseCoordinates } from '@/utils/parseTypes';

const defaultCoordinates = '0,0';

export const ProjectHeader = ({ project }: { project: ProjectDetail }) => {
  return (
    <div className="flex flex-col items-center justify-between md:flex-row">
      <div className="flex items-center gap-2">
        <Zap className="h-8 w-8 text-yellow-500" />
        <h1 className="text-3xl font-bold">{project.titulo}</h1>
      </div>
      <NavigationLinks coordinates={parseCoordinates(project.coordenadas || defaultCoordinates)} />
    </div>
  );
};

const NavigationLinks = ({ coordinates }: { coordinates: { lat: string; lng: string } }) => (
  <div className="mt-4 flex gap-4">
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 rounded-lg border-b-2 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-md hover:bg-gray-100"
    >
      <i className="fab fa-google text-xl"></i>
      <span>Google Maps</span>
    </a>

    <a
      href={`https://waze.com/ul?ll=${coordinates.lat},${coordinates.lng}&navigate=yes`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 rounded-lg border-b-2 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-md hover:bg-gray-100"
    >
      <i className="fab fa-waze text-xl"></i>
      <span>Waze</span>
    </a>
  </div>
);
