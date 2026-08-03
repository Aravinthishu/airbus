'use client';
import React, { useState, useEffect, useRef } from 'react';

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
        padding: '4px 10px',
        borderRadius: 6,
        fontSize: 10,
        fontWeight: 600,
        border: `1px solid ${active ? '#0B1F4D' : '#D8D4CC'}`,
        background: active ? '#0B1F4D' : '#FFFFFF',
        color: active ? '#FFFFFF' : '#4B5563',
        cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: 'nowrap',
        transition: 'all 150ms',
      }}
    >
      {children}
    </button>
  );
}

function SpecBadge({ label }: { label: string }) {
  return (
    <div style={{ 
      fontSize: 10, 
      fontWeight: 700, 
      letterSpacing: 1, 
      color: '#8089A0', 
      marginBottom: 10, 
      fontFamily: "'DM Sans', sans-serif" 
    }}>
      {label.toUpperCase()}
    </div>
  );
}

function SpecBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ 
        fontSize: 13, 
        fontWeight: 700, 
        color: '#151A24', 
        marginBottom: 12, 
        fontFamily: "'DM Sans', sans-serif" 
      }}>{title}</div>
      {children}
    </div>
  );
}

/* ============================================================
   ScrollContainer component with auto-hiding scrollbars
============================================================ */
function ScrollContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showScrollbars = () => {
    setShowScrollbar(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const hideScrollbars = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    hideTimeoutRef.current = setTimeout(() => {
      setShowScrollbar(false);
    }, 5000);
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const checkOverflow = () => {
      const hasHorizontalScroll = element.scrollWidth > element.clientWidth;
      const hasVerticalScroll = element.scrollHeight > element.clientHeight;
      if (hasHorizontalScroll || hasVerticalScroll) {
        setShowScrollbar(true);
        hideScrollbars();
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
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
        ...(showScrollbar ? {
          scrollbarWidth: 'thin',
          scrollbarColor: '#C084FC transparent',
        } : {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }),
      }}
      className={className}
    >
      <style>
        {`
          .scroll-container::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            opacity: ${showScrollbar ? 1 : 0};
            transition: opacity 0.3s ease;
          }
          
          .scroll-container::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .scroll-container::-webkit-scrollbar-thumb {
            background: ${showScrollbar ? '#C084FC' : 'transparent'};
            border-radius: 3px;
            transition: background 0.3s ease;
          }
          
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: #A855F7;
          }
          
          .scroll-container {
            scrollbar-width: ${showScrollbar ? 'thin' : 'none'};
            scrollbar-color: ${showScrollbar ? '#C084FC transparent' : 'transparent transparent'};
            transition: scrollbar-color 0.3s ease;
          }
        `}
      </style>
      {children}
    </div>
  );
}

/* ============================================================
   SETTINGS ICON — gear glyph, used everywhere
============================================================ */
function SettingsIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ============================================================
   BUTTON GROUP STYLES
============================================================ */
type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';
type ButtonSize = 'l' | 'm' | 's';

const BUTTON_GROUP_STYLES: Record<
  ButtonState,
  { bg: string; border: string; text: string; boxShadow?: string }
> = {
  default: {
    bg: '#FFFFFF',
    border: '#0B1F4D',
    text: '#0B1F4D',
  },
  hover: {
    bg: '#F5F5F4',
    border: '#0B1F4D',
    text: '#0B1F4D',
  },
  active: {
    bg: '#E9EEFC',
    border: '#0B1F4D',
    text: '#0B1F4D',
  },
  focus: {
    bg: '#FFFFFF',
    border: '#0B1F4D',
    text: '#0B1F4D',
  },
  disabled: {
    bg: '#FFFFFF',
    border: '#E4E2DD',
    text: '#B5B9C2',
  },
};

function ButtonGroupButton({
  label,
  state = 'default',
  size = 'm',
  showIcon = false,
  iconOnly = false,
}: {
  label: string;
  state?: ButtonState;
  size?: ButtonSize;
  showIcon?: boolean;
  iconOnly?: boolean;
}) {
  const getSizeStyle = () => {
    switch (size) {
      case 'l': return { padding: iconOnly ? '8px 12px' : '8px 14px', fontSize: 12 };
      case 'm': return { padding: iconOnly ? '6px 10px' : '6px 12px', fontSize: 11 };
      case 's': return { padding: iconOnly ? '4px 8px' : '4px 10px', fontSize: 10 };
      default: return { padding: '6px 12px', fontSize: 11 };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'l': return 14;
      case 'm': return 12;
      case 's': return 10;
      default: return 12;
    }
  };

  const styles = BUTTON_GROUP_STYLES[state] || BUTTON_GROUP_STYLES.default;
  const sizeStyle = getSizeStyle();
  const isDisabled = state === 'disabled';

  return (
    <button
      disabled={isDisabled}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: showIcon && !iconOnly ? 4 : 0,
        whiteSpace: 'nowrap',
        fontWeight: 600,
        outline: 'none',
        transition: 'all 0.15s ease',
        backgroundColor: styles.bg,
        color: styles.text,
        border: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ...sizeStyle,
        position: 'relative',
        margin: '2px',
        minWidth: iconOnly ? 'auto' : '32px',
      }}
    >
      {showIcon && <SettingsIcon size={getIconSize()} />}
      {!iconOnly && label}
    </button>
  );
}

