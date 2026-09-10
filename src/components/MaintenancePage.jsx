import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function MaintenancePage() {
  const { about } = portfolioData;
  const initials = about.name.slice(0, 2).toUpperCase();

  const links = [
    { key: "email", href: about.socials.email, label: "Email", Icon: Mail },
    { key: "github", href: about.socials.github, label: "GitHub", Icon: FaGithub },
    { key: "linkedin", href: about.socials.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  ].filter((l) => l.href);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#faf6f1] px-6 text-center text-[#2b211c]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#2b211c]/12 text-sm font-semibold tracking-wide text-[#2b211c]/80">
        {initials}
      </div>

      <span className="mt-6 flex items-center gap-2 rounded-full border border-[#2b211c]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#c2410c]/90">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c2410c]" />
        Under construction
      </span>

      <h1 className="mt-6 text-2xl font-semibold sm:text-3xl">
        {about.name}&apos;s portfolio is getting rebuilt.
      </h1>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#7c6b5d]">
        A new version is on the way. In the meantime, feel free to reach out
        directly below.
      </p>

      {links.length > 0 && (
        <div className="mt-8 flex gap-4">
          {links.map(({ key, href, label, Icon }) => (
            <a
              key={key}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2b211c]/10 text-[#7c6b5d] transition hover:border-[#2b211c]/25 hover:text-[#2b211c]"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
