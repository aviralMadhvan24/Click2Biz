// src/components/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Our Story
          </h2>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 mt-8" />
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mt-8" />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-6 text-[#312E81]">Bridging the Digital Divide</h3>
              <p className="text-gray-600 mb-6">
                Founded in 2023, Click2Biz emerged from a simple observation: while large businesses thrive online, 
                local shops struggle with expensive and complex digital solutions. Our mission is to democratize 
                digital presence for neighborhood businesses.
              </p>
              <p className="text-gray-600 mb-6">
                We combine student talent with industry expertise to deliver affordable, fast-turnaround solutions. 
                By keeping our operations lean and focused, we pass the savings directly to business owners who need 
                it most.
              </p>
              <p className="text-gray-600 mb-8">
                Today, we've helped over 200 local businesses establish their online presence, from family-run 
                eateries to neighborhood service providers. We measure our success by the growth we create for 
                our clients.
              </p>
              <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                <p className="text-indigo-800 font-semibold">
                  "Our vision is a digital economy where every local business has the tools to compete, 
                  connect with customers, and thrive online."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;