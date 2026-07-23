'use client';
import React, { useState } from 'react';

/* ============================================================
   SHARED TOKENS (match the case-study root variables)
============================================================ */
const BLUE = '#0a67e8';
const INK = '#0D0D0D';
const PAPER = '#F5F3EF';
const LINE_LIGHT = 'rgba(10,10,12,0.12)';
const MONO = "'JetBrains Mono', monospace";
const DISPLAY = "'DM Sans', sans-serif";

/* ============================================================
   TYPES & DATA
============================================================ */
type VarGroup =
  | 'all'
  | 'color'
  | 'surface'
  | 'surface-bg'
  | 'surface-onbg'
  | 'surface-elevation'
  | 'surface-accent'
  | 'surface-feedback'
  | 'text'
  | 'text-neutral'
  | 'text-neutralneg'
  | 'text-accent'
  | 'text-feedback';

interface VarRow {
  group: VarGroup;
  section: string;
  name: string;
  path: string;
  hex: string;
}

interface GroupDef {
  id: VarGroup;
  label: string;
  count: number;
  indent?: boolean;
}

const GROUPS: GroupDef[] = [
  { id: 'all', label: 'All', count: 121 },
  { id: 'color', label: 'Color', count: 1 },
  { id: 'surface', label: 'Surface', count: 27 },
  { id: 'surface-bg', label: 'Component Background', count: 3, indent: true },
  { id: 'surface-onbg', label: 'Component On Background', count: 3, indent: true },
  { id: 'surface-elevation', label: 'Elevation', count: 6, indent: true },
  { id: 'surface-accent', label: 'Accent', count: 5, indent: true },
  { id: 'surface-feedback', label: 'Feedback', count: 10, indent: true },
  { id: 'text', label: 'Text & Icon', count: 34 },
  { id: 'text-neutral', label: 'Neutral', count: 4, indent: true },
  { id: 'text-neutralneg', label: 'Neutral Negative', count: 3, indent: true },
  { id: 'text-accent', label: 'Accent', count: 3, indent: true },
  { id: 'text-feedback', label: 'Feedback', count: 12, indent: true },
];

