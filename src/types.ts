export type Note = string;
export type ScaleType = string;
export type ChordType = string;

export interface TheoryState {
  root: string;
  type: 'scale' | 'chord';
  name: string;
  notes: Note[];
  intervals: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}
