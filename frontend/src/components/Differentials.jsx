import { DIFFERENTIALS } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

export const Differentials = () => {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute top-1/2 right-0 h-80 w-80 rounded-full bg-[#E35BFF]/10 blur-[130px]" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading kicker="Por que nós" title="Diferenciais" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIALS.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.title} dir="up" delay={i * 0.08}>
                <div data-testid="differential-card" className="glass card-hover rounded-2xl p-7 h-full text-center group">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(176,38,255,0.12)] border border-[rgba(176,38,255,0.3)] glow-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon size={26} className="text-[#E35BFF]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mt-5">{d.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
