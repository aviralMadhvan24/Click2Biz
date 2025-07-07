// src/components/WhatsAppButton.jsx
import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/919876543210" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg z-50 hover:bg-green-600 transition-colors animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <FiMessageSquare className="h-8 w-8" />
    </a>
  );
};

export default WhatsAppButton;