"use client";

import { useEffect } from "react";

/** Adds lightweight, progressive motion without hiding content when JavaScript is unavailable. */
export function MotionEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section, main > footer"));
    const cards = Array.from(document.querySelectorAll<HTMLElement>("main > section article"));
    const heroImages = Array.from(document.querySelectorAll<HTMLImageElement>("main > section:first-of-type img"));

    document.body.classList.add("motion-ready");
    sections.forEach((element) => element.classList.add("motion-section"));
    cards.forEach((element, index) => {
      element.classList.add("motion-card");
      element.style.setProperty("--motion-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });
    heroImages.forEach((element) => element.classList.add("motion-hero-image"));

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const offset = Math.min(window.scrollY, 720) * 0.045;
      heroImages.forEach((element) => element.style.setProperty("--motion-parallax", `${offset}px`));
    };
    const onScroll = () => {
      if (!reduceMotion && !frame) frame = window.requestAnimationFrame(updateParallax);
    };
    if (!reduceMotion) {
      updateParallax();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      sections.concat(cards).forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    sections.concat(cards).forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      if (!reduceMotion) {
        window.removeEventListener("scroll", onScroll);
        if (frame) window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return null;
}
