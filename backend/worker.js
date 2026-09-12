/**
 * Cloudflare Worker - Webhook para Meta (WhatsApp Cloud API)
 * S26Digital - Backend Integration
 */

// Token de verificación estático requerido por Meta
const STATIC_VERIFY_TOKEN = "mi_token_secreto_s26";

export default {
  /**
   * Manejador principal de peticiones del Cloudflare Worker
   * @param {Request} request - Petición HTTP entrante
   * @param {Object} env - Variables de entorno / bindings de Cloudflare
   * @param {Object} ctx - Contexto de ejecución del Worker
   * @returns {Promise<Response>}
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "") || "/";

    // 1. Filtrar rutas permitidas (/webhook o la raíz /)
    if (pathname !== "/" && pathname !== "/webhook") {
      return new Response("Not Found", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // Manejo de preflight CORS (OPTIONS) por seguridad y compatibilidad
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Token configurado: usa variable de entorno si existe, o el token estático por defecto
    const verifyToken = env?.VERIFY_TOKEN || STATIC_VERIFY_TOKEN;

    // 2. Lógica del método GET (Verificación de Meta Webhook)
    if (request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");

      // Validar si el modo es "subscribe" y el token coincide exactamente
      if (mode === "subscribe" && token === verifyToken) {
        console.log("¡WEBHOOK VERIFICADO EXITOSAMENTE CON META!");
        // Meta requiere que se retorne únicamente el challenge con status 200
        return new Response(challenge, {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      } else {
        console.warn("Fallo de autenticación en verificación de Meta. Token o modo inválido.");
        return new Response("Forbidden", {
          status: 403,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }
    }

    // 3. Lógica del método POST (Recepción de eventos y mensajes entrantes de WhatsApp)
    if (request.method === "POST") {
      try {
        const body = await request.json();

        // Imprimir el evento en consola para monitoreo y depuración en Cloudflare Logs
        console.log("--- NUEVO MENSAJE / EVENTO DE WHATSAPP RECIBIDO ---");
        console.log(JSON.stringify(body, null, 2));

        // Meta exige respuesta inmediata con status 200 para no reintentar el envío
        return new Response("EVENT_RECEIVED", {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      } catch (error) {
        console.error("Error al procesar el JSON entrante de Meta:", error);
        return new Response("Bad Request: Invalid JSON", {
          status: 400,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }
    }

    // 4. Cualquier otro método HTTP no está permitido
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Allow: "GET, POST, OPTIONS",
      },
    });
  },
};
