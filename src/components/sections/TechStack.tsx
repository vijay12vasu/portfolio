import { useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { skillCategories, type SkillCategory, type SkillItem } from '../../data/skills';
import { getTechnologyColor } from '../../data/technologyColors';
import { TechnologyMark } from '../ui/TechnologyMark';

const categoryLabels: Record<string, string> = {
  CORE: 'Programming Languages',
  WEB: 'Web Development',
  DATA: 'Data & Databases',
  'CURRENTLY LEARNING': 'Currently Learning',
};

const categoryAccents = ['#22D3EE', '#A78BFA', '#60A5FA', '#F59E0B'];

function TechnologyTile({ skill, index, reduceMotion }: { skill: SkillItem; index: number; reduceMotion: boolean }) {
  const [isActive, setIsActive] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { damping: 24, stiffness: 180, mass: 0.45 };
  const x = useSpring(useTransform(pointerX, [-1, 1], [-2, 2]), springConfig);
  const y = useSpring(useTransform(pointerY, [-1, 1], [-2, 2]), springConfig);
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [2.5, -2.5]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-2.5, 2.5]), springConfig);
  const glowX = useTransform(pointerX, [-1, 1], [0, 100]);
  const glowY = useTransform(pointerY, [-1, 1], [0, 100]);
  const pointerGlow = useMotionTemplate`radial-gradient(115px circle at ${glowX}% ${glowY}%, color-mix(in srgb, var(--skill-color) 21%, transparent), transparent 78%)`;
  const learning = skill.status === 'LEARNING' || skill.status === 'EXPLORING';
  const color = getTechnologyColor(skill.name);

  const handlePointerEnter = (event: PointerEvent<HTMLLIElement>) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    setIsActive(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLLIElement>) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const handleLeave = () => {
    setIsActive(false);
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-28px' }}
      transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.18) }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleLeave}
      onFocus={() => !reduceMotion && setIsActive(true)}
      onBlur={handleLeave}
      style={{
        '--skill-color': color,
        x: reduceMotion ? 0 : x,
        y: reduceMotion ? 0 : y,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 700,
        transformStyle: reduceMotion ? 'flat' : 'preserve-3d',
      } as CSSProperties}
      className="group min-w-0 list-none"
    >
      <div
        tabIndex={0}
        aria-label={`${skill.name}, ${skill.status.toLowerCase()}`}
        className={`tools-tile relative isolate flex min-h-14 min-w-0 items-center gap-3 overflow-hidden rounded-lg border px-3 py-2.5 outline-none transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none ${
          isActive ? 'tools-tile-active' : ''
        }`}
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
          style={{ backgroundImage: pointerGlow }}
        />
        <span className="tools-tile-edge pointer-events-none absolute inset-0 -z-10 rounded-[inherit]" aria-hidden="true" />
        <span className="tools-tile-icon relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
          <TechnologyMark
            name={skill.name}
            className="h-[1.125rem] w-[1.125rem] transition-[filter,transform] duration-300 group-hover:scale-110 group-focus-within:scale-110 motion-reduce:transform-none motion-reduce:transition-none"
          />
        </span>
        <span className="min-w-0 flex-1 truncate text-xs font-medium text-white/75 transition-colors duration-200 group-hover:text-white group-focus-within:text-white sm:text-[13px]">
          {skill.name}
        </span>
        <span
          aria-hidden="true"
          className={`tools-status h-1.5 w-1.5 shrink-0 rounded-full ring-2 ring-background ${learning ? 'tools-status-learning' : 'tools-status-working'}`}
          title={skill.status}
        />
        <span className="tools-tile-sweep pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12" aria-hidden="true" />
      </div>
    </motion.li>
  );
}

function CategoryRow({ category, index, reduceMotion }: { category: SkillCategory; index: number; reduceMotion: boolean }) {
  const label = categoryLabels[category.domain] ?? category.domain;
  const accent = categoryAccents[index % categoryAccents.length];

  return (
    <motion.section
      aria-labelledby={`skill-category-${index}`}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.07 }}
      style={{ '--category-accent': accent } as CSSProperties}
      className="tools-category grid gap-4 border-t border-white/[0.09] py-6 first:border-t-0 first:pt-0 sm:py-7 lg:grid-cols-[12.5rem_minmax(0,1fr)] lg:gap-8 lg:py-8"
    >
      <div className="tools-category-heading flex items-center gap-3 lg:block">
        <span className="tools-category-number font-mono text-[9px] tracking-[0.18em] text-white/30 lg:mb-2 lg:block">
          0{index + 1} <i aria-hidden="true">/</i>
        </span>
        <h4 id={`skill-category-${index}`} className="relative w-fit text-[10px] font-mono uppercase tracking-[0.19em] text-white/65 lg:mt-2">
          <span className="tools-category-marker mr-2 inline-block h-1.5 w-1.5 rounded-full" aria-hidden="true" />
          {label}
          <span className="tools-category-underline absolute -bottom-2 left-0 h-px w-12" aria-hidden="true" />
        </h4>
      </div>
      <ul aria-label={label} className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {category.skills.map((skill, skillIndex) => (
          <TechnologyTile key={skill.name} skill={skill} index={skillIndex} reduceMotion={reduceMotion} />
        ))}
      </ul>
    </motion.section>
  );
}

export function TechStack() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;

  return (
    <section id="stack" className="tools-section relative isolate scroll-mt-16 overflow-hidden bg-background py-20 sm:py-24 md:py-28">
      <div className="tools-atmosphere pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="tools-ambient tools-ambient-cyan absolute -left-40 top-16 h-[30rem] w-[30rem] rounded-full" />
        <div className="tools-ambient tools-ambient-violet absolute -right-40 top-[38%] h-[28rem] w-[28rem] rounded-full" />
        <div className="tools-grid absolute inset-0" />
        <div className="tools-vignette absolute inset-0" />
      </div>

      <div className="tools-inner relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-32px' }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
          className="mb-10 max-w-3xl sm:mb-12"
        >
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-accent-cyan to-accent-violet/30" />
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent-cyan">03 / TOOLS</p>
          </div>
          <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Technologies in practice.
          </h3>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[9px] font-mono uppercase tracking-[0.15em] text-white/45" aria-label="Skill status legend">
            <span className="inline-flex items-center gap-2"><i aria-hidden="true" className="tools-legend-dot tools-status-working h-1.5 w-1.5 rounded-full" />Working with</span>
            <span className="inline-flex items-center gap-2"><i aria-hidden="true" className="tools-legend-dot tools-status-learning h-1.5 w-1.5 rounded-full" />Currently learning</span>
          </div>
        </motion.header>

        <div className="max-w-5xl">
          {skillCategories.map((category, index) => (
            <CategoryRow key={category.domain} category={category} index={index} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
