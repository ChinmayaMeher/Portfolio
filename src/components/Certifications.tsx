"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, Calendar, ExternalLink, Eye, CheckCircle } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] =
    useState<CertificateCategory>("All");
  const [activeCertificate, setActiveCertificate] =
    useState<Certificate | null>(null);

  // Filtered array according to active category
  const filteredCertificates =
    selectedCategory === "All"
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === selectedCategory);

  // Find index of currently viewed certificate in the filtered list
  const currentIdx = activeCertificate
    ? filteredCertificates.findIndex((c) => c.id === activeCertificate.id)
    : -1;

  const handleOpenLightbox = (cert: Certificate) => {
    setActiveCertificate(cert);
  };

  const handleCloseLightbox = () => {
    setActiveCertificate(null);
  };

  const handlePrev = () => {
    if (filteredCertificates.length === 0 || currentIdx === -1) return;
    const nextIdx =
      (currentIdx - 1 + filteredCertificates.length) %
      filteredCertificates.length;
    setActiveCertificate(filteredCertificates[nextIdx]);
  };

  const handleNext = () => {
    if (filteredCertificates.length === 0 || currentIdx === -1) return;
    const nextIdx = (currentIdx + 1) % filteredCertificates.length;
    setActiveCertificate(filteredCertificates[nextIdx]);
  };

  return (
    <section
      id="certifications"
      className="py-24 relative bg-background border-t border-[#181818]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-accent uppercase mb-3 flex items-center space-x-2">
              <span>05 — Certifications</span>
              {/* Dynamic counter badge reflecting real dataset length */}
              <span className="px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-[11px] font-mono">
                {CERTIFICATES.length} Total
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Achievements &amp;{" "}
              <span className="italic font-serif text-accent">
                Certifications
              </span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-surface border border-surfaceBorder self-start md:self-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-black font-semibold shadow-glow-sm"
                      : "text-muted hover:text-white hover:bg-surfaceHover"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Certificate Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => handleOpenLightbox(cert)}
              className="group cursor-pointer rounded-2xl bg-surface border border-surfaceBorder overflow-hidden flex flex-col justify-between hover:border-accent/60 hover:shadow-glow transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Preview with Hover Lift & Glow */}
              <div className="relative aspect-[16/11] w-full bg-neutral-950 overflow-hidden border-b border-surfaceBorder">
                <Image
                  src={getAssetPath(cert.image)}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Chip */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 border border-surfaceBorder backdrop-blur-md text-[11px] font-mono text-neutral-300">
                  {cert.category}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 backdrop-blur-xs text-accent text-xs font-mono font-semibold">
                  <Eye className="w-4 h-4" />
                  <span>Click to Expand</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-muted">
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

                {/* Skill Tags */}
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
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <CertificateLightbox
        isOpen={Boolean(activeCertificate)}
        certificate={activeCertificate}
        currentIndex={currentIdx >= 0 ? currentIdx : 0}
        totalCount={filteredCertificates.length}
        onClose={handleCloseLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
