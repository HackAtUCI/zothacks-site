"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImageProps } from "next/image";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import Ripple from "./Ripple";

const rippleSize = 300;

const AnteaterFloatie = ({ src, alt, className }: ImageProps) => {
	const ref = useRef(null);

	const [ripples, setRipples] = useState<
		{ id: number; rippleX: number; rippleY: number }[]
	>([]);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});
	const y = useSpring(scrollYProgress, { bounce: 0.2 + Math.random() * 0.5 });
	const yScaled = useTransform(y, (value) => value * 250);

	const [isClicked, setIsClicked] = useState(false);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();

		let rippleHeight = rect.top;

		const parentRect =
			event.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
		if (parentRect) {
			rippleHeight +=
				-parentRect.top + yScaled.get() + (0.5 - y.get()) * rippleSize - 60;
		}

		const rippleX = rect.left - 150 + (rect.right - rect.left) / 2;
		const rippleY = rippleHeight;

		setRipples((prev) => [...prev, { id: Date.now(), rippleX, rippleY }]);
	};

	const handleRippleComplete = (id: number) => {
		setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
	};

	return (
		<div ref={ref}>
			<motion.div
				style={{ y: yScaled }}
				animate={{ rotate: [3.5, -3.5, 3.5], scale: isClicked ? 0.85 : 1 }}
				transition={{
					rotate: {
						repeat: Infinity,
						duration: 7,
						ease: "easeInOut",
					},
					scale: { type: "spring", bounce: 0.7 },
				}}
				className={className}
			>
				<Image
					src={src}
					alt={alt}
					onMouseDown={(event) => {
						handleClick(event);
						setIsClicked(true);
					}}
					onMouseUp={(event) => {
						handleClick(event);
						setIsClicked(false);
					}}
					onMouseLeave={() => {
						setIsClicked(false);
					}}
				/>
			</motion.div>

			{ripples.map((ripple) => (
				<Ripple
					key={ripple.id}
					x={ripple.rippleX}
					y={ripple.rippleY}
					onComplete={() => handleRippleComplete(ripple.id)}
				/>
			))}
		</div>
	);
};

export default AnteaterFloatie;
