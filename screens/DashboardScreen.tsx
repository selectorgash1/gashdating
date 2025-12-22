
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { SiteConfig } from '../types';
import DynamicSections from '../components/DynamicSections';

interface DashboardScreenProps {
  onSelectUser: (id: string) => void;
  siteConfig: SiteConfig | null;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onSelectUser, siteConfig }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | 'super' | null>(null);

  const user = MOCK_USERS[currentIndex % MOCK_USERS.length];

  const handleAction = async (type: 'like' | 'pass' | 'super_like') => {
    setSwipeDir(type === 'like' ? 'right' : type === 'pass' ? 'left' : 'super');
    if (navigator.vibrate) navigator.vibrate([10, 30]);
    setTimeout(async () => {
      if (type !== 'pass' && Math.random() > 0.85) setIsMatching(true);
      setCurrentIndex(prev => prev + 1);
      setSwipeDir(null);
    }, 400);
  };

  return (
    <div className="flex-grow flex flex-col bg-transparent overflow-x-hidden relative">
      {/* Celebration Match Modal */}
      {isMatching && (
        <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
           <div className="relative z-10 text-center space-y-8">
              <div className="flex justify-center -space-x-12">
                 <div className="w-40 h-56 rounded-3xl border-4 border-white/20 overflow-hidden -rotate-12 shadow-2xl"><img src="https://picsum.photos/seed/me/400/600" className="w-full h-full object-cover" /></div>
                 <div className="w-40 h-56 rounded-3xl border-4 border-white/20 overflow-hidden rotate-12 shadow-2xl relative"><img src={user.photos[0]} className="w-full h-full object-cover" /></div>
              </div>
              <div>
                 <h2 className="text-5xl font-black text-white tracking-tighter italic">Bespoke Match</h2>
                 <p className="text-rose-500 font-black uppercase tracking-[0.4em] text-xs mt-2">Connecting Worlds</p>
              </div>
              <button onClick={() => setIsMatching(false)} className="w-full max-w-xs bg-rose-500 text-white font-black py-5 rounded-full shadow-2xl shine-effect">Initiate Connection</button>
           </div>
        </div>
      )}

      {/* Discovery Feed Content */}
      <div className="flex-grow overflow-y-auto no-scrollbar">
        <div className="px-8 pt-6 pb-2 flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Discovery Mode</h1>
            <span className="text-3xl font-black text-slate-800 tracking-tighter italic">Global Curations</span>
          </div>
        </div>

        <div className="px-6 py-4 flex items-center justify-center relative">
          <div onClick={() => onSelectUser(user.id)} className={`relative w-full max-w-md aspect-[3/4.5] rounded-[3rem] overflow-hidden transform passport-grain shadow-2xl bg-slate-900 transition-all duration-500 ${swipeDir === 'right' ? 'translate-x-[150%] rotate-12 opacity-0' : swipeDir === 'left' ? '-translate-x-[150%] -rotate-12 opacity-0' : swipeDir === 'super' ? '-translate-y-[150%] scale-110 opacity-0' : ''}`}>
            <img src={user.photos[0]} className="w-full h-full object-cover" alt={user.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-10 space-y-4 text-white">
              <h2 className="text-4xl font-black tracking-tighter italic leading-none">{user.name}, {user.age}</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">{user.location} • {user.occupation}</p>
            </div>
            <div className="absolute inset-0 pointer-events-none shine-effect opacity-20"></div>
          </div>
        </div>

        {/* Dynamic Admin Sections */}
        {siteConfig && <DynamicSections sections={siteConfig.custom_sections} currentPage="dashboard" />}
        
        <div className="h-40" /> {/* Spacer for controls */}
      </div>

      {/* High-Fidelity Controls (Fixed Bottom) */}
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center space-x-6 z-10">
         <button onClick={() => handleAction('pass')} className="w-16 h-16 bg-white/70 backdrop-blur-md border border-white/30 rounded-full shadow-2xl flex items-center justify-center text-slate-400 active:bg-slate-50 transition-all"><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button>
         <button onClick={() => handleAction('like')} className="w-24 h-24 bg-rose-500 rounded-full shadow-2xl flex items-center justify-center text-white scale-110 active:scale-90 transition-all shine-effect"><svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg></button>
         <button onClick={() => handleAction('super_like')} className="w-16 h-16 bg-slate-900/80 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-rose-500 active:bg-black transition-all"><svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg></button>
      </div>
    </div>
  );
};

export default DashboardScreen;
