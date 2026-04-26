import React from 'react';
import { motion } from 'framer-motion';
import { Link, FileUp, Play } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export default function SessionSetup({ onStart }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
          <Link className="w-3.5 h-3.5 text-brand-500" /> Template URL
        </label>
        <input 
          type="text" 
          placeholder="https://docs.google.com/document/d/..." 
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 h-8 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-none placeholder:text-slate-600 text-slate-200"
        />
        <p className="text-[11px] text-slate-500">Link to the structural template for the PRD.</p>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
          <FileUp className="w-3.5 h-3.5 text-brand-500" /> Reference Architecture URLs
        </label>
        <textarea 
          placeholder="Enter NotebookLM or GWS Drive URLs (one per line)..." 
          rows={3}
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-none placeholder:text-slate-600 text-slate-200 resize-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
          <FileUp className="w-3.5 h-3.5 text-brand-500" /> Golden PRD Style Examples
        </label>
        <div className="border border-dashed border-slate-700 hover:border-brand-500 transition-colors rounded-md p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-800/50 h-[80px]">
          <p className="text-[13px] font-medium text-slate-300">Drop style snippet files here</p>
          <p className="text-[11px] font-mono text-slate-500 mt-0.5">⌘ U to upload</p>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-accent-400 text-white font-medium h-8 rounded-md transition-none mt-6 text-[13px]"
      >
        <Play className="w-4 h-4" />
        Initialize MAS Pipeline
      </button>
    </div>
  );
}
