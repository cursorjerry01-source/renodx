import { MessageCircle, Mail, Instagram, Linkedin } from "lucide-react";
import { NAV_LINKS, ASSETS, CONTACT_INFO } from "../data";

const socials = [
  { icon: MessageCircle, href: CONTACT_INFO.whatsapp },
  { icon: Mail, href: `mailto:${CONTACT_INFO.email}` },
  { icon: Instagram, href: CONTACT_INFO.instagram },
  { icon: Linkedin, href: CONTACT_INFO.linkedin },
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-[rgba(176,38,255,0.18)] pt-16 pb-8">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-40 w-[60%] rounded-full bg-[#B026FF]/10 blur-[120px]" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img src={ASSETS.logo} alt="SYSTEM O-JDEV" className="h-11 w-11 rounded-full object-cover glow-sm" />
              <div>
                <div className="font-display font-extrabold text-white">SYSTEM O-JDEV</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Soluções Digitais</div>
              </div>
            </div>
            <p className="text-muted-foreground mt-5 text-sm leading-relaxed max-w-xs">
              Soluções digitais modernas com tecnologia, performance e inovação para empresas que querem crescer.
            </p>
          </div>

          <div className="md:justify-self-center">
            <h4 className="font-display font-bold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:justify-self-end">
            <h4 className="font-display font-bold text-white mb-4">Redes Sociais</h4>
            <div className="flex gap-3">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="footer-social"
                    className="flex h-11 w-11 items-center justify-center rounded-xl glass hover:border-[rgba(214,70,255,0.6)] hover:glow-sm hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon size={20} className="text-[#E35BFF]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[rgba(176,38,255,0.15)] text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SYSTEM O-JDEV. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
