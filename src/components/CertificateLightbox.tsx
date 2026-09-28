"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Certificate } from "@/data/certificates";
import { getAssetPath } from "@/lib/basePath";

interface LightboxProps {
  isOpen: boolean;
  certificate: Certificate | null;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function CertificateLightbox({
  isOpen,
  certificate,
  currentIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Reset loading spinner whenever active certificate changes
  useEffect(() => {
    setImageLoading(true);
  }, [certificate?.id]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe threshold: 50px
    if (diff > 50) {
      onNext(); // swiped left -> next
    } else if (diff < -50) {
      onPrev(); // swiped right -> prev
    }
    touchStartX.current = null;
  };

  if (!isOpen || !certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-surface border border-surfaceBorder rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surfaceBorder bg-[#0a0a0a]">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-accent px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20">
              {currentIndex + 1} of {totalCount}
            </span>
            <span className="text-xs font-mono text-muted uppercase hidden sm:inline">
              Category: {certificate.category}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              aria-label="Close Lightbox"
              className="p-2 rounded-xl text-muted hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {/* Certificate Image Preview Area */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-neutral-950 rounded-2xl overflow-hidden border border-surfaceBorder flex items-center justify-center">
            {/* Skeleton Loading Placeholder */}
            {imageLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 animate-pulse text-muted">
                <Award className="w-10 h-10 mb-2 text-neutral-600 animate-bounce" />
                <span className="text-xs font-mono">Loading Certificate...</span>
              </div>
            )}

            <Image
              src={getAssetPath(certificate.image)}
              alt={certificate.title}
              fill
              sizes="(max-width: 1024px) 95vw, 900px"
              priority
              onLoad={() => setImageLoading(false)}
              className={`object-contain transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Previous Navigation Button */}
            <button
              onClick={onPrev}
              aria-label="Previous Certificate"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white hover:text-accent border border-surfaceBorder hover:border-accent/50 backdrop-blur-md transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={onNext}
              aria-label="Next Certificate"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white hover:text-accent border border-surfaceBorder hover:border-accent/50 backdrop-blur-md transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Details & Actions Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {certificate.title}
                </h3>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>{certificate.issuer}</span>
                </div>
              </div>

              {/* Date Badge */}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-muted self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>{certificate.date}</span>
              </div>
            </div>

            {certificate.description && (
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {certificate.description}
              </p>
            )}

            {/* Associated Skills */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
                Skills Verified:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-surfaceBorder flex items-center justify-between">
              {certificate.verifyUrl ? (
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-accent text-black font-semibold text-xs sm:text-sm hover:bg-accent-hover hover:shadow-glow transition-all"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-xs font-mono text-neutral-600">
                  Verification via CUTM Academic Registry
                </span>
              )}

              <span className="text-[11px] font-mono text-muted/60 hidden sm:inline">
                Use ← and → arrow keys to navigate • Esc to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
