import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

const Portfolio = () => {
  const projects = [
    { type: "Website", title: "Local Restaurant", category: "website", link: "https://preview--vibrant-curry-corner.lovable.app/", image: "/projects/restaurant.png" },
    { type: "Website", title: "Gym", category: "website", link: "https://pulseegym.netlify.app/", image: "/projects/gym.png" },
    { type: "Website", title: "Sweets Shop", category: "website", link: "https://31336281-1504017.renderforestsites.com/", image: "/projects/sweetshop.png" },
    { type: "Social Media", title: "Cafe Promotion", category: "social", image: "/projects/coffee.jpg" },
    { type: "Social Media", title: "Gym", category: "social", image: "/projects/gym-sample.jpg" },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
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
          Our <span className="text-indigo-400">Recent Work</span>
        </motion.h2>

        <div className="mb-16">
          <motion.h3
            className="text-2xl font-semibold mb-8 text-center text-indigo-400"
            variants={fadeIn('up', 'tween', 0.3, 1)}
          >
            Website Designs
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.filter(p => p.category === 'website').map((project, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden border border-gray-800"
                variants={fadeIn('up', 'tween', 0.3 + index * 0.1, 1)}
                whileHover={{ y: -10 }}
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <div className="p-4 bg-gray-900">
                    <p className="text-gray-400">{project.type}</p>
                    <h4 className="text-white font-medium">{project.title}</h4>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <motion.h3
            className="text-2xl font-semibold mb-8 text-center text-indigo-400"
            variants={fadeIn('up', 'tween', 0.4, 1)}
          >
            Social Media Designs
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {projects.filter(p => p.category === 'social').map((project, index) => (
             <motion.div
  key={index}
  className="rounded-xl overflow-hidden border border-gray-800"
  variants={fadeIn('up', 'tween', 0.4 + index * 0.1, 1)}
  whileHover={{ y: -10 }}
>
  <img 
    src={project.image} 
    alt={project.title} 
    className="w-full  h-150 object-cover"
  />
  <div className="p-4 bg-gray-900">
    <p className="text-gray-400">{project.type}</p>
    <h4 className="text-white font-medium">{project.title}</h4>
  </div>
</motion.div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default Portfolio;
