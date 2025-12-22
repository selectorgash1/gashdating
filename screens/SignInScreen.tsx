
import React, { useState } from 'react';
import { supabase } from '../services/supabase';

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
    
    // Admin Override Check
    if (email === 'mutegwamasomaria@gmail.com' && password === '123gashema') {
      setTimeout(() => {
        onComplete(true);
        setLoading(false);
      }, 800);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onComplete(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github' | 'azure') => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col pt-16 bg-white min-h-screen overflow-y-auto no-scrollbar pb-24">
      <button onClick={onBack} className="mb-10 self-start text-slate-400 flex items-center group transition-colors hover:text-rose-500">
        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center mr-3 group-active:scale-90 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return</span>
      </button>

      <div className="max-w-md mx-auto w-full space-y-12">
        <div className="space-y-3">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none">Access <br /> <span className="text-rose-500">Gash</span> Hub</h2>
          <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-[240px]">Sign in to resume your global search for excellence.</p>
        </div>

        {/* Social Identity Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] whitespace-nowrap">Social Identity</span>
            <div className="h-px w-full bg-slate-50"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => handleOAuthSignIn('google')}
              className="flex flex-col items-center justify-center p-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group active:scale-90"
            >
              <svg className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.02 1.024-2.424 1.808-4.816 1.808-3.832 0-6.944-3.112-6.944-6.944s3.112-6.944 6.944-6.944c2.104 0 3.632.832 4.744 1.888l2.32-2.32C18.424 1.488 15.824 0 12.48 0 6.48 0 1.6 4.88 1.6 10.88s4.88 10.88 10.88 10.88c3.24 0 5.712-1.064 7.632-3.072 2.016-2.016 2.656-4.888 2.656-7.256 0-.688-.048-1.344-.144-1.952h-8.128z"/>
              </svg>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">Google</span>
            </button>

            <button 
              onClick={() => handleOAuthSignIn('github')}
              className="flex flex-col items-center justify-center p-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group active:scale-90"
            >
              <svg className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">GitHub</span>
            </button>

            <button 
              onClick={() => handleOAuthSignIn('azure')}
              className="flex flex-col items-center justify-center p-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group active:scale-90"
            >
              <svg className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
              </svg>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">Microsoft</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="h-px w-full bg-slate-50"></div>
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] whitespace-nowrap">Legacy Credentials</span>
          <div className="h-px w-full bg-slate-50"></div>
        </div>

        {error && (
          <div className="p-6 bg-rose-50 text-rose-600 rounded-[2rem] text-xs border border-rose-100 font-bold italic animate-in shake duration-300">
            SYSTEM_ERROR: {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4 italic">Architect Identifier</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gashdating.com" 
              required
              className="w-full p-5 bg-slate-50 border-none rounded-[2rem] focus:ring-2 focus:ring-rose-500 outline-none transition-all font-bold placeholder:text-slate-300 shadow-inner" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4 italic">Security Token</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              className="w-full p-5 bg-slate-50 border-none rounded-[2rem] focus:ring-2 focus:ring-rose-500 outline-none transition-all font-bold placeholder:text-slate-300 shadow-inner" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-rose-500 text-white font-black py-6 rounded-[2.5rem] shadow-[0_20px_40px_rgba(225,29,72,0.3)] active:scale-95 transition-all mt-4 flex items-center justify-center disabled:opacity-50 italic text-lg"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : 'Bespoke Login'}
          </button>
        </form>

        <div className="text-center pt-4 flex flex-col space-y-4">
          <button className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] hover:text-rose-500 transition-colors italic">
            Request Token Reset
          </button>
          <div className="flex items-center justify-center space-x-3 opacity-20">
             <div className="h-px w-8 bg-slate-400"></div>
             <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Gash Security Standard</span>
             <div className="h-px w-8 bg-slate-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
