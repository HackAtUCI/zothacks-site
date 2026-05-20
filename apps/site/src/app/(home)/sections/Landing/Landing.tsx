"use client";

import Image from "next/image";
import RetroWindow from "@/components/RetroWindow/RetroWindow";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Title from "./Title";
import InfoIcon from "@/assets/images/info-icon.png";
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
					</div>

					<div className={styles.appsWindow}>
						<RetroWindow title="System Message">
							<div className={styles.appsContent}>
								<p className={styles.infoText}>Apps open in the Fall</p>
								<PrimaryButton className={styles.applyButton} disabled>
									Coming Soon
								</PrimaryButton>
							</div>
						</RetroWindow>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Landing;
