import { FaGithub, FaLinkedin, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { SiViber } from "react-icons/si";
import { Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function Footer() {
  const { about } = portfolioData;
  const socials = [
    { key: "github", href: about.socials.github, Icon: FaGithub },
    { key: "linkedin", href: about.socials.linkedin, Icon: FaLinkedin },
    { key: "email", href: about.socials.email, Icon: Mail },
    { key: "whatsapp", href: about.socials.whatsapp, Icon: FaWhatsapp },
    { key: "viber", href: about.socials.viber, Icon: SiViber },
    { key: "facebook", href: about.socials.facebook, Icon: FaFacebook },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {about.name} — built with Next.js &amp;
          Supabase.
        </p>

        <div className="flex gap-4">
          {socials.map(({ key, href, Icon }) => (
            <a
              key={key}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="text-muted transition hover:text-accent"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
