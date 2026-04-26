import React, { useState } from 'react';
import { Bot, FileText, Send, Settings, Sparkles, AlertTriangle } from 'lucide-react';

import SessionSetup from './components/SessionSetup';
import PipelineDashboard from './components/PipelineDashboard';
import PrdPreview from './components/PrdPreview';
import CritiqueLog from './components/CritiqueLog';

export default function App() {
  const [activeTab, setActiveTab] = useState<'setup' | 'preview'>('setup');
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="glass-panel sticky top-0 z-50 px-4 h-[48px] flex items-center justify-between border-x-0 border-t-0 rounded-none bg-slate-900">
        <div className="flex items-center gap-2">
          <div className="bg-brand-500/10 p-1.5 rounded-md border border-brand-500/20">
            <Sparkles className="w-4 h-4 text-brand-500" />
          </div>
          <h1 className="font-sans font-semibold text-[14px] tracking-tight text-slate-300">
            Violet Issue <span className="text-[11px] font-mono text-slate-500 ml-2 px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700">ADK 2.0</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 h-[28px] rounded-md text-[13px] font-medium transition-colors hover:bg-slate-800 text-slate-400 hover:text-slate-200">
            <Settings className="w-3.5 h-3.5" />
            Settings
          </button>
          <button className="flex items-center gap-1.5 px-3 h-[28px] rounded-md text-[13px] font-medium bg-brand-500 hover:bg-accent-400 transition-colors text-white">
            <Send className="w-3.5 h-3.5" />
            Export to Docs
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4 max-w-[1600px] w-full mx-auto">
        
        {/* Left Sidebar - Pipeline & Setup */}
        <aside className="w-[320px] flex flex-col gap-4 shrink-0">
          <div className="glass-panel flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center border-b border-slate-700 bg-slate-900/50">
              <button 
                onClick={() => setActiveTab('setup')}
                className={`flex-1 h-[40px] text-[13px] font-medium transition-colors border-r border-slate-700 ${activeTab === 'setup' ? 'text-brand-500 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Session Setup
              </button>
              <button 
                onClick={() => setActiveTab('preview')}
                className={`flex-1 h-[40px] text-[13px] font-medium transition-colors ${activeTab === 'preview' ? 'text-brand-500 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Pipeline
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto">
              {activeTab === 'setup' ? (
                <SessionSetup onStart={() => { setIsRunning(true); setActiveTab('preview'); }} />
              ) : (
                <PipelineDashboard isRunning={isRunning} />
              )}
            </div>
          </div>
          
          <div className="glass-panel h-[280px] overflow-hidden flex flex-col">
            <div className="h-[36px] px-3 border-b border-slate-700 flex items-center gap-2 bg-slate-900/50">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <h2 className="font-semibold text-[13px] text-slate-300 uppercase tracking-wide">Critique Log</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-3 bg-slate-800/30">
              <CritiqueLog />
            </div>
          </div>
        </aside>

        {/* Right Content - PRD Preview */}
        <section className="flex-1 glass-panel overflow-hidden flex flex-col">
          <div className="h-[36px] px-4 border-b border-slate-700 flex items-center gap-2 bg-slate-900/50">
            <FileText className="w-4 h-4 text-brand-500" />
            <h2 className="font-semibold text-[13px] text-slate-300 uppercase tracking-wide">Live Draft</h2>
            {isRunning && (
              <span className="ml-auto flex items-center gap-1.5 text-[11px] font-mono text-brand-500">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                DRAFTING...
              </span>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-8 bg-slate-900/20">
            <PrdPreview />
          </div>
        </section>

      </main>
    </div>
  );
}
