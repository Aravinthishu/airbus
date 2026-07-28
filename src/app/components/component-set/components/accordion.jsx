'use client';
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
        padding: '4px 10px',
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        border: `1px solid ${active ? '#0B1F4D' : '#D8D4CC'}`,
        background: active ? '#0B1F4D' : '#FFFFFF',
        color: active ? '#FFFFFF' : '#4B5563',
        cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'all 0.15s ease',
      }}
    >
      {children}
    </button>
  );
}

function SpecBadge({ label }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
      {label.toUpperCase()}
    </div>
  );
}

/* Figma-inspect-style dashed violet frame used around every reference block */
function FigmaFrame({ children, style }) {
  return (
    <div
      style={{
        border: '2px dashed #C084FC',
        borderRadius: 8,
        background: '#FFFFFF',
        padding: '12px 16px',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Accordion Item component with proper states (no avatar)
============================================================ */
function AccordionItem({ 
  title = 'Item', 
  isOpen = false, 
  state = 'default', 
  onToggle, 
  showContent = true,
  isFirst = false,
}) {
  // State styles - only apply to first item
  const getStateStyles = () => {
    // Only apply state styles if this is the first item
    if (!isFirst) {
      return {
        bg: '#FFFFFF',
        color: '#0B1F4D',
        borderColor: '#D8D4CC',
        textColor: '#151A24',
        opacity: 1,
        borderWidth: '1px',
        headerBg: '#FFFFFF',
        contentBorder: 'none',
      };
    }

    if (state === 'disabled') {
      return {
        bg: '#F5F5F4',
        color: '#B5B9C2',
        borderColor: '#E4E2DD',
        textColor: '#B5B9C2',
        opacity: 0.6,
        borderWidth: '1px',
        headerBg: '#F5F5F4',
        contentBorder: 'none',
      };
    }
    if (state === 'hover') {
      return {
        bg: '#F5F5F4',
        color: '#0B1F4D',
        borderColor: '#D8D4CC',
        textColor: '#0B1F4D',
        opacity: 1,
        borderWidth: '1px',
        headerBg: '#F5F5F4',
        contentBorder: 'none',
      };
    }
    if (state === 'active') {
      return {
        bg: '#FFFFFF',
        color: '#0B1F4D',
        borderColor: '#D8D4CC',
        textColor: '#0B1F4D',
        opacity: 1,
        borderWidth: '1px',
        headerBg: '#FFFFFF',
        contentBorder: '2px dashed #9CA3AF',
      };
    }
    if (state === 'active-hover') {
      return {
        bg: '#FFFFFF',
        color: '#0B1F4D',
        borderColor: '#D8D4CC',
        textColor: '#0B1F4D',
        opacity: 1,
        borderWidth: '1px',
        headerBg: '#F5F5F4',
        contentBorder: '2px dashed #9CA3AF',
      };
    }
    // default
    return {
      bg: '#FFFFFF',
      color: '#0B1F4D',
      borderColor: '#D8D4CC',
      textColor: '#151A24',
      opacity: 1,
      borderWidth: '1px',
      headerBg: '#FFFFFF',
      contentBorder: 'none',
    };
  };

  const styles = getStateStyles();
  const isDisabled = state === 'disabled' && isFirst;

  // Check if we should show the dashed border content
  const showDashedContent = isFirst && (state === 'active' || state === 'active-hover') && isOpen && showContent;

  return (
    <div 
      style={{ 
        border: `${styles.borderWidth} solid ${styles.borderColor}`, 
        borderRadius: 6,
        overflow: 'hidden',
        background: styles.bg,
        opacity: styles.opacity,
        transition: 'all 0.15s ease',
      }}
    >
      <button
        type="button"
        onClick={!isDisabled ? onToggle : undefined}
        disabled={isDisabled}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          background: styles.headerBg,
          border: 'none',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          textAlign: 'left',
          fontFamily: "'DM Sans', sans-serif",
          transition: 'background 0.15s ease',
        }}
      >
        <span style={{ 
          fontSize: 12,
          fontWeight: 700, 
          color: styles.textColor,
        }}>
          {title}
        </span>
        <span style={{
          fontSize: 12,
          color: styles.color,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s ease',
        }}>▾</span>
      </button>
      {isOpen && showContent && (
        <div style={{ 
          padding: '0 14px 12px',
          fontSize: 12,
          color: '#3D4759', 
          lineHeight: 1.5,
          fontFamily: "'DM Sans', sans-serif",
          ...(showDashedContent ? {
            border: styles.contentBorder,
            borderRadius: 4,
            padding: '10px 14px',
            margin: '0 14px 14px',
          } : {})
        }}>
          {showDashedContent ? (
            <div>
              <div>Swap this container with text, images</div>
              <div>and/or other needed components</div>
            </div>
          ) : (
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Accordion component with multiple items (no avatars)
============================================================ */
function Accordion({ 
  items = [], 
  openIds = [], 
  onToggle, 
  state = 'default',
  showContent = true,
}) {
  return (
    <div style={{ 
      width: '100%', 
      maxWidth: 380,
      display: 'flex', 
      flexDirection: 'column', 
      gap: 6,
      fontFamily: "'DM Sans', sans-serif" 
    }}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIds.includes(item.id)}
          state={state}
          onToggle={() => onToggle(item.id)}
          showContent={showContent}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function AccordionDemo() {
  const [state, setState] = useState('default');
  const [openIds, setOpenIds] = useState(['1']);

  const stateOptions = ['default', 'hover', 'active', 'active-hover', 'disabled'];
  const stateLabels = ['Default', 'Hover', 'Active', 'Active Hover', 'Disabled'];

  const items = [
    { id: '1', title: 'Item' },
    { id: '2', title: 'Item' },
    { id: '3', title: 'Item' },
  ];

  const handleToggle = (id) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      return isOpen ? prev.filter((i) => i !== id) : [id];
    });
  };

  const currentStateLabel = stateLabels[stateOptions.indexOf(state)];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 430,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          gap: 6,
          backgroundImage: `
            linear-gradient(rgba(200, 200, 200, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 200, 200, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ fontSize: 10, fontWeight: 600, color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
          State: <span style={{ color: '#0B1F4D' }}>{currentStateLabel}</span>
        </div>
        <Accordion 
          items={items} 
          openIds={openIds} 
          onToggle={handleToggle} 
          state={state}
          showContent={true}
        />
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #EFEDE8', overflowY: 'auto', background: '#FFFFFF' }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
            STATE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
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
   REFERENCE SPEC
============================================================ */
export function AccordionSpec() {
  const stateOptions = ['default', 'hover', 'active', 'active-hover', 'disabled'];
  const stateLabels = ['Default', 'Hover', 'Active', 'Active Hover', 'Disabled'];

  const items = [
    { id: '1', title: 'Item' },
    { id: '2', title: 'Item' },
    { id: '3', title: 'Item' },
  ];

  // For accord-open.png - 7 items without avatars
  const sevenItems = Array.from({ length: 7 }, (_, i) => ({ 
    id: String(i + 1), 
    title: 'Item'
  }));

  return (
    <div
      style={{
        padding: 20,
        overflowY: 'auto',
        height: '100%',
        fontFamily: "'DM Sans', sans-serif",
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <SpecBadge label="Accordion" />

      {/* Accordion - Open State */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#3D4759',
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 4,
          }}
        >
          Accordion — Open
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ width: 50, flexShrink: 0, paddingTop: 10 }}>
            <div style={{ fontSize: 12, color: '#151A24' }}>Item</div>
          </div>
          <FigmaFrame>
            <Accordion 
              items={sevenItems} 
              openIds={['1', '2', '3', '4', '5', '6', '7']} 
              onToggle={() => {}} 
              state="default"
              showContent={false}
            />
          </FigmaFrame>
        </div>
      </div>

      {/* Accordion - States */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#3D4759',
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 4,
          }}
        >
          Accordion — States
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ 
            width: 50,
            flexShrink: 0, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
          }}>
            {stateLabels.map((label, index) => (
              <div 
                key={label}
                style={{ 
                  fontSize: 12,
                  fontWeight: 600, 
                  color: '#6B7280', 
                  fontFamily: "'DM Sans', sans-serif",
                  paddingTop: 10,
                  marginBottom: index < stateLabels.length - 1 ? 16 : 0,
                  minHeight: (stateOptions[index] === 'active' || stateOptions[index] === 'active-hover') ? 80 : 0,
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <FigmaFrame>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {stateOptions.map((state) => (
                <Accordion 
                  key={state}
                  items={[{ 
                    id: '1', 
                    title: 'Item'
                  }]} 
                  openIds={['1']} 
                  onToggle={() => {}} 
                  state={state}
                  showContent={true}
                />
              ))}
            </div>
          </FigmaFrame>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE — equal-size preview / reference cards with same height
============================================================ */
const CARD_STYLE = {
  width: '100%',
  maxWidth: 1000,
  height: 480,
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function AccordionPage() {
  return (
    <div style={{ padding: 24, background: '#F9FAFB', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1000 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <AccordionDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1000 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <AccordionSpec />
          </div>
        </div>
      </div>
    </div>
  );
}