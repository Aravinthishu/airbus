import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

/* ============================================================
   Minimal stand-ins for your ui-helpers (PropChip, SpecBadge)
   Swap these back for your real imports in your project:
   import { PropChip, SpecBadge } from '../ui-helpers';
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
   ScrollContainer — auto-hiding scrollbars
============================================================ */
function ScrollContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showScrollbars = () => {
    setShowScrollbar(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  };

  const hideScrollbars = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowScrollbar(false), 5000);
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const checkOverflow = () => {
      const overflowing = element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
      if (overflowing) {
        setShowScrollbar(true);
        hideScrollbars();
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [children]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={showScrollbars}
      onMouseLeave={hideScrollbars}
      style={{
        overflow: 'auto',
        position: 'relative',
        ...(showScrollbar
          ? { scrollbarWidth: 'thin', scrollbarColor: '#C084FC transparent' }
          : { scrollbarWidth: 'none', msOverflowStyle: 'none' }),
      }}
    >
      <style>
        {`
          .scroll-container::-webkit-scrollbar { width: 6px; height: 6px; opacity: ${showScrollbar ? 1 : 0}; transition: opacity 0.3s ease; }
          .scroll-container::-webkit-scrollbar-track { background: transparent; }
          .scroll-container::-webkit-scrollbar-thumb { background: ${showScrollbar ? '#C084FC' : 'transparent'}; border-radius: 3px; transition: background 0.3s ease; }
          .scroll-container::-webkit-scrollbar-thumb:hover { background: #A855F7; }
        `}
      </style>
      {children}
    </div>
  );
}

/* ============================================================
   BUTTON STYLES
============================================================ */
type Variant = 'primary' | 'secondary' | 'ghost' | 'ghostNegative' | 'success' | 'warning' | 'error';
type ButtonState = 'default' | 'hover' | 'active' | 'disabled';
type ButtonSize = 'xl' | 'l' | 'm' | 's' | 'xs';

interface VariantStyle {
  bg: string; text: string; border: string;
  hoverBg: string; activeBg: string;
  disabledBg: string; disabledText: string; disabledBorder: string;
  onDark?: boolean;
}

