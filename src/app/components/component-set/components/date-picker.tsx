"use client";
import React, { useState, useRef, useEffect } from "react";

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
        padding: "6px 12px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        border: `1px solid ${active ? "#0B1F4D" : "#D8D4CC"}`,
        background: active ? "#0B1F4D" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#4B5563",
        cursor: "pointer",
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
        color: "#8089A0",
        marginBottom: 12,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {label.toUpperCase()}
    </div>
  );
}

/* ============================================================
   ScrollContainer component with auto-hiding scrollbars
============================================================ */
function ScrollContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showScrollbars = () => {
    setShowScrollbar(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const hideScrollbars = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    hideTimeoutRef.current = setTimeout(() => {
      setShowScrollbar(false);
    }, 5000);
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const checkOverflow = () => {
      const hasHorizontalScroll = element.scrollWidth > element.clientWidth;
      const hasVerticalScroll = element.scrollHeight > element.clientHeight;
      if (hasHorizontalScroll || hasVerticalScroll) {
        setShowScrollbar(true);
        hideScrollbars();
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [children]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={showScrollbars}
      onMouseLeave={hideScrollbars}
      style={{
        overflow: 'auto',
        position: 'relative',
        ...(showScrollbar ? {
          scrollbarWidth: 'thin',
          scrollbarColor: '#C084FC transparent',
        } : {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }),
      }}
    >
      <style>
        {`
          .scroll-container::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            opacity: ${showScrollbar ? 1 : 0};
            transition: opacity 0.3s ease;
          }
          
          .scroll-container::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .scroll-container::-webkit-scrollbar-thumb {
            background: ${showScrollbar ? '#C084FC' : 'transparent'};
            border-radius: 3px;
            transition: background 0.3s ease;
          }
          
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: #A855F7;
          }
          
          .scroll-container {
            scrollbar-width: ${showScrollbar ? 'thin' : 'none'};
            scrollbar-color: ${showScrollbar ? '#C084FC transparent' : 'transparent transparent'};
            transition: scrollbar-color 0.3s ease;
          }
        `}
      </style>
      {children}
    </div>
  );
}

/* ============================================================
   Design tokens
============================================================ */
const VIOLET_DASH = "#C084FC";
const FONT = "'DM Sans', sans-serif";
const FOCUS_BORDER = "#2554D6";
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
    <div style={{ display: "flex", flexDirection: "column", gap: 1, color: "#8089A0" }}>
      <svg width="10" height="6" viewBox="0 0 10 6">
        <path d="M1 5 L5 1 L9 5" stroke="#8089A0" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg width="10" height="6" viewBox="0 0 10 6">
        <path d="M1 1 L5 5 L9 1" stroke="#8089A0" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ============================================================
   Month/Year Picker Grid - 4 columns showing month and year together
   FIX: now takes compact/preview and is sized/anchored to fill the
   Calendar's header row (left:0, right:0) instead of a fixed 260px
   width centered on the small month-label chip. That's what was
   causing it to overflow the DateTimeDropdown's clipped container
   and lose the right ("›") arrow.
============================================================ */
function MonthYearPicker({
  currentMonth,
  currentYear,
  onSelect,
  onClose,
  compact = false,
  preview = false,
}: {
  currentMonth: number;
  currentYear: number;
  onSelect: (month: number, year: number) => void;
  onClose: () => void;
  compact?: boolean;
  preview?: boolean;
}) {
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [viewMode, setViewMode] = useState<'months' | 'years'>('months');

  // Generate years array (20 years: 10 before, 10 after current)
  const years = Array.from({ length: 20 }, (_, i) => selectedYear - 10 + i);

  const sizing = preview
    ? { pad: "10px 12px", yearFont: 12, arrowFont: 14, arrowPad: "2px 6px", gap: 4, cellPad: "5px 2px", cellFont: 10, footFont: 9, footMt: 8, footPt: 8, headerMb: 10, headerPb: 8 }
    : compact
    ? { pad: "12px 14px", yearFont: 13, arrowFont: 16, arrowPad: "3px 7px", gap: 5, cellPad: "6px 3px", cellFont: 11, footFont: 10, footMt: 9, footPt: 9, headerMb: 11, headerPb: 9 }
    : { pad: "16px 18px", yearFont: 15, arrowFont: 18, arrowPad: "4px 8px", gap: 6, cellPad: "8px 4px", cellFont: 13, footFont: 11, footMt: 12, footPt: 10, headerMb: 14, headerPb: 10 };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        right: 0,
        boxSizing: "border-box",
        padding: sizing.pad,
        background: "#FFFFFF",
        border: "1px solid #EFEDE8",
        borderRadius: BORDER_RADIUS,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        zIndex: 1100,
      }}
    >
      {/* Header with year and navigation */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: sizing.headerMb,
        paddingBottom: sizing.headerPb,
        borderBottom: "1px solid #EFEDE8"
      }}>
        <button
          onClick={() => setSelectedYear(selectedYear - (viewMode === 'years' ? 20 : 1))}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: sizing.arrowFont,
            color: "#8089A0",
            padding: sizing.arrowPad,
            borderRadius: 4,
            lineHeight: 1,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#F5F5F4"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          ‹
        </button>

        <div
          onClick={() => setViewMode(viewMode === 'months' ? 'years' : 'months')}
          style={{
            cursor: "pointer",
            padding: "4px 12px",
            borderRadius: 4,
            fontSize: sizing.yearFont,
            fontWeight: 700,
            color: "#151A24",
            fontFamily: FONT,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#F5F5F4"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          {selectedYear}
        </div>

        <button
          onClick={() => setSelectedYear(selectedYear + (viewMode === 'years' ? 20 : 1))}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: sizing.arrowFont,
            color: "#8089A0",
            padding: sizing.arrowPad,
            borderRadius: 4,
            lineHeight: 1,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#F5F5F4"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          ›
        </button>
      </div>

      {/* Month grid - 4 columns */}
      {viewMode === 'months' ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: sizing.gap }}>
          {MONTH_NAMES.map((month, idx) => (
            <div
              key={month}
              onClick={() => {
                onSelect(idx, selectedYear);
                onClose();
              }}
              style={{
                padding: sizing.cellPad,
                textAlign: "center",
                fontSize: sizing.cellFont,
                fontFamily: FONT,
                fontWeight: idx === currentMonth && selectedYear === currentYear ? 700 : 400,
                color: idx === currentMonth && selectedYear === currentYear ? "#FFFFFF" : "#151A24",
                background: idx === currentMonth && selectedYear === currentYear ? "#0B1F4D" : "transparent",
                borderRadius: BORDER_RADIUS,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!(idx === currentMonth && selectedYear === currentYear)) {
                  e.currentTarget.style.background = "#F5F5F4";
                }
              }}
              onMouseLeave={(e) => {
                if (!(idx === currentMonth && selectedYear === currentYear)) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {month}
            </div>
          ))}
        </div>
      ) : (
        /* Year grid - 4 columns */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: sizing.gap }}>
          {years.map((year) => (
            <div
              key={year}
              onClick={() => {
                setSelectedYear(year);
                setViewMode('months');
              }}
              style={{
                padding: sizing.cellPad,
                textAlign: "center",
                fontSize: sizing.cellFont,
                fontFamily: FONT,
                fontWeight: year === selectedYear ? 700 : 400,
                color: year === selectedYear ? "#FFFFFF" : "#151A24",
                background: year === selectedYear ? "#0B1F4D" : "transparent",
                borderRadius: BORDER_RADIUS,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (year !== selectedYear) {
                  e.currentTarget.style.background = "#F5F5F4";
                }
              }}
              onMouseLeave={(e) => {
                if (year !== selectedYear) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {year}
            </div>
          ))}
        </div>
      )}

      {/* Footer with view toggle hint */}
      <div style={{
        marginTop: sizing.footMt,
        paddingTop: sizing.footPt,
        borderTop: "1px solid #EFEDE8",
        textAlign: "center",
        fontSize: sizing.footFont,
        color: "#8089A0",
        fontFamily: FONT,
      }}>
        {viewMode === 'months' ? (
          <span style={{ cursor: "pointer" }} onClick={() => setViewMode('years')}>
            Click year to change
          </span>
        ) : (
          <span style={{ cursor: "pointer" }} onClick={() => setViewMode('months')}>
            Click month to select
          </span>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Calendar dropdown
============================================================ */
interface CalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onClose: () => void;
  inline?: boolean;
  demo?: { monthLabel: string; year: number; today: number; selected?: number };
  compact?: boolean;
  preview?: boolean;
  autoClose?: boolean;
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ selectedDate, onSelectDate, onClose, inline = false, demo, compact = false, preview = false, autoClose = true }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    demo ? new Date(demo.year, MONTH_NAMES.indexOf(demo.monthLabel), 1) : new Date()
  );
  const [pickerOpen, setPickerOpen] = useState(false);

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

  const handleMonthYearSelect = (month: number, year: number) => {
    setCurrentMonth(new Date(year, month, 1));
    setPickerOpen(false);
  };

  const handleDateSelect = (day: number) => {
    if (demo) return;
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    onSelectDate(`${year}/${month}/${dayStr}`);
    if (autoClose) onClose();
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
    const dateStr = `${currentMonth.getFullYear()}/${String(currentMonth.getMonth() + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
    return selectedDate === dateStr;
  };

  const renderDays = () => {
    const cells: React.ReactNode[] = [];

    for (let i = 0; i < startingDay; i++) {
      const day = prevMonthStart + i;
      cells.push(
        <div key={`prev-${i}`} style={{ padding: "3px 1px", textAlign: "center", fontSize: preview ? 10 : 11, color: "#C8C4BC" }}>
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
            position: "relative",
            padding: "3px 1px",
            textAlign: "center",
            fontSize: preview ? 10 : 11,
            cursor: demo ? "default" : "pointer",
            borderRadius: BORDER_RADIUS,
            border: today && !selected ? `1.5px solid ${FOCUS_BORDER}` : "1.5px solid transparent",
            background: selected ? "#0B1F4D" : "transparent",
            color: selected ? "#FFFFFF" : today ? FOCUS_BORDER : "#151A24",
            fontWeight: today || selected ? 700 : 400,
            fontFamily: FONT,
            transition: "all 0.15s ease",
          }}
        >
          {i}
          {today && !selected && (
            <span
              style={{
                position: "absolute",
                bottom: 1,
                left: "50%",
                transform: "translateX(-50%)",
                width: 2,
                height: 2,
                borderRadius: "50%",
                background: FOCUS_BORDER,
              }}
            />
          )}
        </div>
      );
    }

    const remainingSlots = totalSlots - (startingDay + daysInMonth);
    for (let i = 1; i <= remainingSlots; i++) {
      cells.push(
        <div key={`next-${i}`} style={{ padding: "3px 1px", textAlign: "center", fontSize: preview ? 10 : 11, color: "#C8C4BC" }}>
          {i}
        </div>
      );
    }

    return cells;
  };

  let styles;
  if (preview) {
    styles = { padding: "8px 10px", width: 200, fontSize: 10 };
  } else if (compact) {
    styles = { padding: "8px 10px", width: 195, fontSize: 10 };
  } else {
    styles = { padding: "14px 18px", width: 260 };
  }

  return (
    <div
      style={{
        position: inline ? "static" : "absolute",
        top: "100%",
        marginTop: 4,
        background: "#FFFFFF",
        borderRadius: BORDER_RADIUS,
        boxShadow: inline ? "none" : "0 4px 20px rgba(0,0,0,0.15)",
        border: "1px solid #EFEDE8",
        zIndex: 1000,
        ...styles,
      }}
    >
      {/* FIX: position:"relative" moved from the small month-label chip
          onto this whole header row, so the MonthYearPicker (left:0,
          right:0) spans the calendar's full width and can't get
          clipped by an ancestor's overflow:hidden. */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: preview ? 5 : 6 }}>
        <button
          onClick={() => shiftMonth(-1)}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: preview ? 16 : 18, color: "#8089A0", padding: "4px 8px" }}
        >
          ‹
        </button>

        <div
          onClick={() => {
            if (demo) return;
            setPickerOpen((v) => !v);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            border: "1px solid #EFEDE8",
            borderRadius: BORDER_RADIUS,
            cursor: demo ? "default" : "pointer",
            minWidth: 120,
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            if (!demo) e.currentTarget.style.background = "#F5F5F4";
          }}
          onMouseLeave={(e) => {
            if (!demo) e.currentTarget.style.background = "transparent";
          }}
        >
          <span style={{ fontSize: preview ? 12 : compact ? 13 : 15, fontWeight: 600, color: "#151A24", fontFamily: FONT }}>
            {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
        </div>

        <button
          onClick={() => shiftMonth(1)}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: preview ? 16 : 18, color: "#8089A0", padding: "4px 8px" }}
        >
          ›
        </button>

        {pickerOpen && (
          <MonthYearPicker
            currentMonth={currentMonth.getMonth()}
            currentYear={currentMonth.getFullYear()}
            onSelect={handleMonthYearSelect}
            onClose={() => setPickerOpen(false)}
            compact={compact}
            preview={preview}
          />
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: preview ? 1 : 2 }}>
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            style={{ padding: preview ? "2px 1px" : "3px 2px", textAlign: "center", fontSize: preview ? 8 : compact ? 8 : 11, fontWeight: 600, color: "#8089A0", fontFamily: FONT }}
          >
            {day}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>{renderDays()}</div>

      <div style={{ marginTop: preview ? 5 : 6, paddingTop: preview ? 5 : 6, borderTop: "1px solid #EFEDE8", textAlign: "center" }}>
        <button
          onClick={() => {
            if (demo) return;
            const today = new Date();
            setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
            const dateStr = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;
            onSelectDate(dateStr);
            if (autoClose) onClose();
          }}
          style={{ background: "none", border: "none", cursor: demo ? "default" : "pointer", fontSize: preview ? 9 : compact ? 9 : 12, color: FOCUS_BORDER, fontWeight: 600, fontFamily: FONT, padding: "1px 6px" }}
        >
          Today
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   TimeColumnsPicker — the 3 scrollable hh / mm / AM-PM columns
============================================================ */
function TimeColumnsPicker({
  selHour,
  selMinute,
  selPeriod,
  setSelHour,
  setSelMinute,
  setSelPeriod,
  compact = false,
  preview = false,
}: {
  selHour: string;
  selMinute: string;
  selPeriod: string;
  setSelHour: (v: string) => void;
  setSelMinute: (v: string) => void;
  setSelPeriod: (v: string) => void;
  compact?: boolean;
  preview?: boolean;
}) {
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
  const periods = ["AM", "PM"];

  const columns: { list: string[]; sel: string; set: (v: string) => void }[] = [
    { list: hours, sel: selHour, set: setSelHour },
    { list: minutes, sel: selMinute, set: setSelMinute },
    { list: periods, sel: selPeriod, set: setSelPeriod },
  ];

  return (
    <div style={{ display: "flex", gap: preview ? 3 : 4 }}>
      {columns.map((col, idx) => (
        <div key={idx} style={{ flex: 1, height: preview ? 80 : compact ? 80 : 120, overflowY: "auto", border: "1px solid #EFEDE8", borderRadius: BORDER_RADIUS }}>
          {col.list.map((item) => (
            <div
              key={item}
              onClick={() => col.set(item)}
              style={{
                padding: preview ? "3px 0" : compact ? "3px 0" : "6px 0",
                textAlign: "center",
                fontSize: preview ? 9 : compact ? 10 : 13,
                cursor: "pointer",
                fontFamily: FONT,
                background: col.sel === item ? "#0B1F4D" : "transparent",
                color: col.sel === item ? "#FFFFFF" : "#151A24",
                fontWeight: col.sel === item ? 700 : 400,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function currentTimeParts() {
  const now = new Date();
  let h = now.getHours();
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return { hour: String(h).padStart(2, "0"), minute: String(now.getMinutes()).padStart(2, "0"), period };
}

/* ============================================================
   Time picker dropdown
============================================================ */
interface TimePickerDropdownProps {
  onSelectTime: (time: string) => void;
  onClose: () => void;
  inline?: boolean;
  compact?: boolean;
  preview?: boolean;
}

function TimePickerDropdown({ onSelectTime, onClose, inline = false, compact = false, preview = false }: TimePickerDropdownProps) {
  const [selHour, setSelHour] = useState("11");
  const [selMinute, setSelMinute] = useState("11");
  const [selPeriod, setSelPeriod] = useState("AM");

  let styles;
  if (preview) {
    styles = { padding: "8px 10px", width: 170 };
  } else if (compact) {
    styles = { padding: "8px 10px", width: 160 };
  } else {
    styles = { padding: "14px 18px", width: 200 };
  }

  return (
    <div
      style={{
        position: inline ? "static" : "absolute",
        top: "100%",
        marginTop: 4,
        background: "#FFFFFF",
        borderRadius: BORDER_RADIUS,
        boxShadow: inline ? "none" : "0 4px 20px rgba(0,0,0,0.15)",
        border: "1px solid #EFEDE8",
        zIndex: 1000,
        ...styles,
      }}
    >
      <div style={{ fontSize: preview ? 9 : compact ? 9 : 12, color: "#8089A0", fontFamily: FONT, marginBottom: preview ? 4 : 4 }}>Time</div>

      <TimeColumnsPicker
        selHour={selHour}
        selMinute={selMinute}
        selPeriod={selPeriod}
        setSelHour={setSelHour}
        setSelMinute={setSelMinute}
        setSelPeriod={setSelPeriod}
        compact={compact}
        preview={preview}
      />

      <div style={{ marginTop: preview ? 5 : 6, paddingTop: preview ? 5 : 6, borderTop: "1px solid #EFEDE8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={() => {
            const { hour, minute, period } = currentTimeParts();
            setSelHour(hour);
            setSelMinute(minute);
            setSelPeriod(period);
            onSelectTime(`${hour}:${minute} ${period}`);
            onClose();
          }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: preview ? 9 : compact ? 9 : 12, color: "#8089A0", fontWeight: 600, fontFamily: FONT, padding: "1px 6px" }}
        >
          Now
        </button>
        <button
          onClick={() => {
            onSelectTime(`${selHour}:${selMinute} ${selPeriod}`);
            onClose();
          }}
          style={{
            background: "#0B1F4D",
            border: "none",
            borderRadius: BORDER_RADIUS,
            cursor: "pointer",
            fontSize: preview ? 9 : compact ? 9 : 12,
            color: "#FFFFFF",
            fontWeight: 700,
            fontFamily: FONT,
            padding: preview ? "3px 10px" : compact ? "3px 10px" : "5px 14px",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Date & Time combo dropdown
============================================================ */
interface DateTimeDropdownProps {
  value: string;
  onSelect: (dateTime: string) => void;
  onClose: () => void;
  inline?: boolean;
  compact?: boolean;
  preview?: boolean;
}

function splitDateTimeValue(value: string): { date: string; hour: string; minute: string; period: string } {
  const parts = value.trim().split(" ");
  const date = parts[0] && parts[0].includes("/") ? parts[0] : "";
  const time = parts[1] || "";
  const period = parts[2] === "PM" ? "PM" : "AM";
  const [hour, minute] = time.includes(":") ? time.split(":") : ["11", "11"];
  return { date, hour: hour || "11", minute: minute || "11", period };
}

function DateTimeDropdown({ value, onSelect, onClose, inline = false, compact = false, preview = false }: DateTimeDropdownProps) {
  const initial = splitDateTimeValue(value);
  const [activeTab, setActiveTab] = useState<"date" | "time">("date");
  const [comboDate, setComboDate] = useState(initial.date);
  const [selHour, setSelHour] = useState(initial.hour);
  const [selMinute, setSelMinute] = useState(initial.minute);
  const [selPeriod, setSelPeriod] = useState(initial.period);

  let width;
  if (preview) width = 210;
  else if (compact) width = 200;
  else width = 260;

  const tabBtnStyle = (active: boolean) => ({
    flex: 1,
    padding: preview ? "4px 0" : compact ? "4px 0" : "6px 0",
    textAlign: "center" as const,
    fontSize: preview ? 9 : compact ? 10 : 12,
    fontWeight: 700,
    fontFamily: FONT,
    cursor: "pointer",
    color: active ? FOCUS_BORDER : "#8089A0",
    borderBottom: `2px solid ${active ? FOCUS_BORDER : "transparent"}`,
    background: "none",
    border: "none",
  });

  const canConfirm = comboDate !== "";

  return (
    <div
      style={{
        position: inline ? "static" : "absolute",
        top: "100%",
        marginTop: 4,
        background: "#FFFFFF",
        borderRadius: BORDER_RADIUS,
        boxShadow: inline ? "none" : "0 4px 20px rgba(0,0,0,0.15)",
        border: "1px solid #EFEDE8",
        zIndex: 1000,
        width,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", borderBottom: "1px solid #EFEDE8" }}>
        <button style={tabBtnStyle(activeTab === "date")} onClick={() => setActiveTab("date")}>
          Date{comboDate ? ` · ${comboDate}` : ""}
        </button>
        <button style={tabBtnStyle(activeTab === "time")} onClick={() => setActiveTab("time")}>
          Time · {selHour}:{selMinute} {selPeriod}
        </button>
      </div>

      <div style={{ padding: preview ? "8px 10px" : compact ? "8px 10px" : "12px 14px" }}>
        {activeTab === "date" ? (
          <Calendar
            selectedDate={comboDate}
            onSelectDate={(d) => {
              setComboDate(d);
              setActiveTab("time");
            }}
            onClose={() => {}}
            inline
            compact={compact}
            preview={preview}
            autoClose={false}
          />
        ) : (
          <TimeColumnsPicker
            selHour={selHour}
            selMinute={selMinute}
            selPeriod={selPeriod}
            setSelHour={setSelHour}
            setSelMinute={setSelMinute}
            setSelPeriod={setSelPeriod}
            compact={compact}
            preview={preview}
          />
        )}

        <div style={{ marginTop: preview ? 6 : 8, paddingTop: preview ? 6 : 8, borderTop: "1px solid #EFEDE8", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => {
              if (!canConfirm) return;
              onSelect(`${comboDate} ${selHour}:${selMinute} ${selPeriod}`);
              onClose();
            }}
            style={{
              background: canConfirm ? "#0B1F4D" : "#D8D4CC",
              border: "none",
              borderRadius: BORDER_RADIUS,
              cursor: canConfirm ? "pointer" : "not-allowed",
              fontSize: preview ? 9 : compact ? 9 : 12,
              color: "#FFFFFF",
              fontWeight: 700,
              fontFamily: FONT,
              padding: preview ? "3px 10px" : compact ? "3px 10px" : "5px 14px",
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DatePicker field
============================================================ */
type PickerType = "date" | "time" | "datetime" | "calendar";
type PickerState = "default" | "hover" | "focus" | "active-focus" | "filled" | "disabled" | "error";
type IconType = "none" | "calendar" | "clock" | "datetime" | "spinner";

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
  onDateTimeSelect?: (dateTime: string) => void;
  showCalendar?: boolean;
  showTimePicker?: boolean;
  inlineDropdown?: boolean;
  demoCalendar?: { monthLabel: string; year: number; today: number; selected?: number };
  compact?: boolean;
  preview?: boolean;
}

function DatePicker({
  type = "date",
  state = "default",
  value = "",
  placeholder = "yyyy/mm/dd",
  label,
  iconType,
  width = 160,
  onClick,
  onDateSelect = () => {},
  onTimeSelect = () => {},
  onDateTimeSelect = () => {},
  showCalendar = false,
  showTimePicker = false,
  inlineDropdown = false,
  demoCalendar,
  compact = false,
  preview = false,
}: DatePickerProps) {
  const isDisabled = state === "disabled";
  const isBoxed = state === "focus" || state === "active-focus";
  const hasValue = value !== "";

  const background = state === "active-focus" ? "#E9EEFC" : state === "hover" ? "#F5F5F4" : state === "disabled" ? "#F5F5F4" : "#FFFFFF";

  const borderColor = state === "focus" || state === "active-focus" ? FOCUS_BORDER : state === "error" ? "#B00020" : state === "disabled" ? "#E4E2DD" : "#D8D4CC";

  const resolvedIconType: IconType = iconType ?? (type === "calendar" ? "calendar" : type === "datetime" ? "datetime" : "none");

  const renderIcon = () => {
    if (resolvedIconType === "calendar") return <CalendarIcon />;
    if (resolvedIconType === "clock") return <ClockIcon />;
    if (resolvedIconType === "datetime") return <CalendarClockIcon />;
    if (resolvedIconType === "spinner") return <SpinnerIcon />;
    return null;
  };

  const getLabel = () => {
    if (label) return label;
    if (type === "time") return "Time";
    if (type === "datetime") return "Date & Time";
    return "Date";
  };

  const displayValue = hasValue ? value : placeholder;

  const dropdownOpen = showCalendar || showTimePicker;

  let compactStyles;
  if (preview) {
    compactStyles = { padding: "6px 10px", fontSize: 11, labelSize: 10, gap: 4, minHeight: 32, width: 200 };
  } else if (compact) {
    compactStyles = { padding: "6px 8px", fontSize: 10, labelSize: 9, gap: 3, minHeight: 28 };
  } else {
    compactStyles = { padding: "8px 12px", fontSize: 13, labelSize: 12, gap: 6, minHeight: 40 };
  }

  const finalWidth = preview ? compactStyles.width : width;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: compactStyles.gap, width: finalWidth, opacity: isDisabled ? 0.7 : 1, position: "relative" }}>
      <label style={{ fontSize: compactStyles.labelSize, fontWeight: 700, color: isDisabled ? "#B5B9C2" : "#3D4759", fontFamily: FONT }}>{getLabel()}</label>

      <div
        onClick={!isDisabled ? onClick : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: compactStyles.padding,
          borderRadius: isBoxed ? BORDER_RADIUS : `${BORDER_RADIUS}px ${BORDER_RADIUS}px 2px 2px`,
          border: isBoxed ? `1.5px solid ${borderColor}` : "none",
          borderBottom: isBoxed ? undefined : `2px solid ${borderColor}`,
          background,
          transition: "all 0.15s ease",
          cursor: isDisabled ? "not-allowed" : "pointer",
          minHeight: compactStyles.minHeight,
        }}
      >
        <span style={{ fontSize: compactStyles.fontSize, color: hasValue ? "#151A24" : "#9AA3B2", fontWeight: hasValue ? 600 : 400, fontFamily: FONT }}>{displayValue}</span>
        {renderIcon()}
      </div>

      {state === "error" && <span style={{ fontSize: preview ? 8 : compact ? 8 : 11, color: "#B00020", fontFamily: FONT, marginTop: -2 }}>Legend</span>}

      {dropdownOpen && (type === "date" || type === "calendar") && (
        <Calendar selectedDate={value} onSelectDate={onDateSelect} onClose={() => {}} inline={inlineDropdown} demo={demoCalendar} compact={compact} preview={preview} />
      )}
      {dropdownOpen && type === "time" && <TimePickerDropdown onSelectTime={onTimeSelect} onClose={() => {}} inline={inlineDropdown} compact={compact} preview={preview} />}
      {dropdownOpen && type === "datetime" && (
        <DateTimeDropdown value={value} onSelect={onDateTimeSelect} onClose={() => {}} inline={inlineDropdown} compact={compact} preview={preview} />
      )}
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function DatePickerDemo() {
  const [state, setState] = useState<PickerState>("default");
  const [pickerType, setPickerType] = useState<PickerType>("time");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const stateOptions: PickerState[] = ["default", "hover", "focus", "active-focus", "filled", "disabled", "error"];
  const stateLabels = ["Default", "Hover", "Focus", "Active Focus", "Filled", "Disabled", "Error"];

  const pickerTypes: PickerType[] = ["time", "datetime", "calendar"];
  const pickerLabels = ["Time Picker", "Date Time Picker", "Calendar"];

  const getValueForState = () => {
    if (state === "filled" || state === "active-focus") {
      if (pickerType === "time") return selectedTime || "11:11 AM";
      if (pickerType === "datetime") return selectedDateTime || "2024/04/22 11:11 AM";
      if (pickerType === "calendar") return selectedDate || "2024/12/17";
    }
    if (state === "error") {
      if (pickerType === "time") return "24:22";
      return "2024/04/22";
    }
    if (pickerType === "calendar" && selectedDate) return selectedDate;
    if (pickerType === "time" && selectedTime) return selectedTime;
    if (pickerType === "datetime" && selectedDateTime) return selectedDateTime;
    return "";
  };

  const getPlaceholder = () => {
    if (pickerType === "time") return "hh:mm";
    if (pickerType === "datetime") return "yyyy/mm/dd hh:mm";
    return "yyyy/mm/dd";
  };

  const handlePickerClick = () => {
    if (state === "disabled") return;
    setDropdownOpen((v) => !v);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#FFFFFF" }}>
      <div
        style={{
          flex: "1 1 0",
          minHeight: 315,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "24px 32px 16px 32px",
          paddingTop: 32,
          background:
            "repeating-linear-gradient(0deg, rgba(11,31,77,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(11,31,77,0.03) 0 1px, transparent 1px 24px), #FFFFFF",
        }}
      >
        <DatePicker
          type={pickerType}
          state={state}
          value={getValueForState()}
          placeholder={getPlaceholder()}
          onClick={handlePickerClick}
          onDateSelect={(d) => {
            setSelectedDate(d);
            setDropdownOpen(false);
          }}
          onTimeSelect={(t) => {
            setSelectedTime(t);
            setDropdownOpen(false);
          }}
          onDateTimeSelect={(dt) => {
            setSelectedDateTime(dt);
            setDropdownOpen(false);
          }}
          showCalendar={dropdownOpen}
          showTimePicker={dropdownOpen}
          preview={true}
          width={200}
        />
      </div>

      <div style={{ padding: "16px 20px", borderTop: "1px solid #EFEDE8", overflowY: "auto", background: "#FFFFFF" }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#8089A0", marginBottom: 8, fontFamily: FONT }}>PICKER TYPE</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {pickerTypes.map((type, index) => (
              <PropChip
                key={type}
                active={pickerType === type}
                onClick={() => {
                  setPickerType(type);
                  setDropdownOpen(false);
                }}
              >
                {pickerLabels[index]}
              </PropChip>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#8089A0", marginBottom: 8, fontFamily: FONT }}>STATE</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {stateOptions.map((s, index) => (
              <PropChip
                key={s}
                active={state === s}
                onClick={() => {
                  setState(s);
                  setDropdownOpen(false);
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
   Shared spec grid
============================================================ */
function SpecColumn({ title, rows }: { title: string; rows: { label: string; content: React.ReactNode }[] }) {
  const ROW_LABEL_WIDTH = 60;
  const PICKER_WIDTH = 130;

  const wrapWithWidth = (content: React.ReactNode) => {
    if (React.isValidElement(content) && content.type === DatePicker) {
      return React.cloneElement(content as React.ReactElement<{ width?: number | string; compact?: boolean }>, { width: PICKER_WIDTH, compact: true });
    }
    return content;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#3D4759", fontFamily: FONT, marginBottom: 2 }}>{title}</div>
      <div style={{ background: "#FFFFFF", padding: "16px 14px", borderRadius: BORDER_RADIUS }}>
        <div
          style={{
            position: "relative",
            display: "grid",
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
                  display: "flex",
                  alignItems: "flex-start",
                  paddingTop: 16,
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#8089A0",
                  fontFamily: FONT,
                  textAlign: "right",
                  justifyContent: "flex-end",
                  paddingRight: 4,
                }}
              >
                {row.label}
              </div>
              <div style={{ gridColumn: 2, gridRow: rIdx + 1, display: "flex", alignItems: "flex-start", paddingLeft: 4, overflow: "visible", position: "relative", zIndex: 2 }}>
                {wrapWithWidth(row.content)}
              </div>
            </React.Fragment>
          ))}

          <div
            style={{
              gridColumn: "2 / 3",
              gridRow: `1 / ${rows.length + 1}`,
              margin: "-10px -8px",
              border: `1.5px dashed ${VIOLET_DASH}`,
              borderRadius: BORDER_RADIUS,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC
============================================================ */
function DateTimeOverviewSpec() {
  return (
    <SpecColumn
      title="Overview"
      rows={[
        { label: "Simple Date", content: <DatePicker type="date" state="default" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: "Hour Picker", content: <DatePicker type="time" state="default" label="Time" placeholder="hh:mm" /> },
        { label: "AM/PM", content: <DatePicker type="date" state="hover" label="Time format" value="AM/PM" iconType="spinner" /> },
        { label: "Calendar", content: <DatePicker type="calendar" state="hover" label="Date" placeholder="yyyy/mm/dd" /> },
        {
          label: "Range",
          content: (
            <div style={{ display: "flex", gap: 6 }}>
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
        { label: "Default", content: <DatePicker type="date" state="default" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: "Hover", content: <DatePicker type="date" state="hover" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: "Focus", content: <DatePicker type="date" state="focus" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: "Active Focus", content: <DatePicker type="date" state="active-focus" label="Date" value="2024/04/22" /> },
        { label: "Filled", content: <DatePicker type="date" state="filled" label="Date" value="2024/04/22" /> },
        { label: "Disabled", content: <DatePicker type="date" state="disabled" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: "Error", content: <DatePicker type="date" state="error" label="Date" placeholder="yyyy/mm/dd" /> },
      ]}
    />
  );
}

function TimePickerStatesSpec() {
  return (
    <SpecColumn
      title="Time Picker"
      rows={[
        { label: "Default", content: <DatePicker type="time" state="default" label="Time" placeholder="hh:mm" /> },
        { label: "Hover", content: <DatePicker type="time" state="hover" label="Time" placeholder="hh:mm" /> },
        { label: "Active Focus", content: <DatePicker type="time" state="active-focus" label="Time" placeholder="hh:mm" /> },
        { label: "Active Filled", content: <DatePicker type="time" state="active-focus" label="Time" value="11:11" /> },
        { label: "Filled", content: <DatePicker type="time" state="filled" label="Time" value="11:11" /> },
        { label: "Disabled", content: <DatePicker type="time" state="disabled" label="Time" placeholder="hh:mm" /> },
        { label: "Error", content: <DatePicker type="time" state="error" label="Time" value="24:22" /> },
      ]}
    />
  );
}

function CalendarStatesSpec() {
  const demoOpen = { monthLabel: "Dec", year: 2024, today: 12 };
  const demoFilled = { monthLabel: "Dec", year: 2024, today: 12, selected: 17 };

  return (
    <SpecColumn
      title="Calendar"
      rows={[
        { label: "Default", content: <DatePicker type="calendar" state="default" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: "Hover", content: <DatePicker type="calendar" state="hover" label="Date" placeholder="yyyy/mm/dd" /> },
        {
          label: "Active Focus",
          content: <DatePicker type="calendar" state="active-focus" label="Date" placeholder="yyyy/mm/dd" showCalendar inlineDropdown demoCalendar={demoOpen} />,
        },
        {
          label: "Active Filled",
          content: <DatePicker type="calendar" state="active-focus" label="Date" value="2024/12/17" showCalendar inlineDropdown demoCalendar={demoFilled} />,
        },
        { label: "Filled", content: <DatePicker type="calendar" state="filled" label="Date" value="2024/04/22" /> },
        { label: "Disabled", content: <DatePicker type="calendar" state="disabled" label="Date" placeholder="yyyy/mm/dd" /> },
        { label: "Error", content: <DatePicker type="calendar" state="error" label="Date" placeholder="yyyy/mm/dd" /> },
      ]}
    />
  );
}

export function DatePickerSpec() {
  return (
    <div style={{ padding: "16px 18px", overflowY: "auto", height: "100%", display: "flex", flexDirection: "column", gap: 20, background: "#FFFFFF", fontFamily: FONT }}>
      <SpecBadge label="Date & Time Picker" />

      <ScrollContainer>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <DateTimeOverviewSpec />
          <DatePickerStatesSpec />
        </div>
      </ScrollContainer>

      <ScrollContainer>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <TimePickerStatesSpec />
          <CalendarStatesSpec />
        </div>
      </ScrollContainer>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */
const CARD_STYLE: React.CSSProperties = {
  width: "100%",
  maxWidth: 900,
  height: 560,
  border: "1px solid #EFEDE8",
  borderRadius: 12,
  background: "#FFFFFF",
  overflow: "hidden",
  boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
};

export default function DatePickerPage() {
  return (
    <div style={{ padding: 32, background: "#FAFAF8", minHeight: "100vh", fontFamily: FONT }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: 900 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#8089A0", marginBottom: 8, fontFamily: FONT }}>LIVE PREVIEW</div>
          <div style={CARD_STYLE}>
            <DatePickerDemo />
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: 900 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#8089A0", marginBottom: 8, fontFamily: FONT }}>REFERENCE SPEC</div>
          <div style={{ ...CARD_STYLE, height: "auto", maxHeight: 850, overflowY: "auto" }}>
            <DatePickerSpec />
          </div>
        </div>
      </div>
    </div>
  );
}