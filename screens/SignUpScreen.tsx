
import React, { useState, useEffect } from 'react';
import { supabase, updateFullProfile, getMyProfile, updateProfileCompletion } from '../services/supabase.ts';
import PhotoUpload from '../components/PhotoUpload.tsx';

interface SignUpScreenProps {
  onComplete: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [location, setLocation] = useState('');
  const [culturalBackground, setCulturalBackground] = useState('');
  const [relocate, setRelocate] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setCurrentUser(user);
        resumeOnboarding(user.id);
      }
    });
  }, []);

  const resumeOnboarding = async (userId: string) => {
    setLoading(true);
    const { profile, details, photos: existingPhotos } = await getMyProfile(userId);
    if (profile) {
      setFirstName(profile.first_name || '');
      setBirthDate(profile.birth_date || '');
      setLocation(profile.location || '');
      setCulturalBackground(details?.cultural_background || '');
      setRelocate(details?.willingness_to_relocate || false);
      setPhotos(existingPhotos?.map(p => p.photo_url) || []);

      if (profile.profile_completion >= 75) setStep(5);
      else if (profile.profile_completion >= 50) setStep(4);
      else if (profile.profile_completion >= 25) setStep(3);
      else setStep(2);
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data.user) {
      setCurrentUser(data.user);
      setStep(2);
      setLoading(false);
    }
  };

  const saveStep = async (percentage: number, next: number) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      await updateFullProfile(
        currentUser.id,
        { first_name: firstName, birth_date: birthDate, location, profile_completion: percentage },
        { cultural_background: culturalBackground, willingness_to_relocate: relocate, last_active: new Date().toISOString() },
        { distance_km: 1000 }
      );
      setStep(next);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
              <div className="w-20 h-20 bg-rose-500 rounded-[2rem] flex items-center justify-center text-4xl text-white font-black mx-auto mb-6 shadow-2xl rotate-3 shine-effect">G</div>
              <h2 className="text-3xl font-black text-white tracking-tight text-glow">Join the Initiative</h2>
              <p className="text-slate-400 mt-2 font-medium">Verified professional connections.</p>
            </div>
            <div className="space-y-4">
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl text-white outline-none focus:ring-2 focus:ring-rose-500 backdrop-blur-md" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl text-white outline-none focus:ring-2 focus:ring-rose-500 backdrop-blur-md" />
            </div>
            <button onClick={handleSignUp} disabled={loading} className="w-full bg-rose-500 text-white font-black py-5 rounded-[2rem] shadow-xl active:scale-95 transition-all shine-effect">
              {loading ? 'Processing...' : 'Secure Identity'}
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center text-white"><h2 className="text-3xl font-black italic">Identity Matrix</h2></div>
            <div className="space-y-4">
              <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl text-white backdrop-blur-md" />
              <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl text-white backdrop-blur-md" />
              <input type="text" placeholder="Current City" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl text-white backdrop-blur-md" />
            </div>
            <button onClick={() => saveStep(25, 3)} className="w-full bg-rose-500 text-white font-black py-5 rounded-3xl shine-effect">Sync Profile</button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
             <div className="text-center text-white"><h2 className="text-3xl font-black italic">Visual Proof</h2></div>
             <div className="bg-white/5 p-6 rounded-[3rem] border border-white/10 backdrop-blur-xl">
               <PhotoUpload photos={photos} onPhotosChange={setPhotos} />
             </div>
             <button onClick={() => saveStep(50, 4)} disabled={photos.length < 3} className="w-full bg-rose-500 text-white font-black py-5 rounded-3xl disabled:opacity-30">Verify Portfolio</button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500 text-white">
            <div className="text-center"><h2 className="text-3xl font-black italic">Global DNA</h2></div>
            <input type="text" placeholder="Cultural Heritage" value={culturalBackground} onChange={e => setCulturalBackground(e.target.value)} className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl text-white backdrop-blur-md" />
            <label className="flex items-center space-x-4 p-6 bg-rose-500/10 backdrop-blur-xl rounded-[2.5rem] border border-rose-500/20">
               <input type="checkbox" checked={relocate} onChange={e => setRelocate(e.target.checked)} className="w-6 h-6 accent-rose-500" />
               <span className="font-bold italic">Willing to cross borders for love</span>
            </label>
            <button onClick={() => saveStep(75, 5)} className="w-full bg-rose-500 text-white font-black py-5 rounded-3xl shine-effect">Finalize Sync</button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 text-center py-12 animate-in zoom-in-90 text-white">
            <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shine-effect italic text-4xl font-black">✓</div>
            <h2 className="text-4xl font-black tracking-tight italic text-glow">Passport Ready</h2>
            <p className="text-slate-400 font-medium italic">Welcome to the global elite.</p>
            <button onClick={async () => { await updateProfileCompletion(currentUser.id, 100); onComplete(); }} className="w-full bg-rose-500 text-white font-black py-6 rounded-[2.5rem] shadow-2xl active:scale-95 transition-all italic text-xl shine-effect">Enter Discovery</button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-6 pt-16 flex flex-col items-center relative z-10 overflow-y-auto no-scrollbar">
      {step > 1 && (
        <div className="fixed top-8 left-12 right-12 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-rose-500 transition-all duration-700" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
      )}
      <div className="w-full max-w-md">{renderStep()}</div>
    </div>
  );
};

export default SignUpScreen;
