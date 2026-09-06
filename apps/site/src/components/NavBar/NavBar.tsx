"use client";

import { usePathname } from "next/navigation";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { Identity } from "@/lib/utils/getUserIdentity";
import BaseNavBar from "./BaseNavBar";

import styles from "./NavBar.module.scss";

interface NavbarProps {
	identity: Identity;
}

export default function NavBar({ identity }: NavbarProps) {
	const { uid, status } = identity;
	const isLoggedIn = uid !== null;
	const pathname = usePathname();
	const isHomePage = pathname === "/";

	return (
		<div className={`${styles.nav} fixed-top`}>
			<BaseNavBar>
				<div className={styles.actions}>
					{isHomePage && (
						<PrimaryButton
							href="https://2025.zothacks.com"
							variant="small"
							color="yellow"
						>
							2025
						</PrimaryButton>
					)}
					{status !== null && (
						<PrimaryButton
							href="/portal"
							variant="small"
							color="green"
							className={styles.portalButton}
						>
							Portal
						</PrimaryButton>
					)}
					{/* {isLoggedIn ? (
						<PrimaryButton href="/logout" variant="small" color="red">
							Logout
						</PrimaryButton>
					) : (
						<PrimaryButton href="/?overlay=login" variant="small" color="green">
							Login
						</PrimaryButton>
					)} */}
				</div>
			</BaseNavBar>
		</div>
	);
}
