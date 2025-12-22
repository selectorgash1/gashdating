
import React, { useState, useRef } from 'react';

interface PhotoUploadProps {
  photos: string[];
  onPhotosChange: (newPhotos: string[]) => void;
  maxPhotos?: number;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ photos, onPhotosChange, maxPhotos = 6 }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 720, height: 960 }, 
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        onPhotosChange([...photos, dataUrl]);
        closeCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Fix: Explicitly cast Array.from(files) to File[] to resolve 'unknown' type inference on iteration
      (Array.from(files) as File[]).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          onPhotosChange([...photos, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotosChange(newPhotos);
  };

  const slots = Array.from({ length: maxPhotos });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {slots.map((_, i) => {
          const photo = photos[i];
          return (
            <div 
              key={i} 
              className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all ${
                photo ? 'border-transparent ring-2 ring-rose-500 ring-offset-2' : 'border-dashed border-slate-200 bg-slate-50'
              }`}
            >
              {photo ? (
                <>
                  <img src={photo} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  {i === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-rose-500/90 text-white text-[8px] font-bold uppercase py-1 text-center tracking-widest">
                      Primary
                    </div>
                  )}
                </>
              ) : (
                <button 
                  onClick={() => i === photos.length && fileInputRef.current?.click()}
                  className={`w-full h-full flex items-center justify-center ${i === photos.length ? 'text-rose-500' : 'text-slate-300 cursor-not-allowed'}`}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex space-x-3">
        <button 
          onClick={startCamera}
          className="flex-1 flex items-center justify-center space-x-2 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span>Live Capture</span>
        </button>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center space-x-2 py-3 bg-rose-50 text-rose-500 rounded-xl font-semibold hover:bg-rose-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span>Gallery</span>
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        multiple 
        className="hidden" 
      />

      {isCameraOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover transform scale-x-[-1]"
            />
            {/* Pose Guidance Overlay */}
            <div className="absolute inset-0 border-4 border-white/20 rounded-3xl pointer-events-none flex items-center justify-center">
              <div className="w-48 h-64 border-2 border-dashed border-white/40 rounded-[100px]" />
            </div>
            
            <button 
              onClick={closeCamera}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-4 drop-shadow-md">Center your face</p>
              <button 
                onClick={capturePhoto}
                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-transform active:scale-90"
              >
                <div className="w-14 h-14 bg-white rounded-full" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
