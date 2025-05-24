
import React from 'react';
import { BackgroundElements } from '@/components/BackgroundElements';
import { MainContent } from '@/components/MainContent';
import { FooterSection } from '@/components/FooterSection';
import { CookieBanner } from '@/components/CookieBanner';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 relative overflow-hidden">
      <BackgroundElements />

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <MainContent />
        <FooterSection />
      </div>

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
};

export default Index;
