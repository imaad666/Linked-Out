import Link from "next/link";

export function MainHeader() {
  return (
    <header className="border-b border-[#084482] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#0a66c2]">
            <span className="text-xs font-black tracking-tight text-white">
              in
            </span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#0a66c2]">
            Linked&nbsp;Out
          </span>
        </Link>

        <nav className="flex items-center gap-3 text-sm font-medium">
          <Link
            href="/register"
            className="rounded-full px-3 py-1.5 text-[#0a66c2] hover:bg-[#e8f3ff]"
          >
            Join now
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-[#0a66c2] px-4 py-1.5 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}

