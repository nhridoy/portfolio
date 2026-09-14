"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { type PointerEvent, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import sendEmailAction from "@/actions/sendEmailAction";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import {
  sendEmailSchema,
  type sendEmailSchemaType,
} from "@/schema/sendEmailSchema";
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
  const [sendState, setSendState] = useState<"success" | "failed" | "idle">(
    "idle",
  );
  const [isPending, startTransition] = useTransition();
  const email = "hi@iamnahid.com";
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  const { handleSubmit, control, register, formState, reset } =
    useForm<sendEmailSchemaType>({
      defaultValues: {
        name: "",
        email: "",
        services: [],
        budget: "",
        message: "",
      },
      resolver: zodResolver(sendEmailSchema),
    });

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

  const onSubmit = (data: sendEmailSchemaType) => {
    startTransition(async () => {
      const response = await sendEmailAction(data);

      if (response.status === "success") {
        setSendState("success");
        // reset();
      } else {
        setSendState("failed");
      }
    });
  };

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
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            className="relative min-w-0 rounded-3xl border border-background/20 bg-background/4.5 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(255,255,255,0.03),0_24px_64px_rgba(0,0,0,0.18)] backdrop-blur-md backdrop-saturate-125 bg-[radial-gradient(350px_circle_at_15%_0%,rgba(255,255,255,0.09),transparent_75%)] md:rounded-[2rem] md:p-6 [@media(min-width:768px)_and_(min-height:800px)]:p-8 [@media(min-height:950px)]:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-[inherit] p-px opacity-(--border-opacity,0) transition-opacity duration-300"
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
            <FieldGroup>
              <fieldset className="m-0 min-w-0 border-0 p-0">
                <legend
                  className={cn("mb-2 text-xs text-background/50", {
                    "text-destructive": formState.errors.services,
                  })}
                >
                  WHAT CAN I HELP WITH?
                </legend>
                <div className="flex flex-wrap gap-1.5">
                  {services.map((service) => (
                    <label key={service} className="relative cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("services")}
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

              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  control={control}
                  name="name"
                  label="Your name"
                  placeholder="Alex Morgan"
                />
                <FormInput
                  control={control}
                  name="email"
                  label="Your email"
                  placeholder="alex@company.com"
                />
              </div>
              <FormTextarea
                control={control}
                name="message"
                label="A little about your project"
                placeholder="The idea, the challenge, the possibilities..."
              />
              <FormInput
                control={control}
                name="budget"
                label="Budget, if you have one (optional)"
                placeholder="A range or let's discuss"
              />
            </FieldGroup>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p
                className={cn("text-xs", {
                  "text-green-500": sendState === "success",
                  "text-destructive": sendState === "failed",
                })}
              >
                {sendState === "success"
                  ? "Email sent successfully! Please check your inbox."
                  : sendState === "failed"
                    ? "Failed to send email. Please try again."
                    : ""}
              </p>
              <button
                type="submit"
                disabled={isPending}
                className="group cursor-pointer inline-flex min-h-10 items-center justify-between gap-4 rounded-md bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-background/85 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Let's talk{" "}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
