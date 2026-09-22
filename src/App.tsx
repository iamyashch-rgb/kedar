import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SEOHead } from './components/common/SEOHead';
import { SmoothScrollContainer } from './components/common/SmoothScrollContainer';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { PageLoader } from './components/common/PageLoader';
import { ArchitecturalCursor } from './components/common/ArchitecturalCursor';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ConstructionScrollSection } from './components/sections/ConstructionScrollSection';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { FeaturedPropertiesSection } from './components/sections/FeaturedPropertiesSection';
import { LandDealingSection } from './components/sections/LandDealingSection';
import { ConstructionScopeSection } from './components/sections/ConstructionScopeSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { ConsultationCTASection } from './components/sections/ConsultationCTASection';
import { FooterSection } from './components/sections/FooterSection';
import { MobileStickyCTA } from './components/common/MobileStickyCTA';
import { AdminSection } from './components/admin/AdminSection';

export const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
  };

  return (
    <LanguageProvider>
      <SmoothScrollContainer>
        <SEOHead />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--color-earth-accent)] focus:text-white focus:font-mono focus:text-xs font-bold focus:rounded-[2px] focus:shadow-2xl focus:outline-none"
        >
          Skip to main content
        </a>
        <PageLoader />
        <ScrollProgressBar />
        <ArchitecturalCursor />
        <Navbar onOpenAdmin={handleOpenAdmin} />
        <main id="main-content" tabIndex={-1} className="pb-16 md:pb-0 focus:outline-none">
          <HeroSection />
          <ConstructionScrollSection />
          <AboutSection />
          <ServicesSection />
          <FeaturedPropertiesSection />
          <LandDealingSection />
          <ConstructionScopeSection />
          <ProcessSection />
          <ConsultationCTASection />
        </main>
        <FooterSection onOpenAdmin={handleOpenAdmin} />
        <MobileStickyCTA />

        {/* Admin Portal Modal */}
        <AdminSection isOpen={isAdminOpen} onClose={handleCloseAdmin} />
      </SmoothScrollContainer>
    </LanguageProvider>
  );
};

export default App;
