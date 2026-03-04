import Link from "next/link";
import type { ReactNode } from "react";

type AuthFormShellProps = {
  title: string;
  subtitle: string;
  mode: "login" | "register";
  children: ReactNode;
};

export function AuthFormShell({
  title,
  subtitle,
  mode,
  children,
}: AuthFormShellProps) {
  const oppositeMode = mode === "login" ? "register" : "login";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#030712] to-black text-slate-100">
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(129,140,248,0.32),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.7)_1px,transparent_1px)] bg-[size:60px_60px] mix-blend-soft-light opacity-70" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-slate-800/80 bg-black/50 p-6 shadow-[0_0_80px_rgba(30,64,175,0.7)] backdrop-blur-xl sm:p-8">
          <div className="mb-7 flex items-center justify-between gap-2">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300">
                <span className="h-[2px] w-4 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500" />
                <span>Linked Out</span>
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                {title}
              </h1>
              <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                {subtitle}
              </p>
            </div>

            <div className="hidden text-right text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 sm:block">
              <div>Outer Network</div>
              <div className="text-slate-300">v0.0.1-prelaunch</div>
            </div>
          </div>

          <div className="mb-5 h-px bg-gradient-to-r from-transparent via-slate-700/80 to-transparent" />

          {children}

          <p className="mt-6 text-center text-xs text-slate-400">
            {mode === "login" ? "New here?" : "Already archived some chaos?"}{" "}
            <Link
              href={oppositeMode === "login" ? "/login" : "/register"}
              className="font-medium text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
            >
              {oppositeMode === "login"
                ? "Sign in to your archive"
                : "Create an account"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

