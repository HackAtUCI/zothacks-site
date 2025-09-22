"use client";
import styles from "./Landing.module.scss";

const Landing = () => {
	return (
		<div className={styles.landing}>
			<h1 className={styles.title}>ZotHacks 2025</h1>
			<h2 className={styles.subtitle}>Theme Coming Soon</h2>
			<a href="/apply-mentor" className={styles.applyButton}>
				Mentor Applications Now Open
			</a>
		</div>
	);
};

export default Landing;
