import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);
  }, []);

  const faqs = [
    {
      pregunta: '¿Qué requisitos necesito para aplicar?',
      respuesta: 'Necesitás tener el título de técnico secundario de una escuela técnica oficial y estar inscripto en un IES que ofrezca una tecnicatura de la misma familia profesional.'
    },
    {
      pregunta: '¿Qué documentos debo presentar?',
      respuesta: 'Título secundario técnico, certificado analítico, DNI, y cualquier documentación adicional que solicite el IES específico donde te inscribas.'
    },
    {
      pregunta: '¿Realmente puedo acreditar hasta el 40% de la carrera?',
      respuesta: 'Sí, dependiendo de la articulación entre tu orientación técnica y la tecnicatura superior elegida, podés acreditar hasta el 40% de los espacios curriculares.'
    },
    {
      pregunta: '¿Qué es el "Ingreso diferenciado"?',
      respuesta: 'Es un proceso específico para estudiantes técnicos que reemplaza el curso de nivelación tradicional, reconociendo tus conocimientos previos y adaptándose a tu formación técnica.'
    },
    {
      pregunta: '¿Qué son las familias profesionales reconocidas?',
      respuesta: 'Son agrupaciones de orientaciones técnicas relacionadas. Por ejemplo: Construcciones, Electrónica, Informática, Electromecánica, Química, etc. La continuidad debe ser dentro de la misma familia.'
    },
    {
      pregunta: '¿Qué pasa si no acredito ningún espacio?',
      respuesta: 'No hay problema. Cursarás 1º año completo pero con una mejor preparación gracias al proceso de ingreso diferenciado, lo que te dará ventajas para el cursado.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className={`py-20 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-white to-gray-50'
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
            Preguntas Frecuentes 🤔
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Resolvé todas tus dudas sobre el programa de créditos académicos
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`mb-4 rounded-2xl border ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white/80 border-gray-200'
              } shadow-lg overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className={`w-full p-6 text-left flex items-center justify-between transition-colors ${
                  isDark 
                    ? 'hover:bg-slate-700/50' 
                    : 'hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className={`text-lg font-semibold pr-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {faq.pregunta}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    openIndex === index 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : isDark 
                        ? 'bg-slate-700 text-gray-400' 
                        : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`px-6 pb-6 border-t ${
                      isDark ? 'border-slate-700' : 'border-gray-200'
                    }`}>
                      <motion.p
                        className={`pt-4 leading-relaxed ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {faq.respuesta}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-dashed ${
            isDark 
              ? 'border-blue-400 bg-blue-900/20 text-blue-300' 
              : 'border-blue-500 bg-blue-50 text-blue-700'
          }`}>
            <span className="text-2xl">💡</span>
            <span className="font-semibold">
              ¿Tenés más preguntas? Consultá directamente en tu escuela técnica o en el IES de tu interés
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;