import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { senderName, senderPhone, dateName } = body;

    if (!senderName || !senderPhone || !dateName) {
      return new Response(JSON.stringify({ message: "Champs manquants" }), {
        status: 400,
      });
    }

    const newLink = await prisma.appointmentLink.create({
      data: {
        senderName,
        senderPhone,
        dateName,
      },
    });

    const fullLink = `${process.env.NEXT_PUBLIC_URL}/r/${newLink.id}`;

    return new Response(
      JSON.stringify({
        message: "Lien généré avec succès",
        linkId: newLink.id,
        linkUrl: fullLink,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}
