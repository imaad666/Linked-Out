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
    <main className="min-h-[calc(100vh-56px)] bg-[#0a66c2]/10 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl gap-4 lg:gap-6">
        {/* Left sidebar */}
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="overflow-hidden rounded-lg border border-[#d0e3ff] bg-white text-[#0a66c2]">
            <div className="h-14 bg-[#0a66c2]" />
            <div className="px-4 pb-4 pt-6">
              <h2 className="text-sm font-semibold text-[#084482]">
                {user.displayName || "Linked Out member"}
              </h2>
              <p className="mt-1 text-xs text-[#084482]/80">
                Archiving wins, fuck ups, and everything in between.
              </p>
            </div>
          </div>
        </aside>

        {/* Main feed */}
        <section className="flex-1 space-y-4">
          <div className="rounded-lg border border-[#d0e3ff] bg-white p-4 text-[#0a66c2]">
            <p className="mb-3 text-sm font-semibold text-[#084482]">
              Share a moment
            </p>
            <Link
              href="/posts/new"
              className="inline-flex w-full items-center justify-start rounded-full border border-[#0a66c2] bg-white px-4 py-2 text-left text-sm text-[#757575] hover:bg-[#e8f3ff]"
            >
              Log a win, a fuck up, or a weird milestone...
            </Link>
          </div>

          {posts.length === 0 ? (
            <section className="rounded-lg border border-dashed border-[#d0e3ff] bg-white p-6 text-center text-sm text-[#084482]">
              <p className="mb-2 font-semibold">
                Your feed is empty. That’s kind of the point.
              </p>
              <p className="mb-4 text-xs text-[#084482]/80">
                Start by logging something tiny — a near‑miss, a small win, a
                weird moment that stuck with you.
              </p>
              <Link
                href="/posts/new"
                className="inline-flex items-center justify-center rounded-full border border-[#0a66c2] px-4 py-2 text-xs font-semibold text-[#0a66c2] hover:bg-[#e8f3ff]"
              >
                Log your first entry
              </Link>
            </section>
          ) : (
            <section className="space-y-4">
              {years.map((year) => (
                <div key={year} className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#084482]/80">
                      {year}
                    </span>
                    <span className="h-px flex-1 bg-[#d0e3ff]" />
                  </div>
                  <div className="space-y-3">
                    {groups[year].map((post: (typeof posts)[number]) => (
                      <article
                        key={post.id}
                        className="rounded-lg border border-[#d0e3ff] bg-white p-4 text-[#084482]"
                      >
                        <div className="mb-1 flex items-center justify-between text-[11px] text-[#084482]/70">
                          <span className="font-semibold">
                            {post.type.toLowerCase()}
                          </span>
                          <span>
                            {new Date(post.happenedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Link href={`/posts/${post.id}`}>
                          <h3 className="mb-1 text-sm font-semibold text-[#0a66c2]">
                            {post.title}
                          </h3>
                          <p className="line-clamp-3 text-xs text-[#084482]/80">
                            {post.body}
                          </p>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </section>

        {/* Right sidebar placeholder */}
        <aside className="hidden w-64 flex-shrink-0 md:block">
          <div className="rounded-lg border border-[#d0e3ff] bg-white p-4 text-xs text-[#084482]">
            <p className="mb-2 font-semibold text-[#0a66c2]">
              Need a prompt?
            </p>
            <ul className="space-y-1">
              <li>• A small win you almost ignored.</li>
              <li>• A mistake you’re still thinking about.</li>
              <li>• A weird milestone you didn’t see coming.</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}

