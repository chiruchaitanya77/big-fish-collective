import { AnalyticsSettings } from "@/components/site-analytics";
import Link from "@/components/site-link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

const footerLinks = [
  ["About", "/about"],
  ["For Talent", "/talent"],
  ["For Partners", "/partners"],
  ["Find Talent", "/find-talent"],
  ["Services", "/services"],
  ["How We Work", "/process"],
  ["Hyderabad", "/hyderabad"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
] as const;

// function SocialLinks() {
//   return (
//     <div className="mt-5 flex flex-wrap items-center gap-4">
//       {/* Instagram */}
//       <a
//         href="https://www.instagram.com/bigfishcollective/"
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label="Big Fish Collective on Instagram"
//         title="Instagram"
//         className="flex size-10 shrink-0 items-center justify-center border border-white/25 transition-colors duration-300 hover:border-seafoam focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-seafoam"
//       >
//         <img
//           src="/social/instagram.svg"
//           alt=""
//           aria-hidden="true"
//           className="size-6 object-contain grayscale invert brightness-90 contrast-110"
//           loading="lazy"
//           decoding="async"
//         />
//       </a>

//       {/* LinkedIn */}
//       <a
//         href="https://www.linkedin.com/company/big-fish-collective/"
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label="Big Fish Collective on LinkedIn"
//         title="LinkedIn"
//         className="flex size-10 shrink-0 items-center justify-center border border-white/25 transition-colors duration-300 hover:border-seafoam focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-seafoam"
//       >
//         <img
//           src="/social/linkedin.svg"
//           alt=""
//           aria-hidden="true"
//           className="size-6 object-contain grayscale brightness-300 contrast-120"
//           loading="lazy"
//           decoding="async"
//         />
//       </a>

//       {/* YouTube */}
//       <a
//         href="https://www.youtube.com/@bigfishcollective"
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label="Big Fish Collective on YouTube"
//         title="YouTube"
//         className="flex size-10 shrink-0 items-center justify-center border border-white/25 transition-colors duration-300 hover:border-seafoam focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-seafoam"
//       >
//         <img
//           src="/social/youtube.svg"
//           alt=""
//           aria-hidden="true"
//           className="size-7 object-contain grayscale invert brightness-70 contrast-200"
//           loading="lazy"
//           decoding="async"
//         />
//       </a>

//       {/* Facebook */}
//       <a
//         href="https://www.facebook.com/bigfishcollective/"
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label="Big Fish Collective on Facebook"
//         title="Facebook"
//         className="flex size-10 shrink-0 items-center justify-center border border-white/25 transition-colors duration-300 hover:border-seafoam focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-seafoam"
//       >
//         <img
//           src="/social/facebook.svg"
//           alt=""
//           aria-hidden="true"
//           className="size-7 object-contain grayscale brightness-90 contrast-500"
//           loading="lazy"
//           decoding="async"
//         />
//       </a>

//       {/* X */}
//       <a
//         href="https://x.com/bigfishcollective"
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label="Big Fish Collective on X"
//         title="X"
//         className="flex size-10 shrink-0 items-center justify-center border border-white/25 transition-colors duration-300 hover:border-seafoam focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-seafoam"
//       >
//         <img
//           src="/social/x.svg"
//           alt=""
//           aria-hidden="true"
//           className="size-5 object-contain grayscale invert brightness-90 contrast-110"
//           loading="lazy"
//           decoding="async"
//         />
//       </a>
//     </div>
//   );
// }

function SocialLinks() {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/bigfishcollective/",
      src: "/social/instagram.svg",
      className: "social-icon-instagram",
      filter: "grayscale(1) invert(1) brightness(0.9) contrast(1.1)",
      size: 24,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/big-fish-collective/",
      src: "/social/linkedin.svg",
      className: "social-icon-linkedin",
      filter: "grayscale(1) brightness(3) contrast(1.2)",
      size: 24,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@bigfishcollective",
      src: "/social/youtube.svg",
      className: "social-icon-youtube",
      filter: "grayscale(1) invert(1) brightness(0.9) contrast(20)",
      size: 28,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/bigfishcollective/",
      src: "/social/facebook.svg",
      className: "social-icon-facebook",
      filter: "grayscale(1) brightness(0.9) contrast(5)",
      size: 26,
    },
    {
      name: "X",
      href: "https://x.com/bigfishcollective",
      src: "/social/x.svg",
      className: "social-icon-x",
      filter: "grayscale(1) invert(1) brightness(0.9) contrast(1.1)",
      size: 20,
    },
  ];

  return (
    <div className="mt-5 flex flex-wrap items-center gap-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Big Fish Collective on ${social.name}`}
          title={social.name}
          className="flex size-10 shrink-0 items-center justify-center border border-white/25 transition-colors duration-300 hover:border-seafoam focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-seafoam"
        >
          <img
            src={social.src}
            alt=""
            aria-hidden="true"
            className={`social-icon ${social.className}`}
            style={{
              width: `${social.size}px`,
              height: `${social.size}px`,
              minWidth: `${social.size}px`,
              maxWidth: `${social.size}px`,
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
              margin: 0,
              padding: 0,
              filter: social.filter,
            }}
            loading="lazy"
            decoding="async"
          />
        </a>
      ))}
    </div>
  );
}

function FooterNavigation() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
      {footerLinks.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          className="text-sm text-white/70 transition-colors hover:text-white"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

function FooterContact() {
  return (
    <div>
      <p className="eyebrow text-white/45">Let&apos;s talk</p>
      <a
        href="mailto:hello@bigfishcollective.in"
        className="mt-5 inline-flex! items-center gap-2 text-lg font-medium transition-colors hover:text-seafoam underline underline-offset-4 decoration-1 hover:underline-offset-2"
      >
        hello@bigfishcollective.in
        <ArrowUpRight className="size-4" />
      </a>

      <p className="mt-3 text-sm text-white/55">Hyderabad, India</p>

      <div className="mt-7 border-t border-white/15 pt-5">
        <p className="eyebrow text-white/45">Follow the work</p>
        <SocialLinks />
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-360 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-14 border-b border-white/15 pb-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandMark inverse large />
            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/65">
              A Hyderabad-based talent agency representing cast and crew and
              connecting creative partners with the people their projects need.
            </p>
          </div>

          <div>
            <p className="eyebrow text-white/45">Navigate</p>
            <FooterNavigation />
          </div>

          <FooterContact />
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs tracking-wide text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Big Fish Collective</p>
          <AnalyticsSettings />
          <p>The ocean is big. The right collective makes it easier to move.</p>
        </div>
      </div>
    </footer>
  );
}
