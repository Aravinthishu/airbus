'use client';
import React from 'react';
import { CategoryDef, ComponentId } from '../types';
import { SubAccordionItem } from './sub-accordion-item';

export function CategoryAccordion({
  cat,
  isOpen,
  openComp,
  activeTab,
  onToggleCat,
  onToggleComp,
  setActiveTab,
}: {
  cat: CategoryDef;
  isOpen: boolean;
  openComp: ComponentId | null;
  activeTab: 'props' | 'a11y';
  onToggleCat: () => void;
  onToggleComp: (id: ComponentId) => void;
  setActiveTab: (t: 'props' | 'a11y') => void;
}) {
  return (
    <div
      className="rounded-3xl border overflow-hidden mb-4 transition-shadow"
      style={{ borderColor: isOpen ? 'rgba(10,103,232,0.25)' : '#E8E5DF', background: '#FFFFFF', boxShadow: isOpen ? '0 20px 50px rgba(10,20,50,0.08)' : 'none' }}
    >
      <div
        onClick={onToggleCat}
        className="px-7 py-6 flex items-center justify-between gap-5 cursor-pointer"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-white text-lg font-bold"
            style={{ background: cat.color, boxShadow: `0 10px 22px ${cat.tint}` }}
          >
            {cat.icon}
          </div>
          <div className="min-w-0">
            <div className="text-lg font-extrabold truncate" style={{ fontFamily: "'DM Sans', sans-serif", color: '#0D0D0D', letterSpacing: '-0.01em' }}>
              {cat.name}
            </div>
            <div className="text-xs mt-0.5 truncate" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>{cat.desc}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span
            className="text-[11px] font-bold px-3.5 py-1.5 rounded-lg whitespace-nowrap hidden sm:inline-block"
            style={{ color: cat.color, background: cat.tint, fontFamily: "'DM Sans', sans-serif" }}
          >
            {cat.items.length ? `${cat.items.length} component${cat.items.length > 1 ? 's' : ''}` : 'coming soon'}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform"
            style={{ background: '#EBF8FF', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="w-4 h-4" style={{ color: '#6B6B6B' }}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="px-7 pb-7">
            {cat.items.length === 0 ? (
              <div
                className="rounded-2xl px-8 py-11 text-center"
                style={{ border: '1.5px dashed #D8D4CC', background: '#FBFAF8' }}
              >
                <h5 className="text-sm font-bold mb-1.5" style={{ color: '#151A24', fontFamily: "'DM Sans', sans-serif" }}>Case study coming soon</h5>
                <p className="text-xs max-w-sm mx-auto leading-relaxed" style={{ color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
                  {cat.name} components are documented internally but haven't been published to this case study yet.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: '#EFEDE8' }}>
                {cat.items.map((itemId, i) => (
                  <SubAccordionItem
                    key={itemId}
                    id={itemId}
                    index={i}
                    isOpen={openComp === itemId}
                    onToggle={() => onToggleComp(itemId)}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
