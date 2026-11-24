"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/meta-tracking";

export default function WhatsAppFloat() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappUrl = getWhatsAppUrl();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Speech bubble / Tooltip for desktop */}
      <div
        className={`hidden sm:flex items-center bg-white text-ares-deep text-xs font-medium py-2 px-3.5 rounded-full shadow-lg border border-slate-100 transition-all duration-300 transform origin-right ${
          isHovered
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-95 translate-x-2 pointer-events-none"
        }`}
        role="tooltip"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-ping" />
        Fale conosco no WhatsApp
      </div>

      {/* Floating Button with custom whatsapp_float.png */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("Floating Button - WhatsApp Float")}
        aria-label="Conversar pelo WhatsApp da equipe de vendas Residencial Ares"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        <Image
          src="/images/branding/whatsapp_float.png"
          alt="WhatsApp Comercial Residencial Ares"
          width={64}
          height={64}
          priority
          className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:rotate-6"
        />
        <span className="sr-only">Conversar pelo WhatsApp</span>
      </a>
    </div>
  );
}
