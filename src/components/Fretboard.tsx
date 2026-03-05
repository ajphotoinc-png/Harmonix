import React from 'react';
import { motion } from 'motion/react';
import { TheoryState } from '../types';
import { isNoteInTheory } from '../services/theory';
import { Note, Interval } from 'tonal';

interface FretboardProps {
  state: TheoryState;
}

const STRINGS = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];
const FRETS = 15;

export const Fretboard: React.FC<FretboardProps> = ({ state }) => {
  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-x-auto">
      <div className="relative min-w-[800px]">
        {/* Frets */}
        <div className="flex">
          {Array.from({ length: FRETS + 1 }).map((_, i) => (
            <div
              key={i}
              className={`relative border-r-2 border-zinc-700 h-48 ${i === 0 ? 'w-12 border-r-4 border-zinc-500' : 'flex-1'}`}
            >
              {/* Fret markers */}
              {[3, 5, 7, 9, 12, 15].includes(i) && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-zinc-500 font-mono">
                  {i}
                </div>
              )}
              {i === 12 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-12 opacity-20">
                  <div className="w-3 h-3 bg-zinc-400 rounded-full" />
                  <div className="w-3 h-3 bg-zinc-400 rounded-full" />
                </div>
              )}
              {[3, 5, 7, 9, 15].includes(i) && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-400 rounded-full opacity-20" />
              )}
            </div>
          ))}
        </div>

        {/* Strings & Notes */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between py-4">
          {STRINGS.map((stringRoot, sIdx) => (
            <div key={sIdx} className="relative h-px bg-zinc-600 w-full flex items-center">
              {Array.from({ length: FRETS + 1 }).map((_, fIdx) => {
                const note = Note.transpose(stringRoot, Interval.fromSemitones(fIdx));
                const pc = Note.get(note).pc;
                const isActive = isNoteInTheory(pc, state);
                const isRoot = pc === state.root;

                return (
                  <div
                    key={fIdx}
                    className={`relative flex-1 flex justify-center items-center ${fIdx === 0 ? 'max-w-[48px]' : ''}`}
                  >
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg ${
                          isRoot ? 'bg-emerald-500 text-white' : 'bg-zinc-200 text-zinc-900'
                        }`}
                      >
                        {pc}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
