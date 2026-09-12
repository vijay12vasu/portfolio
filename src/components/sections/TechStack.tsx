import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, useMotionTemplate, useAnimationFrame } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import { useProximity, initGlobalPointer, globalPointerX, globalPointerY } from '../../hooks/useProximity';

// Helper to determine spatial depth for each plane
const getCategoryDepth = (domain: string, isMobile: boolean) => {
  if (isMobile) return 0;
  switch (domain) {
    case 'CORE': return -150;
    case 'DATA': return -50;
    case 'WEB': return 50;
    case 'CURRENTLY LEARNING': return 150;
    default: return 0;
  }
};

const getCategoryColor = (domain: string) => {
  switch (domain) {
    case 'WEB': return '59, 130, 246'; // blue
    case 'CORE': return '139, 92, 246'; // violet
    case 'DATA': return '6, 182, 212'; // cyan
    case 'CURRENTLY LEARNING': return '245, 158, 11'; // amber
    default: return '255, 255, 255';
  }
};

// TechNode Component to handle local proximity
function TechNode({ 
  skill, 
  rgb, 
  isMobile, 
  isHovered, 
  isFaded, 
  onHover, 
  onLeave 
}: { 
  skill: any, 
  rgb: string, 
  isMobile: boolean, 
  isHovered: boolean, 
  isFaded: boolean,
  onHover: () => void,
  onLeave: () => void
}) {
  const nodeRef = useRef<HTMLButtonElement>(null);
  const proximity = useProximity(nodeRef, 140); // 140px interaction radius for small dense nodes
  
  const proximityOpacity = useTransform(proximity, [0, 1], [0, 1]);
  const proximityBgAlpha = useTransform(proximity, [0, 1], [0.5, 0.7]);
  
  const lightProximity = useProximity(nodeRef, 400); // Wider radius for the torch light
  const proximityGlow = useTransform(lightProximity, [0, 1], [0, 0.8]); // Smooth falloff over distance
  
  // Smoothly blend states using soft springs
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const isHoveredMV = useSpring(isHovered ? 1 : 0, springConfig);
  const isFadedMV = useSpring(isFaded ? 1 : 0, springConfig);

  // Mathematically continuous Z interpolation to eliminate edge-snapping jitter
  const activeZ = useTransform(
    [proximity, isHoveredMV, isFadedMV],
    ([prox, hov, fad]) => {
      if (isMobile) return 0;
      const p = prox as number;
      const h = hov as number;
      const f = fad as number;
      const baseZ = p * 20;
      // Active moves forward (40), Faded moves back (-10). 
      // Weighted average eliminates jumps when hovering adjacent nodes.
      return h * 40 + f * -10 + Math.max(0, 1 - h - f) * baseZ;
    }
  );

  const activeOpacity = useTransform(
    [isHoveredMV, isFadedMV],
    ([hov, fad]) => {
      if (isMobile) return 1;
      const h = hov as number;
      const f = fad as number;
      return h * 1 + f * 0.4 + Math.max(0, 1 - h - f) * 1;
    }
  );

  const bgOpacity = useTransform(
    [proximityBgAlpha, isHoveredMV, isFadedMV],
    ([proxAlpha, hov, fad]) => {
      if (isMobile) return 0.5;
      const h = hov as number;
      const f = fad as number;
      const p = proxAlpha as number;
      return h * 0.95 + f * 0.4 + Math.max(0, 1 - h - f) * p;
    }
  );
  
  const activeBg = useMotionTemplate`rgba(10,10,15,${bgOpacity})`;

  // Smooth shadow and border values
  const shadowY = useTransform(isHoveredMV, [0, 1], [10, 20]);
  const shadowBlur = useTransform(isHoveredMV, [0, 1], [20, 40]);
  const shadowAlpha1 = useTransform(isHoveredMV, [0, 1], [0.4, 0.8]);
  const shadowAlpha2 = useTransform(isHoveredMV, [0, 1], [0, 0.15]);
  const activeBoxShadow = useMotionTemplate`0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha1}), 0 0 20px rgba(${rgb}, ${shadowAlpha2})`;
  const borderColorOpacity = useTransform(isHoveredMV, [0, 1], [0.05, 0.4]);
  const activeBorderColor = useMotionTemplate`rgba(${isHovered ? rgb : '255,255,255'}, ${borderColorOpacity})`;

  // The node itself catches light based on cursor distance. No moving flashlight needed.

  return (
    <motion.button
      ref={nodeRef}
      key={skill.name}
      tabIndex={0}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="relative cursor-none focus:outline-none group/node block"
      data-cursor={isMobile ? "default" : "hover"}
      style={{ z: activeZ }}
    >
      <motion.div
        style={{ 
          opacity: activeOpacity,
          borderColor: activeBorderColor,
          backgroundColor: activeBg,
          boxShadow: activeBoxShadow
        }}
        className="relative px-6 py-4 rounded-none preserve-3d text-left pointer-events-none border ring-0 group-focus/node:ring-1 group-focus/node:ring-white/30 w-full h-full transition-colors duration-150"
      >
        {/* Micro architectural edge lighting */}
        {!isMobile && (
          <>
            <motion.div 
              className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent to-transparent" 
              style={{ 
                backgroundImage: `linear-gradient(to right, transparent, rgba(${rgb},0.4), transparent)`,
                opacity: isHovered ? 1 : proximityOpacity 
              }} 
            />
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20" />
            <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/20" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20" />
          </>
        )}

        {/* Node-centered localized light field */}
        {!isMobile && (
          <motion.div 
            className="absolute inset-[-50%] pointer-events-none mix-blend-screen blur-[20px] rounded-full" 
            style={{ 
              background: `radial-gradient(circle at center, rgba(${rgb}, 0.4), transparent 70%)`,
              opacity: proximityGlow,
              transform: 'translateZ(0px)'
            }}
          />
        )}
        
        <span className={`relative z-10 text-lg md:text-xl font-display tracking-wide transition-colors duration-150 ${isHovered ? 'text-white font-semibold' : 'text-white/70 font-normal'}`}>
          {skill.name}
        </span>
        
        {/* Status indicator */}
        {(skill.status === 'LEARNING' || skill.status === 'EXPLORING') && (
          <div className={`absolute top-2 right-2 w-1.5 h-1.5 bg-[#f59e0b] transition-all duration-150 ${isHovered ? 'opacity-100 shadow-[0_0_5px_rgba(245,158,11,0.5)]' : 'opacity-40'}`} title={skill.status} />
        )}
        {(skill.status === 'WORKING WITH' || skill.status === 'BUILDING WITH') && (
          <div className={`absolute top-2 right-2 w-1.5 h-1.5 bg-[#06b6d4] transition-all duration-150 ${isHovered ? 'opacity-100 shadow-[0_0_5px_rgba(6,182,212,0.5)]' : 'opacity-20'}`} title={skill.status} />
        )}
      </motion.div>
    </motion.button>
  );
}

