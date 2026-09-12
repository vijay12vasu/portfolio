import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useTransform, MotionValue, useMotionTemplate, useAnimationFrame } from 'framer-motion';
import { useProximity, initGlobalPointer, globalPointerX, globalPointerY } from '../../hooks/useProximity';

// ═══════════════════════════════════════════════════════════════
// TOPIC DATA
// ═══════════════════════════════════════════════════════════════

const spatialNodes = [
  { 
    id: 'systems', 
    label: 'SYSTEMS', 
    color: 'bg-accent-cyan', 
    colorVar: 'var(--color-accent-cyan)', 
    items: ['Technology', 'How Things Work'], 
    desc: 'I like figuring out how things work behind the scenes, from everyday computers to new software tools.', 
    x: '20%', y: '25%', z: -40,
    shape: 'rounded-none border-t border-l'
  },
  { 
    id: 'strategy', 
    label: 'STRATEGY', 
    color: 'bg-accent-blue', 
    colorVar: 'var(--color-accent-blue)', 
    items: ['Chess', 'Problem Solving'], 
    desc: 'I enjoy games and puzzles that require pattern recognition and thinking a few steps ahead.', 
    x: '50%', y: '12%', z: -20,
    shape: 'rounded-sm rotate-45'
  },
  { 
    id: 'human-thinking', 
    label: 'HUMAN\nTHINKING', 
    color: 'bg-accent-violet', 
    colorVar: 'var(--color-accent-violet)', 
    items: ['Psychology', 'Philosophy'], 
    desc: 'I am curious about why people make certain decisions and how we form our understanding of the world.', 
    x: '80%', y: '25%', z: 30,
    shape: 'rounded-[2rem]'
  },
  { 
    id: 'space-science', 
    label: 'SPACE &\nSCIENCE', 
    color: 'bg-accent-magenta', 
    colorVar: 'var(--color-accent-magenta)', 
    items: ['Documentaries', 'Physics'], 
    desc: 'I spend a lot of time reading and watching documentaries to learn about how the universe operates.', 
    x: '85%', y: '50%', z: -60,
    shape: 'rounded-full'
  },
  { 
    id: 'creativity', 
    label: 'CREATIVITY', 
    color: 'bg-accent-magenta', 
    colorVar: 'var(--color-accent-magenta)', 
    items: ['Drawing & Art', 'Writing'], 
    desc: 'I like sketching and making things visually when I want a break from the screen.', 
    x: '75%', y: '80%', z: 10,
    shape: 'rounded-[40%_60%_70%_30%]'
  },
  { 
    id: 'discovery', 
    label: 'DISCOVERY', 
    color: 'bg-accent-blue', 
    colorVar: 'var(--color-accent-blue)', 
    items: ['Mystery & Detective', 'Exploring New Places'], 
    desc: 'I really enjoy detective stories, riddles, and figuring out how hidden facts connect.', 
    x: '50%', y: '88%', z: 40,
    shape: 'rounded-sm border-dashed'
  },
  { 
    id: 'experimentation', 
    label: 'EXPERIMENTATION', 
    color: 'bg-accent-cyan', 
    colorVar: 'var(--color-accent-cyan)', 
    items: ['Building Things', 'Trying New Activities'], 
    desc: 'Testing out new ideas and building small side projects just for fun.', 
    x: '25%', y: '80%', z: -10,
    shape: 'rounded-sm border-double border-4'
  },
  { 
    id: 'unusual-skills', 
    label: 'UNUSUAL\nSKILLS', 
    color: 'bg-accent-violet', 
    colorVar: 'var(--color-accent-violet)', 
    items: ['Practical Skills', 'Mentalism & Magic'], 
    desc: 'Learning how to build or fix things in the real world instead of just in software.', 
    x: '15%', y: '50%', z: 20,
    shape: 'rounded-xl skew-x-[-8deg]'
  }
];

