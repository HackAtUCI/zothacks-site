import Image from "next/image";
import resourcesTitle from "@/assets/images/resources-title.svg";

import styles from "./Landing.module.scss";

function Landing() {
	return (
		<div className={styles.landing}>
			<Image src={resourcesTitle} alt="resources title" />
		</div>
	);
}

export default Landing;
