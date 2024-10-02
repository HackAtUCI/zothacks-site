"use client";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import anteater_left from "@/assets/images/involved_anteater_left.png";
import anteater_right from "@/assets/images/involved_anteater_right.png";

import styles from "./Involved.module.scss";

import { motion } from "framer-motion";

const Mentor = () => {
	const sectionHeader = <h2 className={styles.headerText}>GET INVOLVED</h2>;
	const leftBubbleText = <p>Want to develop your first project?</p>;
	const rightBubbleText = (
		<p>Otherwise, if you have some experience under your belt,</p>
	);
	const applyLink = (
		<Button href="#" type="button" className={styles.applyButton}>
			Apply as a Hacker
		</Button>
	);

	const mentorLink = (
		<Button href="#" type="button" className={styles.applyButton}>
			Apply as a Mentor
		</Button>
	);

	const hoverAnimation = {
		scale: 1.05,
		rotate: [0, 10, -10, 0],
	};

	const hoverTransition = {
		duration: 0.5,
		ease: "easeInOut",
	};

	return (
		<Container as="section">
			{sectionHeader}
			<div>
				<div className={styles.speechSectionLeft}>
					<div className={styles.speechBubbleOuterLeft}>
						<div className={styles.speechBubbleLeft}>
							{leftBubbleText}
							{applyLink}
						</div>
					</div>
					<motion.img
						className={styles.anteaterLeft}
						src={anteater_left.src}
						alt="Involved Anteater Left"
						whileHover={hoverAnimation}
						transition={hoverTransition}
					/>
				</div>
				<div className={styles.speechSectionRight}>
					<div className={styles.speechBubbleOuterRight}>
						<div className={styles.speechBubbleRight}>
							{rightBubbleText}
							{mentorLink}
						</div>
					</div>
					<motion.img
						className={styles.anteaterRight}
						src={anteater_right.src}
						alt="Involved Anteater Right"
						whileHover={hoverAnimation}
						transition={hoverTransition}
					/>
				</div>
			</div>
		</Container>
	);
};

export default Mentor;
