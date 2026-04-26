import React, { useState } from 'react';
import { Bot, FileText, Send, Settings, Sparkles, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import SessionSetup from './components/SessionSetup';
import PipelineDashboard from './components/PipelineDashboard';
import PrdPreview from './components/PrdPreview';
import CritiqueLog from './components/CritiqueLog';

function App() {
  const [activeTab, setActiveTab] = useState<'setup' | 'preview'>('setup');
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b-0 border-x-0 border-t-0 border-b border-glass-border">
        <div className="flex items-center gap-3">
          <div className="bg-brand-500/20 p-2 rounded-lg border border-brand-500/30">
            <Sparkles className="w-6 h-6 text-brand-400" />
          </div>
          <h1 className="font-display font-bold text-xl tracking-tight">
            The Infrastructure Architect <span className="text-sm font-normal text-slate-400 ml-2 px-2 py-0.5 rounded-full bg-slate-800/50 border border-slate-700">ADK 2.0 MAS</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800/50 text-slate-300">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand-500 hover:bg-brand-400 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Send className="w-4 h-4" />
            Export to Docs
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden p-6 gap-6 max-w-[1600px] w-full mx-auto">
        
        {/* Left Sidebar - Pipeline & Setup */}
        <aside className="w-[400px] flex flex-col gap-6 shrink-0">
          <div className="glass-panel rounded-2xl flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center border-b border-glass-border">
              <button 
                onClick={() => setActiveTab('setup')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'setup' ? 'text-brand-400 border-b-2 border-brand-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Session Setup
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'preview' ? 'text-brand-400 border-b-2 border-brand-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Pipeline Dashboard
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'setup' ? (
                  <motion.div key="setup" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <SessionSetup onStart={() => { setIsRunning(true); setActiveTab('preview'); }} />
                  </motion.div>
                ) : (
                  <motion.div key="pipeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <PipelineDashboard isRunning={isRunning} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="glass-panel rounded-2xl h-[300px] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-glass-border flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="font-semibold text-sm">Critique & Blocker Log</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <CritiqueLog />
            </div>
          </div>
        </aside>

        {/* Right Content - PRD Preview */}
        <section className="flex-1 glass-panel rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-glass-border flex items-center gap-2 bg-slate-900/50">
            <FileText className="w-5 h-5 text-accent-400" />
            <h2 className="font-semibold">Live PRD Preview</h2>
            {isRunning && (
              <span className="ml-auto flex items-center gap-2 text-xs font-medium text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                Agents Drafting...
              </span>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-8 bg-white/5">
            <PrdPreview />
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
