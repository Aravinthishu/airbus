import React, { useState } from 'react';

/* ============================================================
   Minimal stand-ins for your ui-helpers (PropChip, SpecBadge,
   SpecBlock, SpecState) so this file previews standalone.
   In your project, swap this back to:
   import { PropChip, SpecBadge, SpecBlock, SpecState } from '../ui-helpers';
============================================================ */
function PropChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
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
      }}
    >
      {children}
    </button>
  );
}
function SpecBadge({ label }: { label: string }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 12 }}>
      {label.toUpperCase()}
    </div>
  );
}
function SpecBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 16, fontWeight: 600, color: '#3D4759', marginBottom: 20 }}>{title}</div>
      {children}
    </div>
  );
}
function SpecState({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#8089A0' }}>{label}</span>
      {children}
    </div>
  );
}

/* ============================================================
   Small inline icons (no external icon dependency)
============================================================ */
function EyeIcon({ color = '#0B1F4D', size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon({ color = '#0B1F4D', size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 5.06-6.06M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a20.3 20.3 0 0 1-3.22 4.44" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

/* ============================================================
   Style tokens matched to your reference images
============================================================ */
type FieldStateKey = 'default' | 'hover' | 'active' | 'filled' | 'disabled';
type Appearance = 'default' | 'error' | 'success' | 'information' | 'disabled';
type SizeKey = 'xs' | 's' | 'm' | 'l' | 'xl';

interface FieldStyle {
  bg: string;
  border: string;
  borderWidth: number;
  text: string;
  label: string;
  opacity?: number;
  cursor?: boolean;
}

const FIELD_STATE_STYLES: Record<FieldStateKey, FieldStyle> = {
  default: { bg: '#F0EFED', border: '#C9CFDA', borderWidth: 1.5, text: '#6B7280', label: '#3D4759' },
  hover: { bg: '#E4E3E0', border: '#C9CFDA', borderWidth: 1.5, text: '#6B7280', label: '#3D4759' },
  active: { bg: '#E9EEFC', border: '#0B1F4D', borderWidth: 2, text: '#151A24', label: '#3D4759', cursor: true },
  filled: { bg: '#F0EFED', border: '#C9CFDA', borderWidth: 1.5, text: '#151A24', label: '#3D4759' },
  disabled: { bg: '#F5F5F4', border: '#E4E2DD', borderWidth: 1.5, text: '#B5B9C2', label: '#B5B9C2', opacity: 0.7 },
};

const SIZE_STYLES: Record<
  SizeKey,
  { padding: string; fontSize: number; labelSize: number; width: number }
> = {
  xs: { padding: '6px 10px', fontSize: 11, labelSize: 11, width: 240 },
  s: { padding: '8px 12px', fontSize: 12, labelSize: 11, width: 260 },
  m: { padding: '10px 14px', fontSize: 13, labelSize: 12, width: 280 },
  l: { padding: '12px 16px', fontSize: 14, labelSize: 12, width: 300 },
  xl: { padding: '16px 16px', fontSize: 15, labelSize: 13, width: 320 },
};

/* ============================================================
   Base field — underline style: light fill, bottom-heavy border,
   label above, optional prefix/suffix, optional helper text.
============================================================ */
function Field({
  label = 'Label',
  size = 'm',
  stateKey = 'default',
  value,
  placeholder = 'Placeholder',
  suffix,
  helpText,
  helpColor,
  width,
  showForgotPassword = false,
}: {
  label?: string;
  size?: SizeKey;
  stateKey?: FieldStateKey;
  value?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  helpText?: string;
  helpColor?: string;
  width?: number;
  showForgotPassword?: boolean;
}) {
  const s = FIELD_STATE_STYLES[stateKey] ?? FIELD_STATE_STYLES.default;
  const sz = SIZE_STYLES[size] ?? SIZE_STYLES.m;
  const isDisabled = stateKey === 'disabled';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: width ?? sz.width, opacity: s.opacity ?? 1 }}>
      <label style={{ fontSize: sz.labelSize, fontWeight: 700, color: s.label, fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderRadius: '6px 6px 2px 2px',
          background: s.bg,
          borderTop: `1px solid ${s.bg}`,
          borderLeft: `1px solid ${s.bg}`,
          borderRight: `1px solid ${s.bg}`,
          borderBottom: `${s.borderWidth}px solid ${s.border}`,
          padding: sz.padding,
        }}
      >
        {s.cursor && <span style={{ color: s.border, fontWeight: 400 }}>|</span>}
        <span
          style={{
            flex: 1,
            fontSize: sz.fontSize,
            color: value ? s.text : '#9AA3B2',
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {value || placeholder}
        </span>
        {suffix}
      </div>
      {helpText && (
        <p style={{ fontSize: 11, color: helpColor ?? '#8089A0', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
          {helpText}
        </p>
      )}
      {showForgotPassword && (
        <div style={{ textAlign: 'right' }}>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ fontSize: 11, fontWeight: 600, color: '#2554D6', textDecoration: 'underline', fontFamily: "'DM Sans', sans-serif" }}
          >
            Forgot Password?
          </a>
        </div>
      )}
    </div>
  );
}

function ForgotPasswordLink({ color = '#2554D6' }: { color?: string }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{ fontSize: 11, fontWeight: 600, color, textDecoration: 'underline', fontFamily: "'DM Sans', sans-serif" }}
      >
        Forgot Password?
      </a>
    </div>
  );
}

/* ============================================================
   LIVE DEMO — interactive preview
============================================================ */
export function InputFieldDemo() {
  const [appearance, setAppearance] = useState<Appearance>('default');
  const [size, setSize] = useState<SizeKey>('m');
  const [state, setState] = useState<FieldStateKey>('default');
  const [visible, setVisible] = useState(false);

  const APPEARANCE_STYLES: Record<Appearance, FieldStyle> = {
    default: FIELD_STATE_STYLES.default,
    error: { bg: '#F0EFED', border: '#B00020', borderWidth: 2, text: '#151A24', label: '#3D4759' },
    success: { bg: '#F0EFED', border: '#0A7A50', borderWidth: 2, text: '#151A24', label: '#3D4759' },
    information: { bg: '#F0EFED', border: '#2554D6', borderWidth: 2, text: '#151A24', label: '#3D4759' },
    disabled: FIELD_STATE_STYLES.disabled,
  };

  const helpText: Record<Appearance, string> = {
    default: 'Use your company email address.',
    error: 'Enter a valid email address.',
    success: 'Email verified successfully.',
    information: 'This field requires your email address.',
    disabled: 'This field is currently locked.',
  };

  const helpColor: Record<Appearance, string> = {
    default: '#8089A0',
    error: '#B00020',
    success: '#0A7A50',
    information: '#2554D6',
    disabled: '#B5B9C2',
  };

  const stateStyles: Record<FieldStateKey, FieldStyle> = {
    default: FIELD_STATE_STYLES.default,
    hover: FIELD_STATE_STYLES.hover,
    active: FIELD_STATE_STYLES.active,
    filled: FIELD_STATE_STYLES.filled,
    disabled: FIELD_STATE_STYLES.disabled,
  };

  const stateHelpText: Record<FieldStateKey, string> = {
    default: 'Enter your password',
    hover: 'Hover - enter your password',
    active: 'Active - typing your password',
    filled: 'Password entered',
    disabled: 'This field is currently locked.',
  };

  const stateHelpColor: Record<FieldStateKey, string> = {
    default: '#8089A0',
    hover: '#8089A0',
    active: '#2554D6',
    filled: '#0A7A50',
    disabled: '#B5B9C2',
  };

  // Determine which styles to use based on appearance vs state
  const getStyles = (): FieldStyle => {
    // If appearance is default, use state styles
    if (appearance === 'default') {
      return stateStyles[state];
    }
    // Otherwise use appearance styles (error, success, information, disabled)
    return APPEARANCE_STYLES[appearance];
  };

  const currentStyle = getStyles();
  const sz = SIZE_STYLES[size];

  // Get the right help text and color
  const getHelpText = (): string => {
    if (appearance === 'default') {
      return stateHelpText[state];
    }
    return helpText[appearance];
  };

  const getHelpColor = (): string => {
    if (appearance === 'default') {
      return stateHelpColor[state];
    }
    return helpColor[appearance];
  };

  // Determine if we show cursor (active state)
  const showCursor = appearance === 'default' && state === 'active';

  // Password value
  const passwordValue = '4trsi3TjaiUl';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background:
            'repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: sz.width }}>
            <label style={{ fontSize: sz.labelSize, fontWeight: 700, color: currentStyle.label, fontFamily: "'DM Sans', sans-serif" }}>
              Password
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderRadius: '6px 6px 2px 2px',
                background: currentStyle.bg,
                borderBottom: `${currentStyle.borderWidth}px solid ${currentStyle.border}`,
                padding: sz.padding,
                opacity: currentStyle.opacity ?? 1,
              }}
            >
              {showCursor && <span style={{ color: currentStyle.border, fontWeight: 400 }}>|</span>}
              <span style={{ flex: 1, fontSize: sz.fontSize, color: visible ? currentStyle.text : '#9AA3B2', fontFamily: "'DM Sans', sans-serif" }}>
                {visible ? passwordValue : '••••••••••••'}
              </span>
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}
              >
                {visible ?
                  <EyeOffIcon color={currentStyle.label} size={14} /> :
                  <EyeIcon color={currentStyle.label} size={14} />
                }
              </button>
            </div>
            <p style={{ fontSize: 11, color: getHelpColor(), fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
              {getHelpText()}
            </p>
            <div style={{ textAlign: 'right' }}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: 11, fontWeight: 600, color: '#2554D6', textDecoration: 'underline', fontFamily: "'DM Sans', sans-serif" }}
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #EFEDE8', overflowY: 'auto' }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 6 }}>STATE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(['default', 'hover', 'active', 'filled', 'disabled'] as FieldStateKey[]).map((s) => (
              <PropChip key={s} active={state === s && appearance === 'default'} onClick={() => {
                setState(s);
                setAppearance('default');
              }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </PropChip>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 6 }}>APPEARANCE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(['default', 'error', 'success', 'information', 'disabled'] as Appearance[]).map((a) => (
              <PropChip key={a} active={appearance === a} onClick={() => setAppearance(a)}>
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </PropChip>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 6 }}>SIZE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(['xs', 's', 'm', 'l', 'xl'] as SizeKey[]).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>{s.toUpperCase()}</PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SPEC — "Sizes" block, matches your Sizes reference exactly:
   size tag on the left, Label + filled underline input on the
   right, growing padding/font from XS to XL.
