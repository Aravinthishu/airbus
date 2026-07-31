'use client';
import React, { useState } from 'react';

/* ============================================================
   Minimal stand-ins for your ui-helpers
============================================================ */
function PropChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
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

function SpecBadge({ label }: { label: string }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1,
        color: '#8089A0',
        marginBottom: 12,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {label.toUpperCase()}
    </div>
  );
}

/* ============================================================
   Design tokens
============================================================ */
const VIOLET_DASH = '#C084FC'; // dashed reference-border color

/* ============================================================
   Checkbox Component
============================================================ */
type CheckboxSize = 'm' | 'l';
type CheckboxState = 'unselected' | 'selected' | 'indeterminate';
type CheckboxInteraction = 'default' | 'hover' | 'focus' | 'disabled';

function Checkbox({
  size = 'm',
  state = 'unselected',
  interaction = 'default',
  label = 'Label',
  onClick,
}: {
  size?: CheckboxSize;
  state?: CheckboxState;
  interaction?: CheckboxInteraction;
  label?: string;
  onClick?: () => void;
}) {
  const dim = size === 'l' ? 28 : 22;
  const borderRadius = size === 'l' ? 8 : 6;
  const fontSize = size === 'l' ? 14 : 12;

  const isChecked = state === 'selected' || state === 'indeterminate';
  const isDisabled = interaction === 'disabled';

  const getBorderColor = () => {
    if (isChecked) return 'none';
    if (isDisabled) return '#D8D4CC';
    if (interaction === 'hover') return '#002F7B';
    if (interaction === 'focus') return '#0B1F4D';
    return '#D8D4CC';
  };

  const getBackground = () => {
    if (isChecked) return '#0B1F4D';
    if (isDisabled && !isChecked) return '#F5F5F4';
    return 'transparent';
  };

  const getBoxShadow = () => {
    if (interaction === 'focus') {
      // This creates the double border effect with a gap
      return `0 0 0 2px #FFFFFF, 0 0 0 4px #2554D6`;
    }
    return 'none';
  };

  const getOpacity = () => (isDisabled ? 0.6 : 1);

  const getContent = () => {
    if (state === 'selected') return '✓';
    if (state === 'indeterminate') return '–';
    return '';
  };

  const borderColor = getBorderColor();
  const background = getBackground();
  const boxShadow = getBoxShadow();
  const opacity = getOpacity();

  return (
    <div
      onClick={!isDisabled ? onClick : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity,
      }}
    >
      <div
        style={{
          width: dim,
          height: dim,
          borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: borderColor !== 'none' ? `2px solid ${borderColor}` : 'none',
          background,
          boxShadow,
          color: isChecked ? '#FFFFFF' : 'transparent',
          fontSize,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          transition: 'all 0.15s ease',
        }}
      >
        {getContent()}
      </div>
      <span
        style={{
          fontSize: size === 'l' ? 15 : 13,
          color: isDisabled ? '#B5B9C2' : '#151A24',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function CheckboxDemo() {
  const [size, setSize] = useState<CheckboxSize>('m');
  const [state, setState] = useState<CheckboxState>('unselected');
  const [interaction, setInteraction] = useState<CheckboxInteraction>('default');

  const stateOptions: CheckboxState[] = ['unselected', 'selected', 'indeterminate'];
  const stateLabels = ['Unselected', 'Selected', 'Indeterminate'];

  const interactionOptions: CheckboxInteraction[] = ['default', 'hover', 'focus', 'disabled'];
  const interactionLabels = ['Default', 'Hover', 'Focus', 'Disabled'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 330,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          background:
            'repeating-linear-gradient(0deg, rgba(11,31,77,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(11,31,77,0.03) 0 1px, transparent 1px 24px), #FFFFFF',
        }}
      >
        <Checkbox size={size} state={state} interaction={interaction} label="Label" />
      </div>

      <div
        style={{
          padding: 20,
          borderTop: '1px solid #EFEDE8',
          overflowY: 'auto',
          background: '#FFFFFF',
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
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

        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            INTERACTION
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {interactionOptions.map((s, index) => (
              <PropChip key={s} active={interaction === s} onClick={() => setInteraction(s)}>
                {interactionLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            SIZE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(['m', 'l'] as CheckboxSize[]).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>
                {s.toUpperCase()}
              </PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — States grid
   Replicates checkbox-all.png: column headers (Unselected /
   Selected / Indeterminate) + row headers (Default / Hover /
   Focus / Disabled) sit OUTSIDE the violet dashed box; only the
   checkbox cells themselves are enclosed.
============================================================ */
function CheckboxStatesSpec() {
  const states: CheckboxState[] = ['unselected', 'selected', 'indeterminate'];
  const stateLabels = ['Unselected', 'Selected', 'Indeterminate'];

  const interactions: CheckboxInteraction[] = ['default', 'hover', 'focus', 'disabled'];
  const interactionLabels = ['Default', 'Hover', 'Focus', 'Disabled'];

  const ROW_LABEL_WIDTH = 64;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#3D4759',
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: 4,
        }}
      >
        States
      </div>

      <div
        style={{
          background: '#FFFFFF',
          padding: 24,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `${ROW_LABEL_WIDTH}px repeat(3, 1fr)`,
            gridTemplateRows: 'auto repeat(4, auto)',
            rowGap: 26,
            columnGap: 20,
          }}
        >
          {/* top-left empty cell */}
          <div style={{ gridColumn: 1, gridRow: 1 }} />

          {/* column headers */}
          {stateLabels.map((label, cIdx) => (
            <div
              key={label}
              style={{
                gridColumn: cIdx + 2,
                gridRow: 1,
                textAlign: 'left',
                fontSize: 13,
                fontWeight: 600,
                color: '#3D4759',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {label}
            </div>
          ))}

          {/* row headers */}
          {interactionLabels.map((label, rIdx) => (
            <div
              key={label}
              style={{
                gridColumn: 1,
                gridRow: rIdx + 2,
                display: 'flex',
                alignItems: 'center',
                fontSize: 13,
                fontWeight: 500,
                color: '#8089A0',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {label}
            </div>
          ))}

          {/* checkbox cells */}
          {interactions.map((interaction, rIdx) =>
            states.map((state, cIdx) => (
              <div
                key={`${interaction}-${state}`}
                style={{
                  gridColumn: cIdx + 2,
                  gridRow: rIdx + 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox size="m" state={state} interaction={interaction} label="Label" />
              </div>
            ))
          )}

          {/* violet dashed reference box — spans only the checkbox grid area */}
          <div
            style={{
              gridColumn: `2 / 5`,
              gridRow: `1 / 6`,
              margin: '-14px -18px -14px -18px',
              border: `1.5px dashed ${VIOLET_DASH}`,
              borderRadius: 16,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — Sizes grid
   Replicates checkbox-size.png: M / L labels sit OUTSIDE the
   violet dashed box; the checkbox + "Label" text sit inside it.
============================================================ */
function CheckboxSizeSpec() {
  const sizes: { key: CheckboxSize; label: string }[] = [
    { key: 'm', label: 'M' },
    { key: 'l', label: 'L' },
  ];

  const ROW_LABEL_WIDTH = 24;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#3D4759',
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: 4,
        }}
      >
        Sizes
      </div>

      <div
        style={{
          background: '#FFFFFF',
          padding: 24,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `${ROW_LABEL_WIDTH}px 1fr`,
            gridTemplateRows: `repeat(${sizes.length}, auto)`,
            rowGap: 28,
            columnGap: 20,
            maxWidth: 220,
          }}
        >
          {sizes.map((s, rIdx) => (
            <React.Fragment key={s.key}>
              <div
                style={{
                  gridColumn: 1,
                  gridRow: rIdx + 1,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#8089A0',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  gridColumn: 2,
                  gridRow: rIdx + 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox size={s.key} state="selected" interaction="default" label="Label" />
              </div>
            </React.Fragment>
          ))}

          {/* violet dashed reference box — spans only the checkbox+label column */}
          <div
            style={{
              gridColumn: '2 / 3',
              gridRow: `1 / ${sizes.length + 1}`,
              margin: '-16px -20px',
              border: `1.5px dashed ${VIOLET_DASH}`,
              borderRadius: 16,
              pointerEvents: 'none',
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
export function CheckboxSpec() {
  return (
    <div
      style={{
        padding: 24,
        overflowY: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        background: '#FFFFFF',
      }}
    >
      <SpecBadge label="Checkbox" />
      <CheckboxStatesSpec />
      <CheckboxSizeSpec />
    </div>
  );
}

/* ============================================================
   PAGE — equal-size preview / reference cards
============================================================ */
const CARD_STYLE: React.CSSProperties = {
  width: '100%',
  maxWidth: 900,
  height: 560,
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function CheckboxPage() {
  return (
    <div
      style={{
        padding: 32,
        background: '#FAFAF8',
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: 900 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <CheckboxDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 900 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <CheckboxSpec />
          </div>
        </div>
      </div>
    </div>
  );
}