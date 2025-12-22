
import React, { useState, useEffect } from 'react';
import { supabase, getMyProfile } from '../services/supabase';
import { Profile } from '../types';

interface ProfileScreenProps {
  onUpgrade: () => void;
  onOpenSafety: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onUpgrade, onOpenSafety }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { profile } = await getMyProfile(user.id);
        if (profile) setProfile(profile as Profile);
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex-grow bg-white flex flex-col pt-8 overflow-y-auto no-scrollbar pb-32">
      {/* Header Profile Identity */}
      <div className="px-10 flex flex-col items-center">
        <div className="relative group">
           <div className="w-44 h-56 bg-slate-100 rounded-[3rem] overflow-hidden transform group-hover:rotate-3 transition-transform duration-500 shadow-2xl">
              <img 
                src={`https://picsum.photos/seed/${profile?.id || 'me'}/400/600`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                alt="Profile"
              />
           </div>
           {profile?.is_premium && (
             <div className="absolute -top-4 -right-4 bg-slate-950 text-white text-[9px] font-black px-4 py-2 rounded-2xl shadow-2xl tracking-[0.2em] border border-white/20 italic">
               PLUS TIER
             </div>
           )}
           <button className="absolute -bottom-4 -right-4 w-14 h-14 bg-rose-500 text-white rounded-3xl flex items-center justify-center shadow-2xl active:scale-90 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
           </button>
        </div>

        <div className="mt-10 text-center">
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">
             {profile?.first_name || 'Gash Profile'}
           </h2>
           <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mt-2 italic">
             {profile?.occupation || 'Global Visionary'}
           </p>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="mt-12 px-8 grid grid-cols-2 gap-4">
         <div className="p-8 bg-slate-50 rounded-5xl border border-slate-100 space-y-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Reach Index</span>
            <div className="flex items-end space-x-2">
               <span className="text-4xl font-black text-slate-900 tracking-tighter">1.2k</span>
               <span className="text-[10px] font-black text-emerald-500 mb-2">+12%</span>
            </div>
         </div>
         <div className="p-8 bg-slate-900 rounded-5xl space-y-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Success Rate</span>
            <div className="flex items-end space-x-2">
               <span className="text-4xl font-black text-white tracking-tighter">84%</span>
            </div>
         </div>
      </div>

      {/* Account Settings Menu */}
      <div className="mt-12 px-8 space-y-4">
         <div className="flex items-center justify-between px-2 mb-4">
            <h3 className="text-xs font-black text-slate-950 uppercase tracking-[0.3em] italic">Architect Preferences</h3>
            <div className="w-12 h-[2px] bg-slate-100" />
         </div>

         {[
            { label: 'Global Filters', icon: '🌍', detail: 'Travel Mode Active' },
            { label: 'Identity Verification', icon: '🛡️', detail: profile?.verified ? 'Authentic' : 'Pending', action: onOpenSafety },
            { label: 'Gash Plus Hub', icon: '💎', detail: profile?.is_premium ? 'Managed' : 'Upgrade', action: profile?.is_premium ? undefined : onUpgrade },
            { label: 'Secure Log Out', icon: '🚪', detail: 'System Disconnect', action: () => supabase.auth.signOut(), danger: true }
         ].map((item, i) => (
            <button 
              key={i}
              onClick={item.action}
              className={`w-full flex items-center p-6 rounded-[2.5rem] transition-all group active:scale-[0.98] ${item.danger ? 'bg-rose-50 border border-rose-100' : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl'}`}
            >
               <div className={`w-14 h-14 rounded-3xl flex items-center justify-center text-2xl mr-6 transition-transform group-hover:scale-110 ${item.danger ? 'bg-rose-500 text-white' : 'bg-slate-50 text-slate-900'}`}>
                  {item.icon}
               </div>
               <div className="flex-grow text-left">
                  <span className={`block font-black tracking-tight text-base italic ${item.danger ? 'text-rose-600' : 'text-slate-900'}`}>{item.label}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${item.danger ? 'text-rose-400' : 'text-slate-400'}`}>{item.detail}</span>
               </div>
               <svg className={`w-6 h-6 ${item.danger ? 'text-rose-300' : 'text-slate-200'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
            </button>
         ))}
      </div>
    </div>
  );
};

export default ProfileScreen;
