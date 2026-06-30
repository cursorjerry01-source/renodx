import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { STATS, ASSETS } from "../data";
import { Reveal } from "./Reveal";

export const Hero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* Background city */}
      <div className="absolute inset-0 -z-10">
        <img src={ASSETS.cityBg} alt="" className="absolute right-0 top-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05010D] via-[#05010D]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05010D]/70 via-transparent to-[#05010D]" />
      </div>
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-[#B026FF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#E35BFF]/15 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left copy */}
        <div>
          <Reveal dir="left">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs md:text-sm font-medium text-secondary glow-sm">
              <Zap size={15} className="text-[#E35BFF]" /> Desenvolvimento de Alto Impacto
            </span>
          </Reveal>

          <Reveal dir="left" delay={0.1}>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mt-6 text-white">
              Transformamos ideias em{" "}
              <span className="text-gradient text-glow">sistemas poderosos</span> e{" "}
              <span className="text-gradient text-glow">experiências incríveis</span>.
            </h1>
          </Reveal>

          <Reveal dir="left" delay={0.2}>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Desenvolvimento de soluções digitais personalizadas com tecnologia, performance e inovação.
            </p>
          </Reveal>

          <Reveal dir="left" delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#servicos" data-testid="hero-services-btn" className="btn-primary">
                Nossos Serviços <ArrowRight size={18} />
              </a>
              <a href="#portfolio" data-testid="hero-portfolio-btn" className="btn-ghost">
                Ver Portfólio
              </a>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal dir="up" delay={0.45}>
            <div className="mt-14 grid grid-cols-3 gap-4 max-w-xl">
              {STATS.map((s) => (
                <div key={s.label} data-testid="stat-card" className="glass card-hover rounded-2xl p-4 lg:p-5">
                  <div className="font-display font-extrabold text-2xl lg:text-3xl text-gradient">{s.value}</div>
                  <div className="text-[11px] lg:text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right hero image */}
        <Reveal dir="scale" delay={0.2} className="relative flex justify-center">
          <div className="pointer-events-none absolute inset-0 m-auto h-[70%] w-[70%] rounded-full bg-[#B026FF]/25 blur-[90px]" />
          <motion.img
            src={ASSETS.heroCoin}
            alt="SYSTEM O-JDEV 3D"
            className="relative z-10 w-[78%] sm:w-[62%] lg:w-[92%] max-w-lg drop-shadow-[0_0_45px_rgba(176,38,255,0.55)]"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Floating neon code panels */}
          <motion.img
            src={ASSETS.card1}
            alt=""
            className="absolute -top-2 left-0 lg:-left-8 w-28 lg:w-44 mix-blend-screen drop-shadow-[0_0_25px_rgba(176,38,255,0.5)] hidden sm:block pointer-events-none z-20"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={ASSETS.card2}
            alt=""
            className="absolute bottom-8 -right-2 lg:-right-10 w-28 lg:w-44 mix-blend-screen drop-shadow-[0_0_25px_rgba(176,38,255,0.5)] hidden sm:block pointer-events-none z-20"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={ASSETS.card3}
            alt=""
            className="absolute top-1/3 -right-4 lg:-right-16 w-20 lg:w-32 mix-blend-screen drop-shadow-[0_0_25px_rgba(214,70,255,0.55)] hidden md:block pointer-events-none z-20"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </Reveal>
      </div>
    </section>
  );
};