============================================================ */
function InputSizesList() {
  const order: SizeKey[] = ['xs', 's', 'm', 'l', 'xl'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {order.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 24, fontSize: 12, fontWeight: 600, color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
            {size.toUpperCase()}
          </span>
          <Field size={size} stateKey="filled" label="Label" placeholder="Placeholder" />
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   SPEC — "States" grid, matches your password-field reference:
   columns = Hidden / Show, rows = Default/Hover/Active/Filled/
   Disabled, dashed violet guide box wrapping header + rows,
   state labels sit outside the box on the left.
============================================================ */
function InputStatesGrid() {
  const rows: FieldStateKey[] = ['default', 'hover', 'active', 'filled', 'disabled'];
  const HEADER_H = 32;
  const ROW_H = 100;
  const COL_W = 240;

  const cell = (stateKey: FieldStateKey, visibility: 'hidden' | 'show') => {
    const isShow = visibility === 'show';
    const value = isShow ? '4trsi3TjaiUI' : '••••••••••••';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Field
          label="Label"
          size="m"
          stateKey={stateKey}
          value={value}
          width={COL_W - 20}
          suffix={isShow ? <EyeOffIcon color={FIELD_STATE_STYLES[stateKey].label} /> : <EyeIcon color={FIELD_STATE_STYLES[stateKey].label} />}
          showForgotPassword={true}
        />
      </div>
    );
  };

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
      <div style={{ display: 'flex', width: 60 + COL_W * 2 + 12, minWidth: 60 + COL_W * 2 + 12 }}>
        {/* row labels, outside the dashed box */}
        <div style={{ display: 'flex', flexDirection: 'column', width: 60 }}>
          <div style={{ height: HEADER_H }} />
          {rows.map((r) => (
            <div key={r} style={{ height: ROW_H, display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#6B7280', fontFamily: "'DM Sans', sans-serif" }}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </span>
            </div>
          ))}
        </div>

        {/* dashed violet guide box wrapping header + grid */}
        <div style={{ position: 'relative', borderRadius: 4, padding: '0 12px', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(2, ${COL_W}px)`,
              gridTemplateRows: `${HEADER_H}px repeat(${rows.length}, ${ROW_H}px)`,
              columnGap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#3D4759' }}>Hidden</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#3D4759' }}>Show</div>

            {rows.map((r) => (
              <React.Fragment key={r}>
                <div style={{ display: 'flex', alignItems: 'center' }}>{cell(r, 'hidden')}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>{cell(r, 'show')}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InputFieldSpec() {
  return (
    <div style={{ padding: 20, overflowY: 'auto', height: '100%' }}>
      <SpecBadge label="Input Field" />
      <SpecBlock title="Sizes">
        <InputSizesList />
      </SpecBlock>
      <SpecBlock title="States">
        <InputStatesGrid />
      </SpecBlock>
    </div>
  );
}

/* ============================================================
   PAGE — equal-size preview / reference cards, same pattern as
   ButtonSpecPage in button.jsx
============================================================ */
const CARD_STYLE: React.CSSProperties = {
  width: '100%',
  maxWidth: 920,
  height: 480,
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function InputFieldPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 920 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <InputFieldDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 920 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8 }}>
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <InputFieldSpec />
          </div>
        </div>
      </div>
    </div>
  );
}