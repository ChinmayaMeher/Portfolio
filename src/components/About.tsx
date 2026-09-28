"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Mail, Rocket } from "lucide-react";
import { PERSONAL_INFO } from "@/data/personal";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const INFO_CARDS = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Education",
    lines: ["B.Tech CSE @ CUTM", "CGPA: 8.5"],
    accent: true,
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Location",
    lines: ["Bhubaneswar, Odisha", "India"],
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email",
    lines: [PERSONAL_INFO.details.email],
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "Focus",
    lines: ["Frontend + AI/ML", "Full-Stack Dev"],
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative bg-background border-t border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono tracking-widest text-accent uppercase mb-3"
        >
          01 — About
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Narrative */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Crafting Digital{" "}
              <span className="italic font-serif text-accent">Experiences</span>
            </h2>

            <div className="space-y-4 text-muted text-base sm:text-lg leading-relaxed">
              {PERSONAL_INFO.aboutParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-surfaceBorder">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="space-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold font-mono text-white flex items-baseline">
                    <span>{stat.value}</span>
                    <span className="text-accent text-2xl ml-0.5">{stat.suffix}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Info Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INFO_CARDS.map((card, idx) => (
              <motion.div
                key={card.title}
                custom={idx}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-2xl bg-surface border border-surfaceBorder hover:border-accent/40 transition-colors duration-300 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{card.title}</h3>
                <p className="text-xs text-muted leading-relaxed">
                  {card.lines.map((line, i) => (
                    <span key={i}>
                      {card.accent && i === 1 ? (
                        <span className="text-accent font-mono font-medium">{line}</span>
                      ) : (
                        line
                      )}
                      {i < card.lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
