"use client";

import React from "react";
import { GraduationCap, MapPin, Mail, Rocket } from "lucide-react";
import { PERSONAL_INFO } from "@/data/personal";

export default function About() {
  return (
    <section id="about" className="py-24 relative bg-background border-t border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="text-xs font-mono tracking-widest text-accent uppercase mb-3">
          01 — About
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative and Stats */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Crafting Digital{" "}
              <span className="italic font-serif text-accent">Experiences</span>
            </h2>

            <div className="space-y-4 text-muted text-base sm:text-lg leading-relaxed">
              {PERSONAL_INFO.aboutParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            {/* Stats Counter Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-surfaceBorder">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold font-mono text-white flex items-baseline">
                    <span>{stat.value}</span>
                    <span className="text-accent text-2xl ml-0.5">{stat.suffix}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Info Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Education */}
            <div className="p-5 rounded-2xl bg-surface border border-surfaceBorder hover:border-accent/40 transition-colors duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Education</h3>
              <p className="text-xs text-muted leading-relaxed">
                {PERSONAL_INFO.details.education}
                <br />
                <span className="text-accent font-mono font-medium">
                  {PERSONAL_INFO.details.cgpa}
                </span>
              </p>
            </div>

            {/* Card 2: Location */}
            <div className="p-5 rounded-2xl bg-surface border border-surfaceBorder hover:border-accent/40 transition-colors duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Location</h3>
              <p className="text-xs text-muted leading-relaxed">
                {PERSONAL_INFO.details.location}
              </p>
            </div>

            {/* Card 3: Email */}
            <div className="p-5 rounded-2xl bg-surface border border-surfaceBorder hover:border-accent/40 transition-colors duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Email</h3>
              <p className="text-xs text-muted leading-relaxed break-all">
                {PERSONAL_INFO.details.email}
              </p>
            </div>

            {/* Card 4: Focus */}
            <div className="p-5 rounded-2xl bg-surface border border-surfaceBorder hover:border-accent/40 transition-colors duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">Focus</h3>
              <p className="text-xs text-muted leading-relaxed">
                {PERSONAL_INFO.details.focus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
