import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

const Portfolio = () => {
  const projects = [
    { type: "Website", title: "Local Restaurant", category: "website" },
    { type: "Website", title: "Boutique Store", category: "website" },
    { type: "Website", title: "Auto Repair Shop", category: "website" },
    { type: "Social Media", title: "Cafe Promotion", category: "social" },
    { type: "Social Media", title: "Retail Campaign", category: "social" },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
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
          Our <span className="text-indigo-400">Recent Work</span>
        </motion.h2>
        
        <div className="mb-16">
          <motion.h3 
            className="text-2xl font-semibold mb-8 text-center text-indigo-400"
            variants={fadeIn('up', 'tween', 0.3, 1)}
          >
            Website Designs
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.filter(p => p.category === 'website').map((project, index) => (
              <motion.div 
                key={index} 
                className="rounded-xl overflow-hidden border border-gray-800"
                variants={fadeIn('up', 'tween', 0.3 + index * 0.1, 1)}
                whileHover={{ y: -10 }}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-dashed border-gray-700 rounded-xl w-full h-64" />
                <div className="p-4 bg-gray-900">
                  <p className="text-gray-400">{project.type}</p>
                  <h4 className="text-white font-medium">{project.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h3 
            className="text-2xl font-semibold mb-8 text-center text-indigo-400"
            variants={fadeIn('up', 'tween', 0.4, 1)}
          >
            Social Media Designs
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {projects.filter(p => p.category === 'social').map((project, index) => (
              <motion.div 
                key={index} 
                className="rounded-xl overflow-hidden border border-gray-800"
                variants={fadeIn('up', 'tween', 0.4 + index * 0.1, 1)}
                whileHover={{ y: -10 }}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-dashed border-gray-700 rounded-xl w-full h-80" />
                <div className="p-4 bg-gray-900">
                  <p className="text-gray-400">{project.type}</p>
                  <h4 className="text-white font-medium">{project.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Portfolio;