"use client";
import { motion, cubicBezier, Variants } from "framer-motion";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import BookmarkLink from "@/components/BookmarkLink/BookmarkLink";
import tape from "@/assets/images/tape.svg";

import styles from "./Mentor.module.scss";

const MENTOR_APP_URL = "/mentor";

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
			ease: cubicBezier(0.33, 1, 0.68, 1),
		},
	},
};

const Mentor = () => {
	const mentorHeader = (
		<h2 className="mb-3 text-start">Interested in becoming a mentor?</h2>
	);
	const mentorDescription = (
		<p>
			Have a knack for innovation? Interested in inspiring the next generation
			of developers? Mentor applications for ZotHacks 2023 have closed, but
			please keep an eye out for future events!
		</p>
	);
	const applyLink = (
		<BookmarkLink
			className="mb-4"
			href={MENTOR_APP_URL}
			target="_blank"
			disabled
		>
			Applications have closed.
		</BookmarkLink>
	);

	return (
		<Container as="section">
			<motion.div
				variants={variant}
				initial="initial"
				whileInView="animate"
				className="position-relative my-5"
			>
				<motion.div variants={variant}>
					<Col lg={5} className={styles.applySticky}>
						<motion.img
							variants={variant}
							src={tape.src}
							alt="post-it tape"
							className={styles.tape}
						/>
						<div className={styles.applyStickyContent}>
							{mentorHeader}
							{mentorDescription}
						</div>
						{applyLink}
					</Col>
					<Col className={styles.descSticky + " text-center"}>
						{mentorDescription}
						{applyLink}
					</Col>
				</motion.div>
			</motion.div>
		</Container>
	);
};

export default Mentor;
