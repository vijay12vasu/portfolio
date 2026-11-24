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
    <section id="journey" ref={containerRef} className="portfolio-section relative overflow-hidden border-y border-white/[0.035] bg-surface-elevated/20 py-24 md:py-32">
      
      {/* Ambient Lighting Stage (Amber -> Blue) */}
      <div className="absolute inset-0 pointer-events-none preserve-3d" style={{ transform: 'translateZ(-800px)' }}>
        <div className="absolute top-[10%] left-[20%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-accent-amber),_transparent)] opacity-[0.045] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,_var(--color-accent-cyan),_transparent)] opacity-[0.045] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <div className="flex flex-col gap-4 mb-8 md:items-center">
            <span className="text-[10px] font-mono text-accent-blue tracking-widest uppercase flex items-center gap-4">
              05 / TIMELINE
              <span className="h-px w-8 bg-gradient-to-r from-accent-cyan/60 to-accent-violet/20" />
            </span>
          </div>
          <h3 className="font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">A path still in progress.</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">Selected milestones from my studies and the systems I have been learning to build.</p>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-12 preserve-3d">
          
          {/* Central Z-Axis Line Base */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/20 via-white/10 to-accent-violet/20 md:-translate-x-1/2" />
          
          {/* Animated Scroll Progress Line */}
          <motion.div 
            className="absolute left-[27px] md:left-1/2 top-0 w-[2px] origin-top bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-amber shadow-[0_0_15px_rgba(34,211,238,0.2)] md:-translate-x-1/2 z-10"
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
                className={`relative flex items-center gap-8 md:gap-16 w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} group preserve-3d`}
              >
                
                {/* Timeline Node */}
                <div className="absolute left-[20px] md:left-1/2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-white/20 bg-background shadow-xl transition-colors duration-300 group-hover:border-accent-cyan/70 md:-translate-x-1/2">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${item.status === 'CURRENT' ? 'bg-accent-amber shadow-[0_0_10px_var(--color-accent-amber)]' : 'bg-white/20 group-hover:bg-accent-amber'}`} />
                </div>

                {/* Empty Space for opposing side */}
                <div className="hidden md:block md:w-1/2" />

                {/* Content */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                  <div className={`relative rounded-xl border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(8,10,16,0.22))] p-5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.045] sm:p-7 ${isLeft ? 'md:mr-10 md:text-right' : 'md:ml-10'}`}>
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
