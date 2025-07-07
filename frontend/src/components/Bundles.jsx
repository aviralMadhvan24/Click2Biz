// src/components/Bundles.jsx
import React from 'react';

const Bundles = ({title}) => {
  const packages = [
    {
      name: "Basic Launch",
      price: "₹4,999",
      features: ["1-page responsive website", "WhatsApp business button", "Basic contact form", "1-month free support"]
    },
    {
      name: "Standard Pro",
      price: "₹6,999",
      features: ["3-5 page website", "Basic SEO optimization", "Image gallery", "Mobile-responsive design", "3-month support"]
    },
    {
      name: "Premium Presence",
      price: "₹9,999",
      features: ["5-8 page custom website", "Advanced animations", "Blog setup", "SEO optimization", "Social media integration", "6-month priority support"]
    }
  ];

  return (
    <section id="bundles" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Affordable {title} Bundles
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`border rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-2 ${
                index === 1 ? "ring-2 ring-indigo-500 relative scale-105" : ""
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
              <div className="text-4xl font-bold text-[#312E81] mb-6">{pkg.price}</div>
              <ul className="mb-8 space-y-3">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-[#312E81] text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bundles;