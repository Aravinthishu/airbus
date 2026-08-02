'use client';
import React, { useState, useCallback } from 'react';

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

function LabeledRow({ label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
      <span style={{ fontSize: 13, color: '#151A24', width: 90, flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

/* ============================================================
   ICONS
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

/* Points left when the rail is expanded (collapse it), points right when collapsed (expand it) */
function CollapseIcon({ size = 15, color = '#8089A0', pointing = 'left' }) {
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
      style={{ flexShrink: 0, transform: pointing === 'right' ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }}
    >
      <polyline points="11 17 6 12 11 7" />
      <polyline points="18 17 13 12 18 7" />
    </svg>
  );
}

/* ============================================================
   REAL, INTERACTIVE NAV ITEM
   Style is computed live from actual hover / focus / open / active
   state instead of a hard-coded "state" prop.
============================================================ */
function getItemStyle({ variant, isActive, isOpen, isHovered, isFocused, disabled }) {
  let bg = 'transparent';
  let color = variant === 'branch' ? '#0B1F4D' : '#48577A';
  let weight = variant === 'branch' ? 700 : 500;
  let border = 'none';
  let borderLeft = 'none';

  if (isActive) {
    bg = '#E9EEFC';
    color = '#0B1F4D';
    weight = 700;
    borderLeft = '3px solid #0B1F4D';
  }
  if (isHovered && !disabled) {
    bg = isActive ? '#E3E9FA' : '#F1F1EF';
  }
  if (isFocused && !disabled) {
    border = '1.5px solid #155EEF';
  }
  if (disabled) {
    bg = 'transparent';
  }

  return { bg, color, weight, border, borderLeft };
}

function NavRow({
  node,
  collapsedRail,
  isOpen,
  isActive,
  isHovered,
  isFocused,
  onHover,
  onUnhover,
  onFocus,
  onBlur,
  onActivate,
}) {
  const disabled = !!node.disabled;
  const hasChildren = !!(node.children && node.children.length);
  const { bg, color, weight, border, borderLeft } = getItemStyle({
    variant: node.variant,
    isActive,
    isOpen,
    isHovered,
    isFocused,
    disabled,
  });

  const showChevron = node.variant === 'branch' && !collapsedRail;
  const chevronDir = hasChildren ? (isOpen ? 'up' : 'down') : 'down';

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-expanded={hasChildren ? isOpen : undefined}
      title={collapsedRail ? node.label : undefined}
      onMouseEnter={() => !disabled && onHover(node.id)}
      onMouseLeave={() => !disabled && onUnhover(node.id)}
      onFocus={() => !disabled && onFocus(node.id)}
      onBlur={() => !disabled && onBlur(node.id)}
      onClick={() => !disabled && onActivate(node)}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate(node);
        }
      }}
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
        borderLeft: borderLeft !== 'none' ? borderLeft : (border !== 'none' ? border : 'none'),
        boxSizing: 'border-box',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.35 : 1,
        fontSize: 13,
        fontWeight: weight,
        fontFamily: "'DM Sans', sans-serif",
        outline: 'none',
        transition: 'background .12s ease, border-color .12s ease',
      }}
    >
      <HomeIcon size={14} />
      {!collapsedRail && <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{node.label}</span>}
      {showChevron && <Chevron direction={chevronDir} size={13} />}
    </div>
  );
}

function TreeNode({ node, depth = 0, collapsedRail, nav }) {
  const { expandedIds, activeId, hoveredId, focusedId, toggleExpand, setHovered, clearHovered, setFocused, clearFocused, setActive } = nav;

  if (node.variant === 'heading') {
    return (
      <div style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, color: '#9AA2B1', fontFamily: "'DM Sans', sans-serif" }}>
        {collapsedRail ? '' : node.label}
      </div>
    );
  }

  const hasChildren = !!(node.children && node.children.length);
  const isOpen = expandedIds.has(node.id);

  const handleActivate = (n) => {
    if (n.variant === 'branch' && hasChildren) {
      toggleExpand(n.id);
    } else {
      setActive(n.id);
    }
  };

  return (
    <div>
      <NavRow
        node={node}
        collapsedRail={collapsedRail}
        isOpen={isOpen}
        isActive={activeId === node.id}
        isHovered={hoveredId === node.id}
        isFocused={focusedId === node.id}
        onHover={setHovered}
        onUnhover={clearHovered}
        onFocus={setFocused}
        onBlur={clearFocused}
        onActivate={handleActivate}
      />
      {hasChildren && !collapsedRail && isOpen && (
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
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} collapsedRail={collapsedRail} nav={nav} />
          ))}
        </div>
      )}
    </div>
  );
}

