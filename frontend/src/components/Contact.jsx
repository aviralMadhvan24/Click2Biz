
import React, { useState } from 'react';
import axios from 'axios';

import { motion } from 'framer-motion';
import { fadeIn ,staggerContainer } from '../utils/motion';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://click2biz-backend.onrender.com/api/contact", formData)
  .then((res) => {
    alert("Thank you! We'll contact you soon.");
    setFormData({
      name: '', email: '', phone: '', businessType: '', message: ''
    });
  })
  .catch((err) => {
    console.error(err);
    alert("Something went wrong.");
  });

    alert('Thank you for your inquiry! We will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      businessType: '',
      message: ''
    });
  };

 
   return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
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
          Get Your <span className="text-indigo-400">Digital Presence</span>
        </motion.h2>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800"
          variants={fadeIn('up', 'tween', 0.3, 1)}
        >
          <div className="md:flex">
            <motion.div 
              className="md:w-1/2 bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-10"
              variants={fadeIn('right', 'tween', 0.4, 1)}
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="mb-8 text-indigo-200">Fill out the form or reach out directly:</p>
              
              <div className="space-y-4">
                {[
                  { icon: 'phone', text: '+91 7452877151' },
                  { icon: 'mail', text: 'click2biz308@gmail.com,   contact@click2biz.com' },
                  
                  { icon: 'map', text: 'Ghaziabad, India' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-indigo-800/30 p-3 rounded-lg mr-4">
                      {item.icon === 'phone' && <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                      {item.icon === 'mail' && <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                      {item.icon === 'map' && <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 p-10"
              variants={fadeIn('left', 'tween', 0.4, 1)}
            >
              <form onSubmit={handleSubmit}>
               <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3  border border-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-white  border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-white  mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="businessType" className="block text-white mb-2">Business Type</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option  value="">Select your business</option>
                    <option value="restaurant">Restaurant/Cafe</option>
                    <option value="retail">Retail Shop</option>
                    <option value="service">Service Provider</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-white mb-2">Your Requirements</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#312E81] text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                >
                  Get Your Quote
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;