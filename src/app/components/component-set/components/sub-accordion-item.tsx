"use client";
import React from "react";
import { createPortal } from "react-dom";
import { ComponentId } from "../types";
import { COMPONENTS } from "../data";
import { MiniBadge, statusColor, statusBg } from "../ui-helpers";
import { LiveDemo, SpecSheet } from "./registry";
import { A11yPanel } from "./a11y-panel";
import { scrollUnderNavbar } from "./scroll-utils";

/* Keep this equal to the offset used in category-accordion.tsx so both
   levels of accordion land at the same spot under the sticky navbar. */
const NAVBAR_OFFSET = 88;

/* ============================================================
   PER-COMPONENT GUIDED TOUR

   - Generic: works for ANY component in the registry (Button,
     Inputs, whatever) because it only ever targets the two boxes
     THIS file renders itself — "Live Preview" and "Design
     Reference" — never anything inside LiveDemo/SpecSheet. That's
     what fixes the bug where the clear area bled down through
     Button Group / FAB / Inputs & Forms / Navigation: the old
     version's "hole" was accidentally sized off the wrong,
     much-taller ancestor. Here the hole is always exactly one of
     these two bordered boxes, nothing more.
   - Rendered via createPortal + position:fixed so the dim/blur
     covers the WHOLE SITE outside whichever box is highlighted.
   - Lifecycle:
       • Auto-starts the first time this item is opened on the
         Properties tab, if this component's tour hasn't been
         finished/skipped before (per-component localStorage key).
       • Closing the item, switching to the Accessibility tab, or
         scrolling this item out of view all immediately HIDE the
         tour — but do NOT mark it as seen, so it comes back next
         time you reopen this item.
       • Only clicking "Skip" or finishing the last step marks it
         permanently seen for this component.
============================================================ */
const TOUR_SEEN_PREFIX = "tourSeen:";

function isTourSeen(id: string) {
  if (typeof window === "undefined") return true;
  return !!window.localStorage.getItem(TOUR_SEEN_PREFIX + id);
}

function markTourSeen(id: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOUR_SEEN_PREFIX + id, "true");
}

type TourPlacement = "top" | "bottom";

interface TourStep {
  targetRef: React.RefObject<HTMLElement | null>;
  title: string;
  text: string;
  placement: TourPlacement;
}

interface ViewportRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function useViewportRect(targetRef: React.RefObject<HTMLElement | null>, active: boolean) {
  const [rect, setRect] = React.useState<ViewportRect | null>(null);

  React.useEffect(() => {
    if (!active) return;
    const target = targetRef.current;
    if (!target) return;

    const measure = () => {
      const t = target.getBoundingClientRect();
      setRect({ top: t.top, left: t.left, width: t.width, height: t.height });
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [active, targetRef]);

  return rect;
}

function TourOverlay({
  step,
  stepIndex,
  totalSteps,
  onNext,
  onSkip,
}: {
  step: TourStep;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onSkip: () => void;
}) {
  const rect = useViewportRect(step.targetRef, true);

  if (!rect || typeof window === "undefined") return null;

  const PAD = 8;
  const spot = {
    top: rect.top - PAD,
    left: rect.left - PAD,
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
  };

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isBottom = step.placement === "bottom";
  const dimPanel: React.CSSProperties = {
    position: "fixed",
    background: "rgba(10,14,24,0.6)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
  };

  // Mobile-safe: tooltip never wider than the viewport.
  const tooltipWidth = Math.min(270, vw - 24);
  const tooltipLeft = Math.max(12, Math.min(spot.left + spot.width / 2 - tooltipWidth / 2, vw - tooltipWidth - 12));
  const arrowLeft = Math.max(16, Math.min(spot.left + spot.width / 2 - tooltipLeft, tooltipWidth - 16)) - 6;

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 999999, pointerEvents: "auto" }}>
      {/* 4 dimmed + blurred panels framing ONLY this step's box — everything else on the site dims */}
      <div style={{ ...dimPanel, top: 0, left: 0, right: 0, height: Math.max(0, spot.top) }} />
      <div style={{ ...dimPanel, top: spot.top + spot.height, left: 0, right: 0, bottom: 0 }} />
      <div style={{ ...dimPanel, top: spot.top, left: 0, width: Math.max(0, spot.left), height: spot.height }} />
      <div style={{ ...dimPanel, top: spot.top, left: spot.left + spot.width, right: 0, height: spot.height }} />