function Tree({ nodes, collapsedRail, nav }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: collapsedRail ? 'auto' : '100%' }}>
      {nodes.map((n) => (
        <TreeNode key={n.id} node={n} collapsedRail={collapsedRail} nav={nav} />
      ))}
    </div>
  );
}

/* ============================================================
   Static item — used ONLY for the "States" reference swatches,
   which by definition need to freeze one state at a time.
============================================================ */
const STATE_STYLES = {
  default:        { bg: 'transparent', border: 'none',                color: '#0B1F4D', weight: 500, opacity: 1 },
  hover:          { bg: '#F1F1EF',     border: 'none',                color: '#0B1F4D', weight: 500, opacity: 1 },
  'open-active':  { bg: '#E9EEFC',     border: 'none',                color: '#0B1F4D', weight: 700, opacity: 1 },
  'open-default': { bg: 'transparent', border: 'none',                color: '#0B1F4D', weight: 700, opacity: 1 },
  'open-hover':   { bg: '#F1F1EF',     border: 'none',                color: '#0B1F4D', weight: 700, opacity: 1 },
  focus:          { bg: 'transparent', border: '1.5px solid #155EEF', color: '#0B1F4D', weight: 500, opacity: 1 },
  disabled:       { bg: 'transparent', border: 'none',                color: '#0B1F4D', weight: 500, opacity: 0.35 },
};

function StaticStateItem({ label, state }) {
  const s = STATE_STYLES[state] || STATE_STYLES.default;
  const chevron = state.startsWith('open') ? 'up' : 'down';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderRadius: 6,
        background: s.bg,
        color: s.color,
        border: s.border,
        opacity: s.opacity,
        fontSize: 13,
        fontWeight: s.weight,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <HomeIcon size={14} />
      <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{label}</span>
      <Chevron direction={chevron} size={13} />
    </div>
  );
}

/* ============================================================
   DATA — every node has a stable id so hover/open/active state
   can target the exact row that was interacted with.
============================================================ */
const categoryTree = [
  { id: 'cat-heading', label: 'Label', variant: 'heading' },
  {
    id: 'cat-first', label: 'First Level', variant: 'branch', children: [
      {
        id: 'cat-second', label: 'Second Level', variant: 'branch', children: [
          { id: 'cat-third', label: 'Third Level', variant: 'leaf' },
        ],
      },
    ],
  },
];

const sectionOneTree = [
  { id: 's1-heading', label: 'Label', variant: 'heading' },
  {
    id: 's1-branch', label: 'Label', variant: 'branch', children: [
      { id: 's1-leaf-1', label: 'Label', variant: 'leaf' },
      { id: 's1-leaf-2', label: 'Label', variant: 'leaf' },
    ],
  },
];

/* All former top-level "main tabs" (branch-4/5/6) now nested two or
   three levels deep under the single top-level branch, instead of sitting
   flat at the root. */
const sectionTwoTree = [
  { id: 's2-heading', label: 'Label', variant: 'heading' },
  {
    id: 's2-branch-1', label: 'Label', variant: 'branch', children: [
      {
        id: 's2-sub-branch', label: 'Label', variant: 'branch', children: [
          { id: 's2-leaf-1', label: 'Label', variant: 'leaf' },
          { id: 's2-leaf-2', label: 'Label', variant: 'leaf' },
          { id: 's2-leaf-3', label: 'Label', variant: 'leaf' },
          { id: 's2-leaf-4', label: 'Label', variant: 'leaf' },
          { id: 's2-leaf-5', label: 'Label', variant: 'leaf' },
        ],
      },
      {
        id: 's2-branch-2', label: 'Label', variant: 'branch', children: [
          { id: 's2-branch-2-leaf-1', label: 'Label', variant: 'leaf' },
          { id: 's2-branch-2-leaf-2', label: 'Label', variant: 'leaf' },
        ],
      },
      {
        id: 's2-branch-3', label: 'Label', variant: 'branch', children: [
          { id: 's2-branch-3-leaf-1', label: 'Label', variant: 'leaf' },
        ],
      },
      {
        id: 's2-branch-4', label: 'Label', variant: 'branch', children: [
          { id: 's2-branch-4-leaf-1', label: 'Label', variant: 'leaf' },
        ],
      },
      {
        id: 's2-branch-5', label: 'Label', variant: 'branch', children: [
          { id: 's2-branch-5-leaf-1', label: 'Label', variant: 'leaf' },
        ],
      },
      {
        id: 's2-branch-6', label: 'Label', variant: 'branch', children: [
          { id: 's2-branch-6-leaf-1', label: 'Label', variant: 'leaf' },
        ],
      },
    ],
  },
];

