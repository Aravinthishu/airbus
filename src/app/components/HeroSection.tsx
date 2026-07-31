'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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
        @keyframes hud-drift {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50% { transform: translateY(-18px) rotate(-3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hud-anim { animation: none !important; }
        }

        /* Responsive aircraft positioning */
        .aircraft-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          overflow: hidden;
        }

        .aircraft-glow {
          position: absolute;
          width: 80%;
          height: 80%;
          background: radial-gradient(ellipse at 60% 45%, rgba(10,103,232,0.20) 0%, transparent 68%);
          filter: blur(20px);
          top: 10%;
          right: -10%;
        }

        .aircraft-image {
          position: absolute;
          animation: hud-drift 8s ease-in-out infinite;
          filter: drop-shadow(0 40px 70px rgba(10,103,232,0.4)) drop-shadow(0 12px 24px rgba(0,0,0,0.6)) brightness(0.93) saturate(1.05);
          width: 90%;
          max-width: 1200px;
          right: -15%;
          bottom: 25%;
          transform-origin: center;
        }

        /* Responsive breakpoints for aircraft */
        @media (min-width: 1536px) {
          .aircraft-image {
            width: 80%;
            right: -10%;
            bottom: 30%;
          }
        }

        @media (max-width: 1280px) {
          .aircraft-image {
            width: 95%;
            right: -20%;
            bottom: 30%;
          }
        }

        @media (max-width: 1024px) {
          .aircraft-image {
            width: 100%;
            right: -25%;
            bottom: 15%;
          }
        }

        @media (max-width: 768px) {
          .aircraft-image {
            width: 120%;
            right: -30%;
            bottom: 10%;
          }
        }

        @media (max-width: 640px) {
          .aircraft-image {
            width: 150%;
            right: -40%;
            bottom: 5%;
          }
        }

        /* Responsive legibility scrim */
        .legibility-scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 4;
          background: linear-gradient(90deg, #05070B 0%, rgba(5,7,11,0.88) 28%, rgba(5,7,11,0.35) 52%, transparent 68%);
        }

        @media (max-width: 768px) {
          .legibility-scrim {
            background: linear-gradient(90deg, #05070B 0%, rgba(5,7,11,0.92) 40%, rgba(5,7,11,0.6) 70%, transparent 85%);
          }
        }

        @media (max-width: 640px) {
          .legibility-scrim {
            background: linear-gradient(90deg, #05070B 0%, rgba(5,7,11,0.95) 50%, rgba(5,7,11,0.7) 80%, transparent 90%);
          }
        }

        /* Heading responsive sizes */
        .heading-primary {
          font-size: clamp(42px, 9vw, 120px);
          letter-spacing: -0.03em;
        }

        .heading-secondary {
          font-size: clamp(42px, 9vw, 120px);
          letter-spacing: -0.03em;
        }

        /* Reticle corners responsive */
        .reticle-corner {
          width: 18px;
          height: 18px;
          border-color: rgba(255,158,44,0.75);
        }

        @media (min-width: 768px) {
          .reticle-corner {
            width: 22px;
            height: 22px;
          }
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
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)',
          backgroundSize: '12px 12px'
        }}
      />

      {/* Ambient glows */}
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

      {/* Slow vertical scan sweep */}
      <div
        className="hud-anim absolute inset-x-0 top-0 h-full pointer-events-none opacity-[0.05]"
        style={{
          background: 'linear-gradient(to bottom, transparent, #3B82F6 45%, transparent 55%, transparent)',
          animation: 'hud-scan 9s linear infinite'
        }}
      />

      {/* FULL-BLEED AIRCRAFT - Responsive */}
      <div className="aircraft-container">
        <div className="aircraft-glow" />
        <img
          src="https://pngimg.com/uploads/plane/plane_PNG101255.png"
          alt="Airbus aircraft, transparent cutout, climbing across the frame"
          className="aircraft-image select-none"
          draggable={false}
        />
      </div>

      {/* Legibility scrim */}
      <div className="legibility-scrim" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 lg:mb-10 flex-wrap">
          <div className="w-6 sm:w-8 h-px bg-[#3B82F6]" />
          <span className="hud-font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[#5B9FF5]">
            Portfolio Case Study
          </span>
          <div className="w-6 sm:w-8 h-px bg-[#3B82F6]" />
          <span className="hud-anim hud-font-mono flex items-center gap-1.5 ml-auto text-[8px] sm:text-[10px] uppercase tracking-widest text-[#FF9E2C]/80" style={{ animation: 'hud-flicker 4s infinite' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9E2C]" />
            Live System
          </span>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-start lg:items-center">
          {/* LEFT: Title / Heading */}
          <div ref={leftRef} className="relative z-20">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="hud-font-mono text-[10px] sm:text-xs text-[#E8EDF4]/50 border border-[#3B82F6]/25 px-2 py-0.5 rounded">
                Airbus
              </span>
              <span className="hud-font-mono text-[10px] sm:text-xs text-[#E8EDF4]/30">/ 2026</span>
            </div>

            <h1 className="hud-font-display font-bold leading-none tracking-tight text-[#F3F6FA] mb-4 sm:mb-6 heading-primary">
              Design{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#3B82F6]">System</span>

                {[
                  { top: '-12px', left: '-14px', borderTop: '2px solid', borderLeft: '2px solid' },
                  { top: '-12px', right: '-14px', borderTop: '2px solid', borderRight: '2px solid' },
                  { bottom: '-12px', left: '-14px', borderBottom: '2px solid', borderLeft: '2px solid' },
                  { bottom: '-12px', right: '-14px', borderBottom: '2px solid', borderRight: '2px solid' }
                ].map((pos, i) => (
                  <span
                    key={i}
                    className="absolute pointer-events-none reticle-corner"
                    style={pos as React.CSSProperties}
                    aria-hidden="true"
                  />
                ))}
              </span>
            </h1>
            
            <h2 className="hud-font-display font-bold leading-none tracking-tight text-[#F3F6FA]/10 mb-6 sm:mb-8 lg:mb-10 heading-secondary">
              Airbus
            </h2>

            <p className="hud-font-body text-sm sm:text-base text-[#E8EDF4]/55 max-w-md leading-relaxed mb-6 sm:mb-8 lg:mb-10">
              Build interconnected, scalable, accessible component library — driving digital products across enterprise data patterns and airline operations.
            </p>

            {/* Stats row - responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
              {[
                { value: '8 Months', label: 'Duration' },
                { value: '44+', label: 'Components' },
                { value: '20+', label: 'Screens' },
                { value: 'WCAG 2.2', label: 'Compliance' }
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="hud-font-display text-lg sm:text-xl font-bold text-[#F3F6FA]">{stat.value}</span>
                  <span className="hud-font-mono text-[8px] sm:text-[10px] text-[#E8EDF4]/35 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <a
                href="#components"
                rel="noopener noreferrer"
                className="hud-font-body px-5 sm:px-7 py-2.5 sm:py-3 bg-[#0a67e8] text-white text-sm font-semibold hover:bg-[#1c7bff] transition-all text-center w-full sm:w-auto"
                style={{ borderRadius: '2px', boxShadow: '0 0 24px rgba(10,103,232,0.35)' }}
              >
                View components →
              </a>
              <span className="hud-font-mono text-xs text-[#E8EDF4]/40 border border-[#3B82F6]/20 px-3 py-2.5 sm:py-3 w-full sm:w-auto text-center">
                v2.4.0
              </span>
            </div>
          </div>

          {/* RIGHT: floating HUD instrumentation */}
          <div ref={rightRef} className="relative z-20" style={{ minHeight: '300px', height: '100%' }}>

            {/* Radar blip */}
            <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
              <span className="hud-anim w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#FF9E2C]" style={{ animation: 'hud-blip 1.8s ease-in-out infinite' }} />
              <span className="hud-font-mono text-[8px] sm:text-[10px] text-[#FF9E2C]/90 uppercase tracking-widest">Rec</span>
            </div>

            {/* Live telemetry */}
            <div className="absolute bottom-2 left-0 right-4 flex items-center justify-between hud-font-mono text-[9px] sm:text-[11px] text-[#9FD1FF] tracking-wider z-20 flex-wrap gap-1">
              <span>ALT&nbsp;&nbsp;{alt.toString().padStart(5, '0')} FT</span>
              <span>SPD&nbsp;&nbsp;{spd} KT</span>
              <span>HDG&nbsp;&nbsp;{hdg.toString().padStart(3, '0')}°</span>
            </div>

            {/* Annotation chips - responsive visibility */}
            <div
              className="hud-font-mono absolute top-10 sm:top-16 left-0 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-[#5B9FF5] rounded-lg shadow-lg z-20 hidden sm:block"
              style={{ background: 'rgba(10,16,26,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(59,130,246,0.3)' }}
            >
              Atomic Design
            </div>
            
            <div
              className="hud-font-mono absolute bottom-12 sm:bottom-16 right-0 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-[#E8EDF4]/80 rounded-lg shadow-lg z-20 hidden sm:block"
              style={{ background: 'rgba(10,16,26,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              44+ Components
            </div>
            
            <div
              className="hud-font-mono absolute top-1/2 -translate-y-1/2 left-0 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs text-[#E8EDF4]/70 rounded-lg shadow-md hidden xl:block z-20"
              style={{ background: 'rgba(10,16,26,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              WCAG 2.2 AA
            </div>

            {/* Aircraft ID tag */}
            <div
              className="hud-font-mono absolute bottom-8 sm:bottom-2 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] text-[#E8EDF4]/50 rounded shadow-md z-20 tracking-widest whitespace-nowrap hidden sm:block"
              style={{ background: 'rgba(10,16,26,0.75)', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '30px' }}
            >
              A350-900 · XWB
            </div>
          </div>
        </div>

        {/* Bottom: scrolling component strip */}
        <div
          className="mt-12 sm:mt-16 lg:mt-20 xl:mt-24 rounded-xl overflow-hidden relative"
          style={{
            background: 'rgba(10,16,26,0.6)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(59,130,246,0.15)'
          }}
        >
          <div className="flex items-center py-3 sm:py-4">
            <div
              className="hud-anim flex items-center gap-4 sm:gap-6 md:gap-8 whitespace-nowrap hud-font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[#E8EDF4]/40"
              style={{ animation: 'hud-marquee 22s linear infinite' }}
            >
              {[...components, ...components].map((c, i) => (
                <span key={i} className="flex items-center gap-4 sm:gap-6 md:gap-8">
                  {c}
                  <span className="text-[#FF9E2C]/50">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 text-[#E8EDF4]/25">
        <span className="hud-font-mono text-[10px] sm:text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-6 sm:h-8 lg:h-10 bg-gradient-to-b from-[#3B82F6]/50 to-transparent" />
      </div>
    </section>
  );
}