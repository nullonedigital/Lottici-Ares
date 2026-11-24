"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, MessageCircle, Compass, BedDouble, Maximize2, MapPin } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/meta-tracking";

export default function Hero() {
  const whatsappUrl = getWhatsAppUrl(
    "Olá! Quero conhecer mais sobre o Residencial Ares no Centro de Canoas e receber informações exclusivas."
  );

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-start overflow-hidden bg-ares-deep pt-36 sm:pt-40 lg:pt-36 pb-20 lg:pb-24"
    >
      {/* Background Architectural Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-fachada.jpg"
          alt="Fachada do Residencial Ares em Canoas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] lg:object-[right_center] select-none scale-[1.02] transition-transform duration-1000 ease-out"
        />

        {/* Sophisticated gradient overlay: darker on left for text legibility, transparent on right to celebrate tower facade */}
        <div className="absolute inset-0 bg-gradient-to-r from-ares-deep/95 via-ares-deep/80 to-transparent lg:via-ares-deep/60 lg:to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ares-deep/80 via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 lg:mt-6">
        <div className="max-w-2xl lg:max-w-xl text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium uppercase tracking-[0.2em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ares-gold animate-pulse" />
            RESIDENCIAL ARES · CENTRO DE CANOAS
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.12] drop-shadow-sm">
            Seu espaço. <br className="hidden sm:inline" />
            Seu tempo. <br />
            <span className="italic font-normal text-ares-mist">
              Seu novo jeito de viver.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="mt-6 text-base sm:text-lg text-white/85 font-light leading-relaxed">
            Descubra o Residencial Ares, um empreendimento da Lottici que reúne apartamentos
            planejados para o conforto e uma infraestrutura completa para viver cada momento.
          </p>

          {/* Key highlights pills */}
          <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-3 py-4 border-y border-white/15">
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs text-white/60 uppercase tracking-wider flex items-center gap-1">
                <BedDouble className="w-3 h-3 text-ares-gold" /> Tipologia
              </span>
              <span className="text-sm sm:text-base font-medium text-white mt-0.5">
                2 e 3 dorms
              </span>
            </div>

            <div className="flex flex-col border-l border-white/10 pl-3">
              <span className="text-[11px] sm:text-xs text-white/60 uppercase tracking-wider flex items-center gap-1">
                <Maximize2 className="w-3 h-3 text-ares-gold" /> Metragens
              </span>
              <span className="text-sm sm:text-base font-medium text-white mt-0.5">
                54 m² a 68 m²
              </span>
            </div>

            <div className="flex flex-col border-l border-white/10 pl-3">
              <span className="text-[11px] sm:text-xs text-white/60 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-ares-gold" /> Local
              </span>
              <span className="text-sm sm:text-base font-medium text-white mt-0.5">
                Centro de Canoas
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("Hero CTA - Quero conhecer o Ares")}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide uppercase bg-ares-gold hover:bg-ares-goldlight text-ares-deep shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-ares-gold/50"
            >
              <MessageCircle className="w-4 h-4 fill-ares-deep" />
              <span>Quero conhecer o Ares</span>
            </a>

            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium tracking-wide text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <Compass className="w-4 h-4 text-white/80" />
              <span>Explorar o empreendimento</span>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#sobre"
        aria-label="Rolar para a seção sobre o empreendimento"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors focus:outline-none"
      >
        <span className="text-[10px] tracking-widest uppercase font-light">Role para explorar</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-ares-gold" />
      </a>
    </section>
  );
}
