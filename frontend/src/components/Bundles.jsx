import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Bundles = ({ title }) => {
  const { user } = useAuth();
  const [selectedSystem, setSelectedSystem] = useState(null);
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    if (user?.role === 'client') {
      navigate('/client-dashboard');
    } else {
      return window.alert("Oops! You need to log in before booking a bundle. Please log in and try again.");
    }
  };

  // Systems data for the modal
  const systems = [
    {
      name: "Digital Foundation System",
      description: "Professional website + brand identity + WhatsApp integration",
      setup: "$8,000",
      monthly: "$2,000"
    },
    {
      name: "Google Visibility System",
      description: "GMB Optimization + local SEO + review management",
      setup: "$4,000",
      monthly: "$2,500"
    },
    {
      name: "Social Authority System",
      description: "Social media setup + 12 posts + 2 reels monthly",
      setup: "$3,000",
      monthly: "$3,500"
    },
    {
      name: "Local Magnet System",
      description: "Google Ads + landing pages + lead tracking",
      setup: "$5,000",
      monthly: "$4,000"
    }
  ];

  // Updated packages data (removed Value Tier)
  const packages = [
    {
      id: 'b1',
      name: "Foundation Bundle",
      price: "₹7,000",
      monthly: "₹2,500",
      features: [
        "Digital Foundation System",
        "Google Visibility System"
      ],
      popular: false
    },
    {
      id: 'b2',
      name: "Authority Dominator",
      price: "₹10,000",
      monthly: "₹4,500",
      features: [
        "Digital Foundation System",
        "Google Visibility System",
        "Social Authority System"
      ],
      popular: true
    },
    {
      id: 'b3',
      name: "Market Conqueror",
      price: "₹15,000",
      monthly: "₹7,000",
      features: [
        "All 4 systems"
      ],
      popular: false
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
          Our Comprehensive Packages
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div 
              key={pkg.id} 
              className={`border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl p-8 shadow-2xl transform transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular ? "ring-2 ring-indigo-500 relative z-10" : ""
              }`}
              variants={fadeIn('up', 'tween', 0.3 + index * 0.1, 1)}
              whileHover={{ scale: 1.03 }}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4 text-white">{pkg.name}</h3>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="text-3xl font-bold text-indigo-400">Monthly: {pkg.monthly}</div>
                <div className="text-xl text-gray-400">Setup: {pkg.price}</div>
              </div>
              
              <ul className="mb-8 space-y-3 min-h-[120px]">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col space-y-3">
                <motion.button 
                  onClick={handleBookNowClick}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Now
                </motion.button>
                <button 
                  onClick={() => setSelectedSystem(pkg)}
                  className="w-full text-indigo-400 py-2 rounded-lg font-medium hover:text-indigo-300 transition-colors text-lg"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Learn More Modal */}
      {selectedSystem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-900 rounded-xl p-8 max-w-2xl w-full border border-gray-800 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button 
              onClick={() => setSelectedSystem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-6">{selectedSystem.name}</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-400 mb-2">Features:</h4>
              <ul className="space-y-2">
                {selectedSystem.features.map((feature, i) => (
                  <li key={i} className="text-gray-300 text-lg">{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-indigo-400 mb-2">Setup Cost</h4>
                <p className="text-gray-300 text-xl">{selectedSystem.price}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-indigo-400 mb-2">Monthly Cost</h4>
                <p className="text-gray-300 text-xl">{selectedSystem.monthly}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-indigo-400 mb-2">Included Systems:</h4>
              <div className="space-y-4">
                {systems.filter(sys => 
                  selectedSystem.features.some(feat => 
                    feat.includes(sys.name) || 
                    feat === "All 4 systems"
                  )
                ).map((system, i) => (
                  <div key={i} className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-bold text-white text-lg">{system.name}</h5>
                    <p className="text-gray-400">{system.description}</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-gray-300">Setup: {system.mon}</span>
                      <span className="text-gray-300">Monthly: {system.monthly}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Bundles;