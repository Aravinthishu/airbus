import React, { useState } from 'react';

/* ============================================================
   Design tokens — sampled directly from the uploaded reference
   images (avatar.png / avatar-icon.png) so colors match exactly.
============================================================ */
const TOKENS = {
  circleBg: '#CED5DD',       // default/hover/active/disabled circle fill
  iconColor: '#063B9E',      // chatbot / placeholder icon fill
  textColor: '#00205B',      // initials text
  hoverBg: '#DCE3EA',        // slightly lighter than default on hover
  activeRing: '#E5ECF7',     // glow ring around an active avatar
  disabledIconColor: '#6A88BE',
  disabledTextColor: '#677B9C',
  hoverEditBg: '#294475',    // dark navy fill shown in the "hover edit" state
  hoverEditGhost: 'rgba(255,255,255,0.55)',
  pencilColor: '#FFFFFF',
  statusDot: '#08875B',
};

// Placeholder headshot — replace PHOTO_URL with your own asset when ready.
const PHOTO_URL = 'https://i.pravatar.cc/300?img=47';

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

function FigmaFrame({ children, style }) {
  return (
    <div
      style={{
        border: '2px dashed #C084FC',
        borderRadius: 8,
        background: '#FFFFFF',
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Icons — filled, flat style to match the reference (not outline)
============================================================ */
function PersonIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8.2" r="4" fill={color} />
      <path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5v1H4v-1z" fill={color} />
    </svg>
  );
}

function ChatbotIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* headband */}
      <path d="M6 10a6 6 0 0 1 12 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* ear cups */}
      <rect x="3.6" y="9.4" width="3" height="4.6" rx="1.4" fill={color} />
      <rect x="17.4" y="9.4" width="3" height="4.6" rx="1.4" fill={color} />
      {/* head */}
      <rect x="6.2" y="9" width="11.6" height="9.6" rx="4.6" fill={color} />
      {/* face (cut-outs) */}
      <circle cx="9.8" cy="13.6" r="1" fill="#FFFFFF" />
      <circle cx="14.2" cy="13.6" r="1" fill="#FFFFFF" />
      <path d="M9.6 16.2c.7.6 3.5.6 4.2 0" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function PencilIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 20l1-4.2L15.8 4.9a1.6 1.6 0 0 1 2.3 0l1 1a1.6 1.6 0 0 1 0 2.3L8.2 19 4 20z"
        fill={color}
      />
      <path d="M13.7 6.9 17.1 10.3" stroke="#294475" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================
   Avatar Component
============================================================ */
const AVATAR_SIZE_STYLES = {
  xs: { dim: 20, font: 9, icon: 10 },
  s: { dim: 28, font: 11, icon: 14 },
  m: { dim: 38, font: 13, icon: 19 },
  l: { dim: 48, font: 15, icon: 24 },
  xl: { dim: 62, font: 19, icon: 31 },
  xxl: { dim: 76, font: 22, icon: 38 },
};

function Avatar({
  initials = 'AS',
  size = 'm',
  state = 'default',
  variant = 'initials',
  photoUrl = PHOTO_URL,
  showStatusDot = false,
}) {
  const sz = AVATAR_SIZE_STYLES[size] ?? AVATAR_SIZE_STYLES.m;
  const isHoverEdit = state === 'hover-edit';
  const isDisabled = state === 'disabled';
  const isActive = state === 'active';
  const isHover = state === 'hover';

  // Background fill for icon/initials variants
  const circleBg = isHoverEdit ? TOKENS.hoverEditBg : isHover ? TOKENS.hoverBg : TOKENS.circleBg;

  const contentColor =
    isHoverEdit ? TOKENS.hoverEditGhost : isDisabled ? TOKENS.disabledIconColor : TOKENS.iconColor;

  const textColor =
    isHoverEdit ? TOKENS.hoverEditGhost : isDisabled ? TOKENS.disabledTextColor : TOKENS.textColor;

  const pencilSize = sz.dim * 0.85;

  const renderContent = () => {
    if (variant === 'image') {
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img
            src={photoUrl}
            alt={initials}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: isDisabled ? 'grayscale(0.85)' : 'none',
              opacity: isDisabled ? 0.55 : 1,
            }}
          />
          {isHoverEdit && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(41,68,117,0.82)',
              }}
            />
          )}
        </div>
      );
    }
    if (variant === 'chatbot') {
      return (
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: circleBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChatbotIcon color={contentColor} size={sz.icon} />
        </div>
      );
    }
    if (variant === 'placeholder') {
      return (
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: circleBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PersonIcon color={contentColor} size={sz.icon} />
        </div>
      );
    }
    // initials
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: circleBg,
          color: textColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: sz.font,
          fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {initials}
      </div>
    );
  };

  return (
    <div style={{ position: 'relative', width: sz.dim, height: sz.dim, display: 'inline-block' }}>
      <div
        style={{
          width: sz.dim,
          height: sz.dim,
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: isActive ? `0 0 0 4px ${TOKENS.activeRing}` : 'none',
          transition: 'box-shadow 0.15s ease, background 0.15s ease',
        }}
      >
        {renderContent()}
      </div>

      {/* large diagonal pencil overlay for hover-edit, matches every variant */}
      {isHoverEdit && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-4deg)',
            pointerEvents: 'none',
          }}
        >
          <PencilIcon color={TOKENS.pencilColor} size={pencilSize} />
        </div>
      )}

      {/* status dot, e.g. used alongside the size scale reference */}
      {showStatusDot && (
        <div
          style={{
            position: 'absolute',
            bottom: -1,
            right: -1,
            width: Math.max(7, sz.dim * 0.22),
            height: Math.max(7, sz.dim * 0.22),
            borderRadius: '50%',
            background: TOKENS.statusDot,
            border: '2px solid #FFFFFF',
          }}
        />
      )}
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function AvatarDemo() {
  const [state, setState] = useState('default');
  const [variant, setVariant] = useState('initials');

  const stateOptions = ['default', 'hover', 'hover-edit', 'active', 'disabled'];
  const stateLabels = ['Default', 'Hover', 'Hover edit', 'Active', 'Disabled'];

  const variantOptions = ['initials', 'image', 'chatbot', 'placeholder'];
  const variantLabels = ['Initials', 'Picture', 'Chatbot', 'Placeholder'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: 32,
          background:
            'repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)',
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 600, color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
          State: <span style={{ color: '#0B1F4D' }}>{stateLabels[stateOptions.indexOf(state)]}</span> • Variant: <span style={{ color: '#0B1F4D' }}>{variantLabels[variantOptions.indexOf(variant)]}</span>
        </div>
        <Avatar initials="AS" size="xl" state={state} variant={variant} />
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            VARIANT
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {variantOptions.map((v, index) => (
              <PropChip key={v} active={variant === v} onClick={() => setVariant(v)}>
                {variantLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
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
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — exact match to your uploaded images
============================================================ */
export function AvatarSpec() {
  const sizeRows = ['xxl', 'xl', 'l', 'm', 's', 'xs'];
  const sizeLabels = ['XXL', 'XL', 'L', 'M', 'S', 'XS'];

  const stateRows = [
    { key: 'default', label: 'Default' },
    { key: 'hover', label: 'Hover' },
    { key: 'hover-edit', label: 'Hover edit' },
    { key: 'active', label: 'Active' },
    { key: 'disabled', label: 'Disabled' },
  ];

  const variantRows = [
    { key: 'image', label: 'Picture' },
    { key: 'chatbot', label: 'Chatbot' },
    { key: 'placeholder', label: 'Placeholder' },
    { key: 'initials', label: 'Initials' },
  ];

  return (
    <div style={{ padding: 20, overflowY: 'auto', height: '100%', fontFamily: "'DM Sans', sans-serif", background: '#FFFFFF' }}>
      <SpecBadge label="Avatar" />

      {/* Sizes — matches avatar-icon.png - DECREASED WIDTH */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', fontFamily: "'DM Sans', sans-serif" }}>
          Avatar — Sizes
        </div>
        <FigmaFrame>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sizeRows.map((size, i) => (
              <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 28, fontSize: 10, color: '#6B7280', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                  {sizeLabels[i]}
                </span>
                <Avatar size={size} initials="AS" state="default" variant="initials" showStatusDot />
                <div style={{ display: 'flex', gap: 4 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Avatar key={j} size={size} initials="AS" state="default" variant="initials" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FigmaFrame>
      </div>

      {/* States × Variants — matches avatar.png - DECREASED WIDTH */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', fontFamily: "'DM Sans', sans-serif" }}>
          Avatar — States × Variants
        </div>
        <FigmaFrame>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '60px repeat(4, 1fr)', 
            rowGap: 16, 
            columnGap: 8, 
            alignItems: 'center',
            maxWidth: 440,
            margin: '0 auto',
          }}>
            <div />
            {variantRows.map((v) => (
              <div key={v.key} style={{ textAlign: 'center', fontSize: 10, color: '#6B7280', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                {v.label}
              </div>
            ))}
            {stateRows.map((state) => (
              <React.Fragment key={state.key}>
                <div style={{ fontSize: 10, color: '#6B7280', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{state.label}</div>
                {variantRows.map((v) => (
                  <div key={v.key} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar size="l" initials="AS" state={state.key} variant={v.key} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </FigmaFrame>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
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

export default function AvatarPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <AvatarDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            REFERENCE SPEC
          </div>
          <div style={{ ...CARD_STYLE, height: 620 }}>
            <AvatarSpec />
          </div>
        </div>
      </div>
    </div>
  );
}