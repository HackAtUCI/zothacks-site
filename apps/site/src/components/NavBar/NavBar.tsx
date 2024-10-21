"use client";

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

	return (
		<div className={styles.nav}>
			<Navbar variant="dark" expand="lg" className={`${styles.navbar}`}>
				<Container fluid>
					<Link href="/">
						<div className={styles.logo}>
							<Image src={ZotHacksLogo.src} alt="Hacks Logo" fill />
						</div>
					</Link>
					<Navbar.Brand />
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
									activeRoute === "/schedule"
										? styles.active
										: styles.notActive
								}
							>
								SCHEDULE
							</Link>
							{/* <Link
								href="https://forms.gle/6GUGYnVoFhAAxVkL8"
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
