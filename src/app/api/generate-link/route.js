import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";

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
        verified: false,
        locations: {
          create: locations.map((loc) => ({ name: loc })),
        },
      },
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_URL}/api/verify/${newLink.verificationToken}`;

    await sendNotification(
      senderMail,
      `Confirme ton adresse email pour activer ton lien DYWGODWM.\n\nClique ici : ${verifyUrl}`,
      "Confirme ton email - DYWGODWM",
      `<p>Confirme ton adresse email pour activer ton lien DYWGODWM.</p>
       <p><a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#dc0011;color:#fff;border-radius:9999px;text-decoration:none;font-weight:600;">Confirmer mon email</a></p>`
    );

    return new Response(
      JSON.stringify({
        message: "Un email de vérification a été envoyé",
        pendingVerification: true,
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
