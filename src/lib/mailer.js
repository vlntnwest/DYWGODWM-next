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
  console.error("SMTP configuration error:", err);
});

/**
 * Sends a notification email.
 * Internal use only, not exposed as an API route.
 *
 * @param {string} to - Recipient email address
 * @param {string} text - Plain text body
 * @param {string} [subject] - Email subject
 * @param {string} [html] - HTML body (falls back to the escaped text)
 */
export async function sendNotification(to, text, subject, html) {
  const info = await transporter.sendMail({
    from: `"DYWGODWM" <${process.env.SMTP_SERVER_USERNAME}>`,
    to,
    subject: subject || "A message from DYWGODWM",
    text,
    html: html || `<p>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`,
  });

  return { messageId: info.messageId, envelope: info.envelope };
}
