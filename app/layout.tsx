import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
			<body className="overflow-hidden bg-center bg-cover h-screen bg-[url(/bg2.jpg)]">
				<div
					id="root"
					className="h-full overflow-hidden p-2 backdrop-blur-sm backdrop-grayscale bg-white/40  shadow-black/50"
				>
					{children}
				</div>
			</body>
		</html>
	);
}
