import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useProximity } from '../../hooks/useProximity';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TiltCard({ children, className = "", onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const proximity = useProximity(ref, 150);

  // Motion values for precise cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 30, stiffness: 200, mass: 0.5 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 30, stiffness: 200, mass: 0.5 });

  // Glossy glare effect tracking the cursor
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [100, -100]), { damping: 30, stiffness: 200 });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [100, -100]), { damping: 30, stiffness: 200 });
  const glareOpacity = useSpring(isHovered ? 0.15 : 0, { damping: 30, stiffness: 200 });

  // Proximity Z-lift
  const proximityZ = useTransform(proximity, [0, 1], [0, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate normalized coordinates (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative preserve-3d will-change-transform ${onClick ? 'focus:outline-none focus:ring-2 focus:ring-white/50 text-left w-full' : ''} ${className}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        z: isHovered ? 20 : proximityZ
      }}
    >
      {/* Glossy Glare Overlay */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay rounded-inherit overflow-hidden"
        style={{ opacity: glareOpacity }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white to-transparent blur-md"
          style={{
            x: glareX,
            y: glareY,
          }}
        />
      </motion.div>
      
      {/* Content wrapper with backface culling to ensure smooth 3D text */}
      <div className="w-full h-full backface-hidden preserve-3d" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
