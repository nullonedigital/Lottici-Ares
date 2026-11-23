import React from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Highlights from "@/components/sections/Highlights";
import Amenities from "@/components/sections/Amenities";
import Interiors from "@/components/sections/Interiors";
import FloorPlans from "@/components/sections/FloorPlans";
import Location from "@/components/sections/Location";
import Security from "@/components/sections/Security";
import Developer from "@/components/sections/Developer";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* SEÇÃO 02 — HERO DE ALTO IMPACTO */}
      <Hero />

      {/* SEÇÃO 03 — APRESENTAÇÃO DO ARES */}
      <About />

      {/* SEÇÃO 04 — DIFERENCIAIS DOS APARTAMENTOS */}
      <Highlights />

      {/* SEÇÃO 05 — EXPERIÊNCIA DE LAZER */}
      <Amenities />

      {/* SEÇÃO 06 — AMBIENTES INTERNOS */}
      <Interiors />

      {/* SEÇÃO 07 — PLANTAS E APARTAMENTOS */}
      <FloorPlans />

      {/* SEÇÃO 08 — LOCALIZAÇÃO */}
      <Location />

      {/* SEÇÃO 09 — SEGURANÇA E CONVENIÊNCIA */}
      <Security />

      {/* SEÇÃO 10 — SOBRE A LOTTICI */}
      <Developer />

      {/* SEÇÃO 11 — PERGUNTAS FREQUENTES */}
      <FAQ />

      {/* SEÇÃO 12 — CTA FINAL */}
      <FinalCTA />
    </div>
  );
}
