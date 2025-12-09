import React, { useState } from 'react';
import { Copy, Check, Sparkles, ArrowRight, Wand2 } from 'lucide-react';
import { OptimizedResult } from '../types';

interface ResultCardProps {
  result: OptimizedResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.improvedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/10">
      {/* Header */}
      <div className="relative px-6 py-4 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-teal-500/10 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-teal-100 tracking-wide">
            优化完成
          </h3>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Main Prompt Display */}
        <div className="space-y-3">
          {/* Label and Action Bar */}
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">优化的提示词</label>
            
            {/* Copy Button (Moved Outside) */}
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold tracking-wide transition-all duration-300 ${
                copied 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-teal-500/20 hover:text-teal-300 hover:border-teal-500/30'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>一键复制</span>
                </>
              )}
            </button>
          </div>

          <div className="relative group">
            {/* Dynamic Glow Effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r rounded-xl blur transition-all duration-500 ${copied ? 'from-emerald-500 to-teal-400 opacity-60' : 'from-teal-500/20 to-indigo-500/20 opacity-30 group-hover:opacity-60'}`}></div>
            
            {/* Text Area */}
            <div className={`relative bg-black/40 rounded-xl p-6 border font-mono text-sm leading-7 text-zinc-100 whitespace-pre-wrap shadow-inner max-h-[400px] overflow-y-auto custom-scrollbar selection:bg-teal-500/30 transition-all duration-300 ${copied ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-white/10'}`}>
              {result.improvedPrompt}
            </div>
          </div>
        </div>

        {/* Explanation & Changes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 border-t border-white/5">
          
          {/* Why it's better */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
              <Wand2 className="w-3 h-3" /> 优化原理
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed p-4 rounded-xl bg-white/5 border border-white/5">
              {result.explanation}
            </p>
          </div>

          {/* Key Changes */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
              <ArrowRight className="w-3 h-3" /> 主要改进
            </h4>
            <ul className="space-y-2">
              {result.keyChanges.map((change, index) => (
                <li key={index} className="flex items-start text-sm text-zinc-300 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-3 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
                  <span className="leading-snug">{change}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};