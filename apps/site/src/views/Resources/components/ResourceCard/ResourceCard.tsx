"use client";
import React from "react";
import { motion, AnimatePresence, cubicBezier, Variants } from "framer-motion";
import Link from "next/link";

import styles from "./ResourceCard.module.scss";

type Tag = {
	text: string;
	link: string;
};

interface ResourceCardProps {
	title: string;
	description: string | React.ReactNode;
	image: string;
	links?: Tag[];
}

const variant: Variants = {
	initial: {
		scale: 1.05,
		opacity: 0,
		translateY: 30,
	},
	animate: {
		scale: 1,
		opacity: 1,
		translateY: 0,
		transition: {
			duration: 0.8,
			ease: cubicBezier(0.33, 1, 0.68, 1),
		},
	},
};

export default function ResourceCard({
	title,
	description,
	image,
	links = [],
}: ResourceCardProps) {
	const mainLink = links.length > 0 ? links[0].link : null;

	const renderedDescription =
		typeof description === "string" ? (
			<>
				{description.includes(title) ? (
					<>
						<span className={styles.bold}>{title}</span>
						{description.replace(title, "")}
					</>
				) : (
					description
				)}
			</>
		) : (
			description
		);

	const content = (
		<motion.div
			className={styles.frame}
			initial="initial"
			whileInView="animate"
			viewport={{ once: true }}
			variants={variant}
			whileHover={{ scale: 1.03 }}
		>
			<motion.img src={image} alt={`${title} logo`} className={styles.logo} />
			<p className={styles.text}>{renderedDescription}</p>
		</motion.div>
	);

	return (
		<AnimatePresence mode="wait">
			{mainLink ? (
				<Link
					href={mainLink}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.cardLinkWrapper}
				>
					{content}
				</Link>
			) : (
				content
			)}
		</AnimatePresence>
	);
}
