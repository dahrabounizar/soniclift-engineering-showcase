import { useState } from "react";
import { Send, Mail, Building2, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { toast } from "sonner";

const INFO = [
  { icon: Mail, label: "Email", value: "contact@soniclift.edu" },
  { icon: Building2, label: "Institution", value: "[Nom de l'établissement]" },
  { icon: MapPin, label: "Localisation", value: "Maroc" },
];

export const Contact = () => {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé", {
      description: "Merci, nous reviendrons vers vous rapidement.",
    });
    setForm({ nom: "", email: "", sujet: "", message: "" });
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <section id="contact" className="section">
      <div className="max-w-[680px] mx-auto">
        <Reveal className="text-center">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Prenez Contact
          </h2>
          <p className="mt-5 text-steel">
            Pour toute question sur le projet SonicLift ou une collaboration avec
            notre équipe.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid sm:grid-cols-3 gap-5">
          {INFO.map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass rounded-xl p-5 text-center">
              <Icon size={20} className="mx-auto text-primary" />
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel">
                {label}
              </p>
              <p className="mt-1.5 text-sm text-foreground break-words">{value}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                className="field"
                placeholder="Nom complet"
                value={form.nom}
                onChange={update("nom")}
              />
              <input
                required
                type="email"
                className="field"
                placeholder="Adresse e-mail"
                value={form.email}
                onChange={update("email")}
              />
            </div>
            <input
              required
              className="field"
              placeholder="Sujet"
              value={form.sujet}
              onChange={update("sujet")}
            />
            <textarea
              required
              rows={4}
              className="field resize-none"
              placeholder="Votre message"
              value={form.message}
              onChange={update("message")}
            />
            <button type="submit" className="btn-amber w-full">
              Envoyer le Message <Send size={16} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
