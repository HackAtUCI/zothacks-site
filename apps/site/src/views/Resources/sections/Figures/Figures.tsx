"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import palmTree from "@/assets/images/resources-palm-tree.png";
import palmTreeShade from "@/assets/images/resources-palm-tree-shade.png";
import hammerhead from "@/assets/images/resources-hammerhead.svg";
import birds from "@/assets/images/resources-birds.svg";

import styles from "./Figures.module.scss";

export default function Figures() {
	return (
		<div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 2 }}
			>
				<Image
					src={hammerhead}
					alt="Hammerhead shark swimming in water"
					className={styles.hammerhead}
				/>

				<Image
					src={birds}
					alt="Birds flying above water"
					className={styles.birds}
				/>
				<Image
					src={palmTreeShade}
					alt="Palm tree shadow"
					className={styles.palmTreeShade}
				/>
				<Image src={palmTree} alt="Palm tree" className={styles.palmTree} />
			</motion.div>
		</div>
	);
}