// ═══════════════════════════════════════════════════════════════
// LAYER A: VISUAL COMPONENTS — pointer-events: none
//
// These render the visible constellation. They have all 3D
// effects (parallax, translateZ, blur, opacity, scale, glow)
// but NEVER control interaction or content display.
// ═══════════════════════════════════════════════════════════════

function VisualCuriosityCore({ isActive: _isActive, isFaded }: { isActive: boolean; isFaded: boolean }) {
  const coreRef = useRef<HTMLDivElement>(null);
  const proximity = useProximity(coreRef, 400);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const isFadedMV = useSpring(isFaded ? 1 : 0, springConfig);

  const coreScale = useTransform(proximity, [0, 1], [1, 1.2]);
  const ringScale = useTransform(proximity, [0, 1], [1, 0.9]);
  const rawGlow = useTransform(proximity, [0, 1], [0.3, 1]);
  const textOpacity = useTransform(proximity, [0, 1], [0.3, 0.8]);
  
  // Reduce glow when another topic is active (faded state)
  const coreGlow = useTransform(
    [rawGlow, isFadedMV],
    ([g, f]) => (g as number) * (1 - (f as number) * 0.5)
  );
  
  // The core itself glows based on cursor proximity

  return (
    <div 
      ref={coreRef}
      className="absolute top-[50%] left-[50%] flex flex-col items-center justify-center z-[15] pointer-events-none preserve-3d" 
      style={{ transform: 'translate(-50%, -50%) translateZ(10px)' }}
    >
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Node-centered localized light field */}
        <motion.div 
          className="absolute inset-[-50%] pointer-events-none mix-blend-screen blur-[20px] rounded-full" 
          style={{ 
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.4), transparent 70%)',
            opacity: coreGlow,
            transform: 'translateZ(0px)'
          }}
        />
        
        <motion.div 
          className="absolute w-12 h-12 rounded-full border border-white/20 animate-[spin_10s_linear_infinite]" 
          style={{ borderStyle: 'dashed', scale: ringScale, opacity: coreGlow }} 
        />
        <motion.div 
          className="absolute w-8 h-8 rounded-full border border-white/10" 
          style={{ scale: coreScale, opacity: coreGlow }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]" 
          style={{ scale: coreScale, opacity: coreGlow }}
        />
      </div>
      <motion.span 
        className="mt-2 text-[9px] font-mono tracking-[0.4em] text-white/30 backdrop-blur-sm px-2 absolute top-full"
        style={{ opacity: textOpacity }}
      >
        CURIOSITY_CORE
      </motion.span>
    </div>
  );
}

