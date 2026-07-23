'use client';
import React, { useEffect, useRef } from 'react';

interface Shade {
  hex: string;
  label: string;
}

interface ColorFamily {
  name: string;
  shades: Shade[];
}

/* Shades are stored dark → light (source order); renderaced light → dark. */
const colorPalette: ColorFamily[] = [
  {
    name: 'Primary Blue',
    shades: [
      { hex: '#011333', label: 'Secondary' },
      { hex: '#00205B', label: 'Light' },
      { hex: '#002D80', label: '70' },
      { hex: '#063B9E', label: '60' },
      { hex: '#255FCC', label: '50' },
      { hex: '#638EE0', label: '40' },
      { hex: '#86A8E9', label: 'Dark' },
      { hex: '#B3CBF8', label: '30' },
      { hex: '#CFDDF8', label: '20' },
      { hex: '#E5ECF7', label: '10' },
    ],
  },
  {
    name: 'Sky Blue',
    shades: [
      { hex: '#004066', label: '100' },
      { hex: '#005587', label: '90' },
      { hex: '#0B78B8', label: '80' },
      { hex: '#219AE1', label: '60' },
      { hex: '#3CB7FF', label: '50' },
      { hex: '#5FC3FF', label: '40' },
      { hex: '#82D1FF', label: '30' },
      { hex: '#A5DEFF', label: '20' },
      { hex: '#C8EAFF', label: '10' },
      { hex: '#EBF8FF', label: '5' },
    ],
  },
  {
    name: 'Turquoise',
    shades: [
      { hex: '#00434D', label: '100' },
      { hex: '#006775', label: '90' },
      { hex: '#008DA1', label: '80' },
      { hex: '#00AEC7', label: '60' },
      { hex: '#00C1DE', label: '50' },
      { hex: '#16D4F0', label: '40' },
      { hex: '#5BE5F9', label: '30' },
      { hex: '#92ECF9', label: '20' },
      { hex: '#C6F7FE', label: '70' },
      { hex: '#E7FCFF', label: '10' },
    ],
  },
  {
    name: 'Green',
    shades: [
      { hex: '#005E3E', label: '100' },
      { hex: '#036E4A', label: '90' },
      { hex: '#08875B', label: '80' },
      { hex: '#18A272', label: '60' },
      { hex: '#2CBC89', label: '30' },
      { hex: '#2FD39A', label: '50' },
      { hex: '#27E7A7', label: '40' },
      { hex: '#5EF7C4', label: '70' },
      { hex: '#9CFCDA', label: '20' },
      { hex: '#D1FFEF', label: '10' },
    ],
  },
  {
    name: 'Orange',
    shades: [
      { hex: '#683100', label: '100' },
      { hex: '#8C4100', label: '90' },
      { hex: '#B35400', label: '80' },
      { hex: '#D56401', label: '60' },
      { hex: '#FF7700', label: '50' },
      { hex: '#FF8F2E', label: '40' },
      { hex: '#FFAB61', label: '30' },
      { hex: '#FFC38F', label: '20' },
      { hex: '#FFD9B8', label: '70' },
      { hex: '#FFF1E5', label: '10' },
    ],
  },
  {
    name: 'Yellow',
    shades: [
      { hex: '#554000', label: '100' },
      { hex: '#775900', label: '90' },
      { hex: '#A27900', label: '80' },
      { hex: '#BB8E09', label: '60' },
      { hex: '#DDAB17', label: '70' },
      { hex: '#FFC929', label: '50' },
      { hex: '#FFD557', label: '40' },
      { hex: '#FFE085', label: '30' },
      { hex: '#FFECB3', label: '20' },
      { hex: '#FFF9E5', label: '10' },
    ],
  },
  {
    name: 'Lime Yellow',
    shades: [
      { hex: '#414000', label: '100' },
      { hex: '#5A5900', label: '90' },
      { hex: '#878600', label: '80' },
      { hex: '#A3A211', label: '60' },
      { hex: '#C5C420', label: '50' },
      { hex: '#E1E000', label: '40' },
      { hex: '#F5F456', label: '30' },
      { hex: '#FEFD82', label: '20' },
      { hex: '#FCFBB6', label: '70' },
      { hex: '#FFFFE3', label: '10' },
    ],
  },
  {
    name: 'Lime Green',
    shades: [
      { hex: '#243300', label: '100' },
      { hex: '#334B00', label: '90' },
      { hex: '#4F7100', label: '80' },
      { hex: '#689400', label: '60' },
      { hex: '#84BD00', label: '50' },
      { hex: '#A3DA22', label: '40' },
      { hex: '#BEEF4F', label: '30' },
      { hex: '#CFF47A', label: '20' },
      { hex: '#E6FFAD', label: '70' },
      { hex: '#F3FFDC', label: '10' },
    ],
  },
  {
    name: 'Cooper',
    shades: [
      { hex: '#22201C', label: 'Secondary' },
      { hex: '#453F34', label: '90' },
      { hex: '#685A47', label: '80' },
      { hex: '#897059', label: 'Light' },
      { hex: '#A28B73', label: '60' },
      { hex: '#B9A28B', label: '50' },
      { hex: '#CEBAA3', label: '40' },
      { hex: '#E8D6C1', label: 'Dark' },
      { hex: '#F4E7D9', label: '20' },
      { hex: '#FFF6ED', label: '10' },
    ],
  },
  {
    name: 'Purple',
    shades: [
      { hex: '#610153', label: '100' },
      { hex: '#830A71', label: '90' },
      { hex: '#A51890', label: '80' },
      { hex: '#BB35A7', label: '60' },
      { hex: '#D653C3', label: '50' },
      { hex: '#E66CD4', label: '40' },
      { hex: '#F489E4', label: '30' },
      { hex: '#FAB0EF', label: '20' },
      { hex: '#FFD0F8', label: '70' },
      { hex: '#FFEEFC', label: '10' },
    ],
  },
  {
    name: 'Pink',
    shades: [
      { hex: '#52002E', label: '100' },
      { hex: '#740041', label: '90' },
      { hex: '#960054', label: '80' },
      { hex: '#B8086A', label: '70' },
      { hex: '#DA1884', label: 'Light' },
      { hex: '#F0369E', label: '50' },
      { hex: '#FF5CB6', label: 'Dark' },
      { hex: '#FF8BCB', label: '30' },
      { hex: '#FFBAE0', label: '20' },
      { hex: '#FFEAF5', label: '10' },
    ],
  },
  {
    name: 'Red',
    shades: [
      { hex: '#6A0014', label: '100' },
      { hex: '#92001C', label: '90' },
      { hex: '#BB0023', label: '80' },
      { hex: '#E4002B', label: '70' },
      { hex: '#F23346', label: '40' },
      { hex: '#F86471', label: '30' },
      { hex: '#FF8998', label: '20' },
      { hex: '#FFA2B0', label: '10' },
      { hex: '#FDBAC5', label: '60' },
      { hex: '#FAD1D8', label: '50' },
    ],
  },
  {
    name: 'Cool Grey',
    shades: [
      { hex: '#14171D', label: '100' },
      { hex: '#282E3A', label: '90' },
      { hex: '#3C4657', label: '80' },
      { hex: '#505D74', label: '70' },
      { hex: '#63728A', label: '60' },
      { hex: '#919CB0', label: '50' },
      { hex: '#B3BBC8', label: '40' },
      { hex: '#CED5DD', label: '30' },
      { hex: '#E0E3E9', label: '20' },
      { hex: '#EFF1F4', label: '10' },
    ],
  },
  {
    name: 'Warm Grey',
    shades: [
      { hex: '#1A1A1A', label: '100' },
      { hex: '#333333', label: '90' },
      { hex: '#585858', label: '80' },
      { hex: '#828282', label: '60' },
      { hex: '#A3A3A3', label: '50' },
      { hex: '#C5C5C5', label: '40' },
      { hex: '#D4D4D4', label: '30' },
      { hex: '#E6E6E6', label: '20' },
      { hex: '#F1F1F1', label: '70' },
      { hex: '#FAFAFA', label: '10' },
    ],
  },
  {
    name: 'White / Black',
    shades: [
      { hex: '#FFFFFF', label: 'White' },
      { hex: '#000000', label: 'Black' },
    ],
  },
  {
    name: 'Disco Cockpit Grey',
    shades: [
      { hex: '#282828', label: '100' },
      { hex: '#4D4D4D', label: '40' },
      { hex: '#6F6F6F', label: '30' },
      { hex: '#B9B9B9', label: '20' },
    ],
  },
  {
    name: 'Disco Cockpit',
    shades: [
      { hex: '#00FF00', label: 'Green' },
      { hex: '#FF4D9A', label: 'Pink' },
      { hex: '#FFDD00', label: 'Yellow' },
    ],
  },
  {
    name: 'Dark Scale',
    shades: [
      { hex: '#0F1318', label: '80' },
      { hex: '#14171D', label: '60' },
      { hex: '#181C21', label: '50' },
      { hex: '#1C1F25', label: '40' },
      { hex: '#25282E', label: '30' },
      { hex: '#292D33', label: '20' },
      { hex: '#32353B', label: '70' },
      { hex: '#3A3E44', label: '10' },
    ],
  },
];

