'use client';
import React from 'react';

/* ============================================================
   SHARED TOKENS (match the case-study root variables /
   ResultsSection.tsx conventions)
============================================================ */
const PRIMARY_COLOR = '#0a67e8';
const BLUE_GLOW = '#0a67e8';
const INK = '#0A0A0C';
const CARD_BG = '#161617';
const PAPER = '#F4F3EF';
const LINE_DARK = 'rgba(244,243,239,0.16)';
const LINE_DARK_SOFT = 'rgba(244,243,239,0.08)';
const MONO = "'JetBrains Mono', monospace";
const DISPLAY = "'DM Sans', sans-serif";

const GREEN = '#0A7A50';
const AMBER = '#DDAB17';
const RED = '#FF6B7F';

/* ============================================================
   TYPES & DATA
============================================================ */
type A11yStatus = 'pass' | 'warn' | 'fail';

interface A11yComponent {
  name: string;
  pass: number;
  total: number;
  status: A11yStatus;
}

interface A11yCategory {
  cat: string;
  items: A11yComponent[];
}

interface PourItem {
  letter: string;
  title: string;
  quote: string;
}

const POUR: PourItem[] = [
  { letter: 'P', title: 'Perceivable', quote: '"Can everyone see it?"' },
  { letter: 'O', title: 'Operable', quote: '"Can everyone use it?"' },
  { letter: 'U', title: 'Understandable', quote: '"Can everyone follow it?"' },
  { letter: 'R', title: 'Robust', quote: '"Works for assistive tech?"' },
];

const A11Y_CATEGORIES: A11yCategory[] = [
  {
    cat: 'Actions & Triggers',
    items: [
      { name: 'Button', pass: 4, total: 5, status: 'fail' },
      { name: 'Button Group', pass: 2, total: 3, status: 'warn' },
      { name: 'Float Action Button', pass: 3, total: 4, status: 'warn' },
    ],
  },
  {
    cat: 'Inputs & Forms',
    items: [
      { name: 'Input Field', pass: 3, total: 5, status: 'fail' },
      { name: 'Text Area', pass: 2, total: 4, status: 'fail' },
      { name: 'Checkbox', pass: 3, total: 4, status: 'fail' },
      { name: 'Combobox', pass: 3, total: 4, status: 'warn' },
      { name: 'Date & Time Picker', pass: 3, total: 5, status: 'fail' },
    ],
  },
  {
    cat: 'Navigation',
    items: [
      { name: 'Breadcrumb', pass: 3, total: 3, status: 'pass' },
      { name: 'Tab', pass: 3, total: 3, status: 'pass' },
      { name: 'Side Navigation', pass: 4, total: 4, status: 'pass' },
    ],
  },
  {
    cat: 'Data Display',
    items: [
      { name: 'Accordion', pass: 4, total: 4, status: 'pass' },
      { name: 'Avatar', pass: 3, total: 3, status: 'pass' },
      { name: 'Data Table', pass: 3, total: 4, status: 'warn' },
      { name: 'Card', pass: 3, total: 3, status: 'pass' },
      { name: 'Banner', pass: 2, total: 3, status: 'fail' },
    ],
  },
  {
    cat: 'Feedback & Overlays',
    items: [{ name: 'Dialog (Modal)', pass: 4, total: 4, status: 'pass' }],
  },
];

