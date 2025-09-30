"use client";
import styles from "./Landing.module.scss";
import Fireflies from "@/components/Fireflies/fireflies";

const Landing = () => {
	return (
		<div className={styles.landing}>
			<Fireflies />
			<h1 className={styles.title}>ZotHacks 2025</h1>
			<h2 className={styles.subtitle}>Theme Coming Soon</h2>
			<a href="/mentor" className={styles.applyButton}>
				Mentor Applications Now Open
			</a>
		</div>
	);
};

export default Landing;
