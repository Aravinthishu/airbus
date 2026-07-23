import React from 'react';
import AppLogo from '../components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-dark-border py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <AppLogo size={28} iconName="CubeTransparentIcon" className="text-primary" />
          <span className="text-white/60 text-sm font-medium">Airbus Design System</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/40">
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">Behance</a>
          <a href="#" className="hover:text-white/80 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/80 transition-colors">Terms</a>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}