"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image"; // Next.js logosu için ekledik

export default function Home() {
  const [lang, setLang] = useState<"TR" | "EN" | "ES">("TR");
  const [theme, setTheme] = useState<"light" | "dark">("light"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const text = {
    TR: {
      searchPlaceholder: "Ara...",
      allRights: "Tüm Hakları Saklıdır.",
      contactTitle: "İletişim ve İş Birliği",
      contactSub: "Profesyonel projeler, danışmanlık ve iş birliği talepleri için doğrudan iletişim kurabilirsiniz.",
      featuredTitle: "Öne Çıkan Paylaşımlar",
      tickerText: "Portfolio Güncellendi • Yeni Projeler Yayında • ",
      placeholderMain: "[Ana Paylaşım / Görsel Alanı]",
      placeholderSub1: "[Görsel Bağlantı 1]",
      placeholderSub2: "[Görsel Bağlantı 2]",
      postMainTitle: "Modern Veritabanı Mimarisi Tasarlamak",
      postMainSub: "Supabase ilişkisel tabloları ve performans optimizasyonları.",
      postSub1Title: "Pandas ile Büyük Veri Analitiği",
      postSub2Title: "Bellek Yönetimi ve Göstericiler",
    },
    EN: {
      searchPlaceholder: "Search...",
      allRights: "All Rights Reserved.",
      contactTitle: "Contact & Collaboration",
      contactSub: "You can establish direct contact for professional projects, consulting, and collaboration inquiries.",
      featuredTitle: "Featured Posts",
      tickerText: "Portfolio Updated • New Projects Live • ",
      placeholderMain: "[Main Post / Visual Area]",
      placeholderSub1: "[Visual Link 1]",
      placeholderSub2: "[Visual Link 2]",
      postMainTitle: "Designing Modern Database Architecture",
      postMainSub: "Supabase relational tables and performance optimizations.",
      postSub1Title: "Big Data Analytics with Pandas",
      postSub2Title: "Memory Management and Pointers",
    },
    ES: {
      searchPlaceholder: "Buscar...",
      allRights: "Todos los derechos reservados.",
      contactTitle: "Contacto y Colaboración",
      contactSub: "Puede establecer contacto directo para proyectos profesionales, consultoría e consultas de colaboración.",
      featuredTitle: "Publicaciones Destacadas",
      tickerText: "Portafolio Actualizado • Nuevos Proyectos en Vivo • ",
      placeholderMain: "[Publicación Principal / Área Visual]",
      placeholderSub1: "[Enlace Visual 1]",
      placeholderSub2: "[Enlace Visual 2]",
      postMainTitle: "Diseño de Arquitectura de Base de Datos Moderna",
      postMainSub: "Tablas relacionales de Supabase y optimizaciones de rendimiento.",
      postSub1Title: "Análisis de Big Data con Pandas",
      postSub2Title: "Gestión de Memoria y Punteros",
    }
  };

  useEffect(() => {
    document.title = "Kayra Onat | Portfolio"; // Sekme başlığını güncelledik
    const date = new Date();
    const localeMap = { TR: "tr-TR", EN: "en-US", ES: "es-ES" };
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setFormattedDate(date.toLocaleDateString(localeMap[lang], options));
  }, [lang]);

  // ... (handleClickOutside aynı kalıyor)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDark = theme === "dark";
  const bgMain = isDark ? "bg-[#2a2438] text-[#dbd8e3]" : "bg-[#dbd8e3] text-[#2a2438]";
  const bgNavbar = isDark ? "bg-[#2a2438] border-[#352f44]" : "bg-[#dbd8e3] border-[#352f44]/10";
  const textTitle = isDark ? "text-white" : "text-[#352f44]";
  const bgCard = isDark ? "bg-[#352f44] border-[#5c5470]/30" : "bg-[#352f44] border-[#352f44]";
  const textMuted = isDark ? "text-[#dbd8e3]/60" : "text-[#352f44]/60";

  return (
    <div className={`relative min-h-screen font-sans overflow-x-hidden transition-colors duration-300 ${bgMain}`}>
      
      <nav className={`fixed top-0 left-0 right-0 z-50 shadow-sm select-none border-b transition-colors duration-300 ${bgNavbar}`}>
        <div className="bg-[#352f44] text-[#dbd8e3] text-[11px] py-1.5 px-4 border-b border-[#2a2438] overflow-hidden">
          <div className="max-w-6xl mx-auto flex items-center gap-3 overflow-hidden">
            <span className="bg-[#5c5470] text-white px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 z-10">
              {lang === "TR" ? "YENİ" : lang === "EN" ? "NEW" : "NUEVO"}
            </span>
            <div className="relative w-full overflow-hidden whitespace-nowrap font-mono">
              <div className="animate-ticker inline-block cursor-pointer">
                <span className="mr-8">{text[lang].tickerText}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md px-4 md:px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-11 h-11 rounded-full border-2 border-[#352f44] bg-white flex items-center justify-center shadow-sm">
                <Image src="/next.svg" alt="Logo" width={24} height={24} />
              </div>
              <div>
                <span className={`font-bold text-base tracking-wide transition-colors ${textTitle}`}>KAYRA ONAT</span>
              </div>
            </div>

            <div ref={searchRef} className="flex items-center gap-3 shrink-0">
              <div className="flex bg-[#352f44] border border-[#352f44] rounded-lg p-0.5 text-[9px] font-mono shadow-sm">
                {(["TR", "EN", "ES"] as const).map((l) => (
                  <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-0.5 rounded transition-all ${lang === l ? "bg-[#dbd8e3] text-[#352f44] font-bold" : "text-[#dbd8e3]/60"}`}>
                    {l}
                  </button>
                ))}
              </div>
              {/* Arama kısmı aynen kalıyor */}
            </div>
          </div>
        </div>

        {/* 3. Katman (Menü) */}
        <div className="bg-[#352f44] py-2 shadow-inner">
          <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-end gap-4">
            <div className="hidden lg:flex items-center gap-5 shrink-0">
              <span className="text-[11px] font-mono text-[#dbd8e3]/70 font-bold capitalize">{formattedDate}</span>
              <button onClick={() => setTheme(isDark ? "light" : "dark")} className="text-[#dbd8e3] hover:text-white">
                {isDark ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-48 pb-12 relative z-10">
         {/* ... (Postlar kısmı aynen kalıyor) ... */}
      </section>

      <section id="contact" className="max-w-xl mx-auto px-6 py-16 text-center relative z-10">
        {/* ... (İletişim kısmı aynen kalıyor) ... */}
      </section>

      <footer className={`text-center py-8 text-[11px] font-mono border-t relative z-10 transition-colors ${isDark ? "text-[#dbd8e3]/40 border-[#352f44]" : "text-[#352f44]/60 border-[#352f44]/10"}`}>
        © {new Date().getFullYear()} Kayra Onat. {text[lang].allRights}
      </footer>
    </div>
  );
}