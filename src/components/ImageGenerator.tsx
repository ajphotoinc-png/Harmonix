import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Wand2, Loader2, Download, X } from 'lucide-react';
import { generateMusicImage } from '../services/gemini';
import { GeneratedImage } from '../types';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const url = await generateMusicImage(prompt, size);
      const newImg: GeneratedImage = {
        url,
        prompt,
        timestamp: Date.now()
      };
      setImages(prev => [newImg, ...prev]);
      setPrompt('');
    } catch (error) {
      console.error(error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 border-b border-zinc-800 bg-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-zinc-100">Visualizer AI</h3>
        </div>
        <div className="flex gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          {(["1K", "2K", "4K"] as const).map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                size === s ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700">
        <div className="grid grid-cols-2 gap-3">
          {images.map((img, i) => (
            <motion.div
              key={img.timestamp}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 group cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img src={img.url} alt={img.prompt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="text-[10px] text-zinc-300 line-clamp-2 italic">"{img.prompt}"</p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="aspect-square rounded-xl bg-zinc-950 border border-zinc-800 border-dashed flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              <span className="text-xs text-zinc-500 font-mono">Generating...</span>
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <div className="col-span-2 py-12 flex flex-col items-center justify-center text-zinc-600 gap-2">
              <ImageIcon className="w-12 h-12 opacity-20" />
              <p className="text-sm">Generate artistic music visualizations</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-zinc-800/30 border-t border-zinc-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g. 'Jazz improvisation in a neon city'"
            className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl py-3 px-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className="p-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white rounded-xl transition-colors flex items-center gap-2"
          >
            <Wand2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl w-full bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedImage.url} alt={selectedImage.prompt} className="w-full h-auto" referrerPolicy="no-referrer" />
              <div className="p-6 flex items-center justify-between bg-zinc-900">
                <div className="flex-1">
                  <p className="text-zinc-400 text-sm italic">"{selectedImage.prompt}"</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={selectedImage.url}
                    download={`music-viz-${selectedImage.timestamp}.png`}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-300 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