/* Values pulled directly from the palette above, mapped to their semantic role. */
const colorTokens = [
  { name: '--color-primary', value: '#255FCC', usage: 'Brand primary, CTAs, links (Primary Blue 50)' },
  { name: '--color-primary-hover', value: '#063B9E', usage: 'Hover state for primary (Primary Blue 60)' },
  { name: '--color-background', value: '#FAFAFA', usage: 'Page background, light (Warm Grey 10)' },
  { name: '--color-surface', value: '#FFFFFF', usage: 'Card and panel backgrounds (White)' },
  { name: '--color-foreground', value: '#14171D', usage: 'Primary text color (Cool Grey 100)' },
  { name: '--color-muted', value: '#63728A', usage: 'Secondary text, placeholders (Cool Grey 60)' },
  { name: '--color-border', value: '#D4D4D4', usage: 'Dividers, input borders (Warm Grey 30)' },
  { name: '--color-danger', value: '#E4002B', usage: 'Error states, destructive actions (Red 70)' },
  { name: '--color-success', value: '#08875B', usage: 'Success states, confirmations (Green — light success default)' },
];

export default function ColorSystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rowRefs.current.forEach((row, i) => {
              if (!row) return;
              setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
              }, i * 60);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="color" ref={sectionRef} className="py-16 sm:py-20 lg:py-28 bg-[#fff] relative overflow-hidden">
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #C8C4BC 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(232,71,10,0.05) 0%, transparent 40%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#0a67e8]" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#0a67e8]">
                Tokens / Colors
              </span>
              <div className="w-8 h-px bg-[#0a67e8]" />
            </div>
            <h2
              className="text-[#0D0D0D] leading-none"
              style={{
                fontSize: 'clamp(32px, 8vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
              }}
            >
              <span className="text-[#0a67e8]">Color</span> System
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-md">
              Colours are the heart of the Airbus Design System. It is important to respect the brand colour guidelines to which your app depends on.
            </p>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-semibold text-[#0D0D0D]">Color Palette</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#0a67e8]/10 text-[#0a67e8] border border-[#0a67e8]/20">
              Airbus Brand Colors
            </span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#0D0D0D]/5 text-[#6B6B6B]">
              {colorPalette.length} families
            </span>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {colorPalette.map((palette, pi) => {
              const lightToDark = [...palette.shades].reverse();
              return (
                <div
                  key={palette.name}
                  ref={(el) => { if (el) rowRefs.current[pi] = el; }}
                  style={{ opacity: 0, transform: 'translateX(-20px)', transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"
                >
                  <span className="text-xs sm:text-sm font-medium text-[#0D0D0D] w-full sm:w-28 shrink-0">
                    {palette.name}
                  </span>

                  {/* Mobile: horizontal scroll strip. Desktop: wraps and fills the row. */}
                  <div
                    className="flex gap-1.5 w-full overflow-x-auto sm:overflow-visible sm:flex-wrap pb-1 sm:pb-0 [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {lightToDark.map((shade, si) => (
                      <div
                        key={si}
                        className="group relative w-11 h-11 sm:w-auto sm:h-12 sm:flex-1 sm:min-w-[42px] flex-shrink-0 sm:flex-shrink rounded-xl cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:z-10"
                        style={{ background: shade.hex }}
                      >
                        {/* Hover tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1.5 bg-[#0D0D0D] text-[#EBF8FF] text-[10px] font-mono rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none shadow-xl">
                          {shade.hex}
                          <span className="opacity-50"> · {shade.label}</span>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0D0D0D] rotate-45 -mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Color Tokens Table */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-semibold text-[#0D0D0D]">Color Tokens</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#0a67e8]/10 text-[#0a67e8] border border-[#0a67e8]/20">
              Design Tokens
            </span>
          </div>

          <div className="rounded-2xl border border-[#D8D4CC] overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-0 bg-[#dcf3ff] px-6 py-3 border-b border-[#EBF8FF]">
              <span className="col-span-4 text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">Token Name</span>
              <span className="col-span-2 text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">Value</span>
              <span className="col-span-6 text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">Usage</span>
            </div>
            {colorTokens.map((token, i) => (
              <div
                key={token.name}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-0 px-4 sm:px-6 py-4 sm:items-center hover:bg-[#EBF8FF]/50 transition-colors ${i < colorTokens.length - 1 ? 'border-b border-[#D8D4CC]' : ''}`}
              >
                <div className="sm:col-span-4">
                  <span className="font-mono text-sm text-[#0D0D0D] break-all">{token.name}</span>
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <div className="w-5 h-5 rounded border border-[#D8D4CC] shadow-sm shrink-0" style={{ background: token.value }} />
                  <span className="font-mono text-xs text-[#6B6B6B]">{token.value}</span>
                </div>
                <div className="sm:col-span-6">
                  <span className="text-sm text-[#6B6B6B]">{token.usage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Base / Semantic / Component Colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              title: 'Base Colors',
              desc: 'Global token values — the foundational palette that maps directly to absolute hex values. These are never used directly in components.',
              tokens: ['--gray-100', '--gray-500', '--orange-500', '--red-500'],
              accent: 'border-[#0a67e8]/20 bg-[#0a67e8]/5',
              icon: '●',
            },
            {
              title: 'Semantic Colors',
              desc: 'These tokens exist for the purpose of adding value to the design tokens hierarchy. They communicate the purpose of the color — not the color itself.',
              tokens: ['--color-action-primary', '--color-danger', '--color-success', '--color-neutral'],
              accent: 'border-amber-500/20 bg-amber-500/5',
              icon: '◆',
            },
            {
              title: 'Component Colors',
              desc: 'Adding a component-specific context constrains which semantic tokens a specific component can use, simplifying component logic to developers.',
              tokens: ['--button-primary-bg', '--input-border-default', '--badge-danger-bg', '--card-surface'],
              accent: 'border-blue-500/20 bg-blue-500/5',
              icon: '■',
            },
          ].map((section) => (
            <div key={section.title} className={`p-5 sm:p-6 rounded-2xl border ${section.accent}`}>
              <h3 className="text-base font-bold text-[#0D0D0D] mb-3">{section.title}</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{section.desc}</p>
              <div className="space-y-2">
                {section.tokens.map((t) => (
                  <div key={t} className="font-mono text-xs text-[#6B6B6B] bg-[#0D0D0D]/5 rounded px-2 py-1 flex items-center gap-2 break-all">
                    <span className="text-[10px] opacity-30 shrink-0">{section.icon}</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Airbus Design System Link */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-[#D8D4CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-[#6B6B6B]">
            View the full color guidelines at{' '}
            <a
              href="https://design-system.airbus.com/visual-styles/colours/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0a67e8] hover:text-[#E8470A] transition-colors font-medium"
            >
              Airbus Design System ↗
            </a>
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#6B6B6B]/50">v2.4.0</span>
            <div className="w-px h-4 bg-[#D8D4CC]" />
            <span className="text-xs font-mono text-[#6B6B6B]/50">WCAG 2.2 AA</span>
          </div>
        </div>
      </div>
    </section>
  );
}