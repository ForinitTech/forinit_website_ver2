
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-black/10 pt-24 pb-12 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32">
           <div className="md:col-span-2">
              <a href="#" className="font-sans text-2xl font-bold tracking-tight block mb-8">Forinit.</a>
              <p className="max-w-xs text-sm text-gray-500 leading-relaxed">
                 A technical design studio building the invisible infrastructure of tomorrow.
              </p>
           </div>
           
           <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-6 block text-gray-400">Contact</span>
              <a href="mailto:business@forinit.com" className="block text-base font-medium hover:text-gray-500 transition-colors mb-2">
                business@forinit.com
              </a>
              <span className="text-gray-500 text-sm">Salem, Tamil Nadu</span>
           </div>
           
           <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-6 block text-gray-400">Social</span>
              <div className="space-y-2">
                  <a href="#" className="block text-base font-medium hover:text-gray-500 transition-colors">LinkedIn</a>
                  <a href="#" className="block text-base font-medium hover:text-gray-500 transition-colors">Instagram</a>
                  <a href="#" className="block text-base font-medium hover:text-gray-500 transition-colors">Twitter / X</a>
              </div>
           </div>
        </div>

        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-end">
            <h1 className="text-[14vw] leading-[0.8] font-bold tracking-tighter text-black/5 select-none -mb-6 -ml-4">
                FORINIT
            </h1>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest mt-8 md:mt-0 md:pb-2">
                <a href="#" className="hover:text-gray-500 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-500 transition-colors">Terms</a>
                <span className="text-gray-400">© 2024</span>
            </div>
        </div>

      </div>
    </footer>
  );
};
