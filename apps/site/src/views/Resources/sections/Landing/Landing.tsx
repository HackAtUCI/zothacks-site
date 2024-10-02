import Image from "next/image";

import styles from "./Landing.module.scss";
import resourcesTitle from "@/assets/images/resources-title.svg";

function Landing() {
	return (
		<div className={styles.landing}>
			<Image src={resourcesTitle} alt="resources title" />
		</div>
	);
}

export default Landing;
