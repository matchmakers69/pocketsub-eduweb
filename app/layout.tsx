import SessionProvider from "./components/providers/SessionProvider";
import { Nunito } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./components/providers/ToasterProvider";

export const metadata: Metadata = {
  title: "Pocketsub - Eduweb",
  description: "Manage your payments with ease",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
        </ClientOnly>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
