import React, { useState, useEffect, useRef } from 'react';

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

/* Figma-inspect-style dashed violet frame used around every reference block */
function FigmaFrame({ children, style }) {
  return (
    <div
      style={{
        border: '2px dashed #C084FC',
        borderRadius: 8,
        background: '#FFFFFF',
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Row with a text label to the left of a FigmaFrame */
function LabeledRow({ label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
      <span style={{ fontSize: 13, color: '#151A24', width: 110, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

/* ============================================================
   ICONS — Home, Settings, Chevron, Search, Help, Collapse
============================================================ */
function HomeIcon({ size = 15, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function Chevron({ direction = 'down', size = 14, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, transform: direction === 'up' ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function SearchIcon({ size = 15, color = '#8089A0' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function HelpIcon({ size = 15, color = '#8089A0' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 4.9.75c0 1.5-2.15 1.75-2.4 3" />
      <line x1="12" y1="17" x2="12" y2="17.01" />
    </svg>
  );
}

function CollapseIcon({ size = 15, color = '#8089A0' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="11 17 6 12 11 7" />
      <polyline points="18 17 13 12 18 7" />
    </svg>
  );
}

/* ============================================================
   STATE STYLES — matches side-states.png exactly
============================================================ */
const STATE_STYLES = {
  default:      { bg: 'transparent', border: 'none',                 color: '#0B1F4D', weight: 500, opacity: 1 },
  hover:        { bg: '#F1F1EF',     border: 'none',                 color: '#0B1F4D', weight: 500, opacity: 1 },
  'open-active':{ bg: '#E9EEFC',     border: 'none',                 color: '#0B1F4D', weight: 700, opacity: 1 },
  'open-default':{ bg: 'transparent', border: 'none',                 color: '#0B1F4D', weight: 700, opacity: 1 },
  'open-hover': { bg: '#F1F1EF',     border: 'none',                 color: '#0B1F4D', weight: 700, opacity: 1 },
  focus:        { bg: 'transparent', border: '1.5px solid #155EEF',  color: '#0B1F4D', weight: 500, opacity: 1 },
  disabled:     { bg: 'transparent', border: 'none',                 color: '#0B1F4D', weight: 500, opacity: 0.35 },
};

/* ============================================================
   SideNavItem — a single row
============================================================ */
function SideNavItem({ label, variant = 'leaf', open = false, state = null, showIcon = true, collapsedRail = false, onClick = null }) {
  if (variant === 'heading') {
    return (
      <div style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, color: '#9AA2B1', fontFamily: "'DM Sans', sans-serif" }}>
        {collapsedRail ? '' : label}
      </div>
    );
  }

  let bg = 'transparent', border = 'none', color = '#0B1F4D', weight = 500, opacity = 1, chevron = null, borderLeftAccent = null;

  if (state) {
    const s = STATE_STYLES[state] || STATE_STYLES.default;
    bg = s.bg; border = s.border; color = s.color; weight = s.weight; opacity = s.opacity;
    chevron = state.startsWith('open') ? 'up' : (state === 'disabled' ? 'down' : 'down');
  } else if (variant === 'branch') {
    color = '#0B1F4D'; weight = 700; chevron = open ? 'up' : 'down';
  } else if (variant === 'leaf') {
    color = '#48577A'; weight = 500; chevron = null;
  } else if (variant === 'active-leaf') {
    bg = '#E9EEFC'; color = '#0B1F4D'; weight = 700; chevron = null; borderLeftAccent = '#0B1F4D';
  }

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: collapsedRail ? '10px 0' : '8px 12px',
        justifyContent: collapsedRail ? 'center' : 'flex-start',
        borderRadius: 6,
        background: bg,
        color,
        border,
        borderLeft: borderLeftAccent ? `3px solid ${borderLeftAccent}` : (border !== 'none' ? border : 'none'),
        boxShadow: 'none',
        cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
        opacity,
        fontSize: 13,
        fontWeight: weight,
        fontFamily: "'DM Sans', sans-serif",
        transition: 'all .15s ease',
      }}
    >
      {showIcon && <HomeIcon size={14} />}
      {!collapsedRail && <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{label}</span>}
      {!collapsedRail && chevron && <Chevron direction={chevron} size={13} />}
    </div>
  );
}

/* ============================================================
   DATA — mirrors the exact structures in your uploaded images
============================================================ */
const categoryTree = [
  { label: 'Label', variant: 'heading' },
  {
    label: 'First Level', variant: 'branch', children: [
      {
        label: 'Second Level', variant: 'branch', children: [
          { label: 'Third Level', variant: 'leaf' },
        ],
      },
    ],
  },
];

const sectionOneTree = [
  { label: 'Label', variant: 'heading' },
  {
    label: 'Label', variant: 'branch', children: [
      { label: 'Label', variant: 'leaf' },
      { label: 'Label', variant: 'leaf' },
    ],
  },
];

const sectionTwoTree = [
  { label: 'Label', variant: 'heading' },
  {
    label: 'Label', variant: 'branch', children: [
      {
        label: 'Label', variant: 'branch', children: [
          { label: 'Label', variant: 'leaf' },
          { label: 'Label', variant: 'leaf' },
          { label: 'Label', variant: 'active-leaf' },
          { label: 'Label', variant: 'leaf' },
          { label: 'Label', variant: 'leaf' },
        ],
      },
      { label: 'Label', variant: 'branch' },
      { label: 'Label', variant: 'branch' },
    ],
  },
  { label: 'Label', variant: 'branch' },
  { label: 'Label', variant: 'branch' },
  { label: 'Label', variant: 'branch' },
];

const fullNavTree = [...sectionOneTree, ...sectionTwoTree];

/* ============================================================
   Full sidebar shell — search + tree + footer (SMALLER VERSION)
   - MODIFIED to only apply state to first item
============================================================ */
function SideNavShell({ collapsed = false, onItemClick = null, state = null }) {
  // Create a modified tree where only the first non-heading item gets the state
  const getTreeWithState = (nodes, stateToApply) => {
    if (!stateToApply || stateToApply === 'default') {
      return nodes;
    }
    
    // Deep clone and modify only the first non-heading item
    const clone = JSON.parse(JSON.stringify(nodes));
    let found = false;
    
    const traverse = (node) => {
      if (found) return;
      if (node.variant !== 'heading' && !found) {
        // Apply state to this node
        node.state = stateToApply;
        found = true;
        return;
      }
      if (node.children) {
        for (let child of node.children) {
          traverse(child);
          if (found) break;
        }
      }
    };
    
    for (let node of clone) {
      traverse(node);
      if (found) break;
    }
    
    return clone;
  };

  const treeData = getTreeWithState(fullNavTree, state);

  return (
    <div
      style={{
        width: collapsed ? 56 : 200,
        background: '#FFFFFF',
        border: '1px solid #E4E2DD',
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        fontFamily: "'DM Sans', sans-serif",
        transition: 'width 0.2s ease',
        minHeight: 300,
        maxHeight: 400,
        overflow: 'auto',
      }}
    >
      {/* Search */}
      {collapsed ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0', marginBottom: 4 }}>
          <SearchIcon size={14} />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 8px',
            border: '1px solid #E4E2DD',
            borderRadius: 6,
            background: '#FAFAF9',
            marginBottom: 4,
          }}
        >
          <SearchIcon size={13} />
          <span style={{ fontSize: 12, color: '#9AA2B1' }}>Search</span>
        </div>
      )}

      {/* Tree - Render with state applied to first item */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {treeData.slice(0, 6).map((n, i) => (
          <TreeNode key={i} node={n} collapsedRail={collapsed} onItemClick={onItemClick} />
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #EFEDE8', marginTop: 6, paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: '4px 10px',
            color: '#8089A0',
            fontSize: 12,
          }}
        >
          <HelpIcon size={13} />
          {!collapsed && <span>Documentation</span>}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: '4px 10px',
            color: '#8089A0',
            fontSize: 12,
          }}
        >
          <CollapseIcon size={13} />
          {!collapsed && <span>Collapse</span>}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TreeNode - Updated to handle state in node
============================================================ */
function TreeNode({ node, collapsedRail = false, onItemClick = null }) {
  return (
    <div>
      <SideNavItem 
        label={node.label} 
        variant={node.variant} 
        open={!!node.children} 
        collapsedRail={collapsedRail} 
        onClick={() => onItemClick && onItemClick(node.label)}
        state={node.state || null} // Use state from node if present
      />
      {node.children && !collapsedRail && (
        <div
          style={{
            marginLeft: 20,
            paddingLeft: 10,
            borderLeft: '1px solid #E4E2DD',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} collapsedRail={collapsedRail} onItemClick={onItemClick} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Tree - Updated to handle state in node
============================================================ */
function Tree({ nodes, collapsedRail = false, onItemClick = null }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: collapsedRail ? 'auto' : 220 }}>
      {nodes.map((n, i) => (
        <TreeNode key={i} node={n} collapsedRail={collapsedRail} onItemClick={onItemClick} />
      ))}
    </div>
  );
}

/* ============================================================
   Scroller component with auto-hide scrollbar
============================================================ */
function AutoHideScroll({ children, height }) {
  const [showScroll, setShowScroll] = useState(false);
  const timeoutRef = useRef(null);

  const handleScroll = () => {
    setShowScroll(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowScroll(false);
    }, 5000);
  };

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: height,
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: showScroll ? 'thin' : 'none',
        msOverflowStyle: showScroll ? 'auto' : 'none',
        position: 'relative',
      }}
    >
      <style>
        {`
          .auto-hide-scroll::-webkit-scrollbar {
            width: ${showScroll ? '6px' : '0px'};
            transition: width 0.3s ease;
          }
          .auto-hide-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .auto-hide-scroll::-webkit-scrollbar-thumb {
            background: ${showScroll ? '#C8C4BC' : 'transparent'};
            border-radius: 3px;
            transition: background 0.3s ease;
          }
          .auto-hide-scroll::-webkit-scrollbar-thumb:hover {
            background: '#A8A4A0';
          }
        `}
      </style>
      <div className="auto-hide-scroll" style={{ height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   LIVE DEMO — Clean single sidebar preview (SMALLER)
============================================================ */
export function SideNavDemo() {
  const [state, setState] = useState('default');
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const stateOptions = ['default', 'hover', 'open-default', 'open-hover', 'open-active', 'focus', 'disabled'];
  const stateLabels = ['Default', 'Hover', 'Open Default', 'Open Hover', 'Open Active', 'Focus', 'Disabled'];

  const handleItemClick = (label) => {
    setSelectedItem(label);
  };

  const currentStateLabel = stateLabels[stateOptions.indexOf(state)];

  return (
    <AutoHideScroll height="100%">
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', padding: '12px 16px' }}>
        {/* Preview Area - Single Sidebar with State Label */}
        <div
          style={{
            flex: '1 1 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '12px 0',
            minHeight: 280,
            background:
              'repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)',
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
            State: <span style={{ color: '#0B1F4D' }}>{currentStateLabel}</span>
            {collapsed && ' • Collapsed'}
          </div>
          <SideNavShell collapsed={collapsed} onItemClick={handleItemClick} state={state} />
          {selectedItem && (
            <div style={{ fontSize: 11, color: '#6B7280', fontFamily: "'DM Sans', sans-serif" }}>
              Selected: <strong>{selectedItem}</strong>
            </div>
          )}
        </div>

        {/* Controls - Fixed at bottom */}
        <div style={{ 
          padding: '10px 12px', 
          borderTop: '1px solid #EFEDE8', 
          background: '#FFFFFF',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
              STATE
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {stateOptions.map((s, index) => (
                <PropChip key={s} active={state === s} onClick={() => setState(s)}>
                  {stateLabels[index]}
                </PropChip>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
              LAYOUT
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <PropChip active={!collapsed} onClick={() => setCollapsed(false)}>Expanded</PropChip>
              <PropChip active={collapsed} onClick={() => setCollapsed(true)}>Collapsed</PropChip>
            </div>
          </div>
        </div>
      </div>
    </AutoHideScroll>
  );
}

/* ============================================================
   REFERENCE SPEC — exact match to your 4 uploaded images
============================================================ */
export function SideNavSpec() {
  const stateRows = [
    { key: 'default', label: 'Default' },
    { key: 'hover', label: 'Hover' },
    { key: 'open-active', label: 'Open Active' },
    { key: 'open-default', label: 'Open Default' },
    { key: 'open-hover', label: 'Open Hover' },
    { key: 'focus', label: 'Focus' },
    { key: 'disabled', label: 'Disabled' },
  ];

  return (
    <AutoHideScroll height="100%">
      <div style={{ padding: 24, fontFamily: "'DM Sans', sans-serif", background: '#FFFFFF', minHeight: '100%' }}>
        <SpecBadge label="Side Navigation" />

        {/* side-category.png */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#151A24', marginBottom: 16 }}>SideNav — Category</div>
          <FigmaFrame>
            <div style={{ display: 'flex', gap: 40 }}>
              <div style={{ width: 100, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ padding: '8px 0', fontSize: 13, color: '#151A24' }}>Category</div>
                <div style={{ padding: '8px 0', fontSize: 13, color: '#151A24' }}>First Level</div>
                <div style={{ padding: '8px 0', fontSize: 13, color: '#151A24' }}>Second Level</div>
                <div style={{ padding: '8px 0', fontSize: 13, color: '#151A24' }}>Third Level</div>
              </div>
              <Tree nodes={categoryTree} />
            </div>
          </FigmaFrame>
        </div>

        {/* side-section.png */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#151A24', marginBottom: 16 }}>SideNav — Section</div>
          <FigmaFrame>
            <div style={{ display: 'flex', gap: 40 }}>
              <div style={{ width: 90, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: '#151A24' }}>Section 1</span>
                <span style={{ fontSize: 13, color: '#151A24' }}>Section 2</span>
              </div>
              <div>
                <Tree nodes={sectionOneTree} />
                <div style={{ height: 20 }} />
                <Tree nodes={sectionTwoTree} />
              </div>
            </div>
          </FigmaFrame>
        </div>

        {/* side-states.png */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#151A24', marginBottom: 16 }}>SideNav — States</div>
          <FigmaFrame>
            {stateRows.map((row) => (
              <LabeledRow key={row.key} label={row.label}>
                <div style={{ width: 220 }}>
                  <SideNavItem label="Label" state={row.key} />
                </div>
              </LabeledRow>
            ))}
          </FigmaFrame>
        </div>

        {/* sice-expand.png */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#151A24', marginBottom: 16 }}>SideNav — Expanded / Collapsed</div>
          <FigmaFrame style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 13, color: '#151A24', marginBottom: 10 }}>Expanded</div>
              <SideNavShell collapsed={false} />
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#151A24', marginBottom: 10 }}>Collapsed</div>
              <SideNavShell collapsed={true} />
            </div>
          </FigmaFrame>
        </div>
      </div>
    </AutoHideScroll>
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

export default function SideNavPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <SideNavDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 1100 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <SideNavSpec />
          </div>
        </div>
      </div>
    </div>
  );
}