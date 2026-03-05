import React from 'react';
import { motion } from 'motion/react';
import { TheoryState } from '../types';
import { isNoteInTheory } from '../services/theory';

interface CircleProps {
  state: TheoryState;
  onSelectRoot: (root: string) => void;
}

const FIFTHS = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];

export const CircleOfFifths: React.FC<CircleProps> = ({ state, onSelectRoot }) => {
  const radius = 120;
  const centerX = 150;
  const centerY = 150;

  return (
    <div className="flex justify-center items-center p-4">
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Background Circle */}
        <circle cx={centerX} cy={centerY} r={radius + 20} fill="none" stroke="#27272a" strokeWidth="1" />
        <circle cx={centerX} cy={centerY} r={radius - 20} fill="none" stroke="#27272a" strokeWidth="1" />

        {FIFTHS.map((note, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          const isActive = isNoteInTheory(note, state);
          const isSelected = note === state.root;

          return (
            <g 
              key={note} 
              className="cursor-pointer group"
              onClick={() => onSelectRoot(note)}
            >
              <motion.circle
                cx={x}
                cy={y}
                r="18"
                initial={false}
                animate={{
                  fill: isSelected ? '#10b981' : isActive ? '#34d399' : '#18181b',
                  stroke: isSelected ? '#059669' : '#27272a',
                }}
                className="transition-colors duration-300"
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-xs font-bold pointer-events-none transition-colors duration-300 ${
                  isActive || isSelected ? 'fill-white' : 'fill-zinc-500 group-hover:fill-zinc-300'
                }`}
              >
                {note}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
