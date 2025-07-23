import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import { FaLinkedin } from 'react-icons/fa';

const Team = () => {
  const handlePhoneClick = (phone) => {
  if (navigator.userAgent.match(/(iPhone|Android)/i)) {
    window.location.href = `tel:${phone}`;
  } else {
    navigator.clipboard.writeText(phone);
    alert(`Phone number ${phone} copied to clipboard!`);
  }
};

  const members = [
    {
      name: 'Aviral Madhvan',
      role: 'Founder & Technical Head',
      image: '/team/aviral2.jpg',
      linkedin: 'https://www.linkedin.com/in/aviral-madhvan-801481218/',
      phone: '+91-7452877151'
    },
    {
      name: 'Swastik Gupta',
      role: 'Business Lead',
      image: '/team/swastik.png',
      linkedin: 'https://www.linkedin.com/in/swastikg/',
      phone: '+91-9305525331'
    },
    {
      name: 'Nishant Tripathi',
      role: 'Social Media & Community Manager',
      image: '/team/nishant.png',
      linkedin: 'https://www.linkedin.com/in/nishant-tripathi-206560250/',
      phone: '+91-9369215072'
    },
    {
      name: 'Shivansh Shrivastav',
      role: 'Technical Support Executive',
      image: '/team/shivansh.png',
      linkedin: 'https://www.linkedin.com/in/shivansh-srivastava-621897323/',
      phone: '+91-9569596849'
    },
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
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
          Meet the <span className="text-indigo-400">Team</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 flex flex-col items-center"
              variants={fadeIn('up', 'tween', 0.3 + index * 0.1, 1)}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-gray-400 mb-4">{member.role}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 flex items-center mb-2"
              >
                <FaLinkedin className="mr-2" /> LinkedIn Profile
              </a>
              <button
  onClick={() => handlePhoneClick(member.phone)}
  className="text-indigo-300 hover:text-indigo-200 underline text-sm"
>
  📞 {member.phone}
</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Team;
