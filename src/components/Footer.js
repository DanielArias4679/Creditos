import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Shield } from 'lucide-react';

const Footer = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);
  }, []);

  return (
    <footer className={`py-12 border-t ${
      isDark 
        ? 'bg-slate-900 border-slate-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">DGE</span>
              </div>
              <div>
                <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Créditos Académicos
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Mendoza
                </p>
              </div>
            </div>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Programa oficial de la Dirección General de Escuelas de Mendoza para el reconocimiento 
              de saberes técnicos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  creditosacademicos@mendoza.edu.ar
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  www.mendoza.edu.ar
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Legal
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  RESOL-2024-6410-E-GDEMZA-DGE
                </span>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Programa respaldado por normativa oficial de la Provincia de Mendoza
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={`mt-8 pt-8 border-t text-center ${
            isDark ? 'border-slate-700' : 'border-gray-200'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2024 Dirección General de Escuelas - Gobierno de Mendoza. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;