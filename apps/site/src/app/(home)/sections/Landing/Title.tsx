import { motion } from "framer-motion";
import Image from "next/image";
import zothacks_title from "@/assets/images/ZOTHACKS_LOGO.png";
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
				alt="ZotHacks Title"
				className={styles.title}
			/>
		</motion.div>
	);
}
