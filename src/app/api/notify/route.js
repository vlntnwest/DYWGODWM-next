export async function POST(req) {
  try {
    const body = await req.json();
    const { to, text } = body;

    if (!to || !text) {
      return new Response(JSON.stringify({ message: "Paramètres manquants" }), {
        status: 400,
      });
    }

    const payload = {
      from: process.env.VONAGE_NUMBER, // sandbox WhatsApp Vonage
      to: to, // format international (ex: "336xxxxxxxx")
      message_type: "text",
      text: text,
      channel: "whatsapp",
    };

    const response = await fetch(
      "https://messages-sandbox.nexmo.com/v1/messages",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.VONAGE_API_KEY}:${process.env.VONAGE_API_SECRET}`
            ).toString("base64"),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    return new Response(JSON.stringify(result), { status: response.status });
  } catch (error) {
    console.error("Erreur /api/notify :", error);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}
