"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { button as Button, div as Div } from "framer-motion/m";
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Globe,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Web Development",
  ]);

  // Interactive Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "$15k - $30k",
    message: "",
  });

  const email = "hi@iamnahid.com";

  const services = [
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full-Stack Apps",
    "API & Architecture",
  ];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  // Magnetic Button Setup
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/nhridoy" },
    { name: "LinkedIn", url: "https://linkedin.com/in/nahidujjaman-hridoy" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-foreground text-background"
    >
      <div className="theme-container flex flex-col gap-12 md:gap-20">
        {/* Top Status & Indicator Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-background/10 pb-8 text-sm text-neutral-400 font-mono uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for New Projects</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Globe className="size-4" /> UTC+6 (Bangladesh)
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> GMT+6
            </span>
          </div>
        </div>

        {/* Main Animated Form Container */}
        <Div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-10"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-full bg-background/10 text-background">
                <Sparkles className="size-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                [ Interactive Contact Form ]
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              Fill in the blanks below to drop me a message
            </p>
          </div>

          {/* Service Selection Tags */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block">
              I need help with:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {services.map((service) => {
                const isSelected = selectedServices.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 ${
                      isSelected
                        ? "bg-background text-foreground border-background shadow-lg shadow-background/10 scale-105"
                        : "bg-transparent text-neutral-400 border-background/20 hover:border-background/50 hover:text-background"
                    }`}
                  >
                    {isSelected ? `✓ ${service}` : `+ ${service}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial Form with Elevated Budget Options */}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed md:leading-snug">
              Hello! My name is{" "}
              <input
                type="text"
                required
                placeholder="your name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-transparent border-b-2 border-background/30 text-background placeholder-neutral-600 focus:outline-none focus:border-background transition-colors px-2 py-0.5 font-normal w-52 md:w-72"
              />{" "}
              and I’m looking for help with a project. You can reach me at
              <input
                type="email"
                required
                placeholder="your email *"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-transparent border-b-2 border-background/30 text-background placeholder-neutral-600 focus:outline-none focus:border-background transition-colors px-2 py-0.5 font-normal w-64 md:w-80"
              />{" "}
              . Our estimated budget is around{" "}
              <select
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="bg-transparent border-b-2 border-background/30 text-background focus:outline-none focus:border-background transition-colors px-2 py-0.5 font-normal cursor-pointer"
              >
                <option value="<$5k" className="bg-neutral-900 text-background">
                  &lt; $5k
                </option>
                <option
                  value="$5k - $15k"
                  className="bg-neutral-900 text-background"
                >
                  $5k - $15k
                </option>
                <option
                  value="$15k - $30k"
                  className="bg-neutral-900 text-background"
                >
                  $15k - $30k
                </option>
                <option
                  value="$30k - $50k"
                  className="bg-neutral-900 text-background"
                >
                  $30k - $50k
                </option>
                <option
                  value="$50k+"
                  className="bg-neutral-900 text-background"
                >
                  $50k+
                </option>
              </select>
              . Here are a few details:
              <textarea
                placeholder="tell me about your goals..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="bg-transparent border-b-2 border-background/30 text-background placeholder-neutral-600 focus:outline-none focus:border-background transition-colors px-2 py-0.5 font-normal w-full inline-block mt-2 md:mt-0"
              />
            </div>

            {/* Action Area */}
            <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              {/* Direct Email */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
                  Prefer direct email?
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="text-lg md:text-xl font-medium hover:text-neutral-400 transition-colors"
                  >
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="p-2 rounded-full border border-background/10 hover:border-background/40 transition-colors"
                    aria-label="Copy Email"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Magnetic Submit Button */}
              <Button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting || submitted}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x: mouseXSpring, y: mouseYSpring }}
                className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-background text-foreground font-semibold uppercase tracking-wider text-xs md:text-sm flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 disabled:opacity-50 shrink-0 self-end md:self-auto shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : submitted ? (
                  <>
                    <span>Message Sent!</span>
                    <Check className="w-5 h-5 text-emerald-600" />
                  </>
                ) : (
                  <div className="flex items-center gap-1">
                    <span>Send Message</span>
                    <ArrowUpRight className="size-4" />
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Div>
      </div>
    </section>
  );
}
