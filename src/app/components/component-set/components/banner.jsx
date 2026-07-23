import React, { useState } from 'react';

/* ============================================================
   Design tokens — sampled directly from the reference banner image
============================================================ */
const FONT = "'DM Sans', 'IBM Plex Sans', sans-serif";

const BANNER_STYLES = {
  info: {
    bg: '#2E58D8',
    text: '#FFFFFF',
    iconBg: '#FFFFFF',
    iconColor: '#2E58D8',
    icon: 'i',
    iconShape: 'circle',
    action: '#FFFFFF',
    close: '#FFFFFF',
  },
  success: {
    bg: '#0E9165',
    text: '#FFFFFF',
    iconBg: '#FFFFFF',
    iconColor: '#0E9165',
    icon: 'check',
    iconShape: 'circle',
    action: '#FFFFFF',
    close: '#FFFFFF',
  },
  warning: {
    bg: '#F5C518',
    text: '#14213D',
    iconBg: 'transparent',
    iconColor: '#14213D',
    icon: 'warning',
    iconShape: 'none',
    action: '#14213D',
    close: '#14213D',
  },
  error: {
    bg: '#DE1C36',
    text: '#FFFFFF',
    iconBg: '#FFFFFF',
    iconColor: '#DE1C36',
    icon: 'close',
    iconShape: 'circle',
    action: '#FFFFFF',
    close: '#FFFFFF',
  },
};

const DEFAULT_MESSAGES = {
  info: 'In order to give you a better service, Airbus uses cookies. By continuing to browse the site you are agreeing to use it.',
  success: 'Your message has been sent. We will come back to you as soon as possible.',
  warning: 'We are updating the platform. Your experience can be slower during the next hour.',
  error: 'No internet connection. You need to be online to perform this task.',
};

const DEFAULT_ACTIONS = {
  info: 'I agree',
  success: 'I agree',
  warning: 'I agree',
  error: 'Refresh',
};

