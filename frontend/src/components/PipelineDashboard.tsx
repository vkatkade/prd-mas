import React from 'react';
import { Bot, Check, Loader2, CircleDashed } from 'lucide-react';

const AGENTS = [
  { id: 'structure', name: 'Structure Agent', desc: 'Maps intent to schema', status: 'completed', identifier: 'AGT-01' },
  { id: 'librarian', name: 'Librarian Agent', desc: 'RAG & NotebookLM', status: 'running', identifier: 'AGT-02' },
  { id: 'competitive', name: 'Competitive Agent', desc: 'Benchmarking', status: 'pending', identifier: 'AGT-03' },
  { id: 'critical', name: 'Critical Analyst', desc: 'Zero-Trust Red-Team', status: 'pending', identifier: 'AGT-04' },
  { id: 'style', name: 'Style Agent', desc: 'Voice Matching', status: 'pending', identifier: 'AGT-05' },
];

interface Props {
  isRunning: boolean;
}

export default function PipelineDashboard({ isRunning }: Props) {
  if (!isRunning) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
        <Bot className="w-8 h-8 opacity-50" />
        <p className="text-[13px]">Pipeline is idle. Initialize session to begin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-0 flex flex-col">
      <div className="h-[24px] flex items-center px-2 mb-1">
        <span className="text-[11px] uppercase font-semibold text-slate-500 tracking-wider">Agent Pipeline</span>
      </div>
      
      {AGENTS.map((agent) => {
        const isCompleted = agent.status === 'completed';
        const isRunningStatus = agent.status === 'running';
        
        return (
          <div 
            key={agent.id} 
            className={`flex items-center gap-3 h-[36px] px-2 hover:bg-slate-700/30 transition-colors border-l-2 ${
              isRunningStatus ? 'border-brand-500 bg-brand-500/10' : 'border-transparent'
            }`}
          >
            <div className="w-3.5 flex justify-center shrink-0">
              {isCompleted ? (
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-slate-900" strokeWidth={3} />
                </div>
              ) : isRunningStatus ? (
                <Loader2 className="w-3.5 h-3.5 text-brand-500 animate-spin" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-slate-600 border-dashed" />
              )}
            </div>
            
            <span className="text-[12px] font-mono text-slate-500 w-[50px] shrink-0">{agent.identifier}</span>
            
            <span className={`text-[13px] font-medium truncate flex-1 ${isRunningStatus ? 'text-brand-400' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
              {agent.name}
            </span>
            
            <span className="text-[11px] text-slate-500 truncate w-[100px] text-right hidden sm:block">
              {agent.desc}
            </span>
          </div>
        );
      })}
    </div>
  );
}
