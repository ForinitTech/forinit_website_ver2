
import React, { useEffect, useRef, useState } from 'react';
import { Play, CircleDashed, ArrowRight, Pause, Maximize2, Command } from 'lucide-react';

export const DIAProduct: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Handle Video Auto-Play on Scroll
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(() => console.log("Auto-play prevented"));
            setIsPlaying(true);
            
            // Trigger Reveal Animation
            if (containerRef.current) {
                containerRef.current.classList.add('in-view');
            }
          } else {
            videoElement.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.4 } 
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, []);

  // 3D Tilt Effect Calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (clamped)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -2; // Max -2deg to 2deg
    const rotateY = ((x - centerX) / centerX) * 2;
    
    // Set CSS Variables for efficient animation
    containerRef.current.style.setProperty('--rotate-x', `${rotateX}deg`);
    containerRef.current.style.setProperty('--rotate-y', `${rotateY}deg`);
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (containerRef.current) {
        // Reset rotation smoothly
        containerRef.current.style.setProperty('--rotate-x', `0deg`);
        containerRef.current.style.setProperty('--rotate-y', `0deg`);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section id="dia" className="py-24 md:py-32 px-6 md:px-12 bg-white overflow-hidden perspective-1000">
      <style>{`
        .perspective-1000 {
            perspective: 1000px;
        }
        .tilt-card {
            transform: rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale3d(1, 1, 1);
            transition: transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.8s ease, filter 0.8s ease;
            will-change: transform;
        }
        .tilt-card.in-view {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
        }
        /* Initial State before scroll reveal */
        .tilt-card:not(.in-view) {
            opacity: 0.8;
            filter: blur(4px);
            transform: scale(0.95);
        }
        
        /* Gloss/Sheen Effect */
        .gloss-overlay {
            background: radial-gradient(
                circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(255,255,255,0.1) 0%, 
                transparent 50%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        .tilt-card:hover .gloss-overlay {
            opacity: 1;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 border-b border-black/5 pb-20 reveal-up">
           <div className="lg:col-span-3 border-t border-black pt-4">
               <span className="text-xs font-bold uppercase tracking-widest">
                 02 — Flagship Product
               </span>
           </div>
           
           <div className="lg:col-span-9 pt-4 lg:pt-0">
              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">System Live</span>
              </div>
              
              <h2 className="font-sans text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-black mb-8">
                 DIA <span className="text-gray-300">Intelligence.</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-3xl">
                 A new paradigm in autonomous data operations. Replaces manual engineering with self-healing, chat-first agent swarms.
              </p>
           </div>
        </div>

        {/* 3D Interactive Video Container */}
        <div 
            ref={containerRef}
            className="tilt-card relative w-full bg-[#111] rounded-xl overflow-hidden shadow-2xl shadow-black/20 group cursor-pointer border border-black/10"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={togglePlay}
        >
            {/* App Window Chrome (Browser Header) */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-[#1a1a1a] flex items-center px-4 z-20 border-b border-white/10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="ml-6 flex-1 flex justify-center">
                    <div className="bg-black/40 px-3 py-1 rounded text-[10px] font-mono text-gray-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        app.forinit.dia
                    </div>
                </div>
            </div>

            {/* Gloss Reflection Layer */}
            <div className="gloss-overlay absolute inset-0 z-30 mix-blend-overlay"></div>

            {/* The Video Element */}
            <video
                ref={videoRef}
                className="w-full h-auto block pt-10" // Video controls container size
                src="/dia_demo.mp4"
                loop
                muted
                playsInline
            />
            
            {/* Play Button Overlay (Visible on hover or pause) */}
            <div className={`absolute inset-0 z-40 flex items-center justify-center transition-all duration-300 ${isPlaying && !isHovering ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-black/20'}`}>
                 <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-300 group-hover:scale-110">
                    {isPlaying ? (
                        <Pause className="fill-white text-white" size={24} />
                    ) : (
                        <Play className="fill-white text-white ml-1" size={24} />
                    )}
                 </div>
            </div>

            {/* Status Footer Overlay */}
            <div className="absolute bottom-6 left-6 z-40 flex gap-4">
                 <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-xs font-mono text-white">
                    <Command size={12} />
                    <span>AI_AGENT_ACTIVE</span>
                 </div>
                 <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-xs font-mono text-green-400">
                    <CircleDashed size={12} className="animate-spin-slow" />
                    <span>PROCESSING</span>
                 </div>
            </div>

            {/* Expand Icon */}
            <div className="absolute bottom-6 right-6 z-40">
                <div className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                    <Maximize2 size={16} className="text-white" />
                </div>
            </div>
            
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-l border-black/10 mt-16">
            {[
                { title: "Autonomous", desc: "Self-healing pipelines." },
                { title: "Chat-First", desc: "Natural language ops." },
                { title: "Multi-Agent", desc: "Coordinated swarms." },
            ].map((item, i) => (
                <div key={i} className={`border-r border-b md:border-b-0 border-black/10 p-8 hover:bg-gray-50 transition-colors reveal-up`} style={{ transitionDelay: `${i * 100}ms` }}>
                    <h4 className="font-sans font-bold text-xl mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
            ))}
             <div className="reveal-up border-r border-black/10 p-8 flex items-center justify-center bg-black text-white hover:bg-gray-900 transition-colors cursor-pointer group" style={{ transitionDelay: '300ms' }}>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold uppercase tracking-widest">Request Access</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
