
import React, { useEffect, useRef, useState } from 'react';

// A simple typing effect component for the terminal
const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

export const Team: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
           
           {/* Left Column: The Manifesto */}
           <div className="flex flex-col justify-between h-full reveal-up">
              <div>
                  <div className="border-t border-black pt-4 inline-block mb-12">
                      <span className="text-xs font-bold uppercase tracking-widest">
                         03 — The Blueprint
                      </span>
                  </div>
                  
                  <h2 className="font-sans text-5xl md:text-6xl font-bold tracking-tight mb-8">
                     Small team. <br/>
                     <span className="text-gray-400">Massive Scale.</span>
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                     We don't have a corner office. We don't have middle management. 
                     Forinit is a lean collective of engineers building the next generation of autonomous tools.
                  </p>
                  <p className="text-black font-medium text-lg leading-relaxed mb-12 max-w-md">
                     We believe software should build itself. We are starting from zero to prove it.
                  </p>
              </div>

              {/* Principles Grid (Replaces Fake Stats) */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 border-t border-black/10 pt-8">
                 <div className="reveal-up delay-100">
                    <span className="block text-xl font-bold mb-2">Native AI</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Core Architecture</span>
                 </div>
                 <div className="reveal-up delay-200">
                    <span className="block text-xl font-bold mb-2">Remote First</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Global Mindset</span>
                 </div>
                 <div className="reveal-up delay-300">
                    <span className="block text-xl font-bold mb-2">Open Beta</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Coming Q4 2024</span>
                 </div>
              </div>
           </div>

           {/* Right Column: Abstract Terminal Visual (Replaces Office Photo) */}
           <div className="relative reveal-up delay-200">
               
               {/* Decorative backdrop */}
               <div className="absolute -inset-4 bg-gray-50 rounded-xl transform rotate-2"></div>
               
               {/* Terminal Window */}
               <div className="relative bg-[#111] rounded-lg shadow-2xl overflow-hidden border border-black/10 aspect-square md:aspect-[4/3] flex flex-col">
                   
                   {/* Terminal Header */}
                   <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/10">
                       <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                       <div className="ml-auto text-[10px] font-mono text-gray-500">zsh — forinit-dev</div>
                   </div>

                   {/* Terminal Content */}
                   <div className="p-6 font-mono text-sm text-gray-300 leading-loose">
                       <div className="mb-4">
                           <span className="text-green-500">➜</span> <span className="text-blue-400">~</span> <Typewriter text="cd forinit-core && npm run init-sequence" />
                       </div>
                       
                       {/* Animated simulated output */}
                       <div className="opacity-0 animate-[fadeIn_0.5s_ease-out_2.5s_forwards]">
                           <div className="text-gray-500">{'>'}  initializing neural_engine...</div>
                           <div className="text-gray-500">{'>'}  connecting to swarm_v2...</div>
                           <div className="text-green-400 mt-2">✔ Core Systems Online</div>
                           <div className="text-green-400">✔ Agents Deployed: 12</div>
                           <br />
                           <div className="border-l-2 border-gray-700 pl-4 py-2 my-2 bg-white/5">
                               <span className="text-blue-300">Mission:</span> Eliminate manual data ops.<br/>
                               <span className="text-blue-300">Status:</span> Building...
                           </div>
                           <br />
                           <span className="text-green-500">➜</span> <span className="text-blue-400">forinit-core</span> <span className="animate-pulse">_</span>
                       </div>
                   </div>

               </div>
           </div>

        </div>

      </div>
    </section>
  );
};
