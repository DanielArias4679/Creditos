import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, CheckCircle } from 'lucide-react';

const Normativa = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);
  }, []);

  return (
    <section 
      id="normativa" 
      className={`py-20 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
          : 'bg-gradient-to-br from-gray-50 to-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Marco Normativo 📋
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Conocé la base legal que respalda el programa de créditos académicos
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className={`p-8 rounded-3xl border ${
              isDark 
                ? 'bg-slate-800/50 border-slate-700' 
                : 'bg-white/80 border-gray-200'
            } shadow-xl`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  RESOL-2024-6410-E-GDEMZA-DGE
                </h3>
                <p className={`${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Resolución oficial que establece el programa
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className={`text-xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Aspectos Principales:
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Reconocimiento de saberes técnicos previos',
                    'Articulación entre educación secundaria y superior',
                    'Proceso de acreditación hasta 40% de la carrera',
                    'Ingreso diferenciado para estudiantes técnicos',
                    'Continuidad en la misma familia profesional',
                    'Marco legal para institutos superiores'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className={`${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-2xl border ${
                isDark 
                  ? 'bg-slate-700/30 border-slate-600' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <h4 className={`text-lg font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Extracto de la Resolución:
                </h4>
                <p className={`leading-relaxed italic ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  "Apruébese el Programa de reconocimiento de créditos para un sistema educativo flexible, innovador y articulado, que articula las familias, sectores y perfiles profesionales de la Educación Técnico Profesional (ETP) de los niveles Secundario y Superior."
                </p>
              </div>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="\RESOL-2024-6410-E-GDEMZA-DGE.pdf"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  <Download className="w-6 h-6" />
                  Descargar Resolución Completa
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className={`mt-8 p-6 rounded-2xl border-2 border-dashed ${
              isDark 
                ? 'border-yellow-400 bg-yellow-900/20 text-yellow-300' 
                : 'border-yellow-500 bg-yellow-50 text-yellow-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-2xl">⚖️</span>
              <span className="font-bold text-lg">Importante</span>
            </div>
            <p className="text-center">
              Esta resolución garantiza el marco legal y la validez oficial del programa de créditos académicos 
              en toda la provincia de Mendoza
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Normativa;