import "@/App.css";
import { Toaster } from "sonner";
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
  return (
    <div className="App min-h-screen bg-[#05010D] text-white antialiased overflow-x-hidden">
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
