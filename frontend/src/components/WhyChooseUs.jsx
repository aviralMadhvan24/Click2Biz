import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { FiDollarSign, FiClock, FiUsers, FiHelpCircle, FiMessageSquare } from 'react-icons/fi';
const WhyChooseUs = () => {
  const features = [
    {
      icon: <FiDollarSign className="h-8 w-8" />,
      title: "Affordable Pricing",
      description: "Quality solutions at prices small businesses can afford"
    },
    {
      icon: <FiClock className="h-8 w-8" />,
      title: "7-Day Delivery",
      description: "Get your digital presence up and running in just one week"
    },
    {
      icon: <FiUsers className="h-8 w-8" />,
      title: "Student-Powered",
      description: "Young talent supervised by industry experts"
    },
    {
      icon: <FiHelpCircle className="h-8 w-8" />,
      title: "Free GMB Setup",
      description: "Google My Business profile setup with every website"
    },
    {
      icon: <FiMessageSquare className="h-8 w-8" />,
      title: "24/7 WhatsApp Support",
      description: "Instant help whenever you need it"
    }
  ];

 return (
    <section id="why-us" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Why Choose Click2Biz?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 border border-gray-700"
            >
              <div className="text-indigo-400 mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
};

export default WhyChooseUs;