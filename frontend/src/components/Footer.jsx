// src/components/Footer.jsx
import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#bundles" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <FiFacebook />, href: "#" },
    { icon: <FiInstagram />, href: "#" },
    { icon: <FiTwitter />, href: "#" },
    { icon: <FiLinkedin />, href: "#" }
  ];

  return (
    <footer id="footer" className="bg-[#312E81] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Click2Biz</h3>
            <p className="text-gray-400 mb-6">
              Fast, affordable digital solutions for local businesses. Established 2023.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Website Development</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Social Media Management</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Website Maintenance</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">SEO Optimization</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Google Business Setup</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <address className="text-gray-400 not-italic">
              <p className="mb-3">123 Business Avenue</p>
              <p className="mb-3">Mumbai, India 400001</p>
              <p className="mb-3">hello@click2biz.com</p>
              <p>+91 98765 43210</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} Click2Biz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;