'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '../../components/ui/AppIcon';

const tokens = [
  {
    type: 'Global Tokens',
    color: 'bg-primary/10 border-primary/20',
    textColor: 'text-primary',
    icon: 'CircleStackIcon' as const,
    description: 'Raw values — the absolute foundation of the system. These define the base colors, sizes, and radii. The single source of truth.',
    example: '--color-orange-500: #E8470A',
    exampleNote: 'global.color.500 → #E8470A',
  },
  {
    type: 'Semantic Tokens',
    color: 'bg-amber-500/10 border-amber-500/20',
    textColor: 'text-amber-500',
    icon: 'TagIcon' as const,
    description: 'Purpose-driven aliases. They reference Global Tokens and communicate intent — "brand", "danger", "success" — rather than raw values.',
    example: '--color-action-primary: var(--color-orange-500)',
    exampleNote: 'semantic.action.primary → global.500',
  },
  {
    type: 'Component Tokens',
    color: 'bg-blue-500/10 border-blue-500/20',
    textColor: 'text-blue-400',
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
      className="py-28 bg-background relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(232,71,10,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(232,71,10,0.04) 0%, transparent 40%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
                Architecture
              </span>
            </div>
            <h2 className="text-section-title text-foreground">
              Design{' '}
              <span className="text-primary">Architecture</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              The structural decisions that make every component consistent, scalable, and switchable without refactoring. A three-layer token system drives every visual decision.
            </p>
          </div>
        </div>

        {/* Token hierarchy visual */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2">
          {tokens.map((token, i) => (
            <React.Fragment key={token.type}>
              <div className="flex items-center gap-2 shrink-0">
                <div className={`w-2.5 h-2.5 rounded-full ${token.textColor === 'text-primary' ? 'bg-primary' : token.textColor === 'text-amber-500' ? 'bg-amber-500' : 'bg-blue-400'}`} />
                <span className="text-sm font-semibold text-foreground">{token.type}</span>
              </div>
              {i < tokens.length - 1 && (
                <div className="flex items-center gap-1 shrink-0">
                  <div className="w-8 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">→</span>
                  <div className="w-8 h-px bg-border" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tokens.map((token, i) => (
            <div
              key={token.type}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
              className={`relative p-6 rounded-2xl border ${token.color} bg-card group hover:shadow-lg transition-shadow duration-300`}
            >
              {/* Icon + Label */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${token.color}`}>
                  <Icon name={token.icon} size={20} className={token.textColor} />
                </div>
                <span className={`text-xs font-mono font-semibold ${token.textColor} uppercase tracking-widest`}>
                  {i === 0 ? '01' : i === 1 ? '02' : '03'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3">{token.type}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{token.description}</p>

              {/* Code example */}
              <div className="bg-foreground/5 rounded-xl p-3 border border-border">
                <div className="text-xs font-mono text-muted-foreground mb-1">{token.example}</div>
                <div className={`text-xs font-mono ${token.textColor} opacity-70`}>{token.exampleNote}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture diagram */}
        <div className="mt-16 p-8 rounded-2xl bg-foreground/3 border border-border">
          <div className="text-xs font-mono text-muted-foreground mb-6 uppercase tracking-widest">Token Flow Diagram</div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {[
              { label: 'Raw Values', sub: 'colors, sizes, radii', bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary' },
              { label: '→', sub: '', bg: '', border: '', text: 'text-muted-foreground' },
              { label: 'Semantic Intent', sub: 'brand, danger, success', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-500' },
              { label: '→', sub: '', bg: '', border: '', text: 'text-muted-foreground' },
              { label: 'Component Use', sub: 'button.bg, input.border', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
            ].map((item, i) => (
              item.label === '→' ? (
                <span key={i} className="text-2xl text-muted-foreground hidden sm:block">{item.label}</span>
              ) : (
                <div key={i} className={`px-6 py-4 rounded-xl border ${item.bg} ${item.border} text-center`}>
                  <div className={`text-sm font-bold ${item.text}`}>{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}