
import React, { useState } from 'react';

export const Mission: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white border-b border-black/5">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-12 mb-20 reveal-up">
           <div className="border-t border-black pt-4">
              <span className="text-xs font-bold uppercase tracking-widest">
                 01 — Our Ethos
              </span>
           </div>
           <div className="lg:col-span-3 pt-4 lg:pt-0">
              <h2 className="font-sans text-4xl md:text-6xl font-semibold leading-tight tracking-tight mb-8">
                 We don't just build software. <br />
                 We engineer <span className="text-gray-400">intelligent systems.</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
                  In a world of noise, we build the signal. Our approach creates clarity through code, designing autonomous infrastructures that scale effortlessly.
              </p>
           </div>
        </div>

        {/* Technical Grid Layout */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 border-t border-black/10"
          onMouseLeave={() => setHoveredIndex(null)}
        >
           
           {/* Column 1 */}
           <div 
             className={`group border-r border-black/10 py-12 pr-8 transition-all duration-500 cursor-default reveal-up delay-100 ${hoveredIndex !== null && hoveredIndex !== 0 ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}
             onMouseEnter={() => setHoveredIndex(0)}
           >
              <span className="block text-xs text-gray-400 mb-6 font-mono group-hover:text-black transition-colors">STEP_01</span>
              <h3 className="font-sans text-2xl font-bold mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">Create.</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                 Innovation starts with a blank canvas. We reimagine the status quo to architect solutions that didn't exist yesterday.
              </p>
           </div>

           {/* Column 2 */}
           <div 
             className={`group border-r border-black/10 py-12 px-0 md:px-8 transition-all duration-500 cursor-default reveal-up delay-200 ${hoveredIndex !== null && hoveredIndex !== 1 ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}
             onMouseEnter={() => setHoveredIndex(1)}
           >
              <span className="block text-xs text-gray-400 mb-6 font-mono group-hover:text-black transition-colors">STEP_02</span>
              <h3 className="font-sans text-2xl font-bold mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">Develop.</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                 We translate concepts into high-performance engines. Our code is clean, modular, and built to outlast trends.
              </p>
           </div>

           {/* Column 3 */}
           <div 
             className={`group py-12 pl-0 md:pl-8 transition-all duration-500 cursor-default reveal-up delay-300 ${hoveredIndex !== null && hoveredIndex !== 2 ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}
             onMouseEnter={() => setHoveredIndex(2)}
           >
              <span className="block text-xs text-gray-400 mb-6 font-mono group-hover:text-black transition-colors">STEP_03</span>
              <h3 className="font-sans text-2xl font-bold mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">Lead.</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                 We set the technical standard. By pushing boundaries, we give our partners the unfair advantage of superior technology.
              </p>
           </div>

        </div>

      </div>
    </section>
  );
};
