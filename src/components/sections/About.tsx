import { FiBookOpen, FiCpu, FiLayers, FiShield, FiTarget } from 'react-icons/fi';
import { profile } from '../../data/profile';

const focusAreas = [
  { label: 'Mastering', title: 'Distributed Backends', detail: 'Java, Spring Boot, Microservices', icon: FiLayers, tone: 'text-accent-cyan' },
  { label: 'Research', title: 'Systems Security', detail: 'Applied Cryptography & Defense', icon: FiShield, tone: 'text-accent-violet' },
];

export function About() {
  return (
    <section id="about" className="portfolio-section relative overflow-hidden bg-background py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute right-[5%] top-[12%] h-96 w-96 rounded-full bg-accent-blue/5 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-accent-blue">01 / IDENTITY</span>
          <span className="h-px w-10 bg-gradient-to-r from-accent-cyan/60 to-accent-violet/20" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <h3 className="mb-6 text-[10px] font-mono uppercase tracking-[0.2em] text-accent-cyan/70">Engineering profile</h3>
            <p className="max-w-2xl font-display text-2xl font-light leading-[1.35] tracking-tight text-white/90 sm:text-3xl lg:text-[2.6rem]">
              {profile.about.who_i_am}
            </p>

            <div className="mt-12">
              <div className="mb-5 flex items-center gap-3">
                <FiCpu aria-hidden="true" className="h-4 w-4 text-accent-cyan" />
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Current architecture focus</h4>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {focusAreas.map(({ label, title, detail, icon: Icon, tone }) => (
                  <article key={title} className="group rounded-xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.045]">
                    <Icon aria-hidden="true" className={`mb-6 h-5 w-5 ${tone}`} />
                    <span className="mb-2 block text-[9px] font-mono uppercase tracking-[0.18em] text-white/40">{label}</span>
                    <h5 className="text-sm font-medium text-white/90">{title}</h5>
                    <p className="mt-1 text-xs leading-relaxed text-white/45">{detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <article className="mt-8 flex items-start gap-4 rounded-xl border border-white/[0.09] bg-[linear-gradient(115deg,rgba(12,22,33,0.62),rgba(255,255,255,0.018))] p-5 sm:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent-cyan/20 bg-accent-cyan/[0.06]">
                <FiBookOpen aria-hidden="true" className="h-4 w-4 text-accent-cyan" />
              </span>
              <div>
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">Education · 2024–2028</p>
                <h4 className="mt-2 text-sm font-medium text-white/90">B.E. Computer Science and Engineering</h4>
                <p className="mt-1 text-xs text-white/50">Karpagam College of Engineering</p>
              </div>
            </article>
          </div>

          <div className="grid content-start gap-3 lg:pt-10">
            <article className="rounded-xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <FiLayers aria-hidden="true" className="h-4 w-4 text-accent-blue" />
                <h4 className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">What I’m building</h4>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{profile.about.what_im_building}</p>
            </article>

            <article className="rounded-xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <FiCpu aria-hidden="true" className="h-4 w-4 text-accent-violet" />
                <h4 className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">Engineering philosophy</h4>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{profile.about.what_im_learning}</p>
            </article>

            <article className="rounded-xl border border-accent-cyan/15 bg-accent-cyan/[0.035] p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <FiTarget aria-hidden="true" className="h-4 w-4 text-accent-cyan" />
                <h4 className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">The objective</h4>
              </div>
              <p className="text-sm italic leading-relaxed text-accent-cyan/80">“{profile.about.where_im_heading}”</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
