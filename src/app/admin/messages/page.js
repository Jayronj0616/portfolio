import { redirect } from "next/navigation";
import { Mail, LogOut } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { adminLogout } from "@/app/admin/actions";

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

export default async function AdminMessagesPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const { messages, error } = await getMessages();

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-muted">
              <Mail size={16} />
              <span className="font-mono text-xs uppercase tracking-[0.15em]">
                Admin
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold">
              Inquiries
              <span className="ml-2 text-base font-normal text-muted">
                ({messages.length})
              </span>
            </h1>
          </div>

          <form action={adminLogout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
            >
              <LogOut size={14} />
              Log out
            </button>
          </form>
        </div>

        {error && (
          <p className="mt-8 text-sm text-red-500">
            Couldn&apos;t load messages: {error}
          </p>
        )}

        {!error && messages.length === 0 && (
          <p className="mt-8 text-sm text-muted">
            No messages yet. They&apos;ll show up here as soon as someone uses
            the contact form.
          </p>
        )}

        <div className="mt-8 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold">{m.name}</p>
                <p className="font-mono text-xs text-muted">
                  {formatDate(m.created_at)}
                </p>
              </div>
              <a
                href={`mailto:${m.email}`}
                className="text-sm text-accent transition hover:brightness-125"
              >
                {m.email}
              </a>
              <p className="mt-3 whitespace-pre-wrap text-sm text-muted">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
