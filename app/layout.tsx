import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HockeySchermen",
  description:
    "Scherm die locale hockey wedstrijden tonen per veld van uit hokey.nl made by jcklerk voor mhcflevoland.nl",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden bg-center bg-cover h-screen">
        <div id="root" className="h-full overflow-hidden p-8">
          {children}
        </div>
      </body>
    </html>
  );
}
