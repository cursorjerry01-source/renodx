// Shared static data + asset URLs for SYSTEM O-JDEV
import {
  Code2, Rocket, LayoutDashboard, Workflow, BrainCircuit, Server,
  Zap, ShieldCheck, TrendingUp, Headphones,
} from "lucide-react";

export const ASSETS = {
  logo: "https://customer-assets.emergentagent.com/job_a59f3b8a-daf3-423b-9691-7a7a4feeef0a/artifacts/owcbqn93_logo.png",
  heroCoin: "https://customer-assets.emergentagent.com/job_a59f3b8a-daf3-423b-9691-7a7a4feeef0a/artifacts/d6o2ffxn_Logo%2Bbase.png",
  cityBg: "https://customer-assets.emergentagent.com/job_neon-lab-3/artifacts/d7slosck_Background.png",
  card1: "https://customer-assets.emergentagent.com/job_neon-lab-3/artifacts/qx65kbml_card1.png",
  card2: "https://customer-assets.emergentagent.com/job_neon-lab-3/artifacts/56mo758r_card2.png",
  card3: "https://customer-assets.emergentagent.com/job_neon-lab-3/artifacts/ky6o7w5k_card3.png",
  hud: "https://customer-assets.emergentagent.com/job_neon-lab-3/artifacts/dyis2awp_hud-overlays.png",
};

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export const STATS = [
  { value: "120+", label: "Projetos Entregues" },
  { value: "98%", label: "Clientes Satisfeitos" },
  { value: "+200%", label: "Crescimento Médio" },
];

export const TECHS = [
  "Next.js", "React", "TypeScript", "Tailwind", "Node.js",
  "Prisma", "PostgreSQL", "Azure", "Docker", "Linux",
];

export const SERVICES = [
  { icon: Code2, title: "Desenvolvimento de Sites", desc: "Sites institucionais modernos, rápidos e otimizados para conversão." },
  { icon: Rocket, title: "Landing Pages", desc: "Páginas de alta conversão focadas em transformar visitantes em clientes." },
  { icon: LayoutDashboard, title: "Sistemas Web", desc: "Painéis administrativos e plataformas sob medida para o seu negócio." },
  { icon: Workflow, title: "Automações", desc: "Processos automatizados que economizam tempo e eliminam erros." },
  { icon: BrainCircuit, title: "IA Empresarial", desc: "Assistentes inteligentes e soluções de IA para acelerar resultados." },
  { icon: Server, title: "Hospedagem", desc: "Infraestrutura completa, segura e escalável na nuvem." },
];

const shot = (url) => `https://image.thum.io/get/width/800/crop/620/noanimate/${url}`;

export const PORTFOLIO = [
  {
    title: "Calculadora de Perda Óptica",
    category: "Redes FTTH",
    link: "https://calculadora-sinal-fibra.vercel.app/",
    image: shot("https://calculadora-sinal-fibra.vercel.app/"),
  },
  {
    title: "Sistema de Relatórios",
    category: "Gestão de Ordens de Serviço",
    link: "https://imicro-relatorio.vercel.app/",
    image: shot("https://imicro-relatorio.vercel.app/"),
  },
  {
    title: "Projeto Almanaque",
    category: "Análise e Monitoramento",
    link: "https://noc-top-unm2000.vercel.app/",
    image: shot("https://noc-top-unm2000.vercel.app/"),
  },
  {
    title: "Bifrost Protocol v1.0",
    category: "Firmware • IMICRO",
    link: "https://imicro-firmware.vercel.app/",
    image: shot("https://imicro-firmware.vercel.app/"),
  },
  {
    title: "Organizador de Endereços",
    category: "Automação",
    link: "https://endereco-organizador.vercel.app/",
    image: shot("https://endereco-organizador.vercel.app/"),
  },
  {
    title: "UTM para Lat/Long",
    category: "Conversor • Zona 23S",
    link: "https://um-ttolatitudelongitude.vercel.app/",
    image: shot("https://um-ttolatitudelongitude.vercel.app/"),
  },
  {
    title: "Planos e Serviços",
    category: "Tabela Comercial",
    link: "https://pre-o-tabela-servi-os.vercel.app/",
    image: shot("https://pre-o-tabela-servi-os.vercel.app/"),
  },
  {
    title: "Controle de Estoque Imicro",
    category: "Gestão de Inventário",
    link: "https://controle-estoque-new.lovable.app/login",
    image: shot("https://controle-estoque-new.lovable.app/login"),
  },
];

// Fallback thumbnail if a live screenshot fails to load
export const PORTFOLIO_FALLBACK = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80";

export const DIFFERENTIALS = [
  { icon: Zap, title: "Velocidade", desc: "Performance extrema com carregamento instantâneo." },
  { icon: ShieldCheck, title: "Segurança", desc: "Proteção de ponta a ponta dos seus dados." },
  { icon: TrendingUp, title: "Escalabilidade", desc: "Arquitetura pronta para crescer com você." },
  { icon: Headphones, title: "Suporte", desc: "Atendimento dedicado sempre que precisar." },
];

export const PROCESS = [
  { step: "01", title: "Planejamento", desc: "Entendemos o seu objetivo e definimos a estratégia." },
  { step: "02", title: "Design", desc: "Criamos interfaces premium e impactantes." },
  { step: "03", title: "Desenvolvimento", desc: "Codificamos com tecnologia de ponta." },
  { step: "04", title: "Entrega", desc: "Lançamos e acompanhamos os resultados." },
];

export const CONTACT_INFO = {
  whatsapp: "https://wa.me/5532999500769",
  whatsappLabel: "(32) 99950-0769",
  email: "contato@systemojdev.com",
  instagram: "https://instagram.com/systemojdev",
  instagramLabel: "@systemojdev",
  linkedin: "https://linkedin.com/company/systemojdev",
};
