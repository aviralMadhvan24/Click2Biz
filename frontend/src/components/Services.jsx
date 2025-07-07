// src/components/Services.jsx
import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Website Development",
      description: "Professional, mobile-friendly websites that convert visitors into customers.",
    },
    {
      title: "Social Media Management",
      description: "Engaging content and strategy to grow your online presence.",
    },
    {
      title: "Website Retainers",
      description: "Ongoing maintenance and updates to keep your site fresh.",
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Our Core Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 border-amber-300 rounded-xl shadow-[#312E81] hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-4 text-[#312E81]">{service.title}</h3>
              <p className="mb-6 text-gray-600">{service.description}</p>
              <button 
                onClick={() => document.getElementById('bundles').scrollIntoView({ behavior: 'smooth' })}
                className="text-[#312E81] font-semibold hover:text-indigo-800 transition-colors"
              >
                View Bundles →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;