'use client';
import React, { useEffect, useRef } from 'react';


export default function ThankYouSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && textRef.current) {
            textRef.current.style.opacity = '1';
            textRef.current.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-dark-bg flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,243,239,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,239,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      
      {/* Orange radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(232,71,10,0.12) 0%, transparent 70%)'
        }} />
      
      {/* Designer credit strip at top */}
      <div className="absolute top-8 left-0 right-0 flex items-center justify-between px-8 text-xs font-mono text-white/20">
        <span>/ Design System</span>
        <span>// Thank You</span>
      </div>
      <div
        ref={textRef}
        style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)' }}
        className="text-center relative z-10 px-6">
        
        {/* Thank you text */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/30 block mb-8">
            End of Case Study
          </span>
          <h2
            className="font-bold text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}>
            
            Thank{' '}
            <span className="text-primary">You</span>
            !!
          </h2>
        </div>

        <p className="text-base text-white/40 max-w-lg mx-auto leading-relaxed mb-12">
          This case study documents the complete design system built for the Airbus digital product ecosystem — from atomic tokens to production-ready components.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 transition-all orange-glow text-sm">
            
            View on Behance →
          </a>
          <a
            href="#"
            className="px-8 py-4 glass text-white/70 font-semibold rounded-2xl hover:text-white transition-all text-sm">
            
            Back to Portfolio
          </a>
        </div>

        {/* Designer info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
            <img
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1195d5dab-1772200583477.png"
              alt="Designer Romal Raju"
              className="w-full h-full object-cover" />
            
          </div>
          <div className="text-center sm:text-left">
            <div className="text-sm font-semibold text-white">Romal Raju</div>
            <div className="text-xs text-white/40">UI/UX Designer · Design Systems</div>
          </div>
          <div className="flex gap-3 ml-0 sm:ml-4">
            {['Be', 'in', 'tw']?.map((social) =>
            <a
              key={social}
              href="#"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-white/40 hover:text-white hover:border-white/30 transition-all">
              
                {social}
              </a>
            )}
          </div>
        </div>
      </div>
      {/* Large watermark text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div
          className="text-center font-bold leading-none select-none"
          style={{
            fontSize: 'clamp(60px, 14vw, 200px)',
            color: 'rgba(245,243,239,0.02)',
            letterSpacing: '-0.04em'
          }}>
          
          AIRBUS
        </div>
      </div>
      {/* Bottom navigation hint */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
        <div className="flex items-center gap-6 text-xs font-mono text-white/20">
          <span>Airbus Design System</span>
          <span>·</span>
          <span>v2.4.0</span>
          <span>·</span>
          <span>2026</span>
        </div>
      </div>
    </section>);

}