import { CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { ASSETS } from "../data";

const points = [
  "Tecnologia de ponta em cada projeto",
  "Equipe especializada e dedicada",
  "Foco em resultado e crescimento",
];

export const About = () => {
  return (
    <section id="sobre" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute -top-10 left-1/4 h-80 w-80 rounded-full bg-[#B026FF]/12 blur-[130px]" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal dir="left" className="relative">
          <div className="relative rounded-3xl overflow-hidden glass glow-md p-2">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=80"
              alt="Tecnologia futurista"
              loading="lazy"
              className="rounded-2xl w-full h-[380px] object-cover opacity-80"
            />
            <div className="absolute inset-2 rounded-2xl bg-gradient-to-tr from-[#05010D]/60 via-transparent to-[#B026FF]/20" />
            <img
              src={ASSETS.hud}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-contain mix-blend-screen opacity-90"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 glass-strong rounded-2xl px-6 py-4 glow-md hidden sm:block">
            <div className="font-display font-bold text-xl text-gradient">+5 anos</div>
            <div className="font-mono-tech text-[10px] uppercase tracking-wide text-muted-foreground mt-1">de experiência digital</div>
          </div>
        </Reveal>

        <div>
          <Reveal dir="right">
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="eyebrow-line" />
              Quem Somos
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white mt-4">
              Inovação que move <span className="text-gradient">o seu negócio</span>
            </h2>
            <p className="text-muted-foreground mt-6 text-base md:text-lg font-light leading-relaxed">
              A SYSTEM O-JDEV desenvolve soluções digitais modernas para empresas que desejam crescer através
              da tecnologia. Unimos design premium, performance e inovação para entregar experiências memoráveis.
            </p>
          </Reveal>
          <Reveal dir="right" delay={0.15}>
            <ul className="mt-8 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-white/90">
                  <CheckCircle2 size={22} className="text-[#E35BFF] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
