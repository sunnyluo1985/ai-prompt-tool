import React, { useState, useCallback } from 'react';
import { Sparkles, Wand2, Zap, AlertCircle, Info, Rocket, Layers } from 'lucide-react';
import { OptimizationState } from './types';
import { SCENARIO_OPTIONS, TONE_OPTIONS } from './constants';
import { optimizePrompt } from './services/geminiService';
import { Button } from './components/Button';
import { ResultCard } from './components/ResultCard';
import { SearchableSelect } from './components/SearchableSelect';

const App: React.FC = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  // Defaults
  const [mode, setMode] = useState<string>(SCENARIO_OPTIONS[0].options[0]);
  const [tone, setTone] = useState<string>(TONE_OPTIONS[0].options[0]);
  
  const [state, setState] = useState<OptimizationState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const handleOptimize = useCallback(async () => {
    if (!inputPrompt.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await optimizePrompt(inputPrompt, mode, tone);
      setState({ isLoading: false, error: null, result });
    } catch (error: any) {
      setState({ 
        isLoading: false, 
        error: error.message || "发生意外错误。", 
        result: null 
      });
    }
  }, [inputPrompt, mode, tone]);

  return (
    <div className="min-h-screen text-zinc-100 selection:bg-teal-500/30 selection:text-teal-200 relative overflow-hidden">
      
      {/* Background Layer */}
      <div className="aurora-bg"></div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative p-2 bg-black rounded-lg border border-white/10">
                  <Wand2 className="w-5 h-5 text-teal-400" />
                </div>
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400 tracking-tight">
                AI 提示词优化工具
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                <Zap className="w-3.5 h-3.5 text-teal-400 fill-teal-400/20" />
                Gemini 2.5 Flash
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Input & Controls */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Hero Text */}
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                拒绝平庸，<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">唤醒 AI 的真实力。</span>
              </h2>
              <p className="text-zinc-400 text-lg font-light leading-relaxed">
                将你的简单想法转化为专家级提示词。更清晰的指令，意味着更完美的结果。
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl shadow-xl space-y-6">
              {/* Controls */}
              <div className="grid grid-cols-2 gap-4">
                <SearchableSelect 
                  label="优化场景"
                  value={mode}
                  onChange={setMode}
                  options={SCENARIO_OPTIONS}
                  placeholder="搜索场景..."
                />

                <SearchableSelect 
                  label="语气风格"
                  value={tone}
                  onChange={setTone}
                  options={TONE_OPTIONS}
                  placeholder="搜索风格..."
                />
              </div>

              {/* Text Input */}
              <div className="space-y-2">
                <label className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-500 pl-1">
                  <span>你的原始想法</span>
                  <span className={`${inputPrompt.length > 500 ? "text-amber-500" : "text-zinc-600"} font-mono`}>{inputPrompt.length} chars</span>
                </label>
                <div className="relative group">
                  <textarea
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    placeholder="输入你想让 AI 做的事情..."
                    className="w-full h-48 glass-input rounded-xl p-4 text-zinc-200 placeholder-zinc-600 focus:outline-none resize-none text-base custom-scrollbar leading-relaxed"
                  />
                  <div className="absolute bottom-3 right-3 pointer-events-none">
                    <div className="p-1.5 rounded-md bg-white/5 border border-white/5 backdrop-blur-sm">
                      <Layers className="w-3 h-3 text-zinc-500" />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleOptimize} 
                isLoading={state.isLoading}
                disabled={!inputPrompt.trim()}
                className="w-full py-4 text-lg"
                icon={<Rocket className="w-5 h-5" />}
              >
                立即优化提示词
              </Button>

              {state.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-300 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{state.error}</p>
                </div>
              )}
            </div>
            
             {/* Tip */}
             {!state.result && !state.isLoading && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-500/5 border border-teal-500/10 text-teal-300/80 text-xs">
                  <Info className="w-4 h-4 shrink-0" />
                  <p>专业技巧：在输入中说明你的“目标受众”，效果会更好。</p>
                </div>
              )}
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7 pt-4 lg:pt-0">
            {state.result ? (
              <ResultCard result={state.result} />
            ) : (
              <div className="h-full min-h-[500px] flex flex-col">
                <div className="glass-panel border-dashed border-2 border-zinc-800/50 rounded-2xl flex-1 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden group">
                  
                  {/* Decorative faint glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/10 transition-all duration-1000"></div>

                  <div className="relative z-10 max-w-lg mx-auto">
                    <div className="w-20 h-20 bg-zinc-900/50 rounded-2xl flex items-center justify-center mb-6 border border-white/5 mx-auto shadow-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500">
                      <Sparkles className="w-10 h-10 text-teal-500/50 group-hover:text-teal-400 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">准备就绪</h3>
                    <p className="text-zinc-500 mb-10 leading-relaxed">
                      在左侧输入你的提示词并选择模式。<br/>
                      AI 将为你重写出更清晰、更强大、效果更好的版本。
                    </p>
                    
                    {/* Preset Prompts Section */}
                    <div className="w-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent flex-1"></div>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">试试这些示例</span>
                        <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent flex-1"></div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                        {[
                          {
                            label: "商业营销",
                            text: "写一封运动鞋新品发布的营销邮件",
                            prompt: "写一封运动鞋新品发布的营销邮件。",
                            mode: "专业邮件 (Email)",
                            tone: "有说服力 (Persuasive)"
                          },
                          {
                            label: "编程开发",
                            text: "Python 网站数据抓取脚本",
                            prompt: "写一个 Python 脚本来抓取网站数据，需要处理异常和重试机制。",
                            mode: "Python 脚本/爬虫",
                            tone: "专业/正式 (Professional)"
                          },
                          {
                            label: "创意写作",
                            text: "赛博朋克小说结局构思",
                            prompt: "为一部赛博朋克风格的科幻小说构思三个意想不到的结局。",
                            mode: "科幻/奇幻小说创作",
                            tone: "赛博朋克风 (Cyberpunk)"
                          },
                          {
                            label: "职场沟通",
                            text: "委婉拒绝同事的不合理请求",
                            prompt: "如何委婉地拒绝同事提出的不合理工作请求，保持专业和礼貌？",
                            mode: "专业/正式 (Professional)",
                            tone: "礼貌/委婉 (Polite)"
                          }
                        ].map((preset, idx) => (
                          <button 
                            key={idx}
                            onClick={() => {
                              setInputPrompt(preset.prompt);
                              setMode(preset.mode);
                              setTone(preset.tone);
                            }}
                            className="group/btn relative overflow-hidden p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-teal-500/30 transition-all duration-300"
                          >
                            <div className="relative z-10 flex flex-col gap-1">
                              <span className="text-xs font-bold text-teal-500/80 uppercase tracking-wider group-hover/btn:text-teal-400">{preset.label}</span>
                              <span className="text-sm text-zinc-400 group-hover/btn:text-zinc-200 transition-colors line-clamp-1">{preset.text}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default App;