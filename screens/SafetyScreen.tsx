
import React from 'react';

interface SafetyScreenProps {
  onBack: () => void;
}

const SafetyScreen: React.FC<SafetyScreenProps> = ({ onBack }) => {
  const tips = [
    { title: 'Video Call First', desc: 'Always initiate a video call within our platform before meeting in person to verify authenticity.' },
    { title: 'Meet in Public', desc: 'For your first meeting, choose a busy, public location during daylight hours.' },
    { title: 'Tell a Friend', desc: 'Share your location and meeting details with someone you trust before you go.' },
    { title: 'Global Reporting', desc: 'Report any suspicious activity or relocation scams immediately. Our AI monitors for fraud 24/7.' }
  ];

  return (
    <div className="flex-grow bg-slate-50 flex flex-col pt-safe">
      <header className="px-6 py-4 flex items-center bg-white border-b border-slate-100">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-black text-slate-800 ml-2">Safety Center</h2>
      </header>

      <div className="p-6 space-y-8 overflow-y-auto no-scrollbar pb-12">
        <div className="text-center">
           <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 shadow-sm border border-emerald-200">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
           </div>
           <h3 className="text-2xl font-black text-slate-800 tracking-tight">Your safety is our priority</h3>
           <p className="text-slate-500 text-sm font-medium mt-2">Gash Dating uses AI moderation to ensure every connection is authentic and respectful.</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Essential Guidelines</h4>
          {tips.map(tip => (
            <div key={tip.title} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <h5 className="font-black text-slate-800 mb-2">{tip.title}</h5>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{tip.desc}</p>
            </div>
          ))}
        </div>

        <button className="w-full bg-rose-50 py-4 text-rose-500 font-black text-sm rounded-2xl border-2 border-rose-100 active:scale-95 transition-all">
          Report a Specific Concern
        </button>
      </div>
    </div>
  );
};

export default SafetyScreen;
