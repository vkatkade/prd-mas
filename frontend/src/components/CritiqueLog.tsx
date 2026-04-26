import React from 'react';
import { ShieldAlert, XCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_LOGS = [
  { id: 1, type: 'blocker', text: 'Section 2.2 lacks explicit JWT revocation path. ZTA principle violation.', source: 'Critical Analyst' },
  { id: 2, type: 'retry', text: 'Triggering re-draft loop for Section 2.2', source: 'Orchestrator' },
];

export default function CritiqueLog() {
  return (
    <div className="space-y-3">
      {MOCK_LOGS.map((log) => (
        <motion.div 
          key={log.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-3"
        >
          <div className="flex items-start gap-2">
            {log.type === 'blocker' ? (
              <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            ) : (
              <RefreshCw className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            )}
            <div>
              <p className="text-xs text-slate-300 leading-snug">{log.text}</p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                By {log.source}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
      
      <div className="border border-dashed border-slate-700 rounded-lg p-3 text-center">
        <p className="text-xs text-slate-500 italic">Listening for ZTA violations...</p>
      </div>
    </div>
  );
}
