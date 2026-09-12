import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { profile } from '../../data/profile';
import { Magnetic } from '../ui/Magnetic';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="py-40 relative z-10 bg-background overflow-hidden min-h-[80vh] flex items-center border-t border-white/[0.02]">
      
      {/* Very Subtle Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-10%] left-[20%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_bottom,_var(--color-accent-blue),_transparent_60%)] opacity-[0.05] blur-[150px]" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-16">
            <span className="w-12 h-[1px] bg-accent-blue/30" />
            <span className="text-[10px] font-mono text-accent-blue tracking-widest uppercase">
              08 / CONTACT
            </span>
            <span className="w-12 h-[1px] bg-accent-blue/30" />
          </div>
          
          <h3 className="text-6xl md:text-[8rem] font-bold mb-10 tracking-tighter leading-none text-white">
            Let's build.
          </h3>
          
          <p className="text-xl md:text-2xl text-white/60 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Interested in talking or working together?
          </p>
          
          {/* Subtle Email Display */}
          <div className="flex items-center justify-center gap-4 mb-20 relative z-20">
            <a 
              href={`mailto:${profile.contact.email}`} 
              aria-label="Send email"
              className="text-lg font-bold tracking-tighter font-display text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded px-2 py-1"
            >
              {profile.contact.email}
            </a>
            <button 
              onClick={handleCopy}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 ${
                copied ? 'text-accent-blue bg-accent-blue/10' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] font-mono tracking-widest uppercase">
                {copied ? 'Copied' : 'Copy'}
              </span>
            </button>
          </div>

          {/* Clean Links */}
          <div className="flex flex-wrap justify-center gap-12 mt-12 relative z-20">
            <Magnetic intensity={0.4}>
              <a 
                href={profile.contact.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors focus:outline-none focus:text-white"
              >
                <FiGithub size={20} />
                <span className="text-[12px] font-mono tracking-widest uppercase hidden sm:block">GitHub</span>
              </a>
            </Magnetic>
            
            <Magnetic intensity={0.4}>
              <a 
                href={profile.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors focus:outline-none focus:text-white"
              >
                <FiLinkedin size={20} />
                <span className="text-[12px] font-mono tracking-widest uppercase hidden sm:block">LinkedIn</span>
              </a>
            </Magnetic>

            <Magnetic intensity={0.4}>
              <a 
                href={`mailto:${profile.contact.email}`}
                aria-label="Send Email"
                className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors focus:outline-none focus:text-white"
              >
                <FiMail size={20} />
                <span className="text-[12px] font-mono tracking-widest uppercase hidden sm:block">Email</span>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
