import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import NavBar from "@/components/NavBar/NavBar";
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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={dmSans.variable}>
			<body className="background">
				<NavBar />
				<main>{children}</main>
				{/* <Footer /> */}
			</body>
		</html>
	);
}
