import { motion } from 'framer-motion';

export function CurrentlyBuilding() {
  const currentDev = [
    {
      title: "ECHO",
      desc: "Personal AI desktop system",
      status: "ACTIVE",
      color: "text-blue-500",
      bg: "bg-blue-500"
    },
    {
      title: "FULL STACK JAVA",
      desc: "Current college training & enterprise architectures",
      status: "LEARNING",
      color: "text-emerald-500",
      bg: "bg-emerald-500"
    },
    {
      title: "DSA",
      desc: "Problem-solving development for complex logic",
      status: "LEARNING",
      color: "text-amber-500",
      bg: "bg-amber-500"
    },
    {
      title: "SOFTWARE ENGINEERING",
      desc: "Building stronger practical development ability",
      status: "EXPLORING",
      color: "text-purple-500",
      bg: "bg-purple-500"
    }
  ];

  return (
    <section className="py-24 relative bg-background border-y border-white/[0.02] overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-white">Live Development</h3>
          </div>
          <div className="text-[10px] font-mono text-text-subtle flex items-center gap-2 border border-white/10 px-3 py-1.5 rounded bg-white/5 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
            System Active
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentDev.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl border border-white/5 bg-surface-elevated/30 hover:bg-surface hover:border-white/20 transition-colors"
            >
              <div className={`text-[9px] font-mono tracking-widest uppercase mb-4 flex items-center gap-2 ${item.color}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${item.bg} ${item.status === 'ACTIVE' || item.status === 'LEARNING' ? 'animate-pulse' : 'opacity-50'}`} />
                {item.status}
              </div>
              <h4 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h4>
              <p className="text-sm text-text-muted leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
