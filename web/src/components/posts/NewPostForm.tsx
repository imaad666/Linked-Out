"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const TYPES = [
  { value: "WIN", label: "Win" },
  { value: "FAIL", label: "Fuck up" },
  { value: "WEIRD", label: "Weird moment" },
  { value: "LESSON", label: "Lesson" },
  { value: "OTHER", label: "Other" },
] as const;

const MOODS = [
  { value: "LIGHT", label: "Light" },
  { value: "HEAVY", label: "Heavy" },
  { value: "NEUTRAL", label: "Neutral" },
  { value: "CHAOTIC", label: "Chaotic" },
  { value: "PROUD", label: "Proud" },
  { value: "OTHER", label: "Other" },
] as const;

const VISIBILITIES = [
  { value: "PRIVATE", label: "Private only" },
  { value: "UNLISTED", label: "Unlisted link" },
  { value: "PUBLIC", label: "Public" },
] as const;

export function NewPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]["value"]>("OTHER");
  const [mood, setMood] = useState<(typeof MOODS)[number]["value"]>("NEUTRAL");
  const [visibility, setVisibility] =
    useState<(typeof VISIBILITIES)[number]["value"]>("PRIVATE");
  const [happenedAt, setHappenedAt] = useState(
    new Date().toISOString().substring(0, 10),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          type,
          mood,
          visibility,
          happenedAt,
        }),
      });

      if (!res.ok) {
        setError("Couldn’t log this moment. Try again in a bit.");
        setSubmitting(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      console.error(e);
      setError("Something glitched in the ether. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          required
          maxLength={160}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Gave a presentation with my mic muted for 5 minutes"
          className="w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 shadow-[0_0_20px_rgba(15,23,42,0.9)] outline-none ring-0 transition focus:border-cyan-400/80 focus:bg-slate-950 focus:shadow-[0_0_40px_rgba(56,189,248,0.45)]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
            Type
          </p>
          <div className="flex flex-wrap gap-1.5">
            {TYPES.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setType(option.value)}
                className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${
                  type === option.value
                    ? "border-cyan-400/80 bg-cyan-500/10 text-cyan-200"
                    : "border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-500"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
            Mood
          </p>
          <div className="flex flex-wrap gap-1.5">
            {MOODS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setMood(option.value)}
                className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${
                  mood === option.value
                    ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-200"
                    : "border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-500"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300">
            Visibility
          </p>
          <div className="flex flex-wrap gap-1.5">
            {VISIBILITIES.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setVisibility(option.value)}
                className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${
                  visibility === option.value
                    ? "border-indigo-400/80 bg-indigo-500/10 text-indigo-200"
                    : "border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-slate-500"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="happenedAt"
          className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
        >
          When did this actually happen?
        </label>
        <input
          id="happenedAt"
          type="date"
          required
          value={happenedAt}
          onChange={(e) => setHappenedAt(e.target.value)}
          className="w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 shadow-[0_0_20px_rgba(15,23,42,0.9)] outline-none ring-0 transition focus:border-cyan-400/80 focus:bg-slate-950 focus:shadow-[0_0_40px_rgba(56,189,248,0.45)]"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="body"
          className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
        >
          What went down?
        </label>
        <textarea
          id="body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          placeholder="Tell future-you what happened, how it felt, and what (if anything) you learned."
          className="w-full resize-y rounded-xl border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 shadow-[0_0_20px_rgba(15,23,42,0.9)] outline-none ring-0 transition focus:border-cyan-400/80 focus:bg-slate-950 focus:shadow-[0_0_40px_rgba(56,189,248,0.45)]"
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
        className="mt-2 inline-flex items-center justify-center rounded-full border border-cyan-400/80 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.8)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Logging..." : "Save to archive"}
      </button>
    </form>
  );
}

