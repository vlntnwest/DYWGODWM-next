import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
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
    <html lang="en" className={champFont.variable}>
      <body
        className="selection:text-[var(--color-primary)]
    selection:bg-[var(--color-accent)]
"
      >
        <div className="flex min-h-svh w-full flex-col items-center justify-center bg-primary text-accent p-4">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
