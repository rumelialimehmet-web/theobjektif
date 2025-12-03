import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Objektif - Tarafsız Ürün İncelemeleri",
  description: "Teknoloji, ev yaşam ve anne-bebek ürünleri için veri odaklı, tarafsız incelemeler ve karşılaştırmalar.",
  keywords: ["ürün inceleme", "teknoloji", "anne bebek", "ev yaşam", "karşılaştırma"],
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