      {/* glowing highlight border around the box */}
      <div
        style={{
          position: "fixed",
          top: spot.top,
          left: spot.left,
          width: spot.width,
          height: spot.height,
          borderRadius: 14,
          border: "2px solid #C084FC",
          boxShadow: "0 0 0 4px rgba(192,132,252,0.25), 0 0 20px rgba(192,132,252,0.55)",
          pointerEvents: "none",
          transition: "all 250ms ease",
        }}
      />

      {/* tooltip */}
      <div
        style={{
          position: "fixed",
          left: tooltipLeft,
          width: tooltipWidth,
          top: isBottom ? Math.min(spot.top + spot.height + 14, vh - 160) : undefined,
          bottom: !isBottom ? Math.max(vh - spot.top + 14, 12) : undefined,
          background: "#0B1F4D",
          color: "#FFFFFF",
          borderRadius: 10,
          padding: "14px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          fontFamily: "'DM Sans', sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: arrowLeft,
            width: 12,
            height: 12,
            background: "#0B1F4D",
            transform: "rotate(45deg)",
            ...(isBottom ? { top: -6 } : { bottom: -6 }),
          }}
        />
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{step.title}</div>
        <div style={{ fontSize: 12, lineHeight: 1.5, color: "rgba(255,255,255,0.85)", marginBottom: 12 }}>
          {step.text}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
            {stepIndex + 1} / {totalSteps}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={onSkip}
              style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", background: "transparent", border: "none", cursor: "pointer" }}
            >
              Skip
            </button>
            <button
              type="button"
              onClick={onNext}
              style={{ fontSize: 12, fontWeight: 700, color: "#0B1F4D", background: "#C084FC", border: "none", borderRadius: 6, padding: "6px 14px", cursor: "pointer" }}
            >
              {stepIndex + 1 === totalSteps ? "Got it" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function SubAccordionItem({
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
  activeTab: "props" | "a11y";
  setActiveTab: (t: "props" | "a11y") => void;
}) {
  const comp = COMPONENTS[id];
  const contentRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const liveDemoBoxRef = React.useRef<HTMLDivElement>(null);
  const specBoxRef = React.useRef<HTMLDivElement>(null);

  const [tourActive, setTourActive] = React.useState(false);
  const [tourStep, setTourStep] = React.useState(0);

  const tourSteps: TourStep[] = [
    { targetRef: liveDemoBoxRef, title: "Live Preview", text: "Watch your component update as you interact with it.", placement: "bottom" },
    { targetRef: specBoxRef, title: "Design Reference", text: "Every variant, size, and state laid out together for reference.", placement: "bottom" },
  ];

  // Show the tour whenever ALL of these are true at once: the item is open,
  // the Properties tab is active, it hasn't been permanently seen/skipped
  // yet, AND the item is actually scrolled into view. Hide it the instant
  // any of those stops being true. Because this is driven purely by
  // visibility (not by mount/open state), it never scrolls the page on its
  // own — it only ever reacts to scrolling YOU already did — and it
  // naturally re-shows every time you scroll back to an unfinished tour.
  // The tour only exists for the Button component — every other accordion
  // item never shows one at all.
  const TOUR_ENABLED = id === "button";

  React.useEffect(() => {
    if (!TOUR_ENABLED || !isOpen || activeTab !== "props") {
      setTourActive(false);
      return;
    }
    const node = containerRef.current;
    if (!node) return;

    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        if (delayTimer) clearTimeout(delayTimer);
        if (visible && !isTourSeen(id)) {
          delayTimer = setTimeout(() => {
            setTourStep(0);
            setTourActive(true);
          }, 300);
        } else {
          setTourActive(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, [TOUR_ENABLED, isOpen, activeTab, id]);

  const endTour = React.useCallback(() => {
    setTourActive(false);
    markTourSeen(id);
  }, [id]);

  const handleTourNext = () => {
    if (tourStep + 1 >= tourSteps.length) endTour();
    else setTourStep((s) => s + 1);
  };

  const handleToggle = () => {
    onToggle();
    scrollUnderNavbar(() => containerRef.current);
  };

  return (
    <div
      ref={containerRef}
      className="border-b last:border-b-0"
      style={{
        borderColor: "#EFEDE8",
        background: isOpen ? "rgba(10,103,232,0.02)" : "transparent",
        scrollMarginTop: NAVBAR_OFFSET,
      }}
    >
      <div
        onClick={handleToggle}
        className="px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <span
            className="text-[10px] font-mono w-5 flex-shrink-0"
            style={{ color: "#8089A0" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-sm font-semibold truncate"
            style={{
              color: isOpen ? "#0a67e8" : "#151A24",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {comp.name}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <MiniBadge status={comp.status} pass={comp.pass} total={comp.total} />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            className="w-3.5 h-3.5 transition-transform duration-300"
            style={{
              color: "#8089A0",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Accordion Content - Opens from top to bottom */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "2000px" : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          ref={contentRef}
          className="px-5 pb-6 pt-1"
          style={{ borderTop: "1px dashed #EFEDE8" }}
        >
          <p
            className="text-xs leading-relaxed max-w-xl my-3.5"
            style={{ color: "#6B6B6B", fontFamily: "'DM Sans', sans-serif" }}
          >
            {comp.desc}
          </p>

          {/* Enhanced Tabs */}
          <div
            className="inline-flex gap-1 p-1 rounded-xl mb-4"
            style={{
              background: "#F0F2F5",
              border: "1px solid #E4E6E9",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <button
              onClick={() => setActiveTab("props")}
              className="px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-2"
              style={
                activeTab === "props"
                  ? {
                      background: "#0a67e8",
                      color: "#ffffff",
                      boxShadow: "0 4px 14px rgba(10,103,232,0.35)",
                      fontFamily: "'DM Sans', sans-serif",
                      transform: "scale(1.02)",
                    }
                  : {
                      color: "#6B6B6B",
                      fontFamily: "'DM Sans', sans-serif",
                      background: "transparent",
                    }
              }
              onMouseEnter={(e) => {
                if (activeTab !== "props") {
                  e.currentTarget.style.background = "#E8ECF0";
                  e.currentTarget.style.color = "#151A24";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "props") {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#6B6B6B";
                }
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              Properties
            </button>
            <button
              onClick={() => setActiveTab("a11y")}
              className="px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-2"
              style={
                activeTab === "a11y"
                  ? {
                      background: "#0a67e8",
                      color: "#ffffff",
                      boxShadow: "0 4px 14px rgba(10,103,232,0.35)",
                      fontFamily: "'DM Sans', sans-serif",
                      transform: "scale(1.02)",
                    }
                  : {
                      color: "#6B6B6B",
                      fontFamily: "'DM Sans', sans-serif",
                      background: "transparent",
                    }
              }
              onMouseEnter={(e) => {
                if (activeTab !== "a11y") {
                  e.currentTarget.style.background = "#E8ECF0";
                  e.currentTarget.style.color = "#151A24";
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== "a11y") {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#6B6B6B";
                }
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              Accessibility
              <span
                className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                style={{
                  color:
                    activeTab === "a11y" ? "#ffffff" : statusColor(comp.status),
                  background:
                    activeTab === "a11y"
                      ? "rgba(255,255,255,0.2)"
                      : statusBg(comp.status),
                }}
              >
                {comp.pass}/{comp.total}
              </span>
            </button>
          </div>

          {activeTab === "props" ? (
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-5 items-start">
              <div
                ref={liveDemoBoxRef}
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: "#D8D4CC", background: "#FBFAF8" }}
              >
                <div
                  className="px-5 py-3 border-b flex items-center justify-between"
                  style={{ borderColor: "#EFEDE8", background: "#FFFFFF" }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{
                      color: "#8089A0",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Live Preview
                  </span>
                </div>
                <div className="max-h-[580px] overflow-y-auto">
                  <LiveDemo id={id} />
                </div>
              </div>
              <div
                ref={specBoxRef}
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: "#D8D4CC", background: "#FBFAF8" }}
              >
                <div
                  className="px-5 py-3 border-b"
                  style={{ borderColor: "#EFEDE8", background: "#FFFFFF" }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{
                      color: "#8089A0",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Design Reference
                  </span>
                </div>
                <div className="max-h-[560px] overflow-y-auto">
                  <SpecSheet id={id} />
                </div>
              </div>
            </div>
          ) : (
            <A11yPanel id={id} />
          )}
        </div>
      </div>

      {tourActive && (
        <TourOverlay
          step={tourSteps[tourStep]}
          stepIndex={tourStep}
          totalSteps={tourSteps.length}
          onNext={handleTourNext}
          onSkip={endTour}
        />
      )}
    </div>
  );
}