"use client";
import styles from "./Landing.module.scss";
import About from "../About/About";
import Title from "./Title";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

const Landing = () => {
	return (
		<div className={styles.backgroundWrapper}>
			<section className={styles.landing}>
				<Title />
				<PrimaryButton href="/apply">Apply Now</PrimaryButton>
			</section>
			<About />
		</div>
	);
};

export default Landing;
