import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MapPin, Globe, ArrowRight, CheckCircle, ArrowLeft,
  // Iconos que usa el JSON:
  Pickaxe, Hammer, Bolt, Sun, HeartPulse, Wine, Bot, Brain, Code, Shield, Cpu, Star
} from 'lucide-react';
import articulacionesDataRaw from '../data/articulaciones.json';

const ConsultaModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [selectedEscuela, setSelectedEscuela] = useState('');
  const [selectedOrientacion, setSelectedOrientacion] = useState('');
  const [resultados, setResultados] = useState([]); // array de coincidencias
  const [isDark, setIsDark] = useState(false);

  // Normalizar/filtrar datos por si llegan con "N/D" o vacío
  const clean = (v) => (v && String(v).trim() !== '' && v !== 'N/D') ? String(v).trim() : null;

  const data = useMemo(() => {
    // Convertir a una forma segura
    return (articulacionesDataRaw || []).map((r) => ({
      region: clean(r.region),
      departamento: clean(r.departamento),
      escuela: clean(r.escuela),
      orientacion: clean(r.orientacion),
      resultado: {
        ies: clean(r?.resultado?.ies),
        tecnicatura: clean(r?.resultado?.tecnicatura),
        direccion: r?.resultado?.direccion ? String(r.resultado.direccion).trim() : '',
        web: r?.resultado?.web ? String(r.resultado.web).trim() : '',
        color: r?.resultado?.color || 'text-blue-500',
        neon: r?.resultado?.neon || 'hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]',
        icono: r?.resultado?.icono || 'Star'
      }
    })).filter(r =>
      r.region && r.departamento && r.escuela && r.orientacion && r.resultado.ies && r.resultado.tecnicatura
    );
  }, []);

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);
  }, []);

  const uniq = (arr) => [...new Set(arr)].filter(Boolean);

  const regiones = useMemo(
    () => uniq(data.map(i => i.region)),
    [data]
  );

  const departamentosFiltrados = useMemo(
    () => uniq(data.filter(i => i.region === selectedRegion).map(i => i.departamento)),
    [data, selectedRegion]
  );

  const escuelasFiltradas = useMemo(
    () => uniq(data
      .filter(i => i.region === selectedRegion && i.departamento === selectedDepartamento)
      .map(i => i.escuela)),
    [data, selectedRegion, selectedDepartamento]
  );

  const orientacionesFiltradas = useMemo(
    () => uniq(data
      .filter(i =>
        i.region === selectedRegion &&
        i.departamento === selectedDepartamento &&
        i.escuela === selectedEscuela
      )
      .map(i => i.orientacion)),
    [data, selectedRegion, selectedDepartamento, selectedEscuela]
  );

  const resetModal = () => {
    setStep(0);
    setSelectedRegion('');
    setSelectedDepartamento('');
    setSelectedEscuela('');
    setSelectedOrientacion('');
    setResultados([]);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleBack = () => {
    if (step > 0) {
      const next = step - 1;
      setStep(next);
      if (next < 4) setResultados([]);
      if (next < 3) setSelectedOrientacion('');
      if (next < 2) setSelectedEscuela('');
      if (next < 1) setSelectedDepartamento('');
      if (next < 0) setSelectedRegion('');
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedDepartamento('');
    setSelectedEscuela('');
    setSelectedOrientacion('');
    setResultados([]);
    setStep(1);
  };

  const handleDepartamentoSelect = (depto) => {
    setSelectedDepartamento(depto);
    setSelectedEscuela('');
    setSelectedOrientacion('');
    setResultados([]);
    setStep(2);
  };

  const handleEscuelaSelect = (escuela) => {
    setSelectedEscuela(escuela);
    setSelectedOrientacion('');
    setResultados([]);
    setStep(3);
  };

  const handleOrientacionSelect = (orientacion) => {
    setSelectedOrientacion(orientacion);
    // Buscar TODAS las coincidencias para ese filtro (por si hay más de un IES/tec)
    const matches = data.filter(
      item =>
        item.region === selectedRegion &&
        item.departamento === selectedDepartamento &&
        item.escuela === selectedEscuela &&
        item.orientacion === orientacion
    );
    setResultados(matches);
    setStep(4);
  };

  // Mapear icono del JSON a componente de lucide-react
  const iconMap = {
    Pickaxe, Hammer, Bolt, Sun, HeartPulse, Wine, Bot, Brain, Code, Shield, Cpu, Star
  };
  const getIconComponent = (iconName) => iconMap[iconName] || Star;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        <motion.div
          className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
            isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'
          }`}
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-gray-200 dark:border-slate-700 rounded-t-3xl">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Consulta 🔍</h2>
            <button
              onClick={handleClose}
              className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Steps */}
          <div className="p-6">
            <div className="flex items-center justify-center mb-8">
              {[0,1,2,3,4].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= num ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : isDark ? 'bg-slate-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > num ? <CheckCircle className="w-5 h-5" /> : num}
                  </div>
                  {num < 4 && (
                    <div className={`w-12 h-1 mx-2 rounded ${
                      step > num ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : isDark ? 'bg-slate-700' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                  <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Seleccioná tu Región 🗺️</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {regiones.map((region) => (
                      <motion.button
                        key={region}
                        onClick={() => handleRegionSelect(region)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-800 hover:bg-slate-700 text-white'
                                 : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50 text-gray-900'
                        }`}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{region}</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                  <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Seleccioná tu Departamento 📍</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {departamentosFiltrados.map((depto) => (
                      <motion.button
                        key={depto}
                        onClick={() => handleDepartamentoSelect(depto)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-800 hover:bg-slate-700 text-white'
                                 : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50 text-gray-900'
                        }`}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{depto}</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                  <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Seleccioná tu Escuela Técnica 🏫</h3>
                  <div className="space-y-3">
                    {escuelasFiltradas.map((escuela) => (
                      <motion.button
                        key={escuela}
                        onClick={() => handleEscuelaSelect(escuela)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-800 hover:bg-slate-700 text-white'
                                 : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50 text-gray-900'
                        }`}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{escuela}</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                  <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Seleccioná tu Orientación 🎓</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {orientacionesFiltradas.map((orientacion) => (
                      <motion.button
                        key={orientacion}
                        onClick={() => handleOrientacionSelect(orientacion)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          isDark ? 'border-slate-600 hover:border-blue-500 bg-slate-800 hover:bg-slate-700 text-white'
                                 : 'border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50 text-gray-900'
                        }`}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{orientacion}</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center">
                  {/* Múltiples resultados */}
                  {Array.isArray(resultados) && resultados.length > 1 && (
                    <div>
                      <motion.div className="mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-4xl">🎉</span>
                        </div>
                        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>¡Tus estudios ya cuentan!</h3>
                        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Con el título de <span className="font-bold text-blue-600">{selectedOrientacion}</span> podés continuar en:
                        </p>
                      </motion.div>

                      <div className="space-y-4">
                        {resultados.map((r, idx) => {
                          const Icon = getIconComponent(r.resultado.icono);
                          return (
                            <motion.div
                              key={idx}
                              className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + idx * 0.08 }}
                            >
                              <h4 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.resultado.ies}</h4>

                              <div className="flex items-center justify-center gap-2 mb-3">
                                <Icon className={`w-5 h-5 ${r.resultado.color}`} />
                                <span className={`font-semibold text-lg ${r.resultado.color} transition-all duration-300 ${r.resultado.neon}`}>
                                  {r.resultado.tecnicatura}
                                </span>
                              </div>

                              <div className="flex items-center justify-center gap-3 mb-6">
                                <MapPin className="w-5 h-5 text-blue-600" />
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{r.resultado.direccion}</span>
                                {r.resultado.web && (
                                  <motion.a
                                    href={r.resultado.web}
                                    target="_blank" rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold transition-all ${r.resultado.color.replace('text-', 'bg-')} text-white`}
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                  >
                                    <Globe className="w-4 h-4" /> IES
                                  </motion.a>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Único resultado */}
                  {Array.isArray(resultados) && resultados.length === 1 && (() => {
                    const r = resultados[0];
                    const Icon = getIconComponent(r.resultado.icono);
                    return (
                      <div>
                        <motion.div className="mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">🎉</span>
                          </div>
                          <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>¡Tus estudios ya cuentan!</h3>
                          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Con el título de <span className="font-bold text-blue-600">{selectedOrientacion}</span> podés continuar en:
                          </p>
                        </motion.div>

                        <motion.div
                          className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'}`}
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        >
                          <h4 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.resultado.ies}</h4>

                          <div className="flex items-center justify-center gap-2 mb-3">
                            <Icon className={`w-5 h-5 ${r.resultado.color}`} />
                            <span className={`font-semibold text-lg ${r.resultado.color} transition-all duration-300 ${r.resultado.neon}`}>
                              {r.resultado.tecnicatura}
                            </span>
                          </div>

                          <div className="flex items-center justify-center gap-3 mb-6">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{r.resultado.direccion}</span>
                            {r.resultado.web && (
                              <motion.a
                                href={r.resultado.web} target="_blank" rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold transition-all ${r.resultado.color.replace('text-', 'bg-')} text-white`}
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                              >
                                <Globe className="w-4 h-4" /> IES
                              </motion.a>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })()}

                  {/* Sin resultados */}
                  {Array.isArray(resultados) && resultados.length === 0 && (
                    <div>
                      <motion.div className="mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-4xl">⏳</span>
                        </div>
                        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Próximamente disponible</h3>
                        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          La articulación para <span className="font-bold text-orange-600">{selectedOrientacion}</span> estará disponible pronto.
                        </p>
                      </motion.div>
                      <motion.p className={`text-lg font-semibold ${isDark ? 'text-orange-300' : 'text-orange-600'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                        Consultá en tu escuela para más información.
                      </motion.p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {step > 0 && (
            <motion.button
              onClick={handleBack}
              className="fixed bottom-4 left-4 p-3 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConsultaModal;
