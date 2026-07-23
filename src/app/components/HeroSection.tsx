'use client';
import React, { useEffect, useRef } from 'react';

export default function HeroSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="relative min-h-screen bg-[#EBF8FF] overflow-hidden flex flex-col justify-center">
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #C8C4BC 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />
      
      {/* Light orange gradient blob top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(232,71,10,0.10) 0%, transparent 65%)',
          filter: 'blur(40px)'
        }} />
      
      {/* Light blue blob bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(99,102,241,0.07) 0%, transparent 65%)',
          filter: 'blur(50px)'
        }} />
      
      {/* Scattered decorative PNG elements */}
      {/* Top-left floating design tool icon */}
      <div className="absolute top-28 left-8 opacity-60 pointer-events-none hidden lg:block" style={{ transform: 'rotate(-12deg)' }}>
        <img
          src="https://img.rocket.new/generatedImages/rocket_gen_img_170707ae2-1768299361011.png"
          alt="Figma icon"
          width={48}
          height={48}
          className="drop-shadow-md" />
        
      </div>
      {/* Top-right small icon */}
      <div className="absolute top-36 right-12 opacity-50 pointer-events-none hidden lg:block" style={{ transform: 'rotate(8deg)' }}>
        <img
          src="https://images.unsplash.com/photo-1700887937204-69f8b8400ace"
          alt="Design tool"
          width={36}
          height={36}
          className="drop-shadow-sm" />
        
      </div>
      {/* Bottom-left small cursor */}
      <div className="absolute bottom-32 left-16 opacity-40 pointer-events-none hidden lg:block" style={{ transform: 'rotate(-5deg)' }}>
        <img
          src="https://img.rocket.new/generatedImages/rocket_gen_img_16c00302b-1767106876728.png"
          alt="Cursor icon"
          width={32}
          height={32}
          className="drop-shadow-sm" />
        
      </div>
      {/* Mid-right small shape */}
      <div className="absolute top-1/2 right-4 opacity-30 pointer-events-none hidden xl:block" style={{ transform: 'translateY(-50%) rotate(20deg)' }}>
        <img
          src="https://img.rocket.new/generatedImages/rocket_gen_img_15b36f25e-1767352919275.png"
          alt="Star shape"
          width={28}
          height={28} />
        
      </div>
      {/* Dashed annotation lines (CSS drawn) */}
      <div
        className="absolute top-24 left-1/4 w-px h-20 pointer-events-none hidden lg:block"
        style={{ background: 'repeating-linear-gradient(to bottom, #0a67e8 0px, #0a67e8 4px, transparent 4px, transparent 8px)', opacity: 0.4 }} />
      
      <div
        className="absolute top-24 right-1/3 w-20 h-px pointer-events-none hidden lg:block"
        style={{ background: 'repeating-linear-gradient(to right, #0a67e8 0px, #0a67e8 4px, transparent 4px, transparent 8px)', opacity: 0.3 }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-px bg-[#0a67e8]" />
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#0a67e8]">
            Portfolio Case Study
          </span>
          <div className="w-8 h-px bg-[#0a67e8]" />
        </div>

        {/* Split layout: Left = Title, Right = Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Title / Heading */}
          <div ref={leftRef}>
            {/* Annotation label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-[#0D0D0D]/40 border border-[#0D0D0D]/15 px-2 py-0.5 rounded">
                Figma + Photoshop
              </span>
              <span className="text-xs font-mono text-[#0D0D0D]/30">/ 2026</span>
            </div>

            <h1
              className="font-bold leading-none tracking-tight text-[#0D0D0D] mb-6"
              style={{ fontSize: 'clamp(56px, 9vw, 120px)', letterSpacing: '-0.04em' }}>
              
              Design{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#0a67e8]">System</span>
                
                {/* Dashed bounding box */}
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    border: '2px dashed rgba(232,71,10,0.55)',
                    margin: '-6px -10px',
                    borderRadius: '0'
                  }}
                  aria-hidden="true" />
                
                {/* Corner dots - Top Left */}
                <span
                  className="absolute pointer-events-none"
                  style={{
                    top: '-10px',
                    left: '-14px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'rgba(232,71,10,0.7)',
                    borderRadius: '0',
                    transform: 'translate(-50%, -50%)'
                  }}
                  aria-hidden="true" />
                
                {/* Corner dots - Top Right */}
                <span
                  className="absolute pointer-events-none"
                  style={{
                    top: '-10px',
                    right: '-14px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'rgba(232,71,10,0.7)',
                    borderRadius: '0',
                    transform: 'translate(50%, -50%)'
                  }}
                  aria-hidden="true" />
                
                {/* Corner dots - Bottom Left */}
                <span
                  className="absolute pointer-events-none"
                  style={{
                    bottom: '-10px',
                    left: '-14px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'rgba(232,71,10,0.7)',
                    borderRadius: '0',
                    transform: 'translate(-50%, 50%)'
                  }}
                  aria-hidden="true" />
                
                {/* Corner dots - Bottom Right */}
                <span
                  className="absolute pointer-events-none"
                  style={{
                    bottom: '-10px',
                    right: '-14px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'rgba(232,71,10,0.7)',
                    borderRadius: '0',
                    transform: 'translate(50%, 50%)'
                  }}
                  aria-hidden="true" />
                
              </span>
            </h1>
            <h2
              className="font-bold leading-none tracking-tight text-[#0D0D0D]/15 mb-10"
              style={{ fontSize: 'clamp(56px, 9vw, 120px)', letterSpacing: '-0.04em' }}>
              
              Airbus
            </h2>

            <p className="text-base text-[#0D0D0D]/55 max-w-md leading-relaxed mb-10">
              Build interconnected, scalable, accessible component library — driving digital products across enterprise data patterns and airline operations.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
              { value: '8 Months', label: 'Duration' },
              { value: '44+', label: 'Components' },
              { value: '20+', label: 'Screens' },
              { value: 'WCAG 1.2', label: 'Compliance' }]?.
              map((stat) =>
              <div key={stat?.label} className="flex flex-col">
                  <span className="text-xl font-bold text-[#0D0D0D]">{stat?.value}</span>
                  <span className="text-xs text-[#0D0D0D]/40 font-mono uppercase tracking-wider">{stat?.label}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 bg-[#0a67e8] text-white text-sm font-semibold hover:bg-[#c93d08] transition-all"
                style={{ borderRadius: '0' }}>
                
                View Project →
              </a>
              <span className="text-xs font-mono text-[#0D0D0D]/40 border border-[#0D0D0D]/15 px-3 py-3">
                v2.4.0
              </span>
            </div>
          </div>

          {/* RIGHT: Design illustration */}
          <div ref={rightRef} className="relative flex items-center justify-center">
            {/* Glassmorphism card behind illustration */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'rgba(255,255,255,0.45)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: '0 8px 60px rgba(232,71,10,0.08), 0 2px 20px rgba(0,0,0,0.06)'
              }} />
            

            {/* Main illustration */}
            <div className="relative z-10 p-8 w-full">
              <img
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1e41b7716-1772948224515.png"
                alt="Design system UI components and interface design illustration"
                className="w-full rounded-2xl shadow-2xl object-cover"
                style={{ aspectRatio: '4/3' }} />
              

              {/* Floating annotation chips */}
              <div
                className="absolute -top-4 -left-4 px-3 py-2 text-xs font-mono font-semibold text-[#0a67e8] rounded-lg shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(232,71,10,0.25)'
                }}>
                
                Atomic Design
              </div>
              <div
                className="absolute -bottom-4 -right-4 px-3 py-2 text-xs font-mono text-[#0D0D0D]/70 rounded-lg shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}>
                
                82 Components
              </div>
              <div
                className="absolute top-1/2 -right-6 -translate-y-1/2 px-3 py-2 text-xs font-mono text-[#0D0D0D]/60 rounded-lg shadow-md hidden xl:block"
                style={{
                  background: 'rgba(255,255,255,0.80)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0,0,0,0.07)'
                }}>
                
                WCAG 2.2 AA
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Glassmorphism preview bar */}
        <div
          className="mt-20 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.75)',
            boxShadow: '0 4px 40px rgba(0,0,0,0.06)'
          }}>
          

        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#0D0D0D]/30">
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#0D0D0D]/30 to-transparent" />
      </div>
    </section>);
}