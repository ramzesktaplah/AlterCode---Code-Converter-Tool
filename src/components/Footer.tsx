import React from 'react';
import { Terminal, Github, Download, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#121826] border-t border-[#2B3648] py-12 text-xs text-[#94A3B8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Attribution */}
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#60A5FA]">
              <Terminal className="h-3.5 w-3.5" />
            </span>
            <span className="font-bold text-[#F8FAFC] tracking-tight text-sm">AlterCode</span>
            <span className="text-[#64748B]">·</span>
            <span>Created by Ramzes</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://play.google.com/store/apps/details?id=com.ai.altercode"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              Google Play Store
            </a>
            <a
              href="https://github.com/ramzesktaplah/Altercode"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              GitHub Repository
            </a>
            <a
              href="https://github.com/ramzesktaplah/Altercode/blob/main/Release_Notes.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              Release Notes
            </a>
            <a
              href="https://github.com/ramzesktaplah/Altercode/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8FAFC] transition-colors"
            >
              Issue Tracker
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[#64748B] font-mono text-[11px]">
            © {new Date().getFullYear()} AlterCode. Distributed for Android.
          </div>

        </div>
      </div>
    </footer>
  );
};
