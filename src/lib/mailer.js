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
 *
 * @param {string} to - Adresse email du destinataire
 * @param {string} text - Contenu texte brut
 * @param {string} [subject] - Sujet de l'email
 * @param {string} [html] - Contenu HTML (fallback: texte échappé)
 */
export async function sendNotification(to, text, subject, html) {
  const info = await transporter.sendMail({
    from: `"DYWGODWM" <${process.env.SMTP_SERVER_USERNAME}>`,
    to,
    subject: subject || "Notification de DYWGODWM",
    text,
    html: html || `<p>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`,
  });

  return { messageId: info.messageId, envelope: info.envelope };
}
