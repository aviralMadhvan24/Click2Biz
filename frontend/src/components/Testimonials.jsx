// src/components/Testimonials.jsx
import React from 'react';

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
    <section id="testimonials" className="py-20 bg-gradient-to-br from-[#0F0F0F] via-[#312E81] to-[#FF6B00]  text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 p-8 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16" />
                <div className="ml-4">
                  <h3 className="font-bold text-xl">{testimonial.name}</h3>
                  <p className="text-indigo-200">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;