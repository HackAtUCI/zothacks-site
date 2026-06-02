"use client";

import Image from "next/image";

import Title from "./Title";
import Moon from "@/assets/background/landing/moon.svg";
import Trees from "@/assets/background/landing/main-trees.svg";

import styles from "./Landing.module.scss";

const Landing = () => {
	return (
		<div className={styles.backgroundWrapper}>
			<Image src={Moon} alt="moon" className={styles.moon} />

			<section className={styles.landing}>
				<Image src={Trees} alt="trees" className={styles.trees} />
				<Title />
			</section>
		</div>
	);
};

export default Landing;
