"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [lang, setLang] = useState<"TR" | "EN" | "ES">("TR");
  const [theme, setTheme] = useState<"light" | "dark">("light"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Tüm statik metinler, post başlıkları, özetleri ve etiketleri dillere göre ayrıldı
  const text = {
    TR: {
      searchPlaceholder: "Ara...",
      liveDemo: "Canlıda Dene",
      allRights: "Tüm Hakları Saklıdır.",
      contactTitle: "İletişim ve İş Birliği",
      contactSub: "Profesyonel projeler, danışmanlık ve iş birliği talepleri için doğrudan iletişim kurabilirsiniz.",
      forumLabel: "Forum",
      featuredTitle: "Öne Çıkan Paylaşımlar",
      tickerText: "Next.js 15 ve Supabase ile Forum Sistemi Yapısı Entegre Edildi • Sunucu Altyapı Güncellemeleri Tamamlandı • ",
      placeholderMain: "[Ana Paylaşım / Görsel Alanı]",
      placeholderSub1: "[Görsel Bağlantı 1]",
      placeholderSub2: "[Görsel Bağlantı 2]",
      postMainTitle: "Modern Veritabanı Mimarisi Tasarlamak",
      postMainSub: "Supabase ilişkisel tabloları ve performans optimizasyonları.",
      postSub1Title: "Pandas ile Büyük Veri Analitiği",
      postSub2Title: "Bellek Yönetimi ve Göstericiler",
      forumTitle: "Mini Forum Sistemi",
    },
    EN: {
      searchPlaceholder: "Search...",
      liveDemo: "Live Demo",
      allRights: "All Rights Reserved.",
      contactTitle: "Contact & Collaboration",
      contactSub: "You can establish direct contact for professional projects, consulting, and collaboration inquiries.",
      forumLabel: "Forum",
      featuredTitle: "Featured Posts",
      tickerText: "Forum System Structure Integrated with Next.js 15 and Supabase • Server Infrastructure Updates Completed • ",
      placeholderMain: "[Main Post / Visual Area]",
      placeholderSub1: "[Visual Link 1]",
      placeholderSub2: "[Visual Link 2]",
      postMainTitle: "Designing Modern Database Architecture",
      postMainSub: "Supabase relational tables and performance optimizations.",
      postSub1Title: "Big Data Analytics with Pandas",
      postSub2Title: "Memory Management and Pointers",
      forumTitle: "Mini Forum System",
    },
    ES: {
      searchPlaceholder: "Buscar...",
      liveDemo: "Demostración",
      allRights: "Todos los derechos reservados.",
      contactTitle: "Contacto y Colaboración",
      contactSub: "Puede establecer contacto directo para proyectos profesionales, consultoría e consultas de colaboración.",
      forumLabel: "Foro",
      featuredTitle: "Publicaciones Destacadas",
      tickerText: "Estructura del Sistema de Foro Integrada con Next.js 15 y Supabase • Actualizaciones de Infraestructura de Servidor Completadas • ",
      placeholderMain: "[Publicación Principal / Área Visual]",
      placeholderSub1: "[Enlace Visual 1]",
      placeholderSub2: "[Enlace Visual 2]",
      postMainTitle: "Diseño de Arquitectura de Base de Datos Moderna",
      postMainSub: "Tablas relacionales de Supabase y optimizaciones de rendimiento.",
      postSub1Title: "Análisis de Big Data con Pandas",
      postSub2Title: "Gestión de Memoria y Punteros",
      forumTitle: "Mini Sistema de Foro",
    }
  };

  useEffect(() => {
    const date = new Date(2026, 6, 1);
    const localeMap = { TR: "tr-TR", EN: "en-US", ES: "es-ES" };
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    };
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
      
      {/* 🚀 ÜÇ KATMANLI SMART NAVBAR SİSTEMİ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 shadow-sm select-none border-b transition-colors duration-300 ${bgNavbar}`}>
        
        {/* 1. KATMAN: DİNAMİK DİLLİ DUYURU ŞERİDİ */}
        <div className="bg-[#352f44] text-[#dbd8e3] text-[11px] py-1.5 px-4 border-b border-[#2a2438] overflow-hidden">
          <div className="max-w-6xl mx-auto flex items-center gap-3 overflow-hidden">
            <span className="bg-[#5c5470] text-white px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 z-10">
              {lang === "TR" ? "YENİ İÇERİK" : lang === "EN" ? "NEW CONTENT" : "NUEVO"}
            </span>
            
            <div className="relative w-full overflow-hidden whitespace-nowrap font-mono">
              <div className="animate-ticker inline-block cursor-pointer">
                <span className="mr-8">{text[lang].tickerText}</span>
                <span className="mr-8">{text[lang].tickerText}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. KATMAN: LOGO, DİL VE BİRBİRİNİ İTEN ARAMA ALANI */}
        <div className="backdrop-blur-md px-4 md:px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-11 h-11 rounded-full border-2 border-[#352f44] bg-[#352f44] flex items-center justify-center font-black text-sm text-[#dbd8e3] tracking-tighter shadow-sm">
                KO
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

              <div className="flex items-center relative h-8">
                <input 
                  type="text" 
                  placeholder={text[lang].searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#352f44] text-[#dbd8e3] text-[11px] rounded-lg focus:outline-none placeholder-gray-400 font-mono transition-all duration-300"
                  style={{
                    width: isSearchOpen ? "150px" : "0px",
                    paddingLeft: isSearchOpen ? "12px" : "0px",
                    paddingRight: isSearchOpen ? "32px" : "0px",
                    opacity: isSearchOpen ? 1 : 0,
                    border: isSearchOpen ? "1px solid #352f44" : "none"
                  }}
                />
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`w-8 h-8 flex items-center justify-center transition-all duration-300 rounded-lg ${
                    isSearchOpen ? "absolute right-0 text-[#dbd8e3]" : isDark ? "relative text-[#dbd8e3] hover:bg-white/5" : "relative text-[#352f44] hover:bg-[#352f44]/10"
                  }`}
                  title="Search"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 3. KATMAN: MENÜ ÇUBUĞU */}
        <div className="bg-[#352f44] py-2 shadow-inner">
          <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <Link href="/forum" className="px-4 py-1.5 text-xs font-bold rounded-lg text-[#352f44] bg-[#dbd8e3] border border-[#dbd8e3] hover:bg-[#5c5470] hover:text-white hover:border-[#5c5470] transition-all whitespace-nowrap">
                {text[lang].forumLabel}
              </Link>

              {["Python", "Pandas", "NumPy", "C++"].map((tech) => (
                <button
                  key={tech}
                  className="px-4 py-1.5 text-xs font-mono font-bold rounded-lg bg-[#352f44] border border-[#dbd8e3]/20 text-[#dbd8e3] hover:text-[#352f44] hover:bg-[#dbd8e3] hover:border-[#dbd8e3] transition-all whitespace-nowrap"
                >
                  {tech}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-5 shrink-0">
              <span className="text-[11px] font-mono text-[#dbd8e3]/70 font-bold capitalize">
                {formattedDate}
              </span>
              
              <div className="flex items-center gap-4 border-l border-[#dbd8e3]/20 pl-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#dbd8e3]/70 hover:text-white transition-colors" title="GitHub">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#dbd8e3]/70 hover:text-white transition-colors" title="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                <button 
                  onClick={() => setTheme(isDark ? "light" : "dark")} 
                  className="text-[#dbd8e3] hover:text-white transition-transform duration-300 hover:rotate-12 ml-1"
                  title={isDark ? "Light Mode" : "Dark Mode"}
                >
                  {isDark ? (
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

      </nav>

      {/* 1. SEÇKİN PAYLAŞIM ALANI (DİNAMİK DİLLİ POSTLAR) */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-48 pb-12 relative z-10">
        <h3 className={`text-xs font-bold mb-6 font-mono uppercase tracking-widest transition-colors ${textMuted}`}>
          // {text[lang].featuredTitle}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ana Post */}
          <div className={`md:col-span-2 rounded-2xl p-6 min-h-[320px] flex flex-col justify-end relative overflow-hidden group shadow-md transition-all ${bgCard}`}>
            <div className="absolute inset-0 bg-white/5 flex items-center justify-center text-xs font-mono text-[#dbd8e3]/10">
              {text[lang].placeholderMain}
            </div>
            <div className="relative z-10">
              <span className="text-[10px] font-mono bg-[#dbd8e3] text-[#352f44] px-2 py-0.5 rounded uppercase font-bold">Next.js 15</span>
              <h2 className="text-xl md:text-2xl font-black text-white mt-2 mb-1">
                {text[lang].postMainTitle}
              </h2>
              <p className="text-xs text-[#dbd8e3]/70 font-mono">
                {text[lang].postMainSub}
              </p>
            </div>
          </div>

          {/* Sağdaki Küçük Postlar */}
          <div className="flex flex-col gap-6">
            <div className={`flex-1 rounded-2xl p-5 flex flex-col justify-end relative overflow-hidden shadow-md transition-all ${bgCard}`}>
              <div className="absolute inset-0 bg-white/5 flex items-center justify-center text-xs font-mono text-[#dbd8e3]/10">
                {text[lang].placeholderSub1}
              </div>
              <div className="relative z-10">
                <span className="text-[9px] font-mono bg-[#5c5470] text-white px-1.5 py-0.5 rounded uppercase">Python</span>
                <h4 className="text-sm font-bold text-white mt-1.5">
                  {text[lang].postSub1Title}
                </h4>
              </div>
            </div>
            
            <div className={`flex-1 rounded-2xl p-5 flex flex-col justify-end relative overflow-hidden shadow-md transition-all ${bgCard}`}>
              <div className="absolute inset-0 bg-white/5 flex items-center justify-center text-xs font-mono text-[#dbd8e3]/10">
                {text[lang].placeholderSub2}
              </div>
              <div className="relative z-10">
                <span className="text-[9px] font-mono bg-[#5c5470] text-white px-1.5 py-0.5 rounded uppercase">C++</span>
                <h4 className="text-sm font-bold text-white mt-1.5">
                  {text[lang].postSub2Title}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORUM ÖNİZLEME KARTI (DİNAMİK BAŞLIK) */}
      <section id="forum-preview" className="max-w-6xl mx-auto px-4 md:px-6 py-12 relative z-10">
        <Link href="/forum" className="rounded-2xl bg-[#352f44] p-6 hover:bg-[#5c5470] transition-all group block text-left shadow-lg">
          <div className="w-full h-40 bg-[#2a2438] rounded-xl mb-4 flex items-center justify-center text-[#dbd8e3] font-mono text-lg font-bold tracking-widest shadow-inner">
            KO_FORUM
          </div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
            <span>{text[lang].forumTitle}</span>
            <span className="text-xs bg-[#dbd8e3] text-[#352f44] px-2.5 py-1 rounded-xl font-bold">
              {text[lang].liveDemo}
            </span>
          </h4>
          <div className="flex gap-2 text-[10px] font-mono">
            <span className="bg-white/10 px-2 py-1 rounded text-[#dbd8e3]">Next.js</span>
            <span className="bg-white/10 px-2 py-1 rounded text-[#dbd8e3]">Supabase (SQL)</span>
            <span className="bg-white/10 px-2 py-1 rounded text-[#dbd8e3]">App Router</span>
          </div>
        </Link>
      </section>

      {/* 3. İLETİŞİM ALANI */}
      <section id="contact" className="max-w-xl mx-auto px-6 py-16 text-center relative z-10">
        <h3 className={`text-xs font-bold mb-3 font-mono uppercase tracking-widest transition-colors ${textMuted}`}>
          // {lang === "TR" ? "İletişim" : lang === "EN" ? "Contact" : "Contacto"}
        </h3>
        <p className={`text-xl md:text-2xl font-bold mb-3 transition-colors ${isDark ? "text-white" : "text-[#352f44]"}`}>
          {text[lang].contactTitle}
        </p>
        <p className={`text-xs max-w-sm mx-auto mb-8 font-mono leading-relaxed transition-colors ${isDark ? "text-[#dbd8e3]/80" : "text-[#352f44]/80"}`}>
          {text[lang].contactSub}
        </p>
        
        <div className="bg-[#352f44] rounded-2xl p-6 shadow-lg text-left">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-1">
            <span className="text-xs font-mono text-[#dbd8e3]/70 font-bold">E-POSTA / EMAIL:</span>
            <a href="mailto:kayraonat@example.com" className="text-sm font-bold text-white hover:text-[#dbd8e3] transition-colors font-mono tracking-wide">
              kayraonat@example.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`text-center py-8 text-[11px] font-mono border-t relative z-10 transition-colors ${isDark ? "text-[#dbd8e3]/40 border-[#352f44]" : "text-[#352f44]/60 border-[#352f44]/10"}`}>
        © {new Date().getFullYear()} Kayra Onat. {text[lang].allRights}
      </footer>
    </div>
  );
}