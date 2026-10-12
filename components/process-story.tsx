// "use client";

// import { useEffect, useRef, useState } from "react";

// type ProcessStep = [number | string, string, string];

// const visuals = [
//   [
//     "/process-discovery.png",
//     "A creative brief, notes, storyboards, and collaborators beginning a production conversation.",
//   ],
//   [
//     "/process-assessment.png",
//     "A creative professional's portfolio being carefully reviewed.",
//   ],
//   [
//     "/process-matching.png",
//     "A creative professional and production team finding the right fit together.",
//   ],
//   [
//     "/process-alignment.png",
//     "Collaborators aligning a schedule and project expectations around a production table.",
//   ],
//   [
//     "/process-commercial-confirmation.png",
//     "A refined production still life representing schedules, deliverables, and agreed terms.",
//   ],
//   [
//     "/process-project-support.png",
//     "A creative team coordinating an active production around camera and lighting equipment.",
//   ],
//   [
//     "/process-review.png",
//     "Collaborators reviewing a completed creative project and sharing thoughtful feedback.",
//   ],
// ] as const;

// export function ProcessStory({ steps }: { steps: ProcessStep[] }) {
//   const [activeStep, setActiveStep] = useState(0);
//   const activeStepRef = useRef(0);
//   const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

//   useEffect(() => {
//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     ).matches;
//     const updateActiveStep = () => {
//       const activationLine = window.innerHeight * 0.42;
//       let closestIndex = activeStepRef.current;
//       let closestDistance = Number.POSITIVE_INFINITY;

//       stepRefs.current.forEach((element, index) => {
//         if (!element) return;
//         const bounds = element.getBoundingClientRect();
//         if (
//           bounds.bottom < window.innerHeight * 0.12 ||
//           bounds.top > window.innerHeight * 0.86
//         ) {
//           return;
//         }
//         const distance = Math.abs(
//           bounds.top + bounds.height / 2 - activationLine,
//         );
//         if (distance < closestDistance) {
//           closestDistance = distance;
//           closestIndex = index;
//         }
//       });

//       if (activeStepRef.current !== closestIndex) {
//         activeStepRef.current = closestIndex;
//         setActiveStep(closestIndex);
//       }
//     };

//     if (reduceMotion || !("IntersectionObserver" in window)) {
//       return;
//     }

//     const observer = new IntersectionObserver(() => updateActiveStep(), {
//       threshold: [0.15, 0.4, 0.7],
//       rootMargin: "-12% 0px -14% 0px",
//     });

//     stepRefs.current.forEach((element) => {
//       if (element) observer.observe(element);
//     });
//     updateActiveStep();

//     return () => observer.disconnect();
//   }, [steps.length]);

//   useEffect(() => {
//     const nextVisual = visuals[(activeStep + 1) % visuals.length];
//     const preload = new window.Image();
//     preload.src = nextVisual[0];
//   }, [activeStep]);

//   return (
//     <div className="process-story-layout mt-10 grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-stretch">
//       <div className="process-story-visual-wrap self-start lg:sticky lg:top-28 lg:h-fit">
//         <div className="process-story-visual relative aspect-4/5 overflow-hidden border border-white/15 bg-black sm:aspect-16/10 lg:aspect-4/5">
//           {visuals.map(([src, alt], index) => (
//             <img
//               key={src}
//               src={src}
//               alt={alt}
//               className={`process-story-visual-image absolute inset-0 h-full w-full object-cover grayscale ${index === activeStep ? "is-active" : ""}`}
//               loading={index === 0 ? "eager" : "lazy"}
//               decoding="async"
//             />
//           ))}
//           <div className="absolute inset-x-5 bottom-5 z-10 sm:inset-x-7 sm:bottom-7">
//             <div className="flex items-center justify-between text-[.65rem] font-bold uppercase tracking-[.18em] text-white/65">
//               <span>Current frame</span>
//               <span>{String(activeStep + 1).padStart(2, "0")} / 07</span>
//             </div>
//             <div className="mt-3 h-px overflow-hidden bg-white/25">
//               <span
//                 className="block h-full origin-left bg-seafoam transition-transform duration-700 ease-out"
//                 style={{
//                   transform: `scaleX(${(activeStep + 1) / steps.length})`,
//                 }}
//               />
//             </div>
//           </div>
//           <div
//             className="absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-transparent"
//             aria-hidden="true"
//           />
//         </div>
//         <p className="mt-4 text-xs uppercase tracking-[.18em] text-white/45">
//           {steps[activeStep]?.[1]}
//         </p>
//       </div>

//       <div className="process-story-content min-w-0">
//         <ol className="motion-process-steps m-0 list-none p-0">
//           {steps.map(([number, title, copy], index) => (
//             <li
//               key={String(number)}
//               id={`process-step-${index + 1}`}
//               ref={(element) => {
//                 stepRefs.current[index] = element;
//               }}
//               aria-current={index === activeStep ? "step" : undefined}
//               className={`motion-process-step process-story-step grid gap-5 border-b border-white/15 py-7 sm:grid-cols-[4.5rem_0.8fr_1fr] sm:gap-7 sm:py-9 lg:grid-cols-[5rem_0.85fr_1fr] ${index === activeStep ? "is-active" : ""}`}
//             >
//               <span className="process-story-step-number text-sm tracking-[.14em] text-white/45">
//                 {number}
//               </span>
//               <h3 className="font-sans text-2xl font-medium tracking-[-.035em] sm:text-3xl">
//                 {title}
//               </h3>
//               <p className="max-w-2xl leading-relaxed text-white/60">{copy}</p>
//             </li>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";

type ProcessStep = [number | string, string, string];

