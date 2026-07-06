import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MessageCircle, Mail, Instagram, Linkedin, Send, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { CONTACT_INFO } from "../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: CONTACT_INFO.whatsappLabel, href: CONTACT_INFO.whatsapp },
  { icon: Mail, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: Instagram, label: "Instagram", value: CONTACT_INFO.instagramLabel, href: CONTACT_INFO.instagram },
  { icon: Linkedin, label: "LinkedIn", value: "/systemojdev", href: CONTACT_INFO.linkedin },
];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", company: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("Preencha nome, telefone e mensagem.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Mensagem enviada! Em breve entraremos em contato.");
      setForm({ name: "", phone: "", company: "", message: "" });
    } catch (err) {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute top-1/4 left-0 h-80 w-80 rounded-full bg-[#B026FF]/12 blur-[130px]" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="eyebrow-line" />
              Fale conosco
              <span className="eyebrow-line" />
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white mt-4">Contato</h2>
            <p className="text-muted-foreground mt-4 text-base md:text-lg font-light">
              Conte sobre o seu projeto. Vamos transformar sua ideia em realidade.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal dir="left" className="space-y-4">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`contact-${c.label.toLowerCase()}`}
                  className="flex items-center gap-4 glass card-hover rounded-2xl p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(176,38,255,0.12)] border border-[rgba(176,38,255,0.3)] glow-sm">
                    <Icon size={22} className="text-[#E35BFF]" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{c.label}</div>
                    <div className="font-medium text-white">{c.value}</div>
                  </div>
                </a>
              );
            })}
          </Reveal>

          <Reveal dir="right">
            <form onSubmit={submit} data-testid="contact-form" className="glass-strong rounded-2xl p-7 lg:p-8 space-y-5 glow-sm">
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField name="name" label="Nome" value={form.name} onChange={handle} placeholder="Seu nome" />
                <FormField name="phone" label="Telefone" value={form.phone} onChange={handle} placeholder="(00) 00000-0000" />
              </div>
              <FormField name="company" label="Empresa" value={form.company} onChange={handle} placeholder="Nome da empresa (opcional)" />
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Mensagem</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  rows={4}
                  data-testid="contact-message"
                  placeholder="Conte sobre o seu projeto..."
                  className="w-full rounded-xl bg-[rgba(176,38,255,0.06)] border border-[rgba(176,38,255,0.25)] px-4 py-3 text-white placeholder:text-muted-foreground/60 outline-none focus:border-[#B026FF] focus:shadow-[0_0_22px_rgba(176,38,255,0.35)] transition-all duration-300 resize-none"
                />
              </div>
              <button type="submit" disabled={loading} data-testid="contact-submit" className="btn-primary w-full disabled:opacity-60">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const FormField = ({ name, label, value, onChange, placeholder }) => (
  <div>
    <label className="text-sm text-muted-foreground mb-2 block">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      data-testid={`contact-${name}`}
      className="w-full rounded-xl bg-[rgba(176,38,255,0.06)] border border-[rgba(176,38,255,0.25)] px-4 py-3 text-white placeholder:text-muted-foreground/60 outline-none focus:border-[#B026FF] focus:shadow-[0_0_22px_rgba(176,38,255,0.35)] transition-all duration-300"
    />
  </div>
);
