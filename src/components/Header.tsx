'use client';
import React, { useState, useEffect } from 'react';
import AppLogo from '../components/ui/AppLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  sectionIds: string[];
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Overview', href: '#architecture', sectionIds: ['architecture'] },
    { label: 'Foundation', href: '#color', sectionIds: ['atomic', 'color', 'typography', 'grid'] },
    { label: 'Components', href: '#components', sectionIds: ['components'] },
    { label: 'Accessibility', href: '#accessibility', sectionIds: ['accessibility'] },
    { label: 'Variables', href: '#variables', sectionIds: ['variables'] },
    { label: 'Results', href: '#results', sectionIds: ['results'] },
  ];

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const allSectionIds = navItems.flatMap((item) => item.sectionIds);

    const handleScroll = () => {
      const sections = allSectionIds
        .map((id) => ({ id, element: document.getElementById(id) }))
        .filter((s): s is { id: string; element: HTMLElement } => s.element !== null);

      const scrollPosition = window.scrollY + 100;

      let current = '';
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].element.offsetTop <= scrollPosition) {
          current = sections[i].id;
        } else {
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isItemActive = (item: NavItem) => item.sectionIds.includes(activeSection);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
  };

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
              AIRBUS
            </span>
            <span
              className="hidden sm:block text-xs font-mono px-2 py-0.5 bg-[#cfdff7] border-blue-200"
              style={{
                color: '#0A67E8',
                borderRadius: '4px',
                border: '1px solid'
              }}
            >
              Design System
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems?.map((item) => {
              const active = isItemActive(item);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className="nav-link-underline text-sm font-medium relative"
                  style={{
                    color: active ? '#0A67E8' : 'rgba(13,13,13,0.6)',
                    borderBottom: active ? '2px solid #0A67E8' : '2px solid transparent',
                    paddingBottom: '4px',
                    transition: 'color 0.35s ease, border-color 0.35s ease',
                  }}
                >
                  {item.label}
                </a>
              );
            })}
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
              {navItems?.map((item) => {
                const active = isItemActive(item);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="font-medium text-base"
                    style={{
                      color: active ? '#0A67E8' : 'rgba(13,13,13,0.7)',
                      borderLeft: active ? '3px solid #0A67E8' : '3px solid transparent',
                      paddingLeft: '12px',
                      transition: 'color 0.35s ease, border-color 0.35s ease',
                    }}
                    onClick={(e) => {
                      handleNavClick(e);
                      setMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}