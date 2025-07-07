// src/components/Portfolio.jsx
import React from 'react';

const Portfolio = () => {
  const websites = Array(3).fill(null);
  const socialPosts = Array(2).fill(null);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Our Recent Work
        </h2>
        
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-[#312E81]">Website Designs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {websites.map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                <div className="p-4 bg-white">
                  <p className="text-gray-600">Local Business Website</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center text-[#312E81]">Social Media Designs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {socialPosts.map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80" />
                <div className="p-4 bg-white">
                  <p className="text-gray-600">Engagement Campaign</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;