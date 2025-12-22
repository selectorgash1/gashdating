
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileDetailScreenProps {
  user: UserProfile;
  onBack: () => void;
  onLike: () => void;
  onPass: () => void;
}

const ProfileDetailScreen: React.FC<ProfileDetailScreenProps> = ({ user, onBack, onLike, onPass }) => {
  const [activePhoto, setActivePhoto] = useState(0);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto no-scrollbar animate-in slide-in-from-right duration-300">
      {/* Immersive Photo Carousel */}
      <div className="relative h-[60vh] shrink-0 bg-slate-900">
        <img 
          src={user.photos[activePhoto]} 
          alt={user.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Carousel Indicators */}
        <div className="absolute top-4 left-0 right-0 px-4 flex space-x-1.5">
          {user.photos.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-grow rounded-full transition-all ${i === activePhoto ? 'bg-white' : 'bg-white/30'}`}
              onClick={() => setActivePhoto(i)}
            />
          ))}
        </div>

        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-8 left-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Gradient Bottom Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content Section */}
      <div className="px-6 pb-32 -mt-12 relative z-10 bg-white rounded-t-[3rem]">
        <div className="pt-8 flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">{user.name}, {user.age}</h2>
              {user.verified && (
                <div className="bg-emerald-500 rounded-full p-1 text-white shadow-lg">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </div>
            <p className="text-slate-500 font-medium flex items-center mt-1">
              <svg className="w-4 h-4 mr-1 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
              {user.location}
            </p>
          </div>
          <div className="bg-emerald-50 px-3 py-2 rounded-2xl border border-emerald-100 text-center">
            <span className="block text-[8px] font-black uppercase text-emerald-600 tracking-widest mb-0.5">Compatibility</span>
            <span className="text-xl font-black text-emerald-500">{user.matchScore}%</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Occupation</span>
            <span className="text-sm font-bold text-slate-700">{user.occupation}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Education</span>
            <span className="text-sm font-bold text-slate-700">{user.education}</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-8">
          <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">About</h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            {user.bio}
          </p>
        </div>

        {/* Interests */}
        <div className="mt-8">
          <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map(interest => (
              <span key={interest} className="px-4 py-2 bg-rose-50 text-rose-500 rounded-full text-xs font-bold border border-rose-100">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Cultural Background */}
        <div className="mt-8 p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100">
          <div className="flex items-center space-x-3 mb-3">
             <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
             </div>
             <h3 className="font-black text-indigo-900 tracking-tight">Cultural Identity</h3>
          </div>
          <p className="text-indigo-700/80 text-xs font-medium leading-relaxed">
            Proudly {user.culturalBackground}. Speaks {user.languages.join(', ')}. Currently looking for a {user.relationshipGoals}.
          </p>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 px-8 py-4 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-100 z-[110]">
        <button 
          onClick={() => { onPass(); onBack(); }}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-md border border-slate-50 active:scale-90 transition-all"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <button 
          onClick={() => { onLike(); onBack(); }}
          className="w-14 h-14 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-500/30 active:scale-90 transition-all"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
        </button>
      </div>
    </div>
  );
};

export default ProfileDetailScreen;