const VARIANT_STYLES: Record<Variant, VariantStyle> = {
  primary: { bg: '#0B1F4D', text: '#FFFFFF', border: '#0B1F4D', hoverBg: '#14295C', activeBg: '#2554D6', disabledBg: '#8FA0BF', disabledText: '#FFFFFF', disabledBorder: '#8FA0BF' },
  secondary: { bg: '#FFFFFF', text: '#0B1F4D', border: '#0B1F4D', hoverBg: '#F1F1F1', activeBg: '#E4EAFB', disabledBg: '#FFFFFF', disabledText: '#A9AFBD', disabledBorder: '#D8D4CC' },
  ghost: { bg: 'transparent', text: '#0B1F4D', border: 'transparent', hoverBg: '#F1F1F1', activeBg: '#DCE3F5', disabledBg: 'transparent', disabledText: '#A9AFBD', disabledBorder: 'transparent' },
  ghostNegative: { bg: '#0B1F4D', text: '#FFFFFF', border: 'transparent', hoverBg: 'rgba(255,255,255,0.10)', activeBg: 'rgba(255,255,255,0.18)', disabledBg: 'rgba(255,255,255,0.08)', disabledText: 'rgba(255,255,255,0.35)', disabledBorder: 'transparent', onDark: true },
  success: { bg: '#0E9165', text: '#FFFFFF', border: '#0E9165', hoverBg: '#0B7A53', activeBg: '#076341', disabledBg: '#A8DDC4', disabledText: '#FFFFFF', disabledBorder: '#A8DDC4' },
  warning: { bg: '#F5C518', text: '#1B2A4A', border: '#F5C518', hoverBg: '#D9A916', activeBg: '#B8890B', disabledBg: '#FCEAAE', disabledText: '#B8945A', disabledBorder: '#FCEAAE' },
  error: { bg: '#DC2626', text: '#FFFFFF', border: '#DC2626', hoverBg: '#B91C1C', activeBg: '#7F1D1D', disabledBg: '#F6B4BC', disabledText: '#FFFFFF', disabledBorder: '#F6B4BC' },
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

function RenderButton({ variant, size, state }: { variant: Variant; size: ButtonSize; state: ButtonState }) {
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
   PAGE-LEVEL GUIDED TOUR (self-contained inside ButtonDemo)

   - Triggers once, the first time ButtonDemo's own container
     scrolls into view (IntersectionObserver), not on mount.
   - Rendered via createPortal into document.body, position:fixed,
     so the dim + blur covers the WHOLE site regardless of any
     transform/overflow-hidden ancestor (accordion wrapper etc).
   - Spotlight hole = 4 fixed panels around the target rect, each
     with backdrop-filter blur + dim. Target itself stays sharp.
============================================================ */
const TOUR_STORAGE_KEY = 'buttonPreviewTourSeen_v1';

type TourPlacement = 'top' | 'bottom';

interface TourStep {
  targetRef: React.RefObject<HTMLElement | null>;
  title: string;
  text: string;
  placement: TourPlacement;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function useViewportRect(targetRef: React.RefObject<HTMLElement | null>, active: boolean) {
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (!active) return;
    const target = targetRef.current;
    if (!target) return;

    const measure = () => {
      const t = target.getBoundingClientRect();
      setRect({ top: t.top, left: t.left, width: t.width, height: t.height });
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [active, targetRef]);

  return rect;
}

function TourOverlay({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onSkip,
}: {
  step: TourStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const rect = useViewportRect(step.targetRef, true);

  useEffect(() => {
    step.targetRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [step.targetRef]);

  if (!rect || typeof window === 'undefined') return null;

  const PAD = 8;
  const spot = {
    top: rect.top - PAD,
    left: rect.left - PAD,
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
  };

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isBottom = step.placement === 'bottom';
  const dimPanel: React.CSSProperties = {
    position: 'fixed',
    background: 'rgba(10,14,24,0.6)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  };

  const tooltipWidth = 270;
  const tooltipLeft = Math.max(12, Math.min(spot.left + spot.width / 2 - tooltipWidth / 2, vw - tooltipWidth - 12));

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 999999, pointerEvents: 'auto' }}>
      {/* 4 dimmed + blurred panels framing the spotlight hole */}
      <div style={{ ...dimPanel, top: 0, left: 0, right: 0, height: Math.max(0, spot.top) }} />
      <div style={{ ...dimPanel, top: spot.top + spot.height, left: 0, right: 0, bottom: 0 }} />
      <div style={{ ...dimPanel, top: spot.top, left: 0, width: Math.max(0, spot.left), height: spot.height }} />
      <div style={{ ...dimPanel, top: spot.top, left: spot.left + spot.width, right: 0, height: spot.height }} />

      {/* glowing spotlight border around the target */}
      <div
        style={{
          position: 'fixed',
          top: spot.top,
          left: spot.left,
          width: spot.width,
          height: spot.height,
          borderRadius: 10,
          border: '2px solid #C084FC',
          boxShadow: '0 0 0 4px rgba(192,132,252,0.25), 0 0 20px rgba(192,132,252,0.55)',
          pointerEvents: 'none',
          transition: 'all 250ms ease',
        }}
      />

      {/* tooltip */}
      <div
        style={{
          position: 'fixed',
          left: tooltipLeft,
          width: tooltipWidth,
          top: isBottom
            ? Math.min(spot.top + spot.height + 14, vh - 160)
            : undefined,
          bottom: !isBottom ? Math.max(vh - spot.top + 14, 12) : undefined,
          background: '#0B1F4D',
          color: '#FFFFFF',
          borderRadius: 10,
          padding: '14px 16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: Math.max(16, Math.min(spot.left + spot.width / 2 - tooltipLeft, tooltipWidth - 16)) - 6,
            width: 12,
            height: 12,
            background: '#0B1F4D',
            transform: 'rotate(45deg)',
            ...(isBottom ? { top: -6 } : { bottom: -6 }),
          }}
        />
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{step.title}</div>
        <div style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>
          {step.text}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{stepIndex + 1} / {totalSteps}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={onSkip}
              style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              Skip
            </button>
            <button
              type="button"
              onClick={onNext}
              style={{ fontSize: 12, fontWeight: 700, color: '#0B1F4D', background: '#C084FC', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}
            >
              {stepIndex + 1 === totalSteps ? 'Got it' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ============================================================
   LIVE DEMO — interactive preview + scroll-triggered first-time
   guided tour, blurring the whole site (not just this panel).
============================================================ */
export function ButtonDemo() {
  const [variant, setVariant] = useState<Variant>('primary');
  const [size, setSize] = useState<ButtonSize>('l');
  const [state, setState] = useState<ButtonState>('default');
  const isGhostNegative = variant === 'ghostNegative';

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const variantRef = useRef<HTMLDivElement | null>(null);
  const sizeRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<HTMLDivElement | null>(null);

  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  // Fires once, only when this component actually scrolls into view.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(TOUR_STORAGE_KEY)) return;
    const node = wrapperRef.current;
    if (!node) return;

    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          delayTimer = setTimeout(() => setTourActive(true), 400);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, []);

  const endTour = useCallback(() => {
    setTourActive(false);
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  }, []);

  const tourSteps: TourStep[] = [
    { targetRef: previewRef, title: 'Live Preview', text: 'This box always shows the button exactly as configured below — variant, size and state combined.', placement: 'bottom' },
    { targetRef: variantRef, title: 'Change Variant', text: 'Tap here to switch between Primary, Secondary, Ghost and more.', placement: 'top' },
    { targetRef: sizeRef, title: 'Change Size', text: 'Tap here to preview XL down to XS sizing.', placement: 'top' },
    { targetRef: stateRef, title: 'Change State', text: 'Tap here to see how the button looks on hover, active and disabled.', placement: 'top' },
  ];

  const handleNext = () => {
    if (tourStep + 1 >= tourSteps.length) endTour();
    else setTourStep((s) => s + 1);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        ref={previewRef}
        style={{
          flex: '1 1 0',
          minHeight: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 20px',
          backgroundImage: `
            linear-gradient(rgba(200, 200, 200, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 200, 200, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundColor: isGhostNegative ? '#002F7B' : '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <RenderButton variant={variant} size={size} state={state} />
          <span style={{
            fontSize: 12,
            fontFamily: 'monospace',
            color: isGhostNegative ? 'rgba(255,255,255,0.8)' : '#8089A0',
            background: isGhostNegative ? 'rgba(255,255,255,0.1)' : '#FFFFFF',
            padding: '4px 12px',
            borderRadius: 4,
            border: isGhostNegative ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
          }}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} • {size.toUpperCase()}
            {state !== 'default' ? ` • ${state.charAt(0).toUpperCase() + state.slice(1)}` : ''}
          </span>
        </div>
      </div>

      <div style={{ padding: '16px 20px', borderTop: '1px solid #EFEDE8', overflowY: 'auto', background: '#FFFFFF' }}>
        <div ref={variantRef} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>VARIANT</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {BTN_VARIANTS.map((v) => (
              <PropChip key={v.key} active={variant === v.key} onClick={() => setVariant(v.key)}>{v.label}</PropChip>
            ))}
          </div>
        </div>
        <div ref={sizeRef} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>SIZE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SIZE_ROWS.map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>{s.toUpperCase()}</PropChip>
            ))}
          </div>
        </div>
        <div ref={stateRef}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>STATE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <PropChip active={state === 'default'} onClick={() => setState('default')}>Default</PropChip>
            <PropChip active={state === 'hover'} onClick={() => setState('hover')}>Hover</PropChip>
            <PropChip active={state === 'active'} onClick={() => setState('active')}>Active</PropChip>
            <PropChip active={state === 'disabled'} onClick={() => setState('disabled')}>Disabled</PropChip>
          </div>
        </div>
      </div>

      {tourActive && (
        <TourOverlay
          step={tourSteps[tourStep]}
          stepIndex={tourStep}
          totalSteps={tourSteps.length}
          onNext={handleNext}
          onSkip={endTour}
        />
      )}
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — violet dashed border wraps ONLY the button
   cells. A real `border` on a div wrapping the button grid, with
   every column at a fixed pixel width, so the border can't drift
   away from the grid's actual rendered size.
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
        background: '#FFFFFF',
      }}
    >
      <SpecBadge label="Button" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', marginBottom: 4 }}>
          Button — All States
        </div>

        <ScrollContainer>
          <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
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
        </ScrollContainer>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', marginBottom: 4 }}>
          Button — Sizes
        </div>

        <ScrollContainer>
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
        </ScrollContainer>
      </div>
    </div>
  );
}