"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ about }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const initials = about.name.slice(0, 2).toUpperCase();

  // Highlights the link for whichever section crosses the middle of the
  // viewport. Every section is watched, including the ones with no link
  // (the hero, Certifications), so reaching one of those clears the
  // highlight instead of leaving the previous section lit.
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="glass shadow-panel mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-border px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm text-white">
            {initials}
          </span>
          <span>{about.name}</span>
        </a>

        <div className="hidden items-center gap-1 text-sm font-medium text-muted md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "location" : undefined}
              className="rounded-full px-3.5 py-1.5 transition hover:bg-surface-2 hover:text-foreground aria-[current]:bg-surface-2 aria-[current]:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={about.cvLink}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-accent/40 hover:text-accent"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="btn-primary rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Contact Me
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-foreground md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="glass shadow-panel mx-auto mt-2 max-w-5xl rounded-2xl border border-border px-6 py-6 md:hidden">
          <div className="flex flex-col gap-1 text-sm text-muted">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active === link.href ? "location" : undefined}
                className="-mx-2 flex min-h-11 items-center rounded-lg px-2 transition hover:bg-surface-2 hover:text-foreground aria-[current]:text-foreground aria-[current]:font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={about.cvLink}
              onClick={() => setOpen(false)}
              className="-mx-2 flex min-h-11 items-center rounded-lg px-2 transition hover:bg-surface-2 hover:text-foreground"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 flex min-h-11 items-center justify-center rounded-full px-4 text-center text-sm font-semibold text-white"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
