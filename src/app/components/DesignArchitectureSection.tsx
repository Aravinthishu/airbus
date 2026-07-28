'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '../../components/ui/AppIcon';

const tokens = [
  {
    type: 'Primitive Tokens',
    color: 'bg-blue-50/80 border-blue-200/60',
    textColor: 'text-blue-600',
    icon: 'CircleStackIcon' as const,
    description: 'Raw values — the absolute foundation of the system. These define the base colors, sizes, and radii. The single source of truth.',
    example: '--color-blue-500: #3B82F6',
    exampleNote: 'global.color.500 → #3B82F6',
  },
  {
    type: 'Semantic Tokens',
    color: 'bg-emerald-50/80 border-emerald-200/60',
    textColor: 'text-emerald-600',
    icon: 'TagIcon' as const,
    description: 'Purpose-driven aliases. They reference Global Tokens and communicate intent — "brand", "danger", "success" — rather than raw values.',
    example: '--color-action-primary: var(--color-emerald-500)',
    exampleNote: 'semantic.action.primary → global.500',
  },
  {
    type: 'Component Tokens',
    color: 'bg-rose-50/80 border-rose-200/60',
    textColor: 'text-rose-500',
    icon: 'CubeIcon' as const,
    description: 'No component receives tokens directly. Component tokens constrain which semantic tokens a specific component can use, simplifying component logic to developers.',
    example: '--button-bg: var(--color-action-primary)',
    exampleNote: 'button.background → semantic.action.primary',
  },
];

export default function DesignArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = cardsRef.current;
            cards.forEach((card, i) => {
              if (!card) return;
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, i * 120);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="py-28 bg-gradient-to-br from-slate-50 via-white to-slate-50/80 relative overflow-hidden"
    >
      {/* Subtle background pattern with soft glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 40%), radial-gradient(circle at 50% 80%, rgba(244,63,94,0.04) 0%, transparent 30%)',
          }}
        />
        {/* Decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-blue-400" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">
                Architecture
              </span>
            </div>
            <h2 className="text-section-title text-slate-900">
              Design{' '}
              <span className="text-blue-500">Architecture</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base text-slate-600 leading-relaxed max-w-md">
              The structural decisions that make every component consistent, scalable, and switchable without refactoring. A three-layer token system drives every visual decision.
            </p>
          </div>
        </div>

        {/* Token hierarchy visual */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2">
          {tokens.map((token, i) => (
            <React.Fragment key={token.type}>
              <div className="flex items-center gap-2 shrink-0">
                <div className={`w-2.5 h-2.5 rounded-full ${token.textColor === 'text-blue-600' ? 'bg-blue-500' : token.textColor === 'text-emerald-600' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <span className="text-sm font-semibold text-slate-800">{token.type}</span>
              </div>
              {i < tokens.length - 1 && (
                <div className="flex items-center gap-1 shrink-0">
                  <div className="w-8 h-px bg-slate-300" />
                  <span className="text-xs text-slate-400">→</span>
                  <div className="w-8 h-px bg-slate-300" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Cards - Equal width and height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tokens.map((token, i) => (
            <div
              key={token.type}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              style={{ 
                opacity: 0, 
                transform: 'translateY(32px)', 
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)' 
              }}
              className={`relative p-6 rounded-2xl border ${token.color} bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm group hover:shadow-xl hover:shadow-${token.textColor.split('-')[1]}-100/20 transition-all duration-300 flex flex-col h-full min-h-[380px]`}
            >
              {/* Subtle glow effect */}
              <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${token.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
              
              {/* Icon + Label */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${token.color} shadow-sm`}>
                  <Icon name={token.icon} size={20} className={token.textColor} />
                </div>
                <span className={`text-xs font-mono font-semibold ${token.textColor} uppercase tracking-widest`}>
                  {i === 0 ? '01' : i === 1 ? '02' : '03'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3">{token.type}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">{token.description}</p>

              {/* Code example */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50 shadow-sm">
                <div className="text-xs font-mono text-slate-600 mb-1">{token.example}</div>
                <div className={`text-xs font-mono ${token.textColor} opacity-70`}>{token.exampleNote}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture diagram - Updated with equal cards and larger font */}
        <div className="mt-16 p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 shadow-sm">
          <div className="text-xs font-mono text-slate-500 mb-6 uppercase tracking-widest">Token Flow Diagram</div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {[
              { label: 'Raw Values', sub: 'colors, sizes, radii', bg: 'bg-blue-50/80', border: 'border-blue-300/50', text: 'text-blue-600' },
              { label: '→', sub: '', bg: '', border: '', text: 'text-slate-400' },
              { label: 'Semantic Intent', sub: 'brand, danger, success', bg: 'bg-emerald-50/80', border: 'border-emerald-300/50', text: 'text-emerald-600' },
              { label: '→', sub: '', bg: '', border: '', text: 'text-slate-400' },
              { label: 'Component Use', sub: 'button.bg, input.border', bg: 'bg-rose-50/80', border: 'border-rose-300/50', text: 'text-rose-500' },
            ].map((item, i) => (
              item.label === '→' ? (
                <span key={i} className="text-3xl text-slate-300 hidden sm:block font-light">{item.label}</span>
              ) : (
                <div key={i} className={`px-8 py-5 rounded-xl border ${item.bg} ${item.border} text-center shadow-sm min-w-[180px] flex-1`}>
                  <div className={`text-base font-bold ${item.text}`}>{item.label}</div>
                  <div className="text-sm text-slate-500 mt-1.5">{item.sub}</div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}