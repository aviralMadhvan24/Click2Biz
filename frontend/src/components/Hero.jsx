import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Hero = ({ onLoginClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (user?.role === 'client') {
      navigate('/client-dashboard');
    } else {
      document.getElementById('bundles')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="absolute inset-0 z-20 overflow-hidden">
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
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-30 container mx-auto px-6 py-24 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="inline-block bg-indigo-900/30 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-indigo-700"
        >
          <span className="text-indigo-300 font-medium">
            Digital Solutions for Local Businesses
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white"
          variants={fadeIn('up', 'tween', 0.3, 1)}
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
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
            onClick={() => {
  if (user?.role === 'client') {
    navigate('/client-dashboard');
  } else {
    onLoginClick(); // open login modal
  }
}}
            className="px-8 py-4 cursor-pointer rounded-full font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
          >
            Get Your Digital Solution
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreClick}
            className="px-8 py-4 cursor-pointer rounded-full font-bold bg-transparent border-2 border-indigo-500 text-white hover:bg-indigo-900/30 transition-colors"
          >
            Explore Pricing Plans
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-4 flex justify-center"
          variants={fadeIn('up', 'tween', 0.6, 1)}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('team')}
            className="px-8 py-4 cursor-pointer rounded-full font-semibold bg-transparent border-2 border-white/50 text-white hover:border-white hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            Contact Us Directly
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
