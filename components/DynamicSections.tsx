
import React from 'react';
import { CustomSection } from '../types';

interface DynamicSectionsProps {
  sections: CustomSection[];
  currentPage: string;
}

const DynamicSections: React.FC<DynamicSectionsProps> = ({ sections, currentPage }) => {
  const activeSections = sections.filter(s => s.active && (s.page === currentPage || s.page === 'all'));

  if (activeSections.length === 0) return null;

  return (
    <div className="space-y-8 py-8 px-6">
      {activeSections.map((section) => (
        <div key={section.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          {section.image && (
            <div className="h-48 w-full overflow-hidden">
              <img src={section.image} className="w-full h-full object-cover" alt={section.title} />
            </div>
          )}
          <div className="p-8 space-y-3">
            <h3 className="text-xl font-black text-slate-900 tracking-tighter italic">{section.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">{section.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicSections;
