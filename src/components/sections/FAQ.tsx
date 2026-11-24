"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { FAQS } from "@/data/property";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/meta-tracking";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const whatsappUrl = getWhatsAppUrl(
    "Olá! Gostaria de tirar dúvidas comerciais sobre o Residencial Ares com a equipe de vendas."
  );

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dúvidas Frequentes"
          title="Tudo o que você precisa saber sobre o Ares."
          subtitle="Respostas claras para as principais perguntas sobre o empreendimento, localização e características."
          align="center"
        />

        {/* Expandable Accordion List */}
        <div className="mt-14 space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-ares-offwhite border-ares-architectural/40 shadow-sm"
                    : "bg-white border-ares-border hover:border-ares-architectural/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-ares-architectural/30"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-ares-deep pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-ares-deep text-white rotate-180"
                        : "bg-ares-mist text-ares-architectural"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-ares-muted font-light leading-relaxed border-t border-ares-border/50 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Banner for Unanswered Questions */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-ares-mist/60 border border-ares-border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-ares-border flex items-center justify-center text-ares-architectural shrink-0 shadow-sm">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-medium text-ares-deep">
                Ainda tem alguma dúvida?
              </h4>
              <p className="text-xs sm:text-sm text-ares-muted font-light mt-0.5">
                Nossa equipe comercial está pronta para atender você com exclusividade.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("FAQ CTA - Falar com especialista")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ares-deep hover:bg-ares-architectural text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-ares-gold" />
            <span>Falar com especialista</span>
          </a>
        </div>
      </div>
    </section>
  );
}
