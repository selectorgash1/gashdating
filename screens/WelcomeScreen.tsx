
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
  const heroDescription = config?.hero_subtitle || "Serious international relationships for the modern professional.";

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-end px-8 overflow-hidden bg-slate-950">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 z-0 scale-105 transition-all duration-1000"
        style={{ 
          backgroundImage: `url("${heroImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />
      </div>
      
      <div className="relative z-10 w-full max-w-md space-y-10 pb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-rose-500 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.6)]">
                 <span className="text-3xl text-white font-black">G</span>
              </div>
              <div className="h-px flex-grow bg-gradient-to-r from-rose-500/50 to-transparent"></div>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter leading-none">
              Gash <span className="text-rose-500">Dating</span>
            </h1>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-200 tracking-tight leading-[0.9] italic">
              {heroTitle}
            </h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[280px]">
              {heroSubtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <button 
            onClick={onStart}
            className="w-full bg-rose-500 text-white font-black py-5 rounded-[2rem] shadow-[0_15px_30px_rgba(225,29,72,0.3)] transition-all active:scale-[0.95] text-lg hover:bg-rose-600"
          >
            Get Started
          </button>
          <button 
            onClick={onSignIn}
            className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 text-white font-bold py-5 rounded-[2rem] transition-all hover:bg-white/5 active:scale-[0.95]"
          >
            Sign In
          </button>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <div className="h-px w-8 bg-slate-800"></div>
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">
            Since 2025
          </span>
          <div className="h-px w-8 bg-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
