import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 text-white"
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            About <span className="text-indigo-400">Click2Biz</span>
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
            <motion.div 
              className="w-full lg:w-1/2"
              variants={fadeIn('right', 'tween', 0.3, 1)}
            >
              {/* Responsive image grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num, idx) => (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-xl border border-gray-700 ${num % 2 === 1 ? 'h-48 sm:h-56' : 'h-64 sm:h-72 mt-4 sm:mt-0'}`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(/about/image${num}.png)` }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2"
              variants={fadeIn('left', 'tween', 0.4, 1)}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-indigo-400">What We Do</h3>
              
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Click2Biz is a digital service brand started in 2025 that helps local shops, businesses, and startups build their online presence with affordable and effective solutions.
              </p>

              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                We provide services including:
              </p>

              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 text-sm sm:text-base">
                <li>Business Website Design & Development</li>
                <li>Search Engine Optimization (SEO) Setup</li>
                <li>Social Media Profile Setup & Management</li>
                <li>Business Logo, Poster & Brochure Designing</li>
                <li>Business Card and Social Media Creatives</li>
                <li>Google Business Profile Setup</li>
                <li>WhatsApp Marketing Support</li>
                <li>Business Branding Packages</li>
              </ul>

              <p className="text-gray-300 mb-6 text-sm sm:text-base">
                Our services are designed especially for small businesses, shops, and service providers looking for a professional and affordable way to go digital and promote their brand.
              </p>

              <motion.div 
                className="bg-indigo-900/30 p-4 sm:p-6 rounded-lg border border-indigo-800 backdrop-blur-none sm:backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-indigo-200 font-semibold text-sm sm:text-base">
                  Package pricing starts from ₹2,999 only.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
