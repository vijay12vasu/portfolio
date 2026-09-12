import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { profile } from '../../data/profile';
import { Magnetic } from '../ui/Magnetic';
import { HeroCanvas } from '../ui/HeroCanvas';
import { initGlobalPointer, globalPointerX, globalPointerY } from '../../hooks/useProximity';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  const z1 = useTransform(smoothProgress, [0, 1], [0, -500]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);
  const scrollRotateX = useTransform(smoothProgress, [0, 1], [0, 15]);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 40, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const pointerRotateX = useTransform(smoothMouseY, [0, 1], [2, -2]);
  const pointerRotateY = useTransform(smoothMouseX, [0, 1], [-2, 2]);
  const rotateZ = useTransform(smoothMouseX, [0, 1], [0.5, -0.5]);

  const glowX = useTransform(smoothMouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(smoothMouseY, [0, 1], ["0%", "100%"]);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    initGlobalPointer();
    const checkPointer = () => {
      setIsMobile(window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches);
    };
    checkPointer();
    window.addEventListener('resize', checkPointer, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkPointer);
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

  // Staggered text variants
  const nameVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8, filter: "blur(15px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        type: "spring" as const, 
        damping: 15, 
        stiffness: 120 
      } 
    }
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-2000 bg-background">
      
      {/* 3D WebGL Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ opacity, z: z1 }}
      >
        <HeroCanvas />
      </motion.div>

      <motion.div 
        className="absolute inset-0 w-full h-full preserve-3d will-change-transform"
        style={{ 
          z: z1, 
          opacity,
          rotateX: isMobile ? scrollRotateX : pointerRotateX, 
          rotateY: isMobile ? 0 : pointerRotateY,
          rotateZ: isMobile ? 0 : rotateZ
        }}
      >
        {/* Distant Grid / Atmosphere Layer */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-accent-blue/10 via-transparent to-transparent opacity-50" 
          style={{ transform: 'translateZ(-1000px)' }} 
        />
        
        {/* Midground Architectural Frame */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none preserve-3d" style={{ transform: 'translateZ(-400px)' }}>
            <div className="w-[80vw] h-[80vh] border border-white/5 rounded-3xl relative flex items-center justify-center">
              <div className="absolute top-1/4 -left-4 w-8 h-[1px] bg-white/10" />
              <div className="absolute bottom-1/4 -right-4 w-8 h-[1px] bg-white/10" />
              <div className="absolute left-1/4 -top-4 w-[1px] h-8 bg-white/10" />
              <div className="absolute right-1/4 -bottom-4 w-[1px] h-8 bg-white/10" />
              {/* Inner subtle grid reference */}
              <div className="w-[40vw] h-[40vh] border border-white/5 rounded-full border-dashed opacity-50" style={{ transform: 'translateZ(100px)' }} />
            </div>
          </div>
        )}
        
        {/* Primary Identity Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 preserve-3d" style={{ transform: 'translateZ(100px)' }}>
          <div className="flex flex-col items-center gap-8">
            
            <motion.h1 
              variants={nameVariants}
              initial="hidden"
              animate="visible"
              className="text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[5.5rem] font-medium tracking-tight leading-[1.1] text-center flex flex-wrap justify-center overflow-hidden font-hero px-4"
            >
              {profile.name.split('').map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={charVariants} 
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center gap-12 mt-4"
            >
              <h2 className="text-lg md:text-xl font-medium text-white/80 tracking-[0.2em] uppercase font-display drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {profile.role}
              </h2>
              
              <p className="max-w-md text-center text-sm md:text-base text-white/60 font-light leading-relaxed mt-2 mb-2">
                I build robust software and explore the intersection of AI and local computing. My work focuses on turning curiosity into functional systems.
              </p>

              <Magnetic intensity={0.4}>
                <a 
                  href="#howithink" 
                  data-cursor="hover"
                  className="group relative inline-flex items-center justify-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-500 bg-white/5 px-8 py-4 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md"
                >
                  <span>Explore Architecture</span>
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        {/* Foreground Depth Layer (Lighting Effect) */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none preserve-3d z-50" style={{ transform: 'translateZ(300px)' }}>
            <motion.div 
              className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--color-accent-cyan),_transparent)] opacity-[0.08] rounded-full blur-[100px] mix-blend-screen will-change-transform"
              style={{
                left: glowX,
                top: glowY,
                x: "-50%",
                y: "-50%"
              }}
            />
          </div>
        )}
        
      </motion.div>
    </section>
  );
}
