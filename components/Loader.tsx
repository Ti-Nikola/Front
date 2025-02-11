'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { cn } from '@/utils/cn';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: () => {
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 1.5, bounce: 0, repeat: Infinity },
      },
    };
  },
};

export function PathDrawing() {
  return (
    <motion.svg
      width="600"
      height="600"
      viewBox="0 0 200 550"
      initial="hidden"
      animate="visible"
      className="h-96 w-96"
    >
      <motion.path
        className="path"
        d="M 200 0 L 200 374 L 100 320 L 8 550 L 8 190 L 110 240 L 200 0"
        stroke="#fab706"
        strokeWidth="5"
        fill="none"
        variants={draw}
      />
    </motion.svg>
  );
}

export function InOutExample() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
      <AnimatePresence>
        {isVisible && (
          <motion.svg
            width="600"
            height="600"
            viewBox="0 0 200 550"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', duration: 1 }}
            className="h-96 w-96"
          >
            <motion.path
              d="M 200 0 L 200 374 L 100 320 L 8 550 L 8 190 L 110 240 L 200 0"
              stroke="#fab706"
              strokeWidth="0"
              fill="#fab706"
              variants={draw}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}

export function InOut({
  isVisible,
  onClick,
  className,
}: {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
}) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center">
      <AnimatePresence>
        {isVisible && (
          <motion.svg
            width="600"
            height="600"
            viewBox="0 0 200 550"
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', duration: 1 }}
            onClick={onClick}
            className={cn('size-32 xl:size-40 cursor-pointer absolute', className)}
          >
            <motion.path
              d="M 200 0 L 200 374 L 100 320 L 8 550 L 8 190 L 110 240 L 200 0"
              stroke="#fab706"
              strokeWidth="0"
              fill="#fab706"
              variants={draw}
            />
          </motion.svg>
        )}
      </AnimatePresence>
      {!isVisible && (
        <motion.svg
          width="600"
          height="600"
          viewBox="0 0 200 550"
          initial={{ opacity: 1, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 1, scale: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          onClick={onClick}
          className={cn('size-16 xl:size-20 cursor-pointer absolute', className)}
        >
          <motion.path
            d="M 200 0 L 200 374 L 100 320 L 8 550 L 8 190 L 110 240 L 200 0"
            stroke="#fab706"
            strokeWidth="10"
            fill={theme === 'dark' ? '#3b2b01' : '#fcf4de'}
            variants={draw}
          />
        </motion.svg>
      )}
    </div>
  );
}
