import type { Metadata } from "next";
import { Fredoka } from "next/font/google";

import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import "@/lib/styles/bootstrap.scss";
import "@/lib/styles/globals.scss";

export const metadata: Metadata = {
	title: "ZotHacks 2023",
	description: "Hack at UCI's premier hackathon for beginners at UCI",
	openGraph: {
		title: "ZotHacks 2023",
		images: "./zothacks_banner.png",
		description: "Hack at UCI's premier hackathon for beginners at UCI",
	},
};

const fuzzy = Fredoka({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--next-font-fredoka",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={fuzzy.variable}>
			<body className="background">
				{/* <NavBar /> */}
				<main>{children}</main>
				{/* <Footer /> */}
			</body>
		</html>
	);
}
