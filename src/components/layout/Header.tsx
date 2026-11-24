"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, PhoneCall } from "lucide-react";
import { getWhatsAppUrl, CONSULTANT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/meta-tracking";

const NAV_LINKS = [
  { label: "O Ares", href: "#sobre" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Lazer", href: "#lazer" },
  { label: "Apartamentos", href: "#interiores" },
  { label: "Plantas", href: "#plantas" },
  { label: "Localização", href: "#localizacao" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const consultantWhatsAppUrl = getWhatsAppUrl(CONSULTANT_WHATSAPP_MESSAGE);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ares-deep/95 backdrop-blur-md shadow-lg py-3 border-b border-white/10"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg p-1"
          aria-label="Residencial Ares - Página Inicial"
        >
          <div className="relative h-10 w-28 sm:h-12 sm:w-36 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/branding/logo-ares.png"
              alt="Logo Residencial Ares"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors duration-200 relative py-1 group focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ares-gold transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Commercial CTA & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <a
            href={consultantWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("Header CTA - Fale com um consultor")}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase bg-ares-architectural hover:bg-ares-deep text-white border border-white/20 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <PhoneCall className="w-3.5 h-3.5 text-ares-gold" />
            <span>Fale com um consultor</span>
          </a>

          {/* Hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menu principal"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-ares-deep/98 backdrop-blur-xl z-50 flex flex-col p-6 animate-fadeIn border-t border-white/10">
          <nav className="flex flex-col gap-5 mt-4" aria-label="Menu móvel">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-wide text-white/90 hover:text-white border-b border-white/10 pb-3 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-4 flex flex-col gap-4">
            <a
              href={consultantWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileMenuOpen(false);
                trackWhatsAppClick("Header Mobile CTA - Fale com um consultor");
              }}
              className="w-full py-3.5 px-6 rounded-full text-center text-sm font-medium uppercase tracking-wider bg-ares-gold text-ares-deep shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Fale com um consultor</span>
            </a>

            <div className="text-center text-xs text-white/60 mt-4">
              <p>{SITE_CONFIG.developer}</p>
              <p>Centro de Canoas/RS</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
