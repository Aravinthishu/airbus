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
   Design tokens
============================================================ */
const VIOLET_DASH = '#C084FC';
const FONT = "'DM Sans', sans-serif";

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
        boxShadow: '0 0 0 2px #255FCC',
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
        fontFamily: FONT,
        gap: 0,
        width: '100%',
      }}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isDisabled = state === 'disabled';
          const styles = getStateStyles(isActive);

          return (
            <button
              key={item + index}
              type="button"
              onClick={() => !isDisabled && onChange(index)}
              disabled={isDisabled}
              style={{
                flex: 1, // This makes each tab take equal space
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
                whiteSpace: 'nowrap',
                textAlign: 'center', // Center the text
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      {showContent && (
        <div style={{ padding: '20px 4px', fontSize: 13, color: '#3D4759', fontFamily: FONT }}>
          Content for <strong>{items[activeIndex]}</strong> goes here.
        </div>
      )}
    </div>
  );
}

/* ============================================================
   LIVE DEMO - removed left side preview item
============================================================ */
export function TabsDemo() {
  const ITEMS = ['Item', 'Item', 'Item', 'Item'];
  const [activeIndex, setActiveIndex] = useState(0);
  const [state, setState] = useState('default');
  const [size, setSize] = useState('m');
  const [tabCount, setTabCount] = useState(4);

  const stateOptions = ['default', 'hover', 'active', 'focus', 'disabled'];
  const stateLabels = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];
  const sizeOptions = ['m', 'l', 'xl'];
  const countOptions = [2, 3, 4];

  // Get items based on tab count
  const getItems = () => {
    return Array(tabCount).fill('Item');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 330,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          background: '#FFFFFF',
          backgroundImage: `
  linear-gradient(rgba(200, 200, 200, 0.15) 1px, transparent 1px),
  linear-gradient(90deg, rgba(200, 200, 200, 0.15) 1px, transparent 1px)
`,
backgroundSize: '40px 40px',
backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ width: '100%', maxWidth: 600 }}>
          <Tabs
            items={getItems()}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            state={state}
            size={size}
            showContent={true}
          />
        </div>
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto', background: '#FFFFFF' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>STATE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {stateOptions.map((s, index) => (
              <PropChip key={s} active={state === s} onClick={() => setState(s)}>
                {stateLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>SIZE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {sizeOptions.map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>
                {s.toUpperCase()}
              </PropChip>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>TAB COUNT</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {countOptions.map((count) => (
              <PropChip key={count} active={tabCount === count} onClick={() => {
                setTabCount(count);
                setActiveIndex(Math.min(activeIndex, count - 1));
              }}>
                {count} tabs
              </PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Shared spec block — row label sits OUTSIDE the violet dashed
   box; the box hugs only the component column (no full-width
   stretch), matching the pattern used across the other spec
   pages (Checkbox / Date Picker / Breadcrumbs).
============================================================ */
function SpecBlock({ title, rows }) {
  const ROW_LABEL_WIDTH = 80;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759', fontFamily: FONT, marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ background: '#FFFFFF', padding: 24, borderRadius: 8 }}>
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `${ROW_LABEL_WIDTH}px max-content`,
            gridTemplateRows: `repeat(${rows.length}, auto)`,
            rowGap: 24,
            columnGap: 20,
          }}
        >
          {rows.map((row, rIdx) => (
            <React.Fragment key={row.label}>
              <div
                style={{
                  gridColumn: 1,
                  gridRow: rIdx + 1,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#6B7280',
                  fontFamily: FONT,
                }}
              >
                {row.label}
              </div>
              <div style={{ gridColumn: 2, gridRow: rIdx + 1, display: 'flex', alignItems: 'center' }}>
                {row.content}
              </div>
            </React.Fragment>
          ))}

          {/* violet dashed reference box — hugs only the component column */}
          <div
            style={{
              gridColumn: '2 / 3',
              gridRow: `1 / ${rows.length + 1}`,
              margin: '-10px -14px',
              border: `1.5px dashed ${VIOLET_DASH}`,
              borderRadius: 12,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC
============================================================ */
export function TabsSpec() {
  const states = ['default', 'hover', 'active', 'focus', 'disabled'];
  const stateLabels = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];
  const sizes = ['m', 'l', 'xl'];
  const sizeLabels = ['M', 'L', 'XL'];
  const tabCounts = [2, 3, 4];

  return (
    <div
      style={{
        padding: 24,
        overflowY: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        fontFamily: FONT,
        background: '#FFFFFF',
      }}
    >
      <SpecBadge label="Tabs" />

      <SpecBlock
        title="Tabs — States"
        rows={states.map((state, i) => ({
          label: stateLabels[i],
          content: <Tabs items={['Item']} activeIndex={0} onChange={() => {}} state={state} size="m" showContent={false} />,
        }))}
      />

      <SpecBlock
        title="Tabs — Sizes"
        rows={sizes.map((size, i) => ({
          label: sizeLabels[i],
          content: (
            <Tabs items={['Item', 'Item', 'Item', 'Item']} activeIndex={1} onChange={() => {}} state="default" size={size} showContent={false} />
          ),
        }))}
      />

      <SpecBlock
        title="Tabs — Counts"
        rows={tabCounts.map((count) => ({
          label: `${count} tabs`,
          content: (
            <Tabs items={Array(count).fill('Item')} activeIndex={1} onChange={() => {}} state="default" size="m" showContent={false} />
          ),
        }))}
      />
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
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <TabsDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
            REFERENCE SPEC
          </div>
          <div style={{ ...CARD_STYLE, height: 'auto', maxHeight: 900, overflowY: 'auto' }}>
            <TabsSpec />
          </div>
        </div>
      </div>
    </div>
  );
}