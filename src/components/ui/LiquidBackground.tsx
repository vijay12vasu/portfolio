import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function LiquidBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mousePosition.x, springConfig);
  const smoothY = useSpring(mousePosition.y, springConfig);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
      {/* 
        This is the dynamic cursor flashlight.
        It uses mix-blend-mode to blend with the background color organically. 
      */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full mix-blend-screen opacity-30 blur-[80px] md:blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.05) 50%, rgba(0,0,0,0) 80%)",
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Static ambient orbs for that liquid layout feel */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-accent-magenta/20 rounded-full blur-[160px] mix-blend-screen opacity-20 animate-pulse" style={{ animationDuration: '15s' }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-accent-cyan/20 rounded-full blur-[140px] mix-blend-screen opacity-15 animate-pulse" style={{ animationDuration: '20s' }} />
      <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-accent-blue/10 rounded-full blur-[120px] mix-blend-screen opacity-15 animate-pulse" style={{ animationDuration: '18s' }} />
    </div>
  );
}
