import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { linkId } = await params;

  if (!linkId) {
    return new Response(JSON.stringify({ message: "Missing id" }), {
      status: 400,
    });
  }

  try {
    // Only what the invitation page needs. The full record holds the sender's
    // name and email, and anyone holding the link can call this route.
    const link = await prisma.appointmentLink.findUnique({
      where: { id: linkId },
      select: {
        id: true,
        verified: true,
        locations: { select: { name: true } },
      },
    });

    if (!link) {
      return new Response(JSON.stringify({ message: "Link not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(link), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
