"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import styles from "./Footer.module.scss";

import Mail from "@/assets/icons/mail_icon.svg";
import Discord from "@/assets/icons/discord.svg";
import Instagram from "@/assets/icons/instagram.svg";
import Hack from "@/assets/icons/hack.svg";
import TikTok from "@/assets/icons/tiktok.svg";

type Social = {
	icon: any;
	link: string;
	alt: string;
};

const RIGHT_SOCIALS: Social[] = [
	{
		icon: Mail,
		link: "mailto:hack@uci.edu",
		alt: "Mail icon that creates an email with Hack at UCI as sender",
	},
	{
		icon: Discord,
		link: "https://discord.com/invite/pvkGxq2AWM",
		alt: "Discord logo that links to Hack at UCI's Discord server",
	},
	{
		icon: Instagram,
		link: "https://www.instagram.com/hackatuci/",
		alt: "Instagram logo that links to Hack at UCI's Instagram",
	},
	{
		icon: TikTok,
		link: "https://www.tiktok.com/@hackatuci",
		alt: "TikTok logo that links to Hack at UCI's TikTok",
	},
];

export default function Footer() {

	return (
		<footer className={styles.footer}>
			<div className={styles.mainBar}>
				<div className={styles.mainBarLeft}>
					<a
						href="https://hack.ics.uci.edu/"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.startButton}
					>
						<Image
							src={Hack.src}
							alt="Hack at UCI logo that links to Hack at UCI's club website"
							width={35}
							height={35}
						/>
						Hack at UCI
					</a>
					<p className={styles.madeWithLove}>made with love in Irvine, CA</p>

				</div>
				<div className={styles.mainBarRight}>
					<FooterNavItem label="home" href="/" />
					<FooterNavItem label="resources" href="/resources" />
					<FooterNavItem label="schedule" href="/schedule" />
					<FooterNavItem label="incident" href="/incident" />
				</div>
			</div>
			<div className={styles.systemTooltray}>
				{RIGHT_SOCIALS.map(({ icon, link, alt }) => (
					<a
						key={link}
						href={link}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src={icon.src}
							alt={alt}
							width={25}
							height={25}
							className={styles.socialIcon}
						/>
					</a>
				))}
			</div>
		</footer>
	)
}

interface FooterNavItemProps {
	label: string;
	href: string;
}

function FooterNavItem({ label, href }: FooterNavItemProps) {
	return (
		<Link href={href} className={styles.footerNavItem}>
			{label}
		</Link>
	)
}