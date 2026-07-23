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

function SpecBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#151A24', marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
      {children}
    </div>
  );
}

/* ============================================================
   SETTINGS ICON — matches the glyph in the reference images
============================================================ */
function SettingsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ============================================================
   BUTTON GROUP STYLES
   NOTE: "default" now matches the uploaded reference exactly —
   white background, navy border, navy text/icon.
============================================================ */
type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';
type ButtonSide = 'left' | 'center' | 'right';
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
    boxShadow: '0 0 0 3px rgba(11,31,77,0.25)',
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
  side = 'center',
  size = 'm',
  showIcon = false,
  iconOnly = false,
  isLast = false,
}: {
  label: string;
  state?: ButtonState;
  side?: ButtonSide;
  size?: ButtonSize;
  showIcon?: boolean;
  iconOnly?: boolean;
  isLast?: boolean;
}) {
  const getSizeStyle = () => {
    switch (size) {
      case 'l': return { padding: iconOnly ? '12px 20px' : '12px 24px', fontSize: 16 };
      case 'm': return { padding: iconOnly ? '10px 16px' : '10px 18px', fontSize: 14 };
      case 's': return { padding: iconOnly ? '8px 12px' : '8px 14px', fontSize: 12 };
      default: return { padding: '10px 18px', fontSize: 14 };
    }
  };

  const getIconSize = () => (size === 'l' ? 18 : size === 'm' ? 16 : 14);

  const getBorderRadius = () => {
    if (side === 'left') return '6px 0 0 6px';
    if (side === 'right') return '0 6px 6px 0';
    return '6px';
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
        gap: showIcon && !iconOnly ? 8 : 0,
        whiteSpace: 'nowrap',
        borderRadius: getBorderRadius(),
        fontWeight: 600,
        outline: 'none',
        transition: 'all 0.15s ease',
        backgroundColor: styles.bg,
        color: styles.text,
        border: `1.5px solid ${styles.border}`,
        borderRight: side === 'center' && !isLast ? 'none' : `1.5px solid ${styles.border}`,
        borderLeft: side === 'center' && !isLast ? 'none' : `1.5px solid ${styles.border}`,
        boxShadow: styles.boxShadow || 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ...sizeStyle,
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
  const getSide = (index: number): ButtonSide => {
    if (index === 0) return 'left';
    if (index === itemCount - 1) return 'right';
    return 'center';
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <ButtonGroupButton
          key={index}
          label={label}
          state={state}
          side={getSide(index)}
          size={size}
          showIcon={showIcon}
          iconOnly={iconOnly}
          isLast={index === itemCount - 1}
        />
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          background:
            'repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <ButtonGroup
            itemCount={itemCount}
            state={status}
            size={size}
            showIcon={hasIcon}
            iconOnly={iconOnly}
          />
          <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#8089A0' }}>
            {status.charAt(0).toUpperCase() + status.slice(1)} • {size.toUpperCase()} • {itemCount} items
          </span>
        </div>
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>STATUS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {statusOptions.map((s, index) => (
              <PropChip key={s} active={status === s} onClick={() => setStatus(s)}>
                {statusLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>SIZE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(['s', 'm', 'l'] as ButtonSize[]).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>
                {s.toUpperCase()}
              </PropChip>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>ITEM COUNT</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[1, 2, 3, 4].map((count) => (
              <PropChip key={count} active={itemCount === count} onClick={() => setItemCount(count)}>
                {count} items
              </PropChip>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>ICON</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
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
   REFERENCE SPEC — matches btn-group-all.png / btn-group-icon-all.png
   with violet dashed border like Figma
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
        width: '100%',
        border: '2px dashed #C084FC',
        borderRadius: 8,
        overflow: 'auto',
        background: '#FFFFFF',
        padding: 20,
      }}
    >
      <div style={{
        fontSize: 12,
        fontWeight: 600,
        color: '#7C3AED',
        marginBottom: 16,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: '0.5px',
      }}>
        {title}
      </div>
      {sizes.map((size, sizeIndex) => (
        <div key={size} style={{ marginBottom: sizeIndex < sizes.length - 1 ? 32 : 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0B1F4D', marginBottom: 16 }}>
            Size {sizeLabels[size]}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {itemCounts.map((count) => (
              <div key={`${size}-${count}`}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#6B7280', marginBottom: 10 }}>
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
        padding: 24,
        overflowY: 'auto',
        height: '100%',
        fontFamily: "'DM Sans', sans-serif",
        background: '#FFFFFF',
      }}
    >
      <SpecBadge label="Button Group" />

      {/* Exact match to btn-group-all.png with violet dashed border */}
      <SpecBlock title="Button Group — Icon + Label">
        <SizeRows iconOnly={false} title="Icon + Label" />
      </SpecBlock>

      {/* Exact match to btn-group-icon-all.png with violet dashed border */}
      <SpecBlock title="Button Group — Icon Only">
        <SizeRows iconOnly={true} title="Icon Only" />
      </SpecBlock>

      {/* Exact match to btn-group-2 / 3 / 4 .png with violet dashed border */}
      <SpecBlock title="Button Group — Item Count Examples">
        <div
          style={{
            width: '100%',
            border: '2px dashed #C084FC',
            borderRadius: 8,
            background: '#FFFFFF',
            padding: 20,
          }}
        >
          <div style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#7C3AED',
            marginBottom: 16,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '0.5px',
          }}>
            Item Count Examples
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[2, 3, 4].map((count) => (
              <div key={count}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#6B7280', marginBottom: 10 }}>
                  {count} Items
                </div>
                <ButtonGroup itemCount={count} state="default" size="m" showIcon={true} iconOnly={false} />
              </div>
            ))}
          </div>
        </div>
      </SpecBlock>
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

export default function ButtonGroupPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <ButtonGroupDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
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