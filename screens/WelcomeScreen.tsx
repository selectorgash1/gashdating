
import React from 'react';
import { SiteConfig } from '../types';

interface WelcomeScreenProps {
  onStart: () => void;
  onSignIn: () => void;
  config: SiteConfig | null;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onSignIn, config }) => {
  const heroImage = config?.hero_image || "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&w=1200&q=80";
  const heroTitle = config?.hero_title || "Beyond Borders";
  const heroSubtitle = config?.hero_subtitle || "Elite Global Connections.";

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-end px-8 overflow-hidden bg-transparent">
      {/* Immersive Glass Hero Image Card */}
      <div className="absolute top-12 w-[85%] aspect-[3/4] rounded-[4rem] overflow-hidden border border-white/20 shadow-2xl animate-in zoom-in-95 duration-1000">
        <img src={heroImage} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 w-full max-w-md space-y-8 pb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.6)] shine-effect">
               <span className="text-2xl text-white font-black">G</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
              Gash <span className="text-rose-500">Dating</span>
            </h1>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-5xl font-black text-white tracking-tight leading-[0.9] italic text-glow">
              {heroTitle}
            </h2>
            <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-[280px]">
              {heroSubtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <button 
            onClick={onStart}
            className="w-full bg-rose-500 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-rose-500/30 transition-all active:scale-95 text-lg shine-effect"
          >
            Join the Elite
          </button>
          <button 
            onClick={onSignIn}
            className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white font-bold py-5 rounded-[2rem] transition-all active:scale-95 hover:bg-white/10"
          >
            Member Login
          </button>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <div className="h-px w-8 bg-white/10"></div>
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Global Excellence</span>
          <div className="h-px w-8 bg-white/10"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