function VisualNode({ 
  node, i, isActive, isFaded, globalMouseX, globalMouseY
}: { 
  node: typeof spatialNodes[0]; 
  i: number;
  isActive: boolean;
  isFaded: boolean;
  globalMouseX: MotionValue<number>;
  globalMouseY: MotionValue<number>;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const proximity = useProximity(nodeRef, 180);
  
  // Parallax — must match the hit target's parallax exactly
  const parallaxFactorX = node.z * 0.15;
  const parallaxFactorY = node.z * 0.15;
  const parallaxX = useTransform(globalMouseX, [0, 1], [-parallaxFactorX, parallaxFactorX]);
  const parallaxY = useTransform(globalMouseY, [0, 1], [-parallaxFactorY, parallaxFactorY]);
  const combinedTransform = useMotionTemplate`translate(-50%, -50%) translate3d(${parallaxX}px, ${parallaxY}px, ${node.z}px)`;

  // Smooth springs for visual transitions
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const isActiveMV = useSpring(isActive ? 1 : 0, springConfig);
  const isFadedMV = useSpring(isFaded ? 1 : 0, springConfig);

  // Z pop on hover
  const activeZOffset = useTransform(
    [proximity, isActiveMV, isFadedMV],
    ([prox, act, fad]) => {
      const p = prox as number, a = act as number, f = fad as number;
      return a * 60 + f * -10 + Math.max(0, 1 - a - f) * (p * 20);
    }
  );

  const baseScale = node.z < 0 ? 0.95 : node.z > 0 ? 1.05 : 1;
  const activeScale = useTransform(
    [proximity, isActiveMV],
    ([prox, act]) => {
      const a = act as number, p = prox as number;
      return a * (baseScale + 0.1) + (1 - a) * (baseScale + p * 0.05);
    }
  );

  // Depth changes emphasis, not existence.
  // We remove the hard 2px blur that made text illegible, and raise the opacity floor
  // so it multiplies reasonably with the 10% border and 70% text opacities.
  const baseBlur = node.z < -30 ? 0 : 0; 
  const activeBlur = useTransform(
    [isActiveMV, isFadedMV],
    ([act, fad]) => {
      const a = act as number, f = fad as number;
      return a * 0 + f * 4 + Math.max(0, 1 - a - f) * baseBlur;
    }
  );
  const blurFilter = useMotionTemplate`blur(${activeBlur}px)`;

  const baseOpacity = node.z < -30 ? 0.85 : 1;
  const activeOpacity = useTransform(
    [isActiveMV, isFadedMV],
    ([act, fad]) => {
      const a = act as number, f = fad as number;
      return a * 1 + f * 0.15 + Math.max(0, 1 - a - f) * baseOpacity;
    }
  );

  const proximityAura = useTransform(proximity, [0, 1], [0, 0.2]);
  const auraOpacity = useTransform(
    [isActiveMV, proximityAura],
    ([act, proxAura]) => {
      const a = act as number, p = proxAura as number;
      return a * 0.4 + (1 - a) * p;
    }
  );
  const auraScale = useTransform(isActiveMV, [0, 1], [1, 1.5]);

  const lightProximity = useProximity(nodeRef, 400); // Wide light radius
  const lightOpacity = useTransform(lightProximity, [0, 1], [0, 0.8]);

  // The node itself catches light based on cursor distance. No moving flashlight needed.

  return (
    <motion.div
      ref={nodeRef}
      className="absolute pointer-events-none flex items-center justify-center preserve-3d"
      style={{ left: node.x, top: node.y, transform: combinedTransform }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.1 }}
    >
      {/* Inner div: MotionValues are sole controllers of opacity/scale/blur/z.
          NO initial/whileInView here — those would conflict with the MotionValues
          and leave nodes with baseOpacity < 1 stuck invisible. */}
      <motion.div
        style={{ 
          z: activeZOffset,
          opacity: activeOpacity,
          filter: blurFilter,
          scale: activeScale,
          transformOrigin: "center center"
        }}
        className="relative flex items-center justify-center preserve-3d"
      >
        <motion.div 
          className={`absolute inset-0 ${node.color} blur-[40px] rounded-full`} 
          style={{ opacity: auraOpacity, scale: auraScale }}
        />
        
        {/* Node-centered localized light field */}
        <motion.div 
          className="absolute inset-[-50%] pointer-events-none mix-blend-screen blur-[20px] rounded-full" 
          style={{ 
            background: `radial-gradient(circle at center, color-mix(in srgb, ${node.colorVar} 40%, transparent), transparent 70%)`,
            opacity: lightOpacity,
            transform: 'translateZ(0px)'
          }}
        />
        
        <div className={`
          px-8 py-5 flex items-center justify-center shadow-xl transition-all duration-150 backdrop-blur-md z-10 border
          ${node.shape}
          ${isActive 
            ? 'bg-[#0a0a0f]/90 border-white/30 shadow-[0_0_30px_rgba(0,0,0,0.8)]' 
            : 'bg-[#030305]/40 border-white/10'}
        `}>
          <div className={`
            transition-all duration-150 text-center
            ${node.id === 'strategy' ? '-rotate-45' : ''}
            ${node.id === 'unusual-skills' ? 'skew-x-[8deg]' : ''}
          `}>
            <span className={`
              text-[9px] font-mono uppercase block mb-1 tracking-[0.2em] transition-colors duration-150
              ${isActive ? 'text-white/80 opacity-100' : 'text-white/40 opacity-60'}
            `}>
              ID_{i + 1}
            </span>
            <h4 className={`
              text-sm font-medium tracking-[0.15em] whitespace-pre-line leading-tight transition-colors duration-150
              ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'text-white/70'}
            `}>
              {node.label}
            </h4>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LAYER B: INTERACTION HIT TARGETS — transparent, no visuals
//
// These are invisible buttons that track the same spatial
// position as their visual counterparts. They store refs so
// the popup layer can read getBoundingClientRect().
//
// They NEVER have: opacity, blur, scale, glow, popups,
// overflow:hidden, or any visual depth styling.
// ═══════════════════════════════════════════════════════════════

function NodeHitTarget({
  node,
  globalMouseX,
  globalMouseY,
  onActivate,
  onDeactivate,
  refCallback
}: {
  node: typeof spatialNodes[0];
  globalMouseX: MotionValue<number>;
  globalMouseY: MotionValue<number>;
  onActivate: () => void;
  onDeactivate: () => void;
  refCallback: (el: HTMLButtonElement | null) => void;
}) {
  // Parallax must match VisualNode exactly
  const parallaxFactorX = node.z * 0.15;
  const parallaxFactorY = node.z * 0.15;
  const parallaxX = useTransform(globalMouseX, [0, 1], [-parallaxFactorX, parallaxFactorX]);
  const parallaxY = useTransform(globalMouseY, [0, 1], [-parallaxFactorY, parallaxFactorY]);
  const combinedTransform = useMotionTemplate`translate(-50%, -50%) translate3d(${parallaxX}px, ${parallaxY}px, ${node.z}px)`;
  
  return (
    <motion.button
      ref={refCallback}
      className="absolute w-40 h-16 cursor-none focus:outline-none"
      style={{ 
        left: node.x, 
        top: node.y, 
        transform: combinedTransform,
        background: 'transparent',
        border: 'none',
        pointerEvents: 'auto',
        zIndex: 60
      }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      data-cursor="hover"
      tabIndex={0}
      aria-label={node.label.replace('\n', ' ')}
    />
  );
}

// ═══════════════════════════════════════════════════════════════
// LAYER C: POPUP PRESENTATION — outside 3D tree
//
// Rendered as a flat 2D layer on top of the constellation.
// Reads activeTopicId to determine what to show.
// Reads the hit target's getBoundingClientRect() via
// useAnimationFrame for continuous position tracking.
//
// This layer NEVER inherits 3D transforms, blur, opacity,
// or scale from visual nodes.
// ═══════════════════════════════════════════════════════════════

function PopupLayer({
  activeTopicId,
  hitTargetRefs,
  constellationRef
}: {
  activeTopicId: string | null;
  hitTargetRefs: React.RefObject<Record<string, HTMLButtonElement | null>>;
  constellationRef: React.RefObject<HTMLDivElement | null>;
}) {
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Continuously track hit target position via direct DOM writes (no React re-renders)
  useAnimationFrame(() => {
    if (!activeTopicId || !popupRef.current || !constellationRef.current) return;
    const el = hitTargetRefs.current?.[activeTopicId];
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const containerRect = constellationRef.current.getBoundingClientRect();
    
    const relCenterX = rect.left - containerRect.left + rect.width / 2;
    const relTop = rect.top - containerRect.top;
    const relBottom = relTop + rect.height;
    
    // Use static node percentages for directional layout decisions
    const nodeData = activeTopicId === 'curiosity'
      ? { x: '50%', y: '50%' }
      : spatialNodes.find(n => n.id === activeTopicId);
    if (!nodeData) return;
    
    const yPct = parseFloat(nodeData.y);
    const xPct = parseFloat(nodeData.x);
    const showAbove = yPct >= 50;
    const isRight = xPct > 65;
    const isLeft = xPct < 35;
    
    let translateX: string;
    if (isRight) translateX = '-85%';
    else if (isLeft) translateX = '-15%';
    else translateX = '-50%';
    
    const top = showAbove ? relTop - 20 : relBottom + 20;
    const translateY = showAbove ? '-100%' : '0%';
    
    popupRef.current.style.left = `${relCenterX}px`;
    popupRef.current.style.top = `${top}px`;
    popupRef.current.style.transform = `translateX(${translateX}) translateY(${translateY})`;
    // Reveal after first position calculation to prevent flash at (0,0)
    popupRef.current.style.opacity = '1';
  });
  
  if (!activeTopicId) return null;
  
  // ── Topic data lookup ──
  let label: string;
  let items: string[];
  let desc: string;
  let accentColor: string;
  let xPct: number;
  let yPct: number;
  
  if (activeTopicId === 'curiosity') {
    label = 'CURIOSITY';
    items = [];
    desc = 'The starting point behind my learning and exploration. Questions naturally lead to experiments, systems, understanding, and building.';
    accentColor = 'white';
    xPct = 50;
    yPct = 50;
  } else {
    const node = spatialNodes.find(n => n.id === activeTopicId);
    if (!node) return null;
    label = node.label;
    items = node.items;
    desc = node.desc;
    accentColor = node.color.replace('bg-', '');
    xPct = parseFloat(node.x);
    yPct = parseFloat(node.y);
  }
  
  const showAbove = yPct >= 50;
  const isRight = xPct > 65;
  const isLeft = xPct < 35;
  
  // Asymmetric corner geometry
  const cornerRadius = isRight 
    ? 'rounded-tl-2xl rounded-tr-md rounded-br-3xl rounded-bl-md' 
    : isLeft 
      ? 'rounded-tr-2xl rounded-tl-md rounded-bl-3xl rounded-br-md' 
      : 'rounded-t-xl rounded-b-2xl';
  
  const connectorAlign = isRight ? 'right-10' : isLeft ? 'left-10' : 'left-1/2 -translate-x-1/2';
  
  return (
    <div 
      ref={popupRef}
      className="absolute z-[200] w-80 pointer-events-none"
      style={{ opacity: 0 }} // Hidden until positioned by useAnimationFrame
    >
      <div className="relative w-full flex flex-col">
        {/* Connector Pip/Line */}
        <div className={`absolute ${showAbove ? '-bottom-6' : '-top-6'} ${connectorAlign} flex flex-col items-center justify-center`}>
          {showAbove && <div className={`w-1.5 h-1.5 rounded-full bg-${accentColor}`} />}
          <div className={`w-[1px] h-6 bg-gradient-to-b ${showAbove ? `from-${accentColor}/50 to-transparent` : `from-transparent to-${accentColor}/50`}`} />
          {!showAbove && <div className={`w-1.5 h-1.5 rounded-full bg-${accentColor}`} />}
        </div>
        
        {/* Glass Schematic Panel */}
        <div className={`relative bg-[#050508]/80 backdrop-blur-xl p-6 shadow-2xl border border-white/5 overflow-hidden ${cornerRadius}`}>
          {/* Semantic Accent Edge */}
          <div className={`absolute ${showAbove ? 'bottom-0' : 'top-0'} ${isRight ? 'right-0' : isLeft ? 'left-0' : 'left-1/2 -translate-x-1/2'} ${isRight || isLeft ? 'w-1/2' : 'w-1/3'} h-[2px] bg-${accentColor}`} />
          
          {/* Tech Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:12px_12px] opacity-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-4 text-left">
            <h4 className="text-base font-bold tracking-[0.15em] uppercase text-white leading-tight">
              {label.replace('\n', ' ')}
            </h4>
            
            {items.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className={`px-2.5 py-1 bg-${accentColor}/10 border border-${accentColor}/20 rounded text-[10px] font-mono text-white/80 tracking-wider uppercase`}>
                    {item}
                  </span>
                ))}
              </div>
            )}
            
            <p className="text-[13px] text-white/70 font-light leading-relaxed">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export function HowIThink() {
  // ── Single authoritative active state ──
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  
  // ── Hit target refs for popup positioning ──
  const hitTargetRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const refCallbackCache = useRef<Record<string, (el: HTMLButtonElement | null) => void>>({});
  
  // Stable ref callbacks — never recreated, avoids React ref churn
  const getRefCallback = useCallback((id: string) => {
    if (!refCallbackCache.current[id]) {
      refCallbackCache.current[id] = (el: HTMLButtonElement | null) => {
        hitTargetRefs.current[id] = el;
      };
    }
    return refCallbackCache.current[id];
  }, []);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  // ── Mouse tracking ──
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 40, stiffness: 120, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-6, 6]);
  const shiftX = useTransform(smoothMouseX, [0, 1], [-15, 15]);
  const shiftY = useTransform(smoothMouseY, [0, 1], [-15, 15]);

  useEffect(() => {
    initGlobalPointer();
    const checkPointer = () => {
      setIsMobile(window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768);
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
    <section id="howithink" ref={containerRef} className="py-32 md:py-48 relative bg-background overflow-hidden perspective-2000">
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <div className="w-full h-full bg-grid-small [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        </div>
        <div className="absolute top-[20%] left-[10%] text-[8px] font-mono text-white/10 tracking-[0.3em]">SEC.01 // SPATIAL_MAP</div>
        <div className="absolute bottom-[20%] right-[10%] text-[8px] font-mono text-white/10 tracking-[0.3em]">SYS.ONLINE // NO_ANOMALY</div>
        <div className="absolute top-[30%] right-[15%] w-2 h-2 border-t border-r border-white/10" />
        <div className="absolute bottom-[30%] left-[15%] w-2 h-2 border-b border-l border-white/10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center relative z-20"
        >
          <span className="text-[10px] font-mono text-white/40 tracking-[0.3em] uppercase flex items-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-white/20" />
            HOW I THINK
            <span className="w-8 h-[1px] bg-white/20" />
          </span>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 max-w-2xl font-display text-white/90">
            A spatial map of my curiosity.
          </h3>
          <p className="text-base md:text-lg text-text-muted font-light max-w-xl leading-relaxed">
            Software engineering is just one outlet for my problem-solving. This map explores the mental models, subjects, and systems I naturally gravitate toward when I step away from the IDE.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* DESKTOP CONSTELLATION                              */}
        {/* ═══════════════════════════════════════════════════ */}
        <div ref={constellationRef} className="relative w-full h-[700px] hidden md:block">
          
          {/* ─── LAYER A: VISUAL (pointer-events-none) ────── */}
          <motion.div 
            className="absolute inset-0 preserve-3d pointer-events-none will-change-transform"
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              x: isMobile ? 0 : shiftX,
              y: isMobile ? 0 : shiftY
            }}
          >
            {/* SVG Connection Lines */}
            <div className="absolute inset-0 z-0 preserve-3d">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="18%" stroke="rgba(255,255,255,0.02)" strokeWidth="1" fill="none" />
                <circle cx="50%" cy="50%" r="35%" stroke="rgba(255,255,255,0.01)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
                
                {spatialNodes.map(node => {
                  const isNodeActive = activeTopicId === node.id;
                  const anyActive = activeTopicId !== null;
                  const strokeOpacity = anyActive ? (isNodeActive ? 0.6 : 0.05) : 0.15;
                  
                  return (
                    <motion.line
                      key={`line-${node.id}`}
                      x1="50%"
                      y1="50%"
                      x2={node.x}
                      y2={node.y}
                      stroke={isNodeActive ? node.colorVar : 'rgba(255,255,255,1)'}
                      strokeWidth={isNodeActive ? 1.5 : 1}
                      strokeDasharray={isNodeActive ? 'none' : '2 6'}
                      className="transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ strokeOpacity }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Visual Curiosity Core */}
            <VisualCuriosityCore 
              isActive={activeTopicId === 'curiosity'} 
              isFaded={activeTopicId !== null && activeTopicId !== 'curiosity'} 
            />

            {/* Visual Topic Nodes */}
            {spatialNodes.map((node, i) => (
              <VisualNode 
                key={node.id}
                node={node}
                i={i}
                isActive={activeTopicId === node.id}
                isFaded={activeTopicId !== null && activeTopicId !== node.id}
                globalMouseX={smoothMouseX}
                globalMouseY={smoothMouseY}
              />
            ))}
          </motion.div>
          
          {/* ─── LAYER B: INTERACTION (transparent buttons) ── */}
          <motion.div 
            className="absolute inset-0 preserve-3d"
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              x: isMobile ? 0 : shiftX,
              y: isMobile ? 0 : shiftY,
              pointerEvents: 'none' // Container blocks nothing; buttons opt-in
            }}
          >
            {/* Curiosity Core Hit Target */}
            <motion.button
              ref={getRefCallback('curiosity')}
              className="absolute top-[50%] left-[50%] w-32 h-32 cursor-none focus:outline-none"
              style={{ 
                transform: 'translate(-50%, -50%) translateZ(10px)',
                background: 'transparent',
                border: 'none',
                pointerEvents: 'auto',
                zIndex: 60
              }}
              onMouseEnter={() => setActiveTopicId('curiosity')}
              onMouseLeave={() => setActiveTopicId(null)}
              onFocus={() => setActiveTopicId('curiosity')}
              onBlur={() => setActiveTopicId(null)}
              data-cursor="hover"
              tabIndex={0}
              aria-label="Curiosity Core"
            />

            {/* Topic Hit Targets */}
            {spatialNodes.map(node => (
              <NodeHitTarget
                key={node.id}
                node={node}
                globalMouseX={smoothMouseX}
                globalMouseY={smoothMouseY}
                onActivate={() => setActiveTopicId(node.id)}
                onDeactivate={() => setActiveTopicId(null)}
                refCallback={getRefCallback(node.id)}
              />
            ))}
          </motion.div>
          
          {/* ─── LAYER C: POPUP (flat 2D, outside 3D tree) ── */}
          <PopupLayer
            activeTopicId={activeTopicId}
            hitTargetRefs={hitTargetRefs}
            constellationRef={constellationRef}
          />
          
        </div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* MOBILE VERTICAL TREE                               */}
        {/* ═══════════════════════════════════════════════════ */}
        <div className="flex flex-col md:hidden mt-8 relative z-20">
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          
          {spatialNodes.map((node, i) => (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-6 relative mb-12 last:mb-0 group"
            >
              <div className="w-3 h-3 rounded-full border-2 border-[#030305] bg-white/30 mt-2 relative z-10 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:bg-white transition-colors" />
              
              <div className="flex-1 flex flex-col gap-4 bg-[#0a0a0f] border border-white/5 p-6 rounded-xl relative overflow-hidden transition-all duration-150 group-hover:border-white/10 group-hover:bg-[#111118]">
                <div className={`absolute -right-10 -top-10 w-32 h-32 ${node.color} opacity-[0.05] blur-2xl rounded-full transition-opacity group-hover:opacity-[0.15]`} />
                
                <div>
                  <span className={`text-[9px] font-mono tracking-[0.2em] block mb-2 text-${node.color.replace('bg-', '')}`}>ID_{i + 1}</span>
                  <h4 className="text-sm font-medium text-white tracking-[0.1em] uppercase whitespace-pre-line leading-tight">
                    {node.label.replace('\n', ' ')}
                  </h4>
                </div>
                
                <p className="text-[13px] text-white/90 font-light leading-relaxed">
                  {node.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {node.items.map(item => (
                    <span key={item} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-sm text-[9px] font-mono text-white/70 tracking-wider uppercase">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
