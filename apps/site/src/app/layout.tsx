import type { Metadata } from "next";
import { DM_Sans, Reddit_Mono } from "next/font/google";

import NavbarParent from "@/components/NavBar/NavBarParent";
import Footer from "@/components/Footer/Footer";
import "@/lib/styles/bootstrap.scss";
import "@/lib/styles/globals.scss";

export const metadata: Metadata = {
	title: "ZotHacks 2025",
	description: "Hack at UCI's premier hackathon for beginners at UCI",
	openGraph: {
		title: "ZotHacks 2025",
		images: "./zothacks_banner.png",
		description: "Hack at UCI's premier hackathon for beginners at UCI",
	},
};

const dmSans = DM_Sans({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--next-font-dm-sans",
});

const redditMono = Reddit_Mono({
	weight: ["400", "600", "800"],
	subsets: ["latin"],
	variable: "--next-font-reddit-mono",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={redditMono.variable}>
			<body className="background">
				<NavbarParent />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
