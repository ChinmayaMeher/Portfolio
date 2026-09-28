"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Brain,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ChevronDown,
  Download,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/personal";
import { getAssetPath } from "@/lib/basePath";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = PERSONAL_INFO.roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-sky-500/5 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Left Column — Text (order-2 on mobile = below image; order-1 on desktop = left) */}
          <motion.div
            className="lg:col-span-7 text-left space-y-5 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-surface border border-surfaceBorder text-xs text-neutral-300 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span>{PERSONAL_INFO.tagline}</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
            >
              Chinmaya{" "}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">
                Meher
              </span>
            </motion.h1>

            {/* Typing Role */}
            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-2xl font-mono text-neutral-300 flex items-center min-h-[2.5rem]"
            >
              <span className="text-muted mr-2">{PERSONAL_INFO.rolePrefix}</span>
              <span className="text-white font-semibold">{displayedText}</span>
              <span className="w-2.5 h-6 bg-accent ml-1 animate-pulse" />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted max-w-xl leading-relaxed"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#portfolio"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-accent text-black font-semibold text-sm hover:bg-accent-hover hover:shadow-glow transition-all duration-200"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={getAssetPath(PERSONAL_INFO.cvPath)}
                download
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-surface border border-surfaceBorder text-white text-sm font-medium hover:border-neutral-600 hover:bg-surfaceHover transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3.5 rounded-xl text-muted text-sm font-medium hover:text-white transition-colors"
              >
                Let&apos;s Talk →
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-3 pt-2 text-muted"
            >
              {[
                { href: PERSONAL_INFO.socials.github, label: "GitHub", icon: <Github className="w-5 h-5" /> },
                { href: PERSONAL_INFO.socials.linkedin, label: "LinkedIn", icon: <Linkedin className="w-5 h-5" /> },
                { href: PERSONAL_INFO.socials.twitter, label: "Twitter / X", icon: <Twitter className="w-5 h-5" /> },
                { href: PERSONAL_INFO.socials.instagram, label: "Instagram", icon: <Instagram className="w-5 h-5" /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-surface border border-surfaceBorder hover:text-accent hover:border-accent/40 hover:shadow-glow-sm transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — Visual (order-1 on mobile = ABOVE text; order-2 on desktop = right) */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Mobile: compact w-36, tablet: w-56, desktop: w-96 */}
            <div className="relative w-36 h-36 sm:w-56 sm:h-56 lg:w-96 lg:h-96">
              <div
                className="absolute inset-0 rounded-full border border-dashed border-accent/20 animate-spin"
                style={{ animationDuration: "30s" }}
              />
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-accent/20 via-transparent to-accent/10 blur-xl" />

              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-surfaceBorder bg-surface p-1.5 shadow-2xl group hover:border-accent/50 transition-colors duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-neutral-900">
                  <Image
                    src={getAssetPath(PERSONAL_INFO.profilePhoto)}
                    alt={PERSONAL_INFO.name}
                    fill
                    sizes="(max-width: 640px) 144px, (max-width: 1024px) 224px, 384px"
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Floating badge — Dev */}
              <motion.div
                className="absolute -top-2 -left-2 sm:-top-3 sm:-left-5 px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-surface/90 border border-surfaceBorder backdrop-blur-md shadow-lg flex items-center space-x-1.5 text-[10px] sm:text-xs font-mono text-white"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                <span>Full-Stack</span>
              </motion.div>

              {/* Floating badge — AI/ML */}
              <motion.div
                className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-5 px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-surface/90 border border-surfaceBorder backdrop-blur-md shadow-lg flex items-center space-x-1.5 text-[10px] sm:text-xs font-mono text-white"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 2, ease: "easeInOut" }}
              >
                <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                <span>AI / ML</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted/60 hover:text-muted transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[11px] font-mono tracking-widest uppercase mb-1">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
