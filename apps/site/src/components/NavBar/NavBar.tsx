"use client";

import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import ZotHacksLogo from "@/assets/icons/zothacks_logo_white_rya.png";

import styles from "./NavBar.module.scss";

export default function NavBar() {
	const activeRoute = usePathname();

	const [hasScrolledToOcean, setHasScrolledToOcean] = useState(false);

	useEffect(() => {
		const getScrollThreshold = () => {
			if (window.innerWidth < 768) {
				// For mobile screens
				return document.documentElement.scrollHeight / 5; 
			} else if (window.innerWidth < 1200) {
				// For tablets and small desktops
				return document.documentElement.scrollHeight / 3.5;
			} else {
				// For large desktops
				return document.documentElement.scrollHeight / 2.55;
			}
		};
		
		let scrollThreshold = getScrollThreshold();
		const handleScroll = () => 
			window.scrollY > scrollThreshold ? setHasScrolledToOcean(true) : setHasScrolledToOcean(false);

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
		}, []);

	return (		
		<div className={`${styles.nav} fixed-top ${hasScrolledToOcean ? "bg-ocean" : "bg-transparent"}`}>
			<Navbar variant="dark" expand="lg" className={`${styles.navbar}`}>
				<Container fluid>
					<Navbar.Brand href="/" as={Link}>
						<div className={styles.logo}>
							<Image src={ZotHacksLogo.src} alt="Hacks Logo" fill />
						</div>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto text">
							<Link
								href="/"
								className={
									activeRoute === "/" ? styles.active : styles.notActive
								}
							>
								HOME
							</Link>
							<Link
								href="/resources"
								className={
									activeRoute === "/resources"
										? styles.active
										: styles.notActive
								}
							>
								RESOURCES
							</Link>
							<Link
								href="/schedule"
								className={
									activeRoute === "/schedule" ? styles.active : styles.notActive
								}
							>
								SCHEDULE
							</Link>
							{/* <Link
								href="https://forms.gle/cCixQqKR2gDXAUMLA"
								className={styles.notActive}
								target="_blank"
							>
								INCIDENT FORM
							</Link>
							<Link
								href="https://zothacks-2023.devpost.com/"
								className={styles.notActive}
								target="_blank"
							>
								DEVPOST
							</Link>	 */}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
