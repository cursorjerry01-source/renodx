import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

export const Portfolio = () => {
  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading
          kicker="Trabalhos recentes"
          title="Portfólio"
          subtitle="Projetos que combinam design premium e tecnologia de ponta."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.title} dir="up" delay={i * 0.06}>
              <div data-testid="portfolio-card" className="group relative overflow-hidden rounded-2xl glass card-hover h-72">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05010D] via-[#05010D]/40 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6">
                  <span className="text-xs uppercase tracking-widest text-secondary font-semibold">{p.category}</span>
                  <h3 className="font-display font-bold text-xl text-white mt-1">{p.title}</h3>
                  <button
                    data-testid="portfolio-view-btn"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Ver Projeto <ArrowUpRight size={16} className="text-[#E35BFF]" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
