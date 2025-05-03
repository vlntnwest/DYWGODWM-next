import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { linkId } = await params;

  if (!linkId) {
    return new Response(JSON.stringify({ message: "ID manquant" }), {
      status: 400,
    });
  }

  try {
    const link = await prisma.appointmentLink.findUnique({
      where: { id: linkId },
    });

    if (!link) {
      return new Response(JSON.stringify({ message: "Lien introuvable" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(link), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}
