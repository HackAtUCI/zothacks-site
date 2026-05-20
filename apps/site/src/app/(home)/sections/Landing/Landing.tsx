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
				<div className={styles.windowsContainer}>
					<div className={styles.mainWindow}>
						<RetroWindow
							title="Irvine's Beginner Hackathon"
							showEditBar
							framedContent
						>
							<Title />
						</RetroWindow>
					</div>

					<div className={styles.infoWindow}>
						<RetroWindow title="Info">
							<div className={styles.infoContent}>
								<Image src={Date} alt="Date" className={styles.date} />
							</div>
						</RetroWindow>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Landing;
