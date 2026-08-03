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
      className="figma-frame"
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
        minHeight: isFirst && (state === 'active' || state === 'active-hover') && isOpen && showContent ? '110px' : 'auto',
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
          minHeight: 490,
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
   Fix: each state label now lives in the SAME flex row as its
   accordion, so the label always points at the correct item
   regardless of how tall that item's open/active content is.
   Previously the labels and accordions were two independent
   columns kept in sync only by hand-tuned min-heights, which
   drifted out of alignment whenever a row's real height
   differed from the guessed min-height.
============================================================ */
export function AccordionSpec() {
  const stateOptions = ['default', 'hover', 'active', 'active-hover', 'disabled'];
  const stateLabels = ['Default', 'Hover', 'Active', 'Active Hover', 'Disabled'];

  return (
    <div
      className="accordion-spec"
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

      {/* Accordion - States */}
      <div
        className="accordion-states"
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

        <FigmaFrame style={{ width: '100%', display: 'block' }}>
          <div
            className="accordion-rows"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {stateOptions.map((state, index) => (
              <div
                key={state}
                className="accordion-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  className="accordion-label"
                  style={{
                    width: 90,
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#6B7280',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {stateLabels[index]}
                </div>
                <div className="accordion-row-item" style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <Accordion
                    items={[{ id: '1', title: 'Item' }]}
                    openIds={['1']}
                    onToggle={() => {}}
                    state={state}
                    showContent={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </FigmaFrame>
      </div>

      <style>{`
        /* ONLY Mobile and Tablet - stack label above item, allow scroll */
        @media (max-width: 1024px) {
          .accordion-spec {
            padding: 16px !important;
            justify-content: flex-start !important;
          }
          .figma-frame {
            padding: 10px 12px !important;
            width: 100% !important;
            box-sizing: border-box;
          }
          .accordion-rows {
            gap: 14px !important;
          }
        }

        @media (max-width: 768px) {
          .accordion-spec {
            padding: 14px !important;
          }
          .figma-frame {
            padding: 8px 10px !important;
          }
          .accordion-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }
          .accordion-label {
            width: auto !important;
            font-size: 10px !important;
            font-weight: 700 !important;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            color: #8089A0 !important;
          }
          .accordion-row-item {
            width: 100% !important;
          }
        }

        @media (max-width: 400px) {
          .accordion-spec {
            padding: 10px !important;
          }
          .figma-frame {
            padding: 6px 8px !important;
          }
          .accordion-rows {
            gap: 12px !important;
          }
          .accordion-label {
            font-size: 9px !important;
          }
        }

        /* Desktop/Laptop */
        @media (min-width: 1025px) {
          .accordion-spec {
            justify-content: center !important;
          }
          .figma-frame {
            padding: 12px 16px !important;
          }
          .accordion-row {
            flex-direction: row !important;
            align-items: center !important;
          }
          .accordion-label {
            width: 90px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
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
      <style>{`
        @media (max-width: 1024px) {
          .accordion-page-wrap { gap: 20px !important; }
          .accordion-card { height: 460px !important; }
        }
        @media (max-width: 768px) {
          .accordion-page-wrap { gap: 16px !important; }
          .accordion-card { height: 560px !important; }
        }
        @media (max-width: 600px) {
          .accordion-page-wrap { gap: 14px !important; }
          .accordion-card { height: 600px !important; }
        }
        @media (max-width: 400px) {
          .accordion-page-wrap { gap: 12px !important; }
          .accordion-card { height: 600px !important; }
        }
        @media (min-width: 1025px) {
          .accordion-page-wrap { gap: 24px !important; }
          .accordion-card { height: 480px !important; }
        }
      `}</style>
      <div className="accordion-page-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1000 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={{ ...CARD_STYLE }} className="accordion-card">
            <AccordionDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1000 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
            REFERENCE SPEC
          </div>
          <div style={{ ...CARD_STYLE }} className="accordion-card">
            <AccordionSpec />
          </div>
        </div>
      </div>
    </div>
  );
}