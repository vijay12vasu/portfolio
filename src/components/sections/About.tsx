import { useRef } from 'react';
import { profile } from '../../data/profile';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" ref={containerRef} className="py-32 md:py-48 relative bg-background perspective-2000 overflow-hidden">
      
      {/* Ambient Lighting Stage */}
      <div className="absolute inset-0 pointer-events-none preserve-3d" style={{ transform: 'translateZ(-600px)' }}>
        <div className="absolute top-1/4 right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--color-accent-blue),_transparent)] opacity-[0.03] blur-[80px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          {/* Left: The Person */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-[10px] font-mono text-accent-blue tracking-widest uppercase mb-12 flex items-center gap-4">
              01 / OVERVIEW
              <span className="w-12 h-[1px] bg-accent-blue/30" />
            </h3>
            
            <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light leading-[1.4] tracking-tight mb-16 font-display">
              {profile.about.who_i_am}
            </p>
            
            {/* CURRENTLY Editorial */}
            <div className="flex flex-col gap-8">
              <h4 className="text-[10px] font-mono text-white/40 tracking-widest uppercase pb-4 border-b border-white/5">
                Current Architecture Focus
              </h4>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group">
                  <span className="w-24 text-[10px] font-mono text-accent-cyan tracking-widest uppercase shrink-0 group-hover:text-white transition-colors">Engineering</span>
                  <span className="text-white/80 font-medium">Echo Pipeline <span className="text-white/40 font-light">— Private experimental AI orchestration</span></span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group">
                  <span className="w-24 text-[10px] font-mono text-accent-amber tracking-widest uppercase shrink-0 group-hover:text-white transition-colors">Mastering</span>
                  <span className="text-white/80 font-medium">Distributed Backends <span className="text-white/40 font-light">— Java, Spring Boot, Microservices</span></span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group">
                  <span className="w-24 text-[10px] font-mono text-accent-violet tracking-widest uppercase shrink-0 group-hover:text-white transition-colors">Research</span>
                  <span className="text-white/80 font-medium">Systems Security <span className="text-white/40 font-light">— Applied Cryptography & Defense</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Approach */}
          <div className="w-full lg:w-1/2 flex flex-col gap-12 lg:pt-20">
            <div className="flex flex-col group">
              <h4 className="text-[10px] font-mono text-white/40 tracking-widest uppercase mb-6 group-hover:text-white transition-colors">
                What I'm Building
              </h4>
              <p className="text-[15px] text-white/60 font-light leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                {profile.about.what_im_building}
              </p>
            </div>

            <div className="flex flex-col group">
              <h4 className="text-[10px] font-mono text-white/40 tracking-widest uppercase mb-6 group-hover:text-white transition-colors">
                Engineering Philosophy
              </h4>
              <p className="text-[15px] text-white/60 font-light leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                {profile.about.what_im_learning}
              </p>
            </div>

            <div className="flex flex-col pt-8 border-t border-white/5 mt-4 group">
              <h4 className="text-[10px] font-mono text-white/40 tracking-widest uppercase mb-6 group-hover:text-white transition-colors">
                The Objective
              </h4>
              <p className="text-[15px] text-accent-cyan/80 font-light leading-relaxed italic group-hover:text-accent-cyan transition-colors duration-500">
                "{profile.about.where_im_heading}"
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
