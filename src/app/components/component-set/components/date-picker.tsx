'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import datePickerImage from '../../../../assets/images/date-picker/date-picker.png';
import dateTimePickerImage from '../../../../assets/images/date-picker/date-time-picker.png';
import calendarImage from '../../../../assets/images/date-picker/calendar.png';
import timePickerImage from '../../../../assets/images/date-picker/time-picker.png';

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
   Calendar Component - Smaller size
============================================================ */
interface CalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
}

function Calendar({ selectedDate, onSelectDate, onClose }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    onSelectDate(`${year}/${month}/${dayStr}`);
    onClose();
  };

  // Get previous month days
  const prevMonthDays = () => {
    const prevDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
    return prevDate.getDate();
  };

  const prevMonthDaysCount = prevMonthDays();
  const totalSlots = Math.ceil((startingDay + daysInMonth) / 7) * 7;
  const prevMonthStart = prevMonthDaysCount - startingDay + 1;

  // Check if today
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() &&
           currentMonth.getMonth() === today.getMonth() &&
           currentMonth.getFullYear() === today.getFullYear();
  };

  // Check if selected
  const isSelected = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}/${String(currentMonth.getMonth() + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
    return selectedDate === dateStr;
  };

  const renderDays = () => {
    const daysArray: React.ReactNode[] = [];

    // Previous month days
    for (let i = 0; i < startingDay; i++) {
      const day = prevMonthStart + i;
      daysArray.push(
        <div key={`prev-${i}`} style={{ padding: '6px 2px', textAlign: 'center', fontSize: 12, color: '#C8C4BC' }}>
          {day}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const selected = isSelected(i);
      const today = isToday(i);
      daysArray.push(
        <div
          key={i}
          onClick={() => handleDateSelect(i)}
          style={{
            padding: '6px 2px',
            textAlign: 'center',
            fontSize: 12,
            cursor: 'pointer',
            borderRadius: '50%',
            background: selected ? '#0B1F4D' : 'transparent',
            color: selected ? '#FFFFFF' : (today ? '#0B1F4D' : '#151A24'),
            fontWeight: today && !selected ? 700 : 400,
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            if (!selected) {
              (e.target as HTMLDivElement).style.background = '#F5F5F4';
            }
          }}
          onMouseLeave={(e) => {
            if (!selected) {
              (e.target as HTMLDivElement).style.background = 'transparent';
            }
          }}
        >
          {i}
        </div>
      );
    }

    // Next month days (fill remaining slots)
    const remainingSlots = totalSlots - (startingDay + daysInMonth);
    for (let i = 1; i <= remainingSlots; i++) {
      daysArray.push(
        <div key={`next-${i}`} style={{ padding: '6px 2px', textAlign: 'center', fontSize: 12, color: '#C8C4BC' }}>
          {i}
        </div>
      );
    }

    return daysArray;
  };

  const getTodayDate = () => {
    const today = new Date();
    return `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        marginTop: 8,
        background: '#FFFFFF',
        borderRadius: 10,
        padding: '14px 18px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        border: '1px solid #EFEDE8',
        zIndex: 1000,
        width: 280,
      }}
    >
      {/* Date display */}
      <div
        style={{
          fontSize: 12,
          color: '#8089A0',
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: 8,
        }}
      >
        Date
      </div>

      {/* Month/Year header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            color: '#8089A0',
            padding: '2px 6px',
          }}
        >
          ‹
        </button>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#151A24',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            color: '#8089A0',
            padding: '2px 6px',
          }}
        >
          ›
        </button>
      </div>

      {/* Day names */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginBottom: 2 }}>
        {days.map((day) => (
          <div
            key={day}
            style={{
              padding: '6px 2px',
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 600,
              color: '#8089A0',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
        {renderDays()}
      </div>

      {/* Today button */}
      <div
        style={{
          marginTop: 12,
          paddingTop: 10,
          borderTop: '1px solid #EFEDE8',
          textAlign: 'center',
        }}
      >
        <button
          onClick={() => {
            const today = new Date();
            const dateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
            onSelectDate(dateStr);
            onClose();
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            color: '#0B1F4D',
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            padding: '2px 12px',
          }}
        >
          Today
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   DatePicker Component
============================================================ */
type PickerType = 'date' | 'time' | 'datetime' | 'calendar';
type PickerState = 'default' | 'hover' | 'focus' | 'active-focus' | 'filled' | 'disabled' | 'error';

interface DatePickerProps {
  type?: PickerType;
  state?: PickerState;
  value?: string;
  placeholder?: string;
  onClick?: () => void;
  onDateSelect: (date: string) => void;
  showCalendar?: boolean;
}

function DatePicker({
  type = 'date',
  state = 'default',
  value = '',
  placeholder = 'yyyy/mm/dd',
  onClick,
  onDateSelect,
  showCalendar = false,
}: DatePickerProps) {
  const config = { padding: '10px 16px', fontSize: 13, width: 220 };

  // State styles
  const getStateStyles = () => {
    switch (state) {
      case 'hover':
        return {
          borderColor: '#D8D4CC',
          background: '#F5F5F4',
          textColor: '#151A24',
        };
      case 'focus':
        return {
          borderColor: '#0B1F4D',
          background: '#E9EEFC',
          textColor: '#151A24',
        };
      case 'active-focus':
        return {
          borderColor: '#0B1F4D',
          background: '#E9EEFC',
          textColor: '#151A24',
        };
      case 'filled':
        return {
          borderColor: '#D8D4CC',
          background: '#FFFFFF',
          textColor: '#151A24',
        };
      case 'disabled':
        return {
          borderColor: '#E4E2DD',
          background: '#F5F5F4',
          textColor: '#B5B9C2',
          opacity: 0.7,
        };
      case 'error':
        return {
          borderColor: '#B00020',
          background: '#FFFFFF',
          textColor: '#151A24',
        };
      default:
        return {
          borderColor: '#D8D4CC',
          background: '#FFFFFF',
          textColor: '#151A24',
        };
    }
  };

  const styles = getStateStyles();
  const isDisabled = state === 'disabled';
  const hasValue = value !== '';
  const displayValue = hasValue ? value : placeholder;

  // Calendar icon
  const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8089A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  // Clock icon
  const ClockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8089A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  // Calendar with clock icon
  const CalendarClockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8089A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="15" r="3" />
      <polyline points="12 13 12 15 14 15" />
    </svg>
  );

  const getIcon = () => {
    if (type === 'time') return <ClockIcon />;
    if (type === 'datetime') return <CalendarClockIcon />;
    if (type === 'calendar') return <CalendarIcon />;
    return <CalendarIcon />;
  };

  const getLabel = () => {
    if (type === 'time') return 'Time';
    if (type === 'datetime') return 'Date & Time';
    if (type === 'calendar') return 'Calendar';
    return 'Time';
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        width: config.width,
        opacity: styles.opacity || 1,
        position: 'relative',
      }}
    >
      <label
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: isDisabled ? '#B5B9C2' : '#3D4759',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {getLabel()}
      </label>
      <div
        onClick={!isDisabled ? onClick : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: config.padding,
          borderRadius: '6px 6px 2px 2px',
          borderBottom: `2px solid ${styles.borderColor}`,
          background: styles.background,
          transition: 'all 0.15s ease',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
      >
        <span
          style={{
            fontSize: config.fontSize,
            color: hasValue ? styles.textColor : '#9AA3B2',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {displayValue}
        </span>
        {getIcon()}
      </div>
      {showCalendar && type !== 'time' && (
        <Calendar
          selectedDate={value}
          onSelectDate={onDateSelect}
          onClose={() => {}}
        />
      )}
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function DatePickerDemo() {
  const [state, setState] = useState<PickerState>('default');
  const [pickerType, setPickerType] = useState<PickerType>('date');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const stateOptions: PickerState[] = ['default', 'hover', 'focus', 'active-focus', 'filled', 'disabled', 'error'];
  const stateLabels = ['Default', 'Hover', 'Focus', 'Active Focus', 'Filled', 'Disabled', 'Error'];

  const pickerTypes: PickerType[] = ['date', 'time', 'datetime', 'calendar'];
  const pickerLabels = ['Date Picker', 'Time Picker', 'Date Time Picker', 'Calendar'];

  const getValueForState = () => {
    if (state === 'filled' || state === 'active-focus') {
      if (pickerType === 'date') return '2024/04/22';
      if (pickerType === 'time') return '11:11';
      if (pickerType === 'datetime') return '2024/04/22 11:11';
      if (pickerType === 'calendar') return selectedDate || '2024/12/17';
    }
    if (state === 'error') return '2024/04/22';
    if (pickerType === 'calendar' && selectedDate) return selectedDate;
    return '';
  };

  const getPlaceholder = () => {
    if (pickerType === 'date') return 'yyyy/mm/dd';
    if (pickerType === 'time') return 'hh:mm';
    if (pickerType === 'datetime') return 'yyyy/mm/dd hh:mm';
    if (pickerType === 'calendar') return 'yyyy/mm/dd';
    return 'yyyy/mm/dd';
  };

  const handlePickerClick = () => {
    if (state !== 'disabled' && pickerType !== 'time') {
      setShowCalendar(!showCalendar);
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flex: '1 1 0',
          minHeight: 350,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          background:
            'repeating-linear-gradient(0deg, rgba(11,31,77,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(11,31,77,0.03) 0 1px, transparent 1px 24px)',
        }}
      >
        <DatePicker
          type={pickerType}
          state={state}
          value={getValueForState()}
          placeholder={getPlaceholder()}
          onClick={handlePickerClick}
          onDateSelect={handleDateSelect}
          showCalendar={showCalendar && pickerType !== 'time'}
        />
      </div>

      <div
        style={{
          padding: 20,
          borderTop: '1px solid #EFEDE8',
          overflowY: 'auto',
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            PICKER TYPE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {pickerTypes.map((type, index) => (
              <PropChip
                key={type}
                active={pickerType === type}
                onClick={() => {
                  setPickerType(type);
                  setShowCalendar(false);
                }}
              >
                {pickerLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            STATE
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {stateOptions.map((s, index) => (
              <PropChip
                key={s}
                active={state === s}
                onClick={() => {
                  setState(s);
                  setShowCalendar(false);
                }}
              >
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
   REFERENCE SPEC - Using images directly with 2 per row
============================================================ */
export function DatePickerSpec() {
  return (
    <div
      style={{
        padding: 24,
        overflowY: 'auto',
        height: '100%',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <SpecBadge label="Date & Time Picker" />

      {/* Row 1: Date Picker + Date Time Picker */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#3D4759',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 4,
            }}
          >
            Date Picker
          </div>
          <div
            style={{
              width: '100%',
              height: 880,
              position: 'relative',
              border: '1px solid #EFEDE8',
              borderRadius: 8,
              overflow: 'hidden',
              background: '#FFFFFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={datePickerImage}
              alt="Date Picker"
              width={280}
              style={{
                objectFit: 'contain',
              }}
              priority
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#3D4759',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 4,
            }}
          >
            Date Time Picker
          </div>
          <div
            style={{
              width: '100%',
              height: 400,
              position: 'relative',
              border: '1px solid #EFEDE8',
              borderRadius: 8,
              overflow: 'hidden',
              background: '#FFFFFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={dateTimePickerImage}
              alt="Date Time Picker"
              width={280}
              style={{
                objectFit: 'contain',
              }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Row 2: Calendar + Time Picker */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#3D4759',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 4,
            }}
          >
            Calendar
          </div>
          <div
            style={{
              width: '100%',
              height: 650,
              position: 'relative',
              border: '1px solid #EFEDE8',
              borderRadius: 8,
              overflow: 'hidden',
              background: '#FFFFFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={calendarImage}
              alt="Calendar"
              width={280}
              style={{
                objectFit: 'contain',
              }}
              priority
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#3D4759',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 4,
            }}
          >
            Time Picker
          </div>
          <div
            style={{
              width: '100%',
              height: 800,
              position: 'relative',
              border: '1px solid #EFEDE8',
              borderRadius: 8,
              overflow: 'hidden',
              background: '#FFFFFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={timePickerImage}
              alt="Time Picker"
              width={220}
              style={{
                objectFit: 'contain',
              }}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE — equal-size preview / reference cards
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
    <div
      style={{
        padding: 32,
        background: '#FAFAF8',
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: 900 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <DatePickerDemo />
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 900 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              color: '#8089A0',
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <DatePickerSpec />
          </div>
        </div>
      </div>
    </div>
  );
}