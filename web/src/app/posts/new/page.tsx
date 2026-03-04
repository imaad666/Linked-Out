import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Link from "next/link";
import { NewPostForm } from "@/components/posts/NewPostForm";

export default async function NewPostPage() {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    redirect("/login?callbackUrl=/posts/new");
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Log a moment
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            What happened out there?
          </h1>
          <p className="text-sm text-slate-400">
            Capture it while it’s still fresh — no polish needed. This stays
            yours unless you say otherwise.
          </p>
        </header>

        <NewPostForm />

        <div className="pt-2 text-xs text-slate-500">
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

