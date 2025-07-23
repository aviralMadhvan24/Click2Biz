import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Bundles = ({title}) => {
 const { user } = useAuth();

    const navigate = useNavigate();
    const handleBookNowClick = () => {
    if (user?.role === 'client') {
      navigate('/client-dashboard');
    } else {
    return  window.alert("Oops! You need to log in before booking a bundle. Please log in and try again.");
    }
  };
  const digitalEssentials = [
    {
      id: 'de1',
      name: "Digital Kickstart",
      price: "₹3,000",
      features: [
        "1-page Landing/Mini-site",
        "Google My Business Setup & Optimization",
        "WhatsApp Chat Widget",
        "Basic On-page SEO",
        "2 Social Media Posts"
      ],
      popular: false
    },
    {
      id: 'de2',
      name: "Business Builder",
      price: "₹4,500",
      features: [
        "3-page Website",
        "GMB + Reviews Management",
        "WhatsApp Catalog",
        "Payment Link Integration",
        "3 Social Media Posts + 1 Reel",
        "Google Analytics Setup"
      ],
      popular: true
    }
  ];

  const growthPerformance = [
    {
      id: 'gp1',
      name: "Growth Catalyst",
      price: "₹7,000",
      features: [
        "4-page Premium Site + Blog",
        "Full SEO & Google Search Console Setup",
        "WhatsApp API Integration",
        "6 Social Posts + 1 Reel",
        "Basic Ad-Campaign Setup (up to ₹3,500 ad spend)"
      ],
      popular: false
    },
    {
      id: 'gp2',
      name: "Enterprise Elevate",
      price: "₹8,500",
      features: [
        "5–6-page Custom Site with Booking/E-Commerce",
        "Advanced SEO & Analytics Report",
        "WhatsApp API + Chatbot Flow",
        "8 Social Posts + 2 Reels",
        "Ad-Campaign Management (₹3,500 ad spend included)"
      ],
      popular: true
    }
  ];

  const maintenanceBundles = [
    {
      id: 'm1',
      name: "Essential Maintenance",
      price: "₹1,200/month",
      features: [
        "2 hrs support",
        "2 Posts",
        "1 GMB update",
        "Monthly performance report"
      ],
      popular: false
    },
    {
      id: 'm2',
      name: "Premium Maintenance",
      price: "₹2,200/month",
      features: [
        "4 hrs support",
        "4 Posts + 1 Reel",
        "1 GMB update",
        "Analytics report + recommendations"
      ],
      popular: true
    }
  ];

  const getBundlesByTitle = () => {
    switch(title) {
      case 'Digital':
        return digitalEssentials;
      case 'Social Media':
        return growthPerformance;
      case 'Maintenance':
        return maintenanceBundles;
      default:
        return [...digitalEssentials, ...growthPerformance, ...maintenanceBundles];
    }
  };

  const packages = getBundlesByTitle();

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
          {title === 'Maintenance' ? 'Ongoing Maintenance Plans' : `Affordable ${title} Bundles`}
        </motion.h2>
        
        <div className={`grid ${packages.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8 max-w-5xl mx-auto`}>
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
  onClick={handleBookNowClick}
  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  {title === 'Maintenance' ? 'Subscribe Now' : 'Book Now'}
</motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Bundles;