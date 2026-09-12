import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { HowIThink } from './components/sections/HowIThink';
import { TechStack } from './components/sections/TechStack';
import { EchoShowcase } from './components/sections/EchoShowcase';
import { Projects } from './components/sections/Projects';
import { Journey } from './components/sections/Journey';
import { BeyondTheCode } from './components/sections/BeyondTheCode';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { SpatialNav } from './components/ui/SpatialNav';

import { SmoothScroll } from './components/ui/SmoothScroll';
import { LiquidBackground } from './components/ui/LiquidBackground';
import { motion, useScroll } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <SmoothScroll>
      <div className="noise-overlay"></div>
      <LiquidBackground />
      <CustomCursor />
      <SpatialNav />
      
      {/* Global Scroll Progress */}
      <motion.div 
        className="fixed top-0 right-0 w-1 h-full bg-accent-blue/20 z-[9999] origin-top hidden md:block"
        style={{ scaleY: scrollYProgress }}
      />
      
      <div className="bg-background min-h-screen text-text-main relative z-10">
        <div className="absolute inset-0 bg-grid z-0" />
        <Navbar />
        <main>
          <Hero />
          <About />
          <HowIThink />
          <TechStack />
          <EchoShowcase />
          <Projects />
          <Journey />
          <BeyondTheCode />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
