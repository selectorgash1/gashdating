
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants.tsx';
import { SiteConfig } from '../types.ts';

interface MatchesScreenProps {
  onChat: (id: string) => void;
  siteConfig: SiteConfig | null;
}

const MatchesScreen: React.FC<MatchesScreenProps> = ({ onChat, siteConfig }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Unread'>('All');

  return (
    <div className="flex-grow bg-transparent flex flex-col pt-4">
      {/* Dynamic Ad Strip */}
      {siteConfig?.show_ads && (
        <div className="mx-6 mb-6 bg-rose-500/20 backdrop-blur-xl text-white px-6 py-4 rounded-[2rem] flex items-center justify-between border border-rose-500/30 shine-effect">
           <div className="flex items-center space-x-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-rose-500 px-2 py-0.5 rounded shadow-lg">AD</span>
              <p className="text-xs font-bold italic tracking-tight">{siteConfig.ad_content}</p>
           </div>
        </div>
      )}

      {/* Match Queue */}
      <div className="pb-8">
        <div className="px-10 mb-6 flex items-center justify-between">
          <h2 className="text-xs text-rose-500 font-black uppercase tracking-[0.4em] italic text-glow">Live Connections</h2>
          <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">3 New Peaks</span>
        </div>
        <div className="flex space-x-6 overflow-x-auto no-scrollbar px-8 pb-4">
          {MOCK_USERS.map(user => (
            <button 
              key={user.id} 
              onClick={() => onChat(user.id)}
              className="flex-shrink-0 flex flex-col items-center group"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-[2.5rem] p-1 border-2 border-rose-500 shadow-2xl transition-all group-hover:scale-110 active:scale-95 group-hover:rotate-6 bg-slate-900">
                  <img src={user.photos[0]} alt={user.name} className="w-full h-full object-cover rounded-[2.2rem]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 border-2 border-slate-950 rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                </div>
              </div>
              <span className="text-[10px] font-black text-white/80 mt-3 uppercase tracking-[0.2em] italic">{user.name.split(' ')[0]}</span>
            </button>
          ))}
          <button className="flex-shrink-0 flex flex-col items-center group">
            <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 backdrop-blur-xl flex items-center justify-center border-2 border-dashed border-white/20 group-hover:border-rose-500 transition-all">
               <svg className="w-8 h-8 text-white/20 group-hover:text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <span className="text-[10px] font-black text-white/20 mt-3 uppercase tracking-widest italic">Global</span>
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-grow bg-white/5 backdrop-blur-2xl rounded-t-[4rem] border-t border-white/10 overflow-hidden mt-2">
        <div className="px-10 py-8 flex space-x-10">
          {(['All', 'Unread'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-black uppercase tracking-[0.3em] italic transition-all relative ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
            >
              {tab} Feed
              {activeTab === tab && <div className="absolute -bottom-2 left-0 right-0 h-1 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.8)]" />}
            </button>
          ))}
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar pb-32">
          {MOCK_USERS.map((user, i) => (
            <button 
              key={user.id}
              onClick={() => onChat(user.id)}
              className="w-full flex items-center px-10 py-6 hover:bg-white/5 transition-all group relative border-b border-white/5 active:scale-[0.98]"
            >
              <div className="relative shrink-0">
                <img src={user.photos[0]} alt={user.name} className="w-16 h-16 rounded-[1.8rem] object-cover border border-white/10 shadow-2xl" />
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-rose-500 border-2 border-slate-900 rounded-full shadow-lg"></div>
              </div>
              <div className="ml-6 flex-grow text-left">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-black text-white italic tracking-tighter text-lg">{user.name}</h3>
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Live Now</span>
                </div>
                <p className="text-xs text-slate-400 font-medium italic truncate max-w-[180px]">
                  {i === 0 ? "That sounds incredible! When are you moving?" : "I noticed we both speak French, how interesting!"}
                </p>
              </div>
              {i === 0 && (
                <div className="ml-4 shrink-0 w-6 h-6 bg-rose-500 rounded-xl flex items-center justify-center shadow-2xl shine-effect">
                   <span className="text-[10px] text-white font-black">1</span>
                </div>
              )}
            </button>
          ))}
          <div className="p-12 text-center opacity-10">
            <span className="text-[9px] font-black text-white uppercase tracking-[0.5em]">Gash Security Standard Applied</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesScreen;
