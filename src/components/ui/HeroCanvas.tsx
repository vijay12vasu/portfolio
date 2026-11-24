/** Lightweight hero atmosphere built with CSS; no WebGL renderer or animation loop. */
export function HeroCanvas() {
  return (
    <div className="hero-atmosphere absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-atmosphere-grid absolute inset-0" />
      <div className="hero-atmosphere-cyan absolute rounded-full" />
      <div className="hero-atmosphere-violet absolute rounded-full" />
      <div className="hero-atmosphere-ring absolute left-1/2 top-1/2 h-[min(72vw,52rem)] w-[min(72vw,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="hero-atmosphere-orbit absolute rounded-full" />
      <div className="hero-atmosphere-geometry absolute inset-0" />
      <div className="hero-atmosphere-particles absolute inset-0" />
      <div className="hero-atmosphere-vignette absolute inset-0" />
    </div>
  );
}
