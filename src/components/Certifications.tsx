"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  Calendar,
  ExternalLink,
  Eye,
  CheckCircle,
  Layers,
  LayoutGrid,
} from "lucide-react";
import {
  CERTIFICATES,
  Certificate,
  CertificateCategory,
} from "@/data/certificates";
import CertificateLightbox from "@/components/CertificateLightbox";
import { getAssetPath } from "@/lib/basePath";

const CATEGORIES: CertificateCategory[] = [
  "All", "NPTEL", "Cloud", "Coding", "Hackathon", "Other",
];

/* ─────────────────────────────────────────────────────────────────────────────
   DeckViewer
   ─────────────────────────────────────────────────────────────────────────────
   Layout:
     • Outer div — provides the scroll height (n × 60vh) to drive animation
     • Inner sticky div — stays fixed in viewport while outer is scrolled
     • All cert cards — absolutely stacked on top of each other inside sticky
   
   Each card's visual state is determined by  delta = index − activeIndex:
     delta = 0   →  active card (front, full size)
     delta = -1  →  one behind, scaled 0.94, peeking up  -20px
     delta = -2  →  two behind, scaled 0.88, peeking -40px
     delta < -4  →  hidden (too deep in stack)
     delta > 0   →  upcoming, starts from below (translateY: 100%)
   ──────────────────────────────────────────────────────────────────────────── */
