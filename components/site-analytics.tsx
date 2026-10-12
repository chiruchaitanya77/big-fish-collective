"use client";
import { useEffect, useState } from "react";
import { eventNames, pagePaths } from "@/lib/analytics";

type AnalyticsWindow = Window & {dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void};
const preferenceKey = "bfc-analytics-consent";
function allowed() {
  try { return localStorage.getItem(preferenceKey) === "accepted" && navigator.doNotTrack !== "1"; } catch { return false; }
}
export function trackEvent(event: string) {
  if (!allowed() || !eventNames.includes(event)) return;
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (!pagePaths.includes(path)) return;
  if (!event.endsWith("_success")) void fetch("/api/analytics", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({event, path}), keepalive: true}).catch(() => {});
  (window as AnalyticsWindow).gtag?.("event", event, {page_location: window.location.origin + path, page_path: path});
}
export function AnalyticsSettings() {
  return <button type="button" className="text-xs underline underline-offset-4" onClick={() => window.dispatchEvent(new Event("bfc:analytics-settings"))}>Analytics preferences</button>;
}
export function SiteAnalytics() {
  const [showChoice, setShowChoice] = useState(false);
  useEffect(() => {
    let cancelled = false;
    async function start() {
      if (!allowed()) return;
      trackEvent("page_view");
      try {
        const {measurementId} = await fetch("/api/analytics-config").then(r => r.json()) as {measurementId: string | null};
        if (cancelled || !allowed() || !measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return;
        const w = window as AnalyticsWindow;
        w.dataLayer = w.dataLayer || [];
        w.gtag = function (...args: unknown[]) { w.dataLayer!.push(args); };
        w.gtag("js", new Date());
        w.gtag("config", measurementId, {send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false});
        w.gtag("event", "page_view", {page_location: window.location.origin + window.location.pathname, page_referrer: ""});
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        script.async = true;
        document.head.appendChild(script);
      } catch { /* Analytics never blocks the website. */ }
    }
    const choiceTimer = window.setTimeout(() => {
      try { setShowChoice(!localStorage.getItem(preferenceKey) && navigator.doNotTrack !== "1"); } catch { /* Browsing remains available without storage. */ }
    }, 0);
    void start();
    const openSettings = () => setShowChoice(true);
    const click = (event: MouseEvent) => {
      const anchor = (event.target as Element)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("mailto:")) trackEvent("email_click");
      else if (href.includes("#talent-application")) trackEvent("join_collective_click");
      else if (href === "/find-talent") trackEvent("find_talent_click");
      else if (href.startsWith("/contact")) trackEvent("contact_click");
    };
    document.addEventListener("click", click);
    window.addEventListener("bfc:analytics-settings", openSettings);
    return () => {clearTimeout(choiceTimer); cancelled = true; document.removeEventListener("click", click); window.removeEventListener("bfc:analytics-settings", openSettings);};
  }, []);
  function choose(value: string) {
    try { localStorage.setItem(preferenceKey, value); } catch { setShowChoice(false); return; }
    window.location.reload();
  }
  if (!showChoice) return null;
  return <aside aria-label="Analytics preferences" className="fixed bottom-4 left-4 right-4 z-[100] max-w-xl border border-black bg-white p-5 text-black shadow-xl sm:left-auto sm:right-6">
    <p className="text-sm font-semibold">Help us improve the collective.</p>
    <p className="mt-2 text-sm leading-relaxed text-black/65">With your permission, we measure page visits and button clicks. Your enquiry details are never included in analytics. You can change this choice in the footer.</p>
    <div className="mt-4 flex flex-wrap gap-3">
      <button onClick={() => choose("accepted")} className="border border-black bg-black px-4 py-2 text-sm text-white">Allow analytics</button>
      <button onClick={() => choose("declined")} className="border border-black px-4 py-2 text-sm">Essential only</button>
    </div>
  </aside>;
}
