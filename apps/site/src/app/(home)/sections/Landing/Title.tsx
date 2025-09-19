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
			<h1 className={styles.title}>ZotHacks 2025</h1>
			<h1 className={styles.date}>Theme Coming Soon</h1>
		</motion.div>
	);
}
