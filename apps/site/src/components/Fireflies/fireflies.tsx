"use client"; // This tells Next.js this runs in the browser, not the server

import styles from "./fireflies.module.scss";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function Fireflies() {
	return (
		<div className={styles.container}>
			<Canvas>
				{/* This creates a 3D camera view */}
				<ambientLight intensity={0.5} />

				<Sparkles
					count={100} // How many sparkles
					scale={10} // How spread out they are
					size={10} // How big each sparkle is
					speed={0.5} // How fast they float
					color="yellow" // Color
				/>
			</Canvas>
		</div>
	);
}
