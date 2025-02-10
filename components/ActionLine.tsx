'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { EtapaProyectoType, etapasChoices } from '@/const/formChoices';
import { cn } from '@/utils/cn';

import { InOut } from './Loader';

export const ActionLine = () => {
  const [selectedStep, setSelectedStep] = useState<EtapaProyectoType | null>(
    etapasChoices[0].value
  );

  return (
    <div className="relative flex w-full min-w-[400px] overflow-x-scroll h-[230px] items-center justify-around pb-8">
      <div className="absolute h-[2px] w-[100%] bg-shade" />
      {etapasChoices.map((step) => (
        <div key={step.value} className="w-[11%]">
          <Step
            isOdd={etapasChoices.indexOf(step) % 2 === 0}
            step={step}
            isSelected={selectedStep === step.value}
            onClick={() => setSelectedStep(step.value)}
          />
        </div>
      ))}
    </div>
  );
};

const Step = ({
  step,
  isOdd,
  isSelected,
  onClick,
}: {
  step: { value: EtapaProyectoType; label: string };
  isOdd: boolean;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <InOut isVisible={isSelected} onClick={onClick} className="mt-0" />
      <motion.span
        className={cn(
          'text-base font-semibold absolute text-center',
          isSelected ? 'text-yellow-600' : 'text-muted-foreground'
        )}
        animate={{ y: isOdd ? (isSelected ? 90 : 52) : isSelected ? -90 : -52 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {step.label}
      </motion.span>
    </div>
  );
};
