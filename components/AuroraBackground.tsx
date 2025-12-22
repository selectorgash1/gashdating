
import React from 'react';

const AuroraBackground: React.FC = () => {
  return (
    <div className="aurora-bg">
      {/* Animated Mesh Blobs */}
      <div className="blob -top-20 -left-20"></div>
      <div className="blob blob-2 bottom-0 right-0"></div>
      <div className="blob blob-3 top-1/2 left-1/3 opacity-10"></div>
      
      {/* Floating Crystals (Vertical Drift) */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className="crystal"
          style={{
            width: Math.random() * 100 + 40 + 'px',
            height: Math.random() * 100 + 40 + 'px',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 15 + 's',
            animationDuration: (Math.random() * 10 + 15) + 's',
            opacity: Math.random() * 0.3 + 0.1
          }}
        />
      ))}
      
      {/* Subtle Scanline Overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
    </div>
  );
};

export default AuroraBackground;
