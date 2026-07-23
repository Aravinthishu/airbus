import { CategoryDef, ComponentDef, ComponentId, A11yCheck } from './types';

export const CATEGORIES: CategoryDef[] = [
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
    items: ['breadcrumbs', 'tabs', 'sidenav'],
  },
  {
    id: 'data',
    name: 'Data Display',
    icon: '▤',
    color: '#0a7a50',
    tint: 'rgba(10,122,80,0.08)',
    desc: 'Components for presenting structured information — tables, cards, and accordions.',
    items: ['accordion', 'avatar', 'datatable', 'card', 'banner'],
  },
];

export const COMPONENTS: Record<ComponentId, ComponentDef> = {
  button: { name: 'Button', cat: 'actions', pass: 4, total: 5, status: 'fail', desc: 'Primary action trigger across all products. Available in 7 semantic variants and 5 sizes.' },
  buttongroup: { name: 'Button Group', cat: 'actions', pass: 2, total: 3, status: 'warn', desc: 'Connected strip of related action buttons. Overflow collapses into a "+N" control.' },
  fab: { name: 'Float Action Button', cat: 'actions', pass: 3, total: 4, status: 'warn', desc: 'Persistent circular action that expands into a speed-dial of related shortcuts.' },
  inputfield: { name: 'Input Field', cat: 'inputs', pass: 3, total: 5, status: 'fail', desc: 'Core single-line input with prefix/suffix, validation states, and error communication.' },
  textarea: { name: 'Text Area', cat: 'inputs', pass: 2, total: 4, status: 'fail', desc: 'Multi-line input for longer form content, with live character count and validation states.' },
  checkbox: { name: 'Checkbox', cat: 'inputs', pass: 3, total: 4, status: 'fail', desc: 'Binary or indeterminate selection control, available in two sizes.' },
  datepicker: { name: 'Date & Time Picker', cat: 'inputs', pass: 3, total: 5, status: 'fail', desc: 'Simple date entry paired with a calendar overlay for precise selection.' },

  breadcrumbs: { name: 'Breadcrumbs', cat: 'navigation', pass: 0, total: 0, status: 'warn', desc: 'Placeholder demo — shows current location within a hierarchy, with a configurable separator.' },
  tabs: { name: 'Tabs', cat: 'navigation', pass: 0, total: 0, status: 'warn', desc: 'Placeholder demo — switches between related views, underline or pill style.' },
  sidenav: { name: 'Side Navigation', cat: 'navigation', pass: 0, total: 0, status: 'warn', desc: 'Placeholder demo — vertical primary navigation, expandable or collapsed to icons only.' },

  accordion: { name: 'Accordion', cat: 'data', pass: 0, total: 0, status: 'warn', desc: 'Placeholder demo — expandable sections that can allow single or multiple panels open.' },
  avatar: { name: 'Avatar', cat: 'data', pass: 0, total: 0, status: 'warn', desc: 'Placeholder demo — user representation with initials, size, shape, and status indicator.' },
  datatable: { name: 'Data Table', cat: 'data', pass: 0, total: 0, status: 'warn', desc: 'Placeholder demo — tabular data display with sizing and striped-row options.' },
  card: { name: 'Card', cat: 'data', pass: 0, total: 0, status: 'warn', desc: 'Placeholder demo — contained content block with image, title, description, and action.' },
  banner: { name: 'Banner', cat: 'data', pass: 0, total: 0, status: 'warn', desc: 'Placeholder demo — inline alert message in info, success, warning, and error variants.' },
};

export const A11Y_CHECKS: Record<ComponentId, A11yCheck[]> = {
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
    { code: '1.3.1', name: 'Character count linkage', status: 'warn', value: 'Partial', note: "Live counter isn't consistently announced by screen readers." },
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
    { code: '4.1.2', name: 'Calendar dialog role', status: 'warn', value: 'Partial', note: "Popover isn't consistently announced as a dialog on open." },
    { code: '1.4.3', name: 'Disabled date contrast', status: 'fail', value: '2.0:1', note: 'Faded out-of-range days fall well under legibility thresholds.' },
    { code: '3.3.1', name: 'Error identification', status: 'pass', value: 'Pass', note: 'Invalid dates surface icon + colour + inline text.' },
    { code: '2.4.3', name: 'Focus order on open', status: 'fail', value: 'Fail', note: "Focus doesn't move into the calendar automatically when it opens." },
  ],

  // Placeholder demo components — no real audit yet, empty until you're ready to fill these in
  breadcrumbs: [],
  tabs: [],
  sidenav: [],
  accordion: [],
  avatar: [],
  datatable: [],
  card: [],
  banner: [],
};
