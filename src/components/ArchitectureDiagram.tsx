import React, { useState } from 'react';
import { Smartphone, Server, Sparkles, Shield, ArrowRight, Check, Database, Zap } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: '1. Native Android Client',
      badge: 'Client Layer',
      desc: 'Written in pure Kotlin with Jetpack Compose. Code snippets are encrypted on-device via SQLCipher. Requests are signed and dispatched over Ktor Android HTTP Client.',
      tech: ['Kotlin 2.0', 'Jetpack Compose', 'Ktor Client', 'SQLCipher', 'EncryptedPrefs'],
    },
    {
      title: '2. Serverless Edge Proxy',
      badge: 'Cloudflare Worker',
      desc: 'Cloudflare Worker receives the request. Emits no CORS headers, rejects browser scripts, and verifies input length (10,000 char cap). State is checked by a Durable Object.',
      tech: ['Cloudflare Workers', 'Durable Objects', 'SQLite Storage', 'Zero-CORS', 'Prompt Sanitizer'],
    },
    {
      title: '3. Action-Based Model Routing',
      badge: 'Dual LLM Engine',
      desc: 'Action dispatcher inspects operation: `fix` and `explain` are dispatched to Groq for sub-second analysis; `convert` and `refactor` are routed to Google Gemini.',
      tech: ['Groq (Llama 3.3)', 'Google Gemini 2.5', 'Role Isolation', 'Clamped Temp & Tokens'],
    },
    {
      title: '4. Encrypted Local Storage',
      badge: 'SQLCipher Persistence',
      desc: 'Response is returned to the client and stored in the local encrypted SQLite SnippetDatabase. Master keys are protected by the hardware-backed Android Keystore.',
      tech: ['256-bit AES', 'Hardware Keystore', 'Zero Cloud Retention', 'Instant Local Query'],
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-28 border-b border-[#2B3648] bg-[#121826]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA] mb-2">
            <span>System Design</span>
            <span aria-hidden="true" className="text-[#64748B]">·</span>
            <span>Rork Monorepo Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            Under the Hood: Privacy-First AI Architecture
          </h2>
          <p className="mt-3 text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            How AlterCode protects user quotas and secures source code while delivering sub-second response times.
          </p>
        </div>

        {/* Interactive Architecture Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Step Selector List (LHS) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-[#1A2233] border-[#3B82F6] shadow-lg shadow-[#3B82F6]/10'
                    : 'bg-[#151D2C]/60 border-[#2B3648] hover:border-[#3B82F6]/40 hover:bg-[#1A2233]/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono font-semibold ${activeStep === idx ? 'text-[#60A5FA]' : 'text-[#94A3B8]'}`}>
                    {step.title}
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B] px-2 py-0.5 rounded bg-[#121826]">
                    {step.badge}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Visual Canvas (RHS) */}
          <div className="lg:col-span-7 bg-[#1A2233] border border-[#2B3648] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#2B3648] pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F8FAFC]">
                <Server className="h-4 w-4 text-[#3B82F6]" />
                <span>Architecture Inspector: Phase {activeStep + 1} of 4</span>
              </div>
              <span className="text-xs font-mono text-[#34C759]">Verified Spec</span>
            </div>

            <div className="bg-[#121826] border border-[#2B3648] rounded-xl p-6 mb-6">
              <h4 className="text-base font-bold text-[#F8FAFC] mb-2">
                {steps[activeStep].title}
              </h4>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                {steps[activeStep].desc}
              </p>

              <div className="border-t border-[#2B3648] pt-4">
                <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider block mb-2">
                  Active Modules & Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {steps[activeStep].tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-[#1A2233] border border-[#2B3648] text-[#60A5FA]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Invariants */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-[#94A3B8]">
              <div className="p-3 bg-[#151D2C] rounded-lg border border-[#2B3648]">
                <span className="text-[#64748B] block text-[11px]">Max Input</span>
                <strong className="text-[#F8FAFC]">10,000 Chars</strong>
              </div>
              <div className="p-3 bg-[#151D2C] rounded-lg border border-[#2B3648]">
                <span className="text-[#64748B] block text-[11px]">Message Cap</span>
                <strong className="text-[#F8FAFC]">Max 2 Turns</strong>
              </div>
              <div className="p-3 bg-[#151D2C] rounded-lg border border-[#2B3648] col-span-2 sm:col-span-1">
                <span className="text-[#64748B] block text-[11px]">Key Storage</span>
                <strong className="text-[#34C759]">Hardware HSM</strong>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
