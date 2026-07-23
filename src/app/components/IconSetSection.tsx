'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '../../components/ui/AppIcon';

type IconName = 'HomeIcon' | 'UserIcon' | 'CogIcon' | 'BellIcon' | 'SearchIcon' | 'HeartIcon' | 'StarIcon' | 'BookmarkIcon' | 'ShareIcon' | 'TrashIcon' | 'PencilIcon' | 'PlusIcon' | 'MinusIcon' | 'CheckIcon' | 'XMarkIcon' | 'ArrowRightIcon' | 'ArrowLeftIcon' | 'ArrowUpIcon' | 'ArrowDownIcon' | 'ChevronRightIcon' | 'ChevronLeftIcon' | 'ChevronUpIcon' | 'ChevronDownIcon' | 'MagnifyingGlassIcon' | 'FunnelIcon' | 'AdjustmentsHorizontalIcon' | 'Bars3Icon' | 'EllipsisHorizontalIcon' | 'EllipsisVerticalIcon' | 'InformationCircleIcon' | 'ExclamationCircleIcon' | 'CheckCircleIcon' | 'XCircleIcon' | 'QuestionMarkCircleIcon' | 'PhotoIcon' | 'DocumentIcon' | 'FolderIcon' | 'CloudArrowUpIcon' | 'CloudArrowDownIcon' | 'LinkIcon' | 'GlobeAltIcon' | 'EnvelopeIcon' | 'PhoneIcon' | 'MapPinIcon' | 'CalendarIcon' | 'ClockIcon' | 'CreditCardIcon' | 'ShoppingCartIcon' | 'TagIcon' | 'CubeIcon' | 'SparklesIcon' | 'FireIcon' | 'BoltIcon' | 'SunIcon' | 'MoonIcon' | 'EyeIcon' | 'EyeSlashIcon' | 'LockClosedIcon' | 'LockOpenIcon' | 'ShieldCheckIcon';

const iconNames: IconName[] = [
  'HomeIcon', 'UserIcon', 'CogIcon', 'BellIcon', 'SearchIcon', 'HeartIcon',
  'StarIcon', 'BookmarkIcon', 'ShareIcon', 'TrashIcon', 'PencilIcon', 'PlusIcon',
  'MinusIcon', 'CheckIcon', 'XMarkIcon', 'ArrowRightIcon', 'ArrowLeftIcon', 'ArrowUpIcon',
  'ArrowDownIcon', 'ChevronRightIcon', 'ChevronLeftIcon', 'ChevronUpIcon', 'ChevronDownIcon',
  'MagnifyingGlassIcon', 'FunnelIcon', 'AdjustmentsHorizontalIcon', 'Bars3Icon',
  'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'InformationCircleIcon',
  'ExclamationCircleIcon', 'CheckCircleIcon', 'XCircleIcon', 'QuestionMarkCircleIcon',
  'PhotoIcon', 'DocumentIcon', 'FolderIcon', 'CloudArrowUpIcon', 'CloudArrowDownIcon',
  'LinkIcon', 'GlobeAltIcon', 'EnvelopeIcon', 'PhoneIcon', 'MapPinIcon',
  'CalendarIcon', 'ClockIcon', 'CreditCardIcon', 'ShoppingCartIcon', 'TagIcon',
  'CubeIcon', 'SparklesIcon', 'FireIcon', 'BoltIcon', 'SunIcon',
  'MoonIcon', 'EyeIcon', 'EyeSlashIcon', 'LockClosedIcon', 'LockOpenIcon', 'ShieldCheckIcon',
];

export default function IconSetSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && gridRef.current) {
            const cells = gridRef.current.querySelectorAll('.icon-cell');
            cells.forEach((cell, i) => {
              const el = cell as HTMLElement;
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'scale(1)';
              }, i * 15);
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
    <section id="icons" ref={sectionRef} className="py-28 bg-dark-bg relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(232,71,10,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">
                Design Assets
              </span>
            </div>
            <h2 className="text-section-title text-white">
              <span className="text-primary">Icon</span> Set
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              We use a curated set of Heroicons to maintain visual consistency across the system. Each icon has two variants — outline for inactive states and solid for active/filled states — ensuring clear affordances.
            </p>
          </div>
        </div>

        {/* Icon size variants */}
        <div className="flex items-center gap-6 mb-8">
          {[16, 20, 24, 32].map((size) => (
            <div key={size} className="flex items-center gap-2">
              <div className="icon-cell" style={{ width: size + 16, height: size + 16 }}>
                <Icon name="SparklesIcon" size={size} className="text-white/50" />
              </div>
              <span className="text-xs font-mono text-white/30">{size}px</span>
            </div>
          ))}
          <span className="text-xs text-white/20 font-mono ml-4">Available icon sizes</span>
        </div>

        {/* Icon grid */}
        <div
          ref={gridRef}
          className="flex flex-wrap gap-2"
        >
          {iconNames.map((name, i) => (
            <div
              key={name}
              className="icon-cell group relative"
              style={{ opacity: 0, transform: 'scale(0.8)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}
              title={name}
            >
              <Icon name={name} size={20} className="text-white/50 group-hover:text-primary transition-colors" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-dark-surface border border-dark-border text-xs font-mono text-white/70 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                {name.replace('Icon', '')}
              </div>
            </div>
          ))}
        </div>

        {/* Icon count */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-4xl font-bold text-white/10">{iconNames.length}+</span>
          <div>
            <div className="text-sm font-semibold text-white/50">Icons in system</div>
            <div className="text-xs text-white/30">Outline + Solid variants · 16–32px · SVG optimized</div>
          </div>
        </div>
      </div>
    </section>
  );
}