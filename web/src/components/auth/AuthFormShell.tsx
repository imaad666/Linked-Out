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
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-[#0a66c2] px-4 py-10">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-[#0a66c2] shadow-md sm:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
                {title}
              </h1>
          <p className="mt-2 text-sm text-[#084482]">
            {subtitle}
          </p>
        </div>

        {children}

        <p className="mt-6 text-center text-xs text-[#084482]">
          {mode === "login" ? "New here?" : "Already archived some chaos?"}{" "}
          <Link
            href={oppositeMode === "login" ? "/login" : "/register"}
            className="font-semibold text-[#0a66c2] hover:underline"
          >
            {oppositeMode === "login"
              ? "Sign in to your archive"
              : "Create an account"}
          </Link>
        </p>
      </div>
    </div>
  );
}

