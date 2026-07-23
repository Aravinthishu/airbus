'use client';
import React, { useState } from 'react';

/* ============================================================
   TYPES & DATA
============================================================ */
type ComponentId = 'button' | 'buttongroup' | 'fab' | 'inputfield' | 'textarea' | 'checkbox' | 'datepicker';
type Status = 'pass' | 'warn' | 'fail';

interface CategoryDef {
  id: string;
  name: string;
  icon: string;
  color: string;
  tint: string;
  desc: string;
  items: ComponentId[];
}

interface ComponentDef {
  name: string;
  cat: string;
  pass: number;
  total: number;
  status: Status;
  desc: string;
}

interface A11yCheck {
  code: string;
  name: string;
  status: Status;
  value: string;
  note: string;
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'actions',
    name: 'Actions & Triggers',
    icon: '⚡',
    color: '#0a67e8',
    tint: 'rgba(10,103,232,0.08)',
    desc: 'Components that let users perform an action or trigger a change in the interface.',
    items: ['button', 'buttongroup', 'fab'],
  },
  {
    id: 'inputs',
    name: 'Inputs & Forms',
    icon: '✎',
    color: '#0e8fa6',
    tint: 'rgba(14,143,166,0.08)',
    desc: 'Components used to collect user data or allow for selection.',
    items: ['inputfield', 'textarea', 'checkbox', 'datepicker'],
  },
  {
    id: 'navigation',
    name: 'Navigation',
    icon: '⇢',
    color: '#c2600a',
    tint: 'rgba(194,96,10,0.08)',
    desc: 'Wayfinding components — breadcrumbs, tabs, and side navigation.',
    items: [],
  },
  {
    id: 'data',
    name: 'Data Display',
    icon: '▤',
    color: '#0a7a50',
    tint: 'rgba(10,122,80,0.08)',
    desc: 'Components for presenting structured information — tables, cards, and accordions.',
    items: [],
  },
];

const COMPONENTS: Record<ComponentId, ComponentDef> = {
  button: { name: 'Button', cat: 'actions', pass: 4, total: 5, status: 'fail', desc: 'Primary action trigger across all products. Available in 7 semantic variants and 5 sizes.' },
  buttongroup: { name: 'Button Group', cat: 'actions', pass: 2, total: 3, status: 'warn', desc: 'Connected strip of related action buttons. Overflow collapses into a "+N" control.' },
  fab: { name: 'Float Action Button', cat: 'actions', pass: 3, total: 4, status: 'warn', desc: 'Persistent circular action that expands into a speed-dial of related shortcuts.' },
  inputfield: { name: 'Input Field', cat: 'inputs', pass: 3, total: 5, status: 'fail', desc: 'Core single-line input with prefix/suffix, validation states, and error communication.' },
  textarea: { name: 'Text Area', cat: 'inputs', pass: 2, total: 4, status: 'fail', desc: 'Multi-line input for longer form content, with live character count and validation states.' },
  checkbox: { name: 'Checkbox', cat: 'inputs', pass: 3, total: 4, status: 'fail', desc: 'Binary or indeterminate selection control, available in two sizes.' },
  datepicker: { name: 'Date & Time Picker', cat: 'inputs', pass: 3, total: 5, status: 'fail', desc: 'Simple date entry paired with a calendar overlay for precise selection.' },
};

const A11Y_CHECKS: Record<ComponentId, A11yCheck[]> = {
  button: [
    { code: '1.4.3', name: 'Text Contrast — Primary', status: 'pass', value: '9.87:1', note: 'White text on the primary blue exceeds AAA.' },
    { code: '1.4.3', name: 'Ghost Negative label', status: 'fail', value: '2.4:1', note: 'Falls below 4.5:1 on light backgrounds — needs a darker label.' },
    { code: '2.4.7', name: 'Focus visibility', status: 'pass', value: '3px ring', note: 'Every variant shows a clear focus ring at 3:1 minimum contrast.' },
    { code: '4.1.2', name: 'Name, role, value', status: 'pass', value: 'Pass', note: 'Buttons expose an accessible name via visible text.' },
  ],
  buttongroup: [
    { code: '1.4.3', name: 'Selected contrast', status: 'pass', value: '9.87:1', note: 'The selected segment uses the primary blue — passes AAA.' },
    { code: '4.1.3', name: 'Overflow announcement', status: 'warn', value: 'Partial', note: '"+N" is visual only — screen readers miss the collapsed items.' },
    { code: '2.1.1', name: 'Keyboard navigation', status: 'pass', value: 'Pass', note: 'Arrow keys move focus between segments as expected.' },
  ],
  fab: [
    { code: '2.4.7', name: 'Speed-dial focus order', status: 'warn', value: 'Partial', note: 'Tooltip only appears after the item receives focus — order needs review.' },
    { code: '4.1.2', name: 'Expand/collapse state', status: 'pass', value: 'aria-expanded', note: 'The trigger correctly reports expanded / collapsed to assistive tech.' },
    { code: '1.4.11', name: 'Non-text contrast', status: 'pass', value: '3.6:1', note: 'Icon-only mini buttons meet the 3:1 minimum against their background.' },
    { code: '2.5.5', name: 'Target size', status: 'warn', value: '42px', note: 'Slightly under the 44px comfortable target size on dense layouts.' },
  ],
  inputfield: [
    { code: '1.4.3', name: 'Label contrast', status: 'fail', value: '2.76:1', note: 'Label colour fails the AA minimum — needs to darken.' },
    { code: '3.3.1', name: 'Error identification', status: 'pass', value: 'Pass', note: 'Errors use icon + colour + text helper, not colour alone.' },
    { code: '1.3.1', name: 'Label association', status: 'pass', value: 'Pass', note: 'Every input is programmatically linked to its label element.' },
    { code: '1.4.3', name: 'Placeholder contrast', status: 'fail', value: '2.1:1', note: 'Placeholder text is too light to rely on for instructions.' },
    { code: '2.4.6', name: 'Helper text linkage', status: 'pass', value: 'aria-describedby', note: 'Helper and error text are announced alongside the field.' },
  ],
  textarea: [
    { code: '1.4.3', name: 'Label contrast', status: 'fail', value: '2.9:1', note: 'Shares the same under-contrast label token as Input Field.' },
    { code: '1.3.1', name: 'Character count linkage', status: 'warn', value: 'Partial', note: 'Live counter isn\u2019t consistently announced by screen readers.' },
    { code: '1.4.11', name: 'Resize handle contrast', status: 'pass', value: '3.4:1', note: 'The resize affordance is visible against the field background.' },
    { code: '2.4.7', name: 'Focus visibility', status: 'fail', value: '1.8:1', note: 'Focus ring blends into the default border colour — needs contrast.' },
  ],
  checkbox: [
    { code: '1.4.11', name: 'Unselected border', status: 'fail', value: '2.8:1', note: 'Border colour is below the 3:1 minimum for non-text UI.' },
    { code: '1.4.3', name: 'Selected contrast', status: 'pass', value: '8.4:1', note: 'The filled, checked state passes AAA.' },
    { code: '4.1.2', name: 'Indeterminate state', status: 'pass', value: 'aria-checked=mixed', note: 'Indeterminate is correctly exposed to assistive tech.' },
    { code: '2.5.5', name: 'Target size (M)', status: 'warn', value: '22px', note: 'The default size sits under the 24px comfortable target — use L on touch.' },
  ],
  datepicker: [
    { code: '2.1.1', name: 'Keyboard date selection', status: 'pass', value: 'Pass', note: 'Arrow keys move between days once the calendar is open.' },
    { code: '4.1.2', name: 'Calendar dialog role', status: 'warn', value: 'Partial', note: 'Popover isn\u2019t consistently announced as a dialog on open.' },
    { code: '1.4.3', name: 'Disabled date contrast', status: 'fail', value: '2.0:1', note: 'Faded out-of-range days fall well under legibility thresholds.' },
    { code: '3.3.1', name: 'Error identification', status: 'pass', value: 'Pass', note: 'Invalid dates surface icon + colour + inline text.' },
    { code: '2.4.3', name: 'Focus order on open', status: 'fail', value: 'Fail', note: 'Focus doesn\u2019t move into the calendar automatically when it opens.' },
  ],
};

