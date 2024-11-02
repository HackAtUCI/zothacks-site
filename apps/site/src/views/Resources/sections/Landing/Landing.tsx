import Image from "next/image";
import resourcesTitle from "@/assets/images/resources-title.svg";

import styles from "./Landing.module.scss";

function Landing() {
	return (
		<div className={styles.landing}>
			<h1 className="visually-hidden">Resources</h1>
			<Image
				src={resourcesTitle}
				className={styles.title}
				alt="resources title"
			/>
		</div>
	);
}

export default Landing;
