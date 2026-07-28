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
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
      {label.toUpperCase()}
    </div>
  );
}

/* ============================================================
   Small inline icons
============================================================ */
function InfoIcon({ size = 14, color = '#2554D6' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="8" fill={color} />
      <rect x="7.25" y="6.75" width="1.5" height="4.5" rx="0.75" fill="#FFFFFF" />
      <rect x="7.25" y="3.75" width="1.5" height="1.5" rx="0.75" fill="#FFFFFF" />
    </svg>
  );
}

function AlignIcon({ type }: { type: 'left' | 'center' | 'right' | 'justify' }) {
  const lineProps = {
    left: [0, 8, 0, 6, 0, 9],
    center: [1, 6, 2, 10, 1, 6],
    right: [4, 0, 5, 2, 3, 0],
    justify: [0, 14, 0, 14, 0, 14],
  }[type];
  return (
    <svg width={14} height={14} viewBox="0 0 14 14">
      <rect x={lineProps[0]} y={2} width={lineProps[1]} height={1.3} fill="#8089A0" />
      <rect x={lineProps[2] === undefined ? 0 : type === 'right' ? 2 : type === 'center' ? 1 : 0} y={5.5} width={type === 'justify' ? 14 : 8} height={1.3} fill="#8089A0" />
      <rect x={type === 'right' ? 4 : type === 'center' ? 1 : 0} y={9} width={lineProps[1]} height={1.3} fill="#8089A0" />
      <rect x={0} y={12.5} width={type === 'left' ? 7 : 14} height={1.3} fill="#8089A0" />
    </svg>
  );
}

function TextToolbar() {
  const btn: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    color: '#3D4759',
    background: 'none',
    border: 'none',
    padding: '2px 3px',
    lineHeight: 1,
  };
  const divider = <span style={{ width: 1, height: 14, background: '#D8D4CC' }} />;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderBottom: '1px solid #E4E2DD',
        background: '#FAFAF8',
      }}
    >
      <span style={{ ...btn, fontWeight: 700 }}>B</span>
      <span style={{ ...btn, fontStyle: 'italic' }}>I</span>
      <span style={{ ...btn, textDecoration: 'underline' }}>U</span>
      <span style={{ ...btn, textDecoration: 'line-through' }}>S</span>
      <span style={{ ...btn, borderBottom: '2px solid #E11D48' }}>A</span>
      {divider}
      <AlignIcon type="left" />
      <AlignIcon type="center" />
      <AlignIcon type="right" />
      <AlignIcon type="justify" />
      {divider}
      <span style={btn}>¶T</span>
    </div>
  );
}

/* ============================================================
   Base Textarea component (used in the live preview)
============================================================ */
type TextareaSize = 's' | 'm' | 'l';
type PreviewStateKey = 'default' | 'hover' | 'active' | 'filled' | 'disabled' | 'readonly';