/* ============================================================
   SHARED VISUAL HELPERS
============================================================ */
const statusColor = (status: Status) =>
  status === 'pass' ? '#0a7a50' : status === 'warn' ? '#8c5e08' : '#b00020';
const statusBg = (status: Status) =>
  status === 'pass' ? 'rgba(10,122,80,0.10)' : status === 'warn' ? 'rgba(140,94,8,0.10)' : 'rgba(176,0,32,0.10)';
const statusIcon = (status: Status) => (status === 'pass' ? '✓' : status === 'warn' ? '⚠' : '✕');

function MiniBadge({ status, pass, total }: { status: Status; pass: number; total: number }) {
  return (
    <span
      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
      style={{ color: statusColor(status), background: statusBg(status) }}
    >
      {pass}/{total}
    </span>
  );
}

function PropChip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-all"
      style={
        active
          ? { color: '#0a67e8', borderColor: '#B9CCF2', background: 'rgba(10,103,232,0.08)' }
          : { color: '#6B6B6B', borderColor: '#D8D4CC', background: '#FFFFFF' }
      }
    >
      {children}
    </button>
  );
}

function SpecBadge({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[10px] font-mono px-3 py-1.5 rounded-lg mb-4"
      style={{ color: '#0a67e8', background: 'rgba(10,103,232,0.06)', border: '1px dashed rgba(10,103,232,0.3)' }}
    >
      ◆ {label} · spec
    </div>
  );
}

function SpecBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4 mb-4 last:mb-0"
      style={{ border: '1px dashed rgba(10,103,232,0.25)', background: 'rgba(255,255,255,0.6)' }}
    >
      <div className="text-[10px] font-bold uppercase tracking-widest mb-3.5" style={{ color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function SpecState({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="min-h-[50px] flex items-center justify-center">{children}</div>
      <div className="text-[9px] font-bold uppercase tracking-wide" style={{ color: '#8089A0' }}>
        {label}
      </div>
    </div>
  );
}

/* ============================================================
   LIVE DEMOS
============================================================ */
const BTN_VARIANTS: { key: string; label: string; cls: string }[] = [
  { key: 'primary', label: 'Primary', cls: '' },
  { key: 'secondary', label: 'Secondary', cls: '' },
  { key: 'ghost', label: 'Ghost', cls: '' },
  { key: 'ghostneg', label: 'Ghost Negative', cls: '' },
  { key: 'success', label: 'Success', cls: '' },
  { key: 'warning', label: 'Warning', cls: '' },
  { key: 'error', label: 'Error', cls: '' },
];
const BTN_SIZE_MAP: Record<string, string> = {
  xl: 'px-8 py-4 text-base',
  l: 'px-6 py-3.5 text-sm',
  m: 'px-5 py-2.5 text-sm',
  s: 'px-4 py-2 text-xs',
  xs: 'px-3 py-1.5 text-xs',
};

function btnVariantStyle(variant: string): React.CSSProperties {
  switch (variant) {
    case 'primary':
      return { background: '#0a67e8', color: '#fff', boxShadow: '0 6px 18px rgba(10,103,232,0.28)' };
    case 'secondary':
      return { background: 'transparent', color: '#0a67e8', border: '1.5px solid #0a67e8' };
    case 'ghost':
      return { background: 'transparent', color: '#151A24' };
    case 'ghostneg':
      return { background: '#0D0D0D', color: '#fff' };
    case 'success':
      return { background: '#0a7a50', color: '#fff' };
    case 'warning':
      return { background: '#DDAB17', color: '#3A2B00' };
    case 'error':
      return { background: '#B00020', color: '#fff' };
    default:
      return {};
  }
}

function ButtonDemo() {
  const [variant, setVariant] = useState('primary');
  const [size, setSize] = useState('l');
  return (
    <>
      <div className="p-10 flex items-center justify-center min-h-[220px]" style={{ background: 'repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)' }}>
        <button
          className={`rounded-xl font-semibold transition-all ${BTN_SIZE_MAP[size]}`}
          style={{ fontFamily: "'DM Sans', sans-serif", ...btnVariantStyle(variant) }}
        >
          Launch
        </button>
      </div>
      <div className="p-5 border-t" style={{ borderColor: '#EFEDE8' }}>
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Variant</div>
          <div className="flex flex-wrap gap-2">
            {BTN_VARIANTS.map((v) => (
              <PropChip key={v.key} active={variant === v.key} onClick={() => setVariant(v.key)}>{v.label}</PropChip>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Size</div>
          <div className="flex flex-wrap gap-2">
            {['xl', 'l', 'm', 's', 'xs'].map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>{s.toUpperCase()}</PropChip>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ButtonSpec() {
  return (
    <div className="p-6">
      <SpecBadge label="Button" />
      <SpecBlock title="States — Primary">
        <div className="flex flex-wrap gap-4">
          <SpecState label="Default"><button className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ ...btnVariantStyle('primary'), fontFamily: "'DM Sans', sans-serif" }}>Launch</button></SpecState>
          <SpecState label="Hover"><button className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ ...btnVariantStyle('primary'), background: '#0850BA', fontFamily: "'DM Sans', sans-serif" }}>Launch</button></SpecState>
          <SpecState label="Active"><button className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ ...btnVariantStyle('primary'), background: '#063E8F', transform: 'scale(.96)', fontFamily: "'DM Sans', sans-serif" }}>Launch</button></SpecState>
          <SpecState label="Focus"><button className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ ...btnVariantStyle('primary'), boxShadow: '0 0 0 3px rgba(10,103,232,0.25), 0 6px 18px rgba(10,103,232,0.28)', fontFamily: "'DM Sans', sans-serif" }}>Launch</button></SpecState>
          <SpecState label="Disabled"><button className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ ...btnVariantStyle('primary'), opacity: 0.4, fontFamily: "'DM Sans', sans-serif" }}>Launch</button></SpecState>
        </div>
      </SpecBlock>
      <SpecBlock title="Variants">
        <div className="flex flex-wrap gap-2">
          {BTN_VARIANTS.map((v) => (
            <button key={v.key} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ ...btnVariantStyle(v.key), fontFamily: "'DM Sans', sans-serif" }}>{v.label}</button>
          ))}
        </div>
      </SpecBlock>
      <SpecBlock title="Sizes">
        <div className="flex flex-wrap items-center gap-5">
          {['xl', 'l', 'm', 's', 'xs'].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <button className={`rounded-xl font-semibold ${BTN_SIZE_MAP[s]}`} style={{ ...btnVariantStyle('primary'), fontFamily: "'DM Sans', sans-serif" }}>Launch</button>
              <span className="text-[9px] font-mono" style={{ color: '#8089A0' }}>{s.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </SpecBlock>
    </div>
  );
}

