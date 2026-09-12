import { motion } from 'framer-motion';
import { learningPath } from '../../data/skills';

export function LearningPath() {
  return (
    <section id="journey" className="py-32 relative bg-background border-b border-white/[0.02] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-mono text-accent-blue tracking-widest uppercase">
              05 / JOURNEY
            </span>
            <span className="w-12 h-[1px] bg-accent-blue/30" />
          </div>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">Current Development</h3>
        </motion.div>

        <div className="relative max-w-3xl border-l border-white/5 pl-8 md:pl-12 py-4">
          <div className="flex flex-col gap-16">
            {learningPath.map((item, index) => (
              <motion.div 
                key={item.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-[38px] md:-left-[54px] top-1.5 w-2 h-2 rounded-full ${index === learningPath.length - 1 ? 'bg-accent-blue shadow-[0_0_10px_var(--color-accent-blue)]' : 'bg-white/20 group-hover:bg-white/60 transition-colors'}`} />
                
                {/* Content */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                  <div className="w-32 text-[10px] font-mono text-white/40 tracking-widest uppercase shrink-0">
                    {item.stage}
                  </div>
                  <div className="text-[16px] md:text-lg font-light text-white/90">
                    {item.focus}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
