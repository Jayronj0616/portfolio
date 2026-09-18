"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Gauge, Mail, FolderKanban, Quote, FileText, LogOut } from "lucide-react";
import { adminLogout } from "@/app/admin/actions";

const NAV = [
  { href: "/admin/overview", label: "Overview", icon: Gauge },
  { href: "/admin/messages", label: "Inquiries", icon: Mail },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/site", label: "Site text", icon: FileText },
];

export default function AdminSidebar({ name }) {
  const pathname = usePathname();
  const initials = (name || "?").slice(0, 2).toUpperCase();

  return (
    <aside className="lg:sticky lg:top-8 lg:h-fit lg:w-56 lg:shrink-0">
      <div className="glass flex items-center gap-2.5 rounded-2xl border border-border px-4 py-3 lg:hidden">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-semibold text-white">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Admin
          </p>
        </div>
      </div>

      <div className="glass mt-3 flex gap-1 overflow-x-auto rounded-2xl border border-border p-1.5 lg:mt-0 lg:flex-col lg:overflow-visible">
        <div className="hidden items-center gap-2.5 px-3 pb-4 pt-2 lg:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-semibold text-white">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Admin
            </p>
          </div>
        </div>

        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              {active && (
                <span className="absolute inset-y-1.5 left-0 hidden w-[3px] rounded-full bg-accent lg:block" />
              )}
              <Icon size={16} />
              {label}
            </Link>
          );
        })}

        <form action={adminLogout} className="contents">
          <button
            type="submit"
            className="mt-0 flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-foreground lg:mt-2 lg:border-t lg:border-border lg:pt-4"
          >
            <LogOut size={16} />
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
