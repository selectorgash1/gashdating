
import React from 'react';

interface GroupsScreenProps {
  onBack: () => void;
}

const GroupsScreen: React.FC<GroupsScreenProps> = ({ onBack }) => {
  const groups = [
    { name: 'Polyglot Professionals', members: '2.4k', category: 'Language', icon: '🗣️' },
    { name: 'Digital Nomads Berlin', members: '1.2k', category: 'Lifestyle', icon: '💻' },
    { name: 'International Architects', members: '850', category: 'Career', icon: '🏗️' },
    { name: 'Global Foodies', members: '5.6k', category: 'Interests', icon: '🥘' }
  ];

  return (
    <div className="flex-grow bg-white flex flex-col pt-safe">
      <header className="px-6 py-4 flex items-center border-b border-slate-50">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-black text-slate-800 ml-2">Cultural Groups</h2>
      </header>
      
      <div className="p-6 space-y-6 overflow-y-auto no-scrollbar pb-12">
        <div className="bg-rose-50 p-6 rounded-[2.5rem] border border-rose-100">
           <h3 className="text-rose-600 font-black text-lg mb-1">New: Live Forums</h3>
           <p className="text-rose-500/80 text-sm font-medium leading-relaxed">Join real-time discussions about relocation, travel tips, and international dating etiquette.</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest px-2">Popular Communities</h3>
          {groups.map(group => (
            <div key={group.name} className="flex items-center p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                {group.icon}
              </div>
              <div className="ml-4 flex-grow">
                <h4 className="font-black text-slate-800 text-sm tracking-tight">{group.name}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{group.category} • {group.members} Members</p>
              </div>
              <button className="px-4 py-2 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-rose-500/20 active:scale-95 transition-all">Join</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupsScreen;
