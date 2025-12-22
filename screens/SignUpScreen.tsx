
import React, { useState, useEffect } from 'react';
import { supabase, updateFullProfile, getMyProfile, updateProfileCompletion } from '../services/supabase';
import PhotoUpload from '../components/PhotoUpload';

interface SignUpScreenProps {
  onComplete: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1: Welcome/Auth, 2: Identity, 3: Media, 4: Lifestyle, 5: Verification
  const totalSteps = 5;
  
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('Male');
  const [location, setLocation] = useState('');
  const [culturalBackground, setCulturalBackground] = useState('');
  const [relocate, setRelocate] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
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
      setLastName(profile.last_name || '');
      setBirthDate(profile.birth_date || '');
      setGender(profile.gender || 'Male');
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
        { 
          first_name: firstName, 
          last_name: lastName, 
          birth_date: birthDate, 
          gender, 
          location,
          profile_completion: percentage 
        },
        { 
          cultural_background: culturalBackground,
          willingness_to_relocate: relocate,
          last_active: new Date().toISOString()
        },
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
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <div className="w-20 h-20 bg-rose-500 rounded-[2rem] flex items-center justify-center text-4xl text-white font-black mx-auto mb-6 shadow-xl rotate-3">G</div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Create your account</h2>
              <p className="text-slate-500 mt-2 font-medium">Join a global community of professionals.</p>
            </div>
            {error && <div className="p-4 bg-rose-50 text-rose-500 text-xs font-bold rounded-2xl border border-rose-100">{error}</div>}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4">Email Address</label>
                <input type="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-slate-50 border-none rounded-[1.5rem] outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4">Secure Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-slate-50 border-none rounded-[1.5rem] outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
            </div>
            <button onClick={handleSignUp} disabled={loading} className="w-full bg-rose-500 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-rose-500/20 active:scale-95 transition-all disabled:opacity-50">
              {loading ? 'Securing account...' : 'Start Onboarding'}
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Tell us about you</h2>
              <p className="text-slate-500 mt-2 font-medium">This is how your matches will see you.</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-rose-500" />
                <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4">Birth Date</label>
                 <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4">Current Location</label>
                 <input type="text" placeholder="London, United Kingdom" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
            </div>
            <button onClick={() => saveStep(25, 3)} disabled={!firstName || !birthDate} className="w-full bg-rose-500 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-rose-500/20 active:scale-95 transition-all disabled:opacity-50">
              Continue (25% Done)
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Your Portfolio</h2>
              <p className="text-slate-500 mt-2 font-medium">Add at least 3 photos to verify your identity.</p>
            </div>
            <PhotoUpload photos={photos} onPhotosChange={setPhotos} />
            <button 
              onClick={() => saveStep(50, 4)} 
              disabled={photos.length < 3}
              className={`w-full font-black py-5 rounded-[2rem] shadow-xl transition-all active:scale-95 ${
                photos.length >= 3 ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Next Step (50% Done)
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Global Fit</h2>
              <p className="text-slate-500 mt-2 font-medium">Help our AI find your cultural matches.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-1">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4">Cultural Background</label>
                 <input type="text" placeholder="e.g. European-Japanese" value={culturalBackground} onChange={e => setCulturalBackground(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-rose-500" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4">My Interests</label>
                <div className="flex flex-wrap gap-2">
                  {['Travel', 'Nomad Life', 'Fine Dining', 'Tech', 'Art', 'Architecture', 'Hiking'].map(tag => (
                    <button key={tag} onClick={() => setSelectedInterests(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag])} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedInterests.includes(tag) ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-slate-500 border-slate-100'}`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center space-x-4 p-5 bg-indigo-50 rounded-[2rem] border border-indigo-100 cursor-pointer">
                <input type="checkbox" checked={relocate} onChange={e => setRelocate(e.target.checked)} className="w-5 h-5 accent-indigo-500" />
                <div className="flex-grow">
                   <span className="block text-sm font-black text-indigo-900 tracking-tight">Open to Relocation</span>
                   <span className="text-[10px] text-indigo-700/60 font-medium">I'm willing to move for the right connection.</span>
                </div>
              </label>
            </div>
            <button onClick={() => saveStep(75, 5)} className="w-full bg-rose-500 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-rose-500/20 active:scale-95 transition-all">
              Continue (75% Done)
            </button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8 text-center animate-in fade-in zoom-in-95 duration-700 py-12">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">Passport Ready!</h2>
            <p className="text-slate-500 font-medium px-4">Your profile is verified and ready for the global stage. We've matched your cultural background with initial prospects.</p>
            <button onClick={async () => { await updateProfileCompletion(currentUser.id, 100); onComplete(); }} className="w-full bg-rose-500 text-white font-black py-5 rounded-[2.5rem] shadow-2xl shadow-rose-500/30 active:scale-95 transition-all mt-8">
              Start Swiping
            </button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 pt-16 flex flex-col items-center">
      {step > 1 && (
        <div className="fixed top-8 left-12 right-12 h-1.5 bg-slate-50 rounded-full overflow-hidden">
          <div className="h-full bg-rose-500 transition-all duration-700 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
      )}
      <div className="w-full max-w-md">{renderStep()}</div>
    </div>
  );
};

export default SignUpScreen;
