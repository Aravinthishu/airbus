'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import checkboxAllImage from '../../../../assets/images/checkbox/checkbox-all.png';
import checkboxSizeImage from '../../../../assets/images/checkbox/checkbox-size.png';

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
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1,
        color: '#8089A0',
        marginBottom: 12,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {label.toUpperCase()}
    </div>
  );
}

/* ============================================================
   Checkbox Component
============================================================ */
function Checkbox({
  size = 'm',
  state = 'unselected',
  interaction = 'default',
  label = 'Label',
  onClick,
}) {
  const dim = size === 'l' ? 28 : 22;
  const borderRadius = size === 'l' ? 8 : 6;
  const fontSize = size === 'l' ? 14 : 12;
  
  // Determine if checkbox is checked
  const isChecked = state === 'selected' || state === 'indeterminate';
  const isDisabled = interaction === 'disabled';
  
  // Get border color based on interaction and state
  const getBorderColor = () => {
    if (isChecked) return 'none';
    if (isDisabled) return '#D8D4CC';
    if (interaction === 'hover') return '#002F7B';
    if (interaction === 'focus') return '#0B1F4D';
    return '#D8D4CC'; // default
  };

  // Get background color
  const getBackground = () => {
    if (isChecked) return '#0B1F4D';
    if (isDisabled && !isChecked) return '#F5F5F4';
    return 'transparent';
  };

  // Get box shadow for focus
  const getBoxShadow = () => {
    if (interaction === 'focus') {
      return '0 0 0 3px rgba(11,31,77,0.25)';
    }
    return 'none';
  };

  // Get opacity for disabled
  const getOpacity = () => {
    if (isDisabled) return 0.6;
    return 1;
  };

  // Determine what to show inside checkbox
  const getContent = () => {
    if (state === 'selected') return '✓';
    if (state === 'indeterminate') return '–';
    return '';
  };

  const borderColor = getBorderColor();
  const background = getBackground();
  const boxShadow = getBoxShadow();
  const opacity = getOpacity();

  return (
    <div
      onClick={!isDisabled ? onClick : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: opacity,
      }}
    >
      <div
        style={{
          width: dim,
          height: dim,
          borderRadius: borderRadius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: borderColor !== 'none' ? `2px solid ${borderColor}` : 'none',
          background: background,
          boxShadow: boxShadow,
          color: isChecked ? '#FFFFFF' : 'transparent',
          fontSize: fontSize,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          transition: 'all 0.15s ease',
        }}
      >
        {getContent()}
      </div>
      <span
        style={{
          fontSize: size === 'l' ? 15 : 13,
          color: isDisabled ? '#B5B9C2' : '#151A24',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function CheckboxDemo() {
  const [size, setSize] = useState('m');
  const [state, setState] = useState('unselected');
  const [interaction, setInteraction] = useState('default');

  const stateOptions = ['unselected', 'selected', 'indeterminate'];
  const stateLabels = ['Unselected', 'Selected', 'Indeterminate'];
  
  const interactionOptions = ['default', 'hover', 'focus', 'disabled'];
  const interactionLabels = ['Default', 'Hover', 'Focus', 'Disabled'];

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
            'repeating-linear-gradient(0deg, rgba(11,31,77,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(11,31,77,0.03) 0 1px, transparent 1px 24px)',
        }}
      >
        <Checkbox
          size={size}
          state={state}
          interaction={interaction}
          label="Label"
        />
      </div>

      <div
        style={{
          padding: 20,
          borderTop: '1px solid #EFEDE8',
          overflowY: 'auto',
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            STATE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {stateOptions.map((s, index) => (
              <PropChip
                key={s}
                active={state === s}
                onClick={() => setState(s)}
              >
                {stateLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            INTERACTION
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {interactionOptions.map((s, index) => (
              <PropChip
                key={s}
                active={interaction === s}
                onClick={() => setInteraction(s)}
              >
                {interactionLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            SIZE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['m', 'l'].map((s) => (
              <PropChip
                key={s}
                active={size === s}
                onClick={() => setSize(s)}
              >
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
   REFERENCE SPEC - Using images directly
============================================================ */
export function CheckboxSpec() {
  return (
    <div
      style={{
        padding: 24,
        overflowY: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <SpecBadge label="Checkbox" />

      {/* Checkbox All States Image */}
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
          States
        </div>
        <div
          style={{
            width: '100%',
            height: 300,
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
            src={checkboxAllImage}
            alt="Checkbox States"
            width={400}
            style={{
              objectFit: 'contain',
            }}
            priority
          />
        </div>
      </div>

      {/* Checkbox Sizes Image */}
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
          Sizes
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
            src={checkboxSizeImage}
            alt="Checkbox Sizes"
            width={250}
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
  maxWidth: 900,
  height: 560,
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function CheckboxPage() {
  return (
    <div
      style={{
        padding: 32,
        background: '#FAFAF8',
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: 900 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <CheckboxDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 900 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <CheckboxSpec />
          </div>
        </div>
      </div>
    </div>
  );
}