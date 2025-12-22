
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { UserProfile, SiteConfig } from '../types';
import DynamicSections from '../components/DynamicSections';

interface BrowseScreenProps {
  onSelectUser: (user: UserProfile) => void;
  siteConfig: SiteConfig | null;
}

const BrowseScreen: React.FC<BrowseScreenProps> = ({ onSelectUser, siteConfig }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <div className="flex-grow flex flex-col bg-slate-50">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-4 border-b border-slate-100 flex items-center space-x-3">
        <div className="flex-grow bg-slate-100 rounded-2xl px-4 py-3 flex items-center border border-transparent focus-within:border-rose-200 focus-within:bg-white transition-all shadow-inner">
           <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search global matches..." className="ml-2 bg-transparent outline-none text-sm w-full font-medium" />
        </div>
        <button onClick={() => setShowFilters(true)} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-600 shadow-sm active:scale-90"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg></button>
      </div>

      <div className="p-4 space-y-8 pb-24 overflow-y-auto no-scrollbar">
        {/* Dynamic Admin Sections */}
        {siteConfig && <DynamicSections sections={siteConfig.custom_sections} currentPage="browse" />}

        <section>
          <div className="flex items-center justify-between px-2 mb-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Global Top Picks</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {MOCK_USERS.map((user, i) => (
              <div key={i} onClick={() => onSelectUser(user)} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group relative aspect-[3/4] cursor-pointer hover:shadow-xl transition-all duration-300">
                 <img src={user.photos[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={user.name} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-base truncate">{user.name}, {user.age}</h3>
                    <p className="text-white/70 text-[10px] font-medium tracking-wide">{user.location}</p>
                 </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrowseScreen;
