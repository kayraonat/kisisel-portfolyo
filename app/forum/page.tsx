"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import Link from "next/link";

interface Post {
  id: number;
  created_at: string;
  title: string;
  author: string;
  content: string;
}

export default function ForumAnaSayfa() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("forum_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("forum_posts")
      .insert([{ title, author, content }]);

    if (!error) {
      setTitle("");
      setAuthor("");
      setContent("");
      setIsModalOpen(false);
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Forum Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-900">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded text-xl">KO</span> Forum Donanım & Yazılım
            </h1>
            <p className="text-xs text-gray-500 mt-1">Geliştiriciler ve teknoloji tutkunları topluluğu</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Link href="/" className="px-4 py-2 text-sm bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-all text-center flex-1 sm:flex-none">
              ← Portfolyo
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl transition-all text-center flex-1 sm:flex-none shadow-lg shadow-blue-600/10"
            >
              + Yeni Konu Aç
            </button>
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-gray-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Yeni Bir Tartışma Başlat</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>
              <form onSubmit={handleCreateThread} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Kullanıcı Adınız</label>
                  <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="kayra_onat"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Konu Başlığı</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="Örn: En İyi Kod Editörü Hangisi?"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Konu İçeriği</label>
                  <textarea required rows={5} value={content} onChange={(e) => setContent(e.target.value)} className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none" placeholder="Sorunuzu veya fikrinizi detaylıca açıklayın..."/>
                </div>
                <div className="flex gap-3 justify-end pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm bg-gray-800 rounded-xl hover:bg-gray-700">İptal</button>
                  <button type="submit" className="px-4 py-2 text-sm bg-blue-600 rounded-xl font-semibold hover:bg-blue-500">Konuyu Yayınla</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* DONANIM ARŞİVİ STİLİ KONU LİSTESİ */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-12 bg-gray-850 p-4 text-xs font-bold text-gray-400 uppercase border-b border-gray-800 tracking-wider">
            <div className="col-span-8 md:col-span-9">Forumda Açılan Başlıklar</div>
            <div className="col-span-4 md:col-span-3 text-right">Açılış Tarihi</div>
          </div>

          <div className="divide-y divide-gray-800/60">
            {posts.length === 0 ? (
              <p className="p-8 text-center text-sm text-gray-500 italic">Henüz hiç konu açılmamış. İlk konuyu yukardan sen başlat!</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="grid grid-cols-12 p-4 items-center hover:bg-gray-850/50 transition-colors group">
                  <div className="col-span-8 md:col-span-9 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-sm text-white uppercase shrink-0">
                      {post.author.substring(0, 2)}
                    </div>
                    <div className="truncate">
                      <Link href={`/forum/${post.id}`} className="text-sm md:text-base font-semibold text-gray-200 group-hover:text-blue-400 transition-colors block truncate">
                        {post.title}
                      </Link>
                      <span className="text-xs text-gray-400 font-medium">
                        Açan: <span className="text-blue-500 font-mono">@{post.author}</span>
                      </span>
                    </div>
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right text-xs md:text-sm text-gray-400 font-mono">
                    {new Date(post.created_at).toLocaleDateString("tr-TR")}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
