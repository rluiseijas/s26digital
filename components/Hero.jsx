import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';

export const Hero = () => {
  const slides = [
    {
      id: 0,
      title: 'E-commerce y Cobros Digitales',
      image: 'assets/hero/slide-4-ecommerce.jpg',
      alt: 'E-commerce y Cobros Digitales',
    },
    {
      id: 1,
      title: 'Plataformas Web y Portales',
      image: 'assets/hero/slide-1-web.jpg',
      alt: 'Plataformas Web y Portales a Medida',
    },
    {
      id: 2,
      title: 'Aplicaciones Cloud y Paneles',
      image: 'assets/hero/slide-2-apps.jpg',
      alt: 'Aplicaciones Cloud y Paneles de Control',
    },
    {
      id: 3,
      title: 'Automatización de Procesos',
      image: 'assets/hero/slide-3-automatizacion.jpg',
      alt: 'Automatización de Procesos y Flujos',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 overflow-hidden flex items-center bg-[#0B1329]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Copywriting y 3 Métricas Balanceadas */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E293B]/90 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wide shadow-sm shadow-cyan-500/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Plataformas Web • Automatización • Facturación y E-commerce</span>
            </div>

            {/* Titular */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.14]">
              Digitaliza tu empresa y{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400">
                escala tus ventas.
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Desarrollamos tiendas online, sistemas de gestión y automatizaciones para medianas empresas. Tú operas tu negocio; nosotros gestionamos toda la infraestructura tecnológica.
            </p>

            {/* Botones de Acción (CTAs) */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#contacto"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold tracking-wide uppercase flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all"
              >
                <span>Agendar Consultoría</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href="#soluciones"
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all"
              >
                <LayoutGrid className="w-4 h-4 text-cyan-400" />
                <span>Explorar Soluciones</span>
              </a>
            </div>

            {/* Contadores Desaturados: Exactamente 3 Métricas Balanceadas */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto lg:mx-0">
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                  +226
                </div>
                <div className="text-xs text-slate-400 leading-tight">Proyectos Completados</div>
              </div>

              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] font-mono">
                  +133
                </div>
                <div className="text-xs text-slate-400 leading-tight">Clientes Satisfechos</div>
              </div>

              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                  &lt; 3 <span className="text-base sm:text-lg font-sans ml-1 text-slate-300">Sem</span>
                </div>
                <div className="text-xs text-slate-400 leading-tight">Entrega Rápida (MVP)</div>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Carrusel Minimalista (Área de Imagen Maximizada, Sin Header ni Footer) */}
          <div className="lg:col-span-5 relative">
            {/* Resplandor ambiental de fondo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-2xl blur-xl opacity-75"></div>

            <div
              className="relative bg-[#1E293B] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden group select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Track de Slides */}
              <div
                className="relative h-[380px] sm:h-[420px] lg:h-[450px] w-full overflow-hidden bg-slate-950 cursor-pointer"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={nextSlide}
              >
                {slides.map((slide, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-cover object-center pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1329]/90 via-[#0B1329]/25 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-0 inset-x-0 p-6 pointer-events-none pr-32">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                          {slide.title}
                        </h3>
                      </div>
                    </div>
                  );
                })}

                {/* Controles Minimalistas en Esquina Inferior Derecha */}
                <div
                  className="absolute bottom-5 right-5 z-20 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/70 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Slide anterior"
                    className="text-slate-400 hover:text-cyan-400 transition-colors p-0.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center space-x-1.5 px-0.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentSlide(i)}
                        aria-label={`Ir al slide ${i + 1}`}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          i === currentSlide ? 'w-6 bg-cyan-400' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Siguiente slide"
                    className="text-slate-400 hover:text-cyan-400 transition-colors p-0.5 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
