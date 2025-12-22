
import React, { useState } from 'react';
import { AppScreen } from '../types';

interface TopNavProps {
  currentScreen: AppScreen;
  notificationsCount: number;
  onNavigate: (screen: AppScreen) => void;
}

const TopNav: React.FC<TopNavProps> = ({ currentScreen, notificationsCount, onNavigate }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getSubTitle = () => {
    switch (currentScreen) {
      case AppScreen.DASHBOARD: return 'Discover';
      case AppScreen.BROWSE: return 'Explore';
      case AppScreen.MATCHES: return 'Connections';
      case AppScreen.EVENTS: return 'Community';
      case AppScreen.PROFILE: return 'Account';
      case AppScreen.PREMIUM: return 'Plus';
      default: return '';
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-6 z-50 shadow-sm">
        <div 
          onClick={() => onNavigate(AppScreen.DASHBOARD)}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/20 group-active:scale-90 transition-transform">
            <span className="text-white font-black text-xl">G</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-slate-800 tracking-tighter leading-none">Gash Dating</h1>
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{getSubTitle()}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notificationsCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>
          <button 
            onClick={() => onNavigate(AppScreen.PROFILE)}
            className="w-10 h-10 rounded-xl overflow-hidden border-2 border-slate-50 shadow-sm active:scale-90 transition-transform"
          >
            <img src="https://picsum.photos/seed/me/100" alt="Avatar" className="w-full h-full object-cover" />
          </button>
        </div>
      </nav>

      {/* Notifications Tray */}
      {showNotifications && (
        <div className="fixed inset-0 z-[60] flex items-start justify-end p-4 pt-24">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" onClick={() => setShowNotifications(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-top-4 duration-300">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Gash Activity</h3>
              <button className="text-[10px] font-bold text-rose-500 uppercase">Clear All</button>
            </div>
            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
              {[1, 2, 3].map(n => (
                <div key={n} className="p-6 border-b border-slate-50 flex items-start space-x-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-black text-slate-800 leading-tight">New match with Elena!</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">She also loves Techno and Cycling.</p>
                    <span className="text-[10px] text-slate-300 mt-2 block font-black uppercase tracking-widest">2m ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
