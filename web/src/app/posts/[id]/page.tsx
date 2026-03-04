import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PostEditor } from "@/components/posts/PostEditor";

type PostPageProps = {
  params: { id: string };
};

async function getData(postId: string) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    redirect(`/login?callbackUrl=/posts/${postId}`);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect(`/login?callbackUrl=/posts/${postId}`);
  }

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      userId: user.id,
      deletedAt: null,
    },
  });

  if (!post) notFound();

  return { user, post };
}

export default async function PostPage({ params }: PostPageProps) {
  const { user, post } = await getData(params.id);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            {post.type.toLowerCase()} ·{" "}
            {new Date(post.happenedAt).toLocaleDateString()}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            {post.title}
          </h1>
          <p className="text-xs text-slate-500">
            Logged by{" "}
            <span className="text-slate-200">{user.displayName}</span>
          </p>
        </header>

        <section className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-5 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
          <PostEditor post={post} />
        </section>

        <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
          <Link
            href="/dashboard"
            className="underline-offset-4 hover:text-slate-200 hover:underline"
          >
            Back to your archive
          </Link>
        </div>
      </div>
    </main>
  );
}

