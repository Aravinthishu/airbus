'use client';
import React from 'react';

/* ============================================================
   SHARED TOKENS (match the case-study root variables)
============================================================ */
const PRIMARY_COLOR = '#0a67e8';
const BLUE_GLOW = '#0a67e8';
const INK = '#0A0A0C';
const PAPER = '#F4F3EF';
const LINE_DARK = 'rgba(244,243,239,0.16)';
const MONO = "'JetBrains Mono', monospace";
const DISPLAY = "'DM Sans', sans-serif";

/* ============================================================
   TYPES & DATA
============================================================ */
interface ImpactStat {
  big: string;
  title: string;
  desc: string;
}

interface BeforeAfter {
  before: string;
  after: string;
}

interface Feature {
  title: string;
  desc: string;
}

interface TimelineItem {
  badge: string;
  title: string;
  desc: string;
}

const IMPACT_STATS: ImpactStat[] = [
  { big: '60%', title: 'Faster feature delivery', desc: 'Teams shipped features 60% faster compared with custom, one-off builds.' },
  { big: '100%', title: 'WCAG 2.2 AA compliance', desc: 'All 44+ components are audited and compliant, end to end.' },
  { big: '4 → 1', title: 'Products unified', desc: 'Four separate products moved onto one coherent Airbus brand experience.' },
];

const FIXES: BeforeAfter[] = [
  { before: 'Input label 2.76:1', after: '5.2:1 · AA pass' },
  { before: 'Placeholder 2.1:1', after: '5.9:1 · AA pass' },
  { before: 'Checkbox border 2.8:1', after: '3.5:1 · non-text pass' },
  { before: 'Banner icon optional', after: 'Icon made mandatory' },
  { before: 'Ghost Negative label', after: 'Corrected to white' },
];

const FEATURES: Feature[] = [
  { title: 'Three-tier token architecture', desc: 'Enables theme and brand changes without refactoring components.' },
  { title: 'ARIA pattern library', desc: 'Reusable patterns for dialogs, comboboxes, and date pickers.' },
  { title: 'Documented case studies', desc: 'Every component ships with its live behaviour and reference spec side by side.' },
];

const TIMELINE: TimelineItem[] = [
  { badge: 'M1–2', title: 'Audit & architecture', desc: 'Design audit across 4 products. Token architecture decisions locked.' },
  { badge: 'M3–5', title: 'Core components built', desc: '22 foundational components built, documented with a full WCAG audit.' },
  { badge: 'M5–7', title: 'Complex components', desc: '22 composite components built, covering forms, navigation, and data display.' },
  { badge: 'M7–8', title: 'Accessibility pass & governance', desc: 'Full WCAG 2.2 AA audit. All contrast and ARIA fixes applied and documented.' },
];

/* ============================================================
   RESULTS SECTION — dark theme
============================================================ */
export default function ResultsSection() {
  return (
    <section
      id="results"
      className="relative overflow-hidden py-28"
      style={{ background: INK, color: PAPER }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top right indicator */}
      <div
        className="hidden sm:block absolute top-16 right-8"
        style={{ fontFamily: MONO, fontSize: 12, opacity: 0.35, letterSpacing: '1px' }}
      >
        08 / 08
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Meta row similar to other sections */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-10">
            <span className="text-xs font-mono text-white/40">/ Results</span>
            <span className="text-xs font-mono text-white/40">// Impact & Outcomes</span>
          </div>
          <span className="text-xs font-mono text-white/30">/ 08</span>
        </div>

        <div className="flex justify-between items-end gap-10 flex-wrap mb-16">
          <h2
            className="leading-[1.03]"
            style={{ 
              fontFamily: DISPLAY, 
              fontWeight: 800, 
              fontSize: 'clamp(34px, 4.6vw, 58px)', 
              letterSpacing: '-0.03em', 
              maxWidth: 680,
              color: '#FFFFFF'
            }}
          >
            How the system <em style={{ fontStyle: 'normal', color: PRIMARY_COLOR }}>transformed Airbus.</em>
          </h2>
          <p className="text-sm text-white/50 leading-relaxed" style={{ maxWidth: 340 }}>
            Concrete outcomes across delivery speed, accessibility compliance, product consistency, and brand trust.
          </p>
        </div>

        {/* Impact strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 rounded-[18px] border overflow-hidden mb-14" style={{ borderColor: LINE_DARK }}>
          {IMPACT_STATS.map((stat, index) => (
            <div 
              key={stat.title} 
              className="p-8"
              style={{ 
                borderBottom: index < IMPACT_STATS.length - 1 ? `1px solid ${LINE_DARK}` : 'none',
                borderRight: index < IMPACT_STATS.length - 1 ? `1px solid ${LINE_DARK}` : 'none'
              }}
            >
              <div className="mb-2" style={{ fontFamily: DISPLAY, fontSize: 38, fontWeight: 700, color: PRIMARY_COLOR }}>
                {stat.big}
              </div>
              <h5 className="mb-2 text-white" style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 600 }}>
                {stat.title}
              </h5>
              <p className="text-[12.5px] leading-[1.7] text-white/50">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Two column: fixes + features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 rounded-[18px] border overflow-hidden mb-14" style={{ borderColor: LINE_DARK }}>
          <div className="p-8" style={{ borderRight: `1px solid ${LINE_DARK}`, borderBottom: `1px solid ${LINE_DARK}` }}>
            <div className="mb-4 text-white/40" style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Specific fixes applied
            </div>
            {FIXES.map((fix, i) => (
              <div
                key={fix.before}
                className="flex items-center gap-2.5 flex-wrap text-[12.5px] py-2.5"
                style={{ borderBottom: i === FIXES.length - 1 ? 'none' : `1px dashed ${LINE_DARK}` }}
              >
                <span style={{ fontFamily: MONO, fontSize: 11, opacity: 0.45, textDecoration: 'line-through', color: '#FFFFFF' }}>{fix.before}</span>
                <span style={{ opacity: 0.4, color: '#FFFFFF' }}>→</span>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, color: '#0a7a50' }}>{fix.after}</span>
              </div>
            ))}
          </div>
          <div className="p-8">
            <div className="mb-4 text-white/40" style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Features introduced
            </div>
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-3 py-2.5">
                <span className="w-[7px] h-[7px] rounded-full mt-1.5 flex-shrink-0" style={{ background: PRIMARY_COLOR }} />
                <div>
                  <b className="text-[13px] text-white">{f.title}</b>
                  <span className="block mt-0.5 text-[11.5px] text-white/50">{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-[18px] border p-7 sm:p-9" style={{ borderColor: LINE_DARK }}>
          <div className="mb-6 text-white" style={{ fontFamily: DISPLAY, fontSize: 19, fontWeight: 600 }}>
            8-month journey
          </div>
          {TIMELINE.map((item, i) => (
            <div key={item.badge} className="relative flex gap-5" style={{ paddingBottom: i === TIMELINE.length - 1 ? 0 : 28 }}>
              {i !== TIMELINE.length - 1 && (
                <span className="absolute w-0.5" style={{ left: 22, top: 46, bottom: 0, background: LINE_DARK }} />
              )}
              <div
                className="w-[46px] h-[46px] rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 700, color: '#FFFFFF', background: PRIMARY_COLOR }}
              >
                {item.badge}
              </div>
              <div>
                <h5 className="mb-1 text-white" style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 600 }}>{item.title}</h5>
                <p className="text-[12.5px] leading-[1.7] text-white/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}