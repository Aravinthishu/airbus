import React, { useState } from 'react';

/* ============================================================
   Minimal stand-ins for your ui-helpers
============================================================ */
function PropChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 12px',
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        border: `1px solid ${active ? '#0B1F4D' : '#D8D4CC'}`,
        background: active ? '#0B1F4D' : '#FFFFFF',
        color: active ? '#FFFFFF' : '#4B5563',
        cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {children}
    </button>
  );
}

function SpecBadge({ label }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
      {label.toUpperCase()}
    </div>
  );
}

/* ============================================================
   Design tokens
============================================================ */
const VIOLET_DASH = '#C084FC';
const FONT = "'DM Sans', sans-serif";
const LINK_COLOR = '#255FCC';
const CURRENT_COLOR = '#6B7280';
const ELLIPSIS_COLOR = '#0B1F4D';
const CHEVRON_COLOR = '#B5B9C2';
const BORDER_RADIUS = 4;

/* ============================================================
   Interactive state → background/border, shared by links + ellipsis
============================================================ */
function getInteractiveStyle(state) {
  switch (state) {
    case 'hover':
      return { bg: '#F5F5F4', border: 'none' };
    case 'active':
      return { bg: '#E9EEFC', border: 'none' };
    case 'focus':
      return { bg: 'transparent', border: `2px solid ${LINK_COLOR}` };
    default:
      return { bg: 'transparent', border: 'none' };
  }
}

/* ============================================================
   Ellipsis / collapsed-levels button ("•••")
============================================================ */
function EllipsisItem({ state = 'default' }) {
  const { bg, border } = getInteractiveStyle(state);
  return (
    <span
      style={{
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 1,
        color: ELLIPSIS_COLOR,
        background: bg,
        border,
        padding: '4px 10px',
        borderRadius: BORDER_RADIUS,
        cursor: 'pointer',
        fontFamily: FONT,
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'all 0.15s ease',
      }}
    >
      •••
    </span>
  );
}

function Chevron() {
  return <span style={{ margin: '0 4px', fontSize: 13, color: CHEVRON_COLOR, fontFamily: FONT }}>&gt;</span>;
}

