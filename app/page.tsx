"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
      postMainTitle: "Diseño de Arquitectura de Base de Datos Moderna",
      postMainSub: "Tablas relacionales de Supabase y optimizaciones de rendimiento.",
      postSub1Title: "Análisis de Big Data con Pandas",
      postSub2Title: "Gestión de Memoria y Punteros",
    }
  };

  useEffect(() => {
    document.title = "Kayra Onat | Portfolio";
    const date = new Date();
    const localeMap = { TR: "tr-TR", EN: "en-US", ES: "es-ES" };
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setFormattedDate(date.toLocaleDateString(localeMap[lang], options));
  }, [lang]);

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
      <nav className={`fixed top-0 left-0 right-0 z-50 shadow-sm border-b transition-colors duration-300 ${bgNavbar}`}>
        <div className="bg-[#352f44] text-[#dbd8e3] text-[11px] py-1.5 px-4 border-b border-[#2a2438]">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
             <span className="font-mono text-white tracking-widest">{text[lang].tickerText}</span>
          </div>
        </div>

        <div className="backdrop-blur-md px-4 md:px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border-2 border-[#352f44] bg-white flex items-center justify-center shadow-sm">
                <Image src="/next.svg" alt="Logo" width={24} height={24} />
              </div>
              <span className={`font-bold text-base transition-colors ${textTitle}`}>KAYRA ONAT</span>
            </div>
            
            <div className="flex items-center gap-4">
               <button onClick={() => setLang(lang === "TR" ? "EN" : "TR")} className="text-xs font-bold uppercase">{lang}</button>
               <button onClick={() => setTheme(isDark ? "light" : "dark")}>{isDark ? "☀️" : "🌙"}</button>
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-48 pb-12">
        <h3 className={`text-xs font-bold mb-6 font-mono uppercase ${textMuted}`}>// {text[lang].featuredTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`md:col-span-2 rounded-2xl p-6 min-h-[320px] flex flex-col justify-end ${bgCard}`}>
             <h2 className="text-2xl font-black text-white">{text[lang].postMainTitle}</h2>
             <p className="text-xs opacity-70 mt-2">{text[lang].postMainSub}</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className={`flex-1 rounded-2xl p-5 ${bgCard}`}>
                <h4 className="font-bold text-sm">{text[lang].postSub1Title}</h4>
            </div>
            <div className={`flex-1 rounded-2xl p-5 ${bgCard}`}>
                <h4 className="font-bold text-sm">{text[lang].postSub2Title}</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-xl mx-auto px-6 py-16 text-center">
        <h3 className={`text-xs font-bold mb-3 font-mono uppercase ${textMuted}`}>{text[lang].contactTitle}</h3>
        <p className="text-sm font-mono opacity-80">{text[lang].contactSub}</p>
      </section>

      <footer className="text-center py-8 text-[11px] font-mono border-t border-[#352f44]/10">
        © {new Date().getFullYear()} Kayra Onat. {text[lang].allRights}
      </footer>
    </div>
  );
}