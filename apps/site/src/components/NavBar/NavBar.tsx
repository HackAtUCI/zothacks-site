"use client";

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

	return (
		<div className={styles.nav}>
			<Navbar expand="lg" className={`bg-body-tertiary ${styles.navbar}`}>
				<Container fluid>
					<Navbar.Brand />
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto text-center">
							<Link
								href="/"
								className={
									activeRoute === "/" ? styles.homeActive : styles.notActive
								}
							>
								Home
							</Link>
							<Link
								href="/resources"
								className={
									activeRoute === "/resources"
										? styles.resourcesActive
										: styles.notActive
								}
							>
								Resources
							</Link>
							<Link
								href="/schedule"
								className={
									activeRoute === "/schedule"
										? styles.scheduleActive
										: styles.notActive
								}
							>
								Schedule
							</Link>
							<Link
								href="https://forms.gle/6GUGYnVoFhAAxVkL8"
								className={styles.notActive}
								target="_blank"
							>
								Incident Form
							</Link>
							<Link
								href="https://zothacks-2023.devpost.com/"
								className={styles.notActive}
								target="_blank"
							>
								Devpost
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Link href="/">
				<div className={styles.logo}>
					<Image src={ZotHacksLogo.src} alt="ZotHacks Logo" fill />
				</div>
			</Link>
		</div>
	);
}
