"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download, ExternalLink } from "lucide-react";
import { PERSONAL_INFO } from "@/data/personal";
import { getAssetPath } from "@/lib/basePath";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = NAV_ITEMS.map((item) => item.href.substring(1));
      let current = "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/85 backdrop-blur-md border-b border-[#202020] py-3.5 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#home"
          className="text-xl font-bold font-mono tracking-wider text-white hover:text-accent transition-colors flex items-center group"
        >
          <span>{PERSONAL_INFO.initials}</span>
          <span className="text-accent group-hover:scale-125 transition-transform inline-block">
            .
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors rounded-full ${
                  isActive
                    ? "text-accent font-semibold"
                    : "text-muted hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full shadow-glow-sm" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA & Mobile Hamburger */}
        <div className="flex items-center space-x-3">
          <a
            href={getAssetPath(PERSONAL_INFO.cvPath)}
            download
            className="hidden sm:inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-black hover:shadow-glow transition-all duration-300"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            className="md:hidden p-2 text-muted hover:text-white focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-accent" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[61px] bg-black/80 backdrop-blur-lg z-40 md:hidden flex flex-col justify-between p-6 animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col space-y-4 pt-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? "text-accent bg-accent/10 font-semibold"
                      : "text-neutral-300 hover:text-white hover:bg-surface"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-accent" />}
                </a>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[#202020]">
            <a
              href={getAssetPath(PERSONAL_INFO.cvPath)}
              download
              className="w-full py-3 rounded-xl flex items-center justify-center space-x-2 text-sm font-semibold bg-accent text-black hover:bg-accent-hover transition-colors shadow-glow"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
