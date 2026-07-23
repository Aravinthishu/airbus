'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const sampleText = 'Patronus hall viktor not kidney.';

// Increased widths
const BIG_W = 1600;
const SMALL_W = BIG_W / 2 + 60;

const titleScale = [
  { name: 'Title H1', style: 'Bold', size: '72px', lineHeight: '100%' },
  { name: 'Headline H2', style: 'Bold', size: '40px', lineHeight: '110%' },
  { name: 'Headline H3', style: 'Bold', size: '32px', lineHeight: '120%' },
  { name: 'Headline H4', style: 'Bold', size: '24px', lineHeight: '130%' },
  { name: 'Headline H5', style: 'Medium', size: '20px', lineHeight: '140%' },
];

const subtitleScale = [
  { name: 'Subtitle 1', style: 'Bold', size: '20px', lineHeight: '140%' },
  { name: 'Subtitle 2', style: 'Medium', size: '18px', lineHeight: '140%' },
];

const paragraphScale = [
  { name: 'Paragraph 1', style: 'Bold', size: '18px', lineHeight: '150%' },
  { name: 'Paragraph 2', style: 'Medium', size: '16px', lineHeight: '150%' },
  { name: 'Paragraph 3', style: 'Regular', size: '16px', lineHeight: '150%' },
];

