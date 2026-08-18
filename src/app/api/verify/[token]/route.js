import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { token } = await params;

  if (!token) {
    return new Response(JSON.stringify({ message: "Missing token" }), {
      status: 400,
    });
  }

  try {
    const link = await prisma.appointmentLink.findUnique({
      where: { verificationToken: token },
    });

    if (!link) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 404,
      });
    }

    if (link.verified) {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_URL}/verified/${link.id}`
      );
    }

    await prisma.appointmentLink.update({
      where: { id: link.id },
      data: { verified: true },
    });

    return Response.redirect(
      `${process.env.NEXT_PUBLIC_URL}/verified/${link.id}`
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
