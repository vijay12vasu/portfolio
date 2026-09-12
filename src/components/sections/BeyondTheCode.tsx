import { motion } from 'framer-motion';

export function BeyondTheCode() {
  return (
    <section id="beyond" className="py-32 md:py-48 relative bg-background flex items-center justify-center overflow-hidden perspective-2000">
      
      <div className="absolute inset-0 pointer-events-none opacity-20 preserve-3d">
        <motion.div 
          animate={{ 
            translateZ: [0, -100, 0],
            rotateX: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" 
        />
        <motion.div 
          animate={{ 
            translateZ: [0, 50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-64 bg-gradient-to-b from-transparent via-white/10 to-transparent" 
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center preserve-3d">
        <motion.div
          initial={{ opacity: 0, z: -50 }}
          whileInView={{ opacity: 1, z: 20 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase block mb-8">
            THE PROCESS
          </span>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-white/90 leading-[1.3] font-display">
            "I learn by building things <br className="md:hidden" /> I don't completely understand yet."
          </h3>
          <div className="w-12 h-[1px] bg-white/20 mt-12 mx-auto" />
        </motion.div>
      </div>

    </section>
  );
}
