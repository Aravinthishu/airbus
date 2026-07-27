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
        transition: 'all 150ms',
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
          minHeight: 240,
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 20px',
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

      <div style={{ padding: '16px 20px', borderTop: '1px solid #EFEDE8', overflowY: 'auto' }}>
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
   REFERENCE SPEC — violet dashed border wraps ONLY the button
   cells.

   Previously the border was a separate absolutely-positioned
   overlay computed with `right: 0`. That pins to the CONTAINING
   BLOCK'S OWN box width — but the button grid was wider than that
   box (button text forces each column past its 1fr share), so the
   grid content overflowed to the right of the border instead of
   staying inside it (visible as buttons spilling past the dashed
   line).

   Fix: the border is now a real `border` on a div that directly
   wraps the button grid, and every column (header row, label
   column, and button grid) uses the SAME fixed pixel width. A real
   border always matches its own content's rendered size — there's
   no separate box to fall out of sync with.
============================================================ */
const LABEL_COL_WIDTH = 88;
const VARIANT_COL_WIDTH = 150;
const CELL_GAP = 10;
const HEADER_ROW_HEIGHT = 36;
const STATE_ROW_HEIGHT = 64;

export function ButtonSpec() {
  return (
    <div
      style={{
        padding: '20px 16px',
        overflowY: 'auto',
        height: '100%',
        fontFamily: "'DM Sans', sans-serif",
        boxSizing: 'border-box',
      }}
    >
      <SpecBadge label="Button" />

      {/* ============================================================
          Button — All States
      ============================================================ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', marginBottom: 4 }}>
          Button — All States
        </div>

        <div style={{ overflowX: 'auto' }}>
          {/* inline-flex so this wrapper's own width shrinks/grows to fit its
              content exactly — the scrollbar (not a mis-sized overlay) handles overflow */}
          <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
            {/* header row — label spacer + variant names, same fixed column widths as below */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `${LABEL_COL_WIDTH}px repeat(${BTN_VARIANTS.length}, ${VARIANT_COL_WIDTH}px)`,
                columnGap: CELL_GAP,
                marginBottom: CELL_GAP,
              }}
            >
              <div />
              {BTN_VARIANTS.map((variant) => (
                <div
                  key={variant.key}
                  style={{
                    height: HEADER_ROW_HEIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#6B7280',
                    textAlign: 'center',
                  }}
                >
                  {variant.label}
                </div>
              ))}
            </div>

            {/* body row — label column (outside the frame) + violet-bordered button grid */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: CELL_GAP }}>
              <div style={{ width: LABEL_COL_WIDTH, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: CELL_GAP }}>
                {STATE_ROWS.map((state) => (
                  <div
                    key={state}
                    style={{
                      height: STATE_ROW_HEIGHT,
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#3D4759',
                    }}
                  >
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </div>
                ))}
              </div>

              {/* real border, sized to its own content — can't drift */}
              <div style={{ border: '2px dashed #8B5CF6', borderRadius: 8, padding: CELL_GAP }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${BTN_VARIANTS.length}, ${VARIANT_COL_WIDTH}px)`,
                    columnGap: CELL_GAP,
                    rowGap: CELL_GAP,
                  }}
                >
                  {STATE_ROWS.map((state) =>
                    BTN_VARIANTS.map((variant) => {
                      const isGhostNegative = variant.key === 'ghostNegative';
                      return (
                        <div
                          key={`${state}-${variant.key}`}
                          style={{
                            height: STATE_ROW_HEIGHT,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 6,
                            ...(isGhostNegative && { background: '#002F7B' }),
                          }}
                        >
                          <RenderButton variant={variant.key} size="s" state={state} />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          Button — Sizes
      ============================================================ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', marginBottom: 4 }}>
          Button — Sizes
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: CELL_GAP }}>
          <div style={{ width: LABEL_COL_WIDTH, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: CELL_GAP }}>
            {SIZE_ROWS.map((size) => (
              <div
                key={size}
                style={{
                  height: 56,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#0B1F4D',
                }}
              >
                {size.toUpperCase()}
              </div>
            ))}
          </div>

          <div style={{ border: '2px dashed #8B5CF6', borderRadius: 8, padding: CELL_GAP }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: CELL_GAP }}>
              {SIZE_ROWS.map((size) => (
                <div key={size} style={{ height: 56, display: 'flex', alignItems: 'center' }}>
                  <RenderButton variant="primary" size={size} state="default" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE — preview and reference cards with SAME HEIGHT
   and FULL MOBILE RESPONSIVENESS
============================================================ */
const CARD_HEIGHT = 560;

const CARD_STYLE: React.CSSProperties = {
  width: '100%',
  maxWidth: 920,
  height: CARD_HEIGHT,
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function ButtonSpecPage() {
  return (
    <div style={{ 
      padding: '20px 16px', 
      background: '#FAFAF8', 
      minHeight: '100vh', 
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 32, 
        alignItems: 'center',
        maxWidth: '100%',
      }}>
        {/* LIVE PREVIEW CARD */}
        <div style={{ width: '100%', maxWidth: 920 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <ButtonDemo />
          </div>
        </div>

        {/* REFERENCE SPEC CARD */}
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