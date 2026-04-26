import React from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle2, Loader2, CircleDashed } from 'lucide-react';

const AGENTS = [
  { id: 'structure', name: 'Structure Agent', desc: 'Maps intent to schema', status: 'completed' },
  { id: 'librarian', name: 'Librarian Agent', desc: 'RAG & NotebookLM', status: 'running' },
  { id: 'competitive', name: 'Competitive Agent', desc: 'Benchmarking', status: 'pending' },
  { id: 'critical', name: 'Critical Analyst', desc: 'Zero-Trust Red-Team', status: 'pending' },
  { id: 'style', name: 'Style Agent', desc: 'Voice Matching', status: 'pending' },
];

interface Props {
  isRunning: boolean;
}

export default function PipelineDashboard({ isRunning }: Props) {
  if (!isRunning) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
        <Bot className="w-12 h-12 opacity-50" />
        <p className="text-sm">Pipeline is idle. Initialize session to begin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 relative">
      {/* Connecting line */}
      <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-slate-800"></div>

      {AGENTS.map((agent, i) => {
        const isCompleted = agent.status === 'completed';
        const isRunning = agent.status === 'running';
        
        return (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={agent.id} 
            className={`relative flex items-start gap-4 p-4 rounded-xl border ${
              isRunning ? 'bg-brand-500/10 border-brand-500/30' : 
              isCompleted ? 'bg-slate-800/30 border-slate-700/50' : 
              'border-transparent'
            }`}
          >
            <div className="relative z-10 bg-slate-900 rounded-full">
              {isCompleted ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              ) : isRunning ? (
                <Loader2 className="w-10 h-10 text-brand-400 animate-spin" />
              ) : (
                <CircleDashed className="w-10 h-10 text-slate-600" />
              )}
            </div>
            
            <div>
              <h3 className={`font-semibold ${isRunning ? 'text-brand-300' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                {agent.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{agent.desc}</p>
            </div>
            
            {isRunning && (
              <div className="ml-auto self-center">
                <span className="text-xs font-mono text-brand-400/70">processing...</span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
