import { Sparkles, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export const CtaPremium = () => {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal dir="scale">
          <div
            data-testid="cta-premium"
            className="relative overflow-hidden rounded-3xl text-center px-6 py-16 lg:py-20 animate-pulse-glow"
            style={{
              background: "linear-gradient(120deg, #2a0a52 0%, #B026FF 55%, #E35BFF 100%)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 grid-floor opacity-30" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-mono-tech text-xs uppercase tracking-[0.15em] font-medium text-white backdrop-blur">
                <Sparkles size={14} /> Vamos começar
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white mt-6 max-w-3xl mx-auto leading-snug">
                Pronto para transformar sua ideia em realidade?
              </h2>
              <a
                href="#contato"
                data-testid="cta-quote-btn"
                className="ripple relative overflow-hidden mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#1a0533] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-300"
              >
                Solicitar Orçamento <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
