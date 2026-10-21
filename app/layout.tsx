import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteAnalytics } from "@/components/site-analytics";
import { MotionEffects } from "@/components/motion-effects";
import { CinematicIntro } from "@/components/cinematic-intro";
import { ClientErrorReporter } from "@/components/client-error-reporter";

const siteUrl = "https://big-fish-collective.bigfishcollective.workers.dev";
const googleAnalyticsId = "G-20W2WXT25M";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Big Fish Collective | Talent Representation & Casting",
    template: "%s | Big Fish Collective",
  },
  description:
    "Big Fish Collective represents cast and crew, supports creative careers, and connects producers, studios, agencies, and brands with the right talent in Hyderabad and beyond.",
  applicationName: "Big Fish Collective",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Big Fish Collective",
    title: "Big Fish Collective | Talent Representation & Casting",
    description:
      "A worldwide talent collective representing cast and crew and connecting creative partners with the people who fit the work.",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Big Fish Collective - talent representation and casting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Fish Collective | Talent Representation & Casting",
    description:
      "Talent representation, casting and crew sourcing, and creative production partnerships.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Big Fish Collective",
  url: siteUrl,
  logo: `${siteUrl}/big-fish-collective-logo.png`,
  description:
    "A talent collective representing cast and crew and connecting creative partners with talent in Hyderabad and beyond.",
  areaServed: ["Hyderabad", "India", "Worldwide"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className="antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            window.gtag('js', new Date());
            window.gtag('config', '${googleAnalyticsId}', {
              send_page_view: true
            });
          `}
        </Script>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <CinematicIntro />
        <MotionEffects />
        <SiteAnalytics />
        <ClientErrorReporter />
        {children}
      </body>
    </html>
  );
}
