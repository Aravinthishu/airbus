'use client';
import React, { useState } from 'react';

/* ============================================================
   Design tokens — sampled from the uploaded reference images
============================================================ */
const T = {
  headerBg: '#EFF1F4',
  headerBgHover: '#E9EBEE',
  text: '#14171D',
  textMuted: '#5B6474',
  arrow: '#A9BEDD',
  arrowActive: '#2352A9',
  focusBorder: '#255FCC',
  resizeBar: '#00205B',
  iconNavy: '#063B9E',
  chipBg: '#ECECEC',
  progressTrack: '#E5E7EB',
  progressFill: '#3B67D6',
  checkboxBorder: '#2352A9',
  rowBorder: '#EDEDED',
  stripe: '#FAFAF8',
  violet: '#9747FF',
};

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

const SECTION_LABEL_STYLE = { fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" };

function FigmaFrame({ children, style }) {
  return (
    <div
      style={{
        border: `1.5px dashed ${T.violet}`,
        borderRadius: 4,
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
   Icons
============================================================ */
const ArrowDown = ({ color = T.arrow, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 3v9M8 12l-3.5-3.5M8 12l3.5-3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = ({ color = T.iconNavy, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Dots = ({ color = T.iconNavy, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 6 16" fill="none">
    <circle cx="3" cy="2.5" r="1.6" fill={color} />
    <circle cx="3" cy="8" r="1.6" fill={color} />
    <circle cx="3" cy="13.5" r="1.6" fill={color} />
  </svg>
);

const Home = ({ color = T.iconNavy, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 11.5 12 4l8 7.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M6 10.2V19a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-8.8" fill={color} />
  </svg>
);

const CheckboxIcon = ({ checked = false, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="3" stroke={T.checkboxBorder} strokeWidth="1.4" fill={checked ? T.checkboxBorder : '#FFFFFF'} />
    {checked && <path d="M4 8.2l2.4 2.4L12 5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
  </svg>
);

/* ============================================================
   HeaderCell — with proper states (removed sorting only)
============================================================ */
function HeaderCell({
  label = 'Label',
  align = 'left',
  state = 'default',
  height = 42,
  onMouseEnter,
  onMouseLeave,
}) {
  const isHover = state === 'hover' || state === 'hover-resize';
  const isFocus = state === 'focus';
  const isNonSorting = state === 'non-sorting';
  const showResize = state === 'hover-resize';

  const justify = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: justify,
        gap: 6,
        height,
        padding: '0 16px',
        background: isHover ? T.headerBgHover : T.headerBg,
        border: isFocus ? `1.5px solid ${T.focusBorder}` : '1px solid transparent',
        borderBottom: isFocus ? `1.5px solid ${T.focusBorder}` : '1px solid #D9DCE1',
        boxSizing: 'border-box',
        fontFamily: "'DM Sans', sans-serif",
        cursor: 'pointer',
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{label}</span>
      {!isNonSorting && <ArrowDown />}
      {showResize && (
        <div style={{ position: 'absolute', top: 0, right: 0, width: 3, height: '100%', background: T.resizeBar }} />
      )}
    </div>
  );
}

/* ============================================================
   Cell content types — fixed focus overlap
============================================================ */
function CellText({ text = 'Label', size = 'l', state = 'default' }) {
  const isHover = state === 'hover';
  const isActive = state === 'active';
  const isFocus = state === 'focus';
  const isDisabled = state === 'disabled';
  
  const bg = isHover ? T.headerBgHover : isActive ? '#E9EEFC' : isDisabled ? '#F5F5F4' : 'transparent';
  const border = isFocus ? `1.5px solid ${T.focusBorder}` : '1px solid transparent';
  const opacity = isDisabled ? 0.5 : 1;
  
  return (
    <span style={{ 
      fontSize: size === 'xl' ? 16 : 14, 
      color: T.text, 
      fontFamily: "'DM Sans', sans-serif",
      background: bg,
      border: border,
      padding: '4px 8px',
      borderRadius: 4,
      opacity: opacity,
      display: 'inline-block',
      transition: 'all 0.15s ease',
    }}>
      {text}
    </span>
  );
}

function CellNumeric({ value = '0123456789', size = 'l', state = 'default' }) {
  const isHover = state === 'hover';
  const isActive = state === 'active';
  const isFocus = state === 'focus';
  const isDisabled = state === 'disabled';
  
  const bg = isHover ? T.headerBgHover : isActive ? '#E9EEFC' : isDisabled ? '#F5F5F4' : 'transparent';
  const border = isFocus ? `1.5px solid ${T.focusBorder}` : '1px solid transparent';
  const opacity = isDisabled ? 0.5 : 1;
  
  return (
    <span style={{ 
      fontSize: size === 'xl' ? 16 : 14, 
      color: T.text, 
      fontFamily: "'DM Sans', sans-serif", 
      fontVariantNumeric: 'tabular-nums',
      background: bg,
      border: border,
      padding: '4px 8px',
      borderRadius: 4,
      opacity: opacity,
      display: 'inline-block',
      transition: 'all 0.15s ease',
    }}>
      {value}
    </span>
  );
}

function CellChip({ label = 'Label', size = 'l', state = 'default' }) {
  const isHover = state === 'hover';
  const isActive = state === 'active';
  const isFocus = state === 'focus';
  const isDisabled = state === 'disabled';
  
  const bg = isHover ? '#E8E8E8' : isActive ? '#DCE3F5' : isDisabled ? '#F0F0F0' : T.chipBg;
  const border = isFocus ? `1.5px solid ${T.focusBorder}` : '1px solid transparent';
  const opacity = isDisabled ? 0.5 : 1;
  
  return (
    <span style={{
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: 6,
      background: bg,
      borderRadius: 999,
      padding: size === 'xl' ? '6px 14px' : '4px 12px',
      fontSize: size === 'xl' ? 14 : 13, 
      fontWeight: 700, 
      color: T.text,
      fontFamily: "'DM Sans', sans-serif",
      border: border,
      opacity: opacity,
      transition: 'all 0.15s ease',
      whiteSpace: 'nowrap',
    }}>
      <Home size={size === 'xl' ? 14 : 12} />
      {label}
    </span>
  );
}

function CellProgress({ pct = 70, size = 'l', state = 'default' }) {
  const isHover = state === 'hover';
  const isActive = state === 'active';
  const isFocus = state === 'focus';
  const isDisabled = state === 'disabled';
  
  const bg = isHover ? T.headerBgHover : isActive ? '#E9EEFC' : isDisabled ? '#F5F5F4' : 'transparent';
  const border = isFocus ? `1.5px solid ${T.focusBorder}` : '1px solid transparent';
  const opacity = isDisabled ? 0.5 : 1;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 8, 
      fontFamily: "'DM Sans', sans-serif",
      background: bg,
      border: border,
      padding: '4px 8px',
      borderRadius: 4,
      opacity: opacity,
      transition: 'all 0.15s ease',
      minWidth: 120,
    }}>
      <span style={{ fontSize: size === 'xl' ? 14 : 13, color: T.text, width: 30, textAlign: 'right', flexShrink: 0 }}>{pct}%</span>
      <div style={{ width: size === 'xl' ? 100 : 80, height: 6, borderRadius: 999, background: T.progressTrack, overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: T.progressFill, borderRadius: 999 }} />
      </div>
    </div>
  );
}

function CellActionsMulti({ size = 'l', state = 'default' }) {
  const isHover = state === 'hover';
  const isActive = state === 'active';
  const isFocus = state === 'focus';
  const isDisabled = state === 'disabled';
  
  const bg = isHover ? T.headerBgHover : isActive ? '#E9EEFC' : isDisabled ? '#F5F5F4' : 'transparent';
  const border = isFocus ? `1.5px solid ${T.focusBorder}` : '1px solid transparent';
  const opacity = isDisabled ? 0.5 : 1;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 6,
      background: bg,
      border: border,
      padding: '4px 8px',
      borderRadius: 4,
      opacity: opacity,
      transition: 'all 0.15s ease',
    }}>
      <Home size={size === 'xl' ? 16 : 14} />
      <Dots size={size === 'xl' ? 16 : 14} />
      <ChevronDown size={size === 'xl' ? 16 : 14} />
    </div>
  );
}

function CellActionsSingle({ size = 'l', state = 'default' }) {
  const isHover = state === 'hover';
  const isActive = state === 'active';
  const isFocus = state === 'focus';
  const isDisabled = state === 'disabled';
  
  const bg = isHover ? T.headerBgHover : isActive ? '#E9EEFC' : isDisabled ? '#F5F5F4' : 'transparent';
  const border = isFocus ? `1.5px solid ${T.focusBorder}` : '1px solid transparent';
  const opacity = isDisabled ? 0.5 : 1;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      background: bg,
      border: border,
      padding: '4px 8px',
      borderRadius: 4,
      opacity: opacity,
      transition: 'all 0.15s ease',
    }}>
      <Dots size={size === 'xl' ? 16 : 14} />
    </div>
  );
}

function CellTextIcon({ label = 'Label', size = 'l', state = 'default' }) {
  const isHover = state === 'hover';
  const isActive = state === 'active';
  const isFocus = state === 'focus';
  const isDisabled = state === 'disabled';
  
  const bg = isHover ? T.headerBgHover : isActive ? '#E9EEFC' : isDisabled ? '#F5F5F4' : 'transparent';
  const border = isFocus ? `1.5px solid ${T.focusBorder}` : '1px solid transparent';
  const opacity = isDisabled ? 0.5 : 1;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 6,
      background: bg,
      border: border,
      padding: '4px 8px',
      borderRadius: 4,
      opacity: opacity,
      transition: 'all 0.15s ease',
    }}>
      <Home size={size === 'xl' ? 16 : 14} />
      <span style={{ fontSize: size === 'xl' ? 16 : 14, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
    </div>
  );
}

function CellCheckbox({ size = 'l', state = 'default' }) {
  const isHover = state === 'hover';
  const isActive = state === 'active';
  const isFocus = state === 'focus';
  const isDisabled = state === 'disabled';
  
  const bg = isHover ? T.headerBgHover : isActive ? '#E9EEFC' : isDisabled ? '#F5F5F4' : 'transparent';
  const border = isFocus ? `1.5px solid ${T.focusBorder}` : '1px solid transparent';
  const opacity = isDisabled ? 0.5 : 1;
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      background: bg,
      border: border,
      padding: '4px 8px',
      borderRadius: 4,
      opacity: opacity,
      transition: 'all 0.15s ease',
    }}>
      <CheckboxIcon size={size === 'xl' ? 19 : 17} />
    </div>
  );
}

