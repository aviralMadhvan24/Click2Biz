import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
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
      setup: "₹8,000",
      monthly: "₹2,000",
      icon: "🌐"
    },
    {
      name: "Google Visibility System",
      description: "GMB Optimization + local SEO + review management",
      setup: "₹4,000",
      monthly: "₹2,500",
      icon: "🔍"
    },
    {
      name: "Social Authority System",
      description: "Social media setup + 12 posts + 2 reels monthly",
      setup: "₹3,000",
      monthly: "₹3,500",
      icon: "📱"
    },
    {
      name: "Local Magnet System",
      description: "Google Ads + landing pages + lead tracking",
      setup: "₹5,000",
      monthly: "₹4,000",
      icon: "🧲"
    }
  ];

  const packages = [
    {
      id: 'b1',
      name: "Market Conqueror",
      price: "₹14,999",
      originalPrice: "19,999",
      monthly: "₹7,999",
      savings: "Save ₹5,000",
      features: [
        "Digital Foundation System",
        "Google Visibility System",
        "Social Authority System",
        "Local Magnet System"
      ],
      popular: false,
      tag: "PREMIUM PICK",
      best: true
    },
    {
      id: 'b2',
      name: "Authority Dominator",
      price: "₹7,999",
      originalPrice: "₹11,999",
      monthly: "₹3,999",
      savings: "Save ₹5,000",
      features: [
        "Digital Foundation System",
        "Google Visibility System",
        "Social Authority System"
      ],
      popular: true,
      tag: "BEST VALUE"
    },
    {
      id: 'b3',
      name: "Foundation Bundle",
      price: "₹2,999",
      originalPrice: "₹5,999",
      monthly: "₹2,499",
      savings: "Save ₹2,000",
      features: [
        "Digital Foundation System",
        "Google Visibility System"
      ],
      popular: false,
      tag: "Starter Pack"
    },
  ];

  return (
    <section id="bundles" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-40 h-40 bg-indigo-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-600 rounded-full filter blur-3xl"></div>
      </div>
      
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div 
          className="text-center mb-4"
          variants={fadeIn('up', 'tween', 0.1, 1)}
        >
          <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 select-none">
            LIMITED TIME OFFERS
          </span>
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold text-center mb-6 text-white tracking-tight"
          variants={fadeIn('up', 'tween', 0.2, 1)}
        >
          Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Online Presence</span>
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16"
          variants={fadeIn('up', 'tween', 0.3, 1)}
        >
          Choose the perfect package to boost your digital growth. All plans include dedicated support and monthly performance reports.
        </motion.p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div 
              key={pkg.id} 
              className={`relative border-2 rounded-xl p-8 shadow-2xl transform transition-all duration-300 hover:-translate-y-2 ${
                pkg.best ? "border-yellow-400 bg-gradient-to-b from-gray-900 to-gray-950" : "border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950"
              } ${pkg.popular ? "ring-2 ring-indigo-500" : ""}`}
              variants={fadeIn('up', 'tween', 0.3 + index * 0.1, 1)}
              whileHover={{ scale: 1.03 }}
            >
              {/* Ribbon for popular packages */}
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center space-x-2 select-none" aria-label="Popular package badge">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-sm tracking-wide">POPULAR</span>
                </div>
              )}
              
              {/* Best package badge */}
              {pkg.best && (
                <div className="absolute top-0 right-4 transform translate-y-5 rotate-12 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg select-none" aria-label="Best overall package badge">
                  BEST OVERALL
                </div>
              )}
              
              {/* For other packages, show tag label */}
              {!pkg.popular && !pkg.best && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-indigo-400 px-4 py-1 rounded-full text-sm font-medium select-none" aria-label="Package tag">
                  {pkg.tag}
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4 text-white text-center">{pkg.name}</h3>
              
           <div className="bg-gray-800/50 p-4 rounded-lg mb-6 border border-gray-700">
  <div className="flex justify-between items-end mb-2">
    <div>
      <div className="text-sm text-gray-400">Monthly</div>
      <div className="text-3xl font-bold text-indigo-400">{pkg.monthly}</div>
    </div>
    <div className="text-right">
      <div className="text-sm text-gray-400">Setup Fee</div>
      <div className="text-xl font-bold text-white">
        {pkg.price}
      </div>
      <div className="text-gray-500 line-through text-sm">
        {pkg.originalPrice}
      </div>
    </div>
  </div>
  <div className="text-green-400 text-sm font-medium text-center bg-green-900/30 py-1 rounded select-none">
    {pkg.savings} • Limited spots available!
  </div>
</div>

              
              <ul className="mb-8 space-y-3 min-h-[120px] border-b border-gray-800 pb-6">
                {pkg.features.map((feature, i) => {
                  const system = systems.find(s => feature.includes(s.name));
                  return (
                    <li key={i} className="flex items-start text-gray-300 group">
                      <span className="mr-3 text-lg opacity-80 group-hover:opacity-100 transition-opacity select-none">
                        {system?.icon || '✓'}
                      </span>
                      <span className="text-lg group-hover:text-indigo-300 transition-colors select-none">
                        {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>
              
              <div className="flex flex-col space-y-3">
                <motion.button 
                  onClick={handleBookNowClick}
                  className={`cursor-pointer w-full py-4 rounded-lg font-bold text-lg transition-all select-none ${
                    pkg.best
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50'
                      : pkg.popular 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Book ${pkg.name} package`}
                >
                  {pkg.best ? 'Get Premium Package' : pkg.popular ? 'Get Started Today' : 'Book Now'}
                </motion.button>
                <button 
                  onClick={() => setSelectedSystem(pkg)}
                  className="cursor-pointer w-full text-indigo-400 py-2 rounded-lg font-medium hover:text-indigo-300 transition-colors text-lg flex items-center justify-center select-none"
                  aria-label={`See details of ${pkg.name} package`}
                >
                  See details
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-800/50 rounded-xl p-6 text-center select-none"
          variants={fadeIn('up', 'tween', 0.5, 1)}
        >
          <h4 className="text-xl font-bold text-white mb-2">Not sure which package is right for you?</h4>
          <p className="text-gray-300 mb-7">Our experts will analyze your business and recommend the perfect solution.</p>
          <a 
          href="https://wa.me/917452877151?text=Hi%20there!%20I%20would%20like%20to%20know%20more%20about%20your%20sales%20offer."
  target="_blank"
  rel="noopener noreferrer"
            className="bg-white text-gray-900 px-6 py-3 rounded-lg mb-8 font-bold hover:bg-gray-100 transition-colors"
            aria-label="Get free consultation"
          >
            Get Free Consultation
          </a>
        </motion.div>
      </motion.div>

      {/* Learn More Modal */}
      {selectedSystem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <motion.div 
            className="bg-gray-900 rounded-xl p-8 w-full max-w-2xl mx-4 border border-gray-800 relative my-8 focus:outline-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 25 }}
            style={{ maxHeight: '90vh' }}
            tabIndex={-1}
          >
            <button 
              onClick={() => setSelectedSystem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              aria-label="Close package details modal"
              type="button"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="overflow-y-auto pr-2" style={{ maxHeight: 'calc(90vh - 4rem)' }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 id="modal-title" className="text-2xl font-bold text-white">{selectedSystem.name}</h3>
                  <p className="text-indigo-400">{selectedSystem.tag}</p>
                </div>
                <div className={`${selectedSystem.best ? 'bg-yellow-500/20' : 'bg-indigo-900/50'} px-4 py-2 rounded-full select-none`}>
                  <span className={`${selectedSystem.best ? 'text-yellow-400' : 'text-white'} font-bold`}>
                    {selectedSystem.savings || ''}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div>
                  <h4 className="text-lg font-semibold text-indigo-400 mb-2">Setup Cost</h4>
                  <div className="flex items-end">
                    <span className="text-gray-300 text-3xl font-bold">{selectedSystem.price || '-'}</span>
                    {selectedSystem.originalPrice && (
                      <span className="text-gray-500 line-through text-xl ml-2 mb-1">{selectedSystem.originalPrice}</span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-indigo-400 mb-2">Monthly Cost</h4>
                  <div className="flex items-end">
                    <span className="text-gray-300 text-3xl font-bold">{selectedSystem.monthly || '-'}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4 border-b border-gray-800 pb-2">What's Included:</h4>
                <ul className="space-y-4" role="list">
                  {selectedSystem.features?.map((feature, i) => {
                    const system = systems.find(sys => feature.includes(sys.name));
                    return (
                      <li key={i} className="flex items-start bg-gray-800/30 p-4 rounded-lg border border-gray-700/50 hover:border-indigo-500/50 transition-colors" role="listitem">
                        <span className="text-2xl mr-4 mt-1 select-none">{system?.icon || '✓'}</span>
                        <div>
                          <h5 className="font-bold text-white text-lg">{system?.name || feature}</h5>
                          <p className="text-gray-400">{system?.description || "Comprehensive digital solution"}</p>
                          <div className="flex justify-between mt-3 text-sm">
                            <span className="text-gray-300 bg-gray-700 px-2 py-1 rounded select-none">Setup: {system?.setup || "Included"}</span>
                            <span className="text-gray-300 bg-gray-700 px-2 py-1 rounded select-none">Monthly: {system?.monthly || "Included"}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              <div className={`${selectedSystem.best ? 'bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 border-yellow-700/50' : 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-800/50'} p-6 rounded-xl border select-none`}>
                <h4 className="text-xl font-semibold text-white mb-4">Ready to get started?</h4>
                <p className="text-gray-300 mb-6">Join {selectedSystem.popular ? "hundreds of businesses" : "our satisfied clients"} who've transformed their online presence with this package.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    onClick={handleBookNowClick}
                    className={`cursor-pointer flex-1 py-4 rounded-lg font-bold select-none ${
                      selectedSystem.best
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Book ${selectedSystem.name} package now for ${selectedSystem.price} setup`}
                  >
                    {selectedSystem.best ? 'Get Premium Package Now' : 'Book Now'} - {selectedSystem.price} Setup
                  </motion.button>
  
 <Link
    to="/packages"
    className="cursor-pointer flex-1 py-4 rounded-lg font-bold select-none bg-indigo-600 hover:bg-indigo-700 text-white transition text-center"
  >
    Full Feature Breakdown
  </Link>


                </div>
                <p className="text-gray-400 text-sm mt-4 text-center select-none">Limited availability - Only 3 spots left this month</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Bundles;
