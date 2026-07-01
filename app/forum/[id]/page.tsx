"use client";

import { useState, useEffect, ReactNode } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../utils/supabase";
import Link from "next/link";

interface Thread {
  id: number;
  created_at: string;
  title: string;
  author: string;
  content: string;
}

interface Reply {
  id: number;
  created_at: string;
  author: string;
  content: string;
}

export default function KonuDetaySayfasi() {
  const params = useParams();
  const threadId = params.id;

  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);

  const loadThreadData = async () => {
    if (!threadId) return;

    // 1. Ana Konuyu Çek
    const { data: threadData } = await supabase
      .from("forum_posts")
      .select("*")
      .eq("id", threadId)
      .single();

    if (threadData) setThread(threadData);

    // 2. Konuya ait Cevapları Çek
    const { data: repliesData } = await supabase
      .from("forum_replies")
      .select("*")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true });

    if (repliesData) setReplies(repliesData);
  };

  useEffect(() => {
    loadThreadData();
  }, [threadId]);

  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("forum_replies")
      .insert([{ thread_id: Number(threadId), author: replyAuthor, content: replyContent }]);

    setLoading(false);

    if (!error) {
      setReplyContent("");
      setReplyAuthor("");
      loadThreadData();
    }
  };

  if (!thread) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-400 flex items-center justify-center font-mono">
        Konu yükleniyor veya bulunamadı...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-6">
          <Link href="/forum" className="text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors">
            ← Forum Ana Sayfasına Dön
          </Link>
        </div>

        {/* ANA KONU BAŞLIĞI */}
        <div className="bg-gray-900 border-2 border-blue-600/30 rounded-2xl overflow-hidden shadow-xl mb-6">
          <div className="bg-blue-600/10 px-6 py-3 border-b border-gray-800 flex justify-between items-center">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Konu Başlığı</span>
            <span className="text-xs font-mono text-gray-500">{new Date(thread.created_at).toLocaleString("tr-TR")}</span>
          </div>
          <div className="p-6 md:flex gap-6">
            <div className="md:w-32 flex md:flex-col items-center gap-2 mb-4 md:mb-0 border-b md:border-b-0 md:border-r border-gray-800 pb-4 md:pb-0 md:pr-4 text-center shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-lg">
                {thread.author.substring(0,2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold text-white font-mono">@{thread.author}</div>
                <div className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mt-1 inline-block">Konu Sahibi</div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-4">{thread.title}</h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">{thread.content}</p>
            </div>
          </div>
        </div>

        {/* CEVAPLAR LİSTESİ */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-bold text-gray-400 px-1">Cevaplar ({replies.length})</h3>
          
          {replies.length === 0 ? (
            <p className="text-gray-500 text-sm italic px-2">Bu konuya henüz cevap yazılmamış. İlk yorumu sen yap!</p>
          ) : (
            replies.map((reply, index) => (
              <div key={reply.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-md flex gap-6">
                <div className="w-24 hidden sm:flex flex-col items-center gap-2 text-center border-r border-gray-800 pr-4 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-gray-400 text-sm">
                    {reply.author.substring(0,2).toUpperCase()}
                  </div>
                  <div className="text-xs font-bold text-gray-300 font-mono truncate w-full">@{reply.author}</div>
                  <div className="text-[9px] text-gray-500 font-mono">#{index + 1}</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <span className="sm:hidden text-xs font-bold text-blue-400 font-mono">@{reply.author}</span>
                    <span className="text-[11px] font-mono text-gray-500 ml-auto">{new Date(reply.created_at).toLocaleString("tr-TR")}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{reply.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CEVAP YAZMA FORMU */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Bu Konuya Cevap Yaz
          </h3>
          <form onSubmit={handlePostReply} className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-gray-400 mb-1">Kullanıcı Adınız</label>
                <input type="text" required value={replyAuthor} onChange={(e) => setReplyAuthor(e.target.value)} className="w-full rounded-xl bg-gray-800 border border-gray-700 p-2.5 text-sm text-white focus:outline-none focus:border-blue-500" placeholder="forumcu_mühendis"/>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Mesajınız</label>
              <textarea required rows={4} value={replyContent} onChange={(e) => setReplyContent(e.target.value)} className="w-full rounded-xl bg-gray-800 border border-gray-700 p-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none" placeholder="Fikirlerinizi buraya yazın..."/>
            </div>
            <button type="submit" disabled={loading} className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl transition-all disabled:bg-gray-800 ml-auto block">
              {loading ? "Gönderiliyor..." : "Cevabı Gönder"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}