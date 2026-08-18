import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { senderName, senderMail, dateName, locations } = body;

    if (!senderName || !senderMail || !dateName) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(senderMail)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
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
      `Confirm your email address to activate your DYWGODWM link.\n\nClick here: ${verifyUrl}`,
      "Confirm your email - DYWGODWM",
      `<p>Confirm your email address to activate your DYWGODWM link.</p>
       <p><a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#dc0011;color:#fff;border-radius:9999px;text-decoration:none;font-weight:600;">Confirm my email</a></p>`
    );

    return new Response(
      JSON.stringify({
        message: "A verification email has been sent",
        pendingVerification: true,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
