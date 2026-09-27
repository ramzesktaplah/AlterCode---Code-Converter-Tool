import React, { useState } from 'react';
import { DEMO_SNIPPETS } from '../data/demoSnippets';
import { DemoAction, CodeSnippet } from '../types';
import { SyntaxHighlighter } from './SyntaxHighlighter';
import { Play, Copy, Check, Sparkles, RefreshCw, Zap, Bug, ArrowRightLeft, FileCode, CheckCircle2 } from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<DemoAction>('convert');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Active snippet based on selected action
  const activeSnippet = DEMO_SNIPPETS.find((s) => s.action === selectedAction) || DEMO_SNIPPETS[0];
  const [currentSnippet, setCurrentSnippet] = useState<CodeSnippet>(activeSnippet);

  const handleActionChange = (action: DemoAction) => {
    setSelectedAction(action);
    const found = DEMO_SNIPPETS.find((s) => s.action === action) || DEMO_SNIPPETS[0];
    setCurrentSnippet(found);
  };

  const handleSimulateRun = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 450);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-20 md:py-28 border-b border-[#2B3648] bg-[#121826]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#2B3648]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA] mb-2">
              <span>Interactive Simulator</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span>Capable Template Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Experience AlterCode in Real-Time
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#94A3B8] max-w-xl">
              Test how the mobile AI engine processes complex snippets without opening your laptop.
            </p>
          </div>

          {/* Interactive Action Selector Tabs */}
          <div className="mt-6 md:mt-0 flex items-center p-1 bg-[#1A2233] border border-[#2B3648] rounded-xl overflow-x-auto">
            <button
              onClick={() => handleActionChange('convert')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedAction === 'convert'
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>Convert</span>
            </button>
            <button
              onClick={() => handleActionChange('fix')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedAction === 'fix'
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <Bug className="h-3.5 w-3.5" />
              <span>Fix Bugs</span>
            </button>
            <button
              onClick={() => handleActionChange('refactor')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedAction === 'refactor'
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refactor</span>
            </button>
            <button
              onClick={() => handleActionChange('explain')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedAction === 'explain'
                  ? 'bg-[#3B82F6] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>Explain</span>
            </button>
          </div>
        </div>

        {/* Playground Sandbox Container */}
        <div className="rounded-2xl border border-[#2B3648] bg-[#1A2233] overflow-hidden shadow-2xl">
          
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-[#151D2C] border-b border-[#2B3648] gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-[#F87171]/80" />
              <span className="flex h-3 w-3 rounded-full bg-[#FFCB6B]/80" />
              <span className="flex h-3 w-3 rounded-full bg-[#34C759]/80" />
              <div className="h-4 w-[1px] bg-[#2B3648] mx-1" />
              <span className="text-xs font-mono font-medium text-[#F8FAFC]">
                {currentSnippet.title}
              </span>
              <span className="text-xs text-[#64748B]">·</span>
              <span className="text-xs font-mono text-[#94A3B8]">
                {currentSnippet.sourceLang} {currentSnippet.targetLang ? `➔ ${currentSnippet.targetLang}` : ''}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
                <Zap className="h-3.5 w-3.5 text-[#3B82F6]" />
                <span>Backend: <strong className="text-[#F8FAFC]">{currentSnippet.metrics.engine}</strong></span>
              </div>

              <button
                onClick={handleSimulateRun}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-60 rounded-lg transition-colors cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Run AlterCode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Split Pane: Left (Input) & Right (Output) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#2B3648]">
            
            {/* Input Pane */}
            <div className="flex flex-col bg-[#121826]">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#151D2C]/60 border-b border-[#2B3648] text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#94A3B8]"></span>
                  Input Code ({currentSnippet.sourceLang})
                </span>
                <span className="text-[#64748B]">Readonly Preview</span>
              </div>
              <div className="relative min-h-[300px] max-h-[460px] overflow-y-auto">
                <SyntaxHighlighter code={currentSnippet.inputCode} language={currentSnippet.sourceLang.toLowerCase()} />
              </div>
            </div>

            {/* Output Pane */}
            <div className="flex flex-col bg-[#121826] relative">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#151D2C]/60 border-b border-[#2B3648] text-xs font-mono text-[#94A3B8]">
                <span className="flex items-center gap-1.5 text-[#60A5FA]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Output Result ({currentSnippet.targetLang || 'Analysis'})
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#34C759]" />
                      <span className="text-[#34C759]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code output or loading state */}
              <div className="relative min-h-[300px] max-h-[460px] overflow-y-auto">
                {isProcessing ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#121826]/90 backdrop-blur-sm z-10">
                    <RefreshCw className="h-8 w-8 animate-spin text-[#3B82F6] mb-3" />
                    <p className="text-xs font-mono text-[#94A3B8]">
                      Executing {currentSnippet.action.toUpperCase()} via {currentSnippet.metrics.engine}...
                    </p>
                  </div>
                ) : null}
                
                <SyntaxHighlighter
                  code={currentSnippet.outputCode}
                  language={currentSnippet.targetLang ? currentSnippet.targetLang.toLowerCase() : 'markdown'}
                />
              </div>

            </div>

          </div>

          {/* Bottom Telemetry & Explanation Bar */}
          <div className="p-5 bg-[#151D2C] border-t border-[#2B3648]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8">
                <div className="text-xs font-semibold text-[#F8FAFC] mb-1 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#34C759]" />
                  <span>AI Summary & Mobile Optimization</span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {currentSnippet.explanation}
                </p>
              </div>
              
              <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-6 text-xs font-mono border-t md:border-t-0 pt-3 md:pt-0 border-[#2B3648]">
                <div>
                  <span className="text-[#64748B] block">Latency</span>
                  <span className="text-[#34C759] font-bold tabular-nums">{currentSnippet.metrics.latency}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Tokens</span>
                  <span className="text-[#F8FAFC] font-bold tabular-nums">{currentSnippet.metrics.tokens} tok</span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Routing</span>
                  <span className="text-[#60A5FA] font-bold">{currentSnippet.action === 'fix' || currentSnippet.action === 'explain' ? 'Groq' : 'Gemini'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
