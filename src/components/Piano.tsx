import React from 'react';
import { motion } from 'motion/react';
import { TheoryState, Note } from '../types';
import { isNoteInTheory } from '../services/theory';

interface PianoProps {
  state: TheoryState;
}

const KEYS = [
  { note: 'C', type: 'white' },
  { note: 'C#', type: 'black' },
  { note: 'D', type: 'white' },
  { note: 'D#', type: 'black' },
  { note: 'E', type: 'white' },
  { note: 'F', type: 'white' },
  { note: 'F#', type: 'black' },
  { note: 'G', type: 'white' },
  { note: 'G#', type: 'black' },
  { note: 'A', type: 'white' },
  { note: 'A#', type: 'black' },
  { note: 'B', type: 'white' },
  { note: 'C', type: 'white' },
  { note: 'C#', type: 'black' },
  { note: 'D', type: 'white' },
  { note: 'D#', type: 'black' },
  { note: 'E', type: 'white' },
  { note: 'F', type: 'white' },
  { note: 'F#', type: 'black' },
  { note: 'G', type: 'white' },
  { note: 'G#', type: 'black' },
  { note: 'A', type: 'white' },
  { note: 'A#', type: 'black' },
  { note: 'B', type: 'white' },
];

export const Piano: React.FC<PianoProps> = ({ state }) => {
  return (
    <div className="flex justify-center p-4 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-x-auto">
      <div className="relative flex h-48 min-w-[600px]">
        {KEYS.map((key, i) => {
          const isActive = isNoteInTheory(key.note, state);
          const isRoot = key.note === state.root;
          
          if (key.type === 'white') {
            return (
              <div
                key={i}
                className={`relative w-10 h-full border-r border-zinc-300 last:border-r-0 rounded-b-md transition-colors duration-300 ${
                  isActive 
                    ? isRoot ? 'bg-emerald-400' : 'bg-emerald-200' 
                    : 'bg-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${isRoot ? 'bg-emerald-700' : 'bg-emerald-500'}`}
                  />
                )}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-zinc-400 font-mono">
                  {key.note}
                </span>
              </div>
            );
          }
          return null;
        })}
        
        {/* Black keys layer */}
        <div className="absolute top-0 left-0 w-full h-2/3 pointer-events-none flex">
          {KEYS.map((key, i) => {
            if (key.type === 'black') {
              const isActive = isNoteInTheory(key.note, state);
              const isRoot = key.note === state.root;
              
              // Calculate offset based on white keys
              // This is a bit simplified but works for visualization
              const whiteKeyIndex = KEYS.slice(0, i).filter(k => k.type === 'white').length;
              const left = (whiteKeyIndex * 40) - 12;

              return (
                <div
                  key={i}
                  style={{ left: `${left}px` }}
                  className={`absolute w-6 h-full rounded-b-md border border-zinc-800 transition-colors duration-300 ${
                    isActive 
                      ? isRoot ? 'bg-emerald-500' : 'bg-emerald-300' 
                      : 'bg-zinc-800'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${isRoot ? 'bg-emerald-800' : 'bg-emerald-600'}`}
                    />
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
