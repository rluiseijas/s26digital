import React from 'react';
import { Layers, Linkedin, Github, Twitter, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto">
        
        {/* Cuadrícula Principal (4 Columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Marca */}
          <div className="space-y-4">
            <a href="#hero" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                <Layers className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-[#F8FAFC] font-sans">
                  S26<span className="text-[#06B6D4]">Digital</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono -mt-0.5">
                  Aliado Tecnológico
                </span>
              </div>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed">
              Arquitectura de software y soluciones Cloud Enterprise para escalar tu operación.
            </p>

            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna 2: Soluciones / Servicios */}
          <div className="space-y-4">
            <h4 className="text-slate-100 font-semibold mb-4 text-sm tracking-wide">
              Servicios
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#soluciones" className="hover:text-cyan-400 transition-colors block">
                  Desarrollo a Medida
                </a>
              </li>
              <li>
                <a href="#soluciones" className="hover:text-cyan-400 transition-colors block">
                  Integraciones Cloud
                </a>
              </li>
              <li>
                <a href="/automatizacion.html" className="hover:text-cyan-400 transition-colors block">
                  Automatización IA
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-cyan-400 transition-colors block">
                  Consultoría Técnica
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Compañía */}
          <div className="space-y-4">
            <h4 className="text-slate-100 font-semibold mb-4 text-sm tracking-wide">
              Compañía
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#proceso" className="hover:text-cyan-400 transition-colors block">
                  Metodología
                </a>
              </li>
              <li>
                <a href="#diferenciadores" className="hover:text-cyan-400 transition-colors block">
                  Diferenciadores
                </a>
              </li>
              <li>
                <a href="#soluciones" className="hover:text-cyan-400 transition-colors block">
                  Casos de Éxito
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-cyan-400 transition-colors block">
                  Agendar Consultoría
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto y Sede */}
          <div className="space-y-4">
            <h4 className="text-slate-100 font-semibold mb-4 text-sm tracking-wide">
              Contacto
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="mailto:contacto@s26digital.com" className="hover:text-cyan-400 transition-colors">
                  contacto@s26digital.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Cagua, Aragua, Venezuela.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Barra Inferior (Bottom Bar) */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 S26Digital. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-6">
            <a href="/politica-de-privacidad.html" className="hover:text-cyan-400 transition-colors">
              Política de Privacidad
            </a>
            <a href="/terminos-de-servicio.html" className="hover:text-cyan-400 transition-colors">
              Términos de Servicio
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
