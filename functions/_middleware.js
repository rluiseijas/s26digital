/**
 * Cloudflare Pages Middleware - S26Digital
 * 1. Geoblocking: Only allows traffic from the Americas (North, Central, South America & Caribbean).
 * 2. Geo-routing / Language Detection:
 *    - United States (US) -> Defaults to English ('en')
 *    - Other Americas locations -> Defaults to Spanish ('es')
 */

const AMERICAS_COUNTRIES = new Set([
  // North America
  'US', 'CA', 'MX', 'BM', 'GL', 'PM',
  // Central America
  'BZ', 'CR', 'SV', 'GT', 'HN', 'NI', 'PA',
  // Caribbean
  'AI', 'AG', 'AW', 'BS', 'BB', 'BQ', 'VG', 'KY', 'CU', 'CW', 'DM', 'DO',
  'GP', 'HT', 'JM', 'MQ', 'MS', 'PR', 'BL', 'KN', 'LC', 'MF', 'VC', 'SX',
  'TT', 'TC', 'VI',
  // South America
  'AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'FK', 'GF', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE'
]);

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Allow static assets to be served without restriction
  if (
    url.pathname.startsWith('/css/') ||
    url.pathname.startsWith('/js/') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.txt') ||
    url.pathname.endsWith('.json')
  ) {
    return next();
  }

  const cf = request.cf;

  // Local development fallback: If running locally where request.cf is undefined, allow access
  if (!cf || !cf.country) {
    return next();
  }

  const country = (cf.country || '').toUpperCase();
  const continent = (cf.continent || '').toUpperCase();

  // Allow only the Americas:
  // Continent NA (North America, Central America, Caribbean) or SA (South America)
  // or country explicitly in the Americas set
  const isAmericas = continent === 'NA' || continent === 'SA' || AMERICAS_COUNTRIES.has(country);

  if (!isAmericas) {
    return new Response(renderBlockedHtml(country, cf.rayId || 'CF-EDGE'), {
      status: 403,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });
  }

  // Determine default language:
  // United States -> English ('en')
  // Rest of the Americas -> Spanish ('es')
  const defaultLang = country === 'US' ? 'en' : 'es';

  // Proceed with response and inject cookies and headers for the client
  const response = await next();
  const modifiedResponse = new Response(response.body, response);

  modifiedResponse.headers.set('X-Visitor-Country', country);
  modifiedResponse.headers.set('X-Visitor-Continent', continent);
  modifiedResponse.headers.set('X-Default-Language', defaultLang);

  // Set cookies for client-side JavaScript synchronization
  modifiedResponse.headers.append('Set-Cookie', `s26_geo_country=${country}; Path=/; SameSite=Lax; Max-Age=2592000`);
  modifiedResponse.headers.append('Set-Cookie', `s26_default_lang=${defaultLang}; Path=/; SameSite=Lax; Max-Age=2592000`);

  return modifiedResponse;
}

function renderBlockedHtml(countryCode, rayId) {
  return `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Acceso Restringido / Access Restricted — S26Digital</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-[#0F172A] text-slate-100 min-h-screen flex items-center justify-center p-4 selection:bg-cyan-500/30 selection:text-white relative overflow-hidden">
  
  <!-- Subtle cyber glow backdrop -->
  <div class="fixed -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
  <div class="fixed -bottom-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

  <main class="max-w-xl w-full bg-[#1E293B] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-center space-y-6">
    
    <!-- Brand Logo -->
    <div class="flex items-center justify-center space-x-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-lg shadow-cyan-500/20">
        <svg class="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      </div>
      <div class="flex flex-col justify-center">
        <svg class="h-9 w-[130px] overflow-visible select-none" viewBox="0 0 130 38" aria-label="S26Digital">
          <text x="0" y="21" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="26" font-weight="800" letter-spacing="-0.025em">
            <tspan fill="#F8FAFC">S26</tspan><tspan fill="#06B6D4">Digital</tspan>
          </text>
          <text x="0" y="34" font-family="'JetBrains Mono', monospace" font-size="6.8" font-weight="700" fill="#94A3B8" textLength="124" lengthAdjust="spacing">
            ALIADO TECNOLÓGICO
          </text>
        </svg>
      </div>
    </div>

    <!-- Status Badge -->
    <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono uppercase tracking-wider">
      <span class="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
      <span>Acceso Restringido Geográficamente</span>
    </div>

    <!-- Main Message in ES & EN -->
    <div class="space-y-4 text-left border-y border-slate-800/80 py-6">
      <div class="space-y-1.5">
        <h2 class="text-base font-bold text-white flex items-center space-x-2">
          <span>Disponibilidad exclusiva para la región de América</span>
        </h2>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Los servicios de infraestructura, desarrollo y consultoría de <strong>S26Digital</strong> están habilitados únicamente para empresas y clientes ubicados dentro del continente americano (Norteamérica, Centroamérica, Sudamérica y el Caribe).
        </p>
      </div>

      <div class="space-y-1.5 pt-3 border-t border-slate-800/60">
        <h2 class="text-base font-bold text-slate-200">
          Exclusive availability for the Americas region
        </h2>
        <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
          <strong>S26Digital</strong> enterprise infrastructure, development, and consulting services are exclusively authorized for businesses located within the Americas (North America, Central America, South America, and the Caribbean).
        </p>
      </div>
    </div>

    <!-- Diagnostic Details -->
    <div class="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
      <div>Código de Región: <span class="text-rose-400 font-bold">${countryCode || 'DESCONOCIDA'}</span></div>
      <div>HTTP Status: <span class="text-slate-300 font-bold">403 Forbidden</span></div>
      <div class="w-full text-[10px] text-slate-500 text-center pt-1 border-t border-slate-900 mt-1">
        Cloudflare Edge Security Protection • Ray ID: ${rayId}
      </div>
    </div>

    <!-- Contact support -->
    <div class="pt-2 text-xs text-slate-400">
      ¿Crees que se trata de un error? Contáctanos a 
      <a href="mailto:contact@s26digital.com" class="text-cyan-400 hover:underline font-mono">contact@s26digital.com</a>
    </div>

  </main>
</body>
</html>`;
}
