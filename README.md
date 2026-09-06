# S26Digital — Landing Page Oficial

Landing page corporativa de alto impacto para **S26Digital**, consultora B2B que actúa como **Socio Tecnológico** estratégico para empresas que buscan escalar su infraestructura, automatizar procesos y construir ecosistemas de software robustos.

---

## 🎨 Identidad Visual & Especificaciones de Diseño

La interfaz sigue estrictamente la directriz **"Dark Mode (Cloud Enterprise)"**:

| Elemento | Código HEX | Descripción |
| :--- | :---: | :--- |
| **Fondo Principal** | `#0F172A` | Azul medianoche profundo para toda la página |
| **Acento (CTAs, Botones, Íconos)** | `#06B6D4` | Cian eléctrico de alto contraste |
| **Texto Principal** | `#F8FAFC` | Blanco tiza suave para máxima legibilidad |
| **Bordes y Tarjetas (Contenedores)** | `#1E293B` | Gris pizarra oscuro para diferenciar secciones |
| **Tipografía** | *Plus Jakarta Sans / Inter* | Sans-serif geométrica, moderna y limpia |

---

## 🏗️ Estructura y Secciones Implementadas

1. **Top Bar & Navbar**: Indicador de Uptime Enterprise 99.99%, navegación flotante con efecto *glassmorphism* (`backdrop-filter: blur`), logo interactivo y CTA dinámico.
2. **SECCIÓN 1: Hero (Cabecera)**:
   - Etiqueta: `Soluciones llave en mano • Infraestructura ágil en la nube • Despliegue rápido`
   - Título: `Transformamos la complejidad tecnológica en el motor de crecimiento de tu empresa.`
   - Subtítulo: `Desarrollamos software a medida, automatizamos operaciones, estructuramos datos y escalamos tus ventas con infraestructura de nivel enterprise. Tu socio tecnológico de principio a fin.`
   - Botón CTA: `[Agendar Consultoría Estratégica]` en `#06B6D4`
   - Mockup interactivo: Consola de control en la nube con métricas en tiempo real y flujo de terminal en vivo.
   - Canvas de fondo interactivo con red cibernética de nodos conectados.
3. **SECCIÓN 2: Diferenciador (Tarjetas `#1E293B`)**:
   - `Soluciones Llave en Mano`
   - `Agilidad y Prototipado`
   - `Acompañamiento Continuo`
4. **SECCIÓN 3: Portafolio de Soluciones (4 Columnas con Subpáginas Dedicadas)**:
   - **Desarrollo Web y Apps** (`desarrollo-web.html`): Páginas y apps B2B con IA, hosting y dominio incluidos, SEO para Google/Gemini/ChatGPT y entrega en 15 días hábiles.
   - **Datos y Estadística** (`datos-estadistica.html`): Business Intelligence, pipelines ETL automatizados, dashboards ejecutivos en tiempo real y analítica predictiva.
   - **Automatización** (`automatizacion.html`): Automatización de procesos (BPA), sincronización de ERP/CRM/WhatsApp y reducción del 70% de tareas repetitivas.
   - **Comercio Electrónico** (`comercio-electronico.html`): Plataformas de e-commerce transaccionales, módulo mayorista B2B, pasarelas de pago multimoneda y stock en vivo.
5. **SECCIÓN 4: Infraestructura y Stack Tecnológico (Cinta de Logos)**:
   - Logos vectoriales SVG minimalistas monocolor (`#F8FAFC` con hover `#06B6D4`) de:
     - `React`, `Vue.js`, `Tailwind CSS`, `Python`, `Node.js`, `PostgreSQL`, `SQLite`, `Docker`.
6. **SECCIÓN 5: Nuestro Proceso (Timeline Horizontal)**:
   - 01. Diagnóstico gratuito
   - 02. Diseño de arquitectura
   - 03. Desarrollo ágil (MVP)
   - 04. Despliegue y soporte continuo
