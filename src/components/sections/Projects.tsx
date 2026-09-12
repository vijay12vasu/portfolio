import { useState, useRef } from 'react';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import { FiArrowUpRight, FiX, FiGithub, FiLayers, FiTerminal } from 'react-icons/fi';
import { Magnetic } from '../ui/Magnetic';
import { TiltCard } from '../ui/TiltCard';
import { useProximity } from '../../hooks/useProximity';

function FeaturedCard({ project, onClick }: { project: Project, onClick: () => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const proximity = useProximity(cardRef, 200);
  
  // Proximity glow opacity
  const proximityGlow = useTransform(proximity, [0, 1], [0, 0.4]);

  return (
    <motion.button
      ref={cardRef}
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-none text-left w-full relative flex flex-col p-8 md:p-12 border border-white/10 bg-surface-elevated/30 hover:bg-surface-elevated/50 backdrop-blur-sm transition-all duration-700 rounded-2xl overflow-hidden preserve-3d perspective-1000 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
      data-cursor="project"
      onClick={onClick}
    >
      {/* Structural BG element (hover = 1, proximity = interpolated) */}
      <motion.div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent-cyan/10 to-transparent blur-[80px] pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3 transition-opacity duration-700 group-hover:opacity-100" 
        style={{ transform: 'translateZ(-50px)', opacity: proximityGlow }} 
      />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 transition-transform duration-700 group-hover:[transform:translateZ(30px)]">
        
        {/* Left Column */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="w-16 h-16 rounded-xl bg-background border border-white/10 flex items-center justify-center mb-4 group-hover:border-accent-cyan/30 transition-all duration-500 shadow-2xl group-hover:[transform:translateZ(20px)]">
            <FiLayers className="w-6 h-6 text-white/50 group-hover:text-accent-cyan transition-colors" />
          </div>
          <h4 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-display">{project.title}</h4>
          <p className="text-lg text-white/50 font-light">{project.subtitle}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono text-white/60 uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-full lg:w-2/3 flex flex-col justify-between pt-2">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest border-b border-white/5 pb-2">Architecture Objective</span>
              <p className="text-sm text-white/70 font-light leading-relaxed">{project.caseStudy?.direction}</p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest border-b border-white/5 pb-2">Current State</span>
              <p className="text-sm text-white/70 font-light leading-relaxed">{project.caseStudy?.state}</p>
            </div>
          </div>
          
          <div className="mt-12 flex justify-end">
            <span aria-hidden="true" className="inline-flex items-center gap-3 text-[10px] font-mono text-accent-cyan/70 group-hover:text-accent-cyan transition-colors duration-500 uppercase tracking-widest">
              Initialize Case Study <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featured = projects.filter(p => p.type === 'FEATURED');
  const learning = projects.filter(p => p.type === 'LEARNING');

  return (
    <section id="projects" className="py-32 relative bg-background border-y border-white/[0.02] overflow-hidden">
      
      {/* Subtle Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(-500px)' }}>
        <div className="absolute top-0 right-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--color-accent-blue),_transparent)] opacity-[0.03] blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-[1px] bg-accent-blue/50" />
            <span className="text-[10px] font-mono text-accent-blue tracking-widest uppercase">
              04 / WORKSPACE
            </span>
          </div>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-display">System Architectures</h3>
        </motion.div>

        <div className="flex flex-col gap-32">
          
          {/* Featured Architecture */}
          <div className="flex flex-col gap-8 relative z-20">
            <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase mb-4 pl-2 flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              DEPLOYED PLATFORMS
              <span className="flex-1 h-[1px] bg-white/5" />
            </div>
            
            {featured.map(project => (
              <FeaturedCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </div>

          {/* Development Archive (Bento Grid) */}
          <div className="relative z-10 pt-16">
            <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase mb-12 pl-2 flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              ENGINEERING FOUNDATIONS
              <span className="flex-1 h-[1px] bg-white/5" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
              {learning.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <TiltCard
                    className="group flex flex-col justify-between p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] cursor-none transition-colors rounded-xl min-h-[300px]"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <FiTerminal className="text-white/20 group-hover:text-white/60 transition-colors w-6 h-6" />
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest group-hover:text-accent-blue transition-colors">
                          {project.status}
                        </span>
                      </div>
                      <h5 className="text-xl font-bold text-white/90 tracking-tight mb-4 font-display">
                        {project.title}
                      </h5>
                      <p className="text-sm text-white/50 font-light leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="mt-8 flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <Magnetic intensity={0.2}>
                <a 
                  href="https://github.com/vijay12vasu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-xs font-mono tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-none"
                  data-cursor="hover"
                >
                  <FiGithub className="w-4 h-4" />
                  <span>VIEW FULL ARCHIVE</span>
                </a>
              </Magnetic>
            </div>
          </div>
          
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-background/80 cursor-none"
      onClick={onClose}
      data-cursor="hover"
    >
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-5xl h-[85vh] bg-surface-elevated/90 border border-white/10 rounded-3xl flex flex-col relative overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
        data-cursor="default"
      >
        {/* Subtle grid bg for modal */}
        <div className="absolute inset-0 bg-grid-small opacity-20 pointer-events-none" />

        <button 
          onClick={onClose}
          aria-label="Close Case Study"
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors z-20 cursor-none border border-white/5 focus:outline-none focus:ring-2 focus:ring-white/50"
          data-cursor="hover"
        >
          <FiX className="w-5 h-5" />
        </button>
        
        <div className="overflow-y-auto px-10 py-16 md:px-20 md:py-24 h-full custom-scrollbar relative z-10">
          <div className="mb-16 max-w-3xl">
            <span className="text-[10px] font-mono text-accent-blue tracking-widest uppercase mb-6 block">
              SYSTEM PROFILE // {project.id}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white font-display leading-[1.1]">{project.title}</h2>
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">{project.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-24 pb-12 border-b border-white/5">
            {project.tech.map(t => (
              <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/70 tracking-widest uppercase">
                {t}
              </span>
            ))}
          </div>
          
          {project.caseStudy ? (
            <div className="space-y-20">
              <div className="grid md:grid-cols-2 gap-20">
                <div className="flex flex-col gap-6">
                  <h3 className="text-[10px] font-mono text-accent-cyan tracking-widest uppercase border-b border-white/5 pb-4">
                    Architecture Objective
                  </h3>
                  <p className="text-base text-white/70 leading-relaxed font-light">{project.caseStudy.architecture}</p>
                </div>
                <div className="flex flex-col gap-6">
                  <h3 className="text-[10px] font-mono text-accent-violet tracking-widest uppercase border-b border-white/5 pb-4">
                    State & Progress
                  </h3>
                  <p className="text-base text-white/70 leading-relaxed font-light">{project.caseStudy.state}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-6 max-w-3xl">
                <h3 className="text-[10px] font-mono text-accent-amber tracking-widest uppercase border-b border-white/5 pb-4">
                  Engineering Insight
                </h3>
                <p className="text-base text-white/70 leading-relaxed font-light">{project.caseStudy.learning}</p>
              </div>
              
              <div className="pt-16 mt-8">
                <Magnetic intensity={0.2}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-white text-black rounded-full text-[11px] uppercase tracking-widest font-mono hover:scale-[1.02] transition-transform cursor-none" data-cursor="hover">
                    Access Source Code <FiArrowUpRight className="w-4 h-4" />
                  </a>
                </Magnetic>
              </div>
            </div>
          ) : (
            <div className="space-y-20">
              <div className="grid md:grid-cols-2 gap-20">
                <div className="flex flex-col gap-6">
                  <h3 className="text-[10px] font-mono text-white/40 tracking-widest uppercase border-b border-white/5 pb-4">
                    What It Does
                  </h3>
                  <p className="text-base text-white/70 leading-relaxed font-light">{project.what_it_does}</p>
                </div>
                <div className="flex flex-col gap-6">
                  <h3 className="text-[10px] font-mono text-white/40 tracking-widest uppercase border-b border-white/5 pb-4">
                    Why I Built It
                  </h3>
                  <p className="text-base text-white/70 leading-relaxed font-light">{project.why_i_built_it}</p>
                </div>
              </div>

              <div className="flex flex-col gap-6 max-w-3xl">
                <h3 className="text-[10px] font-mono text-accent-amber tracking-widest uppercase border-b border-white/5 pb-4">
                  What I Learned
                </h3>
                <p className="text-base text-white/70 leading-relaxed font-light">{project.what_i_learned}</p>
              </div>
              
              {project.github && (
               <div className="pt-16 mt-8">
                 <Magnetic intensity={0.2}>
                   <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-white text-black rounded-full text-[11px] uppercase tracking-widest font-mono hover:scale-[1.02] transition-transform cursor-none" data-cursor="hover">
                     Access Source Code <FiArrowUpRight className="w-4 h-4" />
                   </a>
                 </Magnetic>
               </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
