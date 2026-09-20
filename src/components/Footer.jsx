import { FaGithub, FaLinkedin, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { SiViber } from "react-icons/si";
import { Mail } from "lucide-react";

export default function Footer({ about }) {
  // Every entry carries a label: these render as icons only, so the
  // label is the sole accessible name the link has.
  const socials = [
    { key: "github", href: about.socials.github, label: "GitHub", Icon: FaGithub },
    { key: "linkedin", href: about.socials.linkedin, label: "LinkedIn", Icon: FaLinkedin },
    { key: "email", href: about.socials.email, label: "Email", Icon: Mail },
    { key: "whatsapp", href: about.socials.whatsapp, label: "WhatsApp", Icon: FaWhatsapp },
    { key: "viber", href: about.socials.viber, label: "Viber", Icon: SiViber },
    { key: "facebook", href: about.socials.facebook, label: "Facebook", Icon: FaFacebook },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {about.name} — built with Next.js &amp;
          Supabase.
        </p>

        <nav aria-label="Social links" className="flex gap-2">
          {socials.map(({ key, href, label, Icon }) => {
            const isExternal = !href.startsWith("mailto:");
            return (
              <a
                key={key}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={isExternal ? `${label} (opens in a new tab)` : label}
                className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:bg-surface-2 hover:text-accent"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
