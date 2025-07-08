import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
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
    <section id="bundles" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <motion.div 
        className="container mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
          variants={fadeIn('up', 'tween', 0.2, 1)}
        >
          Affordable <span className="text-indigo-400">{title}</span> Bundles
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div 
              key={index} 
              className={`border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl p-8 shadow-2xl transform transition-all duration-300 hover:-translate-y-2 ${
                index === 1 ? "ring-2 ring-indigo-500 relative z-10" : ""
              }`}
              variants={fadeIn('up', 'tween', 0.3 + index * 0.1, 1)}
              whileHover={{ scale: 1.03 }}
            >
              {index === 1 && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4 text-white">{pkg.name}</h3>
              <div className="text-4xl font-bold text-indigo-400 mb-6">{pkg.price}</div>
              
              <ul className="mb-8 space-y-3">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Bundles;