/* ============================================================
   ACCESSIBILITY SECTION — dark theme
============================================================ */
export default function AccessibilitySection() {
  const groupedByStatus = {
    pass: [] as { category: string; name: string; pass: number; total: number; status: A11yStatus }[],
    warn: [] as { category: string; name: string; pass: number; total: number; status: A11yStatus }[],
    fail: [] as { category: string; name: string; pass: number; total: number; status: A11yStatus }[],
  };

  A11Y_CATEGORIES.forEach((category) => {
    category.items.forEach((item) => {
      groupedByStatus[item.status].push({
        category: category.cat,
        name: item.name,
        pass: item.pass,
        total: item.total,
        status: item.status,
      });
    });
  });

  const statusConfig = {
    pass: { 
      label: 'Passing', 
      color: '#0A7A50',
      bg: 'rgba(10,122,80,0.20)',
      border: 'rgba(10,122,80,0.30)',
      icon: '✓'
    },
    warn: { 
      label: 'Needs review', 
      color: '#DDAB17',
      bg: 'rgba(221,171,23,0.20)',
      border: 'rgba(221,171,23,0.30)',
      icon: '⚠'
    },
    fail: { 
      label: 'Failing', 
      color: '#FF6B7F',
      bg: 'rgba(255,107,127,0.20)',
      border: 'rgba(255,107,127,0.30)',
      icon: '✗'
    },
  };

  return (
    <section
      id="accessibility"
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
        06 / 08
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-10">
            <span className="text-xs font-mono text-white/40">/ Accessibility</span>
            <span className="text-xs font-mono text-white/40">// Accessibility Study</span>
          </div>
          <span className="text-xs font-mono text-white/30">/ 06</span>
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
              color: '#FFFFFF',
            }}
          >
            WCAG 2.2 AA,{' '}
            <em style={{ fontStyle: 'normal', color: PRIMARY_COLOR }}>
              audited piece by piece.
            </em>
          </h2>
          <p className="text-sm text-white/50 leading-relaxed" style={{ maxWidth: 340 }}>
            Every component checked against the four POUR principles, then grouped below by
            outcome.
          </p>
        </div>

        {/* POUR strip */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 rounded-lg border overflow-hidden mb-14"
          style={{ borderColor: LINE_DARK }}
        >
          {POUR.map((p, index) => (
            <div
              key={p.letter}
              className="p-7"
              style={{
                borderRight: index < POUR.length - 1 ? `1px solid ${LINE_DARK}` : 'none',
              }}
            >
              <div
                className="mb-2.5"
                style={{ fontFamily: DISPLAY, fontSize: 26, fontWeight: 700, color: BLUE_GLOW }}
              >
                {p.letter}
              </div>
              <h5 className="mb-1 text-white" style={{ fontFamily: DISPLAY, fontSize: 14.5, fontWeight: 600 }}>
                {p.title}
              </h5>
              <p className="text-[11.5px] italic text-white/55">{p.quote}</p>
            </div>
          ))}
        </div>

        {/* Status columns — pill with colored background above card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['pass', 'warn', 'fail'] as const).map((statusKey) => {
            const items = groupedByStatus[statusKey];
            const config = statusConfig[statusKey];

            const itemsByCategory = items.reduce((acc, item) => {
              if (!acc[item.category]) acc[item.category] = [];
              acc[item.category].push(item);
              return acc;
            }, {} as Record<string, typeof items>);

            const categories = Object.keys(itemsByCategory);

            return (
              <div key={statusKey}>
                {/* Status pill — colored background with icon */}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
                  style={{
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                    fontFamily: DISPLAY,
                    fontSize: 13,
                    fontWeight: 700,
                    color: config.color,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{config.icon}</span>
                  {config.label}
                </div>

                {/* Separate card per category */}
                <div className="flex flex-col gap-4">
                  {categories.length === 0 ? (
                    <div
                      className="rounded-2xl border p-5 text-white/30 text-sm"
                      style={{ borderColor: LINE_DARK, background: CARD_BG, fontFamily: DISPLAY }}
                    >
                      No components
                    </div>
                  ) : (
                    categories.map((category) => (
                      <div
                        key={category}
                        className="rounded-2xl border p-5"
                        style={{
                          borderColor: LINE_DARK,
                          background: CARD_BG,
                        }}
                      >
                        {/* Category pill/chip */}
                        <div
                          className="inline-block rounded-full px-3 py-1 mb-3"
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            fontFamily: DISPLAY,
                            fontSize: 12,
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.85)',
                          }}
                        >
                          {category}
                        </div>

                        {/* Items in this category */}
                        {itemsByCategory[category].map((item, i) => (
                          <div
                            key={`${category}-${item.name}`}
                            className="flex items-center justify-between py-2.5"
                            style={{
                              borderBottom:
                                i < itemsByCategory[category].length - 1
                                  ? `1px solid ${LINE_DARK_SOFT}`
                                  : 'none',
                            }}
                          >
                            <span
                              className="text-white"
                              style={{
                                fontFamily: DISPLAY,
                                fontSize: 14,
                                fontWeight: 600,
                                color: 'rgba(255,255,255,0.92)',
                              }}
                            >
                              {item.name}
                            </span>
                            <span
                              style={{
                                fontFamily: DISPLAY,
                                fontSize: 14,
                                fontWeight: 700,
                                color: 'rgba(255,255,255,0.92)',
                              }}
                            >
                              {item.pass}/{item.total}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}