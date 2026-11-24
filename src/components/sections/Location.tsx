"use client";

import React from "react";
import { MapPin, Navigation, MessageCircle, Building2, Compass } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl, LOCATION_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/meta-tracking";

export default function Location() {
  const whatsappUrl = getWhatsAppUrl(LOCATION_WHATSAPP_MESSAGE);

  // Address: Rua Brasil, 239 - Centro, Canoas - RS (corner with Carlos Drummond de Andrade)
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Rua+Brasil,+239,+Centro,+Canoas+-+RS&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="localizacao" className="py-20 lg:py-28 bg-ares-offwhite relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Localização Privilegiada"
          title="No centro de tudo o que importa."
          subtitle="Viva com comodidade, praticidade urbana e facilidade de acesso no coração de Canoas."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Address Information & Commercial Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-ares-architectural font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Centro de Canoas/RS
              </span>

              <h3 className="font-serif text-3xl font-medium text-ares-deep leading-snug">
                Mobilidade e conveniência para transformar o seu dia a dia.
              </h3>

              <p className="text-base text-ares-slate font-light leading-relaxed">
                Localizado no Centro de Canoas, o Residencial Ares oferece a oportunidade de
                viver em uma região urbana consolidada, com acesso à estrutura e às conveniências
                da cidade.
              </p>

              <p className="text-sm text-ares-muted font-light leading-relaxed">
                Situado estrategicamente na esquina da Rua Brasil com a Rua Carlos Drummond de
                Andrade, o empreendimento proporciona tranquilidade residencial combinada à
                proximidade de serviços essenciais.
              </p>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-white border border-ares-border shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-ares-mist flex items-center justify-center text-ares-architectural shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-ares-deep">
                    Endereço do Empreendimento
                  </h4>
                  <p className="text-sm text-ares-slate font-normal mt-0.5">
                    Rua Brasil, nº 239 (esq. Rua Carlos Drummond de Andrade)
                  </p>
                  <p className="text-xs text-ares-muted">Bairro Centro · Canoas — RS</p>
                </div>
              </div>

              <div className="pt-3 border-t border-ares-border/60 flex items-center gap-2 text-xs text-ares-architectural font-medium">
                <Building2 className="w-3.5 h-3.5" />
                <span>Região central consolidada com infraestrutura urbana</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("Location CTA - Quero conhecer a localização")}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold tracking-wide uppercase bg-ares-architectural hover:bg-ares-deep text-white shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-ares-architectural/40 w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 text-ares-gold" />
                <span>Quero conhecer a localização</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Frame */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-ares-border bg-slate-100">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Localização do Residencial Ares no Centro de Canoas"
                className="w-full h-full grayscale-[25%] contrast-[105%]"
              />

              {/* Floating Address Tag on Map */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-ares-border flex items-center gap-2.5 text-xs text-ares-deep font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Residencial Ares · Rua Brasil, 239</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
