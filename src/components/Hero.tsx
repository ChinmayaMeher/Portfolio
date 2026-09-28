"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Brain,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ChevronDown,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/personal";
import { getAssetPath } from "@/lib/basePath";

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
      {/* Ambient background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent.cyan/10 rounded-full blur-[140px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "4rem 4rem",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Intro */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-surface border border-surfaceBorder text-xs text-neutral-300 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span>{PERSONAL_INFO.tagline}</span>
            </div>

            {/* Name Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              Chinmaya{" "}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">
                Meher
              </span>
            </h1>

            {/* Dynamic Typing Title */}
            <div className="text-lg sm:text-2xl font-mono text-neutral-300 flex items-center min-h-[2.5rem]">
              <span className="text-muted mr-2">{PERSONAL_INFO.rolePrefix}</span>
              <span className="text-white font-semibold">{displayedText}</span>
              <span className="w-2.5 h-6 bg-accent ml-1 animate-pulse" />
            </div>

            {/* Bio Description */}
            <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#portfolio"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-accent text-black font-semibold text-sm hover:bg-accent-hover hover:shadow-glow transition-all duration-200"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-surface border border-surfaceBorder text-white text-sm font-medium hover:border-neutral-600 hover:bg-surfaceHover transition-all duration-200"
              >
                Let&apos;s Talk
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-4 text-muted">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl bg-surface border border-surfaceBorder hover:text-accent hover:border-accent/40 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-surface border border-surfaceBorder hover:text-accent hover:border-accent/40 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="p-2.5 rounded-xl bg-surface border border-surfaceBorder hover:text-accent hover:border-accent/40 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-xl bg-surface border border-surfaceBorder hover:text-accent hover:border-accent/40 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-accent/20 animate-spin" style={{ animationDuration: "30s" }} />
              {/* Subtle back glowing disc */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-accent/20 via-transparent to-accent/10 blur-xl" />

              {/* Avatar Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-surfaceBorder bg-surface p-2 shadow-2xl group hover:border-accent/50 transition-colors duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden relative bg-neutral-900">
                  <Image
                    src={getAssetPath(PERSONAL_INFO.profilePhoto)}
                    alt={PERSONAL_INFO.name}
                    fill
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Floating Badge 1 - Developer */}
              <div className="absolute -top-3 -left-3 sm:-left-6 px-3.5 py-1.5 rounded-xl bg-surface/90 border border-surfaceBorder backdrop-blur-md shadow-lg flex items-center space-x-2 text-xs font-mono text-white animate-float-slow">
                <Code2 className="w-4 h-4 text-accent" />
                <span>Full-Stack</span>
              </div>

              {/* Floating Badge 2 - AI/ML */}
              <div className="absolute -bottom-3 -right-3 sm:-right-6 px-3.5 py-1.5 rounded-xl bg-surface/90 border border-surfaceBorder backdrop-blur-md shadow-lg flex items-center space-x-2 text-xs font-mono text-white animate-float-slow" style={{ animationDelay: "2s" }}>
                <Brain className="w-4 h-4 text-accent" />
                <span>AI / ML</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted/60 hover:text-muted transition-colors">
        <span className="text-[11px] font-mono tracking-widest uppercase mb-1">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
