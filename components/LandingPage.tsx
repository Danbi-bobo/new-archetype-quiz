import React from 'react';
import { Button } from './Button';
import { Minus } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 relative overflow-hidden text-stone-900">
      
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-stone-100 opacity-50 z-0"></div>

      {/* Navbar - Ultra Minimal */}
      <nav className="px-8 py-10 flex justify-center items-center relative z-10 animate-fade-in">
        <span className="font-serif text-lg tracking-[0.2em] font-semibold text-stone-900">ETHERIA</span>
      </nav>

      {/* Main Content - Centered & Editorial */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 pb-20">
        
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Ornamental Separator */}
          <div className="flex justify-center mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <Minus className="text-stone-400 w-12" strokeWidth={1} />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-8xl text-stone-900 leading-[1.1] mb-8 animate-slide-up opacity-0 font-light" style={{ animationDelay: '0.4s' }}>
            The energy you <br />
            <span className="italic text-stone-500">are missing.</span>
          </h1>

          {/* Subheadline - Slow Reading */}
          <p className="font-reading text-lg md:text-xl text-stone-600 leading-relaxed max-w-md mx-auto mb-16 animate-slide-up opacity-0" style={{ animationDelay: '0.6s' }}>
            You are not broken. You are simply out of alignment. Discover your Archetype in a quiet moment of reflection.
          </p>

          {/* CTA - Minimalist & Centered */}
          <div className="animate-slide-up opacity-0 flex justify-center" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={onStart} 
              className="group relative px-12 py-4 overflow-hidden rounded-full bg-stone-900 text-stone-50 transition-all duration-700 ease-out hover:bg-stone-800 shadow-xl shadow-stone-200"
            >
              <span className="relative z-10 text-xs uppercase tracking-[0.25em] font-medium group-hover:tracking-[0.35em] transition-all duration-700">
                Take Quiz
              </span>
            </button>
          </div>
        </div>

      </section>

      {/* Footer - Philosophy */}
      <div className="relative z-10 py-12 text-center animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
          Internal Architecture Analysis &copy; 2024
        </p>
      </div>
    </div>
  );
};