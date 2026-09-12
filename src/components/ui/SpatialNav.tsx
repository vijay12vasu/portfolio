import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: '00 / SYSTEM' },
  { id: 'about', label: '01 / IDENTITY' },
  { id: 'howithink', label: '02 / MIND' },
  { id: 'stack', label: '03 / TOOLS' },
  { id: 'echo', label: '04 / BUILD' },
  { id: 'projects', label: '05 / WORK' },
  { id: 'journey', label: '06 / JOURNEY' },
  { id: 'beyond', label: '07 / BEYOND' },
  { id: 'contact', label: '08 / CONTACT' },
];

export function SpatialNav() {
  const [active, setActive] = useState('hero');
  
  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust intersection point to upper third for better perceived active state
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            current = section.id;
            break;
          }
        }
      }
      if (current && current !== active) {
        setActive(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [active]);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-5 mix-blend-difference preserve-3d perspective-1000">
      {sections.map((section) => {
        const isActive = active === section.id;
        return (
          <div 
            key={section.id} 
            className="flex items-center gap-3 preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: isActive ? 'translateZ(20px)' : 'translateZ(0px)' }}
          >
            <motion.div 
              className={`w-[1px] transition-all duration-700 ease-out ${
                isActive ? 'h-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'h-3 bg-white/20'
              }`} 
            />
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-[9px] font-mono tracking-widest uppercase transition-all duration-700 ease-out cursor-none focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-1 -ml-1 ${
                isActive 
                  ? 'text-white translate-x-1 font-semibold' 
                  : 'text-white/30 hover:text-white/70 hover:translate-x-0.5'
              }`}
              data-cursor="hover"
            >
              {section.label}
            </a>
          </div>
        );
      })}
    </div>
  );
}
