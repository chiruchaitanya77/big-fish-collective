import type { Metadata } from "next";
import "./globals.css";
import { SiteAnalytics } from "@/components/site-analytics";
import { MotionEffects } from "@/components/motion-effects";

export const metadata: Metadata = {
  title: { default: "Big Fish Collective | Talent Agency in Hyderabad", template: "%s | Big Fish Collective" },
  description: "Big Fish Collective represents cast and crew and helps producers, studios, agencies, and brands find the right creative talent in Hyderabad and beyond.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased"><MotionEffects /><SiteAnalytics />{children}</body></html>;
}
