"use client";

import Image from "next/image";
import { ImageProps } from "next/image";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import styles from "./FAQ.module.scss";
import { useEffect, useRef, useState } from "react";

const AnteaterFloatie = ({ src, alt, className }: ImageProps) => {
	const ref = useRef(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});
	const y = useSpring(scrollYProgress, { bounce: 0.2 + Math.random() * 0.4 });
	const yScaled = useTransform(y, (value) => value * 250);

	const [isClicked, setIsClicked] = useState(false);

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
/*

class Circle extends Shape {
	static final double PI = 3.14;
	double radius;
	
	Circle(double newRadius) {
		radius = newRadius;
	}

	public double area() {
		return PI * radius * radius;
	}
}

Shape[] shapes = new Shape[] {new Circle(10), new Circle(20)}

for (Shape shape: shapes) {
	System.out.println(shape.area());
}

*/
