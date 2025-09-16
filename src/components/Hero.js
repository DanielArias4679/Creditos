import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Search, Star } from 'lucide-react';

const Hero = ({ onOpenConsulta }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);
  }, []);

  return (
    <section 
      id="inicio" 
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDark ? 'bg-blue-400/20' : 'bg-blue-600/10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Star className="w-6 h-6 text-yellow-500" />
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isDark 
                ? 'bg-blue-900/50 text-blue-300 border border-blue-700' 
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              Programa Oficial DGE Mendoza
            </span>
            <Star className="w-6 h-6 text-yellow-500" />
          </motion.div>

          <motion.h1 
            className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Acreditá lo que ya sabés y{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              avanzá más rápido
            </span>
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🚀
            </motion.span>
          </motion.h1>

          <motion.p 
            className={`text-xl md:text-2xl mb-8 leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Podés reconocer saberes de tu secundaria técnica y{' '}
            <span className="font-bold text-green-500">
              acreditar hasta el 40% de la carrera
            </span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button
              onClick={onOpenConsulta}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-6 h-6" />
              Abrir Consulta
              <Rocket className="w-6 h-6" />
            </motion.button>

            <motion.div
              className={`px-6 py-3 rounded-xl border-2 border-dashed ${
                isDark 
                  ? 'border-green-400 bg-green-900/20 text-green-300' 
                  : 'border-green-500 bg-green-50 text-green-700'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-semibold">✨ 100% Gratuito</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {[
              { icon: '🎓', text: 'Reconocimiento oficial', color: 'from-blue-500 to-cyan-500' },
              { icon: '⚡', text: 'Proceso rápido', color: 'from-purple-500 to-pink-500' },
              { icon: '🏆', text: 'Hasta 40% acreditado', color: 'from-orange-500 to-red-500' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  isDark 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/70 border-white/50'
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl mb-3 mx-auto`}>
                  {item.icon}
                </div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;