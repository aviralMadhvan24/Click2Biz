
import React from 'react';

const Hero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#312E81] to-[#FF6B00] text-white flex items-center">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Click2Biz — Bringing Local Businesses Online, Fast & Affordable.
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          We help small businesses go digital in 7 days.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => scrollToSection('contact')}
            className= "  cursor-pointer bg-white text-[#312E81] px-8 py-4 rounded-full font-bold hover:bg-indigo-100 transition duration-300"
          >
            Get a Quote
          </button>
          <button 
            onClick={() => scrollToSection('bundles')}
            className=" cursor-pointer bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition duration-300"
          >
            View Pricing
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;



