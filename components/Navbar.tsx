
import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 border-b border-black/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Text Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-sans text-2xl font-bold tracking-tighter text-black">
            Forinit.
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12 text-sm font-medium tracking-wide text-black">
          <a href="#work" className="hover:opacity-50 transition-opacity">Selected Work</a>
          <a href="#expertise" className="hover:opacity-50 transition-opacity">Expertise</a>
          <a href="#dia" className="hover:opacity-50 transition-opacity">Ventures</a>
          <a href="#about" className="hover:opacity-50 transition-opacity">Studio</a>
        </div>

        {/* Contact Link */}
        <a href="mailto:business@forinit.com" className="hidden md:block text-sm font-bold border-b border-black pb-0.5 hover:border-transparent transition-all duration-500 text-black">
          Let's Talk
        </a>

        {/* Mobile Menu Trigger */}
        <button className="md:hidden space-y-1.5 group">
            <div className="w-6 h-0.5 bg-black transition-colors"></div>
            <div className="w-6 h-0.5 bg-black group-hover:w-4 ml-auto transition-all"></div>
        </button>

      </div>
    </nav>
  );
};
