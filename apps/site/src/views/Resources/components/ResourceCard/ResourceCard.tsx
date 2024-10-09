"use client";
import Image from "next/image";
import { Variants, motion, AnimatePresence, cubicBezier } from "framer-motion";
import openNewWindow from "@/assets/icons/open-new-window.svg";
import styles from "./ResourceCard.module.scss";

type Tag = {
	text: string;
	link: string;
};

interface ResourceCardProps {
	title: string;
	description: JSX.Element;
	stickerSrc?: string;
	links: Tag[];
	islandBackground: string;
}

const variant: Variants = {
	initial: {
		scale: 1.1,
		opacity: 0,
		rotateX: 20,
		translateY: 30,
	},
	animate: {
		scale: 1,
		rotateX: 0,
		opacity: 1,
		translateY: 0,
		transition: {
			duration: 0.85,
			staggerChildren: 0.1,
			staggerDirection: -1,
			ease: cubicBezier(0.33, 1, 0.68, 1),
		},
	},
};

export default function ResourceCard({
	title,
	description,
	stickerSrc,
	links,
	islandBackground,
}: ResourceCardProps) {
	return (
		<AnimatePresence mode="wait">
			<motion.div style={{ position: "relative" }}>
				<motion.div
					initial={{
						scale: 1.1,
						opacity: 0,
						rotateX: 15,
					}}
					viewport={{ once: true }}
					whileInView={{
						scale: 1,
						rotateX: 0,
						opacity: 1,
						transition: {
							delay: 0.1,
							duration: 0.65,
							ease: cubicBezier(0.64, 0, 0.78, 0),
						},
					}}
					className={styles.tape}
				></motion.div>
				<motion.div
					variants={variant}
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					className={styles.group}
				>
					<motion.img src={islandBackground} alt="island" />
					<div className={styles.container + " text-center px-3"}>
						{stickerSrc && (
							<motion.img
								src={stickerSrc}
								alt="Resource logo"
								width="100"
								variants={variant}
							/>
						)}
						<h3>{title}</h3>
						{description}
					</div>

					{links.map(({ text, link }) => (
						<motion.a
							key={link}
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.tag}
							variants={variant}
						>
							{text}
							<motion.div
								className="d-inline ms-1 vertical-align-middle"
								variants={variant}
							>
								<Image
									src={openNewWindow}
									width="20"
									height="20"
									alt="Open link in new window"
								/>
							</motion.div>
						</motion.a>
					))}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
