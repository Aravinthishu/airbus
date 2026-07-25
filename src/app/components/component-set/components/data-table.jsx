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
   HeaderCell — reproduces data-table-comp.png (8 states)
============================================================ */
function HeaderCell({
  label = 'Label',
  align = 'left',
  state = 'default',
  priority = null,
  height = 42,
  onMouseEnter,
  onMouseLeave,
}) {
  const isHover = state === 'hover' || state === 'hover-resize';
  const isFocus = state === 'focus';
  const isSorting = state === 'sorting';
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
  return <span style={{ fontSize: size === 'xl' ? 16 : 14, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{text}</span>;
}
function CellNumeric({ value = '0123456789', size = 'l' }) {
  return <span style={{ fontSize: size === 'xl' ? 16 : 14, color: T.text, fontFamily: "'DM Sans', sans-serif", fontVariantNumeric: 'tabular-nums' }}>{value}</span>;
}
function CellChip({ label = 'Label', size = 'l' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: T.chipBg, borderRadius: 999,
      padding: size === 'xl' ? '8px 16px' : '6px 14px',
      fontSize: size === 'xl' ? 14 : 13, fontWeight: 700, color: T.text,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Home size={size === 'xl' ? 16 : 14} />
      {label}
    </span>
  );
}
function CellProgress({ pct = 70, size = 'l' }) {
  const w = size === 'xl' ? 170 : 140;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'DM Sans', sans-serif" }}>
      <span style={{ fontSize: size === 'xl' ? 14 : 13, color: T.text, width: 30 }}>{pct}%</span>
      <div style={{ width: w, height: 6, borderRadius: 999, background: T.progressTrack, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: T.progressFill, borderRadius: 999 }} />
      </div>
    </div>
  );
}
function CellActionsMulti({ size = 'l' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Dots size={size === 'xl' ? 17 : 15} />
      <ChevronDown size={size === 'xl' ? 17 : 15} />
    </div>
  );
}
function CellActionsSingle({ size = 'l' }) {
  return <Dots size={size === 'xl' ? 17 : 15} />;
}
function CellTextIcon({ label = 'Label', size = 'l' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Dots size={size === 'xl' ? 17 : 15} />
      <span style={{ fontSize: size === 'xl' ? 16 : 14, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
    </div>
  );
}
function CellCheckbox({ size = 'l' }) {
  return <CheckboxIcon size={size === 'xl' ? 19 : 17} />;
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
   Full example table
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
  const [hoverRow, setHoverRow] = useState(null);
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
          <tr
            key={i}
            onMouseEnter={() => setHoverRow(i)}
            onMouseLeave={() => setHoverRow(null)}
            style={{ background: hoverRow === i ? T.headerBgHover : striped && i % 2 === 1 ? T.stripe : '#FFFFFF' }}
          >
            <td style={td}><CheckboxIcon /></td>
            <td style={td}>{row.name}</td>
            <td style={td}>{row.role}</td>
            <td style={td}>{row.dept}</td>
            <td style={{ ...td, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{row.number}</td>
            <td style={td}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Home />
                {row.actions === 2 ? <Home /> : <Dots />}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ============================================================
   HEADERS ONLY PREVIEW
============================================================ */
function HeadersOnlyPreview({ size, align, forcedState }) {
  const [hoverCol, setHoverCol] = useState(null);
  const height = size === 'xl' ? 52 : 42;

  const columns = [
    { label: 'Name', align },
    { label: 'Date', align: 'center' },
    { label: 'Amount', align: 'right' },
    { label: 'Status', align: 'left', nonSorting: true },
  ];

  return (
    <div style={{ width: '100%', maxWidth: 560, border: '1px solid #D9DCE1', borderRadius: 6, overflow: 'hidden' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: T.headerBg, borderBottom: '1px solid #D9DCE1' }}>
          <CheckboxIcon />
        </div>
        {columns.map((col, idx) => {
          const isDemoCol = idx === 0;
          const effectiveState = hoverCol === idx ? 'hover' : isDemoCol ? forcedState : col.nonSorting ? 'non-sorting' : 'default';
          return (
            <div key={idx} style={{ flex: 1 }}>
              <HeaderCell
                label={col.label}
                align={col.align}
                state={effectiveState}
                height={height}
                onMouseEnter={() => setHoverCol(idx)}
                onMouseLeave={() => setHoverCol(null)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   CELL CONTENT ONLY PREVIEW - ONE ROW, NO HEADERS
============================================================ */
function CellContentOnlyPreview({ size, contentType }) {
  return (
    <div style={{ width: '100%', maxWidth: 560, border: '1px solid #D9DCE1', borderRadius: 6, overflow: 'hidden' }}>
      {/* ONLY ONE row with content, NO header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: size === 'xl' ? '16px 16px' : '12px 16px',
          background: '#FFFFFF',
        }}
      >
        <div style={{ width: 32, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckboxIcon />
        </div>
        <div style={{ flex: 1, padding: '0 8px' }}>
          {CONTENT_TYPES.find(ct => ct.key === contentType).render(size)}
        </div>
        <div style={{ flex: 1, padding: '0 8px' }}>
          {CONTENT_TYPES.find(ct => ct.key === contentType).render(size)}
        </div>
        <div style={{ flex: 1, padding: '0 8px', textAlign: 'right' }}>
          {CONTENT_TYPES.find(ct => ct.key === contentType).render(size)}
        </div>
        <div style={{ flex: 1, padding: '0 8px' }}>
          {CONTENT_TYPES.find(ct => ct.key === contentType).render(size)}
        </div>
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

  const stateOptions = ['default', 'hover', 'hover-resize', 'focus', 'sorting', 'non-sorting'];
  const stateLabels = ['Default', 'Hover', 'Hover Resize', 'Focus', 'Sorting', 'Non Sorting'];

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
          background: '#FFFFFF',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
          Data Table — Live Preview
        </div>
        
        {previewMode === 'headers' ? (
          <HeadersOnlyPreview size={size} align={align} forcedState={state} />
        ) : (
          <CellContentOnlyPreview size={size} contentType={contentType} />
        )}
        
        <div style={{ fontSize: 11, color: '#A9AFBC', fontFamily: "'DM Sans', sans-serif" }}>
          {previewMode === 'headers' 
            ? 'Hover a column to preview its live hover state' 
            : 'Preview different cell content types'}
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

        {previewMode === 'headers' && (
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
        )}

        {previewMode === 'cellContent' && (
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
   REFERENCE SPEC
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

      {/* 1. Header cell states */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#3D4759' }}>Header Cell — States</div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ width: 130, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 26 }}>
            {stateRows.map((row) => (
              <div key={row.key} style={{ height: 42, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 12, color: '#6B7280', textAlign: 'right' }}>{row.label}</span>
              </div>
            ))}
          </div>
          <FigmaFrame style={{ flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              {stateRows.map((row) => (
                <div key={row.key} style={{ width: 220 }}>
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
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ width: 40, flexShrink: 0, display: 'flex', flexDirection: 'column', paddingTop: 34 }}>
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
          <FigmaFrame style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 20, columnGap: 16, alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ width: 110, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 34 }}>
            {CONTENT_TYPES.map((ct) => (
              <div key={ct.key} style={{ fontSize: 12, color: '#6B7280', height: 24, display: 'flex', alignItems: 'center' }}>
                {ct.label}
              </div>
            ))}
          </div>
          <FigmaFrame style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 22, columnGap: 24, alignItems: 'center' }}>
              <div style={{ fontSize: 12, color: '#6B7280' }}>L</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>XL</div>
              {CONTENT_TYPES.map((ct) => (
                <React.Fragment key={ct.key}>
                  <div>{ct.render('l')}</div>
                  <div>{ct.render('xl')}</div>
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