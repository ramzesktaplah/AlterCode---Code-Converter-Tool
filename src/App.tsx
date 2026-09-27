/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractivePlayground } from './components/InteractivePlayground';
import { FeatureBento } from './components/FeatureBento';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { SecuritySection } from './components/SecuritySection';
import { DownloadSection } from './components/DownloadSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#121826] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#3B82F6]/30 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <InteractivePlayground />
        <FeatureBento />
        <ArchitectureDiagram />
        <SecuritySection />
        <DownloadSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
