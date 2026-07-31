"use client";
import React from "react";
import { ComponentId } from "../types";
import { COMPONENTS } from "../data";
import { MiniBadge, statusColor, statusBg } from "../ui-helpers";
import { LiveDemo, SpecSheet } from "./registry";
import { A11yPanel } from "./a11y-panel";
import { scrollUnderNavbar } from "./scroll-utils";

/* Keep this equal to the offset used in category-accordion.tsx so both
   levels of accordion land at the same spot under the sticky navbar. */
const NAVBAR_OFFSET = 88;

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
                  {" "}
                  {/* 👈 added */}
                  <LiveDemo id={id} />
                </div>
              </div>
              <div
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
    </div>
  );
}
