"use client";

import ApplyButton from "../../components/ApplyButton/ApplyButton";

import styles from "./Landing.module.scss";

function Landing() {
	return (
		<div className={styles.landing}>
			<h1>ZotHacks 2023</h1>
			<p className="fs-2">November 4&ndash;5</p>
			<ApplyButton />
		</div>
	);
}

export default Landing;
