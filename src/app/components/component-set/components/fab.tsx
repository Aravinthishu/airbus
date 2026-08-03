import React, { useState } from "react";

/* ============================================================
   Minimal stand-ins for your ui-helpers
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
        padding: "4px 10px",
        borderRadius: 6,
        fontSize: 10,
        fontWeight: 600,
        border: `1px solid ${active ? "#0B1F4D" : "#D8D4CC"}`,
        background: active ? "#0B1F4D" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#4B5563",
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
        transition: "all 150ms",
      }}
    >
      {children}
    </button>
  );
}

function SpecBadge({ label }: { label: string }) {
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

// Figma-inspect-style dashed violet frame — wraps only the components being
// annotated, never the row/column labels around them.
function FigmaFrame({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        border: "2px dashed #C084FC",
        borderRadius: 8,
        background: "#FFFFFF",
        padding: 20,
        overflow: "auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Icons used on the action buttons — matches fab-open-all.png
   (print, email, share, copy)
============================================================ */
function IconPrint({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M18 9H6" />
      <path d="M18 9v4H6V9" />
      <rect x="6" y="13" width="12" height="8" />
      <circle cx="8" cy="17" r="1" />
      <circle cx="16" cy="17" r="1" />
    </svg>
  );
}

function IconEmail({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconShare({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function IconCopy({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

/* ============================================================
   FAB Component
============================================================ */
type FabSize = "s" | "m";
type FabDirection = "horizontal" | "vertical-up" | "vertical-down";
type FabState = "default" | "hover" | "active" | "focus" | "disabled";

interface FabAction {
  render: (color: string) => React.ReactNode;
}

function Fab({
  size = "m",
  open = false,
  onToggle,
  direction = "horizontal",
  actions = [
    { render: (c: string) => <IconPrint color={c} /> },
    { render: (c: string) => <IconEmail color={c} /> },
    { render: (c: string) => <IconShare color={c} /> },
    { render: (c: string) => <IconCopy color={c} /> },
  ],
  disabled = false,
  state = "default",
}: {
  size?: FabSize;
  open?: boolean;
  onToggle?: () => void;
  direction?: FabDirection;
  actions?: FabAction[];
  disabled?: boolean;
  state?: FabState;
}) {
  const sizeConfig: Record<
    FabSize,
    { main: number; mini: number; gap: number; iconSize: number }
  > = {
    s: { main: 32, mini: 24, gap: 6, iconSize: 10 },
    m: { main: 40, mini: 30, gap: 8, iconSize: 12 },
  };

  const config = sizeConfig[size] || sizeConfig.m;
  const mainSize = config.main;
  const miniSize = config.mini;
  const gap = config.gap;

  const getStateStyles = () => {
    switch (state) {
      case "hover":
        return {
          mainBg: "#123B82",
          mainShadow: "0 6px 16px rgba(18,59,130,0.4)",
          miniBg: "#F5F5F4",
          iconColor: "#123B82",
          borderColor: "#D8D4CC",
        };
      case "active":
        return {
          mainBg: "#1E56B0",
          mainShadow: "0 4px 12px rgba(30,86,176,0.3)",
          miniBg: "#FFFFFF",
          iconColor: "#1E56B0",
          borderColor: "#1E56B0",
        };
      case "focus":
        return {
          mainBg: "#0B1F4D",
          mainShadow: "0 4px 12px rgba(11,31,77,0.3)",
          miniBg: "#FFFFFF",
          iconColor: "#0B1F4D",
          borderColor: "#0B1F4D",
          focusRing: "#053E9F",
        };
      case "disabled":
        return {
          mainBg: "#B5B9C2",
          mainShadow: "0 4px 12px rgba(0,0,0,0.1)",
          miniBg: "#F5F5F4",
          iconColor: "#B5B9C2",
          borderColor: "#E4E2DD",
        };
      default:
        return {
          mainBg: "#0B1F4D",
          mainShadow: "0 4px 12px rgba(11,31,77,0.3)",
          miniBg: "#FFFFFF",
          iconColor: "#0B1F4D",
          borderColor: "#D8D4CC",
        };
    }
  };

  const stateStyles = getStateStyles();
  const isDisabled = state === "disabled" || disabled;

  const getFocusStyles = () => {
    if (state === "focus") {
      return {
        boxShadow: `0 0 0 2px #FFFFFF, 0 0 0 4px ${stateStyles.focusRing || "#053E9F"}, ${stateStyles.mainShadow}`,
      };
    }
    return {
      boxShadow: stateStyles.mainShadow,
    };
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 120,
        minWidth: 120,
        paddingBottom: direction === "vertical-down" ? 60 : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          ...(direction === "horizontal" && { flexDirection: "row" as const }),
          ...(direction === "vertical-up" && {
            flexDirection: "column-reverse" as const,
          }),
          ...(direction === "vertical-down" && { flexDirection: "column" as const }),
          alignItems: "center",
          gap: gap,
        }}
      >
        {actions.map((action, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              opacity: open ? 1 : 0,
              transform: open ? "scale(1)" : "scale(0.5)",
              transition: `all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 40}ms`,
              pointerEvents: open ? "auto" : "none",
            }}
          >
            <button
              type="button"
              disabled={isDisabled}
              style={{
                width: miniSize,
                height: miniSize,
                borderRadius: "50%",
                border: `1.5px solid ${isDisabled ? "#E4E2DD" : stateStyles.borderColor}`,
                background: isDisabled ? "#F5F5F4" : stateStyles.miniBg,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                cursor: isDisabled ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s ease",
                padding: 0,
              }}
            >
              {action.render(stateStyles.iconColor)}
            </button>
          </div>
        ))}

        <button
          onClick={onToggle}
          disabled={isDisabled}
          style={{
            width: mainSize,
            height: mainSize,
            borderRadius: "50%",
            background: isDisabled ? "#B5B9C2" : stateStyles.mainBg,
            color: "#FFFFFF",
            fontSize: mainSize * 0.45,
            border: "none",
            cursor: isDisabled ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            position: "relative",
            zIndex: 10,
            ...getFocusStyles(),
          }}
        >
          {open ? "×" : "+"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   LIVE DEMO
============================================================ */
export function FabDemo() {
  const [size, setSize] = useState<FabSize>("m");
  const [open, setOpen] = useState(true);
  const [direction, setDirection] = useState<FabDirection>("horizontal");
  const [state, setState] = useState<FabState>("default");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          flex: "1 1 0",
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 32px 32px 32px",
          paddingBottom: direction === "vertical-down" ? 20 : 32,
          background:
            "repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)",
        }}
      >
        <Fab size={size} open={open} onToggle={() => setOpen(!open)} direction={direction} state={state} />
      </div>

      <div
        style={{
          padding: 24,
          borderTop: "1px solid #EFEDE8",
          overflowY: "auto",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: "#8089A0",
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            STATE
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(["default", "hover", "active", "focus", "disabled"] as FabState[]).map((s) => (
              <PropChip key={s} active={state === s} onClick={() => setState(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </PropChip>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              color: "#8089A0",
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            DIRECTION
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(["horizontal", "vertical-up", "vertical-down"] as FabDirection[]).map((d) => (
              <PropChip key={d} active={direction === d} onClick={() => setDirection(d)}>
                {d === "horizontal" ? "Horizontal" : d === "vertical-up" ? "Vertical Up" : "Vertical Down"}
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
              color: "#8089A0",
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            SIZE
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(["s", "m"] as FabSize[]).map((s) => (
              <PropChip key={s} active={size === s} onClick={() => setSize(s)}>
                {s.toUpperCase()}
              </PropChip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFERENCE SPEC — manual code recreation of fab-all.png and
   fab-open-all.png (no external image assets)
============================================================ */

const FAB_STATE_TOKENS: Record<
  FabState,
  {
    fillBg: string;
    fillIcon: string;
    fillRing?: string;
    outlineBg: string;
    outlineBorder: string;
    outlineIcon: string;
    outlineRing?: string;
    icon: "plus" | "close";
  }
> = {
  default: {
    fillBg: "#0B1F4D",
    fillIcon: "#FFFFFF",
    outlineBg: "#FFFFFF",
    outlineBorder: "#0B1F4D",
    outlineIcon: "#0B1F4D",
    icon: "plus",
  },
  hover: {
    fillBg: "#123B82",
    fillIcon: "#FFFFFF",
    outlineBg: "#F1F5FE",
    outlineBorder: "#0B1F4D",
    outlineIcon: "#0B1F4D",
    icon: "plus",
  },
  active: {
    fillBg: "#1E56B0",
    fillIcon: "#FFFFFF",
    outlineBg: "#DCE8FB",
    outlineBorder: "#4C7CC9",
    outlineIcon: "#5D7CAE",
    icon: "close",
  },
  focus: {
    fillBg: "#0B1F4D",
    fillIcon: "#FFFFFF",
    fillRing: "#053E9F",
    outlineBg: "#FFFFFF",
    outlineBorder: "#0B1F4D",
    outlineIcon: "#0B1F4D",
    outlineRing: "#053E9F",
    icon: "plus",
  },
  disabled: {
    fillBg: "#B5B9C2",
    fillIcon: "#FFFFFF",
    outlineBg: "#FFFFFF",
    outlineBorder: "#E4E2DD",
    outlineIcon: "#C9CDD6",
    icon: "plus",
  },
};

function FabCircle({ variant, state, size }: { variant: "fill" | "outline"; state: FabState; size: "m" | "s" }) {
  const dim = size === "m" ? 32 : 24;
  const t = FAB_STATE_TOKENS[state];
  const isFill = variant === "fill";
  const isFocus = state === "focus";
  const glyph = t.icon === "close" ? "×" : "+";
  return (
    <div
      style={{
        width: dim,
        height: dim,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isFill ? t.fillBg : t.outlineBg,
        border: isFill ? "none" : `1.5px solid ${t.outlineBorder}`,
        boxShadow: isFocus
          ? `0 0 0 2px #FFFFFF, 0 0 0 4px ${(isFill ? t.fillRing : t.outlineRing) ?? "#053E9F"}`
          : isFill
          ? "0 4px 10px rgba(11,31,77,0.25)"
          : "none",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span style={{ fontSize: dim * 0.42, fontWeight: 700, lineHeight: 1, color: isFill ? t.fillIcon : t.outlineIcon }}>
        {glyph}
      </span>
    </div>
  );
}

function FabPill({ variant, state, size }: { variant: "fill" | "outline"; state: FabState; size: "m" | "s" }) {
  const height = size === "m" ? 28 : 22;
  const badgeDim = size === "m" ? 14 : 11;
  const t = FAB_STATE_TOKENS[state];
  const isFill = variant === "fill";
  const isFocus = state === "focus";
  return (
    <div
      style={{
        height,
        padding: size === "m" ? "0 12px 0 4px" : "0 8px 0 3px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: isFill ? t.fillBg : t.outlineBg,
        border: isFill ? "none" : `1.5px solid ${t.outlineBorder}`,
        boxShadow: isFocus
          ? `0 0 0 2px #FFFFFF, 0 0 0 4px ${(isFill ? t.fillRing : t.outlineRing) ?? "#053E9F"}`
          : isFill
          ? "0 4px 10px rgba(11,31,77,0.25)"
          : "none",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <span
        style={{
          width: badgeDim,
          height: badgeDim,
          borderRadius: "50%",
          background: "#FFFFFF",
          border: isFill ? "none" : `1.5px solid ${t.outlineBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: badgeDim * 0.55,
          fontWeight: 700,
          color: t.outlineBorder,
          flexShrink: 0,
        }}
      >
        ?
      </span>
      <span style={{ fontSize: size === "m" ? 10 : 9, fontWeight: 700, color: isFill ? "#FFFFFF" : t.outlineIcon }}>Label</span>
    </div>
  );
}

// States & Sizes Grid with horizontal scroll on mobile
function FabStatesSizesGrid() {
  const states: { key: FabState; label: string }[] = [
    { key: "default", label: "Default" },
    { key: "hover", label: "Hover" },
    { key: "active", label: "Active" },
    { key: "focus", label: "Focus" },
    { key: "disabled", label: "Disabled" },
  ];

  return (
    <div style={{ maxWidth: '100%', overflow: 'auto' }}>
      <div style={{ display: "flex", marginBottom: 8, minWidth: 420 }}>
        <div style={{ width: 60, flexShrink: 0 }} />
        {["Size M", "Size S", "Size M", "Size S"].map((l, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>
            {l}
          </div>
        ))}
      </div>
      
      <div style={{ display: "flex", alignItems: "flex-start", minWidth: 420 }}>
        <div style={{ width: 60, flexShrink: 0, display: "flex", flexDirection: "column" }}>
          {states.map((s) => (
            <div
              key={s.key}
              style={{
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 8,
                fontSize: 10,
                color: "#6B7280",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
        <FigmaFrame style={{ flex: 1, padding: "10px 6px", minWidth: 340 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {states.map((s) => (
              <div key={s.key} style={{ display: "flex", alignItems: "center", height: 44 }}>
                <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <FabCircle variant="fill" state={s.key} size="m" />
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <FabCircle variant="outline" state={s.key} size="s" />
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <FabPill variant="fill" state={s.key} size="m" />
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <FabPill variant="outline" state={s.key} size="s" />
                </div>
              </div>
            ))}
          </div>
        </FigmaFrame>
      </div>
    </div>
  );
}

function FabTriggerCircle({ bg, size = 32 }: { bg: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(11,31,77,0.25)",
        flexShrink: 0,
      }}
    >
      <span style={{ color: "#FFFFFF", fontSize: size * 0.42, fontWeight: 700, lineHeight: 1 }}>×</span>
    </div>
  );
}

function FabMiniButton({ icon, size = 24 }: { icon: React.ReactNode; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#FFFFFF",
        border: "1.5px solid #0B1F4D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
  );
}

// Open States with horizontal scroll on mobile
function FabOpenStates() {
  const actionIcons = [
    <IconPrint key="print" color="#0B1F4D" size={11} />,
    <IconEmail key="email" color="#0B1F4D" size={11} />,
    <IconShare key="share" color="#0B1F4D" size={10} />,
    <IconCopy key="copy" color="#0B1F4D" size={10} />,
  ];

  return (
    <div style={{ maxWidth: '100%', overflow: 'auto' }}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", minWidth: 320 }}>
        <div style={{ width: 72, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 10, minHeight: 360 }}>
          <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>Horizontal</div>
          <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>Vertical Up</div>
          <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>Vertical Down</div>
        </div>
        
        <FigmaFrame style={{ padding: 12, maxWidth: 260 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Horizontal */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <FabTriggerCircle bg="#0B1F4D" size={32} />
              <FabTriggerCircle bg="#1E56B0" size={32} />
              {actionIcons.map((icon, i) => (
                <FabMiniButton key={i} icon={icon} size={24} />
              ))}
            </div>

            {/* Vertical Up */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <FabTriggerCircle bg="#0B1F4D" size={32} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                {actionIcons.map((icon, i) => (
                  <FabMiniButton key={i} icon={icon} size={24} />
                ))}
                <FabTriggerCircle bg="#1E56B0" size={32} />
              </div>
            </div>

            {/* Vertical Down */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <FabTriggerCircle bg="#0B1F4D" size={32} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <FabTriggerCircle bg="#1E56B0" size={32} />
                {actionIcons.map((icon, i) => (
                  <FabMiniButton key={i} icon={icon} size={24} />
                ))}
              </div>
            </div>
          </div>
        </FigmaFrame>
      </div>
    </div>
  );
}

export function FabSpec() {
  return (
    <div
      style={{
        padding: 24,
        overflowY: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 32,
        background: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <SpecBadge label="Float Action Button" />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#3D4759" }}>States &amp; Sizes</div>
        <FabStatesSizesGrid />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#3D4759" }}>Open States</div>
        <FabOpenStates />
      </div>
    </div>
  );
}

/* ============================================================
   PAGE — equal-size preview / reference cards
============================================================ */
const CARD_STYLE: React.CSSProperties = {
  width: "100%",
  maxWidth: 900,
  height: 620,
  border: "1px solid #EFEDE8",
  borderRadius: 12,
  background: "#FFFFFF",
  overflow: "hidden",
  boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
};

export default function FabPage() {
  return (
    <div
      style={{
        padding: 32,
        background: "#FAFAF8",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 900 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              color: "#8089A0",
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            LIVE PREVIEW
          </div>
          <div style={CARD_STYLE}>
            <FabDemo />
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: 900 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              color: "#8089A0",
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            DESIGN REFERENCE
          </div>
          <div style={{ ...CARD_STYLE, height: 'auto', minHeight: 960 }}>
            <FabSpec />
          </div>
        </div>
      </div>
    </div>
  );
}