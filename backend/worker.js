export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Manejo de la verificación GET de Meta
    if (request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");

      if (mode === "subscribe" && token === "mi_token_secreto_s26") {
        return new Response(challenge, { status: 200 });
      }
      return new Response("Error de verificación", { status: 403 });
    }

    // 2. Manejo de los eventos POST entrantes de WhatsApp
    if (request.method === "POST") {
      try {
        const body = await request.json();
        console.log("NUEVO MENSAJE / EVENTO DE WHATSAPP RECIBIDO ---", JSON.stringify(body));

        // Extraemos el mensaje de texto entrante de forma segura usando la estructura oficial
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messageObj = value?.messages?.[0];

        if (messageObj && messageObj.type === "text") {
          const senderPhone = messageObj.from; // Número de quien escribe
          const messageText = messageObj.text.body; // Texto enviado

          console.log(`Mensaje de ${senderPhone}: "${messageText}"`);

          // AQUÍ PUEDES PROGRAMAR LA RESPUESTA AUTOMÁTICA O CONECTAR TU LÓGICA
        }

        return new Response("EVENT_RECEIVED", { status: 200 });
      } catch (err) {
        console.error("Error procesando el JSON:", err);
        return new Response("Bad Request", { status: 400 });
      }
    }

    return new Response("Método no permitido", { status: 405 });
  }
};