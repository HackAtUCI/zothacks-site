"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import ZotHacksLogo from "@/assets/icons/zothacks-logo.png";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { Identity } from "@/lib/utils/getUserIdentity";
import BaseNavBar from "./BaseNavBar";

import styles from "./NavBar.module.scss";
import NavLinkItem from "./NavLinkItem";

interface NavbarProps {
	identity: Identity;
}

export default function NavBar({ identity }: NavbarProps) {
	const { uid, status } = identity;
	const isLoggedIn = uid !== null;

	return (
		<div className={`${styles.nav} fixed-top`}>
			<BaseNavBar>
				{status !== null && <NavLinkItem href="/portal">Portal</NavLinkItem>}
				{isLoggedIn ? (
					<PrimaryButton href="/logout" variant="small">
						Log Out
					</PrimaryButton>
				) : (
					<PrimaryButton href="/guest-login" variant="small">
						Log In
					</PrimaryButton>
				)}
			</BaseNavBar>
		</div>
	);
}
