import type { Metadata } from "next";
import { Fuzzy_Bubbles } from "next/font/google";

import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import PageTransition from "@/components/PageTransition/PageTransition";
import "@/lib/styles/bootstrap.scss";
import "@/lib/styles/globals.scss";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "ZotHacks 2023",
	description: "Hack at UCI's premier hackathon for beginners at UCI",
};

const fuzzy = Fuzzy_Bubbles({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--next-font-fuzzy-bubbles",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={fuzzy.variable}>
			<body className="background">
				<NavBar />
				<Suspense fallback={null}>
					<PageTransition>
						<Suspense fallback={null}>
							<main>{children}</main>
							<Footer />
						</Suspense>
					</PageTransition>
				</Suspense>
			</body>
		</html>
	);
}
