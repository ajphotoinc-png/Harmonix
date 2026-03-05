import { Scale, Chord, Note } from "tonal";
import { TheoryState } from "../types";

export const ROOTS = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"];

export const SCALE_TYPES = [
  "major", "minor", "dorian", "phrygian", "lydian", "mixolydian", "locrian",
  "melodic minor", "harmonic minor", "pentatonic major", "pentatonic minor", "blues"
];

export const CHORD_TYPES = [
  "major", "minor", "7", "maj7", "m7", "dim", "aug", "sus4", "sus2", "m7b5", "9", "13"
];

export function getTheoryData(root: string, name: string, type: 'scale' | 'chord'): TheoryState {
  if (type === 'scale') {
    const s = Scale.get(`${root} ${name}`);
    return {
      root,
      type,
      name,
      notes: s.notes,
      intervals: s.intervals
    };
  } else {
    const c = Chord.get(`${root}${name}`);
    return {
      root,
      type,
      name,
      notes: c.notes,
      intervals: c.intervals
    };
  }
}

export function isNoteInTheory(note: string, state: TheoryState): boolean {
  const normalizedNote = Note.get(note).pc;
  return state.notes.some(n => Note.get(n).pc === normalizedNote);
}
