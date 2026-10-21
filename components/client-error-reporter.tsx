"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ClientErrorReporter() {
  const pathname = usePathname();
  useEffect(() => {
    const report = (category: string, message: string) => {
      void fetch("/api/client-errors", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category, message, path: pathname }), keepalive: true }).catch(() => {});
    };
    const onError = (event: ErrorEvent) => report("client-error", event.message || "Unhandled browser error");
    const onRejection = (event: PromiseRejectionEvent) => report("unhandled-rejection", event.reason instanceof Error ? event.reason.message : String(event.reason || "Unhandled promise rejection"));
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => { window.removeEventListener("error", onError); window.removeEventListener("unhandledrejection", onRejection); };
  }, [pathname]);
  return null;
}
