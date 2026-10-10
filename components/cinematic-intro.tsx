"use client";

import { useEffect, useRef, useState } from "react";

type IntroPhase = "checking" | "loading" | "revealing" | "done";

const INTRO_DURATION = 1850;
const REVEAL_DURATION = 1600;
const INTRO_SEEN_KEY = "big-fish-collective:intro-seen";

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, "true");
  } catch {
    // If storage is unavailable, the intro still works for this page load.
  }
}

export function CinematicIntro() {
  const [phase, setPhase] = useState<IntroPhase>("checking");
  const skipTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (hasSeenIntro()) {
      setPhase("done");
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      markIntroSeen();
      const reducedMotionTimer = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(reducedMotionTimer);
    }

    setPhase("loading");
    document.body.classList.add("intro-active");
    const revealTimer = window.setTimeout(
      () => setPhase("revealing"),
      INTRO_DURATION,
    );
    const doneTimer = window.setTimeout(
      () => setPhase("done"),
      INTRO_DURATION + REVEAL_DURATION,
    );

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
      if (skipTimerRef.current !== null) {
        window.clearTimeout(skipTimerRef.current);
      }
      document.body.classList.remove("intro-active");
    };
  }, []);

  useEffect(() => {
    if (phase === "done") {
      markIntroSeen();
      document.body.classList.remove("intro-active");
    }
  }, [phase]);

  if (phase === "checking" || phase === "done") return null;

  const handleSkip = () => {
    markIntroSeen();
    setPhase("revealing");
    skipTimerRef.current = window.setTimeout(
      () => setPhase("done"),
      REVEAL_DURATION,
    );
  };

  return (
    <div
      className={`cinematic-intro phase-${phase}`}
      role="dialog"
      aria-label="Big Fish Collective opening title"
      aria-modal="true"
    >
      <div className="intro-edge intro-edge-top" />
      <div className="intro-edge intro-edge-bottom" />

      <div className="intro-copy intro-copy-top">
        <span>Big Fish Collective</span>
        <span>Original presentation</span>
      </div>

      <div className="intro-stage">
        <div className="clapboard" aria-hidden="true">
          <div className="clapstick">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="clapboard-body">
            <div className="clapboard-heading">
              <span>BIG FISH</span>
              <span>COLLECTIVE</span>
            </div>
            <div className="clapboard-rule" />
            <div className="clapboard-fields">
              <div>
                <span>PROJECT</span>
                <strong>THE NEXT FRAME</strong>
              </div>
              <div>
                <span>SCENE</span>
                <strong>01</strong>
              </div>
              <div>
                <span>TAKE</span>
                <strong>01</strong>
              </div>
            </div>
            <div className="clapboard-footer">
              <span>HYDERABAD / INDIA</span>
              <span>ROLLING</span>
            </div>
          </div>
        </div>
        <p className="intro-stage-caption">A worldwide talent collective</p>
      </div>

      <div className="intro-reveal-layer" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <mask id="intro-reveal-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <rect width="100" height="100" fill="white" />
              <rect className="reveal-cut" x="4" y="35" width="92" height="30" rx="1" fill="black" />
            </mask>
          </defs>
          <rect width="100" height="100" fill="var(--ink)" mask="url(#intro-reveal-mask)" />
        </svg>
      </div>

      <div
        className="intro-loading-bar"
        role="progressbar"
        aria-label="Loading Big Fish Collective"
      >
        <i />
      </div>

      <div className="intro-copy intro-copy-bottom">
        <span className="intro-loading-label">Cut to picture</span>
        <button type="button" onClick={handleSkip}>
          Skip intro <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}
