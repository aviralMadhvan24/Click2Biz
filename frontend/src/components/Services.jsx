import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

const Services = () => {
  const services = [
    {
      title: "Website Development",
      description: "Professional, mobile-friendly websites that convert visitors into customers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Social Media Management",
      description: "Engaging content and strategy to grow your online presence.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "Website Retainers",
      description: "Ongoing maintenance and updates to keep your site fresh.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
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
          Our <span className="text-indigo-400">Core Services</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 shadow-xl"
              variants={fadeIn('up', 'tween', 0.3 + index * 0.1, 1)}
              whileHover={{ y: -10, borderColor: '#818cf8' }}
            >
              <div className="text-indigo-400 mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="mb-6 text-gray-400">{service.description}</p>
              <motion.button 
                onClick={() => document.getElementById('bundles').scrollIntoView({ behavior: 'smooth' })}
                className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors flex items-center"
                whileHover={{ x: 5 }}
              >
                View Bundles
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;