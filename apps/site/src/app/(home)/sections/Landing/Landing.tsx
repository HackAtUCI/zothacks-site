"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Title from "./Title";
import ColorPicker from "./ColorPicker";
import InfoIcon from "@/assets/images/info-icon.png";
import { getApplicationWindow } from "@/lib/utils/applicationWindow";
import {
	leftWindowEntry,
	rightWindowEntry,
	bottomWindowEntry,
} from "@/components/animation";
import styles from "./Landing.module.scss";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.45,
		},
	},
};

const Landing = () => {
	const [bgColor, setBgColor] = useState<string>();
	const applicationWindow = getApplicationWindow();

	const applicationCta = {
		"before-open": {
			message: "Applications open 9/21",
			label: "Coming soon",
			href: undefined,
		},
		open: {
			message: "Apps due October 2nd",
			label: "Apply now",
			href: "/apply",
		},
		closed: {
			message: "Applications have closed",
			label: "Stay connected",
			href: "https://hack.ics.uci.edu/",
		},
	}[applicationWindow];

	return (
		<div className={styles.backgroundWrapper}>
			<section className={styles.landing}>
				<motion.div
					className={styles.windowsContainer}
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<motion.div className={styles.mainWindow} variants={leftWindowEntry}>
						<RetroWindow
							title="Irvine's Beginner Hackathon"
							showEditBar
							framedContent
							contentBackground={bgColor}
							footer={<ColorPicker onColorSelect={setBgColor} />}
						>
							<Title />
						</RetroWindow>
					</motion.div>

					<motion.div className={styles.infoWindow} variants={rightWindowEntry}>
						<RetroWindow title="Info">
							<div className={styles.infoContent}>
								<Image
									src={InfoIcon}
									alt="Info icon"
									className={styles.infoIcon}
								/>
								<div>
									<p className={styles.infoText}>October16th - October18th</p>
									<p className={styles.infoText}>
										@ University of California, Irvine
									</p>
								</div>
							</div>
						</RetroWindow>
					</motion.div>

					<motion.div
						className={styles.appsWindow}
						variants={bottomWindowEntry}
					>
						<RetroWindow title="System Message">
							<div className={styles.appsContent}>
								<p className={styles.infoText}>{applicationCta.message}</p>
								<PrimaryButton
									href={applicationCta.href}
									type="button"
									disabled={!applicationCta.href}
									className={styles.applyButton}
								>
									{applicationCta.label}
								</PrimaryButton>
							</div>
						</RetroWindow>
					</motion.div>
				</motion.div>
			</section>
		</div>
	);
};

export default Landing;
