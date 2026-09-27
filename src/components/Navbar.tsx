import React from 'react';
import { Terminal, Download, Github } from 'lucide-react';

export const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2B3648] bg-[#121826]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#F8FAFC] transition-opacity hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#60A5FA]">
            <Terminal className="h-4 w-4" />
          </span>
          <span>AlterCode</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]">
          <button
            onClick={() => scrollTo('features')}
            className="hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('playground')}
            className="hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            Interactive Demo
          </button>
          <button
            onClick={() => scrollTo('architecture')}
            className="hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            AI Architecture
          </button>
          <button
            onClick={() => scrollTo('security')}
            className="hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            Security
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ramzesktaplah/Altercode"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] border border-[#2B3648] hover:border-[#3B82F6]/40 rounded-lg bg-[#1A2233] transition-colors whitespace-nowrap"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.ai.altercode"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition-colors shadow-sm shadow-[#3B82F6]/20 whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Google Play</span>
          </a>
        </div>
      </div>
    </header>
  );
};
