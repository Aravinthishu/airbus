'use client';
import React, { useState } from 'react';

/* ============================================================
   Minimal stand-ins for your ui-helpers
============================================================ */
interface PropChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function PropChip({ active, onClick, children }: PropChipProps) {
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

interface SpecBadgeProps {
  label: string;
}

function SpecBadge({ label }: SpecBadgeProps) {
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
   Design tokens
============================================================ */
const VIOLET_DASH = '#C084FC';
const FONT = "'DM Sans', sans-serif";
const FOCUS_BORDER = '#2554D6';
const BORDER_RADIUS = 4;

/* ============================================================
   Icons
============================================================ */
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8089A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8089A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CalendarClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8089A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="15" r="3" />
      <polyline points="12 13 12 15 14 15" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, color: '#8089A0' }}>
      <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 5 L5 1 L9 5" stroke="#8089A0" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1 L5 5 L9 1" stroke="#8089A0" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}

function MiniStepper({ onUp, onDown }: { onUp: () => void; onDown: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 4 }}>
      <svg onClick={onUp} width="9" height="6" viewBox="0 0 10 6" style={{ cursor: 'pointer' }}>
        <path d="M1 5 L5 1 L9 5" stroke="#8089A0" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg onClick={onDown} width="9" height="6" viewBox="0 0 10 6" style={{ cursor: 'pointer' }}>
        <path d="M1 1 L5 5 L9 1" stroke="#8089A0" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ============================================================
   Calendar dropdown (functional + demo-fixable for spec use)
