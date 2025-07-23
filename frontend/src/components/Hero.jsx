// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

const Hero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500/10"
            style={{
              width: Math.random() * 30 + 5,
              height: Math.random() * 30 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-6 py-24 text-center relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="inline-block bg-indigo-900/30 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-indigo-700"
        >
          <span className="text-indigo-300 font-medium">Digital Solutions for Local Businesses</span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white"
          variants={fadeIn('up', 'tween', 0.3, 1)}
        >
          <span className="block">Transform Your Business with</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Professional Digital Presence
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-300"
          variants={fadeIn('up', 'tween', 0.4, 1)}
        >
          We help small businesses establish premium online identities in just 7 days
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={fadeIn('up', 'tween', 0.5, 1)}
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 cursor-pointer rounded-full font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
          >
            Get Your Digital Solution
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('bundles')}
            className="px-8 py-4 cursor-pointer rounded-full font-bold bg-transparent border-2 border-indigo-500 text-white hover:bg-indigo-900/30 transition-colors"
          >
            Explore Pricing Plans
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="mt-16 flex justify-center"
          variants={fadeIn('up', 'tween', 0.6, 1)}
        >
          {/* <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 max-w-md border border-gray-700">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: "Websites", value: "200+" },
                { label: "Clients", value: "150+" },
                { label: "Support", value: "24/7" },
                { label: "Delivery", value: "7 Days" },
              ].map((stat, i) => (
                <div key={i} className="text-center px-4">
                  <div className="text-3xl font-bold text-indigo-400">{stat.value}</div>
                  <div className="text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div> */}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;