import React, { useState } from 'react';

/* ============================================================
   Minimal stand-ins for your ui-helpers (PropChip, SpecBadge,
   SpecBlock) so this file is self-contained for preview.
   Swap these back out for your real imports in your project:
   import { PropChip, SpecBadge, SpecBlock } from '../ui-helpers';
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
      }}
    >
      {children}
    </button>
  );
}

function SpecBadge({ label }: { label: string }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 12 }}>
      {label.toUpperCase()}
    </div>
  );
}

/* ============================================================
   MANUAL BUTTON STYLES — matched to your reference image
============================================================ */
type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'ghostNegative'
  | 'success'
  | 'warning'
  | 'error';

type ButtonState = 'default' | 'hover' | 'active' | 'disabled';
type ButtonSize = 'xl' | 'l' | 'm' | 's' | 'xs';

interface VariantStyle {
  bg: string;
  text: string;
  border: string;
  hoverBg: string;
  activeBg: string;
  disabledBg: string;
  disabledText: string;
  disabledBorder: string;
  onDark?: boolean;
}

const VARIANT_STYLES: Record<Variant, VariantStyle> = {
  primary: {
    bg: '#0B1F4D', text: '#FFFFFF', border: '#0B1F4D',
    hoverBg: '#14295C', activeBg: '#2554D6',
    disabledBg: '#8FA0BF', disabledText: '#FFFFFF', disabledBorder: '#8FA0BF',
  },
  secondary: {
    bg: '#FFFFFF', text: '#0B1F4D', border: '#0B1F4D',
    hoverBg: '#F1F1F1', activeBg: '#E4EAFB',
    disabledBg: '#FFFFFF', disabledText: '#A9AFBD', disabledBorder: '#D8D4CC',
  },
  ghost: {
    bg: 'transparent', text: '#0B1F4D', border: 'transparent',
    hoverBg: '#F1F1F1', activeBg: '#DCE3F5',
    disabledBg: 'transparent', disabledText: '#A9AFBD', disabledBorder: 'transparent',
  },
  ghostNegative: {
    bg: '#0B1F4D', text: '#FFFFFF', border: 'transparent',
    hoverBg: 'rgba(255,255,255,0.10)', activeBg: 'rgba(255,255,255,0.18)',
    disabledBg: 'rgba(255,255,255,0.08)', disabledText: 'rgba(255,255,255,0.35)', disabledBorder: 'transparent',
    onDark: true,
  },
  success: {
    bg: '#0E9165', text: '#FFFFFF', border: '#0E9165',
    hoverBg: '#0B7A53', activeBg: '#076341',
    disabledBg: '#A8DDC4', disabledText: '#FFFFFF', disabledBorder: '#A8DDC4',
  },
  warning: {
    bg: '#F5C518', text: '#1B2A4A', border: '#F5C518',
    hoverBg: '#D9A916', activeBg: '#B8890B',
    disabledBg: '#FCEAAE', disabledText: '#B8945A', disabledBorder: '#FCEAAE',
  },
  error: {
    bg: '#DC2626', text: '#FFFFFF', border: '#DC2626',
    hoverBg: '#B91C1C', activeBg: '#7F1D1D',
    disabledBg: '#F6B4BC', disabledText: '#FFFFFF', disabledBorder: '#F6B4BC',
  },
};

const BTN_VARIANTS: { key: Variant; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'ghost', label: 'Ghost' },
  { key: 'ghostNegative', label: 'Ghost Negative' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
  { key: 'error', label: 'Error' },
];

const STATE_ROWS: ButtonState[] = ['default', 'hover', 'active', 'disabled'];
const SIZE_ROWS: ButtonSize[] = ['xl', 'l', 'm', 's', 'xs'];

function getSizeStyle(size: ButtonSize) {
  switch (size) {
    case 'xl': return { padding: '16px 28px', fontSize: 16 };
    case 'l': return { padding: '14px 24px', fontSize: 14 };
    case 'm': return { padding: '10px 20px', fontSize: 14 };
    case 's': return { padding: '8px 14px', fontSize: 13 };
    case 'xs': return { padding: '4px 10px', fontSize: 11 };
    default: return { padding: '10px 20px', fontSize: 14 };
  }
}

function RenderButton({
  variant,
  size,
  state,
}: {
  variant: Variant;
  size: ButtonSize;
  state: ButtonState;
}) {
  const styles = VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary;
  const sizeStyle = getSizeStyle(size);

  let bgColor = styles.bg;
  let textColor = styles.text;
  let borderColor = styles.border;
  let isDisabled = false;

  switch (state) {
    case 'hover': bgColor = styles.hoverBg; break;
    case 'active': bgColor = styles.activeBg; break;
    case 'disabled':
      bgColor = styles.disabledBg;
      textColor = styles.disabledText;
      borderColor = styles.disabledBorder;
      isDisabled = true;
      break;
    default: break;
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        borderRadius: 6,
        fontWeight: 700,
        outline: 'none',
        transition: 'background-color 150ms',
        backgroundColor: bgColor,
        color: textColor,
        border: `1.5px solid ${borderColor}`,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ...sizeStyle,
      }}
    >
      Button Text Here
    </button>
  );
}

