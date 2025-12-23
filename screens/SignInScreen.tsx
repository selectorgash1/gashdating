
import React, { useState } from 'react';
import { supabase } from '../services/supabase.ts';

interface SignInScreenProps {
  onComplete: (isAdmin?: boolean) => void;
  onBack: () => void;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ onComplete, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (email === 'mutegwamasomaria@gmail.com' && password === '123gashema') {
      setTimeout(() => {
        onComplete(true);
        setLoading(false);
      }, 800);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onComplete(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col pt-16 bg-transparent min-h-screen overflow-y-auto no-scrollbar pb-24 relative z-10">
      <button onClick={onBack} className="mb-10 self-start text-white/60 flex items-center group transition-colors hover:text-rose-500">
        <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center mr-3 group-active:scale-90 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return</span>
      </button>

      <div className="max-w-md mx-auto w-full space-y-12">
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-white tracking-tighter italic leading-none text-glow">Access <br /> <span className="text-rose-500">Gash</span> Hub</h2>
          <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-[240px]">Sign in to resume your global search for excellence.</p>
        </div>

        {error && (
          <div className="p-6 bg-rose-500/10 backdrop-blur-xl text-rose-400 rounded-[2rem] text-xs border border-rose-500/20 font-bold italic animate-in shake duration-300">
            SYSTEM_ERROR: {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-4 italic">Architect Identifier</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gashdating.com" 
              className="w-full p-5 bg-white/5 border border-white/10 rounded-[2rem] focus:ring-2 focus:ring-rose-500 outline-none transition-all font-bold text-white placeholder:text-slate-600 backdrop-blur-md" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-4 italic">Security Token</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full p-5 bg-white/5 border border-white/10 rounded-[2rem] focus:ring-2 focus:ring-rose-500 outline-none transition-all font-bold text-white placeholder:text-slate-600 backdrop-blur-md" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white font-black py-6 rounded-[2.5rem] shadow-2xl active:scale-95 transition-all mt-4 flex items-center justify-center disabled:opacity-50 italic text-lg shine-effect"
          >
            {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : 'Bespoke Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInScreen;
