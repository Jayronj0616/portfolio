"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { adminLogin } from "@/app/admin/actions";

const initialState = { status: "idle" };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(
    adminLogin,
    initialState
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-surface p-8">
        <div className="flex items-center gap-2 text-muted">
          <Lock size={16} />
          <span className="font-mono text-xs uppercase tracking-[0.15em]">
            Admin
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-bold">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Enter the admin password to continue.
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoFocus
            className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          />

          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>

          {state.status === "error" && (
            <p className="text-sm text-danger">{state.error}</p>
          )}
        </form>
      </div>
    </main>
  );
}
