'use client';

import { Dot, Zap } from 'lucide-react';

import { etapasInitials } from '@/const/const';

interface TimelineProps {
  steps: {
    label: string;
    date: string;
    status: 'completed' | 'current' | 'upcoming';
  }[];
  projectId: number;
}

export const Timeline = ({ steps, projectId }: TimelineProps) => {
  return (
    <div className="w-full px-4">
      <div className="relative flex justify-between">
        {/* Connecting line */}
        <div className="absolute left-0 top-5 h-0.5 w-full -translate-y-1/2 bg-gray-200" />

        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* Icon */}
            <div className="z-10 flex items-center justify-center">
              {step.status === 'current' ? (
                <Zap className="h-10 w-10 fill-yellow-500 text-primary text-yellow-500" />
              ) : step.status === 'completed' ? (
                <Dot className="bg-navy-500 h-10 w-10" />
              ) : (
                <Dot className="h-10 w-10 text-gray-300" />
              )}
            </div>

            {/* Label */}
            <div className="mt-2 hidden text-center sm:block">
              <div className="text-sm font-medium">
                <a href={`/projects/${projectId}/${step.label.toLowerCase()}`}>
                  <span className="block sm:hidden md:block xl:hidden">
                    {etapasInitials[index]} {/* Display initials */}
                  </span>
                  <span className="hidden sm:block md:hidden xl:block">
                    {step.label} {/* Display full label */}
                  </span>
                </a>
              </div>
              <div className="timeline-text text-xs text-gray-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
