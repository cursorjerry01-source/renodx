import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS, ASSETS } from "../data";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong glow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-[72px] flex items-center justify-between">
        <a href="#inicio" data-testid="logo-link" className="flex items-center gap-3 group">
          <img src={ASSETS.logo} alt="SYSTEM O-JDEV" className="h-10 w-10 rounded-full object-cover glow-sm group-hover:scale-105 transition-transform duration-300" />
          <div className="leading-tight">
            <div className="font-display font-bold text-white tracking-wide text-[13px] md:text-sm">SYSTEM O-JDEV</div>
            <div className="font-mono-tech text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Soluções Digitais</div>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className="relative text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-[#B026FF] after:to-[#E35BFF] after:transition-all after:duration-300 hover:[text-shadow:0_0_18px_rgba(214,70,255,0.7)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href="#contato" data-testid="header-cta" className="btn-primary text-sm">
            Fale Conosco <ArrowRight size={16} />
          </a>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          className="lg:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden glass-strong border-t border-[rgba(176,38,255,0.2)] px-5 py-6">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block text-base text-muted-foreground hover:text-white transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contato" onClick={() => setOpen(false)} className="btn-primary w-full mt-2">
                Fale Conosco <ArrowRight size={16} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
