"use client";
import styles from "./Landing.module.scss";
import About from "../About/About";
import Title from "./Title";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import Image from "next/image";

const Landing = () => {
	return (
		<div className={styles.backgroundWrapper}>
			<section className={styles.landing}>
				<Title />
				<PrimaryButton href="/apply">Apply Now</PrimaryButton>
			</section>
			<div className={styles.aboutSection}>
				<About />
			</div>
		</div>
	);
};

export default Landing;
