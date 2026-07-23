'use client';
import React from 'react';
import { Status } from './types';

export const statusColor = (status: Status) =>
  status === 'pass' ? '#0a7a50' : status === 'warn' ? '#8c5e08' : '#b00020';

export const statusBg = (status: Status) =>
  status === 'pass' ? 'rgba(10,122,80,0.10)' : status === 'warn' ? 'rgba(140,94,8,0.10)' : 'rgba(176,0,32,0.10)';

export const statusIcon = (status: Status) => (status === 'pass' ? '✓' : status === 'warn' ? '⚠' : '✕');

export function MiniBadge({ status, pass, total }: { status: Status; pass: number; total: number }) {
  return (
    <span
      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
      style={{ color: statusColor(status), background: statusBg(status) }}
    >
      {pass}/{total}
    </span>
  );
}

export function PropChip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-all"
      style={
        active
          ? { color: '#0a67e8', borderColor: '#B9CCF2', background: 'rgba(10,103,232,0.08)' }
          : { color: '#6B6B6B', borderColor: '#D8D4CC', background: '#FFFFFF' }
      }
    >
      {children}
    </button>
  );
}

export function SpecBadge({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[10px] font-mono px-3 py-1.5 rounded-lg mb-4"
      style={{ color: '#0a67e8', background: 'rgba(10,103,232,0.06)', border: '1px dashed rgba(10,103,232,0.3)' }}
    >
      ◆ {label} · spec
    </div>
  );
}

export function SpecBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4 mb-4 last:mb-0"
      style={{ border: '1px dashed rgba(10,103,232,0.25)', background: 'rgba(255,255,255,0.6)' }}
    >
      <div className="text-[10px] font-bold uppercase tracking-widest mb-3.5" style={{ color: '#8089A0', fontFamily: "'DM Sans', sans-serif" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export function SpecState({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="min-h-[50px] flex items-center justify-center">{children}</div>
      <div className="text-[9px] font-bold uppercase tracking-wide" style={{ color: '#8089A0' }}>
        {label}
      </div>
    </div>
  );
}
