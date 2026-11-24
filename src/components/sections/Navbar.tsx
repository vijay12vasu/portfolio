import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { primaryNavigation, sectionNavigation } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const focusFrame = window.requestAnimationFrame(() => {
      mobileNavRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !mobileNavRef.current) return;
      const links = Array.from(mobileNavRef.current.querySelectorAll<HTMLElement>('a[href]'));
      if (links.length === 0) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 50);
    };

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  return (
    <>
      <motion.nav 
        aria-label="Primary navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-500 ease-out ${
          scrolled 
            ? 'py-4 bg-[#030305]/80 backdrop-blur-md border-b border-white/[0.02]' 
            : 'py-8 bg-transparent border-b border-transparent'
        }`}
      >
        <a 
          href="#hero" 
          aria-label="Home"
          className="text-lg font-medium tracking-wide text-white hover:text-white/80 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
        >
          VR
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {primaryNavigation.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`relative text-[11px] font-mono uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          ref={menuButtonRef}
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          className="md:hidden text-white z-50 p-2 opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="space-y-1.5 w-5">
            <motion.div 
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 7 : 0 }} 
              className="w-full h-[1px] bg-white"
            />
            <motion.div 
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }} 
              className="w-full h-[1px] bg-white"
            />
            <motion.div 
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -7 : 0 }} 
              className="w-full h-[1px] bg-white"
            />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileNavRef}
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 overflow-y-auto bg-[#030305]/95 px-6 py-20 backdrop-blur-xl sm:gap-6"
          >
            {sectionNavigation.map((item, idx) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={activeSection === item.id ? 'location' : undefined}
                className="rounded px-3 py-1 text-sm font-mono uppercase tracking-[0.17em] text-white/55 transition-colors hover:text-white focus-visible:text-white sm:text-base"
              >
                <span className="mr-3 text-[10px] text-accent-cyan/70">{item.number}</span>{item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
