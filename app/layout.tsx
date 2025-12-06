import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://theobjektif.com'),
  title: {
    default: "The Objektif - Tarafsız Ürün İncelemeleri ve Objektif Puanlama",
    template: "%s | The Objektif"
  },
  description: "Türkiye'nin en objektif ürün inceleme platformu. Teknoloji, ev yaşam ve anne-bebek ürünleri için veri odaklı, tarafsız incelemeler, fiyat karşılaştırmaları ve objektif puanlama sistemi.",
  keywords: [
    "ürün inceleme",
    "objektif puanlama",
    "teknoloji incelemeleri",
    "anne bebek ürünleri",
    "ev yaşam ürünleri",
    "fiyat karşılaştırma",
    "ürün karşılaştırma",
    "güvenilir inceleme",
    "ADAC testleri",
    "tarafsız yorum",
  ],
  authors: [{ name: "The Objektif Ekibi" }],
  creator: "The Objektif",
  publisher: "The Objektif",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://theobjektif.com',
    siteName: 'The Objektif',
    title: 'The Objektif - Tarafsız Ürün İncelemeleri',
    description: 'Türkiye\'nin en objektif ürün inceleme platformu. Veri odaklı, tarafsız incelemeler ve fiyat karşılaştırmaları.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Objektif - Tarafsız Ürün İncelemeleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Objektif - Tarafsız Ürün İncelemeleri',
    description: 'Türkiye\'nin en objektif ürün inceleme platformu. Veri odaklı, tarafsız incelemeler ve fiyat karşılaştırmaları.',
    images: ['/og-image.jpg'],
    creator: '@theobjektif',
  },
  verification: {
    google: 'cKfP0FTGJpOoG-hSFD-89eoDsTKoyWMXkk9VRztCbGQ',
  },
  alternates: {
    canonical: 'https://theobjektif.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