/* ============================================================
   Base Breadcrumbs component
   - non-last items: bold blue links
   - last item: muted grey "Current", not clickable
   - an item literally equal to '...' renders as the pill-style
     EllipsisItem representing collapsed levels
============================================================ */
function Breadcrumbs({ items = [], state = 'default' }) {
  const { bg, border } = getInteractiveStyle(state);

  return (
    <nav style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontFamily: FONT }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const isEllipsis = item === '...';
        return (
          <span key={`${item}-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
            {isEllipsis ? (
              <EllipsisItem state={state} />
            ) : (
              <span
                style={{
                  fontSize: 13,
                  fontWeight: isLast ? 500 : 700,
                  color: isLast ? CURRENT_COLOR : LINK_COLOR,
                  cursor: isLast ? 'default' : 'pointer',
                  background: isLast ? 'transparent' : bg,
                  border: isLast ? 'none' : border,
                  padding: '4px 8px',
                  borderRadius: BORDER_RADIUS,
                  fontFamily: FONT,
                  transition: 'all 0.15s ease',
                }}
              >
                {item}
              </span>
            )}
            {!isLast && <Chevron />}
          </span>
        );
      })}
    </nav>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function BreadcrumbsDemo() {
  const [level, setLevel] = useState(4);
  const [state, setState] = useState('default');

  const getItems = () => {
    if (level === 3) return ['Level 1', 'Level 2', 'Current'];
    if (level === 5) return ['Level 1', '...', 'Level 7', 'Current'];
    return ['Level 1', 'Level 2', 'Level 3', 'Current'];
  };

  const items = getItems();

  const levelOptions = [
    { value: 3, label: '3 levels' },
    { value: 4, label: '4 levels' },
    { value: 5, label: '+4 levels' },
  ];

  const stateOptions = ['default', 'hover', 'active', 'focus'];
  const stateLabels = ['Default', 'Hover', 'Active', 'Focus'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 340,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          background: '#FFFFFF',
        }}
      >
        <Breadcrumbs items={items} state={state} />
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto', background: '#FFFFFF' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
            STATE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {stateOptions.map((s, index) => (
              <PropChip key={s} active={state === s} onClick={() => setState(s)}>
                {stateLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
            LEVELS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {levelOptions.map((opt) => (
              <PropChip key={opt.value} active={level === opt.value} onClick={() => setLevel(opt.value)}>
                {opt.label}
              </PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — 1) States row
   Default / Hover / Active / Focus headers sit OUTSIDE the
   violet dashed box; only the ellipsis-button row sits inside.
============================================================ */
function BreadcrumbsStatesSpec() {
  const states = ['default', 'hover', 'active', 'focus'];
  const labels = ['Default', 'Hover', 'Active', 'Focus'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', fontFamily: FONT, marginBottom: 4 }}>
        Breadcrumbs — States
      </div>
      <div style={{ background: '#FFFFFF', padding: '24px 24px 20px 24px', borderRadius: BORDER_RADIUS }}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {/* Headers row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              paddingBottom: 8,
            }}
          >
            {labels.map((label) => (
              <div
                key={label}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#3D4759',
                  fontFamily: FONT,
                  textAlign: 'center',
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Content row with ellipsis items */}
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              padding: '12px 8px',
            }}
          >
            {states.map((s, i) => (
              <div
                key={`c-${s}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <EllipsisItem state={s} />
              </div>
            ))}

            {/* violet dashed reference box — spans only the content row */}
            <div
              style={{
                position: 'absolute',
                top: -4,
                left: -8,
                right: -8,
                bottom: -4,
                border: `1.5px dashed ${VIOLET_DASH}`,
                borderRadius: BORDER_RADIUS,
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — 2) Levels
   3/4/+4 levels labels sit OUTSIDE the box; the breadcrumb
   trail itself sits inside.
============================================================ */
function BreadcrumbsLevelsSpec() {
  const rows = [
    { label: '3 levels', items: ['Level 1', 'Level 2', 'Current'] },
    { label: '4 levels', items: ['Level 1', 'Level 2', 'Level 3', 'Current'] },
    { label: '+4 levels', items: ['Level 1', '...', 'Level 7', 'Current'] },
  ];

  const ROW_LABEL_WIDTH = 88;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', fontFamily: FONT, marginBottom: 4 }}>
        Breadcrumbs — Levels
      </div>
      <div style={{ background: '#FFFFFF', padding: '24px 24px 20px 24px', borderRadius: BORDER_RADIUS }}>
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `${ROW_LABEL_WIDTH}px 1fr`,
            gridTemplateRows: `repeat(${rows.length}, auto)`,
            rowGap: 24,
            columnGap: 20,
          }}
        >
          {rows.map((row, rIdx) => (
            <React.Fragment key={row.label}>
              <div
                style={{
                  gridColumn: 1,
                  gridRow: rIdx + 1,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#8089A0',
                  fontFamily: FONT,
                  paddingRight: 4,
                }}
              >
                {row.label}
              </div>
              <div style={{ gridColumn: 2, gridRow: rIdx + 1, display: 'flex', alignItems: 'center', paddingLeft: 4 }}>
                <Breadcrumbs items={row.items} state="default" />
              </div>
            </React.Fragment>
          ))}

          {/* violet dashed reference box — spans only the trail column with proper padding */}
          <div
            style={{
              gridColumn: '2 / 3',
              gridRow: `1 / ${rows.length + 1}`,
              margin: '-10px -12px',
              border: `1.5px dashed ${VIOLET_DASH}`,
              borderRadius: BORDER_RADIUS,
              pointerEvents: 'none',
              padding: '10px 8px',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — composed
============================================================ */
export function BreadcrumbsSpec() {
  return (
    <div
      style={{
        padding: '20px 24px',
        overflowY: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        fontFamily: FONT,
        background: '#FFFFFF',
      }}
    >
      <SpecBadge label="Breadcrumbs" />
      <BreadcrumbsStatesSpec />
      <BreadcrumbsLevelsSpec />
    </div>
  );
}

/* ============================================================
   PAGE — equal-size preview / reference cards
============================================================ */
const CARD_STYLE = {
  width: '100%',
  maxWidth: 1100,
  height: 560,
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function BreadcrumbsPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <BreadcrumbsDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <BreadcrumbsSpec />
          </div>
        </div>
      </div>
    </div>
  );
}