const visuals = [
  [
    "/process-discovery.png",
    "A creative brief, notes, storyboards, and collaborators beginning a production conversation.",
  ],
  [
    "/process-assessment.png",
    "A creative professional's portfolio being carefully reviewed.",
  ],
  [
    "/process-matching.png",
    "A creative professional and production team finding the right fit together.",
  ],
  [
    "/process-alignment.png",
    "Collaborators aligning a schedule and project expectations around a production table.",
  ],
  [
    "/process-commercial-confirmation.png",
    "A refined production still life representing schedules, deliverables, and agreed terms.",
  ],
  [
    "/process-project-support.png",
    "A creative team coordinating an active production around camera and lighting equipment.",
  ],
  [
    "/process-review.png",
    "Collaborators reviewing a completed creative project and sharing thoughtful feedback.",
  ],
] as const;

export function ProcessStory({ steps }: { steps: ProcessStep[] }) {
  const [activeStep, setActiveStep] = useState(0);

  const activeStepRef = useRef(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const updateActiveStep = () => {
      const activationLine = window.innerHeight * 0.42;

      let closestIndex = activeStepRef.current;
      let closestDistance = Number.POSITIVE_INFINITY;

      stepRefs.current.forEach((element, index) => {
        if (!element) return;

        const bounds = element.getBoundingClientRect();

        if (
          bounds.bottom < window.innerHeight * 0.12 ||
          bounds.top > window.innerHeight * 0.86
        ) {
          return;
        }

        const distance = Math.abs(
          bounds.top + bounds.height / 2 - activationLine,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (activeStepRef.current !== closestIndex) {
        activeStepRef.current = closestIndex;
        setActiveStep(closestIndex);
      }
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(() => updateActiveStep(), {
      threshold: [0.15, 0.4, 0.7],
      rootMargin: "-12% 0px -14% 0px",
    });

    stepRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    updateActiveStep();

    return () => observer.disconnect();
  }, [steps.length]);

  useEffect(() => {
    const nextVisual = visuals[(activeStep + 1) % visuals.length];

    const preload = new window.Image();
    preload.src = nextVisual[0];
  }, [activeStep]);

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-stretch">
      {/* Sticky visual panel */}
      <div className="relative z-1 self-start lg:sticky lg:top-28 lg:h-fit">
        <div className="relative aspect-4/5 overflow-hidden border border-white/15 bg-black sm:aspect-16/10 lg:aspect-4/5">
          {/* Animated image layers */}
          {visuals.map(([src, alt], index) => {
            const isActive = index === activeStep;

            return (
              <img
                key={src}
                src={src}
                alt={alt}
                aria-hidden={!isActive}
                className={`absolute inset-0 h-full w-full object-cover grayscale transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isActive ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
                style={{
                  transitionDuration: isActive ? "900ms" : "700ms",
                }}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            );
          })}

          {/* Image gradient overlay */}
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-transparent"
            aria-hidden="true"
          />

          {/* Current frame and progress indicator */}
          <div className="absolute inset-x-5 bottom-5 z-10 sm:inset-x-7 sm:bottom-7">
            <div className="flex items-center justify-between text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/65">
              <span>Current frame</span>

              <span>
                {String(activeStep + 1).padStart(2, "0")} /{" "}
                {String(steps.length).padStart(2, "0")}
              </span>
            </div>

            <div
              className="mt-3 h-px overflow-hidden bg-white/25"
              role="progressbar"
              aria-label="Production process progress"
              aria-valuemin={1}
              aria-valuemax={steps.length}
              aria-valuenow={activeStep + 1}
            >
              <span
                className="block h-full origin-left bg-seafoam transition-transform duration-700 ease-out motion-reduce:transition-none"
                style={{
                  transform: `scaleX(${(activeStep + 1) / steps.length})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Active step caption */}
        <p
          key={activeStep}
          className="mt-4 text-xs uppercase tracking-[0.18em] text-white/45 motion-safe:animate-[fade-in-up_500ms_ease-out_both]"
        >
          {steps[activeStep]?.[1]}
        </p>
      </div>

      {/* Process steps */}
      <div className="min-w-0">
        <ol className="m-0 list-none p-0">
          {steps.map(([number, title, copy], index) => {
            const isActive = index === activeStep;

            return (
              <li
                key={String(number)}
                id={`process-step-${index + 1}`}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                aria-current={isActive ? "step" : undefined}
                className={`grid min-h-0 gap-5 border-b border-white/15 py-7 transition-[border-color,background-color] duration-500 ease-in-out sm:min-h-[clamp(15rem,29vh,23rem)] sm:grid-cols-[4.5rem_0.8fr_1fr] sm:gap-7 sm:py-9 lg:grid-cols-[5rem_0.85fr_1fr] ${
                  isActive
                    ? "border-[rgba(204,255,228,0.55)] bg-[linear-gradient(90deg,rgba(204,255,228,0.055),transparent_52%)]"
                    : "bg-transparent"
                }`}
              >
                <span
                  className={`text-sm pl-6 mt-2 tracking-[0.14em] transition-all duration-500 ${
                    isActive ? "text-seafoam text-xl" : "text-white/45"
                  }`}
                >
                  {number}
                </span>

                <h3
                  className={`font-sans text-2xl font-medium tracking-[-0.035em] transition-[color,font-size] duration-500 sm:text-3xl ${
                    isActive ? "text-seafoam sm:text-[2.2rem]" : "text-white"
                  }`}
                >
                  {title}
                </h3>

                <p
                  className={`max-w-2xl leading-relaxed transition-colors duration-500 ${
                    isActive ? "text-white/80" : "text-white/60"
                  }`}
                >
                  {copy}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
