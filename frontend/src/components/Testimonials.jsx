// src/components/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';

import { fadeIn, staggerContainer } from '../utils/motion';
const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Mehta",
      role: "Restaurant Owner",
      quote: "Our online orders increased by 40% after Click2Biz built our website. Their team delivered in just 5 days!"
    },
    {
      name: "Priya Sharma",
      role: "Boutique Owner",
      quote: "The social media campaigns brought so many new customers to our store. Highly recommended for small businesses!"
    },
    {
      name: "Vikram Patel",
      role: "Auto Repair Shop",
      quote: "Professional website at an unbelievable price. The support team helped me update content myself after delivery."
    }
  ];

   return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900">
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
          What Our <span className="text-indigo-300">Clients Say</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/10"
              variants={fadeIn('up', 'tween', 0.3 + index * 0.1, 1)}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-indigo-400 to-purple-500 w-16 h-16 rounded-full" />
                <div className="ml-4">
                  <h3 className="font-bold text-xl text-white">{testimonial.name}</h3>
                  <p className="text-indigo-300">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-gray-200">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;