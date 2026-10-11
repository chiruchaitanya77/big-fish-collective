"use client";

import { useEffect } from "react";

/** Adds lightweight, progressive motion without hiding content when JavaScript is unavailable. */
export function MotionEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, main > footer"),
    );
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("main > section article"),
    );
    const textElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main h1, main h2, main h3, main .eyebrow, main section p:not(.eyebrow)",
      ),
    );
    const listItems = Array.from(
      document.querySelectorAll<HTMLElement>("main > section li"),
    );
    const heroImages = Array.from(
      document.querySelectorAll<HTMLImageElement>(
        "main > section:first-of-type img",
      ),
    );
    const parallaxImages = Array.from(
      document.querySelectorAll<HTMLImageElement>(
        "main > section > img, main > section > div > img",
      ),
    );

    document.body.classList.add("motion-ready");
    sections.forEach((element) => element.classList.add("motion-section"));
    cards.forEach((element, index) => {
      element.classList.add("motion-card");
      element.style.setProperty(
        "--motion-delay",
        `${Math.min(index % 4, 3) * 90}ms`,
      );
    });
    textElements.forEach((element, index) => {
      element.classList.add("motion-text");
      element.style.setProperty(
        "--motion-text-delay",
        `${Math.min(index % 5, 4) * 70}ms`,
      );
    });
    listItems.forEach((element, index) => {
      element.classList.add("motion-stagger-item");
      element.style.setProperty(
        "--motion-list-delay",
        `${Math.min(index % 6, 5) * 65}ms`,
      );
    });
    heroImages.forEach((element) => element.classList.add("motion-hero-image"));
    parallaxImages.forEach((element) => {
      element.classList.add("motion-parallax-media");
    });

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;

      parallaxImages.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const elementCenter = bounds.top + bounds.height / 2;
        const strength = element.classList.contains("motion-hero-image")
          ? 0.045
          : 0.022;
        const offset = (viewportCenter - elementCenter) * strength;
        element.style.setProperty("--motion-parallax", `${offset}px`);
      });
    };
    const onScroll = () => {
      if (!reduceMotion && !frame) {
        frame = window.requestAnimationFrame(updateParallax);
      }
    };
    if (!reduceMotion) {
      updateParallax();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    const animatedElements = sections.concat(cards);
    const showEverything = () => {
      animatedElements.forEach((element) => element.classList.add("is-visible"));
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      showEverything();
    } else {
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      animatedElements.forEach((element) => observer.observe(element));

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
