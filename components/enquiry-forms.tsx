"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Clapperboard,
  LoaderCircle,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { categoryOptions, enquirySchema } from "@/lib/enquiry-schema";
import { trackEvent } from "@/components/site-analytics";

type EnquiryKind = "partner" | "talent";
type SubmitState = "idle" | "submitting" | "success" | "error";

function FieldLabel({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold">
      {children}
      {optional && (
        <span className="ml-2 font-normal text-black/45">Optional</span>
      )}
    </label>
  );
}

function EnquiryForm({ kind }: { kind: EnquiryKind }) {
  const submission = useRef({ id: "", payload: "" });
  const started = useRef(false);
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const isTalent = kind === "talent";
  const prefix = isTalent ? "talent" : "partner";
  const successRef = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (state === "submitting" || !form.reportValidity()) return;
    if (!consent) {
      setError(
        "Please confirm that we may use these details to respond to you.",
      );
      setState("error");
      return;
    }

    setState("submitting");
    setError("");
    const data = new FormData(form);
    const fields = { ...Object.fromEntries(data.entries()), kind, consent };
    const serialized = JSON.stringify(fields);
    if (submission.current.payload !== serialized)
      submission.current = { id: crypto.randomUUID(), payload: serialized };
    const payload = enquirySchema.safeParse({
      ...fields,
      submissionId: submission.current.id,
    });
    if (!payload.success) {
      const issue = payload.error.issues[0];
      setError(issue.message);
      setState("error");
      const field = form.elements.namedItem(String(issue.path[0]));
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload.data),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok)
        throw new Error(result.error || "Unable to submit your enquiry.");
      trackEvent(`${kind}_form_success`);
      submission.current = { id: "", payload: "" };
      started.current = false;
      form.reset();
      setConsent(false);
      setState("success");
    } catch (submitError) {
      trackEvent(`${kind}_form_error`);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your enquiry.",
      );
      setState("error");
    }
  }

  useEffect(() => {
    if (state === "success") {
      successRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [state]);

  if (state === "success") {
    return (
      <div
        ref={successRef}
        className="grid min-h-136 scroll-mt-20 place-content-center border border-black bg-black p-8 text-center text-white sm:p-14"
      >
        <span className="mx-auto grid size-16 place-items-center rounded-full border border-white">
          <Check className="size-7" />
        </span>
        <p className="eyebrow mt-8">
          {isTalent ? "Application received" : "Project brief received"}
        </p>
        <h3 className="mt-4 max-w-xl text-4xl font-bold leading-none tracking-[-0.04em] sm:text-5xl">
          Thank you. We’ll take it from here.
        </h3>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/65">
          {isTalent
            ? "Our team will review your introduction and respond by email. Sending an application does not guarantee representation or work."
            : "Our team will review the brief and respond by email. Complete project details help us assess the requirement."}
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setState("idle")}
          className="mx-auto mt-8 rounded-none border-white! text-white! hover:bg-white! hover:text-black!"
        >
          Send another {isTalent ? "application" : "brief"}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
      <form
        onFocusCapture={() => {
          if (!started.current) {
            started.current = true;
            trackEvent(`${kind}_form_start`);
          }
        }}
        onSubmit={submit}
        className="border border-black bg-white p-5 sm:p-8 lg:p-10"
        noValidate={false}
      >
        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <p className="eyebrow text-black/45 flex items-center gap-2">
              <UserRound size={16} strokeWidth={1.8} />
              Your details
            </p>
          </div>
          <div>
            <FieldLabel htmlFor={`${prefix}-name`}>Full name</FieldLabel>
            <Input
              id={`${prefix}-name`}
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              className="h-12 rounded-none border-black/35 bg-white px-4 text-base"
            />
          </div>
          <div>
            <FieldLabel htmlFor={`${prefix}-email`}>Email address</FieldLabel>
            <Input
              id={`${prefix}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={160}
              className="h-12 rounded-none border-black/35 bg-white px-4 text-base"
            />
          </div>
          <div>
            <FieldLabel htmlFor={`${prefix}-phone`} optional>
              Phone number
            </FieldLabel>
            <Input
              id={`${prefix}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              className="h-12 rounded-none border-black/35 bg-white px-4 text-base"
            />
          </div>
          <div>
            <FieldLabel htmlFor={`${prefix}-location`}>
              Current location
            </FieldLabel>
            <Input
              id={`${prefix}-location`}
              name="location"
              autoComplete="address-level2"
              required
              minLength={2}
              maxLength={100}
              placeholder="City, country"
              className="h-12 rounded-none border-black/35 bg-white px-4 text-base"
            />
          </div>
          <div className="sm:col-span-2 mt-2 border-t border-black/15 pt-6">
            <p className="eyebrow text-black/45 flex items-center gap-2">
              {isTalent ? (
                <BriefcaseBusiness size={16} strokeWidth={1.8} />
              ) : (
                <Clapperboard size={16} strokeWidth={1.8} />
              )}
              {isTalent ? "Your practice" : "Your production"}
            </p>
          </div>
          <div>
            <FieldLabel htmlFor={`${prefix}-company`} optional>
              {isTalent ? "Current representation" : "Company or production"}
            </FieldLabel>
            <Input
              id={`${prefix}-company`}
              name="company"
              maxLength={120}
              placeholder={
                isTalent ? "Agency name or independent" : "Company name"
              }
              className="h-12 rounded-none border-black/35 bg-white px-4 text-base"
            />
          </div>
          <div>
            <FieldLabel htmlFor={`${prefix}-category`}>
              {isTalent ? "Primary discipline" : "Project type"}
            </FieldLabel>
            <NativeSelect
              id={`${prefix}-category`}
              name="category"
              required
              defaultValue=""
              className="h-12 w-full rounded-none border-black/35 bg-white px-4 text-base"
            >
              <NativeSelectOption value="" disabled>
                Select one
              </NativeSelectOption>
              {categoryOptions[kind].map((option) => (
                <NativeSelectOption key={option} value={option}>
                  {option}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor={`${prefix}-links`} optional>
              {isTalent
                ? "Portfolio, showreel or profile links"
                : "Project or company link"}
            </FieldLabel>
            <Input
              id={`${prefix}-links`}
              name="links"
              maxLength={600}
              placeholder="https://… (separate multiple links with spaces)"
              className="h-12 rounded-none border-black/35 bg-white px-4 text-base"
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor={`${prefix}-message`}>
              {isTalent
                ? "Your work and direction"
                : "Tell us about the project"}
            </FieldLabel>
            <Textarea
              id={`${prefix}-message`}
              name="message"
              required
              minLength={20}
              maxLength={3000}
              rows={7}
              placeholder={
                isTalent
                  ? "Share selected experience, languages, availability and the work you want to pursue next."
                  : "Include roles, format, language, dates, location, budget range and decision timeline."
              }
              className="min-h-44 resize-y rounded-none border-black/35 bg-white px-4 py-3 text-base"
            />
            <p className="mt-2 text-xs leading-relaxed text-black/45">
              {isTalent
                ? "A concise introduction helps us understand where you are and what comes next."
                : "Share what you know so far. We can clarify any open details together."}
            </p>
          </div>
        </div>

        <div
          className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor={`${prefix}-website`}>Website</label>
          <input
            id={`${prefix}-website`}
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="mt-7 flex items-start gap-3 border-t border-black/15 pt-6">
          <Checkbox
            id={`${prefix}-consent`}
            checked={consent}
            onCheckedChange={(value) => {
              setConsent(value === true);
              if (value === true && state === "error") {
                setError("");
                setState("idle");
              }
            }}
            aria-required="true"
            className="mt-0.5 size-5 rounded-none border-black"
          />
          <label
            htmlFor={`${prefix}-consent`}
            className="max-w-2xl text-sm leading-relaxed text-black/65"
          >
            I agree that Big Fish Collective may use these details to assess and
            respond to my {isTalent ? "application" : "enquiry"}.
          </label>
        </div>

        {state === "error" && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 border border-black bg-white p-4 text-sm"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-7 flex flex-col gap-4 border-t border-black/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-black/50">
            Fields without an “Optional” label are required.
          </p>
          <Button
            type="submit"
            disabled={state === "submitting"}
            size="lg"
            className="h-12 rounded-none bg-black px-7 text-white hover:bg-black/80 disabled:opacity-60"
          >
            {state === "submitting" ? (
              <>
                <LoaderCircle className="animate-spin" /> Sending
              </>
            ) : (
              <>
                {isTalent ? "Submit application" : "Send project brief"}{" "}
                <ArrowUpRight />
              </>
            )}
          </Button>
        </div>
      </form>

      <aside className="border border-black bg-black p-6 text-white sm:p-8">
        <p className="eyebrow text-white/45">
          {isTalent ? "Before you apply" : "A useful brief"}
        </p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.035em]">
          {isTalent
            ? "Introduce yourself in your own way."
            : "Start with the details you have."}
        </h3>
        <ul className="mt-7 space-y-5 border-t border-white/20 pt-6 text-sm leading-relaxed text-white/65">
          {(isTalent
            ? [
                "Tell us what you do and where you want to go.",
                "Add links to selected work, a portfolio or a showreel.",
                "Include your location, languages and availability if relevant.",
              ]
            : [
                "Describe the role, format and creative requirement.",
                "Include dates, location, language and budget range if known.",
                "Share the decision timeline and any useful references.",
              ]
          ).map((item, index) => (
            <li key={item} className="grid grid-cols-[1.5rem_1fr] gap-3">
              <span className="text-xs tracking-[0.12em] font-semibold mt-2 text-white">
                0{index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {isTalent && (
          <p className="mt-7 border-t border-white/20 pt-6 text-xs leading-relaxed text-white/70!">
            Applications are reviewed for fit. Sending an application does not
            guarantee representation or work.
          </p>
        )}
      </aside>
    </div>
  );
}

export function EnquiryForms() {
  const [active, setActive] = useState<EnquiryKind>("partner");

  useEffect(() => {
    const syncFromHash = () =>
      setActive(
        window.location.hash === "#talent-application" ? "talent" : "partner",
      );
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function changeTab(value: string) {
    const next = value as EnquiryKind;
    setActive(next);
    window.history.replaceState(
      null,
      "",
      next === "talent" ? "#talent-application" : "#project-brief",
    );
  }

  const isTalent = active === "talent";

  return (
    <section id="project-brief" className="scroll-mt-20 bg-white">
      <div
        id="talent-application"
        className="scroll-mt-20 mx-auto max-w-360 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <Tabs value={active} onValueChange={changeTab}>
          <div className="grid gap-8 border-b border-black pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">
                {isTalent ? "Join the collective" : "Start a project brief"}
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[0.96] tracking-[-0.045em] sm:text-6xl">
                {isTalent
                  ? "Build a career with direction."
                  : "Bring the right team together."}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-black/60">
                {isTalent
                  ? "Tell us about your craft, experience and ambitions. Share work that helps us understand your point of view."
                  : "Share the production, roles and timing. We’ll review the brief and get back to you by email."}
              </p>
            </div>
            <TabsList
              className="h-14! w-full rounded-none border border-black bg-white py-0 px-1 lg:w-auto"
              aria-label="Choose the right form"
            >
              <TabsTrigger
                value="partner"
                className="h-12 rounded-none px-5 text-base data-[state=active]:bg-black! data-[state=active]:text-white!"
              >
                I’m hiring
              </TabsTrigger>
              <TabsTrigger
                value="talent"
                className="h-12 rounded-none px-5 text-base data-[state=active]:bg-black! data-[state=active]:text-white!"
              >
                I’m talent
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="partner" className="mt-8">
            <EnquiryForm kind="partner" />
          </TabsContent>
          <TabsContent value="talent" className="mt-8">
            <EnquiryForm kind="talent" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
