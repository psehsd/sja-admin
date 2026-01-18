import React from 'react';
import { motion } from 'framer-motion';
import { MINISTRY_DATA } from '../constants';

const Navigation: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 lg:py-8 pointer-events-none"
    >
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 px-6 py-3 rounded-full bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/5 mx-4 pointer-events-auto transition-all duration-300">
        
        <button
            onClick={() => scrollToSection('home')}
            className="font-bold text-xs md:text-sm tracking-[0.2em] hover:scale-105 transition-all duration-300 uppercase relative group"
        >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700">
                HOME
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
        </button>

        <div className="w-px h-3 bg-gray-400/30 mx-1"></div>

        {MINISTRY_DATA.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="font-bold text-xs md:text-sm tracking-[0.2em] hover:scale-105 transition-all duration-300 uppercase relative group"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700">
                {item.subtitle}
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;