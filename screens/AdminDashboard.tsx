
import React, { useState, useEffect } from 'react';
import { MOCK_USERS } from '../constants';
import { SiteConfig, CustomSection } from '../types';
import { updateSiteConfig } from '../services/supabase';

interface AdminDashboardProps {
  initialConfig: SiteConfig | null;
  onUpdateConfig: () => void;
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialConfig, onUpdateConfig, onBack }) => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [booting, setBooting] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'METRICS' | 'USER_CONTROL' | 'SITE_CMS'>('METRICS');
  
  // CMS State
  const [config, setConfig] = useState<SiteConfig>(initialConfig || {
    hero_title: "Beyond Borders",
    hero_subtitle: "Elite Global Connections.",
    hero_image: "",
    show_ads: false,
    ad_content: "",
    ad_image: "",
    custom_sections: []
  });

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2000);
    const logInterval = setInterval(() => {
      const actions = ['CMS_SYNC_SUCCESS', 'ADS_SERVER_REACHED', 'ARCHITECT_MODE_LOCKED', 'GLOBAL_CDN_UPDATE'];
      setLogs(prev => [actions[Math.floor(Math.random() * actions.length)] + ' ' + new Date().toLocaleTimeString(), ...prev.slice(0, 4)]);
    }, 2500);
    return () => { clearTimeout(timer); clearInterval(logInterval); };
  }, []);

  const handleSaveCMS = async () => {
    try {
      await updateSiteConfig(config);
      onUpdateConfig();
      alert("GLOBAL SYSTEM CONFIGURATION UPDATED.");
    } catch (err) {
      alert("CRITICAL ERROR: CONFIG_SAVE_FAILED");
    }
  };

  const addSection = () => {
    const newSection: CustomSection = {
      id: Math.random().toString(36).substr(2, 9),
      page: 'dashboard',
      title: 'New Section',
      body: 'Content for your users...',
      active: true
    };
    setConfig({ ...config, custom_sections: [...config.custom_sections, newSection] });
  };

  const updateSection = (id: string, updates: Partial<CustomSection>) => {
    setConfig({
      ...config,
      custom_sections: config.custom_sections.map(s => s.id === id ? { ...s, ...updates } : s)
    });
  };

  const removeSection = (id: string) => {
    setConfig({
      ...config,
      custom_sections: config.custom_sections.filter(s => s.id !== id)
    });
  };

  if (booting) {
    return (
      <div className="flex-grow bg-slate-950 flex flex-col items-center justify-center p-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(225,29,72,0.1)_3px)]"></div>
        </div>
        <div className="w-full max-w-xs space-y-6 text-center z-10">
          <div className="w-24 h-24 bg-rose-600 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black mx-auto shadow-[0_0_60px_rgba(225,29,72,0.6)] animate-bounce-slow italic">G</div>
          <div className="space-y-2">
             <h2 className="text-3xl font-black text-white tracking-tighter italic">GASH ARCHITECT</h2>
             <p className="text-emerald-500 font-mono text-[8px] uppercase tracking-[0.5em] animate-pulse">Initializing Master Security Protocol</p>
          </div>
          <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden w-48 mx-auto mt-12">
             <div className="h-full bg-rose-500 animate-[load_2s_ease-in-out]" style={{width: '100%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-slate-950 flex flex-col min-h-screen text-slate-100 overflow-y-auto no-scrollbar pb-48 font-sans selection:bg-rose-500/30 selection:text-rose-500">
      {/* Architect HUD Header */}
      <header className="p-10 border-b border-slate-900 flex justify-between items-center bg-slate-950/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="flex items-center space-x-6">
           <button 
             onClick={onBack}
             className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors mr-2"
           >
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
           </button>
           <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-2xl italic">G</div>
           <div>
              <h1 className="text-3xl font-black tracking-tighter text-white italic">Gash Architect Console</h1>
              <p className="text-rose-500 text-[9px] font-black uppercase tracking-[0.5em] mt-2">Master Administrator: Active</p>
           </div>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['METRICS', 'USER_CONTROL', 'SITE_CMS'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </header>

      <div className="p-10 animate-in fade-in duration-500">
        {activeTab === 'METRICS' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Global Network', value: '14,208', growth: '+12%', icon: '🌏' },
              { label: 'Active Streams', value: '1,052', growth: 'Optimal', icon: '💠' },
              { label: 'Gross Vault', value: '$128.5k', growth: '+18%', icon: '💳' },
              { label: 'Defense Status', value: '100%', growth: 'Active', icon: '🛡️' }
            ].map(s => (
              <div key={s.label} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[3rem] group hover:border-rose-500/50 transition-all shadow-2xl">
                 <div className="text-4xl mb-6">{s.icon}</div>
                 <div className="text-5xl font-black text-white tracking-tighter mb-2">{s.value}</div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.label}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${s.growth === 'Optimal' || s.growth.startsWith('+') ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                       {s.growth}
                    </span>
                 </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'USER_CONTROL' && (
          <div className="space-y-4">
             <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black text-white tracking-tighter italic flex items-center">
                   <span className="w-4 h-[2px] bg-rose-500 mr-4"></span>
                   Citizen Database
                </h2>
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Global IDs..." 
                  className="bg-slate-900 border-none rounded-2xl px-8 py-4 text-sm font-bold w-96 focus:ring-2 focus:ring-rose-500 outline-none text-white placeholder:text-slate-700 shadow-inner"
                />
             </div>
             {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(user => (
                <div key={user.id} className="bg-slate-900/40 border border-slate-900 p-8 rounded-[3rem] flex items-center group hover:bg-slate-900 transition-all border-l-8 border-l-slate-800 hover:border-l-rose-500">
                  <img src={user.photos[0]} className="w-20 h-20 rounded-2xl object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all shadow-2xl" />
                  <div className="ml-8 flex-grow">
                    <h3 className="text-xl font-black text-white italic">{user.name}, {user.age}</h3>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] mt-1">{user.location} • {user.occupation}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">✓</button>
                    <button className="w-14 h-14 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">×</button>
                  </div>
                </div>
             ))}
          </div>
        )}

        {activeTab === 'SITE_CMS' && (
          <div className="space-y-16 max-w-5xl">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Hero Management */}
                <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 space-y-6">
                   <h3 className="text-xl font-black text-rose-500 tracking-tighter italic">Home Hero Override</h3>
                   <div className="space-y-4">
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest px-2">Hero Image URL</label>
                         <input value={config.hero_image} onChange={(e) => setConfig({...config, hero_image: e.target.value})} className="w-full bg-slate-950 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-rose-500 text-sm font-bold" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest px-2">Hero Title</label>
                         <input value={config.hero_title} onChange={(e) => setConfig({...config, hero_title: e.target.value})} className="w-full bg-slate-950 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-rose-500 text-sm font-bold italic" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest px-2">Hero Tagline</label>
                         <textarea value={config.hero_subtitle} onChange={(e) => setConfig({...config, hero_subtitle: e.target.value})} className="w-full bg-slate-950 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-rose-500 text-sm font-bold min-h-[80px]" />
                      </div>
                   </div>
                </div>

                {/* Ads Management */}
                <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 space-y-6">
                   <h3 className="text-xl font-black text-amber-500 tracking-tighter italic">Global Ad Engine</h3>
                   <div className="space-y-4">
                      <label className="flex items-center justify-between p-6 bg-slate-950 rounded-[2rem] cursor-pointer group">
                        <span className="text-sm font-black text-white italic">Monetization Active</span>
                        <input type="checkbox" checked={config.show_ads} onChange={(e) => setConfig({...config, show_ads: e.target.checked})} className="w-8 h-8 accent-amber-500" />
                      </label>
                      <input placeholder="Ad Image URL" value={config.ad_image} onChange={(e) => setConfig({...config, ad_image: e.target.value})} className="w-full bg-slate-950 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-amber-500 text-sm font-bold" />
                      <textarea placeholder="Ad Copy" value={config.ad_content} onChange={(e) => setConfig({...config, ad_content: e.target.value})} className="w-full bg-slate-950 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-amber-500 text-sm font-bold min-h-[100px]" />
                   </div>
                </div>
             </div>

             {/* Section Architect */}
             <div className="space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black text-white tracking-tighter italic">Section Architect</h3>
                   <button onClick={addSection} className="px-6 py-3 bg-rose-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-2xl active:scale-95">Add New Section</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {config.custom_sections.map(section => (
                      <div key={section.id} className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 space-y-6 relative group">
                         <button onClick={() => removeSection(section.id)} className="absolute top-6 right-6 text-slate-600 hover:text-rose-500">×</button>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                               <label className="text-[8px] font-black uppercase text-slate-600 tracking-widest">Target Page</label>
                               <select value={section.page} onChange={e => updateSection(section.id, { page: e.target.value })} className="w-full bg-slate-950 p-3 rounded-xl border-none text-[10px] font-black uppercase tracking-widest text-rose-500">
                                  <option value="dashboard">Dashboard</option>
                                  <option value="browse">Browse</option>
                                  <option value="matches">Matches</option>
                                  <option value="all">All Pages</option>
                               </select>
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[8px] font-black uppercase text-slate-600 tracking-widest">Status</label>
                               <button onClick={() => updateSection(section.id, { active: !section.active })} className={`w-full p-3 rounded-xl text-[10px] font-black uppercase tracking-widest ${section.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-500'}`}>
                                  {section.active ? 'ACTIVE' : 'DISABLED'}
                               </button>
                            </div>
                         </div>
                         <input placeholder="Section Title" value={section.title} onChange={e => updateSection(section.id, { title: e.target.value })} className="w-full bg-slate-950 p-4 rounded-xl border-none outline-none font-black italic text-white" />
                         <textarea placeholder="Body Text" value={section.body} onChange={e => updateSection(section.id, { body: e.target.value })} className="w-full bg-slate-950 p-4 rounded-xl border-none outline-none text-xs font-medium min-h-[80px]" />
                         <input placeholder="Image URL (Optional)" value={section.image || ''} onChange={e => updateSection(section.id, { image: e.target.value })} className="w-full bg-slate-950 p-4 rounded-xl border-none text-[10px] font-bold" />
                      </div>
                   ))}
                </div>
             </div>

             <button onClick={handleSaveCMS} className="w-full bg-rose-600 text-white font-black py-8 rounded-full shadow-[0_30px_60px_rgba(225,29,72,0.4)] active:scale-95 text-lg italic tracking-tight">Apply Master System Update</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
