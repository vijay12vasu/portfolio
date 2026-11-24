export function LiquidBackground() {
  return (
    <div className="site-atmosphere fixed inset-0 -z-10 overflow-hidden bg-background" aria-hidden="true">
      <div className="site-atmosphere-cyan absolute -left-[22rem] top-[18%] h-[46rem] w-[46rem] rounded-full" />
      <div className="site-atmosphere-violet absolute -right-[24rem] top-[42%] h-[48rem] w-[48rem] rounded-full" />
      <div className="site-atmosphere-grid absolute inset-0" />
    </div>
  );
}
