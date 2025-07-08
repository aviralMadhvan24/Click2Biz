import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <motion.div 
        className="container mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            Our <span className="text-indigo-400">Story</span>
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              variants={fadeIn('right', 'tween', 0.3, 1)}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 border border-gray-700 rounded-xl w-full h-48 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900/30 to-purple-900/20" />
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-xl w-full h-64 mt-8 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900/30 to-purple-900/20" />
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-xl w-full h-64 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900/30 to-purple-900/20" />
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-xl w-full h-48 mt-8 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900/30 to-purple-900/20" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              variants={fadeIn('left', 'tween', 0.4, 1)}
            >
              <h3 className="text-2xl font-bold mb-6 text-indigo-400">Bridging the Digital Divide</h3>
              <p className="text-gray-300 mb-6">
                Founded in 2023, Click2Biz emerged from a simple observation: while large businesses thrive online, 
                local shops struggle with expensive and complex digital solutions. Our mission is to democratize 
                digital presence for neighborhood businesses.
              </p>
              <p className="text-gray-300 mb-6">
                We combine student talent with industry expertise to deliver affordable, fast-turnaround solutions. 
                By keeping our operations lean and focused, we pass the savings directly to business owners who need 
                it most.
              </p>
              <p className="text-gray-300 mb-8">
                Today, we've helped over 200 local businesses establish their online presence, from family-run 
                eateries to neighborhood service providers. We measure our success by the growth we create for 
                our clients.
              </p>
              
              <motion.div 
                className="bg-indigo-900/30 p-6 rounded-lg border border-indigo-800 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-indigo-200 font-semibold italic">
                  "Our vision is a digital economy where every local business has the tools to compete, 
                  connect with customers, and thrive online."
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