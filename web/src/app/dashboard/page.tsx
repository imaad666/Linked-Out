import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getData() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
      deletedAt: null,
    },
    orderBy: [
      { happenedAt: "desc" },
      { createdAt: "desc" },
    ],
  });

  return { user, posts };
}

export default async function DashboardPage() {
  const { user, posts } = await getData();

  const groups: Record<number, typeof posts> = posts.reduce(
    (acc: Record<number, typeof posts>, post: (typeof posts)[number]) => {
      const year = new Date(post.happenedAt).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {},
  );

  const years = Object.keys(groups)
    .map((y) => Number.parseInt(y, 10))
    .sort((a, b) => b - a);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-slate-800/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
              Linked Out / Dashboard
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Hey {user.displayName || "friend"},
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              This is your private log of wins, fuck ups, and weird milestones.
              No endorsements. No recruiters. Just your story.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/posts/new"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/80 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-[0_0_32px_rgba(56,189,248,0.8)] transition hover:brightness-110"
            >
              Log a new moment
            </Link>
          </div>
        </header>

        {posts.length === 0 ? (
          <section className="mt-6 rounded-3xl border border-dashed border-slate-700/80 bg-slate-950/40 p-8 text-center text-sm text-slate-300">
            <p className="mb-2 font-medium">
              Your archive is quiet. That’s okay.
            </p>
            <p className="mb-4 text-slate-400">
              Start by logging something tiny — a near‑miss, a small win, a
              weird moment that stuck with you.
            </p>
            <Link
              href="/posts/new"
              className="inline-flex items-center justify-center rounded-full border border-cyan-400/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200 hover:bg-cyan-500/10"
            >
              Log your first entry
            </Link>
          </section>
        ) : (
          <section className="space-y-6">
            {years.map((year) => (
              <div key={year} className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-300">
                    {year}
                  </h2>
                  <span className="h-px flex-1 bg-gradient-to-r from-slate-700/80 to-transparent" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {groups[year].map((post: (typeof posts)[number]) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="group rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4 text-left shadow-[0_0_32px_rgba(15,23,42,0.8)] transition hover:border-cyan-400/70 hover:shadow-[0_0_40px_rgba(56,189,248,0.6)]"
                    >
                      <div className="mb-2 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.18em]">
                        <span className="rounded-full px-2 py-0.5 text-slate-300">
                          {post.type.toLowerCase()}
                        </span>
                        <span className="text-slate-500">
                          {new Date(post.happenedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="mb-1 text-sm font-semibold text-slate-50">
                        {post.title}
                      </h3>
                      <p className="line-clamp-3 text-xs text-slate-400">
                        {post.body}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

