"use client";
import ApplyButton from "./ApplyButton";
import Title from "@/app/(home)/sections/Landing/Title";
import styles from "./Landing.module.scss";

const Landing = () => {
	return (
		<div className={styles.landing}>
			<div className={styles.title}>
				<Title />
			</div>
		</div>
	);
};

export default Landing;