/* ============================================================
   LIVE DEMO — interactive preview, sized to match reference cards
============================================================ */
export function ButtonDemo() {
  const [variant, setVariant] = useState<Variant>('primary');
  const [size, setSize] = useState<ButtonSize>('l');
  const [state, setState] = useState<ButtonState>('default');
  const onDark = VARIANT_STYLES[variant]?.onDark;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          background: onDark
            ? '#0B1F4D'
            : 'repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <RenderButton variant={variant} size={size} state={state} />
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: onDark ? 'rgba(255,255,255,0.6)' : '#8089A0' }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} • {size.toUpperCase()}
            {state !== 'default' ? ` • ${state.charAt(0).toUpperCase() + state.slice(1)}` : ''}
          </span>
        </div>
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>VARIANT</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {BTN_VARIANTS.map((v) => (
              <PropChip key={v.key} active={variant === v.key} onClick={() => setVariant(v.key)}>{v.label}</PropChip>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>SIZE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SIZE_ROWS.map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>{s.toUpperCase()}</PropChip>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>STATE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <PropChip active={state === 'default'} onClick={() => setState('default')}>Default</PropChip>
            <PropChip active={state === 'hover'} onClick={() => setState('hover')}>Hover</PropChip>
            <PropChip active={state === 'active'} onClick={() => setState('active')}>Active</PropChip>
            <PropChip active={state === 'disabled'} onClick={() => setState('disabled')}>Disabled</PropChip>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC - Manual code matching your images exactly
============================================================ */
export function ButtonSpec() {
  return (
    <div
      style={{
        padding: 24,
        overflowY: 'auto',
        height: '100%',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <SpecBadge label="Button" />

{/* Button All States - Manual Grid */}
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 32,
  }}
>
  <div
    style={{
      fontSize: 14,
      fontWeight: 600,
      color: '#3D4759',
      fontFamily: "'DM Sans', sans-serif",
      marginBottom: 4,
    }}
  >
    Button — All States
  </div>
  <div
    style={{
      width: '100%',
      border: '1px solid #EFEDE8',
      borderRadius: 8,
      overflow: 'auto',
      background: '#FFFFFF',
      padding: 26,
    }}
  >
    {/* Single Grid Container for both header and body */}
    <div style={{ display: 'grid', gridTemplateColumns: '90px repeat(7, 1fr)', gap: 12, padding:10, }}>
      {/* Header Row */}
      <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', display: 'flex', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid #EFEDE8' }}>
        State
      </div>
      {BTN_VARIANTS.map((variant) => (
        <div 
          key={variant.key} 
          style={{ 
            fontSize: 12, 
            fontWeight: 600, 
            color: '#6B7280', 
            textAlign: 'center', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            paddingBottom: 12,
            borderBottom: '1px solid #EFEDE8'
          }}
        >
          {variant.label}
        </div>
      ))}

      {/* State Rows */}
      {STATE_ROWS.map((state) => (
        <React.Fragment key={state}>
          <div 
            style={{ 
              fontSize: 13, 
              fontWeight: 600, 
              color: '#3D4759', 
              display: 'flex', 
              alignItems: 'center',
              paddingTop: 12
            }}
          >
            {state.charAt(0).toUpperCase() + state.slice(1)}
          </div>
          {BTN_VARIANTS.map((variant) => (
            <div 
              key={`${state}-${variant.key}`} 
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                paddingTop: 12
              }}
            >
              <RenderButton variant={variant.key} size="s" state={state} />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
</div>

      {/* Button Variants - Manual Sizes */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#3D4759',
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 4,
          }}
        >
          Button — Variants
        </div>
        <div
          style={{
            width: '100%',
            border: '1px solid #EFEDE8',
            borderRadius: 8,
            overflow: 'hidden',
            background: '#FFFFFF',
            padding: 16,
          }}
        >
          {SIZE_ROWS.map((size) => (
            <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '8px 0', borderBottom: size !== 'xs' ? '1px solid #EFEDE8' : 'none' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0B1F4D', width: 32 }}>
                {size.toUpperCase()}
              </span>
              <RenderButton variant="primary" size={size} state="default" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE — preview and reference cards share identical width/height
   so nothing looks mismatched; wide content scrolls horizontally
   inside its own card instead of stretching the layout.
============================================================ */
const CARD_STYLE: React.CSSProperties = {
  width: '100%',
  maxWidth: 920,
  height: 560,
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function ButtonSpecPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 920 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <ButtonDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 920 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <ButtonSpec />
          </div>
        </div>
      </div>
    </div>
  );
}