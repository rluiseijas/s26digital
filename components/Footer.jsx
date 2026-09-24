import React from 'react';
import { Layers, Mail, MapPin } from 'lucide-react';

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
              <div className="flex flex-col justify-center">
                <svg className="h-8 w-[116px] overflow-visible select-none" viewBox="0 0 130 38" aria-label="S26Digital">
                  <text x="0" y="21" fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif" fontSize="26" fontWeight="800" letterSpacing="-0.025em">
                    <tspan fill="#F8FAFC">S26</tspan><tspan fill="#06B6D4">Digital</tspan>
                  </text>
                  <text x="0" y="34" fontFamily="'JetBrains Mono', monospace" fontSize="6.8" fontWeight="700" fill="#94A3B8" textLength="124" lengthAdjust="spacing">
                    ALIADO TECNOLÓGICO
                  </text>
                </svg>
              </div>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed">
              Arquitectura de software y soluciones Cloud Enterprise para escalar tu operación.
            </p>

            <div className="flex items-center space-x-3 pt-1">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61594435409965"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/s26.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.566.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 flex items-center justify-center"
                aria-label="X"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
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
              <li>
                <a href="/politica-de-privacidad.html" className="hover:text-cyan-400 transition-colors block">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/terminos-de-servicio.html" className="hover:text-cyan-400 transition-colors block">
                  Términos de Servicio
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
                <a href="mailto:contact@s26digital.com" className="hover:text-cyan-400 transition-colors">
                  contact@s26digital.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5 leading-snug">
                  <span className="block">Venezuela</span>
                  <span className="block">Miami, US</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Barra Inferior (Bottom Bar) */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex justify-center items-center text-center text-xs text-slate-400">
          <p>© 2026 S26Digital. All Rights Reserved.</p>
        </div>

      </div>

      {/* Floating WhatsApp Action Button */}
      <aside aria-label="Contacto WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-center">
        <a 
          href="https://wa.me/584243649198?text=Hola%20S26Digital%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-full"
          aria-label="Chatear por WhatsApp"
        >
          {/* Tooltip (desktop hover) */}
          <span className="hidden md:flex items-center space-x-2 mr-3 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-slate-700/80 text-white text-xs font-semibold shadow-2xl opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>¿Hablamos por WhatsApp?</span>
          </span>

          {/* Circular Button */}
          <div className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg shadow-emerald-950/40 hover:shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300">
            {/* Ping Badge */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-900"></span>
            </span>

            {/* WhatsApp SVG Icon */}
            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </div>
        </a>
      </aside>
    </footer>
  );
};

export default Footer;