function ButtonGroupDemo() {
  const [count, setCount] = useState<'2' | '3' | '4' | 'overflow'>('3');
  const [size, setSize] = useState<'s' | 'm' | 'l'>('m');
  const [selected, setSelected] = useState(0);
  const sizeMap: Record<string, string> = { s: 'px-3.5 py-2 text-xs', m: 'px-5 py-2.5 text-xs', l: 'px-6 py-3.5 text-sm' };
  const labels = ['Filter A', 'Filter B', 'Filter C', 'Filter D'];
  const n = count === 'overflow' ? 4 : parseInt(count, 10);
  return (
    <>
      <div className="p-10 flex items-center justify-center min-h-[220px]">
        <div className="inline-flex rounded-xl overflow-hidden border" style={{ borderColor: '#D8D4CC' }}>
          {Array.from({ length: n }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`${sizeMap[size]} font-semibold border-r last:border-r-0 transition-colors`}
              style={{
                borderColor: '#D8D4CC',
                background: selected === i ? '#0a67e8' : '#FFFFFF',
                color: selected === i ? '#fff' : '#6B6B6B',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {labels[i]}
            </button>
          ))}
          {count === 'overflow' && (
            <div className={`${sizeMap[size]} font-semibold flex items-center`} style={{ color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>+2</div>
          )}
        </div>
      </div>
      <div className="p-5 border-t space-y-4" style={{ borderColor: '#EFEDE8' }}>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Item Count</div>
          <div className="flex gap-2">
            {(['2', '3', '4', 'overflow'] as const).map((c) => (
              <PropChip key={c} active={count === c} onClick={() => setCount(c)}>{c === 'overflow' ? 'Overflow' : c}</PropChip>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Size</div>
          <div className="flex gap-2">
            {(['s', 'm', 'l'] as const).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>{s.toUpperCase()}</PropChip>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ButtonGroupSpec() {
  return (
    <div className="p-6">
      <SpecBadge label="Button Group" />
      <SpecBlock title="Sizes — 3 items">
        <div className="flex flex-wrap items-center gap-6">
          {(['l', 'm', 's'] as const).map((sz) => (
            <div key={sz} className="flex flex-col items-center gap-2">
              <div className="inline-flex rounded-xl overflow-hidden border" style={{ borderColor: '#D8D4CC' }}>
                {['A', 'B', 'C'].map((l, i) => (
                  <div key={l} className={`${sz === 'l' ? 'px-5 py-3 text-sm' : sz === 'm' ? 'px-4 py-2.5 text-xs' : 'px-3 py-1.5 text-[11px]'} font-semibold border-r last:border-r-0`} style={{ borderColor: '#D8D4CC', background: i === 0 ? '#0a67e8' : '#fff', color: i === 0 ? '#fff' : '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>{l}</div>
                ))}
              </div>
              <span className="text-[9px] font-mono" style={{ color: '#8089A0' }}>{sz.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </SpecBlock>
      <SpecBlock title="4 items, with overflow">
        <div className="inline-flex rounded-xl overflow-hidden border" style={{ borderColor: '#D8D4CC' }}>
          {['A', 'B', 'C', 'D'].map((l, i) => (
            <div key={l} className="px-4 py-2.5 text-xs font-semibold border-r last:border-r-0" style={{ borderColor: '#D8D4CC', background: i === 0 ? '#0a67e8' : '#fff', color: i === 0 ? '#fff' : '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>{l}</div>
          ))}
        </div>
        <div className="mt-2 inline-block px-3 py-1.5 text-xs font-semibold rounded-lg" style={{ color: '#8089A0', background: '#EBF8FF', fontFamily: "'DM Sans', sans-serif" }}>+2</div>
      </SpecBlock>
    </div>
  );
}

function FabDemo() {
  const [size, setSize] = useState<'s' | 'l'>('l');
  const [open, setOpen] = useState(false);
  const main = size === 'l' ? 60 : 44;
  const mini = size === 'l' ? 44 : 36;
  return (
    <>
      <div className="p-10 flex items-end justify-center min-h-[220px]">
        <div className="relative flex flex-col items-center gap-3" style={{ height: 200 }}>
          {['🔗', '✉', '🖨'].map((icon, i) => (
            <div
              key={icon}
              className="rounded-full border flex items-center justify-center shadow-md transition-all"
              style={{
                width: mini, height: mini, borderColor: '#D8D4CC', background: '#fff', color: '#0a67e8',
                opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(10px)', transitionDelay: `${i * 40}ms`,
              }}
            >
              {icon}
            </div>
          ))}
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full flex items-center justify-center text-white shadow-lg transition-transform"
            style={{ width: main, height: main, background: '#0a67e8', fontSize: main * 0.4, fontFamily: "'DM Sans', sans-serif" }}
          >
            {open ? '×' : '+'}
          </button>
        </div>
      </div>
      <div className="p-5 border-t space-y-3" style={{ borderColor: '#EFEDE8' }}>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Size</div>
          <div className="flex gap-2">
            {(['s', 'l'] as const).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>{s.toUpperCase()}</PropChip>
            ))}
          </div>
        </div>
        <p className="text-xs" style={{ color: '#8089A0' }}>Click the button to expand the speed-dial.</p>
      </div>
    </>
  );
}

function FabSpec() {
  return (
    <div className="p-6">
      <SpecBadge label="Float Action Button" />
      <SpecBlock title="States — Size L">
        <div className="flex flex-wrap gap-5">
          <SpecState label="Default"><div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-lg" style={{ background: '#0a67e8', fontFamily: "'DM Sans', sans-serif" }}>+</div></SpecState>
          <SpecState label="Hover"><div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-lg" style={{ background: '#0850BA', fontFamily: "'DM Sans', sans-serif" }}>+</div></SpecState>
          <SpecState label="Active"><div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-lg" style={{ background: '#063E8F', transform: 'scale(.94)', fontFamily: "'DM Sans', sans-serif" }}>×</div></SpecState>
          <SpecState label="Focus"><div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-lg" style={{ background: '#0a67e8', boxShadow: '0 0 0 4px rgba(10,103,232,0.25)', fontFamily: "'DM Sans', sans-serif" }}>+</div></SpecState>
          <SpecState label="Disabled"><div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-lg" style={{ background: '#0a67e8', opacity: 0.4, fontFamily: "'DM Sans', sans-serif" }}>+</div></SpecState>
        </div>
      </SpecBlock>
      <SpecBlock title="Sizes">
        <div className="flex items-end gap-6">
          <SpecState label="L"><div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg" style={{ background: '#0a67e8', fontFamily: "'DM Sans', sans-serif" }}>+</div></SpecState>
          <SpecState label="S"><div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg shadow-lg" style={{ background: '#0a67e8', fontFamily: "'DM Sans', sans-serif" }}>+</div></SpecState>
        </div>
      </SpecBlock>
    </div>
  );
}

function InputFieldDemo() {
  const [appearance, setAppearance] = useState<'default' | 'error' | 'warning' | 'success' | 'disabled'>('default');
  const [size, setSize] = useState<'xs' | 's' | 'm' | 'l' | 'xl'>('m');
  const [prefix, setPrefix] = useState<'none' | 'icon' | 'text'>('none');
  const [suffix, setSuffix] = useState<'none' | 'icon' | 'clear'>('none');
  const sizeMap: Record<string, string> = { xs: 'px-3 py-1.5 text-xs', s: 'px-3.5 py-2 text-xs', m: 'px-4 py-2.5 text-sm', l: 'px-4.5 py-3 text-sm', xl: 'px-5 py-4 text-base' };
  const helpText: Record<string, string> = {
    default: 'Use your company email address.', error: 'Enter a valid email address.', warning: 'This email domain is unverified.', success: 'Email verified successfully.', disabled: 'This field is currently locked.',
  };
  const borderColor = appearance === 'error' ? '#B00020' : appearance === 'warning' ? '#DDAB17' : appearance === 'success' ? '#0a7a50' : '#D8D4CC';
  const helpColor = appearance === 'error' ? '#B00020' : appearance === 'warning' ? '#8C5E08' : '#8089A0';
  return (
    <>
      <div className="p-10 flex items-center justify-center min-h-[220px]">
        <div className="flex flex-col gap-1.5 w-72">
          <label className="text-xs font-semibold" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>Email address</label>
          <div className={`flex items-center gap-2 rounded-xl border ${sizeMap[size]}`} style={{ borderColor, background: appearance === 'disabled' ? '#EBF8FF' : '#fff', opacity: appearance === 'disabled' ? 0.6 : 1 }}>
            {prefix !== 'none' && <span className="font-mono" style={{ color: '#8089A0' }}>{prefix === 'icon' ? '@' : 'https://'}</span>}
            <input
              disabled={appearance === 'disabled'}
              placeholder="you@company.com"
              className="flex-1 outline-none bg-transparent"
              style={{ color: '#151A24', fontFamily: "'DM Sans', sans-serif" }}
            />
            {suffix !== 'none' && <span className="font-mono" style={{ color: '#8089A0' }}>{suffix === 'clear' ? '✕' : '✓'}</span>}
          </div>
          <p className="text-xs" style={{ color: helpColor, fontFamily: "'DM Sans', sans-serif" }}>{helpText[appearance]}</p>
        </div>
      </div>
      <div className="p-5 border-t space-y-4" style={{ borderColor: '#EFEDE8' }}>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Appearance</div>
          <div className="flex flex-wrap gap-2">
            {(['default', 'error', 'warning', 'success', 'disabled'] as const).map((a) => (
              <PropChip key={a} active={appearance === a} onClick={() => setAppearance(a)}>{a[0].toUpperCase() + a.slice(1)}</PropChip>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Size</div>
          <div className="flex flex-wrap gap-2">
            {(['xs', 's', 'm', 'l', 'xl'] as const).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>{s.toUpperCase()}</PropChip>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Prefix</div>
          <div className="flex gap-2">
            {(['none', 'icon', 'text'] as const).map((p) => (
              <PropChip key={p} active={prefix === p} onClick={() => setPrefix(p)}>{p === 'none' ? 'None' : p === 'icon' ? '@' : 'https://'}</PropChip>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Suffix</div>
          <div className="flex gap-2">
            {(['none', 'icon', 'clear'] as const).map((s) => (
              <PropChip key={s} active={suffix === s} onClick={() => setSuffix(s)}>{s === 'none' ? 'None' : s === 'icon' ? '✓' : '✕'}</PropChip>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function InputFieldSpec() {
  const states: { label: string; border: string; value?: string; disabled?: boolean }[] = [
    { label: 'Default', border: '#D8D4CC' },
    { label: 'Focus', border: '#0a67e8' },
    { label: 'Error', border: '#B00020', value: 'wrong@' },
    { label: 'Success', border: '#0a7a50', value: 'ok@company.com' },
    { label: 'Disabled', border: '#D8D4CC', disabled: true },
  ];
  return (
    <div className="p-6">
      <SpecBadge label="Input Field" />
      <SpecBlock title="States">
        <div className="flex flex-wrap gap-4">
          {states.map((s) => (
            <SpecState key={s.label} label={s.label}>
              <div className="rounded-xl border px-3.5 py-2.5 text-xs w-40" style={{ borderColor: s.border, background: s.disabled ? '#EBF8FF' : '#fff', opacity: s.disabled ? 0.6 : 1, color: s.value ? '#151A24' : '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
                {s.value || 'you@company.com'}
              </div>
            </SpecState>
          ))}
        </div>
      </SpecBlock>
      <SpecBlock title="Sizes">
        <div className="flex flex-wrap items-center gap-5">
          {(['xl', 'm', 'xs'] as const).map((sz) => (
            <div key={sz} className="flex flex-col items-center gap-2">
              <div className={`rounded-xl border w-40 ${sz === 'xl' ? 'px-5 py-4 text-base' : sz === 'm' ? 'px-4 py-2.5 text-sm' : 'px-3 py-1.5 text-xs'}`} style={{ borderColor: '#D8D4CC', color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>Label</div>
              <span className="text-[9px] font-mono" style={{ color: '#8089A0' }}>{sz.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </SpecBlock>
    </div>
  );
}

function TextAreaDemo() {
  const [state, setState] = useState<'default' | 'error' | 'warning' | 'success' | 'disabled'>('default');
  const [size, setSize] = useState<'s' | 'm' | 'l'>('m');
  const [value, setValue] = useState('');
  const heightMap: Record<string, string> = { s: 'h-20', m: 'h-28', l: 'h-36' };
  const borderColor = state === 'error' ? '#B00020' : state === 'warning' ? '#DDAB17' : state === 'success' ? '#0a7a50' : '#D8D4CC';
  const helpText: Record<string, string> = {
    default: 'Optional — up to 240 characters.', error: 'Please add a little more detail.', warning: 'You are close to the limit.', success: 'Thanks — that is helpful.', disabled: 'This field is currently locked.',
  };
  return (
    <>
      <div className="p-10 flex items-center justify-center min-h-[220px]">
        <div className="flex flex-col gap-1.5 w-80">
          <label className="text-xs font-semibold" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>Feedback</label>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={state === 'disabled'}
            placeholder="Tell us what could be better…"
            className={`rounded-xl border px-4 py-3 text-sm outline-none resize-none ${heightMap[size]}`}
            style={{ borderColor, background: state === 'disabled' ? '#EBF8FF' : '#fff', color: '#151A24', fontFamily: "'DM Sans', sans-serif" }}
          />
          <div className="flex justify-between text-xs" style={{ color: state === 'error' ? '#B00020' : state === 'warning' ? '#8C5E08' : '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
            <span>{helpText[state]}</span>
            <span className="font-mono">{value.length}/240</span>
          </div>
        </div>
      </div>
      <div className="p-5 border-t space-y-4" style={{ borderColor: '#EFEDE8' }}>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>State</div>
          <div className="flex flex-wrap gap-2">
            {(['default', 'error', 'warning', 'success', 'disabled'] as const).map((s) => (
              <PropChip key={s} active={state === s} onClick={() => setState(s)}>{s[0].toUpperCase() + s.slice(1)}</PropChip>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Size</div>
          <div className="flex gap-2">
            {(['s', 'm', 'l'] as const).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>{s.toUpperCase()}</PropChip>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function TextAreaSpec() {
  return (
    <div className="p-6">
      <SpecBadge label="Text Area" />
      <SpecBlock title="States">
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Default', border: '#D8D4CC', text: '' },
            { label: 'Focus', border: '#0a67e8', text: '' },
            { label: 'Error', border: '#B00020', text: 'Too short' },
            { label: 'Disabled', border: '#D8D4CC', text: 'Locked', disabled: true },
          ].map((s) => (
            <SpecState key={s.label} label={s.label}>
              <div className="rounded-xl border w-40 h-16 px-3 py-2 text-xs" style={{ borderColor: s.border, background: s.disabled ? '#EBF8FF' : '#fff', opacity: s.disabled ? 0.6 : 1, color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>{s.text}</div>
            </SpecState>
          ))}
        </div>
      </SpecBlock>
    </div>
  );
}

function CheckboxDemo() {
  const [size, setSize] = useState<'m' | 'l'>('m');
  const [rows, setRows] = useState<{ label: string; state: 'unchecked' | 'checked' | 'indeterminate' }[]>([
    { label: 'Notify me by email', state: 'unchecked' },
    { label: 'Remember this device', state: 'checked' },
    { label: 'Select all permissions', state: 'indeterminate' },
  ]);
  const dim = size === 'l' ? 28 : 22;
  const toggle = (i: number) => {
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, state: row.state === 'unchecked' ? 'checked' : 'unchecked' } : row)));
  };
  return (
    <>
      <div className="p-10 flex items-center justify-center min-h-[220px]">
        <div className="flex flex-col gap-1">
          {rows.map((row, i) => (
            <div key={row.label} onClick={() => toggle(i)} className="flex items-center gap-3 py-2.5 cursor-pointer">
              <div
                className="rounded-md flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  width: dim, height: dim, borderRadius: size === 'l' ? 8 : 6,
                  border: row.state === 'unchecked' ? '2px solid #D8D4CC' : 'none',
                  background: row.state === 'unchecked' ? 'transparent' : '#0a67e8',
                  color: '#fff', fontSize: size === 'l' ? 14 : 12,
                }}
              >
                {row.state === 'checked' ? '✓' : row.state === 'indeterminate' ? '–' : ''}
              </div>
              <span className="text-sm" style={{ color: '#151A24', fontFamily: "'DM Sans', sans-serif" }}>{row.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-5 border-t space-y-3" style={{ borderColor: '#EFEDE8' }}>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Size</div>
          <div className="flex gap-2">
            {(['m', 'l'] as const).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>{s.toUpperCase()}</PropChip>
            ))}
          </div>
        </div>
        <p className="text-xs" style={{ color: '#8089A0' }}>Click any row to toggle its state.</p>
      </div>
    </>
  );
}

function CheckboxSpec() {
  return (
    <div className="p-6">
      <SpecBadge label="Checkbox" />
      <SpecBlock title="States">
        <div className="flex flex-wrap gap-5">
          <SpecState label="Unselected"><div className="w-6 h-6 rounded-md" style={{ border: '2px solid #D8D4CC' }} /></SpecState>
          <SpecState label="Selected"><div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs" style={{ background: '#0a67e8', fontFamily: "'DM Sans', sans-serif" }}>✓</div></SpecState>
          <SpecState label="Indeterminate"><div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs" style={{ background: '#0a67e8', fontFamily: "'DM Sans', sans-serif" }}>–</div></SpecState>
          <SpecState label="Focus"><div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs" style={{ background: '#0a67e8', boxShadow: '0 0 0 3px rgba(10,103,232,0.25)', fontFamily: "'DM Sans', sans-serif" }}>✓</div></SpecState>
          <SpecState label="Disabled"><div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs" style={{ background: '#0a67e8', opacity: 0.4, fontFamily: "'DM Sans', sans-serif" }}>✓</div></SpecState>
        </div>
      </SpecBlock>
      <SpecBlock title="Sizes">
        <div className="flex items-center gap-6">
          <SpecState label="L"><div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm" style={{ background: '#0a67e8', fontFamily: "'DM Sans', sans-serif" }}>✓</div></SpecState>
          <SpecState label="M"><div className="w-[22px] h-[22px] rounded-md flex items-center justify-center text-white text-xs" style={{ background: '#0a67e8', fontFamily: "'DM Sans', sans-serif" }}>✓</div></SpecState>
        </div>
      </SpecBlock>
    </div>
  );
}

function DatePickerDemo() {
  const [size, setSize] = useState<'s' | 'm' | 'l'>('m');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const sizeMap: Record<string, string> = { s: 'px-3.5 py-2 text-xs', m: 'px-4 py-2.5 text-sm', l: 'px-4.5 py-3 text-sm' };
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const leadDays = [26, 27, 28, 29, 30];
  return (
    <>
      <div className="p-10 flex items-start justify-center min-h-[220px]">
        <div className="flex flex-col gap-1.5 w-64">
          <label className="text-xs font-semibold" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>Departure date</label>
          <div
            onClick={() => setOpen((o) => !o)}
            className={`flex items-center justify-between rounded-xl border cursor-pointer ${sizeMap[size]}`}
            style={{ borderColor: '#D8D4CC', background: '#fff' }}
          >
            <span style={{ color: selected ? '#151A24' : '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
              {selected ? `2024/12/${String(selected).padStart(2, '0')}` : 'yyyy/mm/dd'}
            </span>
            <span style={{ color: '#8089A0' }}>📅</span>
          </div>
          {open && (
            <div className="rounded-xl border p-3.5 mt-1 shadow-lg bg-white" style={{ borderColor: '#D8D4CC' }}>
              <div className="flex items-center justify-between mb-2.5 text-xs font-semibold" style={{ color: '#151A24', fontFamily: "'DM Sans', sans-serif" }}>
                <span className="cursor-pointer" style={{ color: '#8089A0' }}>‹</span>
                <span>December 2024</span>
                <span className="cursor-pointer" style={{ color: '#8089A0' }}>›</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {days.map((d) => (
                  <div key={d} className="text-[9px]" style={{ color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>{d}</div>
                ))}
                {leadDays.map((d) => (
                  <div key={`lead-${d}`} className="text-xs py-1 rounded" style={{ color: '#C8C4BC', fontFamily: "'DM Sans', sans-serif" }}>{d}</div>
                ))}
                {Array.from({ length: 29 }).map((_, i) => {
                  const d = i + 1;
                  return (
                    <div
                      key={d}
                      onClick={() => { setSelected(d); setOpen(false); }}
                      className="text-xs py-1 rounded cursor-pointer"
                      style={{ background: selected === d ? '#0a67e8' : 'transparent', color: selected === d ? '#fff' : '#151A24', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {d}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-5 border-t space-y-3" style={{ borderColor: '#EFEDE8' }}>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#8089A0' }}>Size</div>
          <div className="flex gap-2">
            {(['s', 'm', 'l'] as const).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>{s.toUpperCase()}</PropChip>
            ))}
          </div>
        </div>
        <p className="text-xs" style={{ color: '#8089A0' }}>Click the field to open the calendar.</p>
      </div>
    </>
  );
}

function DatePickerSpec() {
  return (
    <div className="p-6">
      <SpecBadge label="Date & Time Picker" />
      <SpecBlock title="States">
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Default', border: '#D8D4CC', value: '' },
            { label: 'Focus', border: '#0a67e8', value: '' },
            { label: 'Filled', border: '#D8D4CC', value: '2024/12/17' },
            { label: 'Error', border: '#B00020', value: '2024/13/40' },
          ].map((s) => (
            <SpecState key={s.label} label={s.label}>
              <div className="rounded-xl border px-3.5 py-2.5 text-xs w-36 flex items-center justify-between" style={{ borderColor: s.border, color: s.value ? '#151A24' : '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
                <span>{s.value || 'yyyy/mm/dd'}</span><span>📅</span>
              </div>
            </SpecState>
          ))}
        </div>
      </SpecBlock>
    </div>
  );
}

function LiveDemo({ id }: { id: ComponentId }) {
  switch (id) {
    case 'button': return <ButtonDemo />;
    case 'buttongroup': return <ButtonGroupDemo />;
    case 'fab': return <FabDemo />;
    case 'inputfield': return <InputFieldDemo />;
    case 'textarea': return <TextAreaDemo />;
    case 'checkbox': return <CheckboxDemo />;
    case 'datepicker': return <DatePickerDemo />;
    default: return null;
  }
}

function SpecSheet({ id }: { id: ComponentId }) {
  switch (id) {
    case 'button': return <ButtonSpec />;
    case 'buttongroup': return <ButtonGroupSpec />;
    case 'fab': return <FabSpec />;
    case 'inputfield': return <InputFieldSpec />;
    case 'textarea': return <TextAreaSpec />;
    case 'checkbox': return <CheckboxSpec />;
    case 'datepicker': return <DatePickerSpec />;
    default: return null;
  }
}

/* ============================================================
   ACCESSIBILITY PANEL
============================================================ */
function A11yPanel({ id }: { id: ComponentId }) {
  const checks = A11Y_CHECKS[id] || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
      {checks.map((c, i) => (
        <div
          key={i}
          className="rounded-2xl p-4 border relative overflow-hidden"
          style={{ borderColor: '#D8D4CC', background: statusBg(c.status) }}
        >
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div>
              <div className="text-[9px] font-mono" style={{ color: '#8089A0' }}>{c.code}</div>
              <div className="text-sm font-bold mt-0.5" style={{ color: '#151A24', fontFamily: "'DM Sans', sans-serif" }}>{c.name}</div>
            </div>
            <div
              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
              style={{ color: statusColor(c.status), background: 'rgba(255,255,255,0.7)' }}
            >
              {statusIcon(c.status)} {c.value}
            </div>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>{c.note}</p>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   SUB-ACCORDION (component inside a category)
============================================================ */
function SubAccordionItem({
  id,
  index,
  isOpen,
  onToggle,
  activeTab,
  setActiveTab,
}: {
  id: ComponentId;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  activeTab: 'props' | 'a11y';
  setActiveTab: (t: 'props' | 'a11y') => void;
}) {
  const comp = COMPONENTS[id];
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: '#EFEDE8', background: isOpen ? 'rgba(10,103,232,0.02)' : 'transparent' }}>
      <div
        onClick={onToggle}
        className="px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <span className="text-[10px] font-mono w-5 flex-shrink-0" style={{ color: '#8089A0' }}>{String(index + 1).padStart(2, '0')}</span>
          <span className="text-sm font-semibold truncate" style={{ color: isOpen ? '#0a67e8' : '#151A24', fontFamily: "'DM Sans', sans-serif" }}>
            {comp.name}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <MiniBadge status={comp.status} pass={comp.pass} total={comp.total} />
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
            className="w-3.5 h-3.5 transition-transform"
            style={{ color: '#8089A0', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-1" style={{ borderTop: '1px dashed #EFEDE8' }}>
            <p className="text-xs leading-relaxed max-w-xl my-3.5" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>{comp.desc}</p>

            <div className="inline-flex gap-1 p-1 rounded-xl mb-4" style={{ background: '#EBF8FF' }}>
              <button
                onClick={() => setActiveTab('props')}
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                style={activeTab === 'props' ? { background: '#fff', color: '#0a67e8', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', fontFamily: "'DM Sans', sans-serif" } : { color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}
              >
                Properties
              </button>
              <button
                onClick={() => setActiveTab('a11y')}
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2"
                style={activeTab === 'a11y' ? { background: '#fff', color: '#0a67e8', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', fontFamily: "'DM Sans', sans-serif" } : { color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}
              >
                Accessibility
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full" style={{ color: statusColor(comp.status), background: statusBg(comp.status) }}>
                  {comp.pass}/{comp.total}
                </span>
              </button>
            </div>

            {activeTab === 'props' ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-5 items-start">
                <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#D8D4CC', background: '#FBFAF8' }}>
                  <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: '#EFEDE8', background: '#FFFFFF' }}>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>Live Preview</span>
                  </div>
                  <LiveDemo id={id} />
                </div>
                <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#D8D4CC', background: '#FBFAF8' }}>
                  <div className="px-5 py-3 border-b" style={{ borderColor: '#EFEDE8', background: '#FFFFFF' }}>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>Design Reference</span>
                  </div>
                  <div className="max-h-[500px] overflow-y-auto">
                    <SpecSheet id={id} />
                  </div>
                </div>
              </div>
            ) : (
              <A11yPanel id={id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CATEGORY ACCORDION
============================================================ */
function CategoryAccordion({
  cat,
  isOpen,
  openComp,
  activeTab,
  onToggleCat,
  onToggleComp,
  setActiveTab,
}: {
  cat: CategoryDef;
  isOpen: boolean;
  openComp: ComponentId | null;
  activeTab: 'props' | 'a11y';
  onToggleCat: () => void;
  onToggleComp: (id: ComponentId) => void;
  setActiveTab: (t: 'props' | 'a11y') => void;
}) {
  return (
    <div
      className="rounded-3xl border overflow-hidden mb-4 transition-shadow"
      style={{ borderColor: isOpen ? 'rgba(10,103,232,0.25)' : '#E8E5DF', background: '#FFFFFF', boxShadow: isOpen ? '0 20px 50px rgba(10,20,50,0.08)' : 'none' }}
    >
      <div
        onClick={onToggleCat}
        className="px-7 py-6 flex items-center justify-between gap-5 cursor-pointer"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-white text-lg font-bold"
            style={{ background: cat.color, boxShadow: `0 10px 22px ${cat.tint}` }}
          >
            {cat.icon}
          </div>
          <div className="min-w-0">
            <div className="text-lg font-extrabold truncate" style={{ fontFamily: "'DM Sans', sans-serif", color: '#0D0D0D', letterSpacing: '-0.01em' }}>
              {cat.name}
            </div>
            <div className="text-xs mt-0.5 truncate" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>{cat.desc}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span
            className="text-[11px] font-bold px-3.5 py-1.5 rounded-lg whitespace-nowrap hidden sm:inline-block"
            style={{ color: cat.color, background: cat.tint, fontFamily: "'DM Sans', sans-serif" }}
          >
            {cat.items.length ? `${cat.items.length} component${cat.items.length > 1 ? 's' : ''}` : 'coming soon'}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform"
            style={{ background: '#EBF8FF', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4" style={{ color: '#6B6B6B' }}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="px-7 pb-7">
            {cat.items.length === 0 ? (
              <div
                className="rounded-2xl px-8 py-11 text-center"
                style={{ border: '1.5px dashed #D8D4CC', background: '#FBFAF8' }}
              >
                <h5 className="text-sm font-bold mb-1.5" style={{ color: '#151A24', fontFamily: "'DM Sans', sans-serif" }}>Case study coming soon</h5>
                <p className="text-xs max-w-sm mx-auto leading-relaxed" style={{ color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
                  {cat.name} components are documented internally but haven't been published to this case study yet.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#EFEDE8' }}>
                {cat.items.map((itemId, i) => (
                  <SubAccordionItem
                    key={itemId}
                    id={itemId}
                    index={i}
                    isOpen={openComp === itemId}
                    onToggle={() => onToggleComp(itemId)}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN SECTION
============================================================ */
export default function ComponentSetSection() {
  const [openCat, setOpenCat] = useState<string | null>('actions');
  const [openComp, setOpenComp] = useState<ComponentId | null>('button');
  const [activeTab, setActiveTab] = useState<'props' | 'a11y'>('props');

  const handleToggleCat = (catId: string) => {
    const wasOpen = openCat === catId;
    const next = wasOpen ? null : catId;
    setOpenCat(next);
    if (next) {
      const cat = CATEGORIES.find((c) => c.id === next);
      if (cat && cat.items.length && !cat.items.includes(openComp as ComponentId)) {
        setOpenComp(cat.items[0]);
        setActiveTab('props');
      }
    }
  };

  const handleToggleComp = (id: ComponentId) => {
    const wasOpen = openComp === id;
    setOpenComp(wasOpen ? null : id);
    setActiveTab('props');
  };

  return (
    <section id="components" className="py-28 relative overflow-hidden" style={{ background: '#EBF8FF' }}>
      {/* Subtle blue dot grid - changed from orange to blue */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{ backgroundImage: 'radial-gradient(circle, #0a67e8 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Ambient blue glow - changed from orange to blue */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 20%, rgba(10,103,232,0.06) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Ambient blue glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(10,103,232,0.04) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#0a67e8]" />
              <span className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>
                Design Assets
              </span>
              <div className="w-6 h-px bg-[#0a67e8]" />
            </div>
            <h2
              className="leading-none"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0D0D0D', fontFamily: "'DM Sans', sans-serif" }}
            >
              <span style={{ color: '#0a67e8' }}>Component</span> Set
            </h2>
          </div>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>
            As we move up the hierarchy of the atomic design, components become more complex. Explore the full library below — every property is live and interactive, checked against WCAG 2.2 AA, and shown alongside its original design reference.
          </p>
        </div>

        {/* Accordion */}
        <div>
          {CATEGORIES.map((cat) => (
            <CategoryAccordion
              key={cat.id}
              cat={cat}
              isOpen={openCat === cat.id}
              openComp={openCat === cat.id ? openComp : null}
              activeTab={activeTab}
              onToggleCat={() => handleToggleCat(cat.id)}
              onToggleComp={handleToggleComp}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: '44', label: 'Components', suffix: '+' },
            { value: '121', label: 'Design Tokens', suffix: '' },
            { value: '7', label: 'Color Scales', suffix: '' },
            { value: '3', label: 'Breakpoints', suffix: '' },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl border text-center" style={{ borderColor: '#D8D4CC', background: '#FFFFFF' }}>
              <div className="text-3xl font-bold" style={{ color: '#0a67e8', fontFamily: "'DM Sans', sans-serif" }}>
                {stat.value}
                <span style={{ color: 'rgba(10,103,232,0.55)' }}>{stat.suffix}</span>
              </div>
              <div className="text-sm mt-1" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}