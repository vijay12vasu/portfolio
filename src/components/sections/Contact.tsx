import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { profile } from '../../data/profile';
import { Magnetic } from '../ui/Magnetic';

export function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle');
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (copyTimeoutRef.current !== null) window.clearTimeout(copyTimeoutRef.current);
  }, []);

  const handleCopy = async () => {
    if (copyTimeoutRef.current !== null) window.clearTimeout(copyTimeoutRef.current);

    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(profile.contact.email);
      setCopyState('success');
    } catch {
      setCopyState('error');
    }
    copyTimeoutRef.current = window.setTimeout(() => {
      setCopyState('idle');
      copyTimeoutRef.current = null;
    }, 2400);
  };

  return (
    <section id="contact" className="portfolio-section relative z-10 flex min-h-[75svh] items-center overflow-hidden border-t border-white/[0.04] bg-background py-24 sm:py-32 md:py-40">
      
      {/* Very Subtle Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-10%] left-[20%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_bottom,_var(--color-accent-blue),_transparent_60%)] opacity-[0.05] blur-[150px]" />
      </div>
      
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="mb-12 flex items-center gap-4 sm:mb-16">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent-cyan/60 sm:w-12" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent-cyan">
              07 / CONTACT
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent-violet/50 sm:w-12" />
          </div>
          
          <h3 className="mb-7 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.07em] text-white sm:text-6xl md:mb-10 md:text-[8rem]">
            Let's build.
          </h3>
          
          <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-white/60 sm:mb-14 sm:text-xl md:mb-16 md:text-2xl">
            Interested in talking or working together?
          </p>
          
          {/* Subtle Email Display */}
          <div className="relative z-20 mb-12 flex max-w-full flex-wrap items-center justify-center gap-3 sm:mb-16 sm:gap-4 md:mb-20">
            <a 
              href={`mailto:${profile.contact.email}`} 
              aria-label="Send email"
              className="break-all rounded px-2 py-1 font-display text-base font-bold tracking-tight text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:text-lg"
            >
              {profile.contact.email}
            </a>
            <button 
              type="button"
              onClick={handleCopy}
              aria-label={copyState === 'success' ? 'Email copied' : copyState === 'error' ? 'Copy failed' : 'Copy email address'}
              aria-live="polite"
              className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 ${
                copyState === 'success' ? 'text-accent-cyan bg-accent-cyan/10' : copyState === 'error' ? 'text-accent-amber bg-accent-amber/10' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] font-mono tracking-widest uppercase">
                {copyState === 'success' ? 'Copied' : copyState === 'error' ? 'Copy failed' : 'Copy'}
              </span>
            </button>
          </div>

          {/* Clean Links */}
          <div className="relative z-20 mt-6 flex w-full max-w-2xl flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
            <Magnetic intensity={0.4}>
              <a 
                href={profile.contact.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="group flex min-w-32 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-white/55 transition duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 sm:min-w-40"
              >
                <FiGithub aria-hidden="true" size={18} />
                <span className="text-[10px] font-mono tracking-widest uppercase sm:text-[11px]">GitHub</span>
              </a>
            </Magnetic>
            
            <Magnetic intensity={0.4}>
              <a 
                href={profile.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="group flex min-w-32 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-white/55 transition duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 sm:min-w-40"
              >
                <FiLinkedin aria-hidden="true" size={18} />
                <span className="text-[10px] font-mono tracking-widest uppercase sm:text-[11px]">LinkedIn</span>
              </a>
            </Magnetic>

            <Magnetic intensity={0.4}>
              <a 
                href={`mailto:${profile.contact.email}`}
                aria-label="Send Email"
                className="group flex min-w-32 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-white/55 transition duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 sm:min-w-40"
              >
                <FiMail aria-hidden="true" size={18} />
                <span className="text-[10px] font-mono tracking-widest uppercase sm:text-[11px]">Email</span>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
