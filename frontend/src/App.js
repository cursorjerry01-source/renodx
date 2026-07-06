import "@/App.css";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Loader } from "@/components/Loader";
import { CursorGlow } from "@/components/CursorGlow";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Differentials } from "@/components/Differentials";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { CtaPremium } from "@/components/CtaPremium";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

function App() {
  useEffect(() => {
    const onDown = (e) => {
      const target = e.target.closest(".btn-primary, .btn-ghost, .ripple");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const span = document.createElement("span");
      span.className = "ripple-ink";
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${e.clientX - rect.left - size / 2}px`;
      span.style.top = `${e.clientY - rect.top - size / 2}px`;
      target.appendChild(span);
      setTimeout(() => span.remove(), 800);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div className="App min-h-screen text-white antialiased overflow-x-hidden">
      <Loader />
      <CursorGlow />
      <Toaster position="top-right" theme="dark" richColors />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <Portfolio />
        <Differentials />
        <Process />
        <About />
        <CtaPremium />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
