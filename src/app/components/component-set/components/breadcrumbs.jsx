import React, { useState } from 'react';
import Image from 'next/image';
import breadcrumbsImage from '../../../../assets/images/breadcrumbs/breadcrumbs.png';
import breadcrumbsLevelImage from '../../../../assets/images/breadcrumbs/breadcrumbs-level.png';

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

/* ============================================================
   Base Breadcrumbs component
============================================================ */
function Breadcrumbs({ 
  items = [], 
  state = 'default',
}) {
  // State styles
  const getStateStyles = () => {
    switch (state) {
      case 'hover':
        return {
          currentColor: '#255FCC',
          linkColor: '#255FCC',
          linkBg: '#F5F5F4',
          linkDecoration: 'none',
          linkPadding: '4px 8px',
          linkRadius: '4px',
        };
      case 'active':
        return {
          currentColor: '#255FCC',
          linkColor: '#255FCC',
          linkBg: '#E9EEFC',
          linkDecoration: 'none',
          linkPadding: '4px 8px',
          linkRadius: '4px',
        };
      case 'focus':
        return {
          currentColor: '#255FCC',
          linkColor: '#255FCC',
          linkBg: 'transparent',
          linkDecoration: 'none',
          linkPadding: '4px 8px',
          linkRadius: '4px',
          linkBorder: '2px solid #255FCC',
        };
      default:
        return {
          currentColor: '#0B1F4D',
          linkColor: '#6B7280',
          linkBg: 'transparent',
          linkDecoration: 'none',
          linkPadding: '4px 8px',
          linkRadius: '4px',
        };
    }
  };

  const styles = getStateStyles();

  return (
    <nav style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', fontFamily: "'DM Sans', sans-serif", gap: 4 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item} style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: isLast ? 700 : 500,
                color: isLast ? styles.currentColor : styles.linkColor,
                cursor: isLast ? 'default' : 'pointer',
                textDecoration: styles.linkDecoration,
                backgroundColor: isLast ? 'transparent' : styles.linkBg,
                padding: styles.linkPadding,
                borderRadius: styles.linkRadius,
                border: isLast ? 'none' : (styles.linkBorder || 'none'),
                outline: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {item}
            </span>
            {!isLast && (
              <span style={{ margin: '0 4px', fontSize: 13, color: '#B5B9C2' }}>/</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function BreadcrumbsDemo() {
  const [level, setLevel] = useState(4);
  const [state, setState] = useState('default');

  const getItems = () => {
    if (level === 3) {
      return ['Level1', 'Level2', 'Comment'];
    } else if (level === 4) {
      return ['Level1', 'Level2', 'Level3', 'Comment'];
    } else if (level === 5) {
      return ['Level1', '...', 'Level17', 'Comment'];
    }
    return ['Level1', 'Level2', 'Level3', 'Level4', 'Comment'];
  };

  const items = getItems();

  const levelOptions = [
    { value: 3, label: '3 levels' },
    { value: 4, label: '4 levels' },
    { value: 5, label: '+4 levels' },
  ];

  const stateOptions = ['default', 'hover', 'active', 'focus'];
  const stateLabels = ['Default', 'Hover', 'Active', 'Focus'];

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
          background: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Breadcrumbs 
            items={items} 
            state={state}
          />
        </div>
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto', background: '#FFFFFF' }}>
        <div style={{ marginBottom: 16 }}>
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
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            LEVELS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {levelOptions.map((opt) => (
              <PropChip key={opt.value} active={level === opt.value} onClick={() => setLevel(opt.value)}>
                {opt.label}
              </PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — Using images directly
============================================================ */
export function BreadcrumbsSpec() {
  return (
    <div
      style={{
        padding: 24,
        overflowY: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        fontFamily: "'DM Sans', sans-serif",
        background: '#FFFFFF',
      }}
    >
      <SpecBadge label="Breadcrumbs" />

      {/* Breadcrumbs States Image */}
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
          Breadcrumbs — States
        </div>
        <div
          style={{
            width: '100%',
            height: 250,
            position: 'relative',
            border: '1px solid #EFEDE8',
            borderRadius: 8,
            overflow: 'hidden',
            background: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={breadcrumbsImage}
            alt="Breadcrumbs States"
            width={500}
            style={{
              objectFit: 'contain',
            }}
            priority
          />
        </div>
      </div>

      {/* Breadcrumbs Levels Image */}
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
          Breadcrumbs — Levels
        </div>
        <div
          style={{
            width: '100%',
            height: 200,
            position: 'relative',
            border: '1px solid #EFEDE8',
            borderRadius: 8,
            overflow: 'hidden',
            background: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={breadcrumbsLevelImage}
            alt="Breadcrumbs Levels"
            width={500}
            style={{
              objectFit: 'contain',
            }}
            priority
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE — equal-size preview / reference cards
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

export default function BreadcrumbsPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <BreadcrumbsDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <BreadcrumbsSpec />
          </div>
        </div>
      </div>
    </div>
  );
}