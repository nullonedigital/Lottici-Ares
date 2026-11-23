import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#233B5B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lottici.com.br/empreendimentos-residencial-ares/"),
  title: {
    default: SITE_CONFIG.seo.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.seo.description,
  keywords: [
    "Residencial Ares",
    "Ares Lottici",
    "Ares Canoas",
    "Apartamentos no Centro de Canoas",
    "Apartamentos 2 dormitórios Canoas",
    "Apartamentos 3 dormitórios Canoas",
    "Apartamentos com churrasqueira Canoas",
    "Empreendimentos Lottici",
    "Lottici Construtora",
    "Imóveis Canoas RS",
  ],
  authors: [{ name: SITE_CONFIG.developer }],
  creator: SITE_CONFIG.agency.name,
  publisher: SITE_CONFIG.developer,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    url: "/",
    siteName: SITE_CONFIG.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-fachada.jpg",
        width: 1920,
        height: 935,
        alt: "Residencial Ares - Fachada no Centro de Canoas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    images: ["/images/hero/hero-fachada.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KMVZBDT5');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-screen bg-ares-offwhite font-sans text-ares-slate antialiased selection:bg-ares-deep selection:text-white flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KMVZBDT5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
