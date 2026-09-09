"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { about } = portfolioData;
  const initials = about.name.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-mono font-semibold">
          <span className="flex h-8 w-8 items-center justify-center border border-accent text-sm text-accent">
            {initials}
          </span>
          <span>{about.name}</span>
        </a>

        <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-wide text-muted md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={about.cvLink}
            className="border border-border px-4 py-2 text-sm transition hover:border-accent/60 hover:text-accent"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="btn-primary px-4 py-2 text-sm font-semibold text-black transition"
          >
            Contact Me
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4 text-sm text-muted">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="transition hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 px-4 py-2 text-center text-sm font-semibold text-black"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
