import SessionProvider from "./components/providers/SessionProvider";
import { Nunito } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import type { Metadata } from "next";
import ToasterProvider from "./components/providers/ToasterProvider";
import ReactQueryProvider from "./components/providers/ReactQueryProvider";
import ProgressBarProvider from "./components/providers/ProgressBarProvider";

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
    <ReactQueryProvider>
      <html lang="en">
        <body className={font.className}>
          <ToasterProvider />
          <ProgressBarProvider>
            <SessionProvider>{children}</SessionProvider>
          </ProgressBarProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
