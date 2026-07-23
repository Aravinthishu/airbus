"use client";
import React from "react";
import { ComponentId } from "../types";
import { COMPONENTS } from "../data";
import { MiniBadge, statusColor, statusBg } from "../ui-helpers";
import { LiveDemo, SpecSheet } from "./registry";
import { A11yPanel } from "./a11y-panel";

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
  return (
    <div
      className="border-b last:border-b-0"
      style={{
        borderColor: "#EFEDE8",
        background: isOpen ? "rgba(10,103,232,0.02)" : "transparent",
      }}
    >
      <div
        onClick={onToggle}
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
            className="w-3.5 h-3.5 transition-transform"
            style={{
              color: "#8089A0",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className="px-5 pb-6 pt-1"
            style={{ borderTop: "1px dashed #EFEDE8" }}
          >
            <p
              className="text-xs leading-relaxed max-w-xl my-3.5"
              style={{ color: "#6B6B6B", fontFamily: "'DM Sans', sans-serif" }}
            >
              {comp.desc}
            </p>

            <div
              className="inline-flex gap-1 p-1 rounded-xl mb-4"
              style={{ background: "#EBF8FF" }}
            >
              <button
                onClick={() => setActiveTab("props")}
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                style={
                  activeTab === "props"
                    ? {
                        background: "#fff",
                        color: "#0a67e8",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                        fontFamily: "'DM Sans', sans-serif",
                      }
                    : { color: "#8089A0", fontFamily: "'DM Sans', sans-serif" }
                }
              >
                Properties
              </button>
              <button
                onClick={() => setActiveTab("a11y")}
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2"
                style={
                  activeTab === "a11y"
                    ? {
                        background: "#fff",
                        color: "#0a67e8",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                        fontFamily: "'DM Sans', sans-serif",
                      }
                    : { color: "#8089A0", fontFamily: "'DM Sans', sans-serif" }
                }
              >
                Accessibility
                <span
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded-full"
                  style={{
                    color: statusColor(comp.status),
                    background: statusBg(comp.status),
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
                  <LiveDemo id={id} />
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
