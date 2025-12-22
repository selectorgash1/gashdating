
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_USERS } from '../constants';
import { translateMessage, moderateContent } from '../services/geminiService';
import { supabase, getMessages, sendMessage } from '../services/supabase';

interface ChatScreenProps {
  matchId: string;
  onBack: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ matchId, onBack }) => {
  const user = MOCK_USERS.find(u => u.id === matchId) || MOCK_USERS[0];
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTranslating, setIsTranslating] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    // Simulated typing effect for realism
    const typingTimer = setTimeout(() => setIsTyping(true), 2000);
    const typingStopTimer = setTimeout(() => setIsTyping(false), 5000);

    const channel = supabase
      .channel(`chat-${matchId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `match_id=eq.${matchId}` }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();
    return () => { 
      supabase.removeChannel(channel); 
      clearTimeout(typingTimer);
      clearTimeout(typingStopTimer);
    };
  }, [matchId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const loadMessages = async () => {
    const { data } = await getMessages(matchId);
    if (data) setMessages(data);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;

    const isUnsafe = await moderateContent(input);
    if (isUnsafe) {
      alert("AI content moderation flagged this message.");
      return;
    }

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
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Ultra-Clean Header */}
      <header className="h-20 shrink-0 bg-white border-b border-slate-100 flex items-center px-6 z-20 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex items-center ml-2 flex-grow">
          <div className="relative">
            <img src={user.photos[0]} className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-50 shadow-sm" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="ml-4">
            <h3 className="font-black text-slate-800 text-base tracking-tight leading-none mb-1">{user.name}</h3>
            <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span className="text-emerald-500 mr-1.5 underline decoration-emerald-200 decoration-2">Verified</span>
              <span>• {user.location.split(',')[0]}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
           <button className="w-10 h-10 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center active:bg-rose-50 active:text-rose-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553 2.276A1 1 0 0120 13.17V17a2 2 0 01-2 2H6a2 2 0 01-2-2V13.17a1 1 0 01.447-.894L9 10m0-7l3 9m3-9l-3 9m0 0v7" /></svg>
           </button>
           <button className="w-11 h-11 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20 active:scale-95 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
           </button>
        </div>
      </header>

      {/* Modern Message List */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
        <div className="text-center py-6">
           <div className="inline-block px-4 py-1.5 bg-slate-200/50 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
             New Connection Established
           </div>
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender_id !== user.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[80%] ${isMe ? 'flex flex-row-reverse items-end' : 'flex items-end'}`}>
                <div className={`space-y-1.5`}>
                  <div className={`px-5 py-4 rounded-[1.8rem] text-[14px] leading-relaxed shadow-sm ${
                    isMe 
                    ? 'bg-rose-500 text-white font-medium rounded-br-none' 
                    : 'bg-white text-slate-700 font-medium rounded-bl-none border border-slate-100'
                  }`}>
                    {msg.content}
                    {msg.translatedText && (
                      <div className="mt-3 pt-3 border-t border-black/5 text-[11px] italic opacity-80 animate-in fade-in">
                        <span className="font-black text-[9px] uppercase tracking-wider block mb-1">AI Translation</span>
                        {msg.translatedText}
                      </div>
                    )}
                  </div>
                  <div className={`flex items-center space-x-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {!isMe && (
                      <button 
                        onClick={() => handleTranslate(msg.id, msg.content)}
                        className="text-[9px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-md hover:bg-rose-100 transition-colors"
                        disabled={isTranslating === msg.id}
                      >
                        {isTranslating === msg.id ? 'Translating...' : 'Translate'}
                      </button>
                    )}
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start animate-in fade-in slide-in-from-left-2">
            <div className="bg-white px-5 py-4 rounded-[1.8rem] rounded-bl-none border border-slate-100 shadow-sm flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Floating Modern Input Bar */}
      <div className="p-6 pt-2 pb-safe bg-white border-t border-slate-100 shrink-0">
        <div className="flex items-center space-x-3">
          <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors active:scale-90">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v14m7-7H5" /></svg>
          </button>
          <div className="flex-grow bg-slate-50 rounded-2xl flex items-center px-5 py-1 border border-transparent focus-within:bg-white focus-within:border-rose-200 focus-within:shadow-lg focus-within:shadow-rose-500/5 transition-all">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message in your native tongue..." 
              className="bg-transparent border-none outline-none w-full text-sm font-bold py-3 text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-rose-500/20 active:scale-90 transition-all disabled:opacity-30 disabled:grayscale"
          >
            <svg className="w-6 h-6 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
