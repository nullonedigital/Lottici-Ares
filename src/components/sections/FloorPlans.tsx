"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BedDouble,
  Maximize2,
  MapPin,
  Check,
  MessageCircle,
  ZoomIn,
  X,
  Compass,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { FLOOR_PLANS, FloorPlan } from "@/data/floorPlans";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/meta-tracking";

export default function FloorPlans() {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("tipo-d");
  const [zoomOpen, setZoomOpen] = useState(false);

  const currentPlan: FloorPlan =
    FLOOR_PLANS.find((p) => p.id === selectedPlanId) || FLOOR_PLANS[0];

  const whatsappMessage = `Olá! Tenho interesse na ${currentPlan.name} (${currentPlan.area}) do Residencial Ares e gostaria de consultar valores e unidades disponíveis.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);

  return (
    <section id="plantas" className="py-20 lg:py-28 bg-ares-sand/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Plantas e Apartamentos"
          title="Encontre a planta que combina com a sua vida."
          subtitle="Descubra os diferentes espaços do Residencial Ares e escolha a configuração ideal para suas necessidades."
          align="center"
        />

        {/* Navigation Tabs */}
        <div className="mt-12 flex items-center justify-start lg:justify-center gap-2.5 overflow-x-auto pb-3 scrollbar-none">
          {FLOOR_PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200 border flex flex-col items-center gap-0.5 ${
                plan.id === selectedPlanId
                  ? "bg-ares-deep text-white border-ares-deep shadow-lg scale-105"
                  : "bg-white text-ares-slate border-ares-border hover:border-ares-architectural/40 hover:bg-white"
              }`}
            >
              <span className="font-serif text-base sm:text-lg font-medium">
                {plan.typeLetter.length === 1 ? `Tipo ${plan.typeLetter}` : plan.typeLetter}
              </span>
              <span
                className={`text-[11px] font-normal ${
                  plan.id === selectedPlanId ? "text-ares-gold" : "text-ares-muted"
                }`}
              >
                {plan.area}
              </span>
            </button>
          ))}
        </div>

        {/* Main Floor Plan Interactive Card */}
        <div className="mt-10 bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-ares-deep/5 border border-ares-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Floor Plan Drawing (7 Cols) */}
            <div className="lg:col-span-7 relative flex flex-col items-center">
              <div
                onClick={() => setZoomOpen(true)}
                className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-ares-border/60 p-4 flex items-center justify-center cursor-zoom-in hover:border-ares-architectural/40 transition-all duration-300"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={currentPlan.image}
                    alt={`Planta ${currentPlan.name} Residencial Ares`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Zoom Badge */}
                <div className="absolute top-4 right-4 bg-ares-deep/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5 text-ares-gold" />
                  <span>Clique para ampliar</span>
                </div>
              </div>

              <span className="text-[11px] text-ares-muted mt-3 text-center">
                *Imagens e ilustrações artísticas das plantas humanizadas com dimensões aproximadas.
              </span>
            </div>

            {/* Plan Details & Commercial CTA (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-ares-mist text-ares-architectural border border-ares-architectural/15">
                    {currentPlan.position}
                  </span>
                  {currentPlan.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-ares-gold/20 text-ares-gold border border-ares-gold/30">
                      {currentPlan.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-ares-deep">
                  {currentPlan.name}
                </h3>
                <p className="font-serif text-2xl text-ares-architectural font-medium mt-1">
                  {currentPlan.area} de área privativa
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-ares-border">
                <div className="flex items-center gap-2.5">
                  <BedDouble className="w-4 h-4 text-ares-architectural" />
                  <span className="text-sm font-medium text-ares-slate">
                    {currentPlan.bedrooms}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-ares-architectural" />
                  <span className="text-xs text-ares-muted truncate">
                    {currentPlan.units}
                  </span>
                </div>
              </div>

              <p className="text-sm text-ares-slate font-light leading-relaxed">
                {currentPlan.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-ares-muted font-semibold">
                  Diferenciais desta Configuração
                </span>
                <div className="space-y-2">
                  {currentPlan.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-ares-slate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Measurements Table if present */}
              {currentPlan.roomDetails && currentPlan.roomDetails.length > 0 && (
                <div className="p-4 rounded-2xl bg-ares-offwhite border border-ares-border/60">
                  <span className="text-xs font-medium text-ares-deep uppercase tracking-wider block mb-2.5">
                    Detalhamento dos Ambientes
                  </span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-ares-slate">
                    {currentPlan.roomDetails.map((room, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-ares-border/40 pb-1">
                        <span className="text-ares-muted truncate pr-2">{room.name}</span>
                        <span className="font-semibold text-ares-deep shrink-0">{room.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commercial CTA */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick(`Plantas CTA - ${currentPlan.name}`, {
                      floor_plan: currentPlan.name,
                      area: currentPlan.area,
                      bedrooms: currentPlan.bedrooms,
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full text-sm font-semibold tracking-wide uppercase bg-ares-architectural hover:bg-ares-deep text-white shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-ares-architectural/40"
                >
                  <MessageCircle className="w-4 h-4 text-ares-gold" />
                  <span>Consultar disponibilidade desta planta</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
          <div className="flex items-center justify-between text-white">
            <div>
              <span className="text-xs uppercase tracking-widest text-ares-gold">
                {currentPlan.bedrooms} · {currentPlan.area}
              </span>
              <h4 className="font-serif text-2xl font-medium">{currentPlan.name}</h4>
            </div>

            <button
              onClick={() => setZoomOpen(false)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Fechar zoom da planta"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 w-full my-4">
            <Image
              src={currentPlan.image}
              alt={currentPlan.name}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-white/80 text-xs sm:text-sm">
            <p>{currentPlan.units} · Residencial Ares Centro de Canoas</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick(`Plantas Modal CTA - ${currentPlan.name}`, {
                  floor_plan: currentPlan.name,
                  area: currentPlan.area,
                  bedrooms: currentPlan.bedrooms,
                })
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ares-gold text-ares-deep font-semibold uppercase tracking-wider text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Consultar Valores</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
