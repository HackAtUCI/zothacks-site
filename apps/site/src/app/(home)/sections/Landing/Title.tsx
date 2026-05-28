import Image from "next/image";
import zothacks_title from "@/assets/images/zothacks-title.svg";
import zothacks_logo from "@/assets/images/zothacks-logo.png";
import styles from "./Title.module.scss";

export default function Title() {
	return (
		<div className={styles.titleWrapper}>
			<Image
				src={zothacks_logo}
				alt="ZotHacks 2026 Logo"
				className={styles.logo}
			/>
			<Image
				src={zothacks_title}
				alt="ZotHacks 2026 Title"
				className={styles.title}
			/>
		</div>
	);
}
