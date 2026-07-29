'use client';
import React, { useEffect, useRef, useState } from 'react';

/**
 * DESIGN NOTE (delete if you like):
 * Signature element = the HUD / attitude-indicator instrument frame around the
 * hero image, with live-ticking ALT / SPD / HDG telemetry and a radar sweep.
 * It's the one thing this page should be remembered by — everything else
 * (grid, chips, marquee) stays quiet in support of it.
 *
 * Fonts: this file assumes "Space Grotesk" (display) + "JetBrains Mono"
 * (telemetry/labels) + "Inter" (body) are available globally — e.g. via
 * next/font in your root layout. A <style> fallback @import is included
 * below so it still renders correctly if you drop this in standalone.
 */

export default function HeroSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Live-ticking HUD telemetry — purely decorative, evokes a flight instrument
  const [alt, setAlt] = useState(38042);
  const [spd, setSpd] = useState(487);
  const [hdg, setHdg] = useState(271);

  useEffect(() => {
    const elements = [leftRef?.current, rightRef?.current];
    elements?.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = i === 0 ? 'translateX(-40px)' : 'translateX(40px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }, 200 + i * 150);
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setAlt((v) => v + (Math.round(Math.random() * 12) - 5));
      setSpd((v) => Math.max(420, Math.min(520, v + (Math.round(Math.random() * 6) - 3))));
      setHdg((v) => (v + (Math.round(Math.random() * 2) - 1) + 360) % 360);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const components = [
    'BUTTON', 'INPUT FIELD', 'DATA TABLE', 'SIDE NAV', 'ACCORDIAN', 'BANNER',
    'BREADCRUMBS', 'TEXT AREA', 'TABS', 'CARD', 'AVATAR'
  ];

  return (
    <section className="relative min-h-screen bg-[#05070B] overflow-hidden flex flex-col justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

        .hud-font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .hud-font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .hud-font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }

        @keyframes hud-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes hud-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes hud-blip {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes hud-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes hud-flicker {
          0%, 92%, 100% { opacity: 1; }
          94% { opacity: 0.4; }
          96% { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hud-anim { animation: none !important; }
        }
      `}</style>

      {/* Blueprint / schematic grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />
      {/* Fine sub-grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)',
          backgroundSize: '12px 12px'
        }}
      />

      {/* Ambient glows — Airbus blue + cockpit amber */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(10,103,232,0.18) 0%, transparent 65%)',
          filter: 'blur(50px)'
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(255,158,44,0.10) 0%, transparent 65%)',
          filter: 'blur(60px)'
        }}
      />

      {/* Slow vertical scan sweep across the whole viewport */}
      <div
        className="hud-anim absolute inset-x-0 top-0 h-full pointer-events-none opacity-[0.05]"
        style={{
          background: 'linear-gradient(to bottom, transparent, #3B82F6 45%, transparent 55%, transparent)',
          animation: 'hud-scan 9s linear infinite'
        }}
      />

      {/* Scattered decorative elements (design-tool motifs, dimmed for dark theme) */}
      <div className="absolute top-28 left-8 opacity-30 pointer-events-none hidden lg:block" style={{ transform: 'rotate(-12deg)' }}>
        <img
          src="https://img.rocket.new/generatedImages/rocket_gen_img_170707ae2-1768299361011.png"
          alt="Figma icon"
          width={44}
          height={44}
          className="drop-shadow-md"
          style={{ filter: 'grayscale(0.3) brightness(1.3)' }}
        />
      </div>
      <div className="absolute bottom-32 left-16 opacity-25 pointer-events-none hidden lg:block" style={{ transform: 'rotate(-5deg)' }}>
        <img
          src="https://img.rocket.new/generatedImages/rocket_gen_img_16c00302b-1767106876728.png"
          alt="Cursor icon"
          width={30}
          height={30}
          style={{ filter: 'brightness(1.5)' }}
        />
      </div>

      {/* Dashed annotation lines */}
      <div
        className="absolute top-24 left-1/4 w-px h-20 pointer-events-none hidden lg:block"
        style={{ background: 'repeating-linear-gradient(to bottom, #3B82F6 0px, #3B82F6 4px, transparent 4px, transparent 8px)', opacity: 0.4 }}
      />
      <div
        className="absolute top-24 right-1/3 w-20 h-px pointer-events-none hidden lg:block"
        style={{ background: 'repeating-linear-gradient(to right, #3B82F6 0px, #3B82F6 4px, transparent 4px, transparent 8px)', opacity: 0.3 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-px bg-[#3B82F6]" />
          <span className="hud-font-mono text-xs font-bold uppercase tracking-[0.4em] text-[#5B9FF5]">
            Portfolio Case Study
          </span>
          <div className="w-8 h-px bg-[#3B82F6]" />
          <span className="hud-anim hud-font-mono flex items-center gap-1.5 ml-auto text-[10px] uppercase tracking-widest text-[#FF9E2C]/80" style={{ animation: 'hud-flicker 4s infinite' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9E2C]" />
            Live System
          </span>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Title / Heading */}
          <div ref={leftRef}>
            <div className="flex items-center gap-2 mb-4">
              <span className="hud-font-mono text-xs text-[#E8EDF4]/50 border border-[#3B82F6]/25 px-2 py-0.5 rounded">
                Airbus
              </span>
              <span className="hud-font-mono text-xs text-[#E8EDF4]/30">/ 2026</span>
            </div>

            <h1
              className="hud-font-display font-bold leading-none tracking-tight text-[#F3F6FA] mb-6"
              style={{ fontSize: 'clamp(56px, 9vw, 120px)', letterSpacing: '-0.03em' }}
            >
              Design{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#3B82F6]">System</span>

                {/* Targeting reticle corners — replaces generic dashed box */}
                {[
                  { top: '-14px', left: '-16px', borderTop: '2px solid', borderLeft: '2px solid' },
                  { top: '-14px', right: '-16px', borderTop: '2px solid', borderRight: '2px solid' },
                  { bottom: '-14px', left: '-16px', borderBottom: '2px solid', borderLeft: '2px solid' },
                  { bottom: '-14px', right: '-16px', borderBottom: '2px solid', borderRight: '2px solid' }
                ].map((pos, i) => (
                  <span
                    key={i}
                    className="absolute pointer-events-none"
                    style={{
                      width: '22px',
                      height: '22px',
                      borderColor: 'rgba(255,158,44,0.75)',
                      ...pos
                    }}
                    aria-hidden="true"
                  />
                ))}
              </span>
            </h1>
            <h2
              className="hud-font-display font-bold leading-none tracking-tight text-[#F3F6FA]/10 mb-10"
              style={{ fontSize: 'clamp(56px, 9vw, 120px)', letterSpacing: '-0.03em' }}
            >
              Airbus
            </h2>

            <p className="hud-font-body text-base text-[#E8EDF4]/55 max-w-md leading-relaxed mb-10">
              Build interconnected, scalable, accessible component library — driving digital products across enterprise data patterns and airline operations.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { value: '8 Months', label: 'Duration' },
                { value: '44+', label: 'Components' },
                { value: '20+', label: 'Screens' },
                { value: 'WCAG 2.2', label: 'Compliance' }
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="hud-font-display text-xl font-bold text-[#F3F6FA]">{stat.value}</span>
                  <span className="hud-font-mono text-[10px] text-[#E8EDF4]/35 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#components"
                rel="noopener noreferrer"
                className="hud-font-body px-7 py-3 bg-[#0a67e8] text-white text-sm font-semibold hover:bg-[#1c7bff] transition-all"
                style={{ borderRadius: '2px', boxShadow: '0 0 24px rgba(10,103,232,0.35)' }}
              >
                View components →
              </a>
              <span className="hud-font-mono text-xs text-[#E8EDF4]/40 border border-[#3B82F6]/20 px-3 py-3">
                v2.4.0
              </span>
            </div>
          </div>

          {/* RIGHT: HUD instrument panel around aircraft imagery */}
          <div ref={rightRef} className="relative flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'rgba(15,22,34,0.55)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(59,130,246,0.18)',
                boxShadow: '0 8px 60px rgba(10,103,232,0.12), 0 2px 20px rgba(0,0,0,0.4)'
              }}
            />

            <div className="relative z-10 p-6 w-full">
              <div
                className="relative w-full rounded-xl overflow-hidden"
                style={{ aspectRatio: '4/3', border: '1px solid rgba(59,130,246,0.3)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1688315203770-cfbd4aecb8f3?fm=jpg&q=80&w=1400&auto=format&fit=crop"
                  alt="Airbus cockpit at night — flight instrument panel"
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(1.05) brightness(0.9)' }}
                />
                {/* Dark tint for legibility */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,7,11,0.15) 0%, rgba(5,7,11,0.55) 100%)' }} />

                {/* Scanline sweep over the image */}
                <div
                  className="hud-anim absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(59,130,246,0.35), transparent)',
                    animation: 'hud-scan 4s linear infinite'
                  }}
                />

                {/* Corner brackets — HUD frame */}
                {[
                  { top: '10px', left: '10px', borderTop: '2px solid', borderLeft: '2px solid' },
                  { top: '10px', right: '10px', borderTop: '2px solid', borderRight: '2px solid' },
                  { bottom: '10px', left: '10px', borderBottom: '2px solid', borderLeft: '2px solid' },
                  { bottom: '10px', right: '10px', borderBottom: '2px solid', borderRight: '2px solid' }
                ].map((pos, i) => (
                  <span
                    key={i}
                    className="absolute pointer-events-none"
                    style={{ width: '18px', height: '18px', borderColor: 'rgba(255,158,44,0.85)', ...pos }}
                  />
                ))}

                {/* Radar blip */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className="hud-anim w-2 h-2 rounded-full bg-[#FF9E2C]" style={{ animation: 'hud-blip 1.8s ease-in-out infinite' }} />
                  <span className="hud-font-mono text-[10px] text-[#FF9E2C]/90 uppercase tracking-widest">Rec</span>
                </div>

                {/* Live telemetry readout */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between hud-font-mono text-[11px] text-[#9FD1FF] tracking-wider">
                  <span>ALT&nbsp;&nbsp;{alt.toString().padStart(5, '0')} FT</span>
                  <span>SPD&nbsp;&nbsp;{spd} KT</span>
                  <span>HDG&nbsp;&nbsp;{hdg.toString().padStart(3, '0')}°</span>
                </div>
              </div>

              {/* Floating annotation chips */}
              <div
                className="hud-font-mono absolute -top-4 -left-4 px-3 py-2 text-xs font-semibold text-[#5B9FF5] rounded-lg shadow-lg"
                style={{ background: 'rgba(10,16,26,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(59,130,246,0.3)' }}
              >
                Atomic Design
              </div>
              <div
                className="hud-font-mono absolute -bottom-4 -right-4 px-3 py-2 text-xs text-[#E8EDF4]/80 rounded-lg shadow-lg"
                style={{ background: 'rgba(10,16,26,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                44+ Components
              </div>
              <div
                className="hud-font-mono absolute top-1/2 -right-6 -translate-y-1/2 px-3 py-2 text-xs text-[#E8EDF4]/70 rounded-lg shadow-md hidden xl:block"
                style={{ background: 'rgba(10,16,26,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                WCAG 2.2 AA
              </div>

              {/* Secondary floating photo — aircraft in flight */}
              <div
                className="absolute -bottom-10 -left-8 w-28 h-20 rounded-lg overflow-hidden hidden md:block"
                style={{ border: '1px solid rgba(255,158,44,0.35)', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1721068466638-b80ca5b35662?fm=jpg&q=80&w=600&auto=format&fit=crop"
                  alt="Aircraft wing above the clouds at dusk"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.85)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: scrolling component instrument strip */}
        <div
          className="mt-24 rounded-xl overflow-hidden relative"
          style={{
            background: 'rgba(10,16,26,0.6)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(59,130,246,0.15)'
          }}
        >
          <div className="flex items-center py-4">
            <div
              className="hud-anim flex items-center gap-8 whitespace-nowrap hud-font-mono text-xs uppercase tracking-[0.25em] text-[#E8EDF4]/40"
              style={{ animation: 'hud-marquee 22s linear infinite' }}
            >
              {[...components, ...components].map((c, i) => (
                <span key={i} className="flex items-center gap-8">
                  {c}
                  <span className="text-[#FF9E2C]/50">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#E8EDF4]/25">
        <span className="hud-font-mono text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#3B82F6]/50 to-transparent" />
      </div>
    </section>
  );
}