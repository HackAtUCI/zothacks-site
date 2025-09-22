import { motion } from "framer-motion";
import Image from "next/image";
import zothacks_title from "@/assets/images/zothacks-title.svg";
import styles from "./Title.module.scss";

export default function Title() {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{
				opacity: 1,
				scale: 1,
			}}
			transition={{ duration: 0.5 }}
		>
			<Image
				src={zothacks_title}
				alt="ZotHacks 2024 Title"
				className={styles.title}
			/>
			<h1 className={styles.date}>November 1-3, 2024</h1>
		</motion.div>
	);
}
