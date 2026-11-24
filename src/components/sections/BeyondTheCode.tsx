import { motion, useReducedMotion } from 'framer-motion';

export function BeyondTheCode() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="beyond"
      aria-labelledby="beyond-title"
      className="relative flex min-h-[70svh] items-center justify-center overflow-hidden bg-background py-24 md:min-h-[80svh] md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, rgba(34, 211, 238, 0.055), transparent 48%), radial-gradient(ellipse at 50% 58%, rgba(124, 92, 228, 0.045), transparent 68%)',
        }}
      />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center md:px-12"
      >
        <p
          id="beyond-title"
          className="mb-8 flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-accent-violet"
        >
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-accent-violet/70" />
          06 / BEYOND
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-accent-violet/70" />
        </p>
        <blockquote className="font-display text-2xl font-light leading-relaxed tracking-tight text-white/90 sm:text-3xl md:text-4xl lg:text-5xl">
          “I learn by building things I don’t completely understand yet.”
        </blockquote>
      </motion.div>
    </section>
  );
}
