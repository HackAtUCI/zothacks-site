import Image from "next/image";
import resourcesTitle from "@/assets/images/resources-title.svg";

import styles from "./Landing.module.scss";

function Landing() {
	return (
		<div className={styles.landing}>
			<h1 className={styles.header}>Resources</h1>
		</div>
	);
}

export default Landing;
