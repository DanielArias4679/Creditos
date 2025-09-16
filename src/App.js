import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComoFunciona from './components/ComoFunciona';
import ConsultaModal from './components/ConsultaModal';
import FAQ from './components/FAQ';
import Normativa from './components/Normativa';
import Footer from './components/Footer';

const App = () => {
  const [isConsultaOpen, setIsConsultaOpen] = useState(false);

  const openConsulta = () => setIsConsultaOpen(true);
  const closeConsulta = () => setIsConsultaOpen(false);

  return (
    <div className="min-h-screen">
      <Header onOpenConsulta={openConsulta} />
      <Hero onOpenConsulta={openConsulta} />
      <ComoFunciona />
      <FAQ />
      <Normativa />
      <Footer />
      <ConsultaModal isOpen={isConsultaOpen} onClose={closeConsulta} />
    </div>
  );
};

export default App;