
import React from 'react';
import { MOCK_EVENTS } from '../constants';

const EventsScreen: React.FC = () => {
  return (
    <div className="p-4 bg-slate-50 min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Community</h2>
        <button className="bg-rose-500 text-white text-sm font-bold px-4 py-2 rounded-xl">
          Create Event
        </button>
      </div>

      <div className="flex space-x-2 mb-6 overflow-x-auto no-scrollbar">
        {['All Events', 'Virtual', 'Local', 'Workshops', 'Language Exchange'].map((tab, i) => (
          <button key={tab} className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap font-semibold transition-colors ${
            i === 0 ? 'bg-rose-500 text-white' : 'bg-white text-slate-500 border border-slate-100'
          }`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6 pb-20">
        {MOCK_EVENTS.map(event => (
          <div key={event.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-md transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-rose-500 uppercase tracking-wider">
                {event.type}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-800">{event.title}</h3>
                <span className="text-rose-500 font-bold text-xs">{event.date}</span>
              </div>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/ev${i}/100`} className="w-8 h-8 rounded-full border-2 border-white" alt="Attendee" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] text-slate-400 font-bold">
                    +{event.attendees - 3}
                  </div>
                </div>
                <button className="text-rose-500 font-bold text-sm hover:underline">
                  RSVP Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsScreen;
