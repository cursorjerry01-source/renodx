import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO, PORTFOLIO_FALLBACK } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

export const Portfolio = () => {
  return (
    <section id="portfolio" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading
          kicker="Trabalhos recentes"
          title="Portfólio"
          subtitle="Projetos reais em produção, combinando design premium e tecnologia de ponta."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.title} dir="up" delay={i * 0.06}>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                data-testid="portfolio-card"
                className="group relative block overflow-hidden rounded-2xl glass card-hover h-72"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== PORTFOLIO_FALLBACK) e.currentTarget.src = PORTFOLIO_FALLBACK;
                  }}
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-60 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-90 group-hover:saturate-[1.25]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05010D] via-[#05010D]/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B026FF]/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transition-transform duration-1000 ease-out" />
                <div className="relative h-full flex flex-col justify-end p-6">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-secondary font-medium">{p.category}</span>
                  <h3 className="font-display font-semibold text-base lg:text-lg leading-snug text-white mt-2">{p.title}</h3>
                  <span
                    data-testid="portfolio-view-btn"
                    className="mt-4 inline-flex w-fit items-center gap-2 rounded-full glass border border-[rgba(214,70,255,0.5)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Ver Projeto <ArrowUpRight size={14} className="text-[#E35BFF] transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
