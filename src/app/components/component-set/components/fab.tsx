import React, { useState } from "react";
import Image from "next/image";
import fabAllImage from "../../../../assets/images/fab/fab-all.png";
import fabOpenAllImage from "../../../../assets/images/fab/fab-open-all.png";

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

/* ============================================================
   FAB Component
============================================================ */
type FabSize = "s" | "m";
type FabDirection = "horizontal" | "vertical-up" | "vertical-down";
type FabState = "default" | "hover" | "active" | "focus" | "disabled";

interface FabAction {
  icon: string;
  label: string;
}

function Fab({
  size = "m",
  open = false,
  onToggle,
  direction = "horizontal",
  actions = [
    { icon: "✏️", label: "Label" },
    { icon: "📎", label: "Label" },
    { icon: "🔍", label: "Label" },
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
    s: { main: 44, mini: 32, gap: 8, iconSize: 12 },
    m: { main: 52, mini: 38, gap: 10, iconSize: 14 },
  };

  const config = sizeConfig[size] || sizeConfig.m;
  const mainSize = config.main;
  const miniSize = config.mini;
  const gap = config.gap;
  const iconSize = config.iconSize;

  // State styles with correct colors
  const getStateStyles = () => {
    switch (state) {
      case "hover":
        return {
          mainBg: "#002F7B",
          mainShadow: "0 6px 16px rgba(0,47,123,0.4)",
          miniBg: "#F5F5F4",
          iconColor: "#002F7B",
          borderColor: "#D8D4CC",
        };
      case "active":
        return {
          mainBg: "#063D9F",
          mainShadow: "0 4px 12px rgba(6,61,159,0.3)",
          miniBg: "#FFFFFF",
          iconColor: "#063D9F",
          borderColor: "#063D9F",
        };
      case "focus":
        return {
          mainBg: "#0B1F4D",
          mainShadow: "0 0 0 3px rgba(11,31,77,0.3)",
          miniBg: "#FFFFFF",
          iconColor: "#0B1F4D",
          borderColor: "#0B1F4D",
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

  // SVG Icons matching your reference image with dynamic colors
  const IconLink = ({ color }: { color: string }) => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );

  const IconEmail = ({ color }: { color: string }) => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const IconPrint = ({ color }: { color: string }) => (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M18 9H6" />
      <path d="M18 9v4H6V9" />
      <rect x="6" y="13" width="12" height="8" />
      <circle cx="8" cy="17" r="1" />
      <circle cx="16" cy="17" r="1" />
    </svg>
  );

  const actionIcons = [
    <IconLink key="link" color={stateStyles.iconColor} />,
    <IconEmail key="email" color={stateStyles.iconColor} />,
    <IconPrint key="print" color={stateStyles.iconColor} />
  ];

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200,
        minWidth: 200,
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
        {/* Action buttons - no labels */}
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
              {actionIcons[index]}
            </button>
          </div>
        ))}

        {/* Main FAB button */}
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
            boxShadow: isDisabled ? "0 4px 12px rgba(0,0,0,0.1)" : stateStyles.mainShadow,
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
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<FabDirection>("horizontal");
  const [state, setState] = useState<FabState>("default");

  const actions: FabAction[] = [
    { icon: "✏️", label: "" },
    { icon: "📎", label: "" },
    { icon: "🔍", label: "" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          flex: "1 1 0",
          minHeight: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          background:
            "repeating-linear-gradient(0deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(10,103,232,0.03) 0 1px, transparent 1px 24px)",
        }}
      >
        <Fab
          size={size}
          open={open}
          onToggle={() => setOpen(!open)}
          direction={direction}
          state={state}
          actions={actions}
        />
      </div>

      <div
        style={{
          padding: 20,
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
              <PropChip
                key={s}
                active={state === s}
                onClick={() => setState(s)}
              >
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
              <PropChip
                key={d}
                active={direction === d}
                onClick={() => setDirection(d)}
              >
                {d === "horizontal"
                  ? "Horizontal"
                  : d === "vertical-up"
                    ? "Vertical Up"
                    : "Vertical Down"}
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
   REFERENCE SPEC - Using images directly
============================================================ */
export function FabSpec() {
  return (
    <div
      style={{
        padding: 24,
        overflowY: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <SpecBadge label="Float Action Button" />

      {/* FAB All States Image */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#3D4759",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 4,
          }}
        >
          States & Sizes
        </div>
        <div
          style={{
            width: "100%",
            height: 300,
            position: "relative",
            border: "1px solid #EFEDE8",
            borderRadius: 8,
            overflow: "hidden",
            background: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={fabAllImage}
            alt="FAB States and Sizes"
            width={350}
            style={{
              objectFit: "contain",
            }}
            priority
          />
        </div>
      </div>

      {/* FAB Open All Image */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#3D4759",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 4,
          }}
        >
          Open States
        </div>
        <div
          style={{
            width: "100%",
            height: 580,
            border: "1px solid #EFEDE8",
            borderRadius: 8,
            overflow: "hidden",
            background: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={fabOpenAllImage}
            alt="FAB Open States"
            width={350}
            height={450}
            style={{
              objectFit: "contain",
            }}
            priority
          />
        </div>
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
  height: 560,
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
            REFERENCE SPEC
          </div>
          <div style={CARD_STYLE}>
            <FabSpec />
          </div>
        </div>
      </div>
    </div>
  );
}