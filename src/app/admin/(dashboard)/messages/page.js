import { Mail, Inbox, Clock, TrendingUp } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import Reveal from "@/components/Reveal";
import AdminPageHeader from "../AdminPageHeader";
import AdminStatCard from "../AdminStatCard";

export const dynamic = "force-dynamic";

async function getMessages() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { messages: [], error: "Supabase isn't configured." };

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { messages: [], error: error.message };
  return { messages: data ?? [], error: null };
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatRelative(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

function initials(name) {
  return (name || "?").trim().charAt(0).toUpperCase();
}

function computeStats(messages) {
  const now = Date.now();
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const thisWeek = messages.filter(
    (m) => now - new Date(m.created_at).getTime() <= weekMs
  ).length;
  const latest = messages[0]?.created_at;

  return [
    { label: "Total inquiries", value: messages.length, icon: Inbox },
    { label: "This week", value: thisWeek, icon: TrendingUp },
    {
      label: "Latest",
      value: latest ? formatRelative(latest) : "—",
      icon: Clock,
    },
  ];
}

export default async function AdminMessagesPage() {
  const { messages, error } = await getMessages();
  const stats = computeStats(messages);

  return (
    <div>
      <AdminPageHeader
        icon={Mail}
        title="Inquiries"
        count={messages.length}
        description="Messages submitted through the portfolio contact form."
      />

      <Reveal
          delay={0.08}
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <AdminStatCard key={label} label={label} value={value} icon={Icon} />
          ))}
        </Reveal>

        {error && (
          <p className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500">
            Couldn&apos;t load messages: {error}
          </p>
        )}

        {!error && messages.length === 0 && (
          <Reveal
            delay={0.12}
            className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-16 text-center"
          >
            <span className="glass flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted">
              <Inbox size={20} />
            </span>
            <p className="text-sm text-muted">
              No messages yet. They&apos;ll show up here as soon as someone
              uses the contact form.
            </p>
          </Reveal>
        )}

        <div className="mt-6 space-y-4">
          {messages.map((m, index) => (
            <Reveal key={m.id} delay={Math.min(index, 6) * 0.05}>
              <article className="card-hover rounded-2xl border border-border bg-surface p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent">
                      {initials(m.name)}
                    </span>
                    <div>
                      <p className="font-semibold leading-tight">{m.name}</p>
                      <a
                        href={`mailto:${m.email}`}
                        className="text-sm text-accent transition hover:brightness-125"
                      >
                        {m.email}
                      </a>
                    </div>
                  </div>
                  <span
                    className="glass shrink-0 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
                    title={formatDate(m.created_at)}
                  >
                    {formatRelative(m.created_at)}
                  </span>
                </div>
                <p className="mt-4 whitespace-pre-wrap border-t border-border pt-4 text-sm leading-relaxed text-muted">
                  {m.message}
                </p>
              </article>
            </Reveal>
          ))}
      </div>
    </div>
  );
}
