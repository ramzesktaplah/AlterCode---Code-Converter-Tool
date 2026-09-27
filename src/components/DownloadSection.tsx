import React, { useState } from 'react';
import { Download, QrCode, Play, Smartphone, Github, CheckCircle2, Shield, Copy, Check } from 'lucide-react';

export const DownloadSection: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.ai.altercode';

  const copyUrl = () => {
    navigator.clipboard.writeText(playStoreUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="download" className="py-20 md:py-28 border-b border-[#2B3648] bg-[#151D2C]/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Card */}
        <div className="rounded-3xl border border-[#2B3648] bg-gradient-to-b from-[#1A2233] to-[#121826] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#3B82F6]/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono text-[#34C759] mb-3">
                <span className="inline-block h-2 w-2 rounded-full bg-[#34C759] animate-pulse"></span>
                <span>Verified Google Play Production Release</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-4 [text-wrap:balance]">
                Download AlterCode on Google Play
              </h2>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-6">
                AlterCode is currently distributed exclusively on the Google Play Store for Android. Get native performance, hardware encryption, and smart AI code tools in seconds.
              </p>

              {/* Primary Download CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-xl text-white bg-[#3B82F6] hover:bg-[#2563EB] font-bold text-sm shadow-xl shadow-[#3B82F6]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                >
                  <Play className="h-5 w-5 fill-current text-white" />
                  <div className="text-left">
                    <div className="text-[10px] font-normal uppercase tracking-wider text-blue-100">Get It On</div>
                    <div className="text-base font-bold leading-tight">Google Play Store</div>
                  </div>
                </a>

                <a
                  href="https://github.com/ramzesktaplah/Altercode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-4 rounded-xl text-[#F8FAFC] bg-[#121826] hover:bg-[#151D2C] border border-[#2B3648] hover:border-[#3B82F6]/50 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Github className="h-5 w-5" />
                  <span>Inspect Source on GitHub</span>
                </a>
              </div>

              {/* Package specs list */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#2B3648] text-xs font-mono">
                <div>
                  <span className="text-[#64748B] block">Package ID</span>
                  <span className="text-[#F8FAFC] font-semibold break-all">com.ai.altercode</span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Current Version</span>
                  <span className="text-[#60A5FA] font-semibold">alter 2.8 (Build 5)</span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Min Android</span>
                  <span className="text-[#F8FAFC] font-semibold">Android 7.0+ (API 24)</span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Target SDK</span>
                  <span className="text-[#34C759] font-semibold">Android 15 (API 36)</span>
                </div>
              </div>

            </div>

            {/* Right Content: QR Code Card for Instant Desktop-to-Mobile Transfer */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-[#121826] border border-[#2B3648] p-6 shadow-xl flex flex-col items-center text-center">
                <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] mb-4">
                  <QrCode className="h-4 w-4 text-[#3B82F6]" />
                  <span>Scan to Install on Android</span>
                </div>

                {/* Styled SVG QR Code Matrix pointing to Google Play URL */}
                <div className="p-4 bg-white rounded-xl shadow-inner mb-4 flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                      playStoreUrl
                    )}&color=12-24-38`}
                    alt="Scan QR code with your phone camera to download AlterCode on Google Play"
                    className="w-40 h-40 object-contain"
                  />
                </div>

                <p className="text-xs text-[#94A3B8] mb-3">
                  Open your camera app on Android to jump directly to the Play Store listing.
                </p>

                <button
                  onClick={copyUrl}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-mono rounded-lg bg-[#1A2233] hover:bg-[#1E293B] border border-[#2B3648] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#34C759]" />
                      <span className="text-[#34C759]">Google Play Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Store Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
