import { motion, AnimatePresence, useSpring, useMotionValue, useTransform, MotionValue, useAnimationFrame } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { useProximity, initGlobalPointer, globalPointerX, globalPointerY } from '../../hooks/useProximity';

const layers = [
  { id: 'interface', title: "INTERFACE", desc: "Desktop UI & Interaction", detail: "A lightweight, hardware-accelerated desktop interface. Bypasses the browser to run directly on the host OS for fast access.", status: "IMPLEMENTED", color: "bg-white" },
  { id: 'intelligence', title: "INTELLIGENCE", desc: "Model Inference & Routing", detail: "A routing layer that sends tasks to specialized local models. It breaks down requests into executable actions.", status: "ACTIVELY DEVELOPING", color: "bg-accent-blue" },
  { id: 'memory', title: "MEMORY / CONTEXT", desc: "Task Continuity", detail: "A local vector database storing past interactions and project states. Allows the assistant to resume conversations and track ongoing work.", status: "EXPERIMENTAL", color: "bg-accent-violet" },
  { id: 'execution', title: "EXECUTION", desc: "System Interaction", detail: "The capability layer allowing the model to interact with the local filesystem, terminal, and development tools safely within a strict sandbox.", status: "ACTIVELY DEVELOPING", color: "bg-accent-cyan" },
  { id: 'services', title: "LOCAL SERVICES", desc: "Local Providers", detail: "Integration with local model providers like Ollama, ensuring that all processing stays strictly on-device with zero external data transmission.", status: "IMPLEMENTED", color: "bg-white/50" }
];

