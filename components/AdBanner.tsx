
import React from 'react';
import { SiteConfig } from '../types';

interface AdBannerProps {
  config: SiteConfig | null;
}

const AdBanner: React.FC<AdBannerProps> = ({ config }) => {
  if (!config || !config.show_ads) return null;

  return (
    <div className="fixed top-24 left-6 right-6 z-[40] animate-in slide-in-from-top-12 duration-700">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 flex items-center shadow-2xl">
        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20">
          <img src={config.ad_image || 'https://picsum.photos/seed/ad/100'} className="w-full h-full object-cover" alt="Ad" />
        </div>
        <div className="ml-4 flex-grow">
          <div className="flex items-center space-x-2">
            <span className="text-[8px] font-black uppercase text-amber-500 tracking-widest bg-amber-500/10 px-2 py-0.5 rounded">Elite Sponsor</span>
          </div>
          <p className="text-[11px] font-bold text-white leading-tight mt-1 line-clamp-1 italic">{config.ad_content}</p>
        </div>
        <button className="ml-4 px-4 py-2 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl whitespace-nowrap active:scale-95 transition-all">
          Explore
        </button>
      </div>
    </div>
  );
};

export default AdBanner;
