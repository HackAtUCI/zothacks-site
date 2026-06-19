"use client";

import Image from "next/image";
import Container from "react-bootstrap/Container";
import { motion } from "framer-motion";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import FolderIcon from "@/assets/icons/folder-icon.svg";
import SponsorsPeter from "@/assets/images/sponsors-peter.gif";
import { leftWindowEntry, rightWindowEntry } from "@/components/animation";

import { SponsorCardProps } from "./SponsorCard";
import SponsorCard from "./SponsorCard";

import styles from "./Sponsors.module.scss";

const PLACEHOLDERS: ReadonlyArray<SponsorCardProps & { key: string }> = [
	{ key: "placeholder-1", name: "nami", placeholder: true },
	{ key: "placeholder-2", name: "nami", placeholder: true },
	{ key: "placeholder-3", name: "nami", placeholder: true },
];

const SponsorsClient = () => {
	return (
		<Container as="section" className={styles.section}>
			<motion.div
				className={styles.thanksWindow}
				variants={leftWindowEntry}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<RetroWindow title="Sponsors" framedContent>
					<div className={styles.thanks}>
						<Image
							src={FolderIcon}
							alt=""
							aria-hidden
							className={styles.thanksFolder}
						/>
						<div className={styles.thanksText}>Thank you to our sponsors!</div>
					</div>
				</RetroWindow>
			</motion.div>

			<motion.div
				className={styles.mainWindow}
				variants={rightWindowEntry}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<RetroWindow title="Sponsors" framedContent>
					<div className={styles.mainContent}>
						<h2 className={styles.heading}>Sponsors</h2>
						<div className={styles.cards}>
							{PLACEHOLDERS.map(({ key, ...rest }) => (
								<SponsorCard key={key} {...rest} />
							))}
						</div>
						<Image
							src={SponsorsPeter}
							alt=""
							aria-hidden
							className={styles.cornerPeter}
							unoptimized
						/>
					</div>
				</RetroWindow>
			</motion.div>
		</Container>
	);
};

export default SponsorsClient;
