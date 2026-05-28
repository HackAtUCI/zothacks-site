import type { Metadata } from "next";
import { DotGothic16, Inter, Pixelify_Sans } from "next/font/google";

import NavbarParent from "@/components/NavBar/NavBarParent";
import Footer from "@/components/Footer/Footer";
import "@/lib/styles/bootstrap.scss";
import "@/lib/styles/globals.scss";

export const metadata: Metadata = {
	title: "ZotHacks 2026",
	description: "Hack at UCI's premier hackathon for beginners at UCI",
	openGraph: {
		title: "ZotHacks 2026",
		images: "./zothacks_banner.png",
		description: "Hack at UCI's premier hackathon for beginners at UCI",
	},
};

const inter = Inter({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--next-font-inter",
});

const dotGothic16 = DotGothic16({
	weight: "400",
	subsets: ["latin"],
	variable: "--next-font-dotgothic16",
});

const pixelifySans = Pixelify_Sans({
	weight: "400",
	subsets: ["latin"],
	variable: "--next-font-pixelify-sans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${inter.variable} ${dotGothic16.variable} ${pixelifySans.variable}`}>
			<body className="background">
				{/* <NavbarParent /> */}
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
