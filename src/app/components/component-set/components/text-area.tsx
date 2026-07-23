import React, { useState } from 'react';
import Image from 'next/image';
import textAreaSpecImage from '../../../../assets/images/textarea/text-area-all.png';

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
   Base Textarea component
============================================================ */
function Textarea({
  label = 'Label (Optional)',
  size = 'm',
  stateKey = 'default',
  value = '',
  placeholder = 'Placeholder',
  maxLength = 100,
  onChange,
  helpText,
  helpColor,
  width,
  rows = 3,
  isReadOnly = false,
}) {
  const TEXTAREA_STATE_STYLES = {
    default: { bg: '#FFFFFF', border: '#C9CFDA', text: '#151A24', label: '#3D4759' },
    hover: { bg: '#F5F5F4', border: '#C9CFDA', text: '#151A24', label: '#3D4759' },
    active: { bg: '#E9EEFC', border: '#0B1F4D', text: '#151A24', label: '#3D4759' },
    filled: { bg: '#FFFFFF', border: '#C9CFDA', text: '#151A24', label: '#3D4759' },
    readonly: { bg: '#F5F5F4', border: '#E4E2DD', text: '#151A24', label: '#3D4759' },
    disabled: { bg: '#F5F5F4', border: '#E4E2DD', text: '#B5B9C2', label: '#B5B9C2', opacity: 0.7 },
  };

  const TEXTAREA_SIZE_STYLES = {
    s: { padding: '8px 12px', fontSize: 12, labelSize: 12, height: 80, width: 280 },
    m: { padding: '10px 14px', fontSize: 13, labelSize: 12, height: 112, width: 300 },
    l: { padding: '12px 16px', fontSize: 14, labelSize: 13, height: 144, width: 320 },
  };

  const s = TEXTAREA_STATE_STYLES[stateKey] ?? TEXTAREA_STATE_STYLES.default;
  const sz = TEXTAREA_SIZE_STYLES[size] ?? TEXTAREA_SIZE_STYLES.m;
  const isDisabled = stateKey === 'disabled';
  const isActive = stateKey === 'active';
  const isReadOnlyState = stateKey === 'readonly';
  
  const borderWidth = isActive ? 2 : 1.5;
  const borderColor = isActive ? '#0B1F4D' : s.border;
  const charCount = value?.length || 0;

  const defaultHelpText = helpText || (isDisabled ? '' : '');
  const defaultHelpColor = helpColor || (isDisabled ? '#B5B9C2' : '#8089A0');

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 6, 
      width: width ?? sz.width, 
      opacity: s.opacity ?? 1 
    }}>
      <label style={{ 
        fontSize: sz.labelSize, 
        fontWeight: 700, 
        color: s.label, 
        fontFamily: "'DM Sans', sans-serif" 
      }}>
        {isReadOnlyState ? 'Label' : label}
      </label>
      
      <textarea
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        readOnly={isReadOnlyState}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: '100%',
          minHeight: sz.height,
          padding: sz.padding,
          fontSize: sz.fontSize,
          fontFamily: "'DM Sans', sans-serif",
          borderRadius: '6px 6px 2px 2px',
          background: (isReadOnlyState || isDisabled) ? '#F5F5F4' : s.bg,
          borderTop: `1px solid ${(isReadOnlyState || isDisabled) ? '#F5F5F4' : s.bg}`,
          borderLeft: `1px solid ${(isReadOnlyState || isDisabled) ? '#F5F5F4' : s.bg}`,
          borderRight: `1px solid ${(isReadOnlyState || isDisabled) ? '#F5F5F4' : s.bg}`,
          borderBottom: `${borderWidth}px solid ${borderColor}`,
          color: value ? s.text : '#9AA3B2',
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.15s ease',
          boxSizing: 'border-box',
          cursor: isReadOnlyState ? 'default' : 'text',
        }}
      />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: 12, 
        color: defaultHelpColor,
        fontFamily: "'DM Sans', sans-serif",
        marginTop: 2,
      }}>
        <span>{defaultHelpText}</span>
        {!isReadOnlyState && !isDisabled && <span style={{ fontFamily: 'monospace' }}>{charCount}/{maxLength}</span>}
      </div>
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function TextAreaDemo() {
  const [state, setState] = useState('default');
  const [value, setValue] = useState('');

  const STATE_STYLES = {
    default: { bg: '#FFFFFF', border: '#C9CFDA', label: '#3D4759' },
    hover: { bg: '#F5F5F4', border: '#C9CFDA', label: '#3D4759' },
    active: { bg: '#E9EEFC', border: '#0B1F4D', label: '#3D4759' },
    filled: { bg: '#FFFFFF', border: '#C9CFDA', label: '#3D4759' },
    readonly: { bg: '#F5F5F4', border: '#E4E2DD', label: '#3D4759' },
    disabled: { bg: '#F5F5F4', border: '#E4E2DD', label: '#B5B9C2', opacity: 0.7 },
  };

  const helpTextMap = {
    default: '',
    hover: '',
    active: '1',
    filled: '',
    readonly: 'Legend',
    disabled: '',
  };

  const helpColorMap = {
    default: '#8089A0',
    hover: '#8089A0',
    active: '#8089A0',
    filled: '#8089A0',
    readonly: '#8089A0',
    disabled: '#B5B9C2',
  };

  const getPlaceholder = () => {
    if (state === 'filled') return '';
    if (state === 'readonly') return '';
    if (state === 'active') return '';
    return 'Placeholder';
  };

  const getValue = () => {
    if (state === 'filled') return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.';
    if (state === 'readonly') return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.';
    if (state === 'active') return '1';
    return value;
  };

  const getLabel = () => {
    if (state === 'readonly') return 'Label';
    return 'Label (Optional)';
  };

  const currentStyle = STATE_STYLES[state];
  const borderWidth = state === 'active' ? 2 : 1.5;
  const borderColor = currentStyle.border;
  const isDisabled = state === 'disabled';
  const isReadOnly = state === 'readonly';
  const charCount = getValue()?.length || 0;

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 340 }}>
          <label style={{ 
            fontSize: 12, 
            fontWeight: 700, 
            color: currentStyle.label, 
            fontFamily: "'DM Sans', sans-serif",
            opacity: currentStyle.opacity ?? 1,
          }}>
            {getLabel()}
          </label>
          
          <textarea
            value={getValue()}
            onChange={(e) => setValue(e.target.value)}
            disabled={isDisabled}
            readOnly={isReadOnly}
            placeholder={getPlaceholder()}
            rows={4}
            style={{
              width: '100%',
              minHeight: 112,
              padding: '10px 14px',
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: '6px 6px 2px 2px',
              background: (isReadOnly || isDisabled) ? '#F5F5F4' : currentStyle.bg,
              borderTop: `1px solid ${(isReadOnly || isDisabled) ? '#F5F5F4' : currentStyle.bg}`,
              borderLeft: `1px solid ${(isReadOnly || isDisabled) ? '#F5F5F4' : currentStyle.bg}`,
              borderRight: `1px solid ${(isReadOnly || isDisabled) ? '#F5F5F4' : currentStyle.bg}`,
              borderBottom: `${borderWidth}px solid ${borderColor}`,
              color: getValue() ? '#151A24' : '#9AA3B2',
              resize: 'vertical',
              outline: 'none',
              transition: 'border-color 0.15s ease',
              boxSizing: 'border-box',
              opacity: currentStyle.opacity ?? 1,
            }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-start', 
            gap: 16,
            fontSize: 12, 
            color: helpColorMap[state],
            fontFamily: "'DM Sans', sans-serif",
            marginTop: 2,
          }}>
            <span>{helpTextMap[state]}</span>
            {!isReadOnly && !isDisabled && <span style={{ fontFamily: 'monospace' }}>{charCount}/100</span>}
          </div>
        </div>
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>STATE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['default', 'hover', 'active', 'filled', 'readonly', 'disabled'].map((s) => (
              <PropChip key={s} active={state === s} onClick={() => {
                setState(s);
              }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC - Using the image directly with fixed size
============================================================ */
export function TextAreaSpec() {
  return (
    <div style={{ 
      padding: 24, 
      overflowY: 'auto', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image 
        src={textAreaSpecImage} 
        alt="Text Area Reference Spec"
        width={400}
        height={400}
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        priority
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

export default function TextAreaPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <TextAreaDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <TextAreaSpec />
          </div>
        </div>
      </div>
    </div>
  );
}