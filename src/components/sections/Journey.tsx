import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { journey } from '../../data/journey';

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" ref={containerRef} className="py-32 relative bg-surface-elevated/30 border-y border-white/[0.02] overflow-hidden perspective-2000">
      
      {/* Ambient Lighting Stage (Amber -> Blue) */}
      <div className="absolute inset-0 pointer-events-none preserve-3d" style={{ transform: 'translateZ(-800px)' }}>
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--color-accent-amber),_transparent)] opacity-[0.05] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--color-accent-blue),_transparent)] opacity-[0.05] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32 md:text-center"
        >
          <div className="flex flex-col gap-4 mb-8 md:items-center">
            <span className="text-[10px] font-mono text-accent-blue tracking-widest uppercase flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent-blue/50 hidden md:block" />
              05 / TIMELINE
              <span className="w-8 h-[1px] bg-accent-blue/50 hidden md:block" />
            </span>
          </div>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter font-display">Spatial Progression</h3>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-12 preserve-3d">
          
          {/* Central Z-Axis Line Base */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2" />
          
          {/* Animated Scroll Progress Line */}
          <motion.div 
            className="absolute left-[27px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-accent-amber to-accent-blue md:-translate-x-1/2 origin-top shadow-[0_0_15px_rgba(255,255,255,0.3)] z-10" 
            style={{ height: lineHeight }}
          />

          {journey.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isCurrent = item.status === 'CURRENT';
            const depthZ = isCurrent ? 50 : (index - journey.length) * 30; // Past recedes into distance

            return (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, x: isLeft ? -20 : 20, z: depthZ - 100 }}
                whileInView={{ opacity: 1, x: 0, z: depthZ }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative flex items-center gap-8 md:gap-16 w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} group cursor-none preserve-3d`}
                data-cursor="hover"
              >
                
                {/* Timeline Node */}
                <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full flex items-center justify-center z-20 md:-translate-x-1/2 bg-background border border-white/20 group-hover:border-accent-amber/80 transition-colors duration-500 shadow-xl">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${item.status === 'CURRENT' ? 'bg-accent-amber shadow-[0_0_10px_var(--color-accent-amber)]' : 'bg-white/20 group-hover:bg-accent-amber'}`} />
                </div>

                {/* Empty Space for opposing side */}
                <div className="hidden md:block md:w-1/2" />

                {/* Content */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                  <div className={`p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative ${isLeft ? 'md:text-right md:mr-12' : 'md:ml-12'}`}>
                    <div className={`text-[10px] font-mono mb-6 tracking-widest uppercase flex items-center gap-3 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span className={item.status === 'CURRENT' ? 'text-accent-amber font-bold' : 'text-white/40'}>
                        {item.status}
                      </span>
                      <span className="w-4 h-[1px] bg-white/10" />
                      <span className="text-white/40">{item.category}</span>
                    </div>
                    
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-accent-amber transition-colors duration-500 font-display">
                      {item.title}
                    </h4>
                    <p className="text-[15px] text-white/60 font-light leading-relaxed mb-8">
                      {item.description}
                    </p>
                    
                    <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
                      {item.technologies.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-mono text-white/50 uppercase tracking-widest border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
