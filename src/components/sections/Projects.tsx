import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import { FiArrowUpRight, FiX, FiGithub, FiArrowRight, FiGlobe, FiServer, FiDatabase } from 'react-icons/fi';
import { Magnetic } from '../ui/Magnetic';
import { TechnologyMark } from '../ui/TechnologyMark';

function ArchitectureOverview() {
  const stages = [
    { icon: FiGlobe, label: 'Frontend', detail: 'React', tone: 'text-accent-cyan' },
    { icon: FiServer, label: 'Services', detail: 'Spring Boot · FastAPI', tone: 'text-accent-violet' },
    { icon: FiDatabase, label: 'Database', detail: 'MongoDB', tone: 'text-accent-cyan' },
  ];

  return (
    <div role="img" aria-label="Architecture overview, not an application screenshot: React frontend, Spring Boot and FastAPI services, and MongoDB database." className="project-architecture relative overflow-hidden rounded-2xl border border-white/[0.09] p-5 sm:p-7 md:p-8">
      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/45">Architecture overview</span>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[8px] font-mono uppercase tracking-wider text-white/40">Documented stack</span>
      </div>
      <div className="relative z-10 mt-8 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:mt-12 sm:gap-3">
        {stages.map(({ icon: Icon, label, detail, tone }, index) => (
          <div key={label} className="contents">
            <div className="min-w-0">
              <Icon aria-hidden="true" className={`mb-3 h-5 w-5 sm:h-6 sm:w-6 ${tone}`} />
              <p className="text-[8px] font-mono uppercase tracking-[0.14em] text-white/40 sm:text-[9px]">{label}</p>
              <p className="mt-1 break-words text-[11px] font-medium text-white/85 sm:text-sm">{detail}</p>
            </div>
            {index < stages.length - 1 && <FiArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-white/25 sm:h-4 sm:w-4" />}
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="project-architecture-orbit absolute -right-24 -top-32 h-80 w-80 rounded-full" />
      <p className="relative z-10 mt-8 border-t border-white/[0.08] pt-3 text-[8px] font-mono uppercase tracking-[0.12em] text-white/35 sm:mt-10">A visual summary of the documented stack · Not an application screenshot</p>
    </div>
  );
}

function FeaturedCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="project-showcase group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-surface-elevated/30 p-5 shadow-2xl backdrop-blur-sm sm:p-7 md:p-9"
    >
      <div aria-hidden="true" className="project-showcase-glow absolute -left-32 -top-40 h-80 w-80 rounded-full" />
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12">
        <div className="min-w-0">
          <div className="mb-5 flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.2em] text-accent-cyan/85">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(34,211,238,.7)]" />
            Featured project
          </div>
          <h3 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">{project.title}<span className="text-accent-cyan">.</span></h3>
          <p className="mt-3 text-sm font-medium text-white/55 sm:text-base">{project.subtitle}</p>
          <p className="mt-5 max-w-xl text-sm font-light leading-7 text-white/65 sm:text-base sm:leading-8">{project.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3" aria-label="Project technologies">
            {project.tech.map(tech => (
              <span key={tech} className="inline-flex items-center gap-2 text-[10px] font-mono text-white/60 sm:text-[11px]">
                <TechnologyMark name={tech} className="h-[18px] w-[18px] shrink-0" />{tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button type="button" onClick={onClick} className="inline-flex min-h-10 items-center gap-2 text-[10px] font-mono uppercase tracking-[0.13em] text-white/65 transition hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background">
              Project notes <FiArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 text-[10px] font-mono uppercase tracking-[0.13em] text-white/45 transition hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background">
              <FiGithub aria-hidden="true" className="h-3.5 w-3.5" /> Repository
            </a>
          </div>
        </div>

        <ArchitectureOverview />
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeCaseStudy = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="projects" className="portfolio-section relative overflow-hidden border-y border-white/[0.04] bg-background py-24 md:py-32">
      
      {/* Subtle Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(-500px)' }}>
        <div className="absolute top-0 right-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--color-accent-blue),_transparent)] opacity-[0.03] blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-[1px] bg-accent-blue/50" />
            <span className="text-[10px] font-mono text-accent-blue tracking-widest uppercase">
              04 / WORK
            </span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">Selected work.</h2>
        </motion.div>

        <div className="flex flex-col gap-12">
          
          <div className="relative z-20 flex flex-col gap-5">
            {projects.map(project => (
              <FeaturedCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
          
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal 
            project={selectedProject} 
            onClose={closeCaseStudy}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      role="presentation"
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-center justify-center overscroll-none bg-background/80 p-3 backdrop-blur-lg sm:p-5 md:p-10"
      onClick={onClose}
      data-cursor="hover"
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        tabIndex={-1}
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, type: "spring", damping: 25, stiffness: 200 }}
        className="relative flex h-[min(88svh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated/95 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/40 sm:rounded-3xl"
        onClick={e => e.stopPropagation()}
        data-cursor="default"
      >
        {/* Subtle grid bg for modal */}
        <div className="absolute inset-0 bg-grid-small opacity-20 pointer-events-none" />

        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close Case Study"
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors z-20 cursor-none border border-white/5 focus:outline-none focus:ring-2 focus:ring-white/50"
          data-cursor="hover"
        >
          <FiX className="w-5 h-5" />
        </button>
        
        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y px-5 py-16 sm:px-10 md:px-20 md:py-24 custom-scrollbar relative z-10">
          <div className="mb-16 max-w-3xl">
            <span className="text-[10px] font-mono text-accent-blue tracking-widest uppercase mb-6 block">
              SYSTEM PROFILE // {project.id}
            </span>
            <h2 id="case-study-title" className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white font-display leading-[1.1]">{project.title}</h2>
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">{project.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-24 pb-12 border-b border-white/5">
            {project.tech.map(t => (
              <span key={t} className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/70 tracking-widest uppercase">
                <TechnologyMark name={t} className="h-4 w-4" />
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