/* ============================================================
   LIVE DEMO — editable in every state (Read Only / Disabled
   removed here on purpose; they're static-only, shown in the
   reference spec below instead)
============================================================ */
export function TextAreaDemo() {
  const [state, setState] = useState<PreviewStateKey>('default');
  const [value, setValue] = useState('');

  const STATE_STYLES: Record<PreviewStateKey, { bg: string; border: string; label: string }> = {
    default: { bg: '#FFFFFF', border: '#C9CFDA', label: '#3D4759' },
    hover: { bg: '#F5F5F4', border: '#C9CFDA', label: '#3D4759' },
    active: { bg: '#E9EEFC', border: '#0B1F4D', label: '#3D4759' },
    filled: { bg: '#FFFFFF', border: '#C9CFDA', label: '#3D4759' },
    disabled: { bg: '#F5F5F4', border: '#E4E2DD', label: '#B5B9C2' },
    readonly: { bg: '#FFFFFF', border: '#E4E2DD', label: '#3D4759' },
  };

  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'readonly';

  const currentStyle = STATE_STYLES[state];
  const borderWidth = state === 'active' ? 2 : 1.5;
  const charCount = value?.length || 0;

  // Set filled text when state is 'filled'
  const filledText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.';

  // Set readonly text when state is 'readonly'
  const readonlyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.';

  // Determine which value to show
  let displayValue = value;
  if (state === 'filled') {
    displayValue = filledText;
  } else if (state === 'readonly') {
    displayValue = readonlyText;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 375,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          backgroundImage: `
            linear-gradient(rgba(200, 200, 200, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 200, 200, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 340 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: currentStyle.label, fontFamily: "'DM Sans', sans-serif" }}>
              Label (Optional)
            </label>
            <InfoIcon color={isDisabled ? '#B5B9C2' : '#2554D6'} />
          </div>

          <textarea
            value={displayValue}
            onChange={(e) => {
              if (state === 'filled' || state === 'readonly') return;
              setValue(e.target.value);
            }}
            disabled={isDisabled}
            readOnly={isReadOnly}
            placeholder="Placeholder"
            rows={4}
            style={{
              width: '100%',
              minHeight: 112,
              padding: '10px 14px',
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: '6px 6px 2px 2px',
              background: currentStyle.bg,
              border: 'none',
              borderBottom: `${borderWidth}px solid ${currentStyle.border}`,
              color: isDisabled ? '#B5B9C2' : '#151A24',
              resize: 'vertical',
              outline: 'none',
              transition: 'border-color 0.15s ease',
              boxSizing: 'border-box',
              cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'text',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: 12,
              color: isDisabled ? '#B5B9C2' : '#8089A0',
              fontFamily: "'DM Sans', sans-serif",
              marginTop: 2,
            }}
          >
            <span style={{ fontFamily: 'monospace' }}>
              {state === 'filled' ? filledText.length : state === 'readonly' ? readonlyText.length : charCount}/100
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto', background: '#FFFFFF' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            STATE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(['default', 'hover', 'active', 'filled', 'readonly', 'disabled'] as PreviewStateKey[]).map((s) => (
              <PropChip key={s} active={state === s} onClick={() => {
                setState(s);
                if (s === 'default' || s === 'hover' || s === 'active') {
                  setValue('');
                }
              }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — with violet dashed border tightly wrapped
============================================================ */
interface SpecRowConfig {
  key: string;
  title: string;
  label: string;
  value?: string;
  placeholder?: string;
  counterText?: string;
  footerText?: string;
  bg: string;
  border: string;
  borderWidth: number;
  showCursor?: boolean;
  showToolbar?: boolean;
  dim?: boolean;
}

function SpecTextareaRow({
  label,
  value = '',
  placeholder = '',
  counterText,
  footerText,
  bg,
  border,
  borderWidth,
  showCursor,
  showToolbar,
  dim,
}: Omit<SpecRowConfig, 'key' | 'title'>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 280 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: dim ? '#B5B9C2' : '#3D4759', fontFamily: "'DM Sans', sans-serif" }}>
          {label}
        </span>
        <InfoIcon color={dim ? '#B5B9C2' : '#2554D6'} />
      </div>

      <div style={{ borderRadius: '6px 6px 2px 2px', overflow: 'hidden' }}>
        {showToolbar && <TextToolbar />}
        <div style={{ position: 'relative' }}>
          {showCursor && (
            <span style={{ position: 'absolute', top: 10, left: 12, color: border, fontWeight: 400, zIndex: 1 }}>|</span>
          )}
          <textarea
            readOnly
            value={value}
            placeholder={placeholder}
            rows={3}
            style={{
              width: '100%',
              minHeight: 90,
              padding: showCursor ? '10px 14px 10px 22px' : '10px 14px',
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              background: bg,
              border: 'none',
              borderBottom: `${borderWidth}px solid ${border}`,
              color: dim ? '#B5B9C2' : value ? '#151A24' : '#9AA3B2',
              resize: 'none',
              outline: 'none',
              boxSizing: 'border-box',
              display: 'block',
              cursor: 'default',
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          color: dim ? '#B5B9C2' : '#8089A0',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <span>{footerText ?? ''}</span>
        {counterText && <span style={{ fontFamily: 'monospace' }}>{counterText}</span>}
      </div>
    </div>
  );
}

const SPEC_ROWS: SpecRowConfig[] = [
  { key: 'default', title: 'Default', label: 'Label (Optional)', value: '', placeholder: 'Placeholder', counterText: '0/100', bg: '#FFFFFF', border: '#C9CFDA', borderWidth: 1.5 },
  { key: 'hover', title: 'Hover', label: 'Label (Optional)', value: '', placeholder: 'Placeholder', counterText: '0/100', bg: '#F5F5F4', border: '#C9CFDA', borderWidth: 1.5 },
  { key: 'active', title: 'Active', label: 'Label (Optional)', value: '', placeholder: '', counterText: '0/100', bg: '#E9EEFC', border: '#0B1F4D', borderWidth: 2, showCursor: true },
  { key: 'filled', title: 'Filled', label: 'Label (Optional)', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.', counterText: '30/100', bg: '#FFFFFF', border: '#C9CFDA', borderWidth: 1.5 },
  { key: 'readonly', title: 'Read Only', label: 'Label', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.', footerText: 'Legend', bg: '#FFFFFF', border: '#E4E2DD', borderWidth: 1.5 },
  { key: 'disabled', title: 'Disabled', label: 'Label (Optional)', placeholder: 'Placeholder', counterText: '0/100', bg: '#F5F5F4', border: '#E4E2DD', borderWidth: 1.5, dim: true },
  { key: 'settings', title: 'Settings', label: 'Label (Optional)', placeholder: 'Placeholder', counterText: '0/100', bg: '#FFFFFF', border: '#C9CFDA', borderWidth: 1.5, showToolbar: true },
];

export function TextAreaSpec() {
  const LABEL_COL_WIDTH = 70;
  const COLUMN_GAP = 12;
  const ROW_GAP = 16;

  return (
    <div style={{ padding: 20, overflowY: 'auto', height: '100%', background: '#FFFFFF' }}>
      <SpecBadge label="Text Area" />
      <div style={{ position: 'relative', display: 'inline-block', width: 'auto' }}>
        {/* violet dashed border — tightly wrapped */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: LABEL_COL_WIDTH + COLUMN_GAP,
            right: 0,
            border: '1.5px dashed #8B5CF6',
            borderRadius: 4,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `${LABEL_COL_WIDTH}px auto`,
            columnGap: COLUMN_GAP,
            rowGap: ROW_GAP,
            padding: '16px 0',
          }}
        >
          {SPEC_ROWS.map(({ key, title, ...rowProps }, idx) => (
            <React.Fragment key={key}>
              <div
                style={{
                  gridColumn: 1,
                  gridRow: idx + 1,
                  display: 'flex',
                  alignItems: 'flex-start',
                  paddingTop: 2,
                }}
              >
                <span style={{ fontSize: 12, color: '#6B7280', fontFamily: "'DM Sans', sans-serif" }}>{title}</span>
              </div>
              <div
                style={{
                  gridColumn: 2,
                  gridRow: idx + 1,
                  padding: '0 12px',
                }}
              >
                <SpecTextareaRow {...rowProps} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE — equal-size preview / reference cards
============================================================ */
const CARD_STYLE: React.CSSProperties = {
  width: '100%',
  maxWidth: 1100,
  height: 560,
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function TextAreaPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <TextAreaDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <TextAreaSpec />
          </div>
        </div>
      </div>
    </div>
  );
}