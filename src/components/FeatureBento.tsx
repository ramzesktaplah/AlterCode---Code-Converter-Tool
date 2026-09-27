import React from 'react';
import { ArrowRightLeft, Bug, RefreshCw, FileCode, Shield, Cpu, Lock, Sparkles, Layers, Database } from 'lucide-react';

export const FeatureBento: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-28 border-b border-[#2B3648] bg-[#121826]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA] mb-2">
            <span>Engineering Capabilities</span>
            <span aria-hidden="true" className="text-[#64748B]">·</span>
            <span>Mobile-First Tooling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            Engineered Specifically for Mobile Developers
          </h2>
          <p className="mt-3 text-base text-[#94A3B8] leading-relaxed">
            AlterCode is not a bloated webview or sluggish browser wrapper. It is built from the ground up in native Kotlin with Jetpack Compose, delivering snappy feedback and rigorous privacy on Android.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Dual LLM Routing (Col-Span-2) */}
          <div className="md:col-span-2 rounded-2xl bg-[#1A2233] border border-[#2B3648] p-8 flex flex-col justify-between relative overflow-hidden group hover:border-[#3B82F6]/50 transition-colors">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#60A5FA]">01. Intelligent Dispatch</span>
                <span className="text-xs font-mono text-[#34C759] px-2.5 py-0.5 rounded bg-[#34C759]/10 border border-[#34C759]/20">
                  Groq & Gemini Dual-Core
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] mb-3">
                Dual-Engine AI Routing Pipeline
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 max-w-xl">
                Different developer tasks demand different model specializations. AlterCode's Cloudflare Worker proxy inspects the requested action and dynamically routes tasks to the best-fit inference engine.
              </p>

              {/* Engine comparison blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#121826] border border-[#2B3648]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F8FAFC] mb-1">
                    <span className="h-2 w-2 rounded-full bg-[#3B82F6]"></span>
                    <strong>Groq Engine</strong>
                    <span className="text-[#64748B]">· Llama 3.3 70B</span>
                  </div>
                  <div className="text-xs text-[#94A3B8] mb-2">Used for: Bug Fixing & Explanations</div>
                  <div className="text-xs font-mono text-[#34C759]">~140ms lightning turnaround</div>
                </div>

                <div className="p-4 rounded-xl bg-[#121826] border border-[#2B3648]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F8FAFC] mb-1">
                    <span className="h-2 w-2 rounded-full bg-[#82AAFF]"></span>
                    <strong>Google Gemini 2.5</strong>
                    <span className="text-[#64748B]">· Multi-Lingual</span>
                  </div>
                  <div className="text-xs text-[#94A3B8] mb-2">Used for: Code Conversion & Refactoring</div>
                  <div className="text-xs font-mono text-[#60A5FA]">Deep cross-language syntax accuracy</div>
                </div>
              </div>
            </div>

            {/* Hairline subtle footer info */}
            <div className="mt-8 pt-4 border-t border-[#2B3648] flex items-center justify-between text-xs text-[#64748B]">
              <span>Zero client API key exposure</span>
              <span>10,000 char input cap protection</span>
            </div>
          </div>

          {/* Card 2: Local SQLCipher Encryption (Col-Span-1) */}
          <div className="rounded-2xl bg-[#1A2233] border border-[#2B3648] p-8 flex flex-col justify-between group hover:border-[#3B82F6]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#60A5FA]">02. Hardware Vault</span>
                <Lock className="h-4 w-4 text-[#60A5FA]" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-3">
                SQLCipher Encrypted Local Storage
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                Your code history never resides in unencrypted plaintext on flash storage.
              </p>
              <ul className="space-y-2 text-xs text-[#94A3B8] font-mono">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34C759]"></span>
                  <span>AES-256 encrypted SQLite DB</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34C759]"></span>
                  <span>Android EncryptedSharedPreferences</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34C759]"></span>
                  <span>Zero cloud history sync</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2B3648] text-xs text-[#64748B]">
              Android Keystore backed master keys
            </div>
          </div>

          {/* Card 3: Multi-Language Conversion Matrix (Col-Span-1) */}
          <div className="rounded-2xl bg-[#1A2233] border border-[#2B3648] p-8 flex flex-col justify-between group hover:border-[#3B82F6]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#60A5FA]">03. Cross-Language</span>
                <ArrowRightLeft className="h-4 w-4 text-[#60A5FA]" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-3">
                Idiomatic Code Translation
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                Translate across 12+ major languages without losing language idioms:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-[#94A3B8]">
                {['Kotlin', 'Python', 'TypeScript', 'Rust', 'Go', 'Swift', 'C++', 'Java', 'C#', 'PHP'].map((lang) => (
                  <span key={lang} className="px-2 py-1 bg-[#121826] border border-[#2B3648] rounded text-[#F8FAFC]">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2B3648] text-xs text-[#64748B]">
              Preserves async models & memory conventions
            </div>
          </div>

          {/* Card 4: Sliding-Window Rate Limiter & Zero-CORS (Col-Span-2) */}
          <div className="md:col-span-2 rounded-2xl bg-[#1A2233] border border-[#2B3648] p-8 flex flex-col justify-between group hover:border-[#3B82F6]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#60A5FA]">04. DDoS & Abuse Defense</span>
                <Shield className="h-4 w-4 text-[#34C759]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] mb-3">
                Cloudflare Durable Objects & Zero-CORS Architecture
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 max-w-xl">
                AlterCode enforces enterprise-grade quota management directly on edge workers. By omitting CORS headers, unauthorized web bots and scrapers are rejected at the edge, reserving compute solely for certified Android clients.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div className="p-3 bg-[#121826] border border-[#2B3648] rounded-xl text-center">
                  <div className="text-xs text-[#64748B]">Burst Limit</div>
                  <div className="text-base font-bold text-[#F8FAFC] mt-1 tabular-nums">10 req/min</div>
                </div>
                <div className="p-3 bg-[#121826] border border-[#2B3648] rounded-xl text-center">
                  <div className="text-xs text-[#64748B]">Sustained Limit</div>
                  <div className="text-base font-bold text-[#F8FAFC] mt-1 tabular-nums">60 req/hr</div>
                </div>
                <div className="p-3 bg-[#121826] border border-[#2B3648] rounded-xl text-center">
                  <div className="text-xs text-[#64748B]">Daily Quota</div>
                  <div className="text-base font-bold text-[#34C759] mt-1 tabular-nums">200 req/day</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2B3648] flex items-center justify-between text-xs text-[#64748B]">
              <span>Keyed by Device Fingerprint & IP</span>
              <span>Sub-millisecond SQLite sliding window</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
