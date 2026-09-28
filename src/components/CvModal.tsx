"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  Eye,
  Download,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  Lock,
  FileText,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/personal";
import { getAssetPath } from "@/lib/basePath";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  const [view, setView] = useState<"choice" | "viewer">("choice");
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Reset state when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setView("choice");
      setIsShieldActive(false);
      setIsDownloading(false);
      setDownloadSuccess(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDownload = useCallback(() => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = getAssetPath(PERSONAL_INFO.cvPath);
    link.download = "Chinmaya_Meher_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 400);
  }, [onClose]);

  // Anti-screenshot & hotkey listeners when in "viewer" mode
  useEffect(() => {
    if (!isOpen || view !== "viewer") return;

    // 1. Loss of window focus (e.g. Snipping tool, Win+Shift+S, Alt-Tab)
    const handleBlur = () => {
      setIsShieldActive(true);
    };

    const handleFocus = () => {
      // Keep shield up for a moment to prevent fast snips, or auto-resume
      setIsShieldActive(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsShieldActive(true);
      } else {
        setIsShieldActive(false);
      }
    };

    // 2. Intercept PrintScreen, Ctrl+P, Ctrl+S, Ctrl+C, DevTools
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // PrintScreen hotkey
      if (e.key === "PrintScreen") {
        e.preventDefault();
        setIsShieldActive(true);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("Screenshots are disabled on this preview.").catch(() => {});
        }
        return;
      }

      // Ctrl/Cmd + P (Print), Ctrl/Cmd + S (Save page), Ctrl/Cmd + U (View source)
      if (
        (e.ctrlKey || e.metaKey) &&
        ["p", "s", "u", "c"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        e.stopPropagation();
        setIsShieldActive(true);
        setTimeout(() => setIsShieldActive(false), 2000);
        return;
      }

      // DevTools shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J)
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 3. Clear clipboard on copy attempts
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
    };
  }, [isOpen, view, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {view === "choice" ? (
        /* CHOICE MODAL */
        <div
          className="relative w-full max-w-lg bg-surface border border-surfaceBorder rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 flex flex-col space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-medium">
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white pt-1">
                Chinmaya Meher
              </h3>
              <p className="text-xs sm:text-sm text-muted">
                How would you like to access my resume?
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 rounded-xl text-muted hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option 1: View CV (Protected) */}
            <button
              onClick={() => setView("viewer")}
              className="group text-left p-5 rounded-2xl bg-neutral-900/80 border border-surfaceBorder hover:border-accent/60 hover:bg-neutral-900 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                  Protected
                </span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white group-hover:text-accent transition-colors flex items-center space-x-1.5">
                  <span>View CV</span>
                  <Lock className="w-3.5 h-3.5 text-accent/80" />
                </h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Read securely in browser. Screenshots & copying restricted.
                </p>
              </div>
            </button>

            {/* Option 2: Download CV */}
            <button
              onClick={handleDownload}
              disabled={isDownloading || downloadSuccess}
              className="group text-left p-5 rounded-2xl bg-neutral-900/80 border border-surfaceBorder hover:border-emerald-500/60 hover:bg-neutral-900 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  {downloadSuccess ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                  PDF • 4.0 MB
                </span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {downloadSuccess
                    ? "Downloaded!"
                    : isDownloading
                    ? "Downloading..."
                    : "Download CV"}
                </h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Save the original high-res PDF file directly to your device.
                </p>
              </div>
            </button>
          </div>

          {/* Security Notice Footer */}
          <div className="flex items-center space-x-2 pt-2 text-[11px] font-mono text-muted/70 border-t border-surfaceBorder/60">
            <ShieldCheck className="w-4 h-4 text-accent/80 shrink-0" />
            <span>Secure preview enforces anti-screenshot & focus shields.</span>
          </div>
        </div>
      ) : (
        /* PROTECTED VIEWER MODAL */
        <div
          data-secure-viewer="true"
          className="relative w-full max-w-5xl h-[92vh] bg-surface border border-surfaceBorder rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Viewer Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-surfaceBorder bg-[#0a0a0a] z-20">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setView("choice")}
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Options</span>
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm font-medium text-white">
                  Chinmaya_Meher_CV.pdf
                </span>
                <span className="hidden md:inline-flex items-center space-x-1 text-[11px] font-mono text-amber-400 px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20">
                  <Lock className="w-3 h-3" />
                  <span>Screenshots Disabled</span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-accent text-black font-semibold text-xs hover:bg-accent-hover hover:shadow-glow transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close viewer"
                className="p-1.5 rounded-xl text-muted hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Viewer Body with Protections */}
          <div
            className="relative flex-1 bg-neutral-950 overflow-hidden"
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* PDF Embedded Document */}
            <iframe
              src={`${getAssetPath(PERSONAL_INFO.cvPath)}#toolbar=0&navpanes=0`}
              title="Chinmaya Meher CV Preview"
              className="w-full h-full border-0 select-none"
              style={{ pointerEvents: "auto" }}
            />

            {/* Repeating Diagonal Watermark Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden opacity-10 select-none"
            >
              <div
                className="w-[200%] h-[200%] flex flex-wrap content-center justify-center -rotate-25 gap-x-24 gap-y-20 text-neutral-300 font-mono text-sm sm:text-base font-bold tracking-widest uppercase"
                style={{ transform: "rotate(-25deg)" }}
              >
                {Array.from({ length: 48 }).map((_, i) => (
                  <span key={i} className="whitespace-nowrap">
                    CHINMAYA MEHER • CONFIDENTIAL PREVIEW • NO SCREENSHOT
                  </span>
                ))}
              </div>
            </div>

            {/* Anti-Screenshot / Blur Shield on Loss of Focus */}
            {isShieldActive && (
              <div className="absolute inset-0 z-30 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-150">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 animate-bounce">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Preview Protected
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed mb-6">
                  Screen capture software, app-switch, or window loss-of-focus detected.
                  For security and privacy, capturing or printing this preview is disabled.
                </p>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsShieldActive(false)}
                    className="px-5 py-2.5 rounded-xl bg-accent text-black font-semibold text-xs sm:text-sm hover:bg-accent-hover transition-colors shadow-glow"
                  >
                    Click to Resume Viewing
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs sm:text-sm transition-colors"
                  >
                    Download Official PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