const VAR_ROWS: VarRow[] = [
  { group: 'color', section: 'Color', name: 'Color', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'surface-bg', section: 'Surface / Component Background', name: 'Minimal 2', path: 'Color/Warm Grey/10', hex: '#FAF9F7' },
  { group: 'surface-bg', section: 'Surface / Component Background', name: 'Moderate 2', path: 'Color/Warm Grey/20', hex: '#EBF8FF' },
  { group: 'surface-bg', section: 'Surface / Component Background', name: 'Strong 2', path: 'Color/Warm Grey/30', hex: '#EDE9E3' },
  { group: 'surface-onbg', section: 'Surface / Component On Background', name: 'Minimal 2', path: 'Color/Cool Grey/10', hex: '#F7F8FA' },
  { group: 'surface-onbg', section: 'Surface / Component On Background', name: 'Moderate 2', path: 'Color/Cool Grey/20', hex: '#F0F2F5' },
  { group: 'surface-onbg', section: 'Surface / Component On Background', name: 'Strong 2', path: 'Color/Cool Grey/30', hex: '#E2E6ED' },
  { group: 'surface-elevation', section: 'Surface / Elevation', name: '1 2', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'surface-elevation', section: 'Surface / Elevation', name: '2 2', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'surface-elevation', section: 'Surface / Elevation', name: '3 2', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'surface-accent', section: 'Surface / Accent', name: 'Red 100', path: 'Color/Airbus Red/100', hex: '#FFE8E8' },
  { group: 'surface-accent', section: 'Surface / Accent', name: 'Red 300', path: 'Color/Airbus Red/300', hex: '#FF8A8A' },
  { group: 'surface-accent', section: 'Surface / Accent', name: 'Red 500', path: 'Color/Airbus Red/500', hex: '#E84545' },
  { group: 'surface-feedback', section: 'Surface / Feedback / Error', name: 'Minimal', path: 'Color/Error/10', hex: '#FDECEC' },
  { group: 'surface-feedback', section: 'Surface / Feedback / Error', name: 'Strong', path: 'Color/Error/50', hex: '#FF6B6B' },
  { group: 'surface-feedback', section: 'Surface / Feedback / Success', name: 'Minimal', path: 'Color/Success/10', hex: '#E8F7EF' },
  { group: 'surface-feedback', section: 'Surface / Feedback / Success', name: 'Strong', path: 'Color/Success/50', hex: '#4ADE80' },
  { group: 'surface-feedback', section: 'Surface / Feedback / Warning', name: 'Strong', path: 'Color/Warning/50', hex: '#FFD93D' },
  { group: 'surface-feedback', section: 'Surface / Feedback / Information', name: 'Minimal', path: 'Color/Blue/10', hex: '#EAF2FE' },
  { group: 'text-neutral', section: 'Text & Icon / Neutral', name: 'Primary', path: 'Color/Neutral/900', hex: '#151A24' },
  { group: 'text-neutral', section: 'Text & Icon / Neutral', name: 'Secondary', path: 'Color/Neutral/600', hex: '#5B6577' },
  { group: 'text-neutral', section: 'Text & Icon / Neutral', name: 'Disabled', path: 'Color/Neutral/300', hex: '#93A0AC' },
  { group: 'text-neutralneg', section: 'Text & Icon / Neutral Negative', name: 'Primary', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'text-neutralneg', section: 'Text & Icon / Neutral Negative', name: 'Secondary', path: 'Color/Neutral/200 (on dark)', hex: '#C7CEDD' },
  { group: 'text-accent', section: 'Text & Icon / Accent', name: 'Interactive', path: 'Color/Airbus Blue/500', hex: '#2454CC' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Error', path: 'Color/Error/60', hex: '#B00020' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Success', path: 'Color/Success/60', hex: '#0A7A50' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Warning', path: 'Color/Warning/60', hex: '#8C5E08' },
];

function matchesFilter(row: VarRow, filter: VarGroup) {
  if (filter === 'all') return true;
  if (filter === 'surface') return row.group.startsWith('surface');
  if (filter === 'text') return row.group.startsWith('text');
  return row.group === filter;
}

/* ============================================================
   SUB-COMPONENTS
============================================================ */
function VarSidebarGroup({
  group,
  active,
  onClick,
}: {
  group: GroupDef;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between py-1.5 px-3 rounded-lg text-xs cursor-pointer transition-colors"
      style={{
        paddingLeft: group.indent ? 22 : 12,
        opacity: active ? 1 : 0.68,
        background: active ? 'rgba(10,103,232,0.08)' : 'transparent',
        color: active ? BLUE : INK,
        fontWeight: active ? 600 : 400,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span>{group.label}</span>
      <span style={{ fontFamily: MONO, fontSize: 10, opacity: 0.5 }}>{group.count}</span>
    </div>
  );
}

function VarCard({ row }: { row: VarRow }) {
  return (
    <div
      className="flex items-center gap-3 py-3 px-3.5 rounded-xl border"
      style={{ borderColor: LINE_LIGHT, fontFamily: "'DM Sans', sans-serif" }}
    >
      <span
        className="w-8 h-8 rounded-[9px] border flex-shrink-0"
        style={{ background: row.hex, borderColor: LINE_LIGHT }}
      />
      <div className="min-w-0">
        <div className="text-xs font-bold truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{row.name}</div>
        <div className="truncate" style={{ fontFamily: MONO, fontSize: 9, opacity: 0.45 }}>
          {row.path}
        </div>
      </div>
      <span className="ml-auto flex-shrink-0" style={{ fontFamily: MONO, fontSize: 9.5, opacity: 0.6 }}>
        {row.hex}
      </span>
    </div>
  );
}

/**
 * Each matched section renders as a row: heading label on the LEFT,
 * its token cards on the RIGHT — instead of a full-width heading
 * stacked above the grid.
 */
function VarTable({ filter }: { filter: VarGroup }) {
  const rows = VAR_ROWS.filter((r) => matchesFilter(r, filter));
  const blocks: { section: string; rows: VarRow[] }[] = [];
  rows.forEach((r) => {
    const last = blocks[blocks.length - 1];
    if (last && last.section === r.section) last.rows.push(r);
    else blocks.push({ section: r.section, rows: [r] });
  });

  if (blocks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center px-6 py-16 text-center">
        <p className="text-xs" style={{ opacity: 0.5, fontFamily: "'DM Sans', sans-serif" }}>No tokens in this group yet.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5">
      {blocks.map((block, i) => (
        <div
          key={block.section + i}
          className="flex flex-col sm:flex-row gap-3 sm:gap-6 py-5 border-b last:border-b-0"
          style={{ borderColor: LINE_LIGHT }}
        >
          <div className="sm:w-[190px] flex-shrink-0">
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.6px',
                color: BLUE,
              }}
            >
              {block.section}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {block.rows.map((row, ri) => (
              <VarCard key={row.name + ri} row={row} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   VARIABLES SECTION — light theme with blue accents
============================================================ */
export default function VariablesSection() {
  const [activeGroup, setActiveGroup] = useState<VarGroup>('all');

  return (
    <section
      id="variables"
      className="relative overflow-hidden py-28 sm:py-32"
      style={{ background: '#EBF8FF', color: INK }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{ backgroundImage: 'radial-gradient(circle, #0a67e8 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Ambient blue glow */}
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

      <div
        className="hidden sm:block absolute top-16 right-8"
        style={{ fontFamily: MONO, fontSize: 12, opacity: 0.35, letterSpacing: '1px' }}
      >
        07 / 08
      </div>

      <div className="max-w-[1180px] mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#0a67e8]" />
          <span
            className="text-xs font-bold uppercase tracking-[0.35em]"
            style={{ fontFamily: "'DM Sans', sans-serif", color: '#6B6B6B' }}
          >
            Variables
          </span>
          <div className="w-6 h-px bg-[#0a67e8]" />
        </div>

        <div className="flex justify-between items-end gap-10 flex-wrap mb-16">
          <h2
            className="leading-[1.05]"
            style={{ 
              fontFamily: "'DM Sans', sans-serif", 
              fontWeight: 700, 
              fontSize: 'clamp(34px, 4.6vw, 58px)', 
              letterSpacing: '-0.03em', 
              maxWidth: 680,
              color: '#0D0D0D'
            }}
          >
            All 121 tokens, <span style={{ fontStyle: 'normal', color: BLUE }}>one collection.</span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ maxWidth: 340, opacity: 0.68, fontFamily: "'DM Sans', sans-serif", color: '#6B6B6B' }}>
            Filter by group in the left panel to see how each raw value maps to its semantic role.
          </p>
        </div>

        <div className="rounded-[18px] border overflow-hidden bg-white" style={{ borderColor: LINE_LIGHT }}>
          <div className="flex items-center gap-2.5 px-5 py-3.5 border-b" style={{ background: PAPER, borderColor: LINE_LIGHT }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: LINE_LIGHT }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: LINE_LIGHT }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: LINE_LIGHT }} />
            <div className="flex-1 text-center" style={{ fontFamily: MONO, fontSize: 10.5, opacity: 0.55, letterSpacing: '0.5px' }}>
              Airbus Variables · Collection 1
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, opacity: 0.4 }}>121</div>
          </div>

          {/* Outer split: left = group nav, right = matched content */}
          <div className="flex flex-col sm:flex-row">
            <div
              className="w-full sm:w-[230px] flex-shrink-0 border-b sm:border-b-0 sm:border-r p-4 overflow-y-auto max-h-[220px] sm:max-h-[560px]"
              style={{ borderColor: LINE_LIGHT }}
            >
              <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 600, opacity: 0.4, letterSpacing: '1.4px', textTransform: 'uppercase', marginBottom: 10 }}>
                Collections
              </div>
              <div
                className="flex justify-between px-3.5 py-2 rounded-[10px] border text-xs font-semibold mb-4"
                style={{ 
                  borderColor: 'rgba(10,103,232,0.25)', 
                  background: 'rgba(10,103,232,0.08)', 
                  color: BLUE,
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                Collection 1 <span style={{ fontWeight: 400 }}>121</span>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 9, fontWeight: 600, opacity: 0.4, letterSpacing: '1.4px', textTransform: 'uppercase', margin: '14px 0 8px' }}>
                Groups
              </div>
              {GROUPS.map((g) => (
                <VarSidebarGroup key={g.id} group={g} active={activeGroup === g.id} onClick={() => setActiveGroup(g.id)} />
              ))}
            </div>

            <div className="flex-1 sm:max-h-[560px] sm:overflow-y-auto flex">
              <VarTable filter={activeGroup} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}