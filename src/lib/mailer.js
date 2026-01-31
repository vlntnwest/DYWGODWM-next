import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_SERVER_USERNAME,
    pass: process.env.SMTP_SERVER_PASSWORD,
  },
});

transporter.verify().catch((err) => {
  console.error("Erreur de configuration SMTP :", err);
});

/**
 * Envoie un email de notification.
 * Usage interne uniquement — pas exposé comme route API.
 */
export async function sendNotification(to, text) {
  const info = await transporter.sendMail({
    from: `"DYWGODWM" <${process.env.SMTP_SERVER_USERNAME}>`,
    to,
    subject: "Notification de DYWGODWM",
    text,
    html: `<p>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`,
  });

  return { messageId: info.messageId, envelope: info.envelope };
}
