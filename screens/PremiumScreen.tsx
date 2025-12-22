
import React, { useState } from 'react';
import { supabase, upgradeToPremium } from '../services/supabase';

interface PremiumScreenProps {
  onSuccess: () => void;
}

const PremiumScreen: React.FC<PremiumScreenProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  const handleSubscribe = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Simulate payment delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      await upgradeToPremium(user.id);
      onSuccess();
    }
    setLoading(false);
  };

  const features = [
    { title: 'Unlimited Likes', desc: 'No more waiting to find your global match.', icon: '❤️' },
    { title: 'Travel Mode', desc: 'Change your location and swipe anywhere in the world.', icon: '✈️' },
    { title: 'Priority Translation', desc: 'AI translation processed instantly for your messages.', icon: '🌐' },
    { title: 'See Who Liked You', desc: 'Instant access to your fan base.', icon: '👀' },
    { title: 'Incognito Mode', desc: 'Only people you like can see your profile.', icon: '🕵️' },
    { title: 'Read Receipts', desc: 'Know exactly when they’ve read your message.', icon: '✓✓' }
  ];

  return (
    <div className="flex-grow bg-slate-50 flex flex-col p-6 overflow-y-auto no-scrollbar">
      <div className="text-center mt-4">
        <div className="inline-block px-4 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
          Gash Plus
        </div>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
          Unlock the Full <br /> Global Experience
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Elevate your search for a meaningful international connection.</p>
      </div>

      {/* Feature Grid */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        {features.map(f => (
          <div key={f.title} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h3 className="font-bold text-slate-800 text-xs mb-1">{f.title}</h3>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing Selector */}
      <div className="mt-10 space-y-3">
        <button 
          onClick={() => setSelectedPlan('annual')}
          className={`w-full p-5 rounded-3xl border-2 flex items-center justify-between transition-all ${
            selectedPlan === 'annual' ? 'border-rose-500 bg-rose-50 shadow-lg shadow-rose-500/10' : 'border-slate-100 bg-white'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${selectedPlan === 'annual' ? 'border-rose-500' : 'border-slate-200'}`}>
              {selectedPlan === 'annual' && <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>}
            </div>
            <div className="text-left">
              <span className="block font-black text-slate-800">Annual Plan</span>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Save 40%</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block font-black text-slate-800">$9.99/mo</span>
            <span className="text-[10px] text-slate-400 font-medium">Billed annually</span>
          </div>
        </button>

        <button 
          onClick={() => setSelectedPlan('monthly')}
          className={`w-full p-5 rounded-3xl border-2 flex items-center justify-between transition-all ${
            selectedPlan === 'monthly' ? 'border-rose-500 bg-rose-50 shadow-lg shadow-rose-500/10' : 'border-slate-100 bg-white'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${selectedPlan === 'monthly' ? 'border-rose-500' : 'border-slate-200'}`}>
              {selectedPlan === 'monthly' && <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>}
            </div>
            <div className="text-left">
              <span className="block font-black text-slate-800">Monthly Plan</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider">Cancel anytime</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block font-black text-slate-800">$16.99/mo</span>
          </div>
        </button>
      </div>

      <button 
        onClick={handleSubscribe}
        disabled={loading}
        className="mt-8 w-full bg-rose-500 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-rose-500/30 flex items-center justify-center space-x-2 active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <span>Upgrade to Plus</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </>
        )}
      </button>

      <div className="mt-8 text-center pb-12">
        <p className="text-[10px] text-slate-400 font-medium">
          Payments are secure and encrypted. <br />
          <span className="underline">Manage Subscriptions</span> • <span className="underline">Privacy</span> • <span className="underline">Terms</span>
        </p>
      </div>
    </div>
  );
};

export default PremiumScreen;
