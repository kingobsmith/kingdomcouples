import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kingdom Folk | Where Christians Come to Mingle",
  description:
    "A Christian community for singles, couples, and families seeking genuine fellowship, stronger covenants, and Kingdom-centered connection.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
