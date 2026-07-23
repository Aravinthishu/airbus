import React, { useState, useEffect, useRef } from 'react';

/* ============================================================
   Design tokens — sampled from the uploaded reference images
============================================================ */
const T = {
  text: '#14171D',
  textMuted: '#6B7280',
  navy: '#00205B',
  iconNavy: '#063B9E',
  border: '#F0EFEA',
  borderStrong: '#D8D4CC',
  focusRing: '#255FCC',
  disabledMuted: '#99A6BD',
  disabledMutedLight: '#C7CEDC',
  dot: '#B9C2CE',
  violet: '#9747FF',
};

const IMAGES = [
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&q=80&auto=format&fit=crop',
];

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
    <div style={{ border: `1.5px dashed ${T.violet}`, borderRadius: 4, background: '#FFFFFF', padding: 16, ...style }}>
      {children}
    </div>
  );
}

/* ============================================================
   Auto-hide Scrollbar Component
============================================================ */
function AutoHideScroll({ children, height }) {
  const [showScroll, setShowScroll] = useState(false);
  const timeoutRef = useRef(null);

  const handleScroll = () => {
    setShowScroll(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowScroll(false);
    }, 5000);
  };

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: height,
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: showScroll ? 'thin' : 'none',
        msOverflowStyle: showScroll ? 'auto' : 'none',
        position: 'relative',
      }}
    >
      <style>
        {`
          .auto-hide-scroll::-webkit-scrollbar {
            width: ${showScroll ? '6px' : '0px'};
            transition: width 0.3s ease;
          }
          .auto-hide-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .auto-hide-scroll::-webkit-scrollbar-thumb {
            background: ${showScroll ? '#C8C4BC' : 'transparent'};
            border-radius: 3px;
            transition: background 0.3s ease;
          }
          .auto-hide-scroll::-webkit-scrollbar-thumb:hover {
            background: '#A8A4A0';
          }
        `}
      </style>
      <div className="auto-hide-scroll" style={{ height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   Icons (smaller)
============================================================ */
const Bookmark = ({ color = T.iconNavy, size = 16, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4-7 4V4.5a1 1 0 0 1 1-1z" stroke={color} strokeWidth="1.7" strokeLinejoin="round" fill={filled ? color : 'none'} />
  </svg>
);
const Gear = ({ color = T.iconNavy, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.7" />
    <path d="M12 2.5v2.4M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7M18.4 18.4l-1.7-1.7M7.3 7.3 5.6 5.6" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const SearchPlus = ({ color = T.iconNavy, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="10.5" cy="10.5" r="7" stroke={color} strokeWidth="1.7" />
    <path d="M10.5 7.5v6M7.5 10.5h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20.5 20.5 16 16" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const CirclePlus = ({ color = T.iconNavy, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.7" />
    <path d="M12 8.5v7M8.5 12h7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const ExpandIcon = ({ color = T.iconNavy, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const QuestionCircle = ({ color = T.iconNavy, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.7" />
    <path d="M9.8 9.3a2.2 2.2 0 1 1 3.4 1.8c-.9.6-1.2 1-1.2 1.9" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="16.3" r="0.9" fill={color} />
  </svg>
);
const ArrowRight = ({ color = T.iconNavy, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12h15M13 6l6 6-6 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PlaneIcon = ({ color = '#FFFFFF', size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 12l-7-3-2-6-1.5.6L11.8 9 4 11l-1 2 6.6.7L11 20l1.6-.6 1-6.2 5.9 2.2z" fill={color} />
  </svg>
);
const SeatIcon = ({ color = T.iconNavy, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M7 4v9a2 2 0 0 0 2 2h6M7 4H5.5M17 4v11M6 20l1-4h10l1 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const RangeIcon = ({ color = T.iconNavy, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.6" />
    <circle cx="12" cy="12" r="3.2" stroke={color} strokeWidth="1.6" />
    <circle cx="12" cy="12" r="0.9" fill={color} />
  </svg>
);
const FuelIcon = ({ color = T.iconNavy, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="6" width="13" height="13" rx="1.5" stroke={color} strokeWidth="1.6" />
    <path d="M16.5 9.5H19a1.5 1.5 0 0 1 1.5 1.5v5.5a1.5 1.5 0 0 1-3 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M6.5 15.5h7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const SpeedIcon = ({ color = T.iconNavy, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 15.5a8.5 8.5 0 1 1 16 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M12 15.5 16 10" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="15.5" r="1.1" fill={color} />
  </svg>
);

const SPECS = [
  { Icon: SeatIcon, label: 'Pax max seating: 440' },
  { Icon: RangeIcon, label: 'Range: 15 000 Km' },
  { Icon: FuelIcon, label: 'Max fuel capacity: 139 090 L' },
  { Icon: SpeedIcon, label: 'Max cruise speed: 155 kts' },
];

/* ============================================================
   Shared image-with-dot-fade header
============================================================ */
function CardImage({ src, height = 120, dotFade = false, muted = false }) {
  return (
    <div style={{ position: 'relative', height, overflow: 'hidden' }}>
      <img
        src={src}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: muted ? 'grayscale(0.9)' : 'none', opacity: muted ? 0.55 : 1 }}
      />
      {dotFade && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '55%',
            backgroundImage: `radial-gradient(${T.dot} 1px, transparent 1.4px)`,
            backgroundSize: '7px 7px',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 85%)',
            maskImage: 'linear-gradient(to bottom, transparent, black 85%)',
            opacity: muted ? 0.3 : 0.55,
          }}
        />
      )}
    </div>
  );
}

/* ============================================================
   Button used inside cards
============================================================ */
function CardButton({ full = true, muted = false, label = 'Button' }) {
  return (
    <button
      style={{
        width: full ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '8px 14px',
        borderRadius: 6,
        border: 'none',
        background: muted ? T.disabledMuted : T.navy,
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif",
        cursor: muted ? 'not-allowed' : 'pointer',
      }}
    >
      <PlaneIcon /> {label}
    </button>
  );
}

/* ============================================================
   1) SpecCard — Smaller
============================================================ */
function SpecCard({ state = 'default', imageSrc = IMAGES[0], width = 240 }) {
  const disabled = state === 'disabled';
  const focus = state === 'focus';
  const hover = state === 'hover';
  const active = state === 'active';

  const shadow =
    active ? '0 8px 20px rgba(16,24,40,0.16)' :
    hover ? '0 6px 16px rgba(16,24,40,0.12)' :
    '0 2px 6px rgba(16,24,40,0.06)';

  return (
    <div
      style={{
        width: '100%',
        maxWidth: width,
        borderRadius: 10,
        overflow: 'hidden',
        background: '#FFFFFF',
        border: focus ? `2px solid ${T.focusRing}` : `1px solid ${T.border}`,
        boxShadow: disabled ? 'none' : shadow,
        fontFamily: "'DM Sans', sans-serif",
        transition: 'box-shadow .15s ease, border-color .15s ease',
      }}
    >
      <CardImage src={imageSrc} height={110} dotFade muted={disabled} />
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: disabled ? T.disabledMutedLight : T.text, marginBottom: 8 }}>
          Heading
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          {SPECS.map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <s.Icon color={disabled ? T.disabledMuted : T.iconNavy} size={14} />
              <span style={{ fontSize: 12, color: disabled ? T.disabledMuted : T.text }}>{s.label}</span>
            </div>
          ))}
        </div>
        <CardButton full muted={disabled} />
      </div>
    </div>
  );
}

/* ============================================================
   2) TextCard — Smaller
============================================================ */
function TextCard({ bottom = 'icons', buttonFull = true, width = 240 }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: width,
      borderRadius: 10,
      background: '#FFFFFF',
      border: `1px solid ${T.border}`,
      boxShadow: '0 2px 6px rgba(16,24,40,0.05)',
      padding: 14,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>Heading</div>
        <Bookmark size={16} />
      </div>
      <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.5, marginBottom: bottom === 'none' ? 0 : 12 }}>
        Lorem ipsum dolor sit lorem a amet, consectetur adipiscing elit, sed do eiusmod tempor.
      </div>

      {bottom === 'icons' && (
        <>
          <div style={{ borderTop: `1px solid ${T.border}`, marginBottom: 10 }} />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Gear size={16} /><SearchPlus size={16} /><CirclePlus size={16} /><ExpandIcon size={16} /><QuestionCircle size={16} />
          </div>
        </>
      )}
      {bottom === 'button' && (
        <div style={{ display: 'flex', justifyContent: buttonFull ? 'stretch' : 'flex-end' }}>
          <CardButton full={buttonFull} />
        </div>
      )}
    </div>
  );
}

function CustomPlaceholderCard({ width = 240, height = 70 }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: width,
      borderRadius: 10,
      background: '#FFFFFF',
      border: `1px solid ${T.border}`,
      boxShadow: '0 2px 6px rgba(16,24,40,0.05)',
      padding: 14,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        height,
        borderRadius: 6,
        border: `1px dashed ${T.borderStrong}`,
        background: '#FAFAF8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10,
      }}>
        <span style={{ fontSize: 11, color: '#A9B4C4', lineHeight: 1.4 }}>
          Swap this container with text, images and/or other needed components.
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   3) ImageCard — Smaller (No Clouds)
============================================================ */
function ImageCard({ imageStyle = 'full', bottom = 'none', imageSrc, width = 240 }) {
  const src = imageSrc ?? IMAGES[0];

  return (
    <div style={{
      width: '100%',
      maxWidth: width,
      borderRadius: 10,
      overflow: 'hidden',
      background: '#FFFFFF',
      border: `1px solid ${T.border}`,
      boxShadow: '0 2px 6px rgba(16,24,40,0.05)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <CardImage src={src} height={110} dotFade={imageStyle === 'fade'} />
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: bottom === 'custom' ? 10 : 4 }}>
          {bottom !== 'custom' && 'Heading'}
        </div>

        {bottom === 'without-button' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: T.textMuted }}>Lorem ipsum dolor sit lorem</span>
            <ArrowRight size={16} />
          </div>
        )}

        {bottom === 'with-button' && (
          <>
            <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.5, marginBottom: 10 }}>
              Lorem ipsum dolor sit lorem a amet, consectetur adipiscing elit.
            </div>
            <CardButton full={false} />
          </>
        )}

        {bottom === 'custom' && (
          <div style={{
            borderRadius: 6,
            border: `1px dashed ${T.borderStrong}`,
            background: '#FAFAF8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 10,
            minHeight: 50,
          }}>
            <span style={{ fontSize: 11, color: '#A9B4C4', lineHeight: 1.4 }}>
              Swap this container with text, images and/or other needed components.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function CardDemo() {
  const [cardType, setCardType] = useState('spec');
  const [state, setState] = useState('default');
  const [bottom, setBottom] = useState('icons');
  const [imageStyle, setImageStyle] = useState('full');
  const [imgBottom, setImgBottom] = useState('with-button');

  return (
    <AutoHideScroll height="100%">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', padding: '12px 16px' }}>
        <div
          style={{
            flex: '1 1 0',
            minHeight: 350,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            background:
              'repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)',
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {cardType === 'spec' && <SpecCard state={state} imageSrc={IMAGES[0]} width={280} />}
            {cardType === 'text' && <TextCard bottom={bottom} width={280} />}
            {cardType === 'image' && <ImageCard imageStyle={imageStyle} bottom={imgBottom} imageSrc={IMAGES[1]} width={280} />}
          </div>
        </div>

        <div style={{ 
          padding: '10px 12px', 
          borderTop: '1px solid #EFEDE8', 
          background: '#FFFFFF',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
              CARD TYPE
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              {['spec', 'text', 'image'].map((c) => (
                <PropChip key={c} active={cardType === c} onClick={() => setCardType(c)}>{c.charAt(0).toUpperCase() + c.slice(1)}</PropChip>
              ))}
            </div>
          </div>

          {cardType === 'spec' && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
                STATE
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
                {['default', 'hover', 'active', 'focus', 'disabled'].map((s) => (
                  <PropChip key={s} active={state === s} onClick={() => setState(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</PropChip>
                ))}
              </div>
            </div>
          )}

          {cardType === 'text' && (
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
                BOTTOM
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
                {['icons', 'button', 'none'].map((b) => (
                  <PropChip key={b} active={bottom === b} onClick={() => setBottom(b)}>{b.charAt(0).toUpperCase() + b.slice(1)}</PropChip>
                ))}
              </div>
            </div>
          )}

          {cardType === 'image' && (
            <>
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
                  IMAGE STYLE
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
                  {[['full', 'Full Image'], ['fade', 'Image on Top']].map(([k, l]) => (
                    <PropChip key={k} active={imageStyle === k} onClick={() => setImageStyle(k)}>{l}</PropChip>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
                  BOTTOM
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
                  {[['without-button', 'Without Button'], ['with-button', 'With Button'], ['custom', 'Custom']].map(([k, l]) => (
                    <PropChip key={k} active={imgBottom === k} onClick={() => setImgBottom(k)}>{l}</PropChip>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AutoHideScroll>
  );
}

/* ============================================================
   REFERENCE SPEC — Smaller cards (No Clouds)
============================================================ */
export function CardSpec() {
  const states = ['default', 'hover', 'active', 'focus', 'disabled'];
  const stateLabels = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];

  return (
    <AutoHideScroll height="100%">
      <div style={{ padding: 16, fontFamily: "'DM Sans', sans-serif", background: '#FFFFFF', minHeight: '100%' }}>
        <SpecBadge label="Card" />

        {/* 1. States */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', textAlign: 'center' }}>Card — States</div>
          <FigmaFrame>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
              {states.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <span style={{ width: 60, fontSize: 11, color: '#6B7280', textAlign: 'right' }}>{stateLabels[i]}</span>
                  <SpecCard state={s} imageSrc={IMAGES[0]} width={220} />
                </div>
              ))}
            </div>
          </FigmaFrame>
        </div>

        {/* 2. Bottom content variants */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', textAlign: 'center' }}>Card — Bottom Content</div>
          <FigmaFrame>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
              <div style={{ flex: '1 1 200px', minWidth: '160px', maxWidth: '280px' }}>
                <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6, textAlign: 'center' }}>Bottom Icons</div>
                <TextCard bottom="icons" width={220} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: '1 1 200px', minWidth: '160px', maxWidth: '280px' }}>
                <div style={{ fontSize: 11, color: '#6B7280', marginBottom: -4, textAlign: 'center' }}>Bottom Button</div>
                <TextCard bottom="button" buttonFull={false} width={220} />
                <TextCard bottom="button" buttonFull width={220} />
              </div>
              <div style={{ flex: '1 1 200px', minWidth: '160px', maxWidth: '280px' }}>
                <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 6, textAlign: 'center' }}>No Bottom</div>
                <TextCard bottom="none" width={220} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: '1 1 200px', minWidth: '160px', maxWidth: '280px' }}>
                <div style={{ fontSize: 11, color: '#6B7280', marginBottom: -4, textAlign: 'center' }}>Custom</div>
                <CustomPlaceholderCard width={200} height={60} />
                <CustomPlaceholderCard width={200} height={50} />
              </div>
            </div>
          </FigmaFrame>
        </div>

        {/* 3. Image position variants (No Clouds) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', textAlign: 'center' }}>Card — Image Position</div>
          <FigmaFrame>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              alignItems: 'start',
              justifyItems: 'center',
            }}>
              {['Full Image', 'Image on Top'].map((label, idx) => (
                <div key={label} style={{ width: '100%', maxWidth: '280px' }}>
                  <div style={{ fontSize: 11, color: '#6B7280', textAlign: 'center', marginBottom: 8 }}>{label}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                    <ImageCard imageStyle={idx === 0 ? 'full' : 'fade'} bottom="without-button" imageSrc={IMAGES[idx]} width={200} />
                    <ImageCard imageStyle={idx === 0 ? 'full' : 'fade'} bottom="with-button" imageSrc={IMAGES[idx + 2]} width={200} />
                    <ImageCard imageStyle={idx === 0 ? 'full' : 'fade'} bottom="custom" imageSrc={IMAGES[idx]} width={200} />
                  </div>
                </div>
              ))}
            </div>
          </FigmaFrame>
        </div>
      </div>
    </AutoHideScroll>
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

export default function CardPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <CardDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            REFERENCE SPEC
          </div>
          <div style={{ ...CARD_STYLE, height: 560 }}>
            <CardSpec />
          </div>
        </div>
      </div>
    </div>
  );
}