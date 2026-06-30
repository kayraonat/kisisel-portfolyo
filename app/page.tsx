"use client";

import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    // Supabase'deki 'messages' tablosuna verileri gönderiyoruz
    const { error } = await supabase
      .from("messages")
      .insert([{ name, email, message }]);

    setLoading(false);

    if (error) {
      console.error(error);
      setStatus("❌ Mesaj gönderilirken bir hata oluştu.");
    } else {
      setStatus("✅ Mesajınız başarıyla gönderildi!");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 p-6 text-white font-sans">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-xl border border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Kayra Onat Portfolio
        </h1>
        <p className="text-gray-400 text-sm text-center mb-6">
          Bana bir mesaj bırakın, sizinle iletişime geçeyim.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Adınız
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Ahmet Yılmaz"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              E-posta Adresiniz
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="ahmet@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Mesajınız
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Projenizden bahsedin..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
          </button>
        </form>

        {status && (
          <p className="mt-4 text-sm text-center font-medium animate-pulse">
            {status}
          </p>
        )}
      </div>
    </main>
  );
}