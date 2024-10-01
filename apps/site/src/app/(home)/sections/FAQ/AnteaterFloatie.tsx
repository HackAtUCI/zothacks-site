"use client";

import Image from "next/image";
import { ImageProps } from "next/image";

import { motion, useScroll } from "framer-motion";

import styles from "./FAQ.module.scss";
import { useEffect, useState } from "react";

const AnteaterFloatie = ({ src, alt, className }: ImageProps) => {
	const { scrollYProgress } = useScroll();

	const [isClicked, setIsClicked] = useState(false);

	return (
		<div >
			<motion.div
				animate={{ rotate: [3.5, -3.5, 3.5], scale: isClicked ? 1.2 : 1 }}
				transition={{
					rotate: {
						repeat: Infinity,
						duration: 7,
						ease: "easeInOut",
					},
					scale: { duration: 0.1 },
				}}
				onMouseDown={() => setIsClicked(true)}
				onMouseUp={() => setIsClicked(false)}
				className={className}
			>
				<Image src={src} alt={alt} />
			</motion.div>
		</div>
	);
};

export default AnteaterFloatie;
