import { PrismaClient } from "@prisma/client";
import { sendNotification } from "@/lib/mailer";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { linkId } = params;

  if (!linkId) {
    return new Response(JSON.stringify({ message: "ID du lien manquant" }), {
      status: 400,
    });
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: { linkId },
    });

    if (!appointments || appointments.length === 0) {
      return new Response(
        JSON.stringify({ message: "Aucun rendez-vous trouvé" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}

export async function POST(request, { params }) {
  const { linkId } = await params;

  if (!linkId) {
    return new Response(JSON.stringify({ message: "ID du lien manquant" }), {
      status: 400,
    });
  }

  try {
    const body = await request.json();
    const { date, location, note } = body;

    if (!date || !location) {
      return new Response(
        JSON.stringify({ message: "Champs requis manquants" }),
        { status: 400 }
      );
    }

    // Récupérer le nom du date depuis le lien
    const link = await prisma.appointmentLink.findUnique({
      where: { id: linkId },
    });

    if (!link) {
      return new Response(JSON.stringify({ message: "Lien inexistant" }), {
        status: 404,
      });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        location,
        note,
        linkId,
        dateName: link.dateName,
      },
    });

    const formattedDate = new Date(date).toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    try {
      await sendNotification(
        link.senderMail,
        `📅 ${link.dateName} a confirmé un rendez-vous pour le ${formattedDate} à ${location}.`
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi de la notification:", error);
      return new Response(
        JSON.stringify({
          message: "Erreur lors de l'envoi de la notification",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Rendez-vous enregistré",
        appointment: newAppointment,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}
