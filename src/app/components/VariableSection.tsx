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
type VarGroup = string; // hierarchical ids, e.g. 'surface-feedback-error', 'text-link-neutral'

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
  level: 0 | 1 | 2; // indentation depth, matches the reference sidebar nesting
}

/* Sidebar tree — labels/counts match the uploaded reference screenshots exactly */
const GROUPS: GroupDef[] = [
  { id: 'all', label: 'All', count: 121, level: 0 },
  { id: 'color', label: 'Color', count: 1, level: 0 },

  { id: 'surface', label: 'Surface', count: 27, level: 0 },
  { id: 'surface-bg', label: 'Component Background', count: 3, level: 1 },
  { id: 'surface-onbg', label: 'Component On Background', count: 3, level: 1 },
  { id: 'surface-elevation', label: 'Elevation', count: 6, level: 1 },
  { id: 'surface-accent', label: 'Accent', count: 5, level: 1 },
  { id: 'surface-feedback', label: 'Feedback', count: 10, level: 1 },
  { id: 'surface-feedback-error', label: 'Error', count: 3, level: 2 },
  { id: 'surface-feedback-success', label: 'Success', count: 3, level: 2 },
  { id: 'surface-feedback-warning', label: 'Warning', count: 3, level: 2 },
  { id: 'surface-feedback-info', label: 'Information', count: 1, level: 2 },

  { id: 'text', label: 'Text & Icon', count: 34, level: 0 },
  { id: 'text-neutral', label: 'Neutral', count: 4, level: 1 },
  { id: 'text-neutralneg', label: 'Neutral Negative', count: 3, level: 1 },
  { id: 'text-accent', label: 'Accent', count: 3, level: 1 },
  { id: 'text-link', label: 'Link', count: 10, level: 1 },
  { id: 'text-link-neutral', label: 'Neutral', count: 4, level: 2 },
  { id: 'text-link-negative', label: 'Negative', count: 6, level: 2 },
  { id: 'text-feedback', label: 'Feedback', count: 12, level: 1 },
];

