
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_USERS } from '../constants.tsx';
import { translateMessage, moderateContent } from '../services/geminiService.ts';
import { supabase, getMessages, sendMessage } from '../services/supabase.ts';

interface ChatScreenProps {
  matchId: string;
  onBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ matchId, onBack }) => {
  const user = MOCK_USERS.find(u => u.id === matchId) || MOCK_USERS[0];
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTranslating, setIsTranslating] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    const channel = supabase
      .channel(`chat-${matchId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `match_id=eq.${matchId}` }, (p) => {
        setMessages(prev => [...prev, p.new]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [matchId]);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const loadMessages = async () => {
    const { data } = await getMessages(matchId);
    if (data) setMessages(data);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;
    const isUnsafe = await moderateContent(input);
    if (isUnsafe) { alert("AI flagged this content."); return; }
    await sendMessage(matchId, authUser.id, input);
    setInput('');
  };

  const handleTranslate = async (msgId: string, text: string) => {
    setIsTranslating(msgId);
    const translated = await translateMessage(text, 'English');
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, translatedText: translated } : m));
    setIsTranslating(null);
  };

  return (
    <div className="flex flex-col h-screen bg-transparent relative z-10">
      {/* Immersive Header */}
      <header className="h-24 shrink-0 bg-white/5 backdrop-blur-2xl border-b border-white/10 flex items-center px-8 shadow-2xl">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 active:scale-90 transition-all mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex items-center flex-grow">
          <div className="relative group">
            <img src={user.photos[0]} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 group-hover:rotate-3 transition-transform" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
          </div>
          <div className="ml-5">
            <h3 className="font-black text-white text-xl tracking-tighter italic leading-none mb-1">{user.name}</h3>
            <span className="text-[9px] font-black text-rose-500 uppercase tracking-[0.3em]">Encrypted Session</span>
          </div>
        </div>
      </header>

      {/* Messaging Canvas */}
      <div className="flex-grow overflow-y-auto p-8 space-y-8 no-scrollbar">
        {messages.map((msg) => {
          const isMe = msg.sender_id !== user.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-300`}>
              <div className={`max-w-[85%] ${isMe ? 'items-end' : 'items-start'} flex flex-col space-y-2`}>
                <div className={`px-6 py-5 rounded-[2.5rem] text-sm leading-relaxed backdrop-blur-xl shadow-2xl ${
                  isMe ? 'bg-rose-500 text-white font-bold italic rounded-br-none shine-effect' : 'bg-white/10 text-white font-medium rounded-bl-none border border-white/10'
                }`}>
                  {msg.content}
                  {msg.translatedText && (
                    <div className="mt-4 pt-4 border-t border-white/10 text-[11px] italic text-rose-300 animate-in fade-in">
                       <span className="text-[8px] font-black uppercase tracking-widest block mb-2 text-white/40">AI Translation</span>
                       {msg.translatedText}
                    </div>
                  )}
                </div>
                {!isMe && (
                   <button onClick={() => handleTranslate(msg.id, msg.content)} className="text-[9px] font-black text-rose-500 uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 active:scale-95 transition-all">
                     {isTranslating === msg.id ? 'Translating...' : 'Translate'}
                   </button>
                )}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Floating Modern Input */}
      <div className="p-8 pt-2 pb-safe shrink-0">
        <div className="bg-white/5 backdrop-blur-3xl p-3 rounded-[2.5rem] border border-white/10 flex items-center shadow-2xl space-x-3">
          <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 active:scale-90 transition-all">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v14m7-7H5" /></svg>
          </button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Secure global message..." 
            className="flex-grow bg-transparent border-none outline-none text-white font-bold text-sm italic placeholder:text-white/10"
          />
          <button onClick={handleSend} className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-2xl active:scale-90 transition-all shine-effect">
            <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
