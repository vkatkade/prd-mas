import React from 'react';
import { motion } from 'framer-motion';
import { Link, FileUp, Play } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export default function SessionSetup({ onStart }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Link className="w-4 h-4" /> Template URL
        </label>
        <input 
          type="text" 
          placeholder="https://docs.google.com/document/d/..." 
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all placeholder:text-slate-600 text-slate-200"
        />
        <p className="text-xs text-slate-500">Link to the structural template for the PRD.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <FileUp className="w-4 h-4" /> Reference Architecture URLs
        </label>
        <textarea 
          placeholder="Enter NotebookLM or GWS Drive URLs (one per line)..." 
          rows={3}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all placeholder:text-slate-600 text-slate-200 resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <FileUp className="w-4 h-4" /> Golden PRD Style Examples
        </label>
        <div className="border-2 border-dashed border-slate-700 hover:border-brand-500/50 transition-colors rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-900/20">
          <FileUp className="w-8 h-8 text-slate-500 mb-2" />
          <p className="text-sm font-medium text-slate-300">Drop style snippet files here</p>
          <p className="text-xs text-slate-500 mt-1">or click to browse</p>
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-400 hover:to-accent-400 text-white font-medium py-3 px-4 rounded-xl shadow-lg transition-all"
      >
        <Play className="w-5 h-5" />
        Initialize MAS Pipeline
      </motion.button>
    </div>
  );
}
