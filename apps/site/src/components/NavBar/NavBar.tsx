"use client";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { Identity } from "@/lib/utils/getUserIdentity";
import BaseNavBar from "./BaseNavBar";
import NavLinkItem from "./NavLinkItem";

import styles from "./NavBar.module.scss";

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
