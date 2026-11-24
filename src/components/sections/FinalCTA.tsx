"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/meta-tracking";

export default function FinalCTA() {
  const whatsappUrl = getWhatsAppUrl(
    "Olá! Quero dar o próximo passo e falar sobre as unidades disponíveis no Residencial Ares."
  );

  return (
    <section id="contato" className="relative py-24 lg:py-32 bg-ares-deep overflow-hidden">
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/amenities/happy-hour.jpg"
          alt="Lounge do Residencial Ares"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover opacity-20 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ares-deep via-ares-deep/90 to-ares-deep/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.25em] bg-white/10 text-white border border-white/20 mb-6">
          Seu Novo Capítulo
        </span>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.12] max-w-3xl mx-auto">
          O próximo capítulo da sua vida <br className="hidden sm:inline" />
          <span className="italic font-normal text-ares-mist">começa aqui.</span>
        </h2>

        <p className="mt-6 text-base sm:text-xl text-white/85 font-light max-w-2xl mx-auto leading-relaxed">
          Conheça as possibilidades do Residencial Ares e descubra um novo jeito de viver no
          Centro de Canoas.
        </p>

        {/* Benefits checklist */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-ares-gold" />
            <span>Atendimento comercial exclusivo</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-ares-gold" />
            <span>Tabela oficial e condições de lançamento</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-ares-gold" />
            <span>Plantas de 2 e 3 dormitórios</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("Final CTA - Quero falar sobre o Ares")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase bg-ares-gold hover:bg-ares-goldlight text-ares-deep shadow-2xl hover:shadow-ares-gold/20 transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-ares-gold/50"
          >
            <MessageCircle className="w-4 h-4 fill-ares-deep" />
            <span>Quero falar sobre o Ares</span>
          </a>

          <a
            href="#plantas"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-medium tracking-wide text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <span>Rever as plantas</span>
            <ArrowUpRight className="w-4 h-4 text-white/70" />
          </a>
        </div>
      </div>
    </section>
  );
}