7. **SECCIÓN 6: Nueva Solución Fiscal 2026 (Facturación B2B Libre y Legal)**:
   - Badge: `✨ NUEVA SOLUCIÓN FISCAL 2026`
   - Título: `Olvídate de sistemas obsoletos. Tu facturación B2B, libre y 100% legal.`
   - Introducción: Derogación de la homologación obligatoria del SENIAT (Gaceta Oficial Nº 43.435, Providencia SNAT/2026/00084 y Providencia 0071).
   - Beneficios clave: *Libertad y Modernidad*, *Cumplimiento Fiscal Estricto* e *Integración Total*.
   - CTA directo al diagnóstico: `Modernizar mi Facturación Ahora`.
8. **SECCIÓN 7: Footer y Captación**:
   - Título: `¿Listo para modernizar y escalar tu operación?`
   - Formulario interactivo con validación: *Nombre*, *Empresa*, *Correo*, *Selector de Servicio* (incluye *Facturación B2B & Cumplimiento Fiscal*).
   - Botón Final: `[Solicitar Diagnóstico Tecnológico]` en `#06B6D4`.
   - Modal emergente para agendamiento rápido de consultoría.

---

## ⚡ Preparado para Cloudflare Pages & Workers

Este proyecto está 100% optimizado para la infraestructura global Edge de **Cloudflare**:

* **`_headers`**: Inyecta automáticamente cabeceras de seguridad Enterprise (*HSTS, CSP, X-Frame-Options, X-Content-Type-Options*) y caché CDN inmutable para recursos estáticos (`/css/*`, `/js/*`).
* **`_redirects`**: Reglas de enrutamiento limpio para Cloudflare Pages.
* **`wrangler.toml`**: Configuración para despliegue y desarrollo local con la CLI de Cloudflare Wrangler.

---

## 🚀 Cómo Conectar a tu Repositorio Git y Subirlo

### 1. Vincular a tu repositorio remoto (GitHub, GitLab o Bitbucket)

Si ya creaste tu repositorio vacío en GitHub (ej. `https://github.com/tu-usuario/s26digital-landing.git`), ejecuta en tu terminal:

```bash
# Agregar tu repositorio remoto
git remote add origin https://github.com/tu-usuario/s26digital-landing.git

# Renombrar rama a main
git branch -M main

# Subir todos los cambios
git push -u origin main
```

---

## 🌐 Cómo Desplegar en Cloudflare Pages

### Método A: Despliegue Automático con GitHub (Recomendado)
1. Entra a tu panel de **[Cloudflare Dashboard](https://dash.cloudflare.com/)**.
2. Ve a **Workers & Pages** > **Create application** > pestaña **Pages** > **Connect to Git**.
3. Selecciona tu repositorio `s26digital-landing`.
4. Configuración de compilación:
   * **Framework preset**: `None`
   * **Build command**: *(dejar en blanco o `npm run build`)*
   * **Build output directory**: `.` (raíz)
5. Haz clic en **Save and Deploy**. ¡Tu web estará online globalmente en menos de 1 minuto con HTTPS automático y CDN Edge!

### Método B: Despliegue directo por Terminal con Wrangler CLI
```bash
# Iniciar sesión en Cloudflare
npx wrangler login

# Desplegar directamente
npm run deploy
```

---

## 📁 Estructura del Repositorio

```
S26DIGITAL/
├── .gitignore            # Exclusiones de Git (node_modules, .wrangler, etc.)
├── _headers              # Cabeceras de seguridad y caché para Cloudflare Pages
├── _redirects            # Reglas de redirección de Cloudflare
├── wrangler.toml         # Configuración Cloudflare Wrangler
├── index.html            # Landing page principal
├── css/
│   └── styles.css        # Estilos personalizados, animaciones y glassmorphism
├── js/
│   └── main.js           # Motor interactivo (canvas, terminal, modales)
├── assets/               # Recursos gráficos y multimedia
├── package.json          # Configuración y scripts para Cloudflare
├── INSTRUCCIONES.txt     # Guía y requerimientos maestros
└── README.md             # Documentación técnica completa
```