function ButtonGroup({
  itemCount = 3,
  state = 'default',
  size = 'm',
  showIcon = true,
  iconOnly = false,
  label = 'Button',
}: {
  itemCount?: number;
  state?: ButtonState;
  size?: ButtonSize;
  showIcon?: boolean;
  iconOnly?: boolean;
  label?: string;
}) {
  const styles = BUTTON_GROUP_STYLES[state] || BUTTON_GROUP_STYLES.default;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'stretch',
        border: `1.5px solid ${styles.border}`,
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: state === 'focus' ? '0 0 0 2px #FFFFFF, 0 0 0 4px #053E9F' : 'none',
        background: '#FFFFFF',
        flexWrap: 'nowrap',
        maxWidth: '100%',
      }}
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div
              style={{
                width: 1.5,
                alignSelf: 'stretch',
                margin: '4px 0',
                flexShrink: 0,
                backgroundColor: styles.border,
              }}
            />
          )}
          <ButtonGroupButton
            label={label}
            state={state}
            size={size}
            showIcon={showIcon}
            iconOnly={iconOnly}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function ButtonGroupDemo() {
  const [status, setStatus] = useState<ButtonState>('default');
  const [size, setSize] = useState<ButtonSize>('m');
  const [itemCount, setItemCount] = useState(3);
  const [hasIcon, setHasIcon] = useState(true);
  const [iconOnly, setIconOnly] = useState(false);

  const statusOptions: ButtonState[] = ['default', 'hover', 'active', 'focus', 'disabled'];
  const statusLabels = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 12px',
          backgroundImage: `
            linear-gradient(rgba(200, 200, 200, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 200, 200, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundColor: '#FFFFFF',
          overflow: 'auto',
        }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 10,
          maxWidth: '100%',
        }}>
          <ButtonGroup
            itemCount={itemCount}
            state={status}
            size={size}
            showIcon={hasIcon}
            iconOnly={iconOnly}
          />
          <span style={{ 
            fontSize: 9, 
            fontFamily: 'monospace', 
            color: '#8089A0', 
            background: '#FFFFFF', 
            padding: '2px 8px', 
            borderRadius: 4, 
            border: '1px solid #E5E5E5',
            textAlign: 'center',
          }}>
            {status.charAt(0).toUpperCase() + status.slice(1)} • {size.toUpperCase()} • {itemCount} items
          </span>
        </div>
      </div>

      <div style={{ 
        padding: '10px 12px', 
        borderTop: '1px solid #EFEDE8', 
        overflowY: 'auto', 
        background: '#FFFFFF',
        maxHeight: '55%',
      }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ 
            fontSize: 8, 
            fontWeight: 700, 
            letterSpacing: 1, 
            color: '#8089A0', 
            marginBottom: 5, 
            fontFamily: "'DM Sans', sans-serif" 
          }}>STATUS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {statusOptions.map((s, index) => (
              <PropChip key={s} active={status === s} onClick={() => setStatus(s)}>
                {statusLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ 
            fontSize: 8, 
            fontWeight: 700, 
            letterSpacing: 1, 
            color: '#8089A0', 
            marginBottom: 5, 
            fontFamily: "'DM Sans', sans-serif" 
          }}>SIZE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {(['s', 'm', 'l'] as ButtonSize[]).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>
                {s.toUpperCase()}
              </PropChip>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ 
            fontSize: 8, 
            fontWeight: 700, 
            letterSpacing: 1, 
            color: '#8089A0', 
            marginBottom: 5, 
            fontFamily: "'DM Sans', sans-serif" 
          }}>ITEM COUNT</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {[1, 2, 3, 4].map((count) => (
              <PropChip key={count} active={itemCount === count} onClick={() => setItemCount(count)}>
                {count} items
              </PropChip>
            ))}
          </div>
        </div>
        <div>
          <div style={{ 
            fontSize: 8, 
            fontWeight: 700, 
            letterSpacing: 1, 
            color: '#8089A0', 
            marginBottom: 5, 
            fontFamily: "'DM Sans', sans-serif" 
          }}>ICON</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            <PropChip active={!hasIcon} onClick={() => { setHasIcon(false); setIconOnly(false); }}>No Icon</PropChip>
            <PropChip active={hasIcon && !iconOnly} onClick={() => { setHasIcon(true); setIconOnly(false); }}>Icon + Label</PropChip>
            <PropChip active={hasIcon && iconOnly} onClick={() => { setHasIcon(true); setIconOnly(true); }}>Icon Only</PropChip>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC
============================================================ */
export function ButtonGroupSpec() {
  const sizes: ButtonSize[] = ['l', 'm', 's'];
  const sizeLabels: Record<ButtonSize, string> = { l: 'L', m: 'M', s: 'S' };
  const itemCounts = [3, 6];

  const SizeRows = ({
    iconOnly,
    title,
  }: {
    iconOnly: boolean;
    title: string;
  }) => (
    <div
      style={{
        width: 'fit-content',
        minWidth: '200px',
        border: '2px dashed #C084FC',
        borderRadius: 8,
        padding: 14,
        background: '#FFFFFF',
      }}
    >
      <div style={{
        fontSize: 10,
        fontWeight: 600,
        color: '#7C3AED',
        marginBottom: 10,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: '0.5px',
      }}>
        {title}
      </div>
      {sizes.map((size, sizeIndex) => (
        <div key={size} style={{ marginBottom: sizeIndex < sizes.length - 1 ? 20 : 0 }}>
          <div style={{ 
            fontSize: 11, 
            fontWeight: 700, 
            color: '#0B1F4D', 
            marginBottom: 10,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Size {sizeLabels[size]}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {itemCounts.map((count) => (
              <div key={`${size}-${count}`}>
                <div style={{ 
                  fontSize: 10, 
                  fontWeight: 500, 
                  color: '#6B7280', 
                  marginBottom: 6,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {count} Items
                </div>
                <ButtonGroup
                  itemCount={count}
                  state="default"
                  size={size}
                  showIcon={true}
                  iconOnly={iconOnly}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      style={{
        padding: '14px 10px',
        overflowY: 'auto',
        height: '100%',
        fontFamily: "'DM Sans', sans-serif",
        background: '#FFFFFF',
      }}
    >
      <SpecBadge label="Button Group" />

      <SpecBlock title="Button Group — Icon + Label">
        <ScrollContainer>
          <SizeRows iconOnly={false} title="Icon + Label" />
        </ScrollContainer>
      </SpecBlock>

      <SpecBlock title="Button Group — Icon Only">
        <ScrollContainer>
          <SizeRows iconOnly={true} title="Icon Only" />
        </ScrollContainer>
      </SpecBlock>

      <SpecBlock title="Button Group — Item Count Examples">
        <ScrollContainer>
          <div
            style={{
              width: 'fit-content',
              minWidth: '200px',
              border: '2px dashed #C084FC',
              borderRadius: 8,
              padding: 14,
              background: '#FFFFFF',
            }}
          >
            <div style={{
              fontSize: 10,
              fontWeight: 600,
              color: '#7C3AED',
              marginBottom: 10,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.5px',
            }}>
              Item Count Examples
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[2, 3, 4].map((count) => (
                <div key={count}>
                  <div style={{ 
                    fontSize: 10, 
                    fontWeight: 500, 
                    color: '#6B7280', 
                    marginBottom: 6,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {count} Items
                  </div>
                  <ButtonGroup itemCount={count} state="default" size="m" showIcon={true} iconOnly={false} />
                </div>
              ))}
            </div>
          </div>
        </ScrollContainer>
      </SpecBlock>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */
const CARD_STYLE: React.CSSProperties = {
  width: '100%',
  maxWidth: 1100,
  height: 'auto',
  minHeight: 400,
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function ButtonGroupPage() {
  return (
    <div style={{ 
      padding: '14px 10px', 
      background: '#F9FAFB', 
      minHeight: '100vh', 
      fontFamily: "'DM Sans', sans-serif" 
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ 
            fontSize: 10, 
            fontWeight: 700, 
            letterSpacing: 1, 
            color: '#8089A0', 
            marginBottom: 5, 
            fontFamily: "'DM Sans', sans-serif" 
          }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <ButtonGroupDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ 
            fontSize: 10, 
            fontWeight: 700, 
            letterSpacing: 1, 
            color: '#8089A0', 
            marginBottom: 5, 
            fontFamily: "'DM Sans', sans-serif" 
          }}>
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <ButtonGroupSpec />
          </div>
        </div>
      </div>
    </div>
  );
}