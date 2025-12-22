
import React from 'react';
import { AppScreen } from '../types';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  isPremium?: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, isPremium }) => {
  const tabs = [
    { id: AppScreen.DASHBOARD, label: 'Discover', icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-rose-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )},
    { id: AppScreen.BROWSE, label: 'Browse', icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-rose-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )},
    { id: AppScreen.MATCHES, label: 'Chats', icon: (active: boolean) => (
      <div className="relative">
        <svg className={`w-6 h-6 ${active ? 'text-rose-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></div>
      </div>
    )},
    { id: AppScreen.EVENTS, label: 'Events', icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-rose-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { id: AppScreen.PROFILE, label: 'Profile', icon: (active: boolean) => (
      <div className="relative">
        <svg className={`w-6 h-6 ${active ? 'text-rose-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {isPremium && (
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white"></div>
        )}
      </div>
    )},
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-around px-2 z-50 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => {
        const active = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex flex-col items-center justify-center flex-1 py-2 active:scale-90 transition-transform"
          >
            {tab.icon(active)}
            <span className={`text-[10px] mt-1 font-black uppercase tracking-widest ${active ? 'text-rose-500' : 'text-slate-400 opacity-60'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
