import { TECHS } from "../data";

export const TechMarquee = () => {
  const row = [...TECHS, ...TECHS];
  return (
    <section className="relative py-10 border-y border-[rgba(176,38,255,0.18)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-6">
        <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Tecnologias que utilizamos</p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#05010D] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#05010D] to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-5">
          {row.map((t, i) => (
            <div
              key={i}
              data-testid="tech-pill"
              className="glass rounded-full px-7 py-3 font-mono-tech text-sm font-medium text-white/75 whitespace-nowrap hover:text-secondary hover:border-[rgba(214,70,255,0.6)] transition-colors duration-300"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
