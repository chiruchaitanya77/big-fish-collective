"use client";

import Link from "@/components/site-link";
import { usePathname } from "next/navigation";
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

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const ink = overlay ? "text-white" : "text-black";

  return (
    <header
      data-overlay={overlay ? "true" : "false"}
      className={`site-header ${overlay ? "absolute" : "sticky border-b border-black bg-white"} inset-x-0 top-0 z-[100]`}
    >
      <div
        className={`mx-auto flex h-24 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-12 ${ink}`}
      >
        <BrandMark inverse={overlay} />
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
            className={`h-11 rounded-none ${overlay ? "border-white bg-transparent text-white hover:bg-white hover:text-black" : "border-black bg-white text-black hover:bg-black hover:text-white"}`}
          >
            <Link href="/contact#talent-application">Join the Collective</Link>
          </Button>
          <Button
            asChild
            className={`h-11 rounded-none ${overlay ? "bg-white text-black hover:bg-white/85" : "bg-black text-white hover:bg-black/80"}`}
          >
            <Link href="/find-talent">Find Talent</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open navigation"
              className={`size-11 rounded-none xl:hidden ${overlay ? "border-white bg-transparent text-white hover:bg-white hover:text-black" : "border-black bg-white text-black hover:bg-black hover:text-white"}`}
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
  );
}