============================================================ */
interface CalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
  inline?: boolean;
  demo?: { monthLabel: string; year: number; today: number; selected?: number };
  compact?: boolean;
  preview?: boolean;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar({ selectedDate, onSelectDate, onClose, inline = false, demo, compact = false, preview = false }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    demo ? new Date(demo.year, MONTH_NAMES.indexOf(demo.monthLabel), 1) : new Date()
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { daysInMonth: lastDay.getDate(), startingDay: firstDay.getDay() };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  const shiftMonth = (delta: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1));
  };
  const shiftYear = (delta: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear() + delta, currentMonth.getMonth(), 1));
  };

  const handleDateSelect = (day: number) => {
    if (demo) return;
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    onSelectDate(`${year}/${month}/${dayStr}`);
    onClose();
  };

  const prevMonthDaysCount = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
  const totalSlots = Math.ceil((startingDay + daysInMonth) / 7) * 7;
  const prevMonthStart = prevMonthDaysCount - startingDay + 1;

  const isToday = (day: number) => {
    if (demo) return day === demo.today;
    const today = new Date();
    return day === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
  };

  const isSelected = (day: number) => {
    if (demo) return day === demo.selected;
    const dateStr = `${currentMonth.getFullYear()}/${String(currentMonth.getMonth() + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
    return selectedDate === dateStr;
  };

  const renderDays = () => {
    const cells: React.ReactNode[] = [];

    for (let i = 0; i < startingDay; i++) {
      const day = prevMonthStart + i;
      cells.push(
        <div key={`prev-${i}`} style={{ padding: '3px 1px', textAlign: 'center', fontSize: preview ? 10 : 11, color: '#C8C4BC' }}>
          {day}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const selected = isSelected(i);
      const today = isToday(i);
      cells.push(
        <div
          key={i}
          onClick={() => handleDateSelect(i)}
          style={{
            position: 'relative',
            padding: '3px 1px',
            textAlign: 'center',
            fontSize: preview ? 10 : 11,
            cursor: demo ? 'default' : 'pointer',
            borderRadius: BORDER_RADIUS,
            border: today && !selected ? `1.5px solid ${FOCUS_BORDER}` : '1.5px solid transparent',
            background: selected ? '#0B1F4D' : 'transparent',
            color: selected ? '#FFFFFF' : today ? FOCUS_BORDER : '#151A24',
            fontWeight: (today || selected) ? 700 : 400,
            fontFamily: FONT,
            transition: 'all 0.15s ease',
          }}
        >
          {i}
          {today && !selected && (
            <span style={{ position: 'absolute', bottom: 1, left: '50%', transform: 'translateX(-50%)', width: 2, height: 2, borderRadius: '50%', background: FOCUS_BORDER }} />
          )}
        </div>
      );
    }

    const remainingSlots = totalSlots - (startingDay + daysInMonth);
    for (let i = 1; i <= remainingSlots; i++) {
      cells.push(
        <div key={`next-${i}`} style={{ padding: '3px 1px', textAlign: 'center', fontSize: preview ? 10 : 11, color: '#C8C4BC' }}>
          {i}
        </div>
      );
    }

    return cells;
  };

  let styles;
  if (preview) {
    styles = {
      padding: '8px 10px',
      width: 200,
      fontSize: 10,
    };
  } else if (compact) {
    styles = {
      padding: '8px 10px',
      width: 195,
      fontSize: 10,
    };
  } else {
    styles = {
      padding: '14px 18px',
      width: 260,
    };
  }

  return (
    <div
      style={{
        position: inline ? 'static' : 'absolute',
        top: '100%',
        marginTop: 4,
        background: '#FFFFFF',
        borderRadius: BORDER_RADIUS,
        boxShadow: inline ? 'none' : '0 4px 20px rgba(0,0,0,0.15)',
        border: '1px solid #EFEDE8',
        zIndex: 1000,
        ...styles,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: preview ? 5 : 6 }}>
        <button onClick={() => shiftMonth(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: preview ? 11 : 12, color: '#8089A0', padding: '1px 3px' }}>‹</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: preview ? 3 : 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #EFEDE8', borderRadius: BORDER_RADIUS, padding: preview ? '2px 4px' : '2px 4px' }}>
            <span style={{ fontSize: preview ? 9 : (compact ? 10 : 13), fontWeight: 600, color: '#151A24', fontFamily: FONT }}>
              {MONTH_NAMES[currentMonth.getMonth()]}
            </span>
            <MiniStepper onUp={() => shiftMonth(1)} onDown={() => shiftMonth(-1)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #EFEDE8', borderRadius: BORDER_RADIUS, padding: preview ? '2px 4px' : '2px 4px' }}>
            <span style={{ fontSize: preview ? 9 : (compact ? 10 : 13), fontWeight: 600, color: '#151A24', fontFamily: FONT }}>
              {currentMonth.getFullYear()}
            </span>
            <MiniStepper onUp={() => shiftYear(1)} onDown={() => shiftYear(-1)} />
          </div>
        </div>

        <button onClick={() => shiftMonth(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: preview ? 11 : 12, color: '#8089A0', padding: '1px 3px' }}>›</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginBottom: preview ? 1 : 2 }}>
        {DAY_NAMES.map((day) => (
          <div key={day} style={{ padding: preview ? '2px 1px' : '3px 2px', textAlign: 'center', fontSize: preview ? 8 : (compact ? 8 : 11), fontWeight: 600, color: '#8089A0', fontFamily: FONT }}>
            {day}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>{renderDays()}</div>

      <div style={{ marginTop: preview ? 5 : 6, paddingTop: preview ? 5 : 6, borderTop: '1px solid #EFEDE8', textAlign: 'center' }}>
        <button
          onClick={() => {
            if (demo) return;
            const today = new Date();
            const dateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
            onSelectDate(dateStr);
            onClose();
          }}
          style={{ background: 'none', border: 'none', cursor: demo ? 'default' : 'pointer', fontSize: preview ? 9 : (compact ? 9 : 12), color: FOCUS_BORDER, fontWeight: 600, fontFamily: FONT, padding: '1px 6px' }}
        >
          Today
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Time picker dropdown — compact version
============================================================ */
interface TimePickerDropdownProps {
  onSelectTime: (time: string) => void;
  onClose: () => void;
  inline?: boolean;
  compact?: boolean;
  preview?: boolean;
}

function TimePickerDropdown({ onSelectTime, onClose, inline = false, compact = false, preview = false }: TimePickerDropdownProps) {
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const periods = ['AM', 'PM'];

  const [selHour, setSelHour] = useState('11');
  const [selMinute, setSelMinute] = useState('11');
  const [selPeriod, setSelPeriod] = useState('AM');

  const columns: { list: string[]; sel: string; set: (v: string) => void }[] = [
    { list: hours, sel: selHour, set: setSelHour },
    { list: minutes, sel: selMinute, set: setSelMinute },
    { list: periods, sel: selPeriod, set: setSelPeriod },
  ];

  let styles;
  if (preview) {
    styles = {
      padding: '8px 10px',
      width: 170,
    };
  } else if (compact) {
    styles = {
      padding: '8px 10px',
      width: 160,
    };
  } else {
    styles = {
      padding: '14px 18px',
      width: 200,
    };
  }

  return (
    <div
      style={{
        position: inline ? 'static' : 'absolute',
        top: '100%',
        marginTop: 4,
        background: '#FFFFFF',
        borderRadius: BORDER_RADIUS,
        boxShadow: inline ? 'none' : '0 4px 20px rgba(0,0,0,0.15)',
        border: '1px solid #EFEDE8',
        zIndex: 1000,
        ...styles,
      }}
    >
      <div style={{ fontSize: preview ? 9 : (compact ? 9 : 12), color: '#8089A0', fontFamily: FONT, marginBottom: preview ? 4 : 4 }}>Time</div>

      <div style={{ display: 'flex', gap: preview ? 3 : 4 }}>
        {columns.map((col, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              height: preview ? 80 : (compact ? 80 : 120),
              overflowY: 'auto',
              border: '1px solid #EFEDE8',
              borderRadius: BORDER_RADIUS,
            }}
          >
            {col.list.map((item) => (
              <div
                key={item}
                onClick={() => col.set(item)}
                style={{
                  padding: preview ? '3px 0' : (compact ? '3px 0' : '6px 0'),
                  textAlign: 'center',
                  fontSize: preview ? 9 : (compact ? 10 : 13),
                  cursor: 'pointer',
                  fontFamily: FONT,
                  background: col.sel === item ? '#0B1F4D' : 'transparent',
                  color: col.sel === item ? '#FFFFFF' : '#151A24',
                  fontWeight: col.sel === item ? 700 : 400,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: preview ? 5 : 6, paddingTop: preview ? 5 : 6, borderTop: '1px solid #EFEDE8', textAlign: 'center' }}>
        <button
          onClick={() => {
            onSelectTime(`${selHour}:${selMinute} ${selPeriod}`);
            onClose();
          }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: preview ? 9 : (compact ? 9 : 12), color: FOCUS_BORDER, fontWeight: 600, fontFamily: FONT, padding: '1px 6px' }}
        >
          Now
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   DatePicker field - compact version
============================================================ */
type PickerType = 'date' | 'time' | 'datetime' | 'calendar';
type PickerState = 'default' | 'hover' | 'focus' | 'active-focus' | 'filled' | 'disabled' | 'error';
type IconType = 'none' | 'calendar' | 'clock' | 'datetime' | 'spinner';

interface DatePickerProps {
  type?: PickerType;
  state?: PickerState;
  value?: string;
  placeholder?: string;
  label?: string;
  iconType?: IconType;
  width?: number;
  onClick?: () => void;
  onDateSelect?: (date: string) => void;
  onTimeSelect?: (time: string) => void;
  showCalendar?: boolean;
  showTimePicker?: boolean;
  inlineDropdown?: boolean;
  demoCalendar?: { monthLabel: string; year: number; today: number; selected?: number };
  compact?: boolean;
  preview?: boolean;
}

function DatePicker({
  type = 'date',
  state = 'default',
  value = '',
  placeholder = 'yyyy/mm/dd',
  label,
  iconType,
  width = 160,
  onClick,
  onDateSelect = () => {},
  onTimeSelect = () => {},
  showCalendar = false,
  showTimePicker = false,
  inlineDropdown = false,
  demoCalendar,
  compact = false,
  preview = false,
}: DatePickerProps) {
  const isDisabled = state === 'disabled';
  const isBoxed = state === 'focus' || state === 'active-focus';
  const hasValue = value !== '';

  const background =
    state === 'active-focus' ? '#E9EEFC' :
    state === 'hover' ? '#F5F5F4' :
    state === 'disabled' ? '#F5F5F4' :
    '#FFFFFF';

  const borderColor =
    state === 'focus' || state === 'active-focus' ? FOCUS_BORDER :
    state === 'error' ? '#B00020' :
    state === 'disabled' ? '#E4E2DD' :
    '#D8D4CC';

  const resolvedIconType: IconType =
    iconType ??
    (type === 'calendar' ? 'calendar' : type === 'datetime' ? 'datetime' : 'none');

  const renderIcon = () => {
    if (resolvedIconType === 'calendar') return <CalendarIcon />;
    if (resolvedIconType === 'clock') return <ClockIcon />;
    if (resolvedIconType === 'datetime') return <CalendarClockIcon />;
    if (resolvedIconType === 'spinner') return <SpinnerIcon />;
    return null;
  };

  const getLabel = () => {
    if (label) return label;
    if (type === 'time') return 'Time';
    if (type === 'datetime') return 'Date & Time';
    return 'Date';
  };

  const displayValue = hasValue ? value : placeholder;

  const dropdownOpen = (type === 'calendar' || type === 'datetime') ? showCalendar : type === 'time' ? showTimePicker : false;

  let compactStyles;
  if (preview) {
    compactStyles = {
      padding: '6px 10px',
      fontSize: 11,
      labelSize: 10,
      gap: 4,
      minHeight: 32,
      width: 200,
    };
  } else if (compact) {
    compactStyles = {
      padding: '6px 8px',
      fontSize: 10,
      labelSize: 9,
      gap: 3,
      minHeight: 28,
    };
  } else {
    compactStyles = {
      padding: '8px 12px',
      fontSize: 13,
      labelSize: 12,
      gap: 6,
      minHeight: 40,
    };
  }

  const finalWidth = preview ? compactStyles.width : width;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compactStyles.gap, width: finalWidth, opacity: isDisabled ? 0.7 : 1, position: 'relative' }}>
      <label style={{ fontSize: compactStyles.labelSize, fontWeight: 700, color: isDisabled ? '#B5B9C2' : '#3D4759', fontFamily: FONT }}>
        {getLabel()}
      </label>

      <div
        onClick={!isDisabled ? onClick : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: compactStyles.padding,
          borderRadius: isBoxed ? BORDER_RADIUS : `${BORDER_RADIUS}px ${BORDER_RADIUS}px 2px 2px`,
          border: isBoxed ? `1.5px solid ${borderColor}` : 'none',
          borderBottom: isBoxed ? undefined : `2px solid ${borderColor}`,
          background,
          transition: 'all 0.15s ease',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          minHeight: compactStyles.minHeight,
        }}
      >
        <span style={{ fontSize: compactStyles.fontSize, color: hasValue ? '#151A24' : '#9AA3B2', fontWeight: hasValue ? 600 : 400, fontFamily: FONT }}>
          {displayValue}
        </span>
        {renderIcon()}
      </div>

      {state === 'error' && (
        <span style={{ fontSize: preview ? 8 : (compact ? 8 : 11), color: '#B00020', fontFamily: FONT, marginTop: -2 }}>Legend</span>
      )}

      {dropdownOpen && type !== 'time' && (
        <Calendar selectedDate={value} onSelectDate={onDateSelect} onClose={() => {}} inline={inlineDropdown} demo={demoCalendar} compact={compact} preview={preview} />
      )}
      {dropdownOpen && type === 'time' && (
        <TimePickerDropdown onSelectTime={onTimeSelect} onClose={() => {}} inline={inlineDropdown} compact={compact} preview={preview} />
      )}
    </div>
  );
}

/* ============================================================
   LIVE DEMO — Field moved to top, increased size
============================================================ */
export function DatePickerDemo() {
  const [state, setState] = useState<PickerState>('default');
  const [pickerType, setPickerType] = useState<PickerType>('time');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const stateOptions: PickerState[] = ['default', 'hover', 'focus', 'active-focus', 'filled', 'disabled', 'error'];
  const stateLabels = ['Default', 'Hover', 'Focus', 'Active Focus', 'Filled', 'Disabled', 'Error'];

  const pickerTypes: PickerType[] = ['time', 'datetime', 'calendar'];
  const pickerLabels = ['Time Picker', 'Date Time Picker', 'Calendar'];

  const getValueForState = () => {
    if (state === 'filled' || state === 'active-focus') {
      if (pickerType === 'time') return selectedTime || '11:11 AM';
      if (pickerType === 'datetime') return '2024/04/22 11:11';
      if (pickerType === 'calendar') return selectedDate || '2024/12/17';
    }
    if (state === 'error') {
      if (pickerType === 'time') return '24:22';
      return '2024/04/22';
    }
    if (pickerType === 'calendar' && selectedDate) return selectedDate;
    if (pickerType === 'time' && selectedTime) return selectedTime;
    return '';
  };

  const getPlaceholder = () => {
    if (pickerType === 'time') return 'hh:mm';
    if (pickerType === 'datetime') return 'yyyy/mm/dd hh:mm';
    return 'yyyy/mm/dd';
  };

  const handlePickerClick = () => {
    if (state === 'disabled') return;
    setDropdownOpen((v) => !v);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 315,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '24px 32px 16px 32px',
          paddingTop: 32,
          background:
            'repeating-linear-gradient(0deg, rgba(11,31,77,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(11,31,77,0.03) 0 1px, transparent 1px 24px), #FFFFFF',
        }}
      >
        <DatePicker
          type={pickerType}
          state={state}
          value={getValueForState()}
          placeholder={getPlaceholder()}
          onClick={handlePickerClick}
          onDateSelect={(d) => { setSelectedDate(d); setDropdownOpen(false); }}
          onTimeSelect={(t) => { setSelectedTime(t); setDropdownOpen(false); }}
          showCalendar={dropdownOpen}
          showTimePicker={dropdownOpen}
          preview={true}
          width={200}
        />
      </div>

      <div style={{ padding: '16px 20px', borderTop: '1px solid #EFEDE8', overflowY: 'auto', background: '#FFFFFF' }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
            PICKER TYPE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {pickerTypes.map((type, index) => (
              <PropChip key={type} active={pickerType === type} onClick={() => { setPickerType(type); setDropdownOpen(false); }}>
                {pickerLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
            STATE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {stateOptions.map((s, index) => (
              <PropChip key={s} active={state === s} onClick={() => { setState(s); setDropdownOpen(false); }}>
                {stateLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Shared spec grid — COMPACT version with proper padding and gaps
============================================================ */
function SpecColumn({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; content: React.ReactNode }[];
}) {
  const ROW_LABEL_WIDTH = 60;
  const PICKER_WIDTH = 130;

  const wrapWithWidth = (content: React.ReactNode) => {
    if (React.isValidElement(content) && content.type === DatePicker) {
      return React.cloneElement(content, { width: PICKER_WIDTH, compact: true });
    }
    return content;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#3D4759', fontFamily: FONT, marginBottom: 2 }}>
        {title}
      </div>
      <div style={{ background: '#FFFFFF', padding: '16px 14px', borderRadius: BORDER_RADIUS }}>
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `${ROW_LABEL_WIDTH}px 1fr`,
            gridTemplateRows: `repeat(${rows.length}, auto)`,
            rowGap: 18,
            columnGap: 14,
          }}
        >
          {rows.map((row, rIdx) => (
            <React.Fragment key={row.label}>
              <div
                style={{
                  gridColumn: 1,
                  gridRow: rIdx + 1,
                  display: 'flex',
                  alignItems: 'flex-start',
                  paddingTop: 16,
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#8089A0',
                  fontFamily: FONT,
                  textAlign: 'right',
                  justifyContent: 'flex-end',
                  paddingRight: 4,
                }}
              >
                {row.label}
              </div>
              <div style={{ 
                gridColumn: 2, 
                gridRow: rIdx + 1, 
                display: 'flex', 
                alignItems: 'flex-start', 
                paddingLeft: 4,
                overflow: 'visible',
                position: 'relative',
                zIndex: 2,
              }}>
                {wrapWithWidth(row.content)}
              </div>
            </React.Fragment>
          ))}

          {/* violet dashed reference box — with proper padding so it doesn't touch the labels */}
          <div
            style={{
              gridColumn: '2 / 3',
              gridRow: `1 / ${rows.length + 1}`,
              margin: '-10px -8px',
              border: `1.5px dashed ${VIOLET_DASH}`,
              borderRadius: BORDER_RADIUS,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — All sections with 2 columns
============================================================ */
function DateTimeOverviewSpec() {
  return (
    <SpecColumn
      title="Overview"
      rows={[
        { label: 'Simple Date', content: <DatePicker type="date" state="default" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: 'Hour Picker', content: <DatePicker type="time" state="default" label="Time" placeholder="hh:mm" /> },
        { label: 'AM/PM', content: <DatePicker type="date" state="hover" label="Time format" value="AM/PM" iconType="spinner" /> },
        { label: 'Calendar', content: <DatePicker type="calendar" state="hover" label="Date" placeholder="yyyy/mm/dd" /> },
        {
          label: 'Range',
          content: (
            <div style={{ display: 'flex', gap: 6 }}>
              <DatePicker type="calendar" state="hover" label="Start" placeholder="yyyy/mm/dd" />
              <DatePicker type="calendar" state="hover" label="End" placeholder="yyyy/mm/dd" />
            </div>
          ),
        },
      ]}
    />
  );
}

function DatePickerStatesSpec() {
  return (
    <SpecColumn
      title="Date Picker"
      rows={[
        { label: 'Default', content: <DatePicker type="date" state="default" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: 'Hover', content: <DatePicker type="date" state="hover" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: 'Focus', content: <DatePicker type="date" state="focus" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: 'Active Focus', content: <DatePicker type="date" state="active-focus" label="Date" value="2024/04/22" /> },
        { label: 'Filled', content: <DatePicker type="date" state="filled" label="Date" value="2024/04/22" /> },
        { label: 'Disabled', content: <DatePicker type="date" state="disabled" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: 'Error', content: <DatePicker type="date" state="error" label="Date" placeholder="yyyy/mm/dd" /> },
      ]}
    />
  );
}

function TimePickerStatesSpec() {
  return (
    <SpecColumn
      title="Time Picker"
      rows={[
        { label: 'Default', content: <DatePicker type="time" state="default" label="Time" placeholder="hh:mm" /> },
        { label: 'Hover', content: <DatePicker type="time" state="hover" label="Time" placeholder="hh:mm" /> },
        { label: 'Active Focus', content: <DatePicker type="time" state="active-focus" label="Time" placeholder="hh:mm" /> },
        { label: 'Active Filled', content: <DatePicker type="time" state="active-focus" label="Time" value="11:11" /> },
        { label: 'Filled', content: <DatePicker type="time" state="filled" label="Time" value="11:11" /> },
        { label: 'Disabled', content: <DatePicker type="time" state="disabled" label="Time" placeholder="hh:mm" /> },
        { label: 'Error', content: <DatePicker type="time" state="error" label="Time" value="24:22" /> },
      ]}
    />
  );
}

function CalendarStatesSpec() {
  const demoOpen = { monthLabel: 'Dec', year: 2024, today: 12 };
  const demoFilled = { monthLabel: 'Dec', year: 2024, today: 12, selected: 17 };

  return (
    <SpecColumn
      title="Calendar"
      rows={[
        { label: 'Default', content: <DatePicker type="calendar" state="default" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: 'Hover', content: <DatePicker type="calendar" state="hover" label="Date" placeholder="yyyy/mm/dd" /> },
        {
          label: 'Active Focus',
          content: (
            <DatePicker
              type="calendar" state="active-focus" label="Date" placeholder="yyyy/mm/dd"
              showCalendar inlineDropdown demoCalendar={demoOpen}
            />
          ),
        },
        {
          label: 'Active Filled',
          content: (
            <DatePicker
              type="calendar" state="active-focus" label="Date" value="2024/12/17"
              showCalendar inlineDropdown demoCalendar={demoFilled}
            />
          ),
        },
        { label: 'Filled', content: <DatePicker type="calendar" state="filled" label="Date" value="2024/04/22" /> },
        { label: 'Disabled', content: <DatePicker type="calendar" state="disabled" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: 'Error', content: <DatePicker type="calendar" state="error" label="Date" placeholder="yyyy/mm/dd" /> },
      ]}
    />
  );
}

export function DatePickerSpec() {
  return (
    <div style={{ padding: '16px 18px', overflowY: 'auto', height: '100%', display: 'flex', flexDirection: 'column', gap: 20, background: '#FFFFFF', fontFamily: FONT }}>
      <SpecBadge label="Date & Time Picker" />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <DateTimeOverviewSpec />
        <DatePickerStatesSpec />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <TimePickerStatesSpec />
        <CalendarStatesSpec />
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */
const CARD_STYLE: React.CSSProperties = {
  width: '100%',
  maxWidth: 900,
  height: 560,
  border: '1px solid #EFEDE8',
  borderRadius: 12,
  background: '#FFFFFF',
  overflow: 'hidden',
  boxShadow: '0 1px 2px rgba(16,24,40,0.04)',
};

export default function DatePickerPage() {
  return (
    <div style={{ padding: 32, background: '#FAFAF8', minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 900 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <DatePickerDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 900 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#8089A0', marginBottom: 8, fontFamily: FONT }}>
            REFERENCE SPEC
          </div>
          <div style={{ ...CARD_STYLE, height: 'auto', maxHeight: 850, overflowY: 'auto' }}>
            <DatePickerSpec />
          </div>
        </div>
      </div>
    </div>
  );
}