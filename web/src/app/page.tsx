import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-56px)] items-start justify-center bg-[#0a66c2] px-4 py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
        <section className="space-y-6 pt-4 text-white">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Welcome to your
            <span className="block text-[#e5f0ff]">
              non‑career community.
            </span>
          </h1>
          <p className="max-w-md text-lg leading-snug text-[#e5f0ff]">
            Linked Out is where you log the wins, fuck ups, and weird milestones
            that will never fit on a resume.
          </p>
          <p className="max-w-lg text-sm leading-relaxed text-[#e5f0ff]/90">
            Share the honest version of your story. No endorsements. No job
            titles. Just the moments that actually shaped you.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[#e5f0ff]">
            <li>• Capture wins, failures, and lessons.</li>
            <li>• Keep it private by default, or share selectively.</li>
            <li>• Look back later and see how far you’ve actually come.</li>
          </ul>
        </section>

        <section className="rounded-lg bg-white p-6 text-[#0a66c2] shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">
            Log your next moment.
          </h2>
          <p className="mb-6 text-sm text-[#084482]">
            Join to start building your life log — tiny wins, spectacular
            failures, and everything in between.
          </p>
          <div className="space-y-3">
            <Link
              href="/register"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0a66c2] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004182]"
            >
              Join Linked Out
            </Link>
            <Link
              href="/login"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#0a66c2] px-4 py-2.5 text-sm font-semibold text-[#0a66c2] hover:bg-[#e8f3ff]"
            >
              Sign in
            </Link>
          </div>
          <p className="mt-6 text-xs text-[#084482]">
            By continuing, you agree not to treat this like LinkedIn.
            No networking hacks. Just honesty.
          </p>
        </section>
      </div>
    </main>
  );
}


