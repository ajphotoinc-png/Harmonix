import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  Piano as PianoIcon, 
  Guitar, 
  Settings2, 
  ChevronRight, 
  Info,
  Sparkles,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';
import { Piano } from './components/Piano';
import { Fretboard } from './components/Fretboard';
import { CircleOfFifths } from './components/CircleOfFifths';
import { Chat } from './components/Chat';
import { ImageGenerator } from './components/ImageGenerator';
import { ROOTS, SCALE_TYPES, CHORD_TYPES, getTheoryData } from './services/theory';
import { TheoryState } from './types';

export default function App() {
  const [root, setRoot] = useState('C');
  const [type, setType] = useState<'scale' | 'chord'>('scale');
  const [name, setName] = useState('major');
  const [instrument, setInstrument] = useState<'piano' | 'guitar'>('piano');
  const [state, setState] = useState<TheoryState>(getTheoryData('C', 'major', 'scale'));
  const [activeTab, setActiveTab] = useState<'chat' | 'images'>('chat');

  useEffect(() => {
    setState(getTheoryData(root, name, type));
  }, [root, name, type]);

  const handleTypeChange = (newType: 'scale' | 'chord') => {
    setType(newType);
    setName(newType === 'scale' ? SCALE_TYPES[0] : CHORD_TYPES[0]);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Harmonix</h1>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">AI Theory Lab</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button 
              onClick={() => setInstrument('piano')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                instrument === 'piano' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <PianoIcon className="w-4 h-4" />
              Piano
            </button>
            <button 
              onClick={() => setInstrument('guitar')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                instrument === 'guitar' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Guitar className="w-4 h-4" />
              Guitar
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls & Circle */}
        <div className="lg:col-span-4 space-y-6">
          {/* Theory Selector */}
          <section className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="w-5 h-5 text-emerald-400" />
              <h2 className="font-semibold">Theory Engine</h2>
            </div>
            
            <div className="space-y-6">
              {/* Type Toggle */}
              <div className="flex p-1 bg-zinc-950 rounded-xl border border-zinc-800">
                <button 
                  onClick={() => handleTypeChange('scale')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    type === 'scale' ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Scales
                </button>
                <button 
                  onClick={() => handleTypeChange('chord')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    type === 'chord' ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Chords
                </button>
              </div>

              {/* Root Selector */}
              <div className="grid grid-cols-4 gap-2">
                {ROOTS.map(r => (
                  <button
                    key={r}
                    onClick={() => setRoot(r)}
                    className={`py-2 text-xs font-mono rounded-lg border transition-all ${
                      root === r 
                        ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Type Dropdown */}
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Variation</label>
                <select 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none cursor-pointer"
                >
                  {(type === 'scale' ? SCALE_TYPES : CHORD_TYPES).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Circle of Fifths */}
          <section className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h2 className="font-semibold">Circle of Fifths</h2>
              </div>
              <Info className="w-4 h-4 text-zinc-600 cursor-help" />
            </div>
            <CircleOfFifths state={state} onSelectRoot={setRoot} />
          </section>
        </div>

        {/* Right Column: Visualizations & AI */}
        <div className="lg:col-span-8 space-y-6">
          {/* Visualization Area */}
          <section className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
            
            <div className="mb-8 flex items-end justify-between">
              <div>
                <motion.div 
                  key={`${root}-${name}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-5xl font-black text-white tracking-tighter">{root}</span>
                  <div className="flex flex-col">
                    <span className="text-emerald-400 font-mono text-sm uppercase tracking-widest font-bold">{type}</span>
                    <span className="text-xl text-zinc-300 font-medium">{name}</span>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex gap-2">
                {state.notes.map((note, i) => (
                  <motion.div
                    key={note}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono text-sm font-bold text-emerald-400"
                  >
                    {note}
                  </motion.div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={instrument}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {instrument === 'piano' ? (
                  <Piano state={state} />
                ) : (
                  <Fretboard state={state} />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {state.intervals.map((interval, i) => (
                <div key={i} className="bg-zinc-950/50 rounded-xl p-3 border border-zinc-800 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase font-bold">Interval {i + 1}</span>
                  <span className="text-sm font-bold text-zinc-300">{interval}</span>
                </div>
              ))}
            </div>
          </section>

          {/* AI Section Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Chat />
            <ImageGenerator />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto p-6 border-t border-zinc-900 text-center">
        <p className="text-xs text-zinc-600 font-mono">
          &copy; 2024 HARMONIX LABS &bull; POWERED BY GEMINI AI &bull; BUILT FOR MUSICIANS
        </p>
      </footer>
    </div>
  );
}
