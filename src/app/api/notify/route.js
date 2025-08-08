// app/api/notify/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Création du transporter en dehors du handler pour réutilisation
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_SERVER_USERNAME,
    pass: process.env.SMTP_SERVER_PASSWORD,
  },
});

// (Optionnel) vérifier la config au démarrage
transporter.verify().catch((err) => {
  console.error("Erreur de configuration SMTP :", err);
});

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request) {
  try {
    const { to, text } = await request.json();

    if (!to || !text) {
      return NextResponse.json(
        { message: "Paramètres manquants : 'to' et 'text' sont requis" },
        { status: 400 }
      );
    }

    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { message: "Adresse e-mail invalide" },
        { status: 400 }
      );
    }

    // Envoi du mail
    const info = await transporter.sendMail({
      from: `"DYWGODWM" <${process.env.SMTP_SERVER_USERNAME}>`,
      to,
      subject: "Notification de DYWGODWM",
      text,
      html: `<p>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`,
    });

    return NextResponse.json(
      { messageId: info.messageId, envelope: info.envelope },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur /api/notify :", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
