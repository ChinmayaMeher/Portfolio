"use client";

import React from "react";
import { SKILL_CATEGORIES } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-background border-t border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono tracking-widest text-accent uppercase mb-3">
            03 — Skills
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Technical <span className="italic font-serif text-accent">Arsenal</span>
          </h2>
          <p className="text-muted text-base max-w-2xl">
            Technologies, frameworks, and engineering tools I utilize across full-stack applications, machine learning systems, and computer vision workflows.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-2xl bg-surface border border-surfaceBorder hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-glow-sm"
            >
              <div>
                {/* Header with Emoji / Icon */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl p-2 rounded-xl bg-neutral-900 border border-neutral-800">
                    {category.icon}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-accent hover:border-accent/50 hover:bg-neutral-800 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
