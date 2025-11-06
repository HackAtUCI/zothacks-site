"use client";

import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import ZotHacksLogo from "@/assets/icons/zothacks-logo.png";
import NavLinkItem from "./NavLinkItem";

import styles from "./BaseNavBar.module.scss";

export default function BaseNavBar({ children }: PropsWithChildren) {
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
						<Nav className="ms-auto">
							<NavLinkItem href="/">Home</NavLinkItem>
							<NavLinkItem href="/resources">Resources</NavLinkItem>
							<NavLinkItem href="/schedule">Schedule</NavLinkItem>
							<NavLinkItem href="/incident">Incident Form</NavLinkItem>
							{/* <NavLinkItem href="#" target="_blank">
								DevPost
							</NavLinkItem> */}
							{/* <NavLinkItem href="#" target="_blank">
								Feedback Form
							</NavLinkItem> */}
							{children}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
