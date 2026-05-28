"use client";

import { PropsWithChildren, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import ZotHacksLogo from "@/assets/icons/zothacks-logo.png";
import NavLinkItem from "./NavLinkItem";

import home_icon from "@/assets/icons/home_icon.svg";
import resources_icon from "@/assets/icons/resources_icon.svg";
import schedule_icon from "@/assets/icons/schedule_icon.svg";
import incident_form_icon from "@/assets/icons/incident_form_icon.svg";

import styles from "./BaseNavBar.module.scss";

export default function BaseNavBar({ children }: PropsWithChildren) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={`${styles.nav} fixed-top`}>
			<Navbar expand="md" expanded={expanded} className={`${styles.navbar} py-0`}>
				<Container>
					<Navbar.Toggle
						aria-controls="basic-navbar-nav"
						onClick={() => setExpanded(true)}
					>
						<Image src={ZotHacksLogo.src} alt="" width={60} height={60} />
					</Navbar.Toggle>
					<Navbar.Collapse id="basic-navbar-nav" className="justify-between">
						<button
							className={styles.closeBtn}
							onClick={() => setExpanded(false)}
							aria-label="Close menu"
						>
							✕
						</button>
						<Navbar.Brand href="/" as={Link}>
							<div className={styles.logo}>
								<Image src={ZotHacksLogo.src} alt="Hacks Logo" fill />
							</div>
						</Navbar.Brand>
						<Nav className={`${styles.navItems} mx-auto gap-4 md:gap-2 lg:gap-4`}>
							<NavLinkItem href="/" icon={home_icon.src}>Home</NavLinkItem>
							<NavLinkItem href="/?overlay=resources" icon={resources_icon.src}>
								Resources
							</NavLinkItem>
							<NavLinkItem href="/?overlay=schedule" icon={schedule_icon.src}>
								Schedule
							</NavLinkItem>
							<NavLinkItem href="/incident" icon={incident_form_icon.src}>
								Incident Form
							</NavLinkItem>
							{/* <NavLinkItem href="#" target="_blank">
								DevPost
							</NavLinkItem> */}
							{/* <NavLinkItem href="#" target="_blank">
								Feedback Form
							</NavLinkItem> */}
						</Nav>
						{children}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}