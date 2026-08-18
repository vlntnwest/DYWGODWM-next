import { PrismaClient } from "@prisma/client";
import { sendNotification } from "@/lib/mailer";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { linkId } = params;

  if (!linkId) {
    return new Response(JSON.stringify({ message: "Missing link id" }), {
      status: 400,
    });
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: { linkId },
    });

    if (!appointments || appointments.length === 0) {
      return new Response(
        JSON.stringify({ message: "No appointment found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}

export async function POST(request, { params }) {
  const { linkId } = await params;

  if (!linkId) {
    return new Response(JSON.stringify({ message: "Missing link id" }), {
      status: 400,
    });
  }

  try {
    const body = await request.json();
    const { date, location, note } = body;

    if (!date || !location) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Read the date's name from the link
    const link = await prisma.appointmentLink.findUnique({
      where: { id: linkId },
    });

    if (!link) {
      return new Response(JSON.stringify({ message: "Link not found" }), {
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

    const formattedDate = new Date(date).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    try {
      await sendNotification(
        link.senderMail,
        `📅 ${link.dateName} confirmed a date on ${formattedDate} at ${location}.`
      );
    } catch (error) {
      console.error("Failed to send the notification:", error);
      return new Response(
        JSON.stringify({
          message: "Failed to send the notification",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Appointment saved",
        appointment: newAppointment,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
