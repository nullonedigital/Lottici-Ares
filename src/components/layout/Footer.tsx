"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Globe, Shield, ArrowUp, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/meta-tracking";

export default function Footer() {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-ares-dark text-white relative z-10 border-t border-white/10">
      {/* Top Banner with back-to-top */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-32 sm:h-12 sm:w-40">
              <Image
                src="/images/branding/logo-ares.png"
                alt="Residencial Ares"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <p className="text-xs text-white/70 uppercase tracking-widest hidden sm:block font-light">
              Centro de Canoas/RS
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors duration-200 py-2 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Voltar ao início da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: O Empreendimento */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-medium text-white tracking-wide">
              Residencial Ares
            </h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Apartamentos de 2 e 3 dormitórios planejados para o seu bem-estar, com lazer
              completo, coworking, piscinas e conforto no Centro de Canoas.
            </p>
            <div className="pt-2 text-xs text-white/50 leading-relaxed border-t border-white/10">
              <p>{SITE_CONFIG.registry}</p>
            </div>
          </div>

          {/* Column 2: Navegação Rápida */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-ares-gold font-medium">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75 font-light">
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  O Empreendimento
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-white transition-colors">
                  Diferenciais das Unidades
                </a>
              </li>
              <li>
                <a href="#lazer" className="hover:text-white transition-colors">
                  Estrutura de Lazer
                </a>
              </li>
              <li>
                <a href="#interiores" className="hover:text-white transition-colors">
                  Ambientes Decorados
                </a>
              </li>
              <li>
                <a href="#plantas" className="hover:text-white transition-colors">
                  Plantas Humanizadas
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-white transition-colors">
                  Localização
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Atendimento Comercial */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-ares-gold font-medium">
              Atendimento Comercial
            </h4>
            <div className="space-y-3 text-sm text-white/80 font-light">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("Footer CTA - WhatsApp de Vendas")}
                className="flex items-center gap-3 hover:text-emerald-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="block text-xs text-white/50">WhatsApp de Vendas</span>
                  <span className="font-medium text-white">{SITE_CONFIG.contact.whatsappDisplay}</span>
                </div>
              </a>

              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-3 hover:text-ares-gold transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-ares-gold/20 group-hover:border-ares-gold/40 transition-colors">
                  <Phone className="w-4 h-4 text-ares-gold" />
                </div>
                <div>
                  <span className="block text-xs text-white/50">Telefone Fixo</span>
                  <span className="font-medium text-white">{SITE_CONFIG.contact.phone}</span>
                </div>
              </a>

              <div className="flex items-start gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <span className="block text-xs text-white/50">Endereço do Empreendimento</span>
                  <span className="text-xs text-white/90">
                    Rua Brasil esq. com Rua Carlos Drummond de Andrade, Centro — Canoas/RS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Incorporação e Construtora */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-ares-gold font-medium">
              Realização
            </h4>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
              <div className="relative h-10 w-28">
                <Image
                  src="/images/branding/logo-lottici.svg"
                  alt="Lottici Construtora e Incorporadora"
                  fill
                  className="object-contain object-left invert opacity-90"
                />
              </div>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Mais de 4 décadas de solidez construindo com compromisso, qualidade e respeito aos clientes.
              </p>
              <a
                href={SITE_CONFIG.lotticiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-ares-gold hover:text-white transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visitar site institucional</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Privacy policy bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-light">
          <p>© {new Date().getFullYear()} Residencial Ares. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-white underline underline-offset-4 transition-colors focus:outline-none"
            >
              Política de Privacidade
            </button>
            <span>·</span>
            <span>Material publicitário e informativo</span>
          </div>
        </div>
      </div>

      {/* Mandatory Agency Credits: Growth2Digital */}
      <div className="bg-black/40 border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 font-light tracking-wide text-center sm:text-left">
            Desenvolvido para Lottici Construtora
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/60 font-light">Desenvolvido por</span>
            <a
              href="https://growth2digital.com.br"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Desenvolvido por Growth2Digital - Abrir em nova aba"
              className="relative block h-7 w-28 transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40 rounded"
            >
              <Image
                src="/images/branding/growth2digital-white.png"
                alt="Growth2Digital"
                fill
                className="object-contain object-left"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-ares-deep text-white border border-white/15 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Fechar política de privacidade"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-ares-gold" />
              <h3 className="font-serif text-2xl font-medium">Política de Privacidade</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              <p>
                Este site respeita a sua privacidade. Ao entrar em contato via WhatsApp ou telefone,
                seus dados são utilizados exclusivamente pela equipe comercial da Lottici
                Construtora para atendimento e fornecimento das informações solicitadas sobre o
                Residencial Ares.
              </p>
              <p>
                Não comercializamos, cedemos ou compartilhamos suas informações de contato com
                terceiros não autorizados. Os dados são tratados em conformidade com as diretrizes
                da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
              <p>
                As imagens, perspectivas e plantas deste empreendimento são de caráter ilustrativo e
                podem sofrer pequenas variações técnicas. O projeto definitivo e os acabamentos
                obedecem ao memorial descritivo aprovado.
              </p>
              <p className="font-medium text-white/90">
                Incorporação registrada sob o R.1/181.039 no Registro de Imóveis de Canoas.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-5 py-2 rounded-full text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Entendi e concordo
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
