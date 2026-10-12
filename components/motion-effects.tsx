"use client";

import { useEffect } from "react";

function wrapWords(element: HTMLElement) {
  if (element.dataset.motionWords === "true") return;

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let currentNode = walker.nextNode();

  while (currentNode) {
    const node = currentNode as Text;
    if (node.textContent?.trim()) textNodes.push(node);
    currentNode = walker.nextNode();
  }

  let wordIndex = 0;
  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const parts = node.textContent?.split(/(\s+)/) ?? [];

    parts.forEach((part) => {
      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }

      const word = document.createElement("span");
      word.className = "motion-word";
      word.style.setProperty("--word-index", `${wordIndex}`);
      word.style.setProperty("--word-delay", `${wordIndex * 45}ms`);
      word.textContent = part;
      fragment.appendChild(word);
      wordIndex += 1;
    });

    node.replaceWith(fragment);
  });

  element.dataset.motionWords = "true";
}

/** Adds lightweight, progressive motion without hiding content when JavaScript is unavailable. */
export function MotionEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section, main > footer, body > footer",
      ),
    );
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("main > section article"),
    );
    const textElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main h1, main h2, main h3, main .eyebrow, main section p:not(.eyebrow)",
      ),
    );
    const footerTextElements = Array.from(
      document.querySelectorAll<HTMLElement>("footer .eyebrow, footer p"),
    );
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("main h1, main h2, main h3"),
    );
    const heroTitles = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section:first-of-type h1, main > section:first-of-type h2",
      ),
    );
    const scrollTitles = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section:not(:first-of-type) h2.section-title",
      ),
    );
    const listItems = Array.from(
      document.querySelectorAll<HTMLElement>("main > section li"),
    );
    const ctaGroups = Array.from(
      document.querySelectorAll<HTMLElement>("main section div.flex.flex-wrap"),
    ).filter((element) => element.querySelector('[data-slot="button"]'));
    const footerLinks = Array.from(
      document.querySelectorAll<HTMLElement>("footer a"),
    );
    const imageFrames = Array.from(
      document.querySelectorAll<HTMLElement>(".motion-image-frame"),
    );
    const heroImages = Array.from(
      document.querySelectorAll<HTMLImageElement>(
        "main > section:first-of-type img",
      ),
    );
    const parallaxImages = Array.from(
      document.querySelectorAll<HTMLImageElement>(
        "main > section > img, main > section > div > img, main img.motion-parallax-media",
      ),
    );

    document.body.classList.add("motion-ready");
    sections.forEach((element) => element.classList.add("motion-section"));
    const cardIndexes = new Map<HTMLElement, number>();
    cards.forEach((element) => {
      const parent = element.parentElement;
      const index = parent
        ? cardIndexes.get(parent) ?? 0
        : 0;
      if (parent) cardIndexes.set(parent, index + 1);
      element.classList.add("motion-card");
      const isGridItem = Boolean(
        parent?.className.includes("grid-cols"),
      );
      element.classList.add(isGridItem ? "motion-card-wave" : "motion-card-stack");
      if (isGridItem) element.classList.add("motion-alternate-item");
      element.style.setProperty(
        "--motion-delay",
        `${Math.min(index, 7) * 85}ms`,
      );
    });
    [...textElements, ...footerTextElements].forEach((element, index) => {
      element.classList.add("motion-text");
      element.style.setProperty(
        "--motion-text-delay",
        `${Math.min(index % 5, 4) * 70}ms`,
      );

      if (element.classList.contains("eyebrow")) {
        element.classList.add("motion-tracking");
      } else if (headings.includes(element)) {
        wrapWords(element);
        element.classList.add(
          heroTitles.includes(element)
            ? "motion-mask-title"
            : element.closest("article")
              ? "motion-blur-title"
              : "motion-word-stagger",
        );
        if (scrollTitles.includes(element)) {
          element.classList.add("motion-scroll-title");
        }
      } else {
        element.classList.add("motion-fade-copy");
      }
    });
    const listIndexes = new Map<HTMLElement, number>();
    listItems.forEach((element) => {
      const parent = element.parentElement;
      const index = parent
        ? listIndexes.get(parent) ?? 0
        : 0;
      if (parent) listIndexes.set(parent, index + 1);
      element.classList.add("motion-stagger-item");
      if (element.closest(".motion-process-steps")) {
        element.classList.add("motion-process-step");
      } else if (element.parentElement?.tagName === "OL") {
        element.classList.add("motion-sequence-horizontal");
      } else if (element.parentElement?.className.includes("grid-cols")) {
        element.classList.add("motion-alternate-item");
      }
      if (element.className.includes("border-b")) {
        element.classList.add("motion-outline-bottom");
      } else if (element.className.includes("border-t")) {
        element.classList.add("motion-outline-top");
      }
      element.style.setProperty(
        "--motion-list-delay",
        `${Math.min(index, 7) * (element.closest(".motion-process-steps") ? 110 : 65)}ms`,
      );
    });
    ctaGroups.forEach((element) => element.classList.add("motion-cta-group"));
    footerLinks.forEach((element, index) => {
      element.classList.add("motion-footer-link");
      element.style.setProperty(
        "--motion-footer-delay",
        `${Math.min(index, 8) * 45}ms`,
      );
    });
    imageFrames.forEach((element) => {
      element.classList.add("motion-image-frame-motion");
    });
    heroImages.forEach((element) => element.classList.add("motion-hero-image"));
    parallaxImages.forEach((element) => {
      element.classList.add("motion-parallax-media");
    });

    const animatedElements = sections.concat(cards);
    const revealInViewport = () => {
      animatedElements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
          element.classList.add("is-visible");
        }
      });
    };

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

      scrollTitles.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const start = window.innerHeight * 0.82;
        const end = window.innerHeight * 0.24;
        const progress = Math.max(
          0,
          Math.min(1, (start - bounds.top) / (start - end)),
        );
        element.style.setProperty("--motion-scroll-progress", `${progress}`);
        element.style.setProperty(
          "--motion-scroll-opacity",
          `${0.58 + progress * 0.42}`,
        );
        element.style.setProperty(
          "--motion-scroll-y",
          `${(1 - progress) * 6}px`,
        );
        element.style.setProperty(
          "--motion-scroll-scale",
          `${0.99 + progress * 0.01}`,
        );
        element.style.setProperty(
          "--motion-scroll-blur",
          `${(1 - progress) * 1}px`,
        );
      });
    };
    const onScroll = () => {
      revealInViewport();
      if (!reduceMotion && !frame) {
        frame = window.requestAnimationFrame(updateParallax);
      }
    };
    if (!reduceMotion) {
      updateParallax();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

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
      revealInViewport();
      const initialRevealTimer = window.setTimeout(revealInViewport, 120);
      window.addEventListener("hashchange", revealInViewport);

      return () => {
        observer.disconnect();
        window.clearTimeout(initialRevealTimer);
        window.removeEventListener("hashchange", revealInViewport);
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
