import localFont from "next/font/local";
import "./globals.css";

const champFont = localFont({
  src: "../fonts/Champ-Black.woff2",
  variable: "--font-champ",
});

export const metadata = {
  title: "Do you wanna date?",
  description: "<3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={champFont.variable}>
      <body
        className="overflow-hidden max-h-dvh selection:text-[var(--color-primary)]
    selection:bg-[var(--color-accent)]
"
      >
        <div className="flex max-h-dvh max-w-screen flex-col items-center justify-center min-h-screen bg-primary text-accent p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
