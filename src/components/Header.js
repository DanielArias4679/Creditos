import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, HelpCircle, GraduationCap } from 'lucide-react';

const Header = ({ onOpenConsulta }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);

    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: '¿Cómo funciona?', href: '#como-funciona' },
    { label: 'Preguntas', href: '#faq' },
    { label: 'Normativa', href: '#normativa' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header 
          className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b bg-black ${
            isDark 
              ? 'border-slate-700' 
              : 'border-gray-200'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Créditos 2026
                  </h1>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Mendoza
                  </p>
                </div>
              </motion.div>

              <div className="absolute left-1/2 transform -translate-x-1/2">
                <img src="https://utfs.io/f/2vMRHqOYUHc0q54DwKvUMgOfLW4S62w7etx01aYAN8bRycsz" alt="Logo Central" className="h-12" />
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  onClick={onOpenConsulta}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HelpCircle className="w-6 h-6" />
                </motion.button>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-2 rounded-lg ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {isMenuOpen && (
              <motion.div 
                className={`py-4 border-t ${
                  isDark ? 'border-slate-700' : 'border-gray-200'
                }`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={item.action ? (e) => { e.preventDefault(); item.action(); setIsMenuOpen(false); } : () => setIsMenuOpen(false)}
                    className={`block py-2 font-medium transition-colors hover:text-blue-600 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;