const VAR_ROWS: VarRow[] = [
  // Color -----------------------------------------------------
  { group: 'color', section: 'Color', name: 'Color', path: 'Color/Base/White', hex: '#FFFFFF' },

  // Surface / Component Background -----------------------------
  { group: 'surface-bg', section: 'Surface / Component Background', name: 'Minimal 2', path: 'Color/Warm Grey/10', hex: '#FAF9F7' },
  { group: 'surface-bg', section: 'Surface / Component Background', name: 'Moderate 2', path: 'Color/Warm Grey/20', hex: '#F5F3EF' },
  { group: 'surface-bg', section: 'Surface / Component Background', name: 'Strong 2', path: 'Color/Warm Grey/30', hex: '#EDE9E3' },

  // Surface / Component On Background ---------------------------
  { group: 'surface-onbg', section: 'Surface / Component On Background', name: 'Minimal 2', path: 'Color/Cool Grey/10', hex: '#F7F8FA' },
  { group: 'surface-onbg', section: 'Surface / Component On Background', name: 'Moderate 2', path: 'Color/Cool Grey/20', hex: '#F0F2F5' },
  { group: 'surface-onbg', section: 'Surface / Component On Background', name: 'Strong 2', path: 'Color/Cool Grey/30', hex: '#E2E6ED' },

  // Surface / Elevation -------------------------------------------
  { group: 'surface-elevation', section: 'Surface / Elevation', name: '1 2', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'surface-elevation', section: 'Surface / Elevation', name: '2 2', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'surface-elevation', section: 'Surface / Elevation', name: '3 2', path: 'Color/Base/White', hex: '#FFFFFF' },

  // Surface / Accent -------------------------------------------------
  { group: 'surface-accent', section: 'Surface / Accent', name: 'Default', path: 'Color/Airbus Blue/500', hex: '#00205B' },
  { group: 'surface-accent', section: 'Surface / Accent', name: 'Subtle', path: 'Color/Airbus Blue/100', hex: '#E8EDF7' },
  { group: 'surface-accent', section: 'Surface / Accent', name: 'Strong', path: 'Color/Airbus Blue/700', hex: '#001440' },
  { group: 'surface-accent', section: 'Surface / Accent', name: 'On Accent', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'surface-accent', section: 'Surface / Accent', name: 'Hover', path: 'Color/Airbus Blue/600', hex: '#001A4A' },

  // Surface / Feedback / Error ----------------------------------------
  { group: 'surface-feedback-error', section: 'Surface / Feedback / Error', name: 'Default', path: 'Color/Red/500', hex: '#DC2626' },
  { group: 'surface-feedback-error', section: 'Surface / Feedback / Error', name: 'Subtle', path: 'Color/Red/100', hex: '#FEE2E2' },
  { group: 'surface-feedback-error', section: 'Surface / Feedback / Error', name: 'On Error', path: 'Color/Base/White', hex: '#FFFFFF' },

  // Surface / Feedback / Success ---------------------------------------
  { group: 'surface-feedback-success', section: 'Surface / Feedback / Success', name: 'Default', path: 'Color/Green/500', hex: '#059669' },
  { group: 'surface-feedback-success', section: 'Surface / Feedback / Success', name: 'Subtle', path: 'Color/Green/100', hex: '#D1FAE5' },
  { group: 'surface-feedback-success', section: 'Surface / Feedback / Success', name: 'On Success', path: 'Color/Base/White', hex: '#FFFFFF' },

  // Surface / Feedback / Warning ----------------------------------------
  { group: 'surface-feedback-warning', section: 'Surface / Feedback / Warning', name: 'Default', path: 'Color/Amber/500', hex: '#D97706' },
  { group: 'surface-feedback-warning', section: 'Surface / Feedback / Warning', name: 'Subtle', path: 'Color/Amber/100', hex: '#FEF3C7' },
  { group: 'surface-feedback-warning', section: 'Surface / Feedback / Warning', name: 'On Warning', path: 'Color/Neutral/900', hex: '#1A2232' },

  // Surface / Feedback / Information -------------------------------------
  { group: 'surface-feedback-info', section: 'Surface / Feedback / Information', name: 'Default', path: 'Color/Airbus Blue/500', hex: '#00205B' },

  // Text & Icon / Neutral ---------------------------------------------------
  { group: 'text-neutral', section: 'Text & Icon / Neutral', name: 'Primary', path: 'Color/Neutral/900', hex: '#1A2232' },
  { group: 'text-neutral', section: 'Text & Icon / Neutral', name: 'Secondary', path: 'Color/Neutral/600', hex: '#4A5568' },
  { group: 'text-neutral', section: 'Text & Icon / Neutral', name: 'Tertiary', path: 'Color/Neutral/400', hex: '#718096' },
  { group: 'text-neutral', section: 'Text & Icon / Neutral', name: 'Disabled', path: 'Color/Neutral/300', hex: '#A0AEC0' },

  // Text & Icon / Neutral Negative -------------------------------------------
  { group: 'text-neutralneg', section: 'Text & Icon / Neutral Negative', name: 'Primary', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'text-neutralneg', section: 'Text & Icon / Neutral Negative', name: 'Secondary', path: 'Color/Cool Grey/20', hex: '#F0F2F5' },
  { group: 'text-neutralneg', section: 'Text & Icon / Neutral Negative', name: 'Disabled', path: 'Color/Neutral/500', hex: '#718096' },

  // Text & Icon / Accent -----------------------------------------------------
  { group: 'text-accent', section: 'Text & Icon / Accent', name: 'Default', path: 'Color/Airbus Blue/500', hex: '#00205B' },
  { group: 'text-accent', section: 'Text & Icon / Accent', name: 'Hover', path: 'Color/Airbus Blue/700', hex: '#001440' },
  { group: 'text-accent', section: 'Text & Icon / Accent', name: 'Subtle', path: 'Color/Airbus Blue/300', hex: '#5281C8' },

  // Text & Icon / Link / Neutral -----------------------------------------------
  { group: 'text-link-neutral', section: 'Text & Icon / Link / Neutral', name: 'Default', path: 'Color/Airbus Blue/500', hex: '#00205B' },
  { group: 'text-link-neutral', section: 'Text & Icon / Link / Neutral', name: 'Hover', path: 'Color/Airbus Blue/700', hex: '#001440' },
  { group: 'text-link-neutral', section: 'Text & Icon / Link / Neutral', name: 'Visited', path: 'Color/Purple/600', hex: '#7C3AED' },
  { group: 'text-link-neutral', section: 'Text & Icon / Link / Neutral', name: 'Disabled', path: 'Color/Neutral/300', hex: '#A0AEC0' },

  // Text & Icon / Link / Negative -----------------------------------------------
  { group: 'text-link-negative', section: 'Text & Icon / Link / Negative', name: 'Default', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'text-link-negative', section: 'Text & Icon / Link / Negative', name: 'Hover', path: 'Color/Cool Grey/10', hex: '#F7F8FA' },
  { group: 'text-link-negative', section: 'Text & Icon / Link / Negative', name: 'Visited', path: 'Color/Purple/200', hex: '#DDD6FE' },
  { group: 'text-link-negative', section: 'Text & Icon / Link / Negative', name: 'Disabled', path: 'Color/Neutral/500', hex: '#718096' },
  { group: 'text-link-negative', section: 'Text & Icon / Link / Negative', name: 'Active', path: 'Color/Cool Grey/20', hex: '#F0F2F5' },
  { group: 'text-link-negative', section: 'Text & Icon / Link / Negative', name: 'Focus', path: 'Color/Base/White', hex: '#FFFFFF' },

  // Text & Icon / Feedback (single section, all 4 categories) --------------------
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Error / Default', path: 'Color/Red/600', hex: '#B91C1C' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Error / Subtle', path: 'Color/Red/400', hex: '#F87171' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Error / On', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Success / Default', path: 'Color/Green/700', hex: '#047857' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Success / Subtle', path: 'Color/Green/400', hex: '#34D399' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Success / On', path: 'Color/Base/White', hex: '#FFFFFF' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Warning / Default', path: 'Color/Amber/700', hex: '#B45309' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Warning / Subtle', path: 'Color/Amber/400', hex: '#FCD34D' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Warning / On', path: 'Color/Neutral/900', hex: '#1A2232' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Info / Default', path: 'Color/Airbus Blue/500', hex: '#00205B' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Info / Subtle', path: 'Color/Airbus Blue/200', hex: '#93B5E5' },
  { group: 'text-feedback', section: 'Text & Icon / Feedback', name: 'Info / On', path: 'Color/Base/White', hex: '#FFFFFF' },
];

/**
 * Hierarchical match: 'surface-feedback' also matches 'surface-feedback-error',
 * 'text-link' also matches 'text-link-neutral' / 'text-link-negative', etc.
 */
function matchesFilter(row: VarRow, filter: VarGroup) {
  if (filter === 'all') return true;
  if (filter === 'surface') return row.group.startsWith('surface');
  if (filter === 'text') return row.group.startsWith('text');
  return row.group === filter || row.group.startsWith(filter + '-');
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
  const PADDING_BY_LEVEL = [12, 22, 34];
  const isTop = group.level === 0;
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between py-1.5 px-3 rounded-lg text-xs cursor-pointer transition-colors"
      style={{
        paddingLeft: PADDING_BY_LEVEL[group.level],
        opacity: active ? 1 : isTop ? 0.85 : 0.62,
        background: active ? 'rgba(10,103,232,0.08)' : 'transparent',
        color: active ? BLUE : INK,
        fontWeight: active ? 600 : isTop ? 600 : 400,
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
              color: '#0D0D0D',
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
                  fontFamily: "'DM Sans', sans-serif",
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