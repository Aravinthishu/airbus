'use client';
import React, { useEffect, useRef } from 'react';

const breakpoints = [
  {
    name: 'Desktop',
    px: '1920px',
    cols: 12,
    gutter: '24px',
    margin: '160px',
    device: 'laptop',
    gridColor: 'rgba(10,103,232,0.3)',
  },
  {
    name: 'Tablet',
    px: '768px',
    cols: 8,
    gutter: '16px',
    margin: '32px',
    device: 'tablet',
    gridColor: 'rgba(10,103,232,0.3)',
  },
  {
    name: 'Mobile',
    px: '375px',
    cols: 4,
    gutter: '16px',
    margin: '16px',
    device: 'mobile',
    gridColor: 'rgba(10,103,232,0.3)',
  },
];

function DesktopMockup({ gridColor }: { gridColor: string }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: '760px' }}>
      {/* Screen */}
      <div
        className="device-screen rounded-t-xl overflow-hidden"
        style={{ aspectRatio: '16/10', padding: '14px' }}
      >
        {/* Grid columns visualization */}
        <div className="w-full h-full rounded-lg overflow-hidden relative bg-dark-surface">
          <div className="absolute inset-0 flex gap-px px-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-full rounded-sm opacity-30"
                style={{ background: gridColor }}
              />
            ))}
          </div>
          {/* Fake UI content */}
          <div className="relative z-10 p-5 space-y-3">
            <div className="h-3.5 w-28 rounded bg-white/20" />
            <div className="h-2.5 w-48 rounded bg-white/10" />
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-20 rounded-lg bg-white/5 border border-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Stand */}
      <div className="h-2.5 bg-dark-muted rounded-b-sm" />
      <div className="h-2 w-1/3 mx-auto bg-dark-muted rounded-b-lg" />
    </div>
  );
}

function TabletMockup({ gridColor }: { gridColor: string }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: '380px' }}>
      <div
        className="device-screen rounded-2xl overflow-hidden border-4 border-dark-muted"
        style={{ aspectRatio: '3/4', padding: '14px' }}
      >
        <div className="w-full h-full rounded-xl overflow-hidden relative bg-dark-surface">
          <div className="absolute inset-0 flex gap-px px-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-full rounded-sm opacity-30"
                style={{ background: gridColor }}
              />
            ))}
          </div>
          <div className="relative z-10 p-4 space-y-3">
            <div className="h-3 w-20 rounded bg-white/20" />
            <div className="h-2 w-28 rounded bg-white/10" />
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-16 rounded-lg bg-white/5 border border-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Home bar */}
      <div className="h-1 w-16 mx-auto mt-3 bg-dark-muted rounded-full" />
    </div>
  );
}

function MobileMockup({ gridColor }: { gridColor: string }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: '230px' }}>
      <div
        className="device-screen rounded-3xl overflow-hidden border-4 border-dark-muted relative"
        style={{ aspectRatio: '9/19', padding: '10px' }}
      >
        {/* Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-dark-bg rounded-full z-20" />
        <div className="w-full h-full rounded-2xl overflow-hidden relative bg-dark-surface">
          <div className="absolute inset-0 flex gap-px px-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-full rounded-sm opacity-30"
                style={{ background: gridColor }}
              />
            ))}
          </div>
          <div className="relative z-10 p-3 pt-8 space-y-2">
            <div className="h-2.5 w-14 rounded bg-white/20" />
            <div className="h-2 w-20 rounded bg-white/10" />
            <div className="space-y-2 mt-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-12 rounded-lg bg-white/5 border border-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Home indicator */}
      <div className="h-1 w-12 mx-auto mt-3 bg-dark-muted rounded-full" />
    </div>
  );
}

export default function GridBreakpointsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const devicesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            devicesRef.current.forEach((el, i) => {
              if (!el) return;
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, i * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="grid" ref={sectionRef} className="py-28 bg-dark-bg relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,243,239,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,239,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[#0a67e8]" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">
                Grid System
              </span>
            </div>
            <h2
              className="text-white leading-none text-section-title"
              style={{
    
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              Grid &{' '}
              <span className="text-[#0a67e8]">Breakpoints</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              A responsive grid system keeps layouts structured and consistent across all breakpoints. Each value — from desktop to gutters — is set on a modular token, simplifying alignment and reducing design decisions.
            </p>
          </div>
        </div>

        {/* Devices — Desktop, Tablet, Mobile */}
        <div className="flex flex-col gap-24">
          {/* Desktop */}
          <div
            ref={(el) => { if (el) devicesRef.current[0] = el; }}
            style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-5 border border-white/20 flex items-center justify-center">
                <div className="w-2.5 h-2 bg-white/40" />
              </div>
              <span className="text-sm font-semibold text-white">Desktop</span>
              <span className="text-xs font-mono text-white/40">1920px — 12 columns</span>
            </div>
            <DesktopMockup gridColor="rgba(10,103,232,0.4)" />
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { label: 'Breakpoint', value: '1920px' },
                { label: 'Columns', value: '12' },
                { label: 'Gutter', value: '24px' },
                { label: 'Margin', value: '160px' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-2"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="text-xs text-white/30 font-mono">{item.label}</div>
                  <div className="text-sm font-mono text-[#0a67e8]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tablet + Mobile side by side */}
          <div
            ref={(el) => { if (el) devicesRef.current[1] = el; }}
            style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 lg:gap-16 items-start"
          >
            {/* Tablet */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-5 h-5 border border-white/20 flex items-center justify-center">
                  <div className="w-3 h-2 bg-white/40" />
                </div>
                <span className="text-sm font-semibold text-white">Tablet</span>
                <span className="text-xs font-mono text-white/40">768px — 8 cols</span>
              </div>
              <TabletMockup gridColor="rgba(10,103,232,0.4)" />
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  { label: 'Breakpoint', value: '768px' },
                  { label: 'Columns', value: '8' },
                  { label: 'Gutter', value: '16px' },
                  { label: 'Margin', value: '32px' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-4 py-2"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-xs text-white/30 font-mono">{item.label}</div>
                    <div className="text-sm font-mono text-white/80">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-4 h-5 border border-white/20 flex items-center justify-center">
                  <div className="w-1.5 h-2.5 bg-white/40" />
                </div>
                <span className="text-sm font-semibold text-white">Mobile</span>
                <span className="text-xs font-mono text-white/40">375px — 4 cols</span>
              </div>
              <MobileMockup gridColor="rgba(10,103,232,0.4)" />
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  { label: 'Breakpoint', value: '375px' },
                  { label: 'Columns', value: '4' },
                  { label: 'Gutter', value: '16px' },
                  { label: 'Margin', value: '16px' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-4 py-2"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-xs text-white/30 font-mono">{item.label}</div>
                    <div className="text-sm font-mono text-white/80">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}