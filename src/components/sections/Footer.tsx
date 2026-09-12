import { FiArrowUpRight } from 'react-icons/fi';
import { Magnetic } from '../ui/Magnetic';

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-background relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Still curious. Still building.</span>
          <span className="hidden md:inline text-white/10">/</span>
          <span className="text-lg font-bold tracking-tighter font-display text-white/90">Vijayaragavan R.</span>
        </div>

        <div className="flex items-center gap-6 text-sm font-mono text-text-muted">
          <Magnetic intensity={0.2}>
            <a href="https://github.com/vijay12vasu" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1 hover:text-white transition-colors">
              GitHub <FiArrowUpRight className="opacity-0 -translate-y-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </a>
          </Magnetic>
          <Magnetic intensity={0.2}>
            <a href="https://www.linkedin.com/in/vijay-vasu/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1 hover:text-white transition-colors">
              LinkedIn <FiArrowUpRight className="opacity-0 -translate-y-1 -translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </a>
          </Magnetic>
        </div>

      </div>
      
      {/* Decorative large text */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 text-[10vw] font-black text-white/[0.02] pointer-events-none whitespace-nowrap select-none font-display">
        SOFTWARE ENGINEER
      </div>
    </footer>
  );
}
