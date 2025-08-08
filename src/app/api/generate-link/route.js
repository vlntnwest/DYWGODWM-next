import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { senderName, senderMail, dateName, locations } = body;

    if (!senderName || !senderMail || !dateName) {
      return new Response(JSON.stringify({ message: "Champs manquants" }), {
        status: 400,
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(senderMail)) {
      return NextResponse.json({ message: "Email invalide" }, { status: 400 });
    }

    const newLink = await prisma.appointmentLink.create({
      data: {
        senderName,
        senderMail,
        dateName,
        locations: {
          create: locations.map((loc) => ({ name: loc })),
        },
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