function EchoLayer({
  layer,
  index,
  isMobile,
  isHovered,
  isSelected,
  isOtherHovered,
  isOtherSelected,
  onHover,
  onLeave,
  onClick,
  assemblyProximity,
  smoothMouseY
}: {
  layer: typeof layers[0],
  index: number,
  isMobile: boolean,
  isHovered: boolean,
  isSelected: boolean,
  isOtherHovered: boolean,
  isOtherSelected: boolean,
  onHover: () => void,
  onLeave: () => void,
  onClick: () => void,
  assemblyProximity: MotionValue<number>,
  smoothMouseY: MotionValue<number>
}) {
  const layerRef = useRef<HTMLButtonElement>(null);
  const proximity = useProximity(layerRef, 250); // 250px radius for local layer awareness

  // Pure Z-stacking architecture
  const spacing = useTransform(assemblyProximity, [0, 1], [110, 130]);
  const zBase = useTransform(spacing, s => (4 - index) * s);
  const yBase = (index - 2) * (isMobile ? 110 : 65); 
  
  const localProximityZ = useTransform(proximity, [0, 1], [0, 20]);
  
  // Convert discrete states to motion values / springs to avoid stale closures in useTransform
  const stateOffsetZ = useSpring(0, { stiffness: 50, damping: 20 });
  const isMobileMV = useMotionValue(isMobile ? 1 : 0);
  const isSelectedMV = useMotionValue(isSelected ? 1 : 0);
  const isHoveredMV = useMotionValue(isHovered ? 1 : 0);

  useEffect(() => {
    isMobileMV.set(isMobile ? 1 : 0);
    isSelectedMV.set(isSelected ? 1 : 0);
    isHoveredMV.set(isHovered ? 1 : 0);
  }, [isMobile, isSelected, isHovered, isMobileMV, isSelectedMV, isHoveredMV]);

  useEffect(() => {
    if (isSelected) stateOffsetZ.set(300);
    else if (isOtherSelected) stateOffsetZ.set(-100);
    else if (isHovered) stateOffsetZ.set(40);
    else if (isOtherHovered) stateOffsetZ.set(-10);
    else stateOffsetZ.set(0);
  }, [isSelected, isOtherSelected, isHovered, isOtherHovered, stateOffsetZ]);
  
  // Combine all physical depth logic into a single continuous Z value perfectly synced at 60fps
  const zFinal = useTransform(
    [zBase, localProximityZ, stateOffsetZ, isMobileMV, isSelectedMV],
    ([base, local, offset, mob, sel]) => {
      if (mob === 1) return 0;
      if (sel === 1) return offset; // Fixed 300px on select
      return (base as number) + (local as number) + (offset as number);
    }
  );

  const yFinal = isMobile ? yBase : isSelected ? 0 : yBase;
  const opacityFinal = isSelected ? 1 : isOtherSelected ? 0.02 : isOtherHovered ? 0.3 : 1;
  const bgOpacity = isSelected ? 0.95 : Math.max(0.4, 0.85 - (index * 0.12));
  const blurAmount = isSelected ? 24 : 12;

  // Spatial edge lighting based on physical orientation and proximity
  const topEdgeOrientation = useTransform(smoothMouseY, [0, 0.5, 1], [1, 0.3, 0]);
  const bottomEdgeOrientation = useTransform(smoothMouseY, [0, 0.5, 1], [0, 0.3, 1]);
  
  // Safely blend orientation with proximity using motion values
  const topGlowFinal = useTransform(
    [topEdgeOrientation, proximity, isHoveredMV],
    ([orient, prox, hov]) => hov === 1 ? 1 : Math.max(orient as number * 0.4, prox as number)
  );
  
  const bottomGlowFinal = useTransform(
    [bottomEdgeOrientation, proximity, isHoveredMV],
    ([orient, prox, hov]) => hov === 1 ? 1 : Math.max(orient as number * 0.4, prox as number)
  );

  return (
    <motion.button
      ref={layerRef}
      key={layer.title}
      className={`absolute w-full max-w-[420px] p-5 lg:p-6 rounded-none flex flex-col justify-center transition-colors duration-150 will-change-transform cursor-none overflow-visible group focus:outline-none focus:ring-1 focus:ring-accent-cyan/50 text-left ${
        isSelected ? 'border border-accent-cyan/30 shadow-[0_40px_80px_rgba(0,0,0,0.9)]' : 
        isHovered ? 'border border-accent-cyan/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-[#0a0a10]' : 'border border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.6)] bg-[#050508] hover:border-white/15'
      }`}
      animate={{ 
        y: yFinal,
        opacity: opacityFinal,
      }}
      transition={{ 
        type: "spring", stiffness: 50, damping: 20,
        opacity: { duration: 0.15 } 
      }}
      style={{ 
        z: zFinal,
        transformOrigin: "center center",
        backdropFilter: `blur(${blurAmount}px)`,
        backgroundColor: `rgba(5, 5, 8, ${bgOpacity})`
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onClick}
      data-cursor={isSelected ? "default" : "inspect"}
    >
      {/* Soft depth shadow underneath the layer */}
      {!isMobile && !isSelected && (
        <div className="absolute inset-0 bg-black/60 translate-y-8 blur-xl -z-10 pointer-events-none transition-opacity duration-150" style={{ opacity: isHovered ? 0.4 : 0.8, transform: 'translateZ(-40px)' }} />
      )}

      {/* Proximity Edge Lighting (Local Layer Illumination) */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[1px]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, transparent, rgba(6,182,212,0.4), transparent)',
          opacity: topGlowFinal 
        }} 
      />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)',
          opacity: bottomGlowFinal 
        }} 
      />
      
      {/* Micro Architectural Brackets */}
      <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20" />
      <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/20" />
      <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/20" />
      <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20" />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className={`text-[9px] font-mono tracking-widest uppercase transition-colors ${isHovered ? 'text-accent-cyan' : 'text-white/30'}`}>L_{String(index + 1).padStart(2, '0')}</span>
            <span className={`w-4 h-[1px] transition-colors ${isHovered ? 'bg-accent-cyan/50' : 'bg-white/10'}`} />
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${
              layer.status === 'IMPLEMENTED' ? 'bg-[#4ade80] shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 
              layer.status === 'ACTIVELY DEVELOPING' ? 'bg-[#f59e0b] shadow-[0_0_5px_rgba(245,158,11,0.5)]' : 
              'bg-[#3b82f6] shadow-[0_0_5px_rgba(59,130,246,0.5)]'
            }`} />
            <span className="text-[8px] font-mono text-white/40 tracking-widest uppercase">{layer.status}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className={`text-xl font-semibold tracking-tight transition-colors ${isHovered ? 'text-white' : 'text-white/90'}`}>
            {layer.title}
          </h4>
          <p className={`text-[12px] font-light tracking-wide transition-colors ${isHovered ? 'text-white/70' : 'text-white/40'}`}>
            {layer.desc}
          </p>
        </div>
      </div>
      
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 pt-6 mt-6 border-t border-accent-cyan/10"
          >
            <p className="text-[13px] text-white/80 font-light leading-relaxed">
              {layer.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.button>
  );
}

export function EchoShowcase() {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<typeof layers[0] | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Assembly proximity captures presence anywhere in the section
  const assemblyRef = useRef<HTMLDivElement>(null);
  const assemblyProximity = useProximity(assemblyRef, 800); 

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Smooth spring for global physics
  const springConfig = { damping: 40, stiffness: 120, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Deep structural parallax around an isometric base angle
  const pointerRotateX = useTransform(smoothMouseY, [0, 1], [15, 5]); 
  const pointerRotateY = useTransform(smoothMouseX, [0, 1], [-25, -15]);

  useEffect(() => {
    initGlobalPointer();
    const checkPointer = () => {
      setIsMobile(window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1024);
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

  return (
    <section id="echo" ref={containerRef} className="py-24 md:py-40 relative bg-background overflow-hidden border-t border-white/[0.02] perspective-[3000px]">
      
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000" style={{ opacity: selectedLayer ? 0.05 : 1 }}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_100px_#030305]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:h-[800px] preserve-3d">
        
        {/* Story */}
        <div className={`w-full lg:w-[35%] flex flex-col z-20 transition-all duration-700 ${selectedLayer ? 'opacity-10 blur-sm scale-95' : 'opacity-100'}`}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-[1px] bg-accent-blue/30" />
              <span className="text-[10px] font-mono text-accent-blue tracking-widest uppercase">03 / SYSTEM ARCHITECTURE</span>
            </div>
            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4 font-display">ECHO</h2>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">PRIVATE AI SYSTEM</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">EXPERIMENTAL</span>
              </div>
            </div>
            <div className="flex flex-col gap-8 text-[15px] text-white/60 font-light leading-relaxed">
              <p>Echo is a private, locally-hosted experimental AI assistant engineered to run directly on the host OS.</p>
              <p>Designed as a <span className="text-white/90 font-medium">structured spatial pipeline</span>, it routes tasks to specialized models, maintains persistent context, and interacts securely with the system.</p>
            </div>
          </motion.div>
        </div>

        {/* 3D Architectural Assembly */}
        <div className="w-full lg:w-[60%] relative h-[700px] lg:h-full flex flex-col items-center justify-center preserve-3d">
          
          <motion.div 
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center will-change-transform preserve-3d"
            style={{ 
              rotateX: isMobile ? 0 : pointerRotateX, 
              rotateY: isMobile ? 0 : pointerRotateY,
            }}
            animate={{ 
              scale: isMobile ? 1 : selectedLayer ? 0.95 : 1,
              x: isMobile ? '0%' : selectedLayer ? '0%' : '15%',
            }}
            transition={{ type: "spring", stiffness: 40, damping: 20 }}
          >
            {/* Structural Core Lighting */}
            {!isMobile && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent_70%)] opacity-60 blur-3xl preserve-3d pointer-events-none" style={{ transform: 'translateZ(-150px)' }} />
            )}

            {/* Central Pipeline Connection */}
            {!isMobile && (
              <div className="absolute left-1/2 top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-accent-cyan/30 to-transparent preserve-3d pointer-events-none -translate-x-1/2" style={{ transform: 'translateZ(-100px)' }}>
                {/* Tiny connection nodes */}
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan/40 shadow-[0_0_8px_var(--color-accent-cyan)]" style={{ top: `${20 + i * 15}%` }} />
                ))}
              </div>
            )}

            <div ref={assemblyRef} className="relative w-full h-full flex flex-col items-center justify-center preserve-3d">
              {layers.map((layer, index) => {
                const isHovered = hoveredLayer === layer.id;
                const isSelected = selectedLayer?.id === layer.id;
                const isOtherHovered = hoveredLayer !== null && !isHovered;
                const isOtherSelected = selectedLayer !== null && !isSelected;
                
                return (
                  <EchoLayer
                    key={layer.id}
                    layer={layer}
                    index={index}
                    isMobile={isMobile}
                    isHovered={isHovered}
                    isSelected={isSelected}
                    isOtherHovered={isOtherHovered}
                    isOtherSelected={isOtherSelected}
                    onHover={() => setHoveredLayer(layer.id)}
                    onLeave={() => setHoveredLayer(null)}
                    onClick={() => setSelectedLayer(isSelected ? null : layer)}
                    assemblyProximity={assemblyProximity}
                    smoothMouseY={smoothMouseY}
                  />
                );
              })}
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Detail View Close Overlay */}
      <AnimatePresence>
        {selectedLayer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-background/80 backdrop-blur-md cursor-none"
            onClick={() => setSelectedLayer(null)}
            data-cursor="hover"
          >
            <button className="absolute top-8 right-8 md:top-12 md:right-12 w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-white/30 rounded-full">
              <FiX size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
    </section>
  );
}
