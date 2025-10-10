"use client";

import { MutableRefObject, useRef } from "react";
import { motion } from "framer-motion";

import styles from "./BaseSticker.module.scss";

interface StickerProps {
	imageSrc: string;
	alt: string;
	height?: number;
	width?: number;
	draggable?: boolean;
	dragConstraints?: object | false | MutableRefObject<any> | undefined;
	// dragConstraints prop can be an object containing coordinates, a Falsy boolean, or a parent ref (https://www.framer.com/motion/gestures/#:~:text=%23-,dragConstraints%3A,-false%20%7C%20Partial%3CBoundingBox2D)
	animate?: object | undefined;
	transition?: object | undefined;
	offsetX?: number;
	offsetY?: number;
}

const BaseSticker: React.FC<StickerProps> = ({
	imageSrc,
	alt,
	height = 100,
	width = 100,
	draggable = true,
	dragConstraints = false,
	animate = {},
	transition = {},
	offsetX = 0,
	offsetY = 0,
}) => {
	// prevent next from throwing error involving DOM API
	const pageRef = useRef(
		typeof document !== "undefined" ? document.documentElement : undefined,
	);
	let transitionProps = { ...transition };

	let animateProps = {
		...animate,
		filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.3))",
	};

	if (draggable)
		transitionProps = {
			...transition,
			scale: { type: "spring", stiffness: 100 },
		};
	const drag = draggable
		? {
				whileTap: {
					scale: 1.1,
					filter: `drop-shadow(16px 20px 20px rgba(0, 0, 0, 0.15))`,
				},
				whileHover: {
					scale: 1.025,
					filter: `drop-shadow(10px 14px 10px rgba(0, 0, 0, 0.2))`,
				},
				drag: true,
				initial: { x: -width / 2 + offsetX, y: -height / 2 + offsetY },
				dragMomentum: false,
				dragConstraints: dragConstraints ? dragConstraints : pageRef,
				dragElastic: 0.2,
				transition: transitionProps,
			}
		: {};

	return (
		<motion.img
			src={imageSrc}
			alt={alt}
			height={height}
			width={width}
			className={styles.sticker}
			animate={animateProps}
			{...drag}
		/>
	);
};

export default BaseSticker;