const fullNavTree = [...sectionOneTree, ...sectionTwoTree];

/* Collects every branch id that actually has children, for Expand All / Collapse All */
function collectBranchIds(nodes, acc = []) {
  for (const n of nodes) {
    if (n.variant === 'branch' && n.children && n.children.length) {
      acc.push(n.id);
      collectBranchIds(n.children, acc);
    }
  }
  return acc;
}
const allBranchIds = collectBranchIds(fullNavTree);

/* ============================================================
   Real, fully interactive sidebar shell
   - hover comes from actual mouse events
   - branches actually expand/collapse their own children
   - the rail actually collapses/expands on click
============================================================ */
function SideNavShell({ collapsedRail, onToggleCollapsed, nav }) {
  return (
    <div
      style={{
        width: collapsedRail ? 56 : 220,
        flexShrink: 0,
        background: '#FFFFFF',
        border: '1px solid #E4E2DD',
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        fontFamily: "'DM Sans', sans-serif",
        transition: 'width 0.2s ease',
        boxSizing: 'border-box',
      }}
    >
      {/* Search */}
      {collapsedRail ? (
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

      {/* Tree with custom scrollbar styling */}
      <div 
        className="nav-tree-scroll"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1, 
          overflowY: 'auto', 
          maxHeight: 380,
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
        }}
      >
        <style jsx>{`
          .nav-tree-scroll::-webkit-scrollbar {
            width: 4px;
          }
          .nav-tree-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .nav-tree-scroll::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 10px;
            transition: background 0.3s ease;
          }
          .nav-tree-scroll:hover::-webkit-scrollbar-thumb {
            background: #D8D4CC;
          }
          .nav-tree-scroll {
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
          }
          .nav-tree-scroll:hover {
            scrollbar-color: #D8D4CC transparent;
          }
        `}</style>
        <Tree nodes={fullNavTree} collapsedRail={collapsedRail} nav={nav} />
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #EFEDE8', marginTop: 6, paddingTop: 6, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            justifyContent: collapsedRail ? 'center' : 'flex-start',
            padding: '4px 10px',
            color: '#8089A0',
            fontSize: 12,
            borderRadius: 6,
          }}
        >
          <HelpIcon size={13} />
          {!collapsedRail && <span>Documentation</span>}
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={onToggleCollapsed}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggleCollapsed(); } }}
          title={collapsedRail ? 'Expand' : 'Collapse'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            justifyContent: collapsedRail ? 'center' : 'flex-start',
            padding: '4px 10px',
            color: '#8089A0',
            fontSize: 12,
            borderRadius: 6,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#F1F1EF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <CollapseIcon size={13} pointing={collapsedRail ? 'right' : 'left'} />
          {!collapsedRail && <span>Collapse</span>}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   LIVE DEMO — a real sidebar, not a state-simulator.
   Hover, expand/collapse, active selection, and the rail
   collapse toggle are all driven by actual interaction.
============================================================ */
export function SideNavDemo() {
  const [collapsedRail, setCollapsedRail] = useState(false);
  const [expandedIds, setExpandedIds] = useState(() => new Set(['s2-branch-1', 's2-sub-branch']));
  const [activeId, setActiveId] = useState('s2-leaf-3');
  const [hoveredId, setHoveredId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);

  const toggleExpand = useCallback((id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const nav = {
    expandedIds,
    activeId,
    hoveredId,
    focusedId,
    toggleExpand,
    setHovered: setHoveredId,
    clearHovered: (id) => setHoveredId((cur) => (cur === id ? null : cur)),
    setFocused: setFocusedId,
    clearFocused: (id) => setFocusedId((cur) => (cur === id ? null : cur)),
    setActive: setActiveId,
  };

  const allExpanded = allBranchIds.every((id) => expandedIds.has(id));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        padding: '16px 20px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: 11, color: '#8089A0', fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>
        Hover a row, click a branch to expand it, click a leaf to select it — or use the controls below.
        Buttons and clicking control the exact same state, so they always stay in sync.
      </div>
<div
  style={{
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundImage: `
      linear-gradient(rgba(200, 200, 200, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200, 200, 200, 0.15) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    backgroundColor: '#FCFCFB',
    borderRadius: 8,
    boxSizing: 'border-box',
    marginBottom: 12,
    height: 340,          // 👈 fixed height for preview item area only
    overflow: 'auto',     // 👈 scrollbar lives here now
  }}
>
  <SideNavShell
    collapsedRail={collapsedRail}
    onToggleCollapsed={() => setCollapsedRail((c) => !c)}
    nav={nav}
  />
</div>

      <div
        style={{
          padding: '10px 12px',
          borderTop: '1px solid #EFEDE8',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
            LAYOUT
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <PropChip active={!collapsedRail} onClick={() => setCollapsedRail(false)}>Expanded</PropChip>
            <PropChip active={collapsedRail} onClick={() => setCollapsedRail(true)}>Collapsed</PropChip>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>
            TREE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <PropChip active={allExpanded} onClick={() => setExpandedIds(new Set(allBranchIds))}>Expand All</PropChip>
            <PropChip active={expandedIds.size === 0} onClick={() => setExpandedIds(new Set())}>Collapse All</PropChip>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — exact match to your 4 uploaded images.
   These are documentation swatches, so the "States" block stays
   static on purpose (that's the point of a states reference).
   Everything else reuses the same live, interactive nav pieces.
============================================================ */
export function SideNavSpec() {
  const [expandedIds, setExpandedIds] = useState(() => new Set(['cat-first', 'cat-second', 's1-branch', 's2-branch-1']));
  const [activeId, setActiveId] = useState('s2-leaf-3');
  const [hoveredId, setHoveredId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const [specCollapsed, setSpecCollapsed] = useState(false);

  const toggleExpand = useCallback((id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const nav = {
    expandedIds,
    activeId,
    hoveredId,
    focusedId,
    toggleExpand,
    setHovered: setHoveredId,
    clearHovered: (id) => setHoveredId((cur) => (cur === id ? null : cur)),
    setFocused: setFocusedId,
    clearFocused: (id) => setFocusedId((cur) => (cur === id ? null : cur)),
    setActive: setActiveId,
  };

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
    <div style={{ padding: 24, fontFamily: "'DM Sans', sans-serif", background: '#FFFFFF' }}>
      <SpecBadge label="Side Navigation" />

      {/* side-category.png */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#151A24', marginBottom: 12 }}>SideNav — Category</div>
        <FigmaFrame style={{ display: 'inline-block' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ width: 90, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ padding: '8px 0', fontSize: 13, color: '#151A24' }}>Category</div>
              <div style={{ padding: '8px 0', fontSize: 13, color: '#151A24' }}>First Level</div>
              <div style={{ padding: '8px 0', fontSize: 13, color: '#151A24' }}>Second Level</div>
              <div style={{ padding: '8px 0', fontSize: 13, color: '#151A24' }}>Third Level</div>
            </div>
            <div style={{ width: 220 }}>
              <Tree nodes={categoryTree} collapsedRail={false} nav={nav} />
            </div>
          </div>
        </FigmaFrame>
      </div>

      {/* side-section.png */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#151A24', marginBottom: 12 }}>SideNav — Section</div>
        <FigmaFrame style={{ display: 'inline-block' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ width: 80, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <span style={{ fontSize: 13, color: '#151A24' }}>Section 1</span>
              <span style={{ fontSize: 13, color: '#151A24' }}>Section 2</span>
            </div>
            <div style={{ width: 220 }}>
              <Tree nodes={sectionOneTree} collapsedRail={false} nav={nav} />
              <div style={{ height: 16 }} />
              <Tree nodes={sectionTwoTree} collapsedRail={false} nav={nav} />
            </div>
          </div>
        </FigmaFrame>
      </div>

      {/* side-states.png — intentionally static, this IS the states reference */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#151A24', marginBottom: 12 }}>SideNav — States</div>
        <FigmaFrame style={{ display: 'inline-block' }}>
          {stateRows.map((row) => (
            <LabeledRow key={row.key} label={row.label}>
              <div style={{ width: 200 }}>
                <StaticStateItem label="Label" state={row.key} />
              </div>
            </LabeledRow>
          ))}
        </FigmaFrame>
      </div>

      {/* side-expand.png — real, clickable collapse toggle */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#151A24', marginBottom: 12 }}>SideNav — Expanded / Collapsed</div>
        <FigmaFrame style={{ display: 'inline-flex', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 13, color: '#151A24', marginBottom: 8 }}>{specCollapsed ? 'Collapsed' : 'Expanded'} (click Collapse to toggle)</div>
            <SideNavShell collapsedRail={specCollapsed} onToggleCollapsed={() => setSpecCollapsed((c) => !c)} nav={nav} />
          </div>
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
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
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