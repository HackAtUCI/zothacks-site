"use client";

import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import ZotHacksLogo from "@/assets/icons/zothacks-logo.png";

import styles from "./NavBar.module.scss";

export default function NavBar() {
	const activeRoute = usePathname();

	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () =>
			window.scrollY !== 0 ? setHasScrolled(true) : setHasScrolled(false);

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={`${styles.nav} fixed-top ${hasScrolled ? "" : styles["bg-no-scroll"]}`}
		>
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
							<Link
								href="https://forms.gle/cCixQqKR2gDXAUMLA"
								className={styles.notActive}
								target="_blank"
							>
								INCIDENT FORM
							</Link>
							<Link
								href="https://zothacks-2024.devpost.com/"
								className={styles.notActive}
								target="_blank"
							>
								DEVPOST
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
