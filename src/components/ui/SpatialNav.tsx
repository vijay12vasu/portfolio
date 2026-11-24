import { motion } from 'framer-motion';
import { sectionNavigation } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';

export function SpatialNav() {
  const active = useActiveSection();

  return (
    <nav aria-label="Section navigation" className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-5 mix-blend-difference preserve-3d perspective-1000">
      {sectionNavigation.map((section) => {
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
              aria-current={isActive ? 'location' : undefined}
              className={`text-[9px] font-mono tracking-widest uppercase transition-all duration-700 ease-out cursor-none focus:outline-none focus:ring-1 focus:ring-white/30 rounded px-1 -ml-1 ${
                isActive 
                  ? 'text-white translate-x-1 font-semibold' 
                  : 'text-white/30 hover:text-white/70 hover:translate-x-0.5'
              }`}
              data-cursor="hover"
            >
              {section.number} / {section.label}
            </a>
          </div>
        );
      })}
    </nav>
  );
}
