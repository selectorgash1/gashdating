
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { SiteConfig } from '../types';

interface MatchesScreenProps {
  onChat: (id: string) => void;
  siteConfig: SiteConfig | null;
}

const MatchesScreen: React.FC<MatchesScreenProps> = ({ onChat, siteConfig }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Unread'>('All');

  return (
    <div className="flex-grow bg-white flex flex-col">
      {/* Dynamic Ad Strip */}
      {siteConfig?.show_ads && (
        <div className="bg-amber-500 text-white px-6 py-3 flex items-center justify-between animate-in slide-in-from-top duration-500">
           <div className="flex items-center space-x-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-2 py-0.5 rounded">Ad</span>
              <p className="text-[11px] font-black tracking-tight">{siteConfig.ad_content}</p>
           </div>
           <button className="text-[10px] font-black underline uppercase tracking-widest">Upgrade</button>
        </div>
      )}

      {/* Match Queue */}
      <div className="pt-6 pb-4 bg-slate-50 border-b border-slate-100">
        <div className="px-6 mb-4 flex items-center justify-between">
          <h2 className="text-[10px] text-rose-500 font-black uppercase tracking-[0.3em]">Gash Connections</h2>
          <span className="text-[10px] text-slate-400 font-black bg-slate-200 px-2 py-0.5 rounded-md">3 NEW</span>
        </div>
        <div className="flex space-x-5 overflow-x-auto no-scrollbar px-6 pb-2">
          {MOCK_USERS.map(user => (
            <button 
              key={user.id} 
              onClick={() => onChat(user.id)}
              className="flex-shrink-0 flex flex-col items-center group"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-[2rem] p-1 border-2 border-rose-500 shadow-md transition-transform group-hover:scale-105 active:scale-90">
                  <img src={user.photos[0]} alt={user.name} className="w-full h-full object-cover rounded-[1.8rem]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                </div>
              </div>
              <span className="text-[11px] font-black text-slate-700 mt-2 tracking-tight uppercase tracking-widest">{user.name}</span>
            </button>
          ))}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-20 h-20 rounded-[2rem] bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 group hover:border-rose-300 transition-colors">
               <svg className="w-7 h-7 text-slate-300 group-hover:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
               </svg>
            </div>
            <span className="text-[11px] font-black text-slate-400 mt-2 uppercase tracking-widest">Find More</span>
          </div>
        </div>
      </div>

      {/* Message Filter Tabs */}
      <div className="px-6 pt-6 flex space-x-8 border-b border-slate-50">
        {(['All', 'Unread'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-xs font-black transition-all relative uppercase tracking-[0.2em] ${activeTab === tab ? 'text-slate-800' : 'text-slate-400'}`}
          >
            {tab} Chats
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500 rounded-full animate-in slide-in-from-left duration-300" />}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-grow overflow-y-auto no-scrollbar pb-24">
        {MOCK_USERS.map((user, i) => (
          <button 
            key={user.id}
            onClick={() => onChat(user.id)}
            className="w-full flex items-center px-6 py-6 hover:bg-slate-50 transition-colors group relative"
          >
            <div className="relative shrink-0">
              <img src={user.photos[0]} alt={user.name} className="w-16 h-16 rounded-[1.6rem] object-cover shadow-sm border border-slate-100" />
              <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
            </div>
            <div className="ml-5 flex-grow text-left">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-black text-slate-800 tracking-tighter text-base">{user.name}</h3>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">14:28</span>
              </div>
              <p className="text-xs text-slate-500 font-medium truncate max-w-[220px]">
                {i === 0 ? "That sounds incredible! When are you moving?" : "I noticed we both speak French, how interesting!"}
              </p>
            </div>
            {i === 0 && (
              <div className="ml-4 shrink-0 w-6 h-6 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/30">
                 <span className="text-[10px] text-white font-black">1</span>
              </div>
            )}
            <div className="absolute bottom-0 left-[6rem] right-6 h-[1px] bg-slate-50" />
          </button>
        ))}
        
        <div className="p-12 text-center opacity-30">
          <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center mx-auto mb-3">
             <span className="text-slate-400 font-black text-sm">G</span>
          </div>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">End of Gash Feed</p>
        </div>
      </div>
    </div>
  );
};

export default MatchesScreen;
