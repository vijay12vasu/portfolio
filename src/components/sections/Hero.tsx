import { useState } from 'react';
import type { PointerEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { profile } from '../../data/profile';
import { HeroCanvas } from '../ui/HeroCanvas';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const nameParts = profile.name.toUpperCase().split(' ');
  const surnameInitial = nameParts.pop();
  const givenName = nameParts.join(' ');
  const [pointerActive, setPointerActive] = useState(false);
  const pointerX = useMotionValue('50%');
  const pointerY = useMotionValue('42%');
  const smoothX = useSpring(pointerX, { damping: 35, stiffness: 100, mass: 0.8 });
  const smoothY = useSpring(pointerY, { damping: 35, stiffness: 100, mass: 0.8 });
  const pointerLight = useMotionTemplate`radial-gradient(440px circle at ${smoothX} ${smoothY}, rgba(34, 211, 238, 0.09), transparent 72%)`;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(`${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    pointerY.set(`${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    setPointerActive(true);
  };

  const handlePointerLeave = () => setPointerActive(false);

  return (
    <section
      id="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-[min(100svh,920px)] items-center overflow-hidden bg-background pb-16 pt-28 md:pb-20 md:pt-32"
    >
      <HeroCanvas />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: pointerLight, opacity: pointerActive && !prefersReducedMotion ? 1 : 0.35 }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.75, ease: [0.2, 0.7, 0.2, 1] }}
          className="hero-copy mx-auto w-full max-w-6xl"
        >
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mb-8">
            <span className="hero-status-dot h-1.5 w-1.5 rounded-full bg-accent-cyan" aria-hidden="true" />
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/55">{profile.heroMetadata.status}</p>
            <span className="h-3 w-px bg-white/15" aria-hidden="true" />
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-accent-violet/80">{profile.heroMetadata.domain}</p>
          </div>

          <h1 aria-label="Vijayaragavan R" className="hero-name font-hero font-medium leading-none text-white">
            <span className="whitespace-nowrap">{givenName}{'\u00a0'}<span className="hero-name-initial">{surnameInitial}</span></span>
          </h1>

          <div className="mt-7 flex flex-col gap-6 border-l border-accent-cyan/35 pl-5 sm:pl-7 md:mt-9 md:gap-7">
            <div className="max-w-2xl">
              <h2 className="font-display text-sm font-medium uppercase tracking-[0.18em] text-white/80 sm:text-base">{profile.role}</h2>
              <p className="mt-3 max-w-2xl text-sm font-light leading-7 text-white/60 sm:text-base sm:leading-8">
                I build robust software and explore the intersection of AI and local computing. My work focuses on turning curiosity into functional systems.
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-xl text-[9px] font-mono uppercase leading-5 tracking-[0.16em] text-white/40 sm:mt-7 md:ml-7">
            {profile.heroMetadata.currently}
          </p>
        </motion.div>

        <div className="pointer-events-none absolute bottom-0 right-6 hidden items-center gap-3 text-[9px] font-mono uppercase tracking-[0.18em] text-white/25 lg:flex">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