function DeckViewer({
  cards,
  onOpen,
}: {
  cards: Certificate[];
  onOpen: (c: Certificate) => void;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const n = cards.length;

  // Drive activeIndex from container scroll progress
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(Math.floor(v * n), n - 1);
    setActiveIndex(idx);
  });

  return (
    // Outer scroll driver — its height determines how long the deck animation runs
    <div ref={outerRef} style={{ height: `${n * 60}vh` }}>
      {/* Sticky viewport window — stays on screen during scroll */}
      <div className="sticky top-24 h-[75vh] flex items-center justify-center overflow-visible">
        {/* Deck container — all cards positioned absolutely inside */}
        <div className="relative w-full" style={{ height: "420px" }}>
          {cards.map((cert, index) => {
            const delta = index - activeIndex; // negative = behind, 0 = active, positive = upcoming

            // ── Derived visual properties ──────────────────────────────
            // Scale: each step behind = 6% smaller (linear increase toward front)
            const scaleVal =
              delta === 0
                ? 1
                : delta < 0
                ? Math.max(0.65, 1 + delta * 0.06)
                : 1;

            // Y offset: cards behind peek upward, upcoming hidden below
            const yVal =
              delta === 0
                ? 0
                : delta < 0
                ? Math.max(-120, delta * 22) // peek: -22px, -44px, -66px …
                : 60; // upcoming cards wait below (slightly, then slide in)

            // Opacity: front is 1, each step behind reduces by 0.18
            const opacityVal =
              delta === 0
                ? 1
                : delta < 0
                ? Math.max(0.2, 1 + delta * 0.18)
                : 0; // hide upcoming until their turn

            // z-index: active card is on top, previous cards go deeper
            const zIndexVal = delta === 0 ? n + 10 : n - Math.abs(delta);

            // Blur: slight blur for deeply buried cards
            const blurVal =
              delta < -2 ? `blur(${Math.min(4, Math.abs(delta + 2))}px)` : "none";

            // Show max 4 cards behind, hide rest (avoid DOM clutter)
            const isVisible = delta >= -4 && delta === 0 || delta < 0;
            const isUpcoming = delta > 0;

            return (
              <motion.div
                key={cert.id}
                animate={{
                  scale: scaleVal,
                  y: yVal,
                  opacity: isUpcoming ? 0 : opacityVal,
                  filter: blurVal,
                  zIndex: zIndexVal,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 35,
                  mass: 0.8,
                }}
                style={{ position: "absolute", width: "100%", zIndex: zIndexVal }}
                className="will-change-transform"
              >
                <CertCard cert={cert} onOpen={onOpen} index={index} total={n} />
              </motion.div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col space-y-2 pr-2">
          {cards.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "h-5 bg-accent"
                  : i < activeIndex
                  ? "h-2 bg-accent/40"
                  : "h-2 bg-neutral-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Individual certificate card layout ─── */
function CertCard({
  cert,
  onOpen,
  index,
  total,
}: {
  cert: Certificate;
  onOpen: (c: Certificate) => void;
  index: number;
  total: number;
}) {
  return (
    <div className="w-full rounded-3xl overflow-hidden border border-[#252525] shadow-2xl shadow-black/80 bg-gradient-to-br from-[#141414] via-[#0f0f0f] to-[#090909] group hover:border-accent/50 transition-colors duration-300">
      {/* Accent top line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent group-hover:via-accent transition-all duration-500" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-7 lg:p-8 items-center">
        {/* Left — Certificate image */}
        <div
          onClick={() => onOpen(cert)}
          className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 cursor-pointer hover:border-accent/40 transition-colors"
        >
          <Image
            src={getAssetPath(cert.image)}
            alt={cert.title}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 text-accent text-sm font-mono font-medium backdrop-blur-xs">
            <Eye className="w-5 h-5" />
            <span>Click to View</span>
          </div>
          {/* Category badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-neutral-700 text-xs font-mono text-neutral-300 backdrop-blur-md">
            {cert.category}
          </div>
          {/* Numbered badge */}
          <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-xs font-bold font-mono">
            {index + 1}
          </div>
        </div>

        {/* Right — Details */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{cert.issuer}</span>
              </span>
              <span className="flex items-center space-x-1 text-xs font-mono text-muted">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>{cert.date}</span>
              </span>
            </div>

            <h3
              onClick={() => onOpen(cert)}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-accent transition-colors cursor-pointer leading-tight"
            >
              {cert.title}
            </h3>

            {cert.description && (
              <p className="text-sm text-muted leading-relaxed line-clamp-2 lg:line-clamp-3">
                {cert.description}
              </p>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-neutral-800">
            <div className="text-[11px] font-mono text-muted uppercase tracking-widest">
              Skills Verified
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-accent/40 hover:text-accent transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <button
              onClick={() => onOpen(cert)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-accent text-black font-semibold text-xs sm:text-sm hover:bg-accent-hover hover:shadow-glow transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>View Certificate</span>
            </button>
            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-surface border border-surfaceBorder text-neutral-300 text-xs sm:text-sm hover:text-white hover:border-neutral-600 transition-colors"
              >
                <span>Verify</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Certifications Section
   ──────────────────────────────────────────────────────────────────────────── */
export default function Certifications() {
  const [selectedCategory, setSelectedCategory] =
    useState<CertificateCategory>("All");
  const [activeCertificate, setActiveCertificate] =
    useState<Certificate | null>(null);
  const [viewMode, setViewMode] = useState<"stacked" | "grid">("stacked");

  const filteredCertificates =
    selectedCategory === "All"
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === selectedCategory);

  const currentIdx = activeCertificate
    ? filteredCertificates.findIndex((c) => c.id === activeCertificate.id)
    : -1;

  const handlePrev = () => {
    if (!filteredCertificates.length || currentIdx === -1) return;
    setActiveCertificate(
      filteredCertificates[
        (currentIdx - 1 + filteredCertificates.length) % filteredCertificates.length
      ]
    );
  };
  const handleNext = () => {
    if (!filteredCertificates.length || currentIdx === -1) return;
    setActiveCertificate(
      filteredCertificates[(currentIdx + 1) % filteredCertificates.length]
    );
  };

  return (
    <section
      id="certifications"
      className="pt-24 pb-16 relative bg-background border-t border-[#181818]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div className="text-xs font-mono tracking-widest text-accent uppercase mb-3 flex items-center space-x-2">
              <span>05 — Certifications</span>
              <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-[11px] font-mono">
                {CERTIFICATES.length} Total
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Achievements &amp;{" "}
              <span className="italic font-serif text-accent">Certifications</span>
            </h2>
            {viewMode === "stacked" && (
              <p className="text-muted text-sm mt-3 flex items-center space-x-2">
                <span>↓</span>
                <span>
                  Scroll through this section — each card slides to the front
                  of the deck.
                </span>
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* View toggle */}
            <div className="flex items-center p-1 rounded-xl bg-surface border border-surfaceBorder">
              {(["stacked", "grid"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors z-10 ${
                    viewMode === mode
                      ? "bg-accent text-black font-semibold"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {mode === "stacked" ? (
                    <Layers className="w-3.5 h-3.5" />
                  ) : (
                    <LayoutGrid className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline capitalize">{mode}</span>
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-surface border border-surfaceBorder">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-neutral-700 text-white border border-neutral-600 font-semibold"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Views ── */}
        {viewMode === "stacked" ? (
          <DeckViewer
            cards={filteredCertificates}
            onOpen={setActiveCertificate}
          />
        ) : (
          /* Grid view */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                onClick={() => setActiveCertificate(cert)}
                className="group cursor-pointer rounded-2xl bg-surface border border-surfaceBorder overflow-hidden flex flex-col hover:border-accent/60 hover:shadow-glow transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[16/11] w-full bg-neutral-950 overflow-hidden border-b border-surfaceBorder">
                  <Image
                    src={getAssetPath(cert.image)}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 border border-surfaceBorder backdrop-blur-md text-[11px] font-mono text-neutral-300">
                    {cert.category}
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 text-accent text-xs font-mono font-semibold">
                    <Eye className="w-4 h-4" />
                    <span>Click to Expand</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center space-x-1.5 text-accent font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{cert.issuer}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-muted">
                        <Calendar className="w-3 h-3" />
                        <span>{cert.date}</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                  </div>
                  <div className="pt-2 border-t border-surfaceBorder/80">
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-neutral-900 text-neutral-500">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <CertificateLightbox
        isOpen={Boolean(activeCertificate)}
        certificate={activeCertificate}
        currentIndex={currentIdx >= 0 ? currentIdx : 0}
        totalCount={filteredCertificates.length}
        onClose={() => setActiveCertificate(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
