"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import ZotHacksLogo from "@/assets/icons/zothacks-logo.png";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import styles from "./NavBar.module.scss";

export default function NavBar() {
	const activeRoute = usePathname();

	return (
		<div className={`${styles.nav} fixed-top`}>
			<Navbar variant="dark" expand="sm" className={`${styles.navbar}`}>
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
								Home
							</Link>
							<Link
								href="/resources"
								className={
									activeRoute === "/resources"
										? styles.active
										: styles.notActive
								}
							>
								Resources
							</Link>
							<Link
								href="/schedule"
								className={
									activeRoute === "/schedule" ? styles.active : styles.notActive
								}
							>
								Schedule
							</Link>
							{/* <Link
								href="#"
								className={styles.notActive}
								target="_blank"
							>
								Incident Form
							</Link>
							<Link
								href="#"
								className={styles.notActive}
								target="_blank"
							>
								DevPost
							</Link>
							<Link
								href="#"
								className={styles.notActive}
								target="_blank"
							>
								Feedback Form
							</Link> */}
							<PrimaryButton href="/guest-login" variant="small">
								Log in
							</PrimaryButton>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
