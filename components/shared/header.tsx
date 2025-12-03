"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const categories = [
  {
    name: "Teknoloji",
    slug: "teknoloji",
    subcategories: [
      { name: "Akıllı Telefonlar", slug: "akilli-telefonlar" },
      { name: "Laptoplar", slug: "laptoplar" },
      { name: "Giyilebilir Teknoloji", slug: "giyilebilir-teknoloji" },
      { name: "Kulaklıklar", slug: "kulakliklar" },
    ],
  },
  {
    name: "Ev & Yaşam",
    slug: "ev-yasam",
    subcategories: [
      { name: "Robot Süpürgeler", slug: "robot-supurgeler" },
      { name: "Kahve Makineleri", slug: "kahve-makineleri" },
      { name: "Hava Temizleyiciler", slug: "hava-temizleyiciler" },
    ],
  },
  {
    name: "Anne & Bebek",
    slug: "anne-bebek",
    subcategories: [
      { name: "Bebek Arabaları", slug: "bebek-arabalari" },
      { name: "Oto Koltukları", slug: "oto-koltuklari" },
      { name: "Bebek Telsizleri", slug: "bebek-telsizleri" },
      { name: "Süt Sağım Pompaları", slug: "sut-sagim-pompalari" },
      { name: "Mama Sandalyeleri", slug: "mama-sandalyeleri" },
    ],
  },
  {
    name: "Yazılım & Araçlar",
    slug: "yazilim-araclar",
    subcategories: [
      { name: "VPN Servisleri", slug: "vpn-servisleri" },
      { name: "Proje Yönetimi", slug: "proje-yonetimi" },
      { name: "Hosting Firmaları", slug: "hosting-firmalari" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">The</span>
              <span className="text-2xl font-bold text-accent">Objektif</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <DropdownMenu key={category.slug}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium">
                    {category.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/${category.slug}`}
                      className="font-semibold cursor-pointer"
                    >
                      Tüm {category.name}
                    </Link>
                  </DropdownMenuItem>
                  <div className="my-1 h-px bg-border" />
                  {category.subcategories.map((sub) => (
                    <DropdownMenuItem key={sub.slug} asChild>
                      <Link
                        href={`/${category.slug}/${sub.slug}`}
                        className="cursor-pointer"
                      >
                        {sub.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            <Link href="/karsilastir">
              <Button variant="ghost" className="text-sm font-medium">
                Karşılaştır
              </Button>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="Arama">
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menü"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              {categories.map((category) => (
                <div key={category.slug} className="space-y-2">
                  <Link
                    href={`/${category.slug}`}
                    className="block text-sm font-semibold text-primary hover:text-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="pl-4 space-y-2">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/${category.slug}/${sub.slug}`}
                        className="block text-sm text-muted-foreground hover:text-accent"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/karsilastir"
                className="block text-sm font-semibold text-primary hover:text-accent pt-2 border-t"
                onClick={() => setMobileMenuOpen(false)}
              >
                Karşılaştır
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