function BlobShape({ variant = 'a' }: { variant?: 'a' | 'b' }) {
  if (variant === 'b') {
    return (
      <svg viewBox="0 0 400 360" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="blobBaseB" cx="65%" cy="25%" r="80%">
            <stop offset="0%" stopColor="#3d3d3d" />
            <stop offset="50%" stopColor="#141414" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          <linearGradient id="blobSheenB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <path
          d="M40,180 C30,100 110,30 210,35 C300,40 370,110 360,195 C350,280 270,340 175,330 C85,320 50,260 40,180 Z"
          fill="url(#blobBaseB)"
        />
        <path
          d="M300,60 C240,30 140,45 90,110"
          stroke="url(#blobSheenB)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />
        <ellipse cx="260" cy="90" rx="40" ry="20" fill="rgba(255,255,255,0.12)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 520 460" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="blobBaseA" cx="32%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="45%" stopColor="#161616" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <linearGradient id="blobSheenA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path
        d="M60,240 C40,140 130,40 250,35 C370,30 460,110 450,225 C440,340 350,430 235,425 C120,420 80,340 60,240 Z"
        fill="url(#blobBaseA)"
      />
      <path
        d="M90,190 C160,90 320,70 400,160"
        stroke="url(#blobSheenA)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M120,300 C180,340 300,350 370,300"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="2"
        fill="none"
      />
      <ellipse cx="180" cy="120" rx="60" ry="30" fill="rgba(255,255,255,0.15)" opacity="0.5" />
    </svg>
  );
}

function SpecRow({
  name,
  style,
  size,
  lineHeight,
  sampleSize,
  sampleWeight,
  last,
}: {
  name: string;
  style: string;
  size: string;
  lineHeight?: string;
  sampleSize: string;
  sampleWeight: number;
  last?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between gap-4 py-3"
      style={{ borderBottom: last ? 'none' : '1px solid rgba(0,0,0,0.05)' }}
    >
      <div className="shrink-0">
        <div className="text-[10px] font-mono text-black/35 mb-0.5">{name}</div>
        <div className="text-[9px] font-mono text-black/25 leading-snug">
          Font family: Inter<br />
          Font style: {style}<br />
          Font size: {size}
          {lineHeight ? (
            <>
              <br />Line height: {lineHeight}
            </>
          ) : null}
        </div>
      </div>
      <div
        className="text-black text-right truncate"
        style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", fontSize: sampleSize, fontWeight: sampleWeight }}
      >
        {sampleText}
      </div>
    </div>
  );
}

const BigCard = React.forwardRef<HTMLDivElement, {}>(function BigCard(_props, ref) {
  return (
    <div
      ref={ref}
      className="overflow-hidden w-full" 
      style={{
        maxWidth: BIG_W,
        background: '#FFFFFF',
        borderRadius: '20px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
      }}
    >
      {/* Gradient header — glossy dark-to-violet finish */}
      <div
        className="px-5 sm:px-7 pt-5 sm:pt-6 pb-6 sm:pb-7"
        style={{
          background:
            'radial-gradient(140% 140% at 100% 0%, rgba(90,101,255,0.38) 0%, rgba(10,10,14,0) 55%), radial-gradient(100% 100% at 0% 100%, rgba(10,103,232,0.18) 0%, rgba(10,10,14,0) 50%), linear-gradient(160deg, #1b1b2b 0%, #08080c 100%)',
        }}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Tokens</span>
          <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">Version 1.0</span>
        </div>
        <div
          className="text-white"
          style={{ fontSize: 'clamp(24px, 4vw, 30px)', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          Typography
        </div>
      </div>

      {/* Font name */}
      <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-4 sm:pb-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="text-[10px] font-mono text-black/30 uppercase tracking-widest mb-1">Font</div>
        <div
          className="text-black"
          style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          Inter
        </div>
      </div>

      {/* Titles */}
      <div className="px-5 sm:px-7 pt-4 sm:pt-5 pb-1 sm:pb-2">
        <div className="text-[10px] font-mono text-black/30 uppercase tracking-widest mb-2">Titles</div>
        {titleScale.map((row, i) => (
          <SpecRow
            key={row.name}
            name={row.name}
            style={row.style}
            size={row.size}
            lineHeight={row.lineHeight}
            sampleSize={`clamp(11px, ${Math.max(11, parseInt(row.size) * 0.42)}px, 22px)`}
            sampleWeight={700}
            last={i === titleScale.length - 1}
          />
        ))}
      </div>

      {/* Subtitle */}
      <div className="px-5 sm:px-7 pt-3 pb-5 sm:pb-6" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="text-[10px] font-mono text-black/30 uppercase tracking-widest mb-2 mt-2 sm:mt-3">Subtitle</div>
        {subtitleScale.map((row, i) => (
          <SpecRow
            key={row.name}
            name={row.name}
            style={row.style}
            size={row.size}
            lineHeight={row.lineHeight}
            sampleSize="clamp(12px, 2vw, 15px)"
            sampleWeight={600}
            last={i === subtitleScale.length - 1}
          />
        ))}
      </div>
    </div>
  );
});

function SmallCard({ height }: { height: number | null }) {
  return (
    <div
      className="overflow-hidden flex flex-col w-full"
      style={{
        maxWidth: SMALL_W,
        height: height ?? undefined,
        background: 'rgba(255,255,255,0.98)',
        borderRadius: '16px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
      }}
    >
      <div className="px-4 sm:px-5 py-3 sm:py-4 shrink-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="text-[10px] font-mono text-black/30 uppercase tracking-widest">Paragraphs</div>
      </div>
      <div className="px-4 sm:px-5 py-1 flex-1">
        {paragraphScale.map((row, i) => (
          <div
            key={row.name}
            className="flex items-center justify-between gap-3 py-3"
            style={{ borderBottom: i < paragraphScale.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}
          >
            <div className="shrink-0">
              <div className="text-[9px] font-mono text-black/35 mb-0.5">{row.name}</div>
              <div className="text-[8px] font-mono text-black/25 leading-snug">
                Font: Inter<br />
                Style: {row.style}<br />
                Size: {row.size}
              </div>
            </div>
            <div
              className="text-black/70 text-right truncate max-w-[45%]"
              style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: 400 }}
            >
              {sampleText}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TypographySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement[]>([]);
  const bigCardRef = useRef<HTMLDivElement>(null);
  const [bigHeight, setBigHeight] = useState<number | null>(null);

  // Measure the big card's real rendered height
  useLayoutEffect(() => {
    function measure() {
      if (bigCardRef.current) {
        setBigHeight(bigCardRef.current.offsetHeight);
      }
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealRef.current.forEach((el, i) => {
              if (!el) return;
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, i * 120);
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

  const smallHeight = bigHeight ? bigHeight / 2 : null;

  return (
    <section 
      id="typography" 
      ref={sectionRef} 
      className="relative bg-[#0D0D0D] overflow-hidden py-12 lg:py-0"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 20%, rgba(10,103,232,0.08) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Top meta row */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex items-center justify-between mb-8 lg:mb-12 pt-8 lg:pt-16">
        <div className="flex items-center gap-4 lg:gap-10">
          <span className="text-xs font-mono text-white/40">/ Tokens</span>
          <span className="text-xs font-mono text-white/40 hidden sm:inline">// Fonts and Colors</span>
        </div>
        <span className="text-xs font-mono text-white/30">/ 03</span>
      </div>

      {/* Desktop: left heading column + right card column */}
<div className="hidden lg:grid max-w-[1300px] mx-auto px-6 relative z-10 grid-cols-[0.8fr_1.6fr] gap-12 items-start">   
  <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#0a67e8]" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a67e8]">
              Typography
            </span>
            <div className="w-6 h-px bg-[#0a67e8]" />
          </div>
          <h2
            className="text-white mb-6 leading-none" 
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(32px, 4.5vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            Typography <span className="text-[#0a67e8] z-40">Scale</span>
          </h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-16">
            Before you dig into details, you have to settle on basics: font (or fonts). Through exploration, comparison, research, and often — for large companies — making a font themselves, every display cascades from and depends on this choice. Most design systems demonstrate a typography scale in documentation as a vertical stack.
          </p>

          {/* Primary vector */}
          <div
            ref={(el) => { if (el) revealRef.current[0] = el; }}
            className="relative w-full"
            style={{ 
              height: '420px',
              opacity: 0, 
              transform: 'translateY(24px)', 
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)' 
            }}
          >
            <BlobShape variant="a" />
          </div>

          {/* Secondary vector — smaller companion shape */}
          <div
            ref={(el) => { if (el) revealRef.current[1] = el; }}
            className="absolute pointer-events-none select-none -z-10"
            style={{
              width: '220px',
              height: '200px',
              top: '40px',
              right: '-40px',
              opacity: 0,
              transform: 'translateY(24px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            <BlobShape variant="b" />
          </div>
        </div>

        {/* RIGHT — cards container with small on left, big on right */}
        <div className="relative flex flex-row items-end justify-end">
          {/* Small card - on the left */}
       {bigHeight !== null && (
  <div
    ref={(el) => { if (el) revealRef.current[3] = el; }}
    className="z-30 relative"
    style={{
      opacity: 0,
      transform: 'translateY(24px)',
      transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s',
      flex: '0 0 auto',
      marginBottom: '0px',
      marginLeft: '-140px',   // pulls it left, over the blob
    }}
  >
    <SmallCard height={smallHeight} />
  </div>
)}

          {/* Big card - on the right */}
          <div
            ref={(el) => {
              revealRef.current[2] = el as HTMLDivElement;
            }}
            className="z-20 flex-1"
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            <BigCard ref={bigCardRef} />
          </div>
        </div>
      </div>

      {/* Mobile / tablet — simple stacked flow */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-6 pb-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-px bg-[#0a67e8]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a67e8]">
            Typography
          </span>
          <div className="w-6 h-px bg-[#0a67e8]" />
        </div>
        <h2
          className="text-white leading-none"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(32px, 7vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
          }}
        >
          Typography <span className="text-[#0a67e8]">Scale</span>
        </h2>
        <p className="text-sm text-white/50 leading-relaxed max-w-sm">
          Before you dig into details, you have to settle on basics: font (or fonts). Through exploration, comparison, research, and often — for large companies — making a font themselves, every display cascades from and depends on this choice. Most design systems demonstrate a typography scale in documentation as a vertical stack.
        </p>
        <div className="w-full h-[200px] sm:h-[220px] relative">
          <BlobShape variant="a" />
        </div>
        <div className="w-full">
          <BigCard />
        </div>
        <div className="w-full">
          <SmallCard height={null} />
        </div>
      </div>
    </section>
  );
}