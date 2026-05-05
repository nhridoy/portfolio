"use client";

import { useState } from "react";
import { AnimatedLink } from "@/components/ui/animated-link";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { H2, Muted } from "@/components/ui/typography";
import { CONTACT } from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  message: string;
}

function Input({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required,
}: Readonly<{
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}>) {
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-transparent border-b border-border py-3 px-0 text-base outline-none focus:border-foreground/70 transition-colors placeholder:text-muted-foreground/50"
    />
  );
}

function Textarea({
  name,
  placeholder,
  value,
  onChange,
  required,
  rows = 5,
}: Readonly<{
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}>) {
  return (
    <textarea
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      className="w-full bg-transparent border-b border-border py-3 px-0 text-base outline-none focus:border-foreground/70 transition-colors placeholder:text-muted-foreground/50 resize-none"
    />
  );
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact">
      <Container>
        <BlurReveal>
          <H2>Get in Touch</H2>
        </BlurReveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <BlurReveal delay={0.1}>
            <div className="flex flex-col gap-6">
              <div>
                <Muted className="block mb-1 text-xs uppercase tracking-widest font-mono">
                  Email
                </Muted>
                <AnimatedLink
                  href={`mailto:${CONTACT.email}`}
                  className="text-lg hover:text-foreground/70 transition-colors"
                >
                  {CONTACT.email}
                </AnimatedLink>
              </div>
              <div>
                <Muted className="block mb-1 text-xs uppercase tracking-widest font-mono">
                  GitHub
                </Muted>
                <AnimatedLink
                  href={`https://${CONTACT.github}`}
                  external
                  className="text-lg hover:text-foreground/70 transition-colors"
                >
                  {CONTACT.github}
                </AnimatedLink>
              </div>
              <div>
                <Muted className="block mb-1 text-xs uppercase tracking-widest font-mono">
                  LinkedIn
                </Muted>
                <AnimatedLink
                  href={`https://${CONTACT.linkedin}`}
                  external
                  className="text-lg hover:text-foreground/70 transition-colors"
                >
                  {CONTACT.linkedin}
                </AnimatedLink>
              </div>
            </div>
          </BlurReveal>

          <BlurReveal delay={0.2}>
            {submitted ? (
              <div className="flex flex-col items-start gap-4 p-6 bg-muted/30 rounded-lg">
                <p className="text-lg font-medium">
                  Thank you for your message!
                </p>
                <Muted>I'll get back to you as soon as possible.</Muted>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Input
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  name="message"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  required
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </BlurReveal>
        </div>
      </Container>
    </Section>
  );
}
