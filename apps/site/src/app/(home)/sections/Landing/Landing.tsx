"use client";

import RetroWindow from "@/components/RetroWindow/RetroWindow";
import Title from "./Title";
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
				</div>
			</section>
		</div>
	);
};

export default Landing;
