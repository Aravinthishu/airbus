import React, { useState } from 'react';

/* ============================================================
   Design tokens — sampled from the uploaded reference images
   (data-table-comp.png / -item.png / -size.png / -example.png)
============================================================ */
const T = {
  headerBg: '#EFF1F4',
  headerBgHover: '#E9EBEE',
  text: '#14171D',
  textMuted: '#5B6474',
  arrow: '#A9BEDD',       // inactive sort arrow
  arrowActive: '#2352A9', // active sort arrow + priority badge
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

// Figma-inspect-style dashed violet frame, matches the reference screenshots' own annotation border
function FigmaFrame({ children, style }) {
  return (
    <div
      style={{
        border: `1.5px dashed ${T.violet}`,
        borderRadius: 4,
        background: '#FFFFFF',
        padding: 20,
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
const ArrowUp = ({ color = T.arrowActive, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 13V4M8 4l-3.5 3.5M8 4l3.5 3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
const Plane = ({ color = T.iconNavy, size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M21 12l-7-3-2-6-1.5.6L11.8 9 4 11l-1 2 6.6.7L11 20l1.6-.6 1-6.2 5.9 2.2z" fill={color} />
  </svg>
);
const CheckboxIcon = ({ checked = false, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="3" stroke={T.checkboxBorder} strokeWidth="1.4" fill={checked ? T.checkboxBorder : '#FFFFFF'} />
    {checked && <path d="M4 8.2l2.4 2.4L12 5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
  </svg>
);

/* ============================================================
   HeaderCell — reproduces data-table-comp.png (8 states)
============================================================ */
function HeaderCell({
  label = 'Label',
  align = 'left',
  state = 'default',      // default | hover | hover-resize | focus | sorting | non-sorting
  sortDir = 'down',        // 'down' | 'up'
  priority = null,         // multi-sort index badge, e.g. 1
  height = 42,
}) {
  const isHover = state === 'hover' || state === 'hover-resize';
  const isFocus = state === 'focus';
  const isSorting = state === 'sorting';
  const isNonSorting = state === 'non-sorting';
  const showResize = state === 'hover-resize';

  const justify = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';

  return (
    <div
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
      }}
    >
      {align === 'right' && !isNonSorting && <ArrowDown color={isSorting ? T.arrowActive : T.arrow} />}
      <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{label}</span>
      {align !== 'right' && !isNonSorting && (
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          {isSorting ? <ArrowUp /> : <ArrowDown />}
          {priority && (
            <span style={{ position: 'absolute', top: -7, right: -8, fontSize: 9, fontWeight: 700, color: T.arrowActive }}>
              {priority}
            </span>
          )}
        </span>
      )}
      {showResize && (
        <div style={{ position: 'absolute', top: 0, right: 0, width: 3, height: '100%', background: T.resizeBar }} />
      )}
    </div>
  );
}

/* ============================================================
   Cell content types — reproduces data-table-item.png
============================================================ */
function CellText({ text = 'Label', size = 'l' }) {
  return <span style={{ fontSize: size === 'l' ? 14 : 13, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{text}</span>;
}
function CellNumeric({ value = '0123456789', size = 'l' }) {
  return <span style={{ fontSize: size === 'l' ? 14 : 13, color: T.text, fontFamily: "'DM Sans', sans-serif", fontVariantNumeric: 'tabular-nums' }}>{value}</span>;
}
function CellChip({ label = 'Label', size = 'l' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: T.chipBg, borderRadius: 999,
      padding: size === 'l' ? '6px 14px' : '4px 10px',
      fontSize: size === 'l' ? 13 : 12, fontWeight: 700, color: T.text,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Plane size={size === 'l' ? 14 : 12} />
      {label}
    </span>
  );
}
function CellProgress({ pct = 70, size = 'l' }) {
  const w = size === 'l' ? 140 : 110;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'DM Sans', sans-serif" }}>
      <span style={{ fontSize: size === 'l' ? 13 : 12, color: T.text, width: 30 }}>{pct}%</span>
      <div style={{ width: w, height: 6, borderRadius: 999, background: T.progressTrack, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: T.progressFill, borderRadius: 999 }} />
      </div>
    </div>
  );
}
function CellActionsMulti({ size = 'l' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Dots size={size === 'l' ? 15 : 13} />
      <ChevronDown size={size === 'l' ? 15 : 13} />
    </div>
  );
}
function CellActionsSingle({ size = 'l' }) {
  return <Dots size={size === 'l' ? 15 : 13} />;
}
function CellTextIcon({ label = 'Label', size = 'l' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Dots size={size === 'l' ? 15 : 13} />
      <span style={{ fontSize: size === 'l' ? 14 : 13, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
    </div>
  );
}
function CellCheckbox({ size = 'l' }) {
  return <CheckboxIcon size={size === 'l' ? 17 : 15} />;
}

const CONTENT_TYPES = [
  { key: 'text', label: 'Text', render: (s) => <CellText size={s} /> },
  { key: 'numeric', label: 'Numeric', render: (s) => <CellNumeric size={s} /> },
  { key: 'chip', label: 'Chip', render: (s) => <CellChip size={s} /> },
  { key: 'progress', label: 'Progress', render: (s) => <CellProgress size={s} /> },
  { key: 'actionsMulti', label: 'Several actions', render: (s) => <CellActionsMulti size={s} /> },
  { key: 'actionsSingle', label: 'Single action', render: (s) => <CellActionsSingle size={s} /> },
  { key: 'textIcon', label: 'Text & Icon', render: (s) => <CellTextIcon size={s} /> },
  { key: 'checkbox', label: 'Checkbox', render: (s) => <CellCheckbox size={s} /> },
];

/* ============================================================
   Full example table — reproduces data-table-example.png
============================================================ */
const EXAMPLE_ROWS = [
  { name: 'Label', role: 'Label', dept: 'Label', number: '0123456789', actions: 1 },
  { name: 'Label', role: 'Label', dept: 'Label', number: '0123456789', actions: 2 },
  { name: 'Label', role: 'Label', dept: 'Label', number: '0123456789', actions: 1 },
  { name: 'Label', role: 'Label', dept: 'Label', number: '0123456789', actions: 2 },
  { name: 'Label', role: 'Label', dept: 'Label', number: '0123456789', actions: 1 },
  { name: 'Label', role: 'Label', dept: 'Label', number: '0123456789', actions: 2 },
  { name: 'Label', role: 'Label', dept: 'Label', number: '0123456789', actions: 1 },
];

function FullExampleTable({ striped = true, size = 'l' }) {
  const [checkedAll, setCheckedAll] = useState(false);
  const pad = size === 'l' ? '14px 18px' : '9px 18px';
  const fontSize = size === 'l' ? 14 : 13;
  const th = {
    textAlign: 'left',
    padding: pad,
    background: T.headerBg,
    borderBottom: '1px solid #C9CDD4',
    fontFamily: "'DM Sans', sans-serif",
  };
  const td = {
    padding: pad,
    borderBottom: `1px solid ${T.rowBorder}`,
    fontFamily: "'DM Sans', sans-serif",
    fontSize,
    color: T.text,
  };
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ ...th, width: 44 }}>
            <CheckboxIcon checked={checkedAll} />
          </th>
          {['Label', 'Label', 'Label'].map((l, i) => (
            <th key={i} style={th}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: T.text }}>
                {l} <ArrowDown />
              </span>
            </th>
          ))}
          <th style={{ ...th, textAlign: 'right' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: T.text }}>
              <ArrowDown /> Label
            </span>
          </th>
          <th style={th}>
            <span style={{ fontSize: 14, fontWeight: 700, color: T.text, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Label <ArrowDown />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {EXAMPLE_ROWS.map((row, i) => (
          <tr key={i} style={{ background: striped && i % 2 === 1 ? T.stripe : '#FFFFFF' }}>
            <td style={td}><CheckboxIcon /></td>
            <td style={td}>{row.name}</td>
            <td style={td}>{row.role}</td>
            <td style={td}>{row.dept}</td>
            <td style={{ ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{row.number}</td>
            <td style={td}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Plane />
                {row.actions === 2 ? <Plane /> : <Dots />}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function DataTableDemo() {
  const [previewMode, setPreviewMode] = useState('header-states');
  const [size, setSize] = useState('l');
  const [state, setState] = useState('default');
  const [align, setAlign] = useState('left');
  const [contentType, setContentType] = useState('text');

  const stateOptions = ['default', 'hover', 'hover-resize', 'focus', 'sorting', 'non-sorting'];
  const stateLabels = ['Default', 'Hover', 'Hover Resize', 'Focus', 'Sorting', 'Non Sorting'];
  
  const alignOptions = ['left', 'center', 'right'];
  const alignLabels = ['Left', 'Centre', 'Right'];
  
  const sizeOptions = ['m', 'l'];
  const sizeLabels = ['M', 'L'];
  
  const contentTypeOptions = CONTENT_TYPES.map(ct => ct.key);
  const contentTypeLabels = CONTENT_TYPES.map(ct => ct.label);

  const getContentForMode = () => {
    switch (previewMode) {
      case 'header-states':
        return (
          <div style={{ width: 220 }}>
            <HeaderCell label="Label" state={state} align={align} />
          </div>
        );
      case 'header-size':
        return (
          <div style={{ width: 220 }}>
            <HeaderCell label="Label" state="default" align={align} height={size === 'l' ? 42 : 32} />
          </div>
        );
      case 'content-types':
        const content = CONTENT_TYPES.find(ct => ct.key === contentType);
        return content ? content.render(size) : null;
      default:
        return null;
    }
  };

  const getPreviewLabel = () => {
    switch (previewMode) {
      case 'header-states': return 'Header Cell — States';
      case 'header-size': return 'Header Cell — Size & Alignment';
      case 'content-types': return 'Cell — Content Types';
      default: return '';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          gap: 16,
          background:
            'repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
          {getPreviewLabel()}
        </div>
        <div style={{ background: '#FFFFFF', padding: 20, borderRadius: 8, border: '1px solid #EFEDE8' }}>
          {getContentForMode()}
        </div>
      </div>

      <div style={{ padding: 20, borderTop: '1px solid #EFEDE8', overflowY: 'auto' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            PREVIEW MODE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <PropChip active={previewMode === 'header-states'} onClick={() => setPreviewMode('header-states')}>
              Header States
            </PropChip>
            <PropChip active={previewMode === 'header-size'} onClick={() => setPreviewMode('header-size')}>
              Header Size
            </PropChip>
            <PropChip active={previewMode === 'content-types'} onClick={() => setPreviewMode('content-types')}>
              Content Types
            </PropChip>
          </div>
        </div>

        {previewMode === 'header-states' && (
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
        )}

        {previewMode === 'header-size' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
              SIZE
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sizeOptions.map((s, index) => (
                <PropChip key={s} active={size === s} onClick={() => setSize(s)}>
                  {sizeLabels[index]}
                </PropChip>
              ))}
            </div>
          </div>
        )}

        {previewMode === 'content-types' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
              CONTENT TYPE
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {contentTypeOptions.map((ct, index) => (
                <PropChip key={ct} active={contentType === ct} onClick={() => setContentType(ct)}>
                  {contentTypeLabels[index]}
                </PropChip>
              ))}
            </div>
          </div>
        )}

        {(previewMode === 'header-states' || previewMode === 'header-size') && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
              ALIGNMENT
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {alignOptions.map((a, index) => (
                <PropChip key={a} active={align === a} onClick={() => setAlign(a)}>
                  {alignLabels[index]}
                </PropChip>
              ))}
            </div>
          </div>
        )}

        {previewMode === 'content-types' && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
              SIZE
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sizeOptions.map((s, index) => (
                <PropChip key={s} active={size === s} onClick={() => setSize(s)}>
                  {sizeLabels[index]}
                </PropChip>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — exact match to your 4 uploaded images
============================================================ */
export function DataTableSpec() {
  const stateRows = [
    { key: 'default', label: 'Default', props: {} },
    { key: 'numeric', label: 'Numeric alignment', props: { align: 'right' } },
    { key: 'sorting', label: 'Sorting', props: { state: 'sorting', priority: 1 } },
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

      {/* 1. Header cell states — matches data-table-comp.png */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759' }}>Header Cell — States</div>
        <FigmaFrame>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            {stateRows.map((row) => (
              <div key={row.key} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <span style={{ width: 130, fontSize: 12, color: '#6B7280', textAlign: 'right' }}>{row.label}</span>
                <div style={{ width: 220 }}>
                  <HeaderCell label="Label" {...row.props} />
                </div>
              </div>
            ))}
          </div>
        </FigmaFrame>
      </div>

      {/* 2. Header size & alignment — matches data-table-size.png */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759' }}>Header Cell — Size &amp; Alignment</div>
        <FigmaFrame>
          <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(3, 1fr)', rowGap: 20, columnGap: 16, alignItems: 'center' }}>
            <div />
            {alignLabels.map((l) => (
              <div key={l} style={{ fontSize: 12, color: '#6B7280' }}>{l}</div>
            ))}
            {sizeRows.map((sz) => (
              <React.Fragment key={sz}>
                <div style={{ fontSize: 12, color: '#6B7280' }}>{sizeLabels[sizeRows.indexOf(sz)]}</div>
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

      {/* 3. Cell content types — matches data-table-item.png */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759' }}>Cell — Content Types</div>
        <FigmaFrame>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 1fr', rowGap: 22, columnGap: 24, alignItems: 'center' }}>
            <div />
            <div style={{ fontSize: 12, color: '#6B7280' }}>Large</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>Medium</div>
            {CONTENT_TYPES.map((ct) => (
              <React.Fragment key={ct.key}>
                <div style={{ fontSize: 12, color: '#6B7280' }}>{ct.label}</div>
                <div>{ct.render('l')}</div>
                <div>{ct.render('m')}</div>
              </React.Fragment>
            ))}
          </div>
        </FigmaFrame>
      </div>

      {/* 4. Full example — matches data-table-example.png */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759' }}>Full Example</div>
        <FigmaFrame style={{ padding: 0, overflow: 'hidden' }}>
          <FullExampleTable striped />
        </FigmaFrame>
      </div>
    </div>
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

export default function DataTablePage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
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
          <div style={{ ...CARD_STYLE, height: 1500 }}>
            <DataTableSpec />
          </div>
        </div>
      </div>
    </div>
  );
}