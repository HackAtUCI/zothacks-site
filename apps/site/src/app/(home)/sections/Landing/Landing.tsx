"use client";
import ApplyButton from "./ApplyButton";
import Title from "@/app/(home)/sections/Landing/Title";
import Characters from "./Characters";
import Intro from "../Intro";
import styles from "./Landing.module.scss";

const Landing = () => {
	return (
		<div className={styles.landing}>
			<div className={styles.title}>
				{/* <Characters /> */}
				<Title />
				<ApplyButton />
				{/* <Intro /> */}
			</div>
		</div>
	);
};

export default Landing;
