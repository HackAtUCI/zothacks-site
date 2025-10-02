"use client";
import styles from "./Landing.module.scss";
import About from "../About/About";

const Landing = () => {
	return (
		<div className={styles.backgroundWrapper}>
			<section className={styles.landing}>
				<h1 className={styles.title}>ZotHacks 2025</h1>
				<h2 className={styles.subtitle}>Theme Coming Soon</h2>
				<a href="/mentor" className={styles.applyButton}>
					Mentor Applications Now Open
				</a>
			</section>
			<About />
		</div>
	);
};

export default Landing;
