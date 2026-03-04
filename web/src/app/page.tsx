import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(129,140,248,0.32),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.75)_1px,transparent_1px)] bg-[size:70px_70px] mix-blend-soft-light opacity-70" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-12 sm:gap-16 md:flex-row md:items-center md:justify-between">
        <section className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300">
            <span className="h-[2px] w-8 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500" />
            <span>Outer network protocol</span>
            <span className="text-cyan-300">Signal: online</span>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Linked Out
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              The anti‑LinkedIn for
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                wins, fuck ups &amp; weird milestones.
              </span>
            </h1>
          </div>

          <p className="max-w-lg text-sm leading-relaxed text-slate-300/90 sm:text-base">
            A quiet little corner of the network where you can log the stuff
            that never makes it onto a resume — the near‑misses, the plot
            twists, the tiny victories, and the lessons that actually shaped
            you.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/80 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.8)] transition hover:brightness-110"
            >
              Enter your archive
            </Link>
            <Link
              href="/login"
              className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300 hover:text-slate-100"
            >
              I already have one
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-[10px] uppercase tracking-[0.16em] text-slate-400 sm:text-[11px]">
            <div className="space-y-1">
              <p className="text-slate-500">This is not</p>
              <p className="text-slate-200">
                No endorsements. No humblebrags. No growth hacks.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-slate-500">This is for</p>
              <p className="text-slate-200">
                The honest log of how your life actually feels.
              </p>
            </div>
          </div>
        </section>

        <section
          className="relative mx-auto w-full max-w-sm rounded-3xl border border-slate-700/70 bg-black/60 p-5 shadow-[0_0_70px_rgba(30,64,175,0.7)] backdrop-blur-xl sm:p-6"
          aria-hidden="true"
        >
          <div className="mb-4 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
            <span>Personal event log</span>
            <span className="text-cyan-300">v0.0.1-prelaunch</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Tiny win
                </span>
                <span className="text-[10px] text-slate-400">Today · Private</span>
              </div>
              <p className="text-slate-100">Got out of bed before noon.</p>
              <p className="mt-1 text-[11px] text-slate-400">
                Not groundbreaking. Still counts.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-300">
                  Fuck up
                </span>
                <span className="text-[10px] text-slate-400">
                  Yesterday · Private
                </span>
              </div>
              <p className="text-slate-100">
                Sent a risky text and instantly regretted it.
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Future me will probably laugh. Right now: ouch.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">
                  Weird milestone
                </span>
                <span className="text-[10px] text-slate-400">
                  2021 · Unlisted
                </span>
              </div>
              <p className="text-slate-100">
                Realized I’ve lived three completely different lives already.
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                No promotion. Just perspective.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

