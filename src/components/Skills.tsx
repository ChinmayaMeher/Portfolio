"use client";

import React from "react";
import { motion } from "framer-motion";
import { SKILL_CATEGORIES } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-background border-t border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="text-xs font-mono tracking-widest text-accent uppercase mb-3">
            03 — Skills
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Technical <span className="italic font-serif text-accent">Arsenal</span>
          </h2>
          <p className="text-muted text-base max-w-2xl">
            Technologies, frameworks, and engineering tools I use across full-stack, machine learning, and computer vision systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-surface border border-surfaceBorder hover:border-accent/40 transition-all duration-300 flex flex-col group hover:shadow-glow-sm"
            >
              <div className="flex items-center space-x-3 mb-5">
                <span className="text-2xl p-2 rounded-xl bg-neutral-900 border border-neutral-800">
                  {category.icon}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: idx * 0.04 + skillIdx * 0.03 }}
                    whileHover={{ scale: 1.08, color: "#00E599" }}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:border-accent/50 hover:bg-neutral-800 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
