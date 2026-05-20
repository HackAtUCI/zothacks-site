"use client";

import Image from "next/image";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import Title from "./Title";
import Date from "@/assets/images/zothacks-date.svg";
import styles from "./Landing.module.scss";

const Landing = () => {
	return (
		<div className={styles.backgroundWrapper}>
			<section className={styles.landing}>
				<div className={styles.mainWindow}>
					<RetroWindow
						title="Irvine's Beginner Hackathon"
						showEditBar
						framedContent
					>
						<Title />
					</RetroWindow>

					<RetroWindow title="Info">
						<div className={styles.infoContent}>
							<Image
								src={Date}
								alt="Date and location"
								className={styles.date}
							/>
						</div>
					</RetroWindow>
				</div>
			</section>
		</div>
	);
};

export default Landing;
