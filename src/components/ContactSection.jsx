"use client";

import { useActionState } from "react";
import { Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { SiViber } from "react-icons/si";
import { submitContactMessage } from "@/app/actions";
import { portfolioData } from "@/data/portfolioData";

const initialState = { status: "idle" };

const SOCIAL_LINKS = (socials) => [
  { key: "github", href: socials.github, label: "GitHub", Icon: FaGithub },
  { key: "linkedin", href: socials.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { key: "whatsapp", href: socials.whatsapp, label: "WhatsApp", Icon: FaWhatsapp },
  { key: "viber", href: socials.viber, label: "Viber", Icon: SiViber },
  { key: "facebook", href: socials.facebook, label: "Facebook", Icon: FaFacebook },
];

export default function ContactSection() {
  const [state, formAction, pending] = useActionState(
    submitContactMessage,
    initialState
  );
  const { about } = portfolioData;
  const links = SOCIAL_LINKS(about.socials).filter((l) => l.href);

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
            Available for new projects
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Let&apos;s Build Something <span className="text-gradient">Together.</span>
          </h2>
          <p className="mt-4 text-muted">
            Have a role, a project, or an idea in mind? Send a message and
            I&apos;ll get back to you, or reach out directly below.
          </p>

          <a
            href={about.socials.email}
            className="mt-6 flex w-fit items-center gap-2 text-sm text-accent transition hover:brightness-125"
          >
            <Mail size={16} />
            {about.socials.email.replace("mailto:", "")}
          </a>

          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map(({ key, href, label, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:border-accent/60 hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          )}
        </div>

        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent/60"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent/60"
            />
          </div>
          <textarea
            name="message"
            placeholder="Tell me about your project..."
            required
            rows={5}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent/60"
          />

          <button
            type="submit"
            disabled={pending}
            className="btn-primary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Sending..." : "Send Message"}
            <Send size={15} />
          </button>

          {state.status === "success" && (
            <p className="text-sm text-live">
              Thanks! Your message is in &mdash; I&apos;ll reply soon.
            </p>
          )}
          {state.status === "error" && (
            <p className="text-sm text-red-400">{state.error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
