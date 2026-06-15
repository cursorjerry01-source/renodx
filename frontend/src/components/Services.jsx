import { SERVICES } from "../data";
import { Reveal } from "./Reveal";

const SectionHeading = ({ kicker, title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto mb-14">
    <Reveal>
      <span className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold">{kicker}</span>
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mt-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-4 text-base md:text-lg">{subtitle}</p>}
    </Reveal>
  </div>
);

export const Services = () => {
  return (
    <section id="servicos" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute top-1/3 left-0 h-80 w-80 rounded-full bg-[#B026FF]/12 blur-[130px]" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading
          kicker="O que fazemos"
          title="Nossos Serviços"
          subtitle="Soluções completas para impulsionar a presença digital da sua empresa."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} dir="up" delay={i * 0.08}>
                <div data-testid="service-card" className="glass card-hover rounded-2xl p-7 h-full group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[rgba(176,38,255,0.12)] border border-[rgba(176,38,255,0.3)] glow-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon size={26} className="text-[#E35BFF]" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mt-6">{s.title}</h3>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { SectionHeading };