function CategoryPlane({
  category,
  index,
  isMobile,
  hoveredCategory,
  hoveredSkill,
  setHoveredCategory,
  setHoveredSkill,
  smoothX,
  smoothY
}: {
  category: any;
  index: number;
  isMobile: boolean;
  hoveredCategory: string | null;
  hoveredSkill: string | null;
  setHoveredCategory: (domain: string | null) => void;
  setHoveredSkill: (name: string | null) => void;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}) {
  const items = category.skills;
  if (!items.length) return null;
  
  const isCategoryHovered = hoveredCategory === category.domain;
  const isOtherCategoryHovered = hoveredCategory !== null && !isCategoryHovered;
  
  // Z-depth controls the physical hierarchy
  const planeZ = getCategoryDepth(category.domain, isMobile);
  const rgb = getCategoryColor(category.domain);
  
  // Parallax is directly tied to the Z-depth (closer objects parallax more)
  // Shift scale: planeZ ranges from -150 to 150. We offset so base is positive, then scale down.
  const parallaxStrengthX = isMobile ? 0 : (planeZ + 300) * 0.08;
  const parallaxStrengthY = isMobile ? 0 : (planeZ + 300) * 0.04;
  
  const xOffset = useTransform(smoothX, [0, 1], [-parallaxStrengthX, parallaxStrengthX]);
  const yOffset = useTransform(smoothY, [0, 1], [-parallaxStrengthY, parallaxStrengthY]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-16 py-16 border-t border-white/[0.02] group preserve-3d"
      style={{ 
        z: planeZ,
        x: xOffset,
        y: yOffset
      }}
      onMouseEnter={() => !isMobile && setHoveredCategory(category.domain)}
      onMouseLeave={() => !isMobile && setHoveredCategory(null)}
    >
      {/* Isolate the hover opacity state from the initial scroll reveal */}
      <motion.div 
        className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-16 preserve-3d"
        animate={{ opacity: isMobile ? 1 : isOtherCategoryHovered ? 0.3 : 1 }}
        transition={{ duration: 0.4 }}
      >
      {/* Category Environmental Glow */}
      {!isMobile && (
        <div 
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(${rgb},0.05),_transparent_60%)] pointer-events-none transition-opacity duration-1000 ${isCategoryHovered ? 'opacity-100' : 'opacity-30'}`}
          style={{ transform: 'translateZ(-10px)' }}
        />
      )}

      {/* Category Label (Left Axis) */}
      <div className="w-full lg:w-[15%] relative preserve-3d">
        <h4 className={`text-[11px] font-mono tracking-widest uppercase transition-colors duration-500 ${
          isCategoryHovered ? 'text-white' : 'text-white/40'
        }`}>
          {category.domain}
        </h4>
        
        {!isMobile && (
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 h-[1px] bg-white/20 transition-all duration-500" style={{ opacity: isCategoryHovered ? 1 : 0.3, width: isCategoryHovered ? '24px' : '16px', backgroundColor: isCategoryHovered ? `rgba(${rgb}, 0.8)` : 'rgba(255,255,255,0.2)' }} />
        )}
      </div>
      
      {/* Skills Interactive Space */}
      <div className="w-full lg:w-[85%] flex flex-wrap items-center gap-4 md:gap-6 preserve-3d relative">
        {items.map((skill: any) => {
          const isHovered = hoveredSkill === skill.name;
          const isFaded = hoveredSkill !== null && !isHovered;
          
          return (
            <TechNode
              key={skill.name}
              skill={skill}
              rgb={rgb}
              isMobile={isMobile}
              isHovered={isHovered}
              isFaded={isFaded}
              onHover={() => setHoveredSkill(skill.name)}
              onLeave={() => setHoveredSkill(null)}
            />
          );
        })}
      </div>
      </motion.div>
    </motion.div>
  );
}

export function TechStack() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  const [isMobile, setIsMobile] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    initGlobalPointer();
    const checkDevice = () => {
      setIsMobile(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
        !window.matchMedia('(pointer: fine)').matches ||
        window.innerWidth < 768
      );
    };
    checkDevice();
    window.addEventListener('resize', checkDevice, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  useAnimationFrame(() => {
    if (isMobile || !containerRef.current) return;
    const px = globalPointerX.current;
    const py = globalPointerY.current;
    if (px === 0 && py === 0) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (px - left) / width));
    const y = Math.max(0, Math.min(1, (py - top) / height));
    mouseX.set(x);
    mouseY.set(y);
  });

  // Subtle parallax springs for the entire environment
  const springConfig = { damping: 50, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const pointerRotateX = useTransform(smoothY, [0, 1], [6, -6]);
  const pointerRotateY = useTransform(smoothX, [0, 1], [-8, 8]);
  
  // Parallax for ambient lighting following pointer
  const lightX = useTransform(smoothX, [0, 1], ['-20%', '20%']);
  const lightY = useTransform(smoothY, [0, 1], ['-20%', '20%']);

  return (
    <section 
      id="stack" 
      ref={containerRef} 
      className="py-32 md:py-48 relative bg-background overflow-hidden perspective-[2500px]"
    >
      {/* 3D Container for entire section */}
      <motion.div 
        className="w-full h-full preserve-3d will-change-transform"
        style={{
          rotateX: isMobile ? 0 : pointerRotateX,
          rotateY: isMobile ? 0 : pointerRotateY,
        }}
      >
        
        {/* Spatial Grid Background & Base Light */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none preserve-3d" style={{ transform: 'translateZ(-300px)' }}>
            <div className="absolute inset-[-50%] bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
            <div className="absolute top-[20%] left-[10%] w-[1px] h-[60%] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute top-[30%] right-[15%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-accent-cyan/10 to-transparent" />
            <div className="absolute top-1/2 left-[10%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            
            {/* Extremely subtle ambient background light reacting to pointer */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] opacity-[0.03] blur-[100px]" 
              style={{ 
                background: 'radial-gradient(ellipse at center, rgba(139,92,246,1), transparent 70%)',
                x: lightX,
                y: lightY
              }} 
            />
            
            {/* Coordinate markers */}
            <div className="absolute top-[20%] left-[10%] -translate-x-full pr-4 text-[8px] font-mono text-white/20 tracking-widest">
              Z:-300 / Y:20
            </div>
            <div className="absolute bottom-[20%] right-[15%] translate-x-full pl-4 text-[8px] font-mono text-white/20 tracking-widest">
              Z:-300 / ENV:READY
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 preserve-3d">
          
          <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 preserve-3d" style={{ transform: isMobile ? 'none' : 'translateZ(100px)' }}>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-accent-blue/30" />
                <h3 className="text-[10px] font-mono text-accent-blue tracking-widest uppercase">
                  02 / TECHNICAL SPACE
                </h3>
              </div>
              <p className="text-4xl md:text-5xl text-white font-bold tracking-tighter max-w-2xl leading-[1.1] font-display">
                The architecture I use to engineer systems.
              </p>
            </div>
          </div>

          {/* Capability Planes */}
          <div className="w-full mx-auto flex flex-col relative preserve-3d">
            
            {/* Vertical Depth Connection Line */}
            {!isMobile && (
              <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" style={{ transform: 'translateZ(-50px)' }} />
            )}

            {skillCategories.map((category, index) => (
              <CategoryPlane 
                key={category.domain}
                category={category}
                index={index}
                isMobile={isMobile}
                hoveredCategory={hoveredCategory}
                hoveredSkill={hoveredSkill}
                setHoveredCategory={setHoveredCategory}
                setHoveredSkill={setHoveredSkill}
                smoothX={smoothX}
                smoothY={smoothY}
              />
            ))}
          </div>
          
        </div>

        {/* Subtle Depth Legend (Bottom Right) */}
        {!isMobile && (
          <div className="absolute bottom-12 right-12 flex flex-col items-end gap-3 pointer-events-none z-20">
            <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase mb-2">Spatial Depth Legend</span>
            
            <div className="flex items-center gap-4 opacity-60">
              <span className="text-[9px] font-mono text-[#f59e0b] tracking-widest uppercase w-20 text-right">LEARNING</span>
              <div className="w-6 h-[1px] bg-[#f59e0b]/50" />
              <span className="text-[9px] font-mono text-white/30 tracking-[0.2em] w-8">Z:150</span>
            </div>
            
            <div className="flex items-center gap-4 opacity-60">
              <span className="text-[9px] font-mono text-[#3b82f6] tracking-widest uppercase w-20 text-right">WEB</span>
              <div className="w-6 h-[1px] bg-[#3b82f6]/50" />
              <span className="text-[9px] font-mono text-white/30 tracking-[0.2em] w-8">Z:50</span>
            </div>
            
            <div className="flex items-center gap-4 opacity-60">
              <span className="text-[9px] font-mono text-[#06b6d4] tracking-widest uppercase w-20 text-right">DATA</span>
              <div className="w-6 h-[1px] bg-[#06b6d4]/50" />
              <span className="text-[9px] font-mono text-white/30 tracking-[0.2em] w-8">Z:-50</span>
            </div>
            
            <div className="flex items-center gap-4 opacity-60">
              <span className="text-[9px] font-mono text-[#8b5cf6] tracking-widest uppercase w-20 text-right">CORE</span>
              <div className="w-6 h-[1px] bg-[#8b5cf6]/50" />
              <span className="text-[9px] font-mono text-white/30 tracking-[0.2em] w-8">Z:-150</span>
            </div>
          </div>
        )}

      </motion.div>
    </section>
  );
}

