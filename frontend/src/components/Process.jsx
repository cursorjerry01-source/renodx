import { ChevronRight } from "lucide-react";
import { PROCESS } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Services";

export const Process = () => {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <SectionHeading kicker="Como trabalhamos" title="Nosso Processo" />
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-3 items-stretch">
          {PROCESS.map((p, i) => (
            <div key={p.step} className="flex items-center gap-3">
              <Reveal dir="up" delay={i * 0.1} className="flex-1">
                <div data-testid="process-step" className="glass card-hover rounded-2xl p-7 h-full">
                  <div className="font-display font-extrabold text-4xl text-gradient">{p.step}</div>
                  <h3 className="font-display font-bold text-lg text-white mt-3">{p.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
              {i < PROCESS.length - 1 && (
                <ChevronRight className="hidden lg:block text-[#B026FF] shrink-0" size={26} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
