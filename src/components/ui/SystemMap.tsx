import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCommand, FiX } from 'react-icons/fi';

const nodes = [
  { id: 'about', label: 'WHO I AM', x: 0, y: -200, icon: 'USER' },
  { id: 'howithink', label: 'THINKING', x: -150, y: -100, icon: 'MIND' },
  { id: 'stack', label: 'TOOLS', x: 150, y: -100, icon: 'SYS' },
  { id: 'projects', label: 'WORKSPACE', x: 0, y: 0, icon: 'CODE' },
  { id: 'journey', label: 'JOURNEY', x: 200, y: 100, icon: 'PATH' },
  { id: 'beyond', label: 'BEYOND', x: 0, y: 200, icon: 'EXP' },
];

export function SystemMap() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-[100] px-6 py-3 glass bg-surface-elevated/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3 hover:border-accent-blue/50 hover:bg-white/5 transition-colors cursor-none group"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="hover"
      >
        <FiCommand className="w-4 h-4 text-accent-blue" />
        <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 group-hover:text-white transition-colors">
          Explore System
        </span>
      </motion.button>

      {/* System Map Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-md flex items-center justify-center overflow-hidden perspective-2000"
          >
            <button 
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center glass rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-none z-10"
              onClick={() => setIsOpen(false)}
              data-cursor="hover"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="absolute top-8 left-8">
              <span className="text-[10px] font-mono text-accent-blue tracking-widest uppercase flex items-center gap-4">
                <span className="w-8 h-[1px] bg-accent-blue/50" />
                SYSTEM MAP
              </span>
            </div>

            <motion.div 
              className="relative w-full h-full max-w-4xl max-h-[800px] preserve-3d will-change-transform"
              initial={{ rotateX: 60, scale: 0.5, y: 200 }}
              animate={{ rotateX: 20, scale: 1, y: 0 }}
              exit={{ rotateX: 60, scale: 0.5, y: 200, opacity: 0 }}
              transition={{ duration: 0.8, type: "tween", ease: "easeOut" }}
            >
              
              {/* Background Grid for Map */}
              <div className="absolute inset-[-50%] bg-grid opacity-20" style={{ transform: 'translateZ(-100px)' }} />

              {/* Center Connection Point */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-accent-blue/20 rounded-full" />

              {/* Nodes */}
              {nodes.map((node) => (
                <motion.button
                  key={node.id}
                  className="absolute left-1/2 top-1/2 flex flex-col items-center gap-4 cursor-none group"
                  style={{ 
                    x: `calc(-50% + ${node.x}px)`, 
                    y: `calc(-50% + ${node.y}px)` 
                  }}
                  onClick={() => handleNavigate(node.id)}
                  whileHover={{ scale: 1.1, z: 50 }}
                  data-cursor="hover"
                >
                  <div className="w-16 h-16 rounded-full glass border border-white/10 group-hover:border-accent-blue/50 group-hover:bg-accent-blue/10 flex items-center justify-center transition-colors shadow-2xl relative">
                    <div className="absolute inset-0 bg-accent-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                    <span className="text-xs font-mono text-white/50 group-hover:text-white relative z-10">{node.icon}</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 group-hover:text-accent-blue transition-colors bg-background/50 px-2 py-1 rounded backdrop-blur-md border border-transparent group-hover:border-accent-blue/20">
                    {node.label}
                  </span>
                </motion.button>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateZ(-50px)' }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="100%" stopColor="rgba(59,130,246,0.3)" />
                  </linearGradient>
                </defs>
                <g stroke="url(#lineGrad)" strokeWidth="1" fill="none">
                  <path d="M 50% calc(50% - 200px) L calc(50% - 150px) calc(50% - 100px)" />
                  <path d="M 50% calc(50% - 200px) L calc(50% + 150px) calc(50% - 100px)" />
                  <path d="M calc(50% - 150px) calc(50% - 100px) L 50% 50%" />
                  <path d="M calc(50% + 150px) calc(50% - 100px) L 50% 50%" />
                  <path d="M 50% 50% L calc(50% - 200px) calc(50% + 100px)" />
                  <path d="M 50% 50% L calc(50% + 200px) calc(50% + 100px)" />
                  <path d="M calc(50% - 200px) calc(50% + 100px) L 50% calc(50% + 200px)" />
                  <path d="M calc(50% + 200px) calc(50% + 100px) L 50% calc(50% + 200px)" />
                </g>
              </svg>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
