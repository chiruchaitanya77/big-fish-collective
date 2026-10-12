"use client";

import Link from "@/components/site-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["For Talent", "/talent"],
  ["For Partners", "/partners"],
  ["Services", "/services"],
  ["How We Work", "/process"],
  ["Contact", "/contact"],
];

const DIRECTION_THRESHOLD = 28;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const solid = !overlay || scrolled;
  const inverse = overlay && !solid;
  const ink = solid ? "text-black" : "text-white";

  useEffect(() => {
    lastScrollRef.current = window.scrollY;

    const updateVisibility = () => {
      timeoutRef.current = null;
      const currentScroll = window.scrollY;
      const previousScroll = lastScrollRef.current;
      const delta = currentScroll - previousScroll;
      lastScrollRef.current = currentScroll;
      const atTop = currentScroll <= 12;
      const shouldUseSolidSurface = !overlay || currentScroll > 24;

      setScrolled((current) =>
        current === shouldUseSolidSurface ? current : shouldUseSolidSurface,
      );

      if (
        menuOpen ||
        atTop ||
        headerRef.current?.contains(document.activeElement)
      ) {
        setHidden((current) => (current ? false : current));
        return;
      }

      // Ignore small direction changes from trackpads and inertial scrolling.
      // The header retains its current state until the user makes a clear move.
      if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
      const shouldHide = delta > 0 && currentScroll > 120;
      setHidden((current) => (current === shouldHide ? current : shouldHide));
    };

    const onScroll = () => {
      if (timeoutRef.current === null) {
        timeoutRef.current = window.setTimeout(updateVisibility, 50);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // A client-side route can restore a non-zero scroll position. Establish the
    // correct surface immediately instead of waiting for the next scroll event.
    const initialTimer = window.setTimeout(updateVisibility, 0);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(initialTimer);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [menuOpen]);

  return (
    <>
      {!overlay && <div className="site-header-spacer" aria-hidden="true" />}
      <header
        ref={headerRef}
        className={`site-header ${hidden ? "site-header-hidden" : ""} ${solid ? "site-header-solid" : "site-header-overlay"} fixed inset-x-0 top-0 z-50`}
      >
        <div
          className={`mx-auto flex h-24 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12 ${ink}`}
        >
          <BrandMark inverse={inverse} />
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-5 xl:flex"
          >
            {links.map(([label, href]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b py-1 text-sm font-semibold tracking-wide transition-opacity ${active ? "border-current opacity-100" : "border-transparent opacity-65 hover:opacity-100"}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 xl:flex">
            <Button
              asChild
              variant="outline"
              className={`h-11 rounded-none ${inverse ? "border-white! bg-transparent! text-white! hover:bg-white! hover:text-black!" : "border-black! bg-white! text-black! hover:bg-black! hover:text-white!"}`}
            >
              <Link href="/contact#talent-application">
                Join the Collective
              </Link>
            </Button>
            <Button
              asChild
              className={`h-11 rounded-none ${inverse ? "bg-white text-black hover:bg-white/85" : "bg-black text-white hover:bg-black/80"}`}
            >
              <Link href="/find-talent">Find Talent</Link>
            </Button>
          </div>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open navigation"
                className={`size-11 rounded-none xl:hidden ${inverse ? "border-white bg-transparent text-white hover:bg-white hover:text-black" : "border-black bg-white text-black hover:bg-black hover:text-white"}`}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-full max-w-none border-l-0 bg-black p-0 text-white sm:max-w-md"
              showCloseButton
            >
              <SheetTitle className="sr-only">Website navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Browse Big Fish Collective pages or start an enquiry.
              </SheetDescription>
              <div className="border-b border-white/20 p-6">
                <BrandMark inverse />
              </div>
              <nav
                aria-label="Mobile navigation"
                className="grid min-h-0 flex-1 grid-cols-2 content-start gap-x-4 overflow-y-auto px-6 py-6"
              >
                {[...links, ["Hyderabad", "/hyderabad"], ["FAQ", "/faq"]].map(
                  ([label, href], index) => (
                    <SheetClose asChild key={href}>
                      <Link
                        href={href}
                        className="grid min-h-20 grid-cols-[1.5rem_1fr] items-start border-b border-white/20 py-4 text-xl font-bold tracking-[-0.03em]"
                      >
                        <span className="pt-1 text-xs font-normal text-white/40">
                          0{index + 1}
                        </span>
                        {label}
                      </Link>
                    </SheetClose>
                  ),
                )}
              </nav>
              <div className="mt-auto grid gap-2 border-t border-white/20 p-6">
                <SheetClose asChild>
                  <Link
                    href="/find-talent"
                    className="bg-white px-5 py-4 text-center font-semibold text-black"
                  >
                    Find Talent
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/contact#talent-application"
                    className="border border-white px-5 py-4 text-center font-semibold text-white"
                  >
                    Join the Collective
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
