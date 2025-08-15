import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddOns = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddOnClick = () => {
    if (user?.role === 'client') {
      navigate('/client-dashboard');
    } else {
      return window.alert("Oops! You need to log in before adding services. Please log in and try again.");
    }
  };

  const addOns = [
    {
      id: 'ao1',
      name: "WhatsApp Widget Installation",
      description: "Click-to-chat button on your website for instant leads",
      price: "₹299"
    },
    {
      id: 'ao2',
      name: "WhatsApp Catalogue Setup",
      description: "Product/service showcase inside your WhatsApp Business app",
      price: "₹699"
    },
    {
      id: 'ao3',
      name: "WhatsApp API Setup",
      description: "Official API integration for auto messages, order updates etc.",
      price: "₹1999"
    },
    {
      id: 'ao4',
      name: "Basic WhatsApp Chatbot (5 Q&A)",
      description: "Automated chatbot to handle FAQs or bookings on WhatsApp",
      price: "₹3499"
    },
    {
      id: 'ao5',
      name: "Google Business Profile Setup",
      description: "Claim + Optimize your Google Map listing",
      price: "₹999"
    },
    {
      id: 'ao6',
      name: "1 Custom Poster Design",
      description: "Professionally designed social media graphic",
      price: "₹249"
    },
    {
      id: 'ao7',
      name: "Reel Video Edit (30-60 sec)",
      description: "Instagram reel/video edit with captions & transitions",
      price: "₹399"
    },
    {
      id: 'ao8',
      name: "Basic Social Media Audit Report",
      description: "Review of your Instagram / Facebook page with improvement tips",
      price: "₹699"
    },
    {
      id: 'ao9',
      name: "Premium Logo Design (3 Options)",
      description: "3 logo concepts + 1 revision + source files",
      price: "₹1799"
    },
    {
      id: 'ao10',
      name: "SEO Audit Report (1 Website)",
      description: "SEO health check + keyword suggestions",
      price: "₹1299"
    },
    {
      id: 'ao11',
      name: "Basic Google Ads Campaign Setup",
      description: "₹3000 ad spend included. Campaign setup and management",
      price: "₹3499"
    }
  ];

  return (
    <section id="addons" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
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
          No Package? No Problem! Quick Add-On Services
        </motion.h2>
        
        <motion.p
          className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto"
          variants={fadeIn('up', 'tween', 0.3, 1)}
        >
          Enhance your existing package or get quick fixes with these à la carte services
        </motion.p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {addOns.map((addon, index) => (
            <motion.div 
              key={addon.id} 
              className="border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl p-6 shadow-xl transform transition-all duration-300 hover:-translate-y-2"
              variants={fadeIn('up', 'tween', 0.3 + index * 0.05, 1)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-white">{addon.name}</h3>
                  <p className="text-gray-300 mb-4">{addon.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="text-3xl font-bold text-indigo-400 mb-4">{addon.price}</div>
                  <motion.button 
                    onClick={handleAddOnClick}
                    className="cursor-pointer  w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to My Plan
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16 text-gray-300"
          variants={fadeIn('up', 'tween', 0.5, 1)}
        >
          <p className="text-lg mb-4">Need multiple add-ons? Bundle them for discounts!</p>
          <motion.button
            onClick={handleAddOnClick}
            className="cursor-pointer bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Custom Bundle
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AddOns;