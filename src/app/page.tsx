import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../app/components/HeroSection';
import DesignArchitectureSection from '../app/components/DesignArchitectureSection';
import AtomicDesignSection from '../app/components/AtomicDesignSection';
import ColorSystemSection from '../app/components/ColorSystemSection';
import TypographySection from '../app/components/TypographySection';
import GridBreakpointsSection from '../app/components/GridBreakpointsSection';
import IconSetSection from '../app/components/IconSetSection';
import ComponentSetSection from '../app/components/component-set/index';
import ThankYouSection from '../app/components/ThankYouSection';
import VariableSection from '../app/components/VariableSection';
import ResultSection from '../app/components/ResultSection';
import AccessibilitySection from '../app/components/AccessibilitySection';
0
export default function CaseStudyPage() {
  return (
    <main className="relative">
      <Header />

      {/* 1. Hero — Light */}
      <HeroSection />

      {/* 2. Design Architecture — Dark */}
      <DesignArchitectureSection />

      {/* 3. Atomic Design — Dark */}
      <AtomicDesignSection />

      {/* 4. Color System — Light */}
      <ColorSystemSection />

      {/* 5. Typography — Light */}
      <TypographySection />

      {/* 6. Grid & Breakpoints — Dark */}
      <GridBreakpointsSection />

      {/* 7. Icon Set — Dark */}
      {/* <IconSetSection /> */}

      {/* 8. Component Set — Light */}
      <ComponentSetSection />

      {/* 9. Accessibility */}
      <AccessibilitySection />

      {/* 10. Variables */}
      <VariableSection />

      {/* 11. Results */}
      <ResultSection />

      {/* <Footer /> */}
    </main>
  );
}