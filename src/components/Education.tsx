"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen, Calendar, MapPin } from "lucide-react";
import { EDUCATION_DATA } from "@/data/education";

export default function Education() {
  const getIcon = (id: string) => {
    switch (id) {
      case "cutm":  return <GraduationCap className="w-5 h-5" />;
      case "vhss":  return <School className="w-5 h-5" />;
      default:      return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <section id="education" className="py-24 relative bg-background border-t border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="text-xs font-mono tracking-widest text-accent uppercase mb-3">
            04 — Education
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Academic <span className="italic font-serif text-accent">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-surfaceBorder ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {EDUCATION_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Timeline Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-10 h-10 rounded-full bg-surface border-2 border-surfaceBorder flex items-center justify-center text-muted group-hover:border-accent group-hover:text-accent group-hover:shadow-glow-sm transition-all duration-300">
                {getIcon(item.id)}
              </div>

              {/* Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-surfaceBorder hover:border-accent/40 transition-all duration-300 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>{item.period}</span>
                  </div>
                  {item.badge && (
                    <span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                    {item.institution}
                  </h3>
                  <div className="text-sm sm:text-base text-neutral-300 font-medium">
                    {item.degree}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted pt-1">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{item.location}</span>
                  </div>
                  <span>•</span>
                  <div className="text-accent font-semibold">{item.grade}</div>
                </div>

                <p className="text-xs sm:text-sm text-muted leading-relaxed pt-2 border-t border-surfaceBorder">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
