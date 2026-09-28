"use client";

import React, { useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/personal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.details.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Submitting via FormSubmit AJAX endpoint without page redirect
      const response = await fetch("https://formsubmit.co/ajax/chinmayameher69@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Failed to send message. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err.message || "Something went wrong. You can email me directly."
      );
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-background border-t border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-mono tracking-widest text-accent uppercase mb-3">
          06 — Contact
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Outreach & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Let&apos;s Build{" "}
              <span className="italic font-serif text-accent">Together</span>
            </h2>

            <p className="text-muted text-base leading-relaxed">
              Have an exciting project in mind, an opportunity to discuss, or just want to connect? My inbox is always open.
            </p>

            <div className="space-y-4 pt-4">
              {/* Copy Email Button Widget */}
              <div className="p-4 rounded-2xl bg-surface border border-surfaceBorder flex items-center justify-between">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-mono text-muted">Email Me</div>
                    <div className="text-sm font-semibold text-white truncate">
                      {PERSONAL_INFO.details.email}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-muted hover:text-accent hover:border-accent/40 transition-colors"
                  aria-label="Copy email address"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-accent" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* LinkedIn Link */}
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-surface border border-surfaceBorder flex items-center space-x-3 hover:border-accent/40 hover:bg-surfaceHover transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted">LinkedIn</div>
                  <div className="text-sm font-semibold text-white">
                    linkedin.com/in/chinmaya-meher
                  </div>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl bg-surface border border-surfaceBorder flex items-center space-x-3 hover:border-accent/40 hover:bg-surfaceHover transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted">GitHub</div>
                  <div className="text-sm font-semibold text-white">
                    github.com/ChinmayaMeher
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-surfaceBorder shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Status Messages */}
                {status === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs sm:text-sm flex items-center space-x-2.5">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Thank you! Your message has been sent successfully. I will get back to you shortly.
                    </span>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-400 text-xs sm:text-sm flex items-center space-x-2.5">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Alex Smith"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-surfaceBorder text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-surfaceBorder text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    />
                  </div>
                </div>

                {/* Phone (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300">
                    Phone Number <span className="text-muted text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-surfaceBorder text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-300">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project, idea, or role..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-surfaceBorder text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 rounded-xl bg-accent text-black font-semibold text-sm hover:bg-accent-hover hover:shadow-glow transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <span className="font-mono text-xs animate-pulse">
                      Sending Message...
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
