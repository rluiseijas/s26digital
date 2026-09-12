export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Verificación GET de Meta
    if (request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");

      if (mode === "subscribe" && token === "mi_token_secreto_s26") {
        return new Response(challenge, { status: 200 });
      }
      return new Response("Token inválido", { status: 403 });
    }

    // 2. Recepción POST de mensajes
    if (request.method === "POST") {
      try {
        const body = await request.json();
        
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messageObj = value?.messages?.[0];

        if (messageObj && messageObj.type === "text") {
          const senderPhone = messageObj.from; // Número de tu teléfono
          const messageText = messageObj.text.body; // Lo que escribiste
          const phoneNumberId = value.metadata.phone_number_id; // ID del número de negocio

          console.log(`¡MENSAJE DETECTADO! De: ${senderPhone} | Texto: "${messageText}"`);

          // Token de acceso configurado de forma segura vía variables de entorno en Cloudflare Workers
          const accessToken = env.WHATSAPP_ACCESS_TOKEN || env.ACCESS_TOKEN;
          
          if (accessToken) {
            await sendWhatsAppMessage(phoneNumberId, senderPhone, `¡Hola! Recibí tu mensaje: "${messageText}". Sistema SolverTutor activo.`, accessToken);
          } else {
            console.error("Variable de entorno WHATSAPP_ACCESS_TOKEN no configurada en Cloudflare.");
          }
        }

        return new Response("EVENT_RECEIVED", { status: 200 });
      } catch (err) {
        console.error("Error al procesar el mensaje:", err);
        return new Response("Bad Request", { status: 400 });
      }
    }

    return new Response("Método no permitido", { status: 405 });
  }
};

// Función auxiliar para enviar mensajes a través de la Cloud API de WhatsApp
async function sendWhatsAppMessage(phoneNumberId, recipientPhone, messageText, accessToken) {
  const url = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "text",
    text: { body: messageText }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("Respuesta de envío de Meta:", JSON.stringify(data));
}