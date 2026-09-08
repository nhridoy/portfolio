"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { type FormEvent, type PointerEvent, useRef, useState } from "react";
import { ContactGlobe } from "./contact-globe";

const services = [
  "Full-stack development",
  "Frontend",
  "Backend & APIs",
  "Something else",
];
const inputClass =
  "w-full rounded-none border-0 border-b border-background/25 bg-transparent px-0 py-1.5 [@media(min-width:768px)_and_(min-height:800px)]:py-3 text-base text-background placeholder:text-background/30 focus:border-background focus:outline-none focus:ring-0 transition-colors";

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  const [draftOpened, setDraftOpened] = useState(false);
  const email = "hi@iamnahid.com";
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  function moveGlassLight(event: PointerEvent<HTMLElement>) {
    const form = formRef.current;
    if (!form || event.pointerType !== "mouse" || reducedMotion) return;
    form.style.setProperty("--border-opacity", "1");
    const rect = form.getBoundingClientRect();
    form.style.setProperty("--light-x", `${event.clientX - rect.left}px`);
    form.style.setProperty("--light-y", `${event.clientY - rect.top}px`);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied");
    } catch {
      setCopyStatus("Please select and copy the email address.");
    }
  }

  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hi Nahid,\n\nI'm ${data.get("name")}.\nEmail: ${data.get("email")}\nInterested in: ${data.getAll("services").join(", ") || "Let's discuss"}\nBudget: ${data.get("budget") || "Let's discuss"}\n\n${data.get("message")}\n`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Project enquiry from ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
    const nativeEvent = event.nativeEvent as SubmitEvent & {
      agentInvoked?: boolean;
      respondWith?: (result: Promise<unknown>) => void;
    };
    if (nativeEvent.agentInvoked && nativeEvent.respondWith) {
      nativeEvent.respondWith(
        Promise.resolve({
          status: "draft_requested",
          message:
            "An email draft was requested. The user must review and send it in their email application. No message has been sent by this website.",
        }),
      );
    }
  }

  return (
    <section
      id="contact"
      onPointerMove={moveGlassLight}
      onPointerLeave={() =>
        formRef.current?.style.setProperty("--border-opacity", "0")
      }
      aria-labelledby="contact-heading"
      className="relative flex h-screen items-center overflow-hidden bg-foreground py-4 text-background md:py-6"
    >
      <ContactGlobe />
      <div className="theme-container relative z-10 max-h-full">
        <div className="mb-4 flex items-center justify-between gap-2 border-b border-background/15 pb-3">
          <span className="text-xs text-background/50">
            HAVE A PROJECT IN MIND?
          </span>
          <span className="flex items-center gap-2 text-xs text-background/65">
            <span className="size-1.5 rounded-full bg-background" />
            Available for hire
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[0.85fr_1.15fr] md:gap-8 xl:gap-16 [@media(max-height:500px)_and_(min-width:600px)]:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col items-start">
            <h2
              id="contact-heading"
              className="m-0! mb-2! text-2xl font-medium leading-[1.1] md:text-3xl lg:text-4xl"
            >
              Good things start
              <br />
              with a conversation.
            </h2>
            <p className="m-0! max-w-80 text-xs leading-snug text-background/55">
              Have something in mind? Tell me what you're building, where you're
              stuck, or what could be better.
            </p>
            <p className="m-0! mt-2! text-xs text-background/55">
              Based in Bangladesh. Working across borders.
            </p>
            <div className="mt-2 flex items-center gap-3 md:mt-5">
              <a
                href={`mailto:${email}`}
                className="border-b border-background/30 pb-1 text-base transition-colors hover:border-background hover:text-background md:text-xl"
              >
                {email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="flex size-8 items-center justify-center rounded-full border border-background/20 transition-colors hover:border-background focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {copyStatus === "Email copied" ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
            <p role="status" className="m-0! text-xs text-background">
              {copyStatus}
            </p>
            <div className="mt-2 flex gap-5 md:mt-5">
              <a
                href="https://github.com/nhridoy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background"
              >
                GitHub <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/nahidujjaman-hridoy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background"
              >
                LinkedIn <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>

          <form
            {...{
              toolname: "prepare_project_enquiry",
              tooldescription:
                "Prepare an email draft to Nahidujjaman Hridoy about a software project. Fill the contact form for user review. Submitting opens the email app; it does not send the email.",
            }}
            onSubmit={openDraft}
            ref={formRef}
            className="relative min-w-0 rounded-3xl border border-background/20 bg-background/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(255,255,255,0.03),0_24px_64px_rgba(0,0,0,0.18)] backdrop-blur-md backdrop-saturate-125 [background-image:radial-gradient(350px_circle_at_15%_0%,rgba(255,255,255,0.09),transparent_75%)] md:rounded-[2rem] md:p-6 [@media(min-width:768px)_and_(min-height:800px)]:p-8 [@media(min-height:950px)]:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-[inherit] p-px opacity-[var(--border-opacity,0)] transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(180px circle at var(--light-x,0px) var(--light-y,0px), rgba(255,255,255,0.75), transparent 75%)",
                maskImage:
                  "linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)",
                maskClip: "content-box, border-box",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
              }}
            />
            <fieldset className="m-0 min-w-0 border-0 p-0">
              <legend className="mb-2 text-xs text-background/50">
                WHAT CAN I HELP WITH?
              </legend>
              <div className="flex flex-wrap gap-1.5">
                {services.map((service) => (
                  <label key={service} className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      name="services"
                      value={service}
                      className="peer sr-only"
                      {...{
                        toolparamdescription:
                          "Software services requested for the project. Select any that apply.",
                      }}
                    />
                    <span className="block rounded-md border border-background/25 px-2.5 py-1.5 text-xs text-background/65 transition-colors hover:border-background/60 peer-checked:border-background peer-checked:bg-background peer-checked:text-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4">
                      {service}
                    </span>
                  </label>
                ))}{" "}
              </div>
            </fieldset>
            <div className="mt-3 [@media(min-width:768px)_and_(min-height:800px)]:mt-6 grid grid-cols-2 gap-3">
              <label
                className="text-xs text-background/55"
                htmlFor="contact-name"
              >
                Your name
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Alex Morgan"
                  className={inputClass}
                />
              </label>
              <label
                className="text-xs text-background/55"
                htmlFor="contact-email"
              >
                Your email
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="alex@company.com"
                  className={inputClass}
                />
              </label>
            </div>
            <label
              className="mt-3 [@media(min-width:768px)_and_(min-height:800px)]:mt-6 block text-xs text-background/55"
              htmlFor="contact-message"
            >
              A little about your project
              <textarea
                id="contact-message"
                name="message"
                required
                rows={2}
                maxLength={3000}
                placeholder="The idea, the challenge, the possibilities..."
                className={`${inputClass} resize-none`}
              />
            </label>
            <label
              className="mt-3 [@media(min-width:768px)_and_(min-height:800px)]:mt-6 block text-xs text-background/55"
              htmlFor="contact-budget"
            >
              Budget, if you have one{" "}
              <span className="text-xs text-background/30">(optional)</span>
              <input
                id="contact-budget"
                name="budget"
                maxLength={100}
                placeholder="A range or let's discuss"
                className={inputClass}
              />
            </label>
            <div className="mt-3 [@media(min-width:768px)_and_(min-height:800px)]:mt-6 flex items-center justify-between gap-3">
              <p className="m-0! max-w-40 text-xs leading-relaxed text-background/40">
                Opens a draft in your email app.
              </p>
              <button
                type="submit"
                className="group inline-flex min-h-10 items-center justify-between gap-4 rounded-md bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-background/85 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Let's talk{" "}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </button>
            </div>
            <p role="status" className="m-0! mt-1! text-xs text-background/55">
              {draftOpened
                ? "Continue in your email app to send. If it didn't open, email me directly using the link."
                : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
