'use client';
import React, { useState, useEffect } from 'react';
import AppLogo from '../components/ui/AppLogo';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Architecture', href: '#architecture' },
    { label: 'Atomic Design', href: '#atomic' },
    { label: 'Colors', href: '#color' },
    { label: 'Typography', href: '#typography' },
    { label: 'Components', href: '#components' },
    { label: 'Accessibility', href: '#accessibility' },
    { label: 'Variables', href: '#variables' },
    { label: 'Results', href: '#results' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="flex items-center justify-between px-6 py-3 transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(255,255,255,0.72)'
              : 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.80)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.6) inset'
              : '0 2px 20px rgba(0,0,0,0.06)',
            borderRadius: '16px',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-bold text-lg tracking-tight text-[#0D0D0D]">
              Airbus
            </span>
            <span
              className="hidden sm:block text-xs font-mono px-2 py-0.5"
              style={{
                background: 'rgba(232,71,10,0.10)',
                color: '#E8470A',
                border: '1px solid rgba(232,71,10,0.22)',
                borderRadius: '4px',
              }}
            >
              Design System
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems?.map((item) => (
              <a
                key={item?.label}
                href={item?.href}
                className="nav-link-underline text-sm font-medium text-[#0D0D0D]/60 hover:text-[#0D0D0D] transition-colors"
              >
                {item?.label}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-[#0D0D0D]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-[#0D0D0D] transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-[#0D0D0D] transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-[#0D0D0D] transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="lg:hidden mt-2 p-6 shadow-2xl"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.90)',
              borderRadius: '16px',
            }}
          >
            <nav className="flex flex-col gap-4">
              {navItems?.map((item) => (
                <a
                  key={item?.label}
                  href={item?.href}
                  className="text-[#0D0D0D]/70 hover:text-[#0D0D0D] font-medium text-base transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item?.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}