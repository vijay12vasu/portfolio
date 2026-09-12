import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'project' | 'inspect';

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Use MotionValues to track mouse position to bypass React re-renders entirely
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Apply a buttery smooth spring directly to the motion values
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Slower trailing spring for the outline
  const trailSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const trailX = useSpring(cursorX, trailSpringConfig);
  const trailY = useSpring(cursorY, trailSpringConfig);

  useEffect(() => {
    // Check for fine pointer (desktop) and reduced motion preference
    const checkCapabilities = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobile(!hasFinePointer || prefersReducedMotion);
    };
    
    checkCapabilities();
    window.addEventListener('resize', checkCapabilities, { passive: true });
    
    return () => window.removeEventListener('resize', checkCapabilities);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const projectCard = target.closest('[data-cursor="project"]');
      const inspectNode = target.closest('[data-cursor="inspect"]');
      const interactiveEl = target.closest('a, button, [data-cursor="hover"]');
      
      if (projectCard) {
        setCursorState('project');
      } else if (inspectNode) {
        setCursorState('inspect');
      } else if (interactiveEl) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Passive listeners for performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isMobile, isVisible, cursorX, cursorY]);

  if (isMobile) return null;

  const variants = {
    default: {
      width: 16,
      height: 16,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'var(--color-primary, #fff)',
      mixBlendMode: 'difference' as const,
      opacity: isVisible ? 1 : 0,
      border: '0px solid transparent'
    },
    hover: {
      width: 48,
      height: 48,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'var(--color-primary, #fff)',
      mixBlendMode: 'difference' as const,
      opacity: isVisible ? 1 : 0,
      border: '0px solid transparent'
    },
    project: {
      width: 80,
      height: 80,
      x: "-50%",
      y: "-50%",
      backgroundColor: '#3b82f6', // accent color
      mixBlendMode: 'normal' as const,
      opacity: isVisible ? 1 : 0,
      border: '0px solid transparent',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
    },
    inspect: {
      width: 80,
      height: 80,
      x: "-50%",
      y: "-50%",
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.5)',
      mixBlendMode: 'normal' as const,
      opacity: isVisible ? 1 : 0,
      boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.2), 0 10px 20px rgba(0,0,0,0.3)',
      backdropFilter: 'blur(4px)'
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-[10px] font-mono font-bold text-white overflow-hidden will-change-transform"
        style={{ left: smoothX, top: smoothY }}
        variants={variants}
        animate={cursorState}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {cursorState === 'project' && (
            <motion.span
              key="project"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              VIEW
            </motion.span>
          )}
          {cursorState === 'inspect' && (
            <motion.span
              key="inspect"
              className="text-accent-blue"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              INSPECT
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Trailing outline for default state only */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9998] will-change-transform"
        style={{ left: trailX, top: trailY }}
        animate={{
          x: "-50%",
          y: "-50%",
          scale: cursorState === 'default' ? 1 : 0,
          opacity: (cursorState === 'default' && isVisible) ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
