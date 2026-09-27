import React, { useState } from 'react';
import { Download, ArrowRight, ShieldCheck, Cpu, Smartphone, Play } from 'lucide-react';
import mobileHeroImage from '../assets/images/altercode_mobile_hero_1790513583351.jpg';

export const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const scrollToPlayground = () => {
    document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#2B3648]">
      {/* Background ambient radial gradients matching CanvasSlate & AccentBlue */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#3B82F6]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#1D3A6B]/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#60A5FA] mb-4">
              <span>Android Exclusive</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span>Kotlin & Jetpack Compose</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span className="text-[#94A3B8]">Version alter 2.8</span>
            </div>

            {/* Headline with balanced wrapping */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.1] mb-6 [text-wrap:balance]">
              The Native AI Code Assistant in Your Pocket.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mb-8">
              Translate languages, refactor architecture, isolate runtime bugs, and explain complex snippets directly on Android. Backed by hardware-level SQLCipher local encryption and smart dual-engine AI routing.
            </p>

            {/* Primary Action Zone */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="https://play.google.com/store/apps/details?id=com.ai.altercode"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-xl transition-all shadow-lg shadow-[#3B82F6]/25 hover:shadow-[#3B82F6]/40 cursor-pointer whitespace-nowrap group"
              >
                <Play className="h-4 w-4 fill-current text-white" />
                <span>Get it on Google Play</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={scrollToPlayground}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-[#F8FAFC] bg-[#1A2233] hover:bg-[#1E293B] border border-[#2B3648] hover:border-[#3B82F6]/50 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Try Interactive Demo</span>
              </button>
            </div>

            {/* Subtitle trust marker & Google Play exclusivity */}
            <div className="pt-6 border-t border-[#2B3648]/80 w-full">
              <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-3">
                <span className="inline-block h-2 w-2 rounded-full bg-[#34C759]"></span>
                <span className="font-medium text-[#F8FAFC]">Live Distribution:</span>
                <span>Currently available exclusively on Google Play Store</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-[#64748B]">
                <div>
                  <span className="text-[#94A3B8] block font-semibold">SQLCipher v4</span>
                  <span>AES-256 local DB</span>
                </div>
                <div>
                  <span className="text-[#94A3B8] block font-semibold">Dual Engine</span>
                  <span>Groq & Gemini</span>
                </div>
                <div>
                  <span className="text-[#94A3B8] block font-semibold">Dark OLED</span>
                  <span>#121826 Canvas</span>
                </div>
                <div>
                  <span className="text-[#94A3B8] block font-semibold">Zero-CORS</span>
                  <span>Mobile proxy only</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Anchor (Phone Mockup with fallback) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-[460px] rounded-2xl overflow-hidden border border-[#2B3648] bg-[#1A2233] shadow-2xl shadow-black/60 group">
              
              {!imageError ? (
                <img
                  src={mobileHeroImage}
                  alt="AlterCode Android App running on flagship smartphone with dark mode syntax editor"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                />
              ) : (
                /* High-fidelity CSS/SVG fallback container */
                <div className="aspect-[4/3] w-full p-8 flex flex-col justify-between bg-gradient-to-br from-[#1A2233] to-[#121826]">
                  <div className="flex items-center justify-between border-b border-[#2B3648] pb-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-[#3B82F6]" />
                      <span className="font-mono text-sm font-semibold text-[#F8FAFC]">AlterCode Mobile OS</span>
                    </div>
                    <span className="text-xs font-mono text-[#34C759]">● Online</span>
                  </div>
                  <div className="font-mono text-xs text-[#94A3B8] bg-[#121826] p-4 rounded-lg border border-[#2B3648]">
                    <p className="text-[#C792EA]">suspend fun <span className="text-[#82AAFF]">alterCode</span>() &#123;</p>
                    <p className="pl-4 text-[#C3E88D]">"Native Android AI Code Assistant"</p>
                    <p className="text-[#C792EA]">&#125;</p>
                  </div>
                  <div className="text-xs text-[#64748B]">Google Play Store Build · Kotlin Jetpack Compose</div>
                </div>
              )}

              {/* Floating interactive badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#121826]/90 backdrop-blur-md border border-[#2B3648] rounded-xl p-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#60A5FA]">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#F8FAFC]">Ultra-Fast Latency</div>
                    <div className="text-[11px] text-[#94A3B8]">Groq & Gemini Dual Routing</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#34C759] px-2 py-1 bg-[#34C759]/10 rounded border border-[#34C759]/20">
                  &lt; 250ms
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
