"use client";
import React, { useEffect, useRef } from "react";
import atomImage from "../../assets/automic_img.png";
import Image from "next/image";

const atomicLevels = [
  {
    name: "Tokens",
    tag: "01",
    description:
      "The smallest functional units of matter at the sub-atomic level, component-level raw values. Each token carries a brand semantic meaning, mapping to a group of items within a component.",
    visual: "dots",
  },
  {
    name: "Atoms",
    tag: "02",
    description:
      "These are the smallest units that cannot be broken down into parts without losing their meaning.",
    visual: "circle",
  },
  {
    name: "Molecules",
    tag: "03",
    description:
      "Molecules are combinations of atoms that work together to form more complex UI elements — like search bars, cards, navigation bars, or dropdown menus.",
    visual: "triple",
  },
  {
    name: "Organisms",
    tag: "04",
    description:
      "Organisms serve to comprise lid components made up of groups of molecules and/or atoms and possibly other organisms. They are relatively complex, forming distinct parts of a system.",
    visual: "grid",
  },
  {
    name: "Templates",
    tag: "05",
    description:
      "Templates in the context of atomic design are the equivalent of wireframes containing groups, placeholders to define where content is available, giving layouts and content's organization.",
    visual: "layout",
  },
  {
    name: "Pages",
    tag: "06",
    description:
      "In the atomic design, pages are instances of templates populated with real content, presenting the final output for user interaction and experience.",
    visual: "page",
  },
];

function AtomicVisual({ type }: { type: string }) {
  if (type === "dots") {
    return (
      <div className="flex gap-2 items-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              background: `rgba(10,103,232,${0.2 + i * 0.2})`,
            }}
          />
        ))}
      </div>
    );
  }
  if (type === "circle") {
    return (
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-[#0a67e8]/40" />
        <div className="absolute inset-2 rounded-full border border-[#0a67e8]/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#0a67e8]/70" />
        </div>
      </div>
    );
  }
  if (type === "triple") {
    return (
      <div className="flex gap-1.5 items-end">
        {[12, 16, 20].map((size, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: size,
              height: size,
              background: `rgba(10,103,232,${0.3 + i * 0.25})`,
            }}
          />
        ))}
      </div>
    );
  }
  if (type === "grid") {
    return (
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{
              width: 10,
              height: 10,
              background:
                i % 2 === 0 ? "rgba(10,103,232,0.5)" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    );
  }
  if (type === "layout") {
    return (
      <div className="flex flex-col gap-1 w-12">
        <div className="h-2 bg-[#0a67e8]/50 rounded-sm" />
        <div className="grid grid-cols-2 gap-1">
          <div className="h-6 bg-white/15 rounded-sm" />
          <div className="h-6 bg-white/15 rounded-sm" />
        </div>
        <div className="h-1.5 bg-white/10 rounded-sm" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1 w-10">
      <div className="h-2 bg-[#0a67e8]/40 rounded-sm" />
      <div className="h-1.5 bg-white/20 rounded-sm w-3/4" />
      <div className="h-1.5 bg-white/15 rounded-sm w-1/2" />
      <div className="h-1.5 bg-white/10 rounded-sm w-2/3" />
    </div>
  );
}

export default function AtomicDesignSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardsRef.current.forEach((card, i) => {
              if (!card) return;
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, i * 80);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="atomic"
      ref={sectionRef}
      className="py-28 bg-[#0D0D0D] relative overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,243,239,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,239,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse, rgba(10,103,232,0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header — left: eyebrow + heading + description + badge (one reading column), right: atom illustration, vertically centered */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 lg:mb-24 items-center">
          {/* Left column — everything textual, in natural top-to-bottom flow */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#0a67e8]" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#0a67e8]">
                Atomic Design
              </span>
              <div className="w-6 h-px bg-[#0a67e8]" />
            </div>
            <h2
              className="text-white leading-none mb-0"
              style={{
                fontSize: "clamp(36px, 6vw, 80px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              What is an <br className="hidden sm:block" />
              <span className="text-[#0a67e8]">Atomic</span> Design?
            </h2>
            <p className="text-sm md:text-base text-white/45 leading-relaxed max-w-lg">
              Atomic design is a product design methodology that is based on the
              hierarchy of varying complex components. Its notion flows from the
              sub-atomic level, component-level raw values, to atoms, molecules,
              organisms, templates, and pages.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 w-fit"
              style={{
                border: "1px solid rgba(10,103,232,0.3)",
                background: "rgba(10,103,232,0.08)",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#0a67e8] animate-pulse" />
              <span className="text-xs font-bold text-[#0a67e8] uppercase tracking-[0.3em]">
                Beta
              </span>
            </div>
          </div>

          {/* Right column — atom illustration only, centered in the available space */}
          <div className="flex justify-center lg:justify-end items-center">
            <Image
              src={atomImage}
              alt="Atom structure illustration"
              width={420}
              height={420}
              className="opacity-90 drop-shadow-[0_0_70px_rgba(10,103,232,0.22)] w-[220px] sm:w-[300px] lg:w-[380px] h-auto"
              priority
            />
          </div>
        </div>

        {/* 6-card grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px relative z-30"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {atomicLevels.map((level, i) => (
            <div
              key={level.name}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transition:
                  "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
                background: "rgba(13,13,13,0.95)",
              }}
              className="p-6 sm:p-8 group hover:bg-[#141414] transition-colors duration-300 relative overflow-hidden"
            >
              {/* Corner registration marks */}
              <span className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-[#0a67e8]/0 group-hover:border-[#0a67e8]/60 transition-all duration-300" />
              <span className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-[#0a67e8]/0 group-hover:border-[#0a67e8]/60 transition-all duration-300" />

              {/* Radial hover glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(10,103,232,0.14) 0%, transparent 70%)",
                }}
              />

              {/* Tag number */}
              <div
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs font-mono text-white/15 group-hover:text-[#0a67e8]/50 transition-colors duration-300"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {level.tag}
              </div>

              {/* Visual */}
              <div className="mb-6 sm:mb-8 h-10 flex items-center">
                <AtomicVisual type={level.visual} />
              </div>

              <h3
                className="text-white mb-2 sm:mb-3 flex items-center gap-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(18px, 2vw, 22px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                {level.name}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed relative z-10">
                {level.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0a67e8] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-16 lg:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/[0.06] relative z-30">
          <p
            className="text-white/15 leading-tight"
            style={{
              fontSize: "clamp(24px, 4vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Using <span className="text-[#0a67e8]">Atomic</span> Design{" "}
            <span className="text-white/30">Principles</span> ↗
          </p>
          <div className="flex items-center gap-3 px-4 py-2 shrink-0" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="w-2 h-2 rounded-full bg-[#0a67e8] animate-pulse" />
            <span className="text-xs font-mono text-white/30 uppercase tracking-widest">
              82 Components Built
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}