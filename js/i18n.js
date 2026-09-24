/**
 * S26Digital - i18n & Geolocation Engine
 * Multilingual System (Español / English)
 * - Auto-detects visitor location:
 *   - United States (US) -> Defaults to English ('en')
 *   - Other allowed Americas locations -> Defaults to Spanish ('es')
 * - Supports manual switching with persistence in localStorage ('s26_lang')
 * - Cloudflare Pages edge middleware synchronization via cookies & headers
 * - Client-side fallback check for geolocation & timezone
 */

(function () {
  'use strict';

  const translations = {
    es: {
      meta: {
        title: 'S26Digital — Aliado Tecnológico B2B | Desarrollo Web, Cloud & Automatización',
        description: 'Desarrollamos tiendas online, plataformas web y automatizaciones empresariales para medianas empresas. Infraestructura tecnológica llave en mano.'
      },
      nav: {
        brand_sub: 'ALIADO TECNOLÓGICO',
        solutions: 'Soluciones',
        why_us: 'Diferenciadores',
        billing: 'Facturación',
        billing_badge: 'Nuevo',
        billing_badge_mobile: 'Nuevo 2026',
        stack: 'Stack',
        stack_mobile: 'Stack Tecnológico',
        process: 'Metodología',
        process_mobile: 'Nuestro Proceso',
        contact: 'Contacto',
        cta: 'Agendar Consultoría',
        cta_mobile: 'Agendar Consultoría Estratégica'
      },
      hero: {
        badge: 'Plataformas Web • Automatización • Facturación y E-commerce',
        headline: 'Digitaliza tu empresa y <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 glow-text-cyan">escala tus ventas.</span>',
        subtitle: 'Desarrollamos tiendas online, sistemas de gestión y automatizaciones para medianas empresas. Tú operas tu negocio; nosotros gestionamos toda la infraestructura tecnológica.',
        cta_primary: 'Agendar Consultoría',
        cta_secondary: 'Explorar Soluciones',
        stat_projects: 'Proyectos Completados',
        stat_clients: 'Clientes Satisfechos',
        stat_time: 'Entrega Rápida (MVP)',
        stat_uptime: 'Siempre Disponible',
        stat_turnkey: 'Llave en Mano',
        slide1_title: 'E-commerce y Cobros Digitales',
        slide2_title: 'Plataformas Web y Portales',
        slide3_title: 'Aplicaciones Cloud y Paneles',
        slide4_title: 'Automatización de Procesos',
        card_window_title: 'Soluciones en Acción',
        card_title: 'E-commerce y Cobros Digitales',
        card_desc: 'Catálogos dinámicos, pasarelas de pago y facturación sincronizada.',
        card_gateways: 'Pasarelas',
        card_gateways_val: 'Stripe • Card',
        card_billing: 'Facturación',
        card_billing_val: 'Automática',
        card_inventory: 'Inventario',
        card_inventory_val: 'Sincronizado',
        card_footer: 'Solución llave en mano lista para operar'
      },
      solutions: {
        badge: 'Servicios y Especialidades',
        title: 'Portafolio de Soluciones',
        subtitle: 'Desarrollo web, aplicaciones, automatización de procesos y tiendas online para resolver los retos de tu negocio y acelerar tus ventas.',
        view_details: 'Ver detalles del servicio',
        instant_quote: 'Cotizar de inmediato',
        card1_title: 'Desarrollo Web y Apps',
        card1_subtitle: 'Presencia online moderna y aplicaciones que enamoran a tus clientes.',
        card1_desc: 'Diseño y programación de sitios web atractivos, rápidos y optimizados para celulares, portales de clientes y aplicaciones web a la medida de tus necesidades comerciales.',
        card2_title: 'Datos y Estadística',
        card2_subtitle: 'Información organizada y tableros claros para tomar mejores decisiones.',
        card2_desc: 'Consolidamos tus datos dispersos, ordenamos tus registros comerciales y creamos paneles visuales en tiempo real para que conozcas las métricas y el rendimiento exacto de tu negocio.',
        card3_title: 'Automatización',
        card3_subtitle: 'Ahorra tiempo y elimina tareas manuales repetitivas en tu día a día.',
        card3_desc: 'Conectamos tus sistemas de ventas, facturación, correo y WhatsApp para que las tareas rutinarias se realicen automáticamente, eliminando errores y liberando a tu equipo.',
        card4_title: 'Comercio Electrónico',
        card4_subtitle: 'Tiendas virtuales, cobros digitales y atención las 24 horas del día.',
        card4_desc: 'Montamos tu tienda online completa: catálogo fácil de administrar, cobros con tarjeta y medios digitales, cálculo de envíos y asistentes virtuales que atienden pedidos 24/7.'
      },
      why_us: {
        badge: 'Por qué elegir a S26Digital',
        title: 'Más que líneas de código, entregamos valor estratégico.',
        subtitle: 'No somos simples ejecutores de tareas: operamos como tu departamento de ingeniería de élite, alineando cada desarrollo con los objetivos comerciales de tu empresa.',
        card1_badge: '01 • Ecosistema Integral',
        card1_title: 'Soluciones Llave en Mano',
        card1_desc: 'Nos encargamos de todo el ecosistema (hosting, bases de datos, seguridad). Tú te concentras en hacer crecer tu negocio mientras nosotros administramos la arquitectura tecnológica completa.',
        card1_item1: 'Configuración de Servidores & Cloud',
        card1_item2: 'Copias de seguridad automáticas y cifrado',
        card1_item3: 'Mantenimiento y actualizaciones sin caídas',
        card1_footer: 'Cero fricción de infraestructura',
        card2_badge: '02 • Velocidad de Ejecución',
        card2_title: 'Agilidad y Prototipado',
        card2_desc: 'Construimos en iteraciones rápidas para resultados en semanas. Implementamos metodologías ágiles enfocadas en Producto Mínimo Viable (MVP) para validar rápido en el mercado real.',
        card2_item1: 'Sprints de entrega cada 14 días',
        card2_item2: 'Prototipos interactivos antes del código',
        card2_item3: 'Adaptabilidad inmediata al feedback',
        card2_footer: 'Validación y retorno acelerado',
        card3_badge: '03 • Escalabilidad Sostenida',
        card3_title: 'Acompañamiento Continuo',
        card3_desc: 'Escalamos tu infraestructura junto al crecimiento de tu negocio. No te entregamos un software y desaparecemos: somos tu aliado técnico de largo plazo para auditorías, optimización y nuevas fases.',
        card3_item1: 'Monitoreo 24/7 de rendimiento y salud',
        card3_item2: 'Escalamiento vertical y horizontal bajo demanda',
        card3_item3: 'Consultoría estratégica periódica de roadmap',
        card3_footer: 'Alianza B2B de largo plazo'
      },
      stack: {
        badge: 'Modern Enterprise Stack',
        title: 'Potenciados por tecnología de vanguardia.',
        subtitle: 'Utilizamos tecnologías robustas, estandarizadas y de alto rendimiento que aseguran interoperabilidad, seguridad y escalabilidad continua.'
      },
      process: {
        badge: 'Metodología S26 Agile',
        title: 'Nuestro Proceso',
        subtitle: 'Flujo de trabajo estructurado y transparente para garantizar predictibilidad, calidad de código y entrega a tiempo.',
        step1_title: 'Diagnóstico gratuito',
        step1_sub: 'Auditoría y Alcance',
        step1_desc: 'Evaluamos tu infraestructura actual, identificamos cuellos de botella y definimos la hoja de ruta óptima sin compromiso ni costo inicial.',
        step1_tag: 'Duración: 48 - 72 hrs',
        step2_title: 'Diseño de arquitectura',
        step2_sub: 'Blueprints & UX/UI',
        step2_desc: 'Modelamos bases de datos, diagramas de microservicios en la nube, protocolos de seguridad y prototipos visuales de alta fidelidad.',
        step2_tag: 'Aprobación de Blueprint',
        step3_title: 'Desarrollo ágil (MVP)',
        step3_sub: 'Sprints Iterativos',
        step3_desc: 'Construcción en iteraciones de 2 semanas con entregables funcionales continuos, pruebas unitarias automatizadas y control de calidad.',
        step3_tag: 'Demos cada 14 días',
        step4_title: 'Despliegue y soporte continuo',
        step4_sub: 'Producción 24/7',
        step4_desc: 'Lanzamiento a producción con pipelines CI/CD de cero tiempo de inactividad, monitoreo continuo y acompañamiento para escalar.',
        step4_tag: 'Soporte Enterprise Activo'
      },
      facturacion: {
        badge: '✨ NUEVA SOLUCIÓN FISCAL 2026',
        title: 'Olvídate de sistemas obsoletos. <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 glow-text-cyan">Tu facturación B2B, libre y 100% legal.</span>',
        subtitle: 'Con la derogación de la homologación obligatoria del SENIAT (Gaceta Oficial Nº 43.435), tu empresa ya no está atada a un listado cerrado de software. Implementamos sistemas de facturación y ERPs modernos, rápidos y adaptados estrictamente a la Providencia 0071.',
        badge_prov: 'Providencia SNAT/2026/00084',
        badge_gaceta: 'Gaceta Oficial Nº 43.435',
        badge_p0071: 'Providencia 0071',
        b1_badge: '01 • Modern Cloud',
        b1_title: 'Libertad y Modernidad',
        b1_desc: 'Migramos tu negocio desde sistemas lentos o antiguos hacia plataformas en la nube o soluciones a la medida sin trabas burocráticas.',
        b1_check: 'Cero ataduras a software legado',
        b2_badge: '02 • 100% Legal',
        b2_title: 'Cumplimiento Fiscal Estricto',
        b2_desc: 'Automatizamos la emisión de facturas, cálculo de IVA, IGTF y reportes obligatorios bajo la normativa vigente.',
        b2_check: 'Cálculo automático IVA + IGTF',
        b3_badge: '03 • API & Hardware',
        b3_title: 'Integración Total',
        b3_desc: 'Conectamos tus sistemas actuales (e-commerce, CRM, ERP internacionales) con impresoras fiscales y formatos de formas libres.',
        b3_check: 'Sincronización de impresoras y software',
        cta_title: '¿Listo para dar el salto a una facturación ágil y sin límites?',
        cta_subtitle: 'Agenda un diagnóstico técnico sin costo. Analizamos tus flujos transaccionales y diseñamos tu nueva arquitectura fiscal B2B.',
        cta_btn: 'Modernizar mi Facturación Ahora'
      },
      solutions2026: {
        badge: '✨ NUEVAS SOLUCIONES 2026',
        title: 'Nuevas Soluciones 2026. <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 glow-text-cyan">Explora nuestros nuevos servicios.</span>',
        subtitle: 'Infraestructura digital y herramientas interactivas diseñadas para escalar ventas, modernizar espacios comerciales y automatizar operaciones con estándares enterprise.',
        c1_focus: 'Enfoque: IA conversacional avanzada',
        c1_title: 'Chatbot Inteligente para WhatsApp',
        c1_desc: 'Elimina las conversaciones monótonas. Implementa un asistente virtual con un tono natural y fluido diseñado específicamente para atraer clientes y cerrar ventas, no solo para responder FAQs.',
        c1_link: 'Ver más detalles',
        c1_cta: 'Automatizar Ventas',
        c2_focus: 'Enfoque: Servicio por suscripción B2B',
        c2_title: 'Pantallas Digitales Publicitarias',
        c2_desc: 'Convierte SmartTVs en menús y carteleras dinámicas. Solución ideal para comerciantes y sector de comida rápida que necesitan actualizar precios y ofertas en tiempo real.',
        c2_link: 'Ver más detalles',
        c2_cta: 'Digitalizar mi Local',
        c3_focus: 'Enfoque: Cumplimiento fiscal y sistemas Cloud',
        c3_title: 'Facturación B2B',
        c3_desc: 'Olvida los sistemas legacy. Tu facturación B2B 100% cloud, sin fricciones y estrictamente apegada a la nueva normativa fiscal y Providencia 0071.',
        c3_link: 'Ver más detalles',
        c3_cta: 'Modernizar Facturación'
      },
      contact: {
        badge: 'Cupos de Consultoría Disponibles',
        title: '¿Listo para modernizar y escalar tu operación?',
        subtitle: 'Completa el formulario para solicitar tu sesión de diagnóstico tecnológico sin costo. Analizaremos tu arquitectura y te presentaremos un plan de acción estratégico en menos de 24 horas.',
        guarantee1: 'Diagnóstico 100% confidencial (NDA incluido)',
        guarantee2: 'Respuesta garantizada por un Arquitecto Senior',
        guarantee3: 'Sin compromisos de contratación posterior',
        alert_success_title: '¡Diagnóstico Solicitado con Éxito!',
        alert_success_msg: 'Hemos recibido tu solicitud. Nuestro equipo de arquitectura tecnológica se contactará contigo a la brevedad.',
        form_name: 'Nombre Completo',
        form_name_ph: 'Ej. Carlos Mendoza',
        form_company: 'Empresa / Organización',
        form_company_ph: 'Ej. Distribuidora del Centro C.A.',
        form_email: 'Correo Corporativo',
        form_email_ph: 'carlos@empresa.com',
        form_phone: 'Teléfono / WhatsApp',
        form_phone_ph: '+58 412 123 4567',
        form_challenge: '¿Cuál es el principal reto o requerimiento tecnológico?',
        form_challenge_ph: 'Describe brevemente lo que necesitas: tienda virtual, sistema a medida, automatizar reportes, migración de infraestructura, etc.',
        submit_btn: 'Solicitar Diagnóstico Tecnológico'
      },
      footer: {
        brand_desc: 'Arquitectura de software y soluciones Cloud Enterprise para escalar tu operación.',
        services_title: 'Servicios',
        s1: 'Desarrollo a Medida',
        s2: 'Integraciones Cloud',
        s3: 'Automatización IA',
        s4: 'Consultoría Técnica',
        company_title: 'Compañía',
        c1: 'Metodología',
        c2: 'Diferenciadores',
        c3: 'Casos de Éxito',
        c4: 'Agendar Consultoría',
        contact_title: 'Contacto',
        location: 'Venezuela<br>Miami, US',
        location_aragua: 'Venezuela',
        location_venezuela: 'Venezuela',
        location_miami: 'Miami, US',
        copyright: '© 2026 S26Digital. All Rights Reserved.',
        privacy_policy: 'Política de Privacidad',
        privacy_policy_url: 'politica-de-privacidad.html',
        terms_of_service: 'Términos de Servicio'
      },
      modal: {
        badge: 'Sesión de 30 Minutos con Arquitecto Lead',
        title: 'Agendar Consultoría Estratégica',
        subtitle: 'Selecciona tus datos de contacto para coordinar la llamada de diagnóstico directamente en tu calendario.',
        name_label: 'Nombre Completo',
        name_ph: 'Tu nombre',
        email_label: 'Correo Corporativo',
        email_ph: 'correo@empresa.com',
        interest_label: 'Área de Interés',
        opt_billing: 'Facturación B2B & Cumplimiento Fiscal (Nueva)',
        opt_web: 'Desarrollo Web y Apps',
        opt_data: 'Datos y Estadística',
        opt_auto: 'Automatización',
        opt_ecom: 'Comercio Electrónico',
        submit_btn: 'Confirmar Reserva de Consultoría'
      }
    },
    en: {
      meta: {
        title: 'S26Digital — B2B Tech Partner | Web Development, Cloud & Automation',
        description: 'We engineer e-commerce platforms, web applications, and enterprise automations for growing companies. Turnkey cloud technology infrastructure.'
      },
      nav: {
        brand_sub: 'TECHNOLOGY PARTNER',
        solutions: 'Solutions',
        why_us: 'Why Us',
        billing: 'Invoicing',
        billing_badge: 'New',
        billing_badge_mobile: 'New 2026',
        stack: 'Tech Stack',
        stack_mobile: 'Tech Stack',
        process: 'Process',
        process_mobile: 'Our Process',
        contact: 'Contact',
        cta: 'Book Consultation',
        cta_mobile: 'Book Strategic Consultation'
      },
      hero: {
        badge: 'Web Platforms • Automation • Invoicing & E-commerce',
        headline: 'Digitize your enterprise and <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 glow-text-cyan">scale your sales.</span>',
        subtitle: 'We build online stores, management systems, and business automations for mid-sized companies. You run your business; we manage your entire technology infrastructure.',
        cta_primary: 'Book Consultation',
        cta_secondary: 'Explore Solutions',
        stat_projects: 'Completed Projects',
        stat_clients: 'Satisfied Clients',
        stat_time: 'Fast Delivery (MVP)',
        stat_uptime: 'Always Online',
        stat_turnkey: 'Turnkey Delivery',
        slide1_title: 'E-commerce & Digital Payments',
        slide2_title: 'Web Platforms & Custom Portals',
        slide3_title: 'Cloud Apps & Control Dashboards',
        slide4_title: 'Process Automation & Workflows',
        card_window_title: 'Solutions in Action',
        card_title: 'E-commerce & Digital Payments',
        card_desc: 'Dynamic product catalogs, payment gateways, and synchronized invoicing.',
        card_gateways: 'Gateways',
        card_gateways_val: 'Stripe • Card',
        card_billing: 'Billing',
        card_billing_val: 'Automated',
        card_inventory: 'Inventory',
        card_inventory_val: 'Synchronized',
        card_footer: 'Turnkey solution ready to operate'
      },
      solutions: {
        badge: 'Services & Specializations',
        title: 'Solutions Portfolio',
        subtitle: 'Custom web development, applications, process automation, and online stores engineered to solve business bottlenecks and drive revenue.',
        view_details: 'View service details',
        instant_quote: 'Get instant quote',
        card1_title: 'Web & App Development',
        card1_subtitle: 'Modern online presence and applications your clients will love.',
        card1_desc: 'Design and engineering of high-speed, mobile-optimized websites, client portals, and bespoke web applications tailored to your business goals.',
        card2_title: 'Data & Analytics',
        card2_subtitle: 'Structured information and executive dashboards for confident decisions.',
        card2_desc: 'We unify fragmented data, organize your commercial records, and create real-time visual dashboards to monitor your exact business KPIs.',
        card3_title: 'Automation',
        card3_subtitle: 'Save hours and eliminate repetitive manual tasks from your day-to-day.',
        card3_desc: 'We connect your sales, invoicing, email, and WhatsApp systems so recurring workflows execute automatically, eliminating human error.',
        card4_title: 'E-Commerce',
        card4_subtitle: 'Online stores, digital payments, and 24/7 automated order processing.',
        card4_desc: 'We build complete online stores: intuitive catalog management, credit card & digital payment processing, dynamic shipping calculations, and 24/7 sales bots.'
      },
      why_us: {
        badge: 'Why Choose S26Digital',
        title: 'Beyond writing code, we deliver strategic business value.',
        subtitle: 'We are not mere task executors: we operate as your elite engineering department, aligning every technical deliverable with your commercial expansion goals.',
        card1_badge: '01 • End-to-End Ecosystem',
        card1_title: 'Turnkey Solutions',
        card1_desc: 'We manage the entire technology ecosystem (hosting, databases, cloud security). You focus on driving business growth while we handle the full technology stack.',
        card1_item1: 'Enterprise Cloud & Server Architecture',
        card1_item2: 'Automated Redundant Backups & Encryption',
        card1_item3: 'Zero-Downtime Maintenance & Upgrades',
        card1_footer: 'Zero infrastructure friction',
        card2_badge: '02 • Speed of Execution',
        card2_title: 'Agility & Prototyping',
        card2_desc: 'We build in rapid iterations to deliver production results within weeks. We leverage MVP-focused agile methodologies to validate fast in the actual market.',
        card2_item1: 'Bi-weekly delivery sprints (every 14 days)',
        card2_item2: 'Interactive prototypes prior to coding',
        card2_item3: 'Immediate adaptability to user feedback',
        card2_footer: 'Fast validation and accelerated ROI',
        card3_badge: '03 • Sustained Scalability',
        card3_title: 'Continuous Long-Term Partnership',
        card3_desc: 'We scale your infrastructure seamlessly alongside your company’s growth. We do not deliver code and vanish: we are your dedicated long-term technical partner.',
        card3_item1: '24/7 Telemetry, Health & Uptime Monitoring',
        card3_item2: 'Elastic Vertical & Horizontal Scaling',
        card3_item3: 'Periodic Strategic Architecture & Roadmap Reviews',
        card3_footer: 'Long-term enterprise partnership'
      },
      stack: {
        badge: 'Modern Enterprise Stack',
        title: 'Powered by industry-leading technologies.',
        subtitle: 'We build with robust, standardized, and high-performance technologies that ensure seamless interoperability, bank-grade security, and continuous scalability.'
      },
      process: {
        badge: 'S26 Agile Methodology',
        title: 'Our Process',
        subtitle: 'A structured, transparent engineering workflow designed to guarantee predictability, code craftsmanship, and on-time delivery.',
        step1_title: 'Complimentary Discovery',
        step1_sub: 'Audit & Scope Definition',
        step1_desc: 'We audit your current tech stack, identify bottlenecks, and map out the ideal technical roadmap with zero initial cost or commitment.',
        step1_tag: 'Turnaround: 48 - 72 hrs',
        step2_title: 'Architecture Blueprint',
        step2_sub: 'Blueprints & UI/UX',
        step2_desc: 'We architect database schemas, cloud microservice topologies, security protocols, and interactive high-fidelity prototypes.',
        step2_tag: 'Blueprint Approval',
        step3_title: 'Agile MVP Development',
        step3_sub: 'Iterative Sprints',
        step3_desc: 'Iterative 2-week development sprints delivering functional production software, automated testing, and comprehensive QA.',
        step3_tag: 'Demos every 14 days',
        step4_title: 'Deployment & Continuous Ops',
        step4_sub: '24/7 Production Support',
        step4_desc: 'Zero-downtime CI/CD production deployment, continuous observability, and dedicated architect support to scale.',
        step4_tag: 'Active Enterprise Support'
      },
      facturacion: {
        badge: '✨ NEW 2026 FISCAL SOLUTION',
        title: 'Forget obsolete legacy systems. <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 glow-text-cyan">Your B2B invoicing, frictionless and 100% compliant.</span>',
        subtitle: 'With the repeal of mandatory software homogenization (Official Gazette No. 43.435), your business is no longer tethered to a closed software registry. We engineer modern cloud invoicing systems and ERPs strictly compliant with Order 0071.',
        badge_prov: 'Order SNAT/2026/00084',
        badge_gaceta: 'Official Gazette No. 43.435',
        badge_p0071: 'Order 0071 Compliance',
        b1_badge: '01 • Modern Cloud',
        b1_title: 'Freedom & Modernity',
        b1_desc: 'We migrate your business from slow, outdated desktop software to high-speed cloud platforms and custom ERPs without red tape.',
        b1_check: 'Zero vendor lock-in or legacy baggage',
        b2_badge: '02 • 100% Compliant',
        b2_title: 'Strict Tax Compliance',
        b2_desc: 'Automated invoice numbering, automated VAT / IGTF calculations, and regulatory audit reports strictly formatted for tax authorities.',
        b2_check: 'Automated VAT + IGTF tax logic',
        b3_badge: '03 • API & Hardware',
        b3_title: 'Full Hardware & API Integration',
        b3_desc: 'We connect your existing stack (e-commerce, international ERPs, CRMs) with fiscal printers, digital invoicing, and free-form formats.',
        b3_check: 'Live printer & cloud software synchronization',
        cta_title: 'Ready to modernize your invoicing with zero bottlenecks?',
        cta_subtitle: 'Book a complimentary technical discovery session. We evaluate your transaction volume and architect your new B2B billing engine.',
        cta_btn: 'Modernize Invoicing Now'
      },
      solutions2026: {
        badge: '✨ NEW 2026 SOLUTIONS',
        title: 'New 2026 Solutions. <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 glow-text-cyan">Explore our newest services.</span>',
        subtitle: 'High-performance digital infrastructure and interactive tools engineered to scale sales, modernize physical spaces, and automate operations with enterprise standards.',
        c1_focus: 'Focus: Advanced Conversational AI',
        c1_title: 'Smart AI Chatbot for WhatsApp',
        c1_desc: 'Eliminate robotic conversations. Deploy a virtual assistant with natural and fluid tonality designed specifically to acquire leads and close deals, not just answer FAQs.',
        c1_link: 'View details',
        c1_cta: 'Automate Sales',
        c2_focus: 'Focus: B2B Subscription Service',
        c2_title: 'Digital Signage & Advertising Screens',
        c2_desc: 'Turn SmartTVs into dynamic menus and digital billboards. The ideal solution for retail and food service needing real-time price and promo updates.',
        c2_link: 'View details',
        c2_cta: 'Digitize My Store',
        c3_focus: 'Focus: Tax Compliance & Cloud Systems',
        c3_title: 'B2B Invoicing',
        c3_desc: 'Leave legacy software behind. Your 100% cloud B2B invoicing, frictionless and strictly compliant with new tax regulations and Administrative Order 0071.',
        c3_link: 'View details',
        c3_cta: 'Modernize Invoicing'
      },
      contact: {
        badge: 'Consulting Slots Open',
        title: 'Ready to modernize and scale your operation?',
        subtitle: 'Fill out the form to schedule a complimentary technical discovery session. We will evaluate your architecture and present an actionable strategic roadmap within 24 hours.',
        guarantee1: '100% confidential diagnostic (Mutual NDA included)',
        guarantee2: 'Direct evaluation by a Senior Cloud Architect',
        guarantee3: 'Zero purchase or hiring obligations',
        alert_success_title: 'Discovery Request Received!',
        alert_success_msg: 'We have received your details. Our lead technology architect will reach out to you within 24 hours.',
        form_name: 'Full Name',
        form_name_ph: 'e.g. Carlos Mendoza',
        form_company: 'Company / Organization',
        form_company_ph: 'e.g. Acme Logistics Corp.',
        form_email: 'Corporate Email',
        form_email_ph: 'carlos@company.com',
        form_phone: 'Phone / WhatsApp',
        form_phone_ph: '+1 (555) 019-2834',
        form_challenge: 'What is your primary technological challenge or requirement?',
        form_challenge_ph: 'Briefly outline your needs: custom e-commerce, custom ERP/CRM, workflow automation, cloud infrastructure migration, etc.',
        submit_btn: 'Request Technical Discovery'
      },
      footer: {
        brand_desc: 'Software architecture and Cloud Enterprise solutions to scale your business operations.',
        services_title: 'Services',
        s1: 'Custom Development',
        s2: 'Cloud Integrations',
        s3: 'AI Automation',
        s4: 'Technical Consulting',
        company_title: 'Company',
        c1: 'Methodology',
        c2: 'Differentiators',
        c3: 'Case Studies',
        c4: 'Book Consultation',
        contact_title: 'Contact',
        location: 'Venezuela<br>Miami, US',
        location_aragua: 'Venezuela',
        location_venezuela: 'Venezuela',
        location_miami: 'Miami, US',
        copyright: '© 2026 S26Digital. All Rights Reserved.',
        privacy_policy: 'Privacy Policy',
        privacy_policy_url: 'privacy-policy.html',
        terms_of_service: 'Terms of Service'
      },
      modal: {
        badge: '30-Minute Discovery Session with Lead Architect',
        title: 'Book Strategic Consultation',
        subtitle: 'Provide your contact details to coordinate a technical diagnostic session directly on your calendar.',
        name_label: 'Full Name',
        name_ph: 'Your full name',
        email_label: 'Corporate Email',
        email_ph: 'name@company.com',
        interest_label: 'Core Focus Area',
        opt_billing: 'B2B Invoicing & Tax Compliance (New)',
        opt_web: 'Web & Mobile Applications',
        opt_data: 'Data & Analytics',
        opt_auto: 'Workflow Automation',
        opt_ecom: 'E-commerce & Payments',
        submit_btn: 'Confirm Consultation Booking'
      }
    }
  };

  /**
   * Determine initial language based on:
   * 1. localStorage ('s26_lang')
   * 2. Cookie 's26_default_lang' (set by Cloudflare edge middleware)
   * 3. Cookie 's26_geo_country' (if 'US' -> 'en', else 'es')
   * 4. Browser US Timezone or navigator.language === 'en-US' -> 'en'
   * 5. Default fallback -> 'es'
   */
  function detectLanguage() {
    // 1. User manual override
    try {
      const stored = localStorage.getItem('s26_lang');
      if (stored === 'es' || stored === 'en') {
        return stored;
      }
    } catch (e) {}

    // 2. Cookie injected by Cloudflare Pages middleware
    if (typeof document !== 'undefined') {
      const defaultLangCookie = document.cookie.match(/(?:^|;\s*)s26_default_lang=([^;]+)/);
      if (defaultLangCookie && (defaultLangCookie[1] === 'es' || defaultLangCookie[1] === 'en')) {
        return defaultLangCookie[1];
      }

      // 3. Country cookie injected by Cloudflare
      const geoCountryCookie = document.cookie.match(/(?:^|;\s*)s26_geo_country=([^;]+)/);
      if (geoCountryCookie && geoCountryCookie[1].toUpperCase() === 'US') {
        return 'en';
      }
    }

    // 4. Client-side US detection heuristics
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const isUSTimezone = [
        'America/New_York', 'America/Detroit', 'America/Kentucky', 'America/Indiana',
        'America/Chicago', 'America/Menominee', 'America/North_Dakota',
        'America/Denver', 'America/Boise', 'America/Phoenix',
        'America/Los_Angeles', 'America/Anchorage', 'America/Juneau',
        'America/Sitka', 'America/Metlakatla', 'America/Yakutat', 'America/Nome',
        'America/Adak', 'Pacific/Honolulu'
      ].some(uTz => tz.startsWith(uTz));

      if (isUSTimezone) {
        return 'en';
      }

      const navLang = (navigator.language || '').toLowerCase();
      if (navLang === 'en-us') {
        return 'en';
      }
    } catch (e) {}

    // 5. Default for the rest of the Americas
    return 'es';
  }

  let currentLang = detectLanguage();

  /**
   * Helper to retrieve nested keys like "hero.headline"
   */
  function getNestedTranslation(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev && prev[curr] !== undefined ? prev[curr] : null), obj);
  }

  /**
   * Apply translations to the DOM
   */
  function applyTranslations(lang) {
    currentLang = lang;
    const dict = translations[lang] || translations.es;

    // Update document language & meta
    document.documentElement.lang = lang;
    if (dict.meta) {
      if (dict.meta.title) document.title = dict.meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && dict.meta.description) {
        metaDesc.setAttribute('content', dict.meta.description);
      }
    }

    // 1. Text elements: data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNestedTranslation(dict, key);
      if (val !== null) {
        // If element contains child icons or spans, update text node or child span without destroying icons
        const icon = el.querySelector('i, svg');
        if (icon) {
          const innerSpan = el.querySelector('span:not([data-lucide])');
          if (innerSpan) {
            innerSpan.textContent = val;
          } else {
            // Replace text node while keeping icon
            const cloneIcon = icon.cloneNode(true);
            el.textContent = val + ' ';
            el.appendChild(cloneIcon);
          }
        } else {
          el.textContent = val;
        }
      }
    });

    // 2. HTML elements: data-i18n-html (preserves styled spans/markup)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = getNestedTranslation(dict, key);
      if (val !== null) {
        el.innerHTML = val;
      }
    });

    // 3. Input Placeholders: data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = getNestedTranslation(dict, key);
      if (val !== null) {
        el.setAttribute('placeholder', val);
      }
    });

    // 4. Link Hrefs: data-i18n-href
    document.querySelectorAll('[data-i18n-href]').forEach(el => {
      const key = el.getAttribute('data-i18n-href');
      const val = getNestedTranslation(dict, key);
      if (val !== null) {
        el.setAttribute('href', val);
      }
    });

    // 5. Titles / aria-labels: data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = getNestedTranslation(dict, key);
      if (val !== null) {
        el.setAttribute('title', val);
        el.setAttribute('aria-label', val);
      }
    });

    // 6. Image Alt attributes: data-i18n-alt
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      const val = getNestedTranslation(dict, key);
      if (val !== null) {
        el.setAttribute('alt', val);
      }
    });

    // Update UI language switchers state
    updateSwitcherButtons(lang);

    // Refresh Lucide icons if present
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /**
   * Highlight active language in all switch buttons
   */
  function updateSwitcherButtons(lang) {
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang-btn');
      if (btnLang === lang) {
        btn.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
        btn.classList.remove('text-slate-400', 'hover:text-white');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-500/40');
        btn.classList.add('text-slate-400', 'hover:text-white');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Set language explicitly and persist in localStorage
   */
  function setLanguage(lang) {
    if (lang !== 'es' && lang !== 'en') return;
    try {
      localStorage.setItem('s26_lang', lang);
    } catch (e) {}
    applyTranslations(lang);
  }

  /**
   * Attach click handlers to language switch buttons
   */
  function initLanguageButtons() {
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = btn.getAttribute('data-lang-btn');
        if (selectedLang) {
          setLanguage(selectedLang);
          const pathname = window.location.pathname;
          if (selectedLang === 'en' && pathname.includes('politica-de-privacidad.html')) {
            window.location.href = 'privacy-policy.html';
          } else if (selectedLang === 'es' && pathname.includes('privacy-policy.html')) {
            window.location.href = 'politica-de-privacidad.html';
          }
        }
      });
    });
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyTranslations(currentLang);
      initLanguageButtons();
    });
  } else {
    applyTranslations(currentLang);
    initLanguageButtons();
  }

  // Public API
  window.s26I18n = {
    setLanguage: setLanguage,
    getLanguage: () => currentLang,
    t: (key) => getNestedTranslation(translations[currentLang] || translations.es, key)
  };

})();
