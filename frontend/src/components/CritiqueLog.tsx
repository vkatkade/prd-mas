import React from 'react';
import { ShieldAlert, XCircle, RefreshCw } from 'lucide-react';

const MOCK_LOGS = [
  { id: 1, type: 'blocker', text: 'Section 2.2 lacks explicit JWT revocation path. ZTA principle violation.', source: 'Critical Analyst', idString: 'LOG-124' },
  { id: 2, type: 'retry', text: 'Triggering re-draft loop for Section 2.2', source: 'Orchestrator', idString: 'LOG-125' },
];

export default function CritiqueLog() {
  return (
    <div className="space-y-0.5">
      {MOCK_LOGS.map((log) => (
        <div 
          key={log.id}
          className="flex items-start gap-2 p-2 hover:bg-slate-700/30 rounded-md transition-colors"
        >
          {log.type === 'blocker' ? (
            <XCircle className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-mono text-slate-500">{log.idString}</span>
              <span className="text-[11px] font-semibold uppercase text-slate-400">{log.source}</span>
            </div>
            <p className="text-[13px] text-slate-300 leading-snug">{log.text}</p>
          </div>
        </div>
      ))}
      
      <div className="mt-4 p-2 text-center">
        <p className="text-[11px] text-slate-600 font-mono">... listening for violations ...</p>
      </div>
    </div>
  );
}
