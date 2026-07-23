'use client';
import React, { useEffect, useRef } from 'react';

const spacingTokens = [
  { token: '--spacing-0', value: '0px', alias: 'spacing.0', visual: 0 },
  { token: '--spacing-1', value: '4px', alias: 'spacing.1', visual: 4 },
  { token: '--spacing-2', value: '8px', alias: 'spacing.2', visual: 8 },
  { token: '--spacing-3', value: '12px', alias: 'spacing.3', visual: 12 },
  { token: '--spacing-4', value: '16px', alias: 'spacing.4', visual: 16 },
  { token: '--spacing-5', value: '20px', alias: 'spacing.5', visual: 20 },
  { token: '--spacing-6', value: '24px', alias: 'spacing.6', visual: 24 },
  { token: '--spacing-8', value: '32px', alias: 'spacing.8', visual: 32 },
  { token: '--spacing-10', value: '40px', alias: 'spacing.10', visual: 40 },
  { token: '--spacing-12', value: '48px', alias: 'spacing.12', visual: 48 },
  { token: '--spacing-16', value: '64px', alias: 'spacing.16', visual: 64 },
  { token: '--spacing-20', value: '80px', alias: 'spacing.20', visual: 80 },
];

export default function SpacingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rowsRef.current.forEach((row, i) => {
              if (!row) return;
              setTimeout(() => {
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
              }, i * 40);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="spacing" ref={sectionRef} className="py-28 bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 10% 80%, rgba(232,71,10,0.08) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
                Tokens / Spacing
              </span>
            </div>
            <h2 className="text-section-title text-foreground">
              <span className="text-primary">Spacing</span> System
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              These tokens work with a{' '}
              <span className="font-semibold text-foreground">4-point grid</span>, values can be any multiple of the base grid unit. Every internal margin, padding, and layout gap should reference a spacing token. The{' '}
              <span className="font-semibold text-foreground">ComponentTokens</span> reference semantic tokens to ensure consistency in spacing across all components.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Token table */}
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 px-5 py-3 bg-muted border-b border-border">
              <span className="col-span-5 text-xs font-mono text-muted-foreground uppercase tracking-widest">Token</span>
              <span className="col-span-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">Value</span>
              <span className="col-span-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">Visual</span>
            </div>
            {spacingTokens.map((token, i) => (
              <div
                key={token.token}
                ref={(el) => { if (el) rowsRef.current[i] = el; }}
                style={{ opacity: 0, transform: 'translateX(-16px)', transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)' }}
                className={`grid grid-cols-12 px-5 py-3 items-center hover:bg-primary/3 transition-colors ${i < spacingTokens.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="col-span-5">
                  <span className="text-xs font-mono text-foreground">{token.token}</span>
                </div>
                <div className="col-span-3">
                  <span className="text-xs font-mono text-primary">{token.value}</span>
                </div>
                <div className="col-span-4 flex items-center">
                  <div
                    className="h-3 rounded-sm bg-primary/40"
                    style={{ width: `${Math.min(token.visual * 1.2, 80)}px`, minWidth: token.visual === 0 ? '2px' : undefined }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Visual spacing demo */}
          <div className="space-y-6">
            <div className="text-sm font-semibold text-foreground mb-4">Spacing Visualization</div>
            <div className="space-y-3">
              {spacingTokens.slice(1, 8).map((token) => (
                <div key={token.token} className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground w-24 shrink-0">{token.alias}</span>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="h-8 rounded bg-primary/20 border-r-2 border-primary relative"
                      style={{ width: `${Math.min(token.visual * 2, 160)}px`, minWidth: '8px' }}
                    >
                      <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-mono text-primary/80">
                        {token.value}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Spacing preview card */}
            <div className="mt-8 p-6 rounded-2xl bg-muted border border-border">
              <div className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">Component Spacing Demo</div>
              <div className="space-y-3">
                {[
                  { name: 'Maria Cristina', role: 'Senior Designer', spacing: 'p-4 gap-3' },
                  { name: 'James Okonkwo', role: 'Lead Developer', spacing: 'p-4 gap-3' },
                  { name: 'Priya Nair', role: 'Product Manager', spacing: 'p-4 gap-3' },
                ].map((person) => (
                  <div key={person.name} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{person.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{person.name}</div>
                      <div className="text-xs text-muted-foreground">{person.role}</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}