import Image from "next/image";
import { motion } from "framer-motion";

import waterAnteater from "@/assets/images/intro-water-anteater.svg";
import waterAnteaterFoam from "@/assets/images/intro-character-foam.svg";
import waterAnteaterShadow from "@/assets/images/intro-water-anteater-shadow.svg";
import beachBall from "@/assets/images/intro-beach-ball.svg";

import mainCharacter from "@/assets/images/intro-main-anteater.svg";

import styles from "./Characters.module.scss";

export default function Characters() {
	return (
		<div>
			<motion.div
				initial={{ translateX: 100, opacity: 0 }}
				animate={{ translateX: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.6 }}
			>
				<Image
					src={waterAnteater}
					alt="Anteater floating in the water"
					className={styles.character}
				/>
			</motion.div>
			<motion.div
				initial={{ translateX: 100, opacity: 0 }}
				animate={{ translateX: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.6 }}
			>
				<Image
					src={waterAnteaterShadow}
					alt="Reflection of anteater in the water"
					className={styles.characterShadow}
				/>
			</motion.div>

			<motion.div
				initial={{ translateX: 100, opacity: 0 }}
				animate={{ translateX: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.6 }}
			>
				<Image
					src={waterAnteaterFoam}
					alt="Foam between anteater and the water"
					className={styles.characterFoam}
				/>
			</motion.div>

			<motion.div
				initial={{ translateY: -100, opacity: 0 }}
				animate={{ translateY: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 1 }}
			>
				<Image
					src={mainCharacter}
					alt="Anteater standing on the shore"
					className={styles.mainCharacter}
				/>
			</motion.div>
			<motion.div
				initial={{ scale: 0.85, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.8 }}
			>
				<Image src={beachBall} alt="Beach ball" className={styles.beachBall} />
			</motion.div>
		</div>
	);
}
