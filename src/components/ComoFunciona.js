import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight, CheckCircle2, Star } from 'lucide-react';

const ComoFunciona = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);
  }, []);

  const pasos = [
    {
      numero: '01',
      titulo: 'Inscripción',
      descripcion: 'Te inscribís en el IES que ofrece la tecnicatura que querés estudiar',
      icono: '📝',
      color: 'from-blue-500 to-cyan-500',
      neonShadow: '0_0_8px_rgba(0,255,255,0.7)', // Celeste
      borderColor: '#00FFFF' // Color para Framer Motion
    },
    {
      numero: '02',
      titulo: 'Ingreso D',
      descripcion: 'Reemplaza el curso de nivelación tradicional con un proceso específico para técnicos',
      icono: '🎯',
      color: 'from-purple-500 to-pink-500',
      neonShadow: '0_0_8px_rgba(255,0,255,0.7)', // Fucsia
      borderColor: '#FF00FF' // Color para Framer Motion
    },
    {
      numero: '03',
      titulo: 'Instancia RS',
      descripcion: 'Demostrás tus conocimientos técnicos en una evaluación personalizada',
      icono: '💬',
      color: 'from-orange-500 to-red-500',
      neonShadow: '0_0_8px_rgba(255,165,0,0.7)', // Naranja
      borderColor: '#FFA500' // Color para Framer Motion
    },
    {
      numero: '04',
      titulo: 'Inicio',
      descripcion: 'Presentá toda la documentación necesaria, incluido el Analítico del Secundario.',
      icono: '📄',
      color: 'from-green-500 to-emerald-500',
      neonShadow: '0_0_8px_rgba(0,255,0,0.7)', // Verde
      borderColor: '#00FF00' // Color para Framer Motion
    }
  ];

  const resultados = [
    {
      tipo: 'Acreditación plena',
      descripcion: 'Acceso directo a 2º año',
      icono: '🏆',
      color: 'from-green-500 to-emerald-500'
    },
    {
      tipo: 'Acreditación parcial',
      descripcion: 'Reconocimiento de espacios de 1º año → menos cursado',
      icono: '⭐',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      tipo: 'No acreditar',
      descripcion: 'Cursás 1º año completo, mejor preparado',
      icono: '📚',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <section 
      id="como-funciona" 
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
            ¿Cómo funciona? 🤔
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Un proceso simple y transparente para reconocer tus conocimientos técnicos
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {pasos.map((paso, index) => (
              <motion.div
                key={index}
                className={`relative p-8 rounded-3xl backdrop-blur-sm border-2 ${
                  isDark 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/80 border-gray-200/50'
                } shadow-xl`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10, 
                  boxShadow: paso.neonShadow,
                  borderColor: paso.borderColor
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${paso.color} bg-clip-text text-transparent`}>
                    {paso.numero}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${paso.color} flex items-center justify-center text-xl`}>
                    {paso.icono}
                  </div>
                </div>
                
                <h3 className={`text-base font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {paso.titulo}
                </h3>
                
                <p className={`text-xs leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {paso.descripcion}
                </p>

                {index < pasos.length - 1 && (
                  <motion.div 
                    className="hidden md:block absolute -right-10 top-1/2 transform -translate-y-1/2"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: index * 0.3 }}
                  >
                    <ArrowRight className={`w-10 h-10 ${
                      isDark 
                        ? 'text-gray-600' 
                        : 'text-gray-400'
                    } bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Posibles Resultados 📊
            </h3>
            <p className={`text-lg ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Todos los caminos te llevan al éxito académico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resultados.map((resultado, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl backdrop-blur-sm border ${
                  isDark 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-white/70 border-gray-200/50'
                } shadow-lg`}
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${resultado.color} flex items-center justify-center text-2xl mb-4`}>
                  {resultado.icono}
                </div>
                <h4 className={`font-bold text-lg mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {resultado.tipo}
                </h4>
                <p className={`${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {resultado.descripcion}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={`mt-12 p-6 rounded-2xl border-2 border-dashed ${
              isDark 
                ? 'border-blue-400 bg-blue-900/20' 
                : 'border-blue-500 bg-blue-50'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className={`font-bold text-lg ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}>
                Nota Importante
              </span>
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <p className={`text-center ${
              isDark ? 'text-blue-200' : 'text-blue-600'
            }`}>
              La continuidad debe ser dentro de la misma familia profesional para garantizar la articulación adecuada
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComoFunciona;