// src/components/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';

import { fadeIn, staggerContainer } from '../utils/motion';
const Testimonials = () => {
  const testimonials = [

  {
    name: "Priya Sharma",
    role: "Boutique Owner",
    quote: "Their social media campaigns brought so many new customers to my store. I've seen a noticeable boost in foot traffic."
  },
  {
    name: "Kunal Verma",
    role: "Gym Owner",
    quote: "Click2Biz built us a stunning website with online membership sign-ups. Our new digital presence has made a huge difference."
  },
  {
    name: "Simran Kaur",
    role: "Bakery Owner",
    quote: "From beautiful product posters to our Google profile setup, everything was handled smoothly. Highly recommend their services."
  },

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
                
                <div className="bg-gradient-to-br from-indigo-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold">
  {testimonial.name.charAt(0)}
</div>
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