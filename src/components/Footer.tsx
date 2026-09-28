"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";
import { PERSONAL_INFO } from "@/data/personal";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#050505] border-t border-[#181818] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-2 sm:space-y-0 text-center sm:text-left">
            <Link
              href="#home"
              className="text-lg font-bold font-mono text-white hover:text-accent transition-colors"
            >
              {PERSONAL_INFO.initials}
              <span className="text-accent">.</span>
            </Link>
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with Next.js &amp; Tailwind CSS.
            </p>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-muted">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-accent transition-colors p-1.5"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-accent transition-colors p-1.5"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="hover:text-accent transition-colors p-1.5"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-accent transition-colors p-1.5"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-xl bg-surface border border-surfaceBorder text-muted hover:text-accent hover:border-accent/40 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