const CONTENT_TYPES = [
  { key: 'text', label: 'Text', render: (s, st) => <CellText size={s} state={st} /> },
  { key: 'numeric', label: 'Numeric', render: (s, st) => <CellNumeric size={s} state={st} /> },
  { key: 'chip', label: 'Chip', render: (s, st) => <CellChip size={s} state={st} /> },
  { key: 'progress', label: 'Progress', render: (s, st) => <CellProgress size={s} state={st} /> },
  { key: 'actionsMulti', label: 'Several actions', render: (s, st) => <CellActionsMulti size={s} state={st} /> },
  { key: 'actionsSingle', label: 'Single action', render: (s, st) => <CellActionsSingle size={s} state={st} /> },
  { key: 'textIcon', label: 'Text & Icon', render: (s, st) => <CellTextIcon size={s} state={st} /> },
  { key: 'checkbox', label: 'Checkbox', render: (s, st) => <CellCheckbox size={s} state={st} /> },
];

/* ============================================================
   HEADERS ONLY PREVIEW
============================================================ */
function HeadersOnlyPreview({ size, align, forcedState }) {
  const height = size === 'xl' ? 52 : 42;

  const columns = [
    { label: 'Name', align },
    { label: 'Date', align: 'center' },
    { label: 'Amount', align: 'right' },
    { label: 'Status', align: 'left' },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 560, border: '1px solid #D9DCE1', borderRadius: 6, overflow: 'hidden' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.headerBg, borderBottom: '1px solid #D9DCE1' }}>
          <CheckboxIcon />
        </div>
        {columns.map((col, idx) => (
          <div key={idx} style={{ flex: 1 }}>
            <HeaderCell
              label={col.label}
              align={col.align}
              state={idx === 0 ? forcedState : 'default'}
              height={height}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   CELL CONTENT ONLY PREVIEW - ONE ROW, NO HEADERS
============================================================ */
function CellContentOnlyPreview({ size, contentType, state }) {
  const renderCount = 2;
  
  return (
    <div style={{ width: '100%', maxWidth: 480, border: '1px solid #D9DCE1', borderRadius: 6, overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: size === 'xl' ? '16px 16px' : '12px 16px',
          background: '#FFFFFF',
          minHeight: size === 'xl' ? 64 : 52,
          gap: 8,
        }}
      >
        <div style={{ width: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckboxIcon />
        </div>
        {Array.from({ length: renderCount }).map((_, idx) => (
          <div key={idx} style={{ flex: 1, padding: '0 4px', minWidth: 0 }}>
            {CONTENT_TYPES.find(ct => ct.key === contentType).render(size, state)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function DataTableDemo() {
  const [previewMode, setPreviewMode] = useState('headers');
  const [size, setSize] = useState('l');
  const [state, setState] = useState('default');
  const [align, setAlign] = useState('left');
  const [contentType, setContentType] = useState('text');

  // All header states except sorting
  const stateOptions = ['default', 'hover', 'hover-resize', 'focus'];
  const stateLabels = ['Default', 'Hover', 'Hover Resize', 'Focus'];
  
  const cellStateOptions = ['default', 'hover', 'active', 'focus', 'disabled'];
  const cellStateLabels = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'];

  const alignOptions = ['left', 'center', 'right'];
  const alignLabels = ['Left', 'Centre', 'Right'];

  const sizeOptions = ['l', 'xl'];
  const sizeLabels = ['L', 'XL'];

  const contentTypeOptions = CONTENT_TYPES.map((ct) => ct.key);
  const contentTypeLabels = CONTENT_TYPES.map((ct) => ct.label);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 235,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 32px',
          gap: 16,
          backgroundImage: `
            linear-gradient(rgba(200, 200, 200, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 200, 200, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
          Data Table — Live Preview
        </div>
        
        {previewMode === 'headers' ? (
          <HeadersOnlyPreview size={size} align={align} forcedState={state} />
        ) : (
          <CellContentOnlyPreview size={size} contentType={contentType} state={state} />
        )}
        
        <div style={{ fontSize: 11, color: '#A9AFBC', fontFamily: "'DM Sans', sans-serif" }}>
          {previewMode === 'headers' 
            ? 'Hover or focus the first column to preview states' 
            : 'Preview different cell content types with interactive states'}
        </div>
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={SECTION_LABEL_STYLE}>PREVIEW</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <PropChip active={previewMode === 'headers'} onClick={() => setPreviewMode('headers')}>
              Headers
            </PropChip>
            <PropChip active={previewMode === 'cellContent'} onClick={() => setPreviewMode('cellContent')}>
              Cell Content
            </PropChip>
          </div>
        </div>

        {previewMode === 'headers' ? (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={SECTION_LABEL_STYLE}>STATE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {stateOptions.map((s, index) => (
                  <PropChip key={s} active={state === s} onClick={() => setState(s)}>
                    {stateLabels[index]}
                  </PropChip>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={SECTION_LABEL_STYLE}>ALIGNMENT</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {alignOptions.map((a, index) => (
                  <PropChip key={a} active={align === a} onClick={() => setAlign(a)}>
                    {alignLabels[index]}
                  </PropChip>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={SECTION_LABEL_STYLE}>CELL STATE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cellStateOptions.map((s, index) => (
                  <PropChip key={s} active={state === s} onClick={() => setState(s)}>
                    {cellStateLabels[index]}
                  </PropChip>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={SECTION_LABEL_STYLE}>CONTENT TYPE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {contentTypeOptions.map((ct, index) => (
                  <PropChip key={ct} active={contentType === ct} onClick={() => setContentType(ct)}>
                    {contentTypeLabels[index]}
                  </PropChip>
                ))}
              </div>
            </div>
          </>
        )}

        <div>
          <div style={SECTION_LABEL_STYLE}>SIZE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {sizeOptions.map((s, index) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>
                {sizeLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — includes all states except sorting
============================================================ */
export function DataTableSpec() {
  const stateRows = [
    { key: 'default', label: 'Default', props: {} },
    { key: 'numeric', label: 'Numeric alignment', props: { align: 'right' } },
    { key: 'hover', label: 'Hover', props: { state: 'hover' } },
    { key: 'hover-resize', label: 'Hover resizing bar', props: { state: 'hover-resize' } },
    { key: 'focus', label: 'Focus', props: { state: 'focus' } },
    { key: 'centre', label: 'Centre', props: { align: 'center' } },
    { key: 'non-sorting', label: 'Non sorting', props: { state: 'non-sorting' } },
  ];

  const alignRows = ['left', 'center', 'right'];
  const alignLabels = ['Left', 'Centre', 'Right'];
  const sizeRows = ['xl', 'l'];
  const sizeLabels = ['XL', 'L'];
  const sizeHeights = { xl: 52, l: 42 };

  return (
    <div style={{ padding: 24, overflowY: 'auto', height: '100%', fontFamily: "'DM Sans', sans-serif", background: '#FFFFFF' }}>
      <SpecBadge label="Data Table" />

      {/* 1. Header cell states */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759' }}>Header Cell — States</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 130, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 26 }}>
            {stateRows.map((row) => (
              <div key={row.key} style={{ height: 42, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 12, color: '#6B7280', textAlign: 'right' }}>{row.label}</span>
              </div>
            ))}
          </div>
          <FigmaFrame>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              {stateRows.map((row) => (
                <div key={row.key} style={{ width: 200 }}>
                  <HeaderCell label="Label" {...row.props} />
                </div>
              ))}
            </div>
          </FigmaFrame>
        </div>
      </div>

      {/* 2. Header size & alignment */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759' }}>Header Cell — Size &amp; Alignment</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 32, flexShrink: 0, display: 'flex', flexDirection: 'column', paddingTop: 34 }}>
            {sizeRows.map((sz, i) => (
              <div
                key={sz}
                style={{
                  fontSize: 12,
                  color: '#6B7280',
                  height: sizeHeights[sz],
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: i < sizeRows.length - 1 ? 20 : 0,
                }}
              >
                {sizeLabels[i]}
              </div>
            ))}
          </div>
          <FigmaFrame>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', rowGap: 20, columnGap: 16, alignItems: 'center' }}>
              {alignLabels.map((l) => (
                <div key={l} style={{ fontSize: 12, color: '#6B7280' }}>{l}</div>
              ))}
              {sizeRows.map((sz) => (
                <React.Fragment key={sz}>
                  {alignRows.map((al) => (
                    <div
                      key={al}
                      style={{
                        borderLeft: al === 'left' ? `3px solid ${T.focusBorder}` : '3px solid transparent',
                        borderRight: al === 'right' ? `3px solid ${T.focusBorder}` : '3px solid transparent',
                      }}
                    >
                      <HeaderCell label="Label" align={al} height={sizeHeights[sz]} />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </FigmaFrame>
        </div>
      </div>

      {/* 3. Cell content types */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759' }}>Cell — Content Types</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 110, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 34 }}>
            {CONTENT_TYPES.map((ct) => (
              <div key={ct.key} style={{ fontSize: 12, color: '#6B7280', height: 24, display: 'flex', alignItems: 'center' }}>
                {ct.label}
              </div>
            ))}
          </div>
          <FigmaFrame>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', rowGap: 22, columnGap: 24, alignItems: 'center' }}>
              <div style={{ fontSize: 12, color: '#6B7280' }}>L</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>XL</div>
              {CONTENT_TYPES.map((ct) => (
                <React.Fragment key={ct.key}>
                  <div>{ct.render('l', 'default')}</div>
                  <div>{ct.render('xl', 'default')}</div>
                </React.Fragment>
              ))}
            </div>
          </FigmaFrame>
        </div>
      </div>

      {/* 4. Full example */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759' }}>Full Example</div>
        <FigmaFrame style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif" }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px 14px', textAlign: 'left', background: T.headerBg, borderBottom: '1px solid #C9CDD4', width: 40 }}>
                    <CheckboxIcon />
                  </th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', background: T.headerBg, borderBottom: '1px solid #C9CDD4', fontWeight: 700, color: T.text }}>
                    Name <ArrowDown size={12} />
                  </th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', background: T.headerBg, borderBottom: '1px solid #C9CDD4', fontWeight: 700, color: T.text }}>
                    Role <ArrowDown size={12} />
                  </th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', background: T.headerBg, borderBottom: '1px solid #C9CDD4', fontWeight: 700, color: T.text }}>
                    Department <ArrowDown size={12} />
                  </th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', background: T.headerBg, borderBottom: '1px solid #C9CDD4', fontWeight: 700, color: T.text }}>
                    ID <ArrowDown size={12} />
                  </th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', background: T.headerBg, borderBottom: '1px solid #C9CDD4', fontWeight: 700, color: T.text }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Doe', role: 'Designer', dept: 'Product', id: '001234' },
                  { name: 'Jane Smith', role: 'Engineer', dept: 'Engineering', id: '001235' },
                  { name: 'Mike Johnson', role: 'Manager', dept: 'Operations', id: '001236' },
                  { name: 'Sarah Williams', role: 'Analyst', dept: 'Finance', id: '001237' },
                  { name: 'David Brown', role: 'Developer', dept: 'Engineering', id: '001238' },
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? T.stripe : '#FFFFFF' }}>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${T.rowBorder}` }}>
                      <CheckboxIcon />
                    </td>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${T.rowBorder}`, color: T.text }}>{row.name}</td>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${T.rowBorder}`, color: T.text }}>{row.role}</td>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${T.rowBorder}`, color: T.text }}>{row.dept}</td>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${T.rowBorder}`, color: T.text, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{row.id}</td>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${T.rowBorder}`, textAlign: 'center' }}>
                      <Dots size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FigmaFrame>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE — equal-size preview / reference cards with same height
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

export default function DataTablePage() {
  return (
    <div style={{ padding: 32, background: '#F9FAFB', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <DataTableDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            REFERENCE SPEC
          </div>
          <div style={{ ...CARD_STYLE, height: 1100 }}>
            <DataTableSpec />
          </div>
        </div>
      </div>
    </div>
  );
}