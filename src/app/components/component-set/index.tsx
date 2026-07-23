'use client';
import React, { useState } from 'react';
import { ComponentId } from './types';
import { CATEGORIES } from './data';
import { CategoryAccordion } from './components/category-accordion';

export default function ComponentSetSection() {
  const [openCat, setOpenCat] = useState<string | null>('actions');
  const [openComp, setOpenComp] = useState<ComponentId | null>('button');
  const [activeTab, setActiveTab] = useState<'props' | 'a11y'>('props');

  const handleToggleCat = (catId: string) => {
    const wasOpen = openCat === catId;
    const next = wasOpen ? null : catId;
    setOpenCat(next);
    if (next) {
      const cat = CATEGORIES.find((c) => c.id === next);
      if (cat && cat.items.length && !cat.items.includes(openComp as ComponentId)) {
        setOpenComp(cat.items[0]);
        setActiveTab('props');
      }
    }
  };

  const handleToggleComp = (id: ComponentId) => {
    const wasOpen = openComp === id;
    setOpenComp(wasOpen ? null : id);
    setActiveTab('props');
  };

  return (
    <section id="components" className="py-28 relative overflow-hidden" style={{ background: '#EBF8FF' }}>
      {/* Subtle blue dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{ backgroundImage: 'radial-gradient(circle, #0a67e8 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Ambient blue glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 20%, rgba(10,103,232,0.06) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Ambient blue glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(10,103,232,0.04) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#0a67e8]" />
              <span className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>
                Design Assets
              </span>
              <div className="w-6 h-px bg-[#0a67e8]" />
            </div>
            <h2
              className="leading-none"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0D0D0D', fontFamily: "'DM Sans', sans-serif" }}
            >
              <span style={{ color: '#0a67e8' }}>Component</span> Set
            </h2>
          </div>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>
            As we move up the hierarchy of the atomic design, components become more complex. Explore the full library below — every property is live and interactive, checked against WCAG 2.2 AA, and shown alongside its original design reference.
          </p>
        </div>

        {/* Accordion */}
        <div>
          {CATEGORIES.map((cat) => (
            <CategoryAccordion
              key={cat.id}
              cat={cat}
              isOpen={openCat === cat.id}
              openComp={openCat === cat.id ? openComp : null}
              activeTab={activeTab}
              onToggleCat={() => handleToggleCat(cat.id)}
              onToggleComp={handleToggleComp}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: '44', label: 'Components', suffix: '+' },
            { value: '121', label: 'Design Tokens', suffix: '' },
            { value: '7', label: 'Color Scales', suffix: '' },
            { value: '3', label: 'Breakpoints', suffix: '' },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl border text-center" style={{ borderColor: '#D8D4CC', background: '#FFFFFF' }}>
              <div className="text-3xl font-bold" style={{ color: '#0a67e8', fontFamily: "'DM Sans', sans-serif" }}>
                {stat.value}
                <span style={{ color: 'rgba(10,103,232,0.55)' }}>{stat.suffix}</span>
              </div>
              <div className="text-sm mt-1" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
