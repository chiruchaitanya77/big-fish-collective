"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    void fetch("/api/client-errors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: "react-error", message: error.message || "Application page error", path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [error]);

  return <main className="grid min-h-screen place-items-center bg-[#f3f4f2] px-6 text-[#17201d]">
    <section className="max-w-lg border border-black/15 bg-white p-8 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/50">Big Fish Collective</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">Something went wrong</h1>
      <p className="mt-3 text-sm leading-relaxed text-black/60">We’ve recorded the issue and our team has been notified. Try loading this page again.</p>
      <button type="button" onClick={() => reset()} className="mt-6 bg-black px-5 py-3 text-sm font-semibold text-white">Try again</button>
    </section>
  </main>;
}