/* ============================================================
   Icon glyphs (inline SVG so they render crisply at any size)
============================================================ */
function Glyph({ type, color, size = 12 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none' };
  if (type === 'i') {
    return (
      <svg {...common}>
        <rect x="11" y="10" width="2" height="8" rx="1" fill={color} />
        <rect x="11" y="6" width="2" height="2" rx="1" fill={color} />
      </svg>
    );
  }
  if (type === 'check') {
    return (
      <svg {...common}>
        <path d="M5 12.5L10 17L19 7" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'close') {
    return (
      <svg {...common}>
        <path d="M6 6L18 18M18 6L6 18" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'warning') {
    return (
      <svg viewBox="0 0 24 24" width={size + 4} height={size + 4} fill="none">
        <path d="M12 3L22 20H2L12 3Z" fill={color} />
        <rect x="11" y="9.5" width="2" height="5.5" rx="1" fill="#F5C518" />
        <rect x="11" y="16.2" width="2" height="2" rx="1" fill="#F5C518" />
      </svg>
    );
  }
  return null;
}

/* ============================================================
   Banner — single row, full-bleed, matches reference exactly
============================================================ */
function Banner({ variant = 'info', message, actionText, onAction, onClose, showIcon = true }) {
  const st = BANNER_STYLES[variant] ?? BANNER_STYLES.info;
  const msg = message || DEFAULT_MESSAGES[variant];
  const action = actionText || DEFAULT_ACTIONS[variant];

  return (
    <div
      className="banner-root"
      style={{ background: st.bg, fontFamily: FONT }}
      role="alert"
    >
      {showIcon && (
        <span
          className="banner-icon"
          style={{
            background: st.iconShape === 'circle' ? st.iconBg : 'transparent',
          }}
        >
          <Glyph type={st.icon} color={st.iconColor} size={st.iconShape === 'circle' ? 12 : 15} />
        </span>
      )}

      <span className="banner-message" style={{ color: st.text }}>
        {msg}
      </span>

      <span className="banner-controls">
        <button
          type="button"
          onClick={onAction}
          className="banner-action"
          style={{ color: st.action }}
        >
          {action}
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="banner-close"
          style={{ color: st.close }}
        >
          <Glyph type="close" color={st.close} size={13} />
        </button>
      </span>

      <style>{`
        .banner-root {
          display: flex;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          padding: 14px 24px;
          gap: 12px;
          border-radius: 2px;
        }
        .banner-icon {
          flex: 0 0 auto;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .banner-message {
          flex: 1 1 auto;
          font-size: 13.5px;
          font-weight: 700;
          line-height: 1.45;
          min-width: 0;
        }
        .banner-controls {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 18px;
          white-space: nowrap;
        }
        .banner-action {
          background: transparent;
          border: none;
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: underline;
          cursor: pointer;
          padding: 2px 0;
        }
        .banner-close {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
        }

        /* Tablet (768px - 1024px) */
        @media (max-width: 1024px) {
          .banner-root { padding: 14px 20px; gap: 12px; }
          .banner-message { font-size: 13px; }
          .banner-controls { gap: 16px; }
          .banner-action { font-size: 13px; }
        }

        /* Small Tablet (600px - 768px) */
        @media (max-width: 768px) {
          .banner-root { padding: 12px 18px; gap: 10px; }
          .banner-message { font-size: 12.5px; }
          .banner-controls { gap: 14px; }
          .banner-action { font-size: 12.5px; }
          .banner-icon { width: 20px; height: 20px; }
        }

        /* Mobile (320px - 600px) — stack message above the action row */
        @media (max-width: 600px) {
          .banner-root {
            flex-wrap: wrap;
            padding: 12px 14px;
            gap: 8px;
          }
          .banner-message {
            flex-basis: calc(100% - 32px);
            font-size: 12px;
            line-height: 1.4;
          }
          .banner-controls {
            flex-basis: 100%;
            justify-content: flex-end;
            margin-top: 4px;
            margin-left: 0;
            gap: 12px;
          }
          .banner-action {
            font-size: 12px;
          }
          .banner-icon {
            width: 18px;
            height: 18px;
          }
          .banner-close {
            padding: 2px;
          }
        }

        /* Extra Small Mobile (under 400px) */
        @media (max-width: 400px) {
          .banner-root {
            padding: 10px 12px;
          }
          .banner-message {
            font-size: 11px;
          }
          .banner-action {
            font-size: 11px;
          }
          .banner-controls {
            gap: 10px;
          }
          .banner-icon {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   LIVE PREVIEW — pick a variant, see it render full-bleed
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
        fontFamily: FONT,
      }}
    >
      {children}
    </button>
  );
}

export function BannerDemo() {
  const [variant, setVariant] = useState('info');
  const [visible, setVisible] = useState(true);
  const variants = ['info', 'success', 'warning', 'error'];
  const labels = ['Info', 'Success', 'Warning', 'Error'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background:
            'repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)',
        }}
      >
        {visible ? (
          <div style={{ width: '100%', maxWidth: 1100 }}>
            <Banner variant={variant} onClose={() => setVisible(false)} onAction={() => {}} />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setVisible(true)}
            style={{ fontSize: 12, color: '#0B1F4D', background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT }}
          >
            Show banner again
          </button>
        )}
      </div>

      <div style={{ padding: '16px 20px', borderTop: '1px solid #EFEDE8' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
          VARIANT
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {variants.map((v, i) => (
            <PropChip key={v} active={variant === v} onClick={() => { setVariant(v); setVisible(true); }}>
              {labels[i]}
            </PropChip>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — all four variants stacked with labels,
   laid out exactly like the uploaded reference image
============================================================ */
function SpecBadge({ label }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 16, fontFamily: FONT }}>
      {label.toUpperCase()}
    </div>
  );
}

export function BannerSpec() {
  const variants = ['info', 'success', 'warning', 'error'];
  const labels = ['Info', 'Success', 'Warning', 'Error'];

  return (
    <div style={{ padding: 24, overflowY: 'auto', height: '100%', fontFamily: FONT, background: '#FFFFFF' }}>
      <SpecBadge label="Banner" />
      <div
        style={{
          border: '2px dashed #C084FC',
          borderRadius: 8,
          padding: '20px 20px 20px 90px',
          position: 'relative',
        }}
      >
        {variants.map((v, i) => (
          <div key={v} style={{ position: 'relative', marginBottom: i === variants.length - 1 ? 0 : 14 }}>
            <span
              style={{
                position: 'absolute',
                left: -70,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 13,
                color: '#151A24',
                width: 60,
                fontFamily: FONT,
              }}
            >
              {labels[i]}
            </span>
            <Banner variant={v} onClose={() => {}} onAction={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   PAGE — live preview + reference spec, equal-size cards,
   themselves responsive across breakpoints
============================================================ */
const cardStyle = {
  width: '100%',
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function BannerPage() {
  return (
    <div style={{ padding: '32px 16px', background: '#FAFAF8', minHeight: '100vh', fontFamily: FONT }}>
      <style>{`
        .banner-page-wrap { display: flex; flex-direction: column; gap: 32px; align-items: center; }
        .banner-page-col { width: 100%; max-width: 1100px; }
        .banner-live-card { height: 460px; }
        .banner-spec-card { height: 420px; }

        @media (max-width: 1024px) {
          .banner-live-card { height: 440px; }
          .banner-spec-card { height: 400px; }
        }

        @media (max-width: 768px) {
          .banner-live-card { height: 420px; }
          .banner-spec-card { height: 380px; }
          .banner-page-wrap { gap: 24px; }
        }

        @media (max-width: 640px) {
          .banner-live-card { height: 380px; }
          .banner-spec-card { height: 480px; }
          .banner-page-wrap { gap: 20px; }
        }

        @media (max-width: 400px) {
          .banner-live-card { height: 360px; }
          .banner-spec-card { height: 440px; }
          .banner-page-wrap { gap: 16px; }
        }
      `}</style>
      <div className="banner-page-wrap">
        <div className="banner-page-col">
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>
            LIVE PREVIEW
          </div>
          <div style={{ ...cardStyle }} className="banner-live-card">
            <BannerDemo />
          </div>
        </div>

        <div className="banner-page-col">
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>
            REFERENCE SPEC
          </div>
          <div style={{ ...cardStyle }} className="banner-spec-card">
            <BannerSpec />
          </div>
        </div>
      </div>
    </div>
  );
}