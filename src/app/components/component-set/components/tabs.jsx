import React, { useState } from 'react';

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
   Base Tabs component with proper states
============================================================ */
function Tabs({ 
  items = [], 
  activeIndex = 0, 
  onChange, 
  state = 'default',
  size = 'm',
  showContent = true,
}) {
  const SIZE_STYLES = {
    m: { padding: '8px 16px', fontSize: 13 },
    l: { padding: '10px 20px', fontSize: 14 },
    xl: { padding: '12px 24px', fontSize: 15 },
  };
  const sz = SIZE_STYLES[size] ?? SIZE_STYLES.m;

  // State styles
  const getStateStyles = (isActive) => {
    if (state === 'disabled') {
      return {
        color: '#B5B9C2',
        borderColor: 'transparent',
        bg: 'transparent',
        opacity: 0.6,
      };
    }
    if (state === 'hover') {
      return {
        color: '#255FCC',
        borderColor: 'transparent',
        bg: '#F5F5F4',
      };
    }
    if (state === 'active') {
      return {
        color: '#255FCC',
        borderColor: '#255FCC',
        bg: '#E9EEFC',
      };
    }
    if (state === 'focus') {
      return {
        color: '#255FCC',
        borderColor: 'transparent',
        bg: 'transparent',
        boxShadow: '0 0 0 2px #0A67E8',
      };
    }
    // default
    return {
      color: isActive ? '#255FCC' : '#6B7280',
      borderColor: isActive ? '#255FCC' : 'transparent',
      bg: 'transparent',
    };
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #E4E2DD',
        fontFamily: "'DM Sans', sans-serif",
        gap: 0,
      }}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isDisabled = state === 'disabled';
          const styles = getStateStyles(isActive);

          return (
            <button
              key={item}
              type="button"
              onClick={() => !isDisabled && onChange(index)}
              disabled={isDisabled}
              style={{
                padding: sz.padding,
                fontSize: sz.fontSize,
                fontWeight: 600,
                background: styles.bg,
                color: styles.color,
                border: 'none',
                borderRadius: 0,
                borderBottom: `2px solid ${styles.borderColor}`,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                marginBottom: -1,
                boxShadow: styles.boxShadow || 'none',
                transition: 'all 0.15s ease',
                outline: 'none',
                opacity: styles.opacity || 1,
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      {showContent && (
        <div style={{ padding: '20px 4px', fontSize: 13, color: '#3D4759', fontFamily: "'DM Sans', sans-serif" }}>
          Content for <strong>{items[activeIndex]}</strong> goes here.
        </div>
      )}
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function TabsDemo() {
  const ITEMS = ['Item', 'Item', 'Item', 'Item'];
  const [activeIndex, setActiveIndex] = useState(0);
  const [state, setState] = useState('default');
  const [size, setSize] = useState('m');

  const stateOptions = ['default', 'hover', 'active', 'focus', 'disabled'];
  const stateLabels = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];
  const sizeOptions = ['m', 'l', 'xl'];

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
        <div style={{ width: 500 }}>
          <Tabs 
            items={ITEMS} 
            activeIndex={activeIndex} 
            onChange={setActiveIndex} 
            state={state}
            size={size}
            showContent={true}
          />
        </div>
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>STATE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {stateOptions.map((s, index) => (
              <PropChip key={s} active={state === s} onClick={() => setState(s)}>
                {stateLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>SIZE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {sizeOptions.map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>
                {s.toUpperCase()}
              </PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — Manual code matching your images exactly
   with violet dashed border like Figma
============================================================ */
export function TabsSpec() {
  const states = ['default', 'hover', 'active', 'focus', 'disabled'];
  const stateLabels = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];
  const sizes = ['m', 'l', 'xl'];
  const sizeLabels = ['M', 'L', 'XL'];
  const tabCounts = [3, 6];

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
      <SpecBadge label="Tabs" />

      {/* Tabs States - Single tab with different states */}
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
          Tabs — States
        </div>
        <div
          style={{
            width: '100%',
            border: '2px dashed #C084FC',
            borderRadius: 8,
            background: '#FFFFFF',
            padding: 20,
          }}
        >
          {states.map((state, stateIndex) => (
            <div key={state} style={{ marginBottom: stateIndex < states.length - 1 ? 24 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', width: 70, flexShrink: 0 }}>
                  {stateLabels[stateIndex]}
                </span>
                <div style={{ flex: 1 }}>
                  <Tabs 
                    items={['Item']} 
                    activeIndex={0} 
                    onChange={() => {}} 
                    state={state}
                    size="m"
                    showContent={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Sizes */}
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
          Tabs — Sizes
        </div>
        <div
          style={{
            width: '100%',
            border: '2px dashed #C084FC',
            borderRadius: 8,
            background: '#FFFFFF',
            padding: 20,
          }}
        >
          {sizes.map((size, sizeIndex) => (
            <div key={size} style={{ marginBottom: sizeIndex < sizes.length - 1 ? 24 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', width: 32, flexShrink: 0 }}>
                  {sizeLabels[sizeIndex]}
                </span>
                <div style={{ flex: 1 }}>
                  <Tabs 
                    items={['Item', 'Item', 'Item', 'Item']} 
                    activeIndex={1} 
                    onChange={() => {}} 
                    state="default"
                    size={size}
                    showContent={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Counts */}
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
          Tabs — Counts
        </div>
        <div
          style={{
            width: '100%',
            border: '2px dashed #C084FC',
            borderRadius: 8,
            background: '#FFFFFF',
            padding: 20,
          }}
        >
          {tabCounts.map((count) => (
            <div key={count} style={{ marginBottom: count === 3 ? 24 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', width: 70, flexShrink: 0 }}>
                  {count} tabs
                </span>
                <div style={{ flex: 1 }}>
                  <Tabs 
                    items={Array(count).fill('Item')} 
                    activeIndex={1} 
                    onChange={() => {}} 
                    state="default"
                    size="m"
                    showContent={false}
                  />
                </div>
              </div>
            </div>
          ))}
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

export default function TabsPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <TabsDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <TabsSpec />
          </div>
        </div>
      </div>
    </div>
  );
}