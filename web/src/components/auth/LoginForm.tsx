"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard",
      });

      if (!result || result.error) {
        setError("We couldn’t match that email/password combo.");
        setSubmitting(false);
        return;
      }

      router.push(result.url ?? "/dashboard");
      router.refresh();
    } catch (e) {
      console.error(e);
      setError("Something glitched in the ether. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 shadow-[0_0_20px_rgba(15,23,42,0.9)] outline-none ring-0 transition focus:border-cyan-400/80 focus:bg-slate-900 focus:shadow-[0_0_40px_rgba(56,189,248,0.45)]"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 shadow-[0_0_20px_rgba(15,23,42,0.9)] outline-none ring-0 transition focus:border-cyan-400/80 focus:bg-slate-900 focus:shadow-[0_0_40px_rgba(56,189,248,0.45)]"
        />
      </div>

      {error && (
        <p className="text-xs text-rose-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/80 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.8)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Entering..." : "Enter archive"}
      </button>
    </form>
  );
}

