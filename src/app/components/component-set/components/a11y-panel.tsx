'use client';
import React from 'react';
import { ComponentId } from '../types';
import { A11Y_CHECKS } from '../data';
import { statusColor, statusBg, statusIcon } from '../ui-helpers';

export function A11yPanel({ id }: { id: ComponentId }) {
  const checks = A11Y_CHECKS[id] || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
      {checks.map((c, i) => (
        <div
          key={i}
          className="rounded-2xl p-4 border relative overflow-hidden"
          style={{ borderColor: '#D8D4CC', background: statusBg(c.status) }}
        >
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div>
              <div className="text-[9px] font-mono" style={{ color: '#8089A0' }}>{c.code}</div>
              <div className="text-sm font-bold mt-0.5" style={{ color: '#151A24', fontFamily: "'DM Sans', sans-serif" }}>{c.name}</div>
            </div>
            <div
              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
              style={{ color: statusColor(c.status), background: 'rgba(255,255,255,0.7)' }}
            >
              {statusIcon(c.status)} {c.value}
            </div>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>{c.note}</p>
        </div>
      ))}
    </div>
  );
}
