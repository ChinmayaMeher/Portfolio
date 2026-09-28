"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
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
  "All",
  "NPTEL",
  "Cloud",
  "Coding",
  "Hackathon",
  "Other",
];

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>("All");
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
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
    setActiveCertificate(filteredCertificates[(currentIdx - 1 + filteredCertificates.length) % filteredCertificates.length]);
  };
  const handleNext = () => {
    if (!filteredCertificates.length || currentIdx === -1) return;
    setActiveCertificate(filteredCertificates[(currentIdx + 1) % filteredCertificates.length]);
  };

  return (
    <section id="certifications" className="py-24 relative bg-background border-t border-[#181818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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
            <p className="text-muted text-sm mt-2">
              Scroll through the stack below to explore each certificate, or switch to Grid view.
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap items-center gap-3"
          >
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-surface border border-surfaceBorder">
              {(["stacked", "grid"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  title={mode === "stacked" ? "Stacked Scroll" : "Grid View"}
                  className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors z-10 ${
                    viewMode === mode ? "text-black font-semibold" : "text-muted hover:text-white"
                  }`}
                >
                  {viewMode === mode && (
                    <motion.span
                      layoutId="cert-view-pill"
                      className="absolute inset-0 rounded-lg bg-accent"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {mode === "stacked" ? <Layers className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline capitalize">{mode}</span>
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-surface border border-surfaceBorder">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors z-10 ${
                      isActive ? "text-white font-semibold" : "text-muted hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="cert-cat-pill"
                        className="absolute inset-0 rounded-lg bg-neutral-700 border border-neutral-600"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {cat}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ===== STACKED VIEW (Sticky Scroll Cards) ===== */}
        {viewMode === "stacked" ? (
          <div className="relative space-y-12 pb-16">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ top: `calc(90px + ${index * 24}px)` }}
                className="sticky rounded-3xl bg-gradient-to-br from-[#121212] via-[#0f0f0f] to-[#090909] border border-[#252525] hover:border-accent/50 shadow-2xl shadow-black/90 overflow-hidden transition-colors duration-300 group"
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent group-hover:via-accent transition-all duration-500" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 items-center">
                  {/* Image */}
                  <div
                    onClick={() => setActiveCertificate(cert)}
                    className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 cursor-pointer shadow-lg group-hover:border-accent/40 transition-colors duration-300"
                  >
                    <Image
                      src={getAssetPath(cert.image)}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 text-accent text-sm font-mono font-medium backdrop-blur-xs">
                      <Eye className="w-5 h-5" />
                      <span>Click to view certificate</span>
                    </div>
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-neutral-700 text-xs font-mono text-neutral-300 backdrop-blur-md">
                      {cert.category}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{cert.issuer}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-xs font-mono text-muted">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          <span>{cert.date}</span>
                        </span>
                      </div>
                      <h3
                        onClick={() => setActiveCertificate(cert)}
                        className="text-2xl sm:text-3xl font-bold text-white group-hover:text-accent transition-colors cursor-pointer"
                      >
                        {cert.title}
                      </h3>
                      {cert.description && (
                        <p className="text-sm sm:text-base text-muted leading-relaxed">
                          {cert.description}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-neutral-800">
                      <div className="text-[11px] font-mono text-muted uppercase tracking-wider">Skills Verified:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <span key={skill} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-3">
                      <button
                        onClick={() => setActiveCertificate(cert)}
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
                          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-surface border border-surfaceBorder text-neutral-300 text-xs sm:text-sm hover:text-white hover:border-neutral-600 transition-colors"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* ===== GRID VIEW ===== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveCertificate(cert)}
                className="group cursor-pointer rounded-2xl bg-surface border border-surfaceBorder overflow-hidden flex flex-col justify-between hover:border-accent/60 hover:shadow-glow transition-all duration-300 hover:-translate-y-1.5"
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
                        <span key={skill} className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400">